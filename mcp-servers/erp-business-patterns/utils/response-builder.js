// Response building utilities for ERP Business Patterns MCP Server
import { resourceLoader } from './resource-loader.js';

export class ResponseBuilder {
  static buildResourceResponse(resourceName, options = {}) {
    try {
      const resource = resourceLoader.getResource(resourceName);
      const metadata = resourceLoader.getResourceMetadata(resourceName);
      
      const response = {
        resource: resource.name,
        description: resource.description,
        category: metadata.category,
        complexity: metadata.complexity,
        tags: metadata.tags,
        content: resource
      };

      // Add specific sections if requested
      if (options.includeImplementation && resource.implementationPatterns) {
        response.implementation = resource.implementationPatterns;
      }

      if (options.includeExamples && resource.examples) {
        response.examples = resource.examples;
      }

      if (options.includeBestPractices && resource.bestPractices) {
        response.bestPractices = resource.bestPractices;
      }

      if (options.includeTroubleshooting && resource.troubleshooting) {
        response.troubleshooting = resource.troubleshooting;
      }

      return response;
    } catch (error) {
      return this.buildErrorResponse(error.message, resourceName);
    }
  }

  static buildMultiResourceResponse(resourceNames, options = {}) {
    const responses = [];
    const errors = [];

    for (const resourceName of resourceNames) {
      try {
        const response = this.buildResourceResponse(resourceName, options);
        responses.push(response);
      } catch (error) {
        errors.push({ resource: resourceName, error: error.message });
      }
    }

    return {
      resources: responses,
      errors: errors.length > 0 ? errors : undefined,
      count: responses.length
    };
  }

  static buildSearchResponse(query, results) {
    return {
      query,
      results: results.map(result => ({
        name: result.name,
        resource: result.resource.name,
        description: result.resource.description,
        category: result.metadata.category,
        tags: result.metadata.tags,
        complexity: result.metadata.complexity,
        relevance: this.calculateRelevance(query, result)
      })),
      count: results.length
    };
  }

  static buildCategoryResponse(category) {
    try {
      const resources = resourceLoader.getResourcesByCategory(category);
      
      return {
        category,
        resources: resources.map(({ name, resource }) => ({
          name,
          title: resource.name,
          description: resource.description,
          metadata: resourceLoader.getResourceMetadata(name)
        })),
        count: resources.length
      };
    } catch (error) {
      return this.buildErrorResponse(error.message, category);
    }
  }

  static buildOverviewResponse() {
    try {
      const serverInfo = resourceLoader.getServerInfo();
      const allResources = resourceLoader.getAllResources();

      return {
        server: {
          name: serverInfo.name,
          version: serverInfo.version,
          description: serverInfo.description,
          metadata: serverInfo.metadata
        },
        statistics: {
          totalResources: serverInfo.resourceCount,
          categories: serverInfo.categories.length,
          tags: serverInfo.tags.length,
          complexityLevels: serverInfo.complexityLevels.length
        },
        categories: serverInfo.categories.map(category => ({
          name: category,
          count: resourceLoader.getResourcesByCategory(category).length
        })),
        resources: allResources.map(({ name, resource }) => {
          const metadata = resourceLoader.getResourceMetadata(name);
          return {
            name,
            title: resource.name,
            description: resource.description,
            category: metadata.category,
            complexity: metadata.complexity,
            tags: metadata.tags
          };
        })
      };
    } catch (error) {
      return this.buildErrorResponse(error.message);
    }
  }

  static buildBusinessModelResponse() {
    try {
      const vitracoatModel = resourceLoader.getResource('vitracoat-business-model');
      
      return {
        businessModel: vitracoatModel.name,
        overview: vitracoatModel.overview,
        architecture: {
          configurationPages: vitracoatModel.businessArchitecture.configurationPages,
          coreModules: vitracoatModel.businessArchitecture.coreModules.map(module => ({
            name: module.name,
            purpose: module.purpose,
            features: module.features || module.businessRules
          }))
        },
        implementation: vitracoatModel.implementationPatterns,
        kpis: vitracoatModel.businessKPIs,
        integrations: vitracoatModel.integrationPoints
      };
    } catch (error) {
      return this.buildErrorResponse(error.message, 'vitracoat-business-model');
    }
  }

  static buildWorkflowResponse(workflowType) {
    try {
      let workflow;
      
      switch (workflowType.toLowerCase()) {
        case 'lwr':
          workflow = resourceLoader.getResource('lwr-request-workflow');
          break;
        case 'chemical':
        case 'all':
          workflow = resourceLoader.getResource('chemical-request-workflows');
          break;
        default:
          throw new Error(`Unknown workflow type: ${workflowType}`);
      }

      return {
        workflow: workflow.name,
        description: workflow.description,
        overview: workflow.overview,
        implementation: workflow.multiStepFormImplementation || workflow.implementationExample,
        validation: workflow.validationPatterns || workflow.businessLogicRules,
        bestPractices: workflow.bestPractices,
        troubleshooting: workflow.commonIssues || workflow.troubleshooting
      };
    } catch (error) {
      return this.buildErrorResponse(error.message, workflowType);
    }
  }

  static buildConfigurationResponse() {
    try {
      const configSystem = resourceLoader.getResource('erp-configuration-system');
      const tabsPattern = resourceLoader.getResource('configuration-tabs-pattern');
      
      return {
        system: configSystem.name,
        overview: configSystem.overview,
        patterns: {
          tabs: {
            name: tabsPattern.name,
            implementation: tabsPattern.officialImplementation,
            requirements: tabsPattern.mandatoryRequirements,
            styling: tabsPattern.requiredStyling
          },
          crud: configSystem.corePatterns.crudOperationsPattern,
          dataTable: configSystem.corePatterns.dataTablePattern
        },
        notifications: configSystem.notificationSystem,
        translations: configSystem.translationStructure,
        bestPractices: configSystem.bestPractices
      };
    } catch (error) {
      return this.buildErrorResponse(error.message, 'configuration-system');
    }
  }

  static buildSecurityResponse() {
    try {
      const rbac = resourceLoader.getResource('role-based-access-patterns');
      
      return {
        system: rbac.name,
        overview: rbac.overview,
        roles: rbac.roleDefinitions.roles.map(role => ({
          name: role.name,
          title: role.title,
          level: role.level,
          description: role.description,
          permissions: role.permissions,
          dataAccess: role.dataAccess
        })),
        permissionMatrix: rbac.permissionMatrix,
        implementation: {
          azureAD: rbac.implementationPatterns.azureADIntegration,
          middleware: rbac.implementationPatterns.middlewareProtection,
          components: rbac.implementationPatterns.componentLevelGuards
        },
        bestPractices: rbac.securityBestPractices
      };
    } catch (error) {
      return this.buildErrorResponse(error.message, 'role-based-access');
    }
  }

  static buildFormResponse(formType) {
    try {
      const multiStepForms = resourceLoader.getResource('multi-step-forms');
      
      const response = {
        forms: multiStepForms.name,
        overview: multiStepForms.overview,
        implementation: multiStepForms.coreImplementation,
        validation: multiStepForms.stepValidationPatterns,
        ui: multiStepForms.stepperUIComponent,
        fileUpload: multiStepForms.fileUploadIntegration,
        navigation: multiStepForms.navigationControls,
        troubleshooting: multiStepForms.commonIssues,
        bestPractices: multiStepForms.bestPractices
      };

      if (formType === 'chemical' || formType === 'lwr') {
        const chemicalWorkflows = resourceLoader.getResource('chemical-request-workflows');
        response.chemicalWorkflows = {
          requestTypes: chemicalWorkflows.requestTypeDefinitions,
          implementation: chemicalWorkflows.multiStepFormImplementation,
          validation: chemicalWorkflows.validationPatterns
        };
      }

      return response;
    } catch (error) {
      return this.buildErrorResponse(error.message, 'multi-step-forms');
    }
  }

  static buildErrorResponse(message, context = null) {
    const error = {
      error: true,
      message,
      timestamp: new Date().toISOString()
    };

    if (context) {
      error.context = context;
    }

    // Add helpful suggestions for common errors
    if (message.includes('not found')) {
      error.suggestion = 'Use the overview endpoint to see all available resources';
      error.availableResources = resourceLoader.getServerInfo().availableResources;
    }

    return error;
  }

  static calculateRelevance(query, result) {
    const normalizedQuery = query.toLowerCase();
    let score = 0;

    // Exact match in name gets highest score
    if (result.name.toLowerCase() === normalizedQuery) score += 100;
    
    // Partial match in name
    if (result.name.toLowerCase().includes(normalizedQuery)) score += 75;
    
    // Match in resource name
    if (result.resource.name.toLowerCase().includes(normalizedQuery)) score += 50;
    
    // Match in description
    if (result.resource.description.toLowerCase().includes(normalizedQuery)) score += 25;
    
    // Match in tags
    if (result.metadata.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))) score += 15;
    
    // Match in category
    if (result.metadata.category.toLowerCase().includes(normalizedQuery)) score += 10;

    return score;
  }

  static buildQuickReferenceResponse() {
    return {
      quickReference: "ERP Business Patterns - Key Resources",
      patterns: [
        {
          name: "Configuration Tabs Pattern",
          usage: "For all configuration page implementations",
          key: "configuration-tabs-pattern"
        },
        {
          name: "Multi-Step Forms",
          usage: "For complex request workflows (LWR/TLWR/VLWR)",
          key: "multi-step-forms"
        },
        {
          name: "CRUD Operations",
          usage: "For standard data management interfaces",
          key: "crud-operations"
        },
        {
          name: "Role-Based Access",
          usage: "For user permissions and security",
          key: "role-based-access-patterns"
        }
      ],
      workflows: [
        {
          name: "LWR - Product Development",
          description: "Complete formulation development workflow",
          key: "lwr-request-workflow"
        },
        {
          name: "Chemical Request Workflows",
          description: "All request types (LWR/TLWR/VLWR/Micro)",
          key: "chemical-request-workflows"
        }
      ],
      businessModel: {
        name: "Vitracoat Business Model",
        description: "5 config pages, 8 modules, complete ERP system",
        key: "vitracoat-business-model"
      }
    };
  }
}

export default ResponseBuilder;