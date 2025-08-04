export default `# 📋 Step-by-Step Implementation Guides

## Overview

This guide provides detailed, actionable procedures for implementing MCP ERP systems from initial setup through full deployment. Each guide includes prerequisites, detailed steps, validation procedures, and troubleshooting information.

## Implementation Methodology

### Phase 1: Project Preparation (2-4 weeks)

#### 1.1 Requirements Gathering
\`\`\`markdown
# Requirements Collection Checklist

## Business Requirements ✅
- [ ] Business process mapping completed
- [ ] User story documentation finished
- [ ] Integration requirements identified
- [ ] Performance requirements defined
- [ ] Security requirements documented
- [ ] Compliance requirements assessed

## Technical Requirements ✅
- [ ] Infrastructure specifications defined
- [ ] Database requirements documented
- [ ] API integration needs identified
- [ ] Third-party service dependencies mapped
- [ ] Scalability requirements established
- [ ] Backup and recovery needs specified

## Project Constraints ✅
- [ ] Budget limitations documented
- [ ] Timeline constraints identified
- [ ] Resource availability confirmed
- [ ] Technology stack decisions made
- [ ] Risk assessment completed
- [ ] Change management plan created
\`\`\`

#### 1.2 Environment Setup
\`\`\`bash
# Step-by-step environment preparation

# 1. Development Environment Setup
mkdir -p /opt/mcp-erp/development
cd /opt/mcp-erp/development

# 2. Install Node.js and dependencies
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Install MCP SDK
npm install -g @modelcontextprotocol/sdk

# 4. Setup MCP Servers with Claude Code
# See comprehensive deployment guides:
# - mcp://mcp-documentation/deployment/quick-start-deployment
# - mcp://mcp-documentation/deployment/claude-code-registration-guide
# Quick registration for all IBSO servers:
for server in crm-template-base ibso-business-units ibso-patterns agency-client-template mcp-documentation; do
  claude mcp add -s user "$server" node "/path/to/mcp-servers/$server/index.js"
done

# 5. Create project structure
npx create-mcp-project mcp-erp-system
cd mcp-erp-system

# 6. Install additional dependencies
npm install --save-dev \
  eslint \
  prettier \
  jest \
  supertest \
  @types/node

# 7. Configure development tools
npm run setup:dev-tools

# 8. Initialize version control
git init
git add .
git commit -m "Initial project setup"

# 8. Set up database (PostgreSQL example)
sudo apt-get install postgresql postgresql-contrib
sudo -u postgres createdb mcp_erp_dev
sudo -u postgres createuser --interactive mcp_erp_user

# 9. Configure environment variables
cp .env.example .env
# Edit .env with your specific configuration

# 10. Verify setup
npm run test:setup
npm run health-check
\`\`\`

### Phase 2: Core System Implementation (6-12 weeks)

#### 2.1 MCP Server Foundation
\`\`\`javascript
// Step 1: Create base server structure
// File: src/index.js

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

class MCPERPServer {
  constructor() {
    this.server = new Server({
      name: "mcp-erp-system",
      version: "1.0.0"
    }, {
      capabilities: {
        resources: {},
        prompts: {}
      }
    });
    
    this.setupHandlers();
  }
  
  setupHandlers() {
    // Resource handlers
    this.server.setRequestHandler(ListResourcesRequestSchema, 
      this.handleListResources.bind(this));
    this.server.setRequestHandler(ReadResourceRequestSchema, 
      this.handleReadResource.bind(this));
      
    // Prompt handlers
    this.server.setRequestHandler(ListPromptsRequestSchema, 
      this.handleListPrompts.bind(this));
    this.server.setRequestHandler(GetPromptRequestSchema, 
      this.handleGetPrompt.bind(this));
  }
  
  async handleListResources() {
    // Implementation will be added in next steps
    return { resources: [] };
  }
  
  async handleReadResource(request) {
    // Implementation will be added in next steps
    const { uri } = request.params;
    throw new Error(\`Resource not found: \${uri}\`);
  }
  
  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.log("MCP ERP Server started successfully");
  }
}

// Start the server
const server = new MCPERPServer();
server.start().catch(console.error);
\`\`\`

#### 2.2 Database Layer Implementation
\`\`\`javascript
// Step 2: Database connection and models
// File: src/database/connection.js

import pg from 'pg';
import { config } from '../config/database.js';

class DatabaseConnection {
  constructor() {
    this.pool = new pg.Pool({
      user: config.username,
      host: config.host,
      database: config.database,
      password: config.password,
      port: config.port,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
    
    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }
  
  async query(text, params) {
    const start = Date.now();
    try {
      const res = await this.pool.query(text, params);
      const duration = Date.now() - start;
      console.log('Executed query', { text, duration, rows: res.rowCount });
      return res;
    } catch (error) {
      const duration = Date.now() - start;
      console.error('Query error', { text, duration, error: error.message });
      throw error;
    }
  }
  
  async getClient() {
    return await this.pool.connect();
  }
  
  async close() {
    await this.pool.end();
  }
}

export const db = new DatabaseConnection();
\`\`\`

\`\`\`sql
-- Step 3: Database schema creation
-- File: database/migrations/001_initial_schema.sql

-- Create customers table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    external_id VARCHAR(50) UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    address JSONB,
    customer_type VARCHAR(50) DEFAULT 'standard',
    credit_limit DECIMAL(10,2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'active',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    specifications JSONB DEFAULT '{}',
    unit_price DECIMAL(10,2) NOT NULL,
    cost_price DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'active',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id INTEGER REFERENCES customers(id),
    status VARCHAR(50) DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    shipping_address JSONB,
    billing_address JSONB,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    specifications JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create inventory table
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) UNIQUE,
    quantity_on_hand INTEGER DEFAULT 0,
    quantity_reserved INTEGER DEFAULT 0,
    quantity_available INTEGER GENERATED ALWAYS AS (quantity_on_hand - quantity_reserved) STORED,
    reorder_point INTEGER DEFAULT 0,
    max_stock_level INTEGER DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_external_id ON customers(external_id);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_inventory_product_id ON inventory(product_id);

-- Create update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update timestamp triggers
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
\`\`\`

#### 2.3 Business Logic Implementation
\`\`\`javascript
// Step 4: Customer management service
// File: src/services/CustomerService.js

import { db } from '../database/connection.js';
import { CustomerValidator } from '../validators/CustomerValidator.js';

export class CustomerService {
  constructor() {
    this.validator = new CustomerValidator();
  }
  
  async createCustomer(customerData) {
    // Step 1: Validate input data
    const validation = await this.validator.validate(customerData);
    if (!validation.isValid) {
      throw new Error(\`Validation failed: \${validation.errors.join(', ')}\`);
    }
    
    // Step 2: Check for existing customer
    const existing = await this.findExistingCustomer(customerData.email);
    if (existing) {
      throw new Error('Customer with this email already exists');
    }
    
    // Step 3: Insert customer into database
    const query = \`
      INSERT INTO customers (name, email, phone, address, customer_type, credit_limit, metadata)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    \`;
    
    const values = [
      customerData.name,
      customerData.email,
      customerData.phone || null,
      JSON.stringify(customerData.address || {}),
      customerData.customerType || 'standard',
      customerData.creditLimit || 0.00,
      JSON.stringify(customerData.metadata || {})
    ];
    
    try {
      const result = await db.query(query, values);
      const customer = result.rows[0];
      
      // Step 4: Log the creation
      await this.logCustomerActivity(customer.id, 'created', {
        createdBy: customerData.createdBy,
        timestamp: new Date().toISOString()
      });
      
      return this.formatCustomerResponse(customer);
      
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error('Failed to create customer');
    }
  }
  
  async updateCustomer(customerId, updateData) {
    // Step 1: Validate update data
    const validation = await this.validator.validateUpdate(updateData);
    if (!validation.isValid) {
      throw new Error(\`Validation failed: \${validation.errors.join(', ')}\`);
    }
    
    // Step 2: Get current customer data
    const currentCustomer = await this.getCustomerById(customerId);
    if (!currentCustomer) {
      throw new Error('Customer not found');
    }
    
    // Step 3: Build update query dynamically
    const updateFields = [];
    const values = [];
    let paramCount = 1;
    
    for (const [field, value] of Object.entries(updateData)) {
      if (this.isUpdatableField(field)) {
        updateFields.push(\`\${field} = $\${paramCount}\`);
        values.push(this.formatFieldValue(field, value));
        paramCount++;
      }
    }
    
    if (updateFields.length === 0) {
      throw new Error('No valid fields to update');
    }
    
    values.push(customerId); // Add customer ID as last parameter
    
    const query = \`
      UPDATE customers 
      SET \${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $\${paramCount}
      RETURNING *
    \`;
    
    try {
      const result = await db.query(query, values);
      const updatedCustomer = result.rows[0];
      
      // Step 4: Log the update
      await this.logCustomerActivity(customerId, 'updated', {
        updatedFields: Object.keys(updateData),
        updatedBy: updateData.updatedBy,
        timestamp: new Date().toISOString()
      });
      
      return this.formatCustomerResponse(updatedCustomer);
      
    } catch (error) {
      console.error('Error updating customer:', error);
      throw new Error('Failed to update customer');
    }
  }
  
  async getCustomerById(customerId) {
    const query = 'SELECT * FROM customers WHERE id = $1 AND status != \\'deleted\\'';
    
    try {
      const result = await db.query(query, [customerId]);
      if (result.rows.length === 0) {
        return null;
      }
      
      return this.formatCustomerResponse(result.rows[0]);
      
    } catch (error) {
      console.error('Error getting customer:', error);
      throw new Error('Failed to retrieve customer');
    }
  }
  
  async searchCustomers(searchCriteria) {
    const { query, values } = this.buildSearchQuery(searchCriteria);
    
    try {
      const result = await db.query(query, values);
      return result.rows.map(customer => this.formatCustomerResponse(customer));
      
    } catch (error) {
      console.error('Error searching customers:', error);
      throw new Error('Failed to search customers');
    }
  }
  
  // Helper methods
  isUpdatableField(field) {
    const updatableFields = [
      'name', 'email', 'phone', 'address', 'customer_type', 
      'credit_limit', 'status', 'metadata'
    ];
    return updatableFields.includes(field);
  }
  
  formatFieldValue(field, value) {
    if (field === 'address' || field === 'metadata') {
      return JSON.stringify(value);
    }
    return value;
  }
  
  formatCustomerResponse(customer) {
    return {
      id: customer.id,
      externalId: customer.external_id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address || {},
      customerType: customer.customer_type,
      creditLimit: parseFloat(customer.credit_limit),
      status: customer.status,
      metadata: customer.metadata || {},
      createdAt: customer.created_at,
      updatedAt: customer.updated_at
    };
  }
  
  buildSearchQuery(criteria) {
    const conditions = [];
    const values = [];
    let paramCount = 1;
    
    // Always exclude deleted customers
    conditions.push("status != 'deleted'");
    
    if (criteria.name) {
      conditions.push(\`name ILIKE $\${paramCount}\`);
      values.push(\`%\${criteria.name}%\`);
      paramCount++;
    }
    
    if (criteria.email) {
      conditions.push(\`email ILIKE $\${paramCount}\`);
      values.push(\`%\${criteria.email}%\`);
      paramCount++;
    }
    
    if (criteria.customerType) {
      conditions.push(\`customer_type = $\${paramCount}\`);
      values.push(criteria.customerType);
      paramCount++;
    }
    
    if (criteria.status) {
      conditions.push(\`status = $\${paramCount}\`);
      values.push(criteria.status);
      paramCount++;
    }
    
    const query = \`
      SELECT * FROM customers 
      WHERE \${conditions.join(' AND ')}
      ORDER BY name ASC
      LIMIT \${criteria.limit || 100}
      OFFSET \${criteria.offset || 0}
    \`;
    
    return { query, values };
  }
}
\`\`\`

### Phase 3: MCP Integration (4-6 weeks)

#### 3.1 Resource Management
\`\`\`javascript
// Step 5: MCP Resource Implementation
// File: src/mcp/ResourceManager.js

import { CustomerService } from '../services/CustomerService.js';
import { ProductService } from '../services/ProductService.js';
import { OrderService } from '../services/OrderService.js';

export class ResourceManager {
  constructor() {
    this.customerService = new CustomerService();
    this.productService = new ProductService();
    this.orderService = new OrderService();
    
    this.resourceMap = new Map([
      ['erp://customers/list', this.getCustomerList.bind(this)],
      ['erp://customers/details', this.getCustomerDetails.bind(this)],
      ['erp://products/catalog', this.getProductCatalog.bind(this)],
      ['erp://products/specifications', this.getProductSpecs.bind(this)],
      ['erp://orders/recent', this.getRecentOrders.bind(this)],
      ['erp://orders/analytics', this.getOrderAnalytics.bind(this)],
      ['erp://inventory/status', this.getInventoryStatus.bind(this)],
      ['erp://reports/dashboard', this.getDashboardData.bind(this)]
    ]);
  }
  
  async getResource(uri) {
    const handler = this.resourceMap.get(uri);
    if (!handler) {
      throw new Error(\`Resource not found: \${uri}\`);
    }
    
    try {
      const data = await handler();
      return this.formatResourceResponse(uri, data);
    } catch (error) {
      console.error(\`Error getting resource \${uri}:\`, error);
      throw new Error(\`Failed to retrieve resource: \${uri}\`);
    }
  }
  
  async getCustomerList() {
    const customers = await this.customerService.searchCustomers({
      limit: 50,
      status: 'active'
    });
    
    return {
      title: "Active Customers",
      description: "List of active customers in the system",
      data: customers.map(customer => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        customerType: customer.customerType,
        creditLimit: customer.creditLimit
      })),
      totalCount: customers.length,
      lastUpdated: new Date().toISOString()
    };
  }
  
  async getProductCatalog() {
    const products = await this.productService.getActiveProducts();
    
    return {
      title: "Product Catalog",
      description: "Complete catalog of available products",
      data: products.map(product => ({
        id: product.id,
        sku: product.sku,
        name: product.name,
        category: product.category,
        unitPrice: product.unitPrice,
        specifications: product.specifications
      })),
      categories: await this.productService.getCategories(),
      totalCount: products.length,
      lastUpdated: new Date().toISOString()
    };
  }
  
  async getRecentOrders() {
    const orders = await this.orderService.getRecentOrders(20);
    
    return {
      title: "Recent Orders",
      description: "Latest 20 orders in the system",
      data: orders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customer.name,
        status: order.status,
        totalAmount: order.totalAmount,
        orderDate: order.orderDate,
        itemCount: order.items.length
      })),
      totalCount: orders.length,
      lastUpdated: new Date().toISOString()
    };
  }
  
  async getDashboardData() {
    const [
      customerStats,
      orderStats,
      inventoryStats,
      revenueStats
    ] = await Promise.all([
      this.customerService.getStatistics(),
      this.orderService.getStatistics(),
      this.inventoryService.getStatistics(),
      this.orderService.getRevenueStatistics()
    ]);
    
    return {
      title: "ERP Dashboard",
      description: "Key metrics and statistics",
      data: {
        customers: {
          total: customerStats.total,
          active: customerStats.active,
          newThisMonth: customerStats.newThisMonth
        },
        orders: {
          total: orderStats.total,
          pending: orderStats.pending,
          completedThisMonth: orderStats.completedThisMonth,
          averageOrderValue: orderStats.averageOrderValue
        },
        inventory: {
          totalProducts: inventoryStats.totalProducts,
          lowStock: inventoryStats.lowStock,
          outOfStock: inventoryStats.outOfStock
        },
        revenue: {
          thisMonth: revenueStats.thisMonth,
          lastMonth: revenueStats.lastMonth,
          growth: revenueStats.growth
        }
      },
      lastUpdated: new Date().toISOString()
    };
  }
  
  formatResourceResponse(uri, data) {
    return {
      uri,
      mimeType: "application/json",
      contents: [{
        type: "text",
        text: JSON.stringify(data, null, 2)
      }]
    };
  }
  
  listResources() {
    return Array.from(this.resourceMap.keys()).map(uri => {
      const resourceInfo = this.getResourceInfo(uri);
      return {
        uri,
        name: resourceInfo.name,
        description: resourceInfo.description,
        mimeType: "application/json"
      };
    });
  }
  
  getResourceInfo(uri) {
    const resourceInfo = {
      'erp://customers/list': {
        name: "Customer List",
        description: "List of active customers with basic information"
      },
      'erp://customers/details': {
        name: "Customer Details",
        description: "Detailed customer information and history"
      },
      'erp://products/catalog': {
        name: "Product Catalog", 
        description: "Complete product catalog with specifications"
      },
      'erp://products/specifications': {
        name: "Product Specifications",
        description: "Detailed technical specifications for products"
      },
      'erp://orders/recent': {
        name: "Recent Orders",
        description: "Latest orders in the system"
      },
      'erp://orders/analytics': {
        name: "Order Analytics",
        description: "Order statistics and analytics"
      },
      'erp://inventory/status': {
        name: "Inventory Status",
        description: "Current inventory levels and stock status"
      },
      'erp://reports/dashboard': {
        name: "Dashboard Data",
        description: "Key metrics and KPIs for the dashboard"
      }
    };
    
    return resourceInfo[uri] || {
      name: "Unknown Resource",
      description: "Resource information not available"
    };
  }
}
\`\`\`

### Phase 4: Testing and Validation (3-4 weeks)

#### 4.1 Automated Testing Setup
\`\`\`javascript
// Step 6: Comprehensive test suite setup
// File: tests/integration/mcp-server.test.js

import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { MCPERPServer } from '../../src/index.js';
import { DatabaseTestUtils } from '../utils/DatabaseTestUtils.js';
import { MCPTestClient } from '../utils/MCPTestClient.js';

describe('MCP ERP Server Integration Tests', () => {
  let server;
  let client;
  let dbUtils;
  
  beforeAll(async () => {
    // Setup test database
    dbUtils = new DatabaseTestUtils();
    await dbUtils.setupTestDatabase();
    await dbUtils.seedTestData();
    
    // Start MCP server
    server = new MCPERPServer();
    await server.start();
    
    // Connect test client
    client = new MCPTestClient();
    await client.connect(server);
  });
  
  afterAll(async () => {
    await client.disconnect();
    await server.stop();
    await dbUtils.teardownTestDatabase();
  });
  
  describe('Resource Operations', () => {
    test('should list all available resources', async () => {
      const response = await client.listResources();
      
      expect(response.resources).toBeDefined();
      expect(Array.isArray(response.resources)).toBe(true);
      expect(response.resources.length).toBeGreaterThan(0);
      
      // Verify resource structure
      response.resources.forEach(resource => {
        expect(resource).toHaveProperty('uri');
        expect(resource).toHaveProperty('name');
        expect(resource).toHaveProperty('description');
        expect(resource).toHaveProperty('mimeType');
      });
    });
    
    test('should retrieve customer list resource', async () => {
      const response = await client.readResource('erp://customers/list');
      
      expect(response.contents).toBeDefined();
      expect(response.contents[0]).toHaveProperty('text');
      
      const data = JSON.parse(response.contents[0].text);
      expect(data).toHaveProperty('title');
      expect(data).toHaveProperty('data');
      expect(Array.isArray(data.data)).toBe(true);
    });
    
    test('should retrieve product catalog resource', async () => {
      const response = await client.readResource('erp://products/catalog');
      
      expect(response.contents).toBeDefined();
      const data = JSON.parse(response.contents[0].text);
      
      expect(data).toHaveProperty('title', 'Product Catalog');
      expect(data).toHaveProperty('data');
      expect(data).toHaveProperty('categories');
      expect(Array.isArray(data.data)).toBe(true);
    });
    
    test('should handle invalid resource requests', async () => {
      await expect(client.readResource('erp://invalid/resource'))
        .rejects.toThrow('Resource not found');
    });
  });
  
  describe('Business Logic Integration', () => {
    test('should create and retrieve customer through MCP', async () => {
      // Create customer via business service
      const customerData = {
        name: 'Test Customer Inc.',
        email: 'test@customer.com',
        phone: '(555) 123-4567',
        customerType: 'standard',
        creditLimit: 10000.00
      };
      
      const customer = await dbUtils.createTestCustomer(customerData);
      
      // Retrieve through MCP resource
      const response = await client.readResource('erp://customers/list');
      const data = JSON.parse(response.contents[0].text);
      
      const foundCustomer = data.data.find(c => c.email === customerData.email);
      expect(foundCustomer).toBeDefined();
      expect(foundCustomer.name).toBe(customerData.name);
    });
    
    test('should reflect order changes in dashboard data', async () => {
      // Create test order
      const order = await dbUtils.createTestOrder({
        customerId: 1,
        totalAmount: 500.00,
        status: 'completed'
      });
      
      // Check dashboard reflects the change
      const response = await client.readResource('erp://reports/dashboard');
      const data = JSON.parse(response.contents[0].text);
      
      expect(data.data.orders.total).toBeGreaterThan(0);
      expect(data.data.revenue.thisMonth).toBeGreaterThan(0);
    });
  });
  
  describe('Performance Tests', () => {
    test('should respond to resource requests within acceptable time', async () => {
      const startTime = Date.now();
      await client.readResource('erp://customers/list');
      const responseTime = Date.now() - startTime;
      
      expect(responseTime).toBeLessThan(1000); // 1 second
    });
    
    test('should handle concurrent resource requests', async () => {
      const concurrentRequests = 10;
      const promises = Array(concurrentRequests).fill().map(() => 
        client.readResource('erp://products/catalog')
      );
      
      const startTime = Date.now();
      const results = await Promise.all(promises);
      const totalTime = Date.now() - startTime;
      
      expect(results).toHaveLength(concurrentRequests);
      expect(totalTime).toBeLessThan(5000); // 5 seconds for 10 requests
      
      results.forEach(result => {
        expect(result.contents).toBeDefined();
      });
    });
  });
});
\`\`\`

#### 4.2 End-to-End Testing
\`\`\`javascript
// Step 7: End-to-end workflow testing
// File: tests/e2e/customer-order-workflow.test.js

describe('Customer Order Workflow E2E', () => {
  test('complete customer order process', async () => {
    // Step 1: Create customer
    const customer = await customerService.createCustomer({
      name: 'E2E Test Customer',
      email: 'e2e@test.com',
      phone: '(555) 999-0000',
      address: {
        street: '123 Test Street',
        city: 'Test City',
        state: 'TS',
        zipCode: '12345'
      }
    });
    
    expect(customer.id).toBeDefined();
    
    // Step 2: Verify customer appears in MCP resource
    const customerListResponse = await client.readResource('erp://customers/list');
    const customerList = JSON.parse(customerListResponse.contents[0].text);
    const foundCustomer = customerList.data.find(c => c.id === customer.id);
    expect(foundCustomer).toBeDefined();
    
    // Step 3: Create products
    const product1 = await productService.createProduct({
      sku: 'E2E-PROD-001',
      name: 'E2E Test Product 1',
      category: 'test-category',
      unitPrice: 99.99
    });
    
    const product2 = await productService.createProduct({
      sku: 'E2E-PROD-002', 
      name: 'E2E Test Product 2',
      category: 'test-category',
      unitPrice: 149.99
    });
    
    // Step 4: Verify products in catalog
    const catalogResponse = await client.readResource('erp://products/catalog');
    const catalog = JSON.parse(catalogResponse.contents[0].text);
    expect(catalog.data.some(p => p.id === product1.id)).toBe(true);
    expect(catalog.data.some(p => p.id === product2.id)).toBe(true);
    
    // Step 5: Create order
    const order = await orderService.createOrder({
      customerId: customer.id,
      items: [
        {
          productId: product1.id,
          quantity: 2,
          unitPrice: product1.unitPrice
        },
        {
          productId: product2.id,
          quantity: 1,
          unitPrice: product2.unitPrice
        }
      ],
      shippingAddress: customer.address
    });
    
    expect(order.id).toBeDefined();
    expect(order.totalAmount).toBe(349.97); // (99.99 * 2) + 149.99
    
    // Step 6: Verify order in recent orders
    const ordersResponse = await client.readResource('erp://orders/recent');
    const orders = JSON.parse(ordersResponse.contents[0].text);
    const foundOrder = orders.data.find(o => o.id === order.id);
    expect(foundOrder).toBeDefined();
    expect(foundOrder.customerName).toBe(customer.name);
    
    // Step 7: Update order status
    const updatedOrder = await orderService.updateOrderStatus(order.id, 'processing');
    expect(updatedOrder.status).toBe('processing');
    
    // Step 8: Verify dashboard updates
    const dashboardResponse = await client.readResource('erp://reports/dashboard');
    const dashboard = JSON.parse(dashboardResponse.contents[0].text);
    expect(dashboard.data.orders.total).toBeGreaterThan(0);
    expect(dashboard.data.customers.total).toBeGreaterThan(0);
    
    // Step 9: Complete the order
    await orderService.updateOrderStatus(order.id, 'completed');
    
    // Step 10: Verify final state
    const finalOrder = await orderService.getOrderById(order.id);
    expect(finalOrder.status).toBe('completed');
  });
});
\`\`\`

### Phase 5: Deployment and Go-Live (2-3 weeks)

#### 5.1 Production Deployment
\`\`\`bash
# Step 8: Production deployment script
#!/bin/bash

# File: scripts/deploy-production.sh

set -e

echo "Starting production deployment..."

# 1. Environment setup
export NODE_ENV=production
export PORT=3000

# 2. Database migration
echo "Running database migrations..."
npm run db:migrate:prod

# 3. Build production assets
echo "Building production assets..."
npm run build

# 4. Install production dependencies
echo "Installing production dependencies..."
npm ci --only=production

# 5. Run production tests
echo "Running production tests..."
npm run test:prod

# 6. Start services
echo "Starting MCP ERP Server..."
pm2 start ecosystem.config.js --env production

# 7. Health check
echo "Performing health check..."
sleep 10
npm run health-check

# 8. Update load balancer
echo "Updating load balancer configuration..."
./scripts/update-load-balancer.sh

# 9. Verify deployment
echo "Verifying deployment..."
./scripts/verify-deployment.sh

echo "Production deployment completed successfully!"
\`\`\`

#### 5.2 Monitoring and Alerting Setup
\`\`\`javascript
// Step 9: Production monitoring
// File: src/monitoring/HealthMonitor.js

export class HealthMonitor {
  constructor(mcpServer) {
    this.server = mcpServer;
    this.healthChecks = new Map();
    this.setupHealthChecks();
  }
  
  setupHealthChecks() {
    this.healthChecks.set('database', this.checkDatabaseHealth.bind(this));
    this.healthChecks.set('mcp-connectivity', this.checkMCPConnectivity.bind(this));
    this.healthChecks.set('memory-usage', this.checkMemoryUsage.bind(this));
    this.healthChecks.set('response-time', this.checkResponseTime.bind(this));
  }
  
  async performHealthCheck() {
    const results = {};
    const startTime = Date.now();
    
    for (const [checkName, checkFunction] of this.healthChecks) {
      try {
        results[checkName] = await checkFunction();
      } catch (error) {
        results[checkName] = {
          status: 'unhealthy',
          error: error.message,
          timestamp: new Date().toISOString()
        };
      }
    }
    
    const overallHealth = this.calculateOverallHealth(results);
    const totalTime = Date.now() - startTime;
    
    return {
      status: overallHealth,
      checks: results,
      timestamp: new Date().toISOString(),
      responseTime: totalTime
    };
  }
  
  async checkDatabaseHealth() {
    const startTime = Date.now();
    await db.query('SELECT 1');
    const responseTime = Date.now() - startTime;
    
    return {
      status: 'healthy',
      responseTime,
      timestamp: new Date().toISOString()
    };
  }
  
  async checkMCPConnectivity() {
    // Test MCP resource access
    const testClient = new MCPTestClient();
    await testClient.connect(this.server);
    const resources = await testClient.listResources();
    await testClient.disconnect();
    
    return {
      status: 'healthy',
      resourceCount: resources.resources.length,
      timestamp: new Date().toISOString()
    };
  }
  
  calculateOverallHealth(results) {
    const unhealthyChecks = Object.values(results)
      .filter(result => result.status === 'unhealthy');
    
    return unhealthyChecks.length === 0 ? 'healthy' : 'unhealthy';
  }
}
\`\`\`

## Implementation Checklist

### Pre-Implementation ✅
- [ ] Requirements gathering completed
- [ ] Architecture design approved
- [ ] Development environment setup
- [ ] Team training completed
- [ ] Project timeline established

### Core Development ✅
- [ ] Database schema implemented
- [ ] Business services developed
- [ ] MCP server foundation created
- [ ] Resource management implemented
- [ ] API endpoints developed

### Integration ✅
- [ ] MCP resource integration completed
- [ ] Third-party service integration
- [ ] Authentication/authorization implemented
- [ ] Error handling standardized
- [ ] Logging and monitoring setup

### Testing ✅
- [ ] Unit tests written and passing
- [ ] Integration tests completed
- [ ] End-to-end tests validated
- [ ] Performance tests passed
- [ ] Security tests conducted

### Deployment ✅
- [ ] Production environment prepared
- [ ] Database migration scripts ready
- [ ] Deployment automation configured
- [ ] Monitoring and alerting setup
- [ ] Backup and recovery procedures tested

### Go-Live ✅
- [ ] User training completed
- [ ] Documentation finalized
- [ ] Support procedures established
- [ ] Performance monitoring active
- [ ] Success metrics tracking enabled

This comprehensive implementation guide provides the detailed steps needed to successfully deploy a complete MCP ERP system from conception to production.
`;