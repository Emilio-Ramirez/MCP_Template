export default `# Client Project Deployment Strategies - IBSO Enterprise Operations

This document outlines comprehensive deployment strategies for IBSO client projects, covering infrastructure patterns, deployment pipelines, monitoring setup, and operational best practices for enterprise-grade applications.

## 🏗️ Deployment Architecture Overview

### Multi-Environment Strategy
\`\`\`typescript
interface DeploymentEnvironments {
  // Development environment
  development: {
    purpose: 'Active development and feature testing';
    infrastructure: 'Local development servers + shared services';
    deployment: 'Manual deployment for testing';
    data: 'Mock data and development fixtures';
    monitoring: 'Basic logging and error tracking';
  };
  
  // Staging environment
  staging: {
    purpose: 'Pre-production testing and client validation';
    infrastructure: 'Production-like environment with reduced capacity';
    deployment: 'Automated deployment from develop branch';
    data: 'Sanitized production data or comprehensive test data';
    monitoring: 'Full monitoring stack with alerts';
  };
  
  // Production environment
  production: {
    purpose: 'Live client operations';
    infrastructure: 'High-availability, scalable infrastructure';
    deployment: 'Controlled deployment with rollback capability';
    data: 'Live production data with full backup strategy';
    monitoring: 'Comprehensive monitoring, alerting, and observability';
  };
}
\`\`\`

### Cloud Provider Strategy
\`\`\`typescript
interface CloudProviderStrategy {
  // Primary provider (AWS)
  primary: {
    provider: 'Amazon Web Services';
    regions: ['us-east-1', 'us-west-2'];  // Multi-region for DR
    services: {
      compute: 'ECS Fargate + EC2 for specific workloads';
      database: 'RDS PostgreSQL with Multi-AZ';
      storage: 'S3 for static assets and file storage';
      cdn: 'CloudFront for global content delivery';
      monitoring: 'CloudWatch + X-Ray for distributed tracing';
      security: 'WAF + Shield + IAM for access control';
    };
  };
  
  // Alternative provider (Azure)
  alternative: {
    provider: 'Microsoft Azure';
    purpose: 'Disaster recovery and specific client requirements';
    regions: ['East US', 'West US 2'];
    services: {
      compute: 'Container Instances + App Service';
      database: 'Azure Database for PostgreSQL';
      storage: 'Azure Blob Storage';
      cdn: 'Azure CDN';
      monitoring: 'Azure Monitor + Application Insights';
    };
  };
}
\`\`\`

## 🚀 Containerization Strategy

### Docker Architecture
\`\`\`dockerfile
# Dockerfile - Multi-stage build for Next.js applications
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build application
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME localhost

CMD ["node", "server.js"]
\`\`\`

### Container Orchestration
\`\`\`yaml
# docker-compose.yml - Local development environment
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: development
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@db:5432/dbname
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
      - redis
    
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: dbname
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
\`\`\`

## ☁️ AWS Infrastructure as Code

### Terraform Configuration
\`\`\`hcl
# terraform/main.tf - Complete AWS infrastructure
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket = "ibso-terraform-state"
    key    = "client-projects/vitracoat/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "terraform"
      Client      = var.client_name
    }
  }
}

# VPC and Networking
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  
  name = "\${var.project_name}-\${var.environment}"
  cidr = var.vpc_cidr
  
  azs             = var.availability_zones
  private_subnets = var.private_subnet_cidrs
  public_subnets  = var.public_subnet_cidrs
  
  enable_nat_gateway = true
  enable_vpn_gateway = true
  enable_dns_hostnames = true
  enable_dns_support = true
  
  tags = {
    Name = "\${var.project_name}-\${var.environment}-vpc"
  }
}

# Application Load Balancer
resource "aws_lb" "main" {
  name               = "\${var.project_name}-\${var.environment}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets           = module.vpc.public_subnets
  
  enable_deletion_protection = var.environment == "production"
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "\${var.project_name}-\${var.environment}"
  
  configuration {
    execute_command_configuration {
      logging = "OVERRIDE"
      
      log_configuration {
        cloud_watch_log_group_name = aws_cloudwatch_log_group.ecs.name
      }
    }
  }
}

# RDS Database
resource "aws_db_instance" "main" {
  identifier = "\${var.project_name}-\${var.environment}-db"
  
  engine         = "postgres"
  engine_version = "15.4"
  instance_class = var.db_instance_class
  
  allocated_storage     = var.db_allocated_storage
  max_allocated_storage = var.db_max_allocated_storage
  storage_encrypted     = true
  
  db_name  = var.db_name
  username = var.db_username
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = var.environment == "production" ? 30 : 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  multi_az = var.environment == "production"
  
  skip_final_snapshot = var.environment != "production"
  
  tags = {
    Name = "\${var.project_name}-\${var.environment}-database"
  }
}
\`\`\`

### ECS Service Configuration
\`\`\`hcl
# terraform/ecs.tf - ECS Fargate service configuration
resource "aws_ecs_task_definition" "app" {
  family                   = "\${var.project_name}-\${var.environment}"
  requires_compatibilities = ["FARGATE"]
  network_mode            = "awsvpc"
  cpu                     = var.ecs_cpu
  memory                  = var.ecs_memory
  execution_role_arn      = aws_iam_role.ecs_execution.arn
  task_role_arn          = aws_iam_role.ecs_task.arn
  
  container_definitions = jsonencode([
    {
      name  = "app"
      image = "\${var.ecr_repository_url}:latest"
      
      portMappings = [
        {
          containerPort = 3000
          protocol      = "tcp"
        }
      ]
      
      environment = [
        {
          name  = "NODE_ENV"
          value = var.environment
        },
        {
          name  = "DATABASE_URL"
          value = "postgresql://\${var.db_username}:\${var.db_password}@\${aws_db_instance.main.endpoint}/\${var.db_name}"
        }
      ]
      
      secrets = [
        {
          name      = "CLERK_SECRET_KEY"
          valueFrom = aws_ssm_parameter.clerk_secret.arn
        }
      ]
      
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.app.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
      
      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:3000/api/health || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    }
  ])
}

resource "aws_ecs_service" "app" {
  name            = "\${var.project_name}-\${var.environment}"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.ecs_desired_count
  launch_type     = "FARGATE"
  
  network_configuration {
    subnets          = module.vpc.private_subnets
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = false
  }
  
  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = "app"
    container_port   = 3000
  }
  
  deployment_configuration {
    maximum_percent         = 200
    minimum_healthy_percent = 100
  }
  
  depends_on = [aws_lb_listener.app]
}
\`\`\`

## 🔄 CI/CD Pipeline Architecture

### GitHub Actions Workflow
\`\`\`yaml
# .github/workflows/deploy.yml - Complete deployment pipeline
name: Deploy to AWS

on:
  push:
    branches:
      - main
      - develop
  pull_request:
    branches:
      - main

env:
  AWS_REGION: us-east-1
  ECR_REPOSITORY: vitracoat-app

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run linting
        run: npm run lint
        
      - name: Run type checking
        run: npm run type-check
        
      - name: Run unit tests
        run: npm run test:coverage
        
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        
      - name: Build application
        run: npm run build
        
      - name: Run E2E tests
        run: |
          npm run test:e2e
          
  security:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Run security audit
        run: npm audit --audit-level=high
        
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
          
  build-and-deploy:
    needs: [test, security]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: \${{ env.AWS_REGION }}
          
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2
        
      - name: Build, tag, and push image to Amazon ECR
        env:
          ECR_REGISTRY: \${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: \${{ github.sha }}
        run: |
          docker build -t \$ECR_REGISTRY/\$ECR_REPOSITORY:\$IMAGE_TAG .
          docker push \$ECR_REGISTRY/\$ECR_REPOSITORY:\$IMAGE_TAG
          docker tag \$ECR_REGISTRY/\$ECR_REPOSITORY:\$IMAGE_TAG \$ECR_REGISTRY/\$ECR_REPOSITORY:latest
          docker push \$ECR_REGISTRY/\$ECR_REPOSITORY:latest
          
      - name: Deploy to staging
        if: github.ref == 'refs/heads/develop'
        run: |
          aws ecs update-service --cluster vitracoat-staging --service vitracoat-staging --force-new-deployment
          
      - name: Deploy to production
        if: github.ref == 'refs/heads/main'
        run: |
          aws ecs update-service --cluster vitracoat-production --service vitracoat-production --force-new-deployment
          
      - name: Wait for deployment
        run: |
          ENV=\${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
          aws ecs wait services-stable --cluster vitracoat-\$ENV --services vitracoat-\$ENV
          
      - name: Run smoke tests
        run: |
          ENV=\${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
          npm run test:smoke -- --env=\$ENV
\`\`\`

### Blue-Green Deployment Strategy
\`\`\`typescript
interface BlueGreenDeployment {
  // Deployment phases
  phases: {
    preparation: {
      description: 'Prepare green environment with new version';
      steps: [
        'Deploy new version to green environment',
        'Run health checks on green environment',
        'Execute smoke tests on green environment',
        'Validate database migrations if needed'
      ];
    };
    
    switch: {
      description: 'Switch traffic from blue to green';
      steps: [
        'Update load balancer to route traffic to green',
        'Monitor application metrics and error rates',
        'Verify all services are functioning correctly',
        'Wait for confirmation period (15 minutes)'
      ];
    };
    
    cleanup: {
      description: 'Clean up old blue environment';
      steps: [
        'Keep blue environment for rollback period (4 hours)',
        'If no issues, decommission blue environment',
        'Update monitoring to point to new green environment',
        'Archive deployment logs and metrics'
      ];
    };
  };
  
  // Rollback strategy
  rollback: {
    triggers: [
      'Health check failures',
      'Increased error rates (>1%)',
      'Performance degradation (>50% slower)',
      'Manual intervention required'
    ];
    
    process: [
      'Immediately switch traffic back to blue environment',
      'Investigate issues with green environment',
      'Fix issues and redeploy to green environment',
      'Notify stakeholders of rollback and timeline'
    ];
  };
}
\`\`\`

## 📊 Monitoring and Observability

### Application Performance Monitoring
\`\`\`typescript
// src/lib/monitoring.ts - APM integration
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

// Initialize OpenTelemetry
const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'vitracoat-app',
    [SemanticResourceAttributes.SERVICE_VERSION]: process.env.APP_VERSION || '1.0.0',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV,
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

// Custom metrics
import { metrics } from '@opentelemetry/api';

const meter = metrics.getMeter('vitracoat-app');

// Business metrics
export const businessMetrics = {
  requestsProcessed: meter.createCounter('requests_processed_total', {
    description: 'Total number of requests processed',
  }),
  
  formSubmissions: meter.createCounter('form_submissions_total', {
    description: 'Total number of form submissions',
  }),
  
  userSessions: meter.createHistogram('user_session_duration_seconds', {
    description: 'User session duration in seconds',
  }),
};
\`\`\`

### CloudWatch Dashboard Configuration
\`\`\`hcl
# terraform/monitoring.tf - CloudWatch dashboards and alarms
resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = "\${var.project_name}-\${var.environment}"
  
  dashboard_body = jsonencode({
    widgets = [
      {
        type   = "metric"
        x      = 0
        y      = 0
        width  = 12
        height = 6
        
        properties = {
          metrics = [
            ["AWS/ECS", "CPUUtilization", "ServiceName", aws_ecs_service.app.name],
            [".", "MemoryUtilization", ".", "."],
          ]
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          title   = "ECS Resource Utilization"
          period  = 300
        }
      },
      {
        type   = "metric"
        x      = 0
        y      = 6
        width  = 12
        height = 6
        
        properties = {
          metrics = [
            ["AWS/ApplicationELB", "RequestCount", "LoadBalancer", aws_lb.main.arn_suffix],
            [".", "TargetResponseTime", ".", "."],
            [".", "HTTPCode_Target_2XX_Count", ".", "."],
            [".", "HTTPCode_Target_4XX_Count", ".", "."],
            [".", "HTTPCode_Target_5XX_Count", ".", "."],
          ]
          view   = "timeSeries"
          region = var.aws_region
          title  = "Application Load Balancer Metrics"
          period = 300
        }
      }
    ]
  })
}

# CloudWatch Alarms
resource "aws_cloudwatch_metric_alarm" "high_cpu" {
  alarm_name          = "\${var.project_name}-\${var.environment}-high-cpu"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = "300"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "This metric monitors ECS CPU utilization"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  
  dimensions = {
    ServiceName = aws_ecs_service.app.name
  }
}

resource "aws_cloudwatch_metric_alarm" "high_response_time" {
  alarm_name          = "\${var.project_name}-\${var.environment}-high-response-time"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "3"
  metric_name         = "TargetResponseTime"
  namespace           = "AWS/ApplicationELB"
  period              = "300"
  statistic           = "Average"
  threshold           = "2.0"
  alarm_description   = "This metric monitors ALB response time"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  
  dimensions = {
    LoadBalancer = aws_lb.main.arn_suffix
  }
}
\`\`\`

## 🔒 Security and Compliance

### Security Best Practices
\`\`\`typescript
interface SecurityConfiguration {
  // Network security
  networkSecurity: {
    vpc: 'Private VPC with public/private subnet separation';
    waf: 'AWS WAF with OWASP Core Rule Set';
    ssl: 'TLS 1.3 encryption for all traffic';
    security_groups: 'Least privilege access rules';
  };
  
  // Application security
  applicationSecurity: {
    authentication: 'Clerk.js with JWT tokens and MFA';
    authorization: 'Role-based access control (RBAC)';
    input_validation: 'Zod schema validation for all inputs';
    sql_injection: 'Parameterized queries and ORM usage';
    xss_protection: 'Content Security Policy headers';
    csrf_protection: 'CSRF tokens for state-changing operations';
  };
  
  // Data security
  dataSecurity: {
    encryption_at_rest: 'AES-256 encryption for RDS and S3';
    encryption_in_transit: 'TLS 1.3 for all data transmission';
    backup_encryption: 'Encrypted automated backups';
    secrets_management: 'AWS Systems Manager Parameter Store';
    data_classification: 'PII identification and protection';
  };
  
  // Compliance
  compliance: {
    logging: 'Comprehensive audit logging';
    monitoring: '24/7 security monitoring and alerting';
    access_reviews: 'Quarterly access reviews';
    vulnerability_scanning: 'Automated security scanning';
    penetration_testing: 'Annual penetration testing';
  };
}
\`\`\`

### Disaster Recovery Strategy
\`\`\`typescript
interface DisasterRecoveryStrategy {
  // Backup strategy
  backupStrategy: {
    database: {
      automated_backups: '30-day retention for production, 7-day for staging';
      point_in_time_recovery: 'Enabled with 5-minute granularity';
      cross_region_replication: 'Async replication to disaster recovery region';
    };
    
    application_data: {
      s3_versioning: 'Enabled with lifecycle policies';
      cross_region_replication: 'Replicated to DR region';
      backup_testing: 'Monthly restore testing';
    };
  };
  
  // Recovery procedures
  recoveryProcedures: {
    rto: '4 hours maximum recovery time objective';
    rpo: '1 hour maximum recovery point objective';
    
    procedures: [
      'Automated failover to standby database',
      'DNS failover to disaster recovery region',
      'Application deployment to DR environment',
      'Data consistency validation',
      'Stakeholder notification and communication'
    ];
  };
  
  // Testing
  testing: {
    frequency: 'Quarterly disaster recovery testing';
    scope: 'Full system recovery simulation';
    documentation: 'Detailed runbooks and procedures';
    training: 'Staff training on recovery procedures';
  };
}
\`\`\`

This comprehensive deployment strategy ensures that IBSO client projects are deployed with enterprise-grade reliability, security, and observability while maintaining operational efficiency and cost-effectiveness.`;