export default `# 📚 Unified Documentation System

## Overview

The Unified Documentation System serves as the comprehensive framework for organizing, maintaining, and accessing all documentation across the MCP ERP ecosystem. This system ensures consistency, discoverability, and maintainability of knowledge assets.

## Documentation Architecture

### Hierarchical Organization Structure

\`\`\`
Documentation Ecosystem
├── Technical Documentation
│   ├── Architecture & Design
│   │   ├── System Architecture
│   │   ├── Database Design
│   │   ├── API Specifications
│   │   └── Integration Patterns
│   ├── Implementation Guides
│   │   ├── Setup & Installation
│   │   ├── Configuration
│   │   ├── Development Standards
│   │   └── Deployment Procedures
│   └── Reference Materials
│       ├── Code Examples
│       ├── Best Practices
│       ├── Troubleshooting
│       └── Performance Optimization
├── Business Documentation
│   ├── Process Documentation
│   │   ├── Workflow Definitions
│   │   ├── Business Rules
│   │   ├── Approval Processes
│   │   └── Compliance Requirements
│   ├── User Documentation
│   │   ├── User Guides
│   │   ├── Training Materials
│   │   ├── Quick Reference
│   │   └── FAQ Collections
│   └── Business Analysis
│       ├── Requirements Documentation
│       ├── Use Cases
│       ├── Business Impact Analysis
│       └── ROI Documentation
├── Quality Documentation
│   ├── Testing Documentation
│   │   ├── Test Plans
│   │   ├── Test Cases
│   │   ├── Test Results
│   │   └── Quality Metrics
│   ├── Security Documentation
│   │   ├── Security Policies
│   │   ├── Compliance Checklists
│   │   ├── Audit Reports
│   │   └── Risk Assessments
│   └── Operational Documentation
│       ├── Monitoring Procedures
│       ├── Incident Response
│       ├── Backup & Recovery
│       └── Maintenance Schedules
└── Governance Documentation
    ├── Standards & Guidelines
    │   ├── Documentation Standards
    │   ├── Coding Standards
    │   ├── Review Processes
    │   └── Version Control
    ├── Project Management
    │   ├── Project Plans
    │   ├── Status Reports
    │   ├── Change Management
    │   └── Resource Allocation
    └── Knowledge Management
        ├── Knowledge Base
        ├── Lessons Learned
        ├── Best Practices Repository
        └── Innovation Documentation
\`\`\`

## Documentation Standards

### Content Standards

#### Document Structure Template
\`\`\`markdown
# Document Title

## Overview
Brief description of the document's purpose and scope

## Table of Contents
- Generated automatically for documents >1000 words

## Prerequisites  
- Required knowledge or setup before using this document

## Main Content Sections
- Logical organization of information
- Use consistent heading hierarchy (H1 → H2 → H3)
- Include code examples where applicable
- Provide step-by-step procedures for processes

## Examples and Code Samples
- Working, tested examples
- Complete, runnable code where possible
- Proper syntax highlighting and formatting

## Related Documentation
- Cross-references to related documents
- Links to dependent or prerequisite documentation

## Revision History
- Document version and change log
- Author and review information

## Appendices
- Supplementary information
- Reference materials
- Glossary of terms
\`\`\`

#### Writing Guidelines

**Clarity and Consistency**
- Use clear, concise language
- Define technical terms on first use
- Maintain consistent terminology throughout
- Use active voice when possible
- Write for the intended audience level

**Formatting Standards**
- Use consistent heading styles
- Apply proper code formatting with syntax highlighting
- Include meaningful examples and illustrations
- Use tables for structured data presentation
- Implement consistent cross-referencing

**Content Quality**
- Ensure accuracy through technical review
- Keep information current and relevant
- Provide complete, actionable information
- Include error handling and troubleshooting
- Validate all code examples and procedures

### Metadata Standards

#### Document Metadata Schema
\`\`\`yaml
# Document Metadata Template
metadata:
  title: "Document Title"
  type: "technical|business|quality|governance"
  category: "implementation|reference|process|guide"
  audience: "developer|user|admin|business|executive"
  complexity: "beginner|intermediate|advanced"
  version: "1.0.0"
  created_date: "YYYY-MM-DD"
  last_updated: "YYYY-MM-DD"
  author: "Author Name"
  reviewers: ["Reviewer1", "Reviewer2"]
  status: "draft|review|approved|archived"
  dependencies: ["doc1.md", "doc2.md"]
  related_documents: ["related1.md", "related2.md"]
  tags: ["tag1", "tag2", "tag3"]
  change_frequency: "static|monthly|weekly|as_needed"
  business_impact: "low|medium|high|critical"
  technical_impact: "low|medium|high|critical"
\`\`\`

## Content Management Framework

### Documentation Lifecycle

#### Creation Process
\`\`\`mermaid
graph TD
    A[Need Identified] --> B[Document Planning]
    B --> C[Content Creation]
    C --> D[Technical Review]
    D --> E{Review Passed?}
    E -->|No| F[Revise Content]
    F --> D
    E -->|Yes| G[Business Review]
    G --> H{Business Approval?}
    H -->|No| I[Address Business Concerns]
    I --> G
    H -->|Yes| J[Final Formatting]
    J --> K[Publication]
    K --> L[Index Update]
    L --> M[Distribution]
\`\`\`

#### Maintenance Process
\`\`\`mermaid
graph TD
    A[Scheduled Review] --> B[Content Assessment]
    B --> C{Update Needed?}
    C -->|No| D[Mark as Current]
    C -->|Yes| E[Update Content]
    E --> F[Review Changes]
    F --> G[Update Version]
    G --> H[Republish]
    H --> I[Update Cross-References]
    I --> J[Notify Stakeholders]
\`\`\`

### Version Control and Change Management

#### Versioning Strategy
\`\`\`
Version Format: MAJOR.MINOR.PATCH

MAJOR: Significant structural changes or complete rewrites
MINOR: New sections, substantial content additions
PATCH: Minor corrections, formatting, small updates

Examples:
1.0.0 - Initial release
1.1.0 - Added new section on security considerations  
1.1.1 - Fixed code examples and typos
2.0.0 - Complete restructure with new architecture
\`\`\`

#### Change Tracking
\`\`\`markdown
# Change Log Template

## [Version] - YYYY-MM-DD

### Added
- New features or sections

### Changed  
- Modifications to existing content

### Deprecated
- Features marked for removal

### Removed
- Deleted content or features

### Fixed
- Bug fixes and corrections

### Security
- Security-related changes
\`\`\`

## Knowledge Organization System

### Taxonomy and Tagging

#### Document Categories
\`\`\`yaml
primary_categories:
  technical:
    - architecture
    - implementation
    - reference
    - troubleshooting
  business:
    - processes
    - requirements
    - user_guides
    - training
  quality:
    - testing
    - compliance
    - security
    - standards
  governance:
    - policies
    - procedures
    - project_management
    - change_control

content_types:
  - guide
  - reference
  - tutorial
  - specification
  - checklist
  - template
  - example
  - faq

audience_types:
  - developer
  - system_administrator
  - business_user
  - project_manager
  - executive
  - end_user
  - support_team
  - auditor
\`\`\`

#### Tagging Strategy
\`\`\`yaml
tag_categories:
  technology:
    - mcp
    - javascript
    - nodejs
    - postgresql
    - api
    - rest
    - json
  
  business_domain:
    - customer_management
    - order_processing
    - inventory
    - financial
    - reporting
    - analytics
  
  process:
    - setup
    - configuration
    - deployment
    - testing
    - monitoring
    - troubleshooting
  
  complexity:
    - beginner
    - intermediate
    - advanced
    - expert
  
  priority:
    - critical
    - high
    - medium
    - low
\`\`\`

### Search and Discovery

#### Search Implementation
\`\`\`javascript
// Document Search Engine
class DocumentSearchEngine {
  constructor(documentIndex) {
    this.index = documentIndex;
    this.searchFilters = new Map();
    this.setupFilters();
  }
  
  setupFilters() {
    this.searchFilters.set('category', (docs, value) => 
      docs.filter(doc => doc.metadata.category === value));
    this.searchFilters.set('audience', (docs, value) => 
      docs.filter(doc => doc.metadata.audience.includes(value)));
    this.searchFilters.set('complexity', (docs, value) => 
      docs.filter(doc => doc.metadata.complexity === value));
    this.searchFilters.set('tags', (docs, value) => 
      docs.filter(doc => doc.metadata.tags.includes(value)));
  }
  
  search(query, filters = {}) {
    let results = this.performTextSearch(query);
    
    // Apply filters
    for (const [filterType, filterValue] of Object.entries(filters)) {
      const filterFunc = this.searchFilters.get(filterType);
      if (filterFunc) {
        results = filterFunc(results, filterValue);
      }
    }
    
    // Sort by relevance
    results = this.sortByRelevance(results, query);
    
    return {
      query,
      filters,
      totalResults: results.length,
      results: results.map(doc => ({
        title: doc.metadata.title,
        excerpt: this.generateExcerpt(doc.content, query),
        url: doc.url,
        category: doc.metadata.category,
        lastUpdated: doc.metadata.last_updated,
        relevanceScore: doc.relevanceScore
      }))
    };
  }
  
  performTextSearch(query) {
    const queryTerms = query.toLowerCase().split(' ');
    
    return this.index.documents.filter(doc => {
      const searchText = (
        doc.metadata.title + ' ' + 
        doc.content + ' ' + 
        doc.metadata.tags.join(' ')
      ).toLowerCase();
      
      return queryTerms.some(term => searchText.includes(term));
    });
  }
  
  generateExcerpt(content, query, maxLength = 200) {
    const queryTerms = query.toLowerCase().split(' ');
    const sentences = content.split('. ');
    
    // Find sentence containing query terms
    const relevantSentence = sentences.find(sentence => 
      queryTerms.some(term => sentence.toLowerCase().includes(term))
    );
    
    if (relevantSentence && relevantSentence.length <= maxLength) {
      return relevantSentence;
    }
    
    return content.substring(0, maxLength) + '...';
  }
}
\`\`\`

### Cross-Reference System

#### Relationship Mapping
\`\`\`javascript
// Document Relationship Manager
class DocumentRelationshipManager {
  constructor(documents) {
    this.documents = documents;
    this.relationships = new Map();
    this.buildRelationships();
  }
  
  buildRelationships() {
    for (const doc of this.documents) {
      const docId = doc.id;
      this.relationships.set(docId, {
        dependencies: doc.metadata.dependencies || [],
        related: doc.metadata.related_documents || [],
        references: this.extractReferences(doc.content),
        referencedBy: []
      });
    }
    
    // Build reverse references
    this.buildReverseReferences();
  }
  
  extractReferences(content) {
    const linkPattern = /\[([^\]]+)\]\(([^)]+\.md)\)/g;
    const references = [];
    let match;
    
    while ((match = linkPattern.exec(content)) !== null) {
      references.push({
        text: match[1],
        document: match[2]
      });
    }
    
    return references;
  }
  
  buildReverseReferences() {
    for (const [docId, relations] of this.relationships) {
      for (const ref of relations.references) {
        const referencedDocId = this.getDocumentIdByPath(ref.document);
        if (referencedDocId && this.relationships.has(referencedDocId)) {
          this.relationships.get(referencedDocId).referencedBy.push(docId);
        }
      }
    }
  }
  
  getRelatedDocuments(documentId, depth = 1) {
    if (depth <= 0) return [];
    
    const relations = this.relationships.get(documentId);
    if (!relations) return [];
    
    const related = new Set();
    
    // Add direct relationships
    relations.dependencies.forEach(dep => related.add(dep));
    relations.related.forEach(rel => related.add(rel));
    relations.referencedBy.forEach(ref => related.add(ref));
    
    // Add indirect relationships if depth > 1
    if (depth > 1) {
      for (const relatedDoc of related) {
        const indirectRelated = this.getRelatedDocuments(relatedDoc, depth - 1);
        indirectRelated.forEach(doc => related.add(doc));
      }
    }
    
    return Array.from(related).filter(id => id !== documentId);
  }
}
\`\`\`

## Quality Assurance Framework

### Content Quality Standards

#### Review Process
\`\`\`yaml
review_stages:
  technical_review:
    criteria:
      - Technical accuracy
      - Code examples work correctly
      - Architecture alignment
      - Security considerations
    reviewers: ["Senior Developer", "System Architect"]
    
  business_review:
    criteria:
      - Business value clarity
      - User experience considerations
      - Process accuracy
      - Compliance alignment
    reviewers: ["Business Analyst", "Product Manager"]
    
  editorial_review:
    criteria:
      - Writing clarity
      - Grammar and spelling
      - Formatting consistency
      - Style guide compliance
    reviewers: ["Technical Writer", "Documentation Manager"]
    
  final_approval:
    criteria:
      - Complete review completion
      - All issues addressed
      - Stakeholder sign-off
    approvers: ["Documentation Manager", "Project Lead"]
\`\`\`

#### Quality Metrics
\`\`\`javascript
// Documentation Quality Metrics
class DocumentationQualityMetrics {
  constructor(documents) {
    this.documents = documents;
  }
  
  calculateQualityScore(document) {
    const metrics = {
      completeness: this.assessCompleteness(document),
      accuracy: this.assessAccuracy(document),
      clarity: this.assessClarity(document),
      currency: this.assessCurrency(document),
      usability: this.assessUsability(document)
    };
    
    const weights = {
      completeness: 0.25,
      accuracy: 0.30,
      clarity: 0.20,
      currency: 0.15,
      usability: 0.10
    };
    
    const totalScore = Object.entries(metrics).reduce((total, [metric, score]) => {
      return total + (score * weights[metric]);
    }, 0);
    
    return {
      overallScore: Math.round(totalScore * 100) / 100,
      metrics,
      grade: this.assignGrade(totalScore),
      recommendations: this.generateRecommendations(metrics)
    };
  }
  
  assessCompleteness(document) {
    const requiredSections = ['Overview', 'Examples', 'Related Documentation'];
    const presentSections = requiredSections.filter(section => 
      document.content.includes(\`# \${section}\`) || 
      document.content.includes(\`## \${section}\`)
    );
    
    const hasMetadata = document.metadata && Object.keys(document.metadata).length > 5;
    const hasCodeExamples = document.content.includes('```');
    
    let score = presentSections.length / requiredSections.length;
    if (hasMetadata) score += 0.1;
    if (hasCodeExamples) score += 0.1;
    
    return Math.min(score, 1.0);
  }
  
  assessAccuracy(document) {
    // In real implementation, this would integrate with:
    // - Code validation systems
    // - Link checking
    // - Technical review results
    // - User feedback on accuracy
    
    const lastReviewDate = new Date(document.metadata.last_updated);
    const daysSinceReview = (Date.now() - lastReviewDate) / (1000 * 60 * 60 * 24);
    
    // Assume accuracy decreases over time without review
    let score = 1.0;
    if (daysSinceReview > 90) score -= 0.2;
    if (daysSinceReview > 180) score -= 0.3;
    if (daysSinceReview > 365) score -= 0.4;
    
    return Math.max(score, 0.1);
  }
  
  assessClarity(document) {
    const content = document.content;
    const wordCount = content.split(' ').length;
    const sentenceCount = content.split('.').length;
    const averageWordsPerSentence = wordCount / sentenceCount;
    
    // Optimal range: 15-20 words per sentence
    let clarityScore = 1.0;
    if (averageWordsPerSentence > 25) clarityScore -= 0.3;
    if (averageWordsPerSentence > 30) clarityScore -= 0.4;
    if (averageWordsPerSentence < 10) clarityScore -= 0.2;
    
    // Check for clear structure
    const hasTableOfContents = content.includes('Table of Contents');
    const hasHeaders = (content.match(/^#{1,6} /gm) || []).length > 3;
    
    if (hasTableOfContents) clarityScore += 0.1;
    if (hasHeaders) clarityScore += 0.1;
    
    return Math.min(clarityScore, 1.0);
  }
}
\`\`\`

## Integration with MCP Ecosystem

### MCP Resource Integration

#### Documentation as MCP Resources
\`\`\`javascript
// Documentation MCP Resource Provider
export class DocumentationResourceProvider {
  constructor(documentationSystem) {
    this.docs = documentationSystem;
    this.resourceMap = this.buildResourceMap();
  }
  
  buildResourceMap() {
    const map = new Map();
    
    for (const doc of this.docs.getAllDocuments()) {
      const uri = \`documentation://\${doc.metadata.category}/\${doc.id}\`;
      map.set(uri, {
        content: doc.content,
        metadata: doc.metadata,
        lastUpdated: doc.metadata.last_updated
      });
    }
    
    // Add special aggregated resources
    map.set('documentation://index/all', this.buildDocumentIndex());
    map.set('documentation://search/interface', this.buildSearchInterface());
    map.set('documentation://metrics/quality', this.buildQualityMetrics());
    
    return map;
  }
  
  async getResource(uri) {
    const resource = this.resourceMap.get(uri);
    if (!resource) {
      throw new Error(\`Documentation resource not found: \${uri}\`);
    }
    
    return {
      uri,
      mimeType: this.getMimeType(uri),
      contents: [{
        type: "text",
        text: typeof resource.content === 'string' ? 
          resource.content : JSON.stringify(resource.content, null, 2)
      }]
    };
  }
  
  listResources() {
    return Array.from(this.resourceMap.keys()).map(uri => {
      const resource = this.resourceMap.get(uri);
      return {
        uri,
        name: this.getResourceName(uri, resource),
        description: this.getResourceDescription(uri, resource),
        mimeType: this.getMimeType(uri)
      };
    });
  }
  
  buildDocumentIndex() {
    return {
      title: "Documentation Index",
      description: "Complete index of all documentation",
      categories: this.docs.getCategories(),
      documents: this.docs.getAllDocuments().map(doc => ({
        id: doc.id,
        title: doc.metadata.title,
        category: doc.metadata.category,
        audience: doc.metadata.audience,
        lastUpdated: doc.metadata.last_updated,
        uri: \`documentation://\${doc.metadata.category}/\${doc.id}\`
      })),
      statistics: {
        totalDocuments: this.docs.getTotalDocumentCount(),
        categoryCounts: this.docs.getCategoryCounts(),
        lastUpdated: new Date().toISOString()
      }
    };
  }
}
\`\`\`

### Cross-Server Documentation Discovery

#### Documentation Discovery Service
\`\`\`javascript
// Cross-Server Documentation Discovery
export class CrossServerDocumentationDiscovery {
  constructor(mcpServers) {
    this.servers = mcpServers;
    this.documentationCache = new Map();
  }
  
  async discoverAllDocumentation() {
    const allDocumentation = new Map();
    
    for (const server of this.servers) {
      try {
        const serverDocs = await this.discoverServerDocumentation(server);
        allDocumentation.set(server.name, serverDocs);
      } catch (error) {
        console.error(\`Failed to discover documentation from \${server.name}:\`, error);
      }
    }
    
    return this.buildUnifiedDocumentationMap(allDocumentation);
  }
  
  async discoverServerDocumentation(server) {
    const resources = await server.listResources();
    const documentationResources = resources.filter(resource => 
      resource.uri.startsWith('documentation://') ||
      resource.description.toLowerCase().includes('documentation') ||
      resource.name.toLowerCase().includes('guide') ||
      resource.name.toLowerCase().includes('reference')
    );
    
    const serverDocs = [];
    
    for (const resource of documentationResources) {
      try {
        const content = await server.readResource(resource.uri);
        serverDocs.push({
          uri: resource.uri,
          name: resource.name,
          description: resource.description,
          content: content.contents[0].text,
          server: server.name,
          lastAccessed: new Date().toISOString()
        });
      } catch (error) {
        console.error(\`Failed to read resource \${resource.uri}:\`, error);
      }
    }
    
    return serverDocs;
  }
  
  buildUnifiedDocumentationMap(serverDocumentation) {
    const unifiedMap = {
      servers: Array.from(serverDocumentation.keys()),
      totalDocuments: 0,
      documentsByServer: {},
      documentsByCategory: {},
      crossReferences: this.findCrossReferences(serverDocumentation),
      lastUpdated: new Date().toISOString()
    };
    
    for (const [serverName, docs] of serverDocumentation) {
      unifiedMap.documentsByServer[serverName] = docs;
      unifiedMap.totalDocuments += docs.length;
      
      // Categorize documents
      for (const doc of docs) {
        const category = this.extractCategory(doc.uri);
        if (!unifiedMap.documentsByCategory[category]) {
          unifiedMap.documentsByCategory[category] = [];
        }
        unifiedMap.documentsByCategory[category].push({
          ...doc,
          category
        });
      }
    }
    
    return unifiedMap;
  }
  
  findCrossReferences(serverDocumentation) {
    const crossRefs = [];
    
    for (const [sourceServer, sourceDocs] of serverDocumentation) {
      for (const sourceDoc of sourceDocs) {
        for (const [targetServer, targetDocs] of serverDocumentation) {
          if (sourceServer !== targetServer) {
            for (const targetDoc of targetDocs) {
              if (this.hasReference(sourceDoc.content, targetDoc)) {
                crossRefs.push({
                  from: {
                    server: sourceServer,
                    document: sourceDoc.uri,
                    name: sourceDoc.name
                  },
                  to: {
                    server: targetServer,
                    document: targetDoc.uri,
                    name: targetDoc.name
                  },
                  referenceType: this.determineReferenceType(sourceDoc.content, targetDoc)
                });
              }
            }
          }
        }
      }
    }
    
    return crossRefs;
  }
}
\`\`\`

## Maintenance and Governance

### Documentation Maintenance Schedule

#### Regular Maintenance Tasks
\`\`\`yaml
daily_tasks:
  - Link validation checks
  - New content notifications
  - User feedback monitoring
  - Search analytics review

weekly_tasks:
  - Content quality assessments
  - Cross-reference validation
  - User engagement metrics
  - Knowledge gap identification

monthly_tasks:
  - Comprehensive content review
  - Stakeholder feedback collection
  - Documentation usage analytics
  - Process improvement planning

quarterly_tasks:
  - Full documentation audit
  - Technology relevance review
  - User needs assessment
  - Strategic planning updates

annual_tasks:
  - Documentation strategy review
  - Tool and platform evaluation
  - Comprehensive reorganization
  - Best practices benchmarking
\`\`\`

### Governance Framework

#### Documentation Governance Structure
\`\`\`yaml
governance_roles:
  documentation_steering_committee:
    members: ["CTO", "VP Engineering", "Head of Product"]
    responsibilities:
      - Strategic documentation direction
      - Resource allocation decisions
      - Quality standards approval
      - Cross-functional coordination
    
  documentation_manager:
    responsibilities:
      - Daily documentation operations
      - Quality assurance oversight
      - Process improvement leadership
      - Stakeholder coordination
    
  content_owners:
    by_category:
      technical: "Senior Developers, Architects"
      business: "Business Analysts, Product Managers"
      quality: "QA Leads, Compliance Officers"
      governance: "Project Managers, Process Owners"
    
  content_contributors:
    responsibilities:
      - Content creation and updates
      - Technical accuracy validation
      - User feedback incorporation
      - Continuous improvement participation
    
  content_reviewers:
    responsibilities:
      - Quality validation
      - Standards compliance checking
      - Cross-reference verification
      - Approval workflow participation
\`\`\`

## Success Metrics and KPIs

### Documentation Effectiveness Metrics

#### Usage and Engagement
\`\`\`yaml
usage_metrics:
  document_views:
    measurement: "Monthly page views per document"
    target: ">100 views for critical documents"
    
  search_success_rate:
    measurement: "Percentage of searches resulting in document access"
    target: ">85% success rate"
    
  user_satisfaction:
    measurement: "Average rating on documentation usefulness"
    target: ">4.0/5.0 rating"
    
  task_completion_rate:
    measurement: "Percentage of users completing tasks using documentation"
    target: ">90% completion rate"

quality_metrics:
  content_accuracy:
    measurement: "Percentage of documents with no reported errors"
    target: ">95% accuracy rate"
    
  content_currency:
    measurement: "Percentage of documents updated within target timeframe"
    target: ">90% current documents"
    
  cross_reference_integrity:
    measurement: "Percentage of working internal links"
    target: "100% working links"
    
  review_compliance:
    measurement: "Percentage of documents following review process"
    target: "100% compliance"

business_impact:
  support_ticket_reduction:
    measurement: "Reduction in documentation-related support requests"
    target: "-50% year-over-year"
    
  onboarding_efficiency:
    measurement: "Time to productivity for new team members"
    target: "<2 weeks to basic proficiency"
    
  knowledge_transfer_speed:
    measurement: "Time to transfer knowledge between team members"
    target: "<1 day for standard procedures"
    
  compliance_readiness:
    measurement: "Time to prepare for audits/compliance reviews"
    target: "<1 week preparation time"
\`\`\`

## Quick Start References

For immediate deployment and getting started:
- **mcp://mcp-documentation/deployment/quick-start-deployment** - Deploy all MCP servers in 2 minutes
- **mcp://mcp-documentation/deployment/claude-code-registration-guide** - Complete registration guide with scope management

These deployment guides bridge the critical gap between having MCP servers and actually accessing them through Claude Code.

This Unified Documentation System provides the comprehensive framework necessary to maintain world-class documentation that scales with organizational growth while ensuring consistency, quality, and accessibility across the entire MCP ERP ecosystem.
`;