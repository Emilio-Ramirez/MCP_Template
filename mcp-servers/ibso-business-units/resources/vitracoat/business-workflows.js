export default `# Vitracoat Business Workflows - Chemical Industry Operations

## 🧪 Overview

This document outlines the complete business workflows for Vitracoat's chemical coating management system, covering the four primary request types and their associated business processes.

## 📋 Request Type Classifications

### Core Request Types

\`\`\`typescript
enum RequestType {
  LWR = 'Laboratory Work Request',      // Product development
  TLWR = 'Testing Laboratory Work Request', // Testing services
  VLWR = 'Vitracoat Laboratory Work Request', // Internal testing
  MICRO = 'Micro Production'            // Small batch production
}
\`\`\`

## 🔬 LWR (Laboratory Work Request) - Product Development

### Business Purpose
- **Primary Use**: New product formulation development
- **Target Audience**: External clients requiring custom coating solutions
- **Laboratory Assignment**: All laboratories (Lerma, Houston, M&M Houston)
- **Typical Timeline**: 7-15 business days depending on complexity

### Workflow Stages

\`\`\`
Client Request → Requirements Analysis → Formulation Development → 
Testing & Validation → Sample Production → Quality Review → Delivery
\`\`\`

### Key Business Rules

#### Laboratory-Based Defaults
\`\`\`typescript
interface LaboratoryDefaults {
  lerma: {
    units: {
      temperature: 'celsius';
      measurement: 'metric';
      currency: 'MXN';
    };
    processing_time: '7-10 business days';
    max_sample_size: 25; // kg
    available_tests: ['adhesion', 'flexibility', 'impact', 'salt_spray', 'qUV'];
  };
  
  houston: {
    units: {
      temperature: 'fahrenheit' | 'celsius'; // User choice
      measurement: 'imperial';
      currency: 'USD';
    };
    processing_time: '10-15 business days';
    max_sample_size: 50; // lbs
    available_tests: ['adhesion', 'flexibility', 'impact', 'salt_spray'];
  };
  
  mm_houston: {
    units: {
      temperature: 'fahrenheit' | 'celsius'; // User choice
      measurement: 'imperial';
      currency: 'USD';
    };
    processing_time: '10-15 business days';
    max_sample_size: 50; // lbs
    available_tests: ['adhesion', 'flexibility', 'impact', 'salt_spray', 'specialized_testing'];
  };
}
\`\`\`

#### Required Information Sections
1. **Basic Information**
   - Project name and description
   - Client contact information
   - Priority level (Low, Medium, High, Urgent)
   - Required delivery date

2. **Product Specifications**
   - Product type (powder coating category)
   - Finish type (gloss level, texture)
   - Color specifications (RAL, custom match)
   - Special properties required

3. **Testing Requirements**
   - Adhesion testing (required/optional)
   - Flexibility testing (mandrel bend)
   - Impact resistance
   - Salt spray duration (hours)
   - UV exposure testing

4. **Panel Specifications**
   - Substrate material and preparation
   - Panel dimensions (quantity × width × height)
   - Pre-treatment requirements

5. **Process Conditions**
   - Curing temperature and time
   - Application method
   - Film thickness requirements

## 🧪 TLWR (Testing Laboratory Work Request) - Testing Services

### Business Purpose
- **Primary Use**: Testing existing products or materials
- **Target Audience**: Clients with products requiring validation
- **Laboratory Assignment**: Primarily Houston and M&M Houston
- **Typical Timeline**: 5-10 business days

### Workflow Stages

\`\`\`
Testing Request → Sample Receipt → Test Protocol Setup → 
Testing Execution → Data Analysis → Report Generation → Client Delivery
\`\`\`

### Key Business Characteristics

#### Testing Protocol Requirements
\`\`\`typescript
interface TestingProtocol {
  standard_tests: {
    adhesion: 'ASTM D3359 (Cross-hatch adhesion)';
    flexibility: 'ASTM D522 (Mandrel bend test)';
    impact: 'ASTM D2794 (Direct/reverse impact)';
    salt_spray: 'ASTM B117 (Salt spray corrosion)';
    gloss: 'ASTM D523 (Specular gloss measurement)';
  };
  
  specialized_tests: {
    uv_exposure: 'ASTM G154 (UV fluorescent exposure)';
    xenon_arc: 'ASTM G155 (Xenon arc exposure)';
    chemical_resistance: 'ASTM D1308 (Chemical resistance)';
    hardness: 'ASTM D3363 (Pencil hardness)';
  };
  
  reporting_requirements: {
    format: 'PDF + Excel data';
    timeline: '2-3 business days after testing completion';
    language: 'English/Spanish based on client preference';
  };
}
\`\`\`

#### Sample Requirements
- **Minimum samples**: 3 panels per test
- **Panel size**: Standard 4" × 6" (adjustable)
- **Coating thickness**: Specified by client or standard
- **Curing conditions**: Must match production parameters

## 🔬 VLWR (Vitracoat Laboratory Work Request) - Internal Testing

### Business Purpose
- **Primary Use**: Internal quality control and R&D
- **Target Audience**: Internal Vitracoat operations
- **Laboratory Assignment**: Primarily Lerma
- **Typical Timeline**: 3-7 business days

### Workflow Stages

\`\`\`
Internal Request → Resource Allocation → Testing/Development → 
Internal Review → Documentation → Process Implementation
\`\`\`

### Key Business Characteristics

#### Internal Priorities
\`\`\`typescript
interface InternalPriorities {
  quality_control: {
    batch_verification: 'Routine quality checks on production batches';
    customer_complaints: 'Investigation of quality issues';
    process_validation: 'Verification of manufacturing processes';
  };
  
  research_development: {
    new_formulations: 'Development of new product lines';
    process_improvement: 'Optimization of existing processes';
    competitive_analysis: 'Analysis of competitor products';
  };
  
  regulatory_compliance: {
    certification_testing: 'Testing for industry certifications';
    regulatory_reporting: 'Data for regulatory submissions';
    safety_validation: 'Safety and environmental compliance';
  };
}
\`\`\`

## 🏭 MICRO (Micro Production) - Small Batch Production

### Business Purpose
- **Primary Use**: Small batch production for special projects
- **Target Audience**: High-value clients requiring limited quantities
- **Laboratory Assignment**: Lerma only (special approval required)
- **Maximum Batch Size**: ≤150kg
- **Typical Timeline**: 14-21 business days

### Workflow Stages

\`\`\`
Production Request → Special Approval → Resource Planning → 
Material Procurement → Production Setup → Batch Production → 
Quality Control → Packaging → Delivery
\`\`\`

### Key Business Rules

#### Special Approval Requirements
\`\`\`typescript
interface MicroProductionApproval {
  required_approvals: {
    lab_manager: 'Technical feasibility and resource availability';
    production_manager: 'Production schedule and capacity';
    quality_manager: 'Quality control procedures';
    commercial_manager: 'Commercial viability and pricing';
  };
  
  approval_criteria: {
    batch_size: '≤150kg maximum';
    laboratory: 'Lerma only';
    lead_time: 'Minimum 14 business days';
    minimum_order_value: '$5,000 USD equivalent';
  };
  
  documentation_requirements: {
    technical_specifications: 'Complete product specifications';
    quality_requirements: 'Detailed quality standards';
    delivery_schedule: 'Confirmed delivery timeline';
    commercial_agreement: 'Signed commercial agreement';
  };
}
\`\`\`

#### Production Specifications
- **Batch tracking**: Complete traceability from raw materials to finished product
- **Quality control**: Enhanced testing at multiple production stages
- **Documentation**: Comprehensive batch records and certificates
- **Packaging**: Special packaging for small quantities

## 🌡️ Laboratory-Specific Business Logic

### Temperature and Measurement Units

\`\`\`typescript
interface LaboratoryBusinessLogic {
  temperature_defaults: {
    lerma: 'celsius_only';           // Mexico standard
    houston: 'fahrenheit_preferred'; // US standard with celsius option
    mm_houston: 'fahrenheit_preferred'; // US standard with celsius option
  };
  
  measurement_systems: {
    lerma: {
      weight: 'kg';
      dimension: 'mm';
      temperature: '°C';
      pressure: 'bar';
    };
    us_labs: {
      weight: 'lbs';
      dimension: 'inches';
      temperature: '°F';
      pressure: 'psi';
    };
  };
  
  currency_handling: {
    lerma: 'MXN (Mexican Peso)';
    houston: 'USD (US Dollar)';
    mm_houston: 'USD (US Dollar)';
  };
}
\`\`\`

### Regional Compliance Requirements

\`\`\`typescript
interface RegionalCompliance {
  mexico: {
    environmental: 'SEMARNAT environmental regulations';
    safety: 'NOM-018-STPS workplace safety standards';
    quality: 'Mexican official standards (NOM)';
    documentation: 'Spanish language requirements';
  };
  
  usa: {
    environmental: 'EPA regulations for coating operations';
    safety: 'OSHA workplace safety standards';
    quality: 'ASTM testing standards';
    documentation: 'English language requirements';
  };
}
\`\`\`

## 📊 Status Tracking and Priority Management

### Request Status Lifecycle

\`\`\`typescript
enum RequestStatus {
  DRAFT = 'Initial draft - not submitted',
  SUBMITTED = 'Submitted for review',
  IN_REVIEW = 'Under technical review',
  APPROVED = 'Approved for processing',
  IN_PROGRESS = 'Work in progress',
  TESTING = 'Testing phase',
  QUALITY_REVIEW = 'Quality control review',
  COMPLETED = 'Work completed',
  DELIVERED = 'Delivered to client',
  CANCELLED = 'Request cancelled',
  ON_HOLD = 'Temporarily on hold'
}
\`\`\`

### Priority Management System

\`\`\`typescript
interface PrioritySystem {
  urgent: {
    sla: '2-3 business days';
    conditions: 'Customer complaints, production issues';
    approval: 'Manager approval required';
    surcharge: '50% additional fee';
  };
  
  high: {
    sla: '5-7 business days';
    conditions: 'New product launches, key customers';
    approval: 'Supervisor approval';
    surcharge: '25% additional fee';
  };
  
  medium: {
    sla: '7-10 business days';
    conditions: 'Standard development requests';
    approval: 'Standard approval process';
    surcharge: 'Standard pricing';
  };
  
  low: {
    sla: '10-15 business days';
    conditions: 'Research projects, non-critical work';
    approval: 'Standard approval process';
    surcharge: 'Standard pricing with possible discount';
  };
}
\`\`\`

## 🎯 Business Performance Metrics

### Key Performance Indicators

\`\`\`typescript
interface BusinessKPIs {
  operational_metrics: {
    request_processing_time: 'Average time from submission to completion';
    on_time_delivery: 'Percentage of requests completed on time';
    customer_satisfaction: 'Customer satisfaction score (1-10)';
    rework_rate: 'Percentage of requests requiring rework';
  };
  
  financial_metrics: {
    revenue_per_request: 'Average revenue generated per request';
    profit_margin: 'Profit margin by request type';
    resource_utilization: 'Laboratory resource utilization rate';
    cost_per_request: 'Average cost to process each request type';
  };
  
  quality_metrics: {
    first_pass_success: 'Percentage of requests completed without rework';
    defect_rate: 'Defects per million opportunities';
    compliance_rate: 'Regulatory compliance percentage';
    test_accuracy: 'Testing accuracy and repeatability';
  };
}
\`\`\`

This comprehensive business workflow documentation ensures that all stakeholders understand the operational processes, business rules, and performance expectations for each request type in the Vitracoat chemical coating management system.`;