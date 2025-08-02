export default `# CRM Template Base Server Documentation

## Overview
The CRM Template Base server provides enterprise-grade patterns for building scalable CRM and ERP applications. It serves as the foundation layer in the MCP ecosystem, offering battle-tested architectural patterns and UI components.

## Server Architecture
- **URI Scheme**: \`crm-base://\`
- **Resources**: 8 comprehensive pattern libraries
- **Focus**: Enterprise application development
- **Code Reduction**: 95.6% through modular forms system

## Resource Categories

### UI System
- **Dialog Patterns** (\`crm-base://ui-system/dialog-patterns\`)
  - Mandatory unified dialog patterns for consistency
  - Form dialogs, confirmation dialogs, multi-step wizards
  - Error handling and validation patterns

- **Configuration Tabs Pattern** (\`crm-base://ui-system/configuration-tabs-pattern\`)
  - Enterprise configuration management
  - Tab-based interfaces with state management
  - Dynamic tab generation and validation

### Architecture
- **Modular Forms System** (\`crm-base://architecture/modular-forms-system\`)
  - Revolutionary form architecture achieving 95.6% code reduction
  - Dynamic form generation from schema
  - Validation, submission, and error handling

- **Feature-Based Organization** (\`crm-base://architecture/feature-based-organization\`)
  - Scalable code organization patterns
  - Feature modules with co-location
  - Dependency management and boundaries

### Routing
- **Next.js Advanced Patterns** (\`crm-base://routing/nextjs-advanced-patterns\`)
  - App Router with parallel routes
  - Route groups and intercepting routes
  - Dynamic routing and middleware patterns

### Development
- **TypeScript Excellence** (\`crm-base://development/typescript-excellence\`)
  - Strict type safety patterns
  - Zod schema validation integration
  - Advanced TypeScript patterns for enterprise apps

### Components
- **Enterprise Component Patterns** (\`crm-base://components/enterprise-component-patterns\`)
  - Advanced composition patterns
  - Reusable business components
  - Component communication patterns

### Internationalization
- **I18n Patterns** (\`crm-base://i18n/internationalization-patterns\`)
  - Next-intl integration patterns
  - Multi-language support
  - Locale-aware routing and formatting

## Key Features

### Modular Forms System
The revolutionary forms architecture that reduces form-related code by 95.6%:

\`\`\`typescript
// Instead of 5,103 lines of form code, achieve the same with 223 lines
interface FormSchema {
  sections: FormSection[];
  validation: ValidationRules;
  submission: SubmissionConfig;
}
\`\`\`

### Mandatory UI Patterns
Enforced patterns for consistency across all applications:
- Dialog patterns for all modal interactions
- Configuration tabs for settings management
- Data table patterns for information display

### Enterprise Architecture
- Feature-based organization for scalability
- Type-safe development with TypeScript and Zod
- Advanced Next.js routing patterns
- Comprehensive internationalization support

## Getting Started

### Quick Setup
\`\`\`bash
# Register the server with Claude Code (user scope for all projects)
claude mcp add -s user crm-template-base node /path/to/mcp-servers/crm-template-base/index.js

# Verify registration
claude mcp list
\`\`\`

For complete deployment instructions:
- **mcp://mcp-documentation/deployment/quick-start-deployment** - Deploy all servers in 2 minutes
- **mcp://mcp-documentation/deployment/claude-code-registration-guide** - Detailed registration guide

## Usage Patterns

### Extending Base Patterns
\`\`\`typescript
// Client projects extend base patterns
import { DialogPattern } from 'crm-base://ui-system/dialog-patterns';
import { FormSystem } from 'crm-base://architecture/modular-forms-system';

// Customize for client needs while maintaining base structure
const ClientDialog = DialogPattern.extend({
  clientSpecificFeatures: true,
  brandingOptions: clientBranding
});
\`\`\`

### Configuration Inheritance
\`\`\`json
// tsconfig.json - Extend base configuration
{
  "extends": "./node_modules/crm-template-base/tsconfig.base.json",
  "compilerOptions": {
    "paths": {
      "@/base/*": ["./node_modules/crm-template-base/src/*"]
    }
  }
}
\`\`\`

## Integration with Business Units
The base templates are designed to be extended by business unit servers:

- **IBSO Business Units** extend these patterns for chemical industry projects
- **Agency Client Template** builds on these patterns for client management
- **Custom implementations** can selectively adopt relevant patterns

## Benefits

### Development Efficiency
- **95.6% code reduction** in form architecture
- **Consistent patterns** across all projects
- **Battle-tested solutions** proven in production
- **Rapid prototyping** and development

### Maintenance
- **Single source of truth** for enterprise patterns
- **Centralized updates** benefit all implementations
- **Consistent behavior** across applications
- **Reduced bug surface** through proven patterns

### Quality Assurance
- **Enterprise-grade** patterns from day one
- **Type safety** throughout the application
- **Comprehensive validation** and error handling
- **Accessibility** and usability built-in

## Migration Guide
When adopting CRM Template Base patterns:

1. **Assessment**: Identify applicable patterns for your project
2. **Integration**: Set up base template dependencies
3. **Extension**: Customize patterns for your specific needs
4. **Validation**: Test integration and functionality
5. **Deployment**: Deploy with confidence using proven patterns

This server represents the culmination of enterprise application development experience, providing a solid foundation for scalable, maintainable CRM and ERP systems.`;