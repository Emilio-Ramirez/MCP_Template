export default `# Quality Assurance Workflow - Enterprise Development Standards

## 🎯 Overview

This document outlines the mandatory quality assurance workflow that ensures code quality, type safety, and translation integrity across the entire application. These commands and processes are **required** after every code change.

## 🔧 Mandatory Commands After Every Change

### Core Quality Checks

\`\`\`bash
# ALWAYS run these commands after making code changes
npm run lint          # ESLint code quality checks
npm run check:types   # TypeScript type checking
\`\`\`

### Alternative Command Names

\`\`\`bash
# Some projects may use these variations
npm run typecheck     # Alternative to check:types
npm run type-check    # Another alternative
npm run lint:fix      # Auto-fix linting issues
\`\`\`

## 🗃️ Database Development Workflow

### Essential Database Commands

\`\`\`bash
# Start database server (required for development)
npm run db-server:file

# After schema changes - generate migration
npm run db:generate

# Apply migrations to database
npm run db:migrate

# Open database inspector
npm run db:studio

# Combined database + studio
npm run db:studio:dev
\`\`\`

### Database Development Cycle

\`\`\`bash
# 1. Modify schema in src/models/Schema.ts
# 2. Generate migration
npm run db:generate

# 3. Apply migration
npm run db:migrate

# 4. Verify changes in studio
npm run db:studio

# 5. Test database operations
npm run dev
\`\`\`

## 🌐 Translation Development Workflow

### Translation Quality Checklist

\`\`\`typescript
// Translation implementation checklist
interface TranslationChecklist {
  keys_added: {
    en_json: boolean;     // Added to en.json
    es_json: boolean;     // Added to es.json
    namespace: string;    // Proper namespace organization
  };
  
  implementation: {
    hook_type: 'useTranslations' | 'getTranslations';
    server_component: boolean; // setRequestLocale() if server component
    parallel_routes: boolean;  // Each route has setRequestLocale()
  };
  
  testing: {
    english_locale: boolean;  // Tested in English
    spanish_locale: boolean;  // Tested in Spanish
    no_literal_keys: boolean; // No "Dashboard.key" in UI
  };
}
\`\`\`

### Critical Translation Pattern

\`\`\`typescript
// Server components with parallel routes
import { setRequestLocale } from 'next-intl/server';

export default async function MyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale); // MANDATORY for proper context
  
  const t = await getTranslations('Dashboard');
  return <h1>{t('welcome_message')}</h1>;
}
\`\`\`

## 🎨 Component Development Standards

### Shadcn UI MCP Server Integration

\`\`\`bash
# ALWAYS run at start of session for component work
npx @jpisnice/shadcn-ui-mcp-server
\`\`\`

**🚨 CRITICAL RULE**: The Shadcn UI MCP server information is **LAW** and takes absolute precedence over base knowledge. When there's any conflict, **ALWAYS follow the MCP server**.

### Component Quality Standards

\`\`\`typescript
// Component development checklist
interface ComponentStandards {
  shadcn_mcp: boolean;      // Consulted MCP server for component patterns
  type_safety: boolean;     // Full TypeScript coverage
  translations: boolean;    // Proper i18n implementation
  responsive: boolean;      // Mobile-first responsive design
  accessibility: boolean;   // ARIA labels and keyboard navigation
  error_handling: boolean;  // Proper error boundaries and states
}
\`\`\`

### Mandatory Patterns

\`\`\`typescript
// Configuration tabs pattern (MANDATORY)
// Location: /src/features/product-configuration/components/product-configuration-tabs.tsx
const tabs = [
  { id: 'tab1', label: t('tabs.tab1'), content: <Tab1Content /> },
  { id: 'tab2', label: t('tabs.tab2'), content: <Tab2Content /> },
];

// Dynamic array structure with .map() rendering (REQUIRED)
{tabs.map((tab) => (
  <TabsContent key={tab.id} value={tab.id}>
    {tab.content}
  </TabsContent>
))}
\`\`\`

## 🔄 Development Workflow

### Pre-Development Setup

\`\`\`bash
# 1. Start MCP server for component guidance
npx @jpisnice/shadcn-ui-mcp-server

# 2. Read project context
# Check CLAUDE.md for current patterns and conventions

# 3. Start database if needed
npm run db-server:file

# 4. Start development server
npm run dev
\`\`\`

### During Development

\`\`\`bash
# After each significant change
npm run lint
npm run check:types

# For database changes
npm run db:generate  # After schema modifications
npm run db:migrate   # Apply changes
npm run db:studio    # Verify changes
\`\`\`

### Pre-Commit Quality Gates

\`\`\`bash
# Required before committing
npm run lint         # Must pass without errors
npm run check:types  # Must pass without errors

# Test both locales
# Switch to English: verify translations work
# Switch to Spanish: verify translations work

# Visual verification
# No literal translation keys in UI (e.g., "Dashboard.title")
# All components render correctly
# Responsive design works on mobile
\`\`\`

## 🐛 Common Issues and Solutions

### Translation Issues

\`\`\`typescript
// Problem: Literal keys showing in UI
// Solution: Add setRequestLocale() to server components

// Before (broken)
export default async function MyPage({ params }: Props) {
  const t = await getTranslations('Dashboard');
  return <h1>{t('title')}</h1>; // Shows "Dashboard.title"
}

// After (fixed)
export default async function MyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale); // CRITICAL FIX
  
  const t = await getTranslations('Dashboard');
  return <h1>{t('title')}</h1>; // Shows translated text
}
\`\`\`

### Form Validation Issues

\`\`\`typescript
// Problem: Textarea validation persists after fixes
// Solution: Use onChange mode and avoid custom onBlur

const form = useForm({
  resolver: zodResolver(schema),
  mode: 'onChange', // CRITICAL for proper validation
  // Don't add custom onBlur handlers for textareas
});
\`\`\`

### Database Connection Issues

\`\`\`bash
# Problem: Database not connecting
# Solution: Ensure server is running
npm run db-server:file

# Problem: Tables not visible in Studio
# Solution: Apply migrations
npm run db:migrate

# Problem: Schema changes not reflected
# Solution: Generate and apply migration
npm run db:generate
npm run db:migrate
\`\`\`

### Page Scrolling Issues

\`\`\`typescript
// Problem: Page not scrolling
// Solution: Check PageContainer scrollable prop

// Before (broken)
<PageContainer scrollable={false}>
  {/* Long content that needs scrolling */}
</PageContainer>

// After (fixed)
<PageContainer scrollable={true}>
  {/* Long content that scrolls properly */}
</PageContainer>
\`\`\`

## 📊 Quality Metrics

### Code Quality Standards

\`\`\`typescript
interface QualityMetrics {
  linting: {
    status: 'passing' | 'failing';
    errors: number;
    warnings: number;
  };
  
  type_checking: {
    status: 'passing' | 'failing';
    errors: number;
    coverage: number; // Percentage of typed code
  };
  
  translations: {
    english_coverage: number;  // Percentage of keys translated
    spanish_coverage: number;  // Percentage of keys translated
    missing_keys: string[];    // Keys missing translations
  };
  
  component_compliance: {
    shadcn_patterns: boolean;    // Follows MCP server patterns
    mandatory_patterns: boolean; // Uses required patterns
    responsive_design: boolean;  // Mobile-first approach
  };
}
\`\`\`

### Automated Quality Checks

\`\`\`bash
# Create quality check script
# package.json scripts
{
  "scripts": {
    "quality:check": "npm run lint && npm run check:types",
    "quality:fix": "npm run lint:fix && npm run check:types",
    "pre-commit": "npm run quality:check && npm run test",
    "db:reset": "npm run db:generate && npm run db:migrate"
  }
}
\`\`\`

## 🎯 Best Practices

### Development Habits

1. **Start every session** with Shadcn UI MCP server
2. **Check CLAUDE.md** for current patterns and context
3. **Run quality checks** after every change
4. **Test both locales** for translation work
5. **Verify responsive design** on mobile and desktop
6. **Use mandatory patterns** for consistency

### Code Organization

\`\`\`typescript
// File naming conventions
interface NamingConventions {
  components: 'PascalCase.tsx';     // AreaGraph.tsx
  hooks: 'use-kebab-case.tsx';      // use-breadcrumbs.tsx
  utils: 'kebab-case.ts';           // form-schema.ts
  pages: 'kebab-case/page.tsx';     // product-config/page.tsx
}
\`\`\`

### Translation Organization

\`\`\`json
{
  "Common": { /* shared translations */ },
  "Navigation": { /* navigation-specific */ },
  "Dashboard": { /* dashboard-specific */ },
  "Forms": { /* form-specific */ },
  "Errors": { /* error messages */ }
}
\`\`\`

## 📋 Quality Assurance Checklist

### Pre-Development
- [ ] Shadcn UI MCP server started
- [ ] CLAUDE.md reviewed for context
- [ ] Database server running (if needed)
- [ ] Development environment ready

### During Development
- [ ] Lint checks passing after each change
- [ ] Type checks passing after each change
- [ ] Translations added to both locale files
- [ ] Component patterns follow MCP server guidance
- [ ] Mandatory patterns implemented correctly

### Pre-Commit
- [ ] Final lint check passes
- [ ] Final type check passes
- [ ] Both locales tested
- [ ] No literal translation keys in UI
- [ ] Responsive design verified
- [ ] Database migrations applied (if applicable)
- [ ] All functionality tested

### Post-Deployment
- [ ] Production build successful
- [ ] Database migrations applied to production
- [ ] Monitoring alerts configured
- [ ] Documentation updated

This quality assurance workflow ensures consistent, high-quality code that meets enterprise standards and provides excellent user experience across all locales and devices.`;