// Resource index for MCP Documentation Server
import { loadResource } from '../utils/resource-loader.js';

export const resources = {
  'architecture/ecosystem-overview': () => loadResource('architecture/ecosystem-overview.js'),
  'architecture/modular-ecosystem-architecture': () => loadResource('architecture/modular-ecosystem-architecture.js'),
  'servers/crm-template-base': () => loadResource('servers/crm-template-base.js'),
  'servers/ibso-patterns': () => loadResource('servers/ibso-patterns.js'),
  'servers/agency-clients': () => loadResource('servers/agency-clients.js'),
  'servers/ibso-business-units': () => loadResource('servers/ibso-business-units.js'),
  'patterns/server-refactoring-guide': () => loadResource('patterns/server-refactoring-guide.js'),
  'development/mcp-best-practices': () => loadResource('development/mcp-best-practices.js'),
  'development/mcp-documentation-manager-agent': () => loadResource('development/mcp-documentation-manager-agent.js'),
  'development/mcp-instruction-templates': () => loadResource('development/mcp-instruction-templates.js'),
  'integration/cross-server-patterns': () => loadResource('integration/cross-server-patterns.js'),
  'reference/cross-reference-system': () => loadResource('reference/cross-reference-system.js'),
  'reference/implementation-examples-library': () => loadResource('reference/implementation-examples-library.js'),
  'reference/unified-documentation-system': () => loadResource('reference/unified-documentation-system.js'),
  'quality/mcp-erp-certification-criteria': () => loadResource('quality/mcp-erp-certification-criteria.js'),
  'quality/quality-assurance-framework': () => loadResource('quality/quality-assurance-framework.js'),
  'guides/migration-guides-legacy-systems': () => loadResource('guides/migration-guides-legacy-systems.js'),
  'guides/step-by-step-implementation-guides': () => loadResource('guides/step-by-step-implementation-guides.js'),
  'verification/transformation-achievements': () => loadResource('verification/transformation-achievements.js'),
  'deployment/claude-code-registration-guide': () => loadResource('deployment/claude-code-registration-guide.js'),
  'deployment/quick-start-deployment': () => loadResource('deployment/quick-start-deployment.js'),
};