import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class ResourceLoader {
  constructor() {
    this.resourcesPath = join(__dirname, '../resources');
  }

  async loadResource(category, filename) {
    try {
      const resourcePath = join(this.resourcesPath, category, filename);
      const module = await import(resourcePath);
      return module.default || module;
    } catch (error) {
      throw new Error(`Failed to load resource ${category}/${filename}: ${error.message}`);
    }
  }

  async loadAllResources(manifest) {
    const resources = {};
    
    for (const resource of manifest) {
      try {
        const content = await this.loadResource(resource.category, resource.filename);
        resources[resource.uri] = {
          ...resource,
          content
        };
      } catch (error) {
        console.error(`Error loading resource ${resource.uri}:`, error);
      }
    }
    
    return resources;
  }
}