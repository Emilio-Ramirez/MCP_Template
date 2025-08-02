// Resource loaders
import onboardingChecklist from './clients/onboarding-checklist.js';
import projectStructure from './templates/project-structure.js';
import clientDelivery from './workflows/client-delivery.js';
import sowTemplate from './contracts/sow-template.js';
import mcpGenerator from './automation/mcp-generator.js';
import replicationTemplatesScaffolding from './templates/replication-templates-scaffolding.js';

export const resources = {
  'agency://clients/onboarding-checklist': onboardingChecklist,
  'agency://templates/project-structure': projectStructure,
  'agency://templates/replication-templates-scaffolding': replicationTemplatesScaffolding,
  'agency://workflows/client-delivery': clientDelivery,
  'agency://contracts/sow-template': sowTemplate,
  'agency://automation/mcp-generator': mcpGenerator,
};