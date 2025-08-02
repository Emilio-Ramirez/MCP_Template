export default `# Vitracoat Configuration Management System - Enterprise Admin Architecture

This document details the comprehensive configuration management system for Vitracoat's chemical coating ERP, featuring 5 specialized configuration pages with 29 total configuration tabs for complete business domain coverage.

## 🏗️ Configuration System Architecture

### Overview
The Vitracoat configuration system manages all administrative data through a centralized, tabbed interface organized by business domain. Each configuration page follows the standardized "Law Pattern" for consistency and maintainability.

### System Structure
- **5 Main Pages:** Each focused on a specific business domain
- **29 Total Tabs:** Granular configuration management
- **Unified Component Pattern:** Reusable components across all pages
- **Role-Based Access:** Administrative permissions and audit trails

## 📋 Configuration Pages Structure

### Page 1: Product Configuration
**URL:** \`/product-configuration\`  
**Purpose:** Core product and specification management  
**Access Level:** Product Manager, Admin

#### Configuration Tabs (6 total)
\`\`\`typescript
interface ProductConfigurationTabs {
  standardTypes: {
    title: 'Standard Types';
    description: 'Base product standards and specifications';
    fields: ['name', 'code', 'description', 'category', 'isActive'];
  };
  
  chemistryTypes: {
    title: 'Chemistry Types';
    description: 'Chemical composition categories';
    fields: ['name', 'chemicalFamily', 'description', 'safetyClass', 'isActive'];
  };
  
  colorCodes: {
    title: 'Color Codes';
    description: 'RAL and custom color specifications';
    fields: ['colorCode', 'colorName', 'ralCode', 'hexValue', 'colorFamily', 'isActive'];
  };
  
  finishTypes: {
    title: 'Finish Types';
    description: 'Surface finish categories (gloss, texture, etc.)';
    fields: ['name', 'glossLevel', 'textureType', 'description', 'isActive'];
  };
  
  metallicTypes: {
    title: 'Metallic Types';
    description: 'Metallic powder specifications';
    fields: ['name', 'metallicContent', 'particleSize', 'description', 'isActive'];
  };
  
  lightSpecifications: {
    title: 'Light Specifications';
    description: 'Lighting and appearance standards';
    fields: ['name', 'lightSource', 'angle', 'conditions', 'description', 'isActive'];
  };
}
\`\`\`

### Page 2: Materials & Testing
**URL:** \`/materials-processes\`  
**Purpose:** Materials, suppliers, and testing configuration  
**Access Level:** Lab Manager, Quality Manager, Admin

#### Configuration Tabs (7 total)
\`\`\`typescript
interface MaterialsTestingTabs {
  substrateTypes: {
    title: 'Substrate Types';
    description: 'Base material specifications';
    fields: ['name', 'material', 'thickness', 'properties', 'applications', 'isActive'];
  };
  
  preTreatmentTypes: {
    title: 'Pre-Treatment Types';
    description: 'Surface preparation methods';
    fields: ['name', 'process', 'chemicals', 'temperature', 'duration', 'isActive'];
  };
  
  suppliers: {
    title: 'Suppliers';
    description: 'Approved supplier database';
    fields: ['name', 'contact', 'materials', 'certification', 'rating', 'isActive'];
  };
  
  lampTypes: {
    title: 'Lamp Types';
    description: 'Testing equipment lamp specifications';
    fields: ['name', 'lampType', 'wavelength', 'intensity', 'lifespan', 'isActive'];
  };
  
  reportTypes: {
    title: 'Report Types';
    description: 'Quality control report categories';
    fields: ['name', 'category', 'template', 'frequency', 'recipients', 'isActive'];
  };
  
  reportFrequency: {
    title: 'Report Frequency';
    description: 'Testing and reporting schedules';
    fields: ['name', 'interval', 'unit', 'description', 'isActive'];
  };
  
  competitors: {
    title: 'Competitors';
    description: 'Competitor database and analysis';
    fields: ['name', 'products', 'marketShare', 'strengths', 'weaknesses', 'isActive'];
  };
}
\`\`\`

### Page 3: Operations & Geography
**URL:** \`/operations-geography\`  
**Purpose:** Operational locations and systems management  
**Access Level:** Operations Manager, Admin

#### Configuration Tabs (3 total)
\`\`\`typescript
interface OperationsGeographyTabs {
  laboratoryLocations: {
    title: 'Laboratory Locations';
    description: 'Testing facility locations and capabilities';
    fields: ['name', 'address', 'capabilities', 'equipment', 'manager', 'isActive'];
    
    // Predefined locations
    locations: [
      {
        name: 'Lerma',
        country: 'Mexico',
        capabilities: ['Formulation', 'Testing', 'MicroProduction'],
        defaultCurrency: 'MXN',
        defaultUnit: 'kg',
        temperatureUnits: ['°C']
      },
      {
        name: 'Houston',
        country: 'USA',
        capabilities: ['Testing', 'Analysis'],
        defaultCurrency: 'USD',
        defaultUnit: 'lb',
        temperatureUnits: ['°C', '°F']
      },
      {
        name: 'M&M Houston',
        country: 'USA',
        capabilities: ['SpecializedTesting'],
        defaultCurrency: 'USD',
        defaultUnit: 'lb',
        temperatureUnits: ['°C', '°F']
      }
    ];
  };
  
  zones: {
    title: 'Zones';
    description: 'Geographical business zones';
    fields: ['name', 'country', 'region', 'manager', 'laboratories', 'isActive'];
  };
  
  systems: {
    title: 'Systems';
    description: 'Integrated business systems';
    fields: ['name', 'type', 'version', 'integration', 'status', 'isActive'];
    
    systemTypes: ['ERP', 'CRM', 'LIMS', 'QMS', 'WMS', 'MES'];
  };
}
\`\`\`

### Page 4: Application & Equipment
**URL:** \`/equipment-market\`  
**Purpose:** Application processes and equipment configuration  
**Access Level:** Process Engineer, Equipment Manager, Admin

#### Configuration Tabs (8 total)
\`\`\`typescript
interface ApplicationEquipmentTabs {
  applicationEquipment: {
    title: 'Application Equipment';
    description: 'Powder application machinery specifications';
    fields: ['name', 'type', 'manufacturer', 'model', 'specifications', 'isActive'];
  };
  
  marketSegmentation: {
    title: 'Market Segmentation';
    description: 'Business market categories and targets';
    fields: ['name', 'industry', 'applications', 'volume', 'characteristics', 'isActive'];
  };
  
  testObjectives: {
    title: 'Test Objectives';
    description: 'Quality testing goals and methodologies';
    fields: ['name', 'purpose', 'method', 'criteria', 'standards', 'isActive'];
  };
  
  panelPreparation: {
    title: 'Panel Preparation';
    description: 'Test panel preparation methods and standards';
    fields: ['name', 'substrate', 'process', 'conditions', 'quality', 'isActive'];
  };
  
  enclosedTypes: {
    title: 'Enclosed Types';
    description: 'Container and packaging specifications';
    fields: ['name', 'material', 'size', 'capacity', 'sealType', 'isActive'];
  };
  
  applicationMode: {
    title: 'Application Mode';
    description: 'Recovery vs non-recovery system configurations';
    fields: ['name', 'type', 'efficiency', 'requirements', 'benefits', 'isActive'];
    
    modes: ['Recovery', 'Non-Recovery', 'Hybrid'];
  };
  
  applicationSystem: {
    title: 'Application System';
    description: 'Manual, automated, or robotic application systems';
    fields: ['name', 'automation', 'capacity', 'precision', 'maintenance', 'isActive'];
    
    systems: ['Manual', 'Semi-Automated', 'Fully Automated', 'Robotic'];
  };
  
  applicationMethod: {
    title: 'Application Method';
    description: 'Corona, tribo, or fluid bed application methods';
    fields: ['name', 'principle', 'voltage', 'efficiency', 'suitability', 'isActive'];
    
    methods: ['Corona', 'Tribo', 'Fluid Bed', 'Electrostatic', 'Hot Flocking'];
  };
}
\`\`\`

### Page 5: Testing Standards
**URL:** \`/testing-standards\`  
**Purpose:** Quality control and testing protocols  
**Access Level:** Quality Manager, Lab Technician, Admin

#### Configuration Tabs (5 total)
\`\`\`typescript
interface TestingStandardsTabs {
  hardnessStandards: {
    title: 'Hardness Standards';
    description: 'Durability and scratch resistance protocols';
    fields: ['name', 'method', 'scale', 'conditions', 'acceptance', 'isActive'];
    
    methods: ['Pencil Hardness', 'Buchholz', 'Shore', 'Vickers'];
  };
  
  impactStandards: {
    title: 'Impact Standards';
    description: 'Impact resistance testing specifications';
    fields: ['name', 'method', 'energy', 'conditions', 'criteria', 'isActive'];
    
    methods: ['Direct Impact', 'Indirect Impact', 'Falling Weight', 'Gardner'];
  };
  
  saltSprayStandards: {
    title: 'Salt Spray Standards';
    description: 'Corrosion resistance testing protocols';
    fields: ['name', 'standard', 'duration', 'solution', 'conditions', 'isActive'];
    
    standards: ['ASTM B117', 'ISO 9227', 'ASTM D1654', 'Custom'];
  };
  
  quvStandards: {
    title: 'QUV Standards';
    description: 'UV weathering test protocols and conditions';
    fields: ['name', 'lampType', 'irradiance', 'temperature', 'humidity', 'isActive'];
    
    lampTypes: ['UVA-340', 'UVB-313', 'UVA-351', 'Custom'];
  };
  
  flexibilityStandards: {
    title: 'Flexibility Standards';
    description: 'Flexibility and bend testing protocols';
    fields: ['name', 'method', 'mandrel', 'conditions', 'evaluation', 'isActive'];
    
    methods: ['Mandrel Bend', 'Impact Bend', 'Cylindrical Bend', 'Conical Bend'];
  };
}
\`\`\`

## 🎯 Products Catalog Integration

### Products Page
**URL:** \`/products\`  
**Purpose:** Catalog of finished products from completed LWR requests

\`\`\`typescript
interface ProductsCatalog {
  features: {
    productSpecifications: 'Complete technical specifications';
    formulationData: 'Linked formulation history';
    technicalDataSheets: 'Downloadable TDS documents';
    statusTracking: 'Active, Development, Discontinued states';
    originTracking: 'Link to originating LWR request';
    searchAndFilter: 'Advanced filtering capabilities';
  };
  
  productStates: ['Active', 'Development', 'Discontinued', 'OnHold'];
  
  integration: {
    lwrRequests: 'Auto-populated from completed LWRs';
    formulations: 'Linked to approved formulations';
    qualityData: 'Testing results and certifications';
    commercialData: 'Pricing and market information';
  };
}
\`\`\`

## 🔧 Technical Implementation Patterns

### Component Architecture
**Standardized "Law Pattern" across all configuration pages**

\`\`\`typescript
// Base configuration page structure
interface ConfigurationPageStructure {
  layout: 'TabsLayout';
  components: {
    ConfigurationTable: 'Reusable data table with CRUD operations';
    ConfigurationItemDialog: 'Unified create/edit modal';
    TabNavigation: 'Responsive tab layout with flex-wrap';
    SearchAndFilter: 'Advanced filtering capabilities';
  };
  
  styling: {
    consistentClasses: 'Unified Tailwind class patterns';
    responsiveDesign: 'Mobile-first responsive layout';
    rowDivisions: 'Improved table readability';
    darkModeSupport: 'Complete dark theme integration';
  };
}
\`\`\`

### Data Management Pattern
\`\`\`typescript
interface ConfigurationItem {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  
  // Type-specific fields
  [key: string]: any;
}

interface ConfigurationOperations {
  create: (item: Omit<ConfigurationItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<ConfigurationItem>;
  update: (id: string, updates: Partial<ConfigurationItem>) => Promise<ConfigurationItem>;
  delete: (id: string) => Promise<void>;
  toggleStatus: (id: string) => Promise<ConfigurationItem>;
  search: (query: string, filters: Record<string, any>) => Promise<ConfigurationItem[]>;
}
\`\`\`

### Internationalization Structure
\`\`\`typescript
// Translation structure for configuration pages
interface ConfigurationTranslations {
  [pageName: string]: {
    title: string;
    description: string;
    tabs: {
      [tabName: string]: {
        title: string;
        description: string;
        fields: {
          [fieldName: string]: string;
        };
        actions: {
          create: string;
          edit: string;
          delete: string;
          activate: string;
          deactivate: string;
        };
        messages: {
          created: string;
          updated: string;
          deleted: string;
          error: string;
        };
      };
    };
  };
}
\`\`\`

## 🔐 Access Control & Permissions

### Role-Based Configuration Access
\`\`\`typescript
interface ConfigurationPermissions {
  productConfiguration: {
    view: ['ProductManager', 'Admin', 'QualityManager'];
    edit: ['ProductManager', 'Admin'];
    delete: ['Admin'];
  };
  
  materialsTesting: {
    view: ['LabManager', 'QualityManager', 'Admin', 'Technician'];
    edit: ['LabManager', 'QualityManager', 'Admin'];
    delete: ['LabManager', 'Admin'];
  };
  
  operationsGeography: {
    view: ['OperationsManager', 'Admin', 'Manager'];
    edit: ['OperationsManager', 'Admin'];
    delete: ['Admin'];
  };
  
  applicationEquipment: {
    view: ['ProcessEngineer', 'EquipmentManager', 'Admin'];
    edit: ['ProcessEngineer', 'EquipmentManager', 'Admin'];
    delete: ['Admin'];
  };
  
  testingStandards: {
    view: ['QualityManager', 'LabTechnician', 'Admin'];
    edit: ['QualityManager', 'Admin'];
    delete: ['Admin'];
  };
}
\`\`\`

### Audit Trail System
\`\`\`typescript
interface ConfigurationAudit {
  id: string;
  table: string;
  recordId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'ACTIVATE' | 'DEACTIVATE';
  oldValues: Record<string, any>;
  newValues: Record<string, any>;
  userId: string;
  userRole: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
}
\`\`\`

## 📊 Configuration Dependencies & Relationships

### Cross-Page Dependencies
\`\`\`typescript
interface ConfigurationDependencies {
  // Product Configuration drives form field options
  productToForms: {
    standardTypes: ['LWR.productSpec.standardType'];
    chemistryTypes: ['LWR.productSpec.chemistry', 'TLWR.testingInfo.chemistry'];
    colorCodes: ['LWR.productSpec.color'];
    finishTypes: ['LWR.productSpec.finish', 'TLWR.testingInfo.finish'];
  };
  
  // Materials & Testing provides supplier and testing options
  materialsToForms: {
    substrateTypes: ['LWR.productSpec.substrate', 'TLWR.requirements.substrate'];
    suppliers: ['TLWR.testingInfo.supplier', 'VLWR.requirements.supplier'];
    lampTypes: ['TLWR.quvTest.lampType', 'VLWR.quvTest.lampType'];
  };
  
  // Operations defines available laboratories and zones
  operationsToForms: {
    laboratoryLocations: ['BasicInfo.laboratory'];
    zones: ['MicroProduction.zone'];
  };
}
\`\`\`

### Data Validation Rules
\`\`\`typescript
interface ConfigurationValidation {
  uniqueConstraints: {
    name: 'Must be unique within tab';
    code: 'Must be unique within system';
  };
  
  requiredFields: {
    name: 'Required for all items';
    description: 'Required for all items';
  };
  
  businessRules: {
    activeItems: 'At least one item must remain active';
    usedItems: 'Cannot delete items in use by forms';
    dependencies: 'Cannot deactivate items with active dependencies';
  };
}
\`\`\`

This comprehensive configuration management system provides complete administrative control over all aspects of the Vitracoat chemical coating business, ensuring consistency, traceability, and regulatory compliance across all operations.`;