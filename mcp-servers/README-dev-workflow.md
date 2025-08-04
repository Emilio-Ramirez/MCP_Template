# Development Workflow with Hot Reload

## Problem Solved
When Claude Code updates MCP server files during development, you traditionally need to restart your session to see changes, which loses context. Reloaderoo solves this by hot-reloading MCP servers while preserving your Claude Code session context.

## Setup and Usage

### 1. Start Development Mode

```bash
# Start hot-reload for IBSO server specifically
npm run dev:ibso

# Or start hot-reload for all servers
npm run dev

# Or start hot-reload for CRM server
npm run dev:crm
```

### 2. What Gets Watched

The reloaderoo configuration watches these files for changes:
- `**/*.js` - All JavaScript files
- `**/*.md` - All markdown files (including README files)
- `config/*.js` - Configuration files
- `resources/**/*.js` - Resource files

### 3. Development Flow

1. **Start reloaderoo**: `npm run dev:ibso`
2. **Make changes**: Edit any watched files
3. **Automatic reload**: Server restarts automatically
4. **Test immediately**: Changes are available without losing Claude Code context

### 4. Files That Trigger Reload

```
ibso-business-units/
├── index.js ✅ (main server file)
├── config/
│   ├── resource-manifest.js ✅
│   └── server-config.js ✅
├── resources/
│   └── **/*.js ✅ (all resource files)
├── README-*.md ✅ (all README files)
└── utils/*.js ✅ (utility files)
```

## Benefits

✅ **No session restart needed** - Keep your Claude Code context
✅ **Instant feedback** - See changes immediately 
✅ **Seamless AI development** - Claude can update docs and immediately use them
✅ **File watching** - Automatic detection of changes
✅ **Markdown support** - README files trigger reloads too

## Usage Examples

```bash
# Terminal 1: Start hot-reload development
npm run dev:ibso

# Terminal 2: Continue using Claude Code
# - Make changes to any watched files
# - Server automatically reloads
# - Test new resources immediately
```

## Troubleshooting

- **Port conflicts**: Make sure only one instance runs per server
- **File permissions**: Ensure reloaderoo can read watched directories
- **Node modules**: Ignored by default to prevent unnecessary reloads
- **Git files**: Ignored by default to prevent VCS noise

This workflow enables true hot-reload development where Claude Code can write documentation and immediately access it without breaking the development flow.