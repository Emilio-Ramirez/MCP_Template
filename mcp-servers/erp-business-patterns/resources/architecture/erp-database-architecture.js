export const erpDatabaseArchitecture = {
  name: "ERP Database Architecture",
  description: "Comprehensive database architecture documentation covering technology stack (Drizzle ORM, PGlite), connection patterns, migration strategies, schema conventions, and development workflow setup",
  
  overview: {
    purpose: "Complete database architecture guide for modern ERP systems",
    technologyStack: ["PostgreSQL", "Drizzle ORM", "PGlite", "TypeScript", "Next.js"],
    scope: "Production database design, development patterns, and operational procedures",
    context: "Chemical manufacturing ERP with complex business rules and multi-tenant considerations"
  },

  technologyStack: {
    database: {
      production: {
        engine: "PostgreSQL 15+",
        rationale: "ACID compliance, advanced JSON support, excellent performance for complex queries",
        configuration: {
          connectionPooling: "PgBouncer for connection management",
          replication: "Primary-replica setup for read scaling",
          backup: "Automated daily backups with point-in-time recovery",
          monitoring: "PostgreSQL extension + custom metrics"
        },
        scalingConsiderations: [
          "Horizontal read scaling with read replicas",
          "Partitioning for large tables (requests, formulations)",
          "Index optimization for query performance",
          "Connection pooling for concurrent user support"
        ]
      },
      
      development: {
        engine: "PGlite",
        rationale: "Lightweight PostgreSQL-compatible database for local development",
        benefits: [
          "No Docker/external dependencies required",
          "Fast setup and teardown for testing",
          "Consistent SQL behavior with production PostgreSQL",
          "WASM-based for browser compatibility"
        ],
        limitations: [
          "Single-user development only",
          "Limited storage capacity",
          "Not suitable for production workloads",
          "Missing some PostgreSQL extensions"
        ],
        setupExample: `
// pglite-setup.ts
import { PGlite } from '@electric-sql/pglite';

export const createDevDatabase = async () => {
  const db = new PGlite('./dev-database');
  
  // Enable extensions if needed
  await db.exec('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  
  return db;
};

// Development database initialization
const devDb = await createDevDatabase();
export default devDb;`
      },
      
      testing: {
        strategy: "In-memory PGlite instances for unit/integration tests",
        benefits: ["Fast test execution", "Isolated test environments", "No test data pollution"],
        testSetup: `
// test-database.ts
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { migrate } from 'drizzle-orm/pglite/migrator';

export const createTestDatabase = async () => {
  const testDb = new PGlite(); // In-memory
  const db = drizzle(testDb);
  
  // Run migrations
  await migrate(db, { migrationsFolder: './drizzle/migrations' });
  
  return { db, testDb };
};

// Usage in tests
beforeEach(async () => {
  const { db } = await createTestDatabase();
  // Use fresh database for each test
});`
      }
    },

    orm: {
      framework: "Drizzle ORM",
      rationale: "Type-safe, SQL-like query builder with excellent TypeScript integration",
      advantages: [
        "Type safety at compile time",
        "SQL-like syntax for complex queries", 
        "Excellent performance with minimal overhead",
        "Great migration system",
        "IDE autocompletion and error detection"
      ],
      
      configuration: `
// drizzle.config.ts
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema/*',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;`,

      schemaDefinition: `
// Example schema definition with Drizzle
import { pgTable, text, timestamp, integer, boolean, jsonb, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  rfc: text('rfc').unique(),
  country: text('country').notNull(),
  zone: text('zone').notNull(),
  status: text('status').notNull().default('ACTIVE'),
  businessRules: jsonb('business_rules'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Zod schemas for validation
export const insertClientSchema = createInsertSchema(clients);
export const selectClientSchema = createSelectSchema(clients);`
    }
  },

  connectionPatterns: {
    productionConnection: {
      pattern: "Connection pooling with environment-based configuration",
      implementation: `
// db/connection.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Configure connection pool
const queryClient = postgres(connectionString, {
  max: 20, // Maximum connections
  idle_timeout: 20, // Close idle connections after 20s
  connect_timeout: 10, // Connection timeout
  prepare: false, // Disable prepared statements for compatibility
});

export const db = drizzle(queryClient, { schema });

// Graceful shutdown
process.on('SIGINT', () => queryClient.end());
process.on('SIGTERM', () => queryClient.end());`,
      
      environmentConfiguration: `
# Production
DATABASE_URL=postgresql://user:password@localhost:5432/erp_production

# Staging
DATABASE_URL=postgresql://user:password@staging-db:5432/erp_staging

# Development (with PGlite fallback)
DATABASE_URL=./dev-database
DEVELOPMENT_MODE=true`
    },

    developmentConnection: {
      pattern: "PGlite-based local development with automatic setup",
      implementation: `
// db/dev-connection.ts
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { migrate } from 'drizzle-orm/pglite/migrator';
import * as schema from './schema';

let devDatabase: PGlite;
let db: ReturnType<typeof drizzle>;

export const getDevDatabase = async () => {
  if (!devDatabase) {
    devDatabase = new PGlite('./dev-database');
    db = drizzle(devDatabase, { schema });
    
    // Auto-run migrations on first connection
    await migrate(db, { migrationsFolder: './drizzle/migrations' });
    
    console.log('✅ Development database initialized');
  }
  
  return db;
};

// Reset database for development
export const resetDevDatabase = async () => {
  if (devDatabase) {
    await devDatabase.close();
    devDatabase = undefined;
  }
  
  // Remove database file and reinitialize
  const fs = await import('fs/promises');
  try {
    await fs.rm('./dev-database', { recursive: true, force: true });
  } catch (error) {
    // Database file might not exist
  }
  
  return getDevDatabase();
};`
    },

    connectionFactory: {
      pattern: "Environment-aware connection factory",
      implementation: `
// db/factory.ts
import { getDevDatabase } from './dev-connection';
import { db as prodDb } from './connection';

export const getDatabase = () => {
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                       process.env.DEVELOPMENT_MODE === 'true';
  
  if (isDevelopment && !process.env.DATABASE_URL?.startsWith('postgresql://')) {
    return getDevDatabase();
  }
  
  return prodDb;
};

// Type-safe database access
export type Database = Awaited<ReturnType<typeof getDatabase>>;`
    }
  },

  migrationStrategies: {
    developmentWorkflow: {
      description: "Schema-first development with automatic migration generation",
      process: [
        "1. Modify schema files in src/db/schema/",
        "2. Generate migration: npm run db:generate",
        "3. Review generated SQL migration",
        "4. Apply migration: npm run db:migrate",
        "5. Commit schema changes and migration files"
      ],
      
      commands: `
# Package.json scripts
{
  "scripts": {
    "db:generate": "drizzle-kit generate:pg",
    "db:migrate": "drizzle-kit push:pg",
    "db:studio": "drizzle-kit studio",
    "db:reset": "node scripts/reset-dev-db.js",
    "db:seed": "tsx scripts/seed-database.ts"
  }
}`,

      migrationGeneration: `
// Generate migration after schema changes
npm run db:generate

// Example generated migration
-- Migration: 0001_add_clients_table.sql
CREATE TABLE IF NOT EXISTS "clients" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "rfc" text UNIQUE,
  "country" text NOT NULL,
  "zone" text NOT NULL,
  "status" text DEFAULT 'ACTIVE' NOT NULL,
  "business_rules" jsonb,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "clients_country_idx" ON "clients" ("country");
CREATE INDEX IF NOT EXISTS "clients_zone_idx" ON "clients" ("zone");`
    },

    productionDeployment: {
      description: "Safe production migration deployment with rollback capabilities",
      strategy: [
        "1. Test migrations on staging environment",
        "2. Create database backup before deployment",
        "3. Apply migrations during maintenance window",
        "4. Verify migration success with automated tests",
        "5. Monitor application performance post-migration"
      ],
      
      migrationScript: `
// scripts/production-migrate.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const runProductionMigration = async () => {
  const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });
  const db = drizzle(migrationClient);
  
  try {
    console.log('🚀 Starting database migration...');
    
    await migrate(db, { 
      migrationsFolder: './drizzle/migrations',
      migrationsTable: 'drizzle_migrations'
    });
    
    console.log('✅ Migration completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await migrationClient.end();
  }
};

runProductionMigration();`,

      rollbackStrategy: {
        approach: "Down migrations for critical rollbacks",
        implementation: "Manual rollback scripts for each major migration",
        backupStrategy: "Point-in-time recovery for emergency rollbacks"
      }
    },

    branchingStrategy: {
      description: "Feature branch migrations with conflict resolution",
      workflow: [
        "1. Create feature branch with schema changes",
        "2. Generate migrations in feature branch",
        "3. Test migrations locally with PGlite",
        "4. Merge to main with migration conflict resolution",
        "5. Consolidate migrations if needed"
      ],
      
      conflictResolution: `
// Handle migration conflicts during merge
# If migration numbers conflict:
1. Rename migration files to maintain chronological order
2. Update migration references in code
3. Test consolidated migrations

# For schema conflicts:  
1. Merge schema changes manually
2. Re-generate migrations for merged schema
3. Test end-to-end with fresh database`
    }
  },

  schemaConventions: {
    namingConventions: {
      tables: {
        pattern: "snake_case, plural nouns",
        examples: ["clients", "commercial_requests", "formulations", "material_classifications"],
        businessLogic: "Table names reflect business entities directly"
      },
      
      columns: {
        pattern: "snake_case, descriptive names",
        examples: ["client_id", "request_type", "delivery_date_requested", "formulation_version"],
        foreignKeys: "Reference table name + _id (e.g., client_id, standard_type_id)"
      },
      
      indexes: {
        pattern: "table_column(s)_idx",
        examples: ["clients_country_idx", "requests_status_created_at_idx"],
        compositeIndexes: "Most selective column first"
      },
      
      constraints: {
        pattern: "table_column_constraint",
        examples: ["clients_rfc_unique", "requests_status_check", "formulations_version_positive"],
        businessRules: "Encode business logic in constraint names"
      }
    },

    dataTypes: {
      identifiers: {
        primary: "uuid DEFAULT gen_random_uuid()",
        rationale: "Globally unique, non-sequential for security",
        indexing: "Primary key index automatic, additional indexes as needed"
      },
      
      timestamps: {
        pattern: "timestamp DEFAULT now()",
        standardFields: ["created_at", "updated_at", "deleted_at"],
        timezones: "Use timestamp with time zone for international operations"
      },
      
      enums: {
        pattern: "text with CHECK constraints",
        rationale: "Flexible enum-like behavior without PostgreSQL enum limitations",
        example: `
status text NOT NULL DEFAULT 'PENDING_INFO' 
CHECK (status IN ('PENDING_INFO', 'IN_REVIEW', 'ACCEPTED', 'FORMULATION_IN_PROGRESS'))`,
        migration: "Easy to add new values without ALTER TYPE"
      },
      
      jsonFields: {
        usage: "Complex, semi-structured data that doesn't need querying",
        examples: ["business_rules", "configuration_data", "metadata"],
        indexing: "GIN indexes for JSON path queries when needed",
        validation: "Zod schemas for type safety in application layer"
      }
    },

    relationshipPatterns: {
      foreignKeys: {
        enforcement: "Database-level constraints for data integrity",
        cascading: "CASCADE on UPDATE, RESTRICT on DELETE (configurable)",
        indexing: "Automatic indexes on foreign key columns",
        naming: "Explicit constraint names for clarity"
      },
      
      manyToMany: {
        pattern: "Junction tables with meaningful names",
        example: "material_classifications (material_id, product_type_id)",
        additionalData: "Include relationship metadata in junction table",
        indexing: "Composite indexes on both foreign keys"
      },
      
      hierarchical: {
        pattern: "Adjacency list with path materialization",
        example: "parent_id + path for organizational structures",
        queries: "CTEs for recursive queries, paths for efficient lookups"
      }
    }
  },

  developmentWorkflow: {
    localSetup: {
      description: "Zero-dependency local development setup",
      requirements: ["Node.js 18+", "npm/yarn", "TypeScript"],
      
      initialSetup: `
# 1. Clone repository
git clone <repository-url>
cd erp-system

# 2. Install dependencies
npm install

# 3. Set environment variables
cp .env.example .env.local
# Edit .env.local with local settings

# 4. Initialize database
npm run db:setup

# 5. Run development server
npm run dev`,

      databaseSetup: `
# Database setup script
#!/bin/bash

echo "🔧 Setting up development database..."

# Create dev database with PGlite
npm run db:generate
npm run db:migrate

# Seed with initial data
npm run db:seed

echo "✅ Development database ready!"`
    },

    schemaEvolution: {
      addingTables: {
        process: [
          "1. Create schema file in src/db/schema/",
          "2. Export from src/db/schema/index.ts",
          "3. Generate migration with npm run db:generate",
          "4. Review and apply migration",
          "5. Update seed data if needed"
        ],
        
        example: `
// src/db/schema/suppliers.ts
import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

export const suppliers = pgTable('suppliers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  status: text('status').notNull().default('PENDING_APPROVAL'),
  certifications: text('certifications').array(),
  contactInfo: jsonb('contact_info'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  isActive: boolean('is_active').default(true),
});`
      },
      
      modifyingTables: {
        addingColumns: "Add new columns with defaults, handle nullability carefully",
        removingColumns: "Deprecate first, remove in later migration",
        changingTypes: "Create new column, migrate data, drop old column",
        businessLogic: "Encode new business rules in schema constraints"
      },
      
      dataSeeding: {
        strategy: "Idempotent seed scripts with data versioning",
        implementation: `
// scripts/seed-database.ts
import { db } from '../src/db/connection';
import { clients, standardTypes, colorCodes } from '../src/db/schema';

const seedDatabase = async () => {
  console.log('🌱 Seeding database...');
  
  // Seed configuration data
  await db.insert(standardTypes).values([
    { name: 'Polyester TGIC', description: 'Triglycidyl isocyanurate polyester' },
    { name: 'Polyester HAA', description: 'Hydroxyalkylamide polyester' },
    { name: 'Epoxy', description: 'Bisphenol A epoxy' },
  ]).onConflictDoNothing();
  
  // Seed sample clients
  await db.insert(clients).values([
    { 
      name: 'ACME Manufacturing', 
      country: 'USA', 
      zone: 'NORTH_AMERICA',
      businessRules: { autoProcess: false, requiresApproval: true }
    },
    { 
      name: 'Industrias XYZ', 
      country: 'Mexico', 
      zone: 'MEXICO',
      rfc: 'XYZ123456789',
      businessRules: { autoProcess: true, requiresApproval: false }
    },
  ]).onConflictDoNothing();
  
  console.log('✅ Database seeded successfully');
};

seedDatabase().catch(console.error);`
      }
    },

    testingStrategy: {
      unitTests: {
        approach: "Isolated database per test with PGlite",
        benefits: ["No test interference", "Fast execution", "Consistent state"],
        
        testHelper: `
// tests/helpers/database.ts
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { migrate } from 'drizzle-orm/pglite/migrator';
import * as schema from '../../src/db/schema';

export const createTestDb = async () => {
  const pglite = new PGlite();
  const db = drizzle(pglite, { schema });
  
  await migrate(db, { migrationsFolder: './drizzle/migrations' });
  
  return { db, pglite };
};

// Usage in tests
describe('Client management', () => {
  let db: Database;
  let pglite: PGlite;
  
  beforeEach(async () => {
    ({ db, pglite } = await createTestDb());
  });
  
  afterEach(async () => {
    await pglite.close();
  });
  
  test('should create client', async () => {
    const client = await db.insert(schema.clients).values({
      name: 'Test Client',
      country: 'USA',
      zone: 'NORTH_AMERICA'
    }).returning();
    
    expect(client[0].name).toBe('Test Client');
  });
});`
      },
      
      integrationTests: {
        approach: "Shared test database with transaction rollback",
        implementation: "Each test wrapped in transaction, rolled back after test",
        dataIsolation: "Test-specific data prefixes and cleanup procedures"
      }
    }
  },

  performanceOptimization: {
    indexingStrategy: {
      primaryIndexes: [
        "Primary keys (automatic)",
        "Foreign keys (automatic)", 
        "Unique constraints (automatic)",
        "Frequently queried columns"
      ],
      
      compositeIndexes: [
        "Multi-column WHERE clauses",
        "ORDER BY combinations",
        "Status + timestamp patterns",
        "User permission filtering"
      ],
      
      partialIndexes: [
        "Active records only (WHERE is_active = true)",
        "Recent records (WHERE created_at > some_date)",
        "Specific status values"
      ],
      
      indexMonitoring: `
-- Monitor index usage
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
WHERE idx_tup_read = 0
ORDER BY schemaname, tablename;`
    },

    queryOptimization: {
      patterns: [
        "Use select specific columns instead of SELECT *",
        "Implement efficient pagination with cursor-based approach",
        "Use EXISTS instead of IN for large subqueries",
        "Leverage partial indexes for filtered queries"
      ],
      
      drizzleOptimizations: `
// Efficient pagination pattern
const getRequests = async (cursor?: string, limit = 20) => {
  return db
    .select({
      id: requests.id,
      clientName: clients.name,
      status: requests.status,
      createdAt: requests.createdAt
    })
    .from(requests)
    .innerJoin(clients, eq(requests.clientId, clients.id))
    .where(cursor ? gt(requests.createdAt, cursor) : undefined)
    .orderBy(desc(requests.createdAt))
    .limit(limit);
};

// Use prepared statements for repeated queries
const getClientByRFC = db
  .select()
  .from(clients)
  .where(eq(clients.rfc, placeholder('rfc')))
  .prepare();`
    },

    connectionOptimization: {
      pooling: "PgBouncer for connection pooling in production",
      readReplicas: "Route read queries to replica databases",
      caching: "Redis for frequently accessed configuration data",
      monitoring: "Connection pool metrics and slow query logging"
    }
  },

  productionConsiderations: {
    backup: {
      strategy: "Continuous WAL archiving + daily full backups",
      retention: "30 days point-in-time recovery, 1 year monthly backups",
      testing: "Monthly backup restoration tests",
      automation: "Automated backup monitoring and alerts"
    },
    
    monitoring: {
      metrics: [
        "Connection pool utilization",
        "Query performance (slow query log)",
        "Index usage statistics",
        "Database size and growth",
        "Replication lag"
      ],
      
      alerts: [
        "High connection usage (>80%)",
        "Slow queries (>5 seconds)",
        "Replication lag (>1 minute)",
        "Database size approaching limits"
      ]
    },
    
    security: {
      access: "Role-based database access with minimal privileges",
      encryption: "SSL/TLS for connections, encrypted storage",
      auditing: "Database audit logging for sensitive operations",
      compliance: "Data retention policies and GDPR compliance"
    }
  }
};

export default erpDatabaseArchitecture;