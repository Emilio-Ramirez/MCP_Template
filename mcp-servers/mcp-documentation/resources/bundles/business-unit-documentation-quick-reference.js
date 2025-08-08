export default `# Business Unit Documentation Bundle - Quick Reference

## 6 Documentation Types At a Glance

| Type | File Name | Purpose | Status |
|------|-----------|---------|--------|
| **Overview** | \`overview.md\` | Business context & architecture | Define structure |
| **Dashboard** | \`dashboard.md\` | Analytics & KPIs | Define structure |
| **Auth** | \`auth.md\` | Security & permissions | Define structure |
| **Configuration** | \`system-configuration.md\` | Settings & admin | Define structure |
| **Form/Page** | \`{feature}-management.md\` | Forms & workflows | ⭐ Established |
| **Special** | \`{special-feature}.md\` | Unique features | Flexible structure |

## Quick Decision Tree

\`\`\`
What are you documenting?
│
├─ Business context? → OVERVIEW
├─ Analytics/KPIs? → DASHBOARD
├─ Security/roles? → AUTH
├─ Settings/admin? → CONFIGURATION
├─ Forms/data entry? → FORM/PAGE ⭐
└─ Something unique? → SPECIAL
\`\`\`

## Overview Type - Quick Template

\`\`\`markdown
# {Business Unit} Overview

## Business Unit Mission
[2-3 sentences of purpose]

## Key Functions
- Core Function 1
- Core Function 2
- Support Function

## System Architecture
[Components and integration]

## Key Stakeholders
| Role | Responsibilities | Access |

## Business Context
[Industry, regulations, strategy]
\`\`\`

## Dashboard Type - Quick Template

\`\`\`markdown
# {Business Unit} Dashboard

## Dashboard Overview
[Purpose and audience]

## Key Performance Indicators (KPIs)
| KPI | Formula | Target | Threshold |

## Dashboard Layout
[Visual structure]

## Data Sources
| Source | Type | Update |

## User Interface Components
- Charts: [Types]
- Filters: [Options]
- Export: [Formats]
\`\`\`

## Auth Type - Quick Template

\`\`\`markdown
# {Business Unit} Authentication & Authorization

## Authentication Methods
| Method | Use Case | Security |

## User Roles and Permissions
| Role | Description | Permissions |

## Permission Matrix
| Feature | Admin | Manager | User |

## Security Policies
- Password: [Requirements]
- MFA: [Configuration]
- Session: [Timeout]
\`\`\`

## Configuration Type - Quick Template

\`\`\`markdown
# {Business Unit} System Configuration

## Configuration Categories
- System Settings
- Business Rules
- UI Options
- Integration

## System Settings
| Setting | Default | Options | Impact |

## Business Rules
| Rule | Value | Range | Effect |

## Administrative Interface
[Configuration UI description]
\`\`\`

## Form/Page Type - Quick Template ⭐ ESTABLISHED

\`\`\`markdown
# {Feature} Management System

## Overview
[Purpose and integration]

## List of Components
- Component 1 - Description
- Component 2 - Description

## {Feature} Table Definition
| Column | Type | Description | Example |

## Main {Feature} Structure
| Section | Description | Purpose |

## Header Information - Field Categories

### Descriptive Fields (Read-only)
| Field | Type | Description | Example |

### Editable Fields
| Field | Type | Description | Business Rules |

### To Be Filled Fields
| Field | Type | Description | Required For |

## {Section Name}
| Field | Type | Description | Example |

## Status Types and Workflow
| Status | Description | Next Actions |

## Form Actions
\`\`\`
├── Status 1:
│   ├── ACTION 1
│   └── ACTION 2
└── Status 2:
    └── ACTION 3
\`\`\`

## Validation Rules
| Rule | Details | Error Message |

## Business Logic
- Auto-creation: [Rules]
- Calculations: [Formulas]
- Integration: [Systems]
\`\`\`

## Special Type - Quick Template

\`\`\`markdown
# {Special Feature Name}

## Feature Overview
[Purpose and business value]

## Why Special Type
[Justification for not using standard types]

## Unique Requirements
[What makes this special]

## Custom Implementation
[Feature-specific sections as needed]

## Integration Considerations
[How it connects to standard systems]
\`\`\`

## Common Field Type Definitions

| Type | Description | Example |
|------|-------------|---------|
| **String** | Text field | \`"Product Name"\` |
| **Integer** | Whole number | \`123\` |
| **Decimal** | Number with decimals | \`123.45\` |
| **Date** | Date field | \`01/Jan/2025\` |
| **DateTime** | Date and time | \`01/Jan/2025 10:30\` |
| **Boolean** | Yes/No | \`true/false\` |
| **Select** | Dropdown selection | \`Option 1\` |
| **Textarea** | Multi-line text | \`Long text...\` |
| **Enum** | Fixed options | \`Active/Inactive\` |
| **Action** | Button/Link | \`Click/View\` |

## Status Workflow Patterns

### Linear Workflow
\`\`\`
Draft → Review → Approved → Published
\`\`\`

### Branching Workflow
\`\`\`
      ┌→ Approved → Production
Draft─┤
      └→ Rejected → Draft
\`\`\`

### Circular Workflow
\`\`\`
Draft → Testing → Failed ↓
  ↑                      ↓
  ←─────── Fix ←─────────┘
\`\`\`

## Validation Rule Patterns

### Required Field
\`\`\`markdown
| Rule | Required field | Field cannot be empty | "Field is required" |
\`\`\`

### Range Validation
\`\`\`markdown
| Rule | Value range | Must be between X and Y | "Value must be between X and Y" |
\`\`\`

### Format Validation
\`\`\`markdown
| Rule | Email format | Valid email address | "Invalid email format" |
\`\`\`

### Business Rule
\`\`\`markdown
| Rule | Approval limit | Amount > 10000 needs approval | "Requires manager approval" |
\`\`\`

## Integration Point Patterns

### Database
\`\`\`markdown
- **Database**: PostgreSQL for data persistence
- **Tables**: formulations, materials, users
- **Relationships**: One-to-many, many-to-many
\`\`\`

### API Integration
\`\`\`markdown
- **System**: SAP ERP
- **Method**: REST API
- **Data**: Order synchronization
- **Frequency**: Real-time
\`\`\`

### File Exchange
\`\`\`markdown
- **System**: Legacy system
- **Method**: SFTP
- **Format**: CSV
- **Schedule**: Daily at 2 AM
\`\`\`

## Business Logic Patterns

### Auto-calculation
\`\`\`markdown
Total = Quantity × Unit Price
Percentage = (Part / Total) × 100
\`\`\`

### Conditional Logic
\`\`\`markdown
IF status = "Approved" THEN
  Enable production
ELSE
  Require approval
\`\`\`

### Workflow Rules
\`\`\`markdown
WHEN formulation.complete THEN
  SET status = "Ready for Testing"
  NOTIFY lab_technician
\`\`\`

## File Naming Conventions

### Standard Files (Required)
- \`overview.md\` - Always this name
- \`dashboard.md\` - Always this name
- \`auth.md\` - Always this name
- \`system-configuration.md\` - Always this name

### Feature Files (Form/Page)
- \`{feature}-management.md\`
- \`{workflow-name}.md\`
- Examples:
  - \`formulation-management.md\`
  - \`raw-materials-management.md\`
  - \`commercial-requests.md\`

### Special Files
- \`{descriptive-name}.md\`
- Examples:
  - \`ai-formula-predictor.md\`
  - \`real-time-collaboration.md\`

## Quick Validation Checklist

### All Types
- [ ] Purpose clearly stated
- [ ] Sections logically organized
- [ ] Tables properly formatted
- [ ] Examples provided

### Form/Page Specific
- [ ] All fields documented
- [ ] Status workflow complete
- [ ] Validation rules included
- [ ] Business logic explained

### Special Type Specific
- [ ] Justification provided
- [ ] Unique aspects documented
- [ ] Integration explained

## Most Common Mistakes to Avoid

1. ❌ Using Special type for standard forms
2. ❌ Missing field type specifications
3. ❌ Incomplete status workflows
4. ❌ No validation error messages
5. ❌ Forgetting integration points
6. ❌ Inconsistent table formats
7. ❌ Missing business logic
8. ❌ No examples provided

## Bundle Component Request Syntax

\`\`\`
"Show me the dashboard documentation pattern"
"I need the form/page template"
"Give me the auth pattern structure"
"What's the configuration documentation format?"
\`\`\`

This quick reference provides immediate access to the most common patterns and structures needed for business unit documentation.`;