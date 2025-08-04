export default `# Hybrid DataTable Pattern

## Overview
Advanced table pattern combining Shadcn DataTable with TanStack Table, featuring row click navigation to detail modals and integrated export functionality. This pattern provides a space-efficient, user-friendly approach to data display and interaction.

## Key Features
- Shadcn DataTable base with TanStack Table power
- Row click opens detail modal (space-efficient UX)
- Edit/Delete actions inside modal (no dropdown action menus)
- Export functionality (CSV/Excel/PDF) - mandatory
- Natural empty state handling (no blocking messages)
- Integrated search and filtering

## Implementation

### Basic Table Component Structure
\`\`\`typescript
'use client';

import * as React from 'react';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableResponsiveToolbar } from '@/components/ui/table/data-table-responsive-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { parseAsInteger, useQueryState } from 'nuqs';

interface HybridTableProps<TData> {
  data: TData[];
  totalItems: number;
  columns: ColumnDef<TData>[];
}

export function HybridTable<TData>({
  data,
  totalItems,
  columns
}: HybridTableProps<TData>) {
  const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(10));
  
  // Modal state management
  const [selectedItem, setSelectedItem] = React.useState<TData | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data,
    columns: columns as any,
    pageCount: pageCount,
    shallow: false,
    debounceMs: 500,
    initialState: {
      columnVisibility: {
        name: false // Hide virtual search column if present
      }
    }
  });

  const filteredData = table
    .getFilteredRowModel()
    .rows.map((row) => row.original);

  const handleRowClick = React.useCallback((item: TData) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = React.useCallback(() => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }, []);

  return (
    <>
      <DataTable table={table} onRowClick={handleRowClick}>
        <DataTableResponsiveToolbar table={table}>
          <ExportToolbar data={data} filteredData={filteredData} />
        </DataTableResponsiveToolbar>
      </DataTable>

      <ItemDetailsModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
}
\`\`\`

### Modal Integration Pattern
\`\`\`typescript
interface ItemDetailsModalProps<TData> {
  item: TData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemDetailsModal<TData>({
  item,
  isOpen,
  onClose
}: ItemDetailsModalProps<TData>) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getItemTitle(item)}</DialogTitle>
          <DialogDescription>
            {getItemDescription(item)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item details display */}
          <ItemDetailsView item={item} />
          
          {/* Action buttons - Edit/Delete inside modal */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="outline" onClick={() => handleEdit(item)}>
              Edit
            </Button>
            <Button variant="destructive" onClick={() => handleDelete(item)}>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
\`\`\`

### Export Toolbar Integration
\`\`\`typescript
interface ExportToolbarProps<TData> {
  data: TData[];
  filteredData: TData[];
}

export function ExportToolbar<TData>({
  data,
  filteredData
}: ExportToolbarProps<TData>) {
  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    switch (format) {
      case 'csv':
        exportToCSV(filteredData);
        break;
      case 'excel':
        exportToExcel(filteredData);
        break;
      case 'pdf':
        exportToPDF(filteredData);
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('excel')}>
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('pdf')}>
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
\`\`\`

## Column Configuration

### Standard Column Setup
\`\`\`typescript
export function getItemColumns(): ColumnDef<Item>[] {
  return [
    // Virtual search column (first)
    {
      id: 'name',
      accessorFn: (row) => \`\${row.field1} \${row.field2}\`,
      header: () => null,
      cell: () => null,
      enableSorting: false,
      enableHiding: true,
      enableGlobalFilter: false,
      meta: {
        label: 'Search items',
        placeholder: 'Search...',
        variant: 'text'
      },
      enableColumnFilter: true,
      size: 0
    },
    
    // Actual display columns
    {
      id: 'mainField',
      accessorKey: 'mainField',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Main Field" />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.original.mainField}</div>
      ),
      enableSorting: true,
      enableHiding: false,
      enableGlobalFilter: true,
      enableColumnFilter: false
    },
    
    // Additional columns...
    // No action column needed - actions in modal
  ];
}
\`\`\`

## Architecture Patterns

### Table Pattern Types

**A. Standalone Tables** (Primary Pattern)
- Use for: Main listing pages (Users, Clients, Raw Materials, etc.)
- Full DataTable implementation with all features
- Modal-based detail views
- Export functionality
- Search and filtering

**B. Tabbed/Modular Tables** (Secondary Pattern)
- Use for: Configuration pages within tab containers
- Limited to legacy ConfigurationTable pattern
- Different architectural constraints
- Cannot use full DataTable modernization

### Decision Matrix
| Use Case | Pattern Type | Features | Constraints |
|----------|-------------|----------|-------------|
| Main listings | Standalone | Full DataTable, Modal, Export | None |
| Configuration | Tabbed | Legacy ConfigurationTable | Limited modernization |
| Dashboard widgets | Standalone | Simplified DataTable | Reduced feature set |

## Integration Requirements

### Dependencies
\`\`\`json
{
  "@tanstack/react-table": "^8.x",
  "nuqs": "^1.x",
  "lucide-react": "^0.x"
}
\`\`\`

### Required Components
- DataTable (shadcn/ui)
- DataTableResponsiveToolbar
- Dialog components
- Export utilities
- useDataTable hook

## Benefits
- **Space Efficient**: No action columns, modals for details
- **Consistent UX**: Same interaction pattern across all tables
- **Export Ready**: Built-in export functionality
- **Responsive**: Works on all screen sizes
- **Accessible**: Proper ARIA support through shadcn components

## Best Practices
1. **Row Click**: Always implement row click for modal opening
2. **Export**: Include export functionality for all data tables
3. **Actions**: Place Edit/Delete actions inside detail modals
4. **Empty States**: Let DataTable handle empty states naturally
5. **Search**: Combine with Universal Search Pattern for best results

## Success Implementations
- Raw Materials Management
- Commercial Requests Tracking
- User Administration
- Client Management

This pattern provides a robust, user-friendly table implementation that scales across different data types and use cases while maintaining consistency and performance.
`;