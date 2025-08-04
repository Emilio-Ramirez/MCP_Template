#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListResourcesRequestSchema, ListToolsRequestSchema, ReadResourceRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { serverConfig } from './config/server-config.js';
import { resourceManifest } from './config/resource-manifest.js';
import { resources } from './resources/index.js';
import { prompts } from './prompts/index.js';
import { ResponseBuilder } from './utils/response-builder.js';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    this.markdownResources = this.discoverMarkdownFiles();
    this.setupHandlers();
  }

  discoverMarkdownFiles() {
    const markdownFiles = {};
    try {
      const files = readdirSync(__dirname);
      for (const file of files) {
        if (file.startsWith('README-') && file.endsWith('.md')) {
          const name = file.replace('README-', '').replace('.md', '');
          const uri = `ibso-business://readme/${name}`;
          markdownFiles[`readme/${name}`] = {
            path: join(__dirname, file),
            uri,
            name: `${name.charAt(0).toUpperCase() + name.slice(1)} Management README`,
            description: `README documentation for ${name} management system`
          };
        }
      }
    } catch (error) {
      console.error('Error discovering markdown files:', error);
    }
    return markdownFiles;
  }

  setupHandlers() {
    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      const jsResources = resourceManifest.resources.map(resource => ({
        uri: resource.uri,
        mimeType: resource.mimeType,
        name: resource.name,
        description: resource.description,
      }));

      const mdResources = Object.values(this.markdownResources).map(resource => ({
        uri: resource.uri,
        mimeType: 'text/markdown',
        name: resource.name,
        description: resource.description,
      }));

      return {
        resources: [...jsResources, ...mdResources],
      };
    });

    // Read specific resource
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;
      
      try {
        // Parse URI to get resource path
        const resourcePath = uri.replace('ibso-business://', '');
        
        // Check if it's a markdown resource first
        if (this.markdownResources[resourcePath]) {
          const mdResource = this.markdownResources[resourcePath];
          const content = readFileSync(mdResource.path, 'utf8');
          return {
            contents: [{
              uri,
              mimeType: 'text/markdown',
              text: content,
            }],
          };
        }
        
        // Otherwise, check JavaScript resources
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