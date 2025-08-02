export default `# TypeScript Excellence - Enterprise Type Safety Patterns

This document establishes **EXCELLENCE** standards for TypeScript usage in enterprise applications, showcasing advanced type patterns, strict configuration, and robust type safety practices.

## Overview

TypeScript excellence in enterprise applications requires strict type safety, advanced type patterns, and comprehensive type coverage. This approach prevents runtime errors, improves developer experience, and ensures long-term maintainability.

## TypeScript Configuration Excellence

### Strict Configuration

\`\`\`json
// tsconfig.json - Maximum type safety configuration
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,                     // Enable all strict type checks
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    
    // Additional strict checks
    "noUncheckedIndexedAccess": true,   // Prevent undefined array access
    "noImplicitReturns": true,          // All code paths must return
    "noFallthroughCasesInSwitch": true, // Prevent switch fallthrough
    "noImplicitOverride": true,         // Explicit override keyword
    "exactOptionalPropertyTypes": true, // Strict optional properties
    
    // Path mapping
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/types/*": ["./src/types/*"]
    },
    
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
\`\`\`

### Environment Type Safety

\`\`\`tsx
// src/lib/env.ts - Type-safe environment variables with t3-env
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const Env = createEnv({
  server: {
    // Database
    DATABASE_URL: z.string().url(),
    
    // Authentication
    CLERK_SECRET_KEY: z.string().min(1),
    
    // External APIs
    ARCJET_KEY: z.string().startsWith('ajkey_').optional(),
    
    // Monitoring
    BETTER_STACK_SOURCE_TOKEN: z.string().optional(),
  },
  
  client: {
    // Public configuration
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    
    // Analytics
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
  },
  
  shared: {
    NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
  },
  
  // Runtime environment mapping
  runtimeEnv: {
    // Server
    DATABASE_URL: process.env.DATABASE_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    ARCJET_KEY: process.env.ARCJET_KEY,
    BETTER_STACK_SOURCE_TOKEN: process.env.BETTER_STACK_SOURCE_TOKEN,
    
    // Client
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    
    // Shared
    NODE_ENV: process.env.NODE_ENV,
  },
  
  // Skip validation during build
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

// Usage: Env.DATABASE_URL (fully typed and validated)
\`\`\`

## Advanced Type Patterns

### 1. Discriminated Unions for Domain Modeling

\`\`\`tsx
// src/types/request.types.ts - Domain-driven type modeling

// Base request interface
interface BaseRequest {
  id: string;
  clientName: string;
  laboratory: 'IBSO' | 'EXTERNAL';
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}

// Discriminated union for different request types
export type Request = 
  | LWRRequest
  | TLWRRequest
  | VLWRRequest;

interface LWRRequest extends BaseRequest {
  requestType: 'LWR';
  productSpecification: string;
  applicationParameters: string;
  panelSize: string;
  clientDelivered: boolean;
  sellerDelivered: boolean;
  microProduction?: boolean;
  
  // LWR-specific optional fields
  powderProperties?: PowderProperties;
  contactInfo?: ContactInfo;
}

interface TLWRRequest extends BaseRequest {
  requestType: 'TLWR';
  testingInformation: string;
  requirements: string;
  
  // Test selections
  saltFogTest: boolean;
  quvTest: boolean;
  qsunTest: boolean;
  chemicalResistanceTest: boolean;
  powderSample: boolean;
  
  // Test-specific configurations
  saltFogConfig?: SaltFogTestConfig;
  powderSampleConfig?: PowderSampleConfig;
}

interface VLWRRequest extends BaseRequest {
  requestType: 'VLWR';
  validationParameters: string;
  complianceRequirements: string[];
  
  // VLWR-specific fields
  rawMaterialEvaluation?: boolean;
  finishedPowderEvaluation?: boolean;
  productionDetails?: ProductionDetails;
}

// Type guards for runtime type checking
export function isLWRRequest(request: Request): request is LWRRequest {
  return request.requestType === 'LWR';
}

export function isTLWRRequest(request: Request): request is TLWRRequest {
  return request.requestType === 'TLWR';
}

export function isVLWRRequest(request: Request): request is VLWRRequest {
  return request.requestType === 'VLWR';
}

// Usage with type narrowing
function processRequest(request: Request) {
  switch (request.requestType) {
    case 'LWR':
      // TypeScript knows this is LWRRequest
      console.log(request.productSpecification);
      break;
    case 'TLWR':
      // TypeScript knows this is TLWRRequest
      console.log(request.testingInformation);
      break;
    case 'VLWR':
      // TypeScript knows this is VLWRRequest
      console.log(request.validationParameters);
      break;
    default:
      // Exhaustiveness check - TypeScript will error if new types added
      const _exhaustive: never = request;
      return _exhaustive;
  }
}
\`\`\`

### 2. Template Literal Types for API Endpoints

\`\`\`tsx
// src/types/api.types.ts - Type-safe API endpoint construction

// Resource types
type ResourceType = 'requests' | 'users' | 'notifications' | 'analytics';

// Action types
type ActionType = 'list' | 'create' | 'read' | 'update' | 'delete';

// Status update endpoints
type StatusUpdateEndpoint = \`/requests/\${string}/status\`;
type AttachmentEndpoint = \`/requests/\${string}/attachments\`;
type TestResultEndpoint = \`/requests/\${string}/tests/\${string}/results\`;

// Template literal type for API endpoints
type APIEndpoint<T extends ResourceType, A extends ActionType> = 
  T extends 'requests' 
    ? A extends 'list' 
      ? '/requests'
      : A extends 'create'
      ? '/requests'
      : A extends 'read' | 'update' | 'delete'
      ? \`/requests/\${string}\`
      : never
    : T extends 'users'
    ? A extends 'list'
      ? '/users'
      : A extends 'read' | 'update'
      ? \`/users/\${string}\`
      : never
    : never;

// Type-safe API client
class TypedAPIClient {
  async get<T extends ResourceType, A extends ActionType>(
    endpoint: APIEndpoint<T, A>
  ): Promise<APIResponse<T, A>> {
    const response = await fetch(endpoint);
    return response.json();
  }

  async post<T extends ResourceType>(
    endpoint: APIEndpoint<T, 'create'>,
    data: CreateData<T>
  ): Promise<APIResponse<T, 'create'>> {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

// Usage - TypeScript prevents invalid endpoints
const api = new TypedAPIClient();

// ✅ Valid endpoints
await api.get('/requests');
await api.get('/requests/123');
await api.post('/requests', requestData);

// ❌ Invalid endpoints - TypeScript error
// await api.get('/invalid');
// await api.post('/requests/123', data); // POST to specific ID not allowed
\`\`\`

### 3. Conditional Types for Form Validation

\`\`\`tsx
// src/types/forms.types.ts - Conditional type patterns for forms

// Base form field configuration
interface BaseFieldConfig {
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

// Field type-specific configurations
interface TextFieldConfig extends BaseFieldConfig {
  type: 'text' | 'email' | 'password';
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

interface NumberFieldConfig extends BaseFieldConfig {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select';
  options: Array<{ value: string; label: string }>;
  multiple?: boolean;
}

interface BooleanFieldConfig extends BaseFieldConfig {
  type: 'boolean';
  defaultValue?: boolean;
}

// Union of all field configs
type FieldConfig = 
  | TextFieldConfig 
  | NumberFieldConfig 
  | SelectFieldConfig 
  | BooleanFieldConfig;

// Conditional type to extract value type based on field config
type FieldValue<T extends FieldConfig> = 
  T extends TextFieldConfig ? string :
  T extends NumberFieldConfig ? number :
  T extends SelectFieldConfig 
    ? T['multiple'] extends true 
      ? string[] 
      : string :
  T extends BooleanFieldConfig ? boolean :
  never;

// Form schema type construction
type FormSchema<T extends Record<string, FieldConfig>> = {
  [K in keyof T]: FieldValue<T[K]>
};

// Example usage
const requestFormSchema = {
  clientName: {
    type: 'text' as const,
    label: 'Client Name',
    required: true,
    minLength: 2,
  },
  urgency: {
    type: 'select' as const,
    label: 'Urgency',
    options: [
      { value: 'low', label: 'Low' },
      { value: 'normal', label: 'Normal' },
      { value: 'high', label: 'High' },
    ],
  },
  microProduction: {
    type: 'boolean' as const,
    label: 'Micro Production',
    defaultValue: false,
  },
} as const;

// TypeScript infers the correct form data type
type RequestFormData = FormSchema<typeof requestFormSchema>;
// Result:
// {
//   clientName: string;
//   urgency: string;
//   microProduction: boolean;
// }
\`\`\`

### 4. Utility Types for State Management

\`\`\`tsx
// src/types/state.types.ts - Advanced utility types

// Deep readonly type
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends (infer U)[]
    ? ReadonlyArray<DeepReadonly<U>>
    : T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

// Partial deep type
type PartialDeep<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? PartialDeep<U>[]
    : T[P] extends object
    ? PartialDeep<T[P]>
    : T[P];
};

// Required deep type
type RequiredDeep<T> = {
  [P in keyof T]-?: T[P] extends (infer U)[]
    ? RequiredDeep<U>[]
    : T[P] extends object
    ? RequiredDeep<T[P]>
    : T[P];
};

// State slice type for feature-based state
type StateSlice<T, K extends keyof T> = {
  [P in K]: T[P];
} & {
  update: (updates: PartialDeep<Pick<T, K>>) => void;
  reset: () => void;
};

// Loading state wrapper
type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
};

// Create typed async state
function createAsyncState<T>(): AsyncState<T> {
  return {
    data: null,
    loading: false,
    error: null,
    lastFetch: null,
  };
}

// Usage in state management
interface AppState {
  requests: AsyncState<Request[]>;
  currentUser: AsyncState<User>;
  notifications: AsyncState<Notification[]>;
}

// Type-safe state updates
function updateAsyncState<T>(
  state: AsyncState<T>,
  update: Partial<AsyncState<T>>
): AsyncState<T> {
  return { ...state, ...update };
}
\`\`\`

## Component Type Safety

### 1. Strict Component Props

\`\`\`tsx
// src/components/ui/data-table.tsx - Strictly typed generic component

import { ComponentPropsWithoutRef, forwardRef } from 'react';

// Base table props
interface BaseTableProps<T extends Record<string, unknown>> 
  extends Omit<ComponentPropsWithoutRef<'table'>, 'children'> {
  data: T[];
  loading?: boolean;
  error?: string | null;
}

// Column definition with type safety
interface ColumnDef<T extends Record<string, unknown>, K extends keyof T = keyof T> {
  key: K;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: T[K], row: T, index: number) => React.ReactNode;
  className?: string;
}

// Main table props
interface DataTableProps<T extends Record<string, unknown>> 
  extends BaseTableProps<T> {
  columns: ColumnDef<T>[];
  onRowClick?: (row: T, index: number) => void;
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void;
  keyExtractor?: (row: T, index: number) => string;
}

// Generic data table component with full type safety
export const DataTable = forwardRef<
  HTMLTableElement,
  DataTableProps<Record<string, unknown>>
>(function DataTable<T extends Record<string, unknown>>(
  {
    data,
    columns,
    loading = false,
    error = null,
    onRowClick,
    onSort,
    keyExtractor = (_, index) => index.toString(),
    className,
    ...props
  }: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>
) {
  if (error) {
    return (
      <div className="p-4 text-center text-destructive">
        Error: {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 text-center">
        Loading...
      </div>
    );
  }

  return (
    <table 
      ref={ref} 
      className={cn("w-full border-collapse", className)} 
      {...props}
    >
      <thead>
        <tr>
          {columns.map((column) => (
            <th 
              key={String(column.key)}
              className={cn("p-2 text-left border-b", column.className)}
              style={{ width: column.width }}
            >
              {column.sortable ? (
                <button
                  onClick={() => onSort?.(column.key, 'asc')}
                  className="flex items-center space-x-1 hover:text-primary"
                >
                  <span>{column.label}</span>
                  <ChevronUpDown className="h-4 w-4" />
                </button>
              ) : (
                column.label
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr 
            key={keyExtractor(row, index)}
            onClick={() => onRowClick?.(row, index)}
            className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
          >
            {columns.map((column) => (
              <td 
                key={String(column.key)} 
                className="p-2 border-b"
              >
                {column.render 
                  ? column.render(row[column.key], row, index)
                  : String(row[column.key] ?? '')
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});

// Usage with full type inference
const requestColumns: ColumnDef<Request>[] = [
  {
    key: 'id',
    label: 'ID',
    width: '100px',
  },
  {
    key: 'clientName',
    label: 'Client',
    sortable: true,
  },
  {
    key: 'status',
    label: 'Status',
    render: (status) => (
      <Badge variant={getStatusVariant(status)}>
        {status}
      </Badge>
    ),
  },
];

function RequestsTable({ requests }: { requests: Request[] }) {
  return (
    <DataTable
      data={requests}
      columns={requestColumns}
      onRowClick={(request) => {
        // TypeScript knows request is of type Request
        console.log('Clicked request:', request.id);
      }}
    />
  );
}
\`\`\`

### 2. Hook Type Safety

\`\`\`tsx
// src/hooks/useTypedQuery.ts - Type-safe query hook

import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

// Type-safe query key factory
const queryKeys = {
  requests: {
    all: ['requests'] as const,
    lists: () => [...queryKeys.requests.all, 'list'] as const,
    list: (filters: RequestFilters) => [...queryKeys.requests.lists(), filters] as const,
    details: () => [...queryKeys.requests.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.requests.details(), id] as const,
  },
  users: {
    all: ['users'] as const,
    detail: (id: string) => [...queryKeys.users.all, id] as const,
  },
} as const;

// Type-safe query hook with automatic key inference
function useTypedQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[]
>(
  queryKey: TQueryKey,
  queryFn: () => Promise<TQueryFnData>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
}

// Typed query hooks for specific resources
export function useRequests(filters?: RequestFilters) {
  return useTypedQuery(
    queryKeys.requests.list(filters ?? {}),
    () => requestApi.getAll(filters),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
    }
  );
}

export function useRequest(id: string) {
  return useTypedQuery(
    queryKeys.requests.detail(id),
    () => requestApi.getById(id),
    {
      enabled: !!id,
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );
}

// Export query keys for cache invalidation
export { queryKeys };
\`\`\`

## Form Type Safety with Zod

### 1. Schema-Driven Form Types

\`\`\`tsx
// src/schemas/request.schema.ts - Zod schemas with type inference

import { z } from 'zod';

// Base schemas for composition
const baseRequestSchema = z.object({
  clientName: z.string().min(1, 'Client name is required').max(100),
  laboratory: z.enum(['IBSO', 'EXTERNAL']),
  urgency: z.enum(['low', 'normal', 'high']),
  notes: z.string().max(1000).optional(),
});

// LWR-specific schema
const lwrSchema = z.object({
  requestType: z.literal('LWR'),
  productSpecification: z.string().min(1, 'Product specification is required'),
  applicationParameters: z.string().min(1, 'Application parameters are required'),
  panelSize: z.string().min(1, 'Panel size is required'),
  clientDelivered: z.boolean(),
  sellerDelivered: z.boolean(),
  microProduction: z.boolean().optional(),
});

// TLWR-specific schema
const tlwrSchema = z.object({
  requestType: z.literal('TLWR'),
  testingInformation: z.string().min(1, 'Testing information is required'),
  requirements: z.string().min(1, 'Requirements are required'),
  saltFogTest: z.boolean(),
  quvTest: z.boolean(),
  qsunTest: z.boolean(),
  chemicalResistanceTest: z.boolean(),
  powderSample: z.boolean(),
});

// Discriminated union schema
export const newRequestSchema = z.discriminatedUnion('requestType', [
  baseRequestSchema.merge(lwrSchema),
  baseRequestSchema.merge(tlwrSchema),
]);

// Infer TypeScript types from schema
export type NewRequestFormData = z.infer<typeof newRequestSchema>;
export type LWRFormData = Extract<NewRequestFormData, { requestType: 'LWR' }>;
export type TLWRFormData = Extract<NewRequestFormData, { requestType: 'TLWR' }>;

// Runtime type guards from schema
export function isValidNewRequest(data: unknown): data is NewRequestFormData {
  return newRequestSchema.safeParse(data).success;
}

// Partial schemas for updates
export const updateRequestSchema = newRequestSchema.partial().extend({
  id: z.string().uuid(),
});

export type UpdateRequestData = z.infer<typeof updateRequestSchema>;
\`\`\`

### 2. Type-Safe Form Hook

\`\`\`tsx
// src/hooks/useTypedForm.ts - Fully typed form hook

import { useForm, UseFormProps, UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Type-safe form hook with Zod integration
export function useTypedForm<
  TSchema extends z.ZodType<any, any>,
  TFieldValues extends FieldValues = z.infer<TSchema>
>(
  schema: TSchema,
  props?: Omit<UseFormProps<TFieldValues>, 'resolver'>
): UseFormReturn<TFieldValues> & {
  // Enhanced methods with better type safety
  setFieldValue: <TFieldName extends Path<TFieldValues>>(
    name: TFieldName,
    value: TFieldValues[TFieldName]
  ) => void;
  getFieldValue: <TFieldName extends Path<TFieldValues>>(
    name: TFieldName
  ) => TFieldValues[TFieldName];
} {
  const form = useForm<TFieldValues>({
    resolver: zodResolver(schema),
    ...props,
  });

  return {
    ...form,
    setFieldValue: (name, value) => form.setValue(name, value),
    getFieldValue: (name) => form.getValues(name),
  };
}

// Usage with full type safety
export function useNewRequestForm() {
  return useTypedForm(newRequestSchema, {
    mode: 'onChange',
    defaultValues: {
      clientName: '',
      laboratory: 'IBSO' as const,
      requestType: 'LWR' as const,
      urgency: 'normal' as const,
      productSpecification: '',
      applicationParameters: '',
      panelSize: '',
      clientDelivered: false,
      sellerDelivered: false,
    },
  });
}
\`\`\`

## API Type Safety

### 1. Typed API Client

\`\`\`tsx
// src/services/typed-api-client.ts - Fully typed API client

// API endpoint configuration
const API_ENDPOINTS = {
  requests: {
    list: '/api/requests',
    create: '/api/requests',
    get: (id: string) => \`/api/requests/\${id}\`,
    update: (id: string) => \`/api/requests/\${id}\`,
    delete: (id: string) => \`/api/requests/\${id}\`,
    updateStatus: (id: string) => \`/api/requests/\${id}/status\`,
  },
  users: {
    list: '/api/users',
    get: (id: string) => \`/api/users/\${id}\`,
    update: (id: string) => \`/api/users/\${id}\`,
  },
} as const;

// Response wrapper type
interface APIResponse<T> {
  data: T;
  message?: string;
  errors?: string[];
}

// Paginated response type
interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Type-safe API client class
class TypedAPIClient {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  setAuthToken(token: string) {
    this.headers.Authorization = \`Bearer \${token}\`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = \`\${this.baseURL}\${endpoint}\`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        message: response.statusText 
      }));
      throw new APIError(error.message || 'Request failed', response.status);
    }

    return response.json();
  }

  // Typed CRUD methods
  async get<T>(endpoint: string): Promise<APIResponse<T>> {
    return this.request<APIResponse<T>>(endpoint);
  }

  async post<TRequest, TResponse>(
    endpoint: string,
    data: TRequest
  ): Promise<APIResponse<TResponse>> {
    return this.request<APIResponse<TResponse>>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<TRequest, TResponse>(
    endpoint: string,
    data: TRequest
  ): Promise<APIResponse<TResponse>> {
    return this.request<APIResponse<TResponse>>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string): Promise<APIResponse<void>> {
    return this.request<APIResponse<void>>(endpoint, {
      method: 'DELETE',
    });
  }
}

// Custom error class
class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Typed service factory
function createTypedService<T extends Record<string, unknown>>(
  endpoints: typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS]
) {
  const client = new TypedAPIClient();

  return {
    getAll: async (params?: Record<string, string | number>): Promise<T[]> => {
      const queryString = params ? new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ).toString() : '';
      
      const endpoint = queryString ? \`\${endpoints.list}?\${queryString}\` : endpoints.list;
      const response = await client.get<T[]>(endpoint);
      return response.data;
    },

    getById: async (id: string): Promise<T> => {
      const response = await client.get<T>(endpoints.get(id));
      return response.data;
    },

    create: async (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> => {
      const response = await client.post<typeof data, T>(endpoints.create, data);
      return response.data;
    },

    update: async (id: string, data: Partial<T>): Promise<T> => {
      const response = await client.put<Partial<T>, T>(endpoints.update(id), data);
      return response.data;
    },

    delete: async (id: string): Promise<void> => {
      await client.delete(endpoints.delete(id));
    },
  };
}

// Typed service instances
export const requestService = createTypedService<Request>(API_ENDPOINTS.requests);
export const userService = createTypedService<User>(API_ENDPOINTS.users);

export { APIError };
\`\`\`

## Implementation Guidelines

### MUST DO:
1. Enable strict TypeScript configuration with all safety checks
2. Use discriminated unions for domain modeling
3. Implement type-safe environment variable validation
4. Create strongly typed API clients and services
5. Use Zod for runtime type validation and schema inference
6. Implement proper error types and handling
7. Use utility types for complex state management

### MUST NOT DO:
1. Use \`any\` type except for truly dynamic content
2. Skip runtime validation for external data
3. Ignore TypeScript errors or use \`@ts-ignore\`
4. Create loosely typed API interfaces
5. Mix typed and untyped code in the same module
6. Skip type exports from feature modules
7. Use implicit returns in functions without proper typing

## Benefits of TypeScript Excellence

### 1. Runtime Safety
- Compile-time error detection prevents runtime failures
- Type guards ensure data integrity
- Schema validation catches invalid data early
- Exhaustive pattern matching prevents missed cases

### 2. Developer Experience
- Superior IDE support with auto-completion
- Refactoring safety across the codebase
- Clear API contracts and documentation
- Better debugging with type information

### 3. Maintainability
- Self-documenting code through types
- Easier onboarding for new developers
- Reduced need for manual testing
- Confident large-scale refactoring

### 4. Scalability
- Type safety scales with codebase size
- Clear module boundaries and dependencies
- Prevents integration errors between features
- Supports large team development

This TypeScript excellence pattern is **MANDATORY** for all enterprise applications to ensure code quality, developer productivity, and long-term maintainability.`;