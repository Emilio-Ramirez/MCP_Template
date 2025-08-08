export default `# Overview Documentation Pattern

## Purpose

The Overview documentation type provides high-level application architecture, core business flows, and system components. This is the entry point for understanding any business unit's technical system.

## Mandatory Structure

\`\`\`markdown
# {Business Unit Name} Overview

## Business Unit Mission
[Core business purpose and primary objective - 2-3 sentences max]

## System Architecture

### High-Level Architecture
[System overview diagram or description showing main components and their relationships]

### Key Components
| Component | Purpose | Technology | Integration |
|-----------|---------|------------|-------------|
| Component 1 | Purpose | Tech stack | Connected systems |
| Component 2 | Purpose | Tech stack | Connected systems |
| Component 3 | Purpose | Tech stack | Connected systems |

### Data Flow
[How data moves through the system between components]

## Core Business Flows

### Flow 1: [Primary Flow Name]
\`\`\`
Step 1 → Step 2 → Step 3 → Step 4 → Output
\`\`\`
**Description**: [What this flow accomplishes]
**Trigger**: [What initiates this flow]
**Output**: [What is produced]

### Flow 2: [Secondary Flow Name]
\`\`\`
Step 1 → Decision Point → Path A → Output A
                      ↓
                    Path B → Output B
\`\`\`
**Description**: [What this flow accomplishes]
**Trigger**: [What initiates this flow]
**Output**: [What is produced]

### Flow 3: [Tertiary Flow Name]
\`\`\`
Step 1 → Step 2 → Step 3 → Output
\`\`\`
**Description**: [What this flow accomplishes]
**Trigger**: [What initiates this flow]
**Output**: [What is produced]

### Flow 4: [Additional Flow Name]
\`\`\`
Step 1 → Step 2 → Step 3 → Output
\`\`\`
**Description**: [What this flow accomplishes]
**Trigger**: [What initiates this flow]
**Output**: [What is produced]

## Integration Points

### Internal Systems
| System | Integration Type | Data Exchange | Frequency |
|--------|-----------------|---------------|-----------|
| System 1 | API/Database | What data | Real-time/Batch |
| System 2 | API/Database | What data | Real-time/Batch |

### External Systems
| System | Purpose | Protocol | Method |
|--------|---------|----------|--------|
| External 1 | Purpose | REST/SOAP | Push/Pull |
| External 2 | Purpose | REST/SOAP | Push/Pull |

## Technology Stack

### Core Technologies
- **Frontend**: [Framework and libraries]
- **Backend**: [Languages and frameworks]
- **Database**: [Database systems]
- **Infrastructure**: [Deployment platform]

### Development Environment
- **Version Control**: [Git/SVN]
- **CI/CD**: [Pipeline tools]
- **Testing**: [Testing frameworks]
- **Monitoring**: [Monitoring tools]
\`\`\`

## Field Guidelines

### Business Unit Mission
- Keep extremely concise (2-3 sentences max)
- State primary business purpose
- Avoid marketing language

### System Architecture
- Focus on technical components
- Show data relationships
- Keep abstraction high-level

### Core Business Flows
- Document 3-5 primary flows
- Use visual flow diagrams
- Include trigger and output
- Keep steps sequential and clear

### Integration Points
- List only active integrations
- Specify data direction
- Note synchronization method

### Technology Stack
- Current technologies only
- Group by layer (frontend/backend/data)
- Include key frameworks

## Template Example: Vitracoat

\`\`\`markdown
# Vitracoat Overview

## Business Unit Mission
Vitracoat develops and manufactures custom chemical powder coating formulations for industrial applications, specializing in aluminum processing and metal finishing.

## System Architecture

### High-Level Architecture
Formulation Management System integrating laboratory testing (TLWR/VLWR), production scaling, and quality control in a unified workflow platform.

### Key Components
| Component | Purpose | Technology | Integration |
|-----------|---------|------------|-------------|
| Formulation System | Recipe creation and management | Next.js/PostgreSQL | TLWR, SAP, Production |
| LWR System | Laboratory work requests | React/Node.js | Formulation, TLWR |
| TLWR System | Testing laboratory requests | React/Node.js | Formulation, QMS |
| VLWR System | Validation laboratory requests | React/Node.js | Products, Materials |
| Production System | Manufacturing execution | SAP | Formulation, Inventory |

### Data Flow
LWR initiates → Formulation created → Testing via TLWR → Results validate → Production scales → Product delivered

## Core Business Flows

### Flow 1: LWR Flow (New Product Development)
\`\`\`
LWR → Auto-create F-1 formulation → Fill materials → Test → Add results → 
(F-2 iteration OR Approve) → Production formulation → 
Production results + Technical name → Product created → LWR finished
\`\`\`
**Description**: Complete product development from request to production-ready formula
**Trigger**: New customer request or product requirement
**Output**: Approved production formula with technical specifications

### Flow 2: TLWR Flow (Testing)
\`\`\`
TLWR created → Link to product (optional: attach formulation) → 
Execute tests → Add results → Mark complete
\`\`\`
**Description**: Quality testing workflow for formulations and products
**Trigger**: Formulation ready for testing or quality validation needed
**Output**: Test results populating quality properties

### Flow 3: VLWR Flow (3 Sub-types)
\`\`\`
A) Test Vitracoat Product: VLWR → Link existing product → Test → Results
B) Raw Material: VLWR → Select/create material → Test → Results → Update material
C) Research: VLWR → Competitor analysis → Research → Results
\`\`\`
**Description**: Validation and research workflows for products, materials, and market analysis
**Trigger**: Validation request for existing products, new materials, or research needs
**Output**: Validation results, material specifications, or research findings

### Flow 4: Micro/Production Flow
\`\`\`
Micro/Production request → Link to existing product → 
Same as LWR but with product attached → Scale to production
\`\`\`
**Description**: Production scaling for approved products
**Trigger**: Customer order for existing product
**Output**: Production-ready batch with scaled quantities

## Integration Points

### Internal Systems
| System | Integration Type | Data Exchange | Frequency |
|--------|-----------------|---------------|-----------|
| SAP ERP | REST API | Production orders, inventory | Real-time |
| Quality Management | Database | Test results, certificates | Real-time |
| Document Management | File system | Technical sheets, COAs | On-demand |

### External Systems
| System | Purpose | Protocol | Method |
|--------|---------|----------|--------|
| Customer Portal | Order submission | HTTPS/REST | Pull |
| Regulatory Database | Compliance data | HTTPS/API | Daily sync |

## Technology Stack

### Core Technologies
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: PostgreSQL, Redis (caching)
- **Infrastructure**: AWS/Azure, Docker, Kubernetes

### Development Environment
- **Version Control**: Git/GitHub
- **CI/CD**: GitHub Actions, Jenkins
- **Testing**: Jest, Cypress, React Testing Library
- **Monitoring**: DataDog, Sentry
\`\`\`

## Common Patterns

### Flow Documentation
- Use arrow notation (→) for sequential steps
- Show decision points clearly
- Include all possible paths
- Keep each flow to one primary purpose

### Component Description
- Name components clearly
- State single responsibility
- List key integrations
- Specify technology used

### Integration Mapping
- Document data direction
- Specify sync vs async
- Note data formats
- Include error handling

## Anti-Patterns to Avoid

❌ **Too Much Detail**: Implementation specifics belong in other docs
❌ **Missing Flows**: Core business flows are essential
❌ **Vague Components**: Each component needs clear purpose
❌ **No Integration Info**: Must show how systems connect
❌ **Outdated Tech Stack**: Keep technology current

## Validation Checklist

- [ ] Mission statement under 3 sentences
- [ ] Architecture components listed with purpose
- [ ] 3-5 core business flows documented
- [ ] Each flow has trigger and output
- [ ] Integration points specified
- [ ] Technology stack current
- [ ] Data flow explained
- [ ] All components have clear responsibilities

## Key Insights for Flows

When documenting flows, remember:
- **Flow Independence**: Each flow should be understandable standalone
- **Clear Triggers**: What initiates each flow must be explicit
- **Defined Outputs**: What the flow produces must be clear
- **Decision Points**: Show where flows branch
- **Sub-types**: Document variations within a flow type

This streamlined pattern focuses on technical architecture and business flows, providing a clear entry point for understanding any business unit's system in the IBSO MCP ecosystem.`;