# CLAUDE MCP Server Documentation Standards

**⚠️ CRITICAL WARNING: These standards are mandatory for all MCP server development. Deviation from these procedures will break the documentation system and require manual restoration.**

## 🔴 MANDATORY 4-Step Documentation Maintenance Order

**NEVER skip steps or perform them out of order. System corruption will occur.**

### Step 1: Resource File Creation/Modification
- Create or modify the actual resource file in the appropriate directory
- Ensure proper export format: `export default \`content here\``
- Validate JavaScript syntax and template literal structure
- Test resource loading locally

### Step 2: Resource Index Registration
- Update the `resources/index.js` file immediately after resource creation
- Add the new resource to the resources object with proper key-value mapping
- Use kebab-case for resource keys (e.g., `'vitracoat/business-workflows'`)
- Verify the resource loader path matches the actual file location

### Step 3: Resource Manifest Update
- Update `config/resource-manifest.js` with the new resource entry
- Include proper metadata: name, description, type, category
- Maintain alphabetical ordering within categories
- Verify all existing resources remain intact

### Step 4: MCP Documentation Manager Sync
- Use the `mcp-documentation-manager` agent to sync changes across the ecosystem
- Verify cross-references between servers are updated
- Confirm the documentation server reflects all changes
- Test resource accessibility through MCP protocol

**🚨 BREAKING THE ORDER WARNING: If you skip Step 2 or 3, the MCP server will fail to load resources. If you skip Step 4, cross-server documentation will become inconsistent and require manual reconciliation.**

## 📋 URI Convention Standards

### Resource URI Format
```
mcp://{server-name}/{category}/{resource-name}
```

### Examples from Current Servers

#### CRM Template Base Server
```
mcp://crm-template-base/ui-system/dialog-patterns
mcp://crm-template-base/architecture/modular-forms-system
mcp://crm-template-base/development/typescript-excellence
mcp://crm-template-base/routing/nextjs-advanced-patterns
```

#### IBSO Business Units Server
```
mcp://ibso-business-units/vitracoat/overview
mcp://ibso-business-units/vitracoat/business-workflows
mcp://ibso-business-units/vitracoat/configuration-management
mcp://ibso-business-units/patterns/chemical-industry-standards
```

#### IBSO Patterns Server
```
mcp://ibso-patterns/deployment/3-minute-process
mcp://ibso-patterns/infrastructure/cost-optimization
mcp://ibso-patterns/security/compliance-framework
```

### URI Naming Rules
1. **Server names**: Use kebab-case, descriptive of the domain
2. **Categories**: Single words or hyphenated terms (ui-system, patterns, vitracoat)
3. **Resource names**: Descriptive, kebab-case, avoid abbreviations
4. **No version numbers**: Resources are living documents, use git for versioning
5. **No file extensions**: URIs represent logical resources, not files

## 🗂️ File Organization Structure

### Standard MCP Server Directory Layout
```
server-name/
├── config/
│   ├── resource-manifest.js     # Resource registry with metadata
│   └── server-config.js         # MCP server configuration
├── index.js                     # Main server entry point
├── prompts/
│   ├── index.js                 # Prompt registry
│   └── [prompt-files].js        # Individual prompt implementations
├── resources/
│   ├── index.js                 # Resource loader registry
│   ├── [category]/              # Logical groupings
│   │   └── [resource-files].js  # Individual resources
│   └── [domain-specific]/       # Business domain folders (e.g., vitracoat/)
│       └── [resource-files].js
└── utils/
    ├── resource-loader.js       # Resource loading utilities
    └── response-builder.js      # Response formatting utilities
```

### Resource File Template
```javascript
export default `# Resource Title

Resource content here using markdown or structured format.

## Important Notes
- Use template literals for multi-line content
- Escape backticks within content using \\`
- Maintain consistent formatting
- Include examples and code snippets as needed

\`\`\`javascript
// Code examples should be properly formatted
const example = 'formatted code';
\`\`\`
`;
```

### Resource Index Entry Template
```javascript
export const resources = {
  'category/resource-name': () => loadResource('category/resource-name.js'),
  // Add new resources here, maintaining alphabetical order within categories
};
```

### Resource Manifest Entry Template
```javascript
{
  name: 'category/resource-name',
  description: 'Clear, concise description of the resource purpose',
  type: 'documentation', // documentation, pattern, configuration, workflow
  category: 'category-name',
  tags: ['tag1', 'tag2', 'tag3']
}
```

## 🤖 Agent Integration Instructions

### When to Use mcp-documentation-manager Agent

**ALWAYS use the mcp-documentation-manager agent when:**

1. **Cross-Server References**: Adding resources that reference other MCP servers
2. **Ecosystem Updates**: Changes that affect multiple servers
3. **Documentation Sync**: After completing the 4-step maintenance order
4. **Architecture Changes**: Modifications to server structure or resource organization
5. **Quality Validation**: Before finalizing major resource additions

### How to Invoke the Agent
```bash
# Use this exact command format
claude --agent mcp-documentation-manager "sync resources for [server-name] after adding [resource-description]"
```

### Agent Responsibilities
- Validates cross-server resource references
- Updates the central documentation server
- Ensures URI consistency across the ecosystem
- Performs integrity checks on resource manifests
- Maintains ecosystem-wide documentation coherence

## ⚠️ Common Mistakes and How to Avoid Them

### 1. Resource Registration Failures
**Mistake**: Creating resource files without updating `resources/index.js`
**Consequence**: MCP server fails to load, resources inaccessible
**Prevention**: Always follow the 4-step order, never skip Step 2

### 2. URI Inconsistencies
**Mistake**: Using different naming conventions across servers
**Example**: `mcp://server/UI_System/DialogPatterns` vs `mcp://server/ui-system/dialog-patterns`
**Prevention**: Use kebab-case consistently, follow established patterns

### 3. Circular References
**Mistake**: Resources referencing each other in loops
**Example**: Resource A references B, B references C, C references A
**Prevention**: Design clear hierarchies, use the documentation manager to validate

### 4. Template Literal Syntax Errors
**Mistake**: Improper escaping of backticks and template expressions
**Example**: `export default \`This won't work: \`nested backticks\`\``
**Correction**: `export default \`This works: \\`escaped backticks\\`\``

### 5. Missing Metadata
**Mistake**: Adding resources without proper manifest entries
**Consequence**: Resources not discoverable, poor categorization
**Prevention**: Always complete Step 3, include descriptive metadata

### 6. Version Conflicts
**Mistake**: Including version numbers in resource names
**Example**: `workflow-v2.js`, `pattern-2024.js`
**Prevention**: Use git for versioning, resources are living documents

## 🧪 Testing and Validation Procedures

### Pre-Deployment Validation Checklist

#### 1. Resource File Validation
```bash
# Test resource loading
node -e "import('./resources/category/resource-name.js').then(r => console.log('✓ Resource loads'))"

# Validate template literal syntax
node -e "const content = \`your-resource-content\`; console.log('✓ Syntax valid')"
```

#### 2. Index Registration Test
```bash
# Verify resource is registered
node -e "import('./resources/index.js').then(r => console.log(r.resources['category/resource-name'] ? '✓ Registered' : '✗ Missing'))"
```

#### 3. MCP Server Functionality Test
```bash
# Start server in test mode
npm run test-server

# Verify resource accessibility
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{"method": "resources/read", "params": {"uri": "mcp://server-name/category/resource-name"}}'
```

#### 4. Cross-Server Reference Validation
```bash
# Use documentation manager to validate
claude --agent mcp-documentation-manager "validate references in [server-name]"
```

### Post-Deployment Monitoring

#### Health Check Indicators
- ✅ All resources load without errors
- ✅ Resource manifest matches actual resources
- ✅ Cross-server references resolve correctly
- ✅ MCP protocol responses are properly formatted
- ✅ Documentation server reflects changes

#### Performance Benchmarks
- Resource loading: < 100ms per resource
- MCP response time: < 200ms
- Memory usage: Stable over time
- Error rate: 0% for valid requests

## 📚 Examples from Vitracoat Chemical Industry Resources

### Successful Resource Implementation
The Vitracoat chemical industry resources demonstrate proper MCP resource development:

#### Resource Structure Example
```
ibso-business-units/resources/vitracoat/
├── overview.js                    # Comprehensive project overview
├── business-workflows.js          # Workflow documentation  
├── configuration-management.js    # System configuration details
├── laboratory-business-rules.js   # Business logic specifications
├── micro-production-workflow.js   # Specialized process workflows
├── request-forms.js              # Form architecture documentation
├── testing-protocols.js          # Quality testing procedures
└── testing-protocols-quality.js  # Advanced quality protocols
```

#### Proper URI Implementation
```
mcp://ibso-business-units/vitracoat/overview
mcp://ibso-business-units/vitracoat/business-workflows
mcp://ibso-business-units/vitracoat/configuration-management
mcp://ibso-business-units/vitracoat/laboratory-business-rules
```

#### Resource Content Quality Standards
The Vitracoat overview resource demonstrates:
- **Comprehensive documentation**: 240+ lines covering all aspects
- **Structured format**: Clear headings, sections, and subsections
- **Technical depth**: Detailed architecture, database schemas, business logic
- **Practical examples**: Code snippets, configuration samples, workflow diagrams
- **Business context**: Industry-specific requirements and compliance needs

### Metadata Best Practices
```javascript
// From resource-manifest.js
{
  name: 'vitracoat/overview',
  description: 'Comprehensive overview of Vitracoat Chemical Coating Management System with architecture, modules, and business processes',
  type: 'documentation',
  category: 'vitracoat',
  tags: ['chemical-industry', 'erp', 'coating-management', 'business-processes', 'architecture']
}
```

## 🎯 Quality Assurance Standards

### Resource Content Requirements
1. **Completeness**: Cover all aspects of the topic thoroughly
2. **Accuracy**: Ensure technical information is correct and current
3. **Structure**: Use clear headings, logical flow, proper formatting
4. **Examples**: Include practical code samples and configurations
5. **Context**: Provide business/technical context and rationale
6. **Maintenance**: Keep content updated as systems evolve

### Documentation Excellence Criteria
- **Clarity**: Non-experts should understand the content
- **Depth**: Sufficient detail for implementation
- **Breadth**: Comprehensive coverage of the topic
- **Practicality**: Actionable information and examples
- **Consistency**: Follows established patterns and conventions

## 🔧 Maintenance and Evolution

### Regular Maintenance Tasks
1. **Monthly**: Review resource accuracy and relevance
2. **Quarterly**: Validate cross-server references and URIs
3. **Annually**: Restructure categories if needed for better organization
4. **As needed**: Update resources when underlying systems change

### Evolution Guidelines
- **Backwards compatibility**: Maintain existing URIs when possible
- **Graceful deprecation**: Mark outdated resources before removal
- **Migration paths**: Provide clear upgrade instructions
- **Change documentation**: Track significant modifications

---

**Remember: These standards exist to maintain a robust, scalable MCP documentation ecosystem. Following them ensures reliable access to critical development resources and prevents system fragmentation.**

**For questions or clarifications, consult the mcp-documentation-manager agent or review existing implementations in the established servers.**