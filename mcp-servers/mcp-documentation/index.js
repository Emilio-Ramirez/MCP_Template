#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListResourcesRequestSchema, ReadResourceRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// Import configuration and resources
import { SERVER_CONFIG, URI_SCHEME } from './config/server-config.js';
import { RESOURCE_MANIFEST } from './config/resource-manifest.js';
import { resources } from './resources/index.js';
import { prompts } from './prompts/index.js';
import { buildResourceResponse, buildErrorResponse } from './utils/response-builder.js';

// Initialize server
const server = new Server(SERVER_CONFIG, { capabilities: SERVER_CONFIG.capabilities });

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: RESOURCE_MANIFEST.map(resource => ({
      uri: resource.uri,
      mimeType: resource.mimeType,
      name: resource.name,
      description: resource.description
    }))
  };
});

// Read resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;
  
  try {
    // Extract resource path from URI
    const resourcePath = uri.replace(`${URI_SCHEME}://`, '');
    
    // Find resource in manifest
    const resourceInfo = RESOURCE_MANIFEST.find(r => r.uri === uri);
    if (!resourceInfo) {
      throw new Error(`Resource not found: ${uri}`);
    }
    
    // Load resource content
    const resourceLoader = resources[resourcePath];
    if (!resourceLoader) {
      throw new Error(`Resource loader not found for: ${resourcePath}`);
    }
    
    const content = await resourceLoader();
    return buildResourceResponse(uri, content, resourceInfo.mimeType);
    
  } catch (error) {
    console.error(`Error loading resource ${uri}:`, error.message);
    return buildErrorResponse(error, uri);
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Documentation server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});