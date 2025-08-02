export default `# Standard Project Structure

## Repository Layout
\`\`\`
client-project/
├── .github/
│   └── workflows/
│       ├── deploy-staging.yml
│       ├── deploy-production.yml
│       └── security-scan.yml
├── docs/
│   ├── README.md
│   ├── DEPLOYMENT.md
│   ├── API.md
│   └── TROUBLESHOOTING.md
├── infrastructure/
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── environments/
│   │       ├── staging.tfvars
│   │       └── production.tfvars
│   └── docker/
│       ├── Dockerfile
│       ├── docker-compose.yml
│       └── docker-compose.production.yml
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   └── types/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── scripts/
│   ├── deploy.sh
│   ├── rollback.sh
│   └── health-check.sh
├── monitoring/
│   ├── grafana/
│   ├── prometheus/
│   └── alerts.yml
└── .env.example
\`\`\`

## Key Configuration Files

### package.json
\`\`\`json
{
  "name": "client-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest",
    "test:e2e": "playwright test",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit",
    "deploy:staging": "./scripts/deploy.sh staging",
    "deploy:production": "./scripts/deploy.sh production"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "@clerk/nextjs": "^4.0.0",
    "tailwindcss": "^3.0.0"
  }
}
\`\`\`

### Dockerfile
\`\`\`dockerfile
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

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["npm", "start"]
\`\`\``;