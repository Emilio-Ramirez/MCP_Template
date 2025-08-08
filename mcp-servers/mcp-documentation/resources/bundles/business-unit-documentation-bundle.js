export default `# Business Unit Documentation Bundle - Component-First Architecture

## Bundle Overview

Comprehensive documentation patterns for the 6 standardized business unit documentation types. This bundle provides templates, patterns, and guidelines for creating consistent business unit documentation across the IBSO MCP ecosystem.

## Documentation Type System

### Mandatory Documentation Types (6 Types)

| Type | Purpose | Status | File Pattern |
|------|---------|--------|--------------|
| **Overview** | Business unit introduction and context | To be defined | \`overview.md\` |
| **Dashboard** | Analytics and business intelligence | To be defined | \`dashboard.md\` |
| **Auth** | Authentication and authorization | To be defined | \`auth.md\` |
| **Configuration** | System settings and administration | To be defined | \`system-configuration.md\` |
| **Form/Page** | Interactive forms and data entry | ✅ Established | \`{feature}-management.md\` |
| **Special** | Unique features outside standard patterns | To be defined | \`{special-feature}.md\` |

## Bundle Architecture

\`\`\`
📁 Business Unit Documentation Bundle
├── 🎯 Core Patterns (Request specific type patterns)
│   ├── overview-documentation-pattern
│   ├── dashboard-documentation-pattern
│   ├── auth-documentation-pattern
│   ├── configuration-documentation-pattern
│   ├── form-page-documentation-pattern ⭐ (Established)
│   └── special-documentation-pattern
├── 📋 Templates (Complete implementations)
│   ├── complete-business-unit-template
│   └── individual-type-templates
└── 🚀 Quick Reference (Common patterns cheat sheet)
\`\`\`

## Component Access Patterns

### Discovery Phase
Request overview and architecture understanding:
- "Show me business unit documentation patterns"
- "Explain the 6 documentation types"
- Returns: Architecture, type explanations, decision framework

### Implementation Phase
Request specific type patterns:
- "I need the dashboard documentation pattern"
- "Show me the form/page pattern structure"
- Returns: Complete pattern template, field structures, examples

## Business Unit Standard Structure

Every business unit MUST implement all 6 documentation types:

\`\`\`
📁 {business-unit}/
├── 📄 overview.md                    # Type 1: Overview
├── 📄 dashboard.md                   # Type 2: Dashboard
├── 📄 auth.md                        # Type 3: Auth
├── 📄 system-configuration.md        # Type 4: Configuration
├── 📄 {feature-1}-management.md      # Type 5: Form/Page (multiple)
├── 📄 {feature-2}-management.md      # Type 5: Form/Page (multiple)
└── 📄 {special-feature}.md           # Type 6: Special (if needed)
\`\`\`

## Pattern Selection Framework

### When to Use Each Documentation Type

\`\`\`
📊 Documentation Type Decision Tree
│
├── Is it business unit context?
│   └── YES → Use OVERVIEW pattern
│
├── Is it analytics/reporting?
│   └── YES → Use DASHBOARD pattern
│
├── Is it security/access control?
│   └── YES → Use AUTH pattern
│
├── Is it system settings/admin?
│   └── YES → Use CONFIGURATION pattern
│
├── Is it a form/workflow/data entry?
│   └── YES → Use FORM/PAGE pattern ⭐
│
└── Is it unique/non-standard?
    └── YES → Use SPECIAL pattern
\`\`\`

## Form/Page Pattern (Established Standard)

The Form/Page pattern is the ONLY fully established pattern with mandatory structure:

### Mandatory Sections
1. **Overview** - Purpose and system integration
2. **List of Components** - UI elements and functionality
3. **Table Definition** - Data structure and columns
4. **Main Structure** - Form sections and organization
5. **Field Categories** - Descriptive, Editable, To Be Filled
6. **Status Workflow** - Status types and progression
7. **Validation Rules** - Critical validation requirements
8. **Business Logic** - Workflow rules and automation
9. **Form Actions** - Available operations by status
10. **Integration Points** - External system connections

### Field Definition Standards

\`\`\`markdown
| Field | Type | Description | Example/Business Rules |
|-------|------|-------------|------------------------|
| **Field Name** | Data Type | Purpose and usage | Sample data or rules |
\`\`\`

## Implementation Guidelines

### For New Business Units

1. **Start with Bundle Overview**
   - Review all 6 documentation types
   - Understand mandatory structure requirements

2. **Request Specific Patterns**
   - Get individual type patterns as needed
   - Follow established Form/Page pattern exactly

3. **Use Templates**
   - Start with complete-business-unit-template
   - Customize for specific business needs

4. **Validate Completeness**
   - Ensure all 6 types are present
   - Check Form/Page pattern compliance

### For Existing Business Units

1. **Audit Current Documentation**
   - Map existing docs to 6-type structure
   - Identify gaps and missing types

2. **Migrate to Standard Structure**
   - Reorganize documentation by type
   - Ensure Form/Page docs follow established pattern

3. **Fill Documentation Gaps**
   - Add missing Auth, Dashboard, Configuration docs
   - Complete any partial documentation

## Quality Assurance Checklist

### Structure Compliance
- [ ] All 6 documentation types present
- [ ] Correct file naming convention (kebab-case)
- [ ] URI pattern follows \`ibso-business://{unit}/{resource}\`
- [ ] Form/Page docs follow mandatory structure

### Content Completeness
- [ ] Overview provides business context
- [ ] Dashboard defines KPIs and analytics
- [ ] Auth specifies roles and permissions
- [ ] Configuration covers all settings
- [ ] Form/Page includes all field definitions
- [ ] Special documents unique features

### Cross-References
- [ ] Integration points documented
- [ ] Related business units referenced
- [ ] External system connections specified
- [ ] Workflow dependencies mapped

## Benefits of Bundle Approach

### Developer Experience
- **Selective Loading**: Request only needed patterns
- **Consistent Structure**: Predictable documentation location
- **Complete Examples**: Working templates included
- **Clear Guidelines**: Explicit pattern usage rules

### Business Value
- **Comprehensive Coverage**: All aspects documented
- **Standardized Format**: Consistent across units
- **Maintainable**: Easy to update and extend
- **Scalable**: Supports unlimited business units

### System Integration
- **Automated Validation**: Structure can be validated
- **Tool Support**: Enables documentation generation
- **Cross-Unit Consistency**: Uniform patterns everywhere
- **Discovery Support**: Easy to find information

## Component Request Examples

### Discovery Requests
- "Show me business unit documentation bundle"
- "Explain the dashboard documentation pattern"
- "What are the 6 documentation types?"

### Implementation Requests
- "I need the auth documentation pattern template"
- "Give me the form/page mandatory structure"
- "Show me the configuration documentation template"

### Template Requests
- "I need a complete business unit template"
- "Show me a dashboard documentation example"
- "Give me the overview pattern template"

## Next Steps

1. **Explore Individual Patterns**: Request specific documentation type patterns
2. **Review Form/Page Standard**: Study the established pattern for forms
3. **Use Templates**: Start with provided templates for quick implementation
4. **Validate Structure**: Ensure compliance with 6-type system

This bundle provides everything needed to create standardized, comprehensive business unit documentation following the IBSO MCP ecosystem standards.`;