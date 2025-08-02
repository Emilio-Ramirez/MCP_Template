export default `# 🎯 Definitive Reference Implementation

## Overview

This document provides the authoritative reference implementation for MCP ERP systems, serving as the gold standard for architecture, patterns, and implementation approaches. It consolidates proven methodologies and best practices into a comprehensive implementation guide.

## Reference Architecture

### System Architecture Overview

\`\`\`mermaid
graph TB
    subgraph "Client Layer"
        UI[User Interface]
        API[API Gateway]
        AUTH[Authentication]
    end
    
    subgraph "MCP Layer"
        MCP1[MCP Server 1]
        MCP2[MCP Server 2]
        MCP3[MCP Server N]
        MCPGW[MCP Gateway]
    end
    
    subgraph "Business Layer"
        BL[Business Logic]
        WF[Workflow Engine]
        RULES[Business Rules]
    end
    
    subgraph "Data Layer"
        DB[(Database)]
        CACHE[(Cache)]
        FILES[(File Storage)]
    end
    
    subgraph "Integration Layer"
        ERP[ERP Systems]
        CRM[CRM Systems]
        EXT[External APIs]
    end
    
    UI --> API
    API --> AUTH
    AUTH --> MCPGW
    MCPGW --> MCP1
    MCPGW --> MCP2
    MCPGW --> MCP3
    MCP1 --> BL
    MCP2 --> BL
    MCP3 --> BL
    BL --> WF
    BL --> RULES
    BL --> DB
    BL --> CACHE
    BL --> FILES
    BL --> ERP
    BL --> CRM
    BL --> EXT
\`\`\`

### Core Design Principles

#### 1. Modular Architecture
\`\`\`javascript
// Principle: Single Responsibility per Module
// Each MCP server handles one business domain

// Example: Customer Management Server
class CustomerMCPServer {
  constructor() {
    this.domain = 'customer-management';
    this.capabilities = {
      resources: ['customers', 'contacts', 'preferences'],
      prompts: ['create-customer', 'update-profile'],
      tools: ['validation', 'search']
    };
  }
  
  // Single responsibility: Customer operations only
  async handleCustomerOperations(operation, data) {
    switch (operation) {
      case 'create': return this.createCustomer(data);
      case 'update': return this.updateCustomer(data);
      case 'search': return this.searchCustomers(data);
      default: throw new Error('Unsupported operation');
    }
  }
}
\`\`\`

#### 2. Event-Driven Communication
\`\`\`javascript
// Principle: Loose coupling through events
// Services communicate via events, not direct calls

class EventDrivenMCPServer {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.setupEventHandlers();
  }
  
  setupEventHandlers() {
    this.eventBus.on('customer.created', this.handleCustomerCreated.bind(this));
    this.eventBus.on('order.completed', this.handleOrderCompleted.bind(this));
  }
  
  async createCustomer(customerData) {
    const customer = await this.customerService.create(customerData);
    
    // Emit event for other services
    this.eventBus.emit('customer.created', {
      customerId: customer.id,
      timestamp: new Date().toISOString(),
      data: customer
    });
    
    return customer;
  }
  
  async handleCustomerCreated(event) {
    // React to customer creation
    await this.analyticsService.trackCustomerCreation(event.data);
    await this.notificationService.sendWelcomeEmail(event.data);
  }
}
\`\`\`

#### 3. Data Consistency Patterns
\`\`\`javascript
// Principle: Eventual consistency with compensation
// Handle distributed transactions gracefully

class ConsistencyManager {
  constructor(sagaOrchestrator) {
    this.sagaOrchestrator = sagaOrchestrator;
  }
  
  async executeDistributedTransaction(transactionData) {
    const saga = this.sagaOrchestrator.createSaga('customer-order-saga');
    
    try {
      // Step 1: Create customer
      const customer = await saga.execute('create-customer', transactionData.customer);
      
      // Step 2: Create order
      const order = await saga.execute('create-order', {
        ...transactionData.order,
        customerId: customer.id
      });
      
      // Step 3: Reserve inventory
      const reservation = await saga.execute('reserve-inventory', {
        orderId: order.id,
        items: transactionData.items
      });
      
      // Commit all changes
      await saga.commit();
      
      return { customer, order, reservation };
      
    } catch (error) {
      // Compensate for partial failures
      await saga.compensate();
      throw new Error(\`Transaction failed: \${error.message}\`);
    }
  }
}
\`\`\`

## Implementation Patterns

### MCP Server Implementation Pattern

#### Standard Server Structure
\`\`\`javascript
// File: src/servers/BaseERPServer.js
// Standard foundation for all ERP MCP servers

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { EventEmitter } from 'events';

export class BaseERPServer extends EventEmitter {
  constructor(config) {
    super();
    this.config = config;
    this.server = new Server(config.serverInfo, config.capabilities);
    this.resources = new Map();
    this.prompts = new Map();
    this.tools = new Map();
    this.middleware = [];
    
    this.setupBaseHandlers();
  }
  
  setupBaseHandlers() {
    // Resource handling
    this.server.setRequestHandler(ListResourcesRequestSchema, 
      this.handleListResources.bind(this));
    this.server.setRequestHandler(ReadResourceRequestSchema, 
      this.handleReadResource.bind(this));
    
    // Prompt handling
    this.server.setRequestHandler(ListPromptsRequestSchema, 
      this.handleListPrompts.bind(this));
    this.server.setRequestHandler(GetPromptRequestSchema, 
      this.handleGetPrompt.bind(this));
    
    // Tool handling (if supported)
    if (this.config.capabilities.tools) {
      this.server.setRequestHandler(ListToolsRequestSchema, 
        this.handleListTools.bind(this));
      this.server.setRequestHandler(CallToolRequestSchema, 
        this.handleCallTool.bind(this));
    }
  }
  
  // Resource management
  registerResource(uri, handler, metadata) {
    this.resources.set(uri, {
      handler,
      metadata: {
        mimeType: 'text/plain',
        ...metadata
      }
    });
  }
  
  async handleReadResource(request) {
    const { uri } = request.params;
    const resource = this.resources.get(uri);
    
    if (!resource) {
      throw new Error(\`Resource not found: \${uri}\`);
    }
    
    try {
      const content = await resource.handler(request);
      return {
        contents: [{
          uri,
          mimeType: resource.metadata.mimeType,
          text: typeof content === 'string' ? content : JSON.stringify(content, null, 2)
        }]
      };
    } catch (error) {
      this.emit('error', { type: 'resource-error', uri, error });
      throw new Error(\`Failed to read resource \${uri}: \${error.message}\`);
    }
  }
  
  // Middleware support
  use(middleware) {
    this.middleware.push(middleware);
  }
  
  async executeWithMiddleware(operation, context) {
    let index = 0;
    
    const next = async () => {
      if (index < this.middleware.length) {
        const middleware = this.middleware[index++];
        return await middleware(context, next);
      }
      return await operation(context);
    };
    
    return await next();
  }
  
  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    this.emit('server-started', { config: this.config });
  }
}
\`\`\`

### Resource Provider Pattern
\`\`\`javascript
// File: src/patterns/ResourceProvider.js
// Standardized resource provision pattern

export class ResourceProvider {
  constructor(dataSource) {
    this.dataSource = dataSource;
    this.cache = new Map();
    this.cacheTTL = 5 * 60 * 1000; // 5 minutes
  }
  
  async getResource(resourceId, options = {}) {
    const cacheKey = this.generateCacheKey(resourceId, options);
    
    // Check cache first
    if (this.cache.has(cacheKey) && !options.skipCache) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTTL) {
        return cached.data;
      }
    }
    
    // Fetch fresh data
    const data = await this.fetchResource(resourceId, options);
    
    // Cache the result
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }
  
  async fetchResource(resourceId, options) {
    // Template method - override in subclasses
    throw new Error('fetchResource must be implemented by subclass');
  }
  
  generateCacheKey(resourceId, options) {
    return \`\${resourceId}:\${JSON.stringify(options)}\`;
  }
  
  invalidateCache(pattern) {
    for (const [key] of this.cache) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }
}

// Example implementation
export class CustomerResourceProvider extends ResourceProvider {
  async fetchResource(customerId, options) {
    const { includeOrders, includeAnalytics } = options;
    
    const customer = await this.dataSource.getCustomer(customerId);
    
    if (includeOrders) {
      customer.orders = await this.dataSource.getCustomerOrders(customerId);
    }
    
    if (includeAnalytics) {
      customer.analytics = await this.dataSource.getCustomerAnalytics(customerId);
    }
    
    return customer;
  }
}
\`\`\`

### Business Service Pattern
\`\`\`javascript
// File: src/patterns/BusinessService.js
// Standard business service implementation

export class BusinessService {
  constructor(dependencies) {
    this.dataAccess = dependencies.dataAccess;
    this.validator = dependencies.validator;
    this.eventBus = dependencies.eventBus;
    this.logger = dependencies.logger;
  }
  
  async executeBusinessOperation(operation, data, context) {
    const operationId = this.generateOperationId();
    
    try {
      // 1. Pre-validation
      await this.validateOperation(operation, data, context);
      
      // 2. Pre-processing
      const processedData = await this.preProcess(operation, data, context);
      
      // 3. Execute business logic
      const result = await this.executeCore(operation, processedData, context);
      
      // 4. Post-processing
      const finalResult = await this.postProcess(operation, result, context);
      
      // 5. Emit success event
      this.eventBus.emit(\`\${operation}.completed\`, {
        operationId,
        data: finalResult,
        context
      });
      
      return finalResult;
      
    } catch (error) {
      // Error handling and compensation
      await this.handleError(operation, error, context);
      
      this.eventBus.emit(\`\${operation}.failed\`, {
        operationId,
        error: error.message,
        context
      });
      
      throw error;
    }
  }
  
  async validateOperation(operation, data, context) {
    if (!this.validator) return;
    
    const validationResult = await this.validator.validate(operation, data);
    if (!validationResult.isValid) {
      throw new ValidationError(validationResult.errors);
    }
  }
  
  async preProcess(operation, data, context) {
    // Override in subclasses for specific preprocessing
    return data;
  }
  
  async executeCore(operation, data, context) {
    // Template method - implement in subclasses
    throw new Error('executeCore must be implemented by subclass');
  }
  
  async postProcess(operation, result, context) {
    // Override in subclasses for specific postprocessing
    return result;
  }
  
  async handleError(operation, error, context) {
    this.logger.error(\`Operation \${operation} failed\`, {
      error: error.message,
      stack: error.stack,
      context
    });
    
    // Implement compensation logic if needed
  }
  
  generateOperationId() {
    return \`op_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
  }
}
\`\`\`

## Data Management Patterns

### Repository Pattern Implementation
\`\`\`javascript
// File: src/patterns/Repository.js
// Data access abstraction layer

export class Repository {
  constructor(connection, entityName) {
    this.connection = connection;
    this.entityName = entityName;
    this.tableName = this.toSnakeCase(entityName);
  }
  
  async findById(id) {
    const query = \`SELECT * FROM \${this.tableName} WHERE id = $1 AND deleted_at IS NULL\`;
    const result = await this.connection.query(query, [id]);
    return result.rows.length > 0 ? this.mapToEntity(result.rows[0]) : null;
  }
  
  async findBy(criteria, options = {}) {
    const { query, values } = this.buildQuery(criteria, options);
    const result = await this.connection.query(query, values);
    return result.rows.map(row => this.mapToEntity(row));
  }
  
  async create(entityData) {
    const { fields, values, placeholders } = this.buildInsertQuery(entityData);
    
    const query = \`
      INSERT INTO \${this.tableName} (\${fields.join(', ')})
      VALUES (\${placeholders.join(', ')})
      RETURNING *
    \`;
    
    const result = await this.connection.query(query, values);
    return this.mapToEntity(result.rows[0]);
  }
  
  async update(id, updateData) {
    const { setClause, values } = this.buildUpdateQuery(updateData);
    values.push(id);
    
    const query = \`
      UPDATE \${this.tableName} 
      SET \${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $\${values.length} AND deleted_at IS NULL
      RETURNING *
    \`;
    
    const result = await this.connection.query(query, values);
    return result.rows.length > 0 ? this.mapToEntity(result.rows[0]) : null;
  }
  
  async delete(id, soft = true) {
    if (soft) {
      return await this.update(id, { deleted_at: new Date() });
    } else {
      const query = \`DELETE FROM \${this.tableName} WHERE id = $1\`;
      await this.connection.query(query, [id]);
      return true;
    }
  }
  
  buildQuery(criteria, options) {
    const conditions = [];
    const values = [];
    let paramCount = 1;
    
    // Always exclude soft-deleted records
    conditions.push('deleted_at IS NULL');
    
    // Build WHERE conditions
    for (const [field, value] of Object.entries(criteria)) {
      if (value !== undefined && value !== null) {
        conditions.push(\`\${this.toSnakeCase(field)} = $\${paramCount}\`);
        values.push(value);
        paramCount++;
      }
    }
    
    let query = \`SELECT * FROM \${this.tableName} WHERE \${conditions.join(' AND ')}\`;
    
    // Add ORDER BY
    if (options.orderBy) {
      query += \` ORDER BY \${this.toSnakeCase(options.orderBy)}\`;
      if (options.orderDirection) {
        query += \` \${options.orderDirection.toUpperCase()}\`;
      }
    }
    
    // Add LIMIT and OFFSET
    if (options.limit) {
      query += \` LIMIT \${options.limit}\`;
    }
    if (options.offset) {
      query += \` OFFSET \${options.offset}\`;
    }
    
    return { query, values };
  }
  
  buildInsertQuery(entityData) {
    const fields = Object.keys(entityData).map(key => this.toSnakeCase(key));
    const values = Object.values(entityData);
    const placeholders = values.map((_, index) => \`$\${index + 1}\`);
    
    return { fields, values, placeholders };
  }
  
  buildUpdateQuery(updateData) {
    const setClauses = [];
    const values = [];
    let paramCount = 1;
    
    for (const [field, value] of Object.entries(updateData)) {
      if (value !== undefined) {
        setClauses.push(\`\${this.toSnakeCase(field)} = $\${paramCount}\`);
        values.push(value);
        paramCount++;
      }
    }
    
    return { setClause: setClauses.join(', '), values };
  }
  
  mapToEntity(row) {
    // Convert snake_case to camelCase
    const entity = {};
    for (const [key, value] of Object.entries(row)) {
      entity[this.toCamelCase(key)] = value;
    }
    return entity;
  }
  
  toSnakeCase(str) {
    return str.replace(/[A-Z]/g, letter => \`_\${letter.toLowerCase()}\`);
  }
  
  toCamelCase(str) {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }
}
\`\`\`

### Unit of Work Pattern
\`\`\`javascript
// File: src/patterns/UnitOfWork.js
// Transaction management and change tracking

export class UnitOfWork {
  constructor(connection) {
    this.connection = connection;
    this.newEntities = new Map();
    this.dirtyEntities = new Map();
    this.deletedEntities = new Map();
    this.isInTransaction = false;
  }
  
  registerNew(entity, repository) {
    const id = this.generateTempId();
    this.newEntities.set(id, { entity, repository });
    return id;
  }
  
  registerDirty(entity, repository) {
    const id = entity.id;
    this.dirtyEntities.set(id, { entity, repository });
  }
  
  registerDeleted(entity, repository) {
    const id = entity.id;
    this.deletedEntities.set(id, { entity, repository });
  }
  
  async commit() {
    if (this.isEmpty()) {
      return [];
    }
    
    const client = await this.connection.getClient();
    const results = [];
    
    try {
      await client.query('BEGIN');
      this.isInTransaction = true;
      
      // Insert new entities
      for (const [tempId, { entity, repository }] of this.newEntities) {
        const result = await repository.create(entity);
        results.push({ operation: 'create', entity: result });
      }
      
      // Update dirty entities
      for (const [id, { entity, repository }] of this.dirtyEntities) {
        const result = await repository.update(id, entity);
        results.push({ operation: 'update', entity: result });
      }
      
      // Delete entities
      for (const [id, { entity, repository }] of this.deletedEntities) {
        await repository.delete(id);
        results.push({ operation: 'delete', entity });
      }
      
      await client.query('COMMIT');
      this.clear();
      
      return results;
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
      this.isInTransaction = false;
    }
  }
  
  async rollback() {
    if (this.isInTransaction) {
      const client = await this.connection.getClient();
      await client.query('ROLLBACK');
      client.release();
    }
    this.clear();
  }
  
  clear() {
    this.newEntities.clear();
    this.dirtyEntities.clear();
    this.deletedEntities.clear();
  }
  
  isEmpty() {
    return this.newEntities.size === 0 && 
           this.dirtyEntities.size === 0 && 
           this.deletedEntities.size === 0;
  }
  
  generateTempId() {
    return \`temp_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
  }
}
\`\`\`

## Integration Patterns

### API Integration Pattern
\`\`\`javascript
// File: src/patterns/APIIntegration.js
// Standardized external API integration

export class APIIntegration {
  constructor(config) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout || 30000;
    this.retryAttempts = config.retryAttempts || 3;
    this.retryDelay = config.retryDelay || 1000;
    this.authConfig = config.auth;
    this.interceptors = {
      request: [],
      response: []
    };
    
    this.setupDefaultInterceptors();
  }
  
  setupDefaultInterceptors() {
    // Request interceptor for authentication
    this.addRequestInterceptor(async (config) => {
      if (this.authConfig) {
        config.headers.Authorization = await this.getAuthHeader();
      }
      return config;
    });
    
    // Response interceptor for error handling
    this.addResponseInterceptor(
      (response) => response,
      (error) => this.handleAPIError(error)
    );
  }
  
  async request(config) {
    let lastError;
    
    for (let attempt = 0; attempt < this.retryAttempts; attempt++) {
      try {
        // Apply request interceptors
        let requestConfig = { ...config };
        for (const interceptor of this.interceptors.request) {
          requestConfig = await interceptor(requestConfig);
        }
        
        // Make the request
        const response = await this.executeRequest(requestConfig);
        
        // Apply response interceptors
        let finalResponse = response;
        for (const interceptor of this.interceptors.response) {
          finalResponse = await interceptor.fulfilled(finalResponse);
        }
        
        return finalResponse;
        
      } catch (error) {
        lastError = error;
        
        // Apply error interceptors
        for (const interceptor of this.interceptors.response) {
          if (interceptor.rejected) {
            try {
              return await interceptor.rejected(error);
            } catch (interceptorError) {
              lastError = interceptorError;
            }
          }
        }
        
        // Retry logic
        if (attempt < this.retryAttempts - 1 && this.shouldRetry(error)) {
          await this.delay(this.retryDelay * Math.pow(2, attempt));
          continue;
        }
        
        break;
      }
    }
    
    throw lastError;
  }
  
  async get(url, config = {}) {
    return this.request({ ...config, method: 'GET', url });
  }
  
  async post(url, data, config = {}) {
    return this.request({ ...config, method: 'POST', url, data });
  }
  
  async put(url, data, config = {}) {
    return this.request({ ...config, method: 'PUT', url, data });
  }
  
  async delete(url, config = {}) {
    return this.request({ ...config, method: 'DELETE', url });
  }
  
  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor);
  }
  
  addResponseInterceptor(fulfilled, rejected) {
    this.interceptors.response.push({ fulfilled, rejected });
  }
  
  shouldRetry(error) {
    // Retry on network errors and 5xx status codes
    return !error.response || 
           (error.response.status >= 500 && error.response.status < 600);
  }
  
  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async getAuthHeader() {
    switch (this.authConfig.type) {
      case 'bearer':
        return \`Bearer \${this.authConfig.token}\`;
      case 'basic':
        const credentials = btoa(\`\${this.authConfig.username}:\${this.authConfig.password}\`);
        return \`Basic \${credentials}\`;
      case 'oauth2':
        return \`Bearer \${await this.getOAuthToken()}\`;
      default:
        return '';
    }
  }
  
  handleAPIError(error) {
    if (error.response) {
      // Server responded with error status
      throw new APIError(
        \`API request failed: \${error.response.status} \${error.response.statusText}\`,
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // Request was made but no response received
      throw new APIError('No response received from API', 0, null);
    } else {
      // Something else happened
      throw new APIError(\`Request setup failed: \${error.message}\`, 0, null);
    }
  }
}

export class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}
\`\`\`

## Testing Patterns

### Test Utilities and Patterns
\`\`\`javascript
// File: tests/utils/MCPTestUtils.js
// Standard testing utilities for MCP servers

export class MCPTestUtils {
  static async createTestServer(serverClass, config = {}) {
    const testConfig = {
      ...this.getDefaultTestConfig(),
      ...config
    };
    
    const server = new serverClass(testConfig);
    await server.start();
    
    return server;
  }
  
  static async createTestClient(server) {
    const client = new MCPTestClient();
    await client.connect(server);
    return client;
  }
  
  static getDefaultTestConfig() {
    return {
      serverInfo: {
        name: 'test-server',
        version: '1.0.0'
      },
      capabilities: {
        resources: {},
        prompts: {}
      },
      database: {
        host: 'localhost',
        port: 5432,
        database: 'test_db',
        username: 'test_user',
        password: 'test_pass'
      }
    };
  }
  
  static async setupTestDatabase() {
    // Database setup logic
    const db = new TestDatabase();
    await db.migrate();
    await db.seed();
    return db;
  }
  
  static async teardownTestDatabase(db) {
    await db.clean();
    await db.close();
  }
  
  static createMockRepository(entityName) {
    return {
      findById: jest.fn(),
      findBy: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    };
  }
  
  static createMockService(serviceName) {
    return {
      executeBusinessOperation: jest.fn(),
      validateOperation: jest.fn(),
      preProcess: jest.fn(),
      executeCore: jest.fn(),
      postProcess: jest.fn()
    };
  }
}

// Example test implementation
describe('Customer MCP Server', () => {
  let server;
  let client;
  let testDb;
  
  beforeAll(async () => {
    testDb = await MCPTestUtils.setupTestDatabase();
    server = await MCPTestUtils.createTestServer(CustomerMCPServer);
    client = await MCPTestUtils.createTestClient(server);
  });
  
  afterAll(async () => {
    await client.disconnect();
    await server.stop();
    await MCPTestUtils.teardownTestDatabase(testDb);
  });
  
  describe('Resource Operations', () => {
    test('should list customer resources', async () => {
      const resources = await client.listResources();
      expect(resources.resources).toContainEqual(
        expect.objectContaining({
          uri: 'customer://list/active',
          name: 'Active Customers'
        })
      );
    });
    
    test('should retrieve customer data', async () => {
      // Create test customer
      const customer = await testDb.createCustomer({
        name: 'Test Customer',
        email: 'test@example.com'
      });
      
      // Retrieve through MCP
      const response = await client.readResource('customer://list/active');
      const data = JSON.parse(response.contents[0].text);
      
      expect(data.customers).toContainEqual(
        expect.objectContaining({
          id: customer.id,
          name: 'Test Customer'
        })
      );
    });
  });
});
\`\`\`

## Configuration Management

### Environment-Based Configuration
\`\`\`javascript
// File: src/config/ConfigManager.js
// Centralized configuration management

export class ConfigManager {
  constructor() {
    this.config = this.loadConfiguration();
    this.validate();
  }
  
  loadConfiguration() {
    const env = process.env.NODE_ENV || 'development';
    
    const baseConfig = {
      server: {
        name: process.env.SERVER_NAME || 'mcp-erp-server',
        version: process.env.SERVER_VERSION || '1.0.0',
        port: parseInt(process.env.PORT) || 3000
      },
      database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME || 'mcp_erp',
        username: process.env.DB_USER || 'mcp_user',
        password: process.env.DB_PASSWORD || '',
        pool: {
          min: parseInt(process.env.DB_POOL_MIN) || 2,
          max: parseInt(process.env.DB_POOL_MAX) || 10
        }
      },
      cache: {
        type: process.env.CACHE_TYPE || 'memory',
        ttl: parseInt(process.env.CACHE_TTL) || 300,
        redis: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT) || 6379
        }
      },
      logging: {
        level: process.env.LOG_LEVEL || 'info',
        format: process.env.LOG_FORMAT || 'json'
      }
    };
    
    // Environment-specific overrides
    const envConfig = this.loadEnvironmentConfig(env);
    
    return this.mergeConfigs(baseConfig, envConfig);
  }
  
  loadEnvironmentConfig(env) {
    try {
      return require(\`./environments/\${env}.js\`);
    } catch (error) {
      console.warn(\`No environment config found for \${env}, using defaults\`);
      return {};
    }
  }
  
  mergeConfigs(base, override) {
    const result = { ...base };
    
    for (const [key, value] of Object.entries(override)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result[key] = this.mergeConfigs(result[key] || {}, value);
      } else {
        result[key] = value;
      }
    }
    
    return result;
  }
  
  validate() {
    const required = [
      'server.name',
      'database.host',
      'database.database',
      'database.username'
    ];
    
    for (const path of required) {
      if (!this.get(path)) {
        throw new Error(\`Required configuration missing: \${path}\`);
      }
    }
  }
  
  get(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], this.config);
  }
  
  set(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, key) => {
      if (!obj[key]) obj[key] = {};
      return obj[key];
    }, this.config);
    
    target[lastKey] = value;
  }
}
\`\`\`

This definitive reference implementation provides the foundational patterns and practices that ensure consistent, maintainable, and scalable MCP ERP systems. All implementations should follow these established patterns to maintain architectural coherence and code quality.
`;