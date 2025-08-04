# MCP Ecosystem Versioning & Structure

## Current Version: v1.0.0
**Date**: August 3, 2025  
**Status**: Stable - Clean Bundle Architecture

---

## 🏗️ MCP Ecosystem Structure

### Core Servers

#### 1. **crm-template-base** (Technical Implementation Hub)
**Purpose**: Single source for all technical implementation patterns  
**Architecture**: Bundle-based system ensuring consistency  
**Location**: `./crm-template-base/`

**Bundles Available:**
- `design-system-bundle` - Shared UI foundation (inputs, buttons, colors, typography)
- `table-page-bundle` - Complete table implementations (simple + tabbed)
- `form-bundle` - Complete form implementations (simple + multi-step)

**Bundle Philosophy**: Self-contained packages with ALL components needed for consistent implementation. No fragmented patterns.

#### 2. **ibso-business-units** (Domain Knowledge)
**Purpose**: Business domain-specific knowledge and workflows  
**Content**: Vitracoat chemical coating management, laboratory business rules  
**Location**: `./ibso-business-units/`

#### 3. **ibso-patterns** (Business Strategy)
**Purpose**: Business requirements and strategic patterns  
**Content**: Infrastructure, deployment, monitoring, business requirements  
**Location**: `./ibso-patterns/`

#### 4. **agency-client-template** (Client Management)
**Purpose**: Client onboarding and project management  
**Status**: Empty - Reserved for future use  
**Location**: `./agency-client-template/`

#### 5. **mcp-documentation** (Ecosystem Documentation)
**Purpose**: Cross-server documentation and ecosystem management  
**Content**: Deployment guides, integration patterns, quality frameworks  
**Location**: `./mcp-documentation/`

---

## 🎯 Architecture Principles

### Bundle Architecture (crm-template-base)
1. **Self-Contained**: Each bundle includes ALL components needed
2. **Shared Foundation**: All bundles reference `design-system-bundle`
3. **No Duplication**: Single source of truth for UI components
4. **Complete Packages**: Prevent fragmented implementations

### Content Classification
- **Technical Implementation** → `crm-template-base/bundles/`
- **Business Strategy** → `ibso-patterns`
- **Domain Knowledge** → `ibso-business-units`
- **Client Management** → `agency-client-template`
- **Ecosystem Docs** → `mcp-documentation`

---

## 📝 Version History

### v1.0.0 (August 3, 2025) - Clean Bundle Architecture
**Major Changes:**
- ✅ Removed `erp-business-patterns` server (eliminated duplication)
- ✅ Implemented bundle architecture in `crm-template-base`
- ✅ Created `design-system-bundle` as shared foundation
- ✅ Consolidated technical patterns into consistent bundles
- ✅ Updated `mcp-documentation-manager` agent with new structure
- ✅ Cleaned all references to removed server

**Bundle Structure Introduced:**
- `design-system-bundle` - Shared UI foundation
- `table-page-bundle` - Complete table implementations  
- `form-bundle` - Complete form implementations

**Benefits:**
- Single source for technical patterns
- Eliminated confusing server overlap
- Guaranteed UI consistency through shared design system
- Self-contained implementation packages

### v0.x.x (Pre-August 2025) - Legacy Structure
**Structure**: Multiple overlapping servers with fragmented patterns  
**Issues**: Duplication between `erp-business-patterns` and `crm-template-base`  
**Status**: Deprecated

---

## 🔄 Versioning Rules

### When to Increment Version

#### Major Version (x.0.0)
- Server addition/removal
- Fundamental architecture changes
- Breaking changes to bundle structure
- Content classification rule changes

#### Minor Version (1.x.0)  
- New bundle addition
- New resource categories
- Significant content additions
- New server capabilities

#### Patch Version (1.0.x)
- Resource content updates
- Bug fixes in existing patterns
- Documentation improvements
- Minor content additions

### Version Update Process
1. Update this `VERSIONING.md` file
2. Update `mcp-documentation-manager` agent if structure changes
3. Update deployment documentation if needed
4. Test all server integrations
5. Commit with version tag

---

## 🧪 Testing New Versions

### Bundle Testing Checklist
- [ ] All bundles reference `design-system-bundle` correctly
- [ ] No duplicate UI pattern definitions
- [ ] Self-contained bundle functionality
- [ ] Cross-bundle consistency maintained

### Server Integration Testing  
- [ ] All servers load without errors
- [ ] Resource URIs resolve correctly
- [ ] Cross-server references work
- [ ] Deployment scripts updated

### Agent Compatibility
- [ ] `mcp-documentation-manager` agent updated
- [ ] Content routing works correctly
- [ ] Bundle architecture enforced

---

## 📋 Current Status Summary

**Servers**: 5 active servers (clean, no overlap)  
**Bundles**: 3 core bundles in crm-template-base  
**Architecture**: Bundle-based with shared design system  
**Documentation**: Complete and consistent  
**Agent**: Updated with new structure rules  

**Next Steps**: Ready for production use and future bundle additions

---

*This versioning system ensures the MCP ecosystem remains organized, consistent, and maintainable as it evolves.*