export default `# Form Bundle - Layout Patterns

## Overview
Unified layout and spacing patterns ensuring responsive design and consistent spacing across all form implementations.

## Grid Layout Patterns

### Standard Responsive Grid
\`\`\`typescript
// Responsive grid for form fields (2 columns on desktop, 1 on mobile)
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Form fields here following the order: Number → Text → Select → Boolean */}
</div>
\`\`\`

### Single Column Layout
\`\`\`typescript
// Full-width single column (for textarea and long forms)
<div className="space-y-6">
  {/* Form fields stacked vertically */}
</div>
\`\`\`

### Three Column Grid (Advanced)
\`\`\`typescript
// For forms with many fields
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Form fields here */}
</div>
\`\`\`

## Form Spacing Patterns

### Standard Form Spacing
\`\`\`typescript
// Form sections spacing - MANDATORY
<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
  {/* Form content with consistent spacing */}
</form>
\`\`\`

### Field Group Spacing
\`\`\`typescript
// Between field groups
<div className="space-y-4">
  {/* Related fields grouped together */}
</div>

// For larger gaps between sections
<div className="space-y-8">
  {/* Major form sections */}
</div>
\`\`\`

## Multi-Step Navigation Layout

### Step Indicator Pattern
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

### Step Content Layout
\`\`\`typescript
// Each step should use consistent card structure
{currentStep === 0 && (
  <Card>
    <CardContent className="pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step fields here */}
      </div>
    </CardContent>
  </Card>
)}
\`\`\`

## Responsive Design Patterns

### Breakpoint System
\`\`\`css
/* Mobile First Approach */
.responsive-grid {
  grid-cols-1;      /* Mobile: 1 column */
  md:grid-cols-2;   /* Tablet: 2 columns */
  lg:grid-cols-3;   /* Desktop: 3 columns */
}

.responsive-gap {
  gap-4;            /* Mobile: smaller gap */
  md:gap-6;         /* Desktop: larger gap */
}
\`\`\`

### Mobile Optimizations
\`\`\`typescript
// Stack all fields on mobile for better usability
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
  {/* Fields automatically stack on mobile */}
</div>

// Hide non-essential elements on mobile
<div className="hidden md:block">
  {/* Desktop-only content */}
</div>

// Show different content on mobile
<div className="md:hidden">
  {/* Mobile-only content */}
</div>
\`\`\`

## Special Layout Cases

### Textarea Full Width
\`\`\`typescript
// Textarea fields should be outside the grid for full width
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Grid fields here */}
</div>

{/* Textarea outside grid for full width */}
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

### Boolean Fields Special Layout
\`\`\`typescript
// Boolean fields with special border layout
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

## Container Layouts

### Page Container Structure
\`\`\`typescript
<PageContainer scrollable={true}>
  <div className="flex flex-1 flex-col space-y-4">
    {/* Page content with consistent spacing */}
  </div>
</PageContainer>
\`\`\`

### Card Container Layout
\`\`\`typescript
<Card className="mx-auto w-full">
  <CardHeader>
    <CardTitle className="text-left text-2xl font-bold">
      {t('form_title')}
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* Form content */}
  </CardContent>
</Card>
\`\`\`

## Spacing Standards Reference

### Space Scale
\`\`\`css
/* Tailwind spacing scale used in forms */
.space-y-2    /* 8px - tight spacing */
.space-y-4    /* 16px - field groups */
.space-y-6    /* 24px - form sections (STANDARD) */
.space-y-8    /* 32px - major sections */

.gap-4        /* 16px - mobile grid gap */
.gap-6        /* 24px - desktop grid gap (STANDARD) */
.gap-8        /* 32px - large gaps */
\`\`\`

### Margin and Padding
\`\`\`css
/* Step indicator spacing */
.mb-8         /* 32px bottom margin for step indicator */

/* Card content padding */
.pt-6         /* 24px top padding for card content */

/* Boolean field padding */
.p-4          /* 16px all around for boolean fields */
\`\`\`

## Layout Utilities

### Flexbox Patterns
\`\`\`typescript
// Button container
<div className="flex gap-4">
  {/* Buttons */}
</div>

// Center alignment
<div className="flex items-center justify-center">
  {/* Centered content */}
</div>

// Space between
<div className="flex items-center justify-between">
  {/* Content with space between */}
</div>
\`\`\`

### Grid Utilities
\`\`\`typescript
// Auto-fit columns
<div className="grid grid-cols-1 auto-rows-min gap-6">
  {/* Auto-sizing grid */}
</div>

// Equal height columns
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
  {/* Aligned to top */}
</div>
\`\`\`

## Implementation Checklist

### ✅ Layout & Responsive Design
- [ ] space-y-6 for form sections
- [ ] grid grid-cols-1 md:grid-cols-2 gap-6 for field grids
- [ ] Responsive grid layouts
- [ ] Mobile-first responsive design
- [ ] Textarea fields outside grid (full width)

### ✅ Multi-Step Layout (if applicable)
- [ ] StepIndicator with mb-8 spacing
- [ ] Card → CardContent structure per step
- [ ] Consistent pt-6 padding for card content

### ✅ Spacing Consistency
- [ ] Standard space-y-6 for form sections
- [ ] gap-6 for grid layouts
- [ ] Proper container spacing
- [ ] Boolean field special layout with p-4

---

**Next Steps**: Use \`feedback-patterns\` for toast notifications or templates for complete implementations.
`;