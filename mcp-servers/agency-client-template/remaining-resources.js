// Remaining agency resources to add

const remainingResources = `
    case "agency://contracts/sow-template":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: \`# Statement of Work Template

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

**IBSO Representative:** ___________________ **Date:** ________\`,
          },
        ],
      };
    case "agency://monitoring/client-dashboard":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: \`# Client Progress Dashboard

## Dashboard Components

### Project Health Overview
\\\`\\\`\\\`typescript
// components/ProjectHealthCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ProjectHealth {
  status: 'on-track' | 'at-risk' | 'delayed'
  completion: number
  phase: string
  nextMilestone: string
  daysRemaining: number
}

export function ProjectHealthCard({ project }: { project: ProjectHealth }) {
  const statusColors = {
    'on-track': 'bg-green-500',
    'at-risk': 'bg-yellow-500', 
    'delayed': 'bg-red-500'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Project Health
          <Badge className={statusColors[project.status]}>
            {project.status.replace('-', ' ').toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span>{project.completion}%</span>
            </div>
            <Progress value={project.completion} />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Current Phase</p>
              <p className="text-muted-foreground">{project.phase}</p>
            </div>
            <div>
              <p className="font-medium">Days Remaining</p>
              <p className="text-muted-foreground">{project.daysRemaining}</p>
            </div>
          </div>
          <div>
            <p className="font-medium text-sm">Next Milestone</p>
            <p className="text-sm text-muted-foreground">{project.nextMilestone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
\\\`\\\`\\\`

### Performance Metrics
\\\`\\\`\\\`typescript
// components/PerformanceMetrics.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface PerformanceData {
  date: string
  responseTime: number
  uptime: number
  errors: number
}

export function PerformanceMetrics({ data }: { data: PerformanceData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">99.9%</p>
            <p className="text-sm text-muted-foreground">Uptime</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">145ms</p>
            <p className="text-sm text-muted-foreground">Avg Response</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">2</p>
            <p className="text-sm text-muted-foreground">Errors (24h)</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="responseTime" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
\\\`\\\`\\\`

### Timeline & Milestones
\\\`\\\`\\\`typescript
// components/ProjectTimeline.tsx
import { CheckCircle, Circle, Clock } from 'lucide-react'

interface Milestone {
  id: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'pending'
  dueDate: string
  completedDate?: string
}

export function ProjectTimeline({ milestones }: { milestones: Milestone[] }) {
  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />
      case 'pending':
        return <Circle className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {getStatusIcon(milestone.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{milestone.title}</h4>
                  <span className="text-xs text-muted-foreground">
                    {milestone.completedDate || milestone.dueDate}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
\\\`\\\`\\\`

### Cost Tracking
\\\`\\\`\\\`typescript
// components/CostTracker.tsx
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react'

interface CostData {
  budgetUsed: number
  totalBudget: number
  monthlyRunCost: number
  projectedMonthlyCost: number
  lastMonthCost: number
}

export function CostTracker({ costs }: { costs: CostData }) {
  const budgetPercentage = (costs.budgetUsed / costs.totalBudget) * 100
  const costTrend = costs.projectedMonthlyCost > costs.lastMonthCost ? 'up' : 'down'
  const trendPercentage = Math.abs((costs.projectedMonthlyCost - costs.lastMonthCost) / costs.lastMonthCost * 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="h-5 w-5 mr-2" />
          Cost Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Project Budget Used</span>
              <span>\${costs.budgetUsed.toLocaleString()} / \${costs.totalBudget.toLocaleString()}</span>
            </div>
            <Progress value={budgetPercentage} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Monthly Run Cost</p>
              <p className="text-2xl font-bold">\${costs.monthlyRunCost}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Projected Next Month</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold mr-2">\${costs.projectedMonthlyCost}</p>
                {costTrend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-red-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-green-500" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {trendPercentage.toFixed(1)}% {costTrend} from last month
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
\\\`\\\`\\\`

## Dashboard Layout
\\\`\\\`\\\`typescript
// app/dashboard/page.tsx
import { ProjectHealthCard } from '@/components/ProjectHealthCard'
import { PerformanceMetrics } from '@/components/PerformanceMetrics'
import { ProjectTimeline } from '@/components/ProjectTimeline'
import { CostTracker } from '@/components/CostTracker'

export default async function ClientDashboard() {
  // Fetch data from your APIs
  const projectData = await getProjectData()
  const performanceData = await getPerformanceData()
  const milestones = await getMilestones()
  const costs = await getCostData()

  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Project Dashboard</h1>
        <p className="text-muted-foreground">Real-time project status and metrics</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ProjectHealthCard project={projectData} />
        <CostTracker costs={costs} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceMetrics data={performanceData} />
        <ProjectTimeline milestones={milestones} />
      </div>
    </div>
  )
}
\\\`\\\`\\\`\`,
          },
        ],
      };
    case "agency://automation/mcp-generator":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: \`# Client MCP Generator

## Generator Script
\\\`\\\`\\\`typescript
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
    return \\\`#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "\${this.config.name.toLowerCase().replace(/\\s+/g, '-')}-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      prompts: {},
    },
  },
);

// List available resources
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
        description: "Visual identity and branding guidelines for \${this.config.name}",
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
      {
        uri: "client://progress/milestones",
        mimeType: "text/plain",
        name: "Project Milestones",
        description: "Current progress and upcoming milestones",
      },
    ],
  };
});

// Read specific resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  switch (uri) {
    case "client://project/specifications":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: \\\\\`# \${this.config.name} Project Specifications

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

## Success Metrics
- User engagement and retention
- Page load performance
- System uptime and reliability
- Cost efficiency and scalability
\\\\\`,
          },
        ],
      };
    case "client://branding/guidelines":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain", 
            text: \\\\\`# \${this.config.name} Brand Guidelines

## Color Palette
- **Primary Color:** \${this.config.branding.primaryColor}
- **Secondary Color:** \${this.config.branding.secondaryColor}

## Visual Identity
\${this.config.branding.logoUrl ? \\\`- **Logo:** \${this.config.branding.logoUrl}\\\` : '- Logo: To be provided'}

## Typography
- Headings: Inter, system-ui, sans-serif
- Body text: Inter, system-ui, sans-serif
- Code: 'Fira Code', monospace

## UI Components
- Use shadcn/ui components with custom color scheme
- Maintain consistent spacing and typography
- Follow accessibility guidelines (WCAG 2.1 AA)

## Tone & Voice
- Professional yet approachable
- Clear and concise communication
- Industry-specific terminology when appropriate
\\\\\`,
          },
        ],
      };
    case "client://environments/config":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: \\\\\`# Environment Configuration

## Staging Environment
- **URL:** \${this.config.environments.staging}
- **Purpose:** Testing and client review
- **Database:** Staging database with sample data
- **Monitoring:** Basic monitoring enabled

## Production Environment  
- **URL:** \${this.config.environments.production}
- **Purpose:** Live application
- **Database:** Production database with live data
- **Monitoring:** Full monitoring and alerting
- **Security:** WAF enabled, SSL certificates
- **Backups:** Daily automated backups
\\\\\`,
          },
        ],
      };
    case "client://contacts/directory":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: \\\\\`# Contact Directory

## Technical Contacts
- **Primary:** \${this.config.contacts.technical}
- **Role:** Technical decision maker and main point of contact

## Business Contacts  
- **Primary:** \${this.config.contacts.business}
- **Role:** Business requirements and project approval

## IBSO Team
- **Project Manager:** [PM_NAME]
- **Lead Developer:** [DEV_NAME]
- **DevOps Engineer:** [DEVOPS_NAME]

## Communication Channels
- **Slack:** #\${this.config.name.toLowerCase().replace(/\\s+/g, '-')}-project
- **Email:** \${this.config.name.toLowerCase().replace(/\\s+/g, '-')}@ibso.dev
- **Meetings:** Weekly status calls (Fridays 2 PM EST)
\\\\\`,
          },
        ],
      };
    case "client://progress/milestones":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: \\\\\`# Project Milestones

## Current Status: [CURRENT_PHASE]

### Completed Milestones ✅
- [x] Project kickoff and requirements gathering
- [x] Technical architecture design
- [x] Development environment setup

### In Progress 🚧
- [ ] Core feature development
- [ ] UI/UX implementation
- [ ] API development

### Upcoming 📅
- [ ] Testing and QA
- [ ] Client review and feedback
- [ ] Production deployment
- [ ] Go-live and launch

## Key Dates
- **Project Start:** [START_DATE]
- **MVP Delivery:** [MVP_DATE] 
- **Final Delivery:** [END_DATE]
- **Go-Live:** [LAUNCH_DATE]

## Next Actions
1. Complete current development sprint
2. Schedule client review session
3. Prepare staging environment demo
4. Plan production deployment
\\\\\`,
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
\\\`
  }

  generatePackageJson(): string {
    return JSON.stringify({
      name: \`\${this.config.name.toLowerCase().replace(/\\s+/g, '-')}-mcp\`,
      version: "1.0.0",
      type: "module",
      description: \`MCP server for \${this.config.name} project\`,
      main: "index.js",
      scripts: {
        start: "node index.js",
        dev: "node --watch index.js"
      },
      dependencies: {
        "@modelcontextprotocol/sdk": "^1.17.0"
      }
    }, null, 2)
  }

  async generate(): Promise<void> {
    const clientDir = \`./clients/\${this.config.name.toLowerCase().replace(/\\s+/g, '-')}-mcp\`
    
    // Create directory
    await fs.mkdir(clientDir, { recursive: true })
    
    // Generate MCP server
    await fs.writeFile(
      \`\${clientDir}/index.js\`,
      this.generateMCPServer()
    )
    
    // Generate package.json
    await fs.writeFile(
      \`\${clientDir}/package.json\`,
      this.generatePackageJson()  
    )
    
    console.log(\`✅ Generated MCP server for \${this.config.name}\`)
    console.log(\`📁 Location: \${clientDir}\`)
    console.log(\`🚀 To start: cd \${clientDir} && npm start\`)
  }
}

// Usage example
const clientConfig: ClientConfig = {
  name: "Acme Corp",
  domain: "acmecorp.com", 
  industry: "E-commerce",
  features: [
    "Product catalog management",
    "Order processing system", 
    "Customer dashboard",
    "Inventory tracking",
    "Payment processing"
  ],
  branding: {
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    logoUrl: "https://acmecorp.com/logo.png"
  },
  contacts: {
    technical: "john.doe@acmecorp.com",
    business: "jane.smith@acmecorp.com"
  },
  environments: {
    staging: "https://staging.acmecorp.com",
    production: "https://acmecorp.com"
  }
}

// Generate the MCP server
const generator = new ClientMCPGenerator(clientConfig)
generator.generate()
\\\`\\\`\\\`

## CLI Tool
\\\`\\\`\\\`bash
#!/bin/bash
# generate-client-mcp.sh

CLIENT_NAME=\$1
DOMAIN=\$2
INDUSTRY=\$3

if [ -z "\$CLIENT_NAME" ] || [ -z "\$DOMAIN" ] || [ -z "\$INDUSTRY" ]; then
    echo "Usage: ./generate-client-mcp.sh <client-name> <domain> <industry>"
    echo "Example: ./generate-client-mcp.sh 'Acme Corp' 'acmecorp.com' 'E-commerce'"
    exit 1
fi

echo "🚀 Generating MCP server for \$CLIENT_NAME..."

# Create client directory
CLIENT_DIR="./clients/\$(echo \$CLIENT_NAME | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')-mcp"
mkdir -p "\$CLIENT_DIR"

# Generate MCP server using template
npx tsx scripts/generate-client-mcp.ts \\
  --name "\$CLIENT_NAME" \\
  --domain "\$DOMAIN" \\
  --industry "\$INDUSTRY" \\
  --output "\$CLIENT_DIR"

# Install dependencies
cd "\$CLIENT_DIR"
npm install

# Add to Claude MCP configuration
echo "📝 Adding to Claude MCP configuration..."
claude mcp add "\$(basename \$CLIENT_DIR)" -s user -- node "\$(pwd)/index.js"

echo "✅ MCP server generated successfully!"
echo "📁 Location: \$CLIENT_DIR"
echo "🔗 Test with: claude mcp list"
\\\`\\\`\\\`\`,
          },
        ],
      };
    default:
      throw new Error(\`Resource not found: \${uri}\`);
  }
});

// Update prompts section for agency-specific functionality
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
          {
            name: "budget",
            description: "Project budget",
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
        description: \`Onboarding \${args?.client_name || "client"} for \${args?.project_type || "project"}\`,
        messages: [
          {
            role: "user",
            content: {
              type: "text", 
              text: \`Complete the client onboarding process for \${args?.client_name || "client"} building a \${args?.project_type || "web application"}. Use the agency://clients/onboarding-checklist and set up project structure using agency://templates/project-structure. Include AWS infrastructure setup and CI/CD pipeline configuration.\`,
            },
          },
        ],
      };
    case "generate_sow":
      return {
        description: \`Generating SOW for \${args?.client_name || "client"}\`,
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: \`Create a comprehensive Statement of Work for \${args?.client_name || "client"} using the agency://contracts/sow-template. Project scope: \${args?.project_scope || "custom web application"}. Budget: \${args?.budget || "TBD"}. Include detailed phases, deliverables, timeline, and terms.\`,
            },
          },
        ],
      };
    case "create_client_mcp":
      return {
        description: \`Creating custom MCP server for \${args?.client_name || "client"}\`,
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: \`Generate a custom MCP server for \${args?.client_name || "client"} with domain \${args?.domain || "client.com"} using the agency://automation/mcp-generator. Include client-specific resources for project specs, branding guidelines, environment configs, contacts, and progress tracking.\`,
            },
          },
        ],
      };
    default:
      throw new Error(\`Prompt not found: \${name}\`);
  }
});
`;

module.exports = { remainingResources };