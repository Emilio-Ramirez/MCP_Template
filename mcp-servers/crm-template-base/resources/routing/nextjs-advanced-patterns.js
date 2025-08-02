export default `# Next.js Advanced Routing Patterns - App Router Excellence

This document establishes the **ADVANCED** Next.js App Router patterns for enterprise applications, showcasing parallel routes, route groups, and intercepting routes for complex UI architectures.

## Overview

Next.js 15 App Router introduces revolutionary routing capabilities that enable sophisticated UI patterns previously impossible with traditional routing. These patterns enable complex layouts, parallel loading states, and modal-like interactions while maintaining URL-based navigation.

## Core App Router Concepts

### 1. Route Groups
- Organize routes without affecting URL structure
- Create layout boundaries and shared components
- Enable feature-based route organization
- Support different authentication requirements

### 2. Parallel Routes
- Render multiple pages simultaneously in same layout
- Independent loading and error states
- Complex dashboard layouts
- Modal-like experiences with URL preservation

### 3. Intercepting Routes
- Intercept routes when navigating from specific locations
- Enable modal overlays while preserving URLs
- Seamless client-side transitions
- Fallback to full page when accessed directly

## Advanced Routing Architecture

### Route Groups Organization

\`\`\`bash
app/
├── (auth)/                          # Auth route group
│   ├── layout.tsx                   # Auth-specific layout
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
│
├── (dashboard)/                     # Dashboard route group
│   ├── layout.tsx                   # Dashboard layout with sidebar
│   ├── @sidebar/                    # Parallel route for sidebar
│   │   ├── default.tsx              # Default sidebar content
│   │   ├── analytics/
│   │   │   └── page.tsx            # Sidebar for analytics
│   │   └── requests/
│   │       └── page.tsx            # Sidebar for requests
│   ├── analytics/
│   │   ├── page.tsx                # Main analytics page
│   │   └── @modal/                 # Parallel route for modal
│   │       ├── default.tsx         # No modal by default
│   │       └── (..)settings/       # Intercepted settings modal
│   │           └── page.tsx
│   ├── requests/
│   │   ├── page.tsx                # Requests list
│   │   ├── new/
│   │   │   └── page.tsx           # New request form
│   │   ├── [id]/
│   │   │   ├── page.tsx           # Request details
│   │   │   └── edit/
│   │   │       └── page.tsx       # Edit request
│   │   └── @details/              # Parallel route for details panel
│   │       ├── default.tsx        # Empty details panel
│   │       └── [id]/
│   │           └── page.tsx       # Request details panel
│   └── settings/
│       └── page.tsx               # Full settings page
│
├── (marketing)/                     # Marketing route group
│   ├── layout.tsx                  # Marketing layout
│   ├── page.tsx                    # Homepage
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
│
└── layout.tsx                      # Root layout
\`\`\`

## Parallel Routes Implementation

### Dashboard with Parallel Sidebar

\`\`\`tsx
// app/(dashboard)/layout.tsx
// Layout with parallel sidebar route

import { Sidebar } from '@/components/layout/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode; // Parallel route
  modal?: React.ReactNode;  // Optional parallel route
}

export default function DashboardLayout({
  children,
  sidebar,
  modal
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Parallel sidebar route */}
      <aside className="w-64 border-r border-border">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        {sidebar}
      </aside>

      {/* Main content area */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Optional modal overlay */}
      {modal}
    </div>
  );
}
\`\`\`

### Dynamic Sidebar Content

\`\`\`tsx
// app/(dashboard)/@sidebar/requests/page.tsx
// Sidebar specific to requests section

import { RequestFilters } from '@/features/commercial-requests';
import { RecentRequests } from '@/features/commercial-requests';

export default function RequestsSidebar() {
  return (
    <div className="space-y-6">
      {/* Quick filters */}
      <div className="px-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Quick Filters
        </h3>
        <RequestFilters />
      </div>

      {/* Recent requests */}
      <div className="px-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Recent Requests
        </h3>
        <RecentRequests limit={5} />
      </div>

      {/* Quick actions */}
      <div className="px-4">
        <Button asChild className="w-full">
          <Link href="/requests/new">New Request</Link>
        </Button>
      </div>
    </div>
  );
}
\`\`\`

\`\`\`tsx
// app/(dashboard)/@sidebar/analytics/page.tsx
// Sidebar for analytics section

import { MetricsSummary } from '@/features/analytics';
import { QuickCharts } from '@/features/analytics';

export default function AnalyticsSidebar() {
  return (
    <div className="space-y-6">
      {/* Key metrics */}
      <div className="px-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Key Metrics
        </h3>
        <MetricsSummary />
      </div>

      {/* Quick charts */}
      <div className="px-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Quick Insights
        </h3>
        <QuickCharts />
      </div>
    </div>
  );
}
\`\`\`

## Intercepting Routes for Modals

### Modal Intercept Implementation

\`\`\`tsx
// app/(dashboard)/@modal/(..)settings/page.tsx
// Intercepted settings modal

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { SettingsForm } from '@/features/settings';
import { useRouter } from 'next/navigation';

export default function SettingsModal() {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <SettingsForm />
      </DialogContent>
    </Dialog>
  );
}
\`\`\`

### Request Details with Parallel Panel

\`\`\`tsx
// app/(dashboard)/requests/layout.tsx
// Layout with parallel details panel

interface RequestsLayoutProps {
  children: React.ReactNode;
  details: React.ReactNode; // Parallel route for details
}

export default function RequestsLayout({
  children,
  details
}: RequestsLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Main requests list */}
      <div className="lg:col-span-2">
        {children}
      </div>

      {/* Details panel */}
      <div className="lg:col-span-1 border-l border-border pl-6">
        {details}
      </div>
    </div>
  );
}
\`\`\`

\`\`\`tsx
// app/(dashboard)/requests/@details/[id]/page.tsx
// Request details in parallel panel

import { RequestDetails } from '@/features/commercial-requests';
import { Suspense } from 'react';

interface RequestDetailsPanelProps {
  params: { id: string };
}

export default function RequestDetailsPanel({ 
  params 
}: RequestDetailsPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Request Details</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href={\`/requests/\${params.id}\`}>
            Full View
          </Link>
        </Button>
      </div>

      <Suspense fallback={<RequestDetailsSkeleton />}>
        <RequestDetails 
          id={params.id} 
          compact={true} // Compact view for panel
        />
      </Suspense>
    </div>
  );
}
\`\`\`

## Loading and Error States

### Parallel Route Loading States

\`\`\`tsx
// app/(dashboard)/@sidebar/loading.tsx
// Loading state for sidebar parallel route

export default function SidebarLoading() {
  return (
    <div className="space-y-6 px-4">
      {/* Loading skeleton for filters */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-8 w-1/2" />
        </div>
      </div>

      {/* Loading skeleton for recent items */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-2 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
\`\`\`

### Error Boundaries for Parallel Routes

\`\`\`tsx
// app/(dashboard)/@sidebar/error.tsx
// Error boundary for sidebar parallel route

'use client';

import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SidebarError({ error, reset }: SidebarErrorProps) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2 text-destructive">
        <AlertTriangle className="h-4 w-4" />
        <span className="text-sm font-medium">Sidebar Error</span>
      </div>
      
      <p className="text-xs text-muted-foreground">
        Failed to load sidebar content
      </p>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={reset}
        className="w-full"
      >
        <RefreshCcw className="h-3 w-3 mr-1" />
        Retry
      </Button>
    </div>
  );
}
\`\`\`

## Route Groups with Different Layouts

### Authentication Layout

\`\`\`tsx
// app/(auth)/layout.tsx
// Specialized layout for authentication pages

import { Logo } from '@/components/ui/logo';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Branding side */}
      <div className="flex-1 bg-primary text-primary-foreground p-8 flex flex-col justify-center">
        <div className="max-w-md">
          <Logo className="h-8 w-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">
            Welcome to IBSO ERP
          </h1>
          <p className="text-primary-foreground/80">
            Enterprise resource planning for the chemical industry
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
\`\`\`

### Marketing Layout

\`\`\`tsx
// app/(marketing)/layout.tsx
// Public marketing layout

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
\`\`\`

## Advanced Route Patterns

### Conditional Route Interception

\`\`\`tsx
// app/(dashboard)/@modal/(.)requests/[id]/page.tsx
// Conditionally intercept request details based on context

import { RequestModal } from '@/features/commercial-requests';
import { headers } from 'next/headers';

interface RequestModalProps {
  params: { id: string };
}

export default function RequestModalPage({ params }: RequestModalProps) {
  const headersList = headers();
  const referer = headersList.get('referer');
  
  // Only show modal if coming from requests list
  const showModal = referer?.includes('/requests') && !referer?.includes('/requests/' + params.id);
  
  if (!showModal) {
    // Redirect to full page view
    redirect(\`/requests/\${params.id}\`);
  }

  return <RequestModal id={params.id} />;
}
\`\`\`

### Dynamic Route Groups

\`\`\`tsx
// middleware.ts
// Dynamic route group selection based on user role

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTokenFromRequest } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const token = getTokenFromRequest(request);
  const pathname = request.nextUrl.pathname;

  // Redirect based on user role
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const userRole = getUserRoleFromToken(token);
    
    if (userRole === 'admin') {
      // Admin gets full dashboard
      return NextResponse.next();
    } else if (userRole === 'manager') {
      // Manager gets limited access
      if (pathname.includes('/admin')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } else {
      // Regular user gets basic dashboard
      if (pathname.includes('/admin') || pathname.includes('/analytics')) {
        return NextResponse.redirect(new URL('/dashboard/requests', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
\`\`\`

## Streaming and Suspense Integration

### Streaming Parallel Routes

\`\`\`tsx
// app/(dashboard)/analytics/page.tsx
// Main page with streaming data

import { ChartsSection } from '@/features/analytics';
import { MetricsSection } from '@/features/analytics';
import { Suspense } from 'react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your business performance
        </p>
      </div>

      {/* Streaming sections with independent loading */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<MetricsSkeleton />}>
          <MetricsSection />
        </Suspense>
        
        <Suspense fallback={<ChartsSkeleton />}>
          <ChartsSection />
        </Suspense>
      </div>
    </div>
  );
}
\`\`\`

## SEO and Metadata

### Dynamic Metadata Generation

\`\`\`tsx
// app/(dashboard)/requests/[id]/page.tsx
// Dynamic metadata for request pages

import { Metadata } from 'next';
import { requestApi } from '@/features/commercial-requests';

interface RequestPageProps {
  params: { id: string };
}

export async function generateMetadata({ 
  params 
}: RequestPageProps): Promise<Metadata> {
  try {
    const request = await requestApi.getById(params.id);
    
    return {
      title: \`Request \${request.id} - \${request.clientName}\`,
      description: \`Commercial request for \${request.clientName} - Status: \${request.status}\`,
      openGraph: {
        title: \`Request \${request.id}\`,
        description: \`Request from \${request.clientName}\`,
        type: 'article',
      },
    };
  } catch {
    return {
      title: 'Request Not Found',
      description: 'The requested commercial request could not be found.',
    };
  }
}

export default function RequestPage({ params }: RequestPageProps) {
  return <RequestDetails id={params.id} />;
}
\`\`\`

## Implementation Guidelines

### MUST DO:
1. Use route groups to organize related routes without affecting URLs
2. Implement parallel routes for complex dashboard layouts
3. Use intercepting routes for modal-like experiences
4. Create proper loading and error states for parallel routes
5. Implement streaming for performance optimization
6. Use middleware for route-based access control

### MUST NOT DO:
1. Over-complicate routing structure unnecessarily
2. Skip error boundaries for parallel routes
3. Ignore loading states for better UX
4. Mix route group purposes (auth + dashboard in same group)
5. Create deep nesting without clear purpose
6. Forget SEO considerations for public routes

## Benefits of Advanced Routing

### 1. Enhanced User Experience
- Parallel loading of independent content sections
- Modal-like interactions while preserving URLs
- Smooth client-side transitions
- Contextual sidebars and panels

### 2. Performance Optimization
- Independent loading states reduce perceived latency
- Streaming enables progressive page rendering
- Better code splitting opportunities
- Reduced layout shifts

### 3. Maintainable Architecture
- Clear separation of layout concerns
- Route-based code organization
- Independent component development
- Scalable routing patterns

### 4. SEO and Accessibility
- Proper URL structure preservation
- Dynamic metadata generation
- Server-side rendering benefits
- Progressive enhancement support

These Next.js advanced routing patterns are **MANDATORY** for enterprise applications requiring sophisticated UI architectures and optimal user experiences.`;