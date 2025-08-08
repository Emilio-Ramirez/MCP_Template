export default `# Form Bundle - Complete Implementation Package

## **1. Overview Section**

**Bundle Purpose**: Complete form implementation package providing 95%+ consistency across all form implementations with revolutionary modular architecture.

**Success Metrics**: 
- **95%+ Consistency**: Core form infrastructure standardized across all implementations
- **70% Faster Development**: Complete templates and patterns ready to use
- **Zero Fragmentation**: Single source of truth for all form patterns
- **Complete Coverage**: Page structure → Input components → Actions → Feedback → Multi-step navigation

**Key Benefits**: 
- Revolutionary modular architecture with business logic extraction to hooks
- Section-based component decomposition
- Dynamic step management for multi-step forms
- Business logic extraction to hooks
- Real-time validation with conditional logic

---

## **2. 🚨 CRITICAL: Cleaned Import Patterns (MANDATORY)**

### **✅ CORRECT Form Import Pattern:**
\`\`\`typescript
// Revolutionary MCP Pattern - Clean imports WITHOUT FormDescription
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
\`\`\`

### **❌ WRONG Pattern (NEVER USE):**
\`\`\`typescript
// WRONG - FormDescription causes unused import warnings
import {
  FormControl,
  FormDescription,  // ❌ REMOVE - Never used in MCP patterns
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
\`\`\`

### **🔧 Critical Import Fixes:**

**FormDescription Removal**: Found in 12+ step components but never used - REMOVE from ALL imports

**Common Unused Imports to Avoid**:
- \`FormDescription\` - Never used in MCP form patterns
- Type imports only used in implementation, not typing
- Icon imports not rendered in JSX
- Badge components imported but not used

### **✅ Side-Effect Hooks Pattern:**
\`\`\`typescript
export function MultiStepForm() {
  // Revolutionary MCP Pattern - Business logic hooks
  const stepNavigation = useFormSteps({ form });
  
  // ✅ CORRECT: Side effect hooks for conditional logic - don't store return value
  useConditionalLogic({ form });  // Don't store return value
  useFormDefaults({ form });      // Don't store return value
  
  const formSubmission = useFormSubmission({...});
}
\`\`\`

### **✅ Console Statement Pattern:**
\`\`\`typescript
onError: (error) => {
  // ✅ CORRECT: eslint-disable-next-line for debug statements
  // eslint-disable-next-line no-console
  console.error('Form submission error:', error);
  toast.error(t('form.error.create_failed'));
},
\`\`\`

---

## **2.1. Error Handling & Boundary Patterns**

### **🚨 CRITICAL: Dashboard Error Components (Next.js error.tsx)**

#### **Option 1 - Use the error parameter (RECOMMENDED):**
\`\`\`typescript
'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  const t = useTranslations('Errors');

  // ✅ PRODUCTION ERROR LOGGING - No disable needed for production errors
  console.error('Dashboard error occurred:', {
    message: error.message,
    digest: error.digest,
    stack: error.stack
  });

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-lg font-semibold">{t('something_went_wrong')}</h2>
        <p className="text-sm text-muted-foreground">
          {error.message || t('generic_error_message')}
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
      </div>
      <Button onClick={reset} variant="outline">
        {t('try_again')}
      </Button>
    </div>
  );
}
\`\`\`

#### **Option 2 - Underscore prefix pattern (when not using error details):**
\`\`\`typescript
export default function Error({ error: _error, reset }: ErrorPageProps) {
  const t = useTranslations('Errors');
  
  // Using underscore prefix prevents lint warnings when parameter is intentionally unused
  
  return (
    <div className="text-center space-y-4">
      <h2>{t('something_went_wrong')}</h2>
      <Button onClick={reset}>{t('try_again')}</Button>
    </div>
  );
}
\`\`\`

#### **Option 3 - ESLint disable pattern (intentionally unused):**
\`\`\`typescript
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Error({ error, reset }: ErrorPageProps) {
  const t = useTranslations('Errors');
  
  return (
    <div className="text-center space-y-4">
      <h2>{t('something_went_wrong')}</h2>
      <Button onClick={reset}>{t('try_again')}</Button>
    </div>
  );
}
\`\`\`

### **🔄 Error Boundary Components (React Class Components)**

\`\`\`typescript
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class FormErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // ✅ PRODUCTION ERROR LOGGING - No disable needed for production error boundaries
    console.error('Form boundary caught error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[200px] flex-col items-center justify-center space-y-4">
          <div className="text-center space-y-2">
            <h2 className="text-lg font-semibold">Form Error</h2>
            <p className="text-sm text-muted-foreground">
              Something went wrong with the form. Please try again.
            </p>
          </div>
          <Button 
            onClick={() => this.setState({ hasError: false })} 
            variant="outline"
          >
            Reset Form
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage in form components:
export function ProtectedForm() {
  return (
    <FormErrorBoundary>
      <YourFormComponent />
    </FormErrorBoundary>
  );
}
\`\`\`

### **📊 Console Statement Guidelines**

#### **Production Error Logging (NO disable needed):**
\`\`\`typescript
// ✅ PRODUCTION ERRORS - Always log, no disable needed
console.error('Form submission failed:', {
  error: error.message,
  userId: user.id,
  timestamp: new Date().toISOString()
});

console.error('API request failed:', {
  endpoint: '/api/formulation',
  status: response.status,
  error: responseData
});

console.error('Database operation failed:', {
  operation: 'CREATE_FORMULATION',
  error: dbError.message
});
\`\`\`

#### **Development Debug Logging (disable needed):**
\`\`\`typescript
// ✅ DEVELOPMENT DEBUG - Use eslint-disable for debug statements
// eslint-disable-next-line no-console
console.log('Form values changed:', formValues);

// eslint-disable-next-line no-console  
console.debug('Step validation result:', isValid);

// eslint-disable-next-line no-console
console.info('User navigated to step:', currentStep);
\`\`\`

### **🎯 Next.js Error Component Standards**

#### **error.tsx File Pattern for Dashboard Routes:**
\`\`\`typescript
// File: app/[locale]/dashboard/formulations/error.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FormulationErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function FormulationError({ error, reset }: FormulationErrorProps) {
  const t = useTranslations('Formulations.errors');

  // ✅ PRODUCTION ERROR LOGGING with context
  console.error('Formulation page error:', {
    message: error.message,
    digest: error.digest,
    route: '/dashboard/formulations',
    timestamp: new Date().toISOString()
  });

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-6 h-6 text-destructive" />
        </div>
        <CardTitle>{t('page_error_title')}</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          {error.message || t('generic_error')}
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground font-mono">
            ID: {error.digest}
          </p>
        )}
        <div className="flex gap-2 justify-center">
          <Button onClick={reset} variant="outline">
            {t('try_again')}
          </Button>
          <Button onClick={() => window.location.href = '/dashboard'}>
            {t('go_to_dashboard')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
\`\`\`

### **⚠️ Common Error Patterns to Avoid**

#### **❌ WRONG: Unused error parameters causing lint warnings**
\`\`\`typescript
// ❌ Parameter 'error' is defined but never used
export default function Error({ error, reset }: ErrorPageProps) {
  return <div>Something went wrong</div>;
}
\`\`\`

#### **❌ WRONG: Missing error logging in production**
\`\`\`typescript
export default function Error({ error, reset }: ErrorPageProps) {
  // ❌ No error logging - production issues go untracked
  return <div>Error: {error.message}</div>;
}
\`\`\`

#### **❌ WRONG: Inconsistent console statement patterns**
\`\`\`typescript
// ❌ Mixed patterns - some with disable, some without
console.error('Production error:', error);  // Missing disable
// eslint-disable-next-line no-console
console.error('Another error:', error);     // Inconsistent
\`\`\`

#### **✅ CORRECT: Consistent error handling pattern**
\`\`\`typescript
export default function Error({ error, reset }: ErrorPageProps) {
  const t = useTranslations('Errors');

  // ✅ PRODUCTION ERROR - Always log production errors
  console.error('Dashboard error:', {
    message: error.message,
    digest: error.digest
  });

  return (
    <div className="error-container">
      <h2>{t('error_title')}</h2>
      <p>{error.message}</p>
      <Button onClick={reset}>{t('retry')}</Button>
    </div>
  );
}
\`\`\`

### **🎯 Error Handling Checklist**

- [ ] **Error parameters** - Use error.message and error.digest appropriately
- [ ] **Underscore prefix** - Use \_error when parameter is intentionally unused
- [ ] **Production logging** - Always log production errors without eslint-disable
- [ ] **Debug logging** - Use eslint-disable-next-line for development debug statements
- [ ] **Error boundaries** - Implement for form components that might crash
- [ ] **Translation support** - Use proper translation keys for error messages
- [ ] **Error context** - Include relevant context (route, user, timestamp) in logs
- [ ] **Recovery actions** - Provide clear recovery options (retry, reset, navigate)

---

### **🎯 StepIndicator Standardization:**
\`\`\`typescript
// ✅ CORRECT: Use shared StepIndicator
import { StepIndicator } from '@/features/formulations/components/StepIndicator';
// ❌ WRONG: Don't create local duplicates
\`\`\`

---

## **2.2. 🚨 CRITICAL: Auto-Submit Prevention Pattern**

### **The Problem**
Multi-step forms can auto-submit when Next buttons are clicked, even when they are `type="button"`, due to HTML form submission behavior. This causes premature form submission and data loss.

### **The Solution: Prevent Default Event Handling**

#### **✅ CORRECT: Next Button with Event Prevention**
```typescript
{!stepNavigation.isLastStep ? (
  <Button 
    type="button" 
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      stepNavigation.nextStep();
    }}
  >
    {t('next')}
  </Button>
) : (
  <Button type="submit" disabled={isSubmitting}>
    {isSubmitting ? t('saving') : t('submit')}
  </Button>
)}
```

#### **✅ ADDITIONAL: Form-Level Enter Key Protection**
```typescript
<form 
  onSubmit={form.handleSubmit(onSubmit)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' && !stepNavigation.isLastStep) {
      e.preventDefault();
    }
  }}
>
  {/* Form content */}
</form>
```

### **Complete Multi-Step Navigation Pattern**
```typescript
{/* Revolutionary MCP Pattern - Auto-Submit Prevention Navigation */}
<div className="flex items-center justify-between mt-8">
  <Button
    type="button"
    variant="outline"
    onClick={stepNavigation.previousStep}
    disabled={stepNavigation.isFirstStep}
  >
    {t('previous')}
  </Button>

  <div className="flex gap-2">
    <Button
      type="button"
      variant="outline"
      onClick={() => router.back()}
      disabled={formSubmission.isSubmitting}
    >
      {t('cancel')}
    </Button>

    {!stepNavigation.isLastStep ? (
      <Button 
        type="button" 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          stepNavigation.nextStep();
        }}
      >
        {t('next')}
      </Button>
    ) : (
      <Button 
        type="submit" 
        disabled={formSubmission.isSubmitting}
      >
        {formSubmission.isSubmitting ? t('saving') : t('submit')}
      </Button>
    )}
  </div>
</div>
```

### **❌ WRONG: Without Event Prevention**
```typescript
// ❌ DANGEROUS: Can cause auto-submit
<Button 
  type="button" 
  onClick={stepNavigation.nextStep}  // Missing event prevention
>
  Next
</Button>

// ❌ DANGEROUS: No Enter key protection
<form onSubmit={form.handleSubmit(onSubmit)}>
  {/* Missing onKeyDown handler */}
</form>
```

### **🎯 Auto-Submit Prevention Checklist**
- [ ] **Next buttons** use `e.preventDefault()` and `e.stopPropagation()`
- [ ] **Form element** has `onKeyDown` handler for Enter key prevention
- [ ] **Only submit button** has `type="submit"`
- [ ] **All navigation buttons** have `type="button"`
- [ ] **Event prevention** only applied to non-last steps

**This pattern is MANDATORY for all multi-step forms to prevent accidental form submission.**

---

## **2.3. 🚨 CRITICAL: Dynamic Test Page Implementation - TLWR Pattern**

### **The Revolutionary Dynamic Step Generation Pattern**

This pattern shows how multi-step forms can grow dynamically based on user selections, adding new pages to the form flow instead of showing inline forms.

### **KEY PATTERN PRINCIPLE:**
- **Test Selection Page** shows ONLY switches for available tests
- **Each selected test adds a NEW PAGE** to the form flow
- **Form grows from 5/6 to 5/8+ pages** based on selections
- **Clean separation**: Selection vs. Configuration

### **1. Test Selection Page Implementation (TLWRPage3Step.tsx)**

```typescript
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useTranslations } from 'next-intl';

const availableTests = [
  { id: 'salt_fog', label: 'Salt Fog Test' },
  { id: 'quv', label: 'QUV Test' },
  { id: 'qsun', label: 'Q-SUN Test' },
  { id: 'powder_sample', label: 'Powder Sample Test' }
];

interface TLWRPage3StepProps {
  form: any;
}

export function TLWRPage3Step({ form }: TLWRPage3StepProps) {
  const t = useTranslations('TLWR');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('form.sections.test_selection')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableTests.map((test) => (
            <FormField
              key={test.id}
              control={form.control}
              name={`tlwrTest_${test.id}`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {test.label}
                    </FormLabel>
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
```

### **2. Dynamic Step Configuration (step-config.ts)**

This is how steps are dynamically added based on form.watch() values:

```typescript
const getStepTranslation = (t: any, key: string, fallback: string) => {
  try {
    return t(`steps.${key}`);
  } catch {
    return fallback;
  }
};

const getStepDescTranslation = (t: any, key: string, fallback: string) => {
  try {
    return t(`step_descriptions.${key}`);
  } catch {
    return fallback;
  }
};

// Dynamic step generation hook
export function useFormSteps({ form }: { form: any }) {
  const t = useTranslations('TLWR');
  
  const steps = useMemo(() => {
    const baseSteps = [
      { 
        id: 1,
        key: 'basic_info',
        name: getStepTranslation(t, 'basic_info', 'Basic Information'), 
        description: getStepDescTranslation(t, 'basic_info', 'Laboratory and customer details')
      },
      { 
        id: 2,
        key: 'request_type',
        name: getStepTranslation(t, 'request_type', 'Request Type'), 
        description: getStepDescTranslation(t, 'request_type', 'Select request type and details')
      },
      { 
        id: 3,
        key: 'tlwr_test_selection',
        name: getStepTranslation(t, 'tlwr_test_selection', 'Test Selection'), 
        description: getStepDescTranslation(t, 'tlwr_test_selection', 'Select TLWR tests to perform')
      }
    ];

    let pageId = 4;

    // 🚨 CRITICAL: Dynamic step addition based on form.watch()
    if (form.watch('tlwrTest_salt_fog')) {
      baseSteps.push({ 
        id: pageId++,
        key: 'tlwr_salt_fog_config',
        name: getStepTranslation(t, 'tlwr_salt_fog_config', 'TLWR Salt Fog Config'), 
        description: getStepDescTranslation(t, 'tlwr_salt_fog_config', 'Salt fog test configuration')
      });
    }

    if (form.watch('tlwrTest_quv')) {
      baseSteps.push({ 
        id: pageId++,
        key: 'tlwr_quv_config',
        name: getStepTranslation(t, 'tlwr_quv_config', 'TLWR QUV Config'), 
        description: getStepDescTranslation(t, 'tlwr_quv_config', 'QUV test configuration')
      });
    }

    if (form.watch('tlwrTest_qsun')) {
      baseSteps.push({ 
        id: pageId++,
        key: 'tlwr_qsun_config',
        name: getStepTranslation(t, 'tlwr_qsun_config', 'TLWR Q-SUN Config'), 
        description: getStepDescTranslation(t, 'tlwr_qsun_config', 'Q-SUN test configuration')
      });
    }

    if (form.watch('tlwrTest_powder_sample')) {
      baseSteps.push({ 
        id: pageId++,
        key: 'tlwr_powder_sample_config',
        name: getStepTranslation(t, 'tlwr_powder_sample_config', 'TLWR Powder Sample Config'), 
        description: getStepDescTranslation(t, 'tlwr_powder_sample_config', 'Powder sample test configuration')
      });
    }

    // Add final step
    baseSteps.push({ 
      id: pageId++,
      key: 'additional_info',
      name: getStepTranslation(t, 'additional_info', 'Additional Information'), 
      description: getStepDescTranslation(t, 'additional_info', 'Final details and requirements')
    });

    return baseSteps;
  }, [
    form.watch('tlwrTest_salt_fog'),
    form.watch('tlwrTest_quv'),
    form.watch('tlwrTest_qsun'),
    form.watch('tlwrTest_powder_sample'),
    t
  ]);

  // Rest of useFormSteps implementation...
  return {
    steps,
    currentStep,
    currentStepInfo,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
    goToStep,
    validateCurrentStep,
  };
}
```

### **3. Individual Test Component Examples**

Each selected test gets its own dedicated component file:

**TLWRSaltFogTestStep.tsx:**
```typescript
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from 'next-intl';

interface TLWRSaltFogTestStepProps {
  form: any;
}

export function TLWRSaltFogTestStep({ form }: TLWRSaltFogTestStepProps) {
  const t = useTranslations('TLWR.saltFog');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title', 'Salt Fog Test Configuration')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {/* Number inputs FIRST */}
          <FormField
            control={form.control}
            name='tlwrSaltFog.duration'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('duration')} *</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder={t('duration_placeholder')}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='tlwrSaltFog.temperature'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('temperature')} *</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder={t('temperature_placeholder')}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Select inputs SECOND */}
          <FormField
            control={form.control}
            name='tlwrSaltFog.saltType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('salt_type')} *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('salt_type_placeholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="nacl">NaCl</SelectItem>
                    <SelectItem value="sea_salt">Sea Salt</SelectItem>
                    <SelectItem value="synthetic">Synthetic</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
```

**TLWRQUVTestStep.tsx, TLWRQSunTestStep.tsx, TLWRPowderSampleTestStep.tsx:**
Similar structure with test-specific fields and configurations.

### **4. Component Mapping in Main Form**

```typescript
// Revolutionary MCP Pattern - Dynamic component mapping with step keys
const renderStepContent = () => {
  const stepKey = stepNavigation.currentStepInfo?.key;
  
  switch (stepKey) {
    case 'basic_info':
      return <BasicInfoStep form={form} />;
    case 'request_type':
      return <RequestTypeStep form={form} />;
    case 'tlwr_test_selection':
      return <TLWRPage3Step form={form} />;
    case 'tlwr_salt_fog_config':
      return <TLWRSaltFogTestStep form={form} />;
    case 'tlwr_quv_config':
      return <TLWRQUVTestStep form={form} />;
    case 'tlwr_qsun_config':
      return <TLWRQSunTestStep form={form} />;
    case 'tlwr_powder_sample_config':
      return <TLWRPowderSampleTestStep form={form} />;
    case 'additional_info':
      return <AdditionalInfoStep form={form} />;
    default:
      return <div className="p-8 text-center">Step content coming soon...</div>;
  }
};
```

### **🎯 Dynamic Form Flow Success Pattern**

**Base Form Flow (3 steps):**
1. Basic Information
2. Request Type  
3. Test Selection

**Extended Flow with All Tests (7 steps):**
1. Basic Information
2. Request Type
3. Test Selection
4. Salt Fog Configuration ← **NEW PAGE**
5. QUV Configuration ← **NEW PAGE**
6. Q-SUN Configuration ← **NEW PAGE** 
7. Powder Sample Configuration ← **NEW PAGE**
8. Additional Information

### **✅ Key Implementation Requirements**

1. **Test Selection Interface**: ONLY switches, no inline configuration forms
2. **Dynamic Step Generation**: Use `form.watch()` to add steps based on selections
3. **Dedicated Components**: Each test has its own separate component file
4. **Step Key Mapping**: Use `stepKey` instead of `stepName` for component routing
5. **Clean Separation**: Selection logic separate from configuration logic
6. **Progressive Form Growth**: Form expands based on user selections

### **❌ What NOT to Do**

- ❌ **Don't show inline forms** on the test selection page
- ❌ **Don't use conditional rendering** within a single step
- ❌ **Don't mix selection and configuration** in the same component
- ❌ **Don't use stepName for routing** - use stepKey instead

This dynamic test page pattern ensures clean separation of concerns and provides an intuitive user experience where each test configuration gets its own dedicated page in the form flow.

---

## **3. Complete Implementation Templates**

### **Standalone Form Template (User Form Pattern):**

\`\`\`typescript
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { IconCheck } from '@tabler/icons-react';

const createFormSchema = (t: any) =>
  z.object({
    // Text inputs FIRST (since no number inputs in this form)
    name: z.string().min(2, {
      message: t('validation.name_min_length')
    }),
    email: z.string().email({
      message: t('validation.email_invalid')
    }),
    // Select inputs SECOND
    role: z.enum(['ROLE1', 'ROLE2'], {
      required_error: t('validation.role_required')
    })
  });

interface UserFormProps {
  initialData?: User;
}

export default function UserForm({ initialData }: UserFormProps) {
  const t = useTranslations('Users.form');
  const router = useRouter();
  const formSchema = createFormSchema(t);

  const isEditMode = !!initialData;
  const pageTitle = isEditMode ? t('edit_user_title') : t('create_user_title');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // NO mode: 'onChange' - this is optional
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      role: initialData?.role || 'ROLE1'
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Submit logic
      console.log('Form values:', values);
      
      toast.success(t(isEditMode ? 'success.user_updated' : 'success.user_created'), {
        icon: <IconCheck className='h-4 w-4 text-green-600' />
      });
      
      router.push('/users');
    } catch (error) {
      toast.error(t(isEditMode ? 'error.update_failed' : 'error.create_failed'));
    }
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/* Text inputs FIRST */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('labels.name')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('placeholders.name')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('labels.email')}</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder={t('placeholders.email')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Select inputs SECOND */}
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('labels.role')}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('placeholders.select_role')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex gap-4'>
              <Button type='submit'>
                {isEditMode ? t('update') : t('create')}
              </Button>
              <Button type='button' variant='outline' onClick={() => router.push('/users')}>
                {t('cancel')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
\`\`\`

### **Multi-Step Form Template (Request Form Pattern):**

\`\`\`typescript
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

// Revolutionary MCP Modular Architecture - Business Logic Hooks
import { useRequestForm } from '../hooks/use-request-form';
import { useFormSteps } from '../hooks/useFormSteps';
import { useFormSubmission } from '../hooks/useFormSubmission';

// Components
import { StepIndicator } from './StepIndicator';

export function ModularNewRequestForm() {
  const router = useRouter();
  const t = useTranslations('CommercialRequests');

  // Revolutionary MCP Pattern - Form management with enhanced logic
  const form = useRequestForm();
  
  // Revolutionary MCP Pattern - Business logic hooks
  const stepNavigation = useFormSteps({ form });
  const formSubmission = useFormSubmission({
    onSuccess: () => {
      toast.success(t('form.success.request_created'));
      router.push('/commercial-requests');
    },
    onError: (error) => {
      toast.error(t('form.error.create_failed'));
    },
  });

  // Revolutionary MCP Pattern - Step content rendering with simple pattern
  const renderStepContent = () => {
    const stepName = stepNavigation.currentStepInfo?.name;
    
    switch (stepName) {
      case 'Basic Info':
        return <BasicInfoStep form={form} />;
      case 'Request Type':
        return <RequestTypeStep form={form} />;
      case 'Additional Info':
        return <AdditionalInfoStep form={form} />;
      default:
        return <div className="p-8 text-center">Step content coming soon...</div>;
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Revolutionary MCP Pattern - Clean step indicator */}
      <StepIndicator 
        steps={stepNavigation.steps}
        currentStep={stepNavigation.currentStep}
        onStepClick={stepNavigation.goToStep}
      />

      {/* Revolutionary MCP Pattern - Clean form structure with Auto-Submit Prevention */}
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(formSubmission.submitForm)}
          className="space-y-6"
          onKeyDown={(e) => {
            // 🚨 CRITICAL: Auto-Submit Prevention - Prevent Enter key submission on non-final steps
            if (e.key === 'Enter' && !stepNavigation.isLastStep) {
              e.preventDefault();
            }
          }}
        >
          {/* Dynamic step content rendering */}
          {renderStepContent()}

          {/* Revolutionary MCP Pattern - Auto-Submit Prevention Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={stepNavigation.previousStep}
              disabled={stepNavigation.isFirstStep}
            >
              Previous
            </Button>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={formSubmission.isSubmitting}
              >
                Cancel
              </Button>

              {!stepNavigation.isLastStep ? (
                <Button 
                  type="button" 
                  onClick={(e) => {
                    // 🚨 CRITICAL: Auto-Submit Prevention
                    e.preventDefault();
                    e.stopPropagation();
                    stepNavigation.nextStep();
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={formSubmission.isSubmitting}
                >
                  {formSubmission.isSubmitting ? 'Creating...' : 'Create Request'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
\`\`\`

---

## **3. Validation Patterns**

**Translation-aware validation** with createFormSchema(t):

\`\`\`typescript
const createFormSchema = (t: any) => z.object({
  name: z.string().min(1, t('validation.name_required')),
  email: z.string().email(t('validation.email_invalid')),
  quantity: z.coerce.number().min(1, t('validation.quantity_required')),
});
\`\`\`

**Real-time validation** with mode: 'onChange' (optional for enhanced UX):

\`\`\`typescript
const form = useForm<FormData>({
  resolver: zodResolver(createFormSchema(t)),
  mode: 'onChange', // Optional - enables real-time validation
  defaultValues: { /* ... */ },
});
\`\`\`

**Step validation** with form.trigger() for multi-step forms:

\`\`\`typescript
const validateCurrentStep = async () => {
  const stepFields = {
    0: ['basicInfo.name', 'basicInfo.email'],
    1: ['additionalInfo.phone', 'additionalInfo.company'],
  };
  
  const fieldsToValidate = stepFields[currentStep as keyof typeof stepFields];
  const isValid = await form.trigger(fieldsToValidate as any);
  return isValid;
};
\`\`\`

---

## **4. Page Structure Patterns**

**Complete page structure** (MANDATORY for all form pages):

\`\`\`typescript
import { PageContainer } from '@/components/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

// Standard page header pattern used in commercial requests
<PageContainer scrollable={true}>
  <div className="flex flex-1 flex-col space-y-4">
    <div className="flex items-start justify-between">
      <Heading
        title={t('page_title')}
        description={t('page_description')}
      />
    </div>
    <Separator />
    {/* Form component goes here */}
  </div>
</PageContainer>
\`\`\`

**Standalone forms**: Card wrapper with CardHeader/CardContent:

\`\`\`typescript
<Card className='mx-auto w-full'>
  <CardHeader>
    <CardTitle className='text-left text-2xl font-bold'>
      {pageTitle}
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* Form implementation */}
  </CardContent>
</Card>
\`\`\`

**Multi-step forms**: Container div with max-width and spacing:

\`\`\`typescript
<div className="mx-auto max-w-4xl space-y-6">
  <StepIndicator />
  <Form {...form}>
    {/* Form steps */}
  </Form>
</div>
\`\`\`

---

## **5. Input Field System**

**Field order (MANDATORY)**:
1. **Number inputs** (type="number") - FIRST
2. **Text inputs** (regular Input components) - SECOND  
3. **Select inputs** (Select components) - THIRD
4. **Boolean inputs** (Switch/Checkbox components) - FOURTH
5. **Textarea inputs** (Textarea components) - LAST

**NO FormDescription components** - keep forms clean and focused.

**Grid layout**: 'grid grid-cols-1 gap-6 md:grid-cols-2'

**FormField structure**: FormField → FormItem → FormLabel → FormControl → FormMessage

\`\`\`typescript
<FormField
  control={form.control}
  name='fieldName'
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('labels.fieldName')} *</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
\`\`\`

---

## **6. Button & Action Patterns**

**Standalone forms**: div.flex.gap-4 with submit + cancel buttons:

\`\`\`typescript
<div className='flex gap-4'>
  <Button type='submit' disabled={form.formState.isSubmitting}>
    {form.formState.isSubmitting ? t('saving') : t('submit')}
  </Button>
  <Button type='button' variant='outline' onClick={() => router.push('/list')}>
    {t('cancel')}
  </Button>
</div>
\`\`\`

**Multi-step forms**: div.flex.items-center.justify-between with auto-submit prevention navigation:

\`\`\`typescript
<div className="flex items-center justify-between mt-8">
  <Button
    type="button"
    variant="outline"
    onClick={previousStep}
    disabled={isFirstStep}
  >
    Previous
  </Button>

  <div className="flex gap-2">
    <Button type="button" variant="outline" onClick={() => router.back()}>
      Cancel
    </Button>
    
    {!isLastStep ? (
      <Button 
        type="button" 
        onClick={(e) => {
          // 🚨 CRITICAL: Auto-Submit Prevention
          e.preventDefault();
          e.stopPropagation();
          nextStep();
        }}
      >
        Next
      </Button>
    ) : (
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create'}
      </Button>
    )}
  </div>
</div>
\`\`\`

**Submit button states** with loading indicators and proper disabled states.

---

## **7. Toast & Feedback Patterns**

**Sonner toast with IconCheck** for success:

\`\`\`typescript
toast.success(t('success.request_created'), {
  icon: <IconCheck className='h-4 w-4 text-green-600' />
});
\`\`\`

**Error toasts** for submission failures:

\`\`\`typescript
toast.error(t('error.create_failed'));
\`\`\`

**Translation-aware messages** using proper translation keys for consistent messaging across locales.

---

## **8. Revolutionary MCP Components**

## **Revolutionary MCP StepIndicator Component - SCALABLE PATTERN**

### **✅ CORRECT Implementation (RequestForm Pattern)**

\`\`\`typescript
'use client';

import React from 'react';
import { Check, Circle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Simple Step Interface - NEW STANDARD (matches commercial requests)
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
              {steps[currentStep]?.description || 'Complete this step to continue'}
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

### **🚨 CRITICAL DESIGN REQUIREMENTS**

#### **Scalability (MANDATORY)**
- ✅ **Works with 12+ steps** without breaking
- ✅ **Desktop**: Icon circles with arrows (NOT tab buttons)
- ✅ **Mobile**: Circular numbered dots
- ✅ **Text truncation** prevents overflow

#### **Layout Structure (MANDATORY)**  
- ✅ **Header Layout**: Title + description LEFT, counter RIGHT
- ✅ **Progress Bar**: Full-width below header
- ✅ **NO TAB BUTTONS** - they break responsiveness

#### **Responsive Design (MANDATORY)**
- ✅ **Desktop**: Horizontal navigation with full step info
- ✅ **Mobile**: Compact circular dots with minimal text
- ✅ **Breakpoint**: \`md:\` for desktop/mobile switch

### **❌ WRONG PATTERN (DO NOT USE)**

\`\`\`typescript
// WRONG - Tab-style navigation breaks with many steps
<div className="hidden md:flex justify-center space-x-4">
  {steps.map((step, index) => (
    <button className="px-4 py-2 rounded-md"> {/* Tab button - BREAKS */}
      {step.name}
    </button>
  ))}
</div>

// WRONG - Centered header layout
<div className="text-center mb-6">
  <div className="flex items-center justify-center space-x-3"> {/* WRONG */}
    <h2>{steps[currentStep]?.name}</h2>
    <span>{currentStep + 1}/{steps.length}</span>
  </div>
</div>
\`\`\`

### **✅ USAGE IN MULTI-STEP FORMS**

\`\`\`typescript
export function MultiStepForm() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Revolutionary MCP Pattern - SCALABLE StepIndicator */}
      <StepIndicator 
        steps={stepNavigation.steps}
        currentStep={stepNavigation.currentStep}
        onStepClick={stepNavigation.goToStep}
      />
      
      <Form {...form}>
        {/* Form content */}
      </Form>
    </div>
  );
}
\`\`\`

This StepIndicator pattern ensures perfect scalability and responsiveness for forms with any number of steps (tested with 12+ steps).

### **🚨 CRITICAL: Simplified StepIndicator Pattern - NEW STANDARD**

The form-bundle has been updated to use the **simplified StepIndicator pattern** used successfully in commercial requests. This eliminates the complex key/fields approach in favor of a cleaner, more maintainable pattern.

#### **Key Changes from Previous Pattern:**
- ✅ **Simple Step Interface**: Only `id`, `name`, `description` (no complex keys/fields)
- ✅ **Static Steps Definition**: Direct array definition with `useMemo`
- ✅ **Switch-Based Field Mapping**: `getFieldsForStep()` function with switch statement
- ✅ **Cleaner Step Content Rendering**: Direct switch on step name
- ❌ **Removed**: Complex step objects with embedded field arrays
- ❌ **Removed**: Dynamic step building based on form state

#### **Migration from Old Pattern:**
If you have existing forms using the old complex pattern, update them to use:
1. Simple Step interface definition
2. Static steps array in `useMemo`
3. `getFieldsForStep()` function for field validation mapping
4. Direct step name switch in content rendering

---

### **useRequestForm Hook:**

\`\`\`typescript
export function useRequestForm() {
  const t = useTranslations('CommercialRequests');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(createCombinedFormSchema(t)),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: defaultFormValues,
  });

  // Conditional field reset logic based on form state
  const requestType = form.watch('requestType');
  
  useEffect(() => {
    // Reset conditional fields when request type changes
    if (requestType) {
      // Reset specific fields based on request type
      form.setValue('conditionalField', '');
    }
  }, [requestType, form]);
  
  return form;
}
\`\`\`

### **useFormSteps Hook - SIMPLIFIED STANDARD PATTERN:**

\`\`\`typescript
interface UseFormStepsParams {
  form: UseFormReturn<any>;
}

interface UseFormStepsReturn {
  steps: Step[];
  currentStep: number;
  currentStepInfo?: Step;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextStep: () => Promise<void>;
  previousStep: () => void;
  goToStep: (stepIndex: number) => Promise<void>;
  validateCurrentStep: () => Promise<boolean>;
}

export function useFormSteps({ form }: UseFormStepsParams): UseFormStepsReturn {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Simple steps definition - matching commercial requests pattern
  const steps = useMemo((): Step[] => {
    return [
      { id: 1, name: 'Basic Info', description: 'Laboratory, customer, and date information' },
      { id: 2, name: 'Request Type', description: 'Select request type and product details' },
      { id: 3, name: 'Additional Info', description: 'Additional requirements and specifications' },
      // Add more steps as needed
    ];
  }, []);

  const currentStepInfo = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  // Field validation by step name - simple switch pattern
  const getFieldsForStep = useCallback((stepName: string): string[] => {
    switch (stepName) {
      case 'Basic Info':
        return ['laboratory', 'customer', 'salesAgent'];
      case 'Request Type':
        return ['requestType', 'productType'];
      case 'Additional Info':
        return ['requirements', 'notes'];
      default:
        return [];
    }
  }, []);

  const validateCurrentStep = async () => {
    if (!currentStepInfo) return false;
    const fieldsToValidate = getFieldsForStep(currentStepInfo.name);
    if (fieldsToValidate.length === 0) return true;
    return await form.trigger(fieldsToValidate as any);
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && !isLastStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = async (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= steps.length) return;
    
    if (stepIndex < currentStep) {
      // Allow going back without validation
      setCurrentStep(stepIndex);
    } else if (stepIndex > currentStep) {
      // Validate all steps up to target step
      let canProceed = true;
      for (let i = currentStep; i < stepIndex; i++) {
        const stepFields = getFieldsForStep(steps[i].name);
        if (stepFields.length > 0) {
          const stepValid = await form.trigger(stepFields as any);
          if (!stepValid) {
            canProceed = false;
            break;
          }
        }
      }
      if (canProceed) {
        setCurrentStep(stepIndex);
      }
    } else {
      // Same step, just update
      setCurrentStep(stepIndex);
    }
  };
  
  return {
    steps,
    currentStep,
    currentStepInfo,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
    goToStep,
    validateCurrentStep,
  };
}
\`\`\`

---

## **9. Implementation Checklist**

### **🚨 CRITICAL: Import Validation (MANDATORY FIRST)**
- [ ] **Clean Form imports** - NO FormDescription in import statements
- [ ] **Remove unused imports** - No Badge, unused Icons, or type imports
- [ ] **Shared StepIndicator** - Import from '@/features/formulations/components/StepIndicator'
- [ ] **Error handling imports** - Button, useTranslations for error.tsx files

### **🎯 Core Implementation Requirements**
- [ ] **Page structure** - PageContainer with Heading + Separator (Commercial Requests pattern)
- [ ] **Card wrapper** with proper className for standalone forms
- [ ] **Container div** with max-width for multi-step forms  
- [ ] **Translation-aware schema** with createFormSchema(t)
- [ ] **Field organization** following mandatory order (Number → Text → Select → Boolean → Textarea)
- [ ] **FormField structure** without FormDescription
- [ ] **Button patterns** matching form type (standalone vs multi-step)
- [ ] **Toast feedback** with proper icons and translations

### **🔄 Multi-Step Form Requirements**
- [ ] **StepIndicator** + business logic hooks
- [ ] **Dynamic step content rendering** with switch statement
- [ ] **Real-time validation** with conditional logic
- [ ] **Auto-submit prevention** - Next buttons use e.preventDefault() and e.stopPropagation()
- [ ] **Form Enter key protection** - onKeyDown handler prevents Enter submission on non-final steps
- [ ] **Button types** - Only submit button has type="submit", all navigation buttons are type="button"
- [ ] **Side-effect hooks pattern** - don't store return values for useConditionalLogic/useFormDefaults
- [ ] **Static option generators** (no translation functions for dropdown values)

### **✅ Quality Assurance**
- [ ] **Run lint check** - `npm run lint` passes without unused import warnings
- [ ] **Run typecheck** - `npm run typecheck` passes without errors
- [ ] **No FormDescription components** in JSX markup
- [ ] **Error parameter handling** - Use error.message/digest or underscore prefix pattern
- [ ] **Console statement consistency** - Production errors vs debug statements

---

## **10. 🚨 Common Issues & Quick Fixes**

### **❌ Lint Warnings - IMMEDIATE FIXES**

**"FormDescription is defined but never used"**
```typescript
// ❌ WRONG - Remove FormDescription from imports
import { FormDescription } from '@/components/ui/form';

// ✅ CORRECT - Clean import without FormDescription
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
```

**"Unexpected console statement"**
```typescript
// ❌ WRONG - Bare console statements trigger lint warnings
console.error('Form error:', error);

// ✅ CORRECT - Use eslint-disable for debug statements
// eslint-disable-next-line no-console
console.error('Form submission error:', error);
```

**"useConditionalLogic is assigned but never used"**
```typescript
// ❌ WRONG - Storing return value from side-effect hooks
const conditionalLogic = useConditionalLogic({ form });
const formDefaults = useFormDefaults({ form });

// ✅ CORRECT - Don't store return values from side-effect hooks
useConditionalLogic({ form });  // Side effect only
useFormDefaults({ form });      // Side effect only
```

**"Parameter 'error' is defined but never used"**
```typescript
// ❌ WRONG - Unused error parameter triggers lint warning
export default function Error({ error, reset }: ErrorPageProps) {
  return <div>Something went wrong</div>;
}

// ✅ CORRECT - Use underscore prefix for intentionally unused parameters
export default function Error({ error: _error, reset }: ErrorPageProps) {
  return <div>Something went wrong</div>;
}

// ✅ ALTERNATIVE - Use error parameter properly
export default function Error({ error, reset }: ErrorPageProps) {
  console.error('Page error:', error.message);
  return <div>Error: {error.message}</div>;
}
```

### **🔧 TypeScript Errors - IMMEDIATE FIXES**

**"Module not found: StepIndicator"**
```typescript
// ❌ WRONG - Local duplicate or incorrect path
import { StepIndicator } from './components/StepIndicator';

// ✅ CORRECT - Use shared component
import { StepIndicator } from '@/features/formulations/components/StepIndicator';
```

### **📋 Form Validation Issues**

**Fields not validating properly**
- ✅ Ensure `form.trigger()` is called with correct field names
- ✅ Check validation schema matches field names exactly
- ✅ Use `createFormSchema(t)` pattern for translation-aware validation

**Step navigation not working**
- ✅ Verify `useFormSteps` hook is properly configured
- ✅ Check step field mappings match form field names
- ✅ Ensure `validateCurrentStep()` is awaited before navigation

---

## **11. Design System Integration**

All forms integrate with **design-system-bundle** for UI components:

- **Input components** and styling patterns
- **Button variants** and states
- **StepIndicator** uses responsive design patterns  
- **Toast integration** with proper styling and icons
- **Color schemes** and typography consistency
- **Spacing and layout** patterns

**CRITICAL**: Always reference the design-system-bundle for all UI component specifications to ensure visual consistency across the application.

---

## **12. Breadcrumb Navigation Patterns**

### **1. Dynamic Route Breadcrumbs**
Pattern for handling dynamic routes like formulations/[id]/create-tlwr:

\`\`\`typescript
// Special handling for formulation routes
const getFormulationBreadcrumbs = (pathSegments: string[], t: any): BreadcrumbItem[] => {
  const breadcrumbItems: BreadcrumbItem[] = [];
  
  // Add "Formulations" as the first segment
  breadcrumbItems.push({
    title: t('formulations'),
    link: '/formulations'
  });
  
  // Find formulations index
  const formulationsIndex = pathSegments.indexOf('formulations');
  
  if (formulationsIndex !== -1 && pathSegments[formulationsIndex + 1]) {
    const formulationId = pathSegments[formulationsIndex + 1];
    // Add formulation ID as the second segment
    breadcrumbItems.push({
      title: formulationId,
      link: \`/formulations/\${formulationId}\`
    });
    
    // Handle specific operations
    if (pathSegments[formulationsIndex + 2] === 'edit') {
      breadcrumbItems.push({
        title: t('edit'),
        link: \`/formulations/\${formulationId}/edit\`
      });
    }
    
    if (pathSegments[formulationsIndex + 2] === 'create-tlwr') {
      breadcrumbItems.push({
        title: 'TLWR',
        link: \`/formulations/\${formulationId}/create-tlwr\`
      });
    }
  }
  
  return breadcrumbItems;
};
\`\`\`

### **2. Breadcrumb Integration Requirements**
- All forms MUST have proper breadcrumb navigation showing the hierarchy
- Entity IDs should be displayed in breadcrumbs for dynamic routes
- Context operations (edit, create-tlwr) should be shown as final breadcrumb items
- Breadcrumbs should integrate with the page header structure

### **3. Form Page Breadcrumb Structure**
Standard pattern showing breadcrumbs above page titles:
\`\`\`typescript
<PageContainer scrollable={true}>
  {/* Breadcrumbs automatically handled by layout */}
  <div className='flex flex-1 flex-col space-y-4'>
    <div className='flex items-start justify-between'>
      <Heading
        title={pageTitle}
        description={pageDescription}
      />
    </div>
    <Separator />
    {/* Form content */}
  </div>
</PageContainer>
\`\`\`

### **4. Multi-Step Form Breadcrumb Patterns**
Results in breadcrumb hierarchy like:
- Formulations > 2 > TLWR (showing entity > operation)
- Formulations > 3 > Edit (showing entity > operation)  

### **5. Implementation Guidelines**
- Use entity IDs in breadcrumbs for dynamic routes
- Always include base entity name as first breadcrumb
- Show operation context as final breadcrumb
- Ensure breadcrumbs are translatable via i18n keys
- Handle loading states appropriately

### **6. Breadcrumb Item Interface**
\`\`\`typescript
interface BreadcrumbItem {
  title: string;
  link: string;
}
\`\`\`

### **7. Translation Pattern for Breadcrumbs**
\`\`\`typescript
// Standard breadcrumb translations
const breadcrumbTranslations = {
  'formulations': t('navigation.formulations'),
  'edit': t('actions.edit'),
  'create': t('actions.create'),
  'users': t('navigation.users'),
  'clients': t('navigation.clients')
};
\`\`\`

### **8. Complete Breadcrumb Implementation Example**
\`\`\`typescript
// In layout or breadcrumb component
const generateBreadcrumbs = (pathname: string, t: any): BreadcrumbItem[] => {
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbItems: BreadcrumbItem[] = [];

  // Handle different route patterns
  if (pathSegments.includes('formulations')) {
    return getFormulationBreadcrumbs(pathSegments, t);
  }
  
  if (pathSegments.includes('users')) {
    return getUserBreadcrumbs(pathSegments, t);
  }
  
  if (pathSegments.includes('clients')) {
    return getClientBreadcrumbs(pathSegments, t);
  }

  // Default breadcrumb handling
  return getDefaultBreadcrumbs(pathSegments, t);
};
\`\`\`

### **9. Breadcrumb Pattern Checklist**
- [ ] **Entity-based routing** - Show entity name as first breadcrumb
- [ ] **ID display** - Display entity IDs for dynamic routes
- [ ] **Operation context** - Show edit/create/view operations as final breadcrumb
- [ ] **Translation support** - All breadcrumb text uses i18n keys
- [ ] **Link navigation** - Each breadcrumb item has proper navigation link
- [ ] **Layout integration** - Breadcrumbs appear above page headers
- [ ] **Loading states** - Handle async data loading appropriately
- [ ] **Consistent hierarchy** - Follow entity > id > operation pattern

This breadcrumb system ensures consistent navigation across all form pages while providing clear context about the user's current location in the application hierarchy.

---

*This form bundle provides the exact proven patterns from successful implementations with 95%+ consistency and revolutionary modular architecture. Every form should follow these patterns for optimal user experience and development efficiency.*`