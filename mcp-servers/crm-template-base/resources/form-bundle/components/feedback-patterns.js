export default `# Form Bundle - Feedback Patterns

## Overview
Unified feedback and state management patterns ensuring consistent user notifications, loading states, and success/error handling across all forms.

## Toast Notification Patterns

### Success Feedback
\`\`\`typescript
import { toast } from 'sonner'
import { IconCheck } from '@tabler/icons-react'

// Standard success pattern
const onSubmit = async (data: FormData) => {
  try {
    // Submit logic here
    console.log('Form data:', data)
    toast.success(t('success_message'), { icon: <IconCheck /> })
    router.push('/success-redirect')
  } catch (error) {
    toast.error(t('error_message'))
  }
}
\`\`\`

### Error Feedback
\`\`\`typescript
// Error handling with toast
try {
  await submitForm(data)
  toast.success(t('form_submitted_successfully'), { icon: <IconCheck /> })
} catch (error) {
  toast.error(t('form_submission_failed'))
  console.error('Form submission error:', error)
}
\`\`\`

### Loading Feedback
\`\`\`typescript
import { IconLoader2 } from '@tabler/icons-react'

// Loading toast for long operations
const handleSubmit = async (data: FormData) => {
  const loadingToast = toast.loading(t('processing_request'))
  
  try {
    await submitForm(data)
    toast.dismiss(loadingToast)
    toast.success(t('success_message'), { icon: <IconCheck /> })
  } catch (error) {
    toast.dismiss(loadingToast)
    toast.error(t('error_message'))
  }
}
\`\`\`

## Form State Management

### Form Loading States
\`\`\`typescript
// Form submission loading
<Button type="submit" disabled={form.formState.isSubmitting}>
  {form.formState.isSubmitting ? t('saving') : t('save')}
</Button>

// Custom loading state
const [isLoading, setIsLoading] = useState(false)

const handleAction = async () => {
  setIsLoading(true)
  try {
    await performAction()
    toast.success(t('action_completed'))
  } catch (error) {
    toast.error(t('action_failed'))
  } finally {
    setIsLoading(false)
  }
}
\`\`\`

### Multi-Step Form State
\`\`\`typescript
// Centralized form state for multi-step
const useRequestForm = <T>() => {
  const [formData, setFormData] = useState<Partial<T>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const updateFormData = (stepData: Partial<T>) => {
    setFormData(prev => ({ ...prev, ...stepData }))
  }
  
  const resetFormData = () => {
    setFormData({})
    setIsSubmitting(false)
  }
  
  const submitForm = async (onSubmit: (data: T) => Promise<void>) => {
    setIsSubmitting(true)
    try {
      await onSubmit(formData as T)
      toast.success(t('form_submitted_successfully'), { icon: <IconCheck /> })
    } catch (error) {
      toast.error(t('form_submission_failed'))
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return { formData, updateFormData, resetFormData, submitForm, isSubmitting }
}
\`\`\`

## Validation Feedback

### Real-Time Validation Feedback
\`\`\`typescript
// Form configuration for real-time feedback
const form = useForm<FormData>({
  resolver: zodResolver(createFormSchema(t)),
  mode: 'onChange', // Real-time validation
  reValidateMode: 'onChange',
})

// Field-level validation display
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('email_label')} *</FormLabel>
      <FormControl>
        <Input 
          {...field} 
          className={form.formState.errors.email ? 'border-destructive' : ''}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
\`\`\`

### Step Validation Feedback
\`\`\`typescript
// Step validation with feedback
const [validationErrors, setValidationErrors] = useState<string[]>([])

const validateCurrentStep = async () => {
  const stepFields = {
    0: ['basicInfo.name', 'basicInfo.email'],
    1: ['additionalInfo.phone', 'additionalInfo.company'],
    2: ['preferences.notifications', 'preferences.newsletter'],
  }
  
  const fieldsToValidate = stepFields[currentStep as keyof typeof stepFields]
  const isValid = await form.trigger(fieldsToValidate as any)
  
  if (!isValid) {
    const errors = fieldsToValidate
      .filter(field => form.formState.errors[field as keyof typeof form.formState.errors])
      .map(field => t(\`validation.\${field}_error\`))
    
    setValidationErrors(errors)
    toast.error(t('please_fix_errors'))
  } else {
    setValidationErrors([])
  }
  
  return isValid
}
\`\`\`

## Progress Indicators

### Step Progress Indicator
\`\`\`typescript
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <div className="flex items-center justify-center space-x-4 mb-8">
    {Array.from({ length: totalSteps }, (_, index) => (
      <div key={index} className="flex items-center">
        <div className={\`w-8 h-8 rounded-full flex items-center justify-center \${
          index <= currentStep 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted text-muted-foreground'
        }\`}>
          {index < currentStep ? (
            <IconCheck className="w-4 h-4" />
          ) : (
            index + 1
          )}
        </div>
        {index < totalSteps - 1 && (
          <div className={\`w-12 h-1 \${
            index < currentStep ? 'bg-primary' : 'bg-muted'
          }\`} />
        )}
      </div>
    ))}
  </div>
)
\`\`\`

### Form Progress Bar
\`\`\`typescript
import { Progress } from '@/components/ui/progress'

const FormProgress = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100
  
  return (
    <div className="space-y-2 mb-6">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{t('step_progress', { current: currentStep + 1, total: totalSteps })}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}
\`\`\`

## Error Handling Patterns

### Form Error Summary
\`\`\`typescript
const FormErrorSummary = ({ errors }: { errors: FieldErrors<FormData> }) => {
  const errorMessages = Object.values(errors).map(error => error?.message).filter(Boolean)
  
  if (errorMessages.length === 0) return null
  
  return (
    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
      <h3 className="font-semibold text-destructive mb-2">{t('please_fix_errors')}</h3>
      <ul className="space-y-1">
        {errorMessages.map((message, index) => (
          <li key={index} className="text-sm text-destructive">
            • {message}
          </li>
        ))}
      </ul>
    </div>
  )
}
\`\`\`

### Network Error Handling
\`\`\`typescript
const handleNetworkError = (error: any) => {
  if (error.response?.status === 400) {
    toast.error(t('validation_error'))
  } else if (error.response?.status === 401) {
    toast.error(t('unauthorized_error'))
    router.push('/login')
  } else if (error.response?.status >= 500) {
    toast.error(t('server_error'))
  } else if (error.name === 'NetworkError') {
    toast.error(t('network_error'))
  } else {
    toast.error(t('unexpected_error'))
  }
}
\`\`\`

## Required Imports
\`\`\`typescript
import { toast } from 'sonner'
import { IconCheck, IconLoader2 } from '@tabler/icons-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
\`\`\`

## Toast Message Types

### Standard Toast Patterns
\`\`\`typescript
// Success with icon
toast.success(t('operation_successful'), { icon: <IconCheck /> })

// Error
toast.error(t('operation_failed'))

// Warning
toast.warning(t('operation_warning'))

// Info
toast.info(t('operation_info'))

// Loading (dismissible)
const loadingToast = toast.loading(t('processing'))
// Later: toast.dismiss(loadingToast)

// Custom duration
toast.success(t('saved'), { duration: 2000 })

// Action toast
toast.success(t('item_deleted'), {
  action: {
    label: t('undo'),
    onClick: () => handleUndo(),
  },
})
\`\`\`

## Translation Keys for Feedback

### Standard Feedback Messages
\`\`\`json
{
  "feedback": {
    "success_message": "Operation completed successfully",
    "error_message": "Something went wrong. Please try again.",
    "form_submitted_successfully": "Form submitted successfully",
    "form_submission_failed": "Failed to submit form",
    "processing_request": "Processing your request...",
    "saving": "Saving...",
    "save": "Save",
    "action_completed": "Action completed",
    "action_failed": "Action failed",
    "please_fix_errors": "Please fix the errors below",
    "validation_error": "Please check your input",
    "unauthorized_error": "You are not authorized",
    "server_error": "Server error occurred",
    "network_error": "Network connection failed",
    "unexpected_error": "An unexpected error occurred",
    "step_progress": "Step {{current}} of {{total}}"
  }
}
\`\`\`

## Implementation Checklist

### ✅ Toast & Feedback (100% CONSISTENT)
- [ ] Success: toast.success(t('message'), { icon: <IconCheck /> })
- [ ] Error: toast.error(t('error_message'))
- [ ] Sonner toast library implementation
- [ ] Proper error handling with try/catch

### ✅ Form State Management
- [ ] Loading states with form.formState.isSubmitting
- [ ] Real-time validation feedback
- [ ] Progress indicators for multi-step forms
- [ ] Error summary components

### ✅ User Experience
- [ ] Immediate feedback on actions
- [ ] Clear error messages
- [ ] Progress indication for long operations
- [ ] Consistent success/error patterns

---

**Next Steps**: Use templates for complete form implementations or check \`quick-reference\` for common patterns.
`;