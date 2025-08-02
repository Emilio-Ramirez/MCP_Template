export const createClientMcpPrompt = {
  name: "create_client_mcp",
  description: "Generate custom MCP server for client",
  arguments: [
    {
      name: "client_name",
      description: "Name of the client",
      required: true,
    },
    {
      name: "domain",
      description: "Client domain name",
      required: true,
    },
  ],
  handler: (args) => ({
    description: `Creating custom MCP server for ${args?.client_name || "client"}`,
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Generate a custom MCP server for ${args?.client_name || "client"} with domain ${args?.domain || "client.com"} using the agency://automation/mcp-generator. Include client-specific resources for project specs, branding guidelines, environment configs, and contacts.`,
        },
      },
    ],
  })
};