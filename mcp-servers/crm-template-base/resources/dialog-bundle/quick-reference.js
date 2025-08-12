export default `# Dialog Bundle - Quick Reference (Enhanced)

## Overview
Quick access to the most common dialog patterns, now featuring the optimal combined approach with superior responsive sizing and semantic Card structure.

## Enhanced Detail Modal (Most Common)

### Quick Implementation
\`\`\`tsx
<Dialog open={isOpen} onOpenChange={onClose} modal>
  <DialogContent 
    className="max-h-[90vh] w-[95vw] max-w-none lg:max-w-[85vw] xl:max-w-[80vw] overflow-y-auto [&>button]:hidden"
  >
    <DialogHeader>
      {/* Title + Actions */}
      <div className="flex items-center justify-between">
        <DialogTitle className="text-left text-xl font-bold">
          {t('details_title')} - {entity.id}
        </DialogTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-1 h-4 w-4" />
            {t('edit')}
          </Button>
        </div>
      </div>
      
      {/* Status Badges */}
      <div className="flex items-center gap-4">
        <Badge variant="default">{t('status.active')}</Badge>
      </div>
    </DialogHeader>

    {/* Responsive Grid */}
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {/* Main: 2/3 on lg, 3/4 on xl */}
      <div className="space-y-4 lg:col-span-2 xl:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {t('section_title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldDisplay label="field" value={value} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sidebar: 1/3 on lg, 1/4 on xl */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {t('metadata')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldDisplay label="created_at" value={date} type="date" />
          </CardContent>
        </Card>
      </div>
    </div>
  </DialogContent>
</Dialog>
\`\`\`

## Field Display Pattern

### Standard Field Component
\`\`\`tsx
function FieldDisplay({ label, value, type = 'text' }) {
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

## Confirmation Dialog (Simple)

### Basic Confirmation
\`\`\`tsx
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>{t('confirm_action')}</DialogTitle>
      <DialogDescription>
        {t('confirmation_message')}
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onClick={onClose}>
        {t('cancel')}
      </Button>
      <Button variant="destructive" onClick={onConfirm}>
        {t('confirm')}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
\`\`\`

## Size Reference

### Responsive Sizing Classes
\`\`\`css
/* Enhanced Detail Modal (Optimal) */
max-h-[90vh] w-[95vw] max-w-none lg:max-w-[85vw] xl:max-w-[80vw]

/* Small Dialog (Confirmation) */  
sm:max-w-[425px]

/* Medium Dialog (Forms) */
sm:max-w-[625px]

/* Large Dialog (Complex Forms) */
sm:max-w-[825px]
\`\`\`

## Grid Layout Reference

### Responsive Columns
\`\`\`css
/* Mobile: Single column */
grid-cols-1

/* Desktop: 3 columns (2+1 sidebar) */
lg:grid-cols-3
lg:col-span-2  /* Main content */

/* Wide: 4 columns (3+1 sidebar) */
xl:grid-cols-4
xl:col-span-3  /* Main content */
\`\`\`

## Status Badge Variants

### Standard Status Mapping
\`\`\`tsx
const statusVariants = {
  active: 'default',
  pending: 'secondary', 
  completed: 'success',
  cancelled: 'destructive',
  draft: 'outline'
};

const priorityVariants = {
  high: 'destructive',
  medium: 'default',
  low: 'secondary'
};
\`\`\`

## Common Icons

### Recommended Icons (Lucide React)
\`\`\`tsx
import {
  Edit,        // Edit actions
  Trash2,      // Delete actions  
  Info,        // Information sections
  FileText,    // Details/documents
  Activity,    // Actions/activity
  Calendar,    // Dates/metadata
  History,     // View history
  Download,    // Export data
  User,        // User-related
} from 'lucide-react';
\`\`\`

## Required Imports

### Standard Import Block
\`\`\`tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
\`\`\`

## Animation Classes

### Standard Animations (Built-in)
\`\`\`css
/* Content animations */
data-[state=open]:animate-in 
data-[state=closed]:animate-out 
data-[state=closed]:fade-out-0 
data-[state=open]:fade-in-0 
data-[state=closed]:zoom-out-95 
data-[state=open]:zoom-in-95

/* Overlay fade */
data-[state=open]:animate-in 
data-[state=closed]:animate-out 
data-[state=closed]:fade-out-0 
data-[state=open]:fade-in-0
\`\`\`

## SSR Protection Pattern

### Hydration Safety
\`\`\`tsx
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

if (!isMounted) {
  return null;
}
\`\`\`

## Common Patterns Checklist

### ✅ Enhanced Detail Modal
- [ ] Use optimal responsive sizing (90vh, 95vw, 85vw, 80vw)
- [ ] Header with title + actions row
- [ ] Status badges below title
- [ ] Grid layout: 1/3/4 columns responsive
- [ ] Card components for semantic structure
- [ ] Icons in CardTitle components
- [ ] Consistent field label styling

### ✅ Confirmation Dialog
- [ ] Small fixed width (sm:max-w-[425px])
- [ ] Clear title and description
- [ ] Cancel + confirm buttons in footer
- [ ] Proper destructive variant for dangerous actions

### ✅ Standard Components
- [ ] FieldDisplay with label styling
- [ ] Status/priority badge variants
- [ ] SSR protection with hydration check
- [ ] Proper imports and translations

---

**Key Benefits of Enhanced Pattern**:
- 🎯 **Optimal screen usage**: 95vw mobile, 85vw desktop, 80vw wide
- 🧩 **Semantic structure**: Card components instead of divs
- ⚡ **Header actions**: Quick access to edit/delete
- 📊 **Prominent status**: Badges visible immediately
- 📱 **Mobile-first**: Responsive grid that adapts

**Most Common Usage**: Detail modals for entities with the enhanced pattern providing the best user experience.
`;