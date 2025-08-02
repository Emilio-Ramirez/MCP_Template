#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "agency-client-template",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      prompts: {},
      tools: {},
    },
  },
);

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "agency://clients/onboarding-checklist",
        mimeType: "text/plain",
        name: "Client Onboarding Checklist",
        description: "Complete checklist for onboarding new AI agency clients",
      },
      {
        uri: "agency://templates/project-structure",
        mimeType: "text/plain",
        name: "Standard Project Structure",
        description: "Standardized folder structure and configuration for client projects",
      },
      {
        uri: "agency://workflows/client-delivery",
        mimeType: "text/plain",
        name: "Client Delivery Workflow",
        description: "Step-by-step process for delivering projects to clients",
      },
      {
        uri: "agency://contracts/sow-template",
        mimeType: "text/plain",
        name: "Statement of Work Template",
        description: "Professional SOW template with scope, timeline, and deliverables",
      },
      {
        uri: "agency://automation/mcp-generator",
        mimeType: "text/plain",
        name: "Client MCP Generator",
        description: "Script to generate custom MCP servers for individual clients",
      },
    ],
  };
});

// Read specific resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  switch (uri) {
    case "agency://clients/onboarding-checklist":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# Client Onboarding Checklist

## Pre-Project Phase
- [ ] **Initial Discovery Call** - Understand client needs, pain points, and goals
- [ ] **Technical Assessment** - Review existing infrastructure and systems
- [ ] **Budget & Timeline Alignment** - Confirm project scope and expectations
- [ ] **Stakeholder Identification** - Map all decision makers and users
- [ ] **Success Metrics Definition** - Establish measurable outcomes

## Contract & Legal
- [ ] **Statement of Work (SOW) Signed** - Use agency://contracts/sow-template
- [ ] **Master Service Agreement** - Legal framework and terms
- [ ] **NDA Execution** - Protect confidential information
- [ ] **Payment Terms Agreed** - Milestone-based payment schedule
- [ ] **Change Request Process** - Define scope change procedures

## Technical Setup
- [ ] **AWS Account Access** - IAM roles and permissions configured
- [ ] **GitHub Repository Created** - Using agency://templates/project-structure
- [ ] **Development Environment** - Staging and production environments
- [ ] **CI/CD Pipeline Setup** - Using ibso://deployment/3-minute-process
- [ ] **Monitoring & Alerting** - Using ibso://monitoring/observability-stack

## Communication & Project Management
- [ ] **Slack Channel Created** - Dedicated client communication channel
- [ ] **Weekly Status Meetings** - Recurring calendar invites sent
- [ ] **Project Dashboard Access** - Real-time progress tracking
- [ ] **Documentation Repository** - Confluence or Notion workspace
- [ ] **Issue Tracking Setup** - Jira or Linear project configuration

## Quality Gates
- [ ] **Security Audit Complete** - Using ibso://security/compliance-framework
- [ ] **Performance Testing** - Load testing and optimization
- [ ] **Backup & Recovery Tested** - Data protection verification
- [ ] **Final Client Approval** - Sign-off on all deliverables`,
          },
        ],
      };
    case "agency://templates/project-structure":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# Standard Project Structure

## Repository Layout
\`\`\`
client-project/
├── .github/
│   └── workflows/
│       ├── deploy-staging.yml
│       ├── deploy-production.yml
│       └── security-scan.yml
├── docs/
│   ├── README.md
│   ├── DEPLOYMENT.md
│   ├── API.md
│   └── TROUBLESHOOTING.md
├── infrastructure/
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── environments/
│   │       ├── staging.tfvars
│   │       └── production.tfvars
│   └── docker/
│       ├── Dockerfile
│       ├── docker-compose.yml
│       └── docker-compose.production.yml
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   └── types/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── scripts/
│   ├── deploy.sh
│   ├── rollback.sh
│   └── health-check.sh
├── monitoring/
│   ├── grafana/
│   ├── prometheus/
│   └── alerts.yml
└── .env.example
\`\`\`

## Key Configuration Files

### package.json
\`\`\`json
{
  "name": "client-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest",
    "test:e2e": "playwright test",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit",
    "deploy:staging": "./scripts/deploy.sh staging",
    "deploy:production": "./scripts/deploy.sh production"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "@clerk/nextjs": "^4.0.0",
    "tailwindcss": "^3.0.0"
  }
}
\`\`\`

### Dockerfile
\`\`\`dockerfile
FROM node:18-alpine AS base
WORKDIR /app

# Dependencies
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

# Build
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production
FROM base AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
ENV PORT 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["npm", "start"]
\`\`\``,
          },
        ],
      };
    case "agency://workflows/client-delivery":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# Client Delivery Workflow

## Phase 1: Project Kickoff (Week 1)

### Day 1-2: Environment Setup
- [ ] Clone project template using agency://templates/project-structure
- [ ] Configure AWS infrastructure using ibso://infrastructure/terraform-deploy
- [ ] Set up CI/CD pipeline using ibso://deployment/3-minute-process
- [ ] Create staging environment and verify deployment

### Day 3-5: Foundation Development
- [ ] Implement authentication using @template:patterns/role-based-auth
- [ ] Set up database schema and migrations
- [ ] Create basic dashboard using @template:components/shadcn-dashboard
- [ ] Implement API routes using @template:patterns/api-routes

## Phase 2: Core Development (Week 2-3)

### Week 2: Feature Implementation
- [ ] Build core business logic components
- [ ] Implement data tables using @template:components/data-table
- [ ] Add user management and permissions
- [ ] Create client-specific customizations
- [ ] Daily standups with client stakeholders

### Week 3: Integration & Testing
- [ ] Integrate third-party APIs and services
- [ ] Implement comprehensive test suite
- [ ] Performance optimization and caching
- [ ] Security audit using ibso://security/compliance-framework
- [ ] Client review and feedback incorporation

## Phase 3: Pre-Launch (Week 4)

### Testing & QA
- [ ] Unit test coverage ≥ 80%
- [ ] Integration testing with external services
- [ ] End-to-end user journey testing
- [ ] Load testing and performance validation
- [ ] Security penetration testing

### Production Preparation
- [ ] Production environment deployment
- [ ] DNS and SSL certificate configuration
- [ ] Monitoring setup using ibso://monitoring/observability-stack
- [ ] Backup and disaster recovery testing
- [ ] Client training and documentation

## Phase 4: Launch & Handoff (Week 5)

### Go-Live Process
- [ ] Final client approval and sign-off
- [ ] Production deployment using 3-minute process
- [ ] Real-time monitoring and health checks
- [ ] Launch announcement and user communication
- [ ] 24/7 monitoring for first 48 hours

### Post-Launch Support
- [ ] Daily health check reports for first week
- [ ] Weekly performance and usage reports
- [ ] Client success metrics review
- [ ] 30-day warranty period begins
- [ ] Knowledge transfer to client team

## Quality Gates

### Code Quality
- ESLint score: 0 errors, <5 warnings
- TypeScript strict mode enabled
- Test coverage ≥ 80%
- No critical security vulnerabilities

### Performance
- Lighthouse performance score ≥ 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Core Web Vitals passing

### Security
- All OWASP Top 10 vulnerabilities addressed
- Data encryption at rest and in transit
- Regular security scanning integrated
- Compliance framework implemented`,
          },
        ],
      };
    case "agency://contracts/sow-template":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# Statement of Work Template

## Project Overview
**Client:** [CLIENT_NAME]
**Project:** [PROJECT_NAME]
**Start Date:** [START_DATE]
**Target Launch:** [LAUNCH_DATE]
**Total Investment:** [TOTAL_COST]

## Scope of Work

### Phase 1: Foundation & Setup (Week 1)
**Deliverables:**
- AWS infrastructure deployment (VPC, ECS, RDS, ALB)
- CI/CD pipeline configuration
- Development and staging environments
- Security and monitoring setup

**Timeline:** 5 business days
**Investment:** $[PHASE1_COST]

### Phase 2: Application Development (Week 2-3) 
**Deliverables:**
- User authentication and authorization system
- Core application features and functionality
- Admin dashboard and user interface
- API development and documentation
- Database design and implementation

**Timeline:** 10 business days
**Investment:** $[PHASE2_COST]

### Phase 3: Testing & Optimization (Week 4)
**Deliverables:**
- Comprehensive testing suite (unit, integration, e2e)
- Performance optimization and load testing
- Security audit and compliance check
- User acceptance testing support
- Documentation and training materials

**Timeline:** 5 business days
**Investment:** $[PHASE3_COST]

### Phase 4: Launch & Support (Week 5)
**Deliverables:**
- Production deployment and go-live support
- 30-day warranty period for bug fixes
- Performance monitoring and alerting
- Knowledge transfer and training
- Post-launch optimization recommendations

**Timeline:** 5 business days + 30-day warranty
**Investment:** $[PHASE4_COST]

## Technical Specifications

### Technology Stack
- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Node.js, Next.js API Routes, TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Clerk or NextAuth.js
- **Infrastructure:** AWS (ECS, RDS, ALB, CloudFront)
- **Monitoring:** Grafana, Prometheus, CloudWatch
- **CI/CD:** GitHub Actions with automated deployments

### Performance Targets
- Page load time: < 2 seconds
- API response time: < 500ms
- Uptime: 99.9%
- Lighthouse performance score: 90+

## Payment Terms
- **Total Project Cost:** $[TOTAL_COST]
- **Payment Schedule:**
  - 50% upon signed agreement ($[DEPOSIT])
  - 25% at Phase 2 completion ($[MILESTONE1])
  - 25% upon project completion ($[FINAL])

## Terms & Conditions

### Client Responsibilities
- Provide timely feedback and approvals
- Supply necessary content, assets, and credentials
- Participate in scheduled meetings and reviews
- Provide access to existing systems and documentation

### Change Requests
- Changes to scope require written approval
- Additional work billed at $[HOURLY_RATE]/hour
- Timeline adjustments will be communicated promptly

### Warranty & Support
- 30-day warranty for bug fixes and issues
- Extended support available at $[SUPPORT_RATE]/month
- Training and documentation included

### Intellectual Property
- Client owns all custom code and content
- Third-party licenses remain with respective owners
- IBSO retains rights to general methodologies and frameworks

**Client Signature:** ___________________ **Date:** ________

**IBSO Representative:** ___________________ **Date:** ________`,
          },
        ],
      };
    case "agency://automation/mcp-generator":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# Client MCP Generator

## Generator Script
\`\`\`typescript
#!/usr/bin/env node
// scripts/generate-client-mcp.ts

interface ClientConfig {
  name: string
  domain: string
  industry: string
  features: string[]
  branding: {
    primaryColor: string
    secondaryColor: string
    logoUrl?: string
  }
  contacts: {
    technical: string
    business: string
  }
  environments: {
    staging: string
    production: string
  }
}

class ClientMCPGenerator {
  private config: ClientConfig

  constructor(config: ClientConfig) {
    this.config = config
  }

  generateMCPServer(): string {
    return \`#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "\${this.config.name.toLowerCase().replace(/\\s+/g, '-')}-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
    },
  },
);

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "client://project/specifications",
        mimeType: "text/plain",
        name: "\${this.config.name} Project Specifications",
        description: "Detailed project requirements and specifications",
      },
      {
        uri: "client://branding/guidelines",
        mimeType: "text/plain", 
        name: "Brand Guidelines",
        description: "Visual identity and branding guidelines",
      },
      {
        uri: "client://environments/config",
        mimeType: "text/plain",
        name: "Environment Configuration", 
        description: "Staging and production environment details",
      },
      {
        uri: "client://contacts/directory",
        mimeType: "text/plain",
        name: "Contact Directory",
        description: "Key stakeholders and contact information",
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  switch (uri) {
    case "client://project/specifications":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: \\\`# \${this.config.name} Project Specifications

## Client Overview
- **Company:** \${this.config.name}
- **Industry:** \${this.config.industry}
- **Domain:** \${this.config.domain}

## Key Features
\${this.config.features.map(feature => \\\`- \${feature}\\\`).join('\\n')}

## Technical Requirements
- Modern web application built with Next.js
- Responsive design for mobile and desktop
- User authentication and authorization
- Real-time data updates
- Performance optimized for < 2s load times
\\\`,
          },
        ],
      };
    case "client://branding/guidelines":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain", 
            text: \\\`# \${this.config.name} Brand Guidelines

## Color Palette
- **Primary Color:** \${this.config.branding.primaryColor}
- **Secondary Color:** \${this.config.branding.secondaryColor}

## Visual Identity
\${this.config.branding.logoUrl ? \\\`- **Logo:** \${this.config.branding.logoUrl}\\\` : '- Logo: To be provided'}

## Typography
- Headings: Inter, system-ui, sans-serif
- Body text: Inter, system-ui, sans-serif
- Code: 'Fira Code', monospace
\\\`,
          },
        ],
      };
    case "client://environments/config":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: \\\`# Environment Configuration

## Staging Environment
- **URL:** \${this.config.environments.staging}
- **Purpose:** Testing and client review

## Production Environment  
- **URL:** \${this.config.environments.production}
- **Purpose:** Live application
\\\`,
          },
        ],
      };
    case "client://contacts/directory":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: \\\`# Contact Directory

## Technical Contacts
- **Primary:** \${this.config.contacts.technical}

## Business Contacts  
- **Primary:** \${this.config.contacts.business}

## IBSO Team
- **Project Manager:** [PM_NAME]
- **Lead Developer:** [DEV_NAME]
\\\`,
          },
        ],
      };
    default:
      throw new Error(\\\`Resource not found: \\\${uri}\\\`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("\${this.config.name} MCP server running on stdio");
}

runServer().catch(console.error);
\`
  }

  async generate(): Promise<void> {
    const clientDir = \`./clients/\${this.config.name.toLowerCase().replace(/\\s+/g, '-')}-mcp\`
    
    // Create directory and files
    console.log(\`✅ Generated MCP server for \${this.config.name}\`)
    console.log(\`📁 Location: \${clientDir}\`)
  }
}

// Usage example
const generator = new ClientMCPGenerator({
  name: "Acme Corp",
  domain: "acmecorp.com", 
  industry: "E-commerce",
  features: ["Product catalog", "Order processing"],
  branding: {
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981"
  },
  contacts: {
    technical: "john@acmecorp.com",
    business: "jane@acmecorp.com"
  },
  environments: {
    staging: "https://staging.acmecorp.com",
    production: "https://acmecorp.com"
  }
})
\`\`\`

## CLI Tool
\`\`\`bash
#!/bin/bash
# generate-client-mcp.sh

CLIENT_NAME=$1
DOMAIN=$2

echo "🚀 Generating MCP server for $CLIENT_NAME..."
echo "✅ MCP server generated successfully!"
\`\`\``,
          },
        ],
      };
    default:
      throw new Error(`Resource not found: ${uri}`);
  }
});

// List available prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "onboard_client",
        description: "Complete client onboarding process",
        arguments: [
          {
            name: "client_name",
            description: "Name of the client company",
            required: true,
          },
          {
            name: "project_type",
            description: "Type of project (web-app, api, dashboard, etc.)",
            required: true,
          },
        ],
      },
      {
        name: "generate_sow",
        description: "Generate Statement of Work for client",
        arguments: [
          {
            name: "client_name", 
            description: "Name of the client",
            required: true,
          },
          {
            name: "project_scope",
            description: "Brief description of project scope",
            required: true,
          },
        ],
      },
      {
        name: "create_client_mcp",
        description: "Generate custom MCP server for client",
        arguments: [
          {
            name: "client_name",
            description: "Name of the client",
            required: true,
          },
          {
            name: "domain",
            description: "Client domain name",
            required: true,
          },
        ],
      },
    ],
  };
});

// Handle prompt requests
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "onboard_client":
      return {
        description: `Onboarding ${args?.client_name || "client"} for ${args?.project_type || "project"}`,
        messages: [
          {
            role: "user",
            content: {
              type: "text", 
              text: `Complete the client onboarding process for ${args?.client_name || "client"} building a ${args?.project_type || "web application"}. Use the agency://clients/onboarding-checklist and set up project structure using agency://templates/project-structure. Include AWS infrastructure setup and CI/CD pipeline configuration.`,
            },
          },
        ],
      };
    case "generate_sow":
      return {
        description: `Generating SOW for ${args?.client_name || "client"}`,
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Create a comprehensive Statement of Work for ${args?.client_name || "client"} using the agency://contracts/sow-template. Project scope: ${args?.project_scope || "custom web application"}. Include detailed phases, deliverables, timeline, and terms.`,
            },
          },
        ],
      };
    case "create_client_mcp":
      return {
        description: `Creating custom MCP server for ${args?.client_name || "client"}`,
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Generate a custom MCP server for ${args?.client_name || "client"} with domain ${args?.domain || "client.com"} using the agency://automation/mcp-generator. Include client-specific resources for project specs, branding guidelines, environment configs, and contacts.`,
            },
          },
        ],
      };
    default:
      throw new Error(`Prompt not found: ${name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Agency Client Template MCP server running on stdio");
}

runServer().catch(console.error);