export default `# CDI Cash Configuration

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
\`\`\``;