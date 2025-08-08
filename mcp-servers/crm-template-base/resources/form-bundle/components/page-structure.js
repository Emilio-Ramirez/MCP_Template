export default `# Form Bundle - Page Structure Patterns

## Overview
Complete page structure patterns for forms ensuring 100% consistency across all implementations. Includes PageContainer setup, heading patterns, and card wrapper structures.

## Page Container Structure

### Standard Page Layout (MANDATORY)
\`\`\`typescript
import { PageContainer } from '@/components/page-container'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

// Standard page structure for ALL forms (Commercial Requests Pattern)
<PageContainer scrollable={true}>
  <div className="flex flex-1 flex-col space-y-4">
    <div className="flex items-start justify-between">
      <Heading
        title={t('page_title')}
        description={t('page_description')}
      />
    </div>
    <Separator />
    {/* Form implementation here */}
  </div>
</PageContainer>
\`\`\`

## Card Wrapper Patterns (UNIFIED STANDARD)

### Single Form Card Structure
\`\`\`typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Main form structure - 100% consistent
<Card className="mx-auto w-full">
  <CardHeader>
    <CardTitle className="text-left text-2xl font-bold">
      {t('form_title')}
    </CardTitle>
  </CardHeader>
  <CardContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Form fields here */}
      </form>
    </Form>
  </CardContent>
</Card>
\`\`\`

### Multi-Step Card Structure
\`\`\`typescript
// Main container (no header per step)
<Card>
  <CardContent className="pt-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Step fields here */}
    </div>
  </CardContent>
</Card>
\`\`\`

## Required Imports
\`\`\`typescript
import { PageContainer } from '@/components/page-container'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
\`\`\`

## CSS Classes Reference
- **Page Container**: \`scrollable={true}\`
- **Layout Structure**: \`flex flex-1 flex-col space-y-4\`
- **Card Wrapper**: \`mx-auto w-full\`
- **Card Title**: \`text-left text-2xl font-bold\`
- **Form Spacing**: \`space-y-6\`

## Implementation Checklist

### ✅ Page Structure (Commercial Requests Standard)
- [ ] PageContainer with scrollable={true}
- [ ] Standard layout: div.flex.flex-1.flex-col.space-y-4
- [ ] Header wrapper: div.flex.items-start.justify-between
- [ ] Heading component with title and description
- [ ] Separator between heading and form
- [ ] Card wrapper with proper className="mx-auto w-full"

### ✅ Card Structure
- [ ] CardHeader with CardTitle.text-left.text-2xl.font-bold
- [ ] CardContent containing Form component
- [ ] Multi-step: Individual steps use Card → CardContent (no header per step)

---

**Usage**: Request specific components (\`input-patterns\`, \`button-patterns\`, etc.) after implementing the page structure.
`;