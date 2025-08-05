// Resource loader for IBSO Business Units MCP Server
import { resourceLoader } from '../utils/resource-loader.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to load markdown files
const loadMarkdown = (filePath) => {
  return () => {
    const fullPath = join(__dirname, filePath);
    return readFileSync(fullPath, 'utf8');
  };
};

// Resource mapping
export const resources = {
  // Vitracoat project resources - 2 files with real data, others are placeholders
  'vitracoat/overview': loadMarkdown('vitracoat/overview.md'),
  'vitracoat/formulation-management': loadMarkdown('vitracoat/formulation-management.md'),
  'vitracoat/raw-materials-management': loadMarkdown('vitracoat/raw-materials-management.md'),
  'vitracoat/request-management': loadMarkdown('vitracoat/request-management.md'),
  'vitracoat/users-management': loadMarkdown('vitracoat/users-management.md'),
  'vitracoat/clients-management': loadMarkdown('vitracoat/clients-management.md'),
  'vitracoat/system-configuration': loadMarkdown('vitracoat/system-configuration.md'),
  'vitracoat/notifications': loadMarkdown('vitracoat/notifications.md'),
  'vitracoat/messages': loadMarkdown('vitracoat/messages.md'),
  'vitracoat/dashboard': loadMarkdown('vitracoat/dashboard.md'),
  'vitracoat/auth': loadMarkdown('vitracoat/auth.md'),
};

// Export resource loader utility
export { resourceLoader };