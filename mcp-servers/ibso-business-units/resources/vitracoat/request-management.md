# Commercial Request Management System

## Overview

The system manages commercial requests for custom chemical coating formulations and samples. Each request tracks client requirements, technical specifications, and the complete workflow from initial inquiry to sample delivery.

## List of Components

- **Request Table** - Main data grid with search, filter, and CRUD operations
- **Request Form** - Multi-section form with Client, Product, Testing, and Timeline information
- **View Request Dialog** - Read-only modal showing complete request details with status history
- **Status Management Dialog** - Workflow progression interface with approval controls
- **Export Actions** - CSV/Excel export and detailed report generation

## Request Table Definition

The main request list displays:

| Column            | Data Type | Description                              | Example                                     |
| ----------------- | --------- | ---------------------------------------- | ------------------------------------------- |
| **Request ID**    | String    | Unique request identifier                | `56423`                                     |
| **Product**       | String    | Product name with code/description       | `VCOAT-EC3K-WB` <br> `(EcoCoat Pro 3000)`  |
| **Client Name**   | String    | Customer company                         | `Grupo Bimbo`                               |
| **Sales Rep**     | String    | Assigned representative with zone        | `Carlos Rodriguez` <br> `Centro`            |
| **Type**          | Enum      | Request category                         | `LWR`                                       |
| **Status**        | Enum      | Current workflow status                  | `PENDING`                                   |
| **Required Date** | Date      | Client delivery deadline with countdown  | `Aug 12, 2025` <br> `4 days remaining`     |

## Request Dialog Structure

Each request contains the following main sections:

| Section                    | Description                    | Purpose                 |
| -------------------------- | ------------------------------ | ----------------------- |
| **Basic Information**      | Request identification data    | Tracking and workflow   |
| **Client Information**     | Customer details and contact   | Relationship management |
| **Product Specifications** | Technical coating requirements | Formulation development |
| **Test Requirements**      | Quality testing specifications | Sample validation       |
| **Timeline Management**    | Dates and delivery schedules   | Project planning        |

## Basic Information

Core request identification and tracking data:

| Field               | Data Type | Description                        | Example            |
| ------------------- | --------- | ---------------------------------- | ------------------ |
| **Request ID**      | String    | Unique identifier (auto-generated) | `REQ-2025-001`     |
| **Request Type**    | Enum      | Request category                   | `STANDARD`         |
| **Status**          | Enum      | Current workflow status            | `PENDING_INFO`     |
| **Creation Date**   | Date      | Initial request submission         | `01/Aug/2025`      |
| **Sales Rep**       | String    | Assigned representative            | `John Smith`       |
| **Requesting Area** | String    | Department/division                | `Industrial Sales` |

## Client Information

Customer details and contact information:

| Field              | Data Type | Description                | Example           |
| ------------------ | --------- | -------------------------- | ----------------- |
| **Client ID**      | String    | Reference to client entity | `CLI-1001`        |
| **Client Name**    | String    | Customer company name      | `AVALON ALUMINUM` |
| **Client Zone**    | String    | Geographic territory       | `North America`   |
| **Client Country** | String    | Country for compliance     | `United States`   |
| **Contact Person** | String    | Primary client contact     | `Mike Johnson`    |
| **Contact Email**  | String    | Client communication email | `mike@avalon.com` |

## Product Specifications

Technical coating requirements and specifications:

| Field                   | Data Type | Description                   | Example                                 |
| ----------------------- | --------- | ----------------------------- | --------------------------------------- |
| **Fantasy Name**        | String    | Marketing/commercial name     | `Ultra Clear Pro`                       |
| **Technical Name**      | String    | Technical specification name  | `Anodized Clear Coating`                |
| **Product Description** | Text      | Detailed product description  | `Clear protective coating for aluminum` |
| **System Type**         | Enum      | Base chemistry system         | `WATER_BASE`                            |
| **Finish Type**         | Enum      | Surface finish specification  | `SEMI_GLOSSY`                           |
| **Substrate**           | Enum      | Application surface material  | `METAL`                                 |
| **Provider**            | String    | Material supplier information | `Aluminum Dynamics Inc`                 |

## Test Requirements

Quality testing and sample specifications:

| Field                     | Data Type | Description                    | Example                       |
| ------------------------- | --------- | ------------------------------ | ----------------------------- |
| **Test Type**             | Array     | Required testing protocols     | `CORROSION, IMPACT`           |
| **Number of Samples**     | Number    | Quantity required for testing  | `5`                           |
| **Sample Specifications** | Text      | Detailed sample requirements   | `100g samples, 3mm thickness` |
| **Exposure Hours**        | Number    | Environmental testing duration | `1000`                        |
| **Test Frequency**        | String    | Testing schedule intervals     | `Weekly for 4 weeks`          |
| **Special Requirements**  | Text      | Additional testing needs       | `Salt spray resistance`       |

## Timeline Management

Project dates and delivery schedules:

| Field                  | Data Type | Description                     | Example       |
| ---------------------- | --------- | ------------------------------- | ------------- |
| **Creation Date**      | Date      | Initial request submission      | `01/Aug/2025` |
| **Acceptance Date**    | Date      | Technical review completion     | `05/Aug/2025` |
| **Required Date**      | Date      | Client delivery deadline        | `15/Aug/2025` |
| **Estimated Delivery** | Date      | Laboratory projected completion | `12/Aug/2025` |
| **Real Delivery Date** | Date      | Actual sample delivery date     | `14/Aug/2025` |
| **Follow-up Date**     | Date      | Client feedback scheduled       | `20/Aug/2025` |

## Lab Work Request Form Structure

The new request form is a multi-step form that adapts based on the selected request type.

### Form Pages Overview

1. **Basic Info** (shared across all request types)
2. **Request Type Selection** 
3. **Type-Specific Sections** (Can be multiple pages depending on request type)
4. **Notes & Files**

### Page 1: Basic Info (Shared)

Core information required for all request types:

| Field            | Data Type | Validation/Notes                                                                     |
| ---------------- | --------- | ------------------------------------------------------------------------------------ |
| **Laboratory**   | Select    | Required - dropdown of available labs                                                |
| **Customer**     | Select    | Required - customer entity reference                                                 |
| **Sales Agent**  | Select    | Required - assigned sales representative                                             |
| **Date Created** | Date      | Auto-populated with today's date (not shown)                                        |
| **Date Needed**  | Date      | Required - Min 3 days, Max 15 days for Houston/Lerma, Max 5 days for M&M Houston   |

### Page 2: Request Type Selection

Select the type of request being created:

| Request Type    | Description                                  | Additional Field             |
| --------------- | -------------------------------------------- | ---------------------------- |
| **LWR**         | Lab Work Request - Product development       | Proposed Product Name (Text) |
| **TLWR**        | Testing Lab Work Request - Testing services  | -                            |
| **VLWR**        | Vitracoat Lab Work Request - Internal testing| -                            |
| **Production**  | Production / micro-production                | -                            |

*Note: Final product names are assigned later for LWR requests*

### Page 3+: Type-Specific Sections

#### TLWR (Testing Lab Work Request) Pages

##### Testing Information Page

**Test Objectives** (Select one or multiple):  
*See System Management → Testing Standards & Specifications → Test Objectives for current configurable options*

**Enclosed Documents** (Select one or multiple):  
*See System Management → Testing Standards & Specifications → Enclosed Document Types for current configurable options*

**Attach Formulation**: Boolean field that allows users to link/attach a formulation to the TLWR request.

##### Test Selection

- **Salt Fog Test** (Toggle - Shows form page when enabled)
- **QUV Test** (Toggle - Shows form page when enabled)
- **Powder Sample Section** (Toggle - Shows form page when enabled)

##### Salt Fog Test Section

| Field                   | Data Type | Options/Notes                                                                      |
| ----------------------- | --------- | ---------------------------------------------------------------------------------- |
| **Pretreatment**        | Text      | Specify pretreatment details                                                       |
| **Panels Prepared By**  | Select    | *See System Management → Testing Standards → Panel Preparation Options*           |
| **Test Duration**       | Number    | Exposure hours                                                                     |
| **Scribe Type**         | Select    | *See System Management → Testing Standards → Scribe Test Types*                   |
| **Tape Edges**          | Boolean   | Yes / No                                                                           |
| **Test Per**            | Select    | *See System Management → Testing Standards → Test Standard References*            |

##### QUV Test Section

| Field                   | Data Type | Options/Notes                                                                      |
| ----------------------- | --------- | ---------------------------------------------------------------------------------- |
| **Lamp Type**           | Select    | *See System Management → Laboratory & Equipment → Lamp Types*                     |
| **Panels Prepared By**  | Select    | *See System Management → Testing Standards → Panel Preparation Options*           |
| **Exposure Hours**      | Number    | Required exposure duration                                                         |
| **Report Frequency**    | Select    | *See System Management → Testing Standards → Report Frequency*                    |


##### Powder Sample Section

| Field                    | Data Type   | Description                 |
| ------------------------ | ----------- | --------------------------- |
| **Sample Size**          | Number      | Size of powder sample       |
| **Panels Aluminum 3x6** | Panel Input | Quantity of aluminum panels |
| **Panels Steel 3x6**    | Panel Input | Quantity of steel panels    |
| **Color Chips 2x2.5**   | Panel Input | Quantity of color chips     |

#### VLWR (Vitracoat Lab Work Request) Pages

##### Requirements Page

**Shared Fields** (All VLWR types):

| Field               | Data Type    | Options/Notes                                                    |
| ------------------- | ------------ | ---------------------------------------------------------------- |
| **Sample ID**       | Number       | Required sample identification                                   |
| **Supplier**        | Text/Select  | Supplier information                                             |
| **VLWR Form Type**  | Radio Button | Test Vitracoat Product / Raw Material (RM) / Research           |

##### Type 1: Test Vitracoat Product

**Form Fields**:

| Field            | Data Type | Options/Notes                                                                      |
| ---------------- | --------- | ---------------------------------------------------------------------------------- |
| **Product**      | Select    | Choose from product list                                                           |
| **Control ID**   | Text      | Control identification                                                             |
| **Test as Per**  | Select    | *See System Management → Testing Standards → Test Standard References*            |
| **Final Report** | Boolean   | Yes/No                                                                             |

**Enclosed** (Checkboxes):

| Field      | Data Type | Options/Notes                                   |
| ---------- | --------- | ----------------------------------------------- |
| **Sample** | Boolean   | Include sample checkbox                         |
| **Panels** | Boolean   | Include panels checkbox                         |
| **Other**  | Text      | Text field with specification when selected     |

##### Type 2: Raw Material

**Form Fields**:

| Field             | Data Type      | Options/Notes                                                                                                             |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Raw Material**  | Select or Text | Select from list OR write material code with "E-" prefix (e.g., "E-MAS00005" for experimental raw materials)           |
| **Control ID**    | Text           | Control identification                                                                                                    |
| **Test as Per**   | Select         | *See System Management → Testing Standards → Test Standard References*                                                   |
| **Final Report**  | Boolean        | Yes/No                                                                                                                    |

**Enclosed** (Checkboxes):

| Field         | Data Type | Options/Notes           |
| ------------- | --------- | ----------------------- |
| **SDS**       | Boolean   | Safety Data Sheet       |
| **CoA**       | Boolean   | Certificate of Analysis |
| **TDS**       | Boolean   | Technical Data Sheet    |
| **RM Sample** | Boolean   | Raw Material Sample     |

##### Type 3: Research

**Form Fields**:

| Field           | Data Type | Options/Notes                     |
| --------------- | --------- | --------------------------------- |
| **Competitor**  | Select    | Choose competitor from list       |
| **Notes**       | Text Area | Research notes and specifications |
| **File Upload** | File      | Attachment for research materials |

### Final Page: Notes & Files

Common section for all request types:

| Field               | Data Type   | Description                                       |
| ------------------- | ----------- | ------------------------------------------------- |
| **Notes**           | Text Area   | Additional information and special instructions   |
| **File Attachments** | File Upload | Supporting documents, specifications, images     |


## View Request Logic

When clicking a request from the table:

### Dialog Structure

The request dialog uses a redesigned layout for optimal information organization:

#### Header Section (Top)
- **Left Side**: Status, Complexity, Title, Type, Laboratory
- **Right Side**: Print button, View Formulation button (conditional display)

#### Two-Column Layout

##### Left Column (Main/Wide)
- **Basic Request Information**
- **Product Information** 
- **Files and Documentation**
- **Type-specific information** (varies by request type)

##### Right Column (Sidebar/Narrow)
- **Personnel** (Sales Agent, Formulator)
- **Dates and Timeline**
- **Status History**
- **Other supporting information**

#### Type-Specific Sections

Content varies based on request type:

- **LWR**: Product development requirements, technical specifications, sample requirements
- **Repetition**: Original formulation reference, scaling parameters, production quantities
- **TLWR**: Testing objectives, test selection, specific test parameters (Salt Fog, QUV, Powder Sample)
- **VLWR**: Sample information, supplier details, test requirements (varies by VLWR type: Test Vitracoat Product/Raw Material/Research)

#### Formulation Button Logic

The "View Formulation" button display rules:

- **Show button for**: LWR, Repetition, TLWR (when formulation is attached)
- **Hide button for**: VLWR (formulations not applicable)

---

## Request Completion Form

### When to Show

The completion form appears for requests that don't require formulation creation:

- **TLWR requests without attached formulation**
- **All VLWR requests** (formulations are never applicable)

### Form Fields

| Field | Data Type | Description |
| --- | --- | --- |
| **Completion Notes** | Text Area | Required - Final notes and observations |
| **Result Files** | File Upload | Optional - Test results, reports, documentation |

### Form Actions

- **Mark as Complete button** - Finalizes the request and updates status to CLOSED
- **Cancel button** - Returns to request view without changes

### Purpose

This form allows users to complete/close requests that don't require formulation creation by providing final notes and uploading result files. It ensures proper documentation of outcomes for testing and validation requests while maintaining workflow integrity.

---

## Status Types

Requests progress through the following workflow statuses:

*Status types are configurable in System Management → Application Systems → Workflow Status Types (Request category)*

- **PENDING** - Initial submission awaiting assignment to formulator
- **ASSIGNED** - Approved and assigned to laboratory formulator
- **IN_PROCESS** - Active formulation development and testing in progress
- **CLOSED** - Project completed

---

## Request Types

The system supports four main request categories:

- **LWR (Laboratory Work Request)** - New product development from customer requirements
- **TLWR (Testing Laboratory Work Request)** - Quality testing for formulations and existing products
- **VLWR (Validation Laboratory Work Request)** - Product validation, raw material qualification, or competitive research
- **Repetition** - Production scaling for existing approved products, can be micro for Lerma

---

## Panel Input

| Field        | Data Type | Default | Description            |
| ------------ | --------- | ------- | ---------------------- |
| **Quantity** | Number    | 1       | Number of panels/chips |
| **Width**    | Number    | 3       | Width in inches        |
| **Height**   | Number    | 6       | Height in inches       |

**Format**: `Quantity × Width" × Height"`  
**Example**: `2 × 3" × 6"` (2 panels, 3 inches wide, 6 inches tall)

## Business Logic

- **Automatic ID Generation**: Request IDs follow REQ-YYYY-NNN format
- **Status Workflow**: Enforced progression through defined status stages
- **Assignment Rules**: Automatic formulator assignment based on chemistry type
- **Approval Requirements**: Manager approval required for micro-production requests
- **Timeline Validation**: Required dates must be realistic based on complexity
- **Client Integration**: Direct connection to client management system
- **LWR Generation**: Automatic Laboratory Work Request creation upon acceptance
- **Cost Estimation**: Integration with formulation system for cost calculations

