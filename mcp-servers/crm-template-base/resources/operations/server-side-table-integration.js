export default `# Server-Side Table Integration Pattern

## Overview
Complete integration pattern for server-side filtering with client-side pagination using nuqs and searchParamsCache. This pattern provides seamless URL-based state management with optimal performance.

## Core Components

### 1. Search Parameters Configuration

\`\`\`typescript
// lib/searchparams.ts
import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
  parseAsArrayOf
} from 'nuqs/server';

export const searchParams = {
  // Pagination
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  
  // Universal search
  name: parseAsString,
  search: parseAsString,
  
  // Domain-specific filters
  status: parseAsArrayOf(parseAsString),
  type: parseAsArrayOf(parseAsString),
  
  // Raw Materials specific
  materialChemistry: parseAsArrayOf(parseAsString),
  materialStatus: parseAsArrayOf(parseAsString),
  materialType: parseAsArrayOf(parseAsString),
  
  // Commercial Requests specific
  salesRep: parseAsArrayOf(parseAsString),
  requestType: parseAsArrayOf(parseAsString),
  
  // Additional filters as needed
  category: parseAsString,
  role: parseAsString,
  country: parseAsString,
  operation: parseAsString
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
\`\`\`

### 2. Server Component Pattern

\`\`\`typescript
// Server component for data fetching and filtering
export async function ItemListing() {
  // Extract search parameters
  const search = searchParamsCache.get('name');
  const status = searchParamsCache.get('status');
  const type = searchParamsCache.get('type');
  const page = searchParamsCache.get('page') ?? 1;
  const perPage = searchParamsCache.get('perPage') ?? 10;

  // Start with all data
  let filteredItems = allItemsData;

  // Apply text search across multiple fields
  if (search) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.primaryField.toLowerCase().includes(search.toLowerCase()) ||
        item.secondaryField.toLowerCase().includes(search.toLowerCase()) ||
        (item.optionalField && item.optionalField.toLowerCase().includes(search.toLowerCase()))
    );
  }

  // Apply status filter
  if (status && Array.isArray(status) && status.length > 0) {
    filteredItems = filteredItems.filter((item) =>
      status.includes(item.status)
    );
  }

  // Apply type filter
  if (type && Array.isArray(type) && type.length > 0) {
    filteredItems = filteredItems.filter((item) =>
      type.includes(item.type)
    );
  }

  // Calculate pagination
  const totalItems = filteredItems.length;
  const offset = (page - 1) * perPage;
  const paginatedItems = filteredItems.slice(offset, offset + perPage);

  return <ItemTable data={paginatedItems} totalItems={totalItems} />;
}
\`\`\`

### 3. Client Component Integration

\`\`\`typescript
'use client';

import { useDataTable } from '@/hooks/use-data-table';
import { parseAsInteger, useQueryState } from 'nuqs';

export function ItemTable({ data, totalItems }) {
  const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(10));
  
  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data,
    columns: getItemColumns(),
    pageCount: pageCount,
    shallow: false, // Enables URL state synchronization
    debounceMs: 500 // Prevents excessive server requests
  });

  // Client-side filtered data for exports
  const filteredData = table
    .getFilteredRowModel()
    .rows.map((row) => row.original);

  return (
    <DataTable table={table}>
      <DataTableResponsiveToolbar table={table}>
        <ExportToolbar data={data} filteredData={filteredData} />
      </DataTableResponsiveToolbar>
    </DataTable>
  );
}
\`\`\`

## Advanced Filtering Patterns

### 1. Restrictive AND Logic (Chemistry Example)
\`\`\`typescript
// For compatibility filtering - item must have ALL selected properties
if (chemistry && Array.isArray(chemistry) && chemistry.length > 0) {
  filteredMaterials = filteredMaterials.filter((material) => {
    return chemistry.every((selectedChem) => 
      material.chemistry.includes(selectedChem)
    );
  });
}
\`\`\`

### 2. Inclusive OR Logic (Status Example)
\`\`\`typescript
// For status filtering - item can have ANY of selected statuses
if (status && Array.isArray(status) && status.length > 0) {
  filteredItems = filteredItems.filter((item) =>
    status.includes(item.status)
  );
}
\`\`\`

### 3. Date Range Filtering
\`\`\`typescript
// Add to searchParams
dateFrom: parseAsString,
dateTo: parseAsString,

// Server-side filtering
if (dateFrom || dateTo) {
  filteredItems = filteredItems.filter((item) => {
    const itemDate = new Date(item.createdAt);
    if (dateFrom && itemDate < new Date(dateFrom)) return false;
    if (dateTo && itemDate > new Date(dateTo)) return false;
    return true;
  });
}
\`\`\`

## URL State Management

### Parameter Naming Conventions
\`\`\`typescript
// Standard parameters (all tables)
page: number
perPage: number  
name: string (universal search)

// Domain-specific parameters (prefix with domain)
materialChemistry: string[]
materialStatus: string[]
requestType: string[]
salesRep: string[]

// Avoid generic names that could conflict
// BAD: chemistry, status, type
// GOOD: materialChemistry, requestStatus, productType
\`\`\`

### URL Examples
\`\`\`
// Raw materials with search and filters
/raw-materials?name=pigmento&materialChemistry=Epoxy,Acrylic&page=2

// Commercial requests with multiple filters
/requests?name=cliente&status=PENDING&salesRep=John,Jane&perPage=25

// Users with search and pagination
/users?name=admin&role=ADMIN&page=1&perPage=10
\`\`\`

## Performance Optimization

### 1. Debounced Search
\`\`\`typescript
const { table } = useDataTable({
  data,
  columns,
  pageCount,
  shallow: false,
  debounceMs: 500 // Wait 500ms before triggering search
});
\`\`\`

### 2. Efficient Filtering
\`\`\`typescript
// Pre-filter on server to reduce client-side processing
export async function ItemListing() {
  // Apply filters in order of selectivity (most restrictive first)
  let filteredItems = allItems;
  
  // 1. Type filter (usually most restrictive)
  if (type) {
    filteredItems = filteredItems.filter(item => type.includes(item.type));
  }
  
  // 2. Status filter 
  if (status) {
    filteredItems = filteredItems.filter(item => status.includes(item.status));
  }
  
  // 3. Text search (least restrictive, applied last)
  if (search) {
    filteredItems = filteredItems.filter(/* search logic */);
  }
  
  return <ItemTable data={paginatedItems} totalItems={filteredItems.length} />;
}
\`\`\`

### 3. Memoization
\`\`\`typescript
// Memoize expensive column calculations
const columns = useMemo(() => getItemColumns(), []);

// Memoize filter options
const statusOptions = useMemo(() => 
  getUniqueValues(allItems, 'status'), [allItems]
);
\`\`\`

## Error Handling

### 1. Invalid Search Parameters
\`\`\`typescript
// Graceful fallback for invalid parameters
const page = Math.max(1, searchParamsCache.get('page') ?? 1);
const perPage = Math.min(100, Math.max(10, searchParamsCache.get('perPage') ?? 10));

// Validate array parameters
const status = searchParamsCache.get('status');
const validStatuses = status?.filter(s => VALID_STATUSES.includes(s)) ?? [];
\`\`\`

### 2. No Results Handling
\`\`\`typescript
// Let DataTable handle empty states naturally
export function ItemTable({ data, totalItems }) {
  // Don't add custom empty state - DataTable handles it
  return (
    <DataTable table={table}>
      <DataTableResponsiveToolbar table={table}>
        <ExportToolbar data={data} filteredData={filteredData} />
      </DataTableResponsiveToolbar>
    </DataTable>
  );
}
\`\`\`

## Integration Examples

### Raw Materials Implementation
\`\`\`typescript
// Server component
export async function RawMaterialsListing() {
  const search = searchParamsCache.get('name');
  const chemistry = searchParamsCache.get('materialChemistry');
  const status = searchParamsCache.get('materialStatus');
  const type = searchParamsCache.get('materialType');
  
  let filteredMaterials = rawMaterialsData;

  // Multi-field search
  if (search) {
    filteredMaterials = filteredMaterials.filter(
      (material) =>
        material.codigo.toLowerCase().includes(search.toLowerCase()) ||
        material.descripcion.toLowerCase().includes(search.toLowerCase()) ||
        (material.alias && material.alias.toLowerCase().includes(search.toLowerCase()))
    );
  }

  // AND logic for chemistry compatibility
  if (chemistry && chemistry.length > 0) {
    filteredMaterials = filteredMaterials.filter((material) => {
      return chemistry.every((chem) => material.chemistry.includes(chem));
    });
  }

  return <RawMaterialsTable data={paginatedMaterials} totalItems={totalMaterials} />;
}
\`\`\`

### Commercial Requests Implementation
\`\`\`typescript
export async function CommercialRequestsListing() {
  const search = searchParamsCache.get('name');
  const status = searchParamsCache.get('status');
  const salesRep = searchParamsCache.get('salesRep');
  const requestType = searchParamsCache.get('requestType');

  let filteredRequests = commercialRequestsData;

  // Multi-field search across request details
  if (search) {
    filteredRequests = filteredRequests.filter(
      (request) =>
        request.requestId.toLowerCase().includes(search.toLowerCase()) ||
        request.fantasyName.toLowerCase().includes(search.toLowerCase()) ||
        request.clientName.toLowerCase().includes(search.toLowerCase()) ||
        request.salesRep.toLowerCase().includes(search.toLowerCase())
    );
  }

  return <CommercialRequestsTable data={paginatedRequests} totalItems={totalRequests} />;
}
\`\`\`

## Best Practices

1. **Parameter Naming**: Use domain-prefixed names to avoid conflicts
2. **Filter Order**: Apply most restrictive filters first for performance
3. **Debouncing**: Use appropriate debounce times (300-500ms)
4. **Validation**: Validate and sanitize search parameters
5. **Fallbacks**: Provide sensible defaults for invalid parameters
6. **URL State**: Keep URLs clean and readable
7. **Performance**: Pre-filter on server, paginate client-side

## Success Metrics
- Search response time: <200ms average
- Filter application: <100ms average  
- URL state sync: 100% reliable
- Memory usage: Stable over extended sessions
- User experience: Seamless navigation with browser back/forward

This pattern provides robust, performant server-side integration with excellent user experience and URL state management.
`;