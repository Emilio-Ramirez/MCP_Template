# Raw Materials Management System

## Overview

The system manages raw materials and their compatibility with different chemical formulations. Each raw material is defined with its chemical compatibility, allowing the system to filter and validate material usage in formulations.

## List of Components

- **Raw Materials Table** - Main data grid with search, filter, and CRUD operations
- **Raw Material Form** - Single-page form with material properties and chemistry compatibility
- **View Material Dialog** - Read-only modal showing complete material details
- **Chemistry Filter** - Filter materials by compatible chemistry types
- **Import/Export Actions** - Bulk material management operations

## Raw Materials Table Definition

The main raw materials list displays:

| Column                | Type    | Description                  | Example                        |
|-----------------------|---------|------------------------------|--------------------------------|
| **Código**            | String  | Unique material identifier   | `MCC00312`                     |
| **Descripción**       | String  | Material name/description    | `7235 ULTRA GREEN - MCC00312` |
| **Tipo**              | Enum    | Material category            | `MICA`                         |
| **Alias**             | String  | Alternative/short name       | `Ultra Green`                  |
| **Peso Específico**   | Decimal | Specific weight/density      | `2.85`                         |
| **Precio**            | Decimal | Current price per unit       | `30.73`                        |
| **Estado**            | Boolean | Active status                | `active`                       |
| **Chemistry**         | Array   | Compatible chemistry types   | `Epoxy, Hybrid, Polyester`    |
| **Actions**           | Action  | View/Edit/Delete actions     | `Buttons`                      |

## Raw Material Structure

Each raw material contains the following properties:

| Field               | Type    | Description                    | Example                                                      |
|---------------------|---------|--------------------------------|--------------------------------------------------------------|
| **Código**          | String  | Unique material identifier     | `MCC00312`                                                   |
| **Descripción**     | String  | Material name/description      | `7235 ULTRA GREEN - MCC00312`                               |
| **Tipo**            | Enum    | Material category              | `MICA`                                                       |
| **Alias**           | String  | Alternative/short name         | `Ultra Green`                                                |
| **Comentarios**     | Text    | Additional notes               | `Special handling required`                                  |
| **Peso Específico** | Decimal | Specific weight/density        | `2.85`                                                       |
| **Precio**          | Decimal | Current price per unit         | `30.73`                                                      |
| **Estado**          | Boolean | Active status (auto-set to true) | `active`                                                     |
| **Chemistry**       | Array   | Compatible chemistry types     | `[Epoxy, Hybrid, Polyester TGIC, Polyester non_TGIC, Urethane]` |

## Material Information Form

When creating or editing materials, the form includes:

### Basic Information Section

| Field               | Type     | Validation | Description                           |
|---------------------|----------|------------|---------------------------------------|
| **Código**          | String   | Required   | Unique identifier for the material    |
| **Descripción**     | String   | Required   | Full material name and description    |
| **Tipo**            | Dropdown | Required   | Material category selection           |
| **Alias**           | String   | Optional   | Alternative or common name            |
| **Comentarios**     | TextArea | Optional   | Additional notes or special handling  |

### Physical Properties Section

| Field               | Type    | Validation | Description                    |
|---------------------|---------|------------|--------------------------------|
| **Peso Específico** | Decimal | Required   | Specific weight/density value  |
| **Precio**          | Decimal | Required   | Current market price per unit  |
| **Estado**          | Boolean | Auto-set   | Active status (defaults to true) |

### Chemistry Compatibility Section

Multi-select checkboxes for compatible chemistry types:

```
🧪 Chemistry Compatibility
├── ☐ Epoxy
├── ☐ Hybrid
├── ☐ Polyester TGIC
├── ☐ Polyester non_TGIC
├── ☐ Polyester_Acrylic
├── ☐ Urethane
├── ☐ SD Polyester TGIC
├── ☐ SD Polyester non_TGIC
├── ☐ SD Polyester_Acrylic
├── ☐ SD Urethane
├── ☐ Fluoropolymer
└── ☐ Hi-Temp Silicone
```

## View Material Logic

When clicking a material from the table:

### Dialog Display
- Opens read-only modal showing complete material information
- Displays basic information, physical properties, and chemistry compatibility
- Shows usage history in formulations (if available)
- Includes status and last modified information

### Dialog Information
- **Basic Info**: Code, description, type, alias, and comments
- **Properties**: Physical characteristics and pricing
- **Chemistry**: Visual display of compatible chemistry types
- **Usage**: List of formulations using this material
- **History**: Creation and modification timestamps

## Form Actions

Available actions in the raw materials interface:

```
🎯 Raw Material Actions
├── SAVE - Save material changes
├── CANCEL - Cancel and close form
├── DELETE - Remove material (with confirmation)
├── DUPLICATE - Create copy of material
├── EXPORT - Export material data
└── IMPORT - Bulk import materials
```

## Chemistry Types

The system supports the following chemistry types for powder coating formulations:

*Chemistry types are managed in System Management → Chemistry & Materials → Chemistry Types*

Supported chemistries include epoxy, hybrid systems, various polyester types, urethane, fluoropolymer, and high-temperature silicone systems.

## Material Types

The system categorizes materials into the following types:

*Material type categories are configurable in System Management → Colors & Finishes → Raw Material Types*

Current categories include additives, metals (aluminum, bronze, zinc), fillers, wax modifiers, corrosion inhibitors, mica effects, pigments, and resins.

## Example Material Entry

| Name/Description | Type | Specific Weight | Price | Status | Chemistry |
|------------------|------|-----------------|-------|--------|-----------|
| 7235 ULTRA GREEN - MCC00312 | MICA | 2.85 | 30.73 | active | Epoxy, Hybrid, Polyester TGIC, Polyester non_TGIC, Urethane |

## Business Logic

- **Chemistry Validation**: Only materials compatible with the selected formulation chemistry can be used
- **Auto-filtering**: The system automatically filters available materials based on the product type
- **Price Calculation**: Material prices are used for automatic formulation cost estimation
- **Inventory Integration**: Material availability is checked against SAP inventory levels
- **Unique Code Validation**: System ensures no duplicate material codes
- **Bulk Operations**: Support for importing/exporting material data
- **Usage Tracking**: Track which formulations use each material