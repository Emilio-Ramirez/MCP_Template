export default `# Dialog Bundle - Detail View Template (Enhanced)

## Overview  
Complete implementation template for detail view dialogs using the optimal combined approach. Features responsive sizing, semantic Card structure, header actions, and modular organization.

## Complete Detail Dialog Template

### Main Implementation File
\`\`\`tsx
// components/dialogs/EntityDetailModal.tsx
'use client';

import { useEffect, useState } from 'react';
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

// Import your icons (adjust paths based on your setup)
import {
  Edit,
  Trash2,
  Info,
  Activity,
  History,
  Download,
  User,
  Calendar,
  FileText,
} from 'lucide-react';

interface EntityDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  entity: any;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function EntityDetailModal({
  isOpen,
  onClose,
  entity,
  onEdit,
  onDelete,
}: EntityDetailModalProps) {
  const t = useTranslations();
  const [isMounted, setIsMounted] = useState(false);

  // SSR protection
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !entity) {
    return null;
  }

  const handleEdit = () => {
    onEdit?.();
    onClose();
  };

  const handleDelete = () => {
    onDelete?.();
    onClose();
  };

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
              {t('entity_details')} - {entity.id}
            </DialogTitle>
            <div className="flex gap-2">
              {onEdit && (
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="mr-1 h-4 w-4" />
                  {t('edit')}
                </Button>
              )}
              {onDelete && (
                <Button variant="outline" size="sm" onClick={handleDelete}>
                  <Trash2 className="mr-1 h-4 w-4" />
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
            {entity.type && (
              <Badge variant="outline">
                {t(\`type.\${entity.type}\`)}
              </Badge>
            )}
          </div>
        </DialogHeader>

        {/* Responsive Grid Layout */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {/* Main Content */}
          <div className="space-y-4 lg:col-span-2 xl:col-span-3">
            
            {/* Basic Information Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  {t('basic_information')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FieldDisplay 
                    label="name" 
                    value={entity.name} 
                  />
                  <FieldDisplay 
                    label="description" 
                    value={entity.description} 
                  />
                  <FieldDisplay 
                    label="category" 
                    value={entity.category} 
                  />
                  <FieldDisplay 
                    label="value" 
                    value={entity.value} 
                    type="currency" 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Details Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {t('additional_details')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FieldDisplay 
                    label="reference_number" 
                    value={entity.referenceNumber} 
                  />
                  <FieldDisplay 
                    label="assigned_to" 
                    value={entity.assignedTo?.name} 
                  />
                  <FieldDisplay 
                    label="due_date" 
                    value={entity.dueDate} 
                    type="date" 
                  />
                  <FieldDisplay 
                    label="progress" 
                    value={\`\${entity.progress || 0}%\`} 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notes/Comments Section */}
            {entity.notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {t('notes')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{entity.notes}</p>
                </CardContent>
              </Card>
            )}

          </div>
          
          {/* Sidebar */}
          <div className="space-y-4">
            
            {/* Metadata Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
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
                <FieldDisplay 
                  label="updated_by" 
                  value={entity.updatedBy?.name} 
                />
              </CardContent>
            </Card>
            
            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  {t('quick_actions')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <History className="mr-1 h-4 w-4" />
                  {t('view_history')}
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="mr-1 h-4 w-4" />
                  {t('export_data')}
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <User className="mr-1 h-4 w-4" />
                  {t('assign_user')}
                </Button>
              </CardContent>
            </Card>

            {/* Related Items Card (if applicable) */}
            {entity.relatedItems && entity.relatedItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {t('related_items')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {entity.relatedItems.slice(0, 5).map((item: any) => (
                      <div key={item.id} className="text-sm">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">{item.type}</p>
                      </div>
                    ))}
                    {entity.relatedItems.length > 5 && (
                      <p className="text-xs text-muted-foreground">
                        {t('and_n_more', { count: entity.relatedItems.length - 5 })}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Field Display Component
interface FieldDisplayProps {
  label: string;
  value: any;
  type?: 'text' | 'date' | 'currency' | 'number';
}

function FieldDisplay({ label, value, type = 'text' }: FieldDisplayProps) {
  const t = useTranslations();

  const formatValue = () => {
    if (!value && value !== 0) return t('not_specified');
    
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'number':
        return value.toLocaleString();
      default:
        return value;
    }
  };

  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground">
        {t(label)}
      </label>
      <p className="mt-1">{formatValue()}</p>
    </div>
  );
}

// Status variant helpers
function getStatusVariant(status: string) {
  const statusMap = {
    active: 'default',
    pending: 'secondary',
    completed: 'success',
    cancelled: 'destructive',
    draft: 'outline',
    in_progress: 'default',
  } as const;
  
  return statusMap[status as keyof typeof statusMap] || 'secondary';
}

function getPriorityVariant(priority: string) {
  const priorityMap = {
    high: 'destructive',
    medium: 'default',
    low: 'secondary',
    urgent: 'destructive',
  } as const;
  
  return priorityMap[priority as keyof typeof priorityMap] || 'secondary';
}
\`\`\`

## Usage Pattern

### Basic Implementation
\`\`\`tsx
// pages/entities/index.tsx
import EntityDetailModal from '@/components/dialogs/EntityDetailModal';

export default function EntitiesPage() {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleViewDetails = (entity: any) => {
    setSelectedEntity(entity);
    setIsDetailOpen(true);
  };

  const handleEdit = () => {
    // Navigate to edit form or open edit modal
    router.push(\`/entities/\${selectedEntity.id}/edit\`);
  };

  const handleDelete = () => {
    // Show confirmation dialog
    setShowDeleteConfirm(true);
  };

  return (
    <>
      {/* Your main content */}
      
      <EntityDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        entity={selectedEntity}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}
\`\`\`

## Customization Guidelines

### Adding New Sections
\`\`\`tsx
// Add new content card in main area
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <YourIcon className="h-4 w-4" />
      {t('your_section_title')}
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* Your content */}
  </CardContent>
</Card>
\`\`\`

### Adding Sidebar Elements
\`\`\`tsx
// Add new sidebar card
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <YourIcon className="h-4 w-4" />
      {t('sidebar_section')}
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* Sidebar content */}
  </CardContent>
</Card>
\`\`\`

## Required Translations

### Translation Keys
\`\`\`json
{
  "entity_details": "Entity Details",
  "edit": "Edit",
  "delete": "Delete",
  "basic_information": "Basic Information",
  "additional_details": "Additional Details",
  "notes": "Notes",
  "metadata": "Metadata", 
  "quick_actions": "Quick Actions",
  "related_items": "Related Items",
  "view_history": "View History",
  "export_data": "Export Data",
  "assign_user": "Assign User",
  "not_specified": "Not specified",
  "and_n_more": "and {{count}} more...",
  "status": {
    "active": "Active",
    "pending": "Pending", 
    "completed": "Completed",
    "cancelled": "Cancelled",
    "draft": "Draft",
    "in_progress": "In Progress"
  },
  "priority": {
    "high": "High",
    "medium": "Medium", 
    "low": "Low",
    "urgent": "Urgent"
  },
  "type": {
    "request": "Request",
    "task": "Task",
    "project": "Project"
  }
}
\`\`\`

## Implementation Checklist

### ✅ Core Setup
- [ ] Copy template to your dialogs directory
- [ ] Update import paths for your project
- [ ] Customize entity interface/types
- [ ] Add required translation keys

### ✅ Content Customization  
- [ ] Update field names and types for your entity
- [ ] Add/remove sections as needed
- [ ] Customize sidebar content
- [ ] Update icon imports

### ✅ Integration
- [ ] Connect to your state management
- [ ] Implement edit/delete handlers
- [ ] Add proper error handling
- [ ] Test responsive behavior

### ✅ Accessibility
- [ ] Verify keyboard navigation
- [ ] Test with screen readers
- [ ] Confirm focus management
- [ ] Validate ARIA attributes

---

**Benefits**:
- ✨ **Ready to use** complete implementation
- 📱 **Fully responsive** with optimal sizing
- 🎨 **Semantic structure** with Card components
- ⚡ **Header actions** for quick workflows
- 🏷️ **Status visibility** with prominent badges
- 🔧 **Easily customizable** modular sections

**Next Steps**: Copy template, customize for your entity type, and integrate with your application.
`;