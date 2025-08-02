export default `# Vitracoat Request Forms Architecture - Chemical Industry Specialized Forms

This document details the advanced multi-step form architecture for Vitracoat's chemical coating request system, featuring dynamic workflows, conditional sections, and industry-specific validation patterns.

## 🏗️ Form Architecture Overview

### Multi-Step Structure
1. **Basic Info** (shared across all request types)
2. **Request Type Selection** (determines subsequent steps)
3. **Type-Specific Sections** (dynamic based on selection)
4. **Notes & Files** (shared completion step)

### Request Type Matrix
| Type | Full Name | Purpose | Complexity |
|------|-----------|---------|------------|
| **LWR** | Laboratory Work Request | Product development | High (8 sections) |
| **TLWR** | Testing Laboratory Work Request | Testing services | Medium (6 sections) |
| **VLWR** | Vitracoat Laboratory Work Request | Internal testing | High (9 sections) |
| **Micro Production** | Small Batch Production | Limited production runs | Low (2 sections) |

## 📋 Form Sections Architecture

### Section 1: Basic Information (Shared)
**Purpose:** Common request metadata across all types

\`\`\`typescript
interface BasicInfo {
  laboratory: Laboratory;        // Drives business logic
  customer: Customer;           // Client selection
  salesAgent: SalesAgent;       // Auto-assigned by role
  dateCreated: Date;            // Auto-generated, hidden
  dateNeeded: Date;             // Validated by lab constraints
}

// Laboratory-based date constraints
const DATE_CONSTRAINTS = {
  'Houston': { min: 3, max: 15 },
  'Lerma': { min: 3, max: 15 },
  'M&M Houston': { min: 3, max: 5 }
};
\`\`\`

### Section 2: Request Type Selection
**Purpose:** Determines form flow and available sections

\`\`\`typescript
interface RequestTypeSelection {
  requestType: 'LWR' | 'TLWR' | 'VLWR' | 'MICRO_PRODUCTION';
  proposedProductName?: string;  // LWR only - becomes technical name
  productName?: string;          // TLWR, VLWR direct input
}
\`\`\`

## 🧪 LWR (Laboratory Work Request) Architecture

### Product Specification Section
**Complex product development requirements**

\`\`\`typescript
interface LWRProductSpec {
  targetSalesPrice: {
    amount: number;
    currency: 'USD' | 'MXN';  // Auto-set by laboratory
  };
  standardType: StandardType;
  standardCode: number;
  competition: Competition;
  chemistry: Chemistry;
  color: Color;
  finish: Finish;
  metallic: boolean;
  light: Light;
  substrate: Substrate | { type: 'other', value: string };
  preTreatment: PreTreatment;
  annualConsumption: {
    amount: number;
    unit: 'lbs';  // Fixed for LWR
  };
  marketSegmentation: MarketSegmentation;
  specificEndUse: string;
}
\`\`\`

### Application Parameters Section
**Process-specific configuration**

\`\`\`typescript
interface LWRApplicationParams {
  applicationMode: boolean;      // Recovery vs non-recovery
  applicationSystem: ApplicationSystem;
  applicationMethod: ApplicationMethod;
  applicationEquipment: ApplicationEquipment;
  dwellTime: {
    value: number;
    unit: 'minutes';
  };
  cureTime: {
    value: number;
    unit: 'minutes';
    required: true;
  };
  cureTemperature: {
    value: number;
    unit: '°F' | '°C';  // Based on laboratory location
    required: true;
  };
  ovenSet: {
    value: number;
    unit: '°F' | '°C';  // Based on laboratory location
  };
}
\`\`\`

### Panel Section
**Sample delivery specifications**

\`\`\`typescript
interface LWRPanelSection {
  clientSteelPanel: boolean;
  sellerSteelPanel: boolean;
  clientAluminumPanel: boolean;
  sellerAluminumPanel: boolean;
  clientPowderSample: boolean;
  sellerPowderSample: boolean;
  standard: boolean;
}
\`\`\`

### Contact Information Section
\`\`\`typescript
interface LWRContactInfo {
  contact: string;
  phone: string;
  direction: string;  // Address
  taxId: string;
}
\`\`\`

### Powder Properties Section
**Technical specifications for powder characteristics**

\`\`\`typescript
interface LWRPowderProperties {
  filmThickness: {
    value: number;
    unit: 'mil';
  };
  specificGravity: SpecificGravity;
  gloss60: Gloss;
  hardness: Hardness;
  indirectImpact: ImpactStandards;
  directImpact: ImpactStandards;
  flexibility: FlexibilityStandards;
  saltSpray: SaltSprayStandards;
  quv: QUVStandards;
  crTechnology: boolean;
  extraProperties: {
    enabled: boolean;
    description?: string;  // Conditional on enabled
  };
}
\`\`\`

## 🔬 TLWR (Testing Laboratory Work Request) Architecture

### Testing Information Section
\`\`\`typescript
interface TLWRTestingInfo {
  objective: TestObjectives;
  chemistry: Chemistry;
  finish: Finish;
  finalReport: boolean;
  supplier: Supplier;
}
\`\`\`

### Requirements Section
\`\`\`typescript
interface TLWRRequirements {
  enclosed: EnclosedTypes | { type: 'other', value: string };
  enclosedSpecifications: boolean;
  substrate: Substrate | { type: 'other', value: string };
}
\`\`\`

### Test Configuration Sections (Toggle-based)
**Dynamic sections based on test selection**

#### Salt Fog Test Configuration
\`\`\`typescript
interface SaltFogTestConfig {
  enabled: boolean;
  pretreatment?: PreTreatment;
  panelsPreparedBy?: PanelPreparation;
  exposureHours?: ExposureHours;
  whatToReport?: ReportTypes;
  reportFrequency?: ReportFrequency | { 
    type: 'custom', 
    days: number 
  };
}
\`\`\`

#### QUV Test Configuration
\`\`\`typescript
interface QUVTestConfig {
  enabled: boolean;
  lampType?: LampTypes | { type: 'other', value: string };
  panelsPreparedBy?: PanelPreparation;
  exposureHours?: ExposureHours;
  reportFrequency?: ReportFrequency | { 
    type: 'custom', 
    days: number 
  };
}
\`\`\`

#### Powder Sample Configuration
\`\`\`typescript
interface PowderSampleConfig {
  enabled: boolean;
  sampleSize?: {
    amount: number;
    unit: 'kg' | 'lb';
    // Validation: kg max 100, lb max 10
  };
  panelsAluminum?: CompositePanel;  // 3x6 default
  panelsSteel?: CompositePanel;     // 3x6 default
  colorChips?: CompositePanel;      // 2x2.5 default
}

interface CompositePanel {
  quantity: number;
  width: number;    // Default: 3
  height: number;   // Default: 6
}
\`\`\`

## 🏭 VLWR (Vitracoat Laboratory Work Request) Architecture

### Requirements Section
\`\`\`typescript
interface VLWRRequirements {
  materialToTest: MaterialTypes;  // New enum
  sampleId: number;
  supplier: Supplier;
  sds: boolean;  // Safety Data Sheet
  coa: boolean;  // Certificate of Analysis
  enclosed: EnclosedTypes | { type: 'other', value: string };
  numberOfPanels: CompositePanel;
  reasonOfTesting: TestObjectives;
  tds: boolean;  // Technical Data Sheet
  additionalInformation: {
    enabled: boolean;
    description?: string;
  };
  sampleAmount: {
    amount: number;
    unit: 'lbs';
  };
}
\`\`\`

### Conditional Evaluation Sections

#### Raw Material Evaluation
\`\`\`typescript
interface RawMaterialEvaluation {
  enabled: boolean;
  controlId?: string;
  additionalTests?: TestTypes;  // New enum
  testAsPer?: TestMatrixTypes;  // New enum
  finalReport?: boolean;
}
\`\`\`

#### Finished Powder Evaluation
\`\`\`typescript
interface FinishedPowderEvaluation {
  enabled: boolean;
  comparedTo?: string;
  manufacturer?: ManufacturerTypes;  // New enum
  otherEquipment?: Equipment;
}
\`\`\`

## ⚙️ Micro Production Architecture

### Production Details Section
\`\`\`typescript
interface MicroProductionDetails {
  product: {
    id: string;
    name: string;
    // Dialog shows full product details
  };
  sapId: string;
  zone: Zone;
  sampleSize: {
    amount: number;
    unit: 'kg';
    max: 150;  // Business rule: ≤150kg
  };
}

// Constraints
const MICRO_PRODUCTION_CONSTRAINTS = {
  laboratory: 'Lerma',  // Restricted to Lerma only
  approvalRequired: true,
  maxSize: 150,  // kg
  unit: 'kg'
};
\`\`\`

## 🌍 Laboratory-Based Business Logic

### Location-Driven Defaults and Constraints

\`\`\`typescript
const LABORATORY_RULES = {
  'Houston': {
    priceUnit: { currency: 'USD', weight: 'lb' },
    temperatureUnits: ['°C', '°F'],
    dateConstraints: { min: 3, max: 15 },
    microProduction: false
  },
  'M&M Houston': {
    priceUnit: { currency: 'USD', weight: 'lb' },
    temperatureUnits: ['°C', '°F'],
    dateConstraints: { min: 3, max: 5 },
    microProduction: false
  },
  'Lerma': {
    priceUnit: { currency: 'MXN', weight: 'kg' },
    temperatureUnits: ['°C'],
    dateConstraints: { min: 3, max: 15 },
    microProduction: true
  }
};
\`\`\`

### Dynamic Field Behavior

#### "Other" Option Pattern
\`\`\`typescript
interface ConditionalSelectField<T> {
  value: T | 'other';
  customValue?: string;  // Shown when value === 'other'
}

// Applied to: Substrate, Lamp Types, Enclosed Types
// Custom Report Frequency shows number input for days
\`\`\`

#### Composite Panel Pattern
\`\`\`typescript
interface CompositePanel {
  quantity: number;      // Required
  width: number;         // Default varies by context
  height: number;        // Default varies by context
  
  // Usage examples:
  // TLWR Aluminum/Steel: 3x6 default
  // TLWR Color Chips: 2x2.5 default
  // VLWR Number of Panels: 3x6 default
}
\`\`\`

## 🔄 Form State Management

### Multi-Step Form Hook Integration
\`\`\`typescript
interface VitracoatFormState {
  currentStep: number;
  completedSteps: Set<number>;
  formData: Partial<RequestFormData>;
  validationErrors: Record<string, string[]>;
  
  // Dynamic step calculation based on request type
  availableSteps: FormStep[];
  
  // Auto-save functionality
  lastSaved: Date;
  isDirty: boolean;
}

interface FormStep {
  id: string;
  title: string;
  component: React.ComponentType;
  isVisible: (formData: Partial<RequestFormData>) => boolean;
  isValid: (formData: Partial<RequestFormData>) => boolean;
}
\`\`\`

### Conditional Step Rendering
\`\`\`typescript
const getAvailableSteps = (requestType: RequestType, formData: any): FormStep[] => {
  const baseSteps = [
    { id: 'basic-info', title: 'Basic Information', ... },
    { id: 'request-type', title: 'Request Type', ... }
  ];
  
  switch (requestType) {
    case 'LWR':
      return [
        ...baseSteps,
        { id: 'product-spec', title: 'Product Specification', ... },
        { id: 'application-params', title: 'Application Parameters', ... },
        { id: 'panel-section', title: 'Panel Section', ... },
        { id: 'contact-info', title: 'Contact Information', ... },
        { id: 'powder-properties', title: 'Powder Properties', ... },
        { id: 'notes-files', title: 'Notes & Files', ... }
      ];
      
    case 'TLWR':
      const tlwrSteps = [
        ...baseSteps,
        { id: 'testing-info', title: 'Testing Information', ... },
        { id: 'requirements', title: 'Requirements', ... }
      ];
      
      // Add conditional test sections
      if (formData.saltFogTest) {
        tlwrSteps.push({ id: 'salt-fog-test', title: 'Salt Fog Test', ... });
      }
      if (formData.quvTest) {
        tlwrSteps.push({ id: 'quv-test', title: 'QUV Test', ... });
      }
      if (formData.powderSample) {
        tlwrSteps.push({ id: 'powder-sample', title: 'Powder Sample', ... });
      }
      
      return [...tlwrSteps, { id: 'notes-files', title: 'Notes & Files', ... }];
      
    // Similar logic for VLWR and Micro Production
  }
};
\`\`\`

## 📊 Validation & Error Handling

### Field-Level Validation Rules
\`\`\`typescript
const VALIDATION_RULES = {
  sampleSize: {
    TLWR: {
      kg: { max: 100, message: 'Maximum 100 kg for powder samples' },
      lb: { max: 10, message: 'Maximum 10 lb for powder samples' }
    }
  },
  microProduction: {
    maxSize: 150,
    unit: 'kg',
    laboratory: 'Lerma'
  },
  dateNeeded: {
    minDays: (lab: Laboratory) => LABORATORY_RULES[lab].dateConstraints.min,
    maxDays: (lab: Laboratory) => LABORATORY_RULES[lab].dateConstraints.max
  }
};
\`\`\`

### Cross-Section Validation
\`\`\`typescript
interface CrossSectionValidation {
  // Ensure micro production constraints
  validateMicroProduction: (formData: FormData) => ValidationResult;
  
  // Validate laboratory-specific rules
  validateLaboratoryRules: (formData: FormData) => ValidationResult;
  
  // Ensure required test configurations are complete
  validateTestConfigurations: (formData: FormData) => ValidationResult;
}
\`\`\`

This Vitracoat request forms architecture represents a sophisticated multi-step form system designed specifically for the chemical coating industry, with deep domain knowledge embedded in every validation rule and business logic constraint.`;