// Resource loaders
import terraformDeploy from './infrastructure/terraform-deploy.js';
import costOptimization from './infrastructure/cost-optimization.js';
import cdicashConfig from './clients/cdicash-config.js';
import threeMinuteProcess from './deployment/3-minute-process.js';
import observabilityStack from './monitoring/observability-stack.js';
import complianceFramework from './security/compliance-framework.js';

export const resources = {
  'ibso://infrastructure/terraform-deploy': terraformDeploy,
  'ibso://infrastructure/cost-optimization': costOptimization,
  'ibso://clients/cdicash-config': cdicashConfig,
  'ibso://deployment/3-minute-process': threeMinuteProcess,
  'ibso://monitoring/observability-stack': observabilityStack,
  'ibso://security/compliance-framework': complianceFramework,
};