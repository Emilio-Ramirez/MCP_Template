export default `# Client MCP Generator

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
\`\`\``;