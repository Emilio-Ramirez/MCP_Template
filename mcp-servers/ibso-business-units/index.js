#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListResourcesRequestSchema, ListToolsRequestSchema, ReadResourceRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { serverConfig } from './config/server-config.js';
import { resourceManifest } from './config/resource-manifest.js';
import { resources } from './resources/index.js';
import { prompts } from './prompts/index.js';
import { ResponseBuilder } from './utils/response-builder.js';

class IBSOBusinessUnitsMCPServer {
  constructor() {
    this.server = new Server(serverConfig, {
      capabilities: {
        resources: {},
        tools: {},
        prompts: {},
      },
    });

    this.responseBuilder = new ResponseBuilder();
    this.setupHandlers();
  }

  setupHandlers() {
    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: resourceManifest.resources.map(resource => ({
          uri: resource.uri,
          mimeType: resource.mimeType,
          name: resource.name,
          description: resource.description,
        })),
      };
    });

    // Read specific resource
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;
      
      try {
        // Parse URI to get resource path
        const resourcePath = uri.replace('ibso-business://', '');
        
        // Get resource content
        const resource = resources[resourcePath];
        if (!resource) {
          throw new Error(`Resource not found: ${resourcePath}`);
        }

        return {
          contents: [{
            uri,
            mimeType: 'text/markdown',
            text: typeof resource === 'function' ? resource() : resource.default || resource,
          }],
        };
      } catch (error) {
        console.error('Error reading resource:', error);
        throw new Error(`Failed to read resource ${uri}: ${error.message}`);
      }
    });

    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return { tools: [] }; // No tools for now
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      try {
        // Tool handling would go here
        return this.responseBuilder.toolError(`Unknown tool: ${name}`);
      } catch (error) {
        console.error('Error calling tool:', error);
        return this.responseBuilder.toolError(`Tool execution failed: ${error.message}`);
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('IBSO Business Units MCP server running on stdio');
  }
}

const server = new IBSOBusinessUnitsMCPServer();
server.run().catch(console.error);