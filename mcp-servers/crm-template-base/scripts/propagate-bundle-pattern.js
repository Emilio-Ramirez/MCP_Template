#!/usr/bin/env node
// Script to propagate component-first pattern to remaining bundles

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Bundle configurations
const bundleConfigs = {
  'notification-page-bundle': {
    components: [
      { name: 'toast-patterns', desc: 'Toast notifications with Sonner integration' },
      { name: 'page-notifications', desc: 'Full-page notification center patterns' },
      { name: 'modal-notifications', desc: 'Modal-based notifications and alerts' },
      { name: 'badge-patterns', desc: 'Notification badges and counters' },
      { name: 'real-time-notifications', desc: 'WebSocket-based real-time notifications' }
    ],
    templates: [
      { name: 'basic-notification', desc: 'Simple notification system template' },
      { name: 'notification-center', desc: 'Full notification center implementation' },
      { name: 'critical-patterns', desc: 'Mandatory patterns for consistency' }
    ]
  },
  'table-page-bundle': {
    components: [
      { name: 'table-structure', desc: 'DataTable structure and configuration' },
      { name: 'search-patterns', desc: 'Virtual column search and filtering' },
      { name: 'column-patterns', desc: 'Column definitions and formatting' },
      { name: 'pagination-patterns', desc: 'Pagination and page size controls' },
      { name: 'export-patterns', desc: 'CSV/Excel export functionality' },
      { name: 'tabbed-tables', desc: 'Multi-tab table implementations' }
    ],
    templates: [
      { name: 'simple-table', desc: 'Basic DataTable implementation' },
      { name: 'tabbed-table', desc: 'Multi-tab table system' },
      { name: 'critical-patterns', desc: 'Mandatory patterns for consistency' }
    ]
  }
};

// Create bundle index template
function createBundleIndex(bundleName, config) {
  const formattedName = bundleName.replace('-bundle', '').replace(/-/g, ' ')
    .split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  const componentsList = config.components.map(c => 
    `- **${c.name}**: ${c.desc}`
  ).join('\\n');
  
  const templatesList = config.templates.map(t => 
    `- **${t.name}**: ${t.desc}`
  ).join('\\n');
  
  const componentResources = config.components.map(c =>
    `- \\\`mcp://crm-template-base/${bundleName.replace('-page', '')}/components/${c.name}\\\``
  ).join('\\n');
  
  const templateResources = config.templates.map(t =>
    `- \\\`mcp://crm-template-base/${bundleName.replace('-page', '')}/templates/${t.name}\\\``
  ).join('\\n');

  return `export default \`# ${formattedName} Bundle - Component-First Architecture

## Overview
Efficient ${formattedName.toLowerCase()} implementation system organized by components for selective access. Claude Code can request specific patterns without loading unnecessary context.

## Available Components

### Core Components
${componentsList}

### Templates
${templatesList}

### Quick Access
- **quick-reference**: Most common patterns cheat sheet

## How to Use This Bundle

### Pattern-Based Development (Recommended)
1. Request specific component: "I need ${config.components[0].name.replace(/-/g, ' ')}"
2. Get focused, relevant patterns only
3. Build incrementally as needed

### Template-Based Development
1. Request template: "I need a ${formattedName.toLowerCase()} template"
2. Choose from available templates
3. Get complete implementation

## Available Resources

To access specific components, request:
${componentResources}

To access templates, request:
${templateResources}

For quick access:
- \\\`mcp://crm-template-base/${bundleName.replace('-page', '')}/quick-reference\\\`

## Benefits
- **Context Efficiency**: Get only what you need
- **95%+ Consistency**: All components follow unified standards
- **Pattern Reuse**: Shared components across implementations
- **Progressive Development**: Build incrementally
- **Zero Fragmentation**: Single source of truth maintained

---

**Next Steps**: Request a specific component or template to begin implementation.
\\\`;`;
}

// Process each bundle
Object.entries(bundleConfigs).forEach(([bundleName, config]) => {
  console.log(`Processing ${bundleName}...`);
  
  // Create directories
  const bundleDir = bundleName.replace('-page', '');
  const componentsDir = path.join(rootDir, 'resources', bundleDir, 'components');
  const templatesDir = path.join(rootDir, 'resources', bundleDir, 'templates');
  
  fs.mkdirSync(componentsDir, { recursive: true });
  fs.mkdirSync(templatesDir, { recursive: true });
  
  // Backup original
  const originalPath = path.join(rootDir, 'resources', 'bundles', `${bundleName}.js`);
  const backupPath = path.join(rootDir, 'resources', 'bundles', `${bundleName}-original.js`);
  
  if (fs.existsSync(originalPath) && !fs.existsSync(backupPath)) {
    fs.copyFileSync(originalPath, backupPath);
  }
  
  // Create new bundle index
  const indexContent = createBundleIndex(bundleName, config);
  fs.writeFileSync(originalPath, indexContent);
  
  // Create quick-reference
  const quickRefPath = path.join(rootDir, 'resources', bundleDir, 'quick-reference.js');
  const quickRefContent = `export default \\\`# ${bundleName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Quick Reference

## Common Patterns Cheat Sheet

### Basic Structure
\\\`\\\`\\\`typescript
// Add common patterns here
\\\`\\\`\\\`

### Essential Imports
\\\`\\\`\\\`typescript
// Add common imports here
\\\`\\\`\\\`

---

**For detailed patterns**: Request specific components.
\\\`;`;
  
  fs.writeFileSync(quickRefPath, quickRefContent);
  
  console.log(`✓ ${bundleName} converted to component-first architecture`);
});

console.log('\\n✅ Bundle pattern propagation complete!');