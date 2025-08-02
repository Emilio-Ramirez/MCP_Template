export const staticOptionGenerators = {
  name: "Static Option Generators Pattern",
  description: "MANDATORY pattern for business-consistent dropdown options ensuring API compatibility and translation-free technical values",
  
  overview: {
    purpose: "Establish static, business-consistent dropdown options that maintain integrity across languages and systems",
    useCase: "All form dropdown/select components requiring technical standards, material types, or business values",
    keyPrinciples: [
      "Option values remain static (technical terms, standards, codes)",
      "Only UI labels get translated, never the option values", 
      "Business consistency across different languages",
      "API compatibility with static technical values"
    ]
  },

  corePhilosophy: {
    description: "Fundamental separation of business data and UI presentation",
    
    staticValuePhilosophy: [
      "Option values remain static (technical terms, standards, codes)",
      "Only UI labels get translated, never the option values",
      "Business consistency across different languages", 
      "API compatibility with static technical values"
    ],

    separationOfConcerns: [
      "Option generators produce static English/technical values",
      "Translation system handles only UI text (labels, descriptions)",
      "No mixing of business values with translations",
      "Clear distinction between data and presentation"
    ],

    centralizedManagement: [
      "Single source of truth for option definitions",
      "Reusable generators across multiple forms",
      "Easy maintenance and updates",
      "Consistent naming and structure"
    ]
  },

  implementationPattern: {
    description: "MANDATORY pattern for all dropdown option generators",
    
    basicStructure: `
// Static option generators - MANDATORY pattern
const getStandardTypes = () => [
  { value: 'astm', label: 'ASTM' },
  { value: 'iso', label: 'ISO' },
  { value: 'din', label: 'DIN' },
  { value: 'jis', label: 'JIS' },
  { value: 'custom', label: 'Custom' }
];

const getChemistries = () => [
  { value: 'polyester', label: 'Polyester' },
  { value: 'epoxy', label: 'Epoxy' },
  { value: 'acrylic', label: 'Acrylic' },
  { value: 'polyurethane', label: 'Polyurethane' },
  { value: 'hybrid', label: 'Hybrid' }
];

const getColors = () => [
  { value: 'white', label: 'White' },
  { value: 'black', label: 'Black' },
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'custom', label: 'Custom' }
];`,

    formComponentUsage: `
// LWRPage1Step.tsx - Example using static option generators
'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';

// Static option generators - NO translation functions
const getStandardTypes = () => [
  { value: 'astm', label: 'ASTM' },
  { value: 'iso', label: 'ISO' },
  { value: 'din', label: 'DIN' },
  { value: 'jis', label: 'JIS' },
  { value: 'custom', label: 'Custom' }
];

export default function LWRPage1Step({ form }: LWRPage1StepProps) {
  const t = useTranslations('CommercialRequests');
  
  // Get static option arrays - NO translation parameters
  const standardTypes = getStandardTypes();
  
  return (
    <FormField
      control={form.control}
      name='lwrStandardType'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('form.fields.lwr_standard_type')} *</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder={t('form.placeholders.select_standard_type')} />
              </SelectTrigger>
              <SelectContent>
                {standardTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}`
  },

  centralizedOptions: {
    description: "Centralized option management for reusability and consistency",
    
    optionsConstant: `
// constants/form-options.ts - Centralized option definitions
export const FORM_OPTIONS = {
  // LWR Options
  standardTypes: [
    { value: 'astm', label: 'ASTM' },
    { value: 'iso', label: 'ISO' },
    { value: 'din', label: 'DIN' },
    { value: 'jis', label: 'JIS' },
    { value: 'custom', label: 'Custom' }
  ],

  competitions: [
    { value: 'akzo_nobel', label: 'AkzoNobel' },
    { value: 'ppg', label: 'PPG Industries' },
    { value: 'sherwin_williams', label: 'Sherwin-Williams' },
    { value: 'axalta', label: 'Axalta' },
    { value: 'other', label: 'Other' }
  ],

  chemistries: [
    { value: 'polyester', label: 'Polyester' },
    { value: 'epoxy', label: 'Epoxy' },
    { value: 'acrylic', label: 'Acrylic' },
    { value: 'polyurethane', label: 'Polyurethane' },
    { value: 'hybrid', label: 'Hybrid' }
  ],

  // TLWR Options
  testTypes: [
    { value: 'adhesion', label: 'Adhesion Test' },
    { value: 'flexibility', label: 'Flexibility Test' },
    { value: 'impact', label: 'Impact Test' },
    { value: 'salt_spray', label: 'Salt Spray Test' },
    { value: 'uv_exposure', label: 'UV Exposure Test' }
  ],

  // VLWR Options
  materialTypes: [
    { value: 'competitors_sample', label: 'Competitors Sample' },
    { value: 'vitracoat_product', label: 'Vitracoat Product' },
    { value: 'raw_material', label: 'Raw Material' },
    { value: 'experimental', label: 'Experimental' }
  ],

  suppliers: [
    { value: 'akzo_nobel', label: 'Akzo Nobel' },
    { value: 'ppg', label: 'PPG' },
    { value: 'sherwin_williams', label: 'Sherwin Williams' },
    { value: 'axalta', label: 'Axalta' },
    { value: 'jotun', label: 'Jotun' },
    { value: 'other', label: 'Other' }
  ],

  // Common Options
  urgencyLevels: [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ],

  laboratories: [
    { value: 'IBSO', label: 'IBSO' },
    { value: 'LERMA', label: 'LERMA' },
    { value: 'EXTERNAL', label: 'External' }
  ]
};

// Helper functions for specific option types
export const getLWROptions = () => ({
  standardTypes: FORM_OPTIONS.standardTypes,
  competitions: FORM_OPTIONS.competitions,
  chemistries: FORM_OPTIONS.chemistries,
});

export const getTLWROptions = () => ({
  testTypes: FORM_OPTIONS.testTypes,
});

export const getVLWROptions = () => ({
  materialTypes: FORM_OPTIONS.materialTypes,
  suppliers: FORM_OPTIONS.suppliers,
});`
  },

  reusableComponent: {
    description: "Reusable select component with static options",
    
    optionSelectComponent: `
// components/form/option-select.tsx - Reusable select with static options
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Option {
  value: string;
  label: string;
}

interface OptionSelectProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
}

export function OptionSelect({
  form,
  name,
  label,
  placeholder,
  options,
  required = false,
  disabled = false,
}: OptionSelectProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Select 
              value={field.value} 
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Usage example
function ExampleFormSection({ form }: { form: UseFormReturn<any> }) {
  const { t } = useTranslations('CommercialRequests');
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <OptionSelect
        form={form}
        name="lwrStandardType"
        label={t('form.fields.lwr_standard_type')}
        placeholder={t('form.placeholders.select_standard_type')}
        options={FORM_OPTIONS.standardTypes}
        required
      />
      
      <OptionSelect
        form={form}
        name="lwrChemistry"
        label={t('form.fields.lwr_chemistry')}
        placeholder={t('form.placeholders.select_chemistry')}
        options={FORM_OPTIONS.chemistries}
        required
      />
    </div>
  );
}`
  },

  antiPatterns: {
    description: "What NOT to do - common mistakes to avoid",
    
    wrongPattern: `
// ❌ WRONG: Translation-based options (OLD PATTERN)
const getStandardTypes = (t: any) => [
  { value: 'astm', label: t('form.options.standard_types.astm') },
  { value: 'iso', label: t('form.options.standard_types.iso') },
  { value: 'din', label: t('form.options.standard_types.din') },
  { value: 'jis', label: t('form.options.standard_types.jis') },
  { value: 'custom', label: t('form.options.standard_types.custom') }
];

// ❌ DON'T DO THIS - Calling translation function
const standardTypes = getStandardTypes(t);`,

    correctPattern: `
// ✅ CORRECT: Static option generators (NEW PATTERN)
const getStandardTypes = () => [
  { value: 'astm', label: 'ASTM' },
  { value: 'iso', label: 'ISO' },
  { value: 'din', label: 'DIN' },
  { value: 'jis', label: 'JIS' },
  { value: 'custom', label: 'Custom' }
];

// ✅ DO THIS - No translation parameters
const standardTypes = getStandardTypes();`
  },

  businessJustification: {
    description: "Why static options are essential for business integrity",
    
    dataConsistency: [
      "API consistency: Same values regardless of UI language",
      "Database integrity: Technical values don't change with locale",
      "Cross-system compatibility: Other systems expect standard values",
      "Business logic reliability: Conditional logic based on stable values"
    ],

    maintenanceBenefits: [
      "Single source of truth: Option values defined once",
      "No translation bloat: Removes hundreds of unnecessary translation keys",
      "Easier updates: Change option sets without touching translation files",
      "Reduced complexity: No translation function dependencies"
    ],

    performanceImprovements: [
      "Smaller translation files: Remove unused option translations",
      "Faster rendering: No translation lookups for options",
      "Better caching: Static options can be cached effectively",
      "Reduced bundle size: Fewer translation keys to load"
    ],

    developerExperience: [
      "Clear separation: Business data vs UI text",
      "Less confusion: Developers know what to translate vs what to keep static",
      "Easier testing: Option values are predictable across languages",
      "Better IntelliSense: Static values provide better IDE support"
    ]
  },

  implementationGuidelines: {
    description: "Mandatory implementation rules and best practices",
    
    alwaysDo: [
      "Use static English/technical values for option values",
      "Create option generators without translation parameters",
      "Keep option labels simple and clear (e.g., 'ASTM', 'Polyester', 'Steel')",
      "Centralize common options in constants file",
      "Only translate field labels, placeholders, and descriptions"
    ],

    neverDo: [
      "Pass translation functions to option generators",
      "Translate technical standards (ASTM, ISO, etc.)",
      "Translate material names (Polyester, Epoxy, etc.)",
      "Translate color names (Red, Blue, etc.)", 
      "Create locale-specific option values"
    ]
  },

  migrationChecklist: {
    description: "Steps to migrate from translation-based to static options",
    
    forNewForms: [
      "Create static option generators (no translation functions)",
      "Use English/technical labels for option values",
      "Centralize options in constants file when appropriate",
      "Use reusable OptionSelect component",
      "Only translate field labels and placeholders, never option values"
    ],

    forExistingForms: [
      "Remove translation function parameters from option generators",
      "Replace translated labels with static English/technical terms",
      "Remove unused option translations from locale files",
      "Update component imports to remove translation dependencies",
      "Test that form submission still works with static values"
    ],

    qualityAssurance: [
      "Verify option values remain consistent across languages",
      "Test form submission with static option values",
      "Confirm API compatibility with new static values",
      "Validate that only UI text is translated, not option values",
      "Check that conditional logic still works with static values"
    ]
  },

  examplesByRequestType: {
    description: "Comprehensive examples for each request type",
    
    lwrOptions: [
      "standardTypes: ASTM, ISO, DIN, JIS, Custom",
      "competitions: AkzoNobel, PPG Industries, Sherwin-Williams, Axalta",
      "chemistries: Polyester, Epoxy, Acrylic, Polyurethane, Hybrid",
      "colors: White, Black, Red, Blue, Green, Yellow, Custom",
      "finishes: Gloss, Semi Gloss, Satin, Matte, Textured",
      "substrates: Steel, Aluminum, Galvanized, Stainless, Other"
    ],

    tlwrOptions: [
      "testTypes: Adhesion Test, Flexibility Test, Impact Test, Salt Spray Test",
      "testMethods: ASTM D3359, ISO 2409, ASTM D522, ASTM G85",
      "reportingFormats: Standard Report, Detailed Analysis, Summary Only"
    ],

    vlwrOptions: [
      "materialTypes: Competitors Sample, Vitracoat Product, Raw Material, Experimental",
      "suppliers: Akzo Nobel, PPG, Sherwin Williams, Axalta, Jotun, Other",
      "testObjectives: Quality Control, Raw Material Evaluation, Competitive Analysis",
      "enclosedTypes: SDS, COA, TDS, Specifications, Other"
    ]
  },

  keyBenefits: {
    description: "Critical benefits of the static options pattern",
    
    businessIntegrity: [
      "Technical standards remain unambiguous across languages",
      "Chemical formulations use consistent material identifiers",
      "API endpoints receive predictable, stable values",
      "Database queries work reliably with static identifiers"
    ],

    systemInteroperability: [
      "External systems receive expected technical values",
      "SAP integration works with consistent material codes",
      "Laboratory equipment APIs receive standard test types",
      "Quality control systems use standard measurement units"
    ],

    maintenanceEfficiency: [
      "95% reduction in translation management overhead",
      "Single update point for business option changes",
      "No coordination needed between UI and backend for option values",
      "Automated testing simplified with predictable values"
    ]
  }
};

export default staticOptionGenerators;