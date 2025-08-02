export const resourceManifest = {
  // Core Business Pattern Resources
  "vitracoat-business-model": {
    name: "Vitracoat Business Model",
    description: "Complete business model with 5 config pages, 8 modules, and operational workflows",
    category: "Business Architecture",
    tags: ["business-model", "configuration", "modules", "workflows"],
    complexity: "enterprise",
    dependencies: ["erp-configuration-system"]
  },

  "enhanced-vitracoat-model": {
    name: "Enhanced Vitracoat Business Model",
    description: "Extended business model with detailed configuration pages structure, business process workflows, and enhanced role definitions",
    category: "Business Architecture",
    tags: ["business-model", "configuration", "workflows", "role-management", "enterprise-architecture"],
    complexity: "enterprise",
    dependencies: ["vitracoat-business-model", "erp-configuration-system"]
  },

  "vitracoat-request-forms": {
    name: "Vitracoat Request Forms Documentation",
    description: "Complete LWR form structure with field specifications, request type selection logic, and validation requirements for TLWR, VLWR, and Micro Production forms",
    category: "Business Architecture", 
    tags: ["request-forms", "forms", "validation", "conditional-forms", "tlwr", "vlwr", "chemical-industry"],
    complexity: "advanced",
    dependencies: ["vitracoat-business-model", "multi-step-forms"]
  },

  "erp-configuration-system": {
    name: "ERP Configuration System", 
    description: "Tab patterns, CRUD operations, and configuration management system",
    category: "System Architecture",
    tags: ["configuration", "tabs", "crud", "data-management"],
    complexity: "advanced", 
    dependencies: []
  },

  "erp-database-architecture": {
    name: "ERP Database Architecture",
    description: "Database technology stack (Drizzle ORM, PGlite), connection patterns, migration strategies, schema conventions, and development workflow setup",
    category: "System Architecture",
    tags: ["database", "drizzle-orm", "pglite", "postgresql", "migrations", "schema-design", "development-workflow"],
    complexity: "advanced",
    dependencies: []
  },

  "chemical-request-workflows": {
    name: "Chemical Request Workflows",
    description: "LWR/TLWR/VLWR request types with multi-step forms and validation",
    category: "Workflow Management",
    tags: ["workflows", "forms", "validation", "chemical-industry"],
    complexity: "advanced",
    dependencies: ["multi-step-forms", "role-based-access"]
  },

  "role-based-access-patterns": {
    name: "Role-Based Access Control",
    description: "Permission matrix, security patterns, and user role management", 
    category: "Security Architecture",
    tags: ["rbac", "permissions", "security", "access-control"],
    complexity: "advanced",
    dependencies: []
  },

  // Supporting Component Resources
  "configuration-tabs-pattern": {
    name: "Configuration Tabs Pattern",
    description: "Official Law Pattern for tab-based configuration interfaces",
    category: "UI Components",
    tags: ["tabs", "configuration", "ui-patterns", "law-pattern"], 
    complexity: "intermediate",
    dependencies: []
  },

  "multi-step-forms": {
    name: "Multi-Step Forms Implementation",
    description: "Progressive validation, stepper UI, and form state management",
    category: "Form Components", 
    tags: ["forms", "validation", "stepper", "multi-step"],
    complexity: "advanced",
    dependencies: ["form-validation"]
  },

  "dynamic-form-validation": {
    name: "Dynamic Form Validation Patterns",
    description: "Real-time validation patterns with conditional logic, progressive step validation, and dynamic schema generation for enterprise forms",
    category: "Form Components",
    tags: ["validation", "real-time-validation", "conditional-logic", "dynamic-schemas", "forms"],
    complexity: "advanced",
    dependencies: ["multi-step-forms"]
  },

  "static-option-generators": {
    name: "Static Option Generators Pattern",
    description: "MANDATORY pattern for business-consistent dropdown options ensuring API compatibility and translation-free technical values",
    category: "Form Components", 
    tags: ["static-options", "business-consistency", "api-compatibility", "forms", "dropdown-options"],
    complexity: "advanced",
    dependencies: []
  },

  "form-translation-patterns": {
    name: "Form Translation Patterns",
    description: "MANDATORY translation patterns for forms ensuring proper internationalization of form interfaces while maintaining static business values",
    category: "Form Components",
    tags: ["i18n", "translation-patterns", "server-components", "forms", "internationalization"],
    complexity: "advanced", 
    dependencies: ["static-option-generators"]
  },

  "crud-operations": {
    name: "Complete CRUD Operations",
    description: "Create, Read, Update, Delete patterns with data tables and notifications",
    category: "Data Operations",
    tags: ["crud", "data-tables", "operations", "notifications"],
    complexity: "intermediate", 
    dependencies: ["data-table-patterns"]
  },

  "data-table-patterns": {
    name: "Advanced Data Table Patterns", 
    description: "TanStack Table integration with filtering, pagination, and actions",
    category: "Data Display",
    tags: ["tables", "pagination", "filtering", "tanstack"],
    complexity: "intermediate",
    dependencies: []
  },

  // Workflow Resources  
  "lwr-request-workflow": {
    name: "Laboratory Work Request (LWR) Workflow",
    description: "Product development request workflow with specifications and testing",
    category: "Business Workflows",
    tags: ["lwr", "laboratory", "product-development", "workflow"],
    complexity: "advanced",
    dependencies: ["chemical-request-workflows"]
  },

  "tlwr-testing-workflow": {
    name: "Testing Lab Work Request (TLWR) Workflow", 
    description: "Testing services workflow with quality control and reporting",
    category: "Business Workflows",
    tags: ["tlwr", "testing", "quality-control", "workflow"],
    complexity: "advanced", 
    dependencies: ["chemical-request-workflows"]
  },

  "vlwr-internal-workflow": {
    name: "Vitracoat Lab Work Request (VLWR) Workflow",
    description: "Internal testing workflow for materials and finished products",
    category: "Business Workflows", 
    tags: ["vlwr", "internal-testing", "materials", "workflow"],
    complexity: "advanced",
    dependencies: ["chemical-request-workflows"]
  },

  "micro-production-workflow": {
    name: "Micro Production Workflow",
    description: "Small batch production workflow with approval and tracking",
    category: "Business Workflows",
    tags: ["micro-production", "manufacturing", "approval", "workflow"], 
    complexity: "advanced",
    dependencies: ["role-based-access-patterns"]
  },

  // Form-Specific Pattern Resources
  "form-field-organization": {
    name: "Form Field Organization Pattern",
    description: "Standardized field organization with mandatory type ordering and responsive layouts",
    category: "UI System Patterns",
    tags: ["forms", "field-organization", "responsive-layout", "ui-patterns", "standardization"],
    complexity: "foundational",
    dependencies: []
  },

  "advanced-form-structures": {
    name: "Advanced Form Structures",
    description: "Complex form patterns with VLWR toggle sections, conditional rendering, and dynamic validation",
    category: "UI System Patterns",
    tags: ["forms", "conditional-forms", "vlwr", "toggle-sections", "dynamic-validation", "responsive-layout"],
    complexity: "advanced",
    dependencies: ["form-field-organization"]
  },

  "tlwr-form-patterns": {
    name: "TLWR Form Enhancement Patterns",
    description: "TLWR-specific form enhancements with conditional fields, responsive panels, and testing workflows",
    category: "UI System Patterns",
    tags: ["forms", "tlwr", "conditional-forms", "testing-workflows", "responsive-layout", "field-organization"],
    complexity: "advanced",
    dependencies: ["form-field-organization", "advanced-form-structures"]
  },

  "form-validation-lessons": {
    name: "Multi-Step Form Validation Lessons",
    description: "Critical validation lessons, debugging strategies, and common pitfalls for complex forms",
    category: "Development Guidelines",
    tags: ["validation", "debugging", "lessons-learned", "forms", "troubleshooting", "best-practices"],
    complexity: "advanced",
    dependencies: ["multi-step-forms"]
  },

  // Advanced Technical Implementation Resources
  "notifications-system": {
    name: "Notifications System Implementation",
    description: "Complete notifications architecture with tabbed interface, real-time badge system, state management, approval workflows for client/user management, TypeScript type safety with discriminated unions, and performance optimizations",
    category: "UI Components",
    tags: ["notifications", "real-time", "state-management", "typescript", "approval-workflows", "websockets", "performance", "ui-patterns"],
    complexity: "advanced",
    dependencies: ["role-based-access-patterns"]
  },

  "responsive-data-table-system": {
    name: "Responsive Data Table System",
    description: "Enhanced table implementation guide with responsive filter bar pattern, two-group system (dynamic cascading for filters vs static horizontal for actions), mobile-first design patterns, and advanced filtering/pagination patterns",
    category: "UI Components", 
    tags: ["data-tables", "responsive-design", "filtering", "pagination", "mobile-first", "ui-patterns", "performance", "accessibility"],
    complexity: "advanced",
    dependencies: ["form-field-organization"]
  },

  "nextjs-routing-architecture": {
    name: "Next.js Routing Architecture",
    description: "Internationalization routing with next-intl integration, authentication flow with Clerk integration, locale-aware URL structure with 'as-needed' prefix, middleware architecture for protected routes, and best practices for route organization",
    category: "System Architecture",
    tags: ["routing", "nextjs", "internationalization", "i18n", "authentication", "clerk", "middleware", "typescript", "seo", "performance"],
    complexity: "advanced", 
    dependencies: ["role-based-access-patterns"]
  }
};