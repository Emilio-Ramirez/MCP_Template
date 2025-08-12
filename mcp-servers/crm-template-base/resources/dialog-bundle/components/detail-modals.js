export default `# Dialog Bundle - Detail Modals (Enhanced Pattern)

## Overview
Optimal detail modal patterns combining superior responsive sizing from request dialogs with semantic Card structure from client dialogs. Provides modular, scalable detail view implementation.

## Enhanced Detail Dialog Pattern

### Complete Detail Dialog Implementation
\`\`\`tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  entity: any;
  onEdit?: () => void;
  onDelete?: () => void;
  children?: React.ReactNode;
}

export default function DetailModal({
  isOpen,
  onClose,
  entity,
  onEdit,
  onDelete,
  children,
}: DetailModalProps) {
  const t = useTranslations();

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent 
        className="max-h-[90vh] w-[95vw] max-w-none lg:max-w-[85vw] xl:max-w-[80vw] overflow-y-auto [&>button]:hidden"
        data-slot="dialog-content"
      >
        <DialogHeader data-slot="dialog-header">
          {/* Title and Actions Row */}
          <div className="flex items-center justify-between">
            <DialogTitle className="text-left text-xl font-bold">
              {t('details_title')} - {entity.id}
            </DialogTitle>
            <div className="flex gap-2">
              {onEdit && (
                <Button variant="outline" size="sm" onClick={onEdit}>
                  <EditIcon className="mr-1 h-4 w-4" />
                  {t('edit')}
                </Button>
              )}
              {onDelete && (
                <Button variant="outline" size="sm" onClick={onDelete}>
                  <TrashIcon className="mr-1 h-4 w-4" />
                  {t('delete')}
                </Button>
              )}
            </div>
          </div>
          
          {/* Status Badges Row */}
          <div className="flex items-center gap-4">
            <Badge variant={getStatusVariant(entity.status)}>
              {t(\`status.\${entity.status}\`)}
            </Badge>
            {entity.priority && (
              <Badge variant={getPriorityVariant(entity.priority)}>
                {t(\`priority.\${entity.priority}\`)}
              </Badge>
            )}
          </div>
        </DialogHeader>

        {/* Responsive Grid Layout */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {/* Main Content */}
          <div className="space-y-4 lg:col-span-2 xl:col-span-3">
            {children}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-4">
            <SidebarContent entity={entity} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
\`\`\`

## Content Section Pattern

### Main Content Card Structure
\`\`\`tsx
function MainContentSection({ title, icon: Icon, children }: SectionProps) {
  const t = useTranslations();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {t(title)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

// Field Display Component
function FieldDisplay({ label, value, type = 'text' }: FieldProps) {
  const t = useTranslations();
  
  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground">
        {t(label)}
      </label>
      <p className="mt-1">
        {type === 'currency' ? formatCurrency(value) : 
         type === 'date' ? formatDate(value) : 
         value || t('not_specified')}
      </p>
    </div>
  );
}
\`\`\`

## Sidebar Content Pattern

### Information Sidebar Structure
\`\`\`tsx
function SidebarContent({ entity }: { entity: any }) {
  const t = useTranslations();
  
  return (
    <>
      {/* Metadata Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <InfoIcon className="h-4 w-4" />
            {t('metadata')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <FieldDisplay 
            label="created_at" 
            value={entity.createdAt} 
            type="date" 
          />
          <FieldDisplay 
            label="updated_at" 
            value={entity.updatedAt} 
            type="date" 
          />
          <FieldDisplay 
            label="created_by" 
            value={entity.createdBy?.name} 
          />
        </CardContent>
      </Card>
      
      {/* Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ActivityIcon className="h-4 w-4" />
            {t('actions')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full">
            <HistoryIcon className="mr-1 h-4 w-4" />
            {t('view_history')}
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            <DownloadIcon className="mr-1 h-4 w-4" />
            {t('export')}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
\`\`\`

## Responsive Layout Benefits

### Optimal Screen Utilization
\`\`\`css
/* Mobile: Single column, full width */
.grid-cols-1

/* Large screens: 3-column grid (2+1 sidebar) */
lg:grid-cols-3

/* Extra large: 4-column grid (3+1 sidebar) */
xl:grid-cols-4
\`\`\`

### Content Distribution
- **Mobile**: Full-width single column, sidebar below content
- **Tablet**: Same as mobile for consistency
- **Desktop (lg)**: 2/3 main content + 1/3 sidebar
- **Wide (xl)**: 3/4 main content + 1/4 sidebar

## Status Badge Patterns

### Dynamic Status Display
\`\`\`tsx
function getStatusVariant(status: string) {
  const statusMap = {
    active: 'default',
    pending: 'secondary',
    completed: 'success',
    cancelled: 'destructive',
    draft: 'outline',
  } as const;
  
  return statusMap[status] || 'secondary';
}

function getPriorityVariant(priority: string) {
  const priorityMap = {
    high: 'destructive',
    medium: 'default',
    low: 'secondary',
  } as const;
  
  return priorityMap[priority] || 'secondary';
}
\`\`\`

## Header Action Patterns

### Quick Action Buttons
\`\`\`tsx
// Edit action with icon
<Button variant="outline" size="sm" onClick={onEdit}>
  <EditIcon className="mr-1 h-4 w-4" />
  {t('edit')}
</Button>

// Delete action with confirmation
<Button variant="outline" size="sm" onClick={handleDeleteClick}>
  <TrashIcon className="mr-1 h-4 w-4" />
  {t('delete')}
</Button>

// Export action
<Button variant="outline" size="sm" onClick={onExport}>
  <DownloadIcon className="mr-1 h-4 w-4" />
  {t('export')}
</Button>
\`\`\`

## Required Imports

### Standard Imports
\`\`\`tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';

// Icons (adjust based on your icon library)
import {
  EditIcon,
  TrashIcon,
  InfoIcon,
  ActivityIcon,
  HistoryIcon,
  DownloadIcon,
} from '@/components/ui/icons';
\`\`\`

## Implementation Checklist

### ✅ Core Structure
- [ ] Use enhanced DialogContent with optimal responsive sizing
- [ ] Implement title and actions row in header
- [ ] Add status badges below title
- [ ] Create responsive grid layout (1/3/4 columns)

### ✅ Content Organization
- [ ] Use Card components for semantic structure
- [ ] Add icons to CardTitle for visual hierarchy  
- [ ] Apply consistent field label styling
- [ ] Implement grid layout within cards

### ✅ Sidebar Implementation
- [ ] Create dedicated sidebar content area
- [ ] Include metadata information card
- [ ] Add action buttons with full width
- [ ] Use proper icon + text combinations

### ✅ Responsive Behavior
- [ ] Test mobile single-column layout
- [ ] Verify desktop 2+1 column distribution
- [ ] Confirm wide screen 3+1 column layout
- [ ] Ensure sidebar stacks below on mobile

---

**Benefits**: 
- 🎯 **Optimal screen utilization** with responsive grid
- 🧩 **Semantic structure** with Card components  
- ⚡ **Quick actions** prominently displayed in header
- 📊 **Status visibility** with prominent badges
- 📱 **Mobile-first responsive design**

**Next Steps**: Use this pattern for all detail modals. Customize sections and sidebar content based on entity type.
`;