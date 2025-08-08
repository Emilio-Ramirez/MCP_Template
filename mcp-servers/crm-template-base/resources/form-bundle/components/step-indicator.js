export default `# Form Bundle - StepIndicator Component

## Overview
Simplified step indicator pattern for multi-step forms with inline step header and progress bar visualization.

## Complete Implementation

\`\`\`typescript
'use client';

import React from 'react';

interface Step {
  id: number;
  name: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  totalSteps: number;
}

{/* Simplified Step Header */}
<div className='mb-8'>
  <div className='mt-6'>
    <div className='text-center space-y-2'>
      <div className='flex items-center justify-center space-x-3'>
        <h2 className='text-xl font-semibold'>{steps[currentStep]?.name}</h2>
        <span className='text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full'>
          {currentStep + 1}/{totalSteps}
        </span>
      </div>
      <div className='w-full max-w-md mx-auto bg-muted rounded-full h-2'>
        <div 
          className='bg-primary h-2 rounded-full transition-all duration-300'
          style={{ width: \`\${((currentStep + 1) / totalSteps) * 100}%\` }}
        />
      </div>
    </div>
  </div>
</div>
\`\`\`

## Component Features

### Visual Elements
- **Step Name**: Centered step title displayed prominently
- **Step Counter**: Pill-shaped counter showing "1/8" style format
- **Progress Bar**: Animated horizontal bar showing completion percentage
- **Clean Design**: No complex circles, arrows, or step descriptions

### Key Characteristics
- **Simplified Layout**: Single centered header with progress indicator
- **No Navigation**: Pure display component without interactive elements
- **Minimal Height**: Compact vertical footprint for better form layout
- **Smooth Animations**: CSS transitions on progress bar updates

## Props Documentation

### Step Interface
\`\`\`typescript
interface Step {
  id: number;    // Unique identifier for the step
  name: string;  // Step title (displayed in header)
}
\`\`\`

### Component Props
\`\`\`typescript
interface StepIndicatorProps {
  steps: Step[];        // Array of step configurations
  currentStep: number;  // Zero-based index of current step
  totalSteps: number;   // Total number of steps in the form
}
\`\`\`

## Usage Examples

### Basic Usage
\`\`\`typescript
const steps = [
  { id: 1, name: "Basic Info" },
  { id: 2, name: "Details" },
  { id: 3, name: "Review" }
];

{/* Simplified Step Header */}
<div className='mb-8'>
  <div className='mt-6'>
    <div className='text-center space-y-2'>
      <div className='flex items-center justify-center space-x-3'>
        <h2 className='text-xl font-semibold'>{steps[currentStep]?.name}</h2>
        <span className='text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full'>
          {currentStep + 1}/{totalSteps}
        </span>
      </div>
      <div className='w-full max-w-md mx-auto bg-muted rounded-full h-2'>
        <div 
          className='bg-primary h-2 rounded-full transition-all duration-300'
          style={{ width: \`\${((currentStep + 1) / totalSteps) * 100}%\` }}
        />
      </div>
    </div>
  </div>
</div>
\`\`\`

### Integration with Multi-Step Form
\`\`\`typescript
export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { id: 1, name: "Account Setup" },
    { id: 2, name: "Profile Info" },
    { id: 3, name: "Preferences" }
  ];

  const totalSteps = steps.length;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Simplified Step Header */}
        <div className='mb-8'>
          <div className='mt-6'>
            <div className='text-center space-y-2'>
              <div className='flex items-center justify-center space-x-3'>
                <h2 className='text-xl font-semibold'>{steps[currentStep]?.name}</h2>
                <span className='text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full'>
                  {currentStep + 1}/{totalSteps}
                </span>
              </div>
              <div className='w-full max-w-md mx-auto bg-muted rounded-full h-2'>
                <div 
                  className='bg-primary h-2 rounded-full transition-all duration-300'
                  style={{ width: \`\${((currentStep + 1) / totalSteps) * 100}%\` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Step content here */}
      </form>
    </Form>
  );
}
\`\`\`

## Design Characteristics

### Unified Display
- **Single Layout**: Same appearance on all screen sizes
- **Centered Content**: Step name and counter centered together
- **Progress Bar**: Always max-width constrained and centered
- **No Complex Navigation**: Simple display-only component

### Visual Simplicity
- **Minimal Elements**: Just step name, counter, and progress bar
- **No Icons**: No check marks, circles, or arrows
- **Clean Typography**: Single heading with pill-shaped counter
- **Subtle Progress**: Understated progress bar below header

## Styling Details

### Component Structure
\`\`\`css
/* Wrapper */
.mb-8 {
  margin-bottom: 2rem;
}

/* Inner Container */
.mt-6 {
  margin-top: 1.5rem;
}

/* Content Centering */
.text-center.space-y-2 {
  text-align: center;
  gap: 0.5rem;
}

/* Step Counter Pill */
.bg-muted.px-2.py-1.rounded-full {
  background: var(--muted);
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
}

/* Progress Bar Container */
.w-full.max-w-md.mx-auto {
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
}

/* Progress Bar Fill */
.bg-primary.transition-all.duration-300 {
  background: var(--primary);
  transition: width 300ms;
}
\`\`\`

## Best Practices

### Step Configuration
- Keep step names concise (2-3 words ideal)
- Use consistent naming convention across all steps
- Ensure step names are self-explanatory
- Avoid abbreviations in step names

### Implementation Guidelines
- Use inline JSX pattern directly in forms
- No separate StepIndicator component needed
- Calculate totalSteps from steps array length
- Keep currentStep zero-indexed for consistency

### Performance Considerations
- Inline styles for progress width calculation
- CSS transitions for smooth progress updates
- Minimal DOM elements for fast rendering
- No unnecessary re-renders from complex state

## Common Patterns

### Dynamic Step Count
\`\`\`typescript
const steps = useMemo(() => {
  const baseSteps = [
    { id: 1, name: "Start" },
    { id: 2, name: "Middle" }
  ];
  
  if (needsExtraStep) {
    baseSteps.push({ id: 3, name: "Extra" });
  }
  
  baseSteps.push({ 
    id: baseSteps.length + 1, 
    name: "Finish" 
  });
  
  return baseSteps;
}, [needsExtraStep]);

const totalSteps = steps.length;
\`\`\`

### With Form Navigation Buttons
\`\`\`typescript
{/* Simplified Step Header */}
<div className='mb-8'>
  <div className='mt-6'>
    <div className='text-center space-y-2'>
      <div className='flex items-center justify-center space-x-3'>
        <h2 className='text-xl font-semibold'>{steps[currentStep]?.name}</h2>
        <span className='text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full'>
          {currentStep + 1}/{totalSteps}
        </span>
      </div>
      <div className='w-full max-w-md mx-auto bg-muted rounded-full h-2'>
        <div 
          className='bg-primary h-2 rounded-full transition-all duration-300'
          style={{ width: \`\${((currentStep + 1) / totalSteps) * 100}%\` }}
        />
      </div>
    </div>
  </div>
</div>

{/* Form content */}
<div className="space-y-6">
  {renderStepContent()}
</div>

{/* Navigation buttons */}
<div className="flex justify-between mt-8">
  <Button
    type="button"
    variant="outline"
    onClick={prevStep}
    disabled={currentStep === 0}
  >
    Previous
  </Button>
  <Button
    type={currentStep === totalSteps - 1 ? "submit" : "button"}
    onClick={currentStep === totalSteps - 1 ? undefined : nextStep}
  >
    {currentStep === totalSteps - 1 ? "Submit" : "Next"}
  </Button>
</div>
\`\`\`

---

**Usage**: Use this simplified inline pattern directly in your multi-step forms for a clean, minimal step indication without the need for a separate component.
`;