export const chemicalRequestWorkflows = {
  name: "Chemical Request Workflows",
  description: "Comprehensive workflow system for LWR/TLWR/VLWR chemical request types with multi-step forms, validation patterns, and business logic",
  
  overview: {
    purpose: "Manage complex chemical formulation requests through structured workflows with type-specific forms and validation",
    requestTypes: ["LWR (Lab Work Request)", "TLWR (Testing Lab Work Request)", "VLWR (Vitracoat Lab Work Request)", "Micro Production"],
    architecture: "Multi-step forms with progressive validation, dynamic field rendering, and business rule enforcement"
  },

  requestTypeDefinitions: {
    LWR: {
      name: "Laboratory Work Request",
      purpose: "Product development and formulation requests",
      description: "Standard requests for developing new powder coating formulations based on client specifications",
      businessContext: "Primary workflow for new product development with comprehensive specifications",
      
      formStructure: {
        pages: ["Basic Info", "Product Specification", "Application Parameters", "Powder Properties", "Notes & Files"],
        totalFields: 45,
        conditionalSections: ["Client Panel Section", "Seller Panel Section"],
        requiredValidations: ["Target Price", "Chemistry", "Color", "Cure Temperature", "Cure Time"]
      },

      specificFields: {
        productSpecification: [
          "Target Sales Price (Currency)",
          "Standard Type", 
          "Standard Code (Number)",
          "Competition",
          "Chemistry",
          "Color",
          "Finish", 
          "Metallic (Boolean)",
          "Light",
          "Substrate",
          "Pre-Treatment",
          "Annual Consumption (lbs)",
          "Market Segmentation",
          "Specific End Use (Text)"
        ],
        applicationParameters: [
          "Application Mode (Boolean)",
          "Application System",
          "Application Method", 
          "Application Equipment",
          "Dwell Time (minutes)",
          "Cure Time (minutes) - Required",
          "Cure Temperature (°F) - Required",
          "Oven Set (°F)"
        ],
        powderProperties: [
          "Film Thickness (mil)",
          "Specific Gravity",
          "Gloss @ 60°", 
          "Hardness",
          "Indirect Impact",
          "Direct Impact",
          "Flexibility",
          "Salt Spray",
          "QUV",
          "CR Technology (Boolean)",
          "Extra properties (Boolean with conditional text)"
        ]
      },

      businessLogic: [
        "Price unit defaults based on laboratory location (Houston: lb/USD, Lerma: kg/MXN)",
        "Temperature units: USA labs allow °C or °F, Mexico labs only °C",
        "Fantasy name provided by client, technical name assigned by laboratory",
        "Annual consumption drives micro-production eligibility"
      ]
    },

    TLWR: {
      name: "Testing Lab Work Request", 
      purpose: "Testing services for existing products or samples",
      description: "Requests for quality control testing, material evaluation, and compliance verification",
      businessContext: "Quality assurance workflow for existing products and competitor analysis",
      
      formStructure: {
        pages: ["Basic Info", "Testing Information", "Test Configurations", "Sample Requirements", "Notes & Files"],
        totalFields: 32,
        conditionalSections: ["Salt Fog Test", "QUV Test", "QSun Test (Xenon Arc)", "Powder Sample"],
        requiredValidations: ["Test Objective", "Chemistry", "Finish"]
      },

      specificFields: {
        testingInformation: [
          "Objective (Test Objectives)", 
          "Chemistry",
          "Finish",
          "Final Report (Boolean)",
          "Supplier"
        ],
        requirements: [
          "Enclosed (Enclosed Types)",
          "Enclosed Specifications (Boolean)",
          "Substrate"
        ],
        testConfigurations: [
          "Salt Fog Test: Pretreatment, Panels Prepared By, Exposure Hours, Report Types, Report Frequency",
          "QUV Test: Lamp Type, Panels Prepared By, Exposure Hours, Report Frequency", 
          "QSun Test: Panels Prepared By, Exposure Hours, Report Frequency"
        ],
        sampleRequirements: [
          "Sample Size (Text with kg/lb limits)",
          "Panels Aluminum 3x6 (Number with W×H composite)",
          "Panels Steel 3x6 (Number with W×H composite)",
          "Color Chips 2x2.5 (Number with W×H composite)"
        ]
      },

      validationRules: [
        "Powder sample size limits: 100kg max for kg units, 10lb max for lb units",
        "Panel dimensions must be specified (default 3x6)",
        "At least one test configuration must be selected",
        "Lamp type 'Other' requires custom text input"
      ]
    },

    VLWR: {
      name: "Vitracoat Lab Work Request",
      purpose: "Internal testing for raw materials and finished products", 
      description: "Internal workflow for material evaluation, quality control, and R&D testing",
      businessContext: "Internal quality assurance and research workflow with comprehensive testing protocols",
      
      formStructure: {
        pages: ["Basic Info", "Requirements", "Material Evaluation", "Test Configurations", "Notes & Files"],
        totalFields: 38,
        conditionalSections: ["Requirements to Evaluate Raw Material", "Requirements to Evaluate Finished Powder", "Multiple Test Sections"],
        requiredValidations: ["Material to Test", "Sample ID", "Supplier"]
      },

      specificFields: {
        requirements: [
          "Material to Test (Material Types)",
          "Sample ID (Number)",
          "Supplier",
          "SDS (Boolean)",
          "CoA (Boolean)", 
          "Enclosed (Enclosed Types)",
          "Number of Panels (Number)",
          "Reason of Testing (Test Objectives)",
          "TDS (Boolean)",
          "Additional Information (Boolean with conditional text)",
          "Sample Amount (lbs)"
        ],
        rawMaterialEvaluation: [
          "Control ID (Text)",
          "Additional Tests/Test Type (Test Types)",
          "Test as Per (Test Matrix Types)", 
          "Final Report (Boolean)"
        ],
        finishedPowderEvaluation: [
          "Compared To (Text)",
          "Manufacturer (Manufacturer Types)",
          "Other Equipment (Equipment)"
        ]
      },

      uniqueFeatures: [
        "Material Types: Competitors Sample, Vitracoat Product, Raw Material types",
        "Test Types: QUV-A & B, QUV-A, QUV-B, Salt Spray, Humidity",
        "Test Matrix Types: Resin, Crosslinker, Additive, Pigment Test Matrix",
        "Manufacturer Types: Vitracoat Prod, Competitor Sample, New Research"
      ]
    },

    MICRO_PRODUCTION: {
      name: "Micro Production",
      purpose: "Small batch production requests",
      description: "Manufacturing requests for sample quantities typically under 150kg",
      businessContext: "Production workflow for samples and small batch manufacturing",
      
      formStructure: {
        pages: ["Basic Info", "Production Details", "Notes & Files"],
        totalFields: 8,
        restrictions: ["Laboratory restricted to 'Lerma' only"],
        requiredValidations: ["Product", "SAP ID", "Zone", "Size/Sample"]
      },

      specificFields: {
        productionDetails: [
          "Product (with dialog details button)",
          "SAP ID (Text)",
          "Zone",
          "Size/Sample (kg)"
        ]
      },

      businessRules: [
        "Only available for Lerma laboratory",
        "Requires existing product selection", 
        "SAP integration for product lookup",
        "Size typically limited to small batches"
      ]
    }
  },

  multiStepFormImplementation: {
    description: "Advanced multi-step form system with progressive validation and dynamic rendering",
    
    coreStructure: `
const [currentStep, setCurrentStep] = useState(0);
const [requestType, setRequestType] = useState('');
const totalSteps = getStepsForRequestType(requestType).length;

const form = useForm<FormValues>({
  resolver: zodResolver(requestSchema),
  mode: 'onChange',           // Validate immediately as user types
  reValidateMode: 'onChange', // Re-validate on every change
  defaultValues: {
    // Always provide default values for all fields
    clientId: '',
    requestType: '',
    fantasyName: '',
    description: '',
    // ... all other fields
  }
});`,

    stepValidationPattern: `
const getFieldsForStep = (stepName: string, requestType: string): (keyof FormValues)[] => {
  switch (stepName) {
    case 'Basic Info':
      return ['clientId', 'requestType', 'fantasyName', 'description'];
    case 'LWR Product Specification':
      if (requestType === 'LWR') {
        return ['targetSalesPrice', 'standardType', 'chemistry', 'color', 'finish'];
      }
      return [];
    case 'TLWR Testing Information':
      if (requestType === 'TLWR') {
        return ['testObjective', 'chemistry', 'finish', 'supplier'];
      }
      return [];
    // ... more cases
    default:
      return [];
  }
};

const validateCurrentStep = async () => {
  const fieldsToValidate = getFieldsForStep(currentStepName, requestType);
  const isValid = await form.trigger(fieldsToValidate);
  return isValid;
};

const handleNext = async () => {
  const isValid = await validateCurrentStep();
  if (isValid) {
    setCurrentStep(Math.min(currentStep + 1, totalSteps - 1));
  }
};`,

    dynamicFormRendering: `
// Conditional step rendering based on request type
{requestType === 'LWR' && currentStep === 1 && (
  <Card>
    <CardHeader>
      <CardTitle>{t('product_specification')}</CardTitle>
    </CardHeader>
    <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <FormField
        control={form.control}
        name='targetSalesPrice'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('target_sales_price')}</FormLabel>
            <FormControl>
              <Input type='number' step='0.01' {...field} />
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
            <FormLabel>{t('chemistry')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_chemistry')} />
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
)}

{requestType === 'TLWR' && currentStep === 1 && (
  <Card>
    <CardHeader>
      <CardTitle>{t('testing_information')}</CardTitle>
    </CardHeader>
    <CardContent className='space-y-4'>
      {/* TLWR specific fields */}
    </CardContent>
  </Card>
)}`,

    stepperUIPattern: `
<div className='flex items-center justify-between'>
  {steps.map((step, index) => (
    <React.Fragment key={step.id}>
      <div className='flex items-center'>
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium',
            index <= currentStep
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-muted bg-background text-muted-foreground'
          )}
        >
          {index < currentStep ? '✓' : step.id}
        </div>
        <div className='ml-3 min-w-0 flex-1'>
          <p className={cn(
            'text-sm font-medium',
            index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
          )}>
            {step.name}
          </p>
        </div>
      </div>
      {index < steps.length - 1 && (
        <div className={cn(
          'mx-4 h-0.5 w-8 lg:w-16',
          index < currentStep ? 'bg-primary' : 'bg-muted'
        )} />
      )}
    </React.Fragment>
  ))}
</div>`
  },

  validationPatterns: {
    description: "Comprehensive validation system with Zod schemas and business rule enforcement",
    
    schemaStructure: `
export const requestSchema = z.object({
  // Basic fields (shared across all types)
  clientId: z.string().min(1, 'Client is required'),
  requestType: z.enum(['LWR', 'TLWR', 'VLWR', 'MICRO_PRODUCTION']),
  fantasyName: z.string().min(1, 'Product name is required'),
  description: z.string()
    .min(1, 'Description is required')
    .transform(val => val.trim())
    .pipe(
      z.string()
        .min(1, 'Description cannot be empty')
        .min(10, 'Description must be at least 10 characters')
    ),
  
  // LWR specific fields
  targetSalesPrice: z.number().optional(),
  standardType: z.string().optional(),
  chemistry: z.string().optional(),
  color: z.string().optional(),
  finish: z.string().optional(),
  cureTemperature: z.number().optional(),
  cureTime: z.number().optional(),
  
  // TLWR specific fields
  testObjective: z.string().optional(),
  supplier: z.string().optional(),
  sampleSize: z.string().optional(),
  
  // VLWR specific fields
  materialToTest: z.string().optional(),
  sampleId: z.string().optional(),
  sampleAmount: z.number().optional(),
  
  // Micro Production specific fields
  productId: z.string().optional(),
  sapId: z.string().optional(),
  zone: z.string().optional(),
  productionSize: z.number().optional(),
  
  // Shared fields
  requiredDate: z.date().optional(),
  attachedFiles: z.array(z.any()).optional(),
  notes: z.string().optional(),
})
.refine((data) => {
  // LWR validation rules
  if (data.requestType === 'LWR') {
    return data.targetSalesPrice && data.chemistry && data.color && 
           data.cureTemperature && data.cureTime;
  }
  return true;
}, {
  message: 'All required LWR fields must be completed',
  path: ['lwrFields'],
})
.refine((data) => {
  // TLWR validation rules
  if (data.requestType === 'TLWR') {
    return data.testObjective && data.chemistry && data.finish;
  }
  return true;
}, {
  message: 'All required TLWR fields must be completed',
  path: ['tlwrFields'],
})
.refine((data) => {
  // VLWR validation rules
  if (data.requestType === 'VLWR') {
    return data.materialToTest && data.sampleId && data.supplier;
  }
  return true;
}, {
  message: 'All required VLWR fields must be completed',
  path: ['vlwrFields'],
})
.refine((data) => {
  // Micro Production validation rules
  if (data.requestType === 'MICRO_PRODUCTION') {
    return data.productId && data.sapId && data.zone && data.productionSize;
  }
  return true;
}, {
  message: 'All required Micro Production fields must be completed',
  path: ['microProductionFields'],
})
.refine((data) => {
  // Sample size validation for TLWR
  if (data.requestType === 'TLWR' && data.sampleSize) {
    const size = parseFloat(data.sampleSize);
    if (data.sampleSize.includes('kg')) {
      return size <= 100;
    } else if (data.sampleSize.includes('lb')) {
      return size <= 10;
    }
  }
  return true;
}, {
  message: 'Sample size exceeds limits (100kg max or 10lb max)',
  path: ['sampleSize'],
});`,

    businessRuleValidation: `
// Laboratory-based validation
const validateLabSpecificRules = (data: FormValues) => {
  const laboratory = data.laboratory;
  
  // Price unit validation
  if (laboratory === 'Houston' || laboratory === 'M&M Houston') {
    // Default to lb/USD for US laboratories
    if (!data.priceUnit) {
      data.priceUnit = 'lb/USD';
    }
  } else if (laboratory === 'Lerma') {
    // Default to kg/MXN for Mexico laboratory
    if (!data.priceUnit) {
      data.priceUnit = 'kg/MXN';
    }
  }
  
  // Temperature unit validation
  if (laboratory === 'Lerma') {
    // Mexico labs only allow Celsius
    if (data.temperatureUnit && data.temperatureUnit !== '°C') {
      throw new Error('Lerma laboratory only supports Celsius temperature units');
    }
    data.temperatureUnit = '°C';
  }
  
  // Micro production laboratory restriction
  if (data.requestType === 'MICRO_PRODUCTION' && laboratory !== 'Lerma') {
    throw new Error('Micro Production is only available for Lerma laboratory');
  }
  
  return data;
};`,

    fieldSpecificValidation: `
// Panel number composite field validation
const validatePanelNumbers = (fieldValue: string) => {
  const parts = fieldValue.split('x');
  if (parts.length !== 3) {
    throw new Error('Panel format must be "quantity x width x height"');
  }
  
  const [quantity, width, height] = parts.map(p => parseInt(p.trim()));
  
  if (isNaN(quantity) || isNaN(width) || isNaN(height)) {
    throw new Error('All panel dimensions must be valid numbers');
  }
  
  if (quantity < 1 || width < 1 || height < 1) {
    throw new Error('All panel dimensions must be positive numbers');
  }
  
  return { quantity, width, height };
}`
  },

  conditionalFieldRendering: {
    description: "Dynamic field rendering based on request type and user selections",
    
    toggleSectionPattern: `
const [showClientPanels, setShowClientPanels] = useState(false);
const [showSellerPanels, setShowSellerPanels] = useState(false);
const [showSaltFogTest, setShowSaltFogTest] = useState(false);

// Toggle sections for LWR
{requestType === 'LWR' && (
  <>
    <div className='flex items-center space-x-2'>
      <Switch
        id='client-panels'
        checked={showClientPanels}
        onCheckedChange={setShowClientPanels}
      />
      <Label htmlFor='client-panels'>{t('client_panel_section')}</Label>
    </div>
    
    {showClientPanels && (
      <Card>
        <CardContent className='grid grid-cols-2 gap-4 pt-6'>
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
                <FormLabel>{t('client_steel_panel')}</FormLabel>
              </FormItem>
            )}
          />
          {/* More client panel fields */}
        </CardContent>
      </Card>
    )}
  </>
)}`,

    otherOptionPattern: `
// Fields with "Other" option that reveal text inputs
<FormField
  control={form.control}
  name='substrate'
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('substrate')}</FormLabel>
      <Select onValueChange={(value) => {
        field.onChange(value);
        setShowSubstrateOther(value === 'Other');
      }}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={t('select_substrate')} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {substrateTypes.map((type) => (
            <SelectItem key={type.id} value={type.name}>
              {type.name}
            </SelectItem>
          ))}
          <SelectItem value='Other'>{t('other')}</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

{showSubstrateOther && (
  <FormField
    control={form.control}
    name='substrateOther'
    render={({ field }) => (
      <FormItem>
        <FormLabel>{t('custom_substrate')}</FormLabel>
        <FormControl>
          <Input placeholder={t('enter_custom_substrate')} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)}`,

    compositeFieldPattern: `
// Panel number composite fields (Quantity x Width x Height)
const PanelNumberField = ({ name, label, defaultWidth = 3, defaultHeight = 6 }) => {
  const [quantity, setQuantity] = useState('');
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  
  const updateCompositeValue = () => {
    const compositeValue = \`\${quantity}x\${width}x\${height}\`;
    form.setValue(name, compositeValue);
  };
  
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className='flex items-center space-x-2'>
        <Input
          type='number'
          placeholder='Qty'
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            updateCompositeValue();
          }}
          className='w-20'
        />
        <span>×</span>
        <Input
          type='number'
          value={width}
          onChange={(e) => {
            setWidth(e.target.value);
            updateCompositeValue();
          }}
          className='w-20'
        />
        <span>×</span>
        <Input
          type='number'
          value={height}
          onChange={(e) => {
            setHeight(e.target.value);
            updateCompositeValue();
          }}
          className='w-20'
        />
      </div>
      <FormMessage />
    </FormItem>
  );
};`
  },

  fileUploadIntegration: {
    description: "File upload system for request attachments with validation and state management",
    
    implementation: `
<FormField
  control={form.control}
  name='attachedFiles'
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('attach_files')}</FormLabel>
      <FormControl>
        <FileUploader
          value={field.value || []}
          onValueChange={field.onChange}
          maxFiles={5}
          maxSize={4 * 1024 * 1024} // 4MB
          accept={{
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/msword': ['.doc'],
            'image/*': ['.png', '.jpg', '.jpeg'],
            'text/plain': ['.txt']
          }}
          multiple={true}
          // No onUpload prop - files stay in form state until submission
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>`,

    criticalNote: "For multi-step forms, omit the onUpload prop to keep files in form state until final submission. Handle upload in form submission."
  },

  workflowIntegration: {
    description: "Integration with business workflows and status management",
    
    statusTransitions: {
      initial: "PENDING_INFO",
      transitions: [
        "PENDING_INFO → IN_REVIEW (when form submitted)",
        "IN_REVIEW → ACCEPTED (manager approval)",
        "IN_REVIEW → REJECTED (manager rejection)", 
        "ACCEPTED → FORMULATION_IN_PROGRESS (lab assignment)",
        "FORMULATION_IN_PROGRESS → FORMULATION_COMPLETED (validation)",
        "FORMULATION_COMPLETED → SAMPLE_DELIVERED (production)",
        "SAMPLE_DELIVERED → CLOSED (client confirmation)"
      ]
    },

    automationTriggers: [
      "Form submission → Email notification to manager",
      "Manager approval → Assignment to laboratory",
      "Formulation completion → Quality validation trigger",
      "Sample delivery → Client notification",
      "Overdue requests → Escalation notifications"
    ],

    integrationPoints: [
      "Client Management System - Automatic client lookup",
      "Laboratory Assignment - Based on request type and location",
      "Inventory System - Material availability validation", 
      "Production Planning - Sample manufacturing scheduling",
      "Quality Control - Testing protocol assignment",
      "Notification System - Status change alerts"
    ]
  },

  bestPractices: [
    "Always validate fields as user types (mode: 'onChange')",
    "Provide immediate visual feedback for validation errors",
    "Use progressive validation - validate current step before advancing",
    "Implement proper loading states during form submission",
    "Keep files in form state until final submission",
    "Use composite fields for complex data like panel dimensions",
    "Implement proper error handling with user-friendly messages",
    "Provide clear step indicators and progress feedback",
    "Use consistent styling and layout patterns across all request types",
    "Test validation rules thoroughly for each request type"
  ],

  commonIssues: [
    "Multi-page validation errors: Ensure schema rules match form structure exactly",
    "Files disappearing: Don't use onUpload prop in multi-step forms",
    "Step validation not working: Check field mapping and trigger usage",
    "Textarea validation persisting: Use onChange mode, not onBlur",
    "Stepper lines not connecting: Use React.Fragment and fixed-width lines"
  ]
};

export default chemicalRequestWorkflows;