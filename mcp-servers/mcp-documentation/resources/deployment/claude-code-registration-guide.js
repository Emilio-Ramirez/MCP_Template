export default `# Claude Code MCP Server Registration & Deployment Guide

## Overview

This guide addresses a critical gap in MCP documentation: how to properly register and deploy MCP servers with Claude Code. Without proper registration, your perfectly built MCP servers will not be accessible in Claude Code.

## The Registration Problem

**Common Issue**: "I have MCP servers on disk but Claude Code doesn't see them!"

This happens because MCP servers must be explicitly registered with Claude Code using the \`claude mcp add\` command. Simply having the server files isn't enough.

## Registration Commands

### Basic Registration Syntax
\`\`\`bash
claude mcp add <name> <command> [args...]
\`\`\`

### For Node.js MCP Servers
\`\`\`bash
# Register a single server
claude mcp add server-name node /path/to/server/index.js

# Example for our servers
claude mcp add ibso-business-units node /Users/emilio/Development/Dreaming/mcp-servers/ibso-business-units/index.js
\`\`\`

## Understanding Scopes (Critical!)

MCP servers can be registered at three different scope levels, which determines their visibility:

### 1. Local Scope (Default)
- **Visibility**: Only in the current project directory
- **Storage**: Project-specific user settings
- **Use case**: Project-specific servers, testing, sensitive credentials
\`\`\`bash
claude mcp add my-server node /path/to/server/index.js
# OR explicitly:
claude mcp add -s local my-server node /path/to/server/index.js
\`\`\`

### 2. User Scope (Cross-Project)
- **Visibility**: Available in ALL your projects
- **Storage**: User-level ~/.claude.json
- **Use case**: Personal utility servers, commonly used tools
\`\`\`bash
claude mcp add -s user my-server node /path/to/server/index.js
\`\`\`

### 3. Project Scope (Team Sharing)
- **Visibility**: Available to all team members
- **Storage**: .mcp.json in project root (version controlled)
- **Use case**: Team-shared servers, project requirements
\`\`\`bash
claude mcp add -s project my-server node /path/to/server/index.js
\`\`\`

## Why Servers "Disappear"

**The most common confusion**: You register servers while in one project directory, then switch to another project and they're gone!

**Why this happens**: By default, servers are registered with \`local\` scope, making them only visible in the project where you registered them.

**Solution**: Use \`-s user\` for servers you want available everywhere:
\`\`\`bash
# Make servers available across all projects
claude mcp add -s user crm-template-base node /path/to/crm-template-base/index.js
claude mcp add -s user ibso-business-units node /path/to/ibso-business-units/index.js
claude mcp add -s user erp-business-patterns node /path/to/erp-business-patterns/index.js
\`\`\`

## Complete Registration Example

### Quick Alternative
For a rapid one-command deployment of all servers, see:
**mcp://mcp-documentation/deployment/quick-start-deployment**

### Step 1: Register All IBSO MCP Servers Globally
\`\`\`bash
# Navigate to any directory (scope determines visibility, not current directory)
cd ~/Development/Dreaming/mcp-servers

# Register all servers with user scope for cross-project access
claude mcp add -s user crm-template-base node $(pwd)/crm-template-base/index.js
claude mcp add -s user ibso-business-units node $(pwd)/ibso-business-units/index.js
claude mcp add -s user erp-business-patterns node $(pwd)/erp-business-patterns/index.js
claude mcp add -s user ibso-patterns node $(pwd)/ibso-patterns/index.js
claude mcp add -s user agency-client-template node $(pwd)/agency-client-template/index.js
claude mcp add -s user mcp-documentation node $(pwd)/mcp-documentation/index.js
\`\`\`

### Step 2: Verify Registration
\`\`\`bash
# List all registered servers
claude mcp list

# Expected output:
# crm-template-base: node /path/to/crm-template-base/index.js - ✓ Connected
# ibso-business-units: node /path/to/ibso-business-units/index.js - ✓ Connected
# erp-business-patterns: node /path/to/erp-business-patterns/index.js - ✓ Connected
# ... (all servers listed)
\`\`\`

### Step 3: Test Cross-Project Access
\`\`\`bash
# Change to a different project
cd ~/Development/SomeOtherProject

# Verify servers are still available
claude mcp list
# Should show the same servers if registered with user scope
\`\`\`

## Management Commands

### List All Servers
\`\`\`bash
claude mcp list
\`\`\`

### Get Server Details
\`\`\`bash
claude mcp get server-name
\`\`\`

### Remove a Server
\`\`\`bash
claude mcp remove server-name
\`\`\`

### Check Server Status in Claude Code
Use the \`/mcp\` command within Claude Code to see connection status and manage servers interactively.

## Configuration File Locations

Understanding where configurations are stored helps troubleshoot issues:

1. **User Config**: \`~/.claude.json\`
   - Contains user-scoped servers
   - Available across all projects

2. **Project Config**: \`<project-root>/.mcp.json\`
   - Contains project-scoped servers
   - Shared with team via version control

3. **Local Config**: \`~/.claude.json\` with project-specific section
   - Contains local-scoped servers
   - Private to you in specific project

## Troubleshooting

### Servers Not Appearing
1. Check current directory: \`pwd\`
2. List servers: \`claude mcp list\`
3. If missing, you likely registered with local scope in a different directory
4. Re-register with user scope: \`claude mcp add -s user ...\`

### Connection Errors
1. Verify server file exists: \`ls -la /path/to/server/index.js\`
2. Check Node.js is installed: \`node --version\`
3. Test server manually: \`node /path/to/server/index.js\`
4. Check error logs in Claude Code

### Windows-Specific Issues
On Windows (not WSL), use the \`cmd /c\` wrapper for npx commands:
\`\`\`bash
claude mcp add my-server -- cmd /c npx -y @some/package
\`\`\`

## Best Practices

1. **Use User Scope** for development servers you want everywhere
2. **Use Project Scope** for team-shared, project-specific servers
3. **Use Local Scope** only for testing or sensitive configurations
4. **Document Registration** in your project README
5. **Version Control** your .mcp.json for team consistency

## Quick Reference Card

\`\`\`bash
# Register server (local scope - current project only)
claude mcp add server-name node /path/to/index.js

# Register server (user scope - all projects)
claude mcp add -s user server-name node /path/to/index.js

# Register server (project scope - team sharing)
claude mcp add -s project server-name node /path/to/index.js

# List all servers
claude mcp list

# Remove server
claude mcp remove server-name

# Check status in Claude Code
/mcp
\`\`\`

## Integration with Development Workflow

### For New MCP Server Development
1. Build your server following the 4-step process
2. Test locally with local scope
3. Once stable, re-register with appropriate scope
4. Document registration command in server README

### For Team Projects
1. Register servers with project scope
2. Commit .mcp.json to version control
3. Team members automatically get servers on clone
4. Document any required environment variables

## Summary

The key insight: **Building MCP servers is only half the battle. Proper registration with the correct scope is essential for usability.**

Remember:
- Local scope = current project only (default)
- User scope = all your projects 
- Project scope = team sharing

When in doubt, use \`-s user\` for personal development servers to ensure they're always available.
`;