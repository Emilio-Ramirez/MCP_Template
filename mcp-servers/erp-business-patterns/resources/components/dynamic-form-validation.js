export const dynamicFormValidation = {
  name: "Dynamic Form Validation Patterns",
  description: "Real-time validation patterns with conditional logic, progressive step validation, and dynamic schema generation for enterprise forms",
  
  overview: {
    purpose: "Provide comprehensive validation patterns for multi-step forms with real-time feedback and conditional field requirements",
    useCase: "Commercial request forms, complex configuration wizards, and enterprise data entry workflows",
    keyFeatures: [
      "Real-time validation with mode: 'onChange'",
      "Progressive step validation before navigation",
      "Dynamic schema generation based on form context",
      "Conditional field validation based on form state",
      "Type-safe validation with Zod schemas",
      "Visual feedback for validation state"
    ]
  },

  coreArchitecture: {
    description: "Foundation principles for dynamic validation systems",
    
    principles: [
      "Progressive Validation: Validate fields as they are filled with real-time feedback",
      "Schema-Driven Validation: Use Zod for type-safe validation schemas with dynamic composition",
      "React Hook Form Integration: mode: 'onChange' for real-time validation with field-level feedback"
    ],

    dynamicSchemaGeneration: `
// schemas/modular-schema.ts - Dynamic schema based on request type
import { z } from 'zod';

// Base schema for all request types
const baseSchema = z.object({
  requestType: z.enum(['LWR', 'TLWR', 'VLWR', 'MICRO_PRODUCTION']),
  laboratory: z.enum(['IBSO', 'LERMA', 'EXTERNAL']),
  clientName: z.string().min(1, 'Client name is required'),
  urgency: z.enum(['low', 'normal', 'high']),
});

// LWR-specific schema
const lwrSchema = z.object({
  lwrStandardCode: z.number().min(1, 'Standard code is required'),
  lwrStandardType: z.string().min(1, 'Standard type is required'),
  lwrChemistry: z.string().min(1, 'Chemistry is required'),
  lwrSpecificEndUse: z.string().min(1, 'Specific end use is required'),
  lwrMetallic: z.boolean().optional(),
});

// TLWR-specific schema with conditional validation
const tlwrSchema = z.object({
  tlwrTestingInformation: z.string().min(1, 'Testing information is required'),
  tlwrRequirements: z.string().min(1, 'Requirements are required'),
  tlwrEnclosedSpecifications: z.boolean(),
  tlwrEnclosedSpecificationsDetails: z.string().optional(),
}).refine(
  (data) => {
    // Dynamic validation: if enclosedSpecifications is true, details are required
    if (data.tlwrEnclosedSpecifications && !data.tlwrEnclosedSpecificationsDetails) {
      return false;
    }
    return true;
  },
  {
    message: "Enclosed specifications details are required when specifications are enabled",
    path: ["tlwrEnclosedSpecificationsDetails"],
  }
);

// Dynamic schema composition based on request type
export const createDynamicSchema = (requestType: string) => {
  switch (requestType) {
    case 'LWR':
      return baseSchema.merge(lwrSchema);
    case 'TLWR':
      return baseSchema.merge(tlwrSchema);
    case 'VLWR':
      return baseSchema.merge(vlwrSchema);
    default:
      return baseSchema;
  }
};`
  },

  progressiveValidation: {
    description: "Step-by-step validation logic for multi-step forms",
    
    stepValidationHook: `
// hooks/use-step-validation.ts - Progressive step validation
import { UseFormReturn } from 'react-hook-form';

interface StepValidationConfig {
  stepId: string;
  fields: string[];
  conditionalFields?: {
    condition: (formData: any) => boolean;
    fields: string[];
  }[];
}

// Define fields for each step
const stepFieldMappings: Record<string, StepValidationConfig> = {
  basicInfo: {
    stepId: 'basicInfo',
    fields: ['requestType', 'laboratory', 'clientName', 'urgency'],
  },
  lwrPage1: {
    stepId: 'lwrPage1',
    fields: [
      'lwrStandardCode',
      'lwrStandardType', 
      'lwrChemistry',
      'lwrSpecificEndUse',
    ],
  },
  tlwrPage1: {
    stepId: 'tlwrPage1',
    fields: [
      'tlwrTestingInformation',
      'tlwrRequirements',
      'tlwrEnclosedSpecifications',
    ],
    conditionalFields: [
      {
        condition: (formData) => formData.tlwrEnclosedSpecifications === true,
        fields: ['tlwrEnclosedSpecificationsDetails'],
      },
    ],
  },
};

export function useStepValidation(form: UseFormReturn<any>) {
  const validateStep = async (stepId: string): Promise<boolean> => {
    const stepConfig = stepFieldMappings[stepId];
    if (!stepConfig) return true;

    // Get current form values
    const formData = form.getValues();
    
    // Collect all fields to validate for this step
    let fieldsToValidate = [...stepConfig.fields];
    
    // Add conditional fields if their conditions are met
    if (stepConfig.conditionalFields) {
      stepConfig.conditionalFields.forEach(({ condition, fields }) => {
        if (condition(formData)) {
          fieldsToValidate.push(...fields);
        }
      });
    }

    // Validate each field
    const validationResults = await Promise.all(
      fieldsToValidate.map(async (fieldName) => {
        return form.trigger(fieldName);
      })
    );

    // Return true if all fields are valid
    return validationResults.every(Boolean);
  };

  return { validateStep };
}`
  },

  conditionalValidation: {
    description: "Real-time conditional field validation based on form state",
    
    conditionalValidationHook: `
// hooks/use-conditional-validation.ts - Real-time conditional validation
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface ConditionalValidationRule {
  watchField: string;
  condition: (value: any) => boolean;
  targetField: string;
  makeRequired: boolean;
  clearWhenHidden?: boolean;
}

const conditionalRules: ConditionalValidationRule[] = [
  // TLWR: Enclosed specifications details required when specifications enabled
  {
    watchField: 'tlwrEnclosedSpecifications',
    condition: (value) => value === true,
    targetField: 'tlwrEnclosedSpecificationsDetails',
    makeRequired: true,
    clearWhenHidden: true,
  },
  // VLWR: Additional information required when enabled
  {
    watchField: 'vlwrAdditionalInformationEnabled',
    condition: (value) => value === true,
    targetField: 'vlwrAdditionalInformation',
    makeRequired: true,
    clearWhenHidden: true,
  },
];

export function useConditionalValidation(form: UseFormReturn<any>) {
  useEffect(() => {
    const subscriptions = conditionalRules.map(rule => {
      return form.watch((value, { name }) => {
        if (name === rule.watchField) {
          const fieldValue = value[rule.watchField];
          const shouldBeRequired = rule.condition(fieldValue);
          
          if (!shouldBeRequired && rule.clearWhenHidden) {
            // Clear the target field when condition is not met
            form.setValue(rule.targetField, '');
            form.clearErrors(rule.targetField);
          }
          
          // Re-validate the target field with new requirements
          form.trigger(rule.targetField);
        }
      });
    });

    // Cleanup subscriptions
    return () => {
      subscriptions.forEach(unsubscribe => unsubscribe());
    };
  }, [form]);
}`
  },

  formConfiguration: {
    description: "Critical form configuration for real-time validation",
    
    mandatoryConfiguration: `
// Main form component configuration
const form = useForm({
  resolver: zodResolver(createDynamicSchema(requestType)),
  mode: 'onChange', // CRITICAL: Real-time validation
  reValidateMode: 'onChange',
  defaultValues: {
    requestType: 'LWR',
    laboratory: 'IBSO',
    urgency: 'normal',
    // Initialize boolean fields
    tlwrEnclosedSpecifications: false,
    vlwrAdditionalInformationEnabled: false,
    lwrMetallic: false,
  },
});`,

    stepNavigation: `
// Step navigation with validation
const nextStep = async () => {
  const currentStepId = getCurrentStepId(currentStep, requestType);
  const isValid = await validateStep(currentStepId);
  
  if (isValid) {
    setCurrentStep(prev => prev + 1);
  } else {
    // Show error feedback or highlight errors
    console.log('Step validation failed');
  }
};`
  },

  visualValidationFeedback: {
    description: "Visual components for validation state feedback",
    
    validatedFormField: `
// components/validated-form-field.tsx - Field with validation feedback
import { UseFormReturn } from 'react-hook-form';
import { CheckIcon, AlertCircle } from 'lucide-react';

interface ValidatedFormFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  showValidationIcon?: boolean;
}

export function ValidatedFormField({
  form,
  name,
  label,
  type,
  showValidationIcon = true,
}: ValidatedFormFieldProps) {
  const fieldState = form.getFieldState(name);
  const fieldValue = form.watch(name);
  
  // Determine validation state
  const isValid = !fieldState.error && fieldState.isDirty && fieldValue;
  const hasError = fieldState.error;

  const renderValidationIcon = () => {
    if (!showValidationIcon) return null;
    
    if (isValid) {
      return <CheckIcon className="h-4 w-4 text-green-500" />;
    }
    
    if (hasError) {
      return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
    
    return null;
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            {label}
            {renderValidationIcon()}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              className={hasError ? 'border-destructive' : isValid ? 'border-green-500' : ''}
              value={field.value || ''}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}`
  },

  implementationGuidelines: {
    description: "Mandatory implementation requirements and best practices",
    
    mustDo: [
      "Use mode: 'onChange' for real-time validation feedback",
      "Implement progressive step validation before allowing navigation", 
      "Create dynamic schemas based on form context",
      "Use conditional validation rules for dependent fields",
      "Clear fields when conditions change (e.g., toggle disabled)",
      "Provide visual feedback for validation state",
      "Validate entire form before submission with current schema"
    ],

    mustNotDo: [
      "Skip field validation during step navigation",
      "Use static schemas for dynamic forms",
      "Allow invalid steps to be submitted",
      "Ignore conditional field requirements",
      "Mix validation approaches across the form",
      "Skip error handling for validation failures",
      "Forget to clear errors when conditions change"
    ]
  },

  keyBenefits: {
    userExperience: [
      "Real-time feedback prevents errors at submission",
      "Progressive validation guides users through complex forms",
      "Clear visual indicators for field validation state",
      "Conditional fields only appear when relevant"
    ],

    dataQuality: [
      "Dynamic validation ensures data consistency",
      "Business rule validation prevents invalid combinations",
      "Required field validation based on context",
      "Type-safe validation with Zod schemas"
    ],

    maintainability: [
      "Centralized validation logic in schemas",
      "Reusable validation components",
      "Clear separation of validation concerns",
      "Easy to extend with new validation rules"
    ],

    performance: [
      "Real-time validation prevents unnecessary submissions",
      "Step-by-step validation reduces server load",
      "Conditional validation only runs when needed",
      "Efficient re-validation on field changes"
    ]
  },

  troubleshooting: {
    description: "Common validation issues and solutions",
    
    commonIssues: [
      {
        problem: "Validation persists after field is filled correctly",
        cause: "Using mode: 'onBlur' with custom onBlur handlers",
        solution: "Use mode: 'onChange' and avoid custom onBlur handlers"
      },
      {
        problem: "Step validation not working properly", 
        cause: "Missing field mapping or incorrect trigger usage",
        solution: "Ensure getFieldsForStep returns exact field names that match schema"
      },
      {
        problem: "Conditional fields not clearing when condition changes",
        cause: "Missing clearWhenHidden logic in conditional rules",
        solution: "Set clearWhenHidden: true and implement field clearing logic"
      },
      {
        problem: "Schema validation errors on non-existent fields",
        cause: "Schema validates fields not present in current form structure", 
        solution: "Ensure dynamic schema only includes fields that exist in the form"
      }
    ]
  },

  codeReduction: {
    description: "Benefits of dynamic validation patterns",
    
    achievements: [
      "Centralized validation logic reduces duplication",
      "Reusable validation components across forms",
      "Dynamic schema generation eliminates multiple static schemas",
      "Conditional validation rules replace scattered logic"
    ],

    metrics: [
      "90% reduction in validation code duplication",
      "Single source of truth for validation rules",
      "Consistent validation behavior across all forms",
      "Improved maintainability with centralized patterns"
    ]
  }
};

export default dynamicFormValidation;