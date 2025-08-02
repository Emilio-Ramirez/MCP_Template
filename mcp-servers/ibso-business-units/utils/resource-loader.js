/**
 * Resource loader utility for IBSO Business Units MCP Server
 * Handles dynamic resource loading and error management
 */

export class ResourceLoader {
  constructor() {
    this.cache = new Map();
    this.errorLog = [];
  }

  /**
   * Load a resource by path
   * @param {string} resourcePath - The resource path (e.g., 'vitracoat/overview')
   * @param {Object} resources - The resources object
   * @returns {string|null} The resource content or null if not found
   */
  loadResource(resourcePath, resources) {
    try {
      // Check cache first
      if (this.cache.has(resourcePath)) {
        return this.cache.get(resourcePath);
      }

      // Get resource from resources object
      const resource = resources[resourcePath];
      if (!resource) {
        throw new Error(`Resource not found: ${resourcePath}`);
      }

      // Execute resource function if it's a function
      const content = typeof resource === 'function' ? resource() : resource.default || resource;
      
      // Cache the result
      this.cache.set(resourcePath, content);
      
      return content;
    } catch (error) {
      this.logError(resourcePath, error);
      return null;
    }
  }

  /**
   * Clear the resource cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      errors: this.errorLog.length,
    };
  }

  /**
   * Log an error
   * @param {string} resourcePath - The resource path that caused the error
   * @param {Error} error - The error object
   */
  logError(resourcePath, error) {
    const errorEntry = {
      resourcePath,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
    
    this.errorLog.push(errorEntry);
    
    // Keep only the last 100 errors
    if (this.errorLog.length > 100) {
      this.errorLog.shift();
    }
    
    console.error(`Resource loading error for ${resourcePath}:`, error.message);
  }

  /**
   * Get error log
   * @returns {Array} Array of error entries
   */
  getErrorLog() {
    return [...this.errorLog];
  }

  /**
   * Validate a resource path
   * @param {string} resourcePath - The resource path to validate
   * @returns {boolean} True if the path is valid
   */
  isValidResourcePath(resourcePath) {
    if (!resourcePath || typeof resourcePath !== 'string') {
      return false;
    }

    // Basic path validation
    const pathRegex = /^[a-zA-Z0-9/_-]+$/;
    return pathRegex.test(resourcePath);
  }

  /**
   * List available resources
   * @param {Object} resources - The resources object
   * @returns {Array} Array of available resource paths
   */
  listAvailableResources(resources) {
    return Object.keys(resources).sort();
  }
}

// Create and export a singleton instance
export const resourceLoader = new ResourceLoader();