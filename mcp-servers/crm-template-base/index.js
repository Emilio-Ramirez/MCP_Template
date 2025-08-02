#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Import configurations and loaders
import { serverConfig } from './config/server-config.js';
import { RESOURCE_MANIFEST } from './config/resource-manifest.js';
import { resources } from './resources/index.js';
import { prompts } from './prompts/index.js';
import { ResponseBuilder } from './utils/response-builder.js';

// Create server instance
const server = new Server(
  {
    name: serverConfig.name,
    version: serverConfig.version,
  },
  {
    capabilities: serverConfig.capabilities,
  }
);

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return ResponseBuilder.buildResourceList(RESOURCE_MANIFEST);
});

// Read specific resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  try {
    // Convert URI to resource path
    const resourcePath = uri.replace('crm-base://', '');
    
    // Find resource loader
    const resourceLoader = resources[resourcePath];
    if (!resourceLoader) {
      throw new Error(`Resource not found: ${uri}`);
    }
    
    // Load and return resource content
    const content = await resourceLoader();
    return ResponseBuilder.buildResourceResponse(uri, content);
    
  } catch (error) {
    console.error(`Error loading resource ${uri}:`, error.message);
    throw new Error(`Resource not found: ${uri}`);
  }
});

// List available prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  const promptList = Object.values(prompts);
  return ResponseBuilder.buildPromptList(promptList);
});

// Handle prompt requests
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  const prompt = prompts[name];
  if (!prompt) {
    throw new Error(`Prompt not found: ${name}`);
  }

  const response = prompt.handler(args);
  return ResponseBuilder.buildPromptResponse(response.description, response.messages);
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("CRM Template Base MCP server running on stdio");
}

runServer().catch(console.error);