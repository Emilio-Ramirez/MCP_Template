export default `# Form Bundle - Input Patterns

## Overview
Complete input field system ensuring 100% consistency across all form implementations. Includes mandatory field organization, component structure, and advanced patterns.

## Field Organization Pattern (MANDATORY)

**All forms MUST follow this exact order:**

1. **Number inputs** (\`type="number"\`) - FIRST
2. **Text inputs** (regular \`Input\` components) - SECOND  
3. **Select inputs** (\`Select\` components) - THIRD
4. **Boolean inputs** (\`Switch\`/\`Checkbox\` components) - FOURTH
5. **Textarea inputs** (\`Textarea\` components) - LAST

## Input Component Structure (100% CONSISTENT)

### Standard Input Pattern
\`\`\`typescript
<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('field_label')} {required && '*'}</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
\`\`\`

### Number Input Pattern
\`\`\`typescript
// Number inputs FIRST - with type="number"
<FormField
  control={form.control}
  name="quantity"
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('quantity_label')} *</FormLabel>
      <FormControl>
        <Input type="number" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
\`\`\`

### Text Input Pattern
\`\`\`typescript
// Text inputs SECOND - regular Input
<FormField
  control={form.control}
  name="name"
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
\`\`\`

### Select Input Pattern
\`\`\`typescript
// Select inputs THIRD
<FormField
  control={form.control}
  name="category"
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('category_label')} *</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={t('category_placeholder')} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="type1">Type 1</SelectItem>
          <SelectItem value="type2">Type 2</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
\`\`\`

### Boolean Input Pattern (Switch)
\`\`\`typescript
// Boolean inputs FOURTH
<FormField
  control={form.control}
  name="isActive"
  render={({ field }) => (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <FormLabel className="text-base">{t('active_label')}</FormLabel>
      </div>
      <FormControl>
        <Switch checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
    </FormItem>
  )}
/>
\`\`\`

### Textarea Pattern
\`\`\`typescript
// Textarea inputs LAST
<FormField
  control={form.control}
  name="description"
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('description_label')}</FormLabel>
      <FormControl>
        <Textarea className="resize-none" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
\`\`\`

## Advanced Input Patterns

### Conditional Rendering
\`\`\`typescript
// Watch field values for conditional rendering
const watchedValue = form.watch('triggerField')

{watchedValue === 'condition' && (
  <FormField
    control={form.control}
    name="conditionalField"
    render={({ field }) => (
      <FormItem>
        <FormLabel>{t('conditional_label')}</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)}
\`\`\`

### Static Option Generators
\`\`\`typescript
// Use static options (no translation functions)
const categoryOptions = [
  { value: 'type1', label: 'Type 1' },
  { value: 'type2', label: 'Type 2' },
  { value: 'type3', label: 'Type 3' },
]

// Implementation in Select
<SelectContent>
  {categoryOptions.map((option) => (
    <SelectItem key={option.value} value={option.value}>
      {option.label}
    </SelectItem>
  ))}
</SelectContent>
\`\`\`

### Email Input Pattern
\`\`\`typescript
<FormField
  control={form.control}
  name="email"
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
\`\`\`

## Layout Patterns

### Grid Layout (Responsive)
\`\`\`typescript
// Standard responsive grid for form fields
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Form fields here following the order: Number → Text → Select → Boolean */}
</div>

// Textarea fields go outside the grid (full width)
<FormField name="description" />
\`\`\`

## Required Imports
\`\`\`typescript
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
\`\`\`

## Number Field Best Practices

### Empty Number Field Defaults (UX Improvement)
- Changed all numeric defaults from 0 to \`undefined\` for better UX
- Users can directly type numbers without deleting pre-filled zeros
- Prevents awkward "01" → delete "0" workflow
- Provides cleaner input experience across all number fields

### Implementation
\`\`\`typescript
defaultValues: {
  quantity: undefined, // Better UX - empty field
  // NOT: quantity: 0, // Bad UX - pre-filled zero
}
\`\`\`

## Implementation Checklist

### ✅ Field Organization (MANDATORY)
- [ ] Number inputs FIRST (type="number")
- [ ] Text inputs SECOND (regular Input components)
- [ ] Select inputs THIRD (Select components)
- [ ] Boolean inputs FOURTH (Switch/Checkbox components)
- [ ] Textarea inputs LAST (Textarea components)

### ✅ Input Structure (100% CONSISTENT)
- [ ] FormField → FormItem → FormLabel → FormControl → FormMessage
- [ ] Required asterisks (*) on mandatory fields
- [ ] No FormDescription components
- [ ] Grid layout: grid grid-cols-1 md:grid-cols-2 gap-6

### ✅ Advanced Patterns
- [ ] Conditional rendering with form.watch()
- [ ] Static option generators (no translation functions)
- [ ] Proper email input type
- [ ] Empty number field defaults (undefined, not 0)

---

**Next Steps**: Use \`validation-patterns\` for schema setup or \`button-patterns\` for form actions.
`;