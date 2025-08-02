export const generateSowPrompt = {
  name: "generate_sow",
  description: "Generate Statement of Work for client",
  arguments: [
    {
      name: "client_name", 
      description: "Name of the client",
      required: true,
    },
    {
      name: "project_scope",
      description: "Brief description of project scope",
      required: true,
    },
  ],
  handler: (args) => ({
    description: `Generating SOW for ${args?.client_name || "client"}`,
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Create a comprehensive Statement of Work for ${args?.client_name || "client"} using the agency://contracts/sow-template. Project scope: ${args?.project_scope || "custom web application"}. Include detailed phases, deliverables, timeline, and terms.`,
        },
      },
    ],
  })
};