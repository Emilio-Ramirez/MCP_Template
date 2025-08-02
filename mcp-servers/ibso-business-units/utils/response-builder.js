/**
 * Response builder utility for IBSO Business Units MCP Server
 * Standardizes response formats and error handling
 */

export class ResponseBuilder {
  constructor() {
    this.serverName = 'ibso-business-units';
    this.version = '1.0.0';
  }

  /**
   * Build a successful resource response
   * @param {string} uri - The resource URI
   * @param {string} content - The resource content
   * @param {string} mimeType - The MIME type (default: text/markdown)
   * @returns {Object} Formatted response
   */
  resourceSuccess(uri, content, mimeType = 'text/markdown') {
    return {
      contents: [{
        uri,
        mimeType,
        text: content,
      }],
    };
  }

  /**
   * Build a resource not found error response
   * @param {string} uri - The resource URI that wasn't found
   * @returns {Object} Error response
   */
  resourceNotFound(uri) {
    const error = new Error(`Resource not found: ${uri}`);
    error.code = 'RESOURCE_NOT_FOUND';
    throw error;
  }

  /**
   * Build a resource loading error response
   * @param {string} uri - The resource URI that failed to load
   * @param {string} message - The error message
   * @returns {Object} Error response
   */
  resourceError(uri, message) {
    const error = new Error(`Failed to load resource ${uri}: ${message}`);
    error.code = 'RESOURCE_LOAD_ERROR';
    throw error;
  }

  /**
   * Build a successful tool response
   * @param {*} result - The tool execution result
   * @param {boolean} isError - Whether this is an error response
   * @returns {Object} Tool response
   */
  toolSuccess(result, isError = false) {
    return {
      content: [
        {
          type: 'text',
          text: typeof result === 'string' ? result : JSON.stringify(result, null, 2),
        },
      ],
      isError,
    };
  }

  /**
   * Build a tool error response
   * @param {string} message - The error message
   * @returns {Object} Tool error response
   */
  toolError(message) {
    return this.toolSuccess(`Error: ${message}`, true);
  }

  /**
   * Build a validation error response
   * @param {string} field - The field that failed validation
   * @param {string} message - The validation error message
   * @returns {Object} Validation error response
   */
  validationError(field, message) {
    const error = new Error(`Validation error for ${field}: ${message}`);
    error.code = 'VALIDATION_ERROR';
    error.field = field;
    throw error;
  }

  /**
   * Build a business rule violation error response
   * @param {string} rule - The business rule that was violated
   * @param {string} message - The violation message
   * @returns {Object} Business rule error response
   */
  businessRuleError(rule, message) {
    const error = new Error(`Business rule violation (${rule}): ${message}`);
    error.code = 'BUSINESS_RULE_VIOLATION';
    error.rule = rule;
    throw error;
  }

  /**
   * Build a server information response
   * @returns {Object} Server information
   */
  serverInfo() {
    return {
      server: this.serverName,
      version: this.version,
      timestamp: new Date().toISOString(),
      description: 'IBSO Business Units MCP Server - Client-specific project patterns and configurations',
    };
  }

  /**
   * Build a health check response
   * @param {Object} stats - Server statistics
   * @returns {Object} Health check response
   */
  healthCheck(stats = {}) {
    return {
      status: 'healthy',
      server: this.serverName,
      version: this.version,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      stats,
    };
  }

  /**
   * Build a resource list response
   * @param {Array} resources - Array of resource objects
   * @returns {Object} Resource list response
   */
  resourceList(resources) {
    return {
      resources: resources.map(resource => ({
        uri: resource.uri,
        name: resource.name,
        description: resource.description,
        mimeType: resource.mimeType || 'text/markdown',
        category: resource.category,
        tags: resource.tags || [],
      })),
    };
  }

  /**
   * Format error for logging
   * @param {Error} error - The error to format
   * @param {string} context - Additional context information
   * @returns {Object} Formatted error log entry
   */
  formatErrorForLog(error, context = '') {
    return {
      timestamp: new Date().toISOString(),
      server: this.serverName,
      context,
      error: {
        name: error.name,
        message: error.message,
        code: error.code || 'UNKNOWN_ERROR',
        stack: error.stack,
      },
    };
  }

  /**
   * Build a paginated response
   * @param {Array} items - Array of items
   * @param {number} page - Current page number
   * @param {number} limit - Items per page
   * @param {number} total - Total number of items
   * @returns {Object} Paginated response
   */
  paginatedResponse(items, page, limit, total) {
    return {
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  }
}