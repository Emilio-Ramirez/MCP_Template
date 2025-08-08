# Vitracoat Overview

## Business Unit Mission
Vitracoat develops and manufactures custom chemical powder coating formulations for industrial applications, specializing in aluminum processing and metal finishing with comprehensive laboratory testing and quality control systems.

## System Architecture

### High-Level Architecture
Integrated formulation management platform connecting laboratory work requests (LWR), testing workflows (TLWR/VLWR), and production scaling through a unified system that tracks formulations from development to final product delivery.

### Key Components
| Component | Purpose | Technology | Integration |
|-----------|---------|------------|-------------|
| LWR System | Laboratory work request management | Next.js/PostgreSQL | Formulation, TLWR, Customer Portal |
| Formulation System | Recipe creation and material management | React/Node.js | LWR, TLWR, Production, SAP |
| TLWR System | Testing laboratory work requests | React/Node.js | Formulation, Products, QMS |
| VLWR System | Validation laboratory work requests | React/Node.js | Products, Materials, Research |
| Production System | Manufacturing execution and scaling | SAP Integration | Formulation, Inventory, Shipping |
| Raw Materials DB | Material inventory and compatibility | PostgreSQL | Formulation, VLWR, Purchasing |

### Data Flow
Customer request → LWR creation → Formulation development → Testing (TLWR) → Validation (VLWR) → Production scaling → Quality approval → Product delivery

## Core Business Flows

### Flow 1: LWR Flow (New Product Development)
```
LWR → Auto-create F-1 formulation → Fill materials → Test → Add results → 
(F-2 iteration OR Approve for production) → Production formulation → 
Production results + Technical name → Product created → LWR finished
```
**Description**: Complete new product development from customer request to production-ready formula with full traceability
**Trigger**: New customer requirement or product specification request
**Output**: Approved production formula with technical name and complete specifications

### Flow 2: TLWR Flow (Testing)
```
TLWR created → Link to product (optional: attach formulation) → 
Execute tests → Add results → Mark complete
```
**Description**: Quality testing workflow for both formulations and existing products with flexible attachment options
**Trigger**: Quality validation needed for formulation or periodic product testing
**Output**: Test results automatically populating quality properties and certificates

### Flow 3: VLWR Flow (3 Sub-types)
```
A) Test Vitracoat Product: VLWR → Link to existing product → Test → Results
B) Raw Material: VLWR → Select/create experimental material → Test → Results → Update material
C) Research: VLWR → Competitor analysis → Research → Results
```
**Description**: Validation workflows for products, raw material qualification, and competitive research
**Trigger**: Product validation request, new material evaluation, or market research initiative
**Output**: Validation certificates, qualified materials, or research documentation

**VLWR Raw Material Fields**:
- Material Code (vlwrMaterialCode)
- Specific Weight (vlwrSpecificWeight)
- Estimated Price (vlwrEstimatedPrice)
- Chemistry Compatibility (vlwrChemistryCompatibility)
- Material Alias (vlwrMaterialAlias)

### Flow 4: Micro/Production Flow
```
Micro/Production request → Link to existing product → Same as LWR but with product attached → 
Scale quantities → Production batch → Delivery
```
**Description**: Production scaling for existing approved products with expedited workflow
**Trigger**: Customer order for existing product (micro batch or full production)
**Output**: Scaled production batch with proper documentation

## Key Business Rules

### Flow Independence
- **TLWR Independence**: Can exist with or without formulation attachment
- **Product Tracking**: Both VLWR and TLWR attach to products for complete history
- **Technical Name Gate**: Only assigned during production approval (creates the actual product)
- **Formulation vs Product**: Formulations are development entities, Products are approved commercial items

### Status Progression
- LWR statuses: Pending → In Progress → Testing → Approved → Complete
- Formulation statuses: Working → Ready for Testing → Testing → Tested → Approved → Production
- TLWR statuses: Created → In Progress → Results Added → Complete
- VLWR statuses: Created → Testing → Results Added → Validated

## Integration Points

### Internal Systems
| System | Integration Type | Data Exchange | Frequency |
|--------|-----------------|---------------|-----------|
| SAP ERP | REST API | Production orders, inventory levels, costs | Real-time |
| Quality Management | Database | Test results, COAs, specifications | Real-time |
| Customer Portal | API | Orders, specifications, status updates | Real-time |
| Document Management | File System | Technical data sheets, SDSs, COAs | On-demand |

### External Systems
| System | Purpose | Protocol | Method |
|--------|---------|----------|--------|
| Regulatory Database | Compliance verification | HTTPS/REST | Daily sync |
| Raw Material Suppliers | Material specifications | EDI/API | Batch |
| Shipping Partners | Logistics tracking | REST API | Real-time |

## Technology Stack

### Core Technologies
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Node.js, Express, Prisma ORM, GraphQL
- **Database**: PostgreSQL 15, Redis (caching), MongoDB (documents)
- **Infrastructure**: AWS ECS, Docker, Kubernetes, CloudFront CDN

### Development Environment
- **Version Control**: Git/GitHub Enterprise
- **CI/CD**: GitHub Actions, AWS CodePipeline
- **Testing**: Jest, Cypress, React Testing Library, Playwright
- **Monitoring**: DataDog, Sentry, CloudWatch, Grafana