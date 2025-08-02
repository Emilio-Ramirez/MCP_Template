#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "crm-template-base",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      prompts: {},
      tools: {},
    },
  },
);

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "template://components/shadcn-dashboard",
        mimeType: "text/plain",
        name: "Shadcn Dashboard Components",
        description: "Reusable dashboard component patterns with sidebar, navigation, and data tables",
      },
      {
        uri: "template://patterns/role-based-auth",
        mimeType: "text/plain",
        name: "Role-Based Authentication",
        description: "Clerk + role management patterns for LAB_TECH, SALES_REP, LAB_MANAGER, ADMIN",
      },
      {
        uri: "template://components/data-table",
        mimeType: "text/plain",
        name: "Advanced Data Table",
        description: "Sortable, filterable data table with Tanstack Table and shadcn/ui",
      },
      {
        uri: "template://patterns/api-routes",
        mimeType: "text/plain",
        name: "Next.js API Routes",
        description: "Standardized API route patterns with validation and error handling",
      },
    ],
  };
});

// Read specific resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  switch (uri) {
    case "template://components/shadcn-dashboard":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# Shadcn Dashboard Components

## Main Layout
\`\`\`tsx
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
\`\`\`

## Sidebar Component
\`\`\`tsx
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { BarChart3, Users, FileText, Settings } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-sm">
      <div className="p-6">
        <h2 className="text-2xl font-bold">CRM</h2>
      </div>
      <nav className="mt-6">
        {navigation.map((item) => (
          <Button key={item.name} variant="ghost" className="w-full justify-start">
            <item.icon className="mr-3 h-4 w-4" />
            {item.name}
          </Button>
        ))}
      </nav>
    </div>
  )
}
\`\`\``,
          },
        ],
      };
    case "template://patterns/role-based-auth":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# Role-Based Authentication with Clerk

## Role Types
\`\`\`typescript
export type UserRole = 'LAB_TECH' | 'SALES_REP' | 'LAB_MANAGER' | 'ADMIN'

export interface User {
  id: string
  email: string
  role: UserRole
  permissions: string[]
}
\`\`\`

## Role-Based Middleware
\`\`\`typescript
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export function withRole(allowedRoles: UserRole[]) {
  return async function middleware(req: Request) {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await getUserWithRole(userId)
    
    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.next()
  }
}
\`\`\`

## Protected Component
\`\`\`tsx
import { useUser } from '@clerk/nextjs'

interface ProtectedProps {
  allowedRoles: UserRole[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function Protected({ allowedRoles, children, fallback }: ProtectedProps) {
  const { user } = useUser()
  const userRole = user?.publicMetadata?.role as UserRole

  if (!allowedRoles.includes(userRole)) {
    return fallback || <div>Access denied</div>
  }

  return <>{children}</>
}
\`\`\``,
          },
        ],
      };
    case "template://components/data-table":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# Advanced Data Table with Tanstack Table

## Table Component
\`\`\`tsx
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
  })

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search all columns..."
          value={globalFilter ?? ''}
          onChange={(event) => setGlobalFilter(String(event.target.value))}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
\`\`\``,
          },
        ],
      };
    case "template://patterns/api-routes":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# Next.js API Routes with Validation

## API Handler with Zod Validation
\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@clerk/nextjs'

const CreateClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  company: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = CreateClientSchema.parse(body)

    // Create client logic here
    const client = await createClient(validatedData)

    return NextResponse.json(client, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '10')

    const clients = await getClients({ page, limit, userId })
    
    return NextResponse.json(clients)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
\`\`\``,
          },
        ],
      };
    default:
      throw new Error(`Resource not found: ${uri}`);
  }
});

// List available prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "add_component",
        description: "Add a new UI component to the template",
        arguments: [
          {
            name: "component_type",
            description: "Type of component to add",
            required: true,
          },
        ],
      },
    ],
  };
});

// Handle prompt requests
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "add_component":
      return {
        description: `Adding ${args?.component_type || "component"} to CRM template`,
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Create a new ${args?.component_type || "component"} following the shadcn/ui patterns used in the CRM template. Include TypeScript types, proper styling, and role-based access if needed.`,
            },
          },
        ],
      };
    default:
      throw new Error(`Prompt not found: ${name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("CRM Template Base MCP server running on stdio");
}

runServer().catch(console.error);
