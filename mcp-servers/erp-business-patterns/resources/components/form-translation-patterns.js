export const formTranslationPatterns = {
  name: "Form Translation Patterns",
  description: "MANDATORY translation patterns for forms ensuring proper internationalization of form interfaces while maintaining static business values",
  
  overview: {
    purpose: "Establish clear separation between translatable UI text and static business data in form internationalization",
    useCase: "All form components requiring multi-language support while preserving business data integrity",
    keyPrinciples: [
      "TRANSLATE: Field labels, placeholders, descriptions, error messages, instructions",
      "DO NOT TRANSLATE: Option values, technical terms, standards, material names",
      "Server Component Requirements: Use setRequestLocale(locale) for proper context",
      "Hierarchical Key Structure: Use CommercialRequests.form.fields.* namespace"
    ]
  },

  translationScope: {
    description: "Clear definition of what to translate vs what to keep static",
    
    doTranslate: [
      "Field labels and form titles",
      "Placeholders and help text",
      "Descriptions and instructions",
      "Error messages and validation text",
      "Step titles and section headers",
      "Button text and navigation labels"
    ],

    doNotTranslate: [
      "Option values (dropdown choices)",
      "Technical terms and standards (ASTM, ISO, etc.)",
      "Material names (Polyester, Epoxy, etc.)",
      "API values and database values",
      "Business logic values and codes",
      "Cross-system integration identifiers"
    ]
  },

  keyStructure: {
    description: "Hierarchical translation key organization for maintainability",
    
    englishStructure: `
// locales/en.json - Proper form translation structure
{
  "CommercialRequests": {
    "title": "Commercial Requests",
    "subtitle": "Manage your commercial requests efficiently",
    "form": {
      "steps": {
        "basic_info": "Basic Information",
        "request_type": "Request Type",
        "lwr_page_1": "Product Specifications",
        "tlwr_page_1": "Testing Information",
        "vlwr_page_1": "Sample Information",
        "files_notes": "Files and Notes"
      },
      "fields": {
        // Basic Info Fields
        "laboratory": "Laboratory",
        "client_name": "Client Name",
        "urgency": "Urgency Level",
        "request_type": "Request Type",
        
        // LWR Fields
        "lwr_standard_code": "Standard Code",
        "lwr_standard_type": "Standard Type",
        "lwr_competition": "Competition",
        "lwr_chemistry": "Chemistry Type",
        "lwr_target_sales_price": "Target Sales Price",
        "lwr_specific_end_use": "Specific End Use",
        "lwr_metallic": "Metallic Finish",
        
        // TLWR Fields
        "testing_information": "Testing Information",
        "requirements": "Requirements",
        "enclosed_specifications": "Enclosed Specifications",
        "enclosed_specifications_details": "Enclosed Specifications Details",
        
        // VLWR Fields
        "sample_id": "Sample ID",
        "sample_amount": "Sample Amount",
        "material_type": "Material Type",
        "supplier": "Supplier",
        "additional_information": "Additional Information"
      },
      "placeholders": {
        "enter_client_name": "Enter client name",
        "select_laboratory": "Select laboratory",
        "select_urgency": "Select urgency level",
        "enter_standard_code": "Enter standard code",
        "select_standard_type": "Select standard type",
        "describe_end_use": "Describe the specific end use",
        "sample_id_eg": "e.g., VL-2024-001",
        "additional_info_placeholder": "Provide additional information"
      },
      "validation": {
        "required": "This field is required",
        "min_length": "Minimum {min} characters required",
        "max_length": "Maximum {max} characters allowed",
        "invalid_email": "Please enter a valid email address",
        "invalid_number": "Please enter a valid number"
      },
      "actions": {
        "previous": "Previous",
        "next": "Next",
        "submit": "Submit Request",
        "cancel": "Cancel"
      }
    }
  }
}`,

    spanishStructure: `
// locales/es.json - Spanish translations
{
  "CommercialRequests": {
    "title": "Solicitudes Comerciales",
    "subtitle": "Gestiona tus solicitudes comerciales de manera eficiente",
    "form": {
      "steps": {
        "basic_info": "Información Básica",
        "request_type": "Tipo de Solicitud",
        "lwr_page_1": "Especificaciones del Producto",
        "tlwr_page_1": "Información de Pruebas",
        "vlwr_page_1": "Información de Muestra",
        "files_notes": "Archivos y Notas"
      },
      "fields": {
        "laboratory": "Laboratorio",
        "client_name": "Nombre del Cliente",
        "urgency": "Nivel de Urgencia",
        "request_type": "Tipo de Solicitud",
        
        "lwr_standard_code": "Código Estándar",
        "lwr_standard_type": "Tipo de Estándar",
        "lwr_competition": "Competencia",
        "lwr_chemistry": "Tipo de Química",
        "lwr_target_sales_price": "Precio de Venta Objetivo",
        "lwr_specific_end_use": "Uso Final Específico",
        "lwr_metallic": "Acabado Metálico",
        
        "testing_information": "Información de Pruebas",
        "requirements": "Requisitos",
        "enclosed_specifications": "Especificaciones Adjuntas",
        "enclosed_specifications_details": "Detalles de Especificaciones Adjuntas",
        
        "sample_id": "ID de Muestra",
        "sample_amount": "Cantidad de Muestra",
        "material_type": "Tipo de Material",
        "supplier": "Proveedor",
        "additional_information": "Información Adicional"
      },
      "placeholders": {
        "enter_client_name": "Ingrese el nombre del cliente",
        "select_laboratory": "Seleccionar laboratorio",
        "select_urgency": "Seleccionar nivel de urgencia",
        "enter_standard_code": "Ingrese código estándar",
        "select_standard_type": "Seleccionar tipo de estándar",
        "describe_end_use": "Describa el uso final específico",
        "sample_id_eg": "ej., VL-2024-001",
        "additional_info_placeholder": "Proporcione información adicional"
      },
      "validation": {
        "required": "Este campo es obligatorio",
        "min_length": "Se requieren mínimo {min} caracteres",
        "max_length": "Máximo {max} caracteres permitidos",
        "invalid_email": "Por favor ingrese un email válido",
        "invalid_number": "Por favor ingrese un número válido"
      },
      "actions": {
        "previous": "Anterior",
        "next": "Siguiente",
        "submit": "Enviar Solicitud",
        "cancel": "Cancelar"
      }
    }
  }
}`
  },

  serverComponentPattern: {
    description: "MANDATORY server component setup for proper translation context",
    
    serverComponentSetup: `
// app/[locale]/requests/new/page.tsx - Server component with proper locale setup
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import NewRequestFormV2Modular from '@/features/commercial-requests/components/new-request-form-v2-modular';

interface NewRequestPageProps {
  params: Promise<{ locale: string }>;
}

export default async function NewRequestPage({
  params
}: NewRequestPageProps) {
  const { locale } = await params;
  
  // MANDATORY: Set request locale for proper translation context
  setRequestLocale(locale);
  
  // Get translations for server-side rendered content
  const t = await getTranslations('CommercialRequests');

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">{t('subtitle')}</p>
      </div>
      
      {/* Client component with translations */}
      <NewRequestFormV2Modular />
    </div>
  );
}`,

    criticalRequirement: `
// CRITICAL: All server components rendering client components with translations MUST include:
setRequestLocale(locale); // Required for proper translation context`
  },

  clientComponentPattern: {
    description: "Proper translation usage in client form components",
    
    clientComponentUsage: `
// BasicInfoStep.tsx - Client component using translations
'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';

// Static options - NO translation functions
const getLaboratories = () => [
  { value: 'IBSO', label: 'IBSO' },
  { value: 'LERMA', label: 'LERMA' },
  { value: 'EXTERNAL', label: 'External' }
];

const getUrgencyLevels = () => [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' }
];

export default function BasicInfoStep({ form }: BasicInfoStepProps) {
  const t = useTranslations('CommercialRequests');
  
  // Get static options
  const laboratories = getLaboratories();
  const urgencyLevels = getUrgencyLevels();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('form.steps.basic_info')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Client Name */}
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.fields.client_name')} *</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('form.placeholders.enter_client_name')}
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Laboratory - Static options */}
          <FormField
            control={form.control}
            name="laboratory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.fields.laboratory')} *</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('form.placeholders.select_laboratory')} />
                    </SelectTrigger>
                    <SelectContent>
                      {laboratories.map((lab) => (
                        <SelectItem key={lab.value} value={lab.value}>
                          {lab.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}`,

    translationUsage: `
// Proper translation usage patterns
const t = useTranslations('CommercialRequests');

// Use with proper namespacing
<FormLabel>{t('form.fields.lwr_standard_code')} *</FormLabel>
<Input placeholder={t('form.placeholders.enter_standard_code')} />

// Step titles
<CardTitle>{t('form.steps.lwr_page_1')}</CardTitle>

// Validation messages with parameters
const errorMessage = t('form.validation.min_length', { min: 10 });`
  },

  conditionalTranslationPattern: {
    description: "Handling conditional translations based on form state",
    
    conditionalSectionTranslation: `
// components/conditional-section.tsx - Conditional translations
'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';

interface ConditionalSectionProps {
  form: UseFormReturn<any>;
  watchField: string;
  targetField: string;
  condition: (value: any) => boolean;
}

export function ConditionalSection({
  form,
  watchField,
  targetField,
  condition
}: ConditionalSectionProps) {
  const t = useTranslations('CommercialRequests');
  const watchValue = form.watch(watchField);
  const shouldShow = condition(watchValue);

  if (!shouldShow) return null;

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name={targetField}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t(\`form.fields.\${targetField}\`)} *</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t(\`form.placeholders.\${targetField}_placeholder\`)}
                className="min-h-[100px]"
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}`,

    dynamicTranslationKeys: `
// Dynamic translation key usage for conditional fields
const getFieldTranslation = (fieldName: string) => {
  return t(\`form.fields.\${fieldName}\`);
};

const getPlaceholderTranslation = (fieldName: string) => {
  return t(\`form.placeholders.\${fieldName}_placeholder\`);
};`
  },

  errorMessagePatterns: {
    description: "Internationalized error messages with parameters",
    
    errorMessageHook: `
// hooks/use-form-errors.ts - Translated error messages
import { useTranslations } from 'next-intl';

export function useFormErrors() {
  const t = useTranslations('CommercialRequests.form.validation');
  
  const getErrorMessage = (type: string, params?: Record<string, any>) => {
    switch (type) {
      case 'required':
        return t('required');
      case 'min_length':
        return t('min_length', { min: params?.min });
      case 'max_length':
        return t('max_length', { max: params?.max });
      case 'invalid_email':
        return t('invalid_email');
      case 'invalid_number':
        return t('invalid_number');
      case 'min_value':
        return t('min_value', { min: params?.min });
      case 'max_value':
        return t('max_value', { max: params?.max });
      default:
        return t('required'); // Fallback
    }
  };

  return { getErrorMessage };
}`,

    validationSchemaWithTranslations: `
// Usage in validation schema
import { z } from 'zod';

const createValidationSchema = (getErrorMessage: (type: string, params?: any) => string) => {
  return z.object({
    clientName: z.string().min(1, getErrorMessage('required')),
    email: z.string().email(getErrorMessage('invalid_email')),
    sampleAmount: z.number().min(0.1, getErrorMessage('min_value', { min: 0.1 })),
    description: z.string()
      .min(10, getErrorMessage('min_length', { min: 10 }))
      .max(500, getErrorMessage('max_length', { max: 500 }))
  });
};`
  },

  stepNavigationTranslation: {
    description: "Internationalized form navigation components",
    
    formNavigationComponent: `
// components/form-navigation.tsx - Translated step navigation
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  isFirstStep,
  isLastStep,
  canGoNext,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting = false
}: FormNavigationProps) {
  const t = useTranslations('CommercialRequests.form.actions');

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>
      
      <div className="flex space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={isFirstStep}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>{t('previous')}</span>
        </Button>
        
        {isLastStep ? (
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex items-center space-x-2"
          >
            <span>{isSubmitting ? 'Submitting...' : t('submit')}</span>
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onNext}
            disabled={!canGoNext}
            className="flex items-center space-x-2"
          >
            <span>{t('next')}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}`
  },

  commonMistakes: {
    description: "Common translation mistakes and how to avoid them",
    
    wrongPatterns: [
      {
        mistake: "Translating option values",
        wrong: "const getColors = (t: any) => [{ value: 'red', label: t('colors.red') }]",
        correct: "const getColors = () => [{ value: 'red', label: 'Red' }]",
        reason: "Option values must remain static for API consistency"
      },
      {
        mistake: "Missing setRequestLocale in server components",
        wrong: "export default function Page({ params }: { params: { locale: string } }) { return <ClientComponent />; }",
        correct: "setRequestLocale(params.locale); // MANDATORY before rendering",
        reason: "Required for proper translation context in client components"
      },
      {
        mistake: "Wrong translation key structure",
        wrong: "{t('lwr_standard_code')} // Missing form.fields prefix",
        correct: "{t('form.fields.lwr_standard_code')} // Proper hierarchical path",
        reason: "Ensures consistent namespace organization"
      },
      {
        mistake: "Hardcoded text instead of translations",
        wrong: "<FormLabel>Standard Code *</FormLabel>",
        correct: "<FormLabel>{t('form.fields.lwr_standard_code')} *</FormLabel>",
        reason: "All user-facing text must be translatable"
      }
    ]
  },

  implementationGuidelines: {
    description: "Mandatory implementation requirements",
    
    mustDo: [
      "Use setRequestLocale(locale) in all server components rendering translated content",
      "Follow hierarchical translation key structure: CommercialRequests.form.fields.*",
      "Translate all UI text: labels, placeholders, descriptions, error messages",
      "Use static values for all option generators (no translation functions)",
      "Provide translations for all user-facing text in both languages"
    ],

    mustNotDo: [
      "Translate option values, technical terms, or business data",
      "Skip setRequestLocale() in server components",
      "Use flat translation key structure",
      "Mix translated and hardcoded text",
      "Pass translation functions to option generators"
    ]
  },

  benefits: {
    description: "Key benefits of proper form translation patterns",
    
    consistentUserExperience: [
      "All UI text properly translated across the application",
      "Consistent terminology and language usage",
      "Professional localization for global users",
      "Clear separation of business data and UI text"
    ],

    maintainableCode: [
      "Hierarchical translation structure is easy to navigate",
      "Static options reduce translation complexity",
      "Clear patterns for developers to follow",
      "Centralized translation management"
    ],

    businessIntegrity: [
      "Business values remain consistent across languages",
      "API compatibility maintained with static values",
      "Database integrity preserved with technical terms",
      "Cross-system integration reliability ensured"
    ]
  },

  testingGuidelines: {
    description: "How to test translation implementations",
    
    testingChecklist: [
      "Verify all UI text displays in both English and Spanish",
      "Confirm option values remain static across language switches",
      "Test form submission works with static option values",
      "Validate conditional translations appear correctly",
      "Check error messages display in appropriate language",
      "Ensure step navigation labels are translated",
      "Verify placeholder text updates with language changes"
    ],

    automatedTesting: `
// Example translation testing
describe('Form Translations', () => {
  it('should display labels in current locale', () => {
    render(<BasicInfoStep form={mockForm} />, { locale: 'es' });
    expect(screen.getByText('Nombre del Cliente')).toBeInTheDocument();
  });

  it('should keep option values static across locales', () => {
    const { rerender } = render(<LWRPage1Step form={mockForm} />, { locale: 'en' });
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('astm'); // Static value
    
    rerender(<LWRPage1Step form={mockForm} />, { locale: 'es' });
    expect(select).toHaveValue('astm'); // Same static value
  });
});`
  }
};

export default formTranslationPatterns;