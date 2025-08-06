export default `# MCP Documentation Manager Agent

## Overview

The MCP Documentation Manager Agent is a specialized tool for managing documentation across the MCP server ecosystem. It follows a standardized decision flow for routing requests and ensures consistency through mandatory processes.

## 🎯 Standardized Agent Decision Flow

The agent follows this precise decision flow for all incoming requests:

\`\`\`
📥 INCOMING REQUEST
│
├── 📖 READ REQUEST?
│   │
│   ├── 🔧 Development/Technical Pattern?
│   │   └── → crm-template-base
│   │       ├── Specific bundle? → Return complete bundle content
│   │       └── General bundle? → Return ALL bundle info (complete content)
│   │
│   └── 🏢 Business Unit/Strategy?
│       └── → ibso-business-units
│           ├── Which project? (vitracoat, manufacturing, etc.)
│           ├── Specific resource? → Return specific content
│           └── General project? → Return project overview
│
└── ✏️ UPDATE REQUEST?
    │
    ├── 📚 STEP 1: GET DOCUMENTATION PATTERNS
    │   └── → Read mcp-documentation server first
    │       ├── Get Form/Page patterns
    │       ├── Get Configuration patterns
    │       └── Get Bundle architecture rules
    │
    ├── 🎯 STEP 2: CLASSIFY CONTENT TYPE
    │   ├── Technical Implementation? → crm-template-base/bundles/
    │   └── Business Unit/Strategy? → ibso-business-units/
    │
    ├── 🔧 STEP 3: EXECUTE UPDATE
    │   ├── Follow appropriate pattern (Form/Page vs Configuration vs Bundle)
    │   ├── Apply 4-step process
    │   └── Update target server
    │
    └── 📋 STEP 4: UPDATE ECOSYSTEM
        ├── Update local index.js (if needed)
        ├── Update mcp-documentation server (cross-references)
        └── Update agent knowledge (self-documentation)
\`\`\`

## Key Decision Principles

### For READ Requests
1. **Technical queries** always go to `crm-template-base`
2. **Business/Strategy queries** always go to `ibso-business-units`
3. **General bundle info** returns COMPLETE bundle content, not summaries
4. **Specific resource requests** return exact content requested

### For UPDATE Requests
1. **ALWAYS start with Step 1** - Get documentation patterns first
2. **Pattern-driven updates** - Use Form/Page, Configuration, or Bundle patterns
3. **Mandatory 4-step process** - Never skip or reorder steps
4. **Self-updating ecosystem** - Update references and indices

## Content Classification

### Technical Implementation (crm-template-base)
- React components and TypeScript code
- UI patterns and design systems  
- Bundle architecture (design-system, table-page, form bundles)
- API integration patterns
- Authentication implementations

### Business Strategy & Domain (ibso-business-units)
- Business requirements and specifications
- System overviews and data structures
- Process workflows and business logic
- Domain knowledge (Vitracoat, manufacturing, etc.)
- Business rules and validation logic

## Documentation Pattern Templates

### Form/Page Document Pattern
Used for documenting functional pages with UI components:

\`\`\`markdown
# Title
## Overview (business purpose and context)
## List of Components (table, form1, form2, view dialog, etc.)
## Table Definition (main data table structure)
## [Entity] Structure (form container)
  ### [Form Section 1] (detailed field specifications)
    #### [Nested Fields] (if section has complex sub-fields)
  ### [Form Section 2] (detailed field specifications)
  ### [Form Section N] (detailed field specifications)
  ### Form Actions (available UI actions)
## View [Entity] Logic (dialog/modal container)
  ### When clicked a [entity] will appear a dialog
  ### Dialog information...
## [Another Container] (notifications, confirmations, etc.)
## Business Logic (rules and validation)
## [Supporting Data] (enums, status types, etc.)
\`\`\`

### Configuration Document Pattern
Used for system-wide data types and constants:

\`\`\`markdown
# Title  
## Overview (business purpose and context)
## [Code/Format Structure] (examples and rules)
# Main Entity Pages (high-level entities)
# Configuration Pages by Category
## 🧪 [Category] (grouped by business area)
### [Type] Tables (embedded throughout by category)
## 🧪 [Another Category]
### [Another Type] Tables
## Notes (important clarifications)
\`\`\`

### Bundle Architecture Pattern
Used for technical implementation bundles in crm-template-base:

\`\`\`javascript
export default \`# [Bundle Name] - Complete Implementation Package

## Overview
[Brief bundle description]

## Pattern Variants
### Pattern 1: [Variant Name]
- [Complete implementation details]
- [Code examples]
- [Use cases]

### Pattern 2: [Variant Name] 
- [Complete implementation details]
- [Code examples]
- [Use cases]

## Shared Components
[All shared patterns, references to design-system-bundle]

## Implementation Guide
[Step-by-step complete implementation]

## Code Templates
[All code examples in one place]

## Common Patterns
[All related patterns and variations]
\`;
\`\`\`

## Agent Self-Documentation

The agent maintains its own documentation and updates it when:
- New patterns are discovered
- Routing rules change
- New servers are added/removed
- Documentation standards evolve

This ensures the agent remains synchronized with the ecosystem and provides consistent guidance.

## 🚨 Error Documentation Protocol

The agent MUST document all errors and mistakes encountered during operations:

### Error Logging Requirements
1. **Document Location**: `/mcp-servers/agent-errors.md` (root of MCP servers directory)
2. **Document Creation**: Create file if it doesn't exist on first error
3. **Error Format**: Each error entry should include:
   - **Date/Time**: When the error occurred
   - **Operation**: What the agent was trying to do
   - **Error Type**: Classification of the mistake
   - **Root Cause**: Why the error happened
   - **Resolution**: How it was fixed
   - **Prevention**: Steps to avoid in future

### Error Entry Template
\`\`\`markdown
## [Date] - [Brief Error Description]
**Operation**: [What was being attempted]
**Error Type**: [routing/pattern/update/classification]
**Root Cause**: [Why it happened]
**Resolution**: [How it was fixed]
**Prevention**: [Future avoidance strategy]
**Affected Files**: [List of files involved]
---
\`\`\`

### Common Error Categories
- **Routing Errors**: Sent to wrong server
- **Pattern Violations**: Didn't follow documentation patterns
- **Update Failures**: Incomplete or broken updates
- **Classification Mistakes**: Technical vs Business misidentification
- **Process Errors**: Skipped mandatory steps

### Learning Integration
- Review `agent-errors.md` before major operations
- Update agent decision flows based on recurring errors
- Share learnings across ecosystem updates

## Success Metrics

- ✅ Correct routing on first attempt
- ✅ Pattern compliance in all updates
- ✅ Complete 4-step process execution
- ✅ Ecosystem synchronization maintained
- ✅ Self-documentation current

## Common Pitfalls to Avoid

1. **Skipping pattern consultation** - Always read patterns first
2. **Incorrect content classification** - Technical vs Business
3. **Incomplete updates** - Missing index or manifest updates
4. **Breaking bundle philosophy** - Creating fragmented resources
5. **Ignoring self-documentation** - Agent knowledge becomes stale`;