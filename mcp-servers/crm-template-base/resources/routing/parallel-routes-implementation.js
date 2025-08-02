export default `# Parallel Routes Implementation - Advanced Next.js App Router

## 🎯 Overview

This document outlines the advanced parallel routes implementation using Next.js 15 App Router, enabling multiple components to render simultaneously on the same page with independent loading states and error boundaries.

## 🏗️ Parallel Routes Architecture

### Directory Structure

\`\`\`
app/[locale]/(dashboard)/
├── overview/
│   ├── page.tsx                 # Main overview page
│   ├── @area_stats/            # Parallel route for area chart
│   │   ├── page.tsx            # Area chart component
│   │   ├── loading.tsx         # Loading state for area chart
│   │   └── error.tsx           # Error boundary for area chart
│   ├── @bar_stats/             # Parallel route for bar chart
│   │   ├── page.tsx            # Bar chart component
│   │   ├── loading.tsx         # Loading state for bar chart
│   │   └── error.tsx           # Error boundary for bar chart
│   ├── @pie_stats/             # Parallel route for pie chart
│   │   ├── page.tsx            # Pie chart component
│   │   ├── loading.tsx         # Loading state for pie chart
│   │   └── error.tsx           # Error boundary for pie chart
│   └── @sales/                 # Parallel route for recent sales
│       ├── page.tsx            # Recent sales component
│       ├── loading.tsx         # Loading state for sales
│       └── error.tsx           # Error boundary for sales
├── layout.tsx                  # Dashboard layout
└── loading.tsx                 # Fallback loading state
\`\`\`

### Main Layout Implementation

\`\`\`typescript
// app/[locale]/(dashboard)/overview/layout.tsx
import { setRequestLocale } from 'next-intl/server';

interface OverviewLayoutProps {
  children: React.ReactNode;
  area_stats: React.ReactNode;    // @area_stats slot
  bar_stats: React.ReactNode;     // @bar_stats slot
  pie_stats: React.ReactNode;     // @pie_stats slot
  sales: React.ReactNode;         // @sales slot
  params: Promise<{ locale: string }>;
}

export default async function OverviewLayout({
  children,
  area_stats,
  bar_stats,
  pie_stats,
  sales,
  params,
}: OverviewLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale); // Critical for i18n
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {children}
      
      {/* Dashboard grid with parallel routes */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-3">
          {area_stats}
        </div>
        <div className="col-span-1">
          {pie_stats}
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          {bar_stats}
        </div>
        <div className="col-span-3">
          {sales}
        </div>
      </div>
    </div>
  );
}
\`\`\`

### Main Page Component

\`\`\`typescript
// app/[locale]/(dashboard)/overview/page.tsx
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageContainer } from '@/components/layout/page-container';
import { DashboardBreadcrumb } from '@/components/layout/dashboard-breadcrumb';

interface OverviewPageProps {
  params: Promise<{ locale: string }>;
}

export default async function OverviewPage({ params }: OverviewPageProps) {
  const { locale } = await params;
  setRequestLocale(locale); // Critical for parallel routes
  
  const t = await getTranslations('Dashboard');
  
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <DashboardBreadcrumb />
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            {t('overview_title')}
          </h2>
        </div>
      </div>
    </PageContainer>
  );
}
\`\`\`

## 📊 Parallel Route Components

### Area Chart Implementation

\`\`\`typescript
// app/[locale]/(dashboard)/overview/@area_stats/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { AreaGraph } from '@/features/overview/components/area-graph';

interface AreaStatsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AreaStatsPage({ params }: AreaStatsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale); // Required for each parallel route
  
  // Simulate data fetching with loading state
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return <AreaGraph />;
}
\`\`\`

### Bar Chart Implementation

\`\`\`typescript
// app/[locale]/(dashboard)/overview/@bar_stats/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { BarGraph } from '@/features/overview/components/bar-graph';

interface BarStatsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BarStatsPage({ params }: BarStatsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale); // Required for each parallel route
  
  // Simulate different loading time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return <BarGraph />;
}
\`\`\`

### Recent Sales Implementation

\`\`\`typescript
// app/[locale]/(dashboard)/overview/@sales/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { RecentSales } from '@/features/overview/components/recent-sales';

interface SalesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function SalesPage({ params }: SalesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale); // Required for each parallel route
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return <RecentSales />;
}
\`\`\`

## 🔄 Loading States

### Individual Loading Components

\`\`\`typescript
// app/[locale]/(dashboard)/overview/@area_stats/loading.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AreaStatsLoading() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
\`\`\`

\`\`\`typescript
// app/[locale]/(dashboard)/overview/@bar_stats/loading.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function BarStatsLoading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-[140px]" />
        <Skeleton className="h-3 w-[200px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  );
}
\`\`\`

### Sales Loading State

\`\`\`typescript
// app/[locale]/(dashboard)/overview/@sales/loading.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function SalesLoading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-[100px]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-[120px]" />
                <Skeleton className="h-3 w-[80px]" />
              </div>
              <Skeleton className="h-3 w-[60px] ml-auto" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
\`\`\`

## ⚠️ Error Boundaries

### Individual Error Components

\`\`\`typescript
// app/[locale]/(dashboard)/overview/@area_stats/error.tsx
'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface AreaStatsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AreaStatsError({ error, reset }: AreaStatsErrorProps) {
  useEffect(() => {
    console.error('Area stats error:', error);
  }, [error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-4 w-4" />
          Chart Error
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Failed to load area chart data. Please try again.
        </p>
        <Button onClick={reset} variant="outline" size="sm">
          Retry
        </Button>
      </CardContent>
    </Card>
  );
}
\`\`\`

### Generic Error Template

\`\`\`typescript
// Reusable error component for parallel routes
interface ParallelRouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  title: string;
  description: string;
}

export function ParallelRouteError({ 
  error, 
  reset, 
  title, 
  description 
}: ParallelRouteErrorProps) {
  useEffect(() => {
    console.error(\`\${title} error:\`, error);
  }, [error, title]);

  return (
    <Card className="border-destructive/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        <div className="flex gap-2">
          <Button onClick={reset} variant="outline" size="sm">
            Try Again
          </Button>
          <Button 
            onClick={() => window.location.reload()} 
            variant="ghost" 
            size="sm"
          >
            Refresh Page
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
\`\`\`

## 🌐 Internationalization Integration

### Translation Context Management

\`\`\`typescript
// Critical pattern for i18n in parallel routes
export default async function ParallelRouteComponent({ params }: Props) {
  const { locale } = await params;
  
  // MANDATORY: Set locale context for each parallel route
  setRequestLocale(locale);
  
  // Now translations will work correctly
  const t = await getTranslations('Dashboard');
  
  return (
    <ComponentWithTranslations />
  );
}
\`\`\`

### Client Component Translation Pattern

\`\`\`typescript
// Client components in parallel routes
'use client';

import { useTranslations } from 'next-intl';

export function ClientChart() {
  const t = useTranslations('Dashboard');
  
  // Dynamic chart configuration with translations
  const chartConfig = useMemo(() => ({
    desktop: { label: t('desktop_label') },
    mobile: { label: t('mobile_label') }
  }), [t]);
  
  return <Chart config={chartConfig} />;
}
\`\`\`

## 🎯 Data Fetching Patterns

### Independent Data Loading

\`\`\`typescript
// Each parallel route can have independent data fetching
async function fetchAreaData(locale: string) {
  // Simulate API call with locale-specific data
  const response = await fetch(\`/api/area-data?locale=\${locale}\`);
  return response.json();
}

async function fetchBarData(locale: string) {
  // Different API endpoint, different timing
  const response = await fetch(\`/api/bar-data?locale=\${locale}\`);
  return response.json();
}

// Parallel routes load independently
export default async function AreaStatsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const data = await fetchAreaData(locale);
  
  return <AreaChart data={data} />;
}
\`\`\`

### Shared Data Context

\`\`\`typescript
// Context provider for shared data across parallel routes
interface DashboardData {
  areaData: any[];
  barData: any[];
  salesData: any[];
  pieData: any[];
}

export const DashboardDataContext = createContext<DashboardData | null>(null);

// Layout provides shared data
export default async function OverviewLayout({ 
  children, 
  area_stats, 
  bar_stats, 
  pie_stats, 
  sales,
  params 
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  // Fetch all data at layout level if needed
  const [areaData, barData, salesData, pieData] = await Promise.all([
    fetchAreaData(locale),
    fetchBarData(locale),
    fetchSalesData(locale),
    fetchPieData(locale),
  ]);
  
  const dashboardData = { areaData, barData, salesData, pieData };
  
  return (
    <DashboardDataContext.Provider value={dashboardData}>
      <div className="space-y-4">
        {children}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {area_stats}
          {bar_stats}
          {pie_stats}
          {sales}
        </div>
      </div>
    </DashboardDataContext.Provider>
  );
}
\`\`\`

## 🔧 Advanced Configuration

### Conditional Rendering

\`\`\`typescript
// Conditional parallel route rendering
export default async function OverviewLayout({
  children,
  area_stats,
  bar_stats,
  pie_stats,
  sales,
  params,
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  // Get user preferences or feature flags
  const userPrefs = await getUserPreferences();
  
  return (
    <div className="space-y-4">
      {children}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {userPrefs.showAreaChart && area_stats}
        {userPrefs.showBarChart && bar_stats}
        {userPrefs.showPieChart && pie_stats}
        {userPrefs.showRecentSales && sales}
      </div>
    </div>
  );
}
\`\`\`

### Dynamic Layout Switching

\`\`\`typescript
// Switch layouts based on user role or preferences
export default async function OverviewLayout(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  
  const user = await getCurrentUser();
  
  if (user.role === 'admin') {
    return <AdminDashboardLayout {...props} />;
  }
  
  if (user.role === 'manager') {
    return <ManagerDashboardLayout {...props} />;
  }
  
  return <UserDashboardLayout {...props} />;
}
\`\`\`

## 📊 Performance Optimization

### Streaming and Suspense

\`\`\`typescript
// Streaming parallel routes for better performance
export default async function OverviewLayout({
  children,
  area_stats,
  bar_stats,
  pie_stats,
  sales,
  params,
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return (
    <div className="space-y-4">
      {children}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<AreaStatsLoading />}>
          {area_stats}
        </Suspense>
        
        <Suspense fallback={<BarStatsLoading />}>
          {bar_stats}
        </Suspense>
        
        <Suspense fallback={<PieStatsLoading />}>
          {pie_stats}
        </Suspense>
        
        <Suspense fallback={<SalesLoading />}>
          {sales}
        </Suspense>
      </div>
    </div>
  );
}
\`\`\`

## 🎯 Key Benefits

### User Experience
- **Independent loading states** for each component
- **Better perceived performance** with progressive loading
- **Granular error handling** without affecting other components
- **Smooth interactions** with isolated component updates

### Developer Experience
- **Clear separation of concerns** with dedicated routes
- **Easy maintenance** with isolated components
- **Independent deployment** of component updates
- **Simplified testing** with isolated component boundaries

### Performance Benefits
- **Parallel data fetching** reduces overall loading time
- **Streaming responses** improve perceived performance
- **Independent caching** strategies for each component
- **Optimized bundle splitting** at the route level

## 📋 Implementation Checklist

- [ ] Create parallel route directory structure (@folder naming)
- [ ] Implement layout.tsx with parallel route slots
- [ ] Add setRequestLocale() to each parallel route component
- [ ] Create individual loading.tsx files for each route
- [ ] Implement error.tsx boundaries for each route
- [ ] Set up independent data fetching per route
- [ ] Configure proper TypeScript types for slots
- [ ] Test loading states and error boundaries
- [ ] Verify internationalization works in all routes
- [ ] Optimize performance with streaming and Suspense
- [ ] Add conditional rendering logic if needed
- [ ] Test responsive design across different screen sizes

This parallel routes implementation provides a robust foundation for complex dashboard layouts with independent loading states and error handling.`;