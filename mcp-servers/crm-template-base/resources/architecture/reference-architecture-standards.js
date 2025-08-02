export default `# 🏛️ Reference Architecture Standards

## Overview

This document establishes the authoritative architecture standards for MCP ERP systems, defining structural patterns, design principles, and implementation guidelines that ensure consistency, scalability, and maintainability across all system components.

## Architectural Principles

### 1. Separation of Concerns

#### Layered Architecture
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Web UI    │  │  Mobile UI  │  │     Admin UI        │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                      │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Authentication │ Rate Limiting │ Request Routing     │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                      MCP Layer                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Customer  │  │    Order    │  │     Inventory       │ │
│  │ MCP Server  │  │ MCP Server  │  │   MCP Server        │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                   Business Logic Layer                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  Customer   │  │    Order    │  │    Inventory        │ │
│  │  Service    │  │   Service   │  │    Service          │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                   Data Access Layer                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  Customer   │  │    Order    │  │    Inventory        │ │
│  │ Repository  │  │ Repository  │  │   Repository        │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                     Data Layer                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │ PostgreSQL  │  │    Redis    │  │   File Storage      │ │
│  │  Database   │  │    Cache    │  │     (S3)            │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
\`\`\`

#### Layer Responsibilities
\`\`\`yaml
layers:
  presentation:
    responsibilities:
      - User interface rendering
      - User interaction handling
      - Client-side validation
      - Navigation and routing
    dependencies:
      - API Gateway Layer only
    
  api_gateway:
    responsibilities:
      - Request routing and load balancing
      - Authentication and authorization
      - Rate limiting and throttling
      - Request/response transformation
    dependencies:
      - MCP Layer only
    
  mcp_layer:
    responsibilities:
      - Resource exposure and management
      - Protocol compliance (MCP standards)
      - Cross-server communication
      - Resource discovery and routing
    dependencies:
      - Business Logic Layer only
    
  business_logic:
    responsibilities:
      - Business rule implementation
      - Workflow orchestration
      - Transaction management
      - Event processing
    dependencies:
      - Data Access Layer only
    
  data_access:
    responsibilities:
      - Data persistence abstraction
      - Query optimization
      - Connection management
      - Data mapping and transformation
    dependencies:
      - Data Layer only
    
  data_layer:
    responsibilities:
      - Data storage and retrieval
      - Data integrity and consistency
      - Backup and recovery
      - Performance optimization
    dependencies:
      - None (infrastructure)
\`\`\`

### 2. Domain-Driven Design (DDD)

#### Bounded Context Definition
\`\`\`typescript
// Domain boundaries for MCP ERP system
interface BoundedContext {
  name: string;
  domain: string;
  services: string[];
  entities: string[];
  valueObjects: string[];
  aggregates: string[];
  repositories: string[];
}

const CustomerManagementContext: BoundedContext = {
  name: 'Customer Management',
  domain: 'customer',
  services: ['CustomerService', 'ContactService', 'SegmentationService'],
  entities: ['Customer', 'Contact', 'Address', 'Preference'],
  valueObjects: ['Email', 'Phone', 'CustomerType'],
  aggregates: ['CustomerAggregate'],
  repositories: ['CustomerRepository', 'ContactRepository']
};

const OrderManagementContext: BoundedContext = {
  name: 'Order Management',
  domain: 'order',
  services: ['OrderService', 'PricingService', 'ShippingService'],
  entities: ['Order', 'OrderItem', 'ShippingAddress', 'Payment'],
  valueObjects: ['OrderStatus', 'Money', 'Quantity'],
  aggregates: ['OrderAggregate'],
  repositories: ['OrderRepository', 'OrderItemRepository']
};

const InventoryManagementContext: BoundedContext = {
  name: 'Inventory Management',
  domain: 'inventory',
  services: ['InventoryService', 'StockService', 'ReorderService'],
  entities: ['Product', 'Stock', 'Warehouse', 'StockMovement'],
  valueObjects: ['SKU', 'StockLevel', 'ReorderPoint'],
  aggregates: ['ProductAggregate', 'WarehouseAggregate'],
  repositories: ['ProductRepository', 'StockRepository']
};
\`\`\`

#### Aggregate Design Pattern
\`\`\`typescript
// Example: Customer Aggregate Implementation
export class CustomerAggregate {
  private constructor(
    private readonly customerId: CustomerId,
    private customerData: CustomerData,
    private contacts: Contact[],
    private preferences: CustomerPreferences,
    private domainEvents: DomainEvent[]
  ) {}
  
  static create(customerData: CustomerData): CustomerAggregate {
    const customerId = CustomerId.generate();
    const customer = new CustomerAggregate(
      customerId,
      customerData,
      [],
      CustomerPreferences.default(),
      []
    );
    
    customer.addDomainEvent(new CustomerCreatedEvent(customerId, customerData));
    return customer;
  }
  
  static fromSnapshot(snapshot: CustomerSnapshot): CustomerAggregate {
    return new CustomerAggregate(
      new CustomerId(snapshot.customerId),
      snapshot.customerData,
      snapshot.contacts.map(c => Contact.fromSnapshot(c)),
      CustomerPreferences.fromSnapshot(snapshot.preferences),
      []
    );
  }
  
  // Business methods
  updateContactInformation(contactInfo: ContactInfo): void {
    this.validateContactInformation(contactInfo);
    this.customerData = this.customerData.updateContact(contactInfo);
    this.addDomainEvent(new CustomerContactUpdatedEvent(this.customerId, contactInfo));
  }
  
  addContact(contact: Contact): void {
    if (this.contacts.length >= 10) {
      throw new DomainError('Customer cannot have more than 10 contacts');
    }
    
    this.contacts.push(contact);
    this.addDomainEvent(new ContactAddedEvent(this.customerId, contact.getId()));
  }
  
  updatePreferences(preferences: CustomerPreferences): void {
    this.preferences = preferences;
    this.addDomainEvent(new CustomerPreferencesUpdatedEvent(this.customerId, preferences));
  }
  
  // Invariant enforcement
  private validateContactInformation(contactInfo: ContactInfo): void {
    if (!contactInfo.email.isValid()) {
      throw new DomainError('Invalid email address');
    }
    
    if (!contactInfo.phone.isValid()) {
      throw new DomainError('Invalid phone number');
    }
  }
  
  // Event handling
  private addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }
  
  getDomainEvents(): DomainEvent[] {
    return [...this.domainEvents];
  }
  
  clearDomainEvents(): void {
    this.domainEvents = [];
  }
  
  // Snapshot for persistence
  toSnapshot(): CustomerSnapshot {
    return {
      customerId: this.customerId.value,
      customerData: this.customerData.toSnapshot(),
      contacts: this.contacts.map(c => c.toSnapshot()),
      preferences: this.preferences.toSnapshot(),
      version: this.getVersion()
    };
  }
}
\`\`\`

### 3. Event-Driven Architecture

#### Event Sourcing Pattern
\`\`\`typescript
// Event Store Implementation
export class EventStore {
  constructor(private readonly connection: DatabaseConnection) {}
  
  async saveEvents(
    aggregateId: string,
    events: DomainEvent[],
    expectedVersion: number
  ): Promise<void> {
    const client = await this.connection.getClient();
    
    try {
      await client.query('BEGIN');
      
      // Check current version
      const versionResult = await client.query(
        'SELECT version FROM aggregate_versions WHERE aggregate_id = $1',
        [aggregateId]
      );
      
      const currentVersion = versionResult.rows[0]?.version || 0;
      
      if (currentVersion !== expectedVersion) {
        throw new ConcurrencyError(
          \`Expected version \${expectedVersion}, but current version is \${currentVersion}\`
        );
      }
      
      // Save events
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const version = expectedVersion + i + 1;
        
        await client.query(
          \`INSERT INTO events (
            aggregate_id, version, event_type, event_data, occurred_at
          ) VALUES ($1, $2, $3, $4, $5)\`,
          [
            aggregateId,
            version,
            event.constructor.name,
            JSON.stringify(event.data),
            event.occurredAt
          ]
        );
      }
      
      // Update version
      await client.query(
        \`INSERT INTO aggregate_versions (aggregate_id, version) 
         VALUES ($1, $2) 
         ON CONFLICT (aggregate_id) 
         DO UPDATE SET version = $2\`,
        [aggregateId, expectedVersion + events.length]
      );
      
      await client.query('COMMIT');
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
  
  async getEvents(aggregateId: string, fromVersion?: number): Promise<DomainEvent[]> {
    const query = fromVersion
      ? 'SELECT * FROM events WHERE aggregate_id = $1 AND version > $2 ORDER BY version'
      : 'SELECT * FROM events WHERE aggregate_id = $1 ORDER BY version';
    
    const params = fromVersion ? [aggregateId, fromVersion] : [aggregateId];
    const result = await this.connection.query(query, params);
    
    return result.rows.map(row => this.deserializeEvent(row));
  }
  
  private deserializeEvent(row: any): DomainEvent {
    const EventClass = eventRegistry.get(row.event_type);
    if (!EventClass) {
      throw new Error(\`Unknown event type: \${row.event_type}\`);
    }
    
    return new EventClass(
      JSON.parse(row.event_data),
      new Date(row.occurred_at),
      row.version
    );
  }
}
\`\`\`

#### Event Bus Implementation
\`\`\`typescript
// Domain Event Bus
export class DomainEventBus {
  private handlers = new Map<string, EventHandler[]>();
  private middleware: EventMiddleware[] = [];
  
  subscribe<T extends DomainEvent>(
    eventType: new (...args: any[]) => T,
    handler: EventHandler<T>
  ): void {
    const eventName = eventType.name;
    
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    
    this.handlers.get(eventName)!.push(handler);
  }
  
  async publish(event: DomainEvent): Promise<void> {
    // Apply middleware
    let processedEvent = event;
    for (const middleware of this.middleware) {
      processedEvent = await middleware.process(processedEvent);
    }
    
    const eventName = event.constructor.name;
    const handlers = this.handlers.get(eventName) || [];
    
    // Execute handlers in parallel
    const promises = handlers.map(handler => 
      this.executeHandler(handler, processedEvent)
    );
    
    await Promise.all(promises);
  }
  
  private async executeHandler(
    handler: EventHandler,
    event: DomainEvent
  ): Promise<void> {
    try {
      await handler.handle(event);
    } catch (error) {
      console.error(\`Error handling event \${event.constructor.name}:\`, error);
      // Implement error handling strategy (retry, dead letter queue, etc.)
    }
  }
  
  use(middleware: EventMiddleware): void {
    this.middleware.push(middleware);
  }
}

// Example Event Handlers
export class CustomerCreatedEventHandler implements EventHandler<CustomerCreatedEvent> {
  constructor(
    private readonly emailService: EmailService,
    private readonly analyticsService: AnalyticsService
  ) {}
  
  async handle(event: CustomerCreatedEvent): Promise<void> {
    // Send welcome email
    await this.emailService.sendWelcomeEmail(event.customerData.email);
    
    // Track analytics
    await this.analyticsService.trackCustomerCreation({
      customerId: event.customerId,
      source: event.customerData.source,
      timestamp: event.occurredAt
    });
  }
}
\`\`\`

## Component Architecture Standards

### MCP Server Structure
\`\`\`typescript
// Standard MCP Server Architecture
interface MCPServerArchitecture {
  // Core Components
  server: MCPServer;
  resourceProviders: Map<string, ResourceProvider>;
  promptProviders: Map<string, PromptProvider>;
  toolProviders: Map<string, ToolProvider>;
  
  // Business Components
  services: Map<string, BusinessService>;
  repositories: Map<string, Repository>;
  aggregates: Map<string, AggregateRoot>;
  
  // Infrastructure Components
  eventBus: EventBus;
  logger: Logger;
  metrics: MetricsCollector;
  healthChecker: HealthChecker;
  
  // Configuration
  config: Configuration;
  middleware: Middleware[];
}

// Implementation Template
export class StandardMCPServer implements MCPServerArchitecture {
  constructor(config: ServerConfiguration) {
    this.config = config;
    this.setupInfrastructure();
    this.setupBusinessComponents();
    this.setupMCPComponents();
    this.setupMiddleware();
  }
  
  private setupInfrastructure(): void {
    this.eventBus = new DomainEventBus();
    this.logger = new StructuredLogger(this.config.logging);
    this.metrics = new PrometheusMetricsCollector();
    this.healthChecker = new HealthChecker();
  }
  
  private setupBusinessComponents(): void {
    // Repositories
    this.repositories.set('customer', new CustomerRepository(this.config.database));
    this.repositories.set('order', new OrderRepository(this.config.database));
    
    // Services
    this.services.set('customer', new CustomerService(
      this.repositories.get('customer'),
      this.eventBus
    ));
    this.services.set('order', new OrderService(
      this.repositories.get('order'),
      this.eventBus
    ));
  }
  
  private setupMCPComponents(): void {
    // Resource Providers
    this.resourceProviders.set('customers', new CustomerResourceProvider(
      this.services.get('customer')
    ));
    this.resourceProviders.set('orders', new OrderResourceProvider(
      this.services.get('order')
    ));
    
    // Prompt Providers
    this.promptProviders.set('create-customer', new CreateCustomerPromptProvider());
    this.promptProviders.set('search-orders', new SearchOrdersPromptProvider());
  }
  
  private setupMiddleware(): void {
    this.middleware.push(new AuthenticationMiddleware(this.config.auth));
    this.middleware.push(new LoggingMiddleware(this.logger));
    this.middleware.push(new MetricsMiddleware(this.metrics));
    this.middleware.push(new ErrorHandlingMiddleware());
  }
}
\`\`\`

### Resource Provider Standards
\`\`\`typescript
// Standard Resource Provider Interface
export interface ResourceProvider {
  getResourceType(): string;
  getSupportedOperations(): string[];
  getResource(uri: string, options?: ResourceOptions): Promise<Resource>;
  listResources(filters?: ResourceFilters): Promise<ResourceMetadata[]>;
  validateResourceAccess(uri: string, context: RequestContext): Promise<boolean>;
}

// Base Resource Provider Implementation
export abstract class BaseResourceProvider implements ResourceProvider {
  constructor(
    protected readonly service: BusinessService,
    protected readonly cache: CacheService,
    protected readonly metrics: MetricsCollector
  ) {}
  
  abstract getResourceType(): string;
  abstract getSupportedOperations(): string[];
  
  async getResource(uri: string, options: ResourceOptions = {}): Promise<Resource> {
    const startTime = Date.now();
    
    try {
      // Check cache first
      if (!options.skipCache) {
        const cached = await this.cache.get(uri);
        if (cached) {
          this.metrics.increment('resource.cache_hit', { type: this.getResourceType() });
          return cached;
        }
      }
      
      // Fetch from service
      const resource = await this.fetchResource(uri, options);
      
      // Cache the result
      if (resource && !options.skipCache) {
        await this.cache.set(uri, resource, options.cacheTTL || 300);
      }
      
      this.metrics.increment('resource.fetch_success', { type: this.getResourceType() });
      this.metrics.histogram('resource.fetch_duration', Date.now() - startTime);
      
      return resource;
      
    } catch (error) {
      this.metrics.increment('resource.fetch_error', { 
        type: this.getResourceType(),
        error: error.constructor.name
      });
      throw error;
    }
  }
  
  protected abstract fetchResource(uri: string, options: ResourceOptions): Promise<Resource>;
  
  async validateResourceAccess(uri: string, context: RequestContext): Promise<boolean> {
    // Default implementation - override for specific access control
    return true;
  }
}
\`\`\`

## Data Architecture Standards

### Database Schema Standards
\`\`\`sql
-- Standard table structure template
CREATE TABLE entity_name (
    -- Primary key (always id)
    id SERIAL PRIMARY KEY,
    
    -- External reference (for integration)
    external_id VARCHAR(50) UNIQUE,
    
    -- Business fields
    -- ... entity-specific columns ...
    
    -- Audit fields (required for all tables)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER REFERENCES users(id),
    
    -- Soft delete support
    deleted_at TIMESTAMP NULL,
    deleted_by INTEGER REFERENCES users(id),
    
    -- Optimistic concurrency control
    version INTEGER DEFAULT 1,
    
    -- Metadata (JSONB for flexibility)
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Standard indexes (required for all tables)
CREATE INDEX idx_entity_name_external_id ON entity_name(external_id);
CREATE INDEX idx_entity_name_created_at ON entity_name(created_at);
CREATE INDEX idx_entity_name_deleted_at ON entity_name(deleted_at);

-- Update trigger for updated_at field
CREATE TRIGGER update_entity_name_updated_at 
    BEFORE UPDATE ON entity_name
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Example: Customers table following standards
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    external_id VARCHAR(50) UNIQUE,
    
    -- Business fields
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    customer_type VARCHAR(50) DEFAULT 'standard',
    credit_limit DECIMAL(10,2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'active',
    
    -- Address (stored as JSONB for flexibility)
    address JSONB DEFAULT '{}'::jsonb,
    
    -- Preferences (stored as JSONB)
    preferences JSONB DEFAULT '{}'::jsonb,
    
    -- Standard audit fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER REFERENCES users(id),
    deleted_at TIMESTAMP NULL,
    deleted_by INTEGER REFERENCES users(id),
    version INTEGER DEFAULT 1,
    metadata JSONB DEFAULT '{}'::jsonb,
    
    -- Business constraints
    CONSTRAINT customers_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT customers_status_check CHECK (status IN ('active', 'inactive', 'suspended')),
    CONSTRAINT customers_type_check CHECK (customer_type IN ('standard', 'premium', 'enterprise'))
);
\`\`\`

### Repository Pattern Standards
\`\`\`typescript
// Standard Repository Interface
export interface Repository<T extends Entity, ID> {
  findById(id: ID): Promise<T | null>;
  findBy(criteria: Criteria): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: ID): Promise<void>;
  exists(id: ID): Promise<boolean>;
  count(criteria?: Criteria): Promise<number>;
}

// Base Repository Implementation
export abstract class BaseRepository<T extends Entity, ID> implements Repository<T, ID> {
  constructor(
    protected readonly connection: DatabaseConnection,
    protected readonly tableName: string,
    protected readonly entityMapper: EntityMapper<T>
  ) {}
  
  async findById(id: ID): Promise<T | null> {
    const query = \`
      SELECT * FROM \${this.tableName} 
      WHERE id = $1 AND deleted_at IS NULL
    \`;
    
    const result = await this.connection.query(query, [id]);
    return result.rows.length > 0 ? this.entityMapper.toDomain(result.rows[0]) : null;
  }
  
  async findBy(criteria: Criteria): Promise<T[]> {
    const { query, values } = this.buildQuery(criteria);
    const result = await this.connection.query(query, values);
    return result.rows.map(row => this.entityMapper.toDomain(row));
  }
  
  async save(entity: T): Promise<T> {
    if (entity.getId()) {
      return this.update(entity);
    } else {
      return this.insert(entity);
    }
  }
  
  private async insert(entity: T): Promise<T> {
    const data = this.entityMapper.toPersistence(entity);
    const { fields, values, placeholders } = this.buildInsertQuery(data);
    
    const query = \`
      INSERT INTO \${this.tableName} (\${fields.join(', ')})
      VALUES (\${placeholders.join(', ')})
      RETURNING *
    \`;
    
    const result = await this.connection.query(query, values);
    return this.entityMapper.toDomain(result.rows[0]);
  }
  
  private async update(entity: T): Promise<T> {
    const data = this.entityMapper.toPersistence(entity);
    const { setClause, values } = this.buildUpdateQuery(data);
    
    values.push(entity.getId());
    values.push(entity.getVersion());
    
    const query = \`
      UPDATE \${this.tableName} 
      SET \${setClause}, 
          version = version + 1,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $\${values.length - 1} 
        AND version = $\${values.length}
        AND deleted_at IS NULL
      RETURNING *
    \`;
    
    const result = await this.connection.query(query, values);
    
    if (result.rows.length === 0) {
      throw new ConcurrencyError('Entity was modified by another process');
    }
    
    return this.entityMapper.toDomain(result.rows[0]);
  }
  
  async delete(id: ID): Promise<void> {
    const query = \`
      UPDATE \${this.tableName} 
      SET deleted_at = CURRENT_TIMESTAMP 
      WHERE id = $1 AND deleted_at IS NULL
    \`;
    
    await this.connection.query(query, [id]);
  }
  
  protected abstract buildQuery(criteria: Criteria): { query: string; values: any[] };
  protected abstract buildInsertQuery(data: any): { fields: string[]; values: any[]; placeholders: string[] };
  protected abstract buildUpdateQuery(data: any): { setClause: string; values: any[] };
}
\`\`\`

## Security Architecture Standards

### Authentication and Authorization
\`\`\`typescript
// Security Architecture Interface
export interface SecurityContext {
  user: User;
  roles: Role[];
  permissions: Permission[];
  sessionId: string;
  deviceInfo: DeviceInfo;
}

// Role-Based Access Control (RBAC) Implementation
export class RBACService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository
  ) {}
  
  async authenticate(credentials: Credentials): Promise<SecurityContext> {
    const user = await this.validateCredentials(credentials);
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }
    
    const roles = await this.roleRepository.findByUserId(user.getId());
    const permissions = await this.getEffectivePermissions(roles);
    
    return {
      user,
      roles,
      permissions,
      sessionId: this.generateSessionId(),
      deviceInfo: credentials.deviceInfo
    };
  }
  
  async authorize(
    context: SecurityContext,
    resource: string,
    action: string
  ): Promise<boolean> {
    // Check direct permissions
    const hasDirectPermission = context.permissions.some(permission =>
      permission.resource === resource && permission.actions.includes(action)
    );
    
    if (hasDirectPermission) {
      return true;
    }
    
    // Check role-based permissions
    for (const role of context.roles) {
      const rolePermissions = await this.permissionRepository.findByRoleId(role.getId());
      const hasRolePermission = rolePermissions.some(permission =>
        permission.resource === resource && permission.actions.includes(action)
      );
      
      if (hasRolePermission) {
        return true;
      }
    }
    
    return false;
  }
  
  private async getEffectivePermissions(roles: Role[]): Promise<Permission[]> {
    const permissions = new Map<string, Permission>();
    
    for (const role of roles) {
      const rolePermissions = await this.permissionRepository.findByRoleId(role.getId());
      for (const permission of rolePermissions) {
        const key = \`\${permission.resource}:\${permission.actions.join(',')}\`;
        permissions.set(key, permission);
      }
    }
    
    return Array.from(permissions.values());
  }
}
\`\`\`

### Input Validation Standards
\`\`\`typescript
// Input Validation Framework
export class ValidationFramework {
  private validators = new Map<string, Validator>();
  
  registerValidator(name: string, validator: Validator): void {
    this.validators.set(name, validator);
  }
  
  async validate(schema: ValidationSchema, data: any): Promise<ValidationResult> {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    
    for (const [field, rules] of Object.entries(schema.fields)) {
      const value = data[field];
      
      for (const rule of rules) {
        const validator = this.validators.get(rule.type);
        if (!validator) {
          throw new Error(\`Unknown validator: \${rule.type}\`);
        }
        
        const result = await validator.validate(value, rule.options);
        
        if (!result.isValid) {
          errors.push({
            field,
            message: result.message,
            code: result.code
          });
        }
        
        if (result.warnings) {
          warnings.push(...result.warnings.map(warning => ({
            field,
            message: warning.message,
            code: warning.code
          })));
        }
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}

// Standard Validators
export class EmailValidator implements Validator {
  async validate(value: any, options: ValidationOptions): Promise<ValidatorResult> {
    if (!value) {
      return { isValid: !options.required, message: 'Email is required' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    
    return {
      isValid,
      message: isValid ? '' : 'Invalid email format',
      code: isValid ? '' : 'INVALID_EMAIL_FORMAT'
    };
  }
}

// Usage Example
const customerValidationSchema: ValidationSchema = {
  fields: {
    name: [
      { type: 'required' },
      { type: 'string', options: { minLength: 2, maxLength: 255 } }
    ],
    email: [
      { type: 'required' },
      { type: 'email' },
      { type: 'unique', options: { table: 'customers', field: 'email' } }
    ],
    phone: [
      { type: 'phone', options: { format: 'international' } }
    ],
    creditLimit: [
      { type: 'number', options: { min: 0, max: 1000000 } }
    ]
  }
};
\`\`\`

## Performance Architecture Standards

### Caching Strategy
\`\`\`typescript
// Multi-Level Caching Architecture
export class CachingService {
  constructor(
    private readonly l1Cache: MemoryCache,    // Application memory
    private readonly l2Cache: RedisCache,     // Distributed cache
    private readonly l3Cache: DatabaseCache   // Database query cache
  ) {}
  
  async get<T>(key: string, options: CacheOptions = {}): Promise<T | null> {
    // L1 Cache (Memory)
    let value = await this.l1Cache.get<T>(key);
    if (value !== null) {
      return value;
    }
    
    // L2 Cache (Redis)
    value = await this.l2Cache.get<T>(key);
    if (value !== null) {
      // Promote to L1
      await this.l1Cache.set(key, value, options.l1TTL || 60);
      return value;
    }
    
    // L3 Cache (Database)
    if (options.enableL3) {
      value = await this.l3Cache.get<T>(key);
      if (value !== null) {
        // Promote to L2 and L1
        await this.l2Cache.set(key, value, options.l2TTL || 300);
        await this.l1Cache.set(key, value, options.l1TTL || 60);
        return value;
      }
    }
    
    return null;
  }
  
  async set<T>(key: string, value: T, options: CacheOptions = {}): Promise<void> {
    // Set in all cache levels
    await Promise.all([
      this.l1Cache.set(key, value, options.l1TTL || 60),
      this.l2Cache.set(key, value, options.l2TTL || 300),
      options.enableL3 ? this.l3Cache.set(key, value, options.l3TTL || 3600) : Promise.resolve()
    ]);
  }
  
  async invalidate(pattern: string): Promise<void> {
    await Promise.all([
      this.l1Cache.invalidate(pattern),
      this.l2Cache.invalidate(pattern),
      this.l3Cache.invalidate(pattern)
    ]);
  }
}
\`\`\`

### Query Optimization Standards
\`\`\`sql
-- Query Optimization Standards

-- 1. Always use appropriate indexes
CREATE INDEX CONCURRENTLY idx_customers_email ON customers(email);
CREATE INDEX CONCURRENTLY idx_customers_status_created ON customers(status, created_at);
CREATE INDEX CONCURRENTLY idx_orders_customer_status ON orders(customer_id, status);

-- 2. Use partial indexes for filtered queries
CREATE INDEX CONCURRENTLY idx_active_customers 
ON customers(created_at) 
WHERE status = 'active' AND deleted_at IS NULL;

-- 3. Use composite indexes for multi-column queries
CREATE INDEX CONCURRENTLY idx_orders_customer_date_status 
ON orders(customer_id, order_date, status);

-- 4. Optimize JSON queries with expression indexes
CREATE INDEX CONCURRENTLY idx_customer_preferences_notifications 
ON customers USING GIN ((preferences->'notifications'));

-- 5. Use views for complex, frequently-used queries
CREATE VIEW active_customers_summary AS
SELECT 
    c.id,
    c.name,
    c.email,
    c.customer_type,
    COUNT(o.id) as order_count,
    SUM(o.total_amount) as total_revenue,
    MAX(o.order_date) as last_order_date
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id AND o.status = 'completed'
WHERE c.status = 'active' AND c.deleted_at IS NULL
GROUP BY c.id, c.name, c.email, c.customer_type;
\`\`\`

This reference architecture establishes the foundational standards that ensure consistency, scalability, and maintainability across all MCP ERP implementations. All development must adhere to these architectural principles and patterns.
`;