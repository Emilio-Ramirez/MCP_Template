export default `# IBSO Patterns Server Documentation

## ⚠️ IMPORTANT NOTE
**This server does NOT exist as a standalone MCP server.** The business strategy and domain knowledge patterns that would have been in this server are now part of the **ibso-business-units** server.

## Migration Information

### Original Intent
The IBSO Patterns server was intended to provide:
- Business strategy and requirements documentation
- System overviews and data structures
- Process workflows and business logic
- Domain knowledge patterns

### Current Location
All these patterns are now housed in:
- **Server**: ibso-business-units
- **URI Scheme**: \`ibso-business://\`
- **Purpose**: Business strategy, domain knowledge, and industry-specific patterns

## Resource Mapping

If you're looking for business patterns, they are organized in ibso-business-units as follows:

### Business Unit Structure
\`\`\`
ibso-business-units/
└── resources/
    └── [business-unit]/     # e.g., vitracoat/
        ├── overview.md
        ├── business-workflows.md
        ├── configuration-management.md
        └── [other-resources].md
\`\`\`

### Example Resources
- \`ibso-business://vitracoat/overview\` - Chemical coating business overview
- \`ibso-business://vitracoat/business-workflows\` - LWR, TLWR, VLWR workflows
- \`ibso-business://vitracoat/configuration-management\` - System configuration

## Routing Guidelines

When you need business strategy or domain patterns:
1. Use **ibso-business-units** server
2. Navigate to the appropriate business unit folder
3. Access the specific resource needed

## Technical Implementation
For technical implementation patterns (HOW to build), use:
- **Server**: crm-template-base
- **Location**: /bundles/ directory
- **Pattern**: Bundle architecture (design-system-bundle, table-page-bundle, form-bundle)

## Summary
- ❌ ibso-patterns server does NOT exist
- ✅ Use ibso-business-units for business strategy and domain knowledge
- ✅ Use crm-template-base for technical implementation patterns`;