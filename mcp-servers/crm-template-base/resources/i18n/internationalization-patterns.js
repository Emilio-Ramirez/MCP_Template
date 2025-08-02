export default `# Internationalization Patterns - Global Enterprise Applications

This document establishes **COMPREHENSIVE** internationalization (i18n) patterns for enterprise applications using next-intl, providing seamless multi-language support with type safety and advanced localization features.

## Overview

Enterprise internationalization requires robust translation management, locale-specific formatting, dynamic language switching, and type-safe translation keys. This pattern enables global enterprise applications with professional localization capabilities.

## Core i18n Architecture

### 1. Next-intl Configuration

\`\`\`tsx
// src/i18n/config.ts - Main internationalization configuration

import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Supported locales configuration
export const locales = ['en', 'es', 'fr', 'de', 'pt', 'it'] as const;
export type Locale = typeof locales[number];

// Default locale
export const defaultLocale: Locale = 'en';

// Locale configuration with metadata
export const localeConfig = {
  en: {
    label: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
    dateFormat: 'MM/dd/yyyy',
    timeFormat: '12h',
    currency: 'USD',
  },
  es: {
    label: 'Español',
    flag: '🇪🇸',
    dir: 'ltr',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24h',
    currency: 'EUR',
  },
  fr: {
    label: 'Français',
    flag: '🇫🇷',
    dir: 'ltr',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24h',
    currency: 'EUR',
  },
  de: {
    label: 'Deutsch',
    flag: '🇩🇪',
    dir: 'ltr',
    dateFormat: 'dd.MM.yyyy',
    timeFormat: '24h',
    currency: 'EUR',
  },
  pt: {
    label: 'Português',
    flag: '🇧🇷',
    dir: 'ltr',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24h',
    currency: 'BRL',
  },
  it: {
    label: 'Italiano',
    flag: '🇮🇹',
    dir: 'ltr',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24h',
    currency: 'EUR',
  },
} as const;

// Next-intl request configuration
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    messages: (await import(\`../messages/\${locale}.json\`)).default,
    timeZone: 'UTC',
    now: new Date(),
    formats: {
      dateTime: {
        short: {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
        long: {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        },
      },
      number: {
        currency: {
          style: 'currency',
          currency: localeConfig[locale as Locale].currency,
        },
        percent: {
          style: 'percent',
          minimumFractionDigits: 1,
          maximumFractionDigits: 2,
        },
      },
    },
  };
});
\`\`\`

### 2. Routing Configuration

\`\`\`tsx
// src/middleware.ts - Locale routing middleware

import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale,
  
  // Locale detection configuration
  localeDetection: true,
  
  // Locale prefix strategy
  localePrefix: 'as-needed', // Only show prefix for non-default locales
  
  // Alternative hosts for different locales (optional)
  // alternateLinks: false,
  
  // Path names that should be localized
  pathnames: {
    '/': '/',
    '/requests': {
      en: '/requests',
      es: '/solicitudes',
      fr: '/demandes',
      de: '/anfragen',
      pt: '/solicitacoes',
      it: '/richieste',
    },
    '/requests/new': {
      en: '/requests/new',
      es: '/solicitudes/nueva',
      fr: '/demandes/nouvelle',
      de: '/anfragen/neu',
      pt: '/solicitacoes/nova',
      it: '/richieste/nuova',
    },
    '/analytics': {
      en: '/analytics',
      es: '/analiticas',
      fr: '/analytique',
      de: '/analytik',
      pt: '/analiticas',
      it: '/analitiche',
    },
    '/settings': {
      en: '/settings',
      es: '/configuracion',
      fr: '/parametres',
      de: '/einstellungen',
      pt: '/configuracoes',
      it: '/impostazioni',
    },
  },
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en|es|fr|pt|it)/:path*'],
};
\`\`\`

### 3. App Router Layout Integration

\`\`\`tsx
// app/[locale]/layout.tsx - Internationalized root layout

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales, localeConfig } from '@/i18n/config';
import { notFound } from 'next/navigation';

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Fetch messages for the locale
  const messages = await getMessages();
  
  // Get locale configuration
  const config = localeConfig[locale as keyof typeof localeConfig];

  return (
    <html lang={locale} dir={config.dir}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
\`\`\`

## Message Organization Patterns

### 1. Hierarchical Message Structure

\`\`\`json
// messages/en.json - English translations with hierarchical organization
{
  "common": {
    "actions": {
      "save": "Save",
      "cancel": "Cancel",
      "edit": "Edit",
      "delete": "Delete",
      "create": "Create",
      "update": "Update",
      "view": "View",
      "print": "Print",
      "export": "Export",
      "search": "Search",
      "filter": "Filter",
      "clear": "Clear",
      "refresh": "Refresh",
      "loading": "Loading...",
      "submit": "Submit",
      "reset": "Reset"
    },
    "labels": {
      "name": "Name",
      "email": "Email",
      "phone": "Phone",
      "address": "Address", 
      "date": "Date",
      "status": "Status",
      "priority": "Priority",
      "description": "Description",
      "notes": "Notes",
      "attachments": "Attachments"
    },
    "status": {
      "active": "Active",
      "inactive": "Inactive",
      "pending": "Pending",
      "approved": "Approved",
      "rejected": "Rejected",
      "draft": "Draft",
      "completed": "Completed",
      "in_progress": "In Progress"
    },
    "messages": {
      "success": "Operation completed successfully",
      "error": "An error occurred",
      "warning": "Warning",
      "info": "Information",
      "confirm_delete": "Are you sure you want to delete this item?",
      "unsaved_changes": "You have unsaved changes",
      "no_data": "No data available",
      "loading_error": "Failed to load data"
    }
  },
  "navigation": {
    "dashboard": "Dashboard",
    "requests": "Requests",
    "analytics": "Analytics",
    "users": "Users",
    "settings": "Settings",
    "profile": "Profile",
    "logout": "Logout"
  },
  "requests": {
    "title": "Commercial Requests",
    "subtitle": "Manage your commercial requests",
    "new_request": "New Request",
    "request_details": "Request Details",
    "form": {
      "basic_info": {
        "title": "Basic Information",
        "description": "Enter the basic information for your request",
        "client_name": "Client Name",
        "client_name_placeholder": "Enter client name",
        "laboratory": "Laboratory",
        "urgency": "Urgency Level",
        "urgency_options": {
          "low": "Low",
          "normal": "Normal", 
          "high": "High"
        }
      },
      "request_type": {
        "title": "Request Type",
        "description": "Select the type of request",
        "lwr": "Laboratory Work Request",
        "tlwr": "Testing Laboratory Work Request",
        "vlwr": "Validation Laboratory Work Request"
      },
      "product_spec": {
        "title": "Product Specification",
        "description": "Provide detailed product specifications",
        "specification": "Product Specification",
        "specification_placeholder": "Describe the product specifications",
        "application": "Application Parameters",
        "panel_size": "Panel Size"
      }
    },
    "list": {
      "columns": {
        "id": "Request ID",
        "client": "Client",
        "type": "Type",
        "status": "Status",
        "created": "Created",
        "actions": "Actions"
      },
      "empty": "No requests found",
      "filters": {
        "all": "All Requests",
        "active": "Active",
        "completed": "Completed",
        "pending": "Pending"
      }
    },
    "status": {
      "draft": "Draft",
      "submitted": "Submitted",
      "in_review": "In Review",
      "approved": "Approved",
      "in_progress": "In Progress",
      "completed": "Completed",
      "rejected": "Rejected"
    }
  },
  "analytics": {
    "title": "Analytics Dashboard",
    "subtitle": "Monitor your business performance",
    "metrics": {
      "total_requests": "Total Requests",
      "active_requests": "Active Requests",
      "completion_rate": "Completion Rate",
      "average_time": "Average Processing Time"
    },
    "charts": {
      "requests_over_time": "Requests Over Time",
      "status_distribution": "Status Distribution",
      "client_activity": "Client Activity"
    }
  },
  "settings": {
    "title": "Settings",
    "description": "Manage your account settings and preferences",
    "tabs": {
      "general": "General",
      "security": "Security",
      "notifications": "Notifications",
      "integrations": "Integrations"
    },
    "general": {
      "profile": {
        "title": "Profile Information",
        "description": "Update your personal information"
      },
      "preferences": {
        "title": "Preferences",
        "description": "Customize your experience",
        "language": "Language",
        "timezone": "Timezone",
        "theme": "Theme"
      }
    }
  }
}
\`\`\`

### 2. Type-Safe Translation Keys

\`\`\`tsx
// src/types/i18n.types.ts - Type-safe translation key definitions

import type { AbstractIntlMessages } from 'next-intl';

// Extract message keys from message structure
type Messages = typeof import('../messages/en.json');

// Create nested key paths
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? \`\${K}.\${NestedKeyOf<T[K]>}\`
          : K
        : never;
    }[keyof T]
  : never;

// Translation key type
export type TranslationKey = NestedKeyOf<Messages>;

// Utility type for translation parameters
export type TranslationParams<T extends string> = T extends \`\${string}{\${infer Param}}\${infer Rest}\`
  ? { [K in Param]: string | number } & TranslationParams<Rest>
  : {};

// Examples of usage:
// TranslationKey = "common.actions.save" | "requests.form.basic_info.title" | ...
\`\`\`

### 3. Custom Translation Hooks

\`\`\`tsx
// src/hooks/use-translations.ts - Enhanced translation hooks

import { useTranslations, useLocale, useFormatter } from 'next-intl';
import { useCallback } from 'react';
import type { TranslationKey } from '@/types/i18n.types';

// Enhanced useTranslations with type safety
export function useTypedTranslations<T extends string>(namespace: T) {
  const t = useTranslations(namespace);
  const locale = useLocale();
  
  return {
    t,
    locale,
    // Helper for conditional translations
    tIf: (condition: boolean, key: string, fallback?: string) =>
      condition ? t(key) : fallback || '',
    
    // Helper for pluralization
    tPlural: (count: number, singular: string, plural: string) =>
      count === 1 ? t(singular) : t(plural),
  };
}

// Common translations hook for frequently used keys
export function useCommonTranslations() {
  return useTypedTranslations('common');
}

// Request-specific translations
export function useRequestTranslations() {
  return useTypedTranslations('requests');
}

// Settings translations
export function useSettingsTranslations() {
  return useTypedTranslations('settings');
}

// Formatting utilities hook
export function useLocaleFormatting() {
  const format = useFormatter();
  const locale = useLocale();
  
  return {
    formatDate: useCallback((date: Date | string, options?: any) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format.dateTime(dateObj, options || 'short');
    }, [format]),
    
    formatCurrency: useCallback((amount: number, currency?: string) => {
      return format.number(amount, { 
        style: 'currency', 
        currency: currency || 'USD' 
      });
    }, [format]),
    
    formatPercent: useCallback((value: number) => {
      return format.number(value / 100, { style: 'percent' });
    }, [format]),
    
    formatNumber: useCallback((value: number, options?: any) => {
      return format.number(value, options);
    }, [format]),
    
    formatRelativeTime: useCallback((date: Date | string) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format.relativeTime(dateObj);
    }, [format]),
    
    locale,
  };
}
\`\`\`

## Component Internationalization Patterns

### 1. Internationalized Form Components

\`\`\`tsx
// src/components/forms/internationalized-form.tsx - i18n form patterns

import { useFormContext } from 'react-hook-form';
import { useRequestTranslations, useCommonTranslations } from '@/hooks/use-translations';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InternationalizedFormFieldProps {
  name: string;
  labelKey: string;
  placeholderKey?: string;
  type?: 'text' | 'email' | 'select';
  options?: Array<{ value: string; labelKey: string }>;
  required?: boolean;
}

export function InternationalizedFormField({
  name,
  labelKey,
  placeholderKey,
  type = 'text',
  options = [],
  required = false,
}: InternationalizedFormFieldProps) {
  const form = useFormContext();
  const { t } = useRequestTranslations();
  const { t: tCommon } = useCommonTranslations();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {t(labelKey)}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            {type === 'select' ? (
              <Select 
                value={field.value} 
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue 
                    placeholder={placeholderKey ? t(placeholderKey) : tCommon('actions.select')}
                  />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {t(option.labelKey)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                {...field}
                type={type}
                placeholder={placeholderKey ? t(placeholderKey) : ''}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Usage example
function RequestBasicInfoForm() {
  return (
    <div className="space-y-4">
      <InternationalizedFormField
        name="clientName"
        labelKey="form.basic_info.client_name"
        placeholderKey="form.basic_info.client_name_placeholder"
        required
      />
      
      <InternationalizedFormField
        name="urgency"
        labelKey="form.basic_info.urgency"
        type="select"
        options={[
          { value: 'low', labelKey: 'form.basic_info.urgency_options.low' },
          { value: 'normal', labelKey: 'form.basic_info.urgency_options.normal' },
          { value: 'high', labelKey: 'form.basic_info.urgency_options.high' },
        ]}
        required
      />
    </div>
  );
}
\`\`\`

### 2. Internationalized Data Display

\`\`\`tsx
// src/components/data/internationalized-status-badge.tsx - i18n status display

import { Badge } from '@/components/ui/badge';
import { useRequestTranslations } from '@/hooks/use-translations';
import type { RequestStatus } from '@/types/request.types';

interface StatusBadgeProps {
  status: RequestStatus;
  className?: string;
}

const statusVariants: Record<RequestStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  draft: 'outline',
  submitted: 'secondary',
  in_review: 'default',
  approved: 'default',
  in_progress: 'default',
  completed: 'default',
  rejected: 'destructive',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { t } = useRequestTranslations();

  return (
    <Badge 
      variant={statusVariants[status]} 
      className={className}
    >
      {t(\`status.\${status}\`)}
    </Badge>
  );
}

// Internationalized data table
function InternationalizedRequestsList() {
  const { t } = useRequestTranslations();
  const { formatDate } = useLocaleFormatting();

  const columns = [
    {
      key: 'id',
      label: t('list.columns.id'),
    },
    {
      key: 'clientName',
      label: t('list.columns.client'),
    },
    {
      key: 'status',
      label: t('list.columns.status'),
      render: (status: RequestStatus) => <StatusBadge status={status} />,
    },
    {
      key: 'createdAt',
      label: t('list.columns.created'),
      render: (date: string) => formatDate(date),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={requests}
      emptyMessage={t('list.empty')}
    />
  );
}
\`\`\`

### 3. Language Switcher Component

\`\`\`tsx
// src/components/ui/language-switcher.tsx - Language switching component

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { locales, localeConfig } from '@/i18n/config';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');

  const currentLocaleConfig = localeConfig[locale as keyof typeof localeConfig];

  const switchLanguage = (newLocale: string) => {
    // Replace the locale in the current path
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as any)) {
      segments[1] = newLocale;
    } else {
      segments.unshift('', newLocale);
    }
    
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Globe className="h-4 w-4 mr-2" />
          <span className="mr-1">{currentLocaleConfig.flag}</span>
          {currentLocaleConfig.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => {
          const config = localeConfig[loc];
          return (
            <DropdownMenuItem
              key={loc}
              onClick={() => switchLanguage(loc)}
              className={loc === locale ? 'bg-accent' : ''}
            >
              <span className="mr-2">{config.flag}</span>
              {config.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
\`\`\`

## Advanced Internationalization Patterns

### 1. Pluralization and Rich Text

\`\`\`tsx
// src/components/ui/internationalized-text.tsx - Advanced text rendering

import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

interface RichTextProps {
  i18nKey: string;
  values?: Record<string, string | number | ReactNode>;
  components?: Record<string, (chunks: ReactNode) => ReactNode>;
}

export function RichText({ i18nKey, values, components }: RichTextProps) {
  const t = useTranslations();

  return (
    <>
      {t.rich(i18nKey, {
        ...values,
        ...components,
      })}
    </>
  );
}

// Usage examples in messages
/*
{
  "requests": {
    "notifications": {
      "created": "Request <bold>{requestId}</bold> has been created for <link>{clientName}</link>",
      "status_changed": "Status changed to <status>{status}</status>",
      "items_selected": "{count, plural, =0 {No items} =1 {One item} other {# items}} selected"
    }
  }
}
*/

function RequestNotification({ requestId, clientName }: any) {
  return (
    <RichText
      i18nKey="requests.notifications.created"
      values={{ requestId, clientName }}
      components={{
        bold: (chunks) => <strong className="font-semibold">{chunks}</strong>,
        link: (chunks) => (
          <Link href={\`/clients/\${clientName}\`} className="text-primary hover:underline">
            {chunks}
          </Link>
        ),
      }}
    />
  );
}
\`\`\`

### 2. Date and Number Formatting

\`\`\`tsx
// src/components/ui/formatted-content.tsx - Formatted content components

import { useLocaleFormatting } from '@/hooks/use-translations';

interface FormattedDateProps {
  date: Date | string;
  format?: 'short' | 'long' | 'relative';
}

export function FormattedDate({ date, format = 'short' }: FormattedDateProps) {
  const { formatDate, formatRelativeTime } = useLocaleFormatting();

  if (format === 'relative') {
    return <span>{formatRelativeTime(date)}</span>;
  }

  return <span>{formatDate(date, format)}</span>;
}

interface FormattedCurrencyProps {
  amount: number;
  currency?: string;
}

export function FormattedCurrency({ amount, currency }: FormattedCurrencyProps) {
  const { formatCurrency } = useLocaleFormatting();
  
  return <span>{formatCurrency(amount, currency)}</span>;
}

interface FormattedNumberProps {
  value: number;
  style?: 'decimal' | 'percent';
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function FormattedNumber({ 
  value, 
  style = 'decimal',
  minimumFractionDigits,
  maximumFractionDigits 
}: FormattedNumberProps) {
  const { formatNumber, formatPercent } = useLocaleFormatting();

  if (style === 'percent') {
    return <span>{formatPercent(value)}</span>;
  }

  return (
    <span>
      {formatNumber(value, {
        minimumFractionDigits,
        maximumFractionDigits,
      })}
    </span>
  );
}
\`\`\`

### 3. SEO and Metadata Internationalization

\`\`\`tsx
// app/[locale]/requests/page.tsx - Internationalized metadata

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface RequestsPageProps {
  params: { locale: string };
}

export async function generateMetadata({ 
  params: { locale } 
}: RequestsPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'requests' });

  return {
    title: t('title'),
    description: t('subtitle'),
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      locale: locale,
    },
    alternates: {
      languages: {
        'en': '/en/requests',
        'es': '/es/solicitudes',
        'fr': '/fr/demandes',
        'de': '/de/anfragen',
        'pt': '/pt/solicitacoes',
        'it': '/it/richieste',
      },
    },
  };
}

export default function RequestsPage({ params: { locale } }: RequestsPageProps) {
  return (
    <div>
      <RequestsList />
    </div>
  );
}
\`\`\`

## Implementation Guidelines

### MUST DO:
1. Use next-intl for comprehensive internationalization
2. Organize translations hierarchically by feature
3. Implement type-safe translation keys
4. Create reusable internationalized components
5. Use proper locale formatting for dates, numbers, and currency
6. Implement language switching with URL persistence
7. Provide SEO-friendly internationalized metadata

### MUST NOT DO:
1. Hard-code user-facing text in components
2. Skip locale-specific formatting for data display
3. Ignore RTL language support when needed
4. Mix translation libraries or approaches
5. Skip pluralization for count-based messages
6. Forget to internationalize error messages
7. Use string concatenation for translated content

## Benefits of Comprehensive i18n

### 1. Global Reach
- Support for multiple markets and regions
- Professional localization capabilities
- Cultural adaptation beyond translation
- Compliance with local regulations

### 2. User Experience
- Native language support improves usability
- Locale-appropriate formatting reduces confusion
- Cultural sensitivity in content presentation
- Accessibility improvements for diverse users

### 3. Maintainability
- Centralized translation management
- Type-safe translation keys prevent errors
- Consistent formatting across the application
- Easy addition of new languages

### 4. SEO Benefits
- Multi-language URL structure
- Proper hreflang implementation
- Localized metadata and content
- Better search engine visibility globally

This internationalization pattern is **MANDATORY** for enterprise applications targeting global markets, ensuring professional localization and excellent user experience across all supported languages.`;