export default `# Configuration Tabs Pattern - Enterprise System Integration

This document establishes the **MANDATORY** configuration tabs pattern for enterprise applications that require systematic management of application settings, user preferences, and system configurations.

## Overview

The configuration tabs pattern provides a standardized approach to organizing complex settings interfaces using shadcn/ui Tabs component with consistent styling and behavior patterns.

## Core Requirements

### 1. Tab Structure Standards
- Use \`Tabs\` as root container with proper defaultValue
- Implement \`TabsList\` with grid layout for equal spacing
- Use \`TabsTrigger\` with consistent styling
- Structure \`TabsContent\` with proper spacing and card layouts

### 2. Content Organization
- Group related settings logically within tabs
- Use consistent card layouts for content sections
- Implement proper spacing between sections
- Follow responsive design patterns

### 3. State Management
- Handle tab state properly with controlled components
- Implement proper form validation across tabs
- Manage unsaved changes notifications
- Handle loading states appropriately

## Standard Configuration Tabs Template

\`\`\`tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';

export function ConfigurationTabs() {
  const t = useTranslations('Settings');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">{t('tabs.general')}</TabsTrigger>
          <TabsTrigger value="security">{t('tabs.security')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('tabs.notifications')}</TabsTrigger>
          <TabsTrigger value="integrations">{t('tabs.integrations')}</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('general.profile.title')}</CardTitle>
              <CardDescription>{t('general.profile.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('general.profile.name')}</Label>
                  <Input id="name" placeholder={t('general.profile.name_placeholder')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('general.profile.email')}</Label>
                  <Input id="email" type="email" placeholder={t('general.profile.email_placeholder')} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('general.preferences.title')}</CardTitle>
              <CardDescription>{t('general.preferences.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preferences content */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('security.password.title')}</CardTitle>
              <CardDescription>{t('security.password.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Security content */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('notifications.email.title')}</CardTitle>
              <CardDescription>{t('notifications.email.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Notifications content */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('integrations.api.title')}</CardTitle>
              <CardDescription>{t('integrations.api.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Integrations content */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Actions */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">{t('actions.cancel')}</Button>
        <Button>{t('actions.save')}</Button>
      </div>
    </div>
  );
}
\`\`\`

## Advanced Patterns

### 1. Dynamic Tab Loading

\`\`\`tsx
export function DynamicConfigurationTabs({ userRole }: { userRole: string }) {
  const t = useTranslations('Settings');
  
  const availableTabs = useMemo(() => {
    const baseTabs = ['general', 'notifications'];
    
    if (userRole === 'admin') {
      baseTabs.push('security', 'integrations', 'system');
    } else if (userRole === 'manager') {
      baseTabs.push('security');
    }
    
    return baseTabs;
  }, [userRole]);

  return (
    <Tabs defaultValue={availableTabs[0]} className="space-y-4">
      <TabsList className={\`grid w-full grid-cols-\${availableTabs.length}\`}>
        {availableTabs.map((tab) => (
          <TabsTrigger key={tab} value={tab}>
            {t(\`tabs.\${tab}\`)}
          </TabsTrigger>
        ))}
      </TabsList>
      {/* Tab content */}
    </Tabs>
  );
}
\`\`\`

### 2. Form State Management Across Tabs

\`\`\`tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const configurationSchema = z.object({
  // General settings
  name: z.string().min(1),
  email: z.string().email(),
  
  // Security settings
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  
  // Notification settings
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
});

export function FormManagedConfigurationTabs() {
  const t = useTranslations('Settings');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(configurationSchema),
    defaultValues: {
      name: '',
      email: '',
      emailNotifications: true,
      smsNotifications: false,
    },
  });

  const handleSubmit = async (data: z.infer<typeof configurationSchema>) => {
    try {
      await saveConfiguration(data);
      setHasUnsavedChanges(false);
      toast.success(t('messages.saved'));
    } catch (error) {
      toast.error(t('messages.error'));
    }
  };

  // Monitor form changes
  useEffect(() => {
    const subscription = form.watch(() => {
      setHasUnsavedChanges(form.formState.isDirty);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Tabs defaultValue="general" className="space-y-4">
          {/* Tabs implementation with form fields */}
        </Tabs>
        
        {/* Unsaved changes indicator */}
        {hasUnsavedChanges && (
          <div className="bg-warning/10 border border-warning rounded-lg p-4">
            <p className="text-sm text-warning-foreground">
              {t('messages.unsaved_changes')}
            </p>
          </div>
        )}
      </form>
    </Form>
  );
}
\`\`\`

### 3. Tab Validation and Error Handling

\`\`\`tsx
export function ValidatedConfigurationTabs() {
  const [activeTab, setActiveTab] = useState('general');
  const [tabErrors, setTabErrors] = useState<Record<string, boolean>>({});
  
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(configurationSchema),
  });

  // Check validation errors per tab
  useEffect(() => {
    const errors = form.formState.errors;
    setTabErrors({
      general: !!(errors.name || errors.email),
      security: !!(errors.currentPassword || errors.newPassword),
      notifications: !!(errors.emailNotifications || errors.smsNotifications),
    });
  }, [form.formState.errors]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger 
          value="general" 
          className={tabErrors.general ? 'border-destructive text-destructive' : ''}
        >
          {t('tabs.general')}
          {tabErrors.general && <span className="ml-1 text-destructive">•</span>}
        </TabsTrigger>
        <TabsTrigger 
          value="security"
          className={tabErrors.security ? 'border-destructive text-destructive' : ''}
        >
          {t('tabs.security')}
          {tabErrors.security && <span className="ml-1 text-destructive">•</span>}
        </TabsTrigger>
        <TabsTrigger 
          value="notifications"
          className={tabErrors.notifications ? 'border-destructive text-destructive' : ''}
        >
          {t('tabs.notifications')}
          {tabErrors.notifications && <span className="ml-1 text-destructive">•</span>}
        </TabsTrigger>
      </TabsList>
      {/* Tab content */}
    </Tabs>
  );
}
\`\`\`

## Responsive Design Patterns

### Mobile-First Tab Layout

\`\`\`tsx
export function ResponsiveConfigurationTabs() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="space-y-4">
        {/* Mobile: Vertical scroll tabs */}
        <TabsList className="grid w-full grid-cols-2 h-auto md:grid-cols-4 md:h-10">
          <TabsTrigger value="general" className="text-xs md:text-sm">
            {t('tabs.general')}
          </TabsTrigger>
          <TabsTrigger value="security" className="text-xs md:text-sm">
            {t('tabs.security')}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs md:text-sm">
            {t('tabs.notifications')}
          </TabsTrigger>
          <TabsTrigger value="integrations" className="text-xs md:text-sm">
            {t('tabs.integrations')}
          </TabsTrigger>
        </TabsList>

        {/* Responsive content layout */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Responsive form fields */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
\`\`\`

## Internationalization Integration

\`\`\`tsx
// messages/en.json
{
  "Settings": {
    "title": "Settings",
    "description": "Manage your account settings and preferences.",
    "tabs": {
      "general": "General",
      "security": "Security",
      "notifications": "Notifications",
      "integrations": "Integrations"
    },
    "general": {
      "profile": {
        "title": "Profile Information",
        "description": "Update your personal information.",
        "name": "Full Name",
        "name_placeholder": "Enter your full name",
        "email": "Email Address",
        "email_placeholder": "Enter your email"
      }
    },
    "actions": {
      "save": "Save Changes",
      "cancel": "Cancel"
    },
    "messages": {
      "saved": "Settings saved successfully",
      "error": "Failed to save settings",
      "unsaved_changes": "You have unsaved changes"
    }
  }
}
\`\`\`

## Implementation Guidelines

### MUST DO:
1. Use \`Tabs\` component from shadcn/ui as root container
2. Implement \`TabsList\` with grid layout for consistent spacing
3. Use \`Card\` components for content organization within tabs
4. Handle form state properly across tab changes
5. Implement proper validation and error indication
6. Use internationalization for all text content
7. Follow responsive design patterns

### MUST NOT DO:
1. Mix different tab styling approaches within the same interface
2. Skip form validation when switching between tabs
3. Ignore unsaved changes when navigating tabs
4. Use inconsistent spacing patterns across tabs
5. Forget to handle loading states properly

## Performance Considerations

### Lazy Loading Tab Content

\`\`\`tsx
import { lazy, Suspense } from 'react';

const GeneralSettings = lazy(() => import('./tabs/GeneralSettings'));
const SecuritySettings = lazy(() => import('./tabs/SecuritySettings'));

export function OptimizedConfigurationTabs() {
  return (
    <Tabs defaultValue="general">
      <TabsContent value="general">
        <Suspense fallback={<div>Loading...</div>}>
          <GeneralSettings />
        </Suspense>
      </TabsContent>
      <TabsContent value="security">
        <Suspense fallback={<div>Loading...</div>}>
          <SecuritySettings />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
\`\`\`

## Accessibility Standards

- Use proper ARIA labels for tab navigation
- Ensure keyboard navigation works correctly
- Provide clear focus indicators
- Support screen readers with proper semantic markup
- Implement proper error announcements

## Benefits of This Pattern

- **Organized Interface**: Clear separation of different configuration areas
- **Scalable Architecture**: Easy to add new configuration sections
- **Consistent UX**: Standardized interaction patterns across the application
- **Form Management**: Proper handling of complex form states
- **Responsive Design**: Works seamlessly across all device sizes
- **Internationalization Ready**: Full i18n support out of the box

This pattern is **MANDATORY** for all configuration interfaces in enterprise applications. Any deviation must be approved through the design system review process.`;