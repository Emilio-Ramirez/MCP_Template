export default `# 🎨 Unified Pattern Library

## Overview

This unified pattern library serves as the comprehensive collection of standardized design patterns, code patterns, and architectural patterns used across the MCP ERP ecosystem. It ensures consistency, reusability, and maintainability across all system components.

## Design System Patterns

### Color System
\`\`\`css
/* Primary Color Palette */
:root {
  /* Brand Colors */
  --color-primary: #2563eb;      /* Blue 600 */
  --color-primary-dark: #1d4ed8; /* Blue 700 */
  --color-primary-light: #3b82f6; /* Blue 500 */
  
  /* Semantic Colors */
  --color-success: #059669;      /* Emerald 600 */
  --color-warning: #d97706;      /* Amber 600 */
  --color-error: #dc2626;        /* Red 600 */
  --color-info: #0891b2;         /* Cyan 600 */
  
  /* Neutral Colors */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  
  /* Background Colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-muted: #f3f4f6;
  --bg-accent: #3b82f6;
  
  /* Text Colors */
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --text-inverse: #ffffff;
  
  /* Border Colors */
  --border-primary: #e5e7eb;
  --border-secondary: #d1d5db;
  --border-accent: #3b82f6;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #111827;
    --bg-secondary: #1f2937;
    --bg-muted: #374151;
    
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --text-muted: #9ca3af;
    
    --border-primary: #374151;
    --border-secondary: #4b5563;
  }
}
\`\`\`

### Typography System
\`\`\`css
/* Typography Scale */
:root {
  /* Font Families */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  
  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}

/* Typography Classes */
.text-display {
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.025em;
}

.text-heading-1 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
}

.text-heading-2 {
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
}

.text-heading-3 {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
}

.text-body-large {
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
}

.text-body {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

.text-body-small {
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

.text-caption {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
\`\`\`

### Spacing System
\`\`\`css
/* Spacing Scale */
:root {
  --space-px: 1px;
  --space-0: 0;
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
  --space-40: 10rem;     /* 160px */
  --space-48: 12rem;     /* 192px */
  --space-56: 14rem;     /* 224px */
  --space-64: 16rem;     /* 256px */
}

/* Component Spacing */
:root {
  --component-padding-sm: var(--space-2);
  --component-padding-md: var(--space-4);
  --component-padding-lg: var(--space-6);
  --component-padding-xl: var(--space-8);
  
  --component-margin-sm: var(--space-2);
  --component-margin-md: var(--space-4);
  --component-margin-lg: var(--space-6);
  --component-margin-xl: var(--space-8);
  
  --layout-gutter: var(--space-6);
  --layout-container-padding: var(--space-4);
}
\`\`\`

## Component Patterns

### Button Component Pattern
\`\`\`typescript
// Button Component Interface
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

// Button Component Implementation
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  children,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  const classes = \`
    \${baseClasses}
    \${variantClasses[variant]}
    \${sizeClasses[size]}
    \${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    \${className}
  \`.trim();
  
  const handleClick = (event: React.MouseEvent) => {
    if (disabled || loading) return;
    onClick?.(event);
  };
  
  return (
    <button
      type={type}
      className={classes}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

// Usage Examples
export const ButtonExamples = () => (
  <div className="space-y-4">
    <div className="space-x-2">
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="danger">Danger Button</Button>
    </div>
    
    <div className="space-x-2">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
    
    <div className="space-x-2">
      <Button loading>Loading...</Button>
      <Button disabled>Disabled</Button>
      <Button leftIcon={<PlusIcon />}>With Left Icon</Button>
      <Button rightIcon={<ArrowRightIcon />}>With Right Icon</Button>
    </div>
  </div>
);
\`\`\`

### Form Component Pattern
\`\`\`typescript
// Form Field Interface
export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Form Field Component
export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  value,
  onChange,
  onBlur,
  leftIcon,
  rightIcon
}) => {
  const fieldId = \`field-\${name}\`;
  const hasError = Boolean(error);
  
  const inputClasses = \`
    block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 
    focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm
    \${hasError 
      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
    }
    \${disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white'}
    \${leftIcon ? 'pl-10' : ''}
    \${rightIcon ? 'pr-10' : ''}
  \`.trim();
  
  return (
    <div className="space-y-1">
      <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400 sm:text-sm">{leftIcon}</span>
          </div>
        )}
        
        <input
          id={fieldId}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          className={inputClasses}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400 sm:text-sm">{rightIcon}</span>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600" role="alert">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

// Form Container Pattern
export interface FormProps {
  onSubmit: (data: Record<string, any>) => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  children,
  className = '',
  title,
  description
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };
  
  return (
    <form onSubmit={handleSubmit} className={\`space-y-6 \${className}\`}>
      {title && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}
      
      <div className="space-y-4">
        {children}
      </div>
    </form>
  );
};
\`\`\`

### Data Table Pattern
\`\`\`typescript
// Table Interface
export interface TableColumn<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  emptyMessage?: string;
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void;
  sortKey?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onRowClick?: (row: T) => void;
}

// Table Component
export function Table<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  emptyMessage = 'No data available',
  onSort,
  sortKey,
  sortDirection,
  onRowClick
}: TableProps<T>) {
  const handleSort = (key: keyof T) => {
    if (!onSort) return;
    
    const direction = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(key, direction);
  };
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-200 h-10 rounded mb-2"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-100 h-8 rounded mb-1"></div>
        ))}
      </div>
    );
  }
  
  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={\`
                  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                  \${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                \`}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {column.sortable && (
                    <span className="text-gray-400">
                      {sortKey === column.key ? (
                        sortDirection === 'asc' ? '↑' : '↓'
                      ) : (
                        '↕'
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr
              key={index}
              className={\`
                \${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
              \`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {column.render ? (
                    column.render(row[column.key], row)
                  ) : (
                    String(row[column.key] || '')
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Table Usage Example
export const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<keyof Customer>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const columns: TableColumn<Customer>[] = [
    {
      key: 'name',
      header: 'Customer Name',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8">
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {value.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'customerType',
      header: 'Type',
      sortable: true,
      render: (value) => (
        <span className={\`
          inline-flex px-2 py-1 text-xs font-semibold rounded-full
          \${value === 'premium' ? 'bg-purple-100 text-purple-800' : ''}
          \${value === 'standard' ? 'bg-blue-100 text-blue-800' : ''}
          \${value === 'basic' ? 'bg-gray-100 text-gray-800' : ''}
        \`}>
          {value}
        </span>
      )
    },
    {
      key: 'totalOrders',
      header: 'Orders',
      sortable: true,
      width: '100px'
    },
    {
      key: 'totalRevenue',
      header: 'Revenue',
      sortable: true,
      width: '120px',
      render: (value) => \`$\${value.toLocaleString()}\`
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <span className={\`
          inline-flex px-2 py-1 text-xs font-semibold rounded-full
          \${value === 'active' ? 'bg-green-100 text-green-800' : ''}
          \${value === 'inactive' ? 'bg-red-100 text-red-800' : ''}
          \${value === 'suspended' ? 'bg-yellow-100 text-yellow-800' : ''}
        \`}>
          {value}
        </span>
      )
    }
  ];
  
  const handleSort = (key: keyof Customer, direction: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDirection(direction);
    // Implement sorting logic here
  };
  
  const handleRowClick = (customer: Customer) => {
    // Navigate to customer detail page
    router.push(\`/customers/\${customer.id}\`);
  };
  
  return (
    <Table
      data={customers}
      columns={columns}
      loading={loading}
      emptyMessage="No customers found"
      onSort={handleSort}
      sortKey={sortKey}
      sortDirection={sortDirection}
      onRowClick={handleRowClick}
    />
  );
};
\`\`\`

## Layout Patterns

### Container Pattern
\`\`\`typescript
// Container Component
export interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  size = 'lg',
  children,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none'
  };
  
  return (
    <div className={\`mx-auto px-4 sm:px-6 lg:px-8 \${sizeClasses[size]} \${className}\`}>
      {children}
    </div>
  );
};

// Page Layout Pattern
export interface PageLayoutProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  actions,
  children
}) => {
  return (
    <Container>
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {description && (
                <p className="mt-2 text-sm text-gray-600">{description}</p>
              )}
            </div>
            {actions && (
              <div className="flex space-x-3">
                {actions}
              </div>
            )}
          </div>
        </div>
        
        <div>
          {children}
        </div>
      </div>
    </Container>
  );
};

// Grid Layout Pattern
export interface GridProps {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  cols = 1,
  gap = 'md',
  children,
  className = ''
}) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12'
  };
  
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };
  
  return (
    <div className={\`grid \${colClasses[cols]} \${gapClasses[gap]} \${className}\`}>
      {children}
    </div>
  );
};
\`\`\`

## State Management Patterns

### Custom Hook Patterns
\`\`\`typescript
// API Hook Pattern
export interface UseAPIOptions<T> {
  initialData?: T;
  refetchOnMount?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useAPI<T>(
  endpoint: string,
  options: UseAPIOptions<T> = {}
) {
  const [data, setData] = useState<T | undefined>(options.initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const result = await response.json();
      setData(result);
      options.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      options.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);
  
  useEffect(() => {
    if (options.refetchOnMount !== false) {
      fetchData();
    }
  }, [fetchData, options.refetchOnMount]);
  
  useEffect(() => {
    if (options.refetchInterval) {
      const interval = setInterval(fetchData, options.refetchInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, options.refetchInterval]);
  
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);
  
  return {
    data,
    loading,
    error,
    refetch
  };
}

// Form Hook Pattern
export interface UseFormOptions<T> {
  initialValues: T;
  validationSchema?: (values: T) => Record<keyof T, string>;
  onSubmit: (values: T) => void | Promise<void>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  
  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);
  
  const setFieldTouched = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);
  
  const validate = useCallback(() => {
    if (!validationSchema) return true;
    
    const validationErrors = validationSchema(values);
    setErrors(validationErrors);
    
    return Object.keys(validationErrors).length === 0;
  }, [values, validationSchema]);
  
  const handleSubmit = useCallback(async (event?: React.FormEvent) => {
    event?.preventDefault();
    
    if (!validate()) return;
    
    try {
      setSubmitting(true);
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  }, [validate, onSubmit, values]);
  
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitting(false);
  }, [initialValues]);
  
  return {
    values,
    errors,
    touched,
    submitting,
    setValue,
    setFieldTouched,
    handleSubmit,
    reset,
    isValid: Object.keys(errors).length === 0
  };
}

// Example Usage
export const CustomerForm = () => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      customerType: 'standard'
    },
    validationSchema: (values) => {
      const errors: any = {};
      
      if (!values.name) {
        errors.name = 'Name is required';
      }
      
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid';
      }
      
      return errors;
    },
    onSubmit: async (values) => {
      await createCustomer(values);
      // Handle success
    }
  });
  
  return (
    <Form onSubmit={form.handleSubmit} title="Create Customer">
      <FormField
        label="Name"
        name="name"
        value={form.values.name}
        onChange={(value) => form.setValue('name', value)}
        onBlur={() => form.setFieldTouched('name')}
        error={form.touched.name ? form.errors.name : undefined}
        required
      />
      
      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.values.email}
        onChange={(value) => form.setValue('email', value)}
        onBlur={() => form.setFieldTouched('email')}
        error={form.touched.email ? form.errors.email : undefined}
        required
      />
      
      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={form.reset}>
          Reset
        </Button>
        <Button type="submit" loading={form.submitting} disabled={!form.isValid}>
          Create Customer
        </Button>
      </div>
    </Form>
  );
};
\`\`\`

## Code Architecture Patterns

### Service Layer Pattern
\`\`\`typescript
// Base Service Interface
export interface BaseService<T, CreateDTO, UpdateDTO> {
  getById(id: string | number): Promise<T | null>;
  getAll(options?: QueryOptions): Promise<T[]>;
  create(data: CreateDTO): Promise<T>;
  update(id: string | number, data: Partial<UpdateDTO>): Promise<T>;
  delete(id: string | number): Promise<void>;
}

// Generic Service Implementation
export abstract class GenericService<T, CreateDTO, UpdateDTO> implements BaseService<T, CreateDTO, UpdateDTO> {
  constructor(
    protected repository: Repository<T>,
    protected validator: Validator<CreateDTO, UpdateDTO>,
    protected eventBus: EventBus
  ) {}
  
  async getById(id: string | number): Promise<T | null> {
    return await this.repository.findById(id);
  }
  
  async getAll(options: QueryOptions = {}): Promise<T[]> {
    return await this.repository.findAll(options);
  }
  
  async create(data: CreateDTO): Promise<T> {
    // Validate input
    await this.validator.validateCreate(data);
    
    // Create entity
    const entity = await this.repository.create(data);
    
    // Emit event
    this.eventBus.emit(\`\${this.getEntityName()}.created\`, { entity });
    
    return entity;
  }
  
  async update(id: string | number, data: Partial<UpdateDTO>): Promise<T> {
    // Check if entity exists
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError(\`\${this.getEntityName()} not found\`);
    }
    
    // Validate update data
    await this.validator.validateUpdate(data);
    
    // Update entity
    const updated = await this.repository.update(id, data);
    
    // Emit event
    this.eventBus.emit(\`\${this.getEntityName()}.updated\`, { 
      id, 
      entity: updated,
      changes: data
    });
    
    return updated;
  }
  
  async delete(id: string | number): Promise<void> {
    // Check if entity exists
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundError(\`\${this.getEntityName()} not found\`);
    }
    
    // Delete entity
    await this.repository.delete(id);
    
    // Emit event
    this.eventBus.emit(\`\${this.getEntityName()}.deleted\`, { id, entity: existing });
  }
  
  protected abstract getEntityName(): string;
}

// Specific Service Implementation
export class CustomerService extends GenericService<Customer, CreateCustomerDTO, UpdateCustomerDTO> {
  protected getEntityName(): string {
    return 'customer';
  }
  
  // Custom business methods
  async getCustomerAnalytics(customerId: number): Promise<CustomerAnalytics> {
    const customer = await this.getById(customerId);
    if (!customer) {
      throw new NotFoundError('Customer not found');
    }
    
    // Calculate analytics
    const orders = await this.orderRepository.findByCustomerId(customerId);
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
    
    return {
      customerId,
      totalOrders: orders.length,
      totalRevenue,
      averageOrderValue,
      lastOrderDate: orders[0]?.orderDate,
      customerSince: customer.createdAt
    };
  }
  
  async getCustomersBySegment(segment: CustomerSegment): Promise<Customer[]> {
    const criteria = this.buildSegmentCriteria(segment);
    return await this.repository.findByCriteria(criteria);
  }
  
  private buildSegmentCriteria(segment: CustomerSegment): QueryCriteria {
    switch (segment) {
      case 'high-value':
        return { totalRevenue: { gte: 10000 } };
      case 'frequent':
        return { totalOrders: { gte: 20 } };
      case 'new':
        return { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } };
      default:
        return {};
    }
  }
}
\`\`\`

This unified pattern library ensures consistency across the entire MCP ERP ecosystem, providing reusable components, standardized patterns, and proven architectural approaches that accelerate development while maintaining quality and cohesion.
`;