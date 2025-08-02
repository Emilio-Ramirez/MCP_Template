export default `# Client Delivery Workflow

## Phase 1: Project Kickoff (Week 1)

### Day 1-2: Environment Setup
- [ ] Clone project template using agency://templates/project-structure
- [ ] Configure AWS infrastructure using ibso://infrastructure/terraform-deploy
- [ ] Set up CI/CD pipeline using ibso://deployment/3-minute-process
- [ ] Create staging environment and verify deployment

### Day 3-5: Foundation Development
- [ ] Implement authentication using @template:patterns/role-based-auth
- [ ] Set up database schema and migrations
- [ ] Create basic dashboard using @template:components/shadcn-dashboard
- [ ] Implement API routes using @template:patterns/api-routes

## Phase 2: Core Development (Week 2-3)

### Week 2: Feature Implementation
- [ ] Build core business logic components
- [ ] Implement data tables using @template:components/data-table
- [ ] Add user management and permissions
- [ ] Create client-specific customizations
- [ ] Daily standups with client stakeholders

### Week 3: Integration & Testing
- [ ] Integrate third-party APIs and services
- [ ] Implement comprehensive test suite
- [ ] Performance optimization and caching
- [ ] Security audit using ibso://security/compliance-framework
- [ ] Client review and feedback incorporation

## Phase 3: Pre-Launch (Week 4)

### Testing & QA
- [ ] Unit test coverage ≥ 80%
- [ ] Integration testing with external services
- [ ] End-to-end user journey testing
- [ ] Load testing and performance validation
- [ ] Security penetration testing

### Production Preparation
- [ ] Production environment deployment
- [ ] DNS and SSL certificate configuration
- [ ] Monitoring setup using ibso://monitoring/observability-stack
- [ ] Backup and disaster recovery testing
- [ ] Client training and documentation

## Phase 4: Launch & Handoff (Week 5)

### Go-Live Process
- [ ] Final client approval and sign-off
- [ ] Production deployment using 3-minute process
- [ ] Real-time monitoring and health checks
- [ ] Launch announcement and user communication
- [ ] 24/7 monitoring for first 48 hours

### Post-Launch Support
- [ ] Daily health check reports for first week
- [ ] Weekly performance and usage reports
- [ ] Client success metrics review
- [ ] 30-day warranty period begins
- [ ] Knowledge transfer to client team

## Quality Gates

### Code Quality
- ESLint score: 0 errors, <5 warnings
- TypeScript strict mode enabled
- Test coverage ≥ 80%
- No critical security vulnerabilities

### Performance
- Lighthouse performance score ≥ 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Core Web Vitals passing

### Security
- All OWASP Top 10 vulnerabilities addressed
- Data encryption at rest and in transit
- Regular security scanning integrated
- Compliance framework implemented`;