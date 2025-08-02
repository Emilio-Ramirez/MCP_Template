export const multiStepForms = {
  name: "Multi-Step Forms Implementation",
  description: "Advanced multi-step form system with progressive validation, stepper UI, and form state management for complex ERP workflows",
  
  overview: {
    purpose: "Break complex forms into manageable sections with progressive validation and visual progress indicators",
    useCase: "Chemical request workflows, configuration wizards, and complex data entry processes",
    keyFeatures: [
      "Progressive validation (validate current step before advancing)",
      "Visual progress indicator with stepper UI", 
      "Step-by-step field grouping and validation",
      "Proper form state management across steps",
      "File upload integration",
      "Translation support"
    ]
  },

  coreImplementation: {
    description: "Fundamental structure for multi-step forms",
    
    basicStructure: `
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const steps = [
  { id: 1, name: 'Basic Info', description: 'Client information and request type' },
  { id: 2, name: 'Requirements', description: 'Technical specifications and requirements' },
  { id: 3, name: 'Files & Timeline', description: 'Attach files, set deadlines, and add comments' }
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = steps.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',           // ✅ Validate immediately as user types
    reValidateMode: 'onChange', // ✅ Re-validate on every change
    defaultValues: {
      // Always provide default values for all fields
      clientId: '',
      description: '',
      attachedFiles: [],
      // ... all other fields
    }
  });

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, totalSteps - 1));
  const previousStep = () => setCurrentStep(Math.max(currentStep - 1, 0));

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Stepper UI */}
      <StepperUI steps={steps} currentStep={currentStep} />
      
      {/* Form Content */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* Step rendering */}
          {currentStep === 0 && <BasicInfoStep />}
          {currentStep === 1 && <RequirementsStep />}
          {currentStep === 2 && <FilesTimelineStep />}
          
          {/* Navigation */}
          <NavigationControls 
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            onPrevious={previousStep}
            onNext={handleNext}
            isSubmitting={isSubmitting}
          />
        </form>
      </Form>
    </div>
  );
}`,

    formConfiguration: `
// CRITICAL: Proper form configuration for validation
const form = useForm<FormValues>({
  resolver: zodResolver(requestSchema),
  mode: 'onChange',           // Validate immediately as user types
  reValidateMode: 'onChange', // Re-validate on every change
  defaultValues: {
    // Always provide default values for ALL fields
    clientId: '',
    requestType: '',
    fantasyName: '',
    description: '',
    targetSalesPrice: '',
    chemistry: '',
    color: '',
    requiredDate: undefined,
    attachedFiles: [],
    notes: '',
    // ... include every field in your schema
  }
});`
  },

  stepValidationPatterns: {
    description: "Progressive validation system that validates current step before allowing navigation",
    
    fieldMappingPattern: `
const getFieldsForStep = (step: number, requestType?: string): (keyof FormValues)[] => {
  switch (step) {
    case 0: // Basic Info
      return ['clientId', 'requestType', 'fantasyName', 'description'];
    
    case 1: // Requirements (varies by request type)
      if (requestType === 'LWR') {
        return ['targetSalesPrice', 'chemistry', 'color', 'finish', 'cureTemperature', 'cureTime'];
      } else if (requestType === 'TLWR') {
        return ['testObjective', 'chemistry', 'finish', 'supplier'];
      } else if (requestType === 'VLWR') {
        return ['materialToTest', 'sampleId', 'supplier'];
      }
      return [];
    
    case 2: // Files & Timeline
      return ['requiredDate'];
    
    default:
      return [];
  }
};`,

    validationLogic: `
const validateCurrentStep = async () => {
  const requestType = form.watch('requestType');
  const fieldsToValidate = getFieldsForStep(currentStep, requestType);
  
  if (fieldsToValidate.length === 0) {
    return true; // No validation needed for this step
  }
  
  const isValid = await form.trigger(fieldsToValidate);
  return isValid;
};

const handleNext = async () => {
  const isValid = await validateCurrentStep();
  if (isValid) {
    nextStep();
  } else {
    // Validation errors will be shown automatically
    console.log('Validation failed for step:', currentStep);
  }
};`
  },

  stepperUIComponent: {
    description: "Visual progress indicator with step status and navigation",
    
    implementation: `
interface StepperUIProps {
  steps: { id: number; name: string; description: string }[];
  currentStep: number;
}

export const StepperUI: React.FC<StepperUIProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
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
                <p
                  className={cn(
                    'text-sm font-medium',
                    index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.name}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'mx-4 h-0.5 w-8 lg:w-16', // Fixed width instead of flex-1
                  index < currentStep ? 'bg-primary' : 'bg-muted'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Current step description */}
      <div className='mt-2'>
        <p className='text-sm text-muted-foreground'>
          {steps[currentStep]?.description}
        </p>
      </div>
    </div>
  );
};`,

    stylingNotes: [
      "Use React.Fragment for cleaner layout structure",
      "Fixed-width lines (w-8 lg:w-16) instead of flex-1 for consistent spacing",
      "Conditional styling based on step completion status",
      "Responsive design with different widths for mobile/desktop"
    ]
  },

  validationSchemas: {
    description: "Comprehensive validation with business rule enforcement",
    
    schemaStructure: `
export const requestSchema = z.object({
  // Basic fields (shared across all types)
  clientId: z.string().min(1, 'Client is required'),
  requestType: z.enum(['LWR', 'TLWR', 'VLWR', 'MICRO_PRODUCTION']),
  fantasyName: z.string().min(1, 'Product name is required'),
  description: z.string()
    .min(1, 'Description is required')
    .transform(val => val.trim())          // ✅ Auto-trim whitespace
    .pipe(
      z.string()
        .min(1, 'Description cannot be empty')
        .min(10, 'Description must be at least 10 characters')
    ),
  
  // Request-type specific fields (all optional in base schema)
  targetSalesPrice: z.number().optional(),
  chemistry: z.string().optional(),
  color: z.string().optional(),
  finish: z.string().optional(),
  cureTemperature: z.number().optional(),
  cureTime: z.number().optional(),
  
  // ... more fields
  
  requiredDate: z.date().optional(),
  attachedFiles: z.array(z.any()).optional(),
  notes: z.string().optional(),
})
.refine((data) => {
  // LWR-specific validation
  if (data.requestType === 'LWR') {
    return data.targetSalesPrice && data.chemistry && data.color && 
           data.cureTemperature && data.cureTime;
  }
  return true;
}, {
  message: 'All required LWR fields must be completed',
  path: ['lwrFields'], // This will show error at form level
})
.refine((data) => {
  // TLWR-specific validation  
  if (data.requestType === 'TLWR') {
    return data.testObjective && data.chemistry && data.finish;
  }
  return true;
}, {
  message: 'All required TLWR fields must be completed',
  path: ['tlwrFields'],
});`,

    businessRuleValidation: `
// Sample size validation for TLWR
.refine((data) => {
  if (data.requestType === 'TLWR' && data.sampleSize) {
    const size = parseFloat(data.sampleSize);
    if (data.sampleSize.includes('kg')) {
      return size <= 100; // 100kg max for kg units
    } else if (data.sampleSize.includes('lb')) {
      return size <= 10;  // 10lb max for lb units
    }
  }
  return true;
}, {
  message: 'Sample size exceeds limits (100kg max or 10lb max)',
  path: ['sampleSize'],
});`,

    criticalValidationFix: `
// CRITICAL: Schema validation rules must match form structure exactly
// ❌ Wrong: Validating fields that don't exist in current form
.refine((data) => {
  if (data.requestType !== 'MICRO_PRODUCTION') {
    return data.testField && data.testField.length > 0; // This fails for LWR!
  }
  return true;
})

// ✅ Correct: Type-specific validation only
.refine((data) => {
  // Only validate testField for VLWR
  if (data.requestType === 'VLWR') {
    return data.testField && data.testField.length > 0;
  }
  return true;
})`
  },

  conditionalRendering: {
    description: "Dynamic form rendering based on step and request type",
    
    stepBasedRendering: `
{/* Step 1: Basic Info (shared across all request types) */}
{currentStep === 0 && (
  <Card>
    <CardHeader>
      <CardTitle>{t('basic_information')}</CardTitle>
    </CardHeader>
    <CardContent className='space-y-4'>
      <FormField
        control={form.control}
        name='clientId'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('client')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_client')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* More basic fields */}
    </CardContent>
  </Card>
)}

{/* Step 2: Request-specific requirements */}
{currentStep === 1 && requestType === 'LWR' && (
  <Card>
    <CardHeader>
      <CardTitle>{t('lwr_specifications')}</CardTitle>
    </CardHeader>
    <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      {/* LWR-specific fields */}
    </CardContent>
  </Card>
)}

{currentStep === 1 && requestType === 'TLWR' && (
  <Card>
    <CardHeader>
      <CardTitle>{t('testing_requirements')}</CardTitle>
    </CardHeader>
    <CardContent className='space-y-4'>
      {/* TLWR-specific fields */}
    </CardContent>
  </Card>
)}`,

    toggleSections: `
// Toggle sections for complex forms
const [showClientPanels, setShowClientPanels] = useState(false);
const [showSaltFogTest, setShowSaltFogTest] = useState(false);

{/* Toggle switch */}
<div className='flex items-center space-x-2'>
  <Switch
    id='client-panels'
    checked={showClientPanels}
    onCheckedChange={setShowClientPanels}
  />
  <Label htmlFor='client-panels'>{t('client_panel_section')}</Label>
</div>

{/* Conditional section */}
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
    </CardContent>
  </Card>
)}`
  },

  fileUploadIntegration: {
    description: "File upload system optimized for multi-step forms",
    
    correctImplementation: `
// ✅ CORRECT: For multi-step forms, omit onUpload prop
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
          // ✅ No onUpload prop - files stay in form state until submission
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>`,

    commonMistake: `
// ❌ WRONG: Files disappear after selection
<FileUploader
  value={field.value || []}
  onValueChange={field.onChange}
  onUpload={async (files) => {
    // Files get cleared after this function runs!
    console.log('Files uploaded:', files);
  }}
/>`,

    submissionHandling: `
const onSubmit = async (values: FormValues) => {
  try {
    // Handle file upload during form submission
    if (values.attachedFiles && values.attachedFiles.length > 0) {
      console.log('Uploading files:', values.attachedFiles);
      // const fileUrls = await uploadFiles(values.attachedFiles);
      // values.attachedFileUrls = fileUrls;
    }
    
    // Process form data
    console.log('Form submission:', values);
    
    toast.success(t('success.request_created'), {
      icon: <IconCheck className="h-4 w-4 text-green-600" />
    });
    
    router.push('/requests');
  } catch (error) {
    console.error('Form submission error:', error);
    toast.error(t('error.submission_failed'));
  }
};`
  },

  navigationControls: {
    description: "Navigation button implementation with proper state management",
    
    implementation: `
interface NavigationControlsProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
  isSubmitting: boolean;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  isFirstStep,
  isLastStep,
  onPrevious,
  onNext,
  isSubmitting
}) => {
  const t = useTranslations('Common.form');
  const router = useRouter();

  return (
    <div className='flex items-center justify-between'>
      {/* Previous Button */}
      <Button
        type='button'
        variant='outline'
        onClick={onPrevious}
        disabled={isFirstStep}
      >
        {t('previous')}
      </Button>

      <div className='flex gap-2'>
        {/* Cancel Button */}
        <Button
          type='button'
          variant='outline'
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          {t('cancel')}
        </Button>

        {/* Next/Submit Button */}
        {!isLastStep ? (
          <Button type='button' onClick={onNext}>
            {t('next')}
          </Button>
        ) : (
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? t('creating') : t('create_request')}
          </Button>
        )}
      </div>
    </div>
  );
};`
  },

  commonIssues: {
    description: "Common problems and their solutions",
    
    issues: [
      {
        problem: "Multi-page validation errors",
        symptoms: [
          "Submit button clicks but form doesn't submit",
          "Console shows validation errors for non-existent fields",
          "Single-page forms work but multi-page forms fail"
        ],
        rootCause: "Schema validation rules don't match the actual form structure",
        solution: `
// ✅ Ensure schema validation rules exactly match your form structure
.refine((data) => {
  // Only validate fields that exist in your form
  if (data.requestType === 'LWR') {
    return data.lwrTest1 && data.lwrTest1.length > 0;
  }
  return true;
}, {
  message: 'LWR Test 1 is required',
  path: ['lwrTest1'],
})`
      },
      {
        problem: "Files disappear after selection",
        symptoms: [
          "Files show as selected then disappear",
          "File list becomes empty after upload",
          "Form submission has no files"
        ],
        rootCause: "Using onUpload prop causes automatic file clearing",
        solution: "Remove onUpload prop from FileUploader in multi-step forms"
      },
      {
        problem: "Textarea validation persists after filling",
        symptoms: [
          "Error message stays visible after user types",
          "Form won't advance despite filled textarea",
          "Validation seems delayed or stuck"
        ],
        rootCause: "Using mode: 'onBlur' with custom onBlur handlers",
        solution: `
// ✅ Use onChange mode and simple field spread
const form = useForm({
  mode: 'onChange',
  reValidateMode: 'onChange'
});

// ✅ Simple field spread - no custom handlers
<Textarea {...field} />`
      },
      {
        problem: "Stepper lines not connecting properly",
        symptoms: [
          "Visual gaps between steps",
          "Lines don't span full width",
          "Layout breaks on different screen sizes"
        ],
        rootCause: "Complex nested flex causing layout issues",
        solution: "Use React.Fragment and fixed-width lines instead of flex-1"
      }
    ]
  },

  bestPractices: [
    "Always use mode: 'onChange' for immediate validation feedback",
    "Provide default values for ALL fields in the schema",
    "Use progressive validation - validate current step before advancing",
    "Keep files in form state until final submission (no onUpload prop)",
    "Use React.Fragment for cleaner stepper layouts",
    "Implement proper loading states during form submission",
    "Show clear progress indicators and step descriptions",
    "Use consistent styling and layout patterns",
    "Test validation rules thoroughly for each step/type combination",
    "Provide immediate visual feedback for validation errors"
  ],

  debuggingTips: [
    "Add console.log to track form values and validation state",
    "Use form.formState.errors to identify validation issues", 
    "Test each step's validation independently",
    "Verify field mapping matches schema exactly",
    "Check that default values are provided for all fields",
    "Test file upload behavior in isolation",
    "Validate responsive behavior on different screen sizes"
  ]
};

export default multiStepForms;