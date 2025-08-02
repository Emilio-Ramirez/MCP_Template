#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "ibso-patterns",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      prompts: {},
      tools: {},
    },
  },
);

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "ibso://infrastructure/terraform-deploy",
        mimeType: "text/plain",
        name: "Terraform Deployment Pipeline",
        description: "Complete terraform setup for AWS infrastructure with CI/CD integration",
      },
      {
        uri: "ibso://clients/cdicash-config",
        mimeType: "text/plain",
        name: "CDI Cash Configuration",
        description: "Client-specific infrastructure and deployment configuration patterns",
      },
      {
        uri: "ibso://infrastructure/cost-optimization",
        mimeType: "text/plain",
        name: "AWS Cost Optimization",
        description: "Proven strategies for reducing AWS costs while maintaining performance",
      },
      {
        uri: "ibso://deployment/3-minute-process",
        mimeType: "text/plain",
        name: "3-Minute Deployment Process",
        description: "Streamlined deployment workflow from code to production in 3 minutes",
      },
      {
        uri: "ibso://monitoring/observability-stack",
        mimeType: "text/plain",
        name: "Observability Stack",
        description: "Complete monitoring setup with Grafana, Prometheus, and alerting",
      },
      {
        uri: "ibso://security/compliance-framework",
        mimeType: "text/plain",
        name: "Security Compliance Framework",
        description: "Security policies and compliance patterns for enterprise clients",
      },
    ],
  };
});

// Read specific resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  switch (uri) {
    case "ibso://infrastructure/terraform-deploy":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# Terraform Deployment Pipeline

## Main Infrastructure Configuration
\`\`\`hcl
# main.tf
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
    key    = "infrastructure/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      ManagedBy   = "Terraform"
      Owner       = "IBSO"
    }
  }
}

# VPC Configuration
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "\${var.project_name}-vpc"
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "\${var.project_name}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# Application Load Balancer
resource "aws_lb" "main" {
  name               = "\${var.project_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets           = aws_subnet.public[*].id

  enable_deletion_protection = var.environment == "production"
}
\`\`\`

## Variables Configuration
\`\`\`hcl
# variables.tf
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "Environment must be dev, staging, or production."
  }
}

variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}
\`\`\`

## Deployment Script
\`\`\`bash
#!/bin/bash
# deploy.sh
set -e

ENV=\${1:-dev}
PROJECT_NAME=\${2:-client-app}

echo "🚀 Deploying \$PROJECT_NAME to \$ENV environment..."

# Initialize Terraform
terraform init

# Plan deployment
terraform plan -var="environment=\$ENV" -var="project_name=\$PROJECT_NAME" -out=tfplan

# Apply changes
terraform apply tfplan

# Output important values
terraform output
\`\`\``,
          },
        ],
      };
    case "ibso://clients/cdicash-config":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# CDI Cash Configuration

## Client-Specific Infrastructure
\`\`\`hcl
# cdicash.tfvars
project_name = "cdicash"
environment  = "production"
aws_region   = "us-east-1"

# Application specific
app_port              = 3000
health_check_path     = "/api/health"
desired_count         = 2
max_capacity          = 10
min_capacity          = 1

# Database
db_instance_class     = "db.t3.micro"
db_allocated_storage  = 20
db_backup_retention   = 7

# Domain and SSL
domain_name           = "cdicash.com"
certificate_arn       = "arn:aws:acm:us-east-1:123456789:certificate/abc123"

# Monitoring
enable_cloudwatch     = true
log_retention_days    = 30
\`\`\`

## Docker Configuration
\`\`\`dockerfile
# Dockerfile.cdicash
FROM node:18-alpine AS base
WORKDIR /app

# Dependencies
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

# Build
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production
FROM base AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
\`\`\`

## Environment Configuration
\`\`\`bash
# .env.cdicash
DATABASE_URL="postgresql://cdicash:password@db.cdicash.internal:5432/cdicash"
NEXTAUTH_URL="https://cdicash.com"
NEXTAUTH_SECRET="super-secret-key"

# CDI Cash specific
CDI_API_KEY="cdi_live_abc123"
CDI_WEBHOOK_SECRET="whsec_abc123"
STRIPE_PUBLIC_KEY="pk_live_abc123"
STRIPE_SECRET_KEY="sk_live_abc123"

# Monitoring
SENTRY_DSN="https://abc123@sentry.io/123456"
DATADOG_API_KEY="abc123"
\`\`\`

## Deployment Pipeline
\`\`\`yaml
# .github/workflows/cdicash-deploy.yml
name: CDI Cash Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy to ECS
        run: |
          aws ecs update-service \\
            --cluster cdicash-cluster \\
            --service cdicash-service \\
            --force-new-deployment
\`\`\``,
          },
        ],
      };
    case "ibso://infrastructure/cost-optimization":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# AWS Cost Optimization Strategies

## Resource Right-Sizing
\`\`\`hcl
# Auto Scaling Configuration
resource "aws_autoscaling_policy" "scale_up" {
  name                   = "\${var.project_name}-scale-up"
  scaling_adjustment     = 1
  adjustment_type        = "ChangeInCapacity"
  cooldown              = 300
  autoscaling_group_name = aws_autoscaling_group.main.name
}

resource "aws_autoscaling_policy" "scale_down" {
  name                   = "\${var.project_name}-scale-down"
  scaling_adjustment     = -1
  adjustment_type        = "ChangeInCapacity"
  cooldown              = 300
  autoscaling_group_name = aws_autoscaling_group.main.name
}

# CloudWatch Alarms
resource "aws_cloudwatch_metric_alarm" "cpu_high" {
  alarm_name          = "\${var.project_name}-cpu-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = "120"
  statistic           = "Average"
  threshold           = "70"

  alarm_actions = [aws_autoscaling_policy.scale_up.arn]
}
\`\`\`

## Spot Instance Configuration
\`\`\`hcl
# Launch Template with Spot Instances
resource "aws_launch_template" "spot" {
  name_prefix   = "\${var.project_name}-spot-"
  image_id      = data.aws_ami.ecs.id
  instance_type = "t3.medium"

  instance_market_options {
    market_type = "spot"
    spot_options {
      max_price = "0.05"  # 50% savings over on-demand
    }
  }

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "\${var.project_name}-spot-instance"
    }
  }
}
\`\`\`

## S3 Lifecycle Management
\`\`\`hcl
resource "aws_s3_bucket_lifecycle_configuration" "main" {
  bucket = aws_s3_bucket.main.id

  rule {
    id     = "transition_to_ia"
    status = "Enabled"

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }

    transition {
      days          = 90
      storage_class = "GLACIER"
    }

    expiration {
      days = 365
    }
  }
}
\`\`\`

## Cost Monitoring Dashboard
\`\`\`typescript
// cost-monitor.ts
import { CloudWatchClient, PutMetricDataCommand } from "@aws-sdk/client-cloudwatch"
import { CostExplorerClient, GetCostAndUsageCommand } from "@aws-sdk/client-cost-explorer"

export class CostMonitor {
  private cloudwatch = new CloudWatchClient({ region: "us-east-1" })
  private costExplorer = new CostExplorerClient({ region: "us-east-1" })

  async getCurrentCosts(projectName: string) {
    const endDate = new Date().toISOString().split('T')[0]
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString().split('T')[0]

    const command = new GetCostAndUsageCommand({
      TimePeriod: {
        Start: startDate,
        End: endDate
      },
      Granularity: "DAILY",
      Metrics: ["BlendedCost"],
      GroupBy: [
        {
          Type: "TAG",
          Key: "Project"
        }
      ]
    })

    return await this.costExplorer.send(command)
  }

  async sendCostAlert(cost: number, budget: number, projectName: string) {
    if (cost > budget * 0.8) {
      await this.cloudwatch.send(new PutMetricDataCommand({
        Namespace: "IBSO/Costs",
        MetricData: [
          {
            MetricName: "BudgetUtilization",
            Value: (cost / budget) * 100,
            Unit: "Percent",
            Dimensions: [
              {
                Name: "Project",
                Value: projectName
              }
            ]
          }
        ]
      }))
    }
  }
}
\`\`\`

## Monthly Cost Report
\`\`\`bash
#!/bin/bash
# cost-report.sh

# Generate monthly cost report
aws ce get-cost-and-usage \\
  --time-period Start=2024-01-01,End=2024-02-01 \\
  --granularity MONTHLY \\
  --metrics BlendedCost \\
  --group-by Type=TAG,Key=Project \\
  --output table

# Set budget alerts
aws budgets put-budget \\
  --account-id \$(aws sts get-caller-identity --query Account --output text) \\
  --budget '{
    "BudgetName": "Monthly-Project-Budget",
    "BudgetLimit": {
      "Amount": "100",
      "Unit": "USD"
    },
    "TimeUnit": "MONTHLY",
    "BudgetType": "COST"
  }'
\`\`\``,
          },
        ],
      };
    case "ibso://deployment/3-minute-process":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# 3-Minute Deployment Process

## Quick Deploy Script
\`\`\`bash
#!/bin/bash
# quick-deploy.sh - Deploy any project in under 3 minutes

PROJECT_NAME=\$1
ENVIRONMENT=\$2

if [ -z "\$PROJECT_NAME" ] || [ -z "\$ENVIRONMENT" ]; then
    echo "Usage: ./quick-deploy.sh <project-name> <environment>"
    exit 1
fi

echo "🚀 Starting 3-minute deployment for \$PROJECT_NAME (\$ENVIRONMENT)"
START_TIME=\$(date +%s)

# Step 1: Build and push Docker image (60 seconds)
echo "📦 Building Docker image..."
docker build -t \$PROJECT_NAME:\$ENVIRONMENT . --no-cache=false
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin \$(aws sts get-caller-identity --query Account --output text).dkr.ecr.us-east-1.amazonaws.com
docker tag \$PROJECT_NAME:\$ENVIRONMENT \$(aws sts get-caller-identity --query Account --output text).dkr.ecr.us-east-1.amazonaws.com/\$PROJECT_NAME:\$ENVIRONMENT
docker push \$(aws sts get-caller-identity --query Account --output text).dkr.ecr.us-east-1.amazonaws.com/\$PROJECT_NAME:\$ENVIRONMENT

# Step 2: Update ECS service (90 seconds)
echo "🔄 Updating ECS service..."
aws ecs update-service \\
    --cluster \$PROJECT_NAME-cluster \\
    --service \$PROJECT_NAME-service \\
    --force-new-deployment \\
    --no-cli-pager

# Step 3: Wait for deployment (30 seconds)
echo "⏳ Waiting for deployment to complete..."
aws ecs wait services-stable \\
    --cluster \$PROJECT_NAME-cluster \\
    --services \$PROJECT_NAME-service

END_TIME=\$(date +%s)
DURATION=\$((END_TIME - START_TIME))

echo "✅ Deployment completed in \$DURATION seconds!"
echo "🌐 Application available at: https://\$PROJECT_NAME.ibso.dev"
\`\`\`

## GitHub Actions Workflow
\`\`\`yaml
# .github/workflows/3-minute-deploy.yml
name: 3-Minute Deploy

on:
  push:
    branches: [main, staging]
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy'
        required: true
        default: 'staging'
        type: choice
        options:
        - staging
        - production

jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Set environment
        run: |
          if [ "\${{ github.event_name }}" = "workflow_dispatch" ]; then
            echo "ENVIRONMENT=\${{ github.event.inputs.environment }}" >> \$GITHUB_ENV
          else
            echo "ENVIRONMENT=staging" >> \$GITHUB_ENV
          fi
          echo "PROJECT_NAME=\$(basename \$GITHUB_REPOSITORY)" >> \$GITHUB_ENV

      - name: 3-Minute Deploy
        run: |
          chmod +x ./scripts/quick-deploy.sh
          ./scripts/quick-deploy.sh \$PROJECT_NAME \$ENVIRONMENT

      - name: Slack Notification
        if: always()
        run: |
          STATUS=\${{ job.status }}
          curl -X POST -H 'Content-type: application/json' \\
            --data "{\\"text\\":\\"🚀 \$PROJECT_NAME deployed to \$ENVIRONMENT - Status: \$STATUS\\"}" \\
            \${{ secrets.SLACK_WEBHOOK_URL }}
\`\`\`

## Pre-configured Infrastructure
\`\`\`hcl
# quick-infrastructure.tf
module "quick_deploy" {
  source = "./modules/quick-deploy"

  project_name = var.project_name
  environment  = var.environment

  # Pre-configured settings for speed
  instance_type    = "t3.medium"
  min_capacity     = 1
  max_capacity     = 3
  desired_capacity = 1

  # Fast deployment settings
  health_check_grace_period = 60
  deployment_configuration = {
    maximum_percent         = 200
    minimum_healthy_percent = 50
  }

  # Quick DNS setup
  create_route53_record = true
  domain_name          = "\${var.project_name}.ibso.dev"
}

# ECR Repository (pre-created)
resource "aws_ecr_repository" "main" {
  name                 = var.project_name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = false  # Skip for speed
  }

  lifecycle {
    prevent_destroy = true
  }
}
\`\`\`

## Health Check Script
\`\`\`typescript
// health-check.ts
export async function quickHealthCheck(projectName: string, environment: string) {
  const url = \`https://\${projectName}.ibso.dev/api/health\`
  
  const maxRetries = 30
  const retryDelay = 2000 // 2 seconds
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url)
      if (response.ok) {
        console.log(\`✅ \${projectName} is healthy and responding\`)
        return true
      }
    } catch (error) {
      console.log(\`⏳ Attempt \${i + 1}/\${maxRetries} - Waiting for \${projectName} to be ready...\`)
    }
    
    await new Promise(resolve => setTimeout(resolve, retryDelay))
  }
  
  throw new Error(\`❌ \${projectName} failed to become healthy within 60 seconds\`)
}
\`\`\`

## Rollback Script
\`\`\`bash
#!/bin/bash
# rollback.sh - Instant rollback if needed

PROJECT_NAME=\$1
ENVIRONMENT=\$2

echo "🔄 Rolling back \$PROJECT_NAME (\$ENVIRONMENT) to previous version..."

# Get previous task definition
PREVIOUS_TASK_DEF=\$(aws ecs describe-services \\
    --cluster \$PROJECT_NAME-cluster \\
    --services \$PROJECT_NAME-service \\
    --query 'services[0].deployments[1].taskDefinition' \\
    --output text)

# Update service to previous version
aws ecs update-service \\
    --cluster \$PROJECT_NAME-cluster \\
    --service \$PROJECT_NAME-service \\
    --task-definition \$PREVIOUS_TASK_DEF \\
    --no-cli-pager

echo "✅ Rollback completed!"
\`\`\``,
          },
        ],
      };
    case "ibso://monitoring/observability-stack":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# Observability Stack

## Grafana Dashboard Configuration
\`\`\`json
{
  "dashboard": {
    "id": null,
    "title": "IBSO Client Monitoring",
    "tags": ["ibso", "monitoring"],
    "timezone": "browser",
    "panels": [
      {
        "id": 1,
        "title": "Application Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "avg(http_request_duration_seconds) by (service)",
            "legendFormat": "{{service}}"
          }
        ],
        "yAxes": [
          {
            "label": "Seconds",
            "min": 0
          }
        ]
      },
      {
        "id": 2,
        "title": "Error Rate",
        "type": "singlestat",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m])) * 100"
          }
        ],
        "thresholds": "1,5",
        "colorBackground": true
      }
    ]
  }
}
\`\`\`

## Prometheus Configuration
\`\`\`yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alerts.yml"

scrape_configs:
  - job_name: 'ecs-services'
    ec2_sd_configs:
      - region: us-east-1
        port: 9090
        filters:
          - name: tag:Environment
            values: ['production', 'staging']
          - name: tag:Project
            values: ['*']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['localhost:9100']

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - localhost:9093
\`\`\`

## Alert Rules
\`\`\`yaml
# alerts.yml
groups:
  - name: ibso-alerts
    rules:
      - alert: HighErrorRate
        expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.05
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value | humanizePercentage }} for the last 5 minutes"

      - alert: HighLatency
        expr: avg(http_request_duration_seconds) > 0.5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High latency detected"
          description: "Average response time is {{ $value }}s"

      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Service is down"
          description: "{{ $labels.instance }} has been down for more than 1 minute"
\`\`\`

## Application Metrics (Next.js)
\`\`\`typescript
// lib/metrics.ts
import { register, Counter, Histogram, Gauge } from 'prom-client'

// HTTP Request metrics
export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
})

export const httpRequestTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
})

// Database metrics
export const dbConnections = new Gauge({
  name: 'db_connections_active',
  help: 'Number of active database connections'
})

export const dbQueryDuration = new Histogram({
  name: 'db_query_duration_seconds',
  help: 'Duration of database queries in seconds',
  labelNames: ['query_type']
})

// Business metrics
export const activeUsers = new Gauge({
  name: 'active_users_total',
  help: 'Number of active users'
})

export const revenue = new Counter({
  name: 'revenue_total',
  help: 'Total revenue generated',
  labelNames: ['currency']
})

// Middleware to track HTTP requests
export function metricsMiddleware(req: any, res: any, next: any) {
  const start = Date.now()
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000
    const route = req.route?.path || req.path
    
    httpRequestDuration
      .labels(req.method, route, res.statusCode.toString())
      .observe(duration)
    
    httpRequestTotal
      .labels(req.method, route, res.statusCode.toString())
      .inc()
  })
  
  next()
}

// Metrics endpoint
export function getMetrics() {
  return register.metrics()
}
\`\`\`

## Docker Compose for Local Monitoring
\`\`\`yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - ./monitoring/alerts.yml:/etc/prometheus/alerts.yml
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--web.enable-lifecycle'

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-storage:/var/lib/grafana
      - ./monitoring/grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./monitoring/grafana/datasources:/etc/grafana/provisioning/datasources

  alertmanager:
    image: prom/alertmanager:latest
    container_name: alertmanager
    ports:
      - "9093:9093"
    volumes:
      - ./monitoring/alertmanager.yml:/etc/alertmanager/alertmanager.yml

volumes:
  grafana-storage:
\`\`\`

## Slack Alert Configuration
\`\`\`yaml
# alertmanager.yml
global:
  slack_api_url: 'YOUR_SLACK_WEBHOOK_URL'

route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'slack-notifications'

receivers:
  - name: 'slack-notifications'
    slack_configs:
      - channel: '#alerts'
        title: 'IBSO Alert: {{ range .Alerts }}{{ .Annotations.summary }}{{ end }}'
        text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'
        send_resolved: true
\`\`\``,
          },
        ],
      };
    case "ibso://security/compliance-framework":
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# Security Compliance Framework

## Security Policy Template
\`\`\`typescript
// security-policies.ts
export interface SecurityPolicy {
  name: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  rules: SecurityRule[]
}

interface SecurityRule {
  id: string
  description: string
  check: () => Promise<boolean>
  remediation: string
}

export const IBSO_SECURITY_POLICIES: SecurityPolicy[] = [
  {
    name: "Data Encryption",
    description: "All data must be encrypted at rest and in transit",
    severity: "critical",
    rules: [
      {
        id: "encryption-at-rest",
        description: "Database encryption enabled",
        check: async () => checkDatabaseEncryption(),
        remediation: "Enable RDS encryption and S3 bucket encryption"
      },
      {
        id: "encryption-in-transit",
        description: "HTTPS/TLS enforced",
        check: async () => checkHTTPSEnforcement(),
        remediation: "Configure ALB to redirect HTTP to HTTPS"
      }
    ]
  },
  {
    name: "Access Control",
    description: "Implement least privilege access",
    severity: "high",
    rules: [
      {
        id: "iam-policies",
        description: "IAM policies follow least privilege",
        check: async () => auditIAMPolicies(),
        remediation: "Review and restrict IAM policies"
      },
      {
        id: "mfa-enabled",
        description: "MFA enabled for all admin accounts",
        check: async () => checkMFACompliance(),
        remediation: "Enable MFA for all administrative access"
      }
    ]
  }
]
\`\`\`

## AWS Security Configuration
\`\`\`hcl
# security.tf
# WAF Configuration
resource "aws_wafv2_web_acl" "main" {
  name  = "\${var.project_name}-waf"
  scope = "REGIONAL"

  default_action {
    allow {}
  }

  # Block common attacks
  rule {
    name     = "AWSManagedRulesCommonRuleSet"
    priority = 1

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "CommonRuleSetMetric"
      sampled_requests_enabled   = true
    }
  }

  # Rate limiting
  rule {
    name     = "RateLimitRule"
    priority = 2

    action {
      block {}
    }

    statement {
      rate_based_statement {
        limit              = 10000
        aggregate_key_type = "IP"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "RateLimitMetric"
      sampled_requests_enabled   = true
    }
  }
}

# Security Groups
resource "aws_security_group" "app" {
  name_prefix = "\${var.project_name}-app-"
  vpc_id      = aws_vpc.main.id

  # Only allow traffic from ALB
  ingress {
    from_port       = var.app_port
    to_port         = var.app_port
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# KMS Key for encryption
resource "aws_kms_key" "main" {
  description = "KMS key for \${var.project_name}"
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "Enable IAM User Permissions"
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::\${data.aws_caller_identity.current.account_id}:root"
        }
        Action   = "kms:*"
        Resource = "*"
      }
    ]
  })
}

# CloudTrail for audit logging
resource "aws_cloudtrail" "main" {
  name           = "\${var.project_name}-cloudtrail"
  s3_bucket_name = aws_s3_bucket.cloudtrail.id

  enable_logging                = true
  include_global_service_events = true
  is_multi_region_trail        = true
  enable_log_file_validation   = true

  kms_key_id = aws_kms_key.main.arn
}
\`\`\`

## Compliance Check Script
\`\`\`bash
#!/bin/bash
# compliance-check.sh

PROJECT_NAME=\$1
ENVIRONMENT=\$2

echo "🔒 Running IBSO Security Compliance Check for \$PROJECT_NAME (\$ENVIRONMENT)"

# Check 1: Encryption at rest
echo "Checking database encryption..."
DB_ENCRYPTED=\$(aws rds describe-db-instances \\
  --db-instance-identifier \$PROJECT_NAME-\$ENVIRONMENT \\
  --query 'DBInstances[0].StorageEncrypted' \\
  --output text)

if [ "\$DB_ENCRYPTED" = "True" ]; then
  echo "✅ Database encryption: PASS"
else
  echo "❌ Database encryption: FAIL"
fi

# Check 2: HTTPS enforcement
echo "Checking HTTPS enforcement..."
ALB_REDIRECT=\$(aws elbv2 describe-listeners \\
  --load-balancer-arn \$(aws elbv2 describe-load-balancers \\
    --names \$PROJECT_NAME-alb \\
    --query 'LoadBalancers[0].LoadBalancerArn' \\
    --output text) \\
  --query 'Listeners[?Port==\`80\`].DefaultActions[0].RedirectConfig.StatusCode' \\
  --output text)

if [ "\$ALB_REDIRECT" = "HTTP_301" ]; then
  echo "✅ HTTPS enforcement: PASS"
else
  echo "❌ HTTPS enforcement: FAIL"
fi

# Check 3: WAF enabled
echo "Checking WAF configuration..."
WAF_ARN=\$(aws wafv2 list-web-acls \\
  --scope REGIONAL \\
  --query "WebACLs[?Name=='\$PROJECT_NAME-waf'].ARN" \\
  --output text)

if [ -n "\$WAF_ARN" ]; then
  echo "✅ WAF configuration: PASS"
else
  echo "❌ WAF configuration: FAIL"
fi

# Check 4: CloudTrail logging
echo "Checking CloudTrail logging..."
CLOUDTRAIL_STATUS=\$(aws cloudtrail get-trail-status \\
  --name \$PROJECT_NAME-cloudtrail \\
  --query 'IsLogging' \\
  --output text)

if [ "\$CLOUDTRAIL_STATUS" = "True" ]; then
  echo "✅ CloudTrail logging: PASS"
else
  echo "❌ CloudTrail logging: FAIL"
fi

echo "🔒 Compliance check completed!"
\`\`\`

## Security Scanning Pipeline
\`\`\`yaml
# .github/workflows/security-scan.yml
name: Security Scan

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myimage'
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'

      - name: Run Semgrep
        uses: returntocorp/semgrep-action@v1
        with:
          config: >-
            p/security-audit
            p/secrets
            p/owasp-top-ten

      - name: Infrastructure security scan
        run: |
          # Checkov for Terraform
          pip install checkov
          checkov -d . --framework terraform --output json --o checkov-report.json

      - name: Compliance check
        run: |
          chmod +x ./scripts/compliance-check.sh
          ./scripts/compliance-check.sh \${{ github.event.repository.name }} staging
\`\`\``,
          },
        ],
      };
    default:
      throw new Error(`Resource not found: ${uri}`);
  }
});

// List available prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "deploy_infrastructure",
        description: "Deploy infrastructure for a new client project",
        arguments: [
          {
            name: "project_name",
            description: "Name of the client project",
            required: true,
          },
          {
            name: "environment",
            description: "Target environment (dev, staging, production)",
            required: true,
          },
        ],
      },
      {
        name: "optimize_costs",
        description: "Analyze and optimize AWS costs for a project",
        arguments: [
          {
            name: "project_name",
            description: "Name of the project to optimize",
            required: true,
          },
        ],
      },
      {
        name: "security_audit",
        description: "Run security compliance audit for a client",
        arguments: [
          {
            name: "project_name",
            description: "Name of the project to audit",
            required: true,
          },
        ],
      },
    ],
  };
});

// Handle prompt requests
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "deploy_infrastructure":
      return {
        description: `Deploying infrastructure for ${args?.project_name || "project"} to ${args?.environment || "environment"}`,
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Deploy complete AWS infrastructure for ${args?.project_name || "project"} to ${args?.environment || "environment"} using IBSO patterns. Include VPC, ECS cluster, ALB, RDS, security groups, and monitoring. Use the 3-minute deployment process for speed.`,
            },
          },
        ],
      };
    case "optimize_costs":
      return {
        description: `Analyzing and optimizing costs for ${args?.project_name || "project"}`,
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Analyze current AWS costs for ${args?.project_name || "project"} and implement IBSO cost optimization strategies. Include spot instances, auto-scaling, S3 lifecycle policies, and budget alerts. Target 30-50% cost reduction.`,
            },
          },
        ],
      };
    case "security_audit":
      return {
        description: `Running security audit for ${args?.project_name || "project"}`,
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Perform comprehensive security audit for ${args?.project_name || "project"} using IBSO compliance framework. Check encryption, access controls, WAF configuration, CloudTrail logging, and generate remediation report.`,
            },
          },
        ],
      };
    default:
      throw new Error(`Prompt not found: ${name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("IBSO Patterns MCP server running on stdio");
}

runServer().catch(console.error);
