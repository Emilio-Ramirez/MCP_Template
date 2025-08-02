export default `# New Project Setup Guide - IBSO Business Unit Implementation

This guide provides step-by-step instructions for setting up new client projects within the IBSO business unit ecosystem, ensuring consistent architecture, proper integration with base templates, and efficient development workflows.

## 🚀 Project Setup Overview

### Prerequisites Checklist
\`\`\`typescript
interface ProjectPrerequisites {
  // Business requirements
  businessRequirements: {
    businessCaseApproved: boolean;
    stakeholdersIdentified: boolean;
    scopeDocumented: boolean;
    budgetApproved: boolean;
    timelineEstablished: boolean;
  };
  
  // Technical requirements
  technicalRequirements: {
    technologyStackSelected: boolean;
    architectureDesigned: boolean;
    integrationRequirementsMapped: boolean;
    performanceRequirementsDefined: boolean;
    securityRequirementsDefined: boolean;
  };
  
  // Team readiness
  teamReadiness: {
    developmentTeamAssigned: boolean;
    projectManagerAssigned: boolean;
    businessAnalystAssigned: boolean;
    devOpsEngineerAssigned: boolean;
    qualityAssuranceAssigned: boolean;
  };
  
  // Infrastructure readiness
  infrastructureReadiness: {
    developmentEnvironmentReady: boolean;
    repositoryAccessConfigured: boolean;
    cicdPipelineTemplateAvailable: boolean;
    deploymentEnvironmentsProvisioned: boolean;
  };
}
\`\`\`

## 📋 Phase 1: Project Initialization

### Step 1: Business Analysis and Documentation
\`\`\`bash
# Create project documentation structure
mkdir -p ./[project-name]/documentation/{business,technical,user}
mkdir -p ./[project-name]/documentation/business/{workflows,requirements,domain-models}
mkdir -p ./[project-name]/documentation/technical/{architecture,api,deployment}
mkdir -p ./[project-name]/documentation/user/{guides,training}

# Initialize business documentation templates
cp ./templates/BUSINESS_REQUIREMENTS.md ./[project-name]/
cp ./templates/TECHNICAL_ARCHITECTURE.md ./[project-name]/
cp ./templates/README.md ./[project-name]/
\`\`\`

### Step 2: Domain Analysis and Pattern Selection
\`\`\`typescript
interface DomainAnalysis {
  // Industry identification
  industryAnalysis: {
    primaryIndustry: string;        // e.g., "Chemical Manufacturing"
    subIndustry: string;           // e.g., "Powder Coating"
    businessModel: string;         // e.g., "B2B Manufacturing"
    marketSegment: string;         // e.g., "Industrial Coatings"
  };
  
  // Business process mapping
  processMapping: {
    coreProcesses: BusinessProcess[];     // Primary value-creating processes
    supportProcesses: BusinessProcess[];  // Supporting business processes
    managementProcesses: BusinessProcess[]; // Management and oversight processes
  };
  
  // Stakeholder analysis
  stakeholderAnalysis: {
    internal: InternalStakeholder[];  // Company employees and departments
    external: ExternalStakeholder[];  // Customers, suppliers, regulators
    users: UserRole[];               // System users and their roles
  };
  
  // Compliance requirements
  complianceRequirements: {
    regulatory: RegulatoryRequirement[];  // Government regulations
    industry: IndustryStandard[];         // Industry standards
    customer: CustomerRequirement[];      // Customer-specific requirements
    internal: InternalPolicy[];          // Company policies
  };
}
\`\`\`

### Step 3: Base Template Pattern Selection
\`\`\`typescript
interface PatternSelectionProcess {
  // Available base patterns
  availablePatterns: {
    uiPatterns: {
      dialogPatterns: 'Mandatory unified dialog patterns';
      configurationTabs: 'Enterprise configuration management';
      dataTablePatterns: 'Advanced data display and interaction';
      formPatterns: 'Multi-step form architecture';
    };
    
    architecturalPatterns: {
      featureBasedOrganization: 'Scalable code organization';
      modularFormsSystem: 'Revolutionary form architecture';
      typescriptExcellence: 'Type-safe development practices';
      nextjsAdvancedRouting: 'Advanced routing and navigation';
    };
    
    integrationPatterns: {
      apiDesignPatterns: 'RESTful API best practices';
      authenticationPatterns: 'Secure authentication flows';
      internationalizationPatterns: 'Multi-language support';
      deploymentPatterns: 'Production deployment strategies';
    };
  };
  
  // Pattern selection criteria
  selectionCriteria: {
    businessRequirements: 'Patterns must support business needs';
    technicalConstraints: 'Patterns must fit technical constraints';
    teamExpertise: 'Team must have expertise with selected patterns';
    maintenanceComplexity: 'Consider long-term maintenance overhead';
    performance: 'Patterns must meet performance requirements';
    scalability: 'Patterns must support growth requirements';
  };
  
  // Customization planning
  customizationPlanning: {
    requiredCustomizations: PatternCustomization[];
    customDevelopment: CustomComponent[];
    integrationPoints: IntegrationPoint[];
    extensionPoints: ExtensionPoint[];
  };
}
\`\`\`

## 🏗️ Phase 2: Technical Foundation Setup

### Step 4: Repository and Development Environment Setup
\`\`\`bash
# Initialize Git repository
git init ./[project-name]
cd ./[project-name]

# Set up repository structure
mkdir -p {src,tests,config,deployment,scripts}
mkdir -p src/{features,lib,types,utils,components}
mkdir -p tests/{unit,integration,e2e}
mkdir -p config/{environments,business-rules,integrations}
mkdir -p deployment/{docker,terraform,scripts}

# Initialize package.json with base template dependencies
npm init -y
npm install @ibso/crm-template-base@latest
npm install @ibso/shared-components@latest
npm install @ibso/typescript-config@latest

# Copy base configuration files
cp node_modules/@ibso/crm-template-base/config/tsconfig.base.json ./tsconfig.json
cp node_modules/@ibso/crm-template-base/config/tailwind.config.base.js ./tailwind.config.js
cp node_modules/@ibso/crm-template-base/config/eslint.config.base.js ./eslint.config.js

# Initialize environment configuration
cp node_modules/@ibso/crm-template-base/config/env.example ./.env.example
cp .env.example .env.local
\`\`\`

### Step 5: Next.js Application Setup
\`\`\`bash
# Create Next.js application with TypeScript
npx create-next-app@latest . --typescript --tailwind --app --src-dir

# Install additional dependencies for enterprise features
npm install @clerk/nextjs                    # Authentication
npm install @tanstack/react-query           # Data fetching
npm install react-hook-form @hookform/resolvers/zod  # Forms
npm install zod                             # Validation
npm install @radix-ui/react-dialog @radix-ui/react-tabs  # UI primitives
npm install lucide-react                    # Icons
npm install next-intl                       # Internationalization
npm install @t3-oss/env-nextjs             # Environment validation

# Install development dependencies
npm install -D @types/node
npm install -D eslint-config-next
npm install -D prettier prettier-plugin-tailwindcss
npm install -D vitest @vitejs/plugin-react
npm install -D playwright @playwright/test
\`\`\`

### Step 6: Base Configuration Customization
\`\`\`typescript
// tsconfig.json - Extend base configuration
{
  "extends": "./node_modules/@ibso/typescript-config/tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/base/*": ["./node_modules/@ibso/crm-template-base/src/*"],
      "@/shared/*": ["./node_modules/@ibso/shared-components/src/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/components/*": ["./src/components/*"],
      "@/features/*": ["./src/features/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
  ]
}
\`\`\`

\`\`\`javascript
// tailwind.config.js - Extend base styling
const baseConfig = require('@ibso/crm-template-base/tailwind.config.base.js');

module.exports = {
  presets: [baseConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@ibso/crm-template-base/src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@ibso/shared-components/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Client-specific theme extensions
      colors: {
        brand: {
          primary: '#your-brand-color',
          secondary: '#your-secondary-color',
        },
      },
      fontFamily: {
        sans: ['Your-Custom-Font', ...baseConfig.theme.fontFamily.sans],
      },
    },
  },
};
\`\`\`

## 🔧 Phase 3: Core Development Setup

### Step 7: Feature Structure Implementation
\`\`\`bash
# Create feature-based directory structure
mkdir -p src/features/{[domain-feature],shared}
mkdir -p src/features/[domain-feature]/{components,hooks,services,types,constants}
mkdir -p src/features/[domain-feature]/components/{ui,forms,tables,modals}

# Example: Commercial requests feature
mkdir -p src/features/commercial-requests/{components,hooks,services,types,constants}
mkdir -p src/features/commercial-requests/components/{request-form,request-list,request-detail}
\`\`\`

### Step 8: Base Component Integration
\`\`\`typescript
// src/components/ui/index.ts - Re-export base components with customizations
export { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/base/components/ui/dialog';
export { Button } from '@/base/components/ui/button';
export { Input } from '@/base/components/ui/input';
export { Label } from '@/base/components/ui/label';
export { Tabs, TabsContent, TabsList, TabsTrigger } from '@/base/components/ui/tabs';

// Custom components that extend base components
export { CustomDataTable } from './custom-data-table';
export { ClientSpecificForm } from './client-specific-form';
\`\`\`

### Step 9: Application Architecture Setup
\`\`\`typescript
// src/lib/env.ts - Type-safe environment configuration
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    CLERK_SECRET_KEY: z.string().min(1),
    // Add client-specific environment variables
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    // Add client-specific public environment variables
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
});
\`\`\`

## 🎯 Phase 4: Business Logic Implementation

### Step 10: Domain Model Implementation
\`\`\`typescript
// src/types/domain.ts - Business domain type definitions
export interface BusinessEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

// Client-specific entities
export interface ClientSpecificEntity extends BusinessEntity {
  // Client-specific fields
  clientField1: string;
  clientField2: number;
  businessRuleField: boolean;
}

// Enums for business logic
export enum ClientSpecificStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}
\`\`\`

### Step 11: Business Rules Engine Setup
\`\`\`typescript
// src/lib/business-rules.ts - Client-specific business rules
interface BusinessRule<T> {
  name: string;
  description: string;
  validate: (data: T) => boolean;
  errorMessage: string;
}

export class ClientBusinessRules {
  private rules: BusinessRule<any>[] = [];
  
  addRule<T>(rule: BusinessRule<T>) {
    this.rules.push(rule);
  }
  
  validateEntity<T>(entity: T): ValidationResult {
    const errors: string[] = [];
    
    for (const rule of this.rules) {
      if (!rule.validate(entity)) {
        errors.push(rule.errorMessage);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

// Example client-specific business rules
export const clientBusinessRules = new ClientBusinessRules();

clientBusinessRules.addRule({
  name: 'minimum-order-value',
  description: 'Orders must meet minimum value requirement',
  validate: (order: any) => order.totalValue >= 1000,
  errorMessage: 'Order value must be at least $1,000',
});
\`\`\`

## 🚀 Phase 5: Testing and Quality Setup

### Step 12: Testing Framework Configuration
\`\`\`typescript
// vitest.config.ts - Unit testing configuration
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/base': path.resolve(__dirname, './node_modules/@ibso/crm-template-base/src'),
    },
  },
});
\`\`\`

\`\`\`typescript
// playwright.config.ts - E2E testing configuration
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
\`\`\`

### Step 13: CI/CD Pipeline Setup
\`\`\`yaml
# .github/workflows/ci.yml - Continuous Integration
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build
      
      - name: Run E2E tests
        run: npx playwright test
        
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: test-results
          path: test-results/
\`\`\`

## 📊 Phase 6: Monitoring and Documentation

### Step 14: Monitoring and Logging Setup
\`\`\`typescript
// src/lib/monitoring.ts - Application monitoring
import { Logger } from '@ibso/shared-logger';

export const logger = new Logger({
  service: 'client-project-name',
  environment: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL || 'info',
});

// Business event tracking
export function trackBusinessEvent(event: string, data: any) {
  logger.info('Business event', {
    event,
    data,
    timestamp: new Date().toISOString(),
  });
  
  // Send to analytics service
  if (process.env.ANALYTICS_ENABLED) {
    // Analytics implementation
  }
}
\`\`\`

### Step 15: Documentation Generation
\`\`\`bash
# Install documentation tools
npm install -D typedoc
npm install -D @storybook/nextjs

# Generate API documentation
npx typedoc src/lib src/types --out docs/api

# Set up Storybook for component documentation
npx storybook@latest init
\`\`\`

## ✅ Project Setup Validation Checklist

### Technical Validation
- [ ] Application builds without errors
- [ ] All tests pass (unit, integration, e2e)
- [ ] Type checking passes without errors
- [ ] Linting passes without errors
- [ ] Base template patterns integrated correctly
- [ ] Environment configuration working
- [ ] CI/CD pipeline configured and working

### Business Validation
- [ ] Business requirements documented
- [ ] Domain models implemented
- [ ] Business rules engine configured
- [ ] User roles and permissions defined
- [ ] Compliance requirements addressed
- [ ] Performance requirements met

### Quality Validation
- [ ] Code coverage meets minimum requirements (80%)
- [ ] Security scan passes
- [ ] Accessibility requirements met
- [ ] Performance benchmarks met
- [ ] Documentation complete and up-to-date
- [ ] Deployment procedures tested

### Team Readiness
- [ ] Development team trained on project structure
- [ ] Code review process established
- [ ] Development workflow documented
- [ ] Communication channels set up
- [ ] Project management tools configured

This comprehensive setup guide ensures that new IBSO client projects start with a solid foundation, proper integration with base templates, and all necessary tools and processes for successful development and deployment.`;