// Resource loading utilities for ERP Business Patterns MCP Server
import { serverConfig } from '../config/server-config.js';
import { resourceManifest } from '../config/resource-manifest.js';

export class ResourceLoader {
  constructor() {
    this.resources = new Map();
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Load all resources dynamically
      await this.loadBusinessResources();
      await this.loadArchitectureResources();
      await this.loadWorkflowResources();
      await this.loadSecurityResources();
      await this.loadComponentResources();
      await this.loadOperationResources();
      
      this.initialized = true;
      console.log(`✅ Loaded ${this.resources.size} ERP business pattern resources`);
    } catch (error) {
      console.error('❌ Failed to initialize resources:', error);
      throw error;
    }
  }

  async loadBusinessResources() {
    try {
      const { vitracoatBusinessModel } = await import('../resources/business/vitracoat-business-model.js');
      this.resources.set('vitracoat-business-model', vitracoatBusinessModel);
    } catch (error) {
      console.warn('⚠️ Could not load business resources:', error.message);
    }
  }

  async loadArchitectureResources() {
    try {
      const { erpConfigurationSystem } = await import('../resources/architecture/erp-configuration-system.js');
      this.resources.set('erp-configuration-system', erpConfigurationSystem);
    } catch (error) {
      console.warn('⚠️ Could not load architecture resources:', error.message);
    }
  }

  async loadWorkflowResources() {
    try {
      const { chemicalRequestWorkflows } = await import('../resources/workflows/chemical-request-workflows.js');
      const { lwrRequestWorkflow } = await import('../resources/workflows/lwr-request-workflow.js');
      
      this.resources.set('chemical-request-workflows', chemicalRequestWorkflows);
      this.resources.set('lwr-request-workflow', lwrRequestWorkflow);
    } catch (error) {
      console.warn('⚠️ Could not load workflow resources:', error.message);
    }
  }

  async loadSecurityResources() {
    try {
      const { roleBasedAccessPatterns } = await import('../resources/security/role-based-access-patterns.js');
      this.resources.set('role-based-access-patterns', roleBasedAccessPatterns);
    } catch (error) {
      console.warn('⚠️ Could not load security resources:', error.message);
    }
  }

  async loadComponentResources() {
    try {
      const { configurationTabsPattern } = await import('../resources/components/configuration-tabs-pattern.js');
      const { multiStepForms } = await import('../resources/components/multi-step-forms.js');
      
      this.resources.set('configuration-tabs-pattern', configurationTabsPattern);
      this.resources.set('multi-step-forms', multiStepForms);
    } catch (error) {
      console.warn('⚠️ Could not load component resources:', error.message);
    }
  }

  async loadOperationResources() {
    try {
      const { crudOperations } = await import('../resources/operations/crud-operations.js');
      this.resources.set('crud-operations', crudOperations);
    } catch (error) {
      console.warn('⚠️ Could not load operation resources:', error.message);
    }
  }

  getResource(resourceName) {
    if (!this.initialized) {
      throw new Error('ResourceLoader not initialized. Call initialize() first.');
    }

    const resource = this.resources.get(resourceName);
    if (!resource) {
      throw new Error(`Resource '${resourceName}' not found. Available resources: ${Array.from(this.resources.keys()).join(', ')}`);
    }

    return resource;
  }

  getAllResources() {
    if (!this.initialized) {
      throw new Error('ResourceLoader not initialized. Call initialize() first.');
    }

    return Array.from(this.resources.entries()).map(([name, resource]) => ({
      name,
      resource
    }));
  }

  getResourcesByCategory(category) {
    if (!this.initialized) {
      throw new Error('ResourceLoader not initialized. Call initialize() first.');
    }

    return Array.from(this.resources.entries())
      .filter(([name]) => {
        const manifest = resourceManifest[name];
        return manifest && manifest.category === category;
      })
      .map(([name, resource]) => ({ name, resource }));
  }

  getResourcesByTag(tag) {
    if (!this.initialized) {
      throw new Error('ResourceLoader not initialized. Call initialize() first.');
    }

    return Array.from(this.resources.entries())
      .filter(([name]) => {
        const manifest = resourceManifest[name];
        return manifest && manifest.tags && manifest.tags.includes(tag);
      })
      .map(([name, resource]) => ({ name, resource }));
  }

  getResourcesByComplexity(complexity) {
    if (!this.initialized) {
      throw new Error('ResourceLoader not initialized. Call initialize() first.');
    }

    return Array.from(this.resources.entries())
      .filter(([name]) => {
        const manifest = resourceManifest[name];
        return manifest && manifest.complexity === complexity;
      })
      .map(([name, resource]) => ({ name, resource }));
  }

  validateResourceDependencies(resourceName) {
    const manifest = resourceManifest[resourceName];
    if (!manifest || !manifest.dependencies) {
      return { valid: true, missing: [] };
    }

    const missing = manifest.dependencies.filter(dep => !this.resources.has(dep));
    
    return {
      valid: missing.length === 0,
      missing,
      dependencies: manifest.dependencies
    };
  }

  getResourceMetadata(resourceName) {
    const manifest = resourceManifest[resourceName];
    if (!manifest) {
      return null;
    }

    const dependencies = this.validateResourceDependencies(resourceName);
    
    return {
      name: manifest.name,
      description: manifest.description,
      category: manifest.category,
      tags: manifest.tags || [],
      complexity: manifest.complexity,
      dependencies: dependencies,
      available: this.resources.has(resourceName)
    };
  }

  searchResources(query) {
    if (!this.initialized) {
      throw new Error('ResourceLoader not initialized. Call initialize() first.');
    }

    const normalizedQuery = query.toLowerCase();
    
    return Array.from(this.resources.entries())
      .filter(([name, resource]) => {
        const manifest = resourceManifest[name];
        
        // Search in resource name
        if (name.toLowerCase().includes(normalizedQuery)) return true;
        
        // Search in manifest name and description
        if (manifest) {
          if (manifest.name.toLowerCase().includes(normalizedQuery)) return true;
          if (manifest.description.toLowerCase().includes(normalizedQuery)) return true;
          if (manifest.tags && manifest.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))) return true;
        }
        
        // Search in resource content (name and description fields)
        if (resource.name && resource.name.toLowerCase().includes(normalizedQuery)) return true;
        if (resource.description && resource.description.toLowerCase().includes(normalizedQuery)) return true;
        
        return false;
      })
      .map(([name, resource]) => ({ name, resource, metadata: this.getResourceMetadata(name) }));
  }

  getServerInfo() {
    return {
      ...serverConfig,
      resourceCount: this.resources.size,
      initialized: this.initialized,
      availableResources: Array.from(this.resources.keys()),
      categories: [...new Set(Object.values(resourceManifest).map(r => r.category))],
      tags: [...new Set(Object.values(resourceManifest).flatMap(r => r.tags || []))],
      complexityLevels: [...new Set(Object.values(resourceManifest).map(r => r.complexity))]
    };
  }
}

// Create singleton instance
export const resourceLoader = new ResourceLoader();