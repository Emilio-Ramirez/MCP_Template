# Formulation Management System

## Overview

The system manages chemical powder coating formulations with multiple bases, raw material combinations, and complete process tracking. Each formulation includes material composition, process parameters, and integrates with TLWR (Testing Laboratory Work Request) for quality validation.

## List of Components

- **Formulation Table** - Main data grid with search, filter, and CRUD operations
- **Formulation Form** - Multi-section form with Header, Raw Materials, Mix Components, Process Parameters
- **View Formulation Dialog** - Read-only modal showing complete formulation details including TLWR results
- **TLWR Integration** - Testing workflow connection and quality properties population
- **Approval Dialog** - Formulation approval workflow interface
- **Export Actions** - Excel export and ticket generation

## Formulation Table Definition

The main formulation list displays:

| Column             | Type    | Description             | Example           |
| ------------------ | ------- | ----------------------- | ----------------- |
| **LWR**            | String  | Laboratory Work Request | `41131`           |
| **NOMBRE COLOR**   | String  | Color/Product name      | `ANODIZED CLEAR`  |
| **NOMBRE CLIENTE** | String  | Customer name           | `AVALON ALUMINUM` |
| **FECHA**          | Date    | Creation date           | `01/Aug/2025`     |
| **FORMULADOR**     | String  | Formulator name         | `Julio Olivares`  |
| **SISTEMA**        | String  | Chemistry system        | `Epoxy`           |
| **TOTAL**          | Decimal | Total weight            | `637.089`         |
| **# ORDEN**        | String  | Order number            | `108119`          |
| **STATUS**         | Enum    | Current status          | `Trabajando`      |
| **APROBADO**       | Boolean | Approval status         | `no`              |
| **VER**            | Action  | View/Edit action        | `Click`           |

## Main Formulation Structure

Each formulation form contains the following sections:

| Section                         | Description                 | Purpose                     |
| ------------------------------- | --------------------------- | --------------------------- |
| **Header Information**          | Basic formulation data      | Identification and tracking |
| **Raw Materials (M1-M20)**      | Material composition        | Formula definition          |
| **Mix Components (M-1 to M-7)** | Additional mixing materials | Process enhancement         |
| **Process Parameters**          | Manufacturing settings      | Production control          |

## Header Information - Field Categories

### Descriptive Fields (Read-only, populated from LWR)

| Field             | Type    | Description                    | Example                                    |
| ----------------- | ------- | ------------------------------ | ------------------------------------------ |
| **Formula**       | String  | Base identifier                | `F-1, F-2, F-3, F-4, F-5, PRODUCCION, F-7` |
| **ID**            | String  | Unique formulation ID          | `F-1-41131`                                |
| **LWR**           | String  | Laboratory Work Request number | `41131`                                    |
| **Formulator**    | String  | Assigned laboratory technician | `Julio Olivares`                           |
| **Product Name**  | String  | Technical product name         | `ANODIZED CLEAR`                           |
| **Customer Name** | String  | Client company name            | `AVALON ALUMINUM`                          |
| **Tiempo(min)**   | Integer | Process time in minutes        | `10`                                       |
| **@Temp °F**      | Integer | Process temperature            | `400`                                      |
| **Type**          | String  | Formulation category           | `DB1`                                      |

### Editable Fields

| Field       | Type     | Description                | Business Rules             |
| ----------- | -------- | -------------------------- | -------------------------- |
| **System**  | Select   | Chemistry system selection | Affects material filtering |
| **REMARKS** | Textarea | Notes from LWR (editable)  | Additional specifications  |

### To Be Filled Fields

| Field              | Type   | Description                    | Required For |
| ------------------ | ------ | ------------------------------ | ------------ |
| **Base color**     | Select | Color identifier selection     | Production   |
| **SAP ID**         | String | Production tracking identifier | Production   |
| **Technical Name** | String | Assigned by formulator         | Approval     |

## Raw Materials Section (M1-M20)

Material composition and formula definition:

| Field          | Type    | Description                               | Example                                      |
| -------------- | ------- | ----------------------------------------- | -------------------------------------------- |
| **Base color** | String  | Base color identifier                     | `F-1`                                        |
| **Quantity**   | Decimal | Total weight of materials in grams        | `637.089`                                    |
| **Materials**  | Array   | List of materials used in the formulation | `["materia1", "materia2"]`                   |
| **Results**    | Object  | Calculated results for the formulation    | `{ "quantity": 637.089, "porcentage": 100 }` |

### Each Material Slot Contains

Individual material specifications within the raw materials section:

| Field            | Type     | Description                                   | Example            |
| ---------------- | -------- | --------------------------------------------- | ------------------ |
| **No**           | String   | Material position                             | `M1, M2, M3...M20` |
| **RAW MATERIAL** | Dropdown | Material selection (filtered by chemistry)    | `materia1`         |
| **FORMULA QTY**  | Decimal  | Quantity in grams                             | `106.0`            |
| **%**            | Decimal  | Calculated percentage of total                | `16.6`             |
| **PROD**         | Decimal  | Production quantity (quantity \* formula QTY) | `600`              |

## Mix Components (M-1 to M-7)

Additional mixing materials for process enhancement:

| Field         | Type   | Description                                 | Example                    |
| ------------- | ------ | ------------------------------------------- | -------------------------- |
| **System**    | String | Chemistry system used                       | `Epoxy`                    |
| **# Orden**   | String | Order number for tracking                   | `108119`                   |
| **Type MZ**   | Select | MZ type (MZ BONDEADA ,MZ MANUAL, MZ MOLIDA) | `MZ-1`                     |
| **Base**      | Number | Grs of base material used in the mix        | `1000`                     |
| **Materials** | Array  | List of materials used in the mix           | `["materia1", "materia2"]` |

### Each Mix Material Slot Contains

Individual material specifications within the mix components section:

| Field           | Type    | Description       | Example               |
| --------------- | ------- | ----------------- | --------------------- |
| **No**          | String  | Material position | `M-1, M-2, M-3...M-7` |
| **FORMULA QTY** | Decimal | Quantity in grams | `106.0`               |

## Process Parameters

Manufacturing and process control settings:

| Field                                | Type      | Description                 | Example                     |
| ------------------------------------ | --------- | --------------------------- | --------------------------- |
| **EXTRUDER**                         | 2 Strings | Extruder configuration      | `Twin Screw`                |
| **RPMH**                             | Integer   | RPM settings                | `300`                       |
| **EQUIP**                            | String    | Equipment specification     | `Line 2`                    |
| **Number of millings/Sieve in mesh** | Integer   | Mesh size                   | `325`                       |
| **∑ WEIGHT (gr)**                    | Decimal   | Total weight calculation    | `637.089`                   |
| **% PIGMENT**                        | Decimal   | Pigment percentage          | `25.5`                      |
| **% ∑ FILLER**                       | Decimal   | Total filler percentage     | `45.2`                      |
| **% S.G.**                           | Decimal   | Specific gravity percentage | `1.55`                      |
| **% ZINC**                           | Decimal   | Zinc content percentage     | `0.0`                       |
| **∑ price**                          | Decimal   | Total cost calculation      | `125.50`                    |
| **REMARKS**                          | Text      | Additional notes            | `Special handling required` |

## Status Types and Workflow

Formulations can have the following statuses:

| Status                | Description                           | Next Actions                |
| --------------------- | ------------------------------------- | --------------------------- |
| **Working**           | Initial state, materials being filled | Save, Continue editing      |
| **Ready for Testing** | Materials filled, awaiting TLWR       | Create TLWR                 |
| **Testing**           | TLWR in progress                      | View TLWR status            |
| **Tested**            | TLWR completed, properties filled     | Create F-2, Approve Formula |
| **Approved**          | Ready for production use              | Scale for Production        |
| **Production**        | Currently in production               | View only                   |

## TLWR Integration

### TLWR Creation

- Available when formulation status is "Ready for Testing"
- TLWR automatically links to the formulation
- TLWR inherits basic formulation information
- One TLWR required per formulation for approval

### TLWR Results to Quality Properties

- TLWR completion auto-populates Quality Properties data
- Quality Properties are **NOT** part of the formulation form
- Quality Properties are **read-only** and populated externally
- Results create audit trail for testing validation

### Quality Properties (Populated by TLWR Results)

Testing and quality specifications populated automatically from TLWR:

| Property               | Type    | Unit    | Description                     | Source       |
| ---------------------- | ------- | ------- | ------------------------------- | ------------ |
| **Film Thickness**     | Decimal | mils    | Coating thickness measurement   | TLWR results |
| **Specific Gravity**   | Decimal | g/cm³   | Material density                | TLWR results |
| **Gloss**              | Integer | %       | Surface gloss measurement (60°) | TLWR results |
| **Hardness**           | String  | -       | Material hardness rating        | TLWR results |
| **Indirect Impact**    | Integer | in-lbs  | Impact resistance test          | TLWR results |
| **Direct Impact**      | Integer | in-lbs  | Direct impact test              | TLWR results |
| **Flexibility**        | String  | -       | Flexibility rating              | TLWR results |
| **Salt Spray**         | Integer | hours   | Corrosion resistance            | TLWR results |
| **QUV**                | Integer | hours   | UV resistance testing           | TLWR results |
| **CR Technology**      | String  | -       | Color retention technology      | TLWR results |
| **Particle Size**      | Decimal | microns | Particle size distribution      | TLWR results |
| **Solvent Resistance** | String  | -       | Chemical resistance rating      | TLWR results |

## Form Actions

Available actions in the formulation interface based on status:

```
🎯 Status-Based Actions
├── Working Status:
│   ├── SAVE - Save material changes
│   ├── CALCULATE - Update totals and percentages
│   └── READY FOR TESTING - Mark as complete for testing
├── Ready for Testing Status:
│   └── CREATE TLWR - Generate linked test request
├── Tested Status:
│   ├── CREATE F-2 - Create next version iteration
│   ├── APPROVE FORMULA - Mark as production-ready
│   └── VIEW TLWR RESULTS - Review test results
└── Approved Status:
    ├── EXCEL - Export to Excel format
    ├── TICKET - Generate production ticket
    └── SCALE FOR PRODUCTION - Calculate production quantities
```

## View Formulation Logic

When clicking a formulation from the table:

### Dialog Display

- Opens read-only modal showing complete formulation details
- Displays all sections: Header, Raw Materials, Mix Components, Process Parameters
- Shows calculated totals and percentages
- Includes approval status and history
- **Quality Properties section only appears after TLWR completion**

### Dialog Information

- **Header**: Complete identification and tracking information
- **Materials**: Full material breakdown with quantities and percentages
- **Process**: Manufacturing settings and equipment specifications
- **Quality Properties**: Test results from TLWR (if completed, otherwise shows "Pending TLWR Results")
- **Actions**: Available based on user permissions and formulation status

### Quality Properties Display Logic

- **Before TLWR**: Shows "Quality Properties - Pending TLWR Results" message
- **During TLWR**: Shows "Quality Properties - TLWR in Progress" with test status
- **After TLWR**: Shows complete test results populated from TLWR

## Validation Rules

Critical validation requirements for formulation data integrity:

| Rule Category | Validation Rule | Details | Error Message |
|---------------|----------------|---------|---------------|
| **Raw Materials Percentage** | Total percentages must equal 100% | Sum of all M1-M20 material percentages | "Raw materials percentages must total exactly 100%" |
| **Material Requirements** | At least one raw material (M1) required | M1 slot must have material and quantity > 0 | "Primary raw material (M1) is required" |
| **Process Temperature** | Temperature range validation | Must be between 160-200°C (320-392°F) | "Process temperature must be between 160-200°C" |
| **Cure Time** | Time range validation | Must be between 10-30 minutes | "Cure time must be between 10-30 minutes" |

### Validation Trigger Points

- **Real-time**: Percentage calculations update as materials are entered
- **On Save**: All validation rules checked before saving formulation
- **Before Testing**: Complete validation required before "Ready for Testing" status
- **Before Approval**: Full validation pass required before formulation approval

### Temperature Conversion Logic

| Celsius Range | Fahrenheit Range | Validation |
|---------------|------------------|------------|
| 160-200°C | 320-392°F | Both ranges accepted |
| < 160°C | < 320°F | Below minimum threshold |
| > 200°C | > 392°F | Above maximum threshold |

## Business Logic

- **Auto-creation from LWR**: Formulations automatically created with descriptive fields populated
- **Chemistry Filtering**: Raw materials are filtered based on selected chemistry system
- **Automatic Calculations**: Percentages and totals calculated in real-time
- **Multi-Base Support**: Support for different formula bases (F-1 through F-7)
- **Version Control**: Each LWR can have multiple formula versions
- **TLWR Integration**: Quality Properties populated externally via TLWR completion
- **Approval Workflow**: Formulations require completed TLWR before approval
- **Technical Name Requirement**: Required before formulation approval
- **Cost Tracking**: Automatic cost calculation based on material prices
- **Production Scaling**: Approved formulations can be scaled for production quantities
- **Quality Gate**: No approval possible without TLWR completion and quality properties
- **Data Validation**: All validation rules enforced before status progression

## Form Structure Summary

**Main Formulation Form Sections:**

1. Header Information (descriptive + editable + to be filled)
2. Raw Materials (M1-M20)
3. Mix Components (M-1 to M-7)
4. Process Parameters

**External Data (Not in Form):**

- Quality Properties (populated by TLWR)
- TLWR Status and Results
- Approval History

**Integration Points:**

- LWR System (parent data inheritance)
- TLWR System (testing workflow and quality properties population)
- Raw Materials Database (material selection and filtering)
- Production System (scaling and batch creation)

