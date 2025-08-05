export default `# Form Bundle - Critical Mandatory Patterns

## 🔴 CRITICAL WARNING: These patterns are MANDATORY for 95%+ consistency

**Breaking these patterns will result in inconsistent forms and degraded user experience.**

## 1. Field Organization Pattern (EXACT)

### MANDATORY Order - NEVER Change
1. **Number inputs** (\`type="number"\`) - FIRST
2. **Text inputs** (regular \`Input\` components) - SECOND  
3. **Select inputs** (\`Select\` components) - THIRD
4. **Boolean inputs** (\`Switch\`/\`Checkbox\` components) - FOURTH
5. **Textarea inputs** (\`Textarea\` components) - LAST

### Example Implementation (EXACT)
\`\`\`typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* 1. NUMBER INPUTS FIRST */}
  <FormField control={form.control} name="quantity" />
  <FormField control={form.control} name="price" />
  
  {/* 2. TEXT INPUTS SECOND */}
  <FormField control={form.control} name="name" />
  <FormField control={form.control} name="email" />
  
  {/* 3. SELECT INPUTS THIRD */}
  <FormField control={form.control} name="category" />
  <FormField control={form.control} name="status" />
  
  {/* 4. BOOLEAN INPUTS FOURTH */}
  <FormField control={form.control} name="isActive" />
  <FormField control={form.control} name="isPublic" />
</div>

{/* 5. TEXTAREA INPUTS LAST (outside grid) */}
<FormField control={form.control} name="description" />
<FormField control={form.control} name="notes" />
\`\`\`

## 2. Form Structure Pattern (EXACT)

### Page Structure (MANDATORY)
\`\`\`typescript
<PageContainer scrollable={true}>
  <div className="flex flex-1 flex-col space-y-4">
    <Heading title={t('page_title')} description={t('page_description')} />
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
            {/* Form content */}
          </form>
        </Form>
      </CardContent>
    </Card>
  </div>
</PageContainer>
\`\`\`

### Multi-Step Structure (MANDATORY)
\`\`\`typescript
{/* NO CardHeader per step - use Card → CardContent only */}
{currentStep === 0 && (
  <Card>
    <CardContent className="pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step fields */}
      </div>
    </CardContent>
  </Card>
)}
\`\`\`

## 3. Input Structure Pattern (EXACT)

### Standard Input (MANDATORY)
\`\`\`typescript
<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('field_label')} *</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
\`\`\`

### Boolean Input (EXACT Layout)
\`\`\`typescript
<FormField
  control={form.control}
  name="booleanField"
  render={({ field }) => (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <FormLabel className="text-base">{t('field_label')}</FormLabel>
      </div>
      <FormControl>
        <Switch checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
    </FormItem>
  )}
/>
\`\`\`

## 4. Validation Pattern (MANDATORY)

### Schema Structure (EXACT)
\`\`\`typescript
const createFormSchema = (t: any) => z.object({
  // Follow EXACT field order in schema
  // 1. Number fields
  quantity: z.coerce.number().min(1, t('validation.quantity_required')),
  
  // 2. Text fields
  name: z.string().min(1, t('validation.name_required')),
  email: z.string().email(t('validation.email_invalid')),
  
  // 3. Select fields
  category: z.string().min(1, t('validation.category_required')),
  
  // 4. Boolean fields
  isActive: z.boolean().default(false),
  
  // 5. Textarea fields
  description: z.string().optional(),
})
\`\`\`

### Form Configuration (MANDATORY)
\`\`\`typescript
const form = useForm<FormData>({
  resolver: zodResolver(createFormSchema(t)),
  mode: 'onChange', // MANDATORY for real-time validation
  defaultValues: {
    quantity: undefined, // MANDATORY: undefined for better UX
    name: '',
    category: '',
    isActive: false,
    description: '',
  },
})
\`\`\`

## 5. Button Pattern (EXACT)

### Button Order (MANDATORY)
\`\`\`typescript
<div className="flex gap-4">
  {/* 1. SUBMIT BUTTON FIRST */}
  <Button type="submit" disabled={form.formState.isSubmitting}>
    {form.formState.isSubmitting ? t('saving') : t('save')}
  </Button>
  
  {/* 2. CANCEL BUTTON SECOND */}
  <Button 
    type="button" 
    variant="outline" 
    onClick={() => router.push('/list-page')}
  >
    {t('cancel')}
  </Button>
</div>
\`\`\`

### Multi-Step Navigation (EXACT)
\`\`\`typescript
<div className="flex gap-4">
  {currentStep > 0 && (
    <Button type="button" variant="outline" onClick={prevStep}>
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
\`\`\`

## 6. Layout Pattern (EXACT)

### Grid Layout (MANDATORY)
\`\`\`typescript
{/* MANDATORY responsive grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Grid fields here - NEVER put textarea in grid */}
</div>

{/* MANDATORY: Textarea outside grid for full width */}
<FormField control={form.control} name="description" />
\`\`\`

### Spacing (EXACT)
\`\`\`typescript
{/* MANDATORY form spacing */}
<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
  {/* Form content */}
</form>
\`\`\`

## 7. Toast Pattern (EXACT)

### Success/Error Feedback (MANDATORY)
\`\`\`typescript
const onSubmit = async (data: FormData) => {
  try {
    // Submit logic
    toast.success(t('success_message'), { icon: <IconCheck /> })
    router.push('/success-redirect')
  } catch (error) {
    toast.error(t('error_message'))
  }
}
\`\`\`

## 8. StepIndicator Pattern (EXACT)

### Multi-Step Indicator (MANDATORY)
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
          {index + 1}
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

## 🚨 CRITICAL VIOLATIONS TO AVOID

### Field Order Violations
- ❌ **WRONG**: Select before Text inputs
- ❌ **WRONG**: Boolean before Select inputs  
- ❌ **WRONG**: Textarea in grid layout
- ❌ **WRONG**: Number inputs not first

### Structure Violations
- ❌ **WRONG**: Missing \`mode: 'onChange'\`
- ❌ **WRONG**: Number defaults set to 0 instead of undefined
- ❌ **WRONG**: Using FormDescription components
- ❌ **WRONG**: Cancel button before Submit button

### Layout Violations
- ❌ **WRONG**: Not using \`space-y-6\` for form spacing
- ❌ **WRONG**: Not using responsive grid
- ❌ **WRONG**: Boolean fields without special border layout
- ❌ **WRONG**: Individual headers on multi-step cards

### Validation Violations
- ❌ **WRONG**: Not using translation-aware validation
- ❌ **WRONG**: Missing FormMessage components
- ❌ **WRONG**: No asterisks on required fields

## ✅ COMPLIANCE CHECKLIST

Before submitting ANY form implementation, verify:

### Structure Compliance
- [ ] PageContainer with scrollable={true}
- [ ] Heading → Separator → Card structure
- [ ] CardHeader with proper title styling
- [ ] Form with space-y-6 className

### Field Compliance  
- [ ] Number inputs FIRST
- [ ] Text inputs SECOND
- [ ] Select inputs THIRD
- [ ] Boolean inputs FOURTH (with border layout)
- [ ] Textarea inputs LAST (outside grid)

### Validation Compliance
- [ ] mode: 'onChange' set
- [ ] Translation-aware schema
- [ ] FormMessage on all fields
- [ ] Required asterisks (*) on labels

### Button Compliance
- [ ] Submit button FIRST
- [ ] Cancel button SECOND with outline variant
- [ ] Proper loading states
- [ ] Multi-step navigation if applicable

### Layout Compliance
- [ ] Responsive grid with gap-6
- [ ] Textarea outside grid
- [ ] Boolean fields with special layout
- [ ] Step indicator for multi-step (mb-8)

---

**⚠️ WARNING: Deviating from these patterns will break the 95%+ consistency standard and create fragmented user experience.**
`;