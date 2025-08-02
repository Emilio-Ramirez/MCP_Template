export const onboardClientPrompt = {
  name: "onboard_client",
  description: "Complete client onboarding process",
  arguments: [
    {
      name: "client_name",
      description: "Name of the client company",
      required: true,
    },
    {
      name: "project_type",
      description: "Type of project (web-app, api, dashboard, etc.)",
      required: true,
    },
  ],
  handler: (args) => ({
    description: `Onboarding ${args?.client_name || "client"} for ${args?.project_type || "project"}`,
    messages: [
      {
        role: "user",
        content: {
          type: "text", 
          text: `Complete the client onboarding process for ${args?.client_name || "client"} building a ${args?.project_type || "web application"}. Use the agency://clients/onboarding-checklist and set up project structure using agency://templates/project-structure. Include AWS infrastructure setup and CI/CD pipeline configuration.`,
        },
      },
    ],
  })
};