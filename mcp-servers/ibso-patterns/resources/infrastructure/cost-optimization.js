export default `# AWS Cost Optimization Strategies

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
\`\`\``;