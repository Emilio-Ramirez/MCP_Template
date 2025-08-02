/**
 * Next.js Routing Architecture Implementation Guide
 * 
 * Internationalization routing with next-intl, authentication flow with Clerk integration,
 * locale-aware URL structure with "as-needed" prefix, middleware architecture for protected routes,
 * and best practices for route organization.
 * 
 * @category System Architecture
 * @complexity Advanced
 * @tags routing, nextjs, internationalization, authentication, middleware
 */

export const nextjsRoutingArchitecture = {
  id: "nextjs-routing-architecture",
  name: "Next.js Routing Architecture",
  description: "Internationalization routing with next-intl, authentication flow with Clerk integration, locale-aware URL structure with 'as-needed' prefix, middleware architecture for protected routes, and best practices for route organization",
  
  // Core Architecture Overview
  architectureOverview: {
    description: "Comprehensive Next.js routing system with internationalization, authentication, and advanced middleware patterns",
    coreComponents: [
      "App Router Structure - Next.js 13+ app directory routing",
      "Internationalization Layer - next-intl integration with locale management",
      "Authentication Middleware - Clerk integration with protected routes",
      "Route Protection System - Role-based access control for routes",
      "Locale-Aware URLs - As-needed prefix system for clean URLs",
      "Layout Hierarchy - Nested layouts with proper data fetching"
    ],
    keyFeatures: [
      "Internationalization with next-intl and automatic locale detection",
      "Authentication flow with Clerk integration and protected routes",
      "Locale-aware URL structure with 'as-needed' prefix strategy",
      "Middleware architecture for route protection and redirects",
      "Type-safe routing with proper TypeScript integration",
      "SEO-optimized URL structure with proper metadata handling",
      "Role-based access control at the route level",
      "Parallel routes and intercepting routes for advanced UX"
    ]
  },

  // App Router Structure
  appRouterStructure: {
    description: "Modern Next.js 13+ app directory structure with proper organization",
    structure: `// App Directory Structure
app/
├── [locale]/                          # Internationalization wrapper
│   ├── (auth)/                        # Route groups for organization
│   │   ├── sign-in/
│   │   │   └── page.tsx              # /en/sign-in, /es/sign-in
│   │   ├── sign-up/
│   │   │   └── page.tsx              # /en/sign-up, /es/sign-up
│   │   └── layout.tsx                # Auth layout (no sidebar)
│   │
│   ├── (dashboard)/                   # Protected dashboard routes
│   │   ├── clients/
│   │   │   ├── page.tsx              # /en/clients
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx          # /en/clients/123
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx      # /en/clients/123/edit
│   │   │   └── new/
│   │   │       └── page.tsx          # /en/clients/new
│   │   │
│   │   ├── requests/
│   │   │   ├── page.tsx              # /en/requests
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx          # /en/requests/req-123
│   │   │   └── new/
│   │   │       ├── page.tsx          # /en/requests/new
│   │   │       └── [type]/
│   │   │           └── page.tsx      # /en/requests/new/lwr
│   │   │
│   │   ├── admin/
│   │   │   ├── users/
│   │   │   │   ├── page.tsx          # /en/admin/users
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # /en/admin/users/user-123
│   │   │   ├── settings/
│   │   │   │   └── page.tsx          # /en/admin/settings
│   │   │   └── layout.tsx            # Admin-specific layout
│   │   │
│   │   └── layout.tsx                # Main dashboard layout
│   │
│   ├── api/                          # API routes (not locale-specific)
│   │   ├── clients/
│   │   │   ├── route.ts              # /api/clients
│   │   │   └── [id]/
│   │   │       └── route.ts          # /api/clients/123
│   │   ├── requests/
│   │   │   └── route.ts              # /api/requests
│   │   └── webhooks/
│   │       └── clerk/
│   │           └── route.ts          # /api/webhooks/clerk
│   │
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout with providers
│   ├── page.tsx                      # Home page /en, /es
│   ├── loading.tsx                   # Global loading UI
│   ├── error.tsx                     # Global error UI
│   └── not-found.tsx                 # 404 page
│
├── middleware.ts                     # Route protection and i18n
├── next.config.js                    # Next.js configuration
└── i18n.ts                          # Internationalization config`,
    implementation: `// app/[locale]/layout.tsx - Root Layout with Providers
import { ClerkProvider } from '@clerk/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { Metadata } from 'next';

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const messages = await getMessages({ locale });
  
  return {
    title: {
      template: '%s | ERP System',
      default: 'ERP System'
    },
    description: 'Enterprise Resource Planning System',
    alternates: {
      languages: {
        'en': '/en',
        'es': '/es',
        'x-default': '/en'
      }
    }
  };
}

export default async function RootLayout({
  children,
  params: { locale }
}: RootLayoutProps) {
  // Validate locale
  const locales = ['en', 'es', 'fr'];
  if (!locales.includes(locale)) {
    notFound();
  }

  // Load messages for the current locale
  const messages = await getMessages({ locale });

  return (
    <ClerkProvider>
      <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <body>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

// app/[locale]/(dashboard)/layout.tsx - Dashboard Layout
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/navigation/Sidebar';
import { Header } from '@/components/navigation/Header';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function DashboardLayout({
  children,
  params: { locale }
}: DashboardLayoutProps) {
  const user = await currentUser();
  
  if (!user) {
    redirect(\`/\${locale}/sign-in\`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar locale={locale} user={user} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header locale={locale} user={user} />
          
          <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Breadcrumbs locale={locale} />
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}`
  },

  // Internationalization with next-intl
  internationalization: {
    description: "Complete i18n setup with next-intl and locale-aware routing",
    implementation: `// i18n.ts - Configuration
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
const locales = ['en', 'es', 'fr'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(\`../messages/\${locale}.json\`)).default
  };
});

// next.config.js - Next.js Configuration
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);

// middleware.ts - Routing and Protection Middleware
import createMiddleware from 'next-intl/middleware';
import { authMiddleware } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'es', 'fr'];
const defaultLocale = 'en';

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed' // Only add prefix for non-default locales
});

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/sign-in',
  '/sign-up',
  '/api/webhooks/clerk'
];

// Define admin routes that require admin role
const adminRoutes = [
  '/admin'
];

export default authMiddleware({
  beforeAuth: (req) => {
    // Run the intl middleware before auth middleware
    return intlMiddleware(req);
  },
  
  publicRoutes: [
    // Add locale prefixes to public routes
    ...publicRoutes,
    ...publicRoutes.flatMap(route => 
      locales.map(locale => \`/\${locale}\${route}\`)
    ),
    // API routes and static files
    '/api/(.*)',
    '/_next/(.*)',
    '/favicon.ico'
  ],
  
  afterAuth(auth, req, evt) {
    const { pathname } = req.nextUrl;
    const locale = getLocaleFromPathname(pathname) || defaultLocale;
    
    // Handle unauthenticated users
    if (!auth.userId && !isPublicRoute(pathname)) {
      const signInUrl = new URL(\`/\${locale}/sign-in\`, req.url);
      signInUrl.searchParams.set('redirect_url', pathname);
      return NextResponse.redirect(signInUrl);
    }
    
    // Handle admin routes
    if (auth.userId && isAdminRoute(pathname)) {
      const userRole = auth.sessionClaims?.metadata?.role;
      if (userRole !== 'admin') {
        return NextResponse.redirect(new URL(\`/\${locale}/unauthorized\`, req.url));
      }
    }
    
    // Handle authenticated users accessing auth pages
    if (auth.userId && isAuthPage(pathname)) {
      return NextResponse.redirect(new URL(\`/\${locale}\`, req.url));
    }
    
    return NextResponse.next();
  }
});

// Helper functions
function getLocaleFromPathname(pathname: string): string | null {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  return locales.includes(potentialLocale) ? potentialLocale : null;
}

function isPublicRoute(pathname: string): boolean {
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
  return publicRoutes.some(route => {
    if (route === pathWithoutLocale) return true;
    if (route.endsWith('(.*)')) {
      const baseRoute = route.replace('(.*)', '');
      return pathWithoutLocale.startsWith(baseRoute);
    }
    return false;
  });
}

function isAdminRoute(pathname: string): boolean {
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
  return adminRoutes.some(route => pathWithoutLocale.startsWith(route));
}

function isAuthPage(pathname: string): boolean {
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
  return ['/sign-in', '/sign-up'].includes(pathWithoutLocale);
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};

// messages/en.json - English Messages
{
  "navigation": {
    "dashboard": "Dashboard",
    "clients": "Clients",
    "requests": "Requests",
    "admin": "Administration",
    "settings": "Settings"
  },
  "pages": {
    "clients": {
      "title": "Client Management",
      "description": "Manage your clients and their information",
      "actions": {
        "add": "Add Client",
        "edit": "Edit Client",
        "delete": "Delete Client",
        "export": "Export Data"
      }
    },
    "requests": {
      "title": "Request Management",
      "description": "Track and manage all requests",
      "types": {
        "lwr": "Lab Work Request",
        "tlwr": "Testing Lab Work Request",
        "vlwr": "Vitracoat Lab Work Request"
      }
    }
  },
  "auth": {
    "signIn": {
      "title": "Sign in to your account",
      "subtitle": "Welcome back! Please sign in to continue."
    },
    "signUp": {
      "title": "Create your account",
      "subtitle": "Get started by creating a new account."
    }
  }
}

// messages/es.json - Spanish Messages
{
  "navigation": {
    "dashboard": "Panel",
    "clients": "Clientes",
    "requests": "Solicitudes",
    "admin": "Administración",
    "settings": "Configuración"
  },
  "pages": {
    "clients": {
      "title": "Gestión de Clientes",
      "description": "Gestiona tus clientes y su información",
      "actions": {
        "add": "Agregar Cliente",
        "edit": "Editar Cliente",
        "delete": "Eliminar Cliente",
        "export": "Exportar Datos"
      }
    }
  }
}`
  },

  // Authentication Integration with Clerk
  authenticationIntegration: {
    description: "Comprehensive Clerk authentication setup with role-based access",
    implementation: `// lib/auth.ts - Authentication Utilities
import { auth, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export interface UserRole {
  id: string;
  name: string;
  permissions: string[];
}

export interface UserMetadata {
  role: string;
  department?: string;
  clientAccess?: string[];
  permissions: string[];
}

export async function requireAuth(locale: string = 'en') {
  const { userId } = auth();
  if (!userId) {
    redirect(\`/\${locale}/sign-in\`);
  }
  return userId;
}

export async function requireRole(requiredRole: string, locale: string = 'en') {
  const user = await currentUser();
  if (!user) {
    redirect(\`/\${locale}/sign-in\`);
  }
  
  const userRole = user.publicMetadata?.role as string;
  if (userRole !== requiredRole) {
    redirect(\`/\${locale}/unauthorized\`);
  }
  
  return user;
}

export async function requirePermission(permission: string, locale: string = 'en') {
  const user = await currentUser();
  if (!user) {
    redirect(\`/\${locale}/sign-in\`);
  }
  
  const userPermissions = user.publicMetadata?.permissions as string[] || [];
  if (!userPermissions.includes(permission)) {
    redirect(\`/\${locale}/unauthorized\`);
  }
  
  return user;
}

export async function getUserMetadata(): Promise<UserMetadata | null> {
  const user = await currentUser();
  if (!user) return null;
  
  return {
    role: user.publicMetadata?.role as string || 'user',
    department: user.publicMetadata?.department as string,
    clientAccess: user.publicMetadata?.clientAccess as string[],
    permissions: user.publicMetadata?.permissions as string[] || []
  };
}

// app/[locale]/(auth)/sign-in/page.tsx - Sign In Page
import { SignIn } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

interface SignInPageProps {
  params: { locale: string };
  searchParams: { redirect_url?: string };
}

export default function SignInPage({ params: { locale }, searchParams }: SignInPageProps) {
  const t = useTranslations('auth.signIn');
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('subtitle')}
          </p>
        </div>
        <SignIn 
          path={\`/\${locale}/sign-in\`}
          routing="path"
          signUpUrl={\`/\${locale}/sign-up\`}
          redirectUrl={searchParams.redirect_url || \`/\${locale}\`}
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-blue-600 hover:bg-blue-700 text-sm normal-case"
            }
          }}
        />
      </div>
    </div>
  );
}

// app/[locale]/(dashboard)/admin/users/page.tsx - Protected Admin Page
import { requireRole } from '@/lib/auth';
import { UserManagement } from '@/components/admin/UserManagement';
import { useTranslations } from 'next-intl';

interface AdminUsersPageProps {
  params: { locale: string };
}

export default async function AdminUsersPage({ params: { locale } }: AdminUsersPageProps) {
  // Ensure user is admin
  await requireRole('admin', locale);
  
  const t = useTranslations('pages.admin.users');
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{t('title')}</h1>
        <p className="mt-2 text-sm text-gray-700">{t('description')}</p>
      </div>
      
      <UserManagement locale={locale} />
    </div>
  );
}

// components/auth/RoleGuard.tsx - Client-side Role Protection
'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermission?: string;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function RoleGuard({
  children,
  requiredRole,
  requiredPermission,
  fallback,
  redirectTo
}: RoleGuardProps) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
      return;
    }

    if (isLoaded && user) {
      const userRole = user.publicMetadata?.role as string;
      const userPermissions = user.publicMetadata?.permissions as string[] || [];

      if (requiredRole && userRole !== requiredRole) {
        if (redirectTo) {
          router.push(redirectTo);
        }
        return;
      }

      if (requiredPermission && !userPermissions.includes(requiredPermission)) {
        if (redirectTo) {
          router.push(redirectTo);
        }
        return;
      }
    }
  }, [user, isLoaded, requiredRole, requiredPermission, redirectTo, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return fallback || null;
  }

  const userRole = user.publicMetadata?.role as string;
  const userPermissions = user.publicMetadata?.permissions as string[] || [];

  if (requiredRole && userRole !== requiredRole) {
    return fallback || <div>Access denied</div>;
  }

  if (requiredPermission && !userPermissions.includes(requiredPermission)) {
    return fallback || <div>Access denied</div>;
  }

  return <>{children}</>;
}`
  },

  // Locale-Aware URL Structure
  localeAwareUrls: {
    description: "As-needed prefix system for clean, SEO-friendly URLs",
    implementation: `// lib/navigation.ts - Type-safe Navigation Utilities
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'es', 'fr'] as const;
export const defaultLocale = 'en' as const;

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
  localePrefix: 'as-needed' // Only prefix non-default locales
});

// Custom hook for locale-aware navigation
export function useLocaleRouter() {
  const router = useRouter();
  const pathname = usePathname();
  
  return {
    push: (href: string, options?: { locale?: string }) => {
      router.push(href, options);
    },
    
    replace: (href: string, options?: { locale?: string }) => {
      router.replace(href, options);
    },
    
    prefetch: (href: string, options?: { locale?: string }) => {
      router.prefetch(href, options);
    },
    
    back: () => router.back(),
    forward: () => router.forward(),
    refresh: () => router.refresh(),
    
    // Get current path without locale prefix
    getPathname: () => pathname,
    
    // Generate localized URLs
    getLocalizedUrl: (path: string, locale?: string) => {
      if (!locale || locale === defaultLocale) {
        return path;
      }
      return \`/\${locale}\${path}\`;
    }
  };
}

// components/navigation/LocaleSwitch.tsx - Language Switcher
'use client';

import { useLocale } from 'next-intl';
import { usePathname } from '@/lib/navigation';
import { locales } from '@/lib/navigation';
import { Globe } from 'lucide-react';

const localeNames = {
  en: 'English',
  es: 'Español',
  fr: 'Français'
};

export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();

  const createHref = (newLocale: string) => {
    if (newLocale === 'en') {
      return pathname;
    }
    return \`/\${newLocale}\${pathname}\`;
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors">
        <Globe className="w-4 h-4" />
        <span>{localeNames[locale as keyof typeof localeNames]}</span>
      </button>
      
      <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-1">
          {locales.map((loc) => (
            <a
              key={loc}
              href={createHref(loc)}
              className={cn(
                "block px-4 py-2 text-sm transition-colors",
                locale === loc 
                  ? "bg-blue-50 text-blue-700 font-medium" 
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              {localeNames[loc]}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// components/navigation/LocalizedLink.tsx - Enhanced Link Component
'use client';

import { Link as NextIntlLink } from '@/lib/navigation';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

interface LocalizedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  locale?: string;
  preserveQuery?: boolean;
  external?: boolean;
}

export function LocalizedLink({
  href,
  children,
  className,
  locale,
  preserveQuery = false,
  external = false,
  ...props
}: LocalizedLinkProps) {
  const currentLocale = useLocale();
  const targetLocale = locale || currentLocale;

  // Handle external links
  if (external || href.startsWith('http')) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextIntlLink
      href={href}
      locale={targetLocale}
      className={className}
      {...props}
    >
      {children}
    </NextIntlLink>
  );
}

// lib/metadata.ts - SEO and Metadata Helpers
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface GenerateMetadataProps {
  locale: string;
  path: string;
  titleKey?: string;
  descriptionKey?: string;
  params?: Record<string, string>;
}

export async function generateLocalizedMetadata({
  locale,
  path,
  titleKey = 'title',
  descriptionKey = 'description',
  params = {}
}: GenerateMetadataProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: path });
  
  const title = t(titleKey);
  const description = t(descriptionKey);
  
  return {
    title,
    description,
    alternates: {
      languages: {
        'en': locale === 'en' ? path : \`/en\${path}\`,
        'es': locale === 'es' ? path : \`/es\${path}\`,
        'fr': locale === 'fr' ? path : \`/fr\${path}\`,
        'x-default': locale === 'en' ? path : \`/en\${path}\`
      }
    },
    openGraph: {
      title,
      description,
      locale,
      alternateLocale: locales.filter(l => l !== locale)
    }
  };
}`
  },

  // Advanced Route Patterns
  advancedRoutePatterns: {
    description: "Parallel routes, intercepting routes, and dynamic routing patterns",
    implementation: `// Parallel Routes Example
// app/[locale]/(dashboard)/clients/@modal/(.)new/page.tsx - Intercepting Route
import { Modal } from '@/components/ui/Modal';
import { ClientForm } from '@/components/clients/ClientForm';

interface InterceptedNewClientPageProps {
  params: { locale: string };
}

export default function InterceptedNewClientPage({ params: { locale } }: InterceptedNewClientPageProps) {
  return (
    <Modal>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Client</h2>
        <ClientForm locale={locale} />
      </div>
    </Modal>
  );
}

// app/[locale]/(dashboard)/clients/layout.tsx - Layout with Parallel Routes
interface ClientsLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { locale: string };
}

export default function ClientsLayout({ children, modal, params }: ClientsLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

// Dynamic Route Segments with Validation
// app/[locale]/(dashboard)/requests/[id]/page.tsx
import { notFound } from 'next/navigation';
import { getRequest } from '@/lib/api/requests';
import { RequestDetails } from '@/components/requests/RequestDetails';

interface RequestPageProps {
  params: { 
    locale: string; 
    id: string; 
  };
}

// Generate static params for known requests (optional)
export async function generateStaticParams() {
  // Return common request IDs for static generation
  return [
    { id: 'req-1' },
    { id: 'req-2' },
    // ... more common IDs
  ];
}

export default async function RequestPage({ params: { locale, id } }: RequestPageProps) {
  // Validate request ID format
  if (!/^req-[a-zA-Z0-9]+$/.test(id)) {
    notFound();
  }

  const request = await getRequest(id);
  
  if (!request) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <RequestDetails request={request} locale={locale} />
    </div>
  );
}

// Multiple Dynamic Segments
// app/[locale]/(dashboard)/requests/new/[type]/page.tsx
import { notFound } from 'next/navigation';
import { RequestForm } from '@/components/requests/RequestForm';

interface NewRequestPageProps {
  params: { 
    locale: string; 
    type: string; 
  };
}

const validRequestTypes = ['lwr', 'tlwr', 'vlwr', 'micro-production'];

export async function generateStaticParams() {
  return validRequestTypes.map(type => ({ type }));
}

export default function NewRequestPage({ params: { locale, type } }: NewRequestPageProps) {
  if (!validRequestTypes.includes(type)) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          New {type.toUpperCase()} Request
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Create a new {type} request with the required information.
        </p>
      </div>
      
      <RequestForm type={type} locale={locale} />
    </div>
  );
}

// Catch-all Routes
// app/[locale]/(dashboard)/admin/[...slug]/page.tsx
import { notFound } from 'next/navigation';
import { AdminSection } from '@/components/admin/AdminSection';

interface AdminCatchAllPageProps {
  params: { 
    locale: string; 
    slug: string[]; 
  };
}

const validAdminSections = {
  'users': ['list', 'roles', 'permissions'],
  'settings': ['general', 'security', 'integrations'],
  'reports': ['usage', 'performance', 'audit']
};

export default function AdminCatchAllPage({ params: { locale, slug } }: AdminCatchAllPageProps) {
  const [section, subsection] = slug;
  
  // Validate section exists
  if (!validAdminSections[section as keyof typeof validAdminSections]) {
    notFound();
  }
  
  // Validate subsection if provided
  if (subsection && !validAdminSections[section as keyof typeof validAdminSections].includes(subsection)) {
    notFound();
  }

  return (
    <AdminSection 
      section={section} 
      subsection={subsection} 
      locale={locale}
    />
  );
}`
  },

  // Route-Based Data Fetching
  routeBasedDataFetching: {
    description: "Server components, data fetching, and caching strategies",
    implementation: `// lib/api/clients.ts - API Layer
import { unstable_cache } from 'next/cache';

export interface Client {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
}

// Cached data fetching
export const getClients = unstable_cache(
  async (locale: string): Promise<Client[]> => {
    const response = await fetch(\`\${process.env.API_BASE_URL}/clients\`, {
      headers: {
        'Accept-Language': locale,
        'Authorization': \`Bearer \${process.env.API_TOKEN}\`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch clients');
    }
    
    return response.json();
  },
  ['clients'],
  {
    revalidate: 300, // 5 minutes
    tags: ['clients']
  }
);

export const getClient = unstable_cache(
  async (id: string, locale: string): Promise<Client | null> => {
    const response = await fetch(\`\${process.env.API_BASE_URL}/clients/\${id}\`, {
      headers: {
        'Accept-Language': locale,
        'Authorization': \`Bearer \${process.env.API_TOKEN}\`
      }
    });
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error('Failed to fetch client');
    }
    
    return response.json();
  },
  ['client'],
  {
    revalidate: 60, // 1 minute
    tags: ['clients']
  }
);

// app/[locale]/(dashboard)/clients/page.tsx - Server Component with Data Fetching
import { Suspense } from 'react';
import { getClients } from '@/lib/api/clients';
import { ClientsList } from '@/components/clients/ClientsList';
import { ClientsLoading } from '@/components/clients/ClientsLoading';
import { generateLocalizedMetadata } from '@/lib/metadata';

interface ClientsPageProps {
  params: { locale: string };
  searchParams: { 
    page?: string; 
    search?: string; 
    status?: string; 
  };
}

export async function generateMetadata({ params }: ClientsPageProps) {
  return generateLocalizedMetadata({
    locale: params.locale,
    path: 'pages.clients'
  });
}

export default async function ClientsPage({ params, searchParams }: ClientsPageProps) {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Client Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your clients and their information
          </p>
        </div>
      </div>
      
      <Suspense fallback={<ClientsLoading />}>
        <ClientsData locale={params.locale} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

// Separate component for data fetching to enable proper Suspense boundaries
async function ClientsData({ 
  locale, 
  searchParams 
}: { 
  locale: string; 
  searchParams: ClientsPageProps['searchParams']; 
}) {
  const clients = await getClients(locale);
  
  return (
    <ClientsList 
      clients={clients} 
      locale={locale}
      searchParams={searchParams}
    />
  );
}

// components/clients/ClientsList.tsx - Client Component with Interactivity
'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocaleRouter } from '@/lib/navigation';
import { DataTable } from '@/components/ui/DataTable';
import type { Client } from '@/lib/api/clients';

interface ClientsListProps {
  clients: Client[];
  locale: string;
  searchParams: { page?: string; search?: string; status?: string };
}

export function ClientsList({ clients, locale, searchParams }: ClientsListProps) {
  const router = useLocaleRouter();
  const currentSearchParams = useSearchParams();
  
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  
  // Filter clients based on search params
  const filteredClients = useMemo(() => {
    let filtered = clients;
    
    if (searchParams.search) {
      const search = searchParams.search.toLowerCase();
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(search) ||
        client.email.toLowerCase().includes(search)
      );
    }
    
    if (searchParams.status) {
      filtered = filtered.filter(client => client.status === searchParams.status);
    }
    
    return filtered;
  }, [clients, searchParams]);
  
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(currentSearchParams);
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Reset to first page when filtering
    params.delete('page');
    
    router.push(\`/clients?\${params.toString()}\`);
  };
  
  return (
    <DataTable
      data={filteredClients}
      columns={clientColumns}
      searchParams={searchParams}
      onFilterChange={handleFilterChange}
      selectedRows={selectedClients}
      onSelectionChange={setSelectedClients}
      locale={locale}
    />
  );
}

// Error Boundaries and Loading UI
// app/[locale]/(dashboard)/clients/error.tsx
'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ClientsError({ error, reset }: ErrorProps) {
  const t = useTranslations('common.errors');
  
  useEffect(() => {
    console.error('Clients page error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {t('generic.title')}
        </h2>
        <p className="mt-2 text-gray-600">
          {t('generic.description')}
        </p>
        {error.digest && (
          <p className="mt-1 text-sm text-gray-500">
            Error ID: {error.digest}
          </p>
        )}
      </div>
      
      <div className="flex space-x-3">
        <Button variant="outline" onClick={reset}>
          {t('actions.retry')}
        </Button>
        <Button variant="primary" onClick={() => window.location.reload()}>
          {t('actions.refresh')}
        </Button>
      </div>
    </div>
  );
}

// app/[locale]/(dashboard)/clients/loading.tsx
import { Skeleton } from '@/components/ui/Skeleton';

export default function ClientsLoading() {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      
      <div className="space-y-4">
        <div className="flex space-x-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}`
  },

  // Best Practices and Performance
  bestPractices: {
    description: "Production-ready patterns and performance optimizations",
    guidelines: [
      {
        category: "Route Organization",
        practices: [
          "Use route groups (auth), (dashboard) to organize related routes",
          "Keep layouts as close to the routes that need them as possible",
          "Use meaningful file names that reflect the URL structure",
          "Implement proper loading and error boundaries at appropriate levels",
          "Use parallel routes for modals and overlays"
        ]
      },
      {
        category: "Internationalization",
        practices: [
          "Use 'as-needed' locale prefix for cleaner URLs",
          "Implement proper locale validation in middleware",
          "Provide language switcher in navigation",
          "Use proper hreflang tags for SEO",
          "Handle RTL languages appropriately"
        ]
      },
      {
        category: "Authentication & Security",
        practices: [
          "Always validate authentication on server components",
          "Implement role-based access control at route level",
          "Use middleware for route protection",
          "Handle authentication redirects properly",
          "Implement proper session management"
        ]
      },
      {
        category: "Performance",
        practices: [
          "Use Server Components by default, Client Components only when needed",
          "Implement proper caching strategies with unstable_cache",
          "Use Suspense boundaries for optimal loading experiences",
          "Implement proper error boundaries",
          "Use static generation where possible"
        ]
      },
      {
        category: "SEO & Metadata",
        practices: [
          "Generate proper metadata for each route",
          "Implement structured data where appropriate",
          "Use proper OpenGraph and Twitter Card tags",
          "Implement canonical URLs for internationalized content",
          "Handle dynamic metadata properly"
        ]
      }
    ]
  },

  // Integration with ERP Components
  erpIntegration: {
    description: "Integration patterns with existing ERP business patterns",
    integrations: [
      {
        component: "Role-Based Access Control",
        description: "Integrate RBAC with Next.js routing for route-level protection",
        implementation: "Use middleware to check user roles and permissions before allowing access to protected routes"
      },
      {
        component: "Multi-Step Forms",
        description: "Implement multi-step forms with proper routing and state management",
        implementation: "Use dynamic routes for form steps and maintain state across navigation"
      },
      {
        component: "Configuration System",
        description: "Route-based configuration management with internationalization",
        implementation: "Create nested routes for configuration sections with proper locale support"
      },
      {
        component: "Notifications System",
        description: "Real-time notifications across different locales and routes",
        implementation: "Implement locale-aware notification routing and display"
      }
    ]
  }
};

export default nextjsRoutingArchitecture;