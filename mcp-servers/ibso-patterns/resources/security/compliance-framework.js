export default `# Security Compliance Framework

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
\`\`\``;