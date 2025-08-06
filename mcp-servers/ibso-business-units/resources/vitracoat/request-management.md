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

| Column             | Type    | Description                    | Example                  |
|--------------------|---------|--------------------------------|--------------------------|
| **Request ID**     | String  | Unique request identifier      | `REQ-2025-001`          |
| **Client Name**    | String  | Customer company name          | `AVALON ALUMINUM`        |
| **Product**        | String  | Product/coating description    | `Anodized Clear Coating` |
| **Sales Rep**      | String  | Assigned representative        | `John Smith`             |
| **Status**         | Enum    | Current workflow status        | `FORMULATION_PROCESS`    |
| **Type**           | Enum    | Request category               | `STANDARD`               |
| **Required Date**  | Date    | Client delivery deadline       | `15/Aug/2025`            |
| **Actions**        | Action  | View/Edit/Status actions       | `Buttons`                |

## Request Structure

Each request contains the following main sections:

| Section                    | Description                      | Purpose                    |
|----------------------------|----------------------------------|----------------------------|
| **Basic Information**      | Request identification data      | Tracking and workflow      |
| **Client Information**     | Customer details and contact     | Relationship management    |
| **Product Specifications** | Technical coating requirements   | Formulation development    |
| **Test Requirements**      | Quality testing specifications   | Sample validation          |
| **Timeline Management**    | Dates and delivery schedules     | Project planning           |

## Basic Information

Core request identification and tracking data:

| Field              | Type    | Description                     | Example              |
|--------------------|---------|---------------------------------|----------------------|
| **Request ID**     | String  | Unique identifier (auto-generated) | `REQ-2025-001`      |
| **Request Type**   | Enum    | Request category                | `STANDARD`           |
| **Status**         | Enum    | Current workflow status         | `PENDING_INFO`       |
| **Creation Date**  | Date    | Initial request submission      | `01/Aug/2025`        |
| **Sales Rep**      | String  | Assigned representative         | `John Smith`         |
| **Requesting Area** | String  | Department/division             | `Industrial Sales`   |

## Client Information

Customer details and contact information:

| Field              | Type    | Description                     | Example              |
|--------------------|---------|---------------------------------|----------------------|
| **Client ID**      | String  | Reference to client entity      | `CLI-1001`           |
| **Client Name**    | String  | Customer company name           | `AVALON ALUMINUM`    |
| **Client Zone**    | String  | Geographic territory            | `North America`      |
| **Client Country** | String  | Country for compliance          | `United States`      |
| **Contact Person** | String  | Primary client contact          | `Mike Johnson`       |
| **Contact Email**  | String  | Client communication email      | `mike@avalon.com`    |

## Product Specifications

Technical coating requirements and specifications:

| Field                | Type    | Description                     | Example                    |
|----------------------|---------|---------------------------------|----------------------------|
| **Fantasy Name**     | String  | Marketing/commercial name       | `Ultra Clear Pro`          |
| **Technical Name**   | String  | Technical specification name    | `Anodized Clear Coating`   |
| **Product Description** | Text | Detailed product description    | `Clear protective coating for aluminum` |
| **System Type**      | Enum    | Base chemistry system           | `WATER_BASE`               |
| **Finish Type**      | Enum    | Surface finish specification    | `SEMI_GLOSSY`              |
| **Substrate**        | Enum    | Application surface material    | `METAL`                    |
| **Provider**         | String  | Material supplier information   | `Aluminum Dynamics Inc`    |

## Test Requirements

Quality testing and sample specifications:

| Field                   | Type    | Description                     | Example              |
|-------------------------|---------|---------------------------------|----------------------|
| **Test Type**           | Array   | Required testing protocols      | `CORROSION, IMPACT`  |
| **Number of Samples**   | Number  | Quantity required for testing   | `5`                  |
| **Sample Specifications** | Text   | Detailed sample requirements    | `100g samples, 3mm thickness` |
| **Exposure Hours**      | Number  | Environmental testing duration  | `1000`               |
| **Test Frequency**      | String  | Testing schedule intervals      | `Weekly for 4 weeks` |
| **Special Requirements** | Text   | Additional testing needs        | `Salt spray resistance` |

## Timeline Management

Project dates and delivery schedules:

| Field                     | Type | Description                     | Example        |
|---------------------------|------|---------------------------------|----------------|
| **Creation Date**         | Date | Initial request submission      | `01/Aug/2025`  |
| **Acceptance Date**       | Date | Technical review completion     | `05/Aug/2025`  |
| **Required Date**         | Date | Client delivery deadline        | `15/Aug/2025`  |
| **Estimated Delivery**    | Date | Laboratory projected completion | `12/Aug/2025`  |
| **Real Delivery Date**    | Date | Actual sample delivery date     | `14/Aug/2025`  |
| **Follow-up Date**        | Date | Client feedback scheduled       | `20/Aug/2025`  |

## Form Actions

Available actions in the request interface:

```
🎯 Request Actions
├── SAVE - Save request changes
├── SUBMIT - Submit for review
├── APPROVE - Approve for formulation
├── REJECT - Reject with comments
├── ASSIGN - Assign to formulator
├── EXPORT - Export request data
└── DUPLICATE - Create similar request
```

## View Request Logic

When clicking a request from the table:

### Dialog Display
- Opens comprehensive modal showing complete request information
- Displays all sections with status history and file attachments
- Shows workflow progression and next available actions
- Includes client communication history and internal notes

### Dialog Information
- **Request Details**: Complete identification and tracking information
- **Client Data**: Full customer information and contact details
- **Product Specs**: Technical requirements and formulation specifications
- **Test Requirements**: Quality protocols and sample specifications
- **Timeline**: All dates, milestones, and delivery schedules
- **Status History**: Complete audit trail with user attribution
- **File Attachments**: Documents, specifications, and communications

## Status Types

Requests progress through the following workflow statuses:

- **PENDING_INFO** - Initial submission, awaiting complete information
- **REVIEW_BY_SAMPLES** - Technical specifications under laboratory review
- **ACCEPTED** - Approved for formulation development
- **FORMULATION_PROCESS** - Active laboratory development in progress
- **FORMULATION_COMPLETE** - Ready for sample preparation
- **SAMPLE_DELIVERED** - Samples delivered to client
- **CLOSED** - Project completed with client feedback

## Request Types

The system supports two main request categories:

- **STANDARD** - Regular samples (100g-1kg) with standard processing
- **MICRO_PRODUCTION** - Large samples (up to 50kg) requiring production approval

## Business Logic

- **Automatic ID Generation**: Request IDs follow REQ-YYYY-NNN format
- **Status Workflow**: Enforced progression through defined status stages
- **Assignment Rules**: Automatic formulator assignment based on chemistry type
- **Approval Requirements**: Manager approval required for micro-production requests
- **Timeline Validation**: Required dates must be realistic based on complexity
- **Client Integration**: Direct connection to client management system
- **LWR Generation**: Automatic Laboratory Work Request creation upon acceptance
- **Cost Estimation**: Integration with formulation system for cost calculations