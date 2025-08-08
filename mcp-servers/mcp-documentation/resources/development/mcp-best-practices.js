export default `# MCP Development Best Practices

## Server Development Guidelines

### 1. Modular Architecture
- **Keep main server minimal**: < 100 lines of orchestration code
- **Separate concerns**: Config, resources, prompts, and utilities in separate modules
- **Use consistent exports**: Always \`export default\` for resources
- **Organize by category**: Group related resources in logical directories

### 2. Resource Design
- **Descriptive URIs**: Use clear, hierarchical URI schemes (e.g., \`namespace://category/resource-name\`)
- **Comprehensive metadata**: Include helpful names and descriptions
- **Markdown format**: Use markdown for rich documentation with code examples
- **Atomic resources**: Each resource should be focused and self-contained

### 3. Configuration Management
- **Centralized config**: Use \`config/server-config.js\` for server metadata
- **Resource manifest**: Maintain complete resource inventory in \`config/resource-manifest.js\`
- **Version management**: Use semantic versioning for server compatibility
- **Environment handling**: Support different environments (dev, staging, prod)

### 4. Error Handling
- **Graceful degradation**: Handle missing resources without crashing
- **Consistent error messages**: Use standardized error response format
- **Validation**: Validate URIs and parameters before processing
- **Logging**: Include appropriate logging for debugging

### 5. Testing Strategy
- **Unit tests**: Test individual resource loading and formatting
- **Integration tests**: Verify MCP protocol compliance
- **Resource validation**: Ensure all declared resources are accessible
- **Performance tests**: Monitor response times and memory usage

## Resource Development

### Content Guidelines
- **Rich documentation**: Include examples, code snippets, and use cases
- **Clear structure**: Use consistent heading hierarchy and formatting
- **Cross-references**: Link to related resources and external documentation
- **Practical examples**: Provide concrete implementation examples

### Code Examples
- **Complete examples**: Show full working implementations
- **Multiple approaches**: Demonstrate different ways to solve problems
- **Best practices**: Highlight recommended approaches
- **Anti-patterns**: Document what to avoid and why

### Maintenance
- **Regular updates**: Keep content current with technology changes
- **User feedback**: Incorporate feedback from resource users
- **Version control**: Track changes and maintain backward compatibility
- **Deprecation**: Handle outdated patterns gracefully

## Performance Optimization

### Resource Loading
- **Lazy loading**: Load resources only when requested
- **Caching**: Cache frequently accessed resources
- **Compression**: Use efficient content encoding
- **Batch operations**: Support bulk resource operations when possible

### Memory Management
- **Resource cleanup**: Release resources after use
- **Memory monitoring**: Track memory usage patterns
- **Garbage collection**: Ensure proper cleanup of temporary objects
- **Memory leaks**: Monitor and prevent memory leaks

## Security Considerations

### Access Control
- **Resource permissions**: Implement appropriate access controls
- **Input validation**: Validate all input parameters
- **Output sanitization**: Ensure output is safe for consumption
- **Audit logging**: Log access patterns for security monitoring

### Data Protection
- **Sensitive data**: Avoid including secrets or sensitive information
- **Data minimization**: Include only necessary information in resources
- **Encryption**: Use encryption for sensitive data transmission
- **Privacy**: Respect user privacy in resource content

## Agent Integration Patterns

### Agent Instruction Optimization
**Discovery**: Massive agent instruction reduction (750+ lines → 58 lines) while improving performance.

**Optimization Strategies**:
- **Focus on critical behaviors**: Eliminate redundant explanations and focus on essential decision points
- **Procedural clarity**: Clear step-by-step processes instead of verbose explanations
- **Context-aware responses**: Design instructions that adapt to request type and context
- **Error prevention**: Target common failure patterns with precise behavioral guidance

**Key Learnings**:
- Verbose instructions don't improve performance - they create cognitive overhead
- Specific behavioral patterns (navigation, file operations, decision trees) are more effective than general guidelines
- Agent performance improves dramatically when instructions focus on "what to do" rather than "why to do it"

### Content Delivery Patterns

**Two-Phase Developer Workflow Discovery**:
1. **Discovery Phase**: Developer requests overview/exploration ("Show me form bundle")
   - Agent provides architectural context and structure
   - Includes pattern explanations and decision rationale
   - Focuses on understanding and planning
2. **Implementation Phase**: Developer requests specific code ("I need TypeScript code for X")
   - Agent provides raw, immediately usable code
   - Minimal explanation, maximum implementation value
   - Direct copy-paste ready solutions

**Content Delivery Rules**:
- **Bundle Overview Requests**: Return architectural context + patterns + structure explanation
- **Raw Code Requests**: Return implementation code with minimal wrapper text
- **Discovery Requests**: Focus on helping developer understand available options
- **Implementation Requests**: Focus on providing working, tested code examples

### Developer Experience Design Principles

**Request Classification**:
```
📥 INCOMING REQUEST
│
├── 🔍 EXPLORATION REQUEST? ("What patterns exist?", "Show me options")
│   └── → Provide comprehensive architectural context
│       ├── Available patterns and their use cases  
│       ├── Decision framework for pattern selection
│       └── Implementation planning guidance
│
└── ⚡ IMPLEMENTATION REQUEST? ("I need code for X", "Give me TypeScript")
    └── → Provide raw implementation code
        ├── Working code examples ready for use
        ├── Minimal explanatory wrapper
        └── Focus on immediate productivity
```

**Developer Experience Optimization**:
- **Context Switching Reduction**: Provide complete packages that minimize back-and-forth
- **Progressive Disclosure**: Start with overview, drill down to implementation on demand
- **Copy-Paste Optimization**: Ensure code examples work without modification
- **Decision Support**: Help developers choose appropriate patterns before implementation

### MCP Resource Structure Optimization

**Discovered Patterns**:
- **Main Bundles**: Core implementation packages (design-system-bundle, table-page-bundle, form-bundle)
- **Bundle Templates**: Quick-start templates extracted from main bundles
- **Specialized Components**: Focused implementations for specific use cases
- **Cross-Bundle Dependencies**: Shared foundation patterns (design-system-bundle as dependency)

**Resource Organization Best Practices**:
```
bundles/
├── [system]-bundle.js           # Complete implementation package
│   ├── Overview & Architecture  # Context for discovery phase
│   ├── Implementation Patterns  # Code for implementation phase
│   ├── Templates & Examples     # Ready-to-use starting points
│   └── Integration Guidelines   # Connection to other bundles
│
├── templates/
│   └── [system]-quick-start.js  # Extracted quick-start patterns
│
└── components/
    └── [specific-feature].js    # Specialized implementations
```

**Bundle Architecture Rules**:
- **Self-Contained**: Each bundle includes everything needed for its domain
- **Dependency Declaration**: Clear references to required shared bundles (design-system)
- **Template Extraction**: Quick-start patterns can be extracted for rapid prototyping
- **Progressive Complexity**: Simple templates → full bundles → specialized components

### Root Cause Analysis Methodology

**Agent Debugging Framework**:
1. **Instruction Analysis**: Review agent instructions for clarity and specificity
2. **Pattern Matching**: Identify if agent is following expected decision patterns
3. **Content Structure Review**: Verify MCP resources provide appropriate content for request types
4. **Integration Testing**: Test agent performance across discovery → implementation workflow
5. **Performance Measurement**: Compare response quality against developer productivity metrics

**Common Issues and Solutions**:
- **Issue**: Agent provides summaries when developers need raw code
  - **Solution**: Implement request classification pattern for content delivery
- **Issue**: Agent gets confused by overly complex instructions
  - **Solution**: Reduce instruction complexity, focus on behavioral patterns
- **Issue**: Developers can't find appropriate patterns
  - **Solution**: Improve bundle overview sections with clear pattern categorization
- **Issue**: Implementation code doesn't work out-of-the-box  
  - **Solution**: Test all code examples and ensure dependency declarations are complete

**Performance Indicators**:
- **Discovery Efficiency**: Time from question to pattern understanding
- **Implementation Speed**: Time from pattern selection to working code
- **Context Retention**: Agent maintains context across discovery → implementation phases
- **Code Quality**: Generated implementations work without modification
- **Developer Satisfaction**: Reduced frustration, increased productivity

### Agent-MCP Ecosystem Integration

**Best Practices for Agent-Resource Alignment**:
- **Resource Structure**: Organize MCP resources to support both discovery and implementation workflows
- **Content Density**: Balance comprehensive information with focused implementation guidance  
- **Cross-References**: Ensure smooth navigation between related patterns and bundles
- **Update Coordination**: Keep agent instructions synchronized with MCP resource organization
- **Testing Integration**: Validate agent performance against actual developer workflows

**Ecosystem Health Indicators**:
- Agent can navigate resource structure without confusion
- Developers can move from exploration to implementation seamlessly
- MCP resources provide appropriate content depth for request context
- Cross-server references work correctly and add value
- Performance remains optimal as resource count scales

## Integration Patterns

### Cross-Server Communication
- **URI conventions**: Use consistent URI schemes across servers
- **Version compatibility**: Maintain compatibility across server versions
- **Discovery mechanisms**: Support automated resource discovery
- **Dependency management**: Handle server dependencies gracefully

### AI Integration
- **Training-friendly format**: Structure content for AI consumption
- **Consistent patterns**: Use consistent formatting and terminology
- **Context preservation**: Maintain context across related resources
- **Feedback loops**: Enable AI feedback for content improvement

## Deployment Best Practices

### Claude Code Registration
**Critical**: MCP servers must be registered with Claude Code to be accessible.
- **Quick Start Guide**: See mcp://mcp-documentation/deployment/quick-start-deployment for 2-minute deployment
- **Registration Guide**: See mcp://mcp-documentation/deployment/claude-code-registration-guide for comprehensive setup
- **Scope Selection**: Choose appropriate scope (local, user, or project) based on usage needs
- **Team Deployment**: Use project scope for team-shared servers

### Production Readiness
- **Health checks**: Implement server health monitoring
- **Graceful shutdown**: Handle shutdown signals properly
- **Configuration validation**: Validate configuration at startup
- **Dependency checks**: Verify all dependencies are available

### Monitoring and Observability
- **Metrics collection**: Track usage patterns and performance metrics
- **Error monitoring**: Monitor and alert on errors
- **Performance monitoring**: Track response times and resource usage
- **User analytics**: Understand how resources are being used

### Maintenance and Updates
- **Zero-downtime updates**: Support rolling updates
- **Rollback capability**: Enable quick rollback if issues occur
- **Database migrations**: Handle schema changes safely
- **Configuration updates**: Support dynamic configuration updates

## Documentation Standards

### Resource Documentation
- **Clear titles**: Use descriptive, searchable titles
- **Structured content**: Organize with consistent heading hierarchy
- **Code examples**: Include working code examples
- **Use cases**: Describe when and how to use each resource

### API Documentation
- **Complete coverage**: Document all endpoints and parameters
- **Example requests**: Show request/response examples
- **Error scenarios**: Document error conditions and responses
- **Rate limits**: Document any usage limitations

### Change Management
- **Change logs**: Maintain detailed change logs
- **Migration guides**: Provide migration paths for breaking changes
- **Deprecation notices**: Give advance notice of deprecations
- **Version compatibility**: Document version compatibility matrix

These best practices ensure that MCP servers are reliable, maintainable, and provide excellent developer experience while integrating seamlessly with the broader ecosystem.`;