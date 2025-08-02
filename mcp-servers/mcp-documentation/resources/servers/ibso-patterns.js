export default `# IBSO Patterns Server Documentation

## Overview
The IBSO Patterns server provides operational excellence patterns for infrastructure, deployment, monitoring, and security. These patterns represent proven solutions for managing enterprise-grade applications and services.

## Server Architecture
- **URI Scheme**: \`ibso-ops://\`
- **Resources**: 5 operational excellence patterns
- **Focus**: Infrastructure and operations
- **Target**: DevOps teams and platform engineers

## Resource Categories

### Infrastructure
- **Cost Optimization**: Cloud cost management strategies
- **Terraform Deploy**: Infrastructure as Code patterns

### Deployment
- **3-Minute Process**: Rapid deployment workflows

### Monitoring
- **Observability Stack**: Comprehensive monitoring solutions

### Security
- **Compliance Framework**: Security and regulatory compliance

## Getting Started

### Quick Setup
\`\`\`bash
# Register the server with Claude Code (user scope for all projects)
claude mcp add -s user ibso-patterns node /path/to/mcp-servers/ibso-patterns/index.js

# Verify registration
claude mcp list
\`\`\`

For complete deployment instructions:
- **mcp://mcp-documentation/deployment/quick-start-deployment** - Deploy all servers in 2 minutes
- **mcp://mcp-documentation/deployment/claude-code-registration-guide** - Detailed registration guide

## Key Features
- Production-ready infrastructure patterns
- Cost optimization strategies
- Automated deployment workflows
- Comprehensive monitoring and alerting
- Security and compliance frameworks

This server provides the operational foundation for enterprise applications.`;