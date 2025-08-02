export const vitracoatRequestForms = {
  name: "Vitracoat Request Forms Documentation",
  description: "Complete LWR form structure with field specifications, request type selection logic, and validation requirements for TLWR, VLWR, and Micro Production forms",
  
  overview: {
    purpose: "Comprehensive documentation of all request form types in the Vitracoat ERP system",
    scope: "LWR (Laboratory Work Request), TLWR (Testing Lab Work Request), VLWR (Vitracoat Lab Work Request), and Micro Production forms",
    businessContext: "Chemical formulation request management with specialized workflows for different testing and production scenarios"
  },

  formArchitecture: {
    lwrFormStructure: {
      description: "Base Laboratory Work Request form with comprehensive field specifications",
      mandatoryFields: [
        {
          section: "Client Information",
          fields: [
            {
              name: "client_id",
              type: "dropdown",
              dataSource: "clients table",
              validation: "required",
              businessRule: "Filter by user role - salespeople see only their clients, managers see zone clients"
            },
            {
              name: "contact_person",
              type: "text",
              validation: "required, max 100 chars",
              description: "Primary contact for this request"
            },
            {
              name: "email",
              type: "email",
              validation: "required, valid email format",
              businessRule: "Used for automated notifications"
            },
            {
              name: "phone",
              type: "tel",
              validation: "optional, valid phone format",
              description: "Contact phone number"
            }
          ]
        },
        {
          section: "Request Details",
          fields: [
            {
              name: "request_type",
              type: "radio",
              options: ["STANDARD", "MICRO_PRODUCTION"],
              validation: "required",
              businessRule: "Micro production (≤150kg) requires special plant approval",
              conditionalLogic: "MICRO_PRODUCTION enables additional approval workflow"
            },
            {
              name: "priority",
              type: "dropdown",
              options: ["LOW", "NORMAL", "HIGH", "URGENT"],
              defaultValue: "NORMAL",
              validation: "required",
              businessRule: "HIGH/URGENT priority requires manager approval"
            },
            {
              name: "delivery_date_requested",
              type: "date",
              validation: "required, must be future date",
              businessRule: "System calculates estimated delivery based on acceptance date + configurable days"
            },
            {
              name: "quantity_requested",
              type: "number",
              validation: "required, positive number",
              unit: "kg",
              businessRule: "≤150kg triggers micro-production workflow"
            }
          ]
        },
        {
          section: "Product Specifications",
          fields: [
            {
              name: "standard_type_id",
              type: "dropdown",
              dataSource: "standard_types table",
              validation: "required",
              description: "Base product standard specification"
            },
            {
              name: "chemistry_type_id",
              type: "dropdown",
              dataSource: "chemistry_types table",
              validation: "required",
              description: "Chemical composition category"
            },
            {
              name: "color_code_id",
              type: "dropdown",
              dataSource: "color_codes table",
              validation: "required",
              searchable: true,
              description: "RAL or custom color specification"
            },
            {
              name: "finish_type_id",
              type: "dropdown",
              dataSource: "finish_types table",
              validation: "required",
              description: "Surface finish category (gloss, texture, etc.)"
            },
            {
              name: "metallic_type_id",
              type: "dropdown",
              dataSource: "metallic_types table",
              validation: "optional",
              conditionalLogic: "Only visible if chemistry type requires metallic"
            },
            {
              name: "light_specification_id",
              type: "dropdown",
              dataSource: "light_specifications table",
              validation: "optional",
              description: "Lighting and appearance standards"
            }
          ]
        },
        {
          section: "Application Details",
          fields: [
            {
              name: "substrate_type_id",
              type: "dropdown",
              dataSource: "substrate_types table",
              validation: "required",
              description: "Base material specification"
            },
            {
              name: "pre_treatment_type_id",
              type: "dropdown",
              dataSource: "pre_treatment_types table",
              validation: "required",
              description: "Surface preparation method"
            },
            {
              name: "application_equipment_id",
              type: "dropdown",
              dataSource: "application_equipment table",
              validation: "required",
              description: "Powder application machinery"
            },
            {
              name: "application_method",
              type: "radio",
              options: ["CORONA", "TRIBO", "FLUID_BED"],
              validation: "required",
              description: "Application method selection"
            },
            {
              name: "application_mode",
              type: "radio",
              options: ["RECOVERY", "NON_RECOVERY"],
              validation: "required",
              description: "Recovery vs non-recovery system"
            },
            {
              name: "application_system",
              type: "radio",
              options: ["MANUAL", "AUTOMATED", "ROBOTIC"],
              validation: "required",
              description: "Application system type"
            }
          ]
        },
        {
          section: "Testing Requirements",
          fields: [
            {
              name: "test_objectives",
              type: "multiselect",
              dataSource: "test_objectives table",
              validation: "at least one required",
              description: "Quality testing goals and methods"
            },
            {
              name: "hardness_standard_id",
              type: "dropdown",
              dataSource: "hardness_standards table",
              validation: "conditional - required if hardness testing selected",
              description: "Durability testing protocol"
            },
            {
              name: "impact_standard_id",
              type: "dropdown",
              dataSource: "impact_standards table",
              validation: "conditional - required if impact testing selected",
              description: "Impact resistance specification"
            },
            {
              name: "salt_spray_standard_id",
              type: "dropdown",
              dataSource: "salt_spray_standards table",
              validation: "conditional - required if corrosion testing selected",
              description: "Corrosion resistance testing"
            },
            {
              name: "quv_standard_id",
              type: "dropdown",
              dataSource: "quv_standards table",
              validation: "conditional - required if UV testing selected",
              description: "UV weathering test protocol"
            },
            {
              name: "flexibility_standard_id",
              type: "dropdown",
              dataSource: "flexibility_standards table",
              validation: "conditional - required if flexibility testing selected",
              description: "Flexibility and bend testing"
            }
          ]
        },
        {
          section: "Additional Information",
          fields: [
            {
              name: "special_requirements",
              type: "textarea",
              validation: "optional, max 500 chars",
              description: "Any special requirements or notes"
            },
            {
              name: "attachments",
              type: "file_upload",
              validation: "optional, max 5 files, 10MB total",
              allowedTypes: ["pdf", "doc", "docx", "jpg", "png"],
              description: "Supporting documents or images"
            },
            {
              name: "competitive_reference",
              type: "dropdown",
              dataSource: "competitors table",
              validation: "optional",
              description: "Competitor product reference for comparison"
            }
          ]
        }
      ]
    },

    tlwrFormEnhancements: {
      description: "Testing Lab Work Request with additional testing-specific fields",
      additionalFields: [
        {
          section: "Testing Specifications",
          fields: [
            {
              name: "testing_laboratory",
              type: "dropdown",
              options: ["LERMA", "MM_HOUSTON", "HOUSTON"],
              validation: "required",
              businessRule: "Determines available testing equipment and schedules"
            },
            {
              name: "report_type_id",
              type: "dropdown",
              dataSource: "report_types table",
              validation: "required",
              description: "Quality control report category"
            },
            {
              name: "report_frequency",
              type: "dropdown",
              options: ["SINGLE", "WEEKLY", "MONTHLY", "ON_DEMAND"],
              validation: "required",
              description: "Testing and reporting schedule"
            },
            {
              name: "lamp_type_id",
              type: "dropdown",
              dataSource: "lamp_types table",
              validation: "conditional - required for UV testing",
              description: "Testing equipment lamp specification"
            },
            {
              name: "panel_preparation_method",
              type: "dropdown",
              dataSource: "panel_preparation_methods table",
              validation: "required",
              description: "Test panel preparation method"
            },
            {
              name: "enclosed_type_id",
              type: "dropdown",
              dataSource: "enclosed_types table",
              validation: "optional",
              description: "Container and packaging type for samples"
            }
          ]
        },
        {
          section: "Quality Control",
          fields: [
            {
              name: "quality_requirements",
              type: "textarea",
              validation: "required, max 1000 chars",
              description: "Specific quality control requirements and acceptance criteria"
            },
            {
              name: "testing_timeline",
              type: "number",
              validation: "required, positive integer",
              unit: "days",
              description: "Expected testing duration"
            }
          ]
        }
      ],
      conditionalLogic: {
        description: "TLWR forms show additional testing fields and hide production-specific fields",
        rules: [
          "Testing laboratory selection filters available equipment",
          "Report type determines required testing protocols",
          "UV testing selection enables lamp type field",
          "Panel preparation method affects testing procedures"
        ]
      }
    },

    vlwrFormEnhancements: {
      description: "Vitracoat Lab Work Request for internal testing with toggle sections",
      additionalFields: [
        {
          section: "Internal Testing Parameters",
          fields: [
            {
              name: "internal_project_code",
              type: "text",
              validation: "required, alphanumeric, max 20 chars",
              description: "Internal project identification code"
            },
            {
              name: "testing_category",
              type: "dropdown",
              options: ["MATERIALS_TESTING", "FINISHED_PRODUCT", "PROCESS_VALIDATION", "R&D_DEVELOPMENT"],
              validation: "required",
              description: "Category of internal testing"
            },
            {
              name: "cost_center",
              type: "dropdown",
              dataSource: "cost_centers table",
              validation: "required",
              description: "Internal cost allocation center"
            },
            {
              name: "requesting_department",
              type: "dropdown",
              options: ["LABORATORY", "QUALITY", "PRODUCTION", "R&D", "SALES"],
              validation: "required",
              description: "Department requesting the testing"
            }
          ]
        }
      ],
      toggleSections: {
        description: "VLWR forms include expandable sections for detailed specifications",
        sections: [
          {
            name: "Advanced Material Properties",
            defaultState: "collapsed",
            fields: [
              "thermal_properties",
              "chemical_resistance",
              "mechanical_properties",
              "electrical_properties"
            ],
            visibility: "conditional - shown for MATERIALS_TESTING category"
          },
          {
            name: "Process Parameters",
            defaultState: "collapsed", 
            fields: [
              "curing_temperature",
              "curing_time", 
              "application_thickness",
              "environmental_conditions"
            ],
            visibility: "conditional - shown for PROCESS_VALIDATION category"
          },
          {
            name: "R&D Specifications",
            defaultState: "expanded",
            fields: [
              "research_objectives",
              "expected_outcomes",
              "success_criteria",
              "timeline_milestones"
            ],
            visibility: "conditional - shown for R&D_DEVELOPMENT category"
          }
        ]
      }
    },

    microProductionFormEnhancements: {
      description: "Micro Production requests with approval workflow and production parameters",
      additionalFields: [
        {
          section: "Production Specifications",
          fields: [
            {
              name: "production_quantity",
              type: "number",
              validation: "required, max 150",
              unit: "kg",
              businessRule: "Must be ≤150kg for micro production classification"
            },
            {
              name: "production_timeline",
              type: "number",
              validation: "required, positive integer",
              unit: "days",
              description: "Required production timeframe"
            },
            {
              name: "packaging_requirements",
              type: "multiselect",
              options: ["STANDARD_BAGS", "CUSTOM_CONTAINERS", "BULK_PACKAGING", "SAMPLE_VIALS"],
              validation: "at least one required",
              description: "Packaging specifications for delivery"
            },
            {
              name: "production_plant",
              type: "dropdown",
              dataSource: "production_plants table",
              validation: "required",
              businessRule: "Requires plant capacity approval for micro production"
            }
          ]
        },
        {
          section: "Approval Workflow",
          fields: [
            {
              name: "plant_manager_approval",
              type: "boolean",
              readOnly: true,
              description: "Plant manager approval status (system managed)"
            },
            {
              name: "production_scheduler_approval", 
              type: "boolean",
              readOnly: true,
              description: "Production scheduling approval (system managed)"
            },
            {
              name: "quality_manager_approval",
              type: "boolean", 
              readOnly: true,
              description: "Quality manager approval (system managed)"
            },
            {
              name: "approval_notes",
              type: "textarea",
              readOnly: true,
              description: "Approval comments and notes (system managed)"
            }
          ]
        }
      ],
      approvalWorkflow: {
        description: "Multi-stage approval process for micro production requests",
        stages: [
          {
            stage: "Plant Manager Approval",
            role: "PLANT_MANAGER",
            criteria: "Production capacity and resource availability",
            actions: ["APPROVE", "REJECT", "REQUEST_MODIFICATION"]
          },
          {
            stage: "Production Scheduling",
            role: "PRODUCTION_SCHEDULER", 
            criteria: "Schedule integration and timeline feasibility",
            actions: ["APPROVE", "REJECT", "RESCHEDULE"]
          },
          {
            stage: "Quality Manager Approval",
            role: "QUALITY_MANAGER",
            criteria: "Quality standards and testing requirements",
            actions: ["APPROVE", "REJECT", "ADDITIONAL_TESTING"]
          }
        ]
      }
    }
  },

  requestTypeSelectionLogic: {
    description: "Business logic for determining appropriate request type and form routing",
    
    selectionCriteria: {
      standardRequest: {
        conditions: [
          "Quantity > 150kg",
          "Standard production timeline",
          "Existing formulation modification",
          "Regular client request"
        ],
        formRoute: "LWR with standard fields"
      },
      
      microProduction: {
        conditions: [
          "Quantity ≤ 150kg", 
          "Small batch requirement",
          "Sample or trial production",
          "Custom formulation testing"
        ],
        formRoute: "LWR + Micro Production fields + Approval workflow"
      },
      
      testingRequest: {
        conditions: [
          "Testing services only",
          "No production required",
          "Quality validation focus",
          "External laboratory services"
        ],
        formRoute: "TLWR with testing-specific fields"
      },
      
      internalTesting: {
        conditions: [
          "Internal Vitracoat testing",
          "R&D or process validation",
          "Material properties analysis",
          "Internal cost center allocation"
        ],
        formRoute: "VLWR with internal fields + toggle sections"
      }
    },

    routingDecisionTree: `
REQUEST_TYPE_SELECTION:
├── Is this for testing services only? → YES → TLWR Form
├── Is this internal Vitracoat testing? → YES → VLWR Form  
├── Is quantity ≤ 150kg? → YES → LWR + Micro Production
└── DEFAULT → Standard LWR Form

FORM_FIELD_RENDERING:
├── LWR: All base fields
├── TLWR: Base fields + Testing sections - Production sections
├── VLWR: Base fields + Internal sections + Toggle sections
└── Micro Production: Base fields + Production sections + Approval workflow
    `,

    businessRules: [
      "Request type determines visible form sections",
      "Conditional fields appear based on selected test objectives",
      "Micro production enables approval workflow automatically",
      "Testing laboratory selection filters available equipment options",
      "Internal requests require cost center allocation",
      "File attachments are optional but recommended for complex requests"
    ]
  },

  validationRequirements: {
    fieldValidation: {
      clientSide: [
        "Required field validation",
        "Email format validation", 
        "Phone number format validation",
        "Date range validation (future dates only)",
        "Numeric validation for quantities",
        "File type and size validation",
        "Character limits for text fields"
      ],
      
      serverSide: [
        "Database constraint validation",
        "Business rule validation",
        "Role-based access validation",
        "Duplicate request prevention",
        "Data integrity checks",
        "Cross-field validation logic"
      ]
    },

    businessValidation: {
      rules: [
        {
          rule: "Micro Production Quantity Check",
          validation: "quantity_requested <= 150 when request_type = 'MICRO_PRODUCTION'",
          errorMessage: "Micro production requests must be 150kg or less"
        },
        {
          rule: "Future Date Validation",
          validation: "delivery_date_requested > current_date",
          errorMessage: "Delivery date must be in the future"
        },
        {
          rule: "Test Objective Conditional Fields",
          validation: "If UV testing selected, lamp_type_id is required",
          errorMessage: "Lamp type is required for UV testing"
        },
        {
          rule: "Client Access Validation",
          validation: "User can only select clients within their access scope",
          errorMessage: "You don't have permission to create requests for this client"
        },
        {
          rule: "Priority Approval Check", 
          validation: "HIGH/URGENT priority requires manager approval",
          errorMessage: "High priority requests require manager approval"
        }
      ]
    },

    progressiveValidation: {
      description: "Multi-step form validation approach",
      strategy: [
        "Step 1: Client and basic request validation",
        "Step 2: Product specification validation", 
        "Step 3: Application details validation",
        "Step 4: Testing requirements validation",
        "Step 5: Final submission validation",
        "Server validation on form submission"
      ]
    }
  },

  formStateManagement: {
    description: "State management patterns for complex form interactions",
    
    stateStructure: `
const formState = {
  currentStep: number,
  formData: {
    clientInformation: {},
    requestDetails: {},
    productSpecifications: {},
    applicationDetails: {},
    testingRequirements: {},
    additionalInformation: {}
  },
  validationErrors: {},
  isLoading: boolean,
  isDirty: boolean,
  conditionalFields: {
    showMetallicType: boolean,
    showTestingFields: boolean,
    showMicroProductionFields: boolean,
    showApprovalWorkflow: boolean
  }
}`,

    conditionalFieldLogic: [
      {
        trigger: "chemistry_type_id changes",
        action: "Show/hide metallic_type_id based on chemistry requirements"
      },
      {
        trigger: "test_objectives selection",
        action: "Show/hide specific testing standard fields"
      },
      {
        trigger: "request_type = 'MICRO_PRODUCTION'",
        action: "Show production fields and approval workflow"
      },
      {
        trigger: "testing_laboratory selection",
        action: "Filter available equipment options"
      }
    ],

    formPersistence: {
      autoSave: "Save form data every 30 seconds to prevent data loss",
      draftMode: "Allow saving incomplete forms as drafts",
      sessionStorage: "Persist form state across browser sessions",
      conflictResolution: "Handle concurrent editing scenarios"
    }
  },

  implementationGuidelines: {
    formComponent: {
      structure: "Use multi-step form pattern with progress indicator",
      validation: "Implement progressive validation with real-time feedback",
      accessibility: "Ensure ARIA labels and keyboard navigation",
      responsiveness: "Mobile-first design with adaptive layouts"
    },

    dataHandling: {
      submission: "Use optimistic UI updates with rollback capability",
      fileUploads: "Implement chunked upload with progress indicators", 
      errorHandling: "Graceful error handling with user-friendly messages",
      performance: "Lazy load dropdown options and implement search"
    },

    userExperience: {
      guidance: "Provide contextual help and field descriptions",
      feedback: "Clear validation messages and success indicators",
      navigation: "Allow step navigation while preserving data",
      recovery: "Draft saving and form recovery mechanisms"
    }
  }
};

export default vitracoatRequestForms;