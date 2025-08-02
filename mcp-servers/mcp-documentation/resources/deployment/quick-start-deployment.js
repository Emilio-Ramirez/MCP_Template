export default `# MCP Server Quick Start Deployment Guide

## 🚀 Deploy All IBSO MCP Servers in 2 Minutes

### Prerequisites
- Claude Code installed and working
- Node.js installed
- MCP servers cloned to your machine

### Need More Detail?
For comprehensive registration information including scope management and troubleshooting:
**mcp://mcp-documentation/deployment/claude-code-registration-guide**

### One-Command Deployment

\`\`\`bash
# Navigate to your MCP servers directory
cd ~/Development/Dreaming/mcp-servers

# Run this single command to register ALL servers globally
for server in crm-template-base ibso-business-units erp-business-patterns ibso-patterns agency-client-template mcp-documentation; do
  claude mcp add -s user "$server" node "$(pwd)/$server/index.js"
done

# Verify deployment
claude mcp list
\`\`\`

### Expected Result
All 6 servers should show as "✓ Connected":
- crm-template-base
- ibso-business-units (Vitracoat business model)
- erp-business-patterns (form translation patterns)
- ibso-patterns
- agency-client-template
- mcp-documentation

## 🔧 Individual Server Deployment

If you prefer to add servers one by one or need specific servers:

### Core Business Servers
\`\`\`bash
# CRM Template Base (95.6% code reduction patterns)
claude mcp add -s user crm-template-base node /path/to/mcp-servers/crm-template-base/index.js

# Business Units (Vitracoat implementation)
claude mcp add -s user ibso-business-units node /path/to/mcp-servers/ibso-business-units/index.js

# ERP Business Patterns (form systems)
claude mcp add -s user erp-business-patterns node /path/to/mcp-servers/erp-business-patterns/index.js
\`\`\`

### Infrastructure Servers
\`\`\`bash
# IBSO Patterns (deployment, monitoring)
claude mcp add -s user ibso-patterns node /path/to/mcp-servers/ibso-patterns/index.js

# Agency Client Template
claude mcp add -s user agency-client-template node /path/to/mcp-servers/agency-client-template/index.js

# Documentation Server
claude mcp add -s user mcp-documentation node /path/to/mcp-servers/mcp-documentation/index.js
\`\`\`

## 📋 Post-Deployment Checklist

1. **Verify all servers are connected**
   \`\`\`bash
   claude mcp list
   \`\`\`

2. **Test server access in Claude Code**
   - Type \`/mcp\` in Claude Code
   - All servers should appear in the list

3. **Test resource access**
   - Type \`@\` to see available resources
   - Resources from all servers should be searchable

4. **Check cross-project access**
   \`\`\`bash
   cd ~/some-other-project
   claude mcp list  # Should still show all servers
   \`\`\`

## 🚨 Common Deployment Mistakes

### Mistake 1: Wrong Scope
❌ \`claude mcp add server-name node /path/to/index.js\`
✅ \`claude mcp add -s user server-name node /path/to/index.js\`

### Mistake 2: Relative Paths
❌ \`claude mcp add -s user server node ./server/index.js\`
✅ \`claude mcp add -s user server node /absolute/path/to/server/index.js\`

### Mistake 3: Forgetting Node Command
❌ \`claude mcp add -s user server /path/to/index.js\`
✅ \`claude mcp add -s user server node /path/to/index.js\`

## 🔄 Updating Deployed Servers

When you update server code:
1. No need to re-register
2. Changes take effect on next connection
3. Use \`/mcp\` in Claude Code to refresh connections

## 🗑️ Removing Servers

\`\`\`bash
# Remove a single server
claude mcp remove server-name

# Remove all IBSO servers (if needed)
for server in crm-template-base ibso-business-units erp-business-patterns ibso-patterns agency-client-template mcp-documentation; do
  claude mcp remove "$server"
done
\`\`\`

## 💡 Pro Tips

1. **Use absolute paths** to avoid confusion
2. **Always use -s user** for development servers
3. **Check claude mcp list** after adding each server
4. **Document your deployment** in project README

## 🆘 Still Having Issues?

1. **Servers not showing?** You're probably in a different project directory. Use \`-s user\`.
2. **Connection errors?** Check if Node.js is in PATH: \`which node\`
3. **Resources not loading?** Restart Claude Code after adding servers

Remember: The servers are just Node.js applications. If \`node /path/to/server/index.js\` works, the registration should work too.
`;