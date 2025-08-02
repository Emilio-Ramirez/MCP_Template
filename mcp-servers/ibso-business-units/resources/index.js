// Resource loader for IBSO Business Units MCP Server
import { resourceLoader } from '../utils/resource-loader.js';

// Vitracoat project resources
import vitracoatOverview from './vitracoat/overview.js';
import vitracoatRequestForms from './vitracoat/request-forms.js';
import vitracoatConfigurationPages from './vitracoat/configuration-pages.js';
import vitracoatMicroProductionWorkflow from './vitracoat/micro-production-workflow.js';
import vitracoatTestingProtocols from './vitracoat/testing-protocols.js';
import vitracoatBusinessWorkflows from './vitracoat/business-workflows.js';
import vitracoatLaboratoryBusinessRules from './vitracoat/laboratory-business-rules.js';
import vitracoatConfigurationManagement from './vitracoat/configuration-management.js';
import vitracoatTestingProtocolsQuality from './vitracoat/testing-protocols-quality.js';

// IBSO pattern resources
import clientProjectStructure from './patterns/client-project-structure.js';
import businessUnitIntegration from './patterns/business-unit-integration.js';
import chemicalIndustryStandards from './patterns/chemical-industry-standards.js';

// Documentation resources
import projectSetupGuide from './docs/project-setup-guide.js';
import deploymentStrategies from './docs/deployment-strategies.js';

// Business documentation resources
import enhancedBusinessDocumentation from './business/enhanced-business-documentation.js';

// Resource mapping
export const resources = {
  // Vitracoat project resources
  'vitracoat/overview': vitracoatOverview,
  'vitracoat/request-forms': vitracoatRequestForms,
  'vitracoat/configuration-pages': vitracoatConfigurationPages,
  'vitracoat/micro-production-workflow': vitracoatMicroProductionWorkflow,
  'vitracoat/testing-protocols': vitracoatTestingProtocols,
  'vitracoat/business-workflows': vitracoatBusinessWorkflows,
  'vitracoat/laboratory-business-rules': vitracoatLaboratoryBusinessRules,
  'vitracoat/configuration-management': vitracoatConfigurationManagement,
  'vitracoat/testing-protocols-quality': vitracoatTestingProtocolsQuality,
  
  // IBSO pattern resources
  'patterns/client-project-structure': clientProjectStructure,
  'patterns/business-unit-integration': businessUnitIntegration,
  'patterns/chemical-industry-standards': chemicalIndustryStandards,
  
  // Documentation resources
  'docs/project-setup-guide': projectSetupGuide,
  'docs/deployment-strategies': deploymentStrategies,
  
  // Business documentation resources
  'business/enhanced-business-documentation': enhancedBusinessDocumentation,
};

// Export resource loader utility
export { resourceLoader };