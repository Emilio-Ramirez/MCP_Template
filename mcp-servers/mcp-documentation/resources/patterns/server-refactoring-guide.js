export default `# MCP Server Refactoring Guide

## Overview
This guide provides a systematic approach to refactor monolithic MCP servers into modular, maintainable structures. Based on the successful refactoring of the \`crm-template-base\` server.

## Benefits of Modular Structure
- **Maintainability**: Each resource and prompt in its own file
- **Scalability**: Easy to add new patterns without editing main server
- **Organization**: Logical grouping by category and functionality
- **Version Control**: Clean diffs and easier code reviews
- **Collaboration**: Multiple developers can work on different resources

## Standard Directory Structure
\`\`\`
mcp-server/
├── index.js                    # Lightweight main server (< 100 lines)
├── config/
│   ├── server-config.js        # Server metadata and capabilities
│   └── resource-manifest.js    # Resource registry with metadata
├── resources/
│   ├── {category1}/            # Logical groupings (components, patterns, etc.)
│   │   ├── resource1.js
│   │   └── resource2.js
│   ├── {category2}/
│   │   └── ...
│   └── index.js               # Resource loader/registry
├── prompts/
│   ├── prompt1.js             # Individual prompt files
│   ├── prompt2.js
│   └── index.js               # Prompt loader/registry
└── utils/
    ├── resource-loader.js     # Dynamic loading utilities
    └── response-builder.js    # Response formatting helpers
\`\`\`

## Refactoring Process

### Step 1: Analyze Current Structure
\`\`\`bash
# Check current server size and complexity
wc -l index.js
grep -c "case.*://" index.js  # Count resources
grep -c "name:" index.js      # Count prompts
\`\`\`

### Step 2: Create Directory Structure
\`\`\`bash
mkdir -p config resources prompts utils
# Create appropriate resource categories based on URI namespaces
\`\`\`

### Step 3: Extract Server Configuration
Create \`config/server-config.js\`:
\`\`\`javascript
export const serverConfig = {
  name: "your-server-name",
  version: "1.0.0", 
  description: "Server description",
  capabilities: {
    resources: {},
    prompts: {},
    tools: {},
  },
};
\`\`\`

### Step 4: Create Resource Manifest
Create \`config/resource-manifest.js\`:
\`\`\`javascript
export const resourceManifest = [
  {
    uri: "namespace://category/resource-name",
    mimeType: "text/plain",
    name: "Display Name",
    description: "Resource description",
    category: "category-folder-name",
    filename: "resource-file.js"
  },
];
\`\`\`

### Step 5: Extract Resources
For each resource:
1. Create file: \`resources/{category}/{resource-name}.js\`
2. Export content as default string:
\`\`\`javascript
export default \`# Resource Content
Your markdown/text content here...
\`;
\`\`\`

### Step 6: Extract Prompts
For each prompt:
1. Create file: \`prompts/{prompt-name}.js\`
2. Export prompt object:
\`\`\`javascript
export const promptName = {
  name: "prompt_name",
  description: "Prompt description",
  arguments: [...],
  handler: (args) => ({
    description: \`Description with \${args?.arg_name}\`,
    messages: [...]
  })
};
\`\`\`

### Step 7: Create Index Files
Create \`resources/index.js\` and \`prompts/index.js\` to map URIs to modules.

### Step 8: Create Utilities
Copy \`resource-loader.js\` and \`response-builder.js\` from reference implementation.

### Step 9: Build Dynamic Main Server
Create lightweight \`index.js\` that uses dynamic loading:
\`\`\`javascript
import { serverConfig } from './config/server-config.js';
import { resourceManifest } from './config/resource-manifest.js';
import { resources } from './resources/index.js';
import { prompts } from './prompts/index.js';
import { ResponseBuilder } from './utils/response-builder.js';
\`\`\`

## Resource Categories by Server Type

### CRM Template Base
- \`components/\` - UI components (shadcn, data tables, etc.)
- \`patterns/\` - Code patterns (auth, API routes, etc.)

### IBSO Patterns  
- \`infrastructure/\` - Terraform, AWS patterns
- \`deployment/\` - CI/CD, Docker patterns
- \`monitoring/\` - Observability patterns
- \`security/\` - Security configurations

### Agency Client Template
- \`clients/\` - Client onboarding patterns
- \`workflows/\` - Process workflows
- \`contracts/\` - Legal templates
- \`automation/\` - Automation scripts

### MCP Documentation
- \`architecture/\` - System architecture docs
- \`patterns/\` - Design conventions
- \`deployment/\` - Setup guides
- \`ai-training/\` - AI integration guides

## Best Practices

1. **Keep Main Server Minimal**: < 100 lines of orchestration code
2. **Consistent Exports**: Always use \`export default\` for resources
3. **Descriptive Manifests**: Include helpful descriptions and metadata
4. **Error Handling**: Use consistent error messages for missing resources
5. **Testing**: Verify all resources load correctly after refactoring

## Migration Checklist

- [ ] Directory structure created
- [ ] Server config extracted
- [ ] Resource manifest created
- [ ] All resources extracted to separate files
- [ ] All prompts extracted to separate files
- [ ] Resource index created
- [ ] Prompt index created
- [ ] Utility files added
- [ ] New main server created
- [ ] Server tested and validated
- [ ] Original server backed up
- [ ] New server deployed
- [ ] MCP connectivity verified
- [ ] All resources accessible
- [ ] All prompts functional

## Success Metrics

- **Main server reduced to < 100 lines**
- **All existing functionality preserved**
- **Easy to add new resources without editing main server**
- **Logical organization by category**
- **Clean separation of concerns**

This refactoring pattern enables scalable, maintainable MCP servers that can grow organically while maintaining clean architecture.`;