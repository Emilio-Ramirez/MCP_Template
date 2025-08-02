export const serverConfig = {
  name: 'ibso-business-units',
  version: '1.0.0',
  description: 'IBSO Business Units MCP Server - Client-specific project patterns and configurations',
  author: 'IBSO Development Team',
  license: 'MIT',
  
  // Server metadata
  metadata: {
    category: 'business-units',
    tags: ['ibso', 'clients', 'projects', 'vitracoat', 'chemical-industry'],
    lastUpdated: new Date().toISOString(),
    
    // Business units configuration
    businessUnits: {
      vitracoat: {
        name: 'Vitracoat',
        type: 'client-project',
        industry: 'powder-coating',
        status: 'active',
        technologies: ['nextjs', 'typescript', 'chemical-requests'],
        startDate: '2024-01-01',
      },
      // Space for future client projects
      future_clients: {
        name: 'Future Client Projects',
        type: 'template-ready',
        status: 'planned',
      },
    },
    
    // Integration with base templates
    baseTemplateIntegration: {
      inheritsFrom: 'crm-template-base',
      extendsPatterns: true,
      clientSpecificOverrides: true,
    },
  },
};