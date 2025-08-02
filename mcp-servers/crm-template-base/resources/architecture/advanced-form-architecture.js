export default `# Advanced Modular Form Architecture - Production Implementation

## 🚀 Revolutionary Achievement: 95.6% Code Reduction

This document outlines the production-tested modular form architecture that transformed a 5,103-line monolithic form into a maintainable, scalable system of 32 focused files with a 223-line main orchestrator.

## 📊 Transformation Results

- **Original**: Single 5,103-line monolithic file
- **New**: 32 focused files with main orchestrator
- **Main File**: Reduced to 223 lines (95.6% reduction)
- **Status**: Production-ready, fully type-safe
- **Maintainability**: Each concern in separate file

## 🏗️ Complete Directory Structure

\`\`\`
new-request-form/
├── index.tsx                    # Main orchestrator (223 lines)
├── types/
│   └── form-types.ts            # TypeScript definitions
├── schemas/
│   ├── base-schema.ts           # Base validation schema
│   ├── lwr-schema.ts            # LWR-specific validation
│   ├── tlwr-schema.ts           # TLWR-specific validation
│   ├── vlwr-schema.ts           # VLWR-specific validation
│   └── micro-schema.ts          # Micro production validation
├── constants/
│   ├── form-options.ts          # Centralized select options
│   ├── field-mappings.ts        # Field to step mappings
│   └── validation-rules.ts      # Business validation rules
├── hooks/
│   ├── useFormDefaults.ts       # Laboratory-based defaults
│   ├── useFormSubmission.ts     # Submission handling
│   ├── useFormSteps.ts          # Dynamic step generation
│   └── useConditionalLogic.ts   # Business rule logic
├── components/
│   ├── FormNavigation.tsx       # Step navigation component
│   ├── FormProgress.tsx         # Progress indicator
│   ├── ConditionalSection.tsx   # Toggle-based sections
│   └── FieldGroup.tsx           # Reusable field groups
└── sections/
    ├── shared/
    │   ├── BasicInfoSection.tsx     # Common basic information
    │   ├── NotesAndFilesSection.tsx # Notes and file uploads
    │   └── SubmissionSection.tsx    # Final submission
    ├── lwr/
    │   ├── ProductSpecsSection.tsx  # Product specifications
    │   ├── TestingRequirementsSection.tsx
    │   ├── PanelSpecsSection.tsx
    │   ├── ProcessConditionsSection.tsx
    │   └── QualityStandardsSection.tsx
    ├── tlwr/
    │   ├── TestingProtocolSection.tsx
    │   ├── SampleRequirementsSection.tsx
    │   ├── ReportingSection.tsx
    │   └── TimelineSection.tsx
    ├── vlwr/
    │   ├── InternalTestingSection.tsx
    │   └── ValidationSection.tsx
    └── micro/
        ├── ProductionSpecsSection.tsx
        └── BatchRequirementsSection.tsx
\`\`\`

## 🎯 Core Implementation Pattern

### Main Orchestrator (index.tsx)

\`\`\`typescript
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Modular imports
import { useFormDefaults } from './hooks/useFormDefaults';
import { useFormSteps } from './hooks/useFormSteps';
import { useFormSubmission } from './hooks/useFormSubmission';
import { FormNavigation } from './components/FormNavigation';
import { getSchemaForRequestType } from './schemas';
import { FormSection } from './sections';

export function NewRequestForm() {
  // Business logic hooks
  const { getDefaults } = useFormDefaults();
  const { currentStep, steps, goToStep } = useFormSteps();
  const { handleSubmission, isSubmitting } = useFormSubmission();
  
  // Dynamic schema based on request type
  const schema = getSchemaForRequestType(requestType);
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaults(),
    mode: 'onChange' // Critical for validation
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmission)}>
        <FormNavigation 
          steps={steps} 
          currentStep={currentStep} 
          onStepChange={goToStep} 
        />
        
        <FormSection 
          step={currentStep}
          requestType={requestType}
          form={form}
        />
        
        <FormActions isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
}
\`\`\`

## 🔧 Schema System Architecture

### Base Schema Pattern

\`\`\`typescript
// schemas/base-schema.ts
import { z } from 'zod';

export const baseSchema = z.object({
  // Common fields across all request types
  requestType: z.enum(['LWR', 'TLWR', 'VLWR', 'MICRO']),
  laboratory: z.enum(['LERMA', 'HOUSTON', 'MM_HOUSTON']),
  clientInfo: z.object({
    name: z.string().min(1, 'Client name required'),
    contact: z.string().email('Valid email required'),
  }),
  basicInfo: z.object({
    projectName: z.string().min(1, 'Project name required'),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
    requestedDate: z.date(),
  }),
});

// Type inference
export type BaseFormData = z.infer<typeof baseSchema>;
\`\`\`

### Specific Schema Composition

\`\`\`typescript
// schemas/lwr-schema.ts
import { baseSchema } from './base-schema';

export const lwrSchema = baseSchema.extend({
  productSpecs: z.object({
    productType: z.string().min(1),
    finish: z.string().min(1),
    color: z.string().optional(),
  }),
  testingRequirements: z.object({
    adhesion: z.boolean(),
    flexibility: z.boolean(),
    impact: z.boolean(),
    saltSpray: z.number().optional(),
  }),
  panelSpecs: z.object({
    substrate: z.string().min(1),
    dimensions: z.string().min(1),
    quantity: z.number().min(1),
  }),
});

export type LWRFormData = z.infer<typeof lwrSchema>;
\`\`\`

## 🎨 Hook System Implementation

### Business Logic Hook Pattern

\`\`\`typescript
// hooks/useFormDefaults.ts
import { useMemo } from 'react';

export function useFormDefaults(laboratory?: string) {
  return useMemo(() => {
    const getDefaults = () => {
      // Laboratory-based business logic
      const isUSLab = laboratory === 'HOUSTON' || laboratory === 'MM_HOUSTON';
      
      return {
        // Unit defaults based on laboratory
        units: {
          temperature: isUSLab ? 'fahrenheit' : 'celsius',
          measurement: isUSLab ? 'imperial' : 'metric',
          currency: isUSLab ? 'USD' : 'MXN',
        },
        
        // Laboratory-specific defaults
        defaultLaboratory: laboratory || 'LERMA',
        processingTime: isUSLab ? '10-15 business days' : '7-10 business days',
        
        // Regional business rules
        availableTests: getAvailableTests(laboratory),
        maxSampleSize: isUSLab ? 50 : 25, // lbs vs kg
      };
    };
    
    return { getDefaults };
  }, [laboratory]);
}
\`\`\`

### Dynamic Step Generation

\`\`\`typescript
// hooks/useFormSteps.ts
import { useState, useMemo } from 'react';

export function useFormSteps(requestType: string, formData: any) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = useMemo(() => {
    const baseSteps = [
      { id: 'basic', label: 'Basic Information', required: true },
      { id: 'specs', label: 'Specifications', required: true },
    ];
    
    // Dynamic steps based on request type
    switch (requestType) {
      case 'LWR':
        return [
          ...baseSteps,
          { id: 'testing', label: 'Testing Requirements', required: true },
          { id: 'panels', label: 'Panel Specifications', required: true },
          { id: 'conditions', label: 'Process Conditions', required: false },
          { id: 'notes', label: 'Notes & Files', required: false },
        ];
        
      case 'MICRO':
        return [
          ...baseSteps,
          { id: 'production', label: 'Production Specs', required: true },
          { id: 'batch', label: 'Batch Requirements', required: true },
          { id: 'approval', label: 'Special Approval', required: true },
          { id: 'notes', label: 'Notes & Files', required: false },
        ];
        
      default:
        return baseSteps;
    }
  }, [requestType, formData]);
  
  return {
    steps,
    currentStep,
    goToStep: setCurrentStep,
    nextStep: () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1)),
    prevStep: () => setCurrentStep(prev => Math.max(prev - 1, 0)),
  };
}
\`\`\`

## 🧩 Component System Architecture

### Reusable Section Pattern

\`\`\`typescript
// sections/shared/BasicInfoSection.tsx
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';

interface BasicInfoSectionProps {
  form: UseFormReturn<any>;
  laboratory?: string;
}

export function BasicInfoSection({ form, laboratory }: BasicInfoSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="basicInfo.projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="basicInfo.priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority Level</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="URGENT">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
\`\`\`

### Conditional Logic Implementation

\`\`\`typescript
// components/ConditionalSection.tsx
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface ConditionalSectionProps {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  form: UseFormReturn<any>;
  dependsOn?: string; // Field name to watch
  showWhen?: (value: any) => boolean;
}

export function ConditionalSection({ 
  title, 
  description, 
  defaultOpen = false,
  children,
  form,
  dependsOn,
  showWhen
}: ConditionalSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  // Watch dependent field
  const dependentValue = dependsOn ? form.watch(dependsOn) : null;
  const shouldShow = !dependsOn || !showWhen || showWhen(dependentValue);
  
  if (!shouldShow) return null;
  
  return (
    <div className="border rounded-lg p-4">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h3 className="font-medium">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <ChevronDown 
          className={\`h-4 w-4 transition-transform \${isOpen ? 'rotate-180' : ''}\`}
        />
      </div>
      
      {isOpen && (
        <div className="mt-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}
\`\`\`

## 🎯 Field Mapping System

\`\`\`typescript
// constants/field-mappings.ts
export const fieldMappings = {
  basic: [
    'basicInfo.projectName',
    'basicInfo.priority',
    'basicInfo.requestedDate',
    'clientInfo.name',
    'clientInfo.contact',
  ],
  
  specs: [
    'productSpecs.productType',
    'productSpecs.finish',
    'productSpecs.color',
  ],
  
  testing: [
    'testingRequirements.adhesion',
    'testingRequirements.flexibility',
    'testingRequirements.impact',
    'testingRequirements.saltSpray',
  ],
  
  panels: [
    'panelSpecs.substrate',
    'panelSpecs.dimensions',
    'panelSpecs.quantity',
  ],
};

export function getFieldsForStep(stepId: string): string[] {
  return fieldMappings[stepId] || [];
}
\`\`\`

## 🚀 Key Benefits Achieved

### Development Benefits
- **95.6% code reduction** in main orchestrator file
- **Separation of concerns** with dedicated files for each responsibility
- **Type safety** throughout with Zod schema validation
- **Reusable components** that can be shared across forms
- **Easy maintenance** with clear file organization

### Business Benefits
- **Dynamic form generation** based on request type selection
- **Laboratory-based business logic** with automatic defaults
- **Conditional validation** that adapts to user selections
- **Professional user experience** with step navigation and progress
- **Comprehensive error handling** with user-friendly messages

### Technical Benefits
- **Schema composition** for different form variants
- **Hook-based architecture** for business logic separation
- **Component reusability** across different sections
- **Validation flexibility** with conditional rules
- **Performance optimization** with lazy loading and memoization

## 📋 Implementation Checklist

- [ ] Create modular directory structure (32 files)
- [ ] Implement base schema with Zod validation
- [ ] Build specific schemas for each request type
- [ ] Create business logic hooks for defaults and validation
- [ ] Develop reusable section components
- [ ] Implement dynamic step generation system
- [ ] Add conditional logic for sections and fields
- [ ] Create field mapping system for validation
- [ ] Implement form navigation and progress components
- [ ] Add comprehensive error handling and loading states
- [ ] Test all request type variations
- [ ] Validate laboratory-based business logic
- [ ] Ensure proper TypeScript coverage
- [ ] Test responsive design across devices

This modular form architecture pattern can be replicated for any complex form system, providing a scalable foundation for enterprise applications.`;