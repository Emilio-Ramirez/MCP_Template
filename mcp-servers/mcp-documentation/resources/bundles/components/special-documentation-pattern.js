export default `# Special Documentation Pattern

## Purpose

The Special documentation type captures unique business unit features that don't fit into the standard 5 types (Overview, Dashboard, Auth, Configuration, Form/Page). These are exceptional cases requiring custom documentation structure.

## When to Use Special Type

### Qualifying Criteria
Use Special type ONLY when ALL of these are true:
1. ✅ Feature doesn't fit any standard type
2. ✅ Unique business logic requiring custom structure
3. ✅ Cannot be adapted to Form/Page pattern
4. ✅ Represents significant business value
5. ✅ Approved by architecture team

### Examples of Special Features
- Custom visualization tools (beyond standard dashboards)
- Machine learning models and AI features
- Real-time collaboration features
- Complex calculators or simulators
- Industry-specific tools
- Legacy system bridges

## Flexible Structure Template

\`\`\`markdown
# {Special Feature Name}

## Feature Overview

### Purpose
[Why this feature exists and what unique problem it solves]

### Business Value
[Specific value proposition and ROI]

### Why Special Type
[Explicit justification for not using standard types]

## Unique Requirements

### Functional Requirements
[Special functionality not covered by standard patterns]

### Technical Requirements
[Unique technical needs or constraints]

### Business Constraints
[Industry regulations, legacy requirements, etc.]

## Custom Implementation

### Architecture
[Unique architectural patterns required]

### Components
[Special UI/UX components needed]

### Workflows
[Non-standard business processes]

## {Custom Section 1}
[Feature-specific documentation]

## {Custom Section 2}
[Feature-specific documentation]

## {Custom Section N}
[As many custom sections as needed]

## Integration Considerations

### Standard System Integration
[How this special feature connects to standard systems]

### Data Exchange
[Unique data formats or protocols]

### Security Implications
[Special security considerations]

## Maintenance and Support

### Special Skills Required
[Unique expertise needed]

### Documentation
[Additional documentation beyond this file]

### Support Procedures
[Non-standard support processes]
\`\`\`

## Examples of Special Documentation

### Example 1: AI-Powered Formula Predictor

\`\`\`markdown
# AI Formula Prediction Engine

## Feature Overview

### Purpose
Uses machine learning to predict optimal powder coating formulations based on desired properties, reducing trial-and-error cycles by 70%.

### Business Value
- Reduces formulation time from days to hours
- Improves first-pass success rate to 85%
- Saves $500K annually in wasted materials

### Why Special Type
This is an AI/ML system with unique model management, training pipelines, and prediction interfaces that don't fit standard form/page patterns.

## Unique Requirements

### Functional Requirements
- Real-time prediction with <2 second response
- Confidence scoring for predictions
- Explainable AI for formula reasoning
- Continuous learning from new formulations

### Technical Requirements
- GPU acceleration for model inference
- 100GB+ training data storage
- Python ML pipeline integration
- Model versioning and rollback

## ML Model Architecture

### Model Components
| Component | Type | Purpose | Update Frequency |
|-----------|------|---------|------------------|
| Feature Extractor | CNN | Process chemical structures | Monthly |
| Property Predictor | XGBoost | Predict coating properties | Weekly |
| Formula Generator | GAN | Generate new formulations | Monthly |
| Validator | Rules Engine | Ensure chemical compatibility | Real-time |

### Training Pipeline
\`\`\`
[Historical Data] → [Feature Engineering] → [Model Training] → [Validation] → [Deployment]
\`\`\`

### Prediction Interface

#### Input Parameters
| Parameter | Type | Range | Required |
|-----------|------|-------|----------|
| Gloss Level | Integer | 0-100 | Yes |
| Hardness | String | Soft/Medium/Hard | Yes |
| Color Family | Enum | RAL codes | Yes |
| Cure Temperature | Integer | 160-200°C | Yes |
| Cost Target | Decimal | $/kg | No |

#### Output Format
\`\`\`json
{
  "predictions": [
    {
      "formula_id": "AI-2024-001",
      "confidence": 0.92,
      "materials": [],
      "properties": {},
      "explanation": "Based on similar formulations..."
    }
  ]
}
\`\`\`

## Model Management

### Version Control
- Models stored in MLflow registry
- A/B testing for new versions
- Automatic rollback on performance degradation

### Performance Monitoring
| Metric | Target | Alert Threshold |
|--------|--------|----------------|
| Prediction Accuracy | >80% | <75% |
| Response Time | <2s | >5s |
| Model Drift | <5% | >10% |

[Continue with remaining special sections...]
\`\`\`

### Example 2: Real-time Collaboration Workspace

\`\`\`markdown
# Real-time Formulation Collaboration Workspace

## Feature Overview

### Purpose
Enables multiple formulators to work simultaneously on complex formulations with real-time synchronization, conflict resolution, and version branching.

### Why Special Type
Real-time collaboration with WebSocket connections, operational transformation, and conflict resolution doesn't fit any standard documentation pattern.

## Collaboration Architecture

### Real-time Sync
- WebSocket server for live updates
- Operational Transformation for conflict resolution
- Presence awareness showing active users
- Cursor and selection synchronization

### Collaboration Features
| Feature | Technology | Latency |
|---------|------------|---------||
| Live Editing | WebSockets | <100ms |
| Voice Chat | WebRTC | <200ms |
| Screen Share | WebRTC | <500ms |
| Comments | REST + WS | <200ms |

[Continue with collaboration-specific documentation...]
\`\`\`

## Special Type Guidelines

### DO Use Special Type For:
✅ AI/ML features with model management
✅ Real-time collaboration systems
✅ Industry-specific calculators/simulators
✅ Complex visualization beyond dashboards
✅ Legacy system integrations with unique requirements
✅ Blockchain or distributed systems
✅ IoT device management
✅ Custom workflow engines

### DON'T Use Special Type For:
❌ Standard forms (use Form/Page)
❌ Reports and analytics (use Dashboard)
❌ User management (use Auth)
❌ System settings (use Configuration)
❌ Business overview (use Overview)
❌ Minor variations of standard patterns

## Documentation Requirements

### Mandatory Sections
Even though structure is flexible, these sections are REQUIRED:
1. **Feature Overview** - Purpose and business value
2. **Why Special Type** - Justification for not using standard types
3. **Unique Requirements** - What makes this special
4. **Integration Considerations** - How it connects to standard systems

### Recommended Sections
- Architecture diagrams
- Custom workflows
- Performance requirements
- Special security considerations
- Maintenance procedures
- Required expertise

## Migration Path

### When to Reconsider Type
Review Special type usage when:
- Feature becomes standardized
- Similar features emerge (create new pattern)
- Business requirements simplify
- Technology changes enable standard patterns

### Converting to Standard Type
1. Identify which standard type now fits
2. Map special sections to standard structure
3. Preserve unique documentation in appendix
4. Update references and links
5. Archive special documentation

## Quality Criteria for Special Documentation

### Completeness
- [ ] Clear justification for Special type
- [ ] All unique aspects documented
- [ ] Integration points specified
- [ ] Maintenance procedures included

### Clarity
- [ ] Purpose immediately clear
- [ ] Unique value proposition stated
- [ ] Technical requirements explicit
- [ ] Examples where applicable

### Maintainability
- [ ] Update procedures documented
- [ ] Dependencies identified
- [ ] Version control approach
- [ ] Migration path considered

## Anti-Patterns to Avoid

❌ **Lazy Classification**: Using Special to avoid proper documentation
❌ **Over-Engineering**: Making standard features seem special
❌ **No Justification**: Missing "Why Special Type" section
❌ **Poor Structure**: No logical organization despite flexibility
❌ **Missing Integration**: Not explaining standard system connections

## Validation Checklist

- [ ] Feature genuinely doesn't fit standard types
- [ ] Business value clearly articulated
- [ ] Justification for Special type documented
- [ ] Unique requirements specified
- [ ] Custom implementation explained
- [ ] Integration points documented
- [ ] Maintenance procedures included
- [ ] Examples or diagrams provided
- [ ] Future migration path considered
- [ ] Architecture team approval obtained

The Special documentation type provides flexibility for truly unique features while maintaining documentation quality standards across the IBSO MCP ecosystem.`;