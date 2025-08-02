export default `# Vitracoat Chemical Coating Management System - Project Overview

This document provides a comprehensive overview of the Vitracoat Sample Management System, a specialized ERP application for managing chemical formulation development in the powder coating industry.

## 🏗️ Project Architecture

### Technology Stack
- **Frontend:** Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend:** Next.js API Routes + Server Actions
- **Database:** PostgreSQL + Prisma (schema) + Drizzle (queries)
- **Authentication:** Azure Active Directory
- **Testing:** Vitest + Playwright
- **Deployment:** Vercel/Azure

### Business Process Flow
\`\`\`
Client Request → Formulation Development → Quality Validation → Sample Production → Delivery
\`\`\`

## 📋 Core Business Modules (Phase 1)

### 1. Client Management (Gestión de Clientes)
**Purpose:** Country-specific client management with role-based access control

**Key Features:**
- RFC validation for Mexican clients
- US client approval workflows
- Role-based visibility (salespeople see own clients, managers see zone clients)
- Blocked client management
- Complete audit trail

**Database Schema:**
\`\`\`prisma
model Client {
  id                String   @id @default(cuid())
  name              String   // Company name
  rfc               String?  // Mexico tax ID
  fiscalAddress     String
  shippingAddress   String
  country           Country  // MEXICO | US
  region            String
  salespersonId     String
  phone             String
  email             String
  operationalContact String
  adminContact      String
  isBlocked         Boolean  @default(false)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
\`\`\`

### 2. Commercial Requests (Solicitudes Comerciales)
**Purpose:** Complete request lifecycle management with automated workflows

**Request Types:**
- **LWR (Laboratory Work Request)** - Product development
- **TLWR (Testing Laboratory Work Request)** - Testing services  
- **VLWR (Vitracoat Laboratory Work Request)** - Internal testing
- **Micro Production** - Small batch production (≤150kg, special approval required)

**Key Features:**
- Traffic light status indicators (green: on time, yellow: ≤2 days, red: overdue)
- File attachment system (PDF, Word, Excel, images)
- Internal messaging between sales and lab
- Fantasy name → Technical name transition
- Automated date calculations

### 3. Formulation Module (Módulo de Formulación)
**Purpose:** Product formulation development with version control

**Structure:**
- Up to 4 base formulations + 1 final mix per request
- Complete version history preservation
- Quality validation gates before production
- Material filtering by product type approval

**Features:**
- Version control with historical preservation
- Automatic cost calculation
- Quality validation workflow
- Material usage tracking
- Copy from previous versions
- Lab-production communication system

### 4. Inventory Integration (SAP Read-only)
**Purpose:** Real-time inventory consultation without stock modification

**Integration Features:**
- SAP read-only API connection
- Local cache with periodic sync
- Manual entry fallback
- Stock level alerts (🟢 Adequate, 🟡 Near minimum, 🔴 Below minimum)

### 5. Material Classification Matrix
**Purpose:** Define compatible raw materials for each product type

**Configuration:**
- Interactive matrix grid interface
- Dynamic filtering in formulation forms
- Audit trail for all changes
- Bulk operations support
- Quality standard enforcement

### 6. Formulation Calculator
**Purpose:** Quick preliminary formulation estimates

**Calculation Modes:**
1. **Percentage Mode:** Enter percentages, calculate quantities
2. **Quantity Mode:** Enter quantities, show equivalent percentages

**Features:**
- Real-time cost estimation
- PDF/Excel export capabilities
- Automatic validation
- No official record creation

### 7. Access Control System
**Purpose:** Comprehensive role-based access control

**Role Definitions:**
\`\`\`typescript
enum UserRole {
  VENDEDOR           // Own clients/requests only
  GERENTE_ZONA       // Zone-wide visibility + approvals
  LABORATORIO        // Formulation development
  CALIDAD           // Quality validation
  PRODUCCION        // Production scheduling
  ADMIN_INVENTARIO  // Inventory management
  ADMIN_GENERAL     // Full system access
  AUDITORIA         // Read-only audit access
  MANTENIMIENTO     // Equipment status management
}
\`\`\`

### 8. Alerts & Automation System
**Purpose:** Real-time notifications and automated state transitions

**Alert Types:**
- Email notifications for status changes
- Visual in-app alerts and badges
- System alerts for low inventory and overdue tasks
- Escalation notifications to managers

## 🔧 Configuration Management System

### 5 Main Configuration Pages

#### 1. Product Configuration (\`/product-configuration\`)
**6 Tabs:** Standard Types, Chemistry Types, Color Codes, Finish Types, Metallic Types, Light Specifications

#### 2. Materials & Testing (\`/materials-processes\`)
**7 Tabs:** Substrate Types, Pre-Treatment Types, Suppliers, Lamp Types, Report Types, Report Frequency, Competitors

#### 3. Operations & Geography (\`/operations-geography\`)
**3 Tabs:** Laboratory Locations (Lerma, M&M-Houston, Houston), Zones, Systems

#### 4. Application & Equipment (\`/equipment-market\`)
**8 Tabs:** Application Equipment, Market Segmentation, Test Objectives, Panel Preparation, Enclosed Types, Application Mode, Application System, Application Method

#### 5. Testing Standards (\`/testing-standards\`)
**5 Tabs:** Hardness Standards, Impact Standards, Salt Spray Standards, QUV Standards, Flexibility Standards

## 📊 Request Form Architecture

### Multi-Step Form Structure
1. **Basic Info** (shared across all request types)
2. **Request Type Selection** 
3. **Type-Specific Sections** (dynamic based on selection)
4. **Notes & Files** (shared)

### Laboratory-Based Business Logic
- **Price Units:** Houston labs default to lb/USD, Lerma to kg/MXN
- **Temperature Units:** USA labs allow °C or °F, Mexico labs only °C
- **Micro Production:** Restricted to Lerma laboratory only
- **Panel Specifications:** Composite fields with quantity × width × height

### Advanced Form Features
- **Conditional Sections:** Toggle-based test configurations
- **"Other" Options:** Custom value inputs for select fields
- **Validation Rules:** Sample size limits based on units
- **File Uploads:** Multi-format support with preview
- **Auto-Save:** Prevent data loss during long form sessions

## 🚀 Phase 2 Planned Modules

### Additional Modules for Complete Workflow
1. **History & Traceability** - Complete audit trails
2. **Processes & Resources** - Production resource management
3. **Production Orders** - Sample production scheduling
4. **Sample Delivery** - Delivery tracking with QC integration
5. **Process Dashboard** - Area-specific monitoring
6. **Operational Inventory** - Full SAP integration with stock modifications

## 📈 Performance & Business Metrics

### Technical Performance Targets
- Page load: <2s
- API response: <500ms
- Concurrent users: 100+
- Uptime: 99.9%

### Business KPIs
- Request processing time reduction
- Formulation approval rate improvement
- Sample delivery accuracy
- User adoption and satisfaction rates
- Inventory optimization metrics

## 🔐 Security & Compliance

### Enterprise Security Features
- Azure AD integration for SSO
- JWT token-based session management
- Route-level permission checking
- Component-level visibility control
- Complete audit trail for compliance

### Chemical Industry Compliance
- Quality control validation gates
- Material compatibility enforcement
- Testing protocol standardization
- Traceability requirements
- Safety data sheet management

## 🌍 Multi-Location Operations

### Laboratory Network
- **Lerma, Mexico** - Main formulation facility
- **Houston, USA** - Regional testing center
- **M&M Houston, USA** - Specialized testing facility

### Localization Features
- Currency handling (USD/MXN)
- Temperature unit preferences (°C/°F)
- Regional business rule enforcement
- Multi-language support (English/Spanish)
- Time zone considerations

This Vitracoat project represents a comprehensive solution for chemical industry ERP needs, combining advanced technical architecture with deep domain expertise in powder coating formulation and testing processes.`;