export default `# Auth Documentation Pattern

## Purpose

The Auth documentation type defines authentication, authorization, and security patterns for business units. It specifies user roles, permissions, access control, and security policies.

## Mandatory Structure

\`\`\`markdown
# {Business Unit Name} Authentication & Authorization

## Authentication Overview

### Authentication Methods
| Method | Description | Use Case | Security Level |
|--------|-------------|----------|----------------|
| Username/Password | Traditional login | Standard users | Medium |
| SSO/SAML | Single sign-on | Enterprise users | High |
| API Key | Service authentication | System integration | High |
| OAuth 2.0 | Third-party auth | External apps | High |

### Login Flow
\`\`\`
[User] → [Login Page] → [Auth Provider] → [Validation] → [Session] → [Application]
\`\`\`

### Session Management
| Parameter | Value | Description |
|-----------|-------|-------------|
| Session Timeout | 30 minutes | Idle timeout period |
| Remember Me | 7 days | Extended session option |
| Concurrent Sessions | 1 | Single device limitation |
| Session Storage | JWT/Cookie | Token mechanism |

## User Roles and Permissions

### Role Hierarchy
\`\`\`
┌─────────────┐
│    Admin    │ (Full system access)
├─────────────┤
│   Manager   │ (Department access)
├─────────────┤
│   Analyst   │ (Read and report)
├─────────────┤
│    User     │ (Basic access)
└─────────────┘
\`\`\`

### Role Definitions

#### System Administrator
- **Description**: Full system control and configuration
- **Access Level**: Unrestricted
- **Key Permissions**:
  - User management
  - System configuration
  - Security settings
  - Audit logs

#### Business Manager
- **Description**: Department-level management
- **Access Level**: Department-wide
- **Key Permissions**:
  - Approve transactions
  - View reports
  - Manage team members
  - Export data

#### Data Analyst
- **Description**: Reporting and analysis
- **Access Level**: Read-only with export
- **Key Permissions**:
  - View all data
  - Create reports
  - Export to Excel
  - Read dashboards

#### Standard User
- **Description**: Basic system usage
- **Access Level**: Own data only
- **Key Permissions**:
  - Create entries
  - Edit own data
  - View assigned items
  - Submit requests

### Permission Matrix

| Feature/Action | Admin | Manager | Analyst | User |
|----------------|-------|---------|---------|------|
| **User Management** |
| Create User | ✓ | ✗ | ✗ | ✗ |
| Edit User | ✓ | Own team | ✗ | ✗ |
| Delete User | ✓ | ✗ | ✗ | ✗ |
| **Data Access** |
| View All Data | ✓ | Department | ✓ | Own |
| Edit Data | ✓ | Department | ✗ | Own |
| Delete Data | ✓ | Department | ✗ | ✗ |
| **Reports** |
| View Reports | ✓ | ✓ | ✓ | Limited |
| Create Reports | ✓ | ✓ | ✓ | ✗ |
| Export Reports | ✓ | ✓ | ✓ | ✗ |
| **Configuration** |
| System Settings | ✓ | ✗ | ✗ | ✗ |
| Business Rules | ✓ | Limited | ✗ | ✗ |
| Workflows | ✓ | Department | ✗ | ✗ |

## Security Policies

### Password Requirements
| Requirement | Value | Enforcement |
|-------------|-------|-------------|
| Minimum Length | 12 characters | Required |
| Complexity | Upper, lower, number, special | Required |
| History | Last 5 passwords | Prevented |
| Expiration | 90 days | Forced change |
| Lockout | 5 failed attempts | 30 min lock |

### Multi-Factor Authentication (MFA)
- **Methods Available**:
  - SMS OTP
  - Authenticator App (TOTP)
  - Email OTP
  - Hardware Token
- **Required For**:
  - Admin accounts (mandatory)
  - Sensitive operations
  - External access

### Account Lifecycle
\`\`\`
[Provision] → [Active] → [Suspended] → [Deactivated] → [Archived]
\`\`\`

| Status | Description | Access | Data Retention |
|--------|-------------|--------|----------------|
| Active | Normal operation | Full | Active |
| Suspended | Temporary disable | None | Preserved |
| Deactivated | Permanent disable | None | Preserved |
| Archived | Historical record | None | Read-only |

## Access Control Implementation

### Resource-Level Security
\`\`\`markdown
/business-unit/
├── /public/          (No auth required)
├── /authenticated/   (Login required)
├── /authorized/      (Role check)
└── /admin/          (Admin only)
\`\`\`

### Data-Level Security

#### Row-Level Security
- **Implementation**: Filter by user/department
- **Example**: Users see only their records
- **Configuration**: Database policies

#### Column-Level Security
- **Implementation**: Mask sensitive fields
- **Example**: SSN shown as XXX-XX-1234
- **Configuration**: Field-level permissions

#### API Security
| Endpoint Pattern | Auth Method | Rate Limit | CORS |
|-----------------|-------------|------------|------|
| /api/public/* | None | 100/hour | * |
| /api/auth/* | API Key | 1000/hour | Configured |
| /api/admin/* | JWT + Role | Unlimited | Restricted |

## Integration Points

### Single Sign-On (SSO)
- **Provider**: [SAML/OAuth provider]
- **Configuration**:
  - Identity Provider URL
  - Certificate/Keys
  - Attribute Mapping
- **User Provisioning**: JIT/Pre-provisioned

### LDAP/Active Directory
- **Server**: ldap://domain.com
- **Base DN**: ou=users,dc=domain,dc=com
- **Sync Schedule**: Every 4 hours
- **Attributes Mapped**:
  - sAMAccountName → username
  - mail → email
  - memberOf → groups

### External Authentication
| Provider | Protocol | Use Case | Status |
|----------|----------|----------|--------|
| Google | OAuth 2.0 | Customer login | Active |
| Microsoft | SAML 2.0 | Employee SSO | Active |
| Custom API | JWT | Service accounts | Active |

## Audit and Compliance

### Audit Log Events
| Event Type | Description | Retention | Alert |
|------------|-------------|-----------|-------|
| Login Success | User authentication | 1 year | No |
| Login Failure | Failed attempts | 1 year | 5+ attempts |
| Permission Change | Role modifications | 7 years | Yes |
| Data Access | Sensitive data view | 3 years | Configurable |
| Configuration Change | System settings | 7 years | Yes |

### Compliance Requirements
- **GDPR**: Data privacy and consent
- **SOC 2**: Security controls
- **HIPAA**: Healthcare data (if applicable)
- **PCI DSS**: Payment data (if applicable)

### Security Monitoring
| Metric | Threshold | Action |
|--------|-----------|--------|
| Failed Logins | >5 in 5 min | Lock account |
| Unusual Location | New geography | MFA challenge |
| Privilege Escalation | Role change | Alert + Log |
| Mass Download | >1000 records | Alert + Review |

## User Management Interface

### User Creation Form
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Username | Text | Yes | Unique, alphanumeric |
| Email | Email | Yes | Valid format, unique |
| First Name | Text | Yes | Letters only |
| Last Name | Text | Yes | Letters only |
| Role | Select | Yes | From role list |
| Department | Select | Yes | Active departments |
| Manager | Select | No | Active managers |
| Start Date | Date | Yes | Not past |
| MFA Required | Checkbox | No | Based on role |

### User Profile Management
- **Self-Service**:
  - Password reset
  - MFA setup
  - Profile update
  - Session management
- **Admin Functions**:
  - Role assignment
  - Account status
  - Permission override
  - Audit review

## Security Headers and Configuration

### HTTP Security Headers
\`\`\`
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000
\`\`\`

### CORS Configuration
\`\`\`json
{
  "origins": ["https://app.domain.com"],
  "methods": ["GET", "POST", "PUT", "DELETE"],
  "credentials": true,
  "maxAge": 86400
}
\`\`\`

## Emergency Procedures

### Account Recovery
1. Identity verification
2. Manager approval
3. Temporary password
4. Forced password change
5. MFA re-enrollment

### Security Incident Response
1. Detect and alert
2. Contain threat
3. Investigate cause
4. Remediate issue
5. Document incident
6. Review and improve

### Break-Glass Access
- **Purpose**: Emergency admin access
- **Activation**: Dual approval required
- **Duration**: 24 hours maximum
- **Audit**: Full activity logging
- **Review**: Post-incident analysis

## API Authentication

### API Key Management
| Property | Value | Description |
|----------|-------|-------------|
| Format | UUID v4 | 128-bit random |
| Rotation | 90 days | Automatic renewal |
| Scope | Limited | Specific endpoints |
| Rate Limit | Configured | Per key limits |

### JWT Token Structure
\`\`\`json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user_id",
    "role": "role_name",
    "exp": "timestamp",
    "permissions": []
  }
}
\`\`\`
\`\`\`

## Template Example: Vitracoat Auth

\`\`\`markdown
# Vitracoat Authentication & Authorization

## Authentication Overview

### Authentication Methods
| Method | Description | Use Case | Security Level |
|--------|-------------|----------|----------------|
| Username/Password | Standard login | All users | Medium |
| Azure AD SSO | Corporate SSO | Employees | High |
| API Key | System integration | SAP/TLWR | High |

## User Roles and Permissions

### Role Definitions

#### Formulator
- **Description**: Creates and manages formulations
- **Access Level**: Formulation system full access
- **Key Permissions**:
  - Create/edit formulations
  - Submit for TLWR
  - View all formulas
  - Export to Excel

#### Lab Technician
- **Description**: Conducts testing
- **Access Level**: TLWR system access
- **Key Permissions**:
  - Create TLWR
  - Enter test results
  - View formulations
  - Update quality properties

[Continue with remaining sections...]
\`\`\`

## Common Patterns

### Role Design
- Keep roles under 10 total
- Use hierarchical structure
- Separate by function
- Avoid role explosion

### Permission Granularity
- Feature-level for major functions
- Data-level for sensitive info
- Action-level for critical operations

### Security Layers
- Network security (firewall)
- Application security (auth)
- Data security (encryption)
- Audit security (logging)

## Anti-Patterns to Avoid

❌ **Over-Permissioning**: Giving too broad access
❌ **Under-Documentation**: Missing permission details
❌ **Weak Passwords**: Insufficient requirements
❌ **No Audit Trail**: Missing security events
❌ **Static Roles**: No periodic review

## Validation Checklist

- [ ] All authentication methods documented
- [ ] Login flow clearly defined
- [ ] Session management specified
- [ ] All roles defined with descriptions
- [ ] Complete permission matrix
- [ ] Password policy documented
- [ ] MFA configuration included
- [ ] Account lifecycle defined
- [ ] Access control patterns specified
- [ ] Integration points documented
- [ ] Audit requirements listed
- [ ] Compliance needs addressed
- [ ] Emergency procedures defined
- [ ] API authentication covered
- [ ] Security headers configured

This pattern ensures comprehensive authentication and authorization documentation that maintains security and compliance across the IBSO MCP ecosystem.`;