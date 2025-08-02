export default `# 🔧 Technical Implementation Guides

## Overview

This comprehensive guide provides detailed technical implementation procedures for MCP ERP systems, covering everything from development environment setup to production deployment. Each guide includes code examples, best practices, and troubleshooting information.

## Development Environment Setup

### Prerequisites and Dependencies

#### System Requirements
\`\`\`bash
# Node.js version management
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18.17.0
nvm use 18.17.0

# Package manager setup
npm install -g pnpm@8.6.12
npm install -g @modelcontextprotocol/sdk

# Database setup (PostgreSQL)
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql
brew services start postgresql

# Create development database
sudo -u postgres createdb mcp_erp_dev
sudo -u postgres createuser --interactive mcp_erp_user
\`\`\`

#### Project Structure Setup
\`\`\`bash
# Create project directory
mkdir mcp-erp-system
cd mcp-erp-system

# Initialize project
pnpm init

# Install core dependencies
pnpm add @modelcontextprotocol/sdk
pnpm add pg jsonwebtoken bcryptjs
pnpm add express helmet cors compression

# Install development dependencies
pnpm add -D @types/node typescript
pnpm add -D jest supertest @types/jest
pnpm add -D eslint prettier @typescript-eslint/parser
pnpm add -D nodemon ts-node concurrently

# Create standard directory structure
mkdir -p src/{config,services,repositories,middleware,utils}
mkdir -p src/{controllers,models,types,validators}
mkdir -p tests/{unit,integration,e2e}
mkdir -p docs/{api,architecture,deployment}
mkdir -p scripts/{build,deploy,migration}
\`\`\`

### Configuration Management

#### Environment Configuration
\`\`\`typescript
// File: src/config/environment.ts
export interface EnvironmentConfig {
  nodeEnv: string;
  port: number;
  database: DatabaseConfig;
  auth: AuthConfig;
  cache: CacheConfig;
  logging: LoggingConfig;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl: boolean;
  pool: {
    min: number;
    max: number;
    idleTimeoutMillis: number;
  };
}

export interface AuthConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
  bcryptRounds: number;
  sessionTimeout: number;
}

export class ConfigurationManager {
  private static instance: ConfigurationManager;
  private config: EnvironmentConfig;

  private constructor() {
    this.config = this.loadConfiguration();
    this.validateConfiguration();
  }

  static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager();
    }
    return ConfigurationManager.instance;
  }

  private loadConfiguration(): EnvironmentConfig {
    return {
      nodeEnv: process.env.NODE_ENV || 'development',
      port: parseInt(process.env.PORT || '3000'),
      database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'mcp_erp_dev',
        username: process.env.DB_USER || 'mcp_erp_user',
        password: process.env.DB_PASSWORD || '',
        ssl: process.env.DB_SSL === 'true',
        pool: {
          min: parseInt(process.env.DB_POOL_MIN || '2'),
          max: parseInt(process.env.DB_POOL_MAX || '10'),
          idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000')
        }
      },
      auth: {
        jwtSecret: process.env.JWT_SECRET || 'dev-secret-key',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
        bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10'),
        sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || '86400')
      },
      cache: {
        type: process.env.CACHE_TYPE || 'memory',
        ttl: parseInt(process.env.CACHE_TTL || '300'),
        redis: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
          password: process.env.REDIS_PASSWORD || undefined
        }
      },
      logging: {
        level: process.env.LOG_LEVEL || 'info',
        format: process.env.LOG_FORMAT || 'json',
        destination: process.env.LOG_DESTINATION || 'console'
      }
    };
  }

  private validateConfiguration(): void {
    const requiredEnvVars = [
      'DB_HOST', 'DB_NAME', 'DB_USER', 'JWT_SECRET'
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(\`Required environment variable \${envVar} is not set\`);
      }
    }

    if (this.config.nodeEnv === 'production' && this.config.auth.jwtSecret === 'dev-secret-key') {
      throw new Error('JWT_SECRET must be set for production environment');
    }
  }

  getConfig(): EnvironmentConfig {
    return { ...this.config };
  }

  getDatabaseConfig(): DatabaseConfig {
    return { ...this.config.database };
  }

  getAuthConfig(): AuthConfig {
    return { ...this.config.auth };
  }
}
\`\`\`

## Database Implementation

### Connection Management
\`\`\`typescript
// File: src/services/DatabaseService.ts
import { Pool, PoolClient, QueryResult } from 'pg';
import { ConfigurationManager } from '../config/environment';

export class DatabaseService {
  private pool: Pool;
  private isConnected: boolean = false;

  constructor() {
    const config = ConfigurationManager.getInstance().getDatabaseConfig();
    
    this.pool = new Pool({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.username,
      password: config.password,
      ssl: config.ssl,
      min: config.pool.min,
      max: config.pool.max,
      idleTimeoutMillis: config.pool.idleTimeoutMillis,
      connectionTimeoutMillis: 2000,
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.pool.on('connect', (client: PoolClient) => {
      console.log('Database client connected');
    });

    this.pool.on('error', (err: Error) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });

    this.pool.on('acquire', (client: PoolClient) => {
      console.log('Database client acquired from pool');
    });

    this.pool.on('release', (err: Error, client: PoolClient) => {
      if (err) {
        console.error('Error releasing client', err);
      }
    });
  }

  async connect(): Promise<void> {
    try {
      // Test the connection
      const client = await this.pool.connect();
      await client.query('SELECT NOW()');
      client.release();
      
      this.isConnected = true;
      console.log('Database connection established successfully');
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.pool.end();
      this.isConnected = false;
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error;
    }
  }

  async query<T = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
    const start = Date.now();
    
    try {
      const res = await this.pool.query<T>(text, params);
      const duration = Date.now() - start;
      
      console.log('Executed query', {
        text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
        duration: \`\${duration}ms\`,
        rows: res.rowCount
      });
      
      return res;
    } catch (error) {
      const duration = Date.now() - start;
      console.error('Query error', {
        text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
        duration: \`\${duration}ms\`,
        error: error.message
      });
      throw error;
    }
  }

  async getClient(): Promise<PoolClient> {
    return await this.pool.connect();
  }

  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  isHealthy(): boolean {
    return this.isConnected && this.pool.totalCount > 0;
  }

  getConnectionInfo(): any {
    return {
      totalConnections: this.pool.totalCount,
      idleConnections: this.pool.idleCount,
      waitingClients: this.pool.waitingCount
    };
  }
}
\`\`\`

### Migration System
\`\`\`typescript
// File: src/services/MigrationService.ts
import { DatabaseService } from './DatabaseService';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

export interface Migration {
  version: string;
  name: string;
  up: string;
  down: string;
  checksum: string;
}

export class MigrationService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly migrationsPath: string = './migrations'
  ) {}

  async initialize(): Promise<void> {
    // Create migrations table if it doesn't exist
    await this.databaseService.query(\`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        checksum VARCHAR(255) NOT NULL,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    \`);
  }

  async migrate(): Promise<void> {
    await this.initialize();
    
    const pendingMigrations = await this.getPendingMigrations();
    
    if (pendingMigrations.length === 0) {
      console.log('No pending migrations');
      return;
    }

    console.log(\`Running \${pendingMigrations.length} pending migrations\`);

    for (const migration of pendingMigrations) {
      await this.runMigration(migration);
    }

    console.log('All migrations completed successfully');
  }

  async rollback(steps: number = 1): Promise<void> {
    const appliedMigrations = await this.getAppliedMigrations();
    
    if (appliedMigrations.length === 0) {
      console.log('No migrations to rollback');
      return;
    }

    const migrationsToRollback = appliedMigrations
      .slice(-steps)
      .reverse();

    console.log(\`Rolling back \${migrationsToRollback.length} migrations\`);

    for (const migration of migrationsToRollback) {
      await this.rollbackMigration(migration);
    }

    console.log('Rollback completed successfully');
  }

  private async getPendingMigrations(): Promise<Migration[]> {
    const allMigrations = await this.loadMigrations();
    const appliedVersions = await this.getAppliedVersions();
    
    return allMigrations.filter(
      migration => !appliedVersions.includes(migration.version)
    );
  }

  private async getAppliedMigrations(): Promise<Migration[]> {
    const result = await this.databaseService.query(
      'SELECT version, name FROM schema_migrations ORDER BY version DESC'
    );
    
    const allMigrations = await this.loadMigrations();
    const migrationMap = new Map(
      allMigrations.map(m => [m.version, m])
    );
    
    return result.rows
      .map(row => migrationMap.get(row.version))
      .filter(Boolean) as Migration[];
  }

  private async getAppliedVersions(): Promise<string[]> {
    const result = await this.databaseService.query(
      'SELECT version FROM schema_migrations ORDER BY version'
    );
    
    return result.rows.map(row => row.version);
  }

  private async loadMigrations(): Promise<Migration[]> {
    const files = await readdir(this.migrationsPath);
    const migrationFiles = files
      .filter(file => file.endsWith('.sql'))
      .sort();

    const migrations: Migration[] = [];

    for (const file of migrationFiles) {
      const content = await readFile(join(this.migrationsPath, file), 'utf-8');
      const migration = this.parseMigrationFile(file, content);
      migrations.push(migration);
    }

    return migrations;
  }

  private parseMigrationFile(filename: string, content: string): Migration {
    const match = filename.match(/^(\d+)_(.+)\.sql$/);
    if (!match) {
      throw new Error(\`Invalid migration filename: \${filename}\`);
    }

    const [, version, name] = match;
    
    // Split content by -- +migrate Down comment
    const parts = content.split(/-- \+migrate Down/i);
    if (parts.length !== 2) {
      throw new Error(\`Migration \${filename} must contain '-- +migrate Down' separator\`);
    }

    const up = parts[0].replace(/-- \+migrate Up/i, '').trim();
    const down = parts[1].trim();

    return {
      version,
      name: name.replace(/_/g, ' '),
      up,
      down,
      checksum: this.calculateChecksum(content)
    };
  }

  private async runMigration(migration: Migration): Promise<void> {
    console.log(\`Applying migration: \${migration.version} - \${migration.name}\`);

    await this.databaseService.transaction(async (client) => {
      // Run the migration
      await client.query(migration.up);
      
      // Record the migration
      await client.query(
        \`INSERT INTO schema_migrations (version, name, checksum) 
         VALUES ($1, $2, $3)\`,
        [migration.version, migration.name, migration.checksum]
      );
    });

    console.log(\`Migration \${migration.version} applied successfully\`);
  }

  private async rollbackMigration(migration: Migration): Promise<void> {
    console.log(\`Rolling back migration: \${migration.version} - \${migration.name}\`);

    await this.databaseService.transaction(async (client) => {
      // Run the rollback
      await client.query(migration.down);
      
      // Remove the migration record
      await client.query(
        'DELETE FROM schema_migrations WHERE version = $1',
        [migration.version]
      );
    });

    console.log(\`Migration \${migration.version} rolled back successfully\`);
  }

  private calculateChecksum(content: string): string {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(content).digest('hex');
  }
}
\`\`\`

### Example Migration File
\`\`\`sql
-- File: migrations/001_create_customers_table.sql

-- +migrate Up
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    external_id VARCHAR(50) UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    customer_type VARCHAR(50) DEFAULT 'standard',
    credit_limit DECIMAL(10,2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'active',
    address JSONB DEFAULT '{}'::jsonb,
    preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER,
    deleted_at TIMESTAMP NULL,
    deleted_by INTEGER,
    version INTEGER DEFAULT 1,
    metadata JSONB DEFAULT '{}'::jsonb,
    
    CONSTRAINT customers_email_check 
        CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT customers_status_check 
        CHECK (status IN ('active', 'inactive', 'suspended')),
    CONSTRAINT customers_type_check 
        CHECK (customer_type IN ('standard', 'premium', 'enterprise'))
);

-- Create indexes
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_external_id ON customers(external_id);
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_customers_created_at ON customers(created_at);
CREATE INDEX idx_customers_deleted_at ON customers(deleted_at);

-- Create update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_customers_updated_at 
    BEFORE UPDATE ON customers
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- +migrate Down
DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP TABLE IF EXISTS customers;
\`\`\`

## MCP Server Implementation

### Core Server Setup
\`\`\`typescript
// File: src/servers/ERPMCPServer.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

export class ERPMCPServer {
  private server: Server;
  private resourceProviders: Map<string, ResourceProvider> = new Map();
  private promptProviders: Map<string, PromptProvider> = new Map();

  constructor(private config: ServerConfig) {
    this.server = new Server(
      {
        name: config.name,
        version: config.version,
      },
      {
        capabilities: {
          resources: {},
          prompts: {},
        },
      }
    );

    this.setupHandlers();
    this.registerProviders();
  }

  private setupHandlers(): void {
    // Resource handlers
    this.server.setRequestHandler(
      ListResourcesRequestSchema,
      this.handleListResources.bind(this)
    );

    this.server.setRequestHandler(
      ReadResourceRequestSchema,
      this.handleReadResource.bind(this)
    );

    // Prompt handlers
    this.server.setRequestHandler(
      ListPromptsRequestSchema,
      this.handleListPrompts.bind(this)
    );

    this.server.setRequestHandler(
      GetPromptRequestSchema,
      this.handleGetPrompt.bind(this)
    );
  }

  private registerProviders(): void {
    // Register resource providers
    this.resourceProviders.set('customers', new CustomerResourceProvider());
    this.resourceProviders.set('orders', new OrderResourceProvider());
    this.resourceProviders.set('products', new ProductResourceProvider());
    this.resourceProviders.set('inventory', new InventoryResourceProvider());

    // Register prompt providers
    this.promptProviders.set('create-customer', new CreateCustomerPromptProvider());
    this.promptProviders.set('search-orders', new SearchOrdersPromptProvider());
    this.promptProviders.set('generate-report', new GenerateReportPromptProvider());
  }

  async handleListResources(): Promise<any> {
    const resources: any[] = [];

    for (const [type, provider] of this.resourceProviders) {
      const providerResources = await provider.listResources();
      resources.push(...providerResources);
    }

    return { resources };
  }

  async handleReadResource(request: any): Promise<any> {
    const { uri } = request.params;
    
    // Parse URI to determine provider
    const { provider, resourceId } = this.parseResourceURI(uri);
    
    const resourceProvider = this.resourceProviders.get(provider);
    if (!resourceProvider) {
      throw new Error(\`Unknown resource provider: \${provider}\`);
    }

    const resource = await resourceProvider.getResource(resourceId);
    if (!resource) {
      throw new Error(\`Resource not found: \${uri}\`);
    }

    return {
      contents: [
        {
          uri,
          mimeType: resource.mimeType || 'application/json',
          text: typeof resource.content === 'string' 
            ? resource.content 
            : JSON.stringify(resource.content, null, 2)
        }
      ]
    };
  }

  async handleListPrompts(): Promise<any> {
    const prompts: any[] = [];

    for (const [name, provider] of this.promptProviders) {
      const promptInfo = await provider.getPromptInfo();
      prompts.push({
        name,
        description: promptInfo.description,
        arguments: promptInfo.arguments
      });
    }

    return { prompts };
  }

  async handleGetPrompt(request: any): Promise<any> {
    const { name, arguments: args } = request.params;
    
    const promptProvider = this.promptProviders.get(name);
    if (!promptProvider) {
      throw new Error(\`Unknown prompt: \${name}\`);
    }

    return await promptProvider.generatePrompt(args);
  }

  private parseResourceURI(uri: string): { provider: string; resourceId: string } {
    // Expected format: erp://provider/resourceId
    const match = uri.match(/^erp:\/\/([^\/]+)\/(.+)$/);
    if (!match) {
      throw new Error(\`Invalid resource URI format: \${uri}\`);
    }

    return {
      provider: match[1],
      resourceId: match[2]
    };
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.log(\`MCP ERP Server \${this.config.name} started successfully\`);
  }

  async stop(): Promise<void> {
    // Cleanup resources
    console.log(\`MCP ERP Server \${this.config.name} stopped\`);
  }
}
\`\`\`

### Resource Provider Implementation
\`\`\`typescript
// File: src/providers/CustomerResourceProvider.ts
export interface ResourceProvider {
  listResources(): Promise<ResourceMetadata[]>;
  getResource(resourceId: string): Promise<Resource | null>;
}

export class CustomerResourceProvider implements ResourceProvider {
  constructor(
    private readonly customerService: CustomerService,
    private readonly cacheService: CacheService
  ) {}

  async listResources(): Promise<ResourceMetadata[]> {
    return [
      {
        uri: 'erp://customers/list',
        name: 'Customer List',
        description: 'List of all active customers',
        mimeType: 'application/json'
      },
      {
        uri: 'erp://customers/analytics',
        name: 'Customer Analytics',
        description: 'Customer analytics and metrics',
        mimeType: 'application/json'
      },
      {
        uri: 'erp://customers/segments',
        name: 'Customer Segments',
        description: 'Customer segmentation data',
        mimeType: 'application/json'
      }
    ];
  }

  async getResource(resourceId: string): Promise<Resource | null> {
    const cacheKey = \`customer-resource:\${resourceId}\`;
    
    // Try cache first
    let resource = await this.cacheService.get(cacheKey);
    if (resource) {
      return resource;
    }

    // Generate resource based on ID
    switch (resourceId) {
      case 'list':
        resource = await this.generateCustomerList();
        break;
      case 'analytics':
        resource = await this.generateCustomerAnalytics();
        break;
      case 'segments':
        resource = await this.generateCustomerSegments();
        break;
      default:
        // Check if it's a specific customer ID
        if (resourceId.match(/^\d+$/)) {
          resource = await this.generateCustomerDetails(parseInt(resourceId));
        }
        break;
    }

    if (resource) {
      // Cache for 5 minutes
      await this.cacheService.set(cacheKey, resource, 300);
    }

    return resource;
  }

  private async generateCustomerList(): Promise<Resource> {
    const customers = await this.customerService.getActiveCustomers({
      limit: 100,
      includeMetrics: true
    });

    const content = {
      title: 'Active Customers',
      description: 'List of all active customers with basic metrics',
      totalCount: customers.length,
      customers: customers.map(customer => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        customerType: customer.customerType,
        status: customer.status,
        totalOrders: customer.metrics?.totalOrders || 0,
        totalRevenue: customer.metrics?.totalRevenue || 0,
        lastOrderDate: customer.metrics?.lastOrderDate,
        createdAt: customer.createdAt
      })),
      lastUpdated: new Date().toISOString()
    };

    return {
      content,
      mimeType: 'application/json'
    };
  }

  private async generateCustomerAnalytics(): Promise<Resource> {
    const analytics = await this.customerService.getCustomerAnalytics();

    const content = {
      title: 'Customer Analytics',
      description: 'Comprehensive customer analytics and insights',
      metrics: {
        totalCustomers: analytics.totalCustomers,
        activeCustomers: analytics.activeCustomers,
        newCustomersThisMonth: analytics.newCustomersThisMonth,
        customerGrowthRate: analytics.customerGrowthRate,
        averageCustomerValue: analytics.averageCustomerValue,
        customerRetentionRate: analytics.customerRetentionRate
      },
      segmentation: {
        byType: analytics.customersByType,
        byRegion: analytics.customersByRegion,
        byValue: analytics.customersByValue
      },
      trends: {
        acquisitionTrend: analytics.acquisitionTrend,
        revenueTrend: analytics.revenueTrend,
        churnTrend: analytics.churnTrend
      },
      lastUpdated: new Date().toISOString()
    };

    return {
      content,
      mimeType: 'application/json'
    };
  }

  private async generateCustomerDetails(customerId: number): Promise<Resource | null> {
    const customer = await this.customerService.getCustomerById(customerId);
    if (!customer) {
      return null;
    }

    const orders = await this.customerService.getCustomerOrders(customerId, { limit: 10 });
    const analytics = await this.customerService.getCustomerAnalytics(customerId);

    const content = {
      title: \`Customer Details - \${customer.name}\`,
      description: \`Detailed information for customer \${customer.name}\`,
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        customerType: customer.customerType,
        status: customer.status,
        creditLimit: customer.creditLimit,
        preferences: customer.preferences,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt
      },
      recentOrders: orders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        totalAmount: order.totalAmount,
        orderDate: order.orderDate,
        itemCount: order.items.length
      })),
      analytics: {
        totalOrders: analytics.totalOrders,
        totalRevenue: analytics.totalRevenue,
        averageOrderValue: analytics.averageOrderValue,
        lastOrderDate: analytics.lastOrderDate,
        customerSince: analytics.customerSince,
        lifetimeValue: analytics.lifetimeValue
      },
      lastUpdated: new Date().toISOString()
    };

    return {
      content,
      mimeType: 'application/json'
    };
  }
}
\`\`\`

## Authentication and Security

### JWT Authentication Implementation
\`\`\`typescript
// File: src/middleware/AuthenticationMiddleware.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ConfigurationManager } from '../config/environment';

export interface AuthenticatedUser {
  id: number;
  email: string;
  roles: string[];
  permissions: string[];
}

export interface AuthenticationContext {
  user: AuthenticatedUser;
  token: string;
  expiresAt: Date;
}

export class AuthenticationService {
  private config = ConfigurationManager.getInstance().getAuthConfig();

  async authenticateCredentials(email: string, password: string): Promise<AuthenticationContext> {
    // Validate user credentials
    const user = await this.validateCredentials(email, password);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken(user);
    const decoded = jwt.decode(token) as any;

    return {
      user,
      token,
      expiresAt: new Date(decoded.exp * 1000)
    };
  }

  async validateToken(token: string): Promise<AuthenticatedUser> {
    try {
      const decoded = jwt.verify(token, this.config.jwtSecret) as any;
      
      // Check if user still exists and is active
      const user = await this.getUserById(decoded.userId);
      if (!user || user.status !== 'active') {
        throw new UnauthorizedError('User account is inactive');
      }

      return user;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError('Invalid token');
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError('Token expired');
      }
      throw error;
    }
  }

  async refreshToken(currentToken: string): Promise<AuthenticationContext> {
    const user = await this.validateToken(currentToken);
    const newToken = this.generateToken(user);
    const decoded = jwt.decode(newToken) as any;

    return {
      user,
      token: newToken,
      expiresAt: new Date(decoded.exp * 1000)
    };
  }

  private async validateCredentials(email: string, password: string): Promise<AuthenticatedUser | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return null;
    }

    const roles = await this.userRepository.getUserRoles(user.id);
    const permissions = await this.userRepository.getUserPermissions(user.id);

    return {
      id: user.id,
      email: user.email,
      roles: roles.map(role => role.name),
      permissions: permissions.map(permission => permission.name)
    };
  }

  private generateToken(user: AuthenticatedUser): string {
    const payload = {
      userId: user.id,
      email: user.email,
      roles: user.roles,
      permissions: user.permissions
    };

    return jwt.sign(payload, this.config.jwtSecret, {
      expiresIn: this.config.jwtExpiresIn,
      issuer: 'mcp-erp-system',
      audience: 'mcp-erp-client'
    });
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.config.bcryptRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

// Authentication Middleware
export class AuthenticationMiddleware {
  constructor(private authService: AuthenticationService) {}

  async authenticate(req: any, res: any, next: any): Promise<void> {
    try {
      const token = this.extractToken(req);
      if (!token) {
        throw new UnauthorizedError('Authentication token required');
      }

      const user = await this.authService.validateToken(token);
      req.user = user;
      req.token = token;

      next();
    } catch (error) {
      res.status(401).json({
        error: 'Authentication failed',
        message: error.message
      });
    }
  }

  private extractToken(req: any): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return null;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }

    return parts[1];
  }
}
\`\`\`

### Role-Based Access Control
\`\`\`typescript
// File: src/middleware/AuthorizationMiddleware.ts
export interface Permission {
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

export interface Role {
  name: string;
  permissions: Permission[];
}

export class AuthorizationService {
  private rolePermissions = new Map<string, Permission[]>();

  constructor() {
    this.initializeRoles();
  }

  private initializeRoles(): void {
    // Admin role - full access
    this.rolePermissions.set('admin', [
      { resource: '*', action: '*' }
    ]);

    // Manager role - read/write access to business data
    this.rolePermissions.set('manager', [
      { resource: 'customers', action: 'read' },
      { resource: 'customers', action: 'write' },
      { resource: 'orders', action: 'read' },
      { resource: 'orders', action: 'write' },
      { resource: 'products', action: 'read' },
      { resource: 'inventory', action: 'read' },
      { resource: 'reports', action: 'read' }
    ]);

    // Sales role - customer and order management
    this.rolePermissions.set('sales', [
      { resource: 'customers', action: 'read' },
      { resource: 'customers', action: 'write' },
      { resource: 'orders', action: 'read' },
      { resource: 'orders', action: 'write' },
      { resource: 'products', action: 'read' },
      { resource: 'inventory', action: 'read' }
    ]);

    // Support role - read-only access
    this.rolePermissions.set('support', [
      { resource: 'customers', action: 'read' },
      { resource: 'orders', action: 'read' },
      { resource: 'products', action: 'read' }
    ]);
  }

  async authorize(user: AuthenticatedUser, resource: string, action: string): Promise<boolean> {
    // Check user permissions directly
    const hasDirectPermission = user.permissions.some(permission => 
      this.matchesPermission(permission, resource, action)
    );

    if (hasDirectPermission) {
      return true;
    }

    // Check role-based permissions
    for (const roleName of user.roles) {
      const rolePermissions = this.rolePermissions.get(roleName) || [];
      const hasRolePermission = rolePermissions.some(permission =>
        this.matchesPermission(\`\${permission.resource}:\${permission.action}\`, resource, action)
      );

      if (hasRolePermission) {
        return true;
      }
    }

    return false;
  }

  private matchesPermission(permission: string, resource: string, action: string): boolean {
    const [permResource, permAction] = permission.split(':');
    
    // Wildcard permissions
    if (permResource === '*' || permAction === '*') {
      return true;
    }

    return permResource === resource && permAction === action;
  }

  // Authorization middleware factory
  requirePermission(resource: string, action: string) {
    return async (req: any, res: any, next: any) => {
      try {
        if (!req.user) {
          throw new UnauthorizedError('Authentication required');
        }

        const hasPermission = await this.authorize(req.user, resource, action);
        if (!hasPermission) {
          throw new ForbiddenError(\`Insufficient permissions for \${action} on \${resource}\`);
        }

        next();
      } catch (error) {
        const statusCode = error instanceof ForbiddenError ? 403 : 401;
        res.status(statusCode).json({
          error: 'Authorization failed',
          message: error.message
        });
      }
    };
  }
}
\`\`\`

## Testing Implementation

### Unit Testing Setup
\`\`\`typescript
// File: tests/unit/services/CustomerService.test.ts
import { CustomerService } from '../../../src/services/CustomerService';
import { CustomerRepository } from '../../../src/repositories/CustomerRepository';
import { EventBus } from '../../../src/services/EventBus';

describe('CustomerService', () => {
  let customerService: CustomerService;
  let mockRepository: jest.Mocked<CustomerRepository>;
  let mockEventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      findBy: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn(),
      count: jest.fn()
    } as jest.Mocked<CustomerRepository>;

    mockEventBus = {
      emit: jest.fn(),
      on: jest.fn(),
      off: jest.fn()
    } as jest.Mocked<EventBus>;

    customerService = new CustomerService(mockRepository, mockEventBus);
  });

  describe('createCustomer', () => {
    it('should create a new customer successfully', async () => {
      // Arrange
      const customerData = {
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '(555) 123-4567'
      };

      const savedCustomer = {
        id: 1,
        ...customerData,
        status: 'active',
        createdAt: new Date()
      };

      mockRepository.save.mockResolvedValue(savedCustomer);

      // Act
      const result = await customerService.createCustomer(customerData);

      // Assert
      expect(result).toEqual(savedCustomer);
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(customerData)
      );
      expect(mockEventBus.emit).toHaveBeenCalledWith(
        'customer.created',
        expect.objectContaining({ customerId: 1 })
      );
    });

    it('should throw error for invalid email', async () => {
      // Arrange
      const customerData = {
        name: 'Test Customer',
        email: 'invalid-email',
        phone: '(555) 123-4567'
      };

      // Act & Assert
      await expect(customerService.createCustomer(customerData))
        .rejects.toThrow('Invalid email format');
      
      expect(mockRepository.save).not.toHaveBeenCalled();
      expect(mockEventBus.emit).not.toHaveBeenCalled();
    });

    it('should handle repository errors gracefully', async () => {
      // Arrange
      const customerData = {
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '(555) 123-4567'
      };

      mockRepository.save.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(customerService.createCustomer(customerData))
        .rejects.toThrow('Failed to create customer');
      
      expect(mockEventBus.emit).not.toHaveBeenCalled();
    });
  });

  describe('getCustomerById', () => {
    it('should return customer when found', async () => {
      // Arrange
      const customerId = 1;
      const customer = {
        id: customerId,
        name: 'Test Customer',
        email: 'test@example.com'
      };

      mockRepository.findById.mockResolvedValue(customer);

      // Act
      const result = await customerService.getCustomerById(customerId);

      // Assert
      expect(result).toEqual(customer);
      expect(mockRepository.findById).toHaveBeenCalledWith(customerId);
    });

    it('should return null when customer not found', async () => {
      // Arrange
      const customerId = 999;
      mockRepository.findById.mockResolvedValue(null);

      // Act
      const result = await customerService.getCustomerById(customerId);

      // Assert
      expect(result).toBeNull();
      expect(mockRepository.findById).toHaveBeenCalledWith(customerId);
    });
  });
});
\`\`\`

### Integration Testing
\`\`\`typescript
// File: tests/integration/mcp-server.test.ts
import { ERPMCPServer } from '../../src/servers/ERPMCPServer';
import { TestDatabaseService } from '../utils/TestDatabaseService';
import { TestMCPClient } from '../utils/TestMCPClient';

describe('ERP MCP Server Integration', () => {
  let server: ERPMCPServer;
  let client: TestMCPClient;
  let testDb: TestDatabaseService;

  beforeAll(async () => {
    // Setup test database
    testDb = new TestDatabaseService();
    await testDb.setup();
    await testDb.migrate();
    await testDb.seed();

    // Start MCP server
    server = new ERPMCPServer({
      name: 'test-erp-server',
      version: '1.0.0',
      database: testDb.getConfig()
    });
    await server.start();

    // Connect test client
    client = new TestMCPClient();
    await client.connect(server);
  });

  afterAll(async () => {
    await client.disconnect();
    await server.stop();
    await testDb.teardown();
  });

  beforeEach(async () => {
    await testDb.clean();
    await testDb.seed();
  });

  describe('Resource Operations', () => {
    test('should list all available resources', async () => {
      const response = await client.listResources();
      
      expect(response.resources).toBeDefined();
      expect(Array.isArray(response.resources)).toBe(true);
      expect(response.resources.length).toBeGreaterThan(0);

      // Check for expected resources
      const resourceUris = response.resources.map(r => r.uri);
      expect(resourceUris).toContain('erp://customers/list');
      expect(resourceUris).toContain('erp://orders/list');
      expect(resourceUris).toContain('erp://products/catalog');
    });

    test('should retrieve customer list resource', async () => {
      const response = await client.readResource('erp://customers/list');
      
      expect(response.contents).toBeDefined();
      expect(response.contents[0]).toHaveProperty('text');
      
      const data = JSON.parse(response.contents[0].text);
      expect(data).toHaveProperty('title', 'Active Customers');
      expect(data).toHaveProperty('customers');
      expect(Array.isArray(data.customers)).toBe(true);
    });

    test('should handle non-existent resources', async () => {
      await expect(client.readResource('erp://nonexistent/resource'))
        .rejects.toThrow('Resource not found');
    });
  });

  describe('Customer Resource Integration', () => {
    test('should reflect database changes in customer list', async () => {
      // Create a test customer
      const customer = await testDb.createCustomer({
        name: 'Integration Test Customer',
        email: 'integration@test.com',
        status: 'active'
      });

      // Retrieve customer list through MCP
      const response = await client.readResource('erp://customers/list');
      const data = JSON.parse(response.contents[0].text);

      // Verify customer appears in list
      const foundCustomer = data.customers.find(c => c.id === customer.id);
      expect(foundCustomer).toBeDefined();
      expect(foundCustomer.name).toBe('Integration Test Customer');
      expect(foundCustomer.email).toBe('integration@test.com');
    });

    test('should retrieve specific customer details', async () => {
      // Create a test customer with orders
      const customer = await testDb.createCustomer({
        name: 'Detailed Test Customer',
        email: 'detailed@test.com'
      });

      await testDb.createOrder({
        customerId: customer.id,
        totalAmount: 99.99,
        status: 'completed'
      });

      // Retrieve customer details through MCP
      const response = await client.readResource(\`erp://customers/\${customer.id}\`);
      const data = JSON.parse(response.contents[0].text);

      expect(data.customer.id).toBe(customer.id);
      expect(data.customer.name).toBe('Detailed Test Customer');
      expect(data.recentOrders).toHaveLength(1);
      expect(data.analytics.totalOrders).toBe(1);
    });
  });
});
\`\`\`

This comprehensive technical implementation guide provides the foundation for building robust, scalable MCP ERP systems with proper architecture, security, and testing practices.
`;