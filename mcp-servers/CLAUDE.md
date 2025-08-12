# CLAUDE MCP Server Documentation Standards

**⚠️ SIMPLIFIED APPROACH: These standards focus on clean, maintainable MCP servers using markdown files and good naming conventions.**

## 🎯 Core Philosophy: Good File Names = Explicit Metadata

The MCP server system is designed around **simplicity** and **explicitness**:

- Use descriptive file names in kebab-case
- Organize files in business unit folders
- Auto-generate metadata from file structure
- No redundant configuration files

## 🔄 SIMPLIFIED 2-Step Documentation Process

**Clean and straightforward - no complex manifests needed.**

### Step 1: Create/Update Markdown Files

- Create `.md` files in appropriate business unit folders (e.g., `resources/vitracoat/`)
- Use descriptive, kebab-case file names: `business-workflows.md`, `configuration-management.md`
- Write content directly in markdown format
- No JavaScript wrappers or exports needed

### Step 2: Update Resource Index

- Update `resources/index.js` to include the new resource
- Use the `loadMarkdown()` function to load `.md` files
- Follow the pattern: `'vitracoat/business-workflows': loadMarkdown('vitracoat/business-workflows.md')`
- The system auto-generates names, descriptions, and URIs from file paths

**✨ That's it! The system automatically handles the rest.**

## 📋 URI Convention Standards

### Resource URI Format

```
ibso-business://{business-unit}/{resource-name}
```

### Auto-Generated Metadata

The system automatically generates:

- **Name**: `vitracoat/business-workflows` → "Vitracoat - Business Workflows"
- **Description**: `vitracoat/business-workflows` → "Business workflows for vitracoat business unit"
- **URI**: `vitracoat/business-workflows` → `ibso-business://vitracoat/business-workflows`

### Examples

```
ibso-business://vitracoat/overview
ibso-business://vitracoat/business-workflows
ibso-business://vitracoat/configuration-management
ibso-business://vitracoat/testing-protocols
```

## 🗂️ Simplified File Organization

### Standard MCP Server Directory Layout

```
server-name/
├── config/
│   └── server-config.js         # Basic server configuration
├── index.js                     # Main server entry point
├── prompts/
│   └── index.js                 # Prompts (usually empty)
├── resources/
│   ├── index.js                 # Resource loader with loadMarkdown() function
│   └── [business-unit]/         # Business unit folders (e.g., vitracoat/)
│       ├── overview.md          # Business unit overview
│       ├── business-workflows.md
│       ├── configuration-management.md
│       └── [other-resources].md
└── utils/
    ├── resource-loader.js       # Resource loading utilities
    └── response-builder.js      # Response formatting utilities
```

### Resource Index Pattern

```javascript
// resources/index.js
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Function to load markdown files
const loadMarkdown = (filePath) => {
  return () => {
    const fullPath = join(__dirname, filePath);
    return readFileSync(fullPath, "utf8");
  };
};

// Resource mapping - clean and explicit
export const resources = {
  "vitracoat/overview": loadMarkdown("vitracoat/overview.md"),
  "vitracoat/business-workflows": loadMarkdown(
    "vitracoat/business-workflows.md",
  ),
  "vitracoat/configuration-management": loadMarkdown(
    "vitracoat/configuration-management.md",
  ),
  // Add more resources following the same pattern
};
```

## ✅ File Naming Best Practices

### Use Descriptive, Kebab-Case Names

- ✅ `business-workflows.md` - Clear, descriptive
- ✅ `configuration-management.md` - Explicit purpose
- ✅ `testing-protocols-quality.md` - Specific and detailed
- ❌ `doc1.md` - Vague and unhelpful
- ❌ `bw.md` - Abbreviated and unclear
- ❌ `BusinessWorkflows.md` - Wrong case convention

### Organize by Business Unit

```
resources/
├── vitracoat/
│   ├── overview.md
│   ├── business-workflows.md
│   └── testing-protocols.md
├── manufacturing/
│   ├── overview.md
│   └── production-schedules.md
└── logistics/
    ├── overview.md
    └── shipping-procedures.md
```

## 🧪 Testing and Validation

### Simple Testing Approach

```javascript
// Test that all resources load correctly
import { resources } from "./resources/index.js";

Object.keys(resources).forEach((key) => {
  try {
    const content = resources[key]();
    console.log(`✅ ${key}: ${content.length} characters`);
  } catch (error) {
    console.error(`❌ ${key}: ${error.message}`);
  }
});
```

### MCP Server Test

```bash
# Test server starts without errors
timeout 5s node index.js 2>&1 | grep "running"
```

## 🎯 Examples from Vitracoat Implementation

### Successful Resource Structure

```
resources/vitracoat/
├── overview.md                    # Project overview
├── business-workflows.md          # LWR, TLWR, VLWR workflows
├── configuration-management.md    # System configuration
├── laboratory-business-rules.md   # Business logic
├── testing-protocols.md          # Testing procedures
└── request-forms.md              # Form specifications
```

### Resource Index Implementation

```javascript
export const resources = {
  "vitracoat/overview": loadMarkdown("vitracoat/overview.md"),
  "vitracoat/business-workflows": loadMarkdown(
    "vitracoat/business-workflows.md",
  ),
  "vitracoat/configuration-management": loadMarkdown(
    "vitracoat/configuration-management.md",
  ),
  "vitracoat/laboratory-business-rules": loadMarkdown(
    "vitracoat/laboratory-business-rules.md",
  ),
  "vitracoat/testing-protocols": loadMarkdown("vitracoat/testing-protocols.md"),
  "vitracoat/request-forms": loadMarkdown("vitracoat/request-forms.md"),
};
```

### Auto-Generated Results

- `vitracoat/overview` → "Vitracoat - Overview"
- `vitracoat/business-workflows` → "Vitracoat - Business Workflows"
- `vitracoat/configuration-management` → "Vitracoat - Configuration Management"

## 🚀 Benefits of Simplified Approach

### Advantages

1. **No Redundancy** - Single source of truth in `resources/index.js`
2. **Explicit Names** - File names directly reflect content
3. **Auto-Generated Metadata** - No manual manifest maintenance
4. **Easy to Maintain** - Add file + update index = done
5. **Clean Structure** - Business units organized in folders
6. **Pure Markdown** - No JavaScript wrappers needed

### Migration from Complex Systems

If migrating from systems with separate manifests:

1. Keep all `.md` files in business unit folders
2. Remove redundant `resource-manifest.js` files
3. Update `resources/index.js` to use `loadMarkdown()` pattern
4. Let the system auto-generate metadata from file names

## 🔧 Maintenance Guidelines

### Adding New Resources

1. Create descriptive `.md` file in appropriate business unit folder
2. Add entry to `resources/index.js` using `loadMarkdown()` pattern
3. Test that resource loads correctly
4. Done! Metadata is auto-generated

### Adding New Business Units

1. Create new folder in `resources/` (e.g., `resources/manufacturing/`)
2. Add `.md` files with good descriptive names
3. Update `resources/index.js` with new entries
4. System automatically handles the rest

### MCP Documentation Agent Synchronization

- **Content patterns** and **cross-server coordination** are managed by the `mcp-documentation-manager` agent
- For complex documentation updates or pattern standardization, use the specialized agent
- The agent follows the MANDATORY 4-step process for MCP documentation integrity
- Agent handles content classification between servers and ensures ecosystem consistency

### Best Practices

- **Consistent naming**: Always use kebab-case
- **Descriptive files**: File names should explain content
- **Logical organization**: Group related resources in business unit folders
- **Test regularly**: Verify resources load correctly after changes
- **Use the agent**: For cross-server updates and pattern management

## **🚨 CRITICAL: Agent Instructions Location**

### **MCP Documentation Manager Agent**

**Agent instructions are stored in:** `/Users/emilio/.claude/agents/mcp-documentation-manager.md`

**This file contains:**

- Agent metadata (name, description, model, color)
- Critical directory navigation instructions
- Two-step verification system templates
- Form/Page pattern structure requirements
- Bundle architecture rules
- Content classification guidelines

**⚠️ IMPORTANT: When updating agent behavior, ALWAYS update the agent's own .md file, not just the MCP server documentation. The agent reads its instructions from its own file at `/Users/emilio/.claude/agents/mcp-documentation-manager.md`**

**Common errors fixed by proper agent instructions:**

- ❌ Agent getting lost in wrong directories (../../Dreaming)
- ❌ Agent creating .js files instead of .md files in business-units
- ❌ Agent creating overly long narrative documentation
- ✅ Proper navigation to `/Users/emilio/Development/Dreaming/mcp-servers`
- ✅ Creating structured .md files with Form/Page patterns
- ✅ Following exact documentation structure templates

---

## 🤖 AI Agent Orchestration System

The MCP ecosystem uses a hierarchical agent system for code implementation to ensure proper separation of concerns and optimal performance:

### Agent Roles and Responsibilities

1. **Claude Code (Orchestrator)** - Strategic planning and supervision
   - Creates implementation plans
   - Delegates tasks to specialized agents
   - Verifies completion and quality
   - Maintains overall project coherence

2. **mcp-code-architect** - ERP Template code implementation
   - Works exclusively in ERP Template projects
   - Executes micro-tasks (one objective at a time)
   - Reports back after each task completion
   - Never modifies MCP server files

3. **mcp-documentation-manager** - MCP server documentation management
   - Exclusive authority over MCP server files
   - Maintains documentation consistency
   - Follows MANDATORY 4-step process
   - Ensures cross-server coordination

### Critical Rules for Agent Interaction

- **🚨 ONLY mcp-documentation-manager** can modify files in `/Users/emilio/Development/Dreaming/mcp-servers/`
- **mcp-code-architect** works exclusively in ERP Template projects (never in MCP servers)
- Use **micro-tasks** (one objective per task) to prevent context overload
- Frequent reporting ensures visibility and prevents drift
- Small context windows = better agent performance

### Micro-Task Pattern

The micro-task pattern ensures optimal agent performance:

```
Orchestrator → Creates micro-task plan
    ↓
Specialized Agent → Executes single task
    ↓
Report back → Orchestrator verifies
    ↓
Next micro-task → Continue cycle
```

### Implementation Guidelines

**DO:**
- ONE objective per agent task
- ONE file modification maximum per task
- Clear, specific task descriptions
- Frequent status reports
- Verify completion before next task

**DON'T:**
- Batch multiple objectives in one task
- Modify multiple files simultaneously
- Create vague or open-ended tasks
- Skip verification steps
- Mix responsibilities between agents

### Example Workflow

```
User Request: "Add new business workflow documentation"

1. Orchestrator Analysis:
   - Identifies documentation update needed
   - Determines correct agent (mcp-documentation-manager)
   - Creates micro-task plan

2. Micro-Task 1:
   - Task: "Create workflow.md in vitracoat folder"
   - Agent: mcp-documentation-manager
   - Result: File created, report back

3. Micro-Task 2:
   - Task: "Update resources/index.js with new resource"
   - Agent: mcp-documentation-manager
   - Result: Index updated, report back

4. Verification:
   - Orchestrator confirms completion
   - Tests resource loading
   - Reports success to user
```

### Performance Optimization

- **Context Management**: Keep each task focused to minimize context size
- **Clear Boundaries**: Never cross agent responsibility boundaries
- **Incremental Progress**: Small steps ensure consistent forward movement
- **Error Recovery**: Easier to identify and fix issues in micro-tasks

---

**Remember: Good file names are the foundation of a maintainable MCP server. When in doubt, choose clarity over brevity.**

**The goal is simplicity, explicitness, and maintainability. Avoid complex configurations and embrace the power of descriptive naming.**

