export default `# Form Bundle - Quick Reference

## Most Common Patterns Cheat Sheet

### Field Order (MANDATORY)
1. **Number** inputs first
2. **Text** inputs second  
3. **Select** inputs third
4. **Boolean** inputs fourth
5. **Textarea** inputs last

### Standard Field Structure
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

### Schema Pattern
\`\`\`typescript
const createFormSchema = (t: any) => z.object({
  quantity: z.coerce.number().min(1, t('validation.quantity_required')),
  name: z.string().min(1, t('validation.name_required')),
  category: z.string().min(1, t('validation.category_required')),
  isActive: z.boolean().default(false),
  description: z.string().optional(),
})
\`\`\`

### Form Setup
\`\`\`typescript
const form = useForm<FormData>({
  resolver: zodResolver(createFormSchema(t)),
  mode: 'onChange',
  defaultValues: {
    quantity: undefined, // Empty for better UX
    name: '',
    isActive: false,
  },
})
\`\`\`

### Layout Pattern
\`\`\`typescript
<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Grid fields here */}
  </div>
  {/* Textarea outside grid */}
</form>
\`\`\`

### Button Pattern
\`\`\`typescript
<div className="flex gap-4">
  <Button type="submit" disabled={form.formState.isSubmitting}>
    {form.formState.isSubmitting ? t('saving') : t('save')}
  </Button>
  <Button type="button" variant="outline" onClick={() => router.push('/back')}>
    {t('cancel')}
  </Button>
</div>
\`\`\`

### Toast Pattern
\`\`\`typescript
try {
  // Submit logic
  toast.success(t('success_message'), { icon: <IconCheck /> })
} catch (error) {
  toast.error(t('error_message'))
}
\`\`\`

## Input Type Quick Reference

### Number Input
\`\`\`typescript
<Input type="number" {...field} />
// Schema: z.coerce.number().min(1, t('validation.required'))
\`\`\`

### Email Input  
\`\`\`typescript
<Input type="email" {...field} />
// Schema: z.string().email(t('validation.email_invalid'))
\`\`\`

### Select Input
\`\`\`typescript
<Select onValueChange={field.onChange} defaultValue={field.value}>
  <FormControl>
    <SelectTrigger>
      <SelectValue placeholder={t('placeholder')} />
    </SelectTrigger>
  </FormControl>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
  </SelectContent>
</Select>
\`\`\`

### Switch Input
\`\`\`typescript
<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
  <div className="space-y-0.5">
    <FormLabel className="text-base">{t('label')}</FormLabel>
  </div>
  <FormControl>
    <Switch checked={field.value} onCheckedChange={field.onChange} />
  </FormControl>
</FormItem>
\`\`\`

### Textarea Input
\`\`\`typescript
<Textarea className="resize-none" {...field} />
\`\`\`

## Essential Imports
\`\`\`typescript
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { IconCheck } from '@tabler/icons-react'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
\`\`\`

## CSS Classes Quick Reference
- **Form spacing**: \`space-y-6\`
- **Grid layout**: \`grid grid-cols-1 md:grid-cols-2 gap-6\`
- **Button container**: \`flex gap-4\`
- **Card width**: \`mx-auto w-full\`
- **Boolean field**: \`rounded-lg border p-4\`

---

## Dynamic Multi-Step Form Quick Reference

### Dynamic Step Configuration
\`\`\`typescript
// CRITICAL: Steps must have 'key' AND 'name' properties
const steps = [
  { id: 1, key: 'basic_info', name: 'Basic Information', description: '...' }
];
\`\`\`

### Test Selection Pattern
\`\`\`typescript
// Field naming: {prefix}Test_{test_id}
<FormField
  name="vlwrTest_salt_fog"
  render={({ field }) => (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
      <FormControl>
        <Switch checked={field.value || false} onCheckedChange={field.onChange} />
      </FormControl>
    </FormItem>
  )}
/>
\`\`\`

### Dynamic Step Generation
\`\`\`typescript
// CRITICAL: Watch ALL form values for reactivity
const formValues = form.watch();
const steps = useMemo(() => getSteps(form, t), [formValues, t]);
\`\`\`

### Step Content Rendering
\`\`\`typescript
// CRITICAL: Use step.key NOT step.name for routing
switch (currentStep?.key) {
  case 'vlwr_salt_fog_config':
    return <VLWRSaltFogConfigStep form={form} />;
}
\`\`\`

### Dynamic Step Component Pattern
\`\`\`typescript
<Card>
  <CardContent className="pt-6"> {/* No CardHeader */}
    {/* Field order: Number → Text → Select → Boolean → Textarea */}
  </CardContent>
</Card>
\`\`\`

**For detailed patterns**: Request specific components like \`input-patterns\`, \`validation-patterns\`, or \`dynamic-multi-step-form-pattern\`.
`;