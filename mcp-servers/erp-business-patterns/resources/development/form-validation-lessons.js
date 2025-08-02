export const formValidationLessons = {
  name: "Multi-Step Form Validation Lessons",
  description: "Critical validation lessons learned from ERP form development, including data type consistency, component selection guidance, and debugging strategies for complex multi-step forms",
  
  overview: {
    purpose: "Document critical validation lessons to prevent common pitfalls and ensure robust form validation",
    useCase: "All multi-step forms in ERP systems, particularly LWR/TLWR/VLWR workflows",
    keyLearnings: [
      "Data type consistency prevents validation failures",
      "Switch vs Checkbox component selection has critical implications", 
      "Schema validation must exactly match form structure",
      "Progressive validation requires careful field mapping",
      "Debugging strategies for complex multi-step validation issues"
    ]
  },

  criticalValidationLessons: {
    description: "The most important validation lessons learned through development experience",
    
    dataTypeConsistency: {
      lesson: "Data type mismatches between schema and form fields cause silent validation failures",
      problem: `
// ❌ CRITICAL ERROR: Schema expects number, form provides string
const schema = z.object({
  temperature: z.number().min(1, 'Temperature is required'),
  sampleSize: z.number().min(1, 'Sample size is required')
});

// Form field returns string from Input component
<FormField
  control={form.control}
  name='temperature'
  render={({ field }) => (
    <FormItem>
      <FormLabel>Temperature</FormLabel>
      <FormControl>
        <Input {...field} type="number" /> {/* Returns string! */}
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

// Result: Validation fails silently, form won't submit`,
      
      solution: `
// ✅ SOLUTION 1: Transform strings to numbers in schema
const schema = z.object({
  temperature: z.string()
    .min(1, 'Temperature is required')
    .transform(val => val === '' ? undefined : Number(val))
    .pipe(z.number().min(1, 'Temperature must be at least 1')),
    
  sampleSize: z.string()
    .min(1, 'Sample size is required') 
    .transform(val => val === '' ? undefined : Number(val))
    .pipe(z.number().min(1, 'Sample size must be at least 1'))
});

// ✅ SOLUTION 2: Handle conversion in field onChange
<FormField
  control={form.control}
  name='temperature'
  render={({ field }) => (
    <FormItem>
      <FormLabel>Temperature</FormLabel>
      <FormControl>
        <Input 
          {...field}
          type="number"
          onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

// ✅ SOLUTION 3: Use NumberInput component that handles conversion
<FormField
  control={form.control}
  name='temperature'
  render={({ field }) => (
    <FormItem>
      <FormLabel>Temperature</FormLabel>
      <FormControl>
        <NumberInput {...field} placeholder="180" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>`,

      bestPractice: `
// ✅ RECOMMENDED: Always match schema types to form field return types
const schema = z.object({
  // String fields - most Input components return strings
  productName: z.string().min(1, 'Product name is required'),
  code: z.string().min(1, 'Code is required'),
  
  // Number fields - transform strings to numbers
  temperature: z.string()
    .transform(val => val === '' ? undefined : Number(val))
    .pipe(z.number().min(1, 'Temperature must be positive')),
    
  // Boolean fields - Checkbox/Switch components return boolean
  isUrgent: z.boolean().optional(),
  
  // Date fields - DatePicker components return Date objects
  requiredDate: z.date({ required_error: 'Date is required' }),
  
  // Array fields - MultiSelect/FileUploader return arrays
  attachedFiles: z.array(z.any()).optional()
});`
    },

    switchVsCheckboxGuidance: {
      lesson: "Switch and Checkbox components have different use cases and validation implications",
      
      whenToUseSwitch: `
// ✅ Use Switch for: Settings, toggles, enable/disable states
<FormField
  control={form.control}
  name='isUrgent'
  render={({ field }) => (
    <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
      <FormControl>
        <Switch
          checked={field.value || false}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <FormLabel>Mark as urgent request</FormLabel>
    </FormItem>
  )}
/>

// Switch validation in schema
isUrgent: z.boolean().default(false), // Always provide default`,

      whenToUseCheckbox: `
// ✅ Use Checkbox for: Agreements, selections, confirmations
<FormField
  control={form.control}
  name='clientSteelPanel'
  render={({ field }) => (
    <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
      <FormControl>
        <Checkbox
          checked={field.value || false}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <FormLabel>Client will provide steel panel</FormLabel>
    </FormItem>
  )}
/>

// Checkbox validation in schema  
clientSteelPanel: z.boolean().optional(), // Usually optional`,

      commonMistakes: `
// ❌ WRONG: Using Switch for multiple selections
<Switch checked={option1} onCheckedChange={setOption1} />
<Switch checked={option2} onCheckedChange={setOption2} />
<Switch checked={option3} onCheckedChange={setOption3} />

// ✅ CORRECT: Use Checkbox for multiple selections
<Checkbox checked={option1} onCheckedChange={setOption1} />
<Checkbox checked={option2} onCheckedChange={setOption2} />
<Checkbox checked={option3} onCheckedChange={setOption3} />

// ❌ WRONG: Using Checkbox for on/off states
<Checkbox checked={isEnabled} onCheckedChange={setIsEnabled} />

// ✅ CORRECT: Use Switch for on/off states
<Switch checked={isEnabled} onCheckedChange={setIsEnabled} />`,

      validationDifferences: `
// Switch components - Usually have default values
const switchSchema = z.object({
  isUrgent: z.boolean().default(false),
  requiresApproval: z.boolean().default(false),
  confidential: z.boolean().default(false)
});

// Checkbox components - Usually optional unless required
const checkboxSchema = z.object({
  clientSteelPanel: z.boolean().optional(),
  clientAluminumPanel: z.boolean().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  }) // Required checkbox
});`
    },

    schemaStructureMatching: {
      lesson: "Schema validation rules must exactly match the form structure being validated",
      
      commonProblem: `
// ❌ CRITICAL ERROR: Validating fields that don't exist in current form
export const requestSchema = z.object({
  // Basic fields (exist in all forms)
  clientId: z.string().min(1, 'Client is required'),
  requestType: z.enum(['LWR', 'TLWR', 'VLWR']),
  
  // LWR-specific fields
  targetSalesPrice: z.number().optional(),
  chemistry: z.string().optional(),
  
  // TLWR-specific fields  
  testObjective: z.string().optional(),
  sampleSize: z.string().optional(),
  
  // VLWR-specific fields
  materialToTest: z.string().optional(),
})
.refine((data) => {
  // ❌ WRONG: This validates ALL request types for LWR fields
  if (data.requestType !== 'MICRO_PRODUCTION') {
    return data.testObjective && data.testObjective.length > 0; // Fails for LWR!
  }
  return true;
}, {
  message: 'Test objective is required',
  path: ['testObjective'],
});`,

      correctApproach: `
// ✅ CORRECT: Type-specific validation only
export const requestSchema = z.object({
  // Base fields
  clientId: z.string().min(1, 'Client is required'),
  requestType: z.enum(['LWR', 'TLWR', 'VLWR']),
  
  // Optional fields (conditionally required via refine)
  targetSalesPrice: z.number().optional(),
  chemistry: z.string().optional(),
  testObjective: z.string().optional(),
  materialToTest: z.string().optional(),
})
.refine((data) => {
  // ✅ CORRECT: Only validate LWR fields for LWR requests
  if (data.requestType === 'LWR') {
    return data.targetSalesPrice && data.chemistry;
  }
  return true;
}, {
  message: 'LWR fields are required',
  path: ['targetSalesPrice'],
})
.refine((data) => {
  // ✅ CORRECT: Only validate TLWR fields for TLWR requests  
  if (data.requestType === 'TLWR') {
    return data.testObjective && data.testObjective.length > 0;
  }
  return true;
}, {
  message: 'Test objective is required for TLWR',
  path: ['testObjective'],
})
.refine((data) => {
  // ✅ CORRECT: Only validate VLWR fields for VLWR requests
  if (data.requestType === 'VLWR') {
    return data.materialToTest && data.materialToTest.length > 0;
  }
  return true;
}, {
  message: 'Material to test is required for VLWR',
  path: ['materialToTest'],
});`,

      debuggingTechnique: `
// ✅ Debug schema validation issues
const debugValidation = async (form: UseFormReturn) => {
  const values = form.getValues();
  console.log('Form values:', values);
  
  try {
    const result = requestSchema.parse(values);
    console.log('✅ Validation passed:', result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log('❌ Validation errors:');
      error.errors.forEach(err => {
        console.log(\`  - \${err.path.join('.')}: \${err.message}\`);
      });
    }
  }
  
  // Test individual field validation
  const fieldValidation = await form.trigger();
  console.log('Field validation result:', fieldValidation);
  console.log('Form errors:', form.formState.errors);
};`
    }
  },

  progressiveValidationPatterns: {
    description: "Patterns for implementing step-by-step validation in multi-step forms",
    
    fieldMappingStrategy: `
// ✅ Proper field mapping for progressive validation
const getFieldsForStep = (step: number, requestType?: string): (keyof FormValues)[] => {
  const fieldMap: Record<number, Record<string, string[]>> = {
    0: {
      // Step 0 - Basic Info (same for all request types)
      'ALL': ['clientId', 'requestType', 'laboratory', 'salesAgent']
    },
    1: {
      // Step 1 - Request-specific fields
      'LWR': ['targetSalesPrice', 'chemistry', 'color', 'finish'],
      'TLWR': ['testObjective', 'chemistry', 'sampleSize', 'supplier'],
      'VLWR': ['materialToTest', 'sampleId', 'supplier']
    },
    2: {
      // Step 2 - Common final fields
      'ALL': ['requiredDate', 'notes']
    }
  };
  
  const stepFields = fieldMap[step];
  if (!stepFields) return [];
  
  return stepFields[requestType] || stepFields['ALL'] || [];
};

// ✅ Progressive validation implementation
const validateCurrentStep = async () => {
  const requestType = form.watch('requestType');
  const fieldsToValidate = getFieldsForStep(currentStep, requestType);
  
  if (fieldsToValidate.length === 0) {
    console.log('No validation needed for step:', currentStep);
    return true;
  }
  
  console.log(\`Validating step \${currentStep} fields:\`, fieldsToValidate);
  
  // Trigger validation for specific fields only
  const isValid = await form.trigger(fieldsToValidate);
  
  if (!isValid) {
    console.log('Validation errors:', form.formState.errors);
  }
  
  return isValid;
};`,

    conditionalValidationLogic: `
// ✅ Conditional validation for toggle sections
const validateConditionalSections = async (toggleStates: ToggleStates) => {
  const validationPromises = [];
  
  // Only validate enabled sections
  if (toggleStates.clientPanels) {
    validationPromises.push(
      form.trigger(['clientSteelPanel', 'clientAluminumPanel', 'panelPreparation'])
    );
  }
  
  if (toggleStates.saltFogTest) {
    validationPromises.push(
      form.trigger(['saltFogHours', 'saltFogStandard'])
    );
  }
  
  if (toggleStates.customTests) {
    validationPromises.push(
      form.trigger(['customTestName', 'customTestDescription'])
    );
  }
  
  // Wait for all validations to complete
  const results = await Promise.all(validationPromises);
  
  // All sections must be valid
  return results.every(result => result === true);
};

// ✅ Complete step validation including conditionals
const handleNext = async () => {
  // Validate main step fields
  const stepValid = await validateCurrentStep();
  
  // Validate conditional sections if applicable
  const conditionalsValid = currentStep === 1 ? 
    await validateConditionalSections(toggleStates) : true;
  
  if (stepValid && conditionalsValid) {
    nextStep();
  } else {
    console.log('Validation failed for step:', currentStep);
    toast.error('Please complete all required fields');
  }
};`
  },

  textareaValidationIssues: {
    description: "Specific issues with textarea validation and their solutions",
    
    commonProblem: `
// ❌ PROBLEM: Textarea validation persists even after user fills field
const form = useForm({
  mode: 'onBlur', // ❌ This causes issues with custom handlers
  reValidateMode: 'onBlur'
});

// ❌ Custom onBlur handler interferes with validation
<FormField
  control={form.control}
  name='description'
  render={({ field }) => (
    <FormItem>
      <FormLabel>Description</FormLabel>
      <FormControl>
        <Textarea
          {...field}
          onBlur={(e) => {
            field.onBlur(); // ❌ This might not trigger re-validation properly
            // Custom logic here
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>`,

    solution: `
// ✅ SOLUTION: Use onChange mode and simple field spread
const form = useForm({
  mode: 'onChange',        // ✅ Validate immediately
  reValidateMode: 'onChange' // ✅ Re-validate on every change
});

// ✅ Simple field spread - no custom handlers needed
<FormField
  control={form.control}
  name='description'
  render={({ field }) => (
    <FormItem>
      <FormLabel>Description</FormLabel>
      <FormControl>
        <Textarea 
          {...field} 
          placeholder="Enter detailed description"
          className="resize-none"
          rows={4}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

// ✅ If custom logic is needed, do it in useEffect
useEffect(() => {
  const description = form.watch('description');
  if (description && description.length > 10) {
    // Custom logic here
  }
}, [form.watch('description')]);`,

    validationSchema: `
// ✅ Robust textarea validation with transformation
const schema = z.object({
  description: z.string()
    .min(1, 'Description is required')
    .transform(val => val.trim()) // ✅ Auto-trim whitespace
    .pipe(
      z.string()
        .min(1, 'Description cannot be empty')
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must be less than 500 characters')
    ),
  
  notes: z.string()
    .optional()
    .transform(val => val ? val.trim() : '') // ✅ Handle optional fields
    .pipe(z.string().max(1000, 'Notes must be less than 1000 characters'))
});`
  },

  fileUploadValidationIssues: {
    description: "File upload validation problems and solutions in multi-step forms",
    
    disappearingFilesIssue: `
// ❌ PROBLEM: Files disappear after selection in multi-step forms
<FormField
  control={form.control}
  name='attachedFiles'
  render={({ field }) => (
    <FormItem>
      <FormLabel>Attach Files</FormLabel>
      <FormControl>
        <FileUploader
          value={field.value || []}
          onValueChange={field.onChange}
          onUpload={async (files) => {
            // ❌ This causes files to be cleared after upload!
            console.log('Files uploaded:', files);
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>`,

    solution: `
// ✅ SOLUTION: Omit onUpload prop in multi-step forms
<FormField
  control={form.control}
  name='attachedFiles'
  render={({ field }) => (
    <FormItem>
      <FormLabel>Attach Files</FormLabel>
      <FormControl>
        <FileUploader
          value={field.value || []}
          onValueChange={field.onChange}
          maxFiles={5}
          maxSize={4 * 1024 * 1024} // 4MB
          accept={{
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'image/*': ['.png', '.jpg', '.jpeg']
          }}
          multiple={true}
          // ✅ No onUpload prop - files stay in form state
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

// ✅ Handle file upload during form submission
const onSubmit = async (values: FormValues) => {
  try {
    let uploadedFileUrls = [];
    
    if (values.attachedFiles && values.attachedFiles.length > 0) {
      console.log('Uploading files during submission:', values.attachedFiles);
      // uploadedFileUrls = await uploadFiles(values.attachedFiles);
    }
    
    const submitData = {
      ...values,
      attachedFileUrls: uploadedFileUrls
    };
    
    console.log('Final submission data:', submitData);
    // Submit to API
    
  } catch (error) {
    console.error('Submission error:', error);
  }
};`,

    fileValidationSchema: `
// ✅ File validation in schema
const schema = z.object({
  attachedFiles: z.array(z.any())
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true; // Optional
      return files.length <= 5; // Max 5 files
    }, {
      message: 'Maximum 5 files allowed'
    })
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return files.every(file => file.size <= 4 * 1024 * 1024); // 4MB max
    }, {
      message: 'Each file must be less than 4MB'
    })
});`
  },

  debuggingStrategies: {
    description: "Systematic approaches to debugging complex form validation issues",
    
    validationDebugging: `
// ✅ Comprehensive validation debugging
const useFormDebugger = (form: UseFormReturn) => {
  const debugValidation = useCallback(async () => {
    console.group('🐛 Form Validation Debug');
    
    // 1. Current form values
    const values = form.getValues();
    console.log('📝 Form Values:', values);
    
    // 2. Form state
    const formState = form.formState;
    console.log('📊 Form State:', {
      isValid: formState.isValid,
      isSubmitting: formState.isSubmitting,
      isValidating: formState.isValidating,
      isDirty: formState.isDirty,
      dirtyFields: formState.dirtyFields,
      touchedFields: formState.touchedFields
    });
    
    // 3. Current errors
    console.log('❌ Current Errors:', formState.errors);
    
    // 4. Test schema validation directly
    try {
      const schemaResult = requestSchema.parse(values);
      console.log('✅ Schema validation passed:', schemaResult);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log('❌ Schema validation failed:');
        error.errors.forEach(err => {
          console.log(\`  - \${err.path.join('.')}: \${err.message}\`);
        });
      }
    }
    
    // 5. Test field-specific validation
    const fieldValidation = await form.trigger();
    console.log('🎯 Field Validation Result:', fieldValidation);
    
    console.groupEnd();
  }, [form]);
  
  // Auto-debug on validation errors
  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      debugValidation();
    }
  }, [form.formState.errors, debugValidation]);
  
  return { debugValidation };
};`,

    stepValidationDebugging: `
// ✅ Step-specific validation debugging
const debugStepValidation = async (step: number, requestType: string) => {
  console.group(\`🔍 Step \${step} Validation Debug\`);
  
  const fieldsToValidate = getFieldsForStep(step, requestType);
  console.log('📋 Fields to validate:', fieldsToValidate);
  
  const values = form.getValues();
  const stepValues = {};
  fieldsToValidate.forEach(field => {
    stepValues[field] = values[field];
  });
  console.log('💾 Step values:', stepValues);
  
  // Test each field individually
  for (const field of fieldsToValidate) {
    const fieldValid = await form.trigger(field as any);
    const fieldError = form.formState.errors[field];
    console.log(\`  - \${field}: \${fieldValid ? '✅' : '❌'}\`, 
      fieldError ? fieldError.message : 'No error');
  }
  
  console.groupEnd();
};`,

    performanceDebugging: `
// ✅ Form performance debugging
const useFormPerformanceDebugger = (form: UseFormReturn) => {
  const renderCount = useRef(0);
  const validationCount = useRef(0);
  
  renderCount.current += 1;
  
  useEffect(() => {
    const subscription = form.watch(() => {
      validationCount.current += 1;
    });
    
    return () => subscription.unsubscribe();
  }, [form]);
  
  useEffect(() => {
    console.log('📊 Form Performance Stats:', {
      renders: renderCount.current,
      validations: validationCount.current,
      ratio: validationCount.current / renderCount.current
    });
  });
  
  // Log expensive operations
  const logOperation = (operation: string, fn: () => any) => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(\`⏱️ \${operation}: \${end - start}ms\`);
    return result;
  };
  
  return { logOperation };
};`
  },

  bestPractices: [
    "Always match schema data types to form field return types",
    "Use Switch for on/off states, Checkbox for selections and agreements",
    "Implement progressive validation with proper field mapping",
    "Use mode: 'onChange' for immediate validation feedback",
    "Avoid custom onBlur handlers that interfere with validation",
    "Transform string inputs to numbers in schema, not in components",
    "Omit onUpload prop from FileUploader in multi-step forms",
    "Provide comprehensive debugging tools for validation issues",
    "Test all validation paths thoroughly before deployment",
    "Document validation rules and field dependencies clearly"
  ],

  quickDebuggingChecklist: [
    "Check form values match schema types (string vs number)",
    "Verify field mapping includes all required fields for current step", 
    "Ensure conditional validation only applies to relevant request types",
    "Confirm files aren't being cleared by onUpload handlers",
    "Test textarea fields with onChange mode instead of onBlur",
    "Validate schema refinement rules match actual form structure",
    "Check that default values are provided for all form fields",
    "Verify toggle state changes clear unused fields properly",
    "Test cross-step validation dependencies",
    "Ensure form submission includes all required data"
  ],

  emergencyDebuggingCommands: `
// 🚨 Emergency debugging commands for stuck forms

// 1. Check current form state
console.log('Form Values:', form.getValues());
console.log('Form Errors:', form.formState.errors);
console.log('Form Valid:', form.formState.isValid);

// 2. Test schema validation directly  
try {
  const result = requestSchema.parse(form.getValues());
  console.log('Schema validation passed:', result);
} catch (error) {
  console.log('Schema validation failed:', error.errors);
}

// 3. Trigger validation for all fields
form.trigger().then(isValid => {
  console.log('Manual validation result:', isValid);
});

// 4. Check specific field validation
form.trigger(['fieldName']).then(isValid => {
  console.log('Field validation result:', isValid);
});

// 5. Reset form to debug state
form.reset();
form.setValue('requestType', 'LWR'); // Set to known good state

// 6. Check field registration
console.log('Registered fields:', Object.keys(form.control._fields));`
};

export default formValidationLessons;