export default `# Feature-Based Organization - Enterprise Application Architecture

This document establishes the **MANDATORY** feature-based organization pattern for enterprise applications, providing scalable structure for complex business domains while maintaining clear boundaries and dependencies.

## Overview

Feature-based organization organizes code by business capability rather than technical layers, creating self-contained modules that encapsulate related functionality. This approach scales from startup to enterprise while maintaining code clarity and team autonomy.

## Core Principles

### 1. Business Domain Boundaries
- Organize by business features, not technical layers
- Each feature owns its complete vertical slice
- Clear interfaces between feature boundaries
- Domain-driven design principles

### 2. Self-Contained Modules
- Each feature contains all necessary code
- Minimal dependencies between features
- Shared code only for truly common concerns
- Independent deployment capabilities

### 3. Consistent Structure
- Standardized internal feature structure
- Predictable file organization
- Common patterns across all features
- Clear ownership and responsibility

## Standard Feature Structure

\`\`\`bash
src/
├── features/
│   ├── commercial-requests/          # Business domain feature
│   │   ├── components/              # UI components specific to this feature
│   │   │   ├── new-request-form/    # Complex component with subcomponents
│   │   │   │   ├── index.tsx        # Main component export
│   │   │   │   ├── components/      # Internal subcomponents
│   │   │   │   ├── hooks/          # Feature-specific hooks
│   │   │   │   ├── schemas/        # Validation schemas
│   │   │   │   └── sections/       # Form sections organization
│   │   │   ├── request-list/       # Another component group
│   │   │   └── request-details/    # Details component
│   │   ├── hooks/                  # Feature-wide hooks
│   │   │   ├── useRequests.ts      # Data fetching hooks
│   │   │   ├── useRequestValidation.ts
│   │   │   └── useRequestWorkflow.ts
│   │   ├── services/               # API and business logic
│   │   │   ├── request-api.ts      # API interactions
│   │   │   ├── request-validation.ts
│   │   │   └── request-utils.ts
│   │   ├── types/                  # TypeScript definitions
│   │   │   ├── request.types.ts
│   │   │   └── api.types.ts
│   │   ├── constants/              # Feature constants
│   │   │   └── request-constants.ts
│   │   └── index.ts               # Public API exports
│   │
│   ├── notifications/              # Another business domain
│   │   ├── components/
│   │   │   ├── approval-modal/
│   │   │   ├── notification-list/
│   │   │   └── user-approval-modal/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   └── user-management/            # User domain feature
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
│
├── shared/                         # Truly shared code
│   ├── components/                 # Reusable UI components
│   ├── hooks/                     # Generic hooks
│   ├── services/                  # Common services
│   ├── types/                     # Shared types
│   └── utils/                     # Utility functions
│
├── app/                           # Next.js App Router
│   ├── (dashboard)/              # Route groups
│   │   ├── requests/             # Feature routes
│   │   │   ├── page.tsx          # Uses commercial-requests feature
│   │   │   ├── new/
│   │   │   └── [id]/
│   │   └── notifications/
│   └── layout.tsx
│
└── components/                    # Global UI system
    ├── ui/                       # shadcn/ui components
    └── layout/                   # Layout components
\`\`\`

## Feature Module Architecture

### 1. Feature Index (Public API)

\`\`\`tsx
// src/features/commercial-requests/index.ts
// Public API - only export what other features need

// Main components
export { NewRequestForm } from './components/new-request-form';
export { RequestList } from './components/request-list';
export { RequestDetails } from './components/request-details';

// Hooks for external use
export { useRequests } from './hooks/useRequests';
export { useRequestById } from './hooks/useRequestById';

// Types that other features might need
export type { Request, RequestStatus, RequestType } from './types/request.types';

// Services for external API calls
export { requestApi } from './services/request-api';

// Constants that might be needed externally
export { REQUEST_STATUSES, REQUEST_TYPES } from './constants/request-constants';

// DO NOT export internal implementation details
// - Internal hooks (useRequestValidation)
// - Internal utils
// - Component implementation details
\`\`\`

### 2. Internal Component Organization

\`\`\`tsx
// src/features/commercial-requests/components/new-request-form/index.tsx
// Complex component with internal organization

import React from 'react';
import { useNewRequestForm } from './hooks/useNewRequestForm';
import { BasicInfoSection } from './sections/BasicInfoSection';
import { RequestTypeSection } from './sections/RequestTypeSection';

export function NewRequestForm() {
  const {
    form,
    currentStep,
    steps,
    isSubmitting,
    nextStep,
    previousStep,
    submitForm
  } = useNewRequestForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        {/* Step-based rendering */}
        {currentStep === 0 && <BasicInfoSection form={form} />}
        {currentStep === 1 && <RequestTypeSection form={form} />}
        
        {/* Navigation */}
        <div className="flex justify-between">
          <Button onClick={previousStep} disabled={currentStep === 0}>
            Previous
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          ) : (
            <Button onClick={() => nextStep(form)}>
              Next
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
\`\`\`

### 3. Feature-Specific Hooks

\`\`\`tsx
// src/features/commercial-requests/hooks/useRequests.ts
// Feature-specific data management

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { requestApi } from '../services/request-api';
import type { Request, CreateRequestData } from '../types/request.types';

export function useRequests() {
  return useQuery({
    queryKey: ['requests'],
    queryFn: requestApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useRequestById(id: string) {
  return useQuery({
    queryKey: ['requests', id],
    queryFn: () => requestApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateRequest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateRequestData) => requestApi.create(data),
    onSuccess: () => {
      // Invalidate requests list
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });
}

export function useUpdateRequestStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      requestApi.updateStatus(id, status),
    onSuccess: (_, { id }) => {
      // Invalidate specific request and list
      queryClient.invalidateQueries({ queryKey: ['requests', id] });
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });
}
\`\`\`

### 4. Service Layer

\`\`\`tsx
// src/features/commercial-requests/services/request-api.ts
// API abstraction for the feature

import { apiClient } from '@/shared/services/api-client';
import type { Request, CreateRequestData, UpdateRequestData } from '../types/request.types';

export const requestApi = {
  // Get all requests with optional filtering
  getAll: async (filters?: Record<string, any>): Promise<Request[]> => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(\`/requests?\${params}\`);
    return response.data;
  },

  // Get single request by ID
  getById: async (id: string): Promise<Request> => {
    const response = await apiClient.get(\`/requests/\${id}\`);
    return response.data;
  },

  // Create new request
  create: async (data: CreateRequestData): Promise<Request> => {
    const response = await apiClient.post('/requests', data);
    return response.data;
  },

  // Update existing request
  update: async (id: string, data: UpdateRequestData): Promise<Request> => {
    const response = await apiClient.put(\`/requests/\${id}\`, data);
    return response.data;
  },

  // Update request status
  updateStatus: async (id: string, status: string): Promise<Request> => {
    const response = await apiClient.patch(\`/requests/\${id}/status\`, { status });
    return response.data;
  },

  // Delete request
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(\`/requests/\${id}\`);
  },
};
\`\`\`

### 5. Type Definitions

\`\`\`tsx
// src/features/commercial-requests/types/request.types.ts
// Feature-specific type definitions

export interface Request {
  id: string;
  clientName: string;
  laboratory: 'IBSO' | 'EXTERNAL';
  requestType: 'LWR' | 'TLWR' | 'VLWR';
  status: RequestStatus;
  urgency: 'low' | 'normal' | 'high';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  
  // Type-specific fields
  productSpecification?: string;
  testingRequirements?: string;
  
  // Relations
  attachments: Attachment[];
  timeline: TimelineEvent[];
}

export type RequestStatus = 
  | 'draft'
  | 'submitted' 
  | 'in_review'
  | 'approved'
  | 'in_progress'
  | 'completed'
  | 'rejected';

export type RequestType = 'LWR' | 'TLWR' | 'VLWR';

export interface CreateRequestData {
  clientName: string;
  laboratory: 'IBSO' | 'EXTERNAL';
  requestType: RequestType;
  urgency: 'low' | 'normal' | 'high';
  productSpecification?: string;
  testingRequirements?: string;
  attachments?: File[];
}

export interface UpdateRequestData extends Partial<CreateRequestData> {
  status?: RequestStatus;
}

// API response types
export interface RequestsResponse {
  data: Request[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
\`\`\`

## Route Organization

### App Router Integration

\`\`\`tsx
// app/(dashboard)/requests/page.tsx
// Route consumes feature through public API

import { RequestList } from '@/features/commercial-requests';
import { PageContainer } from '@/components/layout/page-container';

export default function RequestsPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Commercial Requests</h1>
          <Button asChild>
            <Link href="/requests/new">New Request</Link>
          </Button>
        </div>
        
        <RequestList />
      </div>
    </PageContainer>
  );
}
\`\`\`

\`\`\`tsx
// app/(dashboard)/requests/new/page.tsx
// New request route

import { NewRequestForm } from '@/features/commercial-requests';
import { PageContainer } from '@/components/layout/page-container';

export default function NewRequestPage() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">New Commercial Request</h1>
        <NewRequestForm />
      </div>
    </PageContainer>
  );
}
\`\`\`

## Cross-Feature Communication

### 1. Direct Import Pattern

\`\`\`tsx
// src/features/notifications/components/request-notification.tsx
// Feature importing from another feature's public API

import { useRequestById, type Request } from '@/features/commercial-requests';

interface RequestNotificationProps {
  requestId: string;
}

export function RequestNotification({ requestId }: RequestNotificationProps) {
  const { data: request, isLoading } = useRequestById(requestId);
  
  if (isLoading) return <div>Loading...</div>;
  if (!request) return <div>Request not found</div>;
  
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold">Request Update</h3>
      <p>Request {request.id} status changed to {request.status}</p>
    </div>
  );
}
\`\`\`

### 2. Event-Driven Communication

\`\`\`tsx
// src/shared/services/event-bus.ts
// Decoupled communication between features

type EventMap = {
  'request:created': { requestId: string; request: Request };
  'request:status-changed': { requestId: string; oldStatus: string; newStatus: string };
  'notification:sent': { notificationId: string; userId: string };
};

class EventBus {
  private listeners = new Map<keyof EventMap, Function[]>();

  on<T extends keyof EventMap>(event: T, callback: (data: EventMap[T]) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  emit<T extends keyof EventMap>(event: T, data: EventMap[T]) {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }
}

export const eventBus = new EventBus();
\`\`\`

\`\`\`tsx
// Usage in commercial-requests feature
import { eventBus } from '@/shared/services/event-bus';

export function useCreateRequest() {
  return useMutation({
    mutationFn: requestApi.create,
    onSuccess: (request) => {
      // Emit event for other features to react
      eventBus.emit('request:created', { requestId: request.id, request });
    },
  });
}
\`\`\`

## Shared Code Organization

### 1. Truly Shared Components

\`\`\`tsx
// src/shared/components/data-table/index.tsx
// Generic, reusable across all features

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({ data, columns, isLoading, onRowClick }: DataTableProps<T>) {
  // Generic table implementation
  return (
    <div className="space-y-4">
      {/* Table implementation */}
    </div>
  );
}
\`\`\`

### 2. Shared Services

\`\`\`tsx
// src/shared/services/api-client.ts
// HTTP client used by all features

import axios from 'axios';
import { getAuthToken } from './auth';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// Request interceptor for auth
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { apiClient };
\`\`\`

## Testing Strategy

### Feature-Level Testing

\`\`\`tsx
// src/features/commercial-requests/__tests__/useRequests.test.ts
// Test feature hooks in isolation

import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRequests } from '../hooks/useRequests';
import { requestApi } from '../services/request-api';

// Mock the API
jest.mock('../services/request-api');
const mockRequestApi = requestApi as jest.Mocked<typeof requestApi>;

describe('useRequests', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  it('should fetch requests successfully', async () => {
    const mockRequests = [
      { id: '1', clientName: 'Test Client', status: 'active' },
    ];
    mockRequestApi.getAll.mockResolvedValue(mockRequests);

    const { result } = renderHook(() => useRequests(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockRequests);
    });
  });
});
\`\`\`

## Migration Guidelines

### Converting Layered to Feature-Based

1. **Identify Business Domains**
   - Analyze existing routes and components
   - Group related functionality
   - Define feature boundaries

2. **Create Feature Structure**
   - Move related components to feature folder
   - Extract feature-specific hooks
   - Consolidate related services

3. **Define Public APIs**
   - Create feature index files
   - Export only necessary items
   - Document cross-feature dependencies

4. **Update Imports**
   - Change imports to use feature public APIs
   - Remove direct file imports
   - Update route files to use features

## Implementation Guidelines

### MUST DO:
1. Organize by business domain, not technical layers
2. Create self-contained feature modules
3. Define clear public APIs for each feature
4. Keep shared code truly generic
5. Use consistent internal structure across features
6. Implement proper cross-feature communication patterns

### MUST NOT DO:
1. Create features based on technical concerns (UI, API, etc.)
2. Allow direct imports between feature internals
3. Put feature-specific code in shared folders
4. Create circular dependencies between features
5. Skip defining clear feature boundaries
6. Mix business logic with routing logic

## Benefits of Feature-Based Organization

### 1. Scalability
- Features can be developed independently
- Teams can own specific business domains
- Easy to add new features without conflicts
- Clear code ownership and responsibility

### 2. Maintainability
- Related code is colocated
- Easy to understand feature scope
- Minimal impact when changing features
- Clear dependency tracking

### 3. Team Productivity
- Parallel development capabilities
- Reduced merge conflicts
- Domain expertise alignment
- Clear testing boundaries

### 4. Code Quality
- Single responsibility at feature level
- Easier to enforce patterns
- Better abstraction boundaries
- Improved reusability

This feature-based organization pattern is **MANDATORY** for all enterprise applications to ensure scalability, maintainability, and team productivity.`;