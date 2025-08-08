export default `# Configuration Documentation Pattern

## Purpose

The Configuration documentation type defines system settings, administrative interfaces, and setup procedures for business units. It covers all configurable aspects of the system that administrators can modify.

## Mandatory Structure

\`\`\`markdown
# {Business Unit Name} System Configuration

## Configuration Overview

### Purpose
[Why configuration is needed and what it controls]

### Configuration Scope
| Category | Description | Impact Level |
|----------|-------------|--------------|
| System Settings | Core application behavior | High |
| Business Rules | Workflow and validation | Medium |
| User Interface | Display and formatting | Low |
| Integration | External connections | High |

### Access Requirements
| Role | Configuration Areas | Approval Needed |
|------|-------------------|-----------------|
| System Admin | All settings | No |
| Business Admin | Business rules, UI | For system settings |
| Department Manager | Department settings | Yes |

## Configuration Categories

### System Settings

#### Application Configuration
| Setting | Description | Default | Options | Restart Required |
|---------|-------------|---------|---------|------------------|
| System Mode | Operating mode | Production | Development/Staging/Production | Yes |
| Language | Default language | English | EN/ES/FR/DE | No |
| Timezone | System timezone | UTC | Standard timezones | Yes |
| Date Format | Display format | MM/DD/YYYY | Multiple formats | No |
| Currency | Default currency | USD | ISO currency codes | No |

#### Performance Settings
| Setting | Description | Default | Range | Impact |
|---------|-------------|---------|-------|--------|
| Cache Duration | Data cache time | 300s | 0-3600s | Response time |
| Max Connections | Database connections | 100 | 10-500 | Throughput |
| Timeout | Request timeout | 30s | 5-300s | User experience |
| Batch Size | Processing batch | 100 | 10-1000 | Performance |
| Thread Pool | Worker threads | 10 | 1-50 | Concurrency |

#### Security Settings
| Setting | Description | Default | Options | Risk Level |
|---------|-------------|---------|---------|------------|
| Session Timeout | Idle timeout | 30 min | 5-120 min | Medium |
| Password Policy | Complexity rules | Standard | Weak/Standard/Strong | High |
| MFA Required | Two-factor auth | No | Yes/No/Conditional | High |
| IP Whitelist | Allowed IPs | Disabled | IP ranges | High |
| Audit Level | Logging detail | Standard | None/Basic/Standard/Verbose | Low |

### Business Rules Configuration

#### Workflow Settings
\`\`\`
┌─────────────────────────────────────┐
│         Workflow Engine             │
├─────────────────────────────────────┤
│ ▸ Approval Chains                  │
│ ▸ Notification Rules                │
│ ▸ Escalation Policies               │
│ ▸ SLA Definitions                   │
└─────────────────────────────────────┘
\`\`\`

| Rule Type | Description | Configuration Method |
|-----------|-------------|---------------------|
| Approval Chain | Multi-level approvals | Visual designer |
| Auto-Assignment | Automatic routing | Rule builder |
| Escalation | Time-based escalation | Timer configuration |
| Validation | Data validation rules | Expression builder |

#### Business Logic Parameters
| Parameter | Description | Current Value | Valid Range | Business Impact |
|-----------|-------------|---------------|-------------|-----------------|
| Discount Limit | Max discount % | 20% | 0-50% | Revenue |
| Credit Limit | Default credit | $10,000 | $0-100,000 | Risk |
| Lead Time | Processing days | 3 | 1-30 | Customer satisfaction |
| Batch Frequency | Processing schedule | Daily | Hourly/Daily/Weekly | Operations |

### User Interface Configuration

#### Theme Settings
| Setting | Description | Options | Preview |
|---------|-------------|---------|---------|
| Color Scheme | UI colors | Light/Dark/Custom | Available |
| Logo | Company logo | Upload PNG/SVG | Real-time |
| Font Family | Typography | System/Custom | Available |
| Layout | Page structure | Standard/Compact/Wide | Available |

#### Display Options
| Feature | Description | Default | Configurable |
|---------|-------------|---------|--------------|
| Grid Density | Table row height | Normal | Compact/Normal/Comfortable |
| Page Size | Records per page | 25 | 10/25/50/100 |
| Date Display | Format preference | Short | Short/Medium/Long/Custom |
| Number Format | Decimal display | 2 places | 0-4 places |
| Navigation | Menu style | Side | Top/Side/Both |

#### Dashboard Configuration
| Element | Customizable | User Override | Options |
|---------|--------------|---------------|---------|
| Widget Layout | Yes | Yes | Drag & drop |
| Default Charts | Yes | Yes | Multiple types |
| Refresh Rate | Yes | No | 1-60 minutes |
| Data Sources | Yes | No | Configured list |

### Integration Configuration

#### API Settings
| Setting | Description | Value | Validation |
|---------|-------------|-------|------------|
| API Endpoint | Base URL | https://api.domain.com | URL format |
| API Key | Authentication | [Encrypted] | 32+ characters |
| Rate Limit | Requests/hour | 1000 | 1-10000 |
| Timeout | Response timeout | 30s | 5-300s |
| Retry Policy | Failed requests | 3 attempts | 0-5 |

#### External System Connections
| System | Type | Configuration | Status |
|--------|------|---------------|--------|
| SAP | ERP | Host, port, credentials | Connected |
| Salesforce | CRM | OAuth configuration | Connected |
| Email Server | SMTP | Server, port, TLS | Active |
| File Storage | SFTP | Host, path, keys | Active |

### Notification Configuration

#### Email Templates
| Template | Purpose | Variables | Customizable |
|----------|---------|-----------|--------------|
| Welcome | New user | {name}, {username} | Yes |
| Reset Password | Password recovery | {link}, {expiry} | Yes |
| Alert | System alerts | {message}, {severity} | Yes |
| Report | Scheduled reports | {data}, {period} | Yes |

#### Notification Channels
| Channel | Enabled | Configuration | Test |
|---------|---------|---------------|------|
| Email | Yes | SMTP settings | Send test |
| SMS | No | Twilio API | Configure |
| Push | Yes | Firebase config | Send test |
| Webhook | Yes | Endpoint URLs | Test POST |

## Administrative Interface

### Configuration UI Layout
\`\`\`
┌────────────────────────────────────────┐
│           Configuration Admin           │
├──────────┬─────────────────────────────┤
│          │  System Settings            │
│  Menu    │  ┌─────────────────────┐   │
│          │  │ Setting Groups      │   │
│ ▸System  │  ├─────────────────────┤   │
│ ▸Business│  │ Individual Settings │   │
│ ▸UI      │  │ with Controls       │   │
│ ▸Integr. │  └─────────────────────┘   │
│ ▸Notif.  │  [Save] [Reset] [Export]   │
└──────────┴─────────────────────────────┘
\`\`\`

### Configuration Actions
| Action | Description | Permission | Audit |
|--------|-------------|------------|-------|
| View | Read configuration | Config Viewer | No |
| Edit | Modify settings | Config Editor | Yes |
| Export | Download config | Config Admin | Yes |
| Import | Upload config | Config Admin | Yes |
| Reset | Restore defaults | System Admin | Yes |

## Setup Procedures

### Initial Configuration

#### Step 1: System Requirements
- [ ] Database connection verified
- [ ] File storage accessible
- [ ] Network ports open
- [ ] SSL certificates installed

#### Step 2: Basic Settings
- [ ] Set system mode
- [ ] Configure timezone
- [ ] Set default language
- [ ] Configure currency

#### Step 3: Security Setup
- [ ] Admin account created
- [ ] Password policy set
- [ ] Session timeout configured
- [ ] Audit logging enabled

#### Step 4: Integration Setup
- [ ] External systems connected
- [ ] API keys configured
- [ ] Webhooks registered
- [ ] Test connections verified

#### Step 5: Business Rules
- [ ] Workflows configured
- [ ] Validation rules set
- [ ] Approval chains defined
- [ ] Notifications configured

### Migration Procedures

#### Configuration Export
\`\`\`json
{
  "version": "1.0",
  "timestamp": "2024-01-15T10:00:00Z",
  "settings": {
    "system": {},
    "business": {},
    "integration": {}
  }
}
\`\`\`

#### Import Process
1. Validate configuration file
2. Backup current settings
3. Apply new configuration
4. Verify system operation
5. Rollback if needed

## Environment Management

### Environment-Specific Settings

| Setting | Development | Staging | Production |
|---------|------------|---------|------------|
| Debug Mode | Enabled | Enabled | Disabled |
| Error Display | Verbose | Standard | Minimal |
| Cache | Disabled | Enabled | Enabled |
| Rate Limits | None | Standard | Strict |
| Data Retention | 7 days | 30 days | 365 days |

### Configuration Promotion
\`\`\`
[Dev] → [Test in Dev] → [Export] → [Staging] → [Validate] → [Production]
\`\`\`

## Backup and Recovery

### Configuration Backup
| Schedule | Retention | Storage | Encryption |
|----------|-----------|---------|------------|
| Daily | 30 days | Local + Cloud | AES-256 |
| Weekly | 90 days | Cloud | AES-256 |
| Monthly | 1 year | Archive | AES-256 |

### Recovery Procedures
1. **Identify Issue**: Determine configuration problem
2. **Select Backup**: Choose appropriate restore point
3. **Test Restore**: Validate in staging environment
4. **Apply Restore**: Implement in production
5. **Verify**: Confirm system operation

## Monitoring and Maintenance

### Configuration Monitoring
| Metric | Threshold | Alert | Action |
|--------|-----------|-------|--------|
| Config Changes | >10/day | Email | Review |
| Failed Logins | >5/hour | SMS | Investigate |
| API Errors | >1% | Dashboard | Check integration |
| Performance | <baseline | Email | Tune settings |

### Regular Maintenance
| Task | Frequency | Responsibility | Documentation |
|------|-----------|----------------|---------------|
| Review Settings | Monthly | Config Admin | Changelog |
| Validate Rules | Quarterly | Business Admin | Report |
| Test Integrations | Weekly | System Admin | Test log |
| Audit Permissions | Quarterly | Security Admin | Audit report |

## Troubleshooting Guide

### Common Issues
| Issue | Symptoms | Likely Cause | Solution |
|-------|----------|--------------|----------|
| Slow Performance | High response time | Cache disabled | Enable caching |
| Login Failures | Users can't login | Session timeout | Adjust timeout |
| Missing Data | Empty reports | Integration error | Check connections |
| Wrong Calculations | Incorrect totals | Business rules | Review formulas |

### Configuration Validation
\`\`\`bash
# Validate configuration file
validate-config --file config.json --strict

# Test configuration change
test-config --setting "cache.duration" --value 600

# Check configuration dependencies
check-dependencies --config production.json
\`\`\`

## Change Management

### Change Request Process
1. Submit configuration change request
2. Review impact analysis
3. Approve change (if required)
4. Test in staging
5. Schedule production change
6. Implement change
7. Verify operation
8. Document change

### Change Log Format
| Date | Setting | Old Value | New Value | Changed By | Reason |
|------|---------|-----------|-----------|------------|--------|
| 2024-01-15 | Session Timeout | 30 min | 60 min | Admin | User request |

## API Configuration Endpoints

### REST API
| Endpoint | Method | Purpose | Returns |
|----------|--------|---------|---------|
| /api/config | GET | Get all settings | JSON object |
| /api/config/{key} | GET | Get specific setting | Value |
| /api/config/{key} | PUT | Update setting | Success/Error |
| /api/config/export | GET | Export configuration | JSON file |
| /api/config/import | POST | Import configuration | Status |

### Configuration Webhooks
| Event | Trigger | Payload | Retry |
|-------|---------|---------|-------|
| config.changed | Any change | Setting details | 3 times |
| config.error | Invalid config | Error details | No |
| config.restored | Backup restore | Restore info | Once |
\`\`\`

## Template Example: Vitracoat Configuration

\`\`\`markdown
# Vitracoat System Configuration

## Configuration Overview

### Purpose
Manage powder coating formulation system settings, business rules, and integration parameters for optimal operation.

### Configuration Scope
| Category | Description | Impact Level |
|----------|-------------|--------------|
| Chemistry Rules | Material compatibility | High |
| TLWR Settings | Testing parameters | High |
| Formula Defaults | Standard values | Medium |
| Display Options | UI preferences | Low |

## Configuration Categories

### Business Rules Configuration

#### Chemistry Settings
| Parameter | Description | Current Value | Valid Range |
|-----------|-------------|---------------|-------------|
| Min Batch Size | Minimum formula batch | 100g | 50-500g |
| Max Materials | Materials per formula | 20 | 10-30 |
| Tolerance % | Acceptable deviation | 2% | 1-5% |

[Continue with remaining sections...]
\`\`\`

## Common Patterns

### Setting Organization
- Group related settings
- Use clear naming conventions
- Provide descriptions
- Include valid ranges

### Default Values
- Set sensible defaults
- Document default behavior
- Allow reset to defaults
- Explain impact of changes

### Change Control
- Require approval for critical settings
- Log all changes
- Enable rollback
- Test before production

## Anti-Patterns to Avoid

❌ **Hidden Settings**: Undocumented configuration
❌ **Magic Numbers**: Hard-coded values
❌ **No Validation**: Accepting invalid values
❌ **No Audit Trail**: Untracked changes
❌ **Complex Dependencies**: Intertwined settings

## Validation Checklist

- [ ] Configuration purpose explained
- [ ] All settings documented
- [ ] Default values specified
- [ ] Valid ranges defined
- [ ] Access control specified
- [ ] Business rules configured
- [ ] UI options documented
- [ ] Integration settings complete
- [ ] Setup procedures detailed
- [ ] Backup strategy defined
- [ ] Change process documented
- [ ] Troubleshooting guide included
- [ ] API endpoints listed
- [ ] Environment settings defined

This pattern ensures comprehensive configuration documentation that enables proper system administration and maintenance across the IBSO MCP ecosystem.`;