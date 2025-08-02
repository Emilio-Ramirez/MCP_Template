export const vitracoatBusinessModel = {
  name: "Vitracoat Business Model",
  description: "Complete business model for powder coating chemical formulation management with 5 configuration pages, 8 core modules, and operational workflows",
  
  overview: {
    domain: "Chemical Manufacturing - Powder Coating",
    businessFlow: "Client Request → Formulation Development → Quality Validation → Sample Production → Delivery",
    techStack: "Next.js 15 + TypeScript + PostgreSQL + Azure AD",
    scope: "Phase 1: 8 modules, Phase 2: 6 additional modules"
  },

  businessArchitecture: {
    configurationPages: [
      {
        name: "Product Configuration",
        url: "/product-configuration", 
        purpose: "Core product and specification management",
        tabs: [
          "Standard Types - Base product standards and specifications",
          "Chemistry Types - Chemical composition categories", 
          "Color Codes - RAL and custom color specifications",
          "Finish Types - Surface finish categories (gloss, texture, etc.)",
          "Metallic Types - Metallic powder specifications",
          "Light Specifications - Lighting and appearance standards"
        ]
      },
      {
        name: "Materials & Testing",
        url: "/materials-processes",
        purpose: "Materials, suppliers, and testing configuration", 
        tabs: [
          "Substrate Types - Base material specifications",
          "Pre-Treatment Types - Surface preparation methods",
          "Suppliers - Approved supplier database",
          "Lamp Types - Testing equipment lamp specifications", 
          "Report Types - Quality control report categories",
          "Report Frequency - Testing and reporting schedules",
          "Competitors - Competitor database and analysis"
        ]
      },
      { 
        name: "Operations & Geography",
        url: "/operations-geography",
        purpose: "Operational locations and systems management",
        tabs: [
          "Laboratory Locations - Testing facility locations (Lerma, M&M-Houston, Houston)",
          "Zones - Geographical business zones", 
          "Systems - Integrated business systems (ERP, CRM, LIMS, etc.)"
        ]
      },
      {
        name: "Application & Equipment", 
        url: "/equipment-market",
        purpose: "Application processes and equipment configuration",
        tabs: [
          "Application Equipment - Powder application machinery",
          "Market Segmentation - Business market categories",
          "Test Objectives - Quality testing goals and methods",
          "Panel Preparation - Test panel preparation methods",
          "Enclosed Types - Container and packaging types", 
          "Application Mode - Recovery vs non-recovery systems",
          "Application System - Manual, automated, or robotic systems",
          "Application Method - Corona, tribo, or fluid bed application"
        ]
      },
      {
        name: "Testing Standards",
        url: "/testing-standards", 
        purpose: "Quality control and testing protocols",
        tabs: [
          "Hardness Standards - Durability testing protocols",
          "Impact Standards - Impact resistance specifications", 
          "Salt Spray Standards - Corrosion resistance testing",
          "QUV Standards - UV weathering test protocols",
          "Flexibility Standards - Flexibility and bend testing"
        ]
      }
    ],

    coreModules: [
      {
        name: "Client Management (Gestión de Clientes)",
        purpose: "Manage client information with country-specific business rules and role-based access",
        businessRules: [
          "Mexico clients: Auto-processed, direct assignment",
          "US clients: Require manager approval for operation assignment", 
          "Access control: Salespeople see only their clients, managers see zone clients"
        ],
        features: [
          "RFC validation for Mexican clients",
          "Duplicate prevention",
          "Role-based visibility", 
          "Blocked client warnings",
          "Complete audit trail"
        ]
      },
      {
        name: "Commercial Requests (Solicitudes Comerciales)",
        purpose: "Manage complete lifecycle of client requests with status tracking and automated workflows",
        requestTypes: ["STANDARD", "MICRO_PRODUCTION"],
        statusFlow: [
          "PENDING_INFO",
          "IN_REVIEW", 
          "ACCEPTED",
          "FORMULATION_IN_PROGRESS",
          "FORMULATION_COMPLETED",
          "SAMPLE_DELIVERED",
          "CLOSED"
        ],
        businessLogic: [
          "Micro-production: Requests ≤150kg require special plant approval",
          "Automatic dates: Estimated delivery = acceptance date + configurable days",
          "Status automation: State changes trigger notifications and next steps"
        ]
      },
      {
        name: "Formulation Module (Módulo de Formulación)", 
        purpose: "Develop and manage product formulations with version control and quality validation",
        structure: "Up to 4 base formulations + 1 final mix per request",
        businessRules: [
          "Versioning: Complete history preservation, only one active version",
          "Quality gate: Must be validated before production",
          "Material filtering: Only approved materials per product type"
        ],
        features: [
          "Version control with historical preservation",
          "Automatic cost calculation",
          "Quality validation workflow", 
          "Material usage tracking",
          "Copy from previous versions"
        ]
      },
      {
        name: "Inventory (SAP Read-only)",
        purpose: "Real-time inventory consultation for formulation validation without modifying stock levels",
        integration: "SAP Connection: Read-only API integration",
        features: [
          "Real-time stock consultation",
          "Low stock alerts (visual indicators)",
          "Material specifications lookup",
          "Alert system: Green (adequate), Yellow (near minimum), Red (out of stock)"
        ]
      },
      {
        name: "Material Classification (Clasificación de Materiales)",
        purpose: "Define which raw materials can be used for each product type through configurable matrix",
        businessImpact: [
          "Ensures only compatible materials used in formulations",
          "Reduces formulation errors", 
          "Enforces quality standards",
          "Simplifies material selection process"
        ],
        features: [
          "Matrix Interface: Visual grid for enabling/disabling associations",
          "Dynamic Filtering: Formulation forms auto-filter based on product type",
          "Audit Trail: Track all matrix changes"
        ]
      },
      {
        name: "Formulation Calculator (Calculadora de Formulación)",
        purpose: "Quick simulation tool for preliminary formulation estimates without creating official records",
        modes: [
          "Percentage Mode: Enter percentages, calculate quantities",
          "Quantity Mode: Enter quantities, show equivalent percentages"
        ],
        features: [
          "Real-time cost estimation from current material prices",
          "Export Options: PDF/Excel export for documentation", 
          "Validation: Automatic percentage/quantity validation"
        ]
      },
      {
        name: "Access Control (Control de Accesos)",
        purpose: "Comprehensive role-based access control integrated with Azure AD",
        roles: [
          "VENDEDOR - Own clients/requests only",
          "GERENTE_ZONA - Zone-wide visibility + approvals",
          "LABORATORIO - Formulation development",
          "CALIDAD - Quality validation", 
          "PRODUCCION - Production scheduling",
          "ADMIN_INVENTARIO - Inventory management",
          "ADMIN_GENERAL - Full system access",
          "AUDITORIA - Read-only audit access"
        ],
        implementation: [
          "Azure AD Integration: SSO with enterprise credentials",
          "JWT Tokens: Secure session management",
          "Middleware: Route-level permission checking"
        ]
      },
      {
        name: "Alerts & Automation (Alertas y Automatización)",
        purpose: "Real-time notifications and automated state transitions to ensure workflow continuity",
        alertTypes: [
          "Email Notifications: Status changes, approvals, rejections",
          "Visual Alerts: In-app banners, badges, color indicators",
          "System Alerts: Low inventory, overdue tasks, validation failures"
        ],
        automationRules: [
          "Status Transitions: Automatic progression based on completed actions",
          "Notifications: Triggered by state changes and user actions",
          "Escalations: Overdue task notifications to managers"
        ]
      }
    ]
  },

  implementationPatterns: {
    configurationTabsPattern: {
      description: "Official Law Pattern for all configuration pages",
      structure: `
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export default function ConfigurationTabs() {
  const t = useTranslations('ConfigurationNamespace');

  const tabs = [
    {
      value: 'tab-key-1',
      label: t('tabs.tab_key_1'),
      component: <TabComponent1 />
    }
    // ... more tabs
  ];

  return (
    <Tabs defaultValue="first-tab-key" className="w-full space-y-4">
      <div className="w-full">
        <TabsList className={cn(
          "inline-flex h-auto w-full flex-wrap justify-start bg-muted p-1",
          "gap-1"
        )}>
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.value} 
              value={tab.value}
              className={cn(
                "flex-shrink-0 whitespace-nowrap px-3 py-1.5",
                "data-[state=active]:text-foreground",
                "min-w-fit"
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-6">
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
}`,
      mandatoryRequirements: [
        "MUST use tabs array with objects containing value, label, and component",
        "MUST use .map() to render both TabsTrigger and TabsContent", 
        "NO hardcoded individual tab components allowed",
        "MUST follow exact styling classes from pattern"
      ]
    },

    dataOperationsPattern: {
      description: "Complete CRUD operations with server-side filtering and pagination",
      serverSidePattern: `
export async function EntityListingPage({}) {
  // Get search parameters including pagination
  const search = searchParamsCache.get('name');
  const filters = searchParamsCache.get('filter_param');
  const page = searchParamsCache.get('page') ?? 1;
  const perPage = searchParamsCache.get('perPage') ?? 10;

  // Step 1: Apply filtering logic first
  let filteredData = entityData;
  
  if (search) {
    filteredData = filteredData.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Step 2: Calculate pagination AFTER filtering
  const totalItems = filteredData.length;
  const offset = (page - 1) * perPage;
  const paginatedData = filteredData.slice(offset, offset + perPage);

  return <EntityTable data={paginatedData} totalItems={totalItems} />;
}`,
      criticalRule: "ALWAYS filter first, then paginate. Use filtered data length for totalItems."
    }
  },

  businessKPIs: {
    performanceTargets: [
      "Page load: <2s",
      "API response: <500ms", 
      "Concurrent users: 100+",
      "Uptime: 99.9%"
    ],
    businessMetrics: [
      "Request processing time",
      "Formulation approval rate",
      "Sample delivery accuracy",
      "User adoption rate"
    ]
  },

  phase2Expansion: {
    additionalModules: [
      "History & Traceability - Complete audit trails and version control",
      "Processes & Resources - Production processes, machines, operational resources",
      "Production Orders - Scheduling and execution of sample production orders",
      "Sample Delivery - Sample delivery tracking with quality control integration", 
      "Process Tracking - Area-specific dashboards for monitoring progress",
      "Operational Inventory - Full inventory management with SAP integration"
    ]
  },

  integrationPoints: {
    databases: ["PostgreSQL (primary)", "SAP (read-only integration)"],
    authentication: "Azure Active Directory with SSO",
    apis: "Next.js API Routes + Server Actions",
    notifications: "Email + In-app notifications",
    fileStorage: "File attachment system for requests"
  }
};

export default vitracoatBusinessModel;