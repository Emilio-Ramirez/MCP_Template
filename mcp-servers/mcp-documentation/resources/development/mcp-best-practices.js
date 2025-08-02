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