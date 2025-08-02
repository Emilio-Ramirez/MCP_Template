/**
 * ERP Business Patterns - Resource Index
 * 
 * This file serves as the main index for all ERP business pattern resources.
 * It provides organized access to business models, architectural patterns,
 * workflows, security patterns, and implementation components.
 */

// Business Resources
export { vitracoatBusinessModel } from './business/vitracoat-business-model.js';
export { vitracoatRequestForms } from './business/vitracoat-request-forms.js';
export { enhancedVitracoatModel } from './business/enhanced-vitracoat-model.js';

// Architecture Resources  
export { erpConfigurationSystem } from './architecture/erp-configuration-system.js';
export { erpDatabaseArchitecture } from './architecture/erp-database-architecture.js';
export { nextjsRoutingArchitecture } from './architecture/nextjs-routing-architecture.js';

// Workflow Resources
export { chemicalRequestWorkflows } from './workflows/chemical-request-workflows.js';
export { lwrRequestWorkflow } from './workflows/lwr-request-workflow.js';

// Security Resources
export { roleBasedAccessPatterns } from './security/role-based-access-patterns.js';

// Component Resources
export { configurationTabsPattern } from './components/configuration-tabs-pattern.js';
export { multiStepForms } from './components/multi-step-forms.js';
export { dynamicFormValidation } from './components/dynamic-form-validation.js';
export { staticOptionGenerators } from './components/static-option-generators.js';
export { formTranslationPatterns } from './components/form-translation-patterns.js';
export { notificationsSystem } from './components/notifications-system.js';
export { responsiveDataTableSystem } from './components/responsive-data-table-system.js';

// UI System Resources
export { formFieldOrganization } from './ui-system/form-field-organization.js';
export { advancedFormStructures } from './ui-system/advanced-form-structures.js';
export { tlwrFormPatterns } from './ui-system/tlwr-form-patterns.js';

// Development Resources
export { formValidationLessons } from './development/form-validation-lessons.js';

// Operation Resources
export { crudOperations } from './operations/crud-operations.js';

/**
 * Resource Categories and Organization
 */
export const resourceCategories = {
  'Business Architecture': [
    'vitracoat-business-model',
    'enhanced-vitracoat-model',
    'vitracoat-request-forms'
  ],
  'System Architecture': [
    'erp-configuration-system',
    'erp-database-architecture',
    'nextjs-routing-architecture'
  ],
  'Workflow Management': [
    'chemical-request-workflows',
    'lwr-request-workflow'
  ],
  'Security Architecture': [
    'role-based-access-patterns'
  ],
  'UI Components': [
    'configuration-tabs-pattern',
    'notifications-system',
    'responsive-data-table-system'
  ],
  'Form Components': [
    'multi-step-forms',
    'dynamic-form-validation', 
    'static-option-generators',
    'form-translation-patterns'
  ],
  'UI System Patterns': [
    'form-field-organization',
    'advanced-form-structures',
    'tlwr-form-patterns'
  ],
  'Development Guidelines': [
    'form-validation-lessons'
  ],
  'Data Operations': [
    'crud-operations'
  ]
};

/**
 * Resource Tags for Easy Discovery
 */
export const resourceTags = {
  'business-model': ['vitracoat-business-model', 'enhanced-vitracoat-model'],
  'configuration': ['erp-configuration-system', 'configuration-tabs-pattern', 'vitracoat-business-model', 'enhanced-vitracoat-model'],
  'request-forms': ['vitracoat-request-forms'],
  'database': ['erp-database-architecture'],
  'drizzle-orm': ['erp-database-architecture'],
  'pglite': ['erp-database-architecture'],
  'workflows': ['chemical-request-workflows', 'lwr-request-workflow'],
  'forms': ['multi-step-forms', 'dynamic-form-validation', 'static-option-generators', 'form-translation-patterns', 'chemical-request-workflows', 'form-field-organization', 'advanced-form-structures', 'tlwr-form-patterns', 'vitracoat-request-forms'],
  'validation': ['multi-step-forms', 'dynamic-form-validation', 'chemical-request-workflows', 'form-validation-lessons', 'vitracoat-request-forms'],
  'field-organization': ['form-field-organization', 'tlwr-form-patterns'],
  'tlwr': ['tlwr-form-patterns', 'chemical-request-workflows', 'vitracoat-request-forms'],
  'vlwr': ['advanced-form-structures', 'chemical-request-workflows', 'vitracoat-request-forms'],
  'conditional-forms': ['advanced-form-structures', 'tlwr-form-patterns', 'vitracoat-request-forms'],
  'responsive-layout': ['form-field-organization', 'advanced-form-structures', 'tlwr-form-patterns'],
  'debugging': ['form-validation-lessons'],
  'lessons-learned': ['form-validation-lessons'],
  'security': ['role-based-access-patterns'],
  'rbac': ['role-based-access-patterns'],
  'permissions': ['role-based-access-patterns'],
  'crud': ['crud-operations', 'erp-configuration-system'],
  'tables': ['crud-operations'],
  'tabs': ['configuration-tabs-pattern', 'erp-configuration-system'],
  'chemical-industry': ['chemical-request-workflows', 'vitracoat-business-model', 'lwr-request-workflow', 'enhanced-vitracoat-model', 'vitracoat-request-forms'],
  'law-pattern': ['configuration-tabs-pattern'],
  'ui-patterns': ['configuration-tabs-pattern', 'multi-step-forms', 'form-field-organization', 'advanced-form-structures', 'tlwr-form-patterns'],
  'stepper': ['multi-step-forms'],
  'notifications': ['crud-operations', 'erp-configuration-system', 'notifications-system'],
  'data-tables': ['responsive-data-table-system', 'crud-operations'],
  'responsive-design': ['responsive-data-table-system', 'form-field-organization'],
  'filtering': ['responsive-data-table-system'],
  'pagination': ['responsive-data-table-system'],
  'mobile-first': ['responsive-data-table-system', 'form-field-organization'],
  'routing': ['nextjs-routing-architecture'],
  'nextjs': ['nextjs-routing-architecture'],
  'internationalization': ['nextjs-routing-architecture'],
  'i18n': ['nextjs-routing-architecture'],
  'authentication': ['nextjs-routing-architecture', 'role-based-access-patterns'],
  'clerk': ['nextjs-routing-architecture'],
  'middleware': ['nextjs-routing-architecture'],
  'real-time': ['notifications-system'],
  'websockets': ['notifications-system'],
  'approval-workflows': ['notifications-system', 'role-based-access-patterns'],
  'typescript': ['notifications-system', 'nextjs-routing-architecture'],
  'performance': ['notifications-system', 'responsive-data-table-system'],
  'real-time-validation': ['dynamic-form-validation'],
  'conditional-logic': ['dynamic-form-validation'],
  'dynamic-schemas': ['dynamic-form-validation'],
  'static-options': ['static-option-generators'],
  'business-consistency': ['static-option-generators'],
  'api-compatibility': ['static-option-generators'],
  'i18n': ['form-translation-patterns', 'nextjs-routing-architecture'],
  'translation-patterns': ['form-translation-patterns'],
  'server-components': ['form-translation-patterns']
};

/**
 * Complexity Levels
 */
export const complexityLevels = {
  'intermediate': [
    'configuration-tabs-pattern',
    'crud-operations'
  ],
  'advanced': [
    'erp-configuration-system',
    'chemical-request-workflows',
    'role-based-access-patterns',
    'multi-step-forms',
    'dynamic-form-validation',
    'static-option-generators',
    'form-translation-patterns',
    'lwr-request-workflow',
    'advanced-form-structures',
    'tlwr-form-patterns',
    'form-validation-lessons',
    'vitracoat-request-forms',
    'erp-database-architecture',
    'notifications-system',
    'responsive-data-table-system',
    'nextjs-routing-architecture'
  ],
  'foundational': [
    'form-field-organization'
  ],
  'enterprise': [
    'vitracoat-business-model',
    'enhanced-vitracoat-model'
  ]
};

/**
 * Resource Dependencies
 */
export const resourceDependencies = {
  'vitracoat-business-model': ['erp-configuration-system'],
  'enhanced-vitracoat-model': ['vitracoat-business-model', 'erp-configuration-system'],
  'vitracoat-request-forms': ['vitracoat-business-model', 'multi-step-forms'],
  'erp-database-architecture': [],
  'chemical-request-workflows': ['multi-step-forms', 'role-based-access-patterns'],
  'lwr-request-workflow': ['chemical-request-workflows'],
  'crud-operations': ['configuration-tabs-pattern'],
  'erp-configuration-system': [],
  'role-based-access-patterns': [],
  'configuration-tabs-pattern': [],
  'multi-step-forms': [],
  'dynamic-form-validation': ['multi-step-forms'],
  'static-option-generators': [],
  'form-translation-patterns': ['static-option-generators'],
  'form-field-organization': [],
  'advanced-form-structures': ['form-field-organization'],
  'tlwr-form-patterns': ['form-field-organization', 'advanced-form-structures'],
  'form-validation-lessons': ['multi-step-forms'],
  'notifications-system': ['role-based-access-patterns'],
  'responsive-data-table-system': ['form-field-organization'],
  'nextjs-routing-architecture': ['role-based-access-patterns']
};

/**
 * Quick Access Helpers
 */
export const getResourcesByCategory = (category) => {
  return resourceCategories[category] || [];
};

export const getResourcesByTag = (tag) => {
  return resourceTags[tag] || [];
};

export const getResourcesByComplexity = (complexity) => {
  return complexityLevels[complexity] || [];
};

export const getResourceDependencies = (resourceName) => {
  return resourceDependencies[resourceName] || [];
};

/**
 * Resource Descriptions for Quick Reference
 */
export const resourceDescriptions = {
  'vitracoat-business-model': 'Complete business model for powder coating ERP with 5 config pages and 8 modules',
  'enhanced-vitracoat-model': 'Extended business model with detailed configuration pages, workflows, and enhanced role definitions',
  'vitracoat-request-forms': 'Complete LWR form structure with TLWR, VLWR, and Micro Production form specifications',
  'erp-database-architecture': 'Database technology stack with Drizzle ORM, PGlite, schema conventions, and development workflow',
  'erp-configuration-system': 'Tab patterns, CRUD operations, and configuration management system',
  'chemical-request-workflows': 'LWR/TLWR/VLWR request types with multi-step forms and validation',
  'role-based-access-patterns': 'Permission matrix, security patterns, and user role management',
  'configuration-tabs-pattern': 'Official Law Pattern for tab-based configuration interfaces',
  'multi-step-forms': 'Progressive validation, stepper UI, and form state management',
  'dynamic-form-validation': 'Real-time validation patterns with conditional logic and progressive step validation',
  'static-option-generators': 'Business-consistent dropdown options ensuring API compatibility and translation-free technical values',
  'form-translation-patterns': 'Internationalization patterns for forms maintaining static business values while translating UI text',
  'crud-operations': 'Create, Read, Update, Delete patterns with data tables and notifications',
  'lwr-request-workflow': 'Laboratory Work Request workflow for product development',
  'form-field-organization': 'Standardized field organization with mandatory type ordering and responsive layouts',
  'advanced-form-structures': 'Complex form patterns with conditional rendering and dynamic validation',
  'tlwr-form-patterns': 'TLWR-specific form enhancements with conditional fields and responsive panels',
  'form-validation-lessons': 'Critical validation lessons and debugging strategies for complex forms',
  'notifications-system': 'Complete notifications architecture with tabbed interface, real-time badge system, approval workflows, and TypeScript type safety',
  'responsive-data-table-system': 'Enhanced table implementation with responsive filter bar pattern, two-group system, and mobile-first design patterns',
  'nextjs-routing-architecture': 'Internationalization routing with next-intl, authentication flow with Clerk, and locale-aware URL structure'
};

export default {
  categories: resourceCategories,
  tags: resourceTags,
  complexity: complexityLevels,
  dependencies: resourceDependencies,
  descriptions: resourceDescriptions,
  getResourcesByCategory,
  getResourcesByTag,
  getResourcesByComplexity,
  getResourceDependencies
};