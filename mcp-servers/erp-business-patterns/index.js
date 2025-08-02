#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { serverConfig } from './config/server-config.js';
import { resourceLoader } from './utils/resource-loader.js';
import ResponseBuilder from './utils/response-builder.js';

class ERPBusinessPatternsServer {
  constructor() {
    this.server = new Server(
      {
        name: serverConfig.name,
        version: serverConfig.version,
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupHandlers();
    this.setupErrorHandling();
  }

  setupHandlers() {
    // Resource handlers
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      await this.ensureInitialized();
      
      const allResources = resourceLoader.getAllResources();
      
      return {
        resources: allResources.map(({ name, resource }) => {
          const metadata = resourceLoader.getResourceMetadata(name);
          return {
            uri: `erp-business-patterns://resource/${name}`,
            name: resource.name,
            description: resource.description,
            mimeType: 'application/json',
            annotations: {
              category: metadata.category,
              complexity: metadata.complexity,
              tags: metadata.tags
            }
          };
        })
      };
    });

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      await this.ensureInitialized();
      
      const uri = request.params.uri;
      const resourceName = this.extractResourceName(uri);
      
      if (!resourceName) {
        throw new Error(`Invalid resource URI: ${uri}`);
      }

      try {
        const resource = resourceLoader.getResource(resourceName);
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(resource, null, 2)
            }
          ]
        };
      } catch (error) {
        throw new Error(`Resource not found: ${resourceName}`);
      }
    });

    // Tool handlers
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'get_business_model',
            description: 'Get the complete Vitracoat business model with 5 config pages and 8 modules',
            inputSchema: {
              type: 'object',
              properties: {},
              required: []
            }
          },
          {
            name: 'get_configuration_system',
            description: 'Get ERP configuration system patterns including tab patterns and CRUD operations',
            inputSchema: {
              type: 'object',
              properties: {},
              required: []
            }
          },
          {
            name: 'get_chemical_workflows',
            description: 'Get chemical request workflows (LWR/TLWR/VLWR) with multi-step forms',
            inputSchema: {
              type: 'object',
              properties: {
                workflow_type: {
                  type: 'string',
                  enum: ['lwr', 'tlwr', 'vlwr', 'all'],
                  description: 'Specific workflow type or all workflows'
                }
              }
            }
          },
          {
            name: 'get_security_patterns',
            description: 'Get role-based access control patterns and security implementation',
            inputSchema: {
              type: 'object',
              properties: {},
              required: []
            }
          },
          {
            name: 'get_form_patterns',
            description: 'Get multi-step form implementation patterns and validation',
            inputSchema: {
              type: 'object',
              properties: {
                form_type: {
                  type: 'string',
                  enum: ['basic', 'chemical', 'lwr'],
                  description: 'Type of form pattern to retrieve'
                }
              }
            }
          },
          {
            name: 'search_patterns',
            description: 'Search for ERP business patterns by keyword or category',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query for patterns, components, or workflows'
                },
                category: {
                  type: 'string',
                  enum: ['Business Architecture', 'System Architecture', 'Workflow Management', 'Security Architecture', 'UI Components', 'Form Components', 'Data Operations'],
                  description: 'Filter by specific category'
                },
                complexity: {
                  type: 'string',
                  enum: ['basic', 'intermediate', 'advanced', 'enterprise'],
                  description: 'Filter by complexity level'
                }
              },
              required: ['query']
            }
          },
          {
            name: 'get_overview',
            description: 'Get complete overview of all ERP business patterns and resources',
            inputSchema: {
              type: 'object',
              properties: {},
              required: []
            }
          },
          {
            name: 'get_quick_reference',
            description: 'Get quick reference guide for key ERP patterns and workflows',
            inputSchema: {
              type: 'object',
              properties: {},
              required: []
            }
          }
        ]
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      await this.ensureInitialized();
      
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'get_business_model':
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(ResponseBuilder.buildBusinessModelResponse(), null, 2)
                }
              ]
            };

          case 'get_configuration_system':
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(ResponseBuilder.buildConfigurationResponse(), null, 2)
                }
              ]
            };

          case 'get_chemical_workflows':
            const workflowType = args.workflow_type || 'all';
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(ResponseBuilder.buildWorkflowResponse(workflowType), null, 2)
                }
              ]
            };

          case 'get_security_patterns':
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(ResponseBuilder.buildSecurityResponse(), null, 2)
                }
              ]
            };

          case 'get_form_patterns':
            const formType = args.form_type || 'basic';
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(ResponseBuilder.buildFormResponse(formType), null, 2)
                }
              ]
            };

          case 'search_patterns':
            const { query, category, complexity } = args;
            let results = resourceLoader.searchResources(query);
            
            if (category) {
              results = results.filter(r => r.metadata.category === category);
            }
            
            if (complexity) {
              results = results.filter(r => r.metadata.complexity === complexity);
            }
            
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(ResponseBuilder.buildSearchResponse(query, results), null, 2)
                }
              ]
            };

          case 'get_overview':
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(ResponseBuilder.buildOverviewResponse(), null, 2)
                }
              ]
            };

          case 'get_quick_reference':
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(ResponseBuilder.buildQuickReferenceResponse(), null, 2)
                }
              ]
            };

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(ResponseBuilder.buildErrorResponse(error.message, name), null, 2)
            }
          ],
          isError: true
        };
      }
    });
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[ERP Business Patterns Server Error]:', error);
    };

    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down ERP Business Patterns Server...');
      await this.server.close();
      process.exit(0);
    });
  }

  async ensureInitialized() {
    if (!resourceLoader.initialized) {
      console.log('🔄 Initializing ERP Business Patterns Server...');
      await resourceLoader.initialize();
      console.log('✅ Server ready');
    }
  }

  extractResourceName(uri) {
    const match = uri.match(/^erp-business-patterns:\/\/resource\/(.+)$/);
    return match ? match[1] : null;
  }

  async run() {
    console.log(`🚀 Starting ${serverConfig.name} v${serverConfig.version}`);
    console.log(`📋 ${serverConfig.description}`);
    
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    
    console.log('🎯 ERP Business Patterns Server running on stdio');
  }
}

// Run the server
const server = new ERPBusinessPatternsServer();
server.run().catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});