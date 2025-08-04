# Formulation Management System

## Overview

The Formulation Management System handles the creation, testing, and validation of chemical powder coating formulations. Each formulation contains multiple bases with raw material combinations, process parameters, and quality specifications. The system supports version control and maintains complete formula history.

## Formulation Structure

Each formulation contains the following main sections:

| Section                         | Description                          | Purpose                             |
| ------------------------------- | ------------------------------------ | ----------------------------------- |
| **Header Information**          | Basic formulation identification     | Tracking and organization           |
| **Base Formulas (F-1 to F-7)** | Individual base compositions         | Core formula components             |
| **Raw Materials (M1-M20)**      | Material composition per base        | Detailed formula definition         |
| **Mix Components (M-1 to M-7)** | Additional mixing materials          | Process enhancement materials       |
| **Process Parameters**          | Manufacturing specifications         | Production control settings         |
| **Quality Properties**          | Testing and validation specs         | Quality assurance requirements      |

## Header Information

| Field               | Type     | Description                         | Example                            |
| ------------------- | -------- | ----------------------------------- | ---------------------------------- |
| **Formula Base**    | Select   | Base formula identifier             | `F-1`, `F-2`, `F-3`, `F-4`, `F-5`  |
| **ID**              | String   | Unique formulation identifier       | `F-1-41131`                        |
| **LWR**             | String   | Laboratory Work Request number      | `41131`                            |
| **Version**         | Integer  | Formula version number              | `1`, `2`, `3`                      |
| **Formulator**      | String   | Assigned laboratory technician      | `Julio Olivares`                   |
| **Product Name**    | String   | Technical product designation       | `ANODIZED CLEAR`                   |
| **Customer Name**   | String   | Client company name                 | `AVALON ALUMINUM`                  |
| **Tiempo(min)**     | Integer  | Curing time in minutes              | `10`                               |
| **@Temp °F**        | Integer  | Curing temperature                  | `400`                              |
| **Type**            | Select   | Formulation category                | `DB1`, `DB2`, `CLEAR`              |
| **Chemistry**       | Select   | Chemical system                     | `Epoxy`, `Polyester`, `Hybrid`     |
| **Status**          | Enum     | Current formula status              | `DRAFT`, `TESTING`, `APPROVED`     |

## Base Formulas Section

### Base Formula Types

| Base ID  | Description                    | Typical Use                        |
| -------- | ------------------------------ | ---------------------------------- |
| **F-1**  | Standard base formula          | General purpose coatings           |
| **F-2**  | High-performance base          | Industrial applications            |
| **F-3**  | Specialty effects base         | Metallic and special finishes      |
| **F-4**  | Clear coat base                | Transparent topcoats               |
| **F-5**  | Primer base                    | Adhesion and corrosion protection  |
| **F-6**  | Production base                | Scaled production formulas         |
| **F-7**  | Custom base                    | Client-specific requirements       |

### Base Formula Structure

| Field            | Type     | Description                                | Example            |
| ---------------- | -------- | ------------------------------------------ | ------------------ |
| **Base Color**   | String   | Base color/type identifier                 | `F-1`              |
| **Quantity**     | Decimal  | Total weight in grams                      | `637.089`          |
| **Materials**    | Array    | List of materials in this base             | `[M1, M2, M3...]`  |
| **Results**      | Object   | Calculated totals and percentages          | See Results Table  |

## Raw Materials Section (M1-M20)

Each base formula can contain up to 20 raw materials:

| Field              | Type     | Description                              | Example                |
| ------------------ | -------- | ---------------------------------------- | ---------------------- |
| **Position**       | String   | Material slot identifier                 | `M1`, `M2`...`M20`     |
| **RAW MATERIAL**   | Dropdown | Material selection (filtered by chemistry) | `Epoxy Resin EP-1000` |
| **FORMULA QTY**    | Decimal  | Quantity in grams                        | `106.0`                |
| **%**              | Decimal  | Auto-calculated percentage of total      | `16.6`                 |
| **PROD**           | Decimal  | Production quantity (scaled)             | `600.0`                |
| **Unit Price**     | Decimal  | Material cost per unit                   | `12.50`                |
| **Total Cost**     | Decimal  | Calculated line cost                     | `75.00`                |

### Material Selection Rules

- Materials filtered by selected chemistry system
- Only approved materials for product type shown
- Automatic compatibility checking
- Real-time inventory availability display

## Mix Components Section (M-1 to M-7)

Additional materials mixed after base preparation:

| Field            | Type     | Description                              | Example            |
| ---------------- | -------- | ---------------------------------------- | ------------------ |
| **System**       | String   | Chemistry system for mix                 | `Epoxy`            |
| **# Orden**      | String   | Production order number                  | `108119`           |
| **Type MZ**      | Select   | Mix type classification                  | `MZ BONDEADA`      |
| **Base**         | Decimal  | Base material quantity (grams)           | `1000`             |
| **Mix Position** | String   | Mix component identifier                 | `M-1`, `M-2`...    |
| **Material**     | Dropdown | Additional material selection            | `Flow Agent FA-1`  |
| **Quantity**     | Decimal  | Component quantity in grams              | `10.5`             |

### Mix Type Classifications

| Type           | Description                      | Application                |
| -------------- | -------------------------------- | -------------------------- |
| **MZ BONDEADA** | Bonded mix                      | Pre-bonded additives       |
| **MZ MANUAL**   | Manual mix                      | Hand-mixed components      |
| **MZ MOLIDA**   | Milled mix                      | Post-extrusion additions   |

## Process Parameters

Manufacturing and processing specifications:

| Parameter                           | Type     | Description                    | Example                  |
| ----------------------------------- | -------- | ------------------------------ | ------------------------ |
| **EXTRUDER**                        | Select   | Extruder type and settings     | `Twin Screw - 30mm`      |
| **RPMH**                            | Integer  | Extruder RPM high              | `300`                    |
| **RPML**                            | Integer  | Extruder RPM low               | `150`                    |
| **EQUIP**                           | Select   | Production line                | `Line 2`                 |
| **Number of millings**              | Integer  | Milling passes                 | `2`                      |
| **Sieve in mesh**                   | Select   | Particle size control          | `325 mesh`               |
| **∑ WEIGHT (gr)**                   | Decimal  | Total formula weight           | `637.089`                |
| **% PIGMENT**                       | Decimal  | Total pigment percentage       | `25.5`                   |
| **% ∑ FILLER**                      | Decimal  | Total filler percentage        | `45.2`                   |
| **S.G.**                            | Decimal  | Specific gravity               | `1.55`                   |
| **% ZINC**                          | Decimal  | Zinc content percentage        | `0.0`                    |
| **∑ price**                         | Decimal  | Total formula cost             | `125.50`                 |
| **REMARKS**                         | Text     | Production notes               | `Special handling req.`  |

## Quality Properties

Required testing and specifications:

| Property                 | Type     | Unit     | Description                      | Test Method      |
| ------------------------ | -------- | -------- | -------------------------------- | ---------------- |
| **Film Thickness**       | Range    | mils     | Coating thickness range          | `ASTM D1005`     |
| **Specific Gravity**     | Decimal  | g/cm³    | Material density                 | `ASTM D792`      |
| **Gloss @ 60°**          | Integer  | %        | Surface gloss measurement        | `ASTM D523`      |
| **Hardness**             | String   | Pencil   | Pencil hardness rating           | `ASTM D3363`     |
| **Indirect Impact**      | Integer  | in-lbs   | Reverse impact resistance        | `ASTM D2794`     |
| **Direct Impact**        | Integer  | in-lbs   | Direct impact resistance         | `ASTM D2794`     |
| **Flexibility**          | String   | Mandrel  | Bend test rating                 | `ASTM D522`      |
| **Salt Spray**           | Integer  | hours    | Corrosion resistance duration    | `ASTM B117`      |
| **QUV**                  | Integer  | hours    | UV resistance testing            | `ASTM G154`      |
| **Chemical Resistance**  | String   | Rating   | Chemical exposure rating         | `ASTM D1308`     |
| **Particle Size d50**    | Decimal  | microns  | Average particle size            | `ASTM D5382`     |
| **Gel Time**             | Range    | seconds  | Thermal reactivity               | `ASTM D4217`     |

## Formulation Workflow

### Status Progression

```
DRAFT → SUBMITTED → LAB_REVIEW → TESTING → QUALITY_REVIEW → APPROVED → PRODUCTION_READY
   ↓         ↓           ↓          ↓            ↓              ↓
CANCELLED  REJECTED   REFORMULATE  FAILED    CONDITIONAL    ARCHIVED
```

### Version Control

| Action               | Description                           | Preserved Data           |
| -------------------- | ------------------------------------- | ------------------------ |
| **Create Version**   | New version from existing formula     | Complete formula copy    |
| **Edit Draft**       | Modify non-approved version           | Previous versions intact |
| **Archive Version**  | Move old version to history           | Full historical record   |
| **Compare Versions** | Side-by-side version comparison       | All version data         |
| **Restore Version**  | Bring back archived version           | Complete restoration     |

## Calculations and Formulas

### Automatic Calculations

| Calculation          | Formula                                      | Update Trigger      |
| -------------------- | -------------------------------------------- | ------------------- |
| **Material %**       | `(Material Qty / Total Qty) × 100`          | Quantity change     |
| **Total Weight**     | `∑(All Material Quantities)`                 | Any qty change      |
| **Formula Cost**     | `∑(Material Qty × Unit Price)`              | Qty or price change |
| **Pigment %**        | `∑(Pigment Materials) / Total × 100`        | Material change     |
| **Filler %**         | `∑(Filler Materials) / Total × 100`         | Material change     |
| **Production Scale** | `Material Qty × Production Factor`          | Factor change       |

### Cost Analysis

| Cost Component      | Calculation Method                    | Includes                |
| ------------------- | ------------------------------------- | ----------------------- |
| **Raw Material**    | Direct material costs                 | All formula materials   |
| **Processing**      | Time × equipment rate                 | Extrusion, milling      |
| **Testing**         | Standard test battery costs           | Required QC tests       |
| **Packaging**       | Container + labeling costs            | Sample packaging        |
| **Total Cost**      | Sum of all components                 | Complete formula cost   |

## Formulation List Interface

Main formulation list displays:

| Column              | Description                  | Format            |
| ------------------- | ---------------------------- | ----------------- |
| **LWR**             | Request number               | `41131`           |
| **VERSION**         | Formula version              | `v1`, `v2`        |
| **PRODUCT NAME**    | Technical name               | `ANODIZED CLEAR`  |
| **CUSTOMER**        | Client name                  | `AVALON ALUMINUM` |
| **DATE**            | Creation date                | `01/Aug/2024`     |
| **FORMULATOR**      | Technician name              | `Julio Olivares`  |
| **CHEMISTRY**       | Chemical system              | `Epoxy`           |
| **TOTAL QTY**       | Formula weight               | `637.089 g`       |
| **STATUS**          | Current status               | `Testing`         |
| **APPROVED**        | Approval status              | `Yes/No`          |
| **ACTIONS**         | Available actions            | Icons/Buttons     |

## Form Actions

Available actions in formulation interface:

```
🎯 Formulation Actions
├── APPROVE FORMULA - Submit for approval workflow
├── USE RESULTS - Apply test results to formula
├── EXCEL EXPORT - Export to Excel format
├── PDF REPORT - Generate PDF documentation
├── PRODUCTION TICKET - Create production order
├── COPY FORMULA - Create new version
├── PRINT LABEL - Generate sample labels
├── HISTORY - View version history
└── DELETE - Remove draft versions only
```

## Business Logic

### Formula Validation Rules

1. **Material Sum**: Total must equal 100% (±0.1% tolerance)
2. **Chemistry Match**: All materials must be compatible with selected chemistry
3. **Minimum Quantity**: Each material ≥ 0.1% of total
4. **Cost Validation**: Price must be current from SAP
5. **Inventory Check**: Materials must be available

### Approval Requirements

| Approval Level      | Required For                         | Approver Role        |
| ------------------- | ------------------------------------ | -------------------- |
| **Technical**       | Formula technical validity           | Senior Formulator    |
| **Quality**         | Test results meet specifications     | Quality Manager      |
| **Commercial**      | Cost and pricing approval            | Sales Manager        |
| **Production**      | Manufacturing feasibility            | Production Manager   |
| **Final**           | Ready for production release         | Technical Director   |

### Special Handling

- **Metallic Formulas**: Require special mixing instructions
- **Clear Coats**: Additional transparency testing required
- **FDA Formulas**: Extra documentation and material verification
- **High-Temperature**: Thermal stability testing mandatory

## Integration Points

| System              | Integration Type   | Purpose                      |
| ------------------- | ------------------ | ---------------------------- |
| **Raw Materials**   | Real-time lookup   | Material selection & pricing |
| **Testing Module**  | Bidirectional      | Test results integration     |
| **Production**      | One-way push       | Approved formula transfer    |
| **Quality System**  | Event-driven       | Quality notifications        |
| **Document Mgmt**   | File attachment    | Technical data sheets        |

## Reports and Analytics

### Standard Reports

| Report Name                | Description                        | Frequency    |
| -------------------------- | ---------------------------------- | ------------ |
| **Formula Summary**        | Active formulas by status          | Daily        |
| **Cost Analysis**          | Formula costs by customer          | Weekly       |
| **Material Usage**         | Raw material consumption           | Weekly       |
| **Success Rate**           | Approval vs rejection metrics      | Monthly      |
| **Development Time**       | Average time to approval           | Monthly      |

### Performance Metrics

| Metric                    | Target    | Calculation                          |
| ------------------------- | --------- | ------------------------------------ |
| **First Pass Success**    | > 80%     | Approved / Submitted                 |
| **Development Cycle**     | < 7 days  | Submit date to approval date         |
| **Formula Accuracy**      | > 95%     | Successful production / Approved     |
| **Cost Variance**         | < 5%      | (Actual - Estimated) / Estimated     |

## User Roles and Permissions

| Role              | Create | Edit | Approve | Delete | View All |
| ----------------- | ------ | ---- | ------- | ------ | -------- |
| **Formulator**    | ✓      | ✓    | ✗       | Own    | Own      |
| **Sr Formulator** | ✓      | ✓    | Tech    | Own    | All      |
| **Quality**       | ✗      | ✗    | Quality | ✗      | All      |
| **Production**    | ✗      | ✗    | Prod    | ✗      | Approved |
| **Management**    | ✓      | ✓    | Final   | ✓      | All      |