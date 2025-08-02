export default `# 3-Minute Deployment Process

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
\`\`\``;