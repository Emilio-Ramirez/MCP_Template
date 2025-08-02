export const configurationTabsPattern = {
  name: "Configuration Tabs Pattern - Official Law Pattern",
  description: "Mandatory standardized pattern for all configuration tab implementations in ERP systems",
  
  overview: {
    purpose: "Provide consistent, scalable, and maintainable tab-based configuration interfaces",
    status: "Official Law Pattern - MANDATORY for all configuration pages",
    scope: "All configuration-related tab implementations must follow this exact pattern"
  },

  officialImplementation: {
    description: "The exact implementation that MUST be followed",
    
    coreStructure: `
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

// Import all tab components
import TabComponent1 from './tabs/tab-component-1';
import TabComponent2 from './tabs/tab-component-2';
// ... more imports

export default function ConfigurationTabs() {
  const t = useTranslations('ConfigurationNamespace');

  const tabs = [
    {
      value: 'tab-key-1',
      label: t('tabs.tab_key_1'),
      component: <TabComponent1 />
    },
    {
      value: 'tab-key-2', 
      label: t('tabs.tab_key_2'),
      component: <TabComponent2 />
    },
    // ... more tabs
  ];

  return (
    <Tabs defaultValue="first-tab-key" className="w-full space-y-4">
      <div className="w-full">
        <TabsList className={cn(
          "inline-flex h-auto w-full flex-wrap justify-start bg-muted p-1",
          "gap-1"
        )}>
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.value} 
              value={tab.value}
              className={cn(
                "flex-shrink-0 whitespace-nowrap px-3 py-1.5",
                "data-[state=active]:text-foreground",
                "min-w-fit"
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-6">
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
}`,

    mandatoryRequirements: [
      "MUST use dynamic tabs array with objects containing value, label, and component",
      "MUST use .map() to render both TabsTrigger and TabsContent",
      "NO hardcoded individual tab components allowed",
      "MUST include wrapper <div className=\"w-full\">",
      "MUST use exact styling classes specified in pattern",
      "MUST use namespace-based translations (e.g., 'ProductConfiguration')",
      "MUST follow tab structure: t('tabs.tab_key')",
      "MUST provide translations in both English and Spanish"
    ],

    requiredImports: `
// 1. UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// 2. Internationalization
import { useTranslations } from 'next-intl';

// 3. Utilities  
import { cn } from '@/lib/utils';

// 4. Tab Components (alphabetically ordered)
import TabComponent1 from './tabs/tab-component-1';
import TabComponent2 from './tabs/tab-component-2';`
  },

  requiredStyling: {
    description: "Exact CSS classes that must be used - no deviations allowed",
    
    containerClasses: {
      tabs: "w-full space-y-4",
      wrapper: "w-full",
      tabsList: `cn(
        "inline-flex h-auto w-full flex-wrap justify-start bg-muted p-1",
        "gap-1"
      )`,
      tabsTrigger: `cn(
        "flex-shrink-0 whitespace-nowrap px-3 py-1.5",
        "data-[state=active]:text-foreground",
        "min-w-fit"
      )`,
      tabsContent: "mt-6"
    },

    responsiveFeatures: [
      "flex-wrap - Allows tabs to wrap on smaller screens",
      "gap-1 - Consistent spacing between wrapped tabs",
      "flex-shrink-0 - Prevents tabs from shrinking too small",
      "whitespace-nowrap - Keeps tab labels on single line",
      "min-w-fit - Ensures tabs don't get too narrow"
    ]
  },

  prohibitedPatterns: {
    description: "Patterns that are explicitly forbidden and will be rejected",
    
    examples: [
      {
        violation: "Hardcoded individual tabs",
        wrong: `
// ❌ WRONG - This is prohibited
<TabsList>
  <TabsTrigger value="tab1">{t('tab1.title')}</TabsTrigger>
  <TabsTrigger value="tab2">{t('tab2.title')}</TabsTrigger>
</TabsList>

<TabsContent value="tab1">
  <Tab1Component />
</TabsContent>
<TabsContent value="tab2">
  <Tab2Component />
</TabsContent>`,
        correct: `
// ✅ CORRECT - Use dynamic array mapping
{tabs.map((tab) => (
  <TabsTrigger key={tab.value} value={tab.value}>
    {tab.label}
  </TabsTrigger>
))}

{tabs.map((tab) => (
  <TabsContent key={tab.value} value={tab.value}>
    {tab.component}
  </TabsContent>
))}`
      },
      {
        violation: "Different styling classes",
        wrong: `
// ❌ WRONG - Missing required classes
<TabsList className="flex gap-2">

// ❌ WRONG - Different active state
<TabsTrigger className="data-[state=active]:bg-background">

// ❌ WRONG - Missing wrapper div
<Tabs>
  <TabsList>`,
        correct: `
// ✅ CORRECT - Use exact classes from pattern
<div className="w-full">
  <TabsList className={cn(
    "inline-flex h-auto w-full flex-wrap justify-start bg-muted p-1",
    "gap-1"
  )}>
    <TabsTrigger className={cn(
      "flex-shrink-0 whitespace-nowrap px-3 py-1.5",
      "data-[state=active]:text-foreground",
      "min-w-fit"
    )}>`
      },
      {
        violation: "Incorrect translation structure",
        wrong: `
// ❌ WRONG - Direct translation calls
label: t('standard_types')

// ❌ WRONG - Inconsistent namespace
const t = useTranslations('StandardTypes');`,
        correct: `
// ✅ CORRECT - Nested tab structure
label: t('tabs.standard_types')

// ✅ CORRECT - Configuration namespace
const t = useTranslations('ProductConfiguration');`
      }
    ]
  },

  translationStructure: {
    description: "Standardized translation structure for configuration tabs",
    
    englishStructure: `
{
  "ProductConfiguration": {
    "page_title": "Product Configuration",
    "page_description": "Manage product types, colors, and specifications",
    "tabs": {
      "standard_types": "Standard Types",
      "chemistry_types": "Chemistry Types",
      "color_codes": "Color Codes",
      "finish_types": "Finish Types",
      "metallic_types": "Metallic Types",
      "light_specifications": "Light Specifications"
    },
    "standard_types": {
      "title": "Standard Types",
      "description": "Manage standard product types and classifications"
    },
    "chemistry_types": {
      "title": "Chemistry Types", 
      "description": "Configure chemical composition categories"
    }
    // ... more tab content
  }
}`,

    spanishStructure: `
{
  "ProductConfiguration": {
    "page_title": "Configuración de Productos",
    "page_description": "Gestionar tipos de productos, colores y especificaciones",
    "tabs": {
      "standard_types": "Tipos Estándar",
      "chemistry_types": "Tipos de Química",
      "color_codes": "Códigos de Color", 
      "finish_types": "Tipos de Acabado",
      "metallic_types": "Tipos Metálicos",
      "light_specifications": "Especificaciones de Luz"
    },
    "standard_types": {
      "title": "Tipos Estándar",
      "description": "Gestionar tipos de productos estándar y clasificaciones"
    }
    // ... more Spanish translations
  }
}`,

    translationRequirements: [
      "Use nested namespace structure: ConfigurationName.tabs.tab_key",
      "Provide complete translations in both English and Spanish",
      "Include page-level titles and descriptions",
      "Add individual tab titles and descriptions for content",
      "Use consistent key naming across all configuration pages",
      "Follow breadcrumb integration patterns"
    ]
  },

  fileStructure: {
    description: "Required directory structure for configuration pages",
    
    structure: `
src/features/[configuration-name]/
├── components/
│   ├── [configuration-name]-tabs.tsx     # Main tabs component (follows law pattern)
│   ├── configuration-table.tsx           # Reusable table component
│   ├── configuration-item-dialog.tsx     # Reusable dialog component
│   └── tabs/
│       ├── tab-name-1-tab.tsx
│       ├── tab-name-2-tab.tsx
│       ├── tab-name-3-tab.tsx
│       ├── tab-name-4-tab.tsx
│       ├── tab-name-5-tab.tsx
│       └── tab-name-6-tab.tsx`,

    namingConventions: [
      "Main tabs component: [configuration-name]-tabs.tsx",
      "Individual tabs: [tab-name]-tab.tsx (kebab-case)",
      "Reusable components: configuration-table.tsx, configuration-item-dialog.tsx",
      "Feature directory: [configuration-name] (kebab-case)",
      "Translation namespace: PascalCase (e.g., ProductConfiguration)"
    ]
  },

  benefitsOfPattern: {
    maintainability: [
      "Easy to add/remove tabs by modifying the array",
      "Consistent structure across all configuration pages", 
      "DRY principle - no repeated JSX",
      "Single point of truth for tab definitions"
    ],

    scalability: [
      "New tabs added with just array entry",
      "Translations automatically handled",
      "Component imports clearly organized",
      "No structural changes needed for new tabs"
    ],

    consistency: [
      "Uniform styling across all configuration pages",
      "Predictable behavior for developers",
      "Standard responsive design patterns",
      "Consistent user experience"
    ],

    developerExperience: [
      "Clear separation of concerns",
      "Easy to understand and modify",
      "Self-documenting structure",
      "Type-safe with TypeScript"
    ]
  },

  implementationChecklist: [
    "✅ Uses dynamic tabs array structure",
    "✅ Follows exact styling classes from law pattern",
    "✅ Includes wrapper <div className=\"w-full\">",
    "✅ Uses correct TabsTrigger classes with flex-shrink-0 whitespace-nowrap px-3 py-1.5",
    "✅ Uses data-[state=active]:text-foreground for active state",
    "✅ Uses mt-6 spacing on TabsContent",
    "✅ Imports organized according to pattern",
    "✅ Translations follow namespace structure",
    "✅ Both English and Spanish translations provided",
    "✅ Individual tab components follow configuration table pattern"
  ],

  enforcementGuidelines: {
    codeReview: [
      "Flag any deviation from this pattern during code review",
      "Require corrections before merge approval",
      "Reference this document in review feedback",
      "Ensure compliance across all configuration pages"
    ],

    qualityAssurance: [
      "Test responsive behavior on different screen sizes",
      "Verify tab wrapping works correctly",
      "Check translation completeness in both locales",
      "Validate consistent styling across pages"
    ],

    compliance: [
      "This pattern is MANDATORY for all configuration-related tab implementations",
      "No exceptions without architectural review and approval",
      "Regular audits to ensure ongoing compliance",
      "Documentation updates require pattern updates"
    ]
  },

  exampleImplementations: {
    compliant: [
      "✅ /src/features/product-configuration/components/product-configuration-tabs.tsx (Law Pattern)",
      "✅ All configuration pages should follow this exact structure"
    ],

    requiresUpdate: [
      "⚠️ Any existing configuration tabs not following this pattern",
      "⚠️ Legacy implementations with hardcoded tabs",
      "⚠️ Components with non-standard styling"
    ]
  }
};

export default configurationTabsPattern;