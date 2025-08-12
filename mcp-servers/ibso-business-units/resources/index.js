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

// Function to load JavaScript resource files
const loadResource = (filePath) => {
  return async () => {
    const module = await import(join(__dirname, filePath));
    return module.default;
  };
};

// Resource mapping
export const resources = {
  // Vitracoat project resources - 2 files with real data, others are placeholders
  'vitracoat/overview': loadMarkdown('vitracoat/overview.md'),
  'vitracoat/formulation-management': loadMarkdown('vitracoat/formulation-management.md'),
  'vitracoat/raw-materials-management': loadMarkdown('vitracoat/raw-materials-management.md'),
  'vitracoat/commercial-requests': loadResource('vitracoat/commercial-requests.js'),
  'vitracoat/users-management': loadMarkdown('vitracoat/users-management.md'),
  'vitracoat/clients-management': loadMarkdown('vitracoat/clients-management.md'),
  'vitracoat/system-configuration': loadMarkdown('vitracoat/system-configuration.md'),
  'vitracoat/notifications': loadMarkdown('vitracoat/notifications.md'),
  'vitracoat/messages': loadMarkdown('vitracoat/messages.md'),
  'vitracoat/dashboard': loadMarkdown('vitracoat/dashboard.md'),
  'vitracoat/auth': loadMarkdown('vitracoat/auth.md'),
  
  // DEFASA_CXP project resources - template placeholders
  'defasa_cxp/overview': loadMarkdown('defasa_cxp/overview.md'),
  'defasa_cxp/auth': loadMarkdown('defasa_cxp/auth.md'),
  'defasa_cxp/dashboard': loadMarkdown('defasa_cxp/dashboard.md'),
  'defasa_cxp/users-management': loadMarkdown('defasa_cxp/users-management.md'),
  'defasa_cxp/clients-management': loadMarkdown('defasa_cxp/clients-management.md'),
  'defasa_cxp/system-management': loadMarkdown('defasa_cxp/system-management.md'),
  'defasa_cxp/notifications': loadMarkdown('defasa_cxp/notifications.md'),
  'defasa_cxp/messages': loadMarkdown('defasa_cxp/messages.md'),
  'defasa_cxp/request-management': loadMarkdown('defasa_cxp/request-management.md'),
  'defasa_cxp/formulation-management': loadMarkdown('defasa_cxp/formulation-management.md'),
  'defasa_cxp/raw-materials-management': loadMarkdown('defasa_cxp/raw-materials-management.md'),
};

// Export resource loader utility
export { resourceLoader };