export const crudOperations = {
  name: "Complete CRUD Operations",
  description: "Comprehensive Create, Read, Update, Delete patterns with data tables, notifications, and proper state management for ERP systems",
  
  overview: {
    purpose: "Provide standardized CRUD functionality with consistent patterns, error handling, and user experience",
    architecture: "Next.js App Router with dynamic routes, server-side data fetching, and client-side state management",
    features: [
      "Dynamic routes for create/edit modes",
      "Server-side filtering and pagination",
      "Form validation with Zod schemas",
      "Toast notifications with visual feedback",
      "Confirmation dialogs for destructive actions",
      "Complete internationalization support"
    ]
  },

  architecturePattern: {
    description: "File structure and component organization for CRUD operations",
    
    structure: `
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
│   │   ├── index.tsx               # Main table component
│   │   ├── columns.tsx             # Column definitions
│   │   ├── cell-action.tsx         # Row actions (edit, delete)
│   │   └── options.tsx             # Filter options
│   └── export-toolbar.tsx          # Export functionality
├── constants/data.ts               # Type definitions & mock data
└── locales/                        # Translations
    ├── en.json                     # English translations
    └── es.json                     # Spanish translations`,

    routePattern: {
      listRoute: "/[entity] - Shows all entities in a data table",
      createRoute: "/[entity]/new - Create new entity form",
      editRoute: "/[entity]/[id] - Edit existing entity form",
      dynamicLogic: "entityId = 'new' → Create mode, entityId = '{id}' → Edit mode"
    }
  },

  listPageImplementation: {
    description: "List view with search, filtering, and pagination",
    
    pageComponent: `
// /app/[locale]/(dashboard)/users/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import UserListingPage from '@/features/users/components/user-listing';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard: Users'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
  params: Promise<{ locale: string }>;
};

export default async function UsersPage(props: pageProps) {
  const { params, searchParams } = props;
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Users');
  const searchParamsData = await searchParams;
  searchParamsCache.parse(searchParamsData);

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title={t('page_title')}
            description={t('page_description')}
          />
          <Link
            href='/users/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <IconPlus className='mr-2 h-4 w-4' /> {t('create_user')}
          </Link>
        </div>
        <Separator />
        <Suspense
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <UserListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}`,

    listingComponent: `
// Server component for data fetching with filtering and pagination
export async function UserListingPage({}: {}) {
  // Get search parameters including pagination - CRITICAL ORDER
  const search = searchParamsCache.get('name');
  const role = searchParamsCache.get('role');
  const page = searchParamsCache.get('page') ?? 1;
  const perPage = searchParamsCache.get('perPage') ?? 10;

  // Step 1: Apply filtering logic FIRST
  let filteredUsers = usersData;
  
  // Text search
  if (search) {
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Role filter
  if (role && Array.isArray(role) && role.length > 0) {
    filteredUsers = filteredUsers.filter((user) =>
      role.includes(user.role)
    );
  }

  // Step 2: Calculate pagination AFTER filtering
  const totalUsers = filteredUsers.length;
  const offset = (page - 1) * perPage;
  const paginatedUsers = filteredUsers.slice(offset, offset + perPage);

  // Step 3: Pass paginated data and total filtered count
  return <UsersTable data={paginatedUsers} totalItems={totalUsers} />;
}`,

    criticalRule: "ALWAYS filter first, then paginate. Use filtered data length for totalItems, not original data length."
  },

  dynamicRouteImplementation: {
    description: "Single route handler for both create and edit modes",
    
    routePage: `
// /app/[locale]/(dashboard)/users/[userId]/page.tsx
import { setRequestLocale } from 'next-intl/server';
import PageContainer from '@/components/layout/page-container';
import UserViewPage from '@/features/users/components/user-view-page';

export const metadata = {
  title: 'Dashboard: User'
};

type pageProps = {
  params: Promise<{ locale: string; userId: string }>;
};

export default async function UserDetailPage(props: pageProps) {
  const { params } = props;
  const { locale, userId } = await params;
  setRequestLocale(locale);

  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-4'>
        <UserViewPage userId={userId} />
      </div>
    </PageContainer>
  );
}`,

    viewPageComponent: `
'use client';

import { useTranslations } from 'next-intl';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { usersData, User } from '@/constants/data';
import UserForm from './user-form';

interface UserViewPageProps {
  userId: string;
}

export default function UserViewPage({ userId }: UserViewPageProps) {
  const t = useTranslations('Users');
  
  // Determine if this is create or edit mode
  const isCreateMode = userId === 'new';
  
  // Find the user if in edit mode
  const user = isCreateMode 
    ? undefined 
    : usersData.find((u) => u.id.toString() === userId);

  // If not create mode and user not found, show error
  if (!isCreateMode && !user) {
    return (
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading 
          title={t('user_not_found')} 
          description={t('user_not_found_description')} 
        />
      </div>
    );
  }

  const title = isCreateMode ? t('create_user') : t('edit_user');
  const description = isCreateMode 
    ? t('create_user_description') 
    : t('edit_user_description');

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <Heading title={title} description={description} />
      <Separator />
      <UserForm initialData={user} />
    </div>
  );
}`
  },

  formImplementation: {
    description: "Reusable form component for both create and edit operations",
    
    formComponent: `
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { User } from '@/constants/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { IconCheck } from '@tabler/icons-react';

// Create form schema with translations
const createFormSchema = (t: any) =>
  z.object({
    name: z.string().min(2, {
      message: t('validation.name_min_length')
    }),
    email: z.string().email({
      message: t('validation.email_invalid')
    }),
    role: z.string().min(1, {
      message: t('validation.role_required')
    })
  });

interface UserFormProps {
  initialData?: User;
}

export default function UserForm({ initialData }: UserFormProps) {
  const t = useTranslations('Users.form');
  const router = useRouter();
  const formSchema = createFormSchema(t);
  
  const isEditMode = !!initialData;
  const pageTitle = isEditMode ? t('edit_user_title') : t('create_user_title');

  const defaultValues = {
    name: initialData?.name || '',
    email: initialData?.email || '',
    role: initialData?.role || '',
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // TODO: Implement actual API calls
      console.log('Form values:', values);
      
      if (isEditMode) {
        console.log('Updating user:', initialData?.id, values);
        toast.success(t('success.user_updated'), {
          icon: <IconCheck className="h-4 w-4 text-green-600" />
        });
      } else {
        console.log('Creating new user:', values);
        toast.success(t('success.user_created'), {
          icon: <IconCheck className="h-4 w-4 text-green-600" />
        });
      }
      
      // Navigate back to users list
      router.push('/users');
    } catch (error) {
      console.error('Form submission error:', error);
      if (isEditMode) {
        toast.error(t('error.update_failed'));
      } else {
        toast.error(t('error.create_failed'));
      }
    }
  }

  const onCancel = () => {
    router.push('/users');
  };

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
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('labels.name')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('placeholders.name')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('labels.email')}</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder={t('placeholders.email')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('labels.role')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('placeholders.role')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='VENDEDOR'>Sales Representative</SelectItem>
                        <SelectItem value='GERENTE_ZONA'>Zone Manager</SelectItem>
                        <SelectItem value='LABORATORIO'>Laboratory</SelectItem>
                        <SelectItem value='CALIDAD'>Quality Control</SelectItem>
                        <SelectItem value='ADMIN_GENERAL'>System Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex gap-4'>
              <Button type='submit'>
                {isEditMode ? t('update') : t('create')}
              </Button>
              <Button type='button' variant='outline' onClick={onCancel}>
                {t('cancel')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}`
  },

  dataTableIntegration: {
    description: "Advanced table with actions, filtering, and pagination",
    
    cellActionComponent: `
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { User } from '@/constants/data';
import { 
  IconDots, 
  IconEdit, 
  IconEye, 
  IconTrash,
  IconCheck 
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { AlertModal } from '@/components/modal/alert-modal';

interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations('Common');
  const tUsers = useTranslations('Users');

  const onConfirm = async () => {
    try {
      setLoading(true);
      
      // TODO: Implement actual delete API call
      console.log('Deleting user:', data.id);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(tUsers('delete_success'), {
        icon: <IconCheck className="h-4 w-4 text-green-600" />
      });
      setOpen(false);
      
      // Refresh the page to show updated data
      router.refresh();
    } catch (error) {
      console.error('Delete user error:', error);
      toast.error(tUsers('delete_error'));
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = () => {
    router.push(\`/users/\${data.id}\`);
  };

  const onView = () => {
    router.push(\`/users/\${data.id}\`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <IconDots className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={onView}>
            <IconEye className='mr-2 h-4 w-4' /> {t('view')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onUpdate}>
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

    columnsDefinition: `
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/constants/data';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { CellAction } from './cell-action';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'avatar_url',
    header: '',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Avatar className='h-8 w-8'>
          <AvatarImage src={user.avatar_url} alt={user.name} />
          <AvatarFallback>
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className='w-[120px]'>{row.getValue('name')}</div>
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className='w-[150px]'>{row.getValue('email')}</div>
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.getValue('role') as string;
      return (
        <Badge variant='outline' className='w-[100px] justify-center'>
          {role}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('created_at')}</div>
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];`
  },

  notificationSystem: {
    description: "Toast notifications with proper styling and icons",
    
    toastImplementation: `
import { toast } from 'sonner';
import { IconCheck } from '@tabler/icons-react';

// Success notifications with green icon
toast.success(t('success.user_created'), {
  icon: <IconCheck className="h-4 w-4 text-green-600" />
});

// Error notifications
toast.error(t('error.create_failed'));

// Promise-based notifications for async operations
toast.promise(
  deleteUser(userId),
  {
    loading: 'Deleting user...',
    success: 'User deleted successfully!',
    error: 'Failed to delete user'
  }
);`,

    toastStyling: `
// Sonner configuration with custom styling (already set up in layout)
style={{
  '--success-bg': 'hsl(143 85% 96%)',
  '--success-text': 'hsl(140 100% 27%)',
  '--success-border': 'hsl(145 92% 91%)',
  '--error-bg': 'hsl(0 93% 94%)',
  '--error-text': 'hsl(0 84% 60%)',
  '--error-border': 'hsl(0 93% 94%)'
}}`
  },

  translationStructure: {
    description: "Complete translation structure for CRUD operations",
    
    structure: `
{
  "Users": {
    "page_title": "Users",
    "page_description": "Manage system users and their roles",
    "create_user": "Create User",
    "edit_user": "Edit User",
    "user_not_found": "User Not Found",
    "user_not_found_description": "The user you are looking for does not exist.",
    "create_user_description": "Add a new user to the system",
    "edit_user_description": "Update user information and role",
    "delete_success": "User deleted successfully!",
    "delete_error": "Failed to delete user. Please try again.",
    
    "columns": {
      "name": "Name",
      "email": "Email",
      "role": "Role",
      "created_at": "Created",
      "actions": "Actions"
    },
    
    "table": {
      "search_placeholder": "Search users...",
      "filter_placeholder": "Filter by role"
    },
    
    "form": {
      "create_user_title": "Create New User",
      "edit_user_title": "Edit User",
      "labels": {
        "name": "Full Name",
        "email": "Email Address",
        "role": "User Role"
      },
      "placeholders": {
        "name": "Enter full name",
        "email": "Enter email address",
        "role": "Select user role"
      },
      "validation": {
        "name_min_length": "Name must be at least 2 characters",
        "email_invalid": "Please enter a valid email address",
        "role_required": "Please select a user role"
      },
      "success": {
        "user_created": "User created successfully!",
        "user_updated": "User updated successfully!"
      },
      "error": {
        "create_failed": "Failed to create user. Please try again.",
        "update_failed": "Failed to update user. Please try again."
      },
      "create": "Create User",
      "update": "Update User",
      "cancel": "Cancel"
    }
  },
  
  "Common": {
    "view": "View",
    "edit": "Edit", 
    "delete": "Delete",
    "cancel": "Cancel",
    "confirm_delete_title": "Are you sure?",
    "confirm_delete_description": "This action cannot be undone."
  },
  
  "Breadcrumbs": {
    "users": "Users",
    "new": "New"
  }
}`
  },

  bestPractices: [
    "Always filter data first, then apply pagination",
    "Use server components for data fetching when possible",
    "Implement proper loading states and error boundaries",
    "Include confirmation dialogs for destructive actions",
    "Use green icons for success toast notifications",
    "Provide immediate visual feedback for all user actions",
    "Follow consistent route patterns across all entities",
    "Implement proper form validation with Zod schemas",
    "Use TypeScript for type safety across all operations",
    "Test responsive design on different screen sizes"
  ],

  troubleshooting: {
    paginationIssues: {
      problem: "Table shows all data instead of paginated results",
      symptoms: [
        "All filtered data appears on page 1",
        "Pagination controls show incorrect page count",
        "Navigation between pages doesn't work"
      ],
      solution: [
        "Add page and perPage to search params cache",
        "Read pagination parameters in listing component",
        "Filter data first, then calculate pagination",
        "Use slice(offset, offset + perPage) for pagination",
        "Pass totalItems as filtered data length"
      ]
    },
    
    routeParameters: {
      problem: "entityId parameter not accessible",
      solution: "Ensure proper async/await in page components: const { entityId } = await params;"
    },
    
    formReset: {
      problem: "Form retains values after navigation",
      solution: "Use proper default values and form reset with initialData"
    },
    
    toastNotifications: {
      problem: "Toasts appear gray instead of colored",
      solution: "Use custom icons for visual feedback, especially green IconCheck for success"
    }
  },

  implementationChecklist: [
    "✅ Create list page with proper search and filtering",
    "✅ Implement dynamic route for create/edit modes",
    "✅ Build reusable form component with validation",
    "✅ Add data table with sorting, filtering, and actions",
    "✅ Implement delete functionality with confirmation",
    "✅ Add toast notifications with proper styling",
    "✅ Include complete translations in both locales",
    "✅ Test pagination with different page sizes and filters",
    "✅ Verify responsive design works on mobile",
    "✅ Add proper loading states and error handling"
  ]
};

export default crudOperations;