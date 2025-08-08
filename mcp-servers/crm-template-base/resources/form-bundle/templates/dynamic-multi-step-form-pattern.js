export default `# Form Bundle - Dynamic Multi-Step Form Pattern

## Overview
**MANDATORY PATTERN** for dynamic multi-step forms where steps are generated based on user selections. This pattern is PROVEN to work and deviations will cause dynamic steps to fail. Based on the working VLWR implementation.

## Critical Pattern Requirements

### 1. Dynamic Step Configuration Architecture

**MANDATORY**: Steps MUST have both 'key' and 'name' properties:
- **key**: Used for switch statement routing in renderStepContent()
- **name**: Used for display in UI components

\`\`\`typescript
// ✅ CORRECT: Working pattern from VLWR
const steps = [
  { 
    id: 1, 
    key: 'basic_info',  // REQUIRED for switch routing
    name: 'Basic Information',  // REQUIRED for display
    description: 'Laboratory and customer details' 
  }
];

// ❌ WRONG: Will cause routing failures
const steps = [
  { id: 1, name: 'Basic Information' }  // Missing 'key' property
];
\`\`\`

### 2. Dynamic Step Generation Pattern (step-config.ts)

**MANDATORY**: Use form.watch() to dynamically generate steps based on form values.

\`\`\`typescript
// step-config.ts - PROVEN WORKING PATTERN
import { UseFormReturn } from 'react-hook-form';

export function getSteps(form: UseFormReturn<any>, t: any) {
  // CRITICAL: Get ALL form values for reactivity
  const formValues = form.watch();
  
  // Base steps that always appear
  const baseSteps = [
    { 
      id: 1, 
      key: 'basic_info',
      name: t('basic_info.title'),
      description: t('basic_info.description')
    },
    { 
      id: 2, 
      key: 'request_type',
      name: t('request_type.title'),
      description: t('request_type.description')
    },
    { 
      id: 3, 
      key: 'vlwr_test_selection',
      name: t('test_selection.title'),
      description: t('test_selection.description')
    }
  ];

  let stepId = 4;
  const dynamicSteps = [];

  // CRITICAL PATTERN: Add dynamic steps based on test selections
  // Field naming convention: vlwrTest_{test_id}
  if (formValues.vlwrTest_salt_fog) {
    dynamicSteps.push({
      id: stepId++,
      key: 'vlwr_salt_fog_config',  // MUST match switch case
      name: t('salt_fog.config_title'),
      description: t('salt_fog.config_description')
    });
  }

  if (formValues.vlwrTest_quv) {
    dynamicSteps.push({
      id: stepId++,
      key: 'vlwr_quv_config',  // MUST match switch case
      name: t('quv.config_title'),
      description: t('quv.config_description')
    });
  }

  if (formValues.vlwrTest_powder_sample) {
    dynamicSteps.push({
      id: stepId++,
      key: 'vlwr_powder_sample_config',  // MUST match switch case
      name: t('powder_sample.config_title'),
      description: t('powder_sample.config_description')
    });
  }

  // Add any other conditional steps based on form state
  if (formValues.requiresRawMaterial) {
    dynamicSteps.push({
      id: stepId++,
      key: 'vlwr_raw_material',
      name: t('raw_material.title'),
      description: t('raw_material.description')
    });
  }

  // Final step always appears
  dynamicSteps.push({
    id: stepId++,
    key: 'vlwr_testing_info',
    name: t('testing_info.title'),
    description: t('testing_info.description')
  });

  return [...baseSteps, ...dynamicSteps];
}
\`\`\`

### 3. Test Selection Component Pattern

**MANDATORY**: Use Switch components in border layout for test selection.

\`\`\`typescript
// VLWRTestSelectionStep.tsx - PROVEN PATTERN
export function VLWRTestSelectionStep({ form }: { form: UseFormReturn<any> }) {
  const t = useTranslations('VLWR');
  
  // Dynamic test list with translations
  const availableTests = [
    { 
      id: 'salt_fog', 
      label: t('tests.salt_fog.label'),
      description: t('tests.salt_fog.description')
    },
    { 
      id: 'quv', 
      label: t('tests.quv.label'),
      description: t('tests.quv.description')
    },
    { 
      id: 'powder_sample', 
      label: t('tests.powder_sample.label'),
      description: t('tests.powder_sample.description')
    }
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {availableTests.map((test) => (
            <FormField
              key={test.id}
              control={form.control}
              name={\`vlwrTest_\${test.id}\`}  // CRITICAL: Consistent naming
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {test.label}
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      {test.description}
                    </p>
                  </div>
                  <FormControl>
                    <Switch 
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
\`\`\`

### 4. Dynamic Step Component Pattern

**MANDATORY**: Each dynamic step MUST be a separate component following this exact structure.

\`\`\`typescript
// VLWRSaltFogConfigStep.tsx - PROVEN PATTERN
export function VLWRSaltFogConfigStep({ form }: { form: UseFormReturn<any> }) {
  const t = useTranslations('VLWR');
  
  return (
    <Card>
      <CardContent className="pt-6">  {/* CRITICAL: pt-6, no CardHeader */}
        <div className="space-y-6">
          {/* MANDATORY Field Organization Order */}
          
          {/* 1. Number inputs FIRST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="saltFogHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('salt_fog.hours')} *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 2. Text inputs SECOND */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="saltFogStandard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('salt_fog.standard')} *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 3. Select inputs THIRD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="saltFogCycle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('salt_fog.cycle')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('salt_fog.cycle_placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="continuous">Continuous</SelectItem>
                      <SelectItem value="cyclic">Cyclic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 4. Boolean inputs FOURTH */}
          <FormField
            control={form.control}
            name="saltFogScribe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>{t('salt_fog.scribe')}</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* 5. Textarea inputs LAST */}
          <FormField
            control={form.control}
            name="saltFogNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('salt_fog.notes')}</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
\`\`\`

### 5. ModularNewRequestForm Rendering Pattern

**MANDATORY**: renderStepContent() MUST use step.key for routing.

\`\`\`typescript
// ModularNewRequestForm.tsx - CRITICAL PATTERN
import { VLWRTestSelectionStep } from './steps/VLWRTestSelectionStep';
import { VLWRSaltFogConfigStep } from './steps/VLWRSaltFogConfigStep';
import { VLWRQuvConfigStep } from './steps/VLWRQuvConfigStep';
import { VLWRPowderSampleConfigStep } from './steps/VLWRPowderSampleConfigStep';
import { VLWRRawMaterialStep } from './steps/VLWRRawMaterialStep';
import { VLWRTestingInfoStep } from './steps/VLWRTestingInfoStep';

export function ModularNewRequestForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues()
  });

  // CRITICAL: Use centralized step configuration
  const steps = getSteps(form, t);
  const currentStep = steps[currentStepIndex];

  const renderStepContent = () => {
    // CRITICAL: Use step.key NOT step.name for routing
    const stepKey = currentStep?.key;
    
    switch (stepKey) {
      // Base steps
      case 'basic_info':
        return <BasicInfoStep form={form} />;
      case 'request_type':
        return <RequestTypeStep form={form} />;
      
      // Test selection step
      case 'vlwr_test_selection':
        return <VLWRTestSelectionStep form={form} />;
      
      // Dynamic test configuration steps
      case 'vlwr_salt_fog_config':
        return <VLWRSaltFogConfigStep form={form} />;
      case 'vlwr_quv_config':
        return <VLWRQuvConfigStep form={form} />;
      case 'vlwr_powder_sample_config':
        return <VLWRPowderSampleConfigStep form={form} />;
      
      // Other dynamic steps
      case 'vlwr_raw_material':
        return <VLWRRawMaterialStep form={form} />;
      case 'vlwr_testing_info':
        return <VLWRTestingInfoStep form={form} />;
      
      default:
        console.error(\`Unknown step key: \${stepKey}\`);
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <StepIndicator steps={steps} currentStep={currentStepIndex} />
        {renderStepContent()}
        {/* Navigation buttons */}
      </form>
    </Form>
  );
}
\`\`\`

### 6. useFormSteps Hook Pattern

**MANDATORY**: Watch ALL form values for dynamic reactivity.

\`\`\`typescript
// useFormSteps.ts - CRITICAL HOOK PATTERN
export function useFormSteps({ form }: { form: UseFormReturn<any> }) {
  const t = useTranslations();
  
  // CRITICAL: Watch ALL form values, not specific fields
  const formValues = form.watch();
  
  // CRITICAL: Recalculate steps when ANY form value changes
  const steps = useMemo(() => {
    return getSteps(form, t);
  }, [formValues, t]);  // formValues as dependency ensures reactivity
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const currentStep = steps[currentStepIndex];
  const totalSteps = steps.length;
  
  const nextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  return {
    steps,
    currentStep,
    currentStepIndex,
    totalSteps,
    nextStep,
    prevStep,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === totalSteps - 1
  };
}
\`\`\`

## Schema Pattern for Dynamic Fields

\`\`\`typescript
// VLWR Schema Pattern
const vlwrSchema = z.object({
  // Test selection fields (boolean)
  vlwrTest_salt_fog: z.boolean().optional(),
  vlwrTest_quv: z.boolean().optional(),
  vlwrTest_powder_sample: z.boolean().optional(),
  
  // Salt Fog configuration (conditional)
  saltFogHours: z.number().optional(),
  saltFogStandard: z.string().optional(),
  saltFogCycle: z.string().optional(),
  saltFogScribe: z.boolean().optional(),
  saltFogNotes: z.string().optional(),
  
  // QUV configuration (conditional)
  quvHours: z.number().optional(),
  quvCycle: z.string().optional(),
  quvIrradiance: z.number().optional(),
  
  // Make fields required based on selections
}).refine((data) => {
  // If salt fog is selected, require its config fields
  if (data.vlwrTest_salt_fog) {
    return data.saltFogHours && data.saltFogStandard;
  }
  return true;
}, {
  message: "Salt fog configuration is required when test is selected",
  path: ["saltFogHours"]
});
\`\`\`

## Common Pitfalls and Solutions

### ❌ WRONG: Using step.name for routing
\`\`\`typescript
// This will FAIL - step names can have spaces/special chars
switch (currentStep?.name) {
  case 'Salt Fog Config':  // Will not match
    return <SaltFogStep />;
}
\`\`\`

### ✅ CORRECT: Using step.key for routing
\`\`\`typescript
// This WORKS - step keys are consistent identifiers
switch (currentStep?.key) {
  case 'vlwr_salt_fog_config':  // Will match correctly
    return <VLWRSaltFogConfigStep form={form} />;
}
\`\`\`

### ❌ WRONG: Watching specific fields
\`\`\`typescript
// This will MISS updates - not reactive to all changes
const saltFogSelected = form.watch('vlwrTest_salt_fog');
const steps = useMemo(() => getSteps(form, t), [saltFogSelected]);
\`\`\`

### ✅ CORRECT: Watching all form values
\`\`\`typescript
// This WORKS - reactive to ANY form change
const formValues = form.watch();
const steps = useMemo(() => getSteps(form, t), [formValues]);
\`\`\`

### ❌ WRONG: Mixed field organization
\`\`\`typescript
// This VIOLATES pattern - fields out of order
<div>
  <Textarea />  // Wrong: textarea before number
  <Input type="number" />
  <Select />
</div>
\`\`\`

### ✅ CORRECT: Strict field organization
\`\`\`typescript
// This FOLLOWS pattern - correct order
<div>
  <Input type="number" />  // 1. Numbers first
  <Input />                 // 2. Text second
  <Select />                // 3. Select third
  <Switch />                // 4. Boolean fourth
  <Textarea />              // 5. Textarea last
</div>
\`\`\`

## Implementation Checklist

When implementing dynamic multi-step forms, ensure:

- [ ] Steps have both 'key' and 'name' properties
- [ ] getSteps() function uses form.watch() for all values
- [ ] Test selection uses Switch components in border layout
- [ ] Field naming follows pattern: \`{prefix}Test_{test_id}\`
- [ ] Each dynamic step is a separate component
- [ ] Components use Card with CardContent className="pt-6"
- [ ] Field organization follows: Number → Text → Select → Boolean → Textarea
- [ ] renderStepContent() uses step.key for routing
- [ ] All dynamic step components are imported
- [ ] useFormSteps watches ALL form values
- [ ] Schema includes all dynamic fields as optional
- [ ] Validation makes fields required conditionally

## Success Criteria

Your dynamic form implementation is correct when:
1. Steps appear/disappear based on user selections
2. Navigation updates correctly as steps are added/removed
3. Step indicator shows accurate count and progress
4. Form submission includes all dynamic field values
5. No console errors about unknown step keys

**REMEMBER**: This pattern is PROVEN to work in production. Any deviation from these patterns will cause dynamic steps to fail. Follow this documentation EXACTLY for successful implementation.
`;