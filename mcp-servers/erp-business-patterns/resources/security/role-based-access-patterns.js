export const roleBasedAccessPatterns = {
  name: "Role-Based Access Control Patterns",
  description: "Comprehensive RBAC system with permission matrices, security patterns, and user role management for enterprise ERP applications",
  
  overview: {
    purpose: "Implement fine-grained access control with role-based permissions, object-level security, and field-level visibility",
    architecture: "Azure AD integration with JWT tokens, middleware-based route protection, and component-level guards",
    scope: "Authentication, authorization, permission management, and security audit trails"
  },

  roleDefinitions: {
    description: "Hierarchical role system with specific permissions and access levels",
    
    roles: [
      {
        name: "VENDEDOR",
        title: "Sales Representative", 
        level: 1,
        description: "Field sales personnel with client-specific access",
        permissions: {
          clients: ["read_own", "create", "update_own"],
          requests: ["read_own", "create", "update_own"],
          formulations: ["read_own"],
          inventory: ["read_limited"],
          reports: ["generate_own"]
        },
        dataAccess: {
          clients: "Own clients only",
          requests: "Own client requests only", 
          formulations: "Related to own requests only",
          visibility: "Zone-restricted based on assignment"
        }
      },
      {
        name: "GERENTE_ZONA", 
        title: "Zone Manager",
        level: 2,
        description: "Regional management with zone-wide visibility and approval authority",
        permissions: {
          clients: ["read_zone", "create", "update_zone", "approve"],
          requests: ["read_zone", "create", "update_zone", "approve", "reject"],
          formulations: ["read_zone", "approve"],
          users: ["read_zone", "manage_sales_reps"],
          inventory: ["read_full"],
          reports: ["generate_zone", "view_analytics"]
        },
        dataAccess: {
          clients: "All clients in assigned zones",
          requests: "All requests in zone",
          approvals: "US client operations, micro-production requests",
          visibility: "Zone-wide with subordinate management"
        }
      },
      {
        name: "LABORATORIO",
        title: "Laboratory Technician",
        level: 2, 
        description: "Formulation development and technical specification management",
        permissions: {
          requests: ["read_assigned", "update_status"],
          formulations: ["read_all", "create", "update", "validate"],
          materials: ["read_all", "use_in_formulations"],
          inventory: ["read_materials", "check_availability"],
          testing: ["create_protocols", "record_results"],
          products: ["create_technical_names", "manage_specifications"]
        },
        dataAccess: {
          requests: "All active formulation requests",
          formulations: "Full access to all formulations",
          materials: "Complete material database",
          visibility: "Cross-zone for technical work"
        }
      },
      {
        name: "CALIDAD",
        title: "Quality Control",
        level: 2,
        description: "Quality validation and testing protocol management", 
        permissions: {
          formulations: ["read_all", "validate", "reject", "approve"],
          testing: ["read_all", "create_protocols", "manage_standards"],
          products: ["validate_specifications", "approve_release"],
          reports: ["generate_quality", "audit_compliance"],
          standards: ["manage_testing_standards"]
        },
        dataAccess: {
          formulations: "All formulations requiring validation",
          testing: "Complete testing database",
          standards: "Full quality standards management",
          visibility: "System-wide for quality matters"
        }
      },
      {
        name: "PRODUCCION",
        title: "Production Scheduler", 
        level: 2,
        description: "Production planning and sample manufacturing coordination",
        permissions: {
          requests: ["read_approved", "update_production_status"],
          formulations: ["read_approved", "schedule_production"],
          inventory: ["read_materials", "reserve_materials"],
          production: ["create_orders", "manage_scheduling", "update_delivery"],
          equipment: ["manage_assignments", "schedule_resources"]
        },
        dataAccess: {
          requests: "Approved requests ready for production",
          formulations: "Validated formulations only",
          production: "Complete production planning access",
          visibility: "Production-focused cross-zone access"
        }
      },
      {
        name: "ADMIN_INVENTARIO",
        title: "Inventory Administrator",
        level: 3,
        description: "Inventory management and material administration",
        permissions: {
          inventory: ["read_all", "update_stock", "manage_materials"],
          materials: ["create", "update", "deactivate", "manage_classifications"],
          suppliers: ["manage_all", "approve_new"],
          reports: ["generate_inventory", "stock_analysis"],
          alerts: ["manage_stock_alerts", "set_thresholds"]
        },
        dataAccess: {
          inventory: "Complete inventory database",
          materials: "All materials and classifications",
          suppliers: "Complete supplier management",
          visibility: "System-wide inventory access"
        }
      },
      {
        name: "ADMIN_GENERAL",
        title: "System Administrator",
        level: 4,
        description: "Full system access and configuration management",
        permissions: {
          users: ["create", "update", "deactivate", "manage_roles"],
          configuration: ["manage_all_pages", "update_system_settings"],
          security: ["manage_permissions", "audit_access"],
          system: ["backup", "maintenance", "integrations"],
          reports: ["access_all", "system_analytics"]
        },
        dataAccess: {
          scope: "Complete system access",
          restrictions: "None - full administrative privileges",
          visibility: "System-wide unrestricted access"
        }
      },
      {
        name: "AUDITORIA",
        title: "Audit Specialist",
        level: 2,
        description: "Read-only audit access with comprehensive visibility",
        permissions: {
          audit: ["read_all_logs", "generate_audit_reports"],
          data: ["read_all_entities", "export_for_audit"],
          reports: ["access_audit_reports", "compliance_tracking"],
          history: ["view_change_logs", "track_modifications"]
        },
        dataAccess: {
          scope: "Read-only access to all data",
          restrictions: "No create, update, or delete permissions",
          visibility: "Complete system visibility for audit purposes"
        }
      },
      {
        name: "MANTENIMIENTO",
        title: "Maintenance Specialist", 
        level: 2,
        description: "Equipment status and maintenance management",
        permissions: {
          equipment: ["read_all", "update_status", "schedule_maintenance"],
          maintenance: ["create_orders", "track_completion"],
          reports: ["equipment_reports", "maintenance_analytics"]
        },
        dataAccess: {
          equipment: "All equipment and machinery",
          maintenance: "Complete maintenance database",
          visibility: "Equipment-focused system access"
        }
      }
    ]
  },

  permissionMatrix: {
    description: "Comprehensive permission matrix defining access levels across all system entities",
    
    entityPermissions: {
      clients: {
        create: ["VENDEDOR", "GERENTE_ZONA", "ADMIN_GENERAL"],
        read_own: ["VENDEDOR"],
        read_zone: ["GERENTE_ZONA"],
        read_all: ["ADMIN_GENERAL", "AUDITORIA"],
        update_own: ["VENDEDOR"],
        update_zone: ["GERENTE_ZONA"],
        update_all: ["ADMIN_GENERAL"],
        delete: ["ADMIN_GENERAL"],
        approve_operations: ["GERENTE_ZONA", "ADMIN_GENERAL"]
      },
      
      requests: {
        create: ["VENDEDOR", "GERENTE_ZONA", "ADMIN_GENERAL"],
        read_own: ["VENDEDOR"],
        read_zone: ["GERENTE_ZONA"],
        read_assigned: ["LABORATORIO", "CALIDAD", "PRODUCCION"],
        read_all: ["ADMIN_GENERAL", "AUDITORIA"],
        update_own: ["VENDEDOR"],
        update_zone: ["GERENTE_ZONA"],
        update_status: ["LABORATORIO", "CALIDAD", "PRODUCCION"],
        approve: ["GERENTE_ZONA", "ADMIN_GENERAL"],
        reject: ["GERENTE_ZONA", "CALIDAD", "ADMIN_GENERAL"]
      },
      
      formulations: {
        create: ["LABORATORIO", "ADMIN_GENERAL"],
        read_own: ["VENDEDOR"],
        read_zone: ["GERENTE_ZONA"],
        read_all: ["LABORATORIO", "CALIDAD", "ADMIN_GENERAL", "AUDITORIA"],
        read_approved: ["PRODUCCION"],
        update: ["LABORATORIO", "ADMIN_GENERAL"],
        validate: ["CALIDAD", "ADMIN_GENERAL"],
        approve: ["CALIDAD", "GERENTE_ZONA", "ADMIN_GENERAL"],
        version_control: ["LABORATORIO", "CALIDAD", "ADMIN_GENERAL"]
      },
      
      inventory: {
        read_limited: ["VENDEDOR"],
        read_materials: ["LABORATORIO", "PRODUCCION"],
        read_full: ["GERENTE_ZONA", "CALIDAD"],
        read_all: ["ADMIN_INVENTARIO", "ADMIN_GENERAL", "AUDITORIA"],
        update_stock: ["ADMIN_INVENTARIO", "ADMIN_GENERAL"],
        manage_materials: ["ADMIN_INVENTARIO", "ADMIN_GENERAL"],
        reserve_materials: ["PRODUCCION", "ADMIN_INVENTARIO"]
      },
      
      users: {
        read_zone: ["GERENTE_ZONA"],
        read_all: ["ADMIN_GENERAL", "AUDITORIA"],
        create: ["ADMIN_GENERAL"],
        update: ["ADMIN_GENERAL"],
        manage_sales_reps: ["GERENTE_ZONA"],
        manage_roles: ["ADMIN_GENERAL"],
        deactivate: ["ADMIN_GENERAL"]
      }
    },

    fieldLevelPermissions: {
      client_sensitive_data: {
        rfc: ["VENDEDOR", "GERENTE_ZONA", "ADMIN_GENERAL"],
        financial_info: ["GERENTE_ZONA", "ADMIN_GENERAL"],
        contact_details: ["VENDEDOR", "GERENTE_ZONA", "ADMIN_GENERAL"]
      },
      
      formulation_data: {
        cost_information: ["LABORATORIO", "GERENTE_ZONA", "ADMIN_GENERAL"],
        material_quantities: ["LABORATORIO", "CALIDAD", "PRODUCCION", "ADMIN_GENERAL"],
        technical_specifications: ["LABORATORIO", "CALIDAD", "ADMIN_GENERAL"],
        validation_notes: ["CALIDAD", "ADMIN_GENERAL"]
      },
      
      production_data: {
        scheduling: ["PRODUCCION", "GERENTE_ZONA", "ADMIN_GENERAL"],
        resource_allocation: ["PRODUCCION", "ADMIN_GENERAL"],
        delivery_dates: ["PRODUCCION", "GERENTE_ZONA", "VENDEDOR", "ADMIN_GENERAL"]
      }
    }
  },

  implementationPatterns: {
    azureADIntegration: {
      description: "Single Sign-On integration with Azure Active Directory",
      
      configuration: `
// Azure AD configuration
const azureADConfig = {
  clientId: process.env.AZURE_AD_CLIENT_ID,
  tenantId: process.env.AZURE_AD_TENANT_ID,
  clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
  redirectUri: process.env.AZURE_AD_REDIRECT_URI,
  scopes: ['openid', 'profile', 'email', 'User.Read']
};

// NextAuth configuration with Azure AD
export const authOptions = {
  providers: [
    AzureADProvider({
      clientId: azureADConfig.clientId,
      tenantId: azureADConfig.tenantId,
      clientSecret: azureADConfig.clientSecret,
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        // Get user role from database based on email
        const userRole = await getUserRole(user.email);
        token.role = userRole;
        token.permissions = await getRolePermissions(userRole);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.permissions = token.permissions;
      return session;
    }
  }
};`,

      userRoleMapping: `
// Map Azure AD users to system roles
const mapUserToRole = async (email: string, azureGroups: string[]) => {
  // Check database for existing role assignment
  const existingUser = await db.users.findByEmail(email);
  if (existingUser) {
    return existingUser.role;
  }
  
  // Map based on Azure AD groups
  const roleMapping = {
    'ERP-Sales-Team': 'VENDEDOR',
    'ERP-Zone-Managers': 'GERENTE_ZONA',
    'ERP-Laboratory': 'LABORATORIO',
    'ERP-Quality-Control': 'CALIDAD',
    'ERP-Production': 'PRODUCCION',
    'ERP-Inventory-Admin': 'ADMIN_INVENTARIO',
    'ERP-System-Admin': 'ADMIN_GENERAL',
    'ERP-Audit': 'AUDITORIA',
    'ERP-Maintenance': 'MANTENIMIENTO'
  };
  
  for (const group of azureGroups) {
    if (roleMapping[group]) {
      return roleMapping[group];
    }
  }
  
  // Default role if no mapping found
  return 'VENDEDOR';
};`
    },

    middlewareProtection: {
      description: "Route-level protection with permission checking",
      
      middleware: `
// middleware.ts - Route protection
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const userRole = req.nextauth.token?.role;
    const userPermissions = req.nextauth.token?.permissions || [];
    
    // Admin routes - require ADMIN_GENERAL role
    if (pathname.startsWith('/admin')) {
      if (userRole !== 'ADMIN_GENERAL') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
    
    // Configuration routes - require appropriate permissions
    if (pathname.startsWith('/configuration')) {
      const hasConfigAccess = [
        'ADMIN_GENERAL',
        'ADMIN_INVENTARIO',
        'LABORATORIO',
        'CALIDAD'
      ].includes(userRole);
      
      if (!hasConfigAccess) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
    
    // Client management - role-based access
    if (pathname.startsWith('/clients')) {
      const hasClientAccess = userPermissions.some(p => 
        p.startsWith('clients:')
      );
      
      if (!hasClientAccess) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
    
    // Request management - check specific permissions
    if (pathname.startsWith('/requests')) {
      const hasRequestAccess = userPermissions.some(p => 
        p.startsWith('requests:')
      );
      
      if (!hasRequestAccess) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/configuration/:path*',
    '/clients/:path*',
    '/requests/:path*',
    '/formulations/:path*',
    '/inventory/:path*'
  ]
};`
    },

    componentLevelGuards: {
      description: "Component-level permission checks and UI element visibility control",
      
      permissionHook: `
// usePermissions hook
import { useSession } from 'next-auth/react';

export const usePermissions = () => {
  const { data: session } = useSession();
  
  const hasPermission = (entity: string, action: string) => {
    if (!session?.user?.permissions) return false;
    
    const permissionKey = \`\${entity}:\${action}\`;
    return session.user.permissions.includes(permissionKey);
  };
  
  const hasRole = (role: string | string[]) => {
    if (!session?.user?.role) return false;
    
    if (Array.isArray(role)) {
      return role.includes(session.user.role);
    }
    
    return session.user.role === role;
  };
  
  const canAccessEntity = (entity: string, ownerId?: string) => {
    const userRole = session?.user?.role;
    const userId = session?.user?.id;
    
    // Admin has access to everything
    if (userRole === 'ADMIN_GENERAL') return true;
    
    // Check ownership for sales reps
    if (userRole === 'VENDEDOR') {
      return ownerId === userId;
    }
    
    // Zone managers can access zone data
    if (userRole === 'GERENTE_ZONA') {
      // Additional zone checking logic here
      return true;
    }
    
    return hasPermission(entity, 'read_all');
  };
  
  return {
    hasPermission,
    hasRole,
    canAccessEntity,
    userRole: session?.user?.role,
    permissions: session?.user?.permissions || []
  };
};`,

      permissionGuard: `
// PermissionGuard component
interface PermissionGuardProps {
  entity: string;
  action: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  entity,
  action,
  fallback = null,
  children
}) => {
  const { hasPermission } = usePermissions();
  
  if (!hasPermission(entity, action)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

// Usage in components
<PermissionGuard entity="clients" action="create">
  <Button onClick={createClient}>
    <IconPlus className="mr-2 h-4 w-4" />
    Create Client
  </Button>
</PermissionGuard>`,

      conditionalRendering: `
// Conditional rendering based on permissions
export const ClientActionsMenu = ({ clientData }) => {
  const { hasPermission, canAccessEntity, userRole } = usePermissions();
  
  const canEdit = canAccessEntity('clients', clientData.ownerId) && 
                  hasPermission('clients', 'update');
  const canDelete = hasPermission('clients', 'delete');
  const canApprove = userRole === 'GERENTE_ZONA' && 
                     clientData.status === 'PENDING_APPROVAL';
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <IconDots className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => viewClient(clientData.id)}>
          <IconEye className="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>
        
        {canEdit && (
          <DropdownMenuItem onClick={() => editClient(clientData.id)}>
            <IconEdit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}
        
        {canApprove && (
          <DropdownMenuItem onClick={() => approveClient(clientData.id)}>
            <IconCheck className="mr-2 h-4 w-4" />
            Approve
          </DropdownMenuItem>
        )}
        
        {canDelete && (
          <DropdownMenuItem 
            onClick={() => deleteClient(clientData.id)}
            className="text-red-600"
          >
            <IconTrash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};`
    },

    dataFilteringPatterns: {
      description: "Server-side data filtering based on user roles and permissions",
      
      dataAccessFiltering: `
// Server-side data filtering based on user role
export const getFilteredClients = async (userSession: Session) => {
  const { role, id: userId, zoneId } = userSession.user;
  
  let whereClause = {};
  
  switch (role) {
    case 'VENDEDOR':
      // Sales reps see only their own clients
      whereClause = { salesRepId: userId };
      break;
      
    case 'GERENTE_ZONA':
      // Zone managers see all clients in their zones
      whereClause = { zoneId: { in: zoneId } };
      break;
      
    case 'LABORATORIO':
    case 'CALIDAD':
    case 'PRODUCCION':
      // Technical roles see clients with active requests
      whereClause = {
        requests: {
          some: {
            status: {
              in: ['ACCEPTED', 'FORMULATION_IN_PROGRESS', 'FORMULATION_COMPLETED']
            }
          }
        }
      };
      break;
      
    case 'ADMIN_GENERAL':
    case 'AUDITORIA':
      // Admins and auditors see all clients
      whereClause = {};
      break;
      
    default:
      // Default to no access
      whereClause = { id: -1 };
  }
  
  return await db.clients.findMany({
    where: whereClause,
    include: {
      salesRep: true,
      zone: true,
      requests: {
        where: {
          // Additional request filtering based on role
        }
      }
    }
  });
};`,

      fieldLevelFiltering: `
// Field-level filtering for sensitive data
export const sanitizeClientData = (client: Client, userRole: string) => {
  const sanitized = { ...client };
  
  // Remove sensitive fields based on role
  switch (userRole) {
    case 'VENDEDOR':
      // Sales reps don't see financial information
      delete sanitized.creditLimit;
      delete sanitized.paymentTerms;
      delete sanitized.internalNotes;
      break;
      
    case 'LABORATORIO':
    case 'CALIDAD':
    case 'PRODUCCION':
      // Technical roles only see operational data
      delete sanitized.rfc;
      delete sanitized.creditLimit;
      delete sanitized.paymentTerms;
      delete sanitized.salesMetrics;
      break;
      
    case 'AUDITORIA':
      // Auditors see all data but with read-only indicators
      sanitized.readOnly = true;
      break;
      
    default:
      // Unknown roles get minimal data
      return {
        id: sanitized.id,
        name: sanitized.name,
        country: sanitized.country
      };
  }
  
  return sanitized;
};`
    }
  },

  auditAndCompliance: {
    description: "Comprehensive audit trails and compliance tracking",
    
    auditLogging: `
// Audit logging system
interface AuditLog {
  id: string;
  userId: string;
  userRole: string;
  action: string;
  entity: string;
  entityId: string;
  oldValues?: any;
  newValues?: any;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
}

export const logAuditEvent = async (
  session: Session,
  action: string,
  entity: string,
  entityId: string,
  oldValues?: any,
  newValues?: any,
  request?: Request
) => {
  const auditLog: AuditLog = {
    id: generateId(),
    userId: session.user.id,
    userRole: session.user.role,
    action,
    entity,
    entityId,
    oldValues,
    newValues,
    timestamp: new Date(),
    ipAddress: getClientIP(request),
    userAgent: request?.headers.get('user-agent') || 'Unknown'
  };
  
  await db.auditLogs.create({ data: auditLog });
  
  // Send to external audit system if configured
  if (process.env.EXTERNAL_AUDIT_ENDPOINT) {
    await sendToExternalAudit(auditLog);
  }
};`,

    complianceTracking: `
// Compliance tracking for sensitive operations
export const trackComplianceEvent = async (
  eventType: 'DATA_ACCESS' | 'DATA_MODIFICATION' | 'PERMISSION_CHANGE',
  details: {
    userId: string;
    resource: string;
    action: string;
    justification?: string;
    approvedBy?: string;
  }
) => {
  const complianceEvent = {
    id: generateId(),
    eventType,
    timestamp: new Date(),
    ...details
  };
  
  await db.complianceEvents.create({ data: complianceEvent });
  
  // Check for compliance violations
  await checkComplianceViolations(complianceEvent);
};`
  },

  securityBestPractices: [
    "Always validate permissions on both client and server side",
    "Use JWT tokens with short expiration times and refresh token rotation",
    "Implement proper session management with secure cookies",
    "Log all security-relevant events for audit purposes",
    "Use HTTPS for all communications",
    "Implement rate limiting to prevent abuse",
    "Validate all input data and sanitize outputs",
    "Use principle of least privilege for role assignments",
    "Regularly audit and review permission assignments",
    "Implement proper error handling that doesn't leak sensitive information"
  ],

  integrationConsiderations: [
    "Azure AD group synchronization for role management",
    "Single Sign-On (SSO) configuration and testing",
    "Integration with external audit systems",
    "Database security and encryption at rest",
    "API security with proper authentication headers",
    "Cross-Origin Resource Sharing (CORS) configuration",
    "Content Security Policy (CSP) implementation",
    "Regular security assessments and penetration testing"
  ]
};

export default roleBasedAccessPatterns;