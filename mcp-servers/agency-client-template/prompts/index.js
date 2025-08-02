// Prompt loaders
import { onboardClientPrompt } from './onboard-client.js';
import { generateSowPrompt } from './generate-sow.js';
import { createClientMcpPrompt } from './create-client-mcp.js';

export const prompts = {
  'onboard_client': onboardClientPrompt,
  'generate_sow': generateSowPrompt,
  'create_client_mcp': createClientMcpPrompt,
};