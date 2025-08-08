export default `# Form/Page Documentation Pattern ⭐ ESTABLISHED

## Purpose

The Form/Page documentation type is the **ONLY fully established pattern** with mandatory structure. It defines interactive forms, data entry interfaces, and workflow-driven pages with comprehensive field specifications, validation rules, and business logic.

## ⚡ MANDATORY STRUCTURE (95.6% Consistency Required)

\`\`\`markdown
# {Feature Name} Management System

## Overview

[Purpose and system integration - 2-3 paragraphs explaining what this system manages and how it integrates with other systems]

## List of Components

- **{Component 1}** - [Description of functionality]
- **{Component 2}** - [Description of functionality]
- **{Component 3}** - [Description of functionality]
- **View Dialog** - [Read-only modal functionality]
- **Export Actions** - [Export capabilities]

## {Feature} Table Definition

The main list displays:

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| **Column 1** | String | Description | \`Example value\` |
| **Column 2** | Date | Description | \`01/Jan/2025\` |
| **Column 3** | Decimal | Description | \`123.45\` |
| **Column 4** | Enum | Description | \`Status value\` |
| **Column 5** | Boolean | Description | \`Yes/No\` |
| **Column 6** | Action | Description | \`Click\` |

## Main {Feature} Structure

Each form contains the following sections:

| Section | Description | Purpose |
|---------|-------------|---------|
| **Header Information** | Basic data | Identification and tracking |
| **Section 2** | Details | Core functionality |
| **Section 3** | Additional data | Enhancement |
| **Process Parameters** | Settings | Control |

## Header Information - Field Categories

### Descriptive Fields (Read-only, populated from source)

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| **Field 1** | String | Description | \`Example\` |
| **Field 2** | String | Description | \`Example\` |
| **Field 3** | Integer | Description | \`123\` |

### Editable Fields

| Field | Type | Description | Business Rules |
|-------|------|-------------|----------------|
| **Field 1** | Select | Description | Rule explanation |
| **Field 2** | Textarea | Description | Rule explanation |

### To Be Filled Fields

| Field | Type | Description | Required For |
|-------|------|-------------|--------------|
| **Field 1** | Select | Description | Process/Approval |
| **Field 2** | String | Description | Tracking |

## {Section Name} Section

[Description of section purpose and structure]

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| **Field 1** | Type | Description | \`Example\` |
| **Field 2** | Type | Description | \`Example\` |

### Each {Item} Contains

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| **No** | String | Position identifier | \`1, 2, 3\` |
| **Main Field** | Dropdown | Selection | \`Option\` |
| **Quantity** | Decimal | Amount | \`100.0\` |
| **Calculated** | Decimal | Auto-calculated | \`50.0\` |

## Process Parameters

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| **Parameter 1** | String | Description | \`Value\` |
| **Parameter 2** | Integer | Description | \`300\` |
| **Total** | Decimal | Calculation | \`1000.0\` |

## Status Types and Workflow

States and transitions:

| Status | Description | Next Actions |
|--------|-------------|--------------|
| **Status 1** | Initial state | Action 1, Action 2 |
| **Status 2** | Processing | Action 3, Action 4 |
| **Status 3** | Complete | View only |

## Form Actions

Available actions based on status:

\`\`\`
🎯 Status-Based Actions
├── Status 1:
│   ├── ACTION 1 - Description
│   ├── ACTION 2 - Description
│   └── ACTION 3 - Description
├── Status 2:
│   └── ACTION 4 - Description
└── Status 3:
    ├── ACTION 5 - Description
    └── ACTION 6 - Description
\`\`\`

## View {Feature} Logic

When clicking from the table:

### Dialog Display
- Opens read-only modal showing complete details
- Displays all sections
- Shows calculated totals
- Includes history

### Dialog Information
- **Header**: Complete identification
- **Details**: Full breakdown
- **Process**: Settings and parameters
- **Actions**: Based on permissions and status

## Validation Rules

Critical validation requirements:

| Rule Category | Validation Rule | Details | Error Message |
|---------------|-----------------|---------|---------------|
| **Category 1** | Rule description | Specifics | "Error message text" |
| **Category 2** | Rule description | Specifics | "Error message text" |

### Validation Trigger Points
- **Real-time**: As user types/selects
- **On Save**: Before persisting
- **Before Status Change**: Status progression
- **Before Approval**: Final validation

## Business Logic

- **Auto-creation**: How records are created
- **Filtering**: How options are filtered
- **Calculations**: Automatic calculations
- **Version Control**: How versions are managed
- **Integration**: External system connections
- **Workflow**: Business process rules
- **Approval**: Approval requirements
- **Cost Tracking**: Financial calculations
- **Data Validation**: Validation enforcement

## Integration Points

- **System 1**: Purpose and data flow
- **System 2**: Purpose and data flow
- **Database**: Data persistence
- **External APIs**: Third-party connections

## Form Structure Summary

**Main Form Sections:**
1. Header Information (descriptive + editable + to be filled)
2. Detail Section 1
3. Detail Section 2
4. Process Parameters

**External Data (Not in Form):**
- Related data from other systems
- Calculated results
- History and audit trail

**Integration Points:**
- Parent system (data inheritance)
- Child systems (data provision)
- External systems (validation/enrichment)
\`\`\`

## CRITICAL Requirements for Form/Page Documentation

### 1. Complete Field Specifications
Every field MUST include:
- Field name (bold)
- Data type
- Description
- Example or business rule
- Required/Optional status

### 2. Table Format Consistency
All field definitions MUST use table format:
\`\`\`markdown
| Field | Type | Description | Example/Rule |
|-------|------|-------------|--------------|
\`\`\`

### 3. Status Workflow Documentation
- List all possible statuses
- Define transitions between statuses
- Specify actions available in each status
- Use visual tree structure for actions

### 4. Validation Rules
- Group by category
- Include specific error messages
- Define trigger points
- Specify business impact

### 5. Section Organization
- Header Information (always first)
- Main data sections (logical flow)
- Process/Parameters (configuration)
- Actions and workflows (operations)

## Real-World Example: Vitracoat Formulation

\`\`\`markdown
# Formulation Management System

## Overview

The system manages chemical powder coating formulations with multiple bases, raw material combinations, and complete process tracking. Each formulation includes material composition, process parameters, and integrates with TLWR for quality validation.

## List of Components

- **Formulation Table** - Main data grid with search, filter, and CRUD operations
- **Formulation Form** - Multi-section form with Header, Raw Materials, Mix Components, Process Parameters
- **View Formulation Dialog** - Read-only modal showing complete formulation details including TLWR results
- **TLWR Integration** - Testing workflow connection and quality properties population
- **Approval Dialog** - Formulation approval workflow interface
- **Export Actions** - Excel export and ticket generation

## Formulation Table Definition

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| **LWR** | String | Laboratory Work Request | \`41131\` |
| **NOMBRE COLOR** | String | Color/Product name | \`ANODIZED CLEAR\` |
| **NOMBRE CLIENTE** | String | Customer name | \`AVALON ALUMINUM\` |
| **FECHA** | Date | Creation date | \`01/Aug/2025\` |
| **FORMULADOR** | String | Formulator name | \`Julio Olivares\` |
| **SISTEMA** | String | Chemistry system | \`Epoxy\` |
| **TOTAL** | Decimal | Total weight | \`637.089\` |
| **STATUS** | Enum | Current status | \`Trabajando\` |

[Continue with complete structure...]
\`\`\`

## Common Patterns for Form/Page

### Field Organization
1. Group related fields
2. Order by importance
3. Separate read-only from editable
4. Mark required fields

### Table Structure
1. Key identifier first
2. Descriptive fields next
3. Status/State fields
4. Action columns last

### Validation Approach
1. Client-side first
2. Server-side backup
3. Business rule validation
4. Integration validation

### Status Management
1. Clear status names
2. Logical progression
3. Restricted transitions
4. Audit trail

## Anti-Patterns to Avoid

❌ **Incomplete Field Specs**: Missing type, description, or examples
❌ **Inconsistent Tables**: Different formats for field definitions
❌ **Missing Validation**: No error messages or rules
❌ **Unclear Status Flow**: Ambiguous state transitions
❌ **Poor Organization**: Random field ordering

## Quality Metrics

### 95.6% Consistency Requirements
- All sections present: 95%+ compliance
- Field specifications complete: 100% required
- Table format consistent: 100% required
- Status workflow documented: 95%+ compliance
- Validation rules included: 90%+ compliance

### Documentation Depth
- Overview: 2-3 paragraphs minimum
- Components: All UI elements listed
- Fields: Every field documented
- Workflows: Complete status progression
- Integration: All connections specified

## Validation Checklist

- [ ] Overview section explains purpose and integration
- [ ] All UI components listed
- [ ] Table definition includes all columns
- [ ] Form structure sections defined
- [ ] Header fields categorized (Descriptive/Editable/To Be Filled)
- [ ] All form sections documented with field tables
- [ ] Status workflow completely defined
- [ ] Form actions tree structure included
- [ ] Validation rules with error messages
- [ ] Business logic explained
- [ ] Integration points identified
- [ ] View/Dialog logic documented
- [ ] Examples use proper markdown tables
- [ ] Field types consistently specified

This is the ESTABLISHED pattern that ensures 95.6% consistency across all form/page documentation in the IBSO MCP ecosystem. Deviation from this pattern requires explicit justification and approval.`;