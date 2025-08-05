export default `# Form Bundle - Button Patterns

## Overview
Unified button and action patterns ensuring consistent user experience across all forms. Includes standard buttons, loading states, and multi-step navigation.

## Standard Button Patterns

### Primary Action Buttons
\`\`\`typescript
// Standard button container
<div className="flex gap-4">
  {/* Submit button - FIRST */}
  <Button type="submit" disabled={form.formState.isSubmitting}>
    {form.formState.isSubmitting ? t('saving') : (isEditMode ? t('update') : t('create'))}
  </Button>
  
  {/* Cancel button - SECOND */}
  <Button 
    type="button" 
    variant="outline" 
    onClick={() => router.push('/list-page')}
  >
    {t('cancel')}
  </Button>
</div>
\`\`\`

### Button Order (MANDATORY)
1. **Submit button FIRST** - Primary action
2. **Cancel button SECOND** - Secondary action with outline variant

## Form-Specific Button Patterns

### Simple Form Buttons
\`\`\`typescript
<div className="flex gap-4">
  <Button type="submit" disabled={form.formState.isSubmitting}>
    {form.formState.isSubmitting ? t('saving') : t('save')}
  </Button>
  <Button 
    type="button" 
    variant="outline" 
    onClick={() => router.push('/list-page')}
  >
    {t('cancel')}
  </Button>
</div>
\`\`\`

### Edit Mode Button Pattern
\`\`\`typescript
<div className="flex gap-4">
  <Button type="submit" disabled={form.formState.isSubmitting}>
    {form.formState.isSubmitting ? t('saving') : (isEditMode ? t('update') : t('create'))}
  </Button>
  <Button 
    type="button" 
    variant="outline" 
    onClick={() => router.push('/list-page')}
  >
    {t('cancel')}
  </Button>
</div>
\`\`\`

## Multi-Step Navigation Patterns

### Multi-Step Button Layout
\`\`\`typescript
<div className="flex gap-4">
  {/* Previous button - conditional */}
  {currentStep > 0 && (
    <Button type="button" variant="outline" onClick={prevStep}>
      {t('previous')}
    </Button>
  )}
  
  {/* Next/Submit button - conditional */}
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
\`\`\`

### Multi-Step Navigation Logic
\`\`\`typescript
const handleNext = async () => {
  const isValid = await validateCurrentStep()
  if (isValid) nextStep()
}

const handlePrevious = () => {
  prevStep()
}
\`\`\`

## Loading States

### Button Loading States
\`\`\`typescript
// Form submission loading
<Button type="submit" disabled={form.formState.isSubmitting}>
  {form.formState.isSubmitting ? t('saving') : t('save')}
</Button>

// Custom loading state
const [isValidating, setIsValidating] = useState(false)

<Button type="button" disabled={isValidating} onClick={handleNext}>
  {isValidating ? t('validating') : t('next')}
</Button>
\`\`\`

### Loading with Icons (Optional)
\`\`\`typescript
import { IconLoader2 } from '@tabler/icons-react'

<Button type="submit" disabled={form.formState.isSubmitting}>
  {form.formState.isSubmitting && (
    <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
  )}
  {form.formState.isSubmitting ? t('saving') : t('save')}
</Button>
\`\`\`

## Button Variants and Styling

### Button Variants
\`\`\`typescript
// Primary button (default)
<Button type="submit">
  {t('submit')}
</Button>

// Secondary/Cancel button
<Button type="button" variant="outline">
  {t('cancel')}
</Button>

// Destructive action
<Button type="button" variant="destructive">
  {t('delete')}
</Button>

// Ghost button (minimal)
<Button type="button" variant="ghost">
  {t('skip')}
</Button>
\`\`\`

### Button Sizes
\`\`\`typescript
// Default size
<Button>{t('button_text')}</Button>

// Small button
<Button size="sm">{t('button_text')}</Button>

// Large button
<Button size="lg">{t('button_text')}</Button>
\`\`\`

## Advanced Button Patterns

### Conditional Button Rendering
\`\`\`typescript
<div className="flex gap-4">
  {/* Conditional previous button */}
  {currentStep > 0 && (
    <Button type="button" variant="outline" onClick={prevStep}>
      {t('previous')}
    </Button>
  )}
  
  {/* Dynamic action button */}
  {canSaveAsDraft && (
    <Button type="button" variant="ghost" onClick={saveDraft}>
      {t('save_draft')}
    </Button>
  )}
  
  {/* Main action button */}
  <Button type="submit" disabled={form.formState.isSubmitting}>
    {form.formState.isSubmitting ? t('saving') : t('submit')}
  </Button>
</div>
\`\`\`

### Button with Confirmation
\`\`\`typescript
const [showConfirmation, setShowConfirmation] = useState(false)

const handleDelete = () => {
  if (showConfirmation) {
    // Perform delete action
    onDelete()
  } else {
    setShowConfirmation(true)
    // Reset confirmation after timeout
    setTimeout(() => setShowConfirmation(false), 3000)
  }
}

<Button 
  type="button" 
  variant={showConfirmation ? "destructive" : "outline"}
  onClick={handleDelete}
>
  {showConfirmation ? t('confirm_delete') : t('delete')}
</Button>
\`\`\`

## Required Imports
\`\`\`typescript
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
\`\`\`

## Translation Keys for Buttons

### Standard Button Labels
\`\`\`json
{
  "buttons": {
    "save": "Save",
    "saving": "Saving...",
    "submit": "Submit",
    "cancel": "Cancel",
    "create": "Create",
    "update": "Update",
    "delete": "Delete",
    "confirm_delete": "Click again to confirm",
    "next": "Next",
    "previous": "Previous",
    "save_draft": "Save Draft",
    "skip": "Skip",
    "validating": "Validating..."
  }
}
\`\`\`

## CSS Classes Reference

### Button Container
- **Standard Layout**: \`flex gap-4\`
- **Responsive**: Add responsive classes as needed
- **Alignment**: Use \`justify-start\`, \`justify-end\`, or \`justify-center\`

### Button States
- **Disabled**: Automatically handled by \`disabled\` prop
- **Loading**: Use \`form.formState.isSubmitting\` for form buttons
- **Active**: Use appropriate variant

## Implementation Checklist

### ✅ Button Patterns (UNIFIED STANDARD)
- [ ] Container: div.flex.gap-4
- [ ] Submit button FIRST with proper loading state
- [ ] Cancel button SECOND with variant="outline"
- [ ] Edit mode: {isEditMode ? t('update') : t('create')}
- [ ] Proper disabled states during submission

### ✅ Multi-Step Navigation (if applicable)
- [ ] Conditional previous button
- [ ] Next/Submit button logic
- [ ] Validation before navigation
- [ ] Proper button variants

### ✅ Loading States
- [ ] Form submission loading with isSubmitting
- [ ] Custom loading states where needed
- [ ] Disabled states during operations

---

**Next Steps**: Use \`feedback-patterns\` for toast notifications or \`layout-patterns\` for form spacing.
`;