export default `# Business Unit Integration Pattern - IBSO Enterprise Architecture

This document establishes the integration patterns between IBSO business units, base templates, and client-specific implementations, ensuring seamless knowledge sharing and architectural consistency across the ecosystem.

## 🏗️ Integration Architecture Overview

### Three-Tier Integration Model

\`\`\`
Enterprise Knowledge Ecosystem
├── Base Templates Layer (Foundation)
│   ├── crm-template-base (Generic patterns)
│   ├── agency-client-template (Client management)
│   └── mcp-documentation (Meta-knowledge)
│
├── Business Units Layer (Specialization)
│   ├── ibso-business-units (Client projects)
│   ├── industry-patterns (Industry-specific)
│   └── compliance-frameworks (Regulatory)
│
└── Implementation Layer (Execution)
    ├── Active Projects (ERP_Template)
    ├── Client Deployments (Vitracoat)
    └── Legacy Systems (Integration)
\`\`\`

### Integration Principles
\`\`\`typescript
interface IntegrationPrinciples {
  // Knowledge flow
  knowledgeFlow: {
    upward: 'Specific learnings become general patterns';
    downward: 'General patterns inform specific implementations';
    lateral: 'Cross-project knowledge sharing';
    feedback: 'Continuous improvement loops';
  };
  
  // Dependency management
  dependencyManagement: {
    loose_coupling: 'Minimal dependencies between business units';
    clear_interfaces: 'Well-defined integration points';
    version_compatibility: 'Backward compatibility maintenance';
    graceful_degradation: 'Resilient to component failures';
  };
  
  // Pattern inheritance
  patternInheritance: {
    base_extension: 'Extend base patterns, do not override';
    selective_adoption: 'Choose applicable patterns from base';
    custom_additions: 'Add client-specific patterns as needed';
    contribution_back: 'Contribute successful patterns to base';
  };
}
\`\`\`

## 🔗 MCP Server Integration Architecture

### Server Interaction Model
\`\`\`typescript
interface MCPServerInteraction {
  // Resource sharing
  resourceSharing: {
    crossReference: 'Resources can reference other MCP servers';
    linkage: 'Deep links between related patterns';
    search: 'Cross-server search and discovery';
    synchronization: 'Pattern updates propagate appropriately';
  };
  
  // Knowledge hierarchy
  knowledgeHierarchy: {
    base_templates: {
      role: 'Foundation patterns and generic solutions';
      access: 'Referenced by all business units';
      updates: 'Careful versioning and compatibility';
    };
    
    business_units: {
      role: 'Specialized patterns and client solutions';
      access: 'Cross-reference between related projects';
      updates: 'Rapid iteration and client-specific changes';
    };
    
    meta_documentation: {
      role: 'System-wide knowledge and improvement patterns';
      access: 'Referenced by all servers for meta-patterns';
      updates: 'Community-driven improvements';
    };
  };
  
  // Integration protocols
  integrationProtocols: {
    uri_conventions: 'Standardized URI patterns for cross-server references';
    version_management: 'Semantic versioning for compatibility';
    deprecation_handling: 'Graceful deprecation of outdated patterns';
    discovery_mechanisms: 'Automated pattern discovery and indexing';
  };
}
\`\`\`

### Cross-Server Resource Referencing
\`\`\`typescript
interface CrossServerReferencing {
  // URI structure
  uriStructure: {
    base_template: 'crm-base://patterns/dialog-patterns';
    business_unit: 'ibso-business://vitracoat/request-forms';
    meta_docs: 'mcp-meta://patterns/server-refactoring-guide';
    external: 'external://github.com/user/repo/blob/main/doc.md';
  };
  
  // Reference types
  referenceTypes: {
    extends: 'This pattern extends another pattern';
    implements: 'This pattern implements an interface/standard';
    uses: 'This pattern uses components from another pattern';
    replaces: 'This pattern replaces/supersedes another pattern';
    relates: 'This pattern is related to another pattern';
  };
  
  // Link validation
  linkValidation: {
    existence_check: 'Verify referenced resources exist';
    version_compatibility: 'Check version compatibility';
    circular_reference: 'Detect and prevent circular references';
    broken_link_detection: 'Regular validation of external links';
  };
}
\`\`\`

## 🎯 Client Project Integration Patterns

### Project Lifecycle Integration
\`\`\`typescript
interface ProjectLifecycleIntegration {
  // Project initiation
  projectInitiation: {
    pattern_selection: {
      source: 'crm-template-base';
      process: 'Select applicable base patterns';
      customization: 'Identify customization points';
      documentation: 'Document selected patterns and rationale';
    };
    
    business_analysis: {
      domain_mapping: 'Map business domain to existing patterns';
      gap_analysis: 'Identify pattern gaps and custom requirements';
      integration_planning: 'Plan integration with existing systems';
      compliance_review: 'Ensure regulatory compliance requirements';
    };
  };
  
  // Development phase
  developmentPhase: {
    pattern_implementation: {
      base_extension: 'Extend base patterns for client needs';
      custom_development: 'Develop client-specific components';
      integration_testing: 'Test integration with base patterns';
      documentation_update: 'Update client documentation';
    };
    
    knowledge_capture: {
      lesson_learned: 'Document lessons learned during development';
      pattern_evolution: 'Identify evolved or new patterns';
      best_practices: 'Capture successful implementation approaches';
      anti_patterns: 'Document what did not work well';
    };
  };
  
  // Deployment and maintenance
  deploymentMaintenance: {
    pattern_validation: {
      production_testing: 'Validate patterns in production environment';
      performance_assessment: 'Assess pattern performance impact';
      user_feedback: 'Collect user feedback on implemented patterns';
      maintenance_complexity: 'Evaluate maintenance overhead';
    };
    
    knowledge_contribution: {
      pattern_contribution: 'Contribute successful patterns back to base';
      documentation_improvement: 'Improve base template documentation';
      anti_pattern_sharing: 'Share what to avoid with community';
      case_study_creation: 'Create case studies for future reference';
    };
  };
}
\`\`\`

### Configuration Inheritance Model
\`\`\`typescript
interface ConfigurationInheritance {
  // Base configuration
  baseConfiguration: {
    typescript: {
      extends: './node_modules/crm-template-base/tsconfig.base.json';
      compilerOptions: {
        paths: {
          '@/base/*': ['./node_modules/crm-template-base/src/*'];
          '@/client/*': ['./src/*'];
        };
      };
    };
    
    tailwind: {
      presets: ['./node_modules/crm-template-base/tailwind.preset.js'];
      content: ['./src/**/*.{ts,tsx}', './node_modules/crm-template-base/src/**/*.{ts,tsx}'];
      theme: {
        extend: {
          // Client-specific theme extensions
        };
      };
    };
    
    eslint: {
      extends: ['crm-template-base/eslint-config'];
      rules: {
        // Client-specific rule overrides
      };
    };
  };
  
  // Client customizations
  clientCustomizations: {
    branding: {
      colors: 'Client-specific color palette';
      typography: 'Client-specific font choices';
      logoAssets: 'Client branding assets';
    };
    
    businessRules: {
      validation: 'Client-specific validation rules';
      workflows: 'Client-specific business workflows';
      permissions: 'Client-specific access control';
    };
    
    integrations: {
      apis: 'Client-specific API integrations';
      databases: 'Client-specific database configurations';
      services: 'Client-specific service configurations';
    };
  };
}
\`\`\`

## 🔄 Knowledge Flow Patterns

### Pattern Evolution Workflow
\`\`\`typescript
interface PatternEvolutionWorkflow {
  // Discovery phase
  discovery: {
    pattern_identification: {
      source: 'Client project implementations';
      criteria: 'Reusability potential and business value';
      stakeholders: 'Development team and business analysts';
      timeline: 'Ongoing during project development';
    };
    
    pattern_analysis: {
      abstraction_level: 'Determine appropriate abstraction';
      generalization: 'Remove client-specific details';
      applicability: 'Assess broader applicability';
      dependencies: 'Identify required dependencies';
    };
  };
  
  // Validation phase
  validation: {
    peer_review: {
      technical_review: 'Code review by senior developers';
      business_review: 'Business value assessment';
      documentation_review: 'Documentation quality check';
      testing_review: 'Test coverage and quality assessment';
    };
    
    pilot_testing: {
      controlled_implementation: 'Test in controlled environment';
      feedback_collection: 'Gather feedback from pilot users';
      iteration: 'Refine pattern based on feedback';
      validation_metrics: 'Measure success criteria';
    };
  };
  
  // Integration phase
  integration: {
    base_template_integration: {
      pattern_addition: 'Add pattern to appropriate base template';
      documentation_update: 'Update base template documentation';
      example_creation: 'Create usage examples';
      migration_guide: 'Create migration guide if needed';
    };
    
    ecosystem_notification: {
      change_notification: 'Notify all business units of new pattern';
      training_materials: 'Create training materials';
      implementation_support: 'Provide implementation support';
      feedback_collection: 'Collect ecosystem-wide feedback';
    };
  };
}
\`\`\`

### Cross-Project Learning Mechanisms
\`\`\`typescript
interface CrossProjectLearning {
  // Knowledge sharing sessions
  knowledgeSharing: {
    regular_sessions: {
      frequency: 'Bi-weekly knowledge sharing sessions';
      participants: 'All development teams';
      format: 'Pattern presentation and discussion';
      documentation: 'Session notes in MCP documentation';
    };
    
    project_retrospectives: {
      scope: 'Project completion retrospectives';
      focus: 'Pattern effectiveness and lessons learned';
      outcomes: 'Action items for pattern improvements';
      follow_up: 'Implementation of improvement actions';
    };
  };
  
  // Collaborative improvement
  collaborativeImprovement: {
    pattern_requests: {
      mechanism: 'Request patterns for common needs';
      prioritization: 'Business value and effort assessment';
      assignment: 'Expert assignment for pattern development';
      timeline: 'Defined development and delivery timeline';
    };
    
    community_contributions: {
      contribution_process: 'Open contribution process';
      review_process: 'Peer review and approval workflow';
      recognition: 'Contributor recognition system';
      documentation: 'Contribution guidelines and examples';
    };
  };
  
  // Success measurement
  successMeasurement: {
    pattern_adoption: {
      metrics: 'Pattern usage frequency across projects';
      tracking: 'Automated usage tracking where possible';
      reporting: 'Regular adoption reports';
      analysis: 'Adoption trend analysis';
    };
    
    quality_improvement: {
      defect_reduction: 'Track defects in pattern-using code';
      development_speed: 'Measure development velocity improvements';
      maintenance_efficiency: 'Track maintenance effort reduction';
      developer_satisfaction: 'Survey developer satisfaction with patterns';
    };
  };
}
\`\`\`

## 🛠️ Technical Integration Implementation

### Repository Integration Strategy
\`\`\`typescript
interface RepositoryIntegration {
  // Multi-repository structure
  multiRepoStructure: {
    base_templates: {
      repository: 'ibso-mcp-servers';
      access: 'Read-only for business units';
      versioning: 'Semantic versioning';
      distribution: 'NPM packages for reusable components';
    };
    
    business_units: {
      repository: 'Per business unit or client';
      access: 'Full access for assigned teams';
      versioning: 'Client-specific versioning';
      dependencies: 'Declared dependencies on base templates';
    };
  };
  
  // Dependency management
  dependencyManagement: {
    package_resolution: {
      base_packages: 'Published NPM packages from base templates';
      version_constraints: 'Semver ranges for compatibility';
      update_strategy: 'Controlled update process';
      conflict_resolution: 'Automated conflict detection and resolution';
    };
    
    shared_configuration: {
      configuration_packages: 'Shared configuration as packages';
      override_mechanisms: 'Client-specific override capabilities';
      validation: 'Configuration validation and testing';
      documentation: 'Configuration usage documentation';
    };
  };
  
  // Build and deployment integration
  buildDeploymentIntegration: {
    shared_build_tools: {
      build_scripts: 'Common build scripts and configurations';
      quality_gates: 'Shared quality assurance processes';
      testing_frameworks: 'Common testing setup and utilities';
      deployment_pipelines: 'Reusable deployment pipeline templates';
    };
    
    environment_management: {
      environment_templates: 'Infrastructure as code templates';
      configuration_management: 'Environment-specific configurations';
      secrets_management: 'Secure secrets handling across environments';
      monitoring_setup: 'Common monitoring and alerting setup';
    };
  };
}
\`\`\`

### API Integration Patterns
\`\`\`typescript
interface APIIntegrationPatterns {
  // Service integration
  serviceIntegration: {
    shared_services: {
      authentication: 'Common authentication service';
      authorization: 'Shared authorization patterns';
      logging: 'Centralized logging service';
      monitoring: 'Common monitoring and metrics';
    };
    
    client_services: {
      business_logic: 'Client-specific business logic services';
      data_processing: 'Client-specific data processing';
      integrations: 'Client-specific third-party integrations';
      workflows: 'Client-specific workflow engines';
    };
  };
  
  // Data integration
  dataIntegration: {
    shared_schemas: {
      common_entities: 'Shared entity definitions';
      data_formats: 'Standard data exchange formats';
      validation_rules: 'Common validation schemas';
      migration_patterns: 'Data migration utilities';
    };
    
    client_schemas: {
      domain_entities: 'Client-specific domain models';
      business_rules: 'Client-specific business logic';
      reporting_models: 'Client-specific reporting structures';
      audit_patterns: 'Client-specific audit requirements';
    };
  };
}
\`\`\`

This business unit integration pattern ensures that the IBSO ecosystem maintains consistency and knowledge sharing while providing the flexibility needed for client-specific implementations and industry specializations.`;