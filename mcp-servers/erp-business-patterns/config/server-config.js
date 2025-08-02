export const serverConfig = {
  name: "erp-business-patterns",
  version: "1.0.0",
  description: "ERP Business Patterns - Vitracoat Configuration System, Chemical Request Workflows, and Role-Based Access Patterns",
  
  // Server metadata
  metadata: {
    category: "Business Architecture",
    domain: "ERP Systems",
    industry: "Chemical Manufacturing",
    scope: "Enterprise Resource Planning",
    patterns: [
      "Vitracoat Business Model",
      "ERP Configuration System", 
      "Chemical Request Workflows",
      "Role-Based Access Patterns"
    ],
    technologies: [
      "Next.js 15",
      "React Hook Form",
      "Zod Validation", 
      "TanStack Table",
      "shadcn/ui",
      "TypeScript",
      "Tailwind CSS"
    ]
  },

  // Resource organization
  resources: {
    patterns: [
      "vitracoat-business-model",
      "erp-configuration-system", 
      "chemical-request-workflows",
      "role-based-access-patterns"
    ],
    components: [
      "configuration-tabs-pattern",
      "multi-step-forms",
      "crud-operations",
      "data-table-patterns"
    ],
    workflows: [
      "lwr-request-workflow",
      "tlwr-testing-workflow", 
      "vlwr-internal-workflow",
      "micro-production-workflow"
    ]
  },

  // Integration points
  integrations: {
    databases: ["PostgreSQL", "SAP"],
    authentication: ["Azure Active Directory"], 
    apis: ["Next.js API Routes", "Server Actions"],
    ui: ["shadcn/ui", "Tailwind CSS"],
    validation: ["Zod", "React Hook Form"]
  }
};