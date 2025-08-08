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

### StepIndicator Component (COMPREHENSIVE PATTERN)
\`\`\`typescript
'use client';

import React from 'react';
import { Check, Circle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Step {
  id: number;
  name: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export function StepIndicator({ 
  steps, 
  currentStep, 
  onStepClick,
  className 
}: StepIndicatorProps) {
  return (
    <div className={cn("mb-8", className)}>
      {/* Progress Header - SCALABLE DESIGN */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            {/* Step Title + Description on LEFT */}
            <h2 className="text-xl font-semibold">
              {steps[currentStep]?.name || 'Form Step'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {steps[currentStep]?.description}
            </p>
          </div>
          {/* Step Counter on RIGHT */}
          <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
        
        {/* Progress Bar - Full Width */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: \`\${((currentStep + 1) / steps.length) * 100}%\` }}
          />
        </div>
      </div>

      {/* Desktop Navigation - ICON CIRCLES WITH ARROWS (NOT TABS) */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between space-x-2">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onStepClick?.(index)}
                  disabled={!onStepClick}
                  className={cn(
                    "flex items-center space-x-2 p-2 rounded-lg transition-colors min-w-0",
                    index < currentStep && "text-primary",
                    index === currentStep && "bg-primary/10 text-primary",
                    index > currentStep && "text-muted-foreground"
                  )}
                >
                  {/* Step Icon Circle */}
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors flex-shrink-0",
                      index < currentStep && "bg-primary border-primary text-primary-foreground",
                      index === currentStep && "border-primary text-primary",
                      index > currentStep && "border-muted text-muted-foreground"
                    )}
                  >
                    {index < currentStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </div>

                  {/* Step Info - Truncated for Scalability */}
                  <div className="text-left min-w-0">
                    <div className={cn(
                      "text-sm font-medium truncate",
                      index <= currentStep ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {step.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {step.description}
                    </div>
                  </div>
                </Button>
              </div>

              {/* Arrow Separator */}
              {index < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Mobile Navigation - CIRCULAR NUMBERED DOTS */}
      <div className="md:hidden">
        <div className="flex items-center justify-center space-x-1">
          {steps.map((step, index) => (
            <Button
              key={step.id}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onStepClick?.(index)}
              disabled={!onStepClick}
              className={cn(
                "w-8 h-8 p-0 rounded-full",
                index < currentStep && "bg-primary text-primary-foreground",
                index === currentStep && "bg-primary/20 text-primary border border-primary",
                index > currentStep && "bg-muted text-muted-foreground"
              )}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-xs font-medium">{index + 1}</span>
              )}
            </Button>
          ))}
        </div>
        
        {/* Current Step Info (Mobile) */}
        <div className="text-center mt-2">
          <div className="text-xs text-muted-foreground">
            {steps[currentStep]?.description}
          </div>
        </div>
      </div>
    </div>
  );
}
\`\`\`

### StepIndicator Usage Example
\`\`\`typescript
const steps = [
  { id: 1, name: "Basic Information", description: "Enter basic details" },
  { id: 2, name: "Configuration", description: "Set preferences" },
  { id: 3, name: "Review", description: "Confirm all details" }
];

<StepIndicator 
  steps={steps}
  currentStep={currentStep}
  onStepClick={(stepIndex) => setCurrentStep(stepIndex)}
/>
\`\`\`

### StepIndicator Features
- **Progress Header**: Shows current step title, description, and progress counter
- **Progress Bar**: Visual completion percentage indicator
- **Desktop Navigation**: Icon circles with arrows, truncated text for scalability
- **Mobile Navigation**: Numbered dots with description below
- **Interactive**: Optional onClick for step navigation
- **Responsive**: Different layouts for desktop and mobile
- **Accessible**: Proper button states and keyboard navigation
- **Scalable**: Text truncation prevents layout breaks with long step names

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