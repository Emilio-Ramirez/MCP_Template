export default `# Form Bundle - Validation Patterns

## Overview
Unified validation system with translation-aware schema patterns, form configuration, and error handling for 100% consistent validation across all forms.

## Schema Patterns with Translation-Aware Validation

### Basic Schema Pattern
\`\`\`typescript
const createFormSchema = (t: any) => z.object({
  // Required fields with custom messages
  name: z.string().min(1, t('validation.name_required')),
  email: z.string().email(t('validation.email_invalid')),
  
  // Number validation
  quantity: z.coerce.number().min(1, t('validation.quantity_min')),
  
  // Optional fields
  description: z.string().optional(),
  
  // Boolean fields with defaults
  isActive: z.boolean().default(false),
  
  // Conditional validation
  conditionalField: z.string().optional().refine((val) => {
    // Custom validation logic
    return val && val.length > 0
  }, t('validation.conditional_required')),
})

// Type safety
type FormData = z.infer<ReturnType<typeof createFormSchema>>
\`\`\`

### Simple Form Schema Template
\`\`\`typescript
export const createSimpleFormSchema = (t: any) => z.object({
  // Number inputs FIRST
  quantity: z.coerce.number().min(1, t('validation.quantity_required')),
  price: z.coerce.number().min(0.01, t('validation.price_required')),
  
  // Text inputs SECOND
  name: z.string().min(1, t('validation.name_required')),
  email: z.string().email(t('validation.email_invalid')),
  
  // Select inputs THIRD
  category: z.string().min(1, t('validation.category_required')),
  status: z.string().min(1, t('validation.status_required')),
  
  // Boolean inputs FOURTH
  isActive: z.boolean().default(false),
  isPublic: z.boolean().default(true),
  
  // Textarea inputs LAST
  description: z.string().optional(),
  notes: z.string().optional(),
})
\`\`\`

### Multi-Step Schema Pattern
\`\`\`typescript
export const createMultiStepSchema = (t: any) => z.object({
  basicInfo: z.object({
    name: z.string().min(1, t('validation.name_required')),
    email: z.string().email(t('validation.email_invalid')),
  }),
  additionalInfo: z.object({
    phone: z.string().min(1, t('validation.phone_required')),
    company: z.string().min(1, t('validation.company_required')),
  }),
  preferences: z.object({
    notifications: z.boolean().default(true),
    newsletter: z.boolean().default(false),
  }),
})
\`\`\`

## Form Configuration

### Standard Form Setup
\`\`\`typescript
const form = useForm<FormData>({
  resolver: zodResolver(createFormSchema(t)),
  mode: 'onChange', // Real-time validation
  defaultValues: {
    name: '',
    email: '',
    quantity: undefined, // Empty number field for better UX
    description: '',
    isActive: false,
  },
})
\`\`\`

### Multi-Step Form Setup
\`\`\`typescript
const form = useForm<MultiStepFormData>({
  resolver: zodResolver(createMultiStepSchema(t)),
  mode: 'onChange', // Real-time validation
  defaultValues: {
    basicInfo: { name: '', email: '' },
    additionalInfo: { phone: '', company: '' },
    preferences: { notifications: true, newsletter: false },
  },
})
\`\`\`

## Validation Types and Rules

### Common Validation Patterns
\`\`\`typescript
// Required string
name: z.string().min(1, t('validation.name_required')),

// Email validation
email: z.string().email(t('validation.email_invalid')),

// Number with minimum
quantity: z.coerce.number().min(1, t('validation.quantity_min')),

// Number with range
price: z.coerce.number().min(0.01, t('validation.price_min')).max(999999, t('validation.price_max')),

// Optional string
description: z.string().optional(),

// String with length
password: z.string().min(8, t('validation.password_min_length')),

// Boolean with default
isActive: z.boolean().default(false),

// Enum/Select validation
status: z.enum(['active', 'inactive', 'pending'], {
  required_error: t('validation.status_required'),
}),

// Custom validation
customField: z.string().refine((val) => {
  // Custom logic here
  return val.includes('@')
}, t('validation.custom_message')),
\`\`\`

### Advanced Validation Patterns
\`\`\`typescript
// Conditional validation based on another field
conditionalField: z.string().optional().refine((val, ctx) => {
  const triggerField = ctx.parent.triggerField
  if (triggerField === 'required' && (!val || val.length === 0)) {
    return false
  }
  return true
}, t('validation.conditional_required')),

// Array validation
items: z.array(z.object({
  name: z.string().min(1, t('validation.item_name_required')),
  quantity: z.coerce.number().min(1, t('validation.item_quantity_required')),
})).min(1, t('validation.items_required')),

// Date validation
dateField: z.date({
  required_error: t('validation.date_required'),
  invalid_type_error: t('validation.date_invalid'),
}),
\`\`\`

## Step Validation for Multi-Step Forms

### Step-by-Step Validation
\`\`\`typescript
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
  if (isValid) nextStep()
}
\`\`\`

## Validation Display

### Error Message Display
- **Always use \`<FormMessage />\`** component for error display
- **Real-time Feedback**: Set \`mode: 'onChange'\` for immediate validation
- **Required Indicators**: Add asterisks (*) to required field labels
- **No FormDescription**: Remove all \`FormDescription\` components

### Error Handling Pattern
\`\`\`typescript
// Form submission with error handling
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

## Required Imports
\`\`\`typescript
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useTranslations } from 'next-intl'
\`\`\`

## Common Validation Messages (Translation Keys)

### Standard Keys
\`\`\`json
{
  "validation": {
    "name_required": "Name is required",
    "email_invalid": "Please enter a valid email",
    "email_required": "Email is required",
    "quantity_required": "Quantity is required",
    "quantity_min": "Quantity must be at least 1",
    "price_required": "Price is required",
    "price_min": "Price must be greater than 0",
    "category_required": "Please select a category",
    "status_required": "Please select a status",
    "phone_required": "Phone number is required",
    "company_required": "Company name is required",
    "password_min_length": "Password must be at least 8 characters"
  }
}
\`\`\`

## Implementation Checklist

### ✅ Schema Setup
- [ ] zodResolver with createFormSchema(t)
- [ ] Translation-aware validation messages
- [ ] Type safety: z.infer<ReturnType<typeof createFormSchema>>
- [ ] mode: 'onChange' for real-time validation
- [ ] Proper defaultValues configuration

### ✅ Validation System
- [ ] Translation-aware schema validation
- [ ] FormMessage for all error display
- [ ] Real-time validation feedback
- [ ] Required indicators (*) on field labels
- [ ] No FormDescription components

### ✅ Multi-Step Validation (if applicable)
- [ ] Step validation with form.trigger()
- [ ] Field groups for each step
- [ ] Progressive validation before navigation

---

**Next Steps**: Use \`button-patterns\` for form actions or \`feedback-patterns\` for toast notifications.
`;