export default `# Table Bundle - Quick Reference

## Common Table Patterns Cheat Sheet

### Basic DataTable Setup
\`\`\`typescript
import { DataTable } from '@/components/ui/data-table';

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.status === 'active' ? 'default' : 'secondary'}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Button variant="ghost" size="sm">
        View
      </Button>
    ),
  },
];

<DataTable columns={columns} data={data} />
\`\`\`

### Virtual Column Search Pattern
\`\`\`typescript
// Column definition with searchValue
{
  id: 'search',
  header: 'Search',
  accessorFn: (row) => {
    const searchableText = \`
      \${row.name}
      \${row.email}
      \${row.description}
    \`.toLowerCase();
    return searchableText;
  },
  filterFn: 'includesString',
  enableGlobalFilter: true,
}

// Global search implementation
<Input
  placeholder="Search all columns..."
  value={globalFilter ?? ''}
  onChange={(e) => setGlobalFilter(e.target.value)}
  className="max-w-sm"
/>
\`\`\`

### Tabbed Table Pattern
\`\`\`typescript
<Tabs defaultValue="active" className="w-full">
  <TabsList>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="archived">Archived</TabsTrigger>
  </TabsList>
  
  <TabsContent value="active">
    <DataTable columns={columns} data={activeData} />
  </TabsContent>
  
  <TabsContent value="archived">
    <DataTable columns={columns} data={archivedData} />
  </TabsContent>
</Tabs>
\`\`\`

### Export Pattern
\`\`\`typescript
const exportToCSV = () => {
  const csv = [
    columns.map(col => col.header).join(','),
    ...data.map(row => 
      columns.map(col => row[col.accessorKey]).join(',')
    )
  ].join('\\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'export.csv';
  a.click();
};

<Button onClick={exportToCSV} variant="outline" size="sm">
  <Download className="h-4 w-4 mr-2" />
  Export
</Button>
\`\`\`

### Pagination Controls
\`\`\`typescript
<div className="flex items-center justify-between py-4">
  <div className="text-sm text-muted-foreground">
    {table.getFilteredSelectedRowModel().rows.length} of{' '}
    {table.getFilteredRowModel().rows.length} row(s) selected
  </div>
  
  <div className="flex items-center space-x-2">
    <Button
      variant="outline"
      size="sm"
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
    >
      Previous
    </Button>
    <Button
      variant="outline"
      size="sm"
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
    >
      Next
    </Button>
  </div>
</div>
\`\`\`

### Row Actions Pattern
\`\`\`typescript
{
  id: 'actions',
  cell: ({ row }) => {
    const item = row.original;
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.id)}>
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
}
\`\`\`

## Essential Imports
\`\`\`typescript
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, MoreHorizontal } from 'lucide-react';
\`\`\`

## CSS Classes Quick Reference
- **Table wrapper**: \`rounded-md border\`
- **Header row**: \`border-b bg-muted/50\`
- **Data row**: \`border-b hover:bg-muted/50\`
- **Pagination**: \`py-4\`

---

**For detailed patterns**: Request specific components.
`;