export default `# Dashboard Documentation Pattern

## Purpose

The Dashboard documentation type defines analytics, reporting, and business intelligence interfaces. It specifies KPIs, data visualization patterns, and real-time monitoring capabilities for business units.

## Mandatory Structure

\`\`\`markdown
# {Business Unit Name} Dashboard

## Dashboard Overview

### Purpose
[Why this dashboard exists and what decisions it supports]

### Target Audience
| User Role | Primary Use Case | Access Level |
|-----------|-----------------|--------------|
| Executive | Strategic metrics | Read-only |
| Manager | Operational metrics | Read + Export |
| Analyst | Detailed analysis | Full access |

### Update Frequency
- Real-time metrics: [List of live data]
- Hourly updates: [Batch processed data]
- Daily refresh: [Overnight calculations]

## Key Performance Indicators (KPIs)

### Business KPIs

#### KPI Category 1: [Category Name]
| KPI | Definition | Formula | Target | Threshold |
|-----|------------|---------|--------|-----------|
| KPI Name | What it measures | Calculation | Goal value | Alert levels |
| Example: Order Fulfillment Rate | % of orders shipped on time | (On-time shipments / Total orders) × 100 | ≥ 95% | <90% = Red |

#### KPI Category 2: [Category Name]
| KPI | Definition | Formula | Target | Threshold |
|-----|------------|---------|--------|-----------|
| KPI Name | What it measures | Calculation | Goal value | Alert levels |

### Operational Metrics

| Metric | Description | Measurement | Display Format |
|--------|-------------|-------------|----------------|
| Metric 1 | What it tracks | How measured | Chart/Number/Gauge |
| Metric 2 | What it tracks | How measured | Chart/Number/Gauge |

## Dashboard Layout

### Layout Structure
\`\`\`
┌─────────────────────────────────────────┐
│          Header Section                  │
│  [Title, Date Range, Refresh, Export]   │
├─────────────┬─────────────┬─────────────┤
│   KPI Card  │   KPI Card  │   KPI Card  │
│  [Primary]  │ [Secondary] │  [Tertiary] │
├─────────────┴─────────────┴─────────────┤
│           Main Chart Area                │
│     [Primary visualization]              │
├─────────────┬─────────────────────────────┤
│  Side Panel │      Detail Grid           │
│  [Filters]  │   [Tabular data]           │
└─────────────┴─────────────────────────────┘
\`\`\`

### Component Organization

#### Header Section
- Dashboard Title: [Name and version]
- Date Range Selector: [Default range]
- Refresh Controls: [Manual/Auto options]
- Export Options: [PDF/Excel/CSV]

#### KPI Cards
- Primary KPIs: [3-5 most critical metrics]
- Visual Indicators: [Colors, arrows, trends]
- Drill-down: [Click behavior]

#### Visualization Area
- Default View: [Primary chart type]
- Alternative Views: [Available chart options]
- Interactivity: [Hover, click, zoom features]

## Data Sources

### Primary Data Sources
| Source | Type | Connection | Update Method | Latency |
|--------|------|------------|---------------|---------|
| System 1 | Database | Direct SQL | Real-time | < 1 sec |
| System 2 | API | REST | Polling | 5 min |
| System 3 | File | SFTP | Batch | Daily |

### Data Pipeline
\`\`\`
[Source] → [ETL Process] → [Data Warehouse] → [Dashboard]
\`\`\`

### Data Quality
- Validation Rules: [Quality checks]
- Missing Data Handling: [Default behavior]
- Error Indicators: [How errors are shown]

## User Interface Components

### Charts and Visualizations

#### Chart Type 1: [Time Series]
- **Purpose**: [Trend analysis]
- **Data Points**: [What's displayed]
- **Interactions**: [Zoom, pan, hover]
- **Update Frequency**: [Real-time/batch]

#### Chart Type 2: [Bar/Column]
- **Purpose**: [Comparisons]
- **Data Points**: [Categories shown]
- **Interactions**: [Click to filter]
- **Update Frequency**: [Refresh rate]

#### Chart Type 3: [Pie/Donut]
- **Purpose**: [Distribution]
- **Data Points**: [Segments]
- **Interactions**: [Explode segments]
- **Update Frequency**: [Refresh rate]

### Tables and Grids

| Table Name | Purpose | Columns | Features |
|------------|---------|---------|----------|
| Summary Table | Overview data | 8-10 key fields | Sort, filter, export |
| Detail Grid | Transaction level | All fields | Pagination, search |

### Filters and Controls

#### Global Filters
- Date Range: [Calendar picker]
- Business Unit: [Dropdown]
- Product Category: [Multi-select]
- Status: [Checkbox group]

#### Contextual Filters
- Chart-specific: [Local controls]
- Drill-through: [Hierarchical navigation]
- Search: [Text-based filtering]

## Reporting Features

### Standard Reports

| Report Name | Description | Format | Schedule | Recipients |
|-------------|-------------|--------|----------|------------|
| Daily Summary | Key metrics overview | PDF | 8 AM daily | Management |
| Weekly Analysis | Trend analysis | Excel | Monday AM | Analysts |
| Monthly Executive | Board presentation | PPT | 1st of month | Executives |

### Custom Reports
- Report Builder: [Available tools]
- Save Options: [Personal/Shared]
- Scheduling: [Frequency options]
- Distribution: [Email/Portal/API]

### Export Capabilities
- **PDF Export**: Full dashboard snapshot
- **Excel Export**: Raw data with formatting
- **CSV Export**: Raw data only
- **API Access**: JSON data endpoints

## Alert Configuration

### Alert Rules

| Alert Name | Condition | Threshold | Action | Recipients |
|------------|-----------|-----------|--------|------------|
| Critical KPI | Below target | < 80% | Email + SMS | Manager |
| Trend Alert | Negative trend | 3 days decline | Email | Team |
| Anomaly Detection | Statistical outlier | 3σ deviation | Dashboard flag | Analyst |

### Notification Channels
- Email: [Configuration options]
- SMS: [Critical alerts only]
- In-app: [Dashboard notifications]
- Webhook: [System integration]

## Mobile Responsiveness

### Mobile Layout
\`\`\`
┌─────────────┐
│   Header    │
├─────────────┤
│  KPI Card   │
├─────────────┤
│  KPI Card   │
├─────────────┤
│    Chart    │
├─────────────┤
│    Table    │
└─────────────┘
\`\`\`

### Touch Interactions
- Swipe: Navigate between views
- Pinch: Zoom charts
- Tap: Show details
- Long-press: Context menu

## Performance Specifications

### Load Time Targets
| Component | Target | Maximum |
|-----------|--------|---------|
| Initial Load | < 2 sec | 5 sec |
| Data Refresh | < 1 sec | 3 sec |
| Export Generation | < 5 sec | 30 sec |

### Optimization Strategies
- Data Caching: [Strategy]
- Lazy Loading: [Implementation]
- Aggregation: [Pre-computed metrics]
- Pagination: [Large datasets]

## Security and Access Control

### Role-Based Access
| Role | View | Export | Configure | Admin |
|------|------|--------|-----------|-------|
| Viewer | ✓ | ✗ | ✗ | ✗ |
| Analyst | ✓ | ✓ | ✗ | ✗ |
| Manager | ✓ | ✓ | ✓ | ✗ |
| Admin | ✓ | ✓ | ✓ | ✓ |

### Data Security
- Row-level Security: [Implementation]
- Column Masking: [Sensitive fields]
- Audit Trail: [Access logging]
- Encryption: [Transit and rest]

## Integration Points

### Embedded Analytics
- Portal Integration: [How to embed]
- iframe Support: [Configuration]
- API Endpoints: [Available data]
- Webhook Events: [Triggers]

### External Tools
| Tool | Purpose | Integration Method |
|------|---------|-------------------|
| Power BI | Advanced analytics | Direct connection |
| Tableau | Visualization | API feed |
| Excel | Ad-hoc analysis | Export/Import |

## User Training and Help

### Documentation
- User Guide: [Location]
- Video Tutorials: [Available topics]
- FAQ: [Common questions]
- Tooltips: [In-app help]

### Support
- Help Desk: [Contact method]
- Training Sessions: [Schedule]
- Feedback Channel: [How to submit]
\`\`\`

## Template Example: Vitracoat Dashboard

\`\`\`markdown
# Vitracoat Dashboard

## Dashboard Overview

### Purpose
Monitor formulation performance, track quality metrics, and analyze production efficiency for the powder coating business unit.

### Target Audience
| User Role | Primary Use Case | Access Level |
|-----------|-----------------|--------------|
| Plant Manager | Production metrics | Full access |
| Quality Manager | TLWR results | Read + Export |
| Formulator | Formula performance | Read-only |

## Key Performance Indicators (KPIs)

### Quality KPIs
| KPI | Definition | Formula | Target | Threshold |
|-----|------------|---------|--------|-----------|
| First Pass Yield | % formulas passing TLWR | (Passed / Total) × 100 | ≥ 95% | <90% = Red |
| Formula Accuracy | Match to specification | Deviation from target | ± 2% | >5% = Red |

### Production KPIs
| KPI | Definition | Formula | Target | Threshold |
|-----|------------|---------|--------|-----------|
| Throughput | Formulas per day | Count per 24h | ≥ 50 | <40 = Red |
| Cycle Time | LWR to approval | Average days | ≤ 3 | >5 = Red |

[Continue with remaining sections...]
\`\`\`

## Common Patterns

### KPI Selection
- Limit to 10-15 key metrics
- Balance leading and lagging indicators
- Include both business and operational metrics

### Visualization Best Practices
- Time series for trends
- Bar charts for comparisons
- Gauges for single metrics
- Tables for detailed data

### Update Frequencies
- Real-time: Critical operational metrics
- Hourly: Process metrics
- Daily: Business KPIs
- Monthly: Strategic indicators

## Anti-Patterns to Avoid

❌ **Information Overload**: Too many metrics on one screen
❌ **Unclear Metrics**: KPIs without definitions or formulas
❌ **Static Displays**: No interactivity or drill-down
❌ **Missing Context**: Numbers without targets or trends
❌ **Poor Performance**: Slow loading or refresh

## Validation Checklist

- [ ] Dashboard purpose clearly defined
- [ ] Target audience specified
- [ ] All KPIs have formulas and targets
- [ ] Layout structure documented
- [ ] Data sources identified
- [ ] Update frequencies specified
- [ ] Chart types appropriate for data
- [ ] Filters and controls defined
- [ ] Export options available
- [ ] Alert rules configured
- [ ] Mobile layout considered
- [ ] Performance targets set
- [ ] Security roles defined
- [ ] Help documentation available

This pattern ensures comprehensive dashboard documentation that enables effective business intelligence and decision-making across the IBSO MCP ecosystem.`;