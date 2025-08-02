export default `# Laboratory Business Rules - Multi-Location Operations

## 🌍 Overview

This document defines the comprehensive business rules governing operations across Vitracoat's three laboratory locations: Lerma (Mexico), Houston (USA), and M&M Houston (USA). These rules ensure consistent operations while accommodating regional differences.

## 🏭 Laboratory Locations and Capabilities

### Lerma Laboratory (Mexico) - Main Facility

\`\`\`typescript
interface LermaLaboratory {
  location: {
    country: 'Mexico';
    city: 'Lerma, Estado de México';
    timezone: 'America/Mexico_City (CST/CDT)';
    business_hours: '8:00 AM - 5:00 PM CST, Monday-Friday';
  };
  
  capabilities: {
    product_development: 'Full formulation capabilities';
    testing_services: 'Complete testing suite';
    micro_production: 'Exclusive micro production facility (≤150kg)';
    quality_control: 'Advanced quality control laboratory';
    research_development: 'Primary R&D facility';
  };
  
  specializations: [
    'Powder coating formulation',
    'Micro production batches',
    'Advanced color matching',
    'Custom chemistry development',
    'Environmental testing'
  ];
}
\`\`\`

### Houston Laboratory (USA) - Regional Service Center

\`\`\`typescript
interface HoustonLaboratory {
  location: {
    country: 'United States';
    city: 'Houston, Texas';
    timezone: 'America/Chicago (CST/CDT)';
    business_hours: '8:00 AM - 5:00 PM CST, Monday-Friday';
  };
  
  capabilities: {
    product_development: 'Standard formulation services';
    testing_services: 'Comprehensive testing capabilities';
    micro_production: 'Not available';
    quality_control: 'Standard quality testing';
    customer_support: 'Regional customer service';
  };
  
  specializations: [
    'ASTM standard testing',
    'US market product adaptation',
    'Rapid turnaround testing',
    'Customer technical support'
  ];
}
\`\`\`

### M&M Houston Laboratory (USA) - Specialized Testing

\`\`\`typescript
interface MMHoustonLaboratory {
  location: {
    country: 'United States';
    city: 'Houston, Texas (M&M Facility)';
    timezone: 'America/Chicago (CST/CDT)';
    business_hours: '8:00 AM - 5:00 PM CST, Monday-Friday';
  };
  
  capabilities: {
    product_development: 'Limited formulation services';
    testing_services: 'Specialized and advanced testing';
    micro_production: 'Not available';
    quality_control: 'Specialized quality analysis';
    research_testing: 'Advanced research testing';
  };
  
  specializations: [
    'Specialized ASTM testing',
    'Advanced weathering tests',
    'Corrosion resistance testing',
    'Performance validation',
    'Regulatory compliance testing'
  ];
}
\`\`\`

## 📏 Unit Systems and Measurement Standards

### Regional Unit Preferences

\`\`\`typescript
interface RegionalUnits {
  lerma_mexico: {
    temperature: {
      primary: 'celsius';
      alternatives: [];
      format: '°C';
      range: '150-200°C typical curing';
    };
    
    weight: {
      primary: 'kilogram';
      alternatives: [];
      format: 'kg';
      precision: '0.1 kg for samples, 1 kg for production';
    };
    
    dimensions: {
      primary: 'millimeter';
      alternatives: ['centimeter', 'meter'];
      format: 'mm';
      precision: '0.1 mm for thickness, 1 mm for dimensions';
    };
    
    currency: {
      primary: 'MXN';
      display: 'Mexican Peso ($)';
      exchange_rate: 'Updated daily from central bank';
    };
  };
  
  us_laboratories: {
    temperature: {
      primary: 'fahrenheit';
      alternatives: ['celsius'];
      format: '°F (°C)';
      range: '300-400°F (150-200°C) typical curing';
      user_choice: true; // Users can select preferred unit
    };
    
    weight: {
      primary: 'pound';
      alternatives: ['kilogram'];
      format: 'lbs';
      precision: '0.1 lbs for samples, 1 lb for production';
    };
    
    dimensions: {
      primary: 'inch';
      alternatives: ['millimeter'];
      format: 'in';
      precision: '0.001 in for thickness, 0.1 in for dimensions';
    };
    
    currency: {
      primary: 'USD';
      display: 'US Dollar ($)';
      exchange_rate: 'Fixed base currency';
    };
  };
}
\`\`\`

### Automatic Unit Conversion Rules

\`\`\`typescript
interface ConversionRules {
  temperature_conversion: {
    celsius_to_fahrenheit: '(°C × 9/5) + 32';
    fahrenheit_to_celsius: '(°F - 32) × 5/9';
    display_format: 'Primary unit (alternative unit)';
  };
  
  weight_conversion: {
    kg_to_lbs: 'kg × 2.20462';
    lbs_to_kg: 'lbs × 0.453592';
    rounding: '1 decimal place for precision';
  };
  
  dimension_conversion: {
    mm_to_inches: 'mm × 0.0393701';
    inches_to_mm: 'inches × 25.4';
    thickness_precision: '3 decimal places';
  };
}
\`\`\`

## ⏰ Processing Time Standards

### Standard Lead Times by Request Type

\`\`\`typescript
interface ProcessingTimes {
  lwr_development: {
    lerma: {
      standard: '7-10 business days';
      rush: '5-7 business days (+25% fee)';
      urgent: '3-5 business days (+50% fee)';
    };
    
    houston: {
      standard: '10-15 business days';
      rush: '7-10 business days (+25% fee)';
      urgent: '5-7 business days (+50% fee)';
    };
    
    mm_houston: {
      standard: '10-15 business days';
      rush: '7-10 business days (+25% fee)';
      urgent: '5-7 business days (+50% fee)';
    };
  };
  
  tlwr_testing: {
    standard_tests: '5-7 business days';
    comprehensive_suite: '7-10 business days';
    specialized_testing: '10-14 business days';
    rush_surcharge: '+50% for 50% time reduction';
  };
  
  vlwr_internal: {
    quality_control: '3-5 business days';
    research_projects: '7-14 business days';
    urgent_investigations: '1-3 business days';
  };
  
  micro_production: {
    lerma_only: '14-21 business days';
    minimum_lead_time: '14 business days (non-negotiable)';
    special_approval_time: '2-3 business days additional';
  };
}
\`\`\`

### Business Day Calculations

\`\`\`typescript
interface BusinessDayRules {
  working_days: {
    mexico: 'Monday-Friday, excluding Mexican federal holidays';
    usa: 'Monday-Friday, excluding US federal holidays';
  };
  
  holiday_considerations: {
    mexican_holidays: [
      'New Year\'s Day', 'Constitution Day', 'Benito Juárez Birthday',
      'Easter (varies)', 'Labor Day', 'Independence Day', 'Revolution Day',
      'Christmas Day'
    ];
    
    us_holidays: [
      'New Year\'s Day', 'Martin Luther King Jr. Day', 'Presidents Day',
      'Memorial Day', 'Independence Day', 'Labor Day', 'Columbus Day',
      'Veterans Day', 'Thanksgiving', 'Christmas Day'
    ];
  };
  
  time_zone_coordination: {
    mexico_usa_overlap: '9:00 AM - 4:00 PM CST';
    communication_window: 'Optimal for cross-border coordination';
    urgent_escalation: '24-hour response for critical issues';
  };
}
\`\`\`

## 🧪 Available Testing Capabilities by Location

### Standard Testing Suite (All Locations)

\`\`\`typescript
interface StandardTesting {
  mechanical_properties: {
    adhesion: {
      standard: 'ASTM D3359 (Cross-hatch adhesion test)';
      equipment: 'Cross-hatch cutter, tape, magnification';
      turnaround: '1 business day';
      available_at: ['Lerma', 'Houston', 'M&M Houston'];
    };
    
    flexibility: {
      standard: 'ASTM D522 (Mandrel bend test)';
      equipment: 'Mandrel bend tester, various diameters';
      turnaround: '1 business day';
      available_at: ['Lerma', 'Houston', 'M&M Houston'];
    };
    
    impact_resistance: {
      standard: 'ASTM D2794 (Direct/reverse impact)';
      equipment: 'Impact tester, various weights';
      turnaround: '1 business day';
      available_at: ['Lerma', 'Houston', 'M&M Houston'];
    };
  };
  
  environmental_testing: {
    salt_spray: {
      standard: 'ASTM B117 (Salt spray corrosion test)';
      equipment: 'Salt spray chambers';
      duration_options: [24, 48, 96, 168, 336, 500, 1000]; // hours
      turnaround: 'Test duration + 1 business day analysis';
      available_at: ['Lerma', 'Houston', 'M&M Houston'];
    };
    
    uv_exposure: {
      standard: 'ASTM G154 (UV fluorescent exposure)';
      equipment: 'QUV accelerated weathering chambers';
      duration_options: [250, 500, 1000, 2000]; // hours
      available_at: ['Lerma', 'M&M Houston'];
    };
  };
}
\`\`\`

### Specialized Testing (Location-Specific)

\`\`\`typescript
interface SpecializedTesting {
  lerma_exclusive: {
    color_matching: {
      description: 'Advanced spectrophotometric color analysis';
      equipment: 'High-end spectrophotometer, color matching booth';
      capabilities: 'Custom color development, metamerism analysis';
    };
    
    micro_production_qc: {
      description: 'Quality control for micro production batches';
      equipment: 'Production-scale testing equipment';
      capabilities: 'Batch verification, process validation';
    };
  };
  
  mm_houston_exclusive: {
    xenon_arc_testing: {
      standard: 'ASTM G155 (Xenon arc exposure)';
      equipment: 'Xenon arc chambers with various filters';
      capabilities: 'Automotive, architectural weathering simulation';
    };
    
    chemical_resistance: {
      standard: 'ASTM D1308 (Chemical resistance testing)';
      equipment: 'Chemical resistance chambers';
      capabilities: 'Industrial chemical exposure testing';
    };
    
    advanced_adhesion: {
      description: 'Specialized adhesion testing beyond standard methods';
      equipment: 'Pull-off adhesion testers, specialized substrates';
      capabilities: 'Quantitative adhesion measurement';
    };
  };
}
\`\`\`

## 💰 Pricing and Business Rules

### Laboratory-Specific Pricing Structure

\`\`\`typescript
interface PricingStructure {
  base_pricing: {
    lerma: {
      currency: 'MXN';
      lwr_base_rate: 15000; // MXN per standard LWR
      testing_hourly_rate: 800; // MXN per hour
      micro_production: 'Custom pricing based on batch size';
      rush_multiplier: 1.25;
      urgent_multiplier: 1.50;
    };
    
    houston: {
      currency: 'USD';
      lwr_base_rate: 800; // USD per standard LWR
      testing_hourly_rate: 45; // USD per hour
      travel_surcharge: 'If on-site service required';
      rush_multiplier: 1.25;
      urgent_multiplier: 1.50;
    };
    
    mm_houston: {
      currency: 'USD';
      specialized_testing_premium: 1.20; // 20% premium for specialized tests
      lwr_base_rate: 900; // USD per standard LWR
      testing_hourly_rate: 55; // USD per hour
      rush_multiplier: 1.25;
      urgent_multiplier: 1.50;
    };
  };
  
  volume_discounts: {
    annual_contract: '10-15% discount for committed volume';
    monthly_volume: '5-10% discount based on monthly requests';
    repeat_customer: '5% loyalty discount after 12 months';
  };
}
\`\`\`

### Sample Size and Quantity Rules

\`\`\`typescript
interface SampleRules {
  maximum_sample_sizes: {
    lerma: {
      lwr_samples: '25 kg maximum per request';
      testing_samples: '5 kg maximum per test series';
      micro_production: '150 kg maximum (special approval)';
    };
    
    us_laboratories: {
      lwr_samples: '50 lbs maximum per request';
      testing_samples: '10 lbs maximum per test series';
      micro_production: 'Not available';
    };
  };
  
  minimum_requirements: {
    panel_testing: {
      minimum_panels: 3;
      standard_size: '4" × 6" (100mm × 150mm)';
      custom_sizes: 'Available with advance notice';
    };
    
    powder_samples: {
      minimum_quantity: '100g for basic testing';
      recommended_quantity: '500g for comprehensive testing';
      storage_requirements: 'Sealed containers, temperature controlled';
    };
  };
}
\`\`\`

## 🔄 Workflow Coordination Rules

### Cross-Laboratory Collaboration

\`\`\`typescript
interface CollaborationRules {
  knowledge_sharing: {
    formulation_database: 'Shared across all locations';
    test_results: 'Centralized database with controlled access';
    best_practices: 'Monthly technical meetings (virtual)';
    expertise_sharing: 'Specialist consultation across locations';
  };
  
  sample_transfer: {
    mexico_to_usa: {
      customs_requirements: 'Commercial samples documentation';
      shipping_time: '3-5 business days';
      temperature_control: 'Required for temperature-sensitive samples';
      cost_allocation: 'Customer pays shipping and duties';
    };
    
    usa_to_mexico: {
      customs_requirements: 'Temporary import documentation';
      shipping_time: '3-5 business days';
      restrictions: 'Some chemicals require special permits';
      cost_allocation: 'Shared cost model';
    };
  };
  
  capacity_balancing: {
    overflow_management: 'Redirect requests during peak capacity';
    expertise_routing: 'Route specialized requests to expert labs';
    emergency_support: 'Cross-lab support for urgent requests';
  };
}
\`\`\`

### Quality Assurance Coordination

\`\`\`typescript
interface QualityCoordination {
  standardization: {
    test_methods: 'Identical ASTM standards across all labs';
    equipment_calibration: 'Synchronized calibration schedules';
    proficiency_testing: 'Quarterly inter-lab comparisons';
    documentation: 'Standardized reporting formats';
  };
  
  quality_control: {
    control_samples: 'Monthly control sample exchange';
    method_validation: 'Joint method validation studies';
    corrective_actions: 'Centralized CAPA system';
    audit_schedule: 'Annual cross-audit program';
  };
  
  continuous_improvement: {
    performance_metrics: 'Shared KPI dashboard';
    best_practice_sharing: 'Quarterly improvement meetings';
    training_coordination: 'Synchronized training programs';
    innovation_projects: 'Joint development initiatives';
  };
}
\`\`\`

## 📊 Performance Monitoring and Reporting

### Laboratory Performance Metrics

\`\`\`typescript
interface PerformanceMetrics {
  operational_kpis: {
    turnaround_time: {
      target: '95% of requests completed within promised timeline';
      measurement: 'Business days from receipt to delivery';
      reporting: 'Weekly dashboard updates';
    };
    
    first_pass_yield: {
      target: '90% of requests completed without rework';
      measurement: 'Requests completed correctly on first attempt';
      reporting: 'Monthly quality reviews';
    };
    
    customer_satisfaction: {
      target: '8.5/10 average satisfaction score';
      measurement: 'Post-delivery customer surveys';
      reporting: 'Quarterly satisfaction reports';
    };
  };
  
  financial_kpis: {
    revenue_per_request: 'Track profitability by request type and lab';
    resource_utilization: 'Equipment and personnel utilization rates';
    cost_per_sample: 'Direct and indirect costs per sample processed';
  };
  
  quality_kpis: {
    test_repeatability: 'Within-lab repeatability statistics';
    test_reproducibility: 'Between-lab reproducibility statistics';
    complaint_rate: 'Customer complaints per 100 requests';
    corrective_actions: 'Number and resolution time of CAPAs';
  };
}
\`\`\`

These comprehensive laboratory business rules ensure consistent, high-quality operations across all Vitracoat facilities while accommodating regional differences and maintaining operational efficiency.`;