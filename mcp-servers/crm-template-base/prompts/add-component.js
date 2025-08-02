export const addComponentPrompt = {
  name: "add_component",
  description: "Add a new UI component to the template",
  arguments: [
    {
      name: "component_type",
      description: "Type of component to add",
      required: true,
    },
  ],
  handler: (args) => ({
    description: `Adding ${args?.component_type || "component"} to CRM template`,
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Create a new ${args?.component_type || "component"} following the shadcn/ui patterns used in the CRM template. Include TypeScript types, proper styling, and role-based access if needed.`,
        },
      },
    ],
  })
};