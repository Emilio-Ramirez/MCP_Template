export default `# Form Bundle - Multi-Step Form Template

## Overview
Complete multi-step form template with step navigation, centralized state management, and progressive validation. Use this template for complex workflows requiring multiple steps.

## Complete Multi-Step Form Implementation

\`\`\`typescript
'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { IconCheck } from '@tabler/icons-react'
import * as z from 'zod'
import { PageContainer } from '@/components/page-container'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

// Multi-step schema with step-specific validation
const createMultiStepSchema = (t: any) => z.object({
  // Step 1 fields
  basicInfo: z.object({
    name: z.string().min(1, t('validation.name_required')),
    email: z.string().email(t('validation.email_invalid')),
  }),
  // Step 2 fields
  additionalInfo: z.object({
    phone: z.string().min(1, t('validation.phone_required')),
    company: z.string().min(1, t('validation.company_required')),
  }),
  // Step 3 fields
  preferences: z.object({
    notifications: z.boolean().default(true),
    newsletter: z.boolean().default(false),
  }),
})

type MultiStepFormData = z.infer<ReturnType<typeof createMultiStepSchema>>

// Step navigation hook
const useStepNavigation = (totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState(0)
  
  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, totalSteps - 1))
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 0))
  const goToStep = (step: number) => setCurrentStep(Math.max(0, Math.min(step, totalSteps - 1)))
  
  return { currentStep, nextStep, prevStep, goToStep, totalSteps }
}

// Centralized form state management
const useRequestForm = <T>() => {
  const [formData, setFormData] = useState<Partial<T>>({})
  
  const updateFormData = (stepData: Partial<T>) => {
    setFormData(prev => ({ ...prev, ...stepData }))
  }
  
  const resetFormData = () => setFormData({})
  
  return { formData, updateFormData, resetFormData }
}

// Import the comprehensive StepIndicator component
// IMPORTANT: See form-bundle/components/step-indicator.js for complete implementation
import { StepIndicator } from '@/features/[feature-name]/components/StepIndicator'

// Define steps configuration for StepIndicator
const steps = [
  { id: 1, name: "Basic Information", description: "Enter your name and email address" },
  { id: 2, name: "Additional Details", description: "Provide phone and company information" },
  { id: 3, name: "Preferences", description: "Set your notification preferences" }
]

export default function MultiStepFormPage() {
  const t = useTranslations('Forms')
  const router = useRouter()
  const { currentStep, nextStep, prevStep, totalSteps } = useStepNavigation(3)
  const { formData, updateFormData, resetFormData } = useRequestForm<MultiStepFormData>()
  
  const form = useForm<MultiStepFormData>({
    resolver: zodResolver(createMultiStepSchema(t)),
    mode: 'onChange', // Real-time validation
    defaultValues: {
      basicInfo: { name: '', email: '' },
      additionalInfo: { phone: '', company: '' },
      preferences: { notifications: true, newsletter: false },
    },
  })

  // Step validation
  const validateCurrentStep = async () => {
    const stepFields = {
      0: ['basicInfo.name', 'basicInfo.email'],
      1: ['additionalInfo.phone', 'additionalInfo.company'],
      2: ['preferences.notifications', 'preferences.newsletter'],
    }
    
    const fieldsToValidate = stepFields[currentStep as keyof typeof stepFields]
    const isValid = await form.trigger(fieldsToValidate as any)
    return isValid
  }

  const handleNext = async () => {
    const isValid = await validateCurrentStep()
    if (isValid) {
      // Save current step data
      const currentData = form.getValues()
      updateFormData(currentData)
      nextStep()
    }
  }

  const handlePrevious = () => {
    // Save current step data before going back
    const currentData = form.getValues()
    updateFormData(currentData)
    prevStep()
  }

  const onSubmit = async (data: MultiStepFormData) => {
    try {
      // Combine all form data
      const finalData = { ...formData, ...data }
      console.log('Complete form data:', finalData)
      
      // Submit logic here
      toast.success(t('success_message'), { icon: <IconCheck /> })
      resetFormData()
      router.push('/success-redirect')
    } catch (error) {
      toast.error(t('error_message'))
    }
  }

  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 flex-col space-y-4">
        <Heading
          title={t('page_title')}
          description={t('page_description')}
        />
        <Separator />
        
        <Card className="mx-auto w-full">
          <CardHeader>
            <CardTitle className="text-left text-2xl font-bold">
              {t('form_title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <StepIndicator 
                  steps={steps}
                  currentStep={currentStep}
                  onStepClick={(stepIndex) => {
                    // Optional: Enable step navigation (can be customized based on validation)
                    // goToStep(stepIndex)
                  }}
                />
                
                {/* Step 1: Basic Information */}
                {currentStep === 0 && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">{t('basic_info_title')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="basicInfo.name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('name_label')} *</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="basicInfo.email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('email_label')} *</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 2: Additional Information */}
                {currentStep === 1 && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">{t('additional_info_title')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="additionalInfo.phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('phone_label')} *</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="additionalInfo.company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('company_label')} *</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 3: Preferences */}
                {currentStep === 2 && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">{t('preferences_title')}</h3>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="preferences.notifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">{t('notifications_label')}</FormLabel>
                                <p className="text-sm text-muted-foreground">
                                  {t('notifications_description')}
                                </p>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="preferences.newsletter"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">{t('newsletter_label')}</FormLabel>
                                <p className="text-sm text-muted-foreground">
                                  {t('newsletter_description')}
                                </p>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Navigation buttons */}
                <div className="flex gap-4">
                  {currentStep > 0 && (
                    <Button type="button" variant="outline" onClick={handlePrevious}>
                      {t('previous')}
                    </Button>
                  )}
                  {currentStep < totalSteps - 1 ? (
                    <Button type="button" onClick={handleNext}>
                      {t('next')}
                    </Button>
                  ) : (
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? t('saving') : t('submit')}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
\`\`\`

## Key Features

### Step Management
- **Step navigation** with useStepNavigation hook
- **Progress indicator** with completed step icons
- **Step validation** before allowing navigation
- **Centralized state** with useRequestForm hook

### Validation Features
- **Step-by-step validation** with form.trigger()
- **Real-time validation** within each step
- **Progressive validation** prevents invalid navigation
- **Translation-aware** error messages

### State Management
- **Centralized form data** across all steps
- **Step data persistence** when navigating
- **Form reset** after successful submission
- **Data consolidation** on final submit

### Layout Features
- **Step indicator** with progress visualization
- **Card per step** structure (no individual headers)
- **Responsive grid** within each step
- **Consistent spacing** throughout

## Required Hooks

### useStepNavigation Hook
\`\`\`typescript
const useStepNavigation = (totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState(0)
  
  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, totalSteps - 1))
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 0))
  const goToStep = (step: number) => setCurrentStep(Math.max(0, Math.min(step, totalSteps - 1)))
  
  return { currentStep, nextStep, prevStep, goToStep, totalSteps }
}
\`\`\`

### useRequestForm Hook
\`\`\`typescript
const useRequestForm = <T>() => {
  const [formData, setFormData] = useState<Partial<T>>({})
  
  const updateFormData = (stepData: Partial<T>) => {
    setFormData(prev => ({ ...prev, ...stepData }))
  }
  
  const resetFormData = () => setFormData({})
  
  return { formData, updateFormData, resetFormData }
}
\`\`\`

## Translation Keys Required

\`\`\`json
{
  "Forms": {
    "page_title": "Multi-Step Form",
    "page_description": "Complete the following steps to submit your information",
    "form_title": "Registration Form",
    "basic_info_title": "Basic Information",
    "additional_info_title": "Additional Information", 
    "preferences_title": "Preferences",
    "name_label": "Full Name",
    "email_label": "Email Address",
    "phone_label": "Phone Number",
    "company_label": "Company Name",
    "notifications_label": "Email Notifications",
    "notifications_description": "Receive email notifications for important updates",
    "newsletter_label": "Newsletter",
    "newsletter_description": "Subscribe to our monthly newsletter",
    "previous": "Previous",
    "next": "Next",
    "submit": "Submit",
    "saving": "Saving...",
    "success_message": "Form submitted successfully",
    "error_message": "Failed to submit form"
  },
  "validation": {
    "name_required": "Name is required",
    "email_invalid": "Please enter a valid email",
    "phone_required": "Phone number is required",
    "company_required": "Company name is required"
  }
}
\`\`\`

## Advanced Pattern: Dynamic Step Generation (TLWR Test Pattern)

### Revolutionary Dynamic Form Growth
For advanced use cases where form steps are added based on user selections, implement the dynamic test pattern:

\`\`\`typescript
// Dynamic step generation based on form.watch() values
export function useFormSteps({ form }: { form: any }) {
  const t = useTranslations('TLWR');
  
  const steps = useMemo(() => {
    const baseSteps = [
      { id: 1, key: 'basic_info', name: 'Basic Information', description: 'Laboratory and customer details' },
      { id: 2, key: 'request_type', name: 'Request Type', description: 'Select request type and details' },
      { id: 3, key: 'tlwr_test_selection', name: 'Test Selection', description: 'Select TLWR tests to perform' }
    ];

    let pageId = 4;

    // Dynamic step addition based on selections
    if (form.watch('tlwrTest_salt_fog')) {
      baseSteps.push({ 
        id: pageId++,
        key: 'tlwr_salt_fog_config',
        name: 'Salt Fog Config', 
        description: 'Salt fog test configuration'
      });
    }

    if (form.watch('tlwrTest_quv')) {
      baseSteps.push({ 
        id: pageId++,
        key: 'tlwr_quv_config',
        name: 'QUV Config', 
        description: 'QUV test configuration'
      });
    }

    // Add final step
    baseSteps.push({ 
      id: pageId++,
      key: 'additional_info',
      name: 'Additional Information', 
      description: 'Final details and requirements'
    });

    return baseSteps;
  }, [
    form.watch('tlwrTest_salt_fog'),
    form.watch('tlwrTest_quv'),
    t
  ]);

  return { steps, /* other hooks */ };
}

// Component routing based on step keys
const renderStepContent = () => {
  const stepKey = stepNavigation.currentStepInfo?.key;
  
  switch (stepKey) {
    case 'tlwr_test_selection':
      return <TLWRPage3Step form={form} />; // Only switches
    case 'tlwr_salt_fog_config':
      return <TLWRSaltFogTestStep form={form} />; // Dedicated page
    case 'tlwr_quv_config':
      return <TLWRQUVTestStep form={form} />; // Dedicated page
    default:
      return <BasicStep form={form} />;
  }
};
\`\`\`

**Key Pattern Benefits:**
- Form grows from 5/6 to 8+ pages based on user selections
- Clean separation: Selection vs. Configuration 
- Each test gets its own dedicated component page
- Progressive form building based on user choices

## Customization Guide

### Adding New Steps
1. **Update totalSteps** in useStepNavigation(4)
2. **Add step fields** to schema
3. **Add step validation** to validateCurrentStep
4. **Add step UI** with conditional rendering
5. **Update defaultValues**

### Example: Adding Step 4
\`\`\`typescript
// 1. Update hook
const { currentStep, nextStep, prevStep, totalSteps } = useStepNavigation(4)

// 2. Add to schema
additionalDetails: z.object({
  address: z.string().min(1, t('validation.address_required')),
  city: z.string().min(1, t('validation.city_required')),
}),

// 3. Add to validation
const stepFields = {
  0: ['basicInfo.name', 'basicInfo.email'],
  1: ['additionalInfo.phone', 'additionalInfo.company'],
  2: ['preferences.notifications', 'preferences.newsletter'],
  3: ['additionalDetails.address', 'additionalDetails.city'], // New step
}

// 4. Add step UI
{currentStep === 3 && (
  <Card>
    <CardContent className="pt-6">
      <h3 className="text-lg font-semibold mb-4">{t('address_title')}</h3>
      {/* Step 4 fields */}
    </CardContent>
  </Card>
)}
\`\`\`

## StepIndicator Component

The StepIndicator component provides comprehensive step visualization with:
- Responsive design (desktop with arrows, mobile with dots)
- Progress header with animated progress bar
- Interactive navigation with optional onClick handlers
- Complete state management (completed, current, future steps)

**IMPORTANT**: See `form-bundle/components/step-indicator.js` for the complete StepIndicator implementation with all features, props documentation, and usage examples.

---

**Usage**: Copy this template and customize the steps, schema, and validation for your specific multi-step form needs. Ensure you include the StepIndicator component from the components directory.
`;