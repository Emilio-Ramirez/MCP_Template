export default `# MCP Work Instruction Templates

## 🎯 How to Use These Templates

When requesting MCP work from Claude Code, **always** copy and paste the relevant template into your request. This ensures Claude Code follows the documented standards.

---

## 📝 Template 1: Creating New MCP Resources

\`\`\`
INSTRUCTION: When creating new MCP resources, you MUST use the mcp-documentation-manager agent and follow the 4-step maintenance order from CLAUDE.md:

1. Create/update resource file in resources/{category}/{resource-name}.js
2. Update resources/index.js with import and mapping
3. Update config/resource-manifest.js with resource metadata
4. Test MCP server connection and validate resource access

NEVER skip steps or change order. Use URI convention: {server-prefix}://{category}/{resource-name}

Agent Command: Use the mcp-documentation-manager agent for this task.
\`\`\`

---

## 🔄 Template 2: Updating Existing MCP Resources

\`\`\`
INSTRUCTION: When updating existing MCP resources, use the mcp-documentation-manager agent and:

1. Update the resource file content in resources/{category}/{resource-name}.js
2. If changing resource name/category, update resources/index.js mapping
3. If changing metadata, update config/resource-manifest.js
4. Test the updated resource loads correctly

Follow the standards documented in CLAUDE.md. Maintain URI consistency.

Agent Command: Use the mcp-documentation-manager agent for this task.
\`\`\`

---

## 🏗️ Template 3: Creating New MCP Server

\`\`\`
INSTRUCTION: When creating a new MCP server, use the mcp-documentation-manager agent and establish the complete structure:

1. Create server directory with standard structure (see CLAUDE.md)
2. Set up config/server-config.js and config/resource-manifest.js
3. Create resources/index.js with proper exports
4. Create utils/resource-loader.js and utils/response-builder.js
5. Create main index.js with proper request handlers
6. Add server to Claude configuration

Follow the architecture patterns from existing servers (crm-template-base, ibso-business-units).

Agent Command: Use the mcp-documentation-manager agent for this comprehensive setup.
\`\`\`

---

## 🧪 Template 4: Testing MCP Resources

\`\`\`
INSTRUCTION: When testing MCP resources, use the mcp-documentation-manager agent to:

1. Verify all resources load without errors
2. Check URI accessibility and content delivery
3. Validate resource manifest consistency
4. Test resource discovery and categorization
5. Verify no broken imports or missing dependencies

Follow the testing procedures documented in CLAUDE.md.

Agent Command: Use the mcp-documentation-manager agent for validation.
\`\`\`

---

## 🔍 Template 5: Debugging MCP Issues

\`\`\`
INSTRUCTION: When debugging MCP server issues, use the mcp-documentation-manager agent to:

1. Check the 4-step maintenance order was followed correctly
2. Verify URI consistency between manifest and routing
3. Validate all imports exist and are properly exported
4. Check for common mistakes listed in CLAUDE.md
5. Test resource loading step by step

Reference the troubleshooting section in CLAUDE.md for systematic debugging.

Agent Command: Use the mcp-documentation-manager agent for systematic debugging.
\`\`\`

---

## 📊 Template 6: Adding Business Domain Knowledge

\`\`\`
INSTRUCTION: When adding business domain knowledge to MCP servers, use the mcp-documentation-manager agent and:

1. Identify correct server (implementation → crm-template-base, business → ibso-business-units)
2. Create comprehensive resources following content standards in CLAUDE.md
3. Use proper TypeScript interfaces and detailed documentation
4. Follow the 4-step maintenance order strictly
5. Update categories and tags appropriately

Example: Chemical industry knowledge → ibso-business-units/resources/vitracoat/

Agent Command: Use the mcp-documentation-manager agent for domain knowledge integration.
\`\`\`

---

## 🎨 Template 7: Restructuring MCP Resources

\`\`\`
INSTRUCTION: When restructuring MCP resources, use the mcp-documentation-manager agent and:

1. Plan the new structure following CLAUDE.md standards
2. Update resource files and maintain content quality
3. Update ALL index mappings and manifest entries
4. Update URIs consistently across the system
5. Test thoroughly to ensure no broken references

This is HIGH RISK - follow the maintenance order precisely.

Agent Command: Use the mcp-documentation-manager agent for safe restructuring.
\`\`\`

---

## 💡 Quick Reference Commands

### For Any MCP Work:
\`\`\`
Use the mcp-documentation-manager agent and follow CLAUDE.md standards. 
Maintain the 4-step order: Resource → Index → Manifest → Test.
\`\`\`

### For Complex MCP Tasks:
\`\`\`
Use the mcp-documentation-manager agent for this multi-step MCP task. 
Reference CLAUDE.md for standards and procedures. 
Never skip maintenance steps or change order.
\`\`\`

### For MCP Validation:
\`\`\`
Use the mcp-documentation-manager agent to validate this MCP work against 
CLAUDE.md standards. Check all steps were completed correctly.
\`\`\`

---

## ⚡ Emergency Template

If Claude Code is not following MCP standards:

\`\`\`
STOP. You must use the mcp-documentation-manager agent for ALL MCP server work. 
Read /Users/emilio/Development/Dreaming/mcp-servers/CLAUDE.md and follow the 
mandatory 4-step documentation maintenance order. Do not proceed without 
using the correct agent and following documented standards.
\`\`\`

---

## 📋 Usage Instructions

1. **Copy the relevant template** based on your MCP task
2. **Paste it at the beginning** of your Claude Code request
3. **Add your specific requirements** after the template
4. **Claude Code will automatically** use the mcp-documentation-manager agent and follow standards

This ensures consistent, reliable MCP development that follows documented best practices.
`;