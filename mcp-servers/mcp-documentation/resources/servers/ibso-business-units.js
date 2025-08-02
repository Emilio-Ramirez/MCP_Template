export default `# IBSO Business Units Server Documentation

## Overview
The IBSO Business Units server provides client-specific project patterns and industry specializations, with particular focus on the chemical coating industry through the Vitracoat project.

## Server Architecture
- **URI Scheme**: \`ibso-business://\`
- **Resources**: 10 specialized business resources
- **Focus**: Client-specific implementations
- **Target**: Chemical industry and specialized projects

## Resource Categories

### Vitracoat Project (Chemical Coating)
- **Project Overview**: Comprehensive business architecture
- **Request Forms**: Chemical industry form patterns
- **Configuration Pages**: 29 tabs across 5 configuration pages
- **Micro Production Workflow**: Small batch operations
- **Testing Protocols**: Quality validation procedures

### General Patterns
- **Client Project Structure**: Standard project organization
- **Business Unit Integration**: Integration with base templates
- **Chemical Industry Standards**: Regulatory compliance

### Documentation
- **Project Setup Guide**: Step-by-step implementation guide
- **Deployment Strategies**: Enterprise deployment patterns

## Getting Started

### Quick Setup
\`\`\`bash
# Register the server with Claude Code (user scope for all projects)
claude mcp add -s user ibso-business-units node /path/to/mcp-servers/ibso-business-units/index.js

# Verify registration
claude mcp list
\`\`\`

For complete deployment instructions:
- **mcp://mcp-documentation/deployment/quick-start-deployment** - Deploy all servers in 2 minutes
- **mcp://mcp-documentation/deployment/claude-code-registration-guide** - Detailed registration guide

## Key Features
- Chemical industry specialization
- Regulatory compliance patterns
- Micro production workflows
- Quality testing protocols
- Enterprise configuration management

This server demonstrates how base templates are extended for industry-specific needs.`;