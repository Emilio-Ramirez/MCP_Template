export default `# Vitracoat Micro Production Workflow - Chemical Industry Small Batch Operations

This document details the specialized micro production workflow for Vitracoat's chemical coating operations, featuring approval-based small batch manufacturing with strict business rules and quality controls.

## 🏭 Micro Production Overview

### Business Definition
**Micro Production** refers to small batch production runs of ≤150kg specifically for sample delivery, product validation, or limited market testing. This specialized workflow requires enhanced approval processes and quality controls due to the custom nature and smaller economies of scale.

### Key Characteristics
- **Size Limitation:** Maximum 150kg per batch
- **Location Restriction:** Only available at Lerma facility
- **Approval Required:** Mandatory management approval
- **Quality Focus:** Enhanced QC protocols for small batches
- **Cost Consideration:** Higher per-unit costs due to scale

## 📋 Micro Production Request Architecture

### Form Structure
Unlike standard LWR requests, micro production follows a streamlined but rigorous process:

\`\`\`typescript
interface MicroProductionRequest {
  // Inherited from BasicInfo
  laboratory: 'Lerma';  // Fixed - only Lerma supports micro production
  customer: Customer;
  salesAgent: SalesAgent;
  dateNeeded: Date;
  
  // Micro Production Specific
  productionDetails: {
    product: ProductReference;  // Links to existing product from catalog
    sapId: string;             // ERP integration identifier
    zone: Zone;                // Geographical business zone
    sampleSize: {
      amount: number;          // ≤150kg enforced
      unit: 'kg';             // Fixed unit for micro production
    };
  };
  
  // Standard completion
  notes: string;
  attachments: File[];
}

interface ProductReference {
  id: string;
  name: string;
  technicalName: string;
  formulation: FormulationReference;
  lastProduced: Date;
  qualityStatus: 'Validated' | 'RequiresRevalidation';
}
\`\`\`

## 🔄 Micro Production Workflow States

### State Machine Architecture
\`\`\`typescript
enum MicroProductionStatus {
  // Initial states
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  
  // Approval phase
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  MANAGER_REVIEW = 'MANAGER_REVIEW',
  PLANT_APPROVAL = 'PLANT_APPROVAL',
  
  // Pre-production phase
  APPROVED = 'APPROVED',
  MATERIAL_VALIDATION = 'MATERIAL_VALIDATION',
  FORMULATION_VERIFIED = 'FORMULATION_VERIFIED',
  PRODUCTION_SCHEDULED = 'PRODUCTION_SCHEDULED',
  
  // Production phase
  IN_PRODUCTION = 'IN_PRODUCTION',
  QUALITY_CONTROL = 'QUALITY_CONTROL',
  BATCH_VALIDATION = 'BATCH_VALIDATION',
  
  // Completion phase
  READY_FOR_DELIVERY = 'READY_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  
  // Exception states
  APPROVAL_REJECTED = 'APPROVAL_REJECTED',
  PRODUCTION_FAILED = 'PRODUCTION_FAILED',
  QUALITY_REJECTED = 'QUALITY_REJECTED',
  CANCELLED = 'CANCELLED'
}
\`\`\`

### State Transition Rules
\`\`\`typescript
interface StateTransitionRules {
  SUBMITTED: {
    auto: 'PENDING_APPROVAL';
    triggers: ['form_submission'];
    notifications: ['manager_notification'];
  };
  
  PENDING_APPROVAL: {
    manual: ['MANAGER_REVIEW', 'APPROVAL_REJECTED'];
    timeoutDays: 2;
    escalation: 'plant_manager';
  };
  
  MANAGER_REVIEW: {
    manual: ['PLANT_APPROVAL', 'APPROVAL_REJECTED'];
    requiredRole: 'ZONE_MANAGER';
    businessRules: ['validate_batch_size', 'check_capacity'];
  };
  
  PLANT_APPROVAL: {
    manual: ['APPROVED', 'APPROVAL_REJECTED'];
    requiredRole: 'PLANT_MANAGER';
    businessRules: ['validate_production_feasibility', 'check_material_availability'];
  };
  
  APPROVED: {
    auto: 'MATERIAL_VALIDATION';
    triggers: ['approval_complete'];
    actions: ['reserve_materials', 'create_production_order'];
  };
}
\`\`\`

## 🎯 Business Rules & Constraints

### Size and Location Constraints
\`\`\`typescript
const MICRO_PRODUCTION_CONSTRAINTS = {
  // Size limitations
  maxBatchSize: 150,  // kg
  minBatchSize: 1,    // kg
  unit: 'kg',         // Fixed unit
  
  // Location restrictions
  allowedLaboratories: ['Lerma'],
  restrictedLaboratories: ['Houston', 'M&M Houston'],
  
  // Approval requirements
  approvalThresholds: {
    '1-50kg': ['ZONE_MANAGER'],
    '51-100kg': ['ZONE_MANAGER', 'PRODUCTION_MANAGER'],
    '101-150kg': ['ZONE_MANAGER', 'PRODUCTION_MANAGER', 'PLANT_MANAGER']
  },
  
  // Timeline constraints
  minimumLeadTime: 5,  // days
  maximumLeadTime: 30, // days
  
  // Quality requirements
  mandatoryTests: ['batch_validation', 'quality_control', 'final_inspection'],
  documentationRequired: ['batch_record', 'quality_certificate', 'coa']
};
\`\`\`

### Product Eligibility Rules
\`\`\`typescript
interface ProductEligibilityRules {
  // Product must exist in catalog
  requiredStatus: 'Active' | 'Validated';
  
  // Formulation requirements
  formulation: {
    status: 'Approved';
    lastValidated: 'within_12_months';
    qualityGate: 'passed';
  };
  
  // Previous production history
  productionHistory: {
    required: false;  // Can be first production
    preferredExists: true;  // Easier approval if previously produced
  };
  
  // Material availability
  materialRequirements: {
    stockCheck: 'required';
    alternativesAllowed: false;  // Must use exact formulation
    reservationRequired: true;
  };
}
\`\`\`

## 🏗️ Production Planning Integration

### SAP Integration Architecture
\`\`\`typescript
interface SAPIntegration {
  // Material Requirements Planning
  mrp: {
    stockVerification: 'real_time';
    materialReservation: 'automatic_on_approval';
    costingUpdate: 'batch_specific';
  };
  
  // Production Order Creation
  productionOrder: {
    orderType: 'MP';  // Micro Production
    planningStrategy: 'make_to_order';
    batchSize: 'exact_quantity';
    qualityInspection: 'mandatory';
  };
  
  // Cost Accounting
  costAccounting: {
    costCenter: 'micro_production';
    overhead: 'enhanced_rate';  // Higher overhead for small batches
    tracking: 'job_order_costing';
  };
}
\`\`\`

### Production Scheduling Rules
\`\`\`typescript
interface ProductionSchedulingRules {
  // Capacity planning
  dailyCapacity: {
    microProductionSlots: 2;  // Maximum 2 micro batches per day
    standardBatchImpact: 'minimal';  // Should not impact standard production
  };
  
  // Sequencing rules
  sequencing: {
    colorChanges: 'minimize';
    chemistryGroups: 'batch_together';
    cleaningTime: 'extended_for_micro';
  };
  
  // Equipment allocation
  equipment: {
    dedicatedLines: false;  // Use standard equipment with special setup
    cleaningProtocol: 'enhanced';
    validationRequired: 'before_and_after';
  };
}
\`\`\`

## 🔬 Quality Control Enhancements

### Enhanced QC Protocol for Micro Production
\`\`\`typescript
interface MicroProductionQualityControl {
  // Pre-production validation
  preProduction: {
    materialInspection: 'enhanced';  // 100% incoming inspection
    equipmentValidation: 'required';
    processValidation: 'documented';
  };
  
  // In-process monitoring
  inProcess: {
    samplingFrequency: 'increased';  // More frequent than standard
    parameterMonitoring: 'continuous';
    deviationResponse: 'immediate_hold';
  };
  
  // Post-production testing
  postProduction: {
    fullTestSuite: 'mandatory';  // Cannot skip any tests
    retainSample: 'extended_period';  // Longer retention
    certificateGeneration: 'automatic';
  };
  
  // Documentation requirements
  documentation: {
    batchRecord: 'detailed';
    qualityCertificate: 'comprehensive';
    coa: 'complete_analysis';
    processDeviations: 'fully_documented';
  };
}
\`\`\`

### Quality Gates and Hold Points
\`\`\`typescript
interface QualityGates {
  gate1_MaterialApproval: {
    trigger: 'material_received';
    requirements: ['incoming_inspection', 'coa_verification'];
    holdPoint: true;
  };
  
  gate2_ProcessApproval: {
    trigger: 'before_production';
    requirements: ['equipment_validation', 'process_parameters'];
    holdPoint: true;
  };
  
  gate3_InProcessApproval: {
    trigger: 'mid_production';
    requirements: ['parameter_check', 'visual_inspection'];
    holdPoint: false;  // Can continue with monitoring
  };
  
  gate4_FinalApproval: {
    trigger: 'production_complete';
    requirements: ['full_testing', 'specification_compliance'];
    holdPoint: true;
  };
  
  gate5_ReleaseApproval: {
    trigger: 'before_delivery';
    requirements: ['final_inspection', 'documentation_complete'];
    holdPoint: true;
  };
}
\`\`\`

## 📊 Cost Structure & Pricing

### Micro Production Cost Model
\`\`\`typescript
interface MicroProductionCostModel {
  // Direct costs
  directCosts: {
    materials: 'actual_usage';  // No economies of scale
    labor: 'enhanced_rate';     // Higher labor intensity
    utilities: 'allocated_actual';
  };
  
  // Overhead allocation
  overhead: {
    setupCosts: 'full_allocation';  // Setup costs per batch
    qualityCosts: 'enhanced_rate';  // More intensive QC
    facilityCosts: 'standard_rate';
  };
  
  // Special charges
  specialCharges: {
    approvalProcess: 'administrative_fee';
    schedulingPremium: 'flexibility_charge';
    documentationFee: 'enhanced_documentation';
    rushOrderFee: 'conditional';  // If urgent
  };
  
  // Pricing strategy
  pricingStrategy: {
    minimumBatch: 'minimum_order_value';
    scaleFactors: 'decreasing_efficiency';
    customerTier: 'premium_pricing';
  };
}
\`\`\`

## 🚨 Exception Handling & Escalation

### Exception Scenarios
\`\`\`typescript
interface ExceptionHandling {
  materialShortage: {
    detection: 'automatic_during_reservation';
    actions: ['notify_requestor', 'suggest_alternatives', 'delay_notification'];
    escalation: 'procurement_manager';
  };
  
  equipmentFailure: {
    detection: 'real_time_monitoring';
    actions: ['immediate_hold', 'assess_impact', 'reschedule'];
    escalation: 'production_manager';
  };
  
  qualityFailure: {
    detection: 'quality_gates';
    actions: ['batch_hold', 'investigation', 'disposition'];
    escalation: 'quality_manager';
  };
  
  approvalTimeout: {
    detection: 'automated_monitoring';
    actions: ['reminder_notifications', 'escalation'];
    escalation: 'next_level_manager';
  };
}
\`\`\`

### Escalation Matrix
\`\`\`typescript
interface EscalationMatrix {
  level1: {
    roles: ['ZONE_MANAGER'];
    timeframe: '24_hours';
    authority: ['approve_up_to_50kg', 'standard_scheduling'];
  };
  
  level2: {
    roles: ['PRODUCTION_MANAGER'];
    timeframe: '48_hours';
    authority: ['approve_up_to_100kg', 'expedite_scheduling'];
  };
  
  level3: {
    roles: ['PLANT_MANAGER'];
    timeframe: '72_hours';
    authority: ['approve_up_to_150kg', 'override_scheduling'];
  };
  
  level4: {
    roles: ['OPERATIONS_DIRECTOR'];
    timeframe: 'immediate';
    authority: ['emergency_approval', 'resource_reallocation'];
  };
}
\`\`\`

## 📈 Performance Metrics & KPIs

### Micro Production KPIs
\`\`\`typescript
interface MicroProductionKPIs {
  // Operational metrics
  operational: {
    batchCompletionRate: 'target_95_percent';
    onTimeDelivery: 'target_90_percent';
    firstPassQuality: 'target_98_percent';
    approvalCycleTime: 'target_48_hours';
  };
  
  // Financial metrics
  financial: {
    costPerKg: 'track_trend';
    overheadAllocation: 'monitor_efficiency';
    pricingAccuracy: 'target_plus_minus_5_percent';
  };
  
  // Quality metrics
  quality: {
    customerComplaintsRate: 'target_less_than_1_percent';
    reworkRate: 'target_less_than_2_percent';
    documentationAccuracy: 'target_99_percent';
  };
  
  // Customer satisfaction
  customerSatisfaction: {
    deliveryPerformance: 'track_monthly';
    qualityRating: 'track_monthly';
    processRating: 'track_quarterly';
  };
}
\`\`\`

This micro production workflow ensures that small batch chemical coating operations maintain the highest quality standards while providing the flexibility needed for product development, validation, and specialized customer requirements in the powder coating industry.`;