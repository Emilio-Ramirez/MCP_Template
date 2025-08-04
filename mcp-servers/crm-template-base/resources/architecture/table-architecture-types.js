export default `# Table Architecture Types - Decision Matrix

## Overview
Comprehensive guide for choosing between Standalone and Tabbed table patterns based on use case requirements, architectural constraints, and implementation complexity.

## Pattern Types

### A. Standalone Tables (Primary Pattern)

**Use Cases**:
- Main listing pages (Users, Clients, Raw Materials, Commercial Requests)
- Dashboard data displays
- Search and filter interfaces
- Export-heavy applications
- Full-featured data management

**Architecture**:
- Full DataTable implementation with TanStack Table
- Complete search and filtering capabilities
- Modal-based detail views
- Integrated export functionality
- Responsive design with mobile optimization

**Implementation Example**:
\`\`\`typescript
// Standalone table structure
export async function ItemListing() {
  // Server-side filtering
  const search = searchParamsCache.get('name');
  const filters = getFilters();
  
  let filteredItems = applyFilters(allItems, { search, ...filters });
  
  return <ItemTable data={paginatedItems} totalItems={totalItems} />;
}

// Full-featured table component
export function ItemTable({ data, totalItems }) {
  const { table } = useDataTable({
    data,
    columns: getItemColumns(), // Includes virtual search column
    pageCount: Math.ceil(totalItems / pageSize),
    shallow: false,
    debounceMs: 500
  });

  return (
    <DataTable table={table} onRowClick={handleRowClick}>
      <DataTableResponsiveToolbar table={table}>
        <ExportToolbar data={data} filteredData={filteredData} />
      </DataTableResponsiveToolbar>
    </DataTable>
  );
}
\`\`\`

**Features**:
- ✅ Universal Search Pattern compatible
- ✅ Export functionality (CSV/Excel/PDF)
- ✅ Advanced filtering and sorting
- ✅ Responsive design
- ✅ Modal detail views
- ✅ Server-side pagination
- ✅ Real-time search

**Examples**:
- Raw Materials: Search across codigo, descripcion, alias, comentarios
- Commercial Requests: Search across requestId, product details, client info
- Users: Search across name, email with role filtering
- Clients: Search across company_name, rfc, region, salesperson

### B. Tabbed/Modular Tables (Secondary Pattern)

**Use Cases**:
- Configuration pages with multiple tabs
- System settings interfaces
- Multi-section data entry
- Wizard-like workflows
- Legacy system integration

**Architecture**:
- Uses legacy ConfigurationTable pattern
- Works within tab container constraints
- Limited modernization options
- Simpler data operations
- Context-specific to parent component

**Implementation Example**:
\`\`\`typescript
// Tabbed table within configuration system
export function ProductConfigurationTabs() {
  return (
    <Tabs defaultValue="standard-types">
      <TabsList>
        <TabsTrigger value="standard-types">Standard Types</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
        {/* More tabs... */}
      </TabsList>
      
      <TabsContent value="standard-types">
        <StandardTypesTab /> {/* Uses ConfigurationTable */}
      </TabsContent>
      
      <TabsContent value="categories">
        <CategoriesTab /> {/* Uses ConfigurationTable */}
      </TabsContent>
    </Tabs>
  );
}

// Legacy ConfigurationTable pattern
export function StandardTypesTab() {
  return (
    <ConfigurationTable
      data={standardTypes}
      columns={standardTypeColumns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
\`\`\`

**Features**:
- ✅ Tab integration
- ✅ Basic CRUD operations
- ✅ Simple pagination
- ❌ Limited search capabilities
- ❌ No export functionality
- ❌ No modal detail views
- ❌ Legacy column configuration

**Examples**:
- Product Configuration: Standard Types, Categories, Test Types
- System Configuration: User Roles, Permissions, Settings
- Form Configuration: Field Types, Validation Rules, Options

## Decision Matrix

| Criteria | Standalone Tables | Tabbed Tables |
|----------|------------------|---------------|
| **Primary Use** | Main listing pages | Configuration interfaces |
| **Search Requirements** | Multi-field, advanced | Basic or none |
| **Export Needs** | Required | Not needed |
| **Data Volume** | High (100+ items) | Low-Medium (10-50 items) |
| **User Interaction** | Browse, search, filter | Configure, manage |
| **Modal Details** | Required | Optional |
| **Responsive Design** | Critical | Less critical |
| **Implementation Complexity** | High | Medium |
| **Modernization Potential** | Full | Limited |

## Migration Guidelines

### From Tabbed to Standalone

**When to Migrate**:
- Data volume increases significantly
- Export functionality becomes required
- Advanced search is needed
- Mobile usage increases

**Migration Steps**:
1. Extract table from tab context
2. Implement Universal Search Pattern
3. Add export functionality
4. Convert to modal-based details
5. Update column configurations

**Example Migration**:
\`\`\`typescript
// Before: Tabbed ConfigurationTable
<ConfigurationTable data={users} columns={userColumns} />

// After: Standalone DataTable
<UserTable data={users} totalItems={totalUsers} />
// Now supports search across name/email, export, modal details
\`\`\`

### From Standalone to Tabbed

**When to Convert** (Rare):
- Data becomes configuration-focused
- Integration with tab-based workflows required
- Simplified interface needed

## Architecture Constraints

### Standalone Tables
**Constraints**:
- Requires full DataTable implementation
- Higher memory usage for large datasets
- More complex state management
- Needs responsive design consideration

**Solutions**:
- Server-side pagination for large datasets
- Virtualization for extremely large lists
- Efficient filtering algorithms
- Progressive loading strategies

### Tabbed Tables
**Constraints**:
- Cannot use modern DataTable features
- Limited search capabilities
- No built-in export functionality
- Fixed within tab container

**Solutions**:
- Keep data sets small and manageable
- Use simple sorting and filtering
- Implement custom export if needed
- Optimize for configuration workflows

## Performance Considerations

### Standalone Tables
\`\`\`typescript
// Optimized implementation
const { table } = useDataTable({
  data, // Pre-filtered server-side
  columns: memoizedColumns,
  pageCount, // Server-calculated
  shallow: false, // For URL state sync
  debounceMs: 500 // Prevent excessive requests
});
\`\`\`

### Tabbed Tables
\`\`\`typescript
// Simple implementation
const [data, setData] = useState(initialData);
const [editingItem, setEditingItem] = useState(null);

// Basic operations only
const handleAdd = useCallback((item) => {
  setData(prev => [...prev, item]);
}, []);
\`\`\`

## Best Practices

### Pattern Selection
1. **Start with Use Case**: Configuration vs. Data Browsing
2. **Consider Data Volume**: High volume → Standalone
3. **Evaluate Search Needs**: Advanced search → Standalone
4. **Assess Export Requirements**: Export needed → Standalone
5. **Check Integration Context**: Tab system → Tabbed

### Implementation Guidelines
1. **Consistency**: Use same pattern type for similar use cases
2. **Progressive Enhancement**: Start simple, add features as needed
3. **User Experience**: Prioritize intuitive interactions
4. **Performance**: Optimize for expected data volumes
5. **Maintenance**: Choose patterns that are easy to maintain

## Success Metrics

### Standalone Tables
- Search usage: 70%+ of users use search functionality
- Export usage: 40%+ of sessions include exports
- Modal interactions: 90%+ of detail views through row clicks
- Performance: <200ms for search, <1s for data loading

### Tabbed Tables
- Configuration efficiency: 50% faster than form-based alternatives
- Error rates: <5% for configuration changes
- User satisfaction: High for administrative tasks
- Maintenance: 60% less complex than equivalent forms

This decision matrix ensures optimal table implementation based on specific use case requirements and architectural constraints.
`;