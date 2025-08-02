export default `# Agency Client Template Server Documentation

## Overview
The Agency Client Template server provides workflows and patterns for managing client relationships, project delivery, and business operations for service agencies and consulting firms.

## Server Architecture
- **URI Scheme**: \`agency://\`
- **Resources**: 6 client management workflows
- **Focus**: Client relationship management
- **Target**: Service agencies and consulting firms

## Resource Categories

### Client Management
- Client onboarding automation
- Relationship management patterns

### Project Workflows
- Statement of Work (SOW) templates
- Project delivery workflows

### Automation
- MCP server generation tools
- Workflow automation patterns

## Getting Started

### Quick Setup
\`\`\`bash
# Register the server with Claude Code (user scope for all projects)
claude mcp add -s user agency-client-template node /path/to/mcp-servers/agency-client-template/index.js

# Verify registration
claude mcp list
\`\`\`

For complete deployment instructions:
- **mcp://mcp-documentation/deployment/quick-start-deployment** - Deploy all servers in 2 minutes
- **mcp://mcp-documentation/deployment/claude-code-registration-guide** - Detailed registration guide

## Key Features
- Streamlined client onboarding
- Automated SOW generation
- Project delivery tracking
- Client communication workflows
- Business process automation

This server optimizes client management and project delivery for service organizations.`;