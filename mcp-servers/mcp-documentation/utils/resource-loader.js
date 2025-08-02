// Resource loader utility for MCP Documentation Server
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function loadResource(resourcePath) {
  try {
    const fullPath = join(__dirname, '..', 'resources', resourcePath);
    const module = await import(fullPath);
    return module.default;
  } catch (error) {
    throw new Error(`Failed to load resource ${resourcePath}: ${error.message}`);
  }
}

export function extractUriParts(uri) {
  const parts = uri.replace('mcp-meta://', '').split('/');
  return {
    category: parts[0],
    subcategory: parts[1],
    fullPath: parts.join('/')
  };
}