export const erpConfigurationSystem = {
  name: "ERP Configuration System",
  description: "Comprehensive configuration management system with tab patterns, CRUD operations, and dynamic data management for enterprise applications",
  
  overview: {
    purpose: "Provide a standardized, scalable system for managing complex configuration data across multiple business domains",
    architecture: "Component-based with reusable patterns, consistent UI/UX, and type-safe operations",
    scope: "Configuration pages, data tables, form management, validation, and user interactions"
  },

  corePatterns: {
    configurationTabsPattern: {
      name: "Official Law Pattern - Configuration Tabs",
      description: "Mandatory pattern for all configuration tab implementations",
      
      coreStructure: `
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export default function ConfigurationTabs() {
  const t = useTranslations('ConfigurationNamespace');

  const tabs = [
    {
      value: 'tab-key-1',
      label: t('tabs.tab_key_1'),
      component: <TabComponent1 />
    },
    {
      value: 'tab-key-2', 
      label: t('tabs.tab_key_2'),
      component: <TabComponent2 />
    }
  ];

  return (
    <Tabs defaultValue="first-tab-key" className="w-full space-y-4">
      <div className="w-full">
        <TabsList className={cn(
          "inline-flex h-auto w-full flex-wrap justify-start bg-muted p-1",
          "gap-1"
        )}>
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.value} 
              value={tab.value}
              className={cn(
                "flex-shrink-0 whitespace-nowrap px-3 py-1.5",
                "data-[state=active]:text-foreground",
                "min-w-fit"
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-6">
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
}`,

      mandatoryRequirements: [
        "MUST use dynamic tabs array structure",
        "MUST use .map() to render both TabsTrigger and TabsContent",
        "NO hardcoded individual tab components allowed",
        "MUST follow exact styling classes from law pattern",
        "MUST include wrapper <div className=\"w-full\">",
        "MUST use namespace-based translations"
      ],

      prohibitedPatterns: [
        "Hardcoded tabs with individual JSX",
        "Different styling classes than specified",
        "Missing wrapper div structure",
        "Non-dynamic tab rendering"
      ]
    },

    crudOperationsPattern: {
      name: "Complete CRUD Operations",
      description: "Standardized Create, Read, Update, Delete functionality with data tables and notifications",
      
      architectureOverview: `
src/
├── app/[locale]/(dashboard)/{entity}/
│   ├── page.tsx                    # List view page
│   └── [entityId]/
│       └── page.tsx                # Create/Edit page (dynamic route)
├── features/{entity}/components/
│   ├── {entity}-listing.tsx        # Server component for data fetching
│   ├── {entity}-view-page.tsx      # Create/Edit view logic
│   ├── {entity}-form.tsx           # Form component (create & edit)
│   ├── {entity}-tables/            # Table components 
│   │   ├── index.tsx
│   │   ├── columns.tsx
│   │   ├── cell-action.tsx
│   │   └── options.tsx
│   └── {additional-components}.tsx`,

      listingComponentPattern: `
export async function EntityListingPage({}) {
  // Get search parameters including pagination
  const search = searchParamsCache.get('name');
  const filters = searchParamsCache.get('filter_param');
  const page = searchParamsCache.get('page') ?? 1;
  const perPage = searchParamsCache.get('perPage') ?? 10;

  // Step 1: Apply filtering logic first
  let filteredData = entityData;
  
  if (search) {
    filteredData = filteredData.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (filters) {
    const filterArray = filters.split(',');
    filteredData = filteredData.filter(item =>
      filterArray.includes(item.filterField)
    );
  }

  // Step 2: Calculate pagination AFTER filtering
  const totalItems = filteredData.length;
  const offset = (page - 1) * perPage;
  const paginatedData = filteredData.slice(offset, offset + perPage);

  // Step 3: Pass paginated data and total filtered count
  return <EntityTable data={paginatedData} totalItems={totalItems} />;
}`,

      dynamicRoutePattern: `
// Route: /app/[locale]/(dashboard)/{entity}/[entityId]/page.tsx
export default async function EntityDetailPage(props) {
  const { params } = props;
  const { locale, entityId } = await params;
  setRequestLocale(locale);

  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-4'>
        <EntityViewPage entityId={entityId} />
      </div>
    </PageContainer>
  );
}

// Route Pattern:
// entityId = 'new' → Create mode
// entityId = '{id}' → Edit mode`,

      formComponentPattern: `
export default function EntityForm({ initialData }) {
  const t = useTranslations('Entity.form');
  const router = useRouter();
  const formSchema = createFormSchema(t);
  
  const isEditMode = !!initialData;
  const pageTitle = isEditMode ? t('edit_entity_title') : t('create_entity_title');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
    }
  });

  function onSubmit(values) {
    try {
      if (isEditMode) {
        // Update logic
        toast.success(t('success.entity_updated'), {
          icon: <IconCheck className="h-4 w-4 text-green-600" />
        });
      } else {
        // Create logic
        toast.success(t('success.entity_created'), {
          icon: <IconCheck className="h-4 w-4 text-green-600" />
        });
      }
      router.push('/entity');
    } catch (error) {
      toast.error(isEditMode ? t('error.update_failed') : t('error.create_failed'));
    }
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {/* Form fields */}
            <div className='flex gap-4'>
              <Button type='submit'>
                {isEditMode ? t('update') : t('create')}
              </Button>
              <Button type='button' variant='outline' onClick={() => router.push('/entity')}>
                {t('cancel')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}`,

      criticalPaginationRule: "ALWAYS filter first, then paginate. The pagination logic must be applied after filtering to ensure correct results."
    },

    dataTablePattern: {
      name: "Advanced Data Table Integration", 
      description: "TanStack Table with filtering, pagination, sorting, and actions",
      
      tableStructure: `
// Cell Action Component with Delete
export const CellAction = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations('Common');
  const tEntity = useTranslations('Entity');

  const onConfirm = async () => {
    try {
      setLoading(true);
      // Delete API call
      await deleteEntity(data.id);
      
      toast.success(tEntity('delete_success'), {
        icon: <IconCheck className="h-4 w-4 text-green-600" />
      });
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(tEntity('delete_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <IconDots className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => router.push(\`/entity/\${data.id}\`)}>
            <IconEye className='mr-2 h-4 w-4' /> {t('view')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(\`/entity/\${data.id}\`)}>
            <IconEdit className='mr-2 h-4 w-4' /> {t('edit')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <IconTrash className='mr-2 h-4 w-4' /> {t('delete')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
    </>
  );
};`,

      columnsPattern: `
export const columns = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('columns.name')} />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('name')}</div>
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('columns.email')} />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('email')}</div>
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];`,

      features: [
        "Server-side filtering and pagination",
        "Sortable columns with visual indicators", 
        "Row actions (view, edit, delete)",
        "Confirmation dialogs for destructive actions",
        "Loading states and error handling",
        "Responsive design with proper column widths",
        "Export functionality",
        "Search and filter bars"
      ]
    }
  },

  configurationItemManagement: {
    description: "Standardized system for managing configuration items across all pages",
    
    configurationTablePattern: `
export default function ConfigurationTable({ 
  title, 
  description, 
  data, 
  onCreate, 
  onEdit, 
  onDelete 
}) {
  const t = useTranslations('Common');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Input
              placeholder={t('search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='max-w-sm'
            />
          </div>
          <Button onClick={onCreate}>
            <IconPlus className='mr-2 h-4 w-4' />
            {t('add_item')}
          </Button>
        </div>
        
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('description')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead className='text-right'>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow
                  key={item.id}
                  className={index % 2 === 0 ? 'bg-muted/50' : ''}
                >
                  <TableCell className='font-medium'>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <Badge variant={item.isActive ? 'default' : 'secondary'}>
                      {item.isActive ? t('active') : t('inactive')}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                          <IconDots className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem onClick={() => onEdit(item)}>
                          <IconEdit className='mr-2 h-4 w-4' />
                          {t('edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDelete(item)}
                          className='text-red-600'
                        >
                          <IconTrash className='mr-2 h-4 w-4' />
                          {t('delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}`,

    configurationItemDialog: `
export default function ConfigurationItemDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
  title
}) {
  const t = useTranslations('Common');
  const [formData, setFormData] = useState(
    initialData || { name: '', description: '', isActive: true }
  );

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error(t('validation.name_required'));
      return;
    }
    
    onSave(formData);
    onClose();
    toast.success(
      initialData ? t('success.item_updated') : t('success.item_created'),
      { icon: <IconCheck className="h-4 w-4 text-green-600" /> }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              {t('name')}
            </Label>
            <Input
              id='name'
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              {t('description')}
            </Label>
            <Textarea
              id='description'
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='isActive' className='text-right'>
              {t('status')}
            </Label>
            <Switch
              id='isActive'
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='button' variant='outline' onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button type='button' onClick={handleSave}>
            {t('save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`
  },

  notificationSystem: {
    description: "Comprehensive notification system with toast messages and visual feedback",
    
    toastConfiguration: `
// Sonner toast configuration with custom styling
style={{
  '--success-bg': 'hsl(143 85% 96%)',
  '--success-text': 'hsl(140 100% 27%)',
  '--success-border': 'hsl(145 92% 91%)',
  '--error-bg': 'hsl(0 93% 94%)',
  '--error-text': 'hsl(0 84% 60%)',
  '--error-border': 'hsl(0 93% 94%)'
}}`,

    usagePatterns: `
import { toast } from 'sonner';
import { IconCheck } from '@tabler/icons-react';

// Success with green icon
toast.success(t('success.entity_created'), {
  icon: <IconCheck className="h-4 w-4 text-green-600" />
});

// Error notification  
toast.error(t('error.create_failed'));

// Promise-based toast (for async operations)
toast.promise(deleteUser(id), {
  loading: 'Deleting user...',
  success: 'User deleted successfully!',
  error: 'Failed to delete user'
});`,

    bestPractices: [
      "Always include green icons for success toasts",
      "Provide clear, actionable error messages",
      "Use loading states for async operations", 
      "Include proper translations for all messages",
      "Use consistent icon styles and colors"
    ]
  },

  translationStructure: {
    description: "Standardized internationalization structure for configuration systems",
    
    structure: `
{
  "ConfigurationName": {
    "page_title": "Configuration Title",
    "page_description": "Configuration description",
    "tabs": {
      "tab_key_1": "Tab Label 1",
      "tab_key_2": "Tab Label 2"
    },
    "tab_key_1": {
      "title": "Tab 1 Title",
      "description": "Tab 1 description",
      "table": {
        "search_placeholder": "Search items...",
        "add_item": "Add Item"
      }
    },
    "common": {
      "name": "Name",
      "description": "Description", 
      "status": "Status",
      "actions": "Actions",
      "active": "Active",
      "inactive": "Inactive",
      "edit": "Edit",
      "delete": "Delete",
      "save": "Save",
      "cancel": "Cancel"
    },
    "validation": {
      "name_required": "Name is required",
      "description_required": "Description is required"
    },
    "success": {
      "item_created": "Item created successfully!",
      "item_updated": "Item updated successfully!",
      "item_deleted": "Item deleted successfully!"
    },
    "error": {
      "create_failed": "Failed to create item",
      "update_failed": "Failed to update item", 
      "delete_failed": "Failed to delete item"
    }
  }
}`,

    requirements: [
      "Namespace organization with nested structure",
      "Consistent translation keys across entities",
      "Complete validation message coverage",
      "Success/error feedback messages",
      "Breadcrumb translations"
    ]
  },

  implementationChecklist: [
    "✅ Use dynamic tabs array structure",
    "✅ Follow exact styling classes from law pattern", 
    "✅ Implement server-side pagination (filter first, then paginate)",
    "✅ Add proper loading states and error handling",
    "✅ Include confirmation dialogs for destructive actions",
    "✅ Use green icons for success toasts",
    "✅ Provide complete translations in both locales",
    "✅ Test responsive design and keyboard navigation",
    "✅ Implement proper form validation with Zod",
    "✅ Add audit trails and change tracking"
  ],

  bestPractices: [
    "Always prefer editing existing files over creating new ones",
    "Use type-safe operations with proper TypeScript definitions",
    "Implement consistent error handling across all operations",
    "Provide immediate visual feedback for all user actions",
    "Follow the single responsibility principle for components",
    "Use server components for data fetching when possible",
    "Implement proper caching strategies for configuration data"
  ]
};

export default erpConfigurationSystem;