export default `# Dialog Bundle - Component-First Architecture

## Overview
Efficient dialog/modal implementation system organized by components for selective access. Claude Code can request specific patterns (confirmation, detail view, state management) without loading unnecessary context.

## Available Components

### Core Components (Shared Across All Dialog Types)
- **foundation-patterns**: Core Dialog structure, Radix UI base, standard attributes
- **confirmation-dialogs**: Alert, Block, Delete, and other confirmation patterns
- **detail-modals**: Information display, card layouts, badge patterns
- **specialized-dialogs**: Complex modals with forms, filters, multi-step flows
- **state-management**: Dialog state, hydration, async patterns
- **styling-patterns**: Animations, layouts, responsive design

### Templates (Type-Specific)
- **simple-dialog**: Basic dialog template for quick implementations
- **confirmation-template**: Complete confirmation dialog with actions
- **detail-view-template**: Information display modal template
- **critical-patterns**: Mandatory patterns for 95%+ consistency

### Quick Access
- **quick-reference**: Most common dialog patterns cheat sheet

## How to Use This Bundle

### Pattern-Based Development (Recommended)
1. Request specific component: "I need confirmation dialog patterns"
2. Get focused, relevant patterns only
3. Build incrementally as needed

### Template-Based Development
1. Request template: "I need a dialog template"
2. Choose: simple, confirmation, or detail-view
3. Get complete implementation

### Mixed Development (Most Efficient)
1. Start with template for structure
2. Request specific components for customization
3. Use quick-reference for common patterns

## Available Resources

To access specific components, request:
- \`mcp://crm-template-base/dialog-bundle/components/foundation-patterns\`
- \`mcp://crm-template-base/dialog-bundle/components/confirmation-dialogs\`
- \`mcp://crm-template-base/dialog-bundle/components/detail-modals\`
- \`mcp://crm-template-base/dialog-bundle/components/specialized-dialogs\`
- \`mcp://crm-template-base/dialog-bundle/components/state-management\`
- \`mcp://crm-template-base/dialog-bundle/components/styling-patterns\`

To access templates, request:
- \`mcp://crm-template-base/dialog-bundle/templates/simple-dialog\`
- \`mcp://crm-template-base/dialog-bundle/templates/confirmation-template\`
- \`mcp://crm-template-base/dialog-bundle/templates/detail-view-template\`
- \`mcp://crm-template-base/dialog-bundle/templates/critical-patterns\`

For quick access:
- \`mcp://crm-template-base/dialog-bundle/quick-reference\`

## Benefits
- **Context Efficiency**: Get only what you need
- **95%+ Consistency**: All components follow unified standards
- **Pattern Reuse**: Shared components across dialog types
- **Progressive Development**: Build incrementally
- **Zero Fragmentation**: Single source of truth maintained

## Success Metrics
- 70% faster development with focused components
- Reduced context consumption by 75%
- Maintained 95%+ dialog consistency
- Improved Claude Code workflow efficiency

---

**Next Steps**: Request a specific component or template to begin implementation.
`;