# Formulation Management System

## Overview

The system manages chemical powder coating formulations with multiple bases, raw material combinations, and complete process tracking. Each formulation includes material composition, process parameters, and quality testing specifications.

## List of Components

- **Formulation Table** - Main data grid with search, filter, and CRUD operations
- **Formulation Form** - Multi-section form with Header, Raw Materials, Mix Components, Process Parameters, Quality Properties
- **View Formulation Dialog** - Read-only modal showing complete formulation details
- **Approval Dialog** - Formulation approval workflow interface
- **Export Actions** - Excel export and ticket generation

## Formulation Table Definition

The main formulation list displays:

| Column             | Type    | Description             | Example           |
|--------------------|---------|-------------------------|-------------------|
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
| **VER**            | Action  | View/Edit action        | `Button`          |

## Formulation Structure

Each formulation contains the following main sections:

| Section                         | Description                 | Purpose                     |
| ------------------------------- | --------------------------- | --------------------------- |
| **Header Information**          | Basic formulation data      | Identification and tracking |
| **Raw Materials (M1-M20)**      | Material composition        | Formula definition          |
| **Mix Components (M-1 to M-7)** | Additional mixing materials | Process enhancement         |
| **Process Parameters**          | Manufacturing settings      | Production control          |
| **Quality Properties**          | Testing specifications      | Quality assurance           |

## Header Information

Basic formulation identification and tracking data:

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

## Raw Materials Section (M1-M20)

Material composition and formula definition:

| Field            | Type     | Description                                | Example            |
| ---------------- | -------- | ------------------------------------------ | ------------------ |
| **Base color**    | String   | Base color identifier                      | `F-1`              |
| **Quantity**       | Decimal  | Total weight of materials in grams         | `637.089`          |
| **Materials**       | Array    | List of materials used in the formulation  | `["materia1", "materia2"]` |
| **Results**         | Object   | Calculated results for the formulation     | `{ "quantity": 637.089, "porcentage": 100 }` |

### Each Material Slot Contains

Individual material specifications within the raw materials section:

| Field            | Type     | Description                                | Example            |
| ---------------- | -------- | ------------------------------------------ | ------------------ |
| **No**           | String   | Material position                          | `M1, M2, M3...M20` |
| **RAW MATERIAL** | Dropdown | Material selection (filtered by chemistry) | `materia1`         |
| **FORMULA QTY**  | Decimal  | Quantity in grams                          | `106.0`            |
| **%**            | Decimal  | Calculated percentage of total             | `16.6`             |
| **PROD**         | Decimal  | Production quantity (quantity * formula QTY)                       | `600`              |

## Mix Components (M-1 to M-7)

Additional mixing materials for process enhancement:

| Field            | Type     | Description                                | Example            |
| ---------------- | -------- | ------------------------------------------ | ------------------ |
| **System**         | String   | Chemistry system used                     | `Epoxy`            |
| **# Orden**      | String   | Order number for tracking                 | `108119`           |
| **Type MZ**         | Select   | MZ type (MZ BONDEADA ,MZ MANUAL, MZ MOLIDA)            | `MZ-1`             |
| **Base**          | Number| Grs of base material used in the mix | `1000`             |
| **Materials**       | Array    | List of materials used in the mix         | `["materia1", "materia2"]` |

### Each Mix Material Slot Contains

Individual material specifications within the mix components section:

| Field            | Type     | Description                                | Example            |
| ---------------- | -------- | ------------------------------------------ | ------------------ |
| **No**           | String   | Material position                          | `M-1, M-2, M-3...M-7` |
| **FORMULA QTY**  | Decimal  | Quantity in grams                          | `106.0`            |

## Process Parameters

Manufacturing and process control settings:

| Field                                | Type    | Description                 | Example                     |
| ------------------------------------ | ------- | --------------------------- | --------------------------- |
| **EXTRUDER**                         | 2 Strings  | Extruder configuration      | `Twin Screw`                |
| **RPMH**                             | Integer | RPM settings                | `300`                       |
| **EQUIP**                            | String  | Equipment specification     | `Line 2`                    |
| **Number of millings/Sieve in mesh** | Integer | Mesh size                   | `325`                       |
| **∑ WEIGHT (gr)**                    | Decimal | Total weight calculation    | `637.089`                   |
| **% PIGMENT**                        | Decimal | Pigment percentage          | `25.5`                      |
| **% ∑ FILLER**                       | Decimal | Total filler percentage     | `45.2`                      |
| **% S.G.**                           | Decimal | Specific gravity percentage | `1.55`                      |
| **% ZINC**                           | Decimal | Zinc content percentage     | `0.0`                       |
| **∑ price**                          | Decimal | Total cost calculation      | `125.50`                    |
| **REMARKS**                          | Text    | Additional notes            | `Special handling required` |

## Quality Properties

Testing and quality specifications for quality assurance:

| Property               | Type    | Unit    | Description                     |
| ---------------------- | ------- | ------- | ------------------------------- |
| **Film Thickness**     | Decimal | mils    | Coating thickness measurement   |
| **Specific Gravity**   | Decimal | g/cm³   | Material density                |
| **Gloss**              | Integer | %       | Surface gloss measurement (60°) |
| **Hardness**           | String  | -       | Material hardness rating        |
| **Indirect Impact**    | Integer | in-lbs  | Impact resistance test          |
| **Direct Impact**      | Integer | in-lbs  | Direct impact test              |
| **Flexibility**        | String  | -       | Flexibility rating              |
| **Salt Spray**         | Integer | hours   | Corrosion resistance            |
| **QUV**                | Integer | hours   | UV resistance testing           |
| **CR Technology**      | String  | -       | Color retention technology      |
| **Particle Size**      | Decimal | microns | Particle size distribution      |
| **Solvent Resistance** | String  | -       | Chemical resistance rating      |

## Form Actions

Available actions in the formulation interface:

```
🎯 Formulation Actions
├── APPROVE FORMULA - Approve formulation for production
├── USE RESULTS - Apply calculated results
├── EXCEL - Export to Excel format
├── TICKET - Generate production ticket
├── ELIMINAR - Delete formulation
├── Cambiar de sistema - Change chemistry system
└── CADO - Add/Calculate (green button)
```

## View Formulation Logic

When clicking a formulation from the table:

### Dialog Display
- Opens read-only modal showing complete formulation details
- Displays all sections: Header, Raw Materials, Mix Components, Process Parameters, Quality Properties
- Shows calculated totals and percentages
- Includes approval status and history

### Dialog Information
- **Header**: Complete identification and tracking information
- **Materials**: Full material breakdown with quantities and percentages
- **Process**: Manufacturing settings and equipment specifications
- **Quality**: All testing requirements and specifications
- **Actions**: Available based on user permissions and formulation status

## Status Types

Formulations can have the following statuses:

- **Trabajando** - In development/working
- **Finished** - Completed formulation

## Business Logic

- **Chemistry Filtering**: Raw materials are filtered based on selected chemistry system
- **Automatic Calculations**: Percentages and totals calculated in real-time
- **Multi-Base Support**: Support for different formula bases (F-1 through F-7)
- **Version Control**: Each LWR can have multiple formula versions
- **Approval Workflow**: Formulations must be approved before production use
- **Cost Tracking**: Automatic cost calculation based on material prices