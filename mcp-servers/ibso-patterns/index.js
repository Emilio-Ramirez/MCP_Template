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
import { resourceManifest } from './config/resource-manifest.js';
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
  return ResponseBuilder.buildResourceList(resourceManifest);
});

// Read specific resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (!resources[uri]) {
    throw new Error(`Resource not found: ${uri}`);
  }

  return ResponseBuilder.buildResourceResponse(uri, resources[uri]);
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
  console.error("IBSO Patterns MCP server running on stdio");
}

runServer().catch(console.error);