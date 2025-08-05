export default `# Dialog Bundle - Quick Reference

## Most Common Dialog Patterns Cheat Sheet

### Basic Dialog Structure
\`\`\`typescript
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {/* Content */}
    </div>
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
\`\`\`

### Confirmation Dialog Pattern
\`\`\`typescript
const [isOpen, setIsOpen] = useState(false);
const [loading, setLoading] = useState(false);

const handleDelete = async () => {
  setLoading(true);
  try {
    await deleteItem(id);
    toast.success('Item deleted');
    setIsOpen(false);
  } catch (error) {
    toast.error('Failed to delete');
  } finally {
    setLoading(false);
  }
};

<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete'}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
\`\`\`

### Modal Wrapper Component
\`\`\`typescript
export const Modal = ({ title, description, isOpen, onClose, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
\`\`\`

### Common Button Layouts
\`\`\`typescript
// Standard footer (Cancel + Action)
<DialogFooter>
  <Button variant="outline" onClick={onClose}>Cancel</Button>
  <Button onClick={onConfirm}>Confirm</Button>
</DialogFooter>

// Destructive action
<DialogFooter>
  <Button variant="outline" onClick={onClose}>Cancel</Button>
  <Button variant="destructive" onClick={onDelete}>Delete</Button>
</DialogFooter>

// With loading state
<DialogFooter>
  <Button variant="outline" onClick={onClose} disabled={loading}>
    Cancel
  </Button>
  <Button onClick={onSubmit} disabled={loading}>
    {loading ? 'Saving...' : 'Save'}
  </Button>
</DialogFooter>
\`\`\`

### Size Classes
\`\`\`typescript
// Small (confirmations)
<DialogContent className="sm:max-w-[425px]">

// Medium (forms)
<DialogContent className="sm:max-w-[625px]">

// Large (detail views)
<DialogContent className="sm:max-w-[825px]">
\`\`\`

### SSR Hydration Protection
\`\`\`typescript
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

if (!isMounted) return null;

return <Dialog>...</Dialog>;
\`\`\`

### State Management Hook
\`\`\`typescript
const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, loading, setLoading, open, close };
};
\`\`\`

## Essential Imports
\`\`\`typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
\`\`\`

## CSS Classes Quick Reference
- **Overlay**: \`bg-black/50\`
- **Content padding**: \`p-6\` (default)
- **Footer spacing**: \`space-x-2\`
- **Button alignment**: \`justify-end\`
- **Loading opacity**: \`opacity-50\`

## Animation Classes
- **Fade in**: \`animate-in fade-in-0\`
- **Fade out**: \`animate-out fade-out-0\`
- **Zoom**: \`zoom-in-95 zoom-out-95\`
- **Duration**: \`duration-200\`

---

**For detailed patterns**: Request specific components like \`foundation-patterns\`, \`confirmation-dialogs\`, etc.
`;