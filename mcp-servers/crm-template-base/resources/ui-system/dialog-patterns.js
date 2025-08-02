export default `# Dialog Patterns - Unified Design System

This document establishes the **MANDATORY** unified dialog patterns for enterprise applications. These patterns ensure consistency and optimal user experience across all dialog components.

## Overview

There are two main dialog types that cover all use cases:
1. **Form Dialogs** - For user input, approvals, and data submission
2. **Details Dialogs** - For viewing detailed information with optional actions

## 1. Form Dialog Pattern (MANDATORY)

### Form Dialog Requirements

1. **No redundant titles** - Remove self-repeating titles like "Client Details", "Request Details"
2. **No asterisks on labels** - Remove \`*\` from required field labels  
3. **Reduced spacing** - Use \`space-y-4\` instead of \`space-y-6\` for main container
4. **Unified content styling** - Use \`bg-card rounded-lg border p-4\` for content boxes
5. **No DialogDescription** - Remove description sections to reduce clutter
6. **Consistent structure** - Follow the exact template structure

### Form Dialog Template

\`\`\`tsx
export function StandardFormModal({ isOpen, onClose, entityId }: StandardModalProps) {
  const t = useTranslations('SectionName');
  const [formData, setFormData] = useState('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (!formData.trim()) {
      setFormError(t('field_required'));
      return;
    }

    setFormError('');
    setIsLoading(true);

    try {
      // API call
      await apiService.processAction(formData);
      toast.success(t('success_message'));
      
      // Reset and close
      setFormData('');
      setFormError('');
      onClose();
    } catch (error) {
      toast.error(t('error_message'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(e.target.value);
    if (formError) {
      setFormError('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        {/* STANDARD HEADER - No DialogDescription */}
        <DialogHeader>
          <DialogTitle>{t('modal_title')}</DialogTitle>
        </DialogHeader>

        {/* STANDARD SPACING - space-y-4 */}
        <div className='space-y-4'>
          {/* CONTENT SECTION - bg-card rounded-lg border p-4 */}
          <div className='bg-card rounded-lg border p-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Content fields - no redundant section titles */}
              <div>
                <Label className='text-muted-foreground text-sm font-medium'>
                  {t('field_name')}
                </Label>
                <p className='mt-1 text-sm font-medium'>
                  {entityData.fieldValue}
                </p>
              </div>
              {/* More fields... */}
            </div>
          </div>

          {/* FORM FIELDS SECTION */}
          <div className='space-y-3'>
            {/* NO ASTERISK on labels */}
            <Label htmlFor='formField' className='text-base font-medium'>
              {t('form_field_label')}
            </Label>
            <Input
              id='formField'
              placeholder={t('field_placeholder')}
              value={formData}
              onChange={handleInputChange}
              className={formError ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {/* Inline error display */}
            {formError && (
              <p className='text-sm text-red-500 mt-1'>{formError}</p>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className='flex justify-end gap-3 pt-4'>
            <Button variant='outline' onClick={onClose} disabled={isLoading}>
              {t('cancel')}
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              <IconCheck className='mr-2 h-4 w-4' />
              {isLoading ? t('processing') : t('submit')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
\`\`\`

## 2. Details Dialog Pattern (MANDATORY)

### Details Dialog Requirements

1. **Responsive width** - Use \`max-h-[90vh] w-[95vw] max-w-none lg:max-w-[85vw] xl:max-w-[80vw]\`
2. **Print-friendly actions** - Include print functionality for full content export
3. **Organized layout** - Use grid layouts to separate main content from sidebar information
4. **No form inputs** - Focus on information display with optional actions
5. **Consistent spacing** - Use \`space-y-4\` for main container
6. **Content boxes** - Use \`bg-card rounded-lg border p-4\` for information sections

### Details Dialog Template

\`\`\`tsx
export function StandardDetailsModal({ isOpen, onClose, entity }: DetailsModalProps) {
  const t = useTranslations('SectionName');
  const locale = useLocale();

  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) return;

    const printContent = \`
      <!DOCTYPE html>
      <html>
        <head>
          <title>\${t('details_title')} - \${entity.id}</title>
          <style>
            body { font-family: system-ui, sans-serif; margin: 20px; }
            .print-section { margin-bottom: 24px; border: 1px solid #e5e7eb; padding: 16px; }
            .print-field { margin-bottom: 12px; }
            .print-label { font-size: 12px; color: #6b7280; display: block; margin-bottom: 4px; }
            .print-value { font-size: 14px; font-weight: 500; }
          </style>
        </head>
        <body>
          <!-- Print content structure -->
        </body>
      </html>
    \`;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[90vh] w-[95vw] max-w-none lg:max-w-[85vw] xl:max-w-[80vw] overflow-y-auto [&>button]:hidden'>
        {/* HEADER WITH ACTIONS */}
        <div className='flex items-center justify-between'>
          <DialogTitle>
            {t('details_title')} - {entity.id}
          </DialogTitle>
          <div className='flex gap-2'>
            <Button variant='outline' size='sm' onClick={handlePrint}>
              <Printer className='mr-1 h-4 w-4' />
              {t('print')}
            </Button>
          </div>
        </div>

        {/* STATUS ROW (if applicable) */}
        <div className='flex items-center gap-4 py-2'>
          <Badge variant='outline' className={getStatusColor(entity.status)}>
            {t('statuses.' + entity.status)}
          </Badge>
          {entity.priority && (
            <Badge variant='outline' className={getPriorityColor(entity.priority)}>
              {t('priorities.' + entity.priority)}
            </Badge>
          )}
        </div>

        {/* MAIN CONTENT GRID */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {/* LEFT COLUMN - Main Information */}
          <div className='space-y-4'>
            <div className='bg-card rounded-lg border p-4'>
              <h3 className='text-lg font-semibold mb-4'>{t('basic_information')}</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Label className='text-muted-foreground text-sm font-medium'>
                    {t('field_name')}
                  </Label>
                  <p className='mt-1 text-sm font-medium'>
                    {entity.fieldValue}
                  </p>
                </div>
                {/* More fields... */}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Sidebar Information */}
          <div className='space-y-4'>
            <div className='bg-card rounded-lg border p-4'>
              <h3 className='text-lg font-semibold mb-4'>{t('timeline')}</h3>
              <div className='space-y-3'>
                <div className='flex justify-between items-center py-2 border-b border-border last:border-b-0'>
                  <span className='text-sm text-muted-foreground'>{t('created_date')}</span>
                  <span className='text-sm font-medium'>{formatDate(entity.createdDate, locale)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
\`\`\`

## Critical Implementation Rules

### MUST DO:
1. Use \`bg-card rounded-lg border p-4\` for content containers
2. Use \`space-y-4\` for main dialog spacing
3. Remove redundant section titles
4. Remove asterisks from field labels
5. Remove DialogDescription components
6. Use inline error validation
7. Follow the exact structure template

### MUST NOT DO:
1. Use Card/CardContent components for content display
2. Use \`space-y-6\` spacing in main containers
3. Include redundant titles like "Request Details"
4. Add asterisks (*) to required field labels
5. Include DialogDescription sections
6. Use excessive vertical spacing

## Validation and Error Handling

### Inline Validation Pattern
\`\`\`tsx
const [fieldError, setFieldError] = useState('');

const handleSubmit = async () => {
  if (!field.trim()) {
    setFieldError(t('field_required'));
    return;
  }
  
  setFieldError(''); // Clear error
  // Continue with submission
};

const handleFieldChange = (e) => {
  setField(e.target.value);
  if (fieldError) {
    setFieldError(''); // Clear error when user starts typing
  }
};

// Show error inline with field
{fieldError && (
  <p className='text-sm text-red-500 mt-1'>{fieldError}</p>
)}
\`\`\`

### Toast Usage Guidelines
- ✅ **Use toasts for**: API success/failure messages
- ❌ **Don't use toasts for**: Form validation errors

## Responsive Dialog Sizing

\`\`\`tsx
{/* Standard sizes for different content types */}
<DialogContent className='max-w-2xl'>           {/* For complex forms */}
<DialogContent className='sm:max-w-[600px]'>   {/* For medium forms */}
<DialogContent className='sm:max-w-[500px]'>   {/* For simple forms */}

{/* For details dialogs - responsive width */}
<DialogContent className='max-h-[90vh] w-[95vw] max-w-none lg:max-w-[85vw] xl:max-w-[80vw]'>
\`\`\`

## Benefits of This Pattern

- **Consistent User Experience** across all dialogs
- **Reduced Visual Clutter** with cleaner layouts
- **Better Usability** with inline validation
- **Maintainability** with standardized code patterns
- **Design System Coherence** across the application

These patterns are **MANDATORY** for all dialog components. Any deviation must be approved through design review.`;