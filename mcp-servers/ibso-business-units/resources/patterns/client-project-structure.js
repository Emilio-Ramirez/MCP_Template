export default `# Client Project Structure Pattern - IBSO Business Unit Organization

This document establishes the standardized structure for organizing client-specific projects within the IBSO business ecosystem, ensuring scalability, maintainability, and clear separation of concerns.

## 🏗️ IBSO Business Unit Architecture

### Two-Tier MCP Ecosystem Structure

\`\`\`
IBSO MCP Ecosystem
├── Base Templates (crm-template-base)
│   ├── Generic enterprise patterns
│   ├── Reusable architectural components
│   ├── Universal UI/UX patterns
│   └── Technology-agnostic solutions
│
└── Business Units (ibso-business-units)
    ├── Client-specific implementations
    ├── Industry-specialized patterns
    ├── Project-focused documentation
    └── Business domain expertise
\`\`\`

### Workspace Organization
\`\`\`
Development Workspaces
├── /Users/emilio/Development/Dreaming/
│   └── ibso-mcp-servers/           # Base templates & patterns
│       ├── crm-template-base/      # Generic enterprise patterns
│       ├── agency-client-template/ # Client management patterns
│       └── mcp-documentation/      # Meta-documentation
│
└── /Users/emilio/Development/IBSO/
    ├── ERP_Template/              # Active development project
    ├── vitracoat/                 # Future: Vitracoat specific code
    └── [future-clients]/          # Additional client projects
\`\`\`

## 📋 Client Project Structure Template

### Standard Directory Structure
\`\`\`
[client-name]/
├── README.md                      # Project overview and setup
├── BUSINESS_REQUIREMENTS.md       # Business domain documentation
├── TECHNICAL_ARCHITECTURE.md      # Technical implementation guide
│
├── documentation/                 # Business and technical docs
│   ├── business/                  # Business process documentation
│   │   ├── workflows/            # Business workflow definitions
│   │   ├── requirements/         # Functional requirements
│   │   └── domain-models/        # Business domain models
│   │
│   ├── technical/                # Technical implementation docs
│   │   ├── architecture/         # System architecture
│   │   ├── api/                  # API documentation
│   │   └── deployment/           # Deployment guides
│   │
│   └── user/                     # User-facing documentation
│       ├── guides/               # User guides and manuals
│       └── training/             # Training materials
│
├── src/                          # Source code (if applicable)
│   ├── features/                 # Feature-based organization
│   │   ├── [domain-feature]/     # Business domain features
│   │   └── shared/               # Shared components
│   │
│   ├── lib/                      # Shared libraries
│   ├── types/                    # TypeScript definitions
│   └── utils/                    # Utility functions
│
├── config/                       # Configuration files
│   ├── environments/             # Environment-specific configs
│   ├── business-rules/           # Business rule configurations
│   └── integrations/             # Third-party integrations
│
├── tests/                        # Testing structure
│   ├── unit/                     # Unit tests
│   ├── integration/              # Integration tests
│   └── e2e/                      # End-to-end tests
│
└── deployment/                   # Deployment artifacts
    ├── docker/                   # Container configurations
    ├── terraform/                # Infrastructure as code
    └── scripts/                  # Deployment scripts
\`\`\`

### MCP Resource Organization
\`\`\`
ibso-business-units/resources/
├── [client-name]/                # Client-specific resources
│   ├── overview.js               # Project overview
│   ├── business-model.js         # Business domain model
│   ├── technical-architecture.js # Technical implementation
│   ├── workflows/                # Business workflows
│   │   ├── primary-workflow.js
│   │   └── secondary-workflows.js
│   ├── integrations/             # System integrations
│   │   ├── erp-integration.js
│   │   └── third-party-apis.js
│   └── deployment/               # Deployment patterns
│       ├── infrastructure.js
│       └── monitoring.js
│
├── patterns/                     # Reusable patterns
│   ├── client-project-structure.js
│   ├── business-unit-integration.js
│   └── industry-standards.js
│
└── docs/                         # Documentation patterns
    ├── project-setup-guide.js
    └── deployment-strategies.js
\`\`\`

## 🎯 Project Initialization Template

### Project Setup Checklist
\`\`\`typescript
interface ClientProjectSetup {
  // 1. Business Analysis Phase
  businessAnalysis: {
    domainExpertise: 'Identify industry-specific requirements';
    stakeholderMapping: 'Map key stakeholders and roles';
    processAnalysis: 'Analyze existing business processes';
    requirementsGathering: 'Collect functional and non-functional requirements';
    competitorAnalysis: 'Analyze competitive landscape';
  };
  
  // 2. Technical Planning Phase
  technicalPlanning: {
    architectureDesign: 'Design system architecture';
    technologyStack: 'Select appropriate technologies';
    integrationPlanning: 'Plan third-party integrations';
    scalabilityConsiderations: 'Plan for growth and scale';
    securityRequirements: 'Define security requirements';
  };
  
  // 3. Project Structure Creation
  projectStructure: {
    repositorySetup: 'Initialize git repository';
    directoryStructure: 'Create standard directory structure';
    documentationFramework: 'Set up documentation system';
    configurationManagement: 'Configure environment management';
    cicdPipeline: 'Set up CI/CD pipeline';
  };
  
  // 4. MCP Integration
  mcpIntegration: {
    resourceDefinition: 'Define MCP resource structure';
    patternExtraction: 'Extract reusable patterns';
    knowledgeDocumentation: 'Document domain knowledge';
    integrationTesting: 'Test MCP server integration';
  };
}
\`\`\`

### Business Domain Configuration
\`\`\`typescript
interface BusinessDomainConfig {
  // Domain identification
  domain: {
    name: string;              // e.g., "Chemical Coating"
    industry: string;          // e.g., "Manufacturing"
    subIndustry: string;       // e.g., "Powder Coating"
    businessModel: string;     // e.g., "B2B Manufacturing"
  };
  
  // Key business entities
  entities: {
    primary: string[];         // e.g., ["Client", "Request", "Formulation"]
    secondary: string[];       // e.g., ["Material", "Test", "Report"]
    relationships: EntityRelationship[];
  };
  
  // Business processes
  processes: {
    core: BusinessProcess[];   // Primary business workflows
    support: BusinessProcess[]; // Supporting processes
    compliance: ComplianceRequirement[];
  };
  
  // Industry standards
  standards: {
    regulatory: string[];      // Regulatory requirements
    quality: string[];         // Quality standards
    safety: string[];          // Safety requirements
    environmental: string[];   // Environmental standards
  };
}
\`\`\`

## 🔗 Integration with Base Templates

### Pattern Inheritance Model
\`\`\`typescript
interface PatternInheritance {
  // Base template inheritance
  inheritsFrom: 'crm-template-base';
  
  // Pattern overrides
  overrides: {
    uiPatterns: CustomUIPattern[];
    businessLogic: CustomBusinessRule[];
    dataModels: CustomDataModel[];
    workflows: CustomWorkflow[];
  };
  
  // Extensions
  extensions: {
    industrySpecific: IndustryPattern[];
    clientSpecific: ClientPattern[];
    integrationSpecific: IntegrationPattern[];
  };
  
  // Customizations
  customizations: {
    branding: BrandingCustomization;
    localization: LocalizationCustomization;
    businessRules: BusinessRuleCustomization;
    userInterface: UICustomization;
  };
}
\`\`\`

### Shared Resource Management
\`\`\`typescript
interface SharedResourceManagement {
  // Shared components
  sharedComponents: {
    uiLibrary: 'shadcn/ui + custom extensions';
    stateManagement: 'Zustand with client-specific stores';
    apiClient: 'Type-safe API client with domain models';
    utilities: 'Shared utility functions';
  };
  
  // Configuration inheritance
  configInheritance: {
    typescript: 'Extends base tsconfig with client-specific paths';
    tailwind: 'Extends base config with client theme';
    eslint: 'Inherits base rules with client overrides';
    prettier: 'Shared formatting configuration';
  };
  
  // Dependency management
  dependencyManagement: {
    sharedDependencies: 'Common packages across projects';
    clientSpecific: 'Project-specific dependencies';
    versionAlignment: 'Synchronized major version updates';
  };
}
\`\`\`

## 🚀 Development Workflow

### Client Project Development Lifecycle
\`\`\`typescript
interface DevelopmentLifecycle {
  // Phase 1: Discovery & Planning
  discovery: {
    businessAnalysis: '2-3 weeks';
    technicalPlanning: '1-2 weeks';
    prototyping: '1 week';
    approvals: '1 week';
  };
  
  // Phase 2: Foundation Setup
  foundation: {
    projectSetup: '3-5 days';
    baseTemplateCustomization: '1 week';
    developmentEnvironment: '2-3 days';
    cicdSetup: '3-5 days';
  };
  
  // Phase 3: Core Development
  development: {
    coreFeatures: '4-8 weeks';
    integrations: '2-4 weeks';
    testing: '2-3 weeks';
    documentation: '1-2 weeks';
  };
  
  // Phase 4: Deployment & Handover
  deployment: {
    staging: '1 week';
    production: '1 week';
    userTraining: '1-2 weeks';
    knowledgeTransfer: '1 week';
  };
}
\`\`\`

### Quality Assurance Framework
\`\`\`typescript
interface QualityAssurance {
  // Code quality
  codeQuality: {
    staticAnalysis: 'ESLint + TypeScript strict mode';
    codeReview: 'Mandatory peer review process';
    testCoverage: 'Minimum 80% coverage requirement';
    documentation: 'Inline documentation for all public APIs';
  };
  
  // Business quality
  businessQuality: {
    requirementTraceability: 'All features traced to requirements';
    userAcceptanceTesting: 'Client-driven UAT process';
    businessProcessValidation: 'Process expert validation';
    complianceChecks: 'Industry standard compliance';
  };
  
  // Technical quality
  technicalQuality: {
    performanceBaseline: 'Load time and response benchmarks';
    securityScanning: 'Automated security vulnerability scanning';
    accessibilityTesting: 'WCAG 2.1 AA compliance';
    browserTesting: 'Cross-browser compatibility testing';
  };
}
\`\`\`

## 📊 Success Metrics & KPIs

### Project Success Measurement
\`\`\`typescript
interface ProjectSuccessMetrics {
  // Delivery metrics
  delivery: {
    onTimeDelivery: 'target_95_percent';
    budgetAdherence: 'target_within_10_percent';
    scopeCreep: 'target_less_than_15_percent';
    qualityGates: 'target_100_percent_pass_rate';
  };
  
  // Business impact
  businessImpact: {
    userAdoptionRate: 'target_80_percent_within_3_months';
    processEfficiency: 'target_30_percent_improvement';
    errorReduction: 'target_50_percent_reduction';
    userSatisfaction: 'target_4_5_out_of_5';
  };
  
  // Technical performance
  technicalPerformance: {
    systemUptime: 'target_99_9_percent';
    responseTime: 'target_under_2_seconds';
    bugReports: 'target_less_than_5_per_month';
    securityIncidents: 'target_zero';
  };
  
  // Maintenance efficiency
  maintenance: {
    knowledgeTransferEffectiveness: 'Client team independence';
    documentationAccuracy: 'target_90_percent_self_service';
    supportRequestVolume: 'target_decreasing_trend';
    systemEvolvability: 'Easy feature addition capability';
  };
}
\`\`\`

## 🔄 Continuous Improvement Process

### Pattern Evolution Framework
\`\`\`typescript
interface PatternEvolution {
  // Pattern identification
  patternIdentification: {
    projectRetrospectives: 'Extract reusable patterns from completed projects';
    commonChallenges: 'Identify recurring technical and business challenges';
    successFactors: 'Document what worked well across projects';
    industryTrends: 'Monitor industry evolution and new requirements';
  };
  
  // Pattern refinement
  patternRefinement: {
    abstractionLevel: 'Determine appropriate abstraction for reuse';
    customizationPoints: 'Identify where patterns need customization';
    documentationUpdate: 'Update MCP resources with refined patterns';
    templateUpdate: 'Update base templates with improved patterns';
  };
  
  // Knowledge sharing
  knowledgeSharing: {
    crossProjectLearning: 'Share learnings across client projects';
    bestPracticeDocumentation: 'Document best practices in MCP';
    teamTraining: 'Train team on evolved patterns';
    clientEducation: 'Educate clients on pattern benefits';
  };
}
\`\`\`

This client project structure pattern ensures that each IBSO client project benefits from accumulated knowledge while maintaining the flexibility to address unique business requirements and industry-specific challenges.`;