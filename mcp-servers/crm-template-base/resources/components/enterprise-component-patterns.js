export default `# Enterprise Component Patterns - Scalable UI Architecture

This document establishes **ENTERPRISE-GRADE** component patterns for scalable UI architecture, featuring compound components, render props, and advanced composition patterns for complex business applications.

## Overview

Enterprise component patterns enable the creation of flexible, reusable, and maintainable UI components that can handle complex business requirements while remaining developer-friendly and type-safe.

## Core Component Patterns

### 1. Compound Components Pattern

Compound components allow related components to work together while maintaining clean APIs and flexible composition.

\`\`\`tsx
// src/components/ui/data-table/index.tsx - Compound Data Table Component

import React, { createContext, useContext, useState } from 'react';
import { ChevronUp, ChevronDown, Filter } from 'lucide-react';

// Context for compound component communication
interface DataTableContextValue<T> {
  data: T[];
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  filters: Record<string, any>;
  onSort: (column: string) => void;
  onFilter: (column: string, value: any) => void;
}

const DataTableContext = createContext<DataTableContextValue<any> | null>(null);

function useDataTableContext<T>() {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error('DataTable compound components must be used within DataTable');
  }
  return context as DataTableContextValue<T>;
}

// Main DataTable component
interface DataTableProps<T> {
  data: T[];
  children: React.ReactNode;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onFilter?: (filters: Record<string, any>) => void;
}

function DataTable<T extends Record<string, unknown>>({ 
  data, 
  children, 
  onSort, 
  onFilter 
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleSort = (column: string) => {
    const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newDirection);
    onSort?.(column, newDirection);
  };

  const handleFilter = (column: string, value: any) => {
    const newFilters = { ...filters, [column]: value };
    setFilters(newFilters);
    onFilter?.(newFilters);
  };

  const contextValue: DataTableContextValue<T> = {
    data,
    sortColumn,
    sortDirection,
    filters,
    onSort: handleSort,
    onFilter: handleFilter,
  };

  return (
    <DataTableContext.Provider value={contextValue}>
      <div className="w-full">
        <table className="w-full border-collapse">
          {children}
        </table>
      </div>
    </DataTableContext.Provider>
  );
}

// Header compound component
interface DataTableHeaderProps {
  children: React.ReactNode;
}

function DataTableHeader({ children }: DataTableHeaderProps) {
  return (
    <thead className="bg-muted/50">
      <tr>{children}</tr>
    </thead>
  );
}

// Column compound component
interface DataTableColumnProps {
  column: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  children: React.ReactNode;
}

function DataTableColumn({ 
  column, 
  sortable = false, 
  filterable = false, 
  width, 
  children 
}: DataTableColumnProps) {
  const { sortColumn, sortDirection, onSort, onFilter } = useDataTableContext();

  return (
    <th 
      className="px-4 py-2 text-left border-b"
      style={{ width }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {sortable ? (
            <button
              onClick={() => onSort(column)}
              className="flex items-center space-x-1 hover:text-primary font-medium"
            >
              <span>{children}</span>
              {sortColumn === column && (
                sortDirection === 'asc' 
                  ? <ChevronUp className="h-4 w-4" />
                  : <ChevronDown className="h-4 w-4" />
              )}
            </button>
          ) : (
            <span className="font-medium">{children}</span>
          )}
        </div>
        
        {filterable && (
          <button
            onClick={() => {/* Open filter menu */}}
            className="p-1 hover:bg-muted rounded"
          >
            <Filter className="h-3 w-3" />
          </button>
        )}
      </div>
    </th>
  );
}

// Body compound component
interface DataTableBodyProps<T> {
  render: (item: T, index: number) => React.ReactNode;
}

function DataTableBody<T>({ render }: DataTableBodyProps<T>) {
  const { data } = useDataTableContext<T>();

  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={index} className="hover:bg-muted/30">
          {render(item, index)}
        </tr>
      ))}
    </tbody>
  );
}

// Cell compound component
interface DataTableCellProps {
  children: React.ReactNode;
  className?: string;
}

function DataTableCell({ children, className }: DataTableCellProps) {
  return (
    <td className={\`px-4 py-2 border-b \${className || ''}\`}>
      {children}
    </td>
  );
}

// Compound component export
const CompoundDataTable = Object.assign(DataTable, {
  Header: DataTableHeader,
  Column: DataTableColumn,
  Body: DataTableBody,
  Cell: DataTableCell,
});

export { CompoundDataTable as DataTable };

// Usage Example
function RequestsTable({ requests }: { requests: Request[] }) {
  return (
    <DataTable data={requests} onSort={handleSort} onFilter={handleFilter}>
      <DataTable.Header>
        <DataTable.Column column="id" sortable width="100px">
          ID
        </DataTable.Column>
        <DataTable.Column column="clientName" sortable filterable>
          Client Name
        </DataTable.Column>
        <DataTable.Column column="status" filterable>
          Status
        </DataTable.Column>
        <DataTable.Column column="actions">
          Actions
        </DataTable.Column>
      </DataTable.Header>
      
      <DataTable.Body
        render={(request) => (
          <>
            <DataTable.Cell>{request.id}</DataTable.Cell>
            <DataTable.Cell>{request.clientName}</DataTable.Cell>
            <DataTable.Cell>
              <Badge variant={getStatusVariant(request.status)}>
                {request.status}
              </Badge>
            </DataTable.Cell>
            <DataTable.Cell>
              <Button size="sm" variant="outline">
                View
              </Button>
            </DataTable.Cell>
          </>
        )}
      />
    </DataTable>
  );
}
\`\`\`

### 2. Render Props Pattern

Render props enable flexible component composition by allowing consumers to control rendering logic.

\`\`\`tsx
// src/components/patterns/async-data-loader.tsx - Render Props for Data Loading

interface AsyncDataLoaderProps<T> {
  loadData: () => Promise<T>;
  deps?: unknown[];
  children: (state: {
    data: T | null;
    loading: boolean;
    error: Error | null;
    retry: () => void;
  }) => React.ReactNode;
}

function AsyncDataLoader<T>({ 
  loadData, 
  deps = [], 
  children 
}: AsyncDataLoaderProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await loadData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [loadData]);

  useEffect(() => {
    load();
  }, [...deps, load]);

  return (
    <>
      {children({
        data,
        loading,
        error,
        retry: load,
      })}
    </>
  );
}

// Usage Examples
function RequestsList() {
  return (
    <AsyncDataLoader
      loadData={() => requestApi.getAll()}
      deps={[]}
    >
      {({ data, loading, error, retry }) => {
        if (loading) {
          return <RequestsListSkeleton />;
        }

        if (error) {
          return (
            <div className="text-center py-8">
              <p className="text-destructive mb-4">
                Failed to load requests: {error.message}
              </p>
              <Button onClick={retry}>Retry</Button>
            </div>
          );
        }

        if (!data || data.length === 0) {
          return (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No requests found</p>
            </div>
          );
        }

        return (
          <div className="space-y-4">
            {data.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        );
      }}
    </AsyncDataLoader>
  );
}
\`\`\`

### 3. Higher-Order Components (HOCs) for Cross-Cutting Concerns

HOCs provide a way to share common functionality across components.

\`\`\`tsx
// src/components/hocs/with-auth.tsx - Authentication HOC

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface WithAuthOptions {
  requireAuth?: boolean;
  requiredRoles?: string[];
  redirectTo?: string;
}

function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const {
    requireAuth = true,
    requiredRoles = [],
    redirectTo = '/login',
  } = options;

  function AuthenticatedComponent(props: P) {
    const { user, isLoaded } = useUser();

    // Loading state
    if (!isLoaded) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }

    // Authentication check
    if (requireAuth && !user) {
      redirect(redirectTo);
    }

    // Role-based access control
    if (requiredRoles.length > 0 && user) {
      const userRoles = user.publicMetadata?.roles as string[] || [];
      const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
      
      if (!hasRequiredRole) {
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-destructive mb-2">
              Access Denied
            </h2>
            <p className="text-muted-foreground">
              You don't have permission to access this resource.
            </p>
          </div>
        );
      }
    }

    return <Component {...props} />;
  }

  // Preserve component name for debugging
  AuthenticatedComponent.displayName = \`withAuth(\${Component.displayName || Component.name})\`;

  return AuthenticatedComponent;
}

// Usage
const ProtectedAdminPanel = withAuth(AdminPanel, {
  requiredRoles: ['admin'],
});

const ProtectedUserDashboard = withAuth(UserDashboard, {
  requireAuth: true,
});
\`\`\`

### 4. Custom Hook Patterns for Business Logic

Custom hooks encapsulate complex business logic and state management.

\`\`\`tsx
// src/hooks/use-form-wizard.ts - Multi-step form management hook

interface FormWizardStep {
  id: string;
  label: string;
  isValid?: (data: any) => boolean;
  isVisible?: (data: any) => boolean;
}

interface UseFormWizardOptions<T> {
  steps: FormWizardStep[];
  initialData: T;
  onComplete: (data: T) => Promise<void>;
  onStepChange?: (currentStep: number, data: T) => void;
}

function useFormWizard<T extends Record<string, any>>({
  steps,
  initialData,
  onComplete,
  onStepChange,
}: UseFormWizardOptions<T>) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<T>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate visible steps based on current data
  const visibleSteps = useMemo(() => {
    return steps.filter(step => !step.isVisible || step.isVisible(formData));
  }, [steps, formData]);

  // Current step info
  const currentStepInfo = visibleSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === visibleSteps.length - 1;

  // Validation
  const validateCurrentStep = () => {
    if (!currentStepInfo?.isValid) return true;
    
    const isValid = currentStepInfo.isValid(formData);
    if (!isValid) {
      setErrors(prev => ({
        ...prev,
        [currentStepInfo.id]: 'Please complete all required fields',
      }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[currentStepInfo.id];
        return newErrors;
      });
    }
    
    return isValid;
  };

  // Navigation
  const nextStep = () => {
    if (!validateCurrentStep()) return;
    
    if (isLastStep) {
      handleSubmit();
    } else {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      onStepChange?.(newStep, formData);
    }
  };

  const previousStep = () => {
    if (!isFirstStep) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      onStepChange?.(newStep, formData);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < visibleSteps.length) {
      setCurrentStep(stepIndex);
      onStepChange?.(stepIndex, formData);
    }
  };

  // Data management
  const updateFormData = (updates: Partial<T>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    setFormData(initialData);
    setCurrentStep(0);
    setErrors({});
  };

  // Submission
  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    try {
      await onComplete(formData);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'Submission failed',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State
    currentStep,
    currentStepInfo,
    formData,
    errors,
    isSubmitting,
    
    // Computed
    visibleSteps,
    isFirstStep,
    isLastStep,
    progress: ((currentStep + 1) / visibleSteps.length) * 100,
    
    // Actions
    nextStep,
    previousStep,
    goToStep,
    updateFormData,
    resetForm,
    validateCurrentStep,
  };
}

// Usage in component
function MultiStepRequestForm() {
  const wizard = useFormWizard({
    steps: [
      { id: 'basic', label: 'Basic Information', isValid: (data) => !!data.clientName },
      { id: 'type', label: 'Request Type', isValid: (data) => !!data.requestType },
      { id: 'details', label: 'Details', isVisible: (data) => data.requestType === 'LWR' },
      { id: 'review', label: 'Review' },
    ],
    initialData: {
      clientName: '',
      requestType: '',
      details: '',
    },
    onComplete: async (data) => {
      await requestApi.create(data);
      router.push('/requests');
    },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress indicator */}
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: \`\${wizard.progress}%\` }}
        />
      </div>

      {/* Step content */}
      <div className="min-h-[400px]">
        {wizard.currentStepInfo?.id === 'basic' && (
          <BasicInfoStep 
            data={wizard.formData}
            onChange={wizard.updateFormData}
          />
        )}
        {wizard.currentStepInfo?.id === 'type' && (
          <RequestTypeStep
            data={wizard.formData}
            onChange={wizard.updateFormData}
          />
        )}
        {/* Other steps... */}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={wizard.previousStep}
          disabled={wizard.isFirstStep || wizard.isSubmitting}
        >
          Previous
        </Button>
        
        <Button 
          onClick={wizard.nextStep}
          disabled={wizard.isSubmitting}
        >
          {wizard.isSubmitting ? 'Submitting...' : 
           wizard.isLastStep ? 'Submit' : 'Next'}
        </Button>
      </div>

      {/* Errors */}
      {Object.values(wizard.errors).map((error, index) => (
        <div key={index} className="text-sm text-destructive">
          {error}
        </div>
      ))}
    </div>
  );
}
\`\`\`

### 5. Polymorphic Components

Polymorphic components can render as different HTML elements while maintaining type safety.

\`\`\`tsx
// src/components/ui/polymorphic-button.tsx - Type-safe polymorphic component

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

// Button variants
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Polymorphic type definitions
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// Button props
interface ButtonProps extends VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: PolymorphicComponentPropWithRef<C, ButtonProps>
) => React.ReactElement | null;

// Polymorphic Button implementation
const Button: ButtonComponent = forwardRef(
  <C extends React.ElementType = 'button'>(
    {
      as,
      asChild = false,
      className,
      variant,
      size,
      ...props
    }: PolymorphicComponentPropWithRef<C, ButtonProps>,
    ref?: PolymorphicRef<C>
  ) => {
    const Comp = asChild ? Slot : as || 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };

// Usage Examples
function ButtonExamples() {
  return (
    <div className="space-y-4">
      {/* Default button */}
      <Button>Default Button</Button>
      
      {/* Button as link */}
      <Button as="a" href="/requests" variant="outline">
        Go to Requests
      </Button>
      
      {/* Button with custom component */}
      <Button as={Link} to="/dashboard" variant="ghost">
        Dashboard Link
      </Button>
      
      {/* Button with Slot (asChild) */}
      <Button asChild>
        <Link href="/profile">
          <User className="mr-2 h-4 w-4" />
          Profile
        </Link>
      </Button>
    </div>
  );
}
\`\`\`

### 6. Provider Pattern for Feature Context

Provider pattern for feature-level state management and configuration.

\`\`\`tsx
// src/features/commercial-requests/providers/request-provider.tsx

interface RequestContextValue {
  // State
  selectedRequests: string[];
  viewMode: 'list' | 'grid' | 'table';
  filters: RequestFilters;
  
  // Actions
  selectRequest: (id: string) => void;
  selectAllRequests: () => void;
  clearSelection: () => void;
  setViewMode: (mode: 'list' | 'grid' | 'table') => void;
  updateFilters: (filters: Partial<RequestFilters>) => void;
  
  // Derived state
  hasSelection: boolean;
  selectionCount: number;
}

const RequestContext = createContext<RequestContextValue | null>(null);

export function useRequestContext() {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequestContext must be used within RequestProvider');
  }
  return context;
}

interface RequestProviderProps {
  children: React.ReactNode;
  initialFilters?: RequestFilters;
}

export function RequestProvider({ 
  children, 
  initialFilters = {} 
}: RequestProviderProps) {
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'table'>('list');
  const [filters, setFilters] = useState<RequestFilters>(initialFilters);

  const selectRequest = (id: string) => {
    setSelectedRequests(prev => 
      prev.includes(id) 
        ? prev.filter(reqId => reqId !== id)
        : [...prev, id]
    );
  };

  const selectAllRequests = () => {
    // Implementation depends on current data
  };

  const clearSelection = () => {
    setSelectedRequests([]);
  };

  const updateFilters = (newFilters: Partial<RequestFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const contextValue: RequestContextValue = {
    selectedRequests,
    viewMode,
    filters,
    selectRequest,
    selectAllRequests,
    clearSelection,
    setViewMode,
    updateFilters,
    hasSelection: selectedRequests.length > 0,
    selectionCount: selectedRequests.length,
  };

  return (
    <RequestContext.Provider value={contextValue}>
      {children}
    </RequestContext.Provider>
  );
}

// Usage in feature
function RequestsFeature() {
  return (
    <RequestProvider>
      <div className="space-y-6">
        <RequestsHeader />
        <RequestsFilters />
        <RequestsList />
        <RequestsActions />
      </div>
    </RequestProvider>
  );
}
\`\`\`

## Component Composition Patterns

### 1. Slot Pattern for Flexible Layouts

\`\`\`tsx
// src/components/layout/dashboard-shell.tsx - Flexible dashboard layout

interface DashboardShellProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function DashboardShell({
  header,
  sidebar,
  children,
  footer,
  className,
}: DashboardShellProps) {
  return (
    <div className={cn("min-h-screen flex flex-col", className)}>
      {/* Header slot */}
      {header && (
        <header className="border-b border-border bg-background">
          {header}
        </header>
      )}

      {/* Main content area */}
      <div className="flex-1 flex">
        {/* Sidebar slot */}
        {sidebar && (
          <aside className="w-64 border-r border-border bg-muted/30">
            {sidebar}
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Footer slot */}
      {footer && (
        <footer className="border-t border-border bg-background">
          {footer}
        </footer>
      )}
    </div>
  );
}

// Usage with flexible composition
function RequestsDashboard() {
  return (
    <DashboardShell
      header={<DashboardHeader title="Commercial Requests" />}
      sidebar={<RequestsSidebar />}
      footer={<DashboardFooter />}
    >
      <div className="p-6">
        <RequestsList />
      </div>
    </DashboardShell>
  );
}
\`\`\`

## Implementation Guidelines

### MUST DO:
1. Use compound components for related component groups
2. Implement render props for flexible data presentation
3. Create polymorphic components for maximum reusability
4. Use custom hooks to encapsulate complex business logic
5. Implement proper TypeScript generics for type safety
6. Create provider patterns for feature-level state
7. Use proper context boundaries and error handling

### MUST NOT DO:
1. Create monolithic components with too many responsibilities
2. Skip proper TypeScript typing for generic components
3. Mix presentation logic with business logic in components
4. Create deep prop drilling instead of using context
5. Skip proper error boundaries for complex components
6. Ignore component composition in favor of inheritance
7. Create unnecessary abstractions that reduce clarity

## Benefits of Enterprise Component Patterns

### 1. Reusability
- Components can be composed in multiple ways
- Business logic separated from presentation
- Generic patterns applicable across features
- Reduced code duplication

### 2. Maintainability
- Clear separation of concerns
- Predictable component APIs
- Easy to modify and extend
- Better testing capabilities

### 3. Developer Experience
- Type-safe component composition
- Clear documentation through types
- Flexible APIs that grow with requirements
- Better IDE support and auto-completion

### 4. Scalability
- Components scale with application complexity
- Team can work on different components independently
- Easy to add new features without breaking existing ones
- Performance optimizations at component level

These enterprise component patterns are **MANDATORY** for building scalable, maintainable UI architectures in complex business applications.`;