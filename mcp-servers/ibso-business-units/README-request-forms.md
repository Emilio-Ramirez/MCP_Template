# Request Forms System

## Overview

The Request Forms System manages the creation, processing, and lifecycle of laboratory work requests for chemical coating development. It features dynamic multi-step forms with conditional sections, industry-specific validation, and role-based workflow management.

## Form Architecture

### Multi-Step Structure

| Step                      | Purpose                            | Shared Across Types | Conditional     |
| ------------------------- | ---------------------------------- | ------------------- | --------------- |
| **Basic Information**     | Common request metadata            | ✓                   | ✗               |
| **Request Type Selection** | Determines form flow              | ✓                   | ✗               |
| **Type-Specific Sections** | Specialized requirements          | ✗                   | ✓               |
| **Notes & Files**         | Final documentation               | ✓                   | ✗               |

### Request Type Matrix

| Type                  | Full Name                        | Purpose                  | Complexity | Sections |
| --------------------- | -------------------------------- | ------------------------ | ---------- | -------- |
| **LWR**               | Laboratory Work Request          | Product development      | High       | 8        |
| **TLWR**              | Testing Laboratory Work Request  | Testing services         | Medium     | 6        |
| **VLWR**              | Vitracoat Laboratory Work Request | Internal testing        | High       | 9        |
| **Micro Production**  | Small Batch Production          | Limited production runs  | Low        | 2        |

## Form Sections Detail

### Section 1: Basic Information (Shared)

| Field               | Type        | Auto-Generated | Laboratory Impact      |
| ------------------- | ----------- | -------------- | ---------------------- |
| **Laboratory**      | Selection   | ✗              | Drives business logic  |
| **Customer**        | Selection   | ✗              | Client selection       |
| **Sales Agent**     | Selection   | Role-based     | Auto-assigned by role  |
| **Date Created**    | Date        | ✓              | Auto-generated, hidden |
| **Date Needed**     | Date        | ✗              | Validated by lab rules |

#### Laboratory-Based Date Constraints

| Laboratory      | Minimum Days | Maximum Days | Special Rules       |
| --------------- | ------------ | ------------ | ------------------- |
| **Houston**     | 3            | 15           | Standard processing |
| **Lerma**       | 3            | 15           | Micro production OK |
| **M&M Houston** | 3            | 5            | Fast turnaround     |

### Section 2: Request Type Selection

| Field                  | Type      | Request Types         | Behavior                    |
| ---------------------- | --------- | --------------------- | --------------------------- |
| **Request Type**       | Radio     | All types             | Determines subsequent steps |
| **Proposed Product**   | Text      | LWR only              | Becomes technical name      |
| **Product Name**       | Text      | TLWR, VLWR            | Direct input                |

## LWR (Laboratory Work Request) Sections

### Product Specification Section

| Field Group            | Fields                           | Validation Rules            |
| ---------------------- | -------------------------------- | --------------------------- |
| **Pricing**            | Target sales price, currency    | Currency by laboratory      |
| **Standards**          | Standard type, code              | Industry standards catalog  |
| **Competition**        | Competitive products             | Market reference            |
| **Chemistry**          | Chemical composition             | Technical specifications    |
| **Appearance**         | Color, finish, metallic, light   | Visual characteristics      |
| **Substrate**          | Base material, pretreatment      | Application compatibility   |
| **Market**             | Annual consumption, segmentation | Business requirements       |

#### Target Sales Price Rules

| Laboratory      | Default Currency | Weight Unit | Price Validation        |
| --------------- | ---------------- | ----------- | ----------------------- |
| **Houston**     | USD              | lb          | Market range check      |
| **Lerma**       | MXN              | kg          | Market range check      |
| **M&M Houston** | USD              | lb          | Market range check      |

### Application Parameters Section

| Parameter Group       | Fields                           | Units by Location       |
| --------------------- | -------------------------------- | ----------------------- |
| **Application Mode**  | Recovery vs non-recovery         | Boolean selection       |
| **System Config**     | System, method, equipment        | Technical specifications |
| **Timing**            | Dwell time, cure time            | Minutes (required)      |
| **Temperature**       | Cure temp, oven setting          | °F/°C by laboratory     |

#### Temperature Unit Rules

| Laboratory      | Available Units | Default  | Conversion Required |
| --------------- | --------------- | -------- | ------------------- |
| **Houston**     | °C, °F          | °F       | Both directions     |
| **Lerma**       | °C              | °C       | From °F if needed   |
| **M&M Houston** | °C, °F          | °F       | Both directions     |

### Panel Section

| Panel Type            | Description              | Selection Type    |
| --------------------- | ------------------------ | ----------------- |
| **Client Steel**      | Customer provides steel  | Boolean           |
| **Seller Steel**      | Lab provides steel       | Boolean           |
| **Client Aluminum**   | Customer provides aluminum | Boolean         |
| **Seller Aluminum**   | Lab provides aluminum    | Boolean           |
| **Client Powder**     | Customer provides sample | Boolean           |
| **Seller Powder**     | Lab provides sample      | Boolean           |
| **Standard**          | Industry standard panels | Boolean           |

### Contact Information Section

| Field         | Type     | Validation                    |
| ------------- | -------- | ----------------------------- |
| **Contact**   | Text     | Required, person name         |
| **Phone**     | Text     | Phone format validation       |
| **Address**   | Textarea | Full address required         |
| **Tax ID**    | Text     | Regional tax ID format        |

### Powder Properties Section

| Property Group        | Fields                     | Standards Referenced      |
| --------------------- | -------------------------- | ------------------------- |
| **Physical**          | Film thickness, gravity    | ASTM measurement standards |
| **Surface**           | Gloss 60°, hardness        | Visual quality standards   |
| **Mechanical**        | Direct/indirect impact     | Impact resistance standards |
| **Durability**        | Flexibility, salt spray    | Environmental standards    |
| **Weathering**        | QUV exposure               | UV resistance standards    |
| **Technology**        | CR technology flag         | Chrome-free option        |
| **Custom**            | Extra properties           | Additional requirements    |

## TLWR (Testing Laboratory Work Request) Sections

### Testing Information Section

| Field Group          | Options                    | Impact on Workflow         |
| -------------------- | -------------------------- | -------------------------- |
| **Objective**        | Test purpose selection     | Determines test protocols  |
| **Chemistry**        | Chemical type              | Safety requirements        |
| **Finish**           | Surface finish type        | Testing methodology        |
| **Final Report**     | Comprehensive report flag  | Documentation level        |
| **Supplier**         | Material supplier          | Traceability requirements  |

### Requirements Section

| Field                   | Type              | Conditional Behavior    |
| ----------------------- | ----------------- | ----------------------- |
| **Enclosed**            | Select + Other    | Free text if "other"    |
| **Specifications**      | Boolean           | Requires documentation  |
| **Substrate**           | Select + Other    | Free text if "other"    |

### Dynamic Test Configuration Sections

#### Salt Fog Test Configuration

| Field                 | Type              | Conditional Display     |
| --------------------- | ----------------- | ----------------------- |
| **Enable Test**       | Boolean           | Shows entire section    |
| **Pretreatment**      | Selection         | When enabled            |
| **Panel Prep**        | Selection         | Panel preparation method |
| **Exposure Hours**    | Selection         | Test duration           |
| **Report Content**    | Multi-select      | What to document        |
| **Report Frequency**  | Select + Custom   | Custom days if selected |

#### QUV Test Configuration  

| Field                 | Type              | Validation Rules        |
| --------------------- | ----------------- | ----------------------- |
| **Enable Test**       | Boolean           | Shows entire section    |
| **Lamp Type**         | Select + Other    | UV lamp specification   |
| **Panel Prep**        | Selection         | Preparation requirements |
| **Exposure Hours**    | Selection         | Test duration options   |
| **Report Frequency**  | Select + Custom   | Custom days if selected |

#### Powder Sample Configuration

| Field Group          | Specification            | Business Rules           |
| -------------------- | ------------------------ | ------------------------ |
| **Sample Size**      | Amount + unit (kg/lb)    | kg max 100, lb max 10   |
| **Aluminum Panels**  | Quantity + dimensions    | Default 3"x6"            |
| **Steel Panels**     | Quantity + dimensions    | Default 3"x6"            |
| **Color Chips**      | Quantity + dimensions    | Default 2"x2.5"          |

## VLWR (Vitracoat Laboratory Work Request) Sections

### Requirements Section

| Field Group             | Purpose                    | Special Features         |
| ----------------------- | -------------------------- | ------------------------ |
| **Material to Test**    | Sample identification      | New material type enum   |
| **Sample ID**           | Unique identifier          | Auto-generated option    |
| **Supplier**            | Material source            | Supplier database        |
| **Documentation**       | SDS, COA, TDS flags        | Required document flags  |
| **Test Reason**         | Testing objective          | Links to test protocols  |
| **Sample Amount**       | Quantity in lbs            | Weight-based allocation  |

### Conditional Evaluation Sections

#### Raw Material Evaluation

| Field                | Conditional Display        | Purpose                  |
| -------------------- | -------------------------- | ------------------------ |
| **Control ID**       | When raw material selected | Reference comparison     |
| **Additional Tests** | Test type selection        | Extended test matrix     |
| **Test As Per**      | Standard references        | Methodology selection    |
| **Final Report**     | Documentation level        | Report complexity        |

#### Finished Powder Evaluation  

| Field                | Purpose                    | Business Impact          |
| -------------------- | -------------------------- | ------------------------ |
| **Compared To**      | Benchmark product          | Competitive analysis     |
| **Manufacturer**     | Equipment manufacturer     | Process compatibility    |
| **Other Equipment**  | Alternative equipment      | Equipment flexibility    |

## Micro Production Sections

### Production Details Section

| Field Group         | Specifications             | Business Rules           |
| ------------------- | -------------------------- | ------------------------ |
| **Product**         | Product selection + dialog | Full product details     |
| **SAP ID**          | ERP integration            | System synchronization   |
| **Zone**            | Production zone            | Facility management      |
| **Sample Size**     | Amount in kg (max 150)     | Micro production limit   |

#### Micro Production Constraints

| Constraint          | Rule                       | Business Reason          |
| ------------------- | -------------------------- | ------------------------ |
| **Laboratory**      | Lerma only                 | Special equipment        |
| **Approval**        | Required                   | Investment protection    |
| **Maximum Size**    | 150 kg                     | Capacity limitation      |
| **Unit**            | kg only                    | Metric system standard   |

## Laboratory-Based Business Logic

### Location-Driven Configuration

| Laboratory      | Currency | Weight Unit | Temperature | Date Range | Micro Prod |
| --------------- | -------- | ----------- | ----------- | ---------- | ---------- |
| **Houston**     | USD      | lb          | °C, °F      | 3-15 days  | No         |
| **Lerma**       | MXN      | kg          | °C          | 3-15 days  | Yes        |
| **M&M Houston** | USD      | lb          | °C, °F      | 3-5 days   | No         |

### Dynamic Field Behavior

#### "Other" Option Pattern

Applied to fields where custom input is needed:
- **Substrate selection**: Industry standard + custom
- **Lamp types**: Standard UV lamps + other
- **Enclosed types**: Common documents + other
- **Report frequency**: Standard intervals + custom days

#### Composite Panel Pattern

Used for panel specifications with quantity and dimensions:
- **Default dimensions**: Context-dependent (3x6 for most, 2x2.5 for color chips)
- **Quantity validation**: Positive integers only
- **Size validation**: Reasonable dimension limits

## Form State Management

### Multi-Step Progress Tracking

| State Element         | Purpose                    | Persistence             |
| --------------------- | -------------------------- | ----------------------- |
| **Current Step**      | Active form section        | Session storage         |
| **Completed Steps**   | Progress tracking          | Session storage         |
| **Form Data**         | All user inputs            | Auto-save + session     |
| **Validation Errors** | Field-level errors         | Real-time validation    |
| **Available Steps**   | Dynamic step calculation   | Request type dependent  |

### Auto-Save Functionality

| Trigger               | Frequency                  | Storage Method          |
| --------------------- | -------------------------- | ----------------------- |
| **Field Changes**     | 2 seconds after typing     | Browser session        |
| **Step Navigation**   | On step change             | Browser session        |
| **Periodic Save**     | Every 30 seconds           | Browser session        |
| **Form Submission**   | On submit attempt          | Server persistence      |

## Validation System

### Field-Level Validation Rules

| Field Type            | Validation Rules           | Error Messages          |
| --------------------- | -------------------------- | ----------------------- |
| **Sample Size**       | Max by unit and type       | Unit-specific limits    |
| **Date Needed**       | Lab-specific range         | Lab-specific messages   |
| **Temperature**       | Reasonable process range   | Process compatibility   |
| **Required Fields**   | Non-empty validation       | Field-specific prompts  |

### Cross-Section Validation

| Validation Type       | Scope                      | Trigger                 |
| --------------------- | -------------------------- | ----------------------- |
| **Micro Production**  | Lab + size constraints     | On request type change  |
| **Laboratory Rules**  | Location-specific limits   | On laboratory change    |
| **Test Configuration** | Complete test setup       | On section completion   |
| **Business Rules**    | Industry requirements      | On form submission      |

## Integration Points

| System              | Data Exchange              | Frequency               |
| ------------------- | -------------------------- | ----------------------- |
| **Customer DB**     | Customer selection         | Real-time               |
| **Product Catalog** | Product information        | Real-time               |
| **User Management** | Sales agent assignment    | Real-time               |
| **Laboratory System** | Capacity and constraints | Hourly                  |
| **Document System** | File attachments           | On upload               |

## User Experience Features

### Progressive Enhancement

| Feature               | Basic Experience           | Enhanced Experience     |
| --------------------- | -------------------------- | ----------------------- |
| **Form Navigation**   | Step-by-step progression   | Smart step skipping     |
| **Validation**        | On-submit validation       | Real-time validation    |
| **Data Persistence** | Manual save                | Auto-save functionality |
| **Help System**       | Static help text           | Contextual guidance     |

### Accessibility Compliance

| Standard              | Implementation             | Testing Method          |
| --------------------- | -------------------------- | ----------------------- |
| **WCAG 2.1 AA**       | Screen reader support      | Automated + manual      |
| **Keyboard Navigation** | Tab order and shortcuts  | Keyboard-only testing   |
| **Color Contrast**    | High contrast ratios       | Contrast analyzer       |
| **Form Labels**       | Descriptive labels         | Screen reader testing   |

## Performance Optimization

### Loading Strategies

| Strategy              | Application                | Performance Gain        |
| --------------------- | -------------------------- | ----------------------- |
| **Lazy Loading**      | Conditional sections       | Faster initial load     |
| **Data Caching**      | Customer/product data      | Reduced API calls       |
| **Form Chunking**     | Large forms split          | Better responsiveness   |
| **Validation Debounce** | Real-time validation     | Reduced server load     |

This Request Forms System represents a sophisticated multi-step form architecture designed specifically for the chemical coating industry, with deep domain knowledge embedded in validation rules and business logic constraints.