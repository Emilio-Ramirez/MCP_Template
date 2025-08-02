export const lwrRequestWorkflow = {
  name: "Laboratory Work Request (LWR) Workflow",
  description: "Complete workflow for product development requests with comprehensive specifications, application parameters, and powder properties",
  
  overview: {
    purpose: "Manage new powder coating formulation development from client requirements to technical specifications",
    businessContext: "Primary workflow for new product development with comprehensive client and technical specifications",
    complexity: "Advanced - Multiple pages with conditional sections and extensive validation"
  },

  workflowDefinition: {
    requestType: "LWR",
    fullName: "Laboratory Work Request",
    category: "Product Development",
    
    businessFlow: [
      "Client submits product development request with fantasy name",
      "Sales representative captures comprehensive specifications",
      "Technical requirements and application parameters defined",
      "Powder properties and testing requirements specified",
      "Laboratory receives request and assigns technical name",
      "Formulation development begins based on specifications"
    ],

    formStructure: {
      totalPages: 5,
      totalFields: 45,
      conditionalSections: 2,
      requiredFields: 12,
      pages: [
        "Basic Info (shared)",
        "Product Specification", 
        "Application Parameters",
        "Powder Properties",
        "Notes & Files (shared)"
      ]
    }
  },

  detailedSpecifications: {
    basicInfo: {
      description: "Shared information across all request types",
      fields: [
        {
          name: "laboratory",
          type: "Select",
          options: ["Houston", "M&M Houston", "Lerma"],
          required: true,
          businessLogic: "Determines price units and temperature defaults"
        },
        {
          name: "customer", 
          type: "Select",
          source: "Client database",
          required: true,
          businessLogic: "Must be active, non-blocked client"
        },
        {
          name: "salesAgent",
          type: "Select", 
          source: "User database (VENDEDOR role)",
          required: true,
          businessLogic: "Auto-populated based on client assignment"
        },
        {
          name: "proposedProductName",
          type: "Text",
          required: true,
          businessLogic: "Fantasy name provided by client, technical name assigned later by lab"
        }
      ]
    },

    productSpecification: {
      description: "Core product requirements and market positioning",
      fields: [
        {
          name: "targetSalesPrice",
          type: "Currency",
          required: true,
          businessLogic: "Default units: Houston labs (lb/USD), Lerma (kg/MXN)",
          validation: "Must be positive number"
        },
        {
          name: "standardType",
          type: "Select",
          source: "Configuration: Standard Types",
          required: true,
          description: "Base product standards and specifications"
        },
        {
          name: "standardCode",
          type: "Number",
          required: false,
          description: "Optional numeric identifier for standard"
        },
        {
          name: "competition",
          type: "Select",
          source: "Configuration: Competitors",
          required: false,
          description: "Competitor product for reference"
        },
        {
          name: "chemistry",
          type: "Select",
          source: "Configuration: Chemistry Types",
          required: true,
          description: "Chemical composition category"
        },
        {
          name: "color",
          type: "Select", 
          source: "Configuration: Color Codes",
          required: true,
          description: "RAL or custom color specification"
        },
        {
          name: "finish",
          type: "Select",
          source: "Configuration: Finish Types", 
          required: true,
          description: "Surface finish category (gloss, texture, etc.)"
        },
        {
          name: "metallic",
          type: "Boolean",
          required: false,
          description: "Contains metallic powder components"
        },
        {
          name: "light",
          type: "Select",
          source: "Configuration: Light Specifications",
          required: false,
          description: "Lighting and appearance standards"
        },
        {
          name: "substrate",
          type: "Select",
          source: "Configuration: Substrate Types",
          required: true,
          description: "Base material specification",
          hasOtherOption: true
        },
        {
          name: "preTreatment",
          type: "Select",
          source: "Configuration: Pre-Treatment Types",
          required: true,
          description: "Surface preparation method"
        },
        {
          name: "annualConsumption",
          type: "Number",
          unit: "lbs",
          required: true,
          description: "Expected yearly usage volume",
          businessLogic: "Drives micro-production eligibility"
        },
        {
          name: "marketSegmentation",
          type: "Select",
          source: "Configuration: Market Segmentation",
          required: true,
          description: "Target market category"
        },
        {
          name: "specificEndUse",
          type: "Text",
          required: false,
          description: "Detailed application description"
        }
      ]
    },

    applicationParameters: {
      description: "Application process and curing specifications",
      fields: [
        {
          name: "applicationMode",
          type: "Boolean",
          label: "Recovery vs Non-recovery",
          required: true,
          description: "Powder recovery system availability"
        },
        {
          name: "applicationSystem",
          type: "Select",
          source: "Configuration: Application System",
          options: ["Manual", "Automated", "Robotic"],
          required: true,
          description: "Application method classification"
        },
        {
          name: "applicationMethod",
          type: "Select",
          source: "Configuration: Application Method", 
          options: ["Corona", "Tribo", "Fluid Bed"],
          required: true,
          description: "Electrostatic application technique"
        },
        {
          name: "applicationEquipment",
          type: "Select",
          source: "Configuration: Application Equipment",
          required: true,
          description: "Specific powder application machinery"
        },
        {
          name: "dwellTime",
          type: "Number",
          unit: "minutes",
          required: false,
          description: "Time between application and curing"
        },
        {
          name: "cureTime",
          type: "Number",
          unit: "minutes", 
          required: true,
          validation: "Must be positive integer",
          description: "Required curing duration"
        },
        {
          name: "cureTemperature",
          type: "Number",
          unit: "°F/°C",
          required: true,
          validation: "Must be positive number",
          businessLogic: "USA labs: °C or °F choice, Mexico labs: °C only",
          description: "Required curing temperature"
        },
        {
          name: "ovenSet",
          type: "Number",
          unit: "°F/°C",
          required: false,
          description: "Oven temperature setting (may differ from cure temp)"
        }
      ]
    },

    conditionalSections: {
      clientPanelSection: {
        trigger: "Toggle switch",
        description: "Client-provided panel and sample requirements",
        fields: [
          {
            name: "clientSteelPanel",
            type: "Boolean",
            description: "Client provides steel test panels"
          },
          {
            name: "clientAluminumPanel", 
            type: "Boolean",
            description: "Client provides aluminum test panels"
          },
          {
            name: "clientPowderSample",
            type: "Boolean",
            description: "Client provides powder sample"
          },
          {
            name: "clientStandard",
            type: "Boolean", 
            description: "Client provides standard reference"
          }
        ]
      },

      sellerPanelSection: {
        trigger: "Toggle switch",
        description: "Vitracoat-provided panel and sample specifications",
        fields: [
          {
            name: "sellerSteelPanel",
            type: "Boolean",
            description: "Vitracoat provides steel test panels"
          },
          {
            name: "sellerAluminumPanel",
            type: "Boolean", 
            description: "Vitracoat provides aluminum test panels"
          },
          {
            name: "sellerPowderSample",
            type: "Boolean",
            description: "Vitracoat provides powder sample"
          },
          {
            name: "sellerStandard",
            type: "Boolean",
            description: "Vitracoat provides standard reference"
          }
        ]
      }
    },

    contactInformation: {
      description: "Client contact details for delivery and communication",
      fields: [
        {
          name: "contact",
          type: "Text",
          required: false,
          description: "Primary contact person name"
        },
        {
          name: "phone",
          type: "Text",
          required: false,
          description: "Contact phone number"
        },
        {
          name: "direction",
          type: "Text",
          required: false,
          description: "Shipping/delivery address"
        },
        {
          name: "taxId",
          type: "Text",
          required: false,
          description: "Client tax identification number"
        }
      ]
    },

    powderProperties: {
      description: "Technical specifications and testing requirements",
      fields: [
        {
          name: "filmThickness",
          type: "Number",
          unit: "mil",
          required: false,
          description: "Target coating thickness"
        },
        {
          name: "specificGravity",
          type: "Select",
          source: "Configuration: Specific Gravity ranges",
          required: false,
          description: "Powder density specification"
        },
        {
          name: "gloss60",
          type: "Select", 
          source: "Configuration: Gloss standards",
          required: false,
          description: "Gloss measurement at 60° angle"
        },
        {
          name: "hardness",
          type: "Select",
          source: "Configuration: Hardness Standards",
          required: false,
          description: "Durability testing protocol"
        },
        {
          name: "indirectImpact",
          type: "Select",
          source: "Configuration: Impact Standards",
          required: false,
          description: "Reverse side impact resistance"
        },
        {
          name: "directImpact",
          type: "Select",
          source: "Configuration: Impact Standards", 
          required: false,
          description: "Direct impact resistance"
        },
        {
          name: "flexibility",
          type: "Select",
          source: "Configuration: Flexibility Standards",
          required: false,
          description: "Bend and flex testing requirements"
        },
        {
          name: "saltSpray",
          type: "Select",
          source: "Configuration: Salt Spray Standards",
          required: false,
          description: "Corrosion resistance testing"
        },
        {
          name: "quv",
          type: "Select",
          source: "Configuration: QUV Standards",
          required: false,
          description: "UV weathering test protocols"
        },
        {
          name: "crTechnology",
          type: "Boolean", 
          required: false,
          description: "Chrome-free technology requirement"
        },
        {
          name: "extraProperties",
          type: "Boolean",
          required: false,
          description: "Additional special properties needed",
          conditionalText: "Reveal text input when true"
        }
      ]
    }
  },

  businessLogicRules: {
    laboratoryBasedDefaults: [
      {
        condition: "Laboratory = 'Houston' OR 'M&M Houston'",
        actions: [
          "Set price unit default to 'lb/USD'",
          "Allow temperature unit selection (°C or °F)",
          "Enable US-specific validation rules"
        ]
      },
      {
        condition: "Laboratory = 'Lerma'", 
        actions: [
          "Set price unit default to 'kg/MXN'",
          "Force temperature unit to '°C' only",
          "Apply Mexico-specific validation rules"
        ]
      }
    ],

    validationRules: [
      {
        field: "targetSalesPrice",
        rule: "Must be positive number",
        message: "Target sales price must be greater than 0"
      },
      {
        field: "cureTemperature", 
        rule: "Must be positive number",
        message: "Cure temperature must be greater than 0"
      },
      {
        field: "cureTime",
        rule: "Must be positive integer",
        message: "Cure time must be a positive whole number"
      },
      {
        field: "annualConsumption",
        rule: "Must be positive number",
        message: "Annual consumption must be greater than 0"
      }
    ],

    businessProcessRules: [
      {
        rule: "Fantasy Name Assignment",
        description: "Client provides proposed product name, laboratory assigns technical name after acceptance"
      },
      {
        rule: "Micro-Production Eligibility",
        description: "Annual consumption ≤150kg triggers micro-production workflow consideration"
      },
      {
        rule: "Material Compatibility",
        description: "Selected materials must be compatible with chemistry type through material classification matrix"
      }
    ]
  },

  implementationExample: {
    description: "Code example for LWR-specific form sections",
    
    productSpecificationSection: `
{requestType === 'LWR' && currentStep === 1 && (
  <Card>
    <CardHeader>
      <CardTitle>{t('lwr.product_specification')}</CardTitle>
      <CardDescription>{t('lwr.product_specification_description')}</CardDescription>
    </CardHeader>
    <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <FormField
        control={form.control}
        name='targetSalesPrice'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('lwr.target_sales_price')} *</FormLabel>
            <FormControl>
              <Input
                type='number'
                step='0.01'
                placeholder={laboratory === 'Lerma' ? 'kg/MXN' : 'lb/USD'}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name='chemistry'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('lwr.chemistry')} *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('lwr.select_chemistry')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {chemistryTypes.map((type) => (
                  <SelectItem key={type.id} value={type.name}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* More fields... */}
    </CardContent>
  </Card>
)}`,

    conditionalSectionExample: `
// Client Panel Section Toggle
<div className='flex items-center space-x-2 mb-4'>
  <Switch
    id='client-panels'
    checked={showClientPanels}
    onCheckedChange={setShowClientPanels}
  />
  <Label htmlFor='client-panels'>{t('lwr.client_panel_section')}</Label>
</div>

{showClientPanels && (
  <Card>
    <CardHeader>
      <CardTitle>{t('lwr.client_panel_requirements')}</CardTitle>
    </CardHeader>
    <CardContent className='grid grid-cols-2 gap-4'>
      <FormField
        control={form.control}
        name='clientSteelPanel'
        render={({ field }) => (
          <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>{t('lwr.client_steel_panel')}</FormLabel>
          </FormItem>
        )}
      />
      
      {/* More checkbox fields... */}
    </CardContent>
  </Card>
)}`,

    validationSchemaExample: `
// LWR-specific validation rules
.refine((data) => {
  if (data.requestType === 'LWR') {
    return data.targetSalesPrice && 
           data.chemistry && 
           data.color && 
           data.finish &&
           data.cureTemperature && 
           data.cureTime;
  }
  return true;
}, {
  message: 'All required LWR fields must be completed',
  path: ['lwrFields'],
})
.refine((data) => {
  // Temperature unit validation for LWR
  if (data.requestType === 'LWR' && data.laboratory === 'Lerma') {
    if (data.temperatureUnit && data.temperatureUnit !== '°C') {
      return false;
    }
  }
  return true;
}, {
  message: 'Lerma laboratory only supports Celsius temperature units',
  path: ['cureTemperature'],
})`
  },

  statusWorkflow: {
    description: "Status progression for LWR requests",
    
    statuses: [
      {
        status: "PENDING_INFO",
        description: "Initial state after form submission",
        nextActions: ["Manager review", "Request additional information"]
      },
      {
        status: "IN_REVIEW", 
        description: "Under manager evaluation",
        nextActions: ["Accept", "Reject", "Request modifications"]
      },
      {
        status: "ACCEPTED",
        description: "Approved for formulation development",
        nextActions: ["Assign to laboratory", "Begin formulation"]
      },
      {
        status: "FORMULATION_IN_PROGRESS",
        description: "Laboratory developing formulation",
        nextActions: ["Complete formulation", "Request client feedback"]
      },
      {
        status: "FORMULATION_COMPLETED",
        description: "Formulation ready for validation",
        nextActions: ["Quality validation", "Client approval"]
      },
      {
        status: "SAMPLE_DELIVERED",
        description: "Sample provided to client",
        nextActions: ["Client feedback", "Production planning"]
      },
      {
        status: "CLOSED",
        description: "Request completed successfully",
        nextActions: ["Archive", "Create production order"]
      }
    ]
  },

  integrationPoints: [
    "Client Management System - Customer lookup and validation",
    "Configuration System - All dropdown options from config pages",
    "Laboratory Assignment - Based on request type and location",
    "Material Classification - Validate material compatibility",
    "Inventory System - Check material availability for formulation",
    "Production Planning - Hand-off for sample manufacturing",
    "Quality Control - Testing protocol assignment",
    "Notification System - Status change alerts to relevant stakeholders"
  ],

  reportingAndAnalytics: [
    "LWR request volume by laboratory and time period",
    "Average processing time from submission to delivery",
    "Success rate of formulation development",
    "Most requested chemistry types and color specifications",
    "Client satisfaction metrics and feedback analysis",
    "Cost analysis by product specification complexity"
  ]
};

export default lwrRequestWorkflow;