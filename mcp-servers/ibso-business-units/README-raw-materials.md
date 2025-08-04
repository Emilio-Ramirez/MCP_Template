# Raw Materials Management System

## Overview

The Raw Materials Management system controls the inventory, classification, and usage tracking of chemical raw materials used in powder coating formulations. It integrates with SAP for real-time inventory data and enforces material compatibility rules.

**⚡ Hot reload test - this change should trigger automatic server restart!**

## Material Structure

Each raw material contains the following information:

| Field                  | Type    | Description                         | Example                     |
| ---------------------- | ------- | ----------------------------------- | --------------------------- |
| **Material Code**      | String  | Unique SAP material identifier      | `RM-100234`                 |
| **Material Name**      | String  | Technical material name             | `Epoxy Resin EP-1000`       |
| **Material Type**      | Enum    | Chemical classification             | `RESIN`, `HARDENER`, `PIGMENT` |
| **Chemistry System**   | Array   | Compatible chemistry systems        | `["Epoxy", "Hybrid"]`       |
| **Supplier**           | String  | Primary supplier name               | `Chemical Corp USA`         |
| **Unit of Measure**    | String  | Storage unit                        | `kg` or `lbs`               |
| **Stock Level**        | Decimal | Current inventory quantity          | `1250.50`                   |
| **Minimum Stock**      | Decimal | Reorder point                       | `500.00`                    |
| **Maximum Stock**      | Decimal | Maximum storage capacity            | `5000.00`                   |
| **Price**              | Decimal | Unit price                          | `12.50`                     |
| **Currency**           | String  | Price currency                      | `USD` or `MXN`              |
| **Status**             | Enum    | Material availability status        | `ACTIVE`, `DISCONTINUED`     |

## Material Classification

### Material Types

| Type          | Description                      | Usage                          |
| ------------- | -------------------------------- | ------------------------------ |
| **RESIN**     | Base polymer resins              | Primary binder component       |
| **HARDENER**  | Curing agents                    | Cross-linking component        |
| **PIGMENT**   | Color pigments                   | Color and opacity              |
| **FILLER**    | Extender materials               | Cost reduction and properties  |
| **ADDITIVE**  | Functional additives             | Flow, leveling, degassing      |
| **METALLIC**  | Metallic effect pigments         | Special visual effects         |
| **MATTING**   | Gloss reduction agents           | Surface finish control         |

### Chemistry System Compatibility

| Chemistry System | Compatible Material Types                                    | Typical Applications         |
| ---------------- | ------------------------------------------------------------ | ---------------------------- |
| **Epoxy**        | Epoxy resins, phenolic hardeners, amine hardeners           | Industrial, marine coatings  |
| **Polyester**    | Polyester resins, TGIC/HAA hardeners                        | Architectural, outdoor use   |
| **Hybrid**       | Epoxy-polyester blends, mixed hardeners                     | General purpose coatings     |
| **Polyurethane** | Polyurethane resins, blocked isocyanates                    | High-performance coatings    |
| **Acrylic**      | Acrylic resins, GMA systems                                 | Clear coats, automotive      |

## Inventory Integration

### SAP Integration

The system maintains read-only integration with SAP for real-time inventory data:

| Integration Point      | Description                       | Update Frequency   |
| ---------------------- | --------------------------------- | ------------------ |
| **Stock Levels**       | Current inventory quantities      | Every 15 minutes   |
| **Material Master**    | Material properties and details   | Daily sync         |
| **Price Updates**      | Current material pricing          | Hourly             |
| **Location Stock**     | Stock by warehouse location       | Every 15 minutes   |

### Stock Status Indicators

Visual indicators show material availability:

- 🟢 **Green**: Stock > 50% of maximum (Adequate stock)
- 🟡 **Yellow**: Stock between minimum and 50% (Monitor stock)
- 🔴 **Red**: Stock < minimum level (Critical - reorder needed)
- ⚫ **Black**: Out of stock

## Material Approval Matrix

### Product Type Compatibility

The approval matrix defines which materials can be used for specific product types:

| Product Type         | Allowed Material Types                           | Restrictions                   |
| -------------------- | ------------------------------------------------ | ------------------------------ |
| **Standard Powder**  | All material types                               | None                           |
| **FDA Approved**     | FDA-compliant materials only                     | Requires FDA certification     |
| **Anti-Microbial**   | Standard materials + anti-microbial additives    | Special additive requirements  |
| **High Temperature** | Heat-resistant resins and pigments               | Temperature rating > 200°C     |
| **Chemical Resistant** | Epoxy systems, special hardeners               | Acid/base resistance required  |

### Matrix Configuration Interface

The material approval matrix uses a grid interface:

```
                Material →
Product Type ↓   MAT001  MAT002  MAT003  MAT004  MAT005
Standard         ✓       ✓       ✓       ✓       ✓
FDA Approved     ✓       ✗       ✓       ✗       ✓
Anti-Microbial   ✓       ✓       ✗       ✓       ✓
High Temp        ✗       ✓       ✓       ✓       ✗
Chemical Resist  ✓       ✓       ✓       ✗       ✓
```

## Material Usage Tracking

### Consumption Records

| Field               | Type     | Description                    | Example       |
| ------------------- | -------- | ------------------------------ | ------------- |
| **Transaction ID**  | String   | Unique usage identifier        | `TRX-2024001` |
| **Material Code**   | String   | Material consumed              | `RM-100234`   |
| **Quantity Used**   | Decimal  | Amount consumed                | `25.50`       |
| **Unit**            | String   | Unit of measure                | `kg`          |
| **Request Type**    | Enum     | Usage context                  | `LWR`, `MICRO` |
| **Request ID**      | String   | Associated request             | `LWR-41131`   |
| **Date**            | DateTime | Transaction timestamp          | `2024-08-15`  |
| **User**            | String   | Person recording usage         | `J.Olivares`  |
| **Cost**            | Decimal  | Material cost at time of use   | `318.75`      |

### Batch Tracking

For traceability, materials are tracked by batch:

| Field            | Type    | Description              | Example            |
| ---------------- | ------- | ------------------------ | ------------------ |
| **Batch Number** | String  | Supplier batch ID        | `BATCH-2024-0815`  |
| **Receipt Date** | Date    | When received            | `2024-08-01`       |
| **Expiry Date**  | Date    | Material expiration      | `2025-08-01`       |
| **Quantity**     | Decimal | Batch quantity           | `1000.00`          |
| **QC Status**    | Enum    | Quality check status     | `APPROVED`, `HOLD` |

## Material Search and Filtering

### Search Capabilities

| Search Type         | Description                         | Example                   |
| ------------------- | ----------------------------------- | ------------------------- |
| **Code Search**     | Search by material code             | `RM-100*`                 |
| **Name Search**     | Search by material name             | `Epoxy*`                  |
| **Type Filter**     | Filter by material type             | `Type = RESIN`            |
| **Chemistry Filter** | Filter by chemistry system         | `Chemistry = Epoxy`       |
| **Supplier Filter** | Filter by supplier                  | `Supplier = Chemical Corp` |
| **Stock Filter**    | Filter by stock status              | `Stock < Minimum`         |

### Advanced Filters

Combination filters for specific needs:

```sql
-- Materials low on stock for specific chemistry
WHERE Chemistry = 'Epoxy' 
  AND StockLevel < MinimumStock
  AND Status = 'ACTIVE'

-- FDA approved materials from specific supplier  
WHERE FDAApproved = TRUE
  AND Supplier = 'Certified Chemicals Inc'
  AND MaterialType IN ('RESIN', 'HARDENER')
```

## Material Master Data Management

### Required Fields for New Materials

| Field                | Validation Rules                    | Example Input         |
| -------------------- | ----------------------------------- | --------------------- |
| **Material Code**    | Unique, format: `RM-XXXXXX`        | `RM-100235`           |
| **Technical Name**   | Min 3 characters, no special chars  | `Epoxy Resin EP-2000` |
| **Chemistry System** | At least one selection required     | `["Epoxy"]`           |
| **Unit Price**       | Positive decimal, 2 decimal places  | `15.75`               |
| **Minimum Stock**    | Positive number, > 0                | `100`                 |

### Material Status Workflow

```
NEW → PENDING_APPROVAL → ACTIVE → DISCONTINUED → ARCHIVED
         ↓                  ↓
      REJECTED           ON_HOLD
```

## Reports and Analytics

### Standard Reports

| Report Name                 | Description                          | Frequency   |
| --------------------------- | ------------------------------------ | ----------- |
| **Stock Status Report**     | Current inventory levels             | Daily       |
| **Reorder Report**          | Materials below minimum              | Real-time   |
| **Usage Analysis**          | Consumption patterns by period       | Weekly      |
| **Cost Analysis**           | Material cost trends                 | Monthly     |
| **Expiry Report**           | Materials approaching expiration     | Weekly      |

### Key Metrics

| Metric                    | Formula                                      | Target    |
| ------------------------- | -------------------------------------------- | --------- |
| **Stock Turn Ratio**      | Annual Usage / Average Stock                 | > 4       |
| **Stock Out Incidents**   | Count of zero stock events                   | < 5/month |
| **Inventory Accuracy**    | (Actual Stock / System Stock) × 100          | > 98%     |
| **Material Utilization**  | (Used Quantity / Available Quantity) × 100   | > 85%     |

## Business Rules

### Material Allocation Rules

1. **FIFO Policy**: First-In-First-Out for batch consumption
2. **Expiry Priority**: Materials near expiry used first
3. **Reserved Stock**: Micro production can reserve materials
4. **Minimum Order**: Some materials have minimum order quantities

### Price Management

- **Currency Conversion**: Automatic USD/MXN conversion at daily rates
- **Price History**: Complete price change history maintained
- **Volume Discounts**: Bulk purchase discounts tracked
- **Price Alerts**: Notifications for significant price changes

### Quality Requirements

- **Certificate of Analysis**: Required for all new batches
- **Incoming Inspection**: Random sampling per AQL standards
- **Quarantine Process**: Non-conforming materials isolated
- **Supplier Rating**: Performance metrics affect approval status

## System Integration Points

| System         | Integration Type | Data Flow         | Frequency        |
| -------------- | ---------------- | ----------------- | ---------------- |
| **SAP**        | REST API         | Read-only         | Real-time        |
| **Formulation** | Direct DB        | Bidirectional     | Real-time        |
| **Quality**    | Event-based      | Status updates    | On change        |
| **Purchasing** | API              | Order creation    | On demand        |

## User Roles and Permissions

| Role                | View | Create | Edit | Delete | Approve |
| ------------------- | ---- | ------ | ---- | ------ | ------- |
| **Warehouse**       | ✓    | ✓      | ✓    | ✗      | ✗       |
| **Laboratory**      | ✓    | ✗      | ✗    | ✗      | ✗       |
| **Quality**         | ✓    | ✗      | ✓    | ✗      | ✓       |
| **Purchasing**      | ✓    | ✓      | ✓    | ✗      | ✓       |
| **Management**      | ✓    | ✓      | ✓    | ✓      | ✓       |