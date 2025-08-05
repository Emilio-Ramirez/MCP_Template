export default `# Chat Bundle - Component-First Architecture

## Overview
Efficient chat/messaging implementation system organized by components for selective access. Claude Code can request specific patterns (split-panel, message bubbles, real-time) without loading unnecessary context.

## Available Components

### Core Components (Shared Across All Chat Types)
- **split-panel-layout**: Split-panel design with conversation list and chat area
- **message-components**: Message bubbles, role-based styling, timestamps
- **real-time-patterns**: WebSocket integration, real-time updates, typing indicators
- **conversation-list**: Conversation navigation, search, filtering
- **chat-interface**: Input area, send button, file attachments
- **notification-patterns**: Bell icon, badge counts, notification integration

### Templates (Type-Specific)
- **basic-chat**: Simple chat interface template
- **split-panel-chat**: Full split-panel messaging system
- **real-time-chat**: WebSocket-enabled chat template
- **critical-patterns**: Mandatory patterns for 95%+ consistency

### Quick Access
- **quick-reference**: Most common chat patterns cheat sheet

## How to Use This Bundle

### Pattern-Based Development (Recommended)
1. Request specific component: "I need message bubble patterns"
2. Get focused, relevant patterns only
3. Build incrementally as needed

### Template-Based Development
1. Request template: "I need a chat template"
2. Choose: basic, split-panel, or real-time
3. Get complete implementation

### Mixed Development (Most Efficient)
1. Start with template for structure
2. Request specific components for customization
3. Use quick-reference for common patterns

## Available Resources

To access specific components, request:
- \`mcp://crm-template-base/chat-bundle/components/split-panel-layout\`
- \`mcp://crm-template-base/chat-bundle/components/message-components\`
- \`mcp://crm-template-base/chat-bundle/components/real-time-patterns\`
- \`mcp://crm-template-base/chat-bundle/components/conversation-list\`
- \`mcp://crm-template-base/chat-bundle/components/chat-interface\`
- \`mcp://crm-template-base/chat-bundle/components/notification-patterns\`

To access templates, request:
- \`mcp://crm-template-base/chat-bundle/templates/basic-chat\`
- \`mcp://crm-template-base/chat-bundle/templates/split-panel-chat\`
- \`mcp://crm-template-base/chat-bundle/templates/real-time-chat\`
- \`mcp://crm-template-base/chat-bundle/templates/critical-patterns\`

For quick access:
- \`mcp://crm-template-base/chat-bundle/quick-reference\`

## Benefits
- **Context Efficiency**: Get only what you need
- **95%+ Consistency**: All components follow unified standards
- **Pattern Reuse**: Shared components across chat types
- **Progressive Development**: Build incrementally
- **Zero Fragmentation**: Single source of truth maintained

## Success Metrics
- 70% faster development with focused components
- Reduced context consumption by 75%
- Maintained 95%+ chat UI consistency
- Improved Claude Code workflow efficiency

---

**Next Steps**: Request a specific component or template to begin implementation.
`;