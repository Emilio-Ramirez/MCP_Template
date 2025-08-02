// Resource index for CRM Template Base Server
import { loadResource } from '../utils/resource-loader.js';

export const resources = {
  'ui-system/dialog-patterns': () => loadResource('ui-system/dialog-patterns.js'),
  'ui-system/configuration-tabs-pattern': () => loadResource('ui-system/configuration-tabs-pattern.js'),
  'architecture/modular-forms-system': () => loadResource('architecture/modular-forms-system.js'),
  'architecture/feature-based-organization': () => loadResource('architecture/feature-based-organization.js'),
  'architecture/reference-architecture-standards': () => loadResource('architecture/reference-architecture-standards.js'),
  'routing/nextjs-advanced-patterns': () => loadResource('routing/nextjs-advanced-patterns.js'),
  'development/typescript-excellence': () => loadResource('development/typescript-excellence.js'),
  'development/technical-implementation-guides': () => loadResource('development/technical-implementation-guides.js'),
  'components/enterprise-component-patterns': () => loadResource('components/enterprise-component-patterns.js'),
  'i18n/internationalization-patterns': () => loadResource('i18n/internationalization-patterns.js'),
  'architecture/advanced-form-architecture': () => loadResource('architecture/advanced-form-architecture.js'),
  'development/advanced-date-filtering': () => loadResource('development/advanced-date-filtering.js'),
  'routing/parallel-routes-implementation': () => loadResource('routing/parallel-routes-implementation.js'),
  'development/quality-assurance-workflow': () => loadResource('development/quality-assurance-workflow.js'),
  'reference/definitive-reference-implementation': () => loadResource('reference/definitive-reference-implementation.js'),
  'patterns/unified-pattern-library': () => loadResource('patterns/unified-pattern-library.js'),
};