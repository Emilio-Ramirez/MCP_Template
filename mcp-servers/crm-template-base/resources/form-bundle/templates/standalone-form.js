export default `# Form Bundle - Standalone Form Template

## Overview
Complete single-step form template providing direct validation and submission. Use this template for simple forms with immediate processing.

## Complete Standalone Form Implementation

\`\`\`typescript
'use client'

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

// Schema pattern with translation-aware validation
const createFormSchema = (t: any) => z.object({
  // Follow field organization: Number → Text → Select → Boolean → Textarea
  quantity: z.coerce.number().min(1, t('validation.quantity_required')),
  name: z.string().min(1, t('validation.name_required')),
  category: z.string().min(1, t('validation.category_required')),
  isActive: z.boolean().default(false),
  description: z.string().optional(),
})

type FormData = z.infer<ReturnType<typeof createFormSchema>>

export default function StandaloneFormPage() {
  const t = useTranslations('Forms')
  const router = useRouter()
  
  const form = useForm<FormData>({
    resolver: zodResolver(createFormSchema(t)),
    mode: 'onChange', // Real-time validation
    defaultValues: {
      quantity: undefined, // Empty number field for better UX
      name: '',
      category: '',
      isActive: false,
      description: '',
    },
  })

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Number inputs FIRST */}
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

                  {/* Text inputs SECOND */}
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

                  {/* Select inputs THIRD */}
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

                  {/* Boolean inputs FOURTH */}
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
                </div>

                {/* Textarea inputs LAST */}
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

### Field Organization (MANDATORY)
1. **Number inputs** FIRST (quantity)
2. **Text inputs** SECOND (name)
3. **Select inputs** THIRD (category)
4. **Boolean inputs** FOURTH (isActive)
5. **Textarea inputs** LAST (description)

### Validation Features
- **Real-time validation** with \`mode: 'onChange'\`
- **Translation-aware** error messages
- **Type safety** with Zod schema
- **Empty number fields** for better UX

### Layout Features
- **Responsive grid** (2 columns on desktop, 1 on mobile)
- **Full-width textarea** outside the grid
- **Consistent spacing** with \`space-y-6\`
- **Standard card structure**

### User Experience
- **Loading states** on submit button
- **Success/error feedback** with toast notifications
- **Proper navigation** with cancel button
- **Required field indicators** with asterisks

## Translation Keys Required

\`\`\`json
{
  "Forms": {
    "page_title": "Create New Item",
    "page_description": "Fill out the form below to create a new item",
    "form_title": "Item Details",
    "quantity_label": "Quantity",
    "name_label": "Name",
    "category_label": "Category",
    "category_placeholder": "Select a category",
    "active_label": "Active",
    "description_label": "Description",
    "save": "Save",
    "saving": "Saving...",
    "cancel": "Cancel",
    "success_message": "Item created successfully",
    "error_message": "Failed to create item"
  },
  "validation": {
    "quantity_required": "Quantity is required",
    "name_required": "Name is required",
    "category_required": "Please select a category"
  }
}
\`\`\`

## Customization Guide

### Adding Fields
1. **Follow field order**: Number → Text → Select → Boolean → Textarea
2. **Update schema**: Add validation to \`createFormSchema\`
3. **Update defaultValues**: Add default value
4. **Add FormField**: Follow the consistent structure

### Example: Adding Email Field
\`\`\`typescript
// In schema (Text inputs SECOND)
email: z.string().email(t('validation.email_invalid')),

// In defaultValues
email: '',

// In form (after name field)
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

---

**Usage**: Copy this template and customize the schema, fields, and submit logic for your specific form needs.
`;