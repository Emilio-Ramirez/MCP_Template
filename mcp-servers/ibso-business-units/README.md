# IBSO Business Units MCP Server

MCP server for business domain knowledge management with clean, scalable architecture.

## ✨ **Core Features**

- **Clean Architecture**: Markdown-first with auto-generated metadata
- **Infinite Scalability**: Support unlimited business units across any industry
- **Pattern-Based**: Standardized documentation patterns for consistency
- **MCP Native**: Built specifically for Model Context Protocol integration

## 🔄 **MCP Ecosystem Overview**

The system divides into **three specialized MCP servers**:

### 🏢 **business-units** (This Server)

**Business Domain Knowledge** - Documents WHAT the system does

- **Overview Pattern**: Business unit introduction and architecture
- **Form/Page Pattern**: Entity management (users, clients, products, workflows)
- **Configuration Pattern**: System settings, business rules, and policies
- **Special Page Pattern**: Communication systems (notifications, messages)
- **Dashboard Pattern**: Analytics, reporting, and metrics
- **Auth Pattern**: Security, access control, and permissions

### 🎨 **template-base**

**Technical Implementation** - Provides HOW to implement it

- **Design System Bundle**: UI foundation (inputs, buttons, colors, typography)
- **Table Page Bundle**: Complete table implementations with search and CRUD
- **Form Bundle**: Simple and multi-step form patterns
- **Dialog Bundle**: Modal and dialog patterns
- **Notification Bundle**: Toast and alert systems

### 📚 **mcp-documentation**

**Ecosystem Management** - Coordinates pattern integration

- **Documentation Standards**: Cross-server pattern management
- **Agent Instructions**: AI routing and decision flows
- **Quality Assurance**: Pattern validation and consistency

### 🧠 **Intelligent Routing**

- **Business Questions** → `business-units` (requirements, workflows, rules)
- **Technical Questions** → `template-base` (components, code, bundles)
- **Pattern Management** → `mcp-documentation` (standards, coordination)

### 🧮 **Auto-Generated Metadata**

```
File: manufacturing/inventory-management.md
  ↓
Auto-Generated:
  • Name: "Manufacturing - Inventory Management"
  • URI: "ibso-business://manufacturing/inventory-management"
  • Description: "Inventory management for manufacturing business unit"
```

---

_Three-server architecture providing complete business-to-technical coverage_

