export default `# MCP Ecosystem Overview

## Architecture Summary

The MCP (Model Context Protocol) ecosystem consists of a three-tier architecture designed for scalable knowledge management and pattern sharing across software development projects.

## Three-Tier Architecture

### 🏛️ Tier 1: Base Templates Layer (Foundation)
**Purpose:** Generic, reusable patterns that apply across multiple projects and industries.

- **crm-template-base**: Enterprise CRM/ERP patterns, modular forms, UI components
- **agency-client-template**: Client management workflows, onboarding, project delivery
- **mcp-documentation**: Meta-knowledge, system improvement patterns

### 🏢 Tier 2: Business Units Layer (Specialization)
**Purpose:** Industry-specific and client-specific patterns built on base templates.

- **ibso-business-units**: Client project patterns (Vitracoat chemical coating system)
- **ibso-patterns**: IBSO operational patterns (infrastructure, deployment, monitoring)

### 🚀 Tier 3: Implementation Layer (Execution)
**Purpose:** Live projects and deployments using patterns from upper tiers.

- Active ERP/CRM implementations
- Client-specific applications
- Production systems

## Knowledge Flow Patterns

### ↗️ Upward Flow (Abstraction)
- Successful implementation patterns are abstracted
- Client-specific details removed
- Promoted to appropriate tier for reuse

### ↙️ Downward Flow (Specialization)  
- General patterns instantiated for specific needs
- Client customizations and business rules applied
- Domain-specific implementations created

### ↔️ Lateral Flow (Cross-Pollination)
- Similar projects share patterns and solutions
- Cross-business-unit knowledge sharing
- Best practices propagation

## Server Architecture Pattern

Each MCP server follows a modular architecture:

\`\`\`
server-name/
├── index.js              # Lightweight main server (< 100 lines)
├── config/               # Configuration and metadata
├── resources/            # Knowledge resources organized by category
├── prompts/              # Interactive prompts (optional)
└── utils/                # Shared utilities
\`\`\`

## Resource Categories

### Base Templates
- **Components**: UI patterns, form systems, data tables
- **Architecture**: Feature organization, routing patterns
- **Development**: TypeScript patterns, testing strategies
- **Deployment**: CI/CD, containerization, monitoring

### Business Units
- **Domain-Specific**: Industry workflows and business logic
- **Client Projects**: Project-specific patterns and configurations
- **Compliance**: Regulatory and quality standards
- **Integration**: System integration patterns

### Meta-Documentation
- **Architecture**: System design and evolution patterns
- **Development**: Best practices and conventions
- **Patterns**: Refactoring and improvement guides
- **Training**: AI integration and usage patterns

## Benefits

### For Developers
- **95%+ code reduction** through proven patterns
- **Consistent architecture** across all projects
- **Rapid development** with battle-tested components
- **Knowledge preservation** and sharing

### For Organizations
- **Reduced time-to-market** for new projects
- **Quality consistency** across teams and projects
- **Efficient knowledge transfer** for new team members
- **Scalable architecture** that grows with the organization

### For Clients
- **Proven solutions** based on successful implementations
- **Industry best practices** built into every project
- **Compliance assurance** through standardized patterns
- **Future-proof architecture** with established upgrade paths

## Getting Started with MCP Servers

### Quick Deployment
For rapid deployment of all IBSO MCP servers:
- **mcp://mcp-documentation/deployment/quick-start-deployment** - Deploy all servers in 2 minutes
- **mcp://mcp-documentation/deployment/claude-code-registration-guide** - Complete registration guide with scope management

### Key Concepts
- **Registration is required**: Simply having MCP servers on disk isn't enough - they must be registered with Claude Code
- **Scope matters**: Choose between local (project-only), user (all projects), or project (team-shared) scopes
- **One-command setup**: Deploy the entire ecosystem with a single bash loop

## Evolution and Improvement

The ecosystem is designed for continuous improvement:

1. **Pattern Recognition**: Identify reusable patterns in implementations
2. **Abstraction**: Remove client-specific details
3. **Validation**: Test patterns across multiple implementations
4. **Integration**: Add patterns to appropriate tier
5. **Documentation**: Comprehensive pattern documentation
6. **Training**: AI system learns from pattern evolution

This creates a self-improving knowledge management system that becomes more valuable over time.`;