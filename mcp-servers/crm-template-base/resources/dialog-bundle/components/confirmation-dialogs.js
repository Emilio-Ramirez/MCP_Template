export default `# Dialog Bundle - Confirmation Dialogs

## Overview
Complete confirmation dialog patterns for critical user actions including delete, block/unblock, approve/reject, and custom confirmations. Ensures 95%+ consistency across all confirmation flows.

## Confirmation Dialog Types

### 1. AlertModal (Standard Delete Confirmation)
**Purpose**: Confirm destructive actions like deletion
**Pattern**: Simple confirmation with Cancel + Delete buttons

\`\`\`typescript
interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations('Common');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={t('confirm_delete_title')}
      description={t('confirm_delete_description')}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex w-full items-center justify-end space-x-2 pt-6'>
        <Button disabled={loading} variant='outline' onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button disabled={loading} variant='destructive' onClick={onConfirm}>
          {t('delete')}
        </Button>
      </div>
    </Modal>
  );
};
\`\`\`

### 2. BlockModal (Status Change Confirmation)
**Purpose**: Toggle blocked/active status with contextual messaging
**Pattern**: Dynamic content based on current state

\`\`\`typescript
interface BlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  isBlocked: boolean;
  itemName?: string;
}

export const BlockModal: React.FC<BlockModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  isBlocked,
  itemName
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations('Common');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={isBlocked ? t('confirm_unblock_title') : t('confirm_block_title')}
      description={
        isBlocked 
          ? t('confirm_unblock_description', { item: itemName || t('item') })
          : t('confirm_block_description', { item: itemName || t('item') })
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex w-full items-center justify-end space-x-2 pt-6'>
        <Button disabled={loading} variant='outline' onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button 
          disabled={loading} 
          variant={isBlocked ? 'default' : 'destructive'} 
          onClick={onConfirm}
        >
          {isBlocked ? t('unblock') : t('block')}
        </Button>
      </div>
    </Modal>
  );
};
\`\`\`

### 3. Generic Confirmation Dialog
**Purpose**: Flexible confirmation for any action
**Pattern**: Customizable title, description, and button text

\`\`\`typescript
interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  title,
  description,
  confirmText,
  cancelText,
  variant = 'default'
}) => {
  const t = useTranslations('Common');
  
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            {cancelText || t('cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className={variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
          >
            {confirmText || t('confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
\`\`\`

## Button Patterns for Confirmations

### Standard Footer Layout
\`\`\`typescript
// Always: Cancel (outline) on left, Action on right
<div className='flex w-full items-center justify-end space-x-2 pt-6'>
  <Button disabled={loading} variant='outline' onClick={onClose}>
    {t('cancel')}
  </Button>
  <Button disabled={loading} variant='destructive' onClick={onConfirm}>
    {t('delete')}
  </Button>
</div>
\`\`\`

### Button Variants by Action Type
\`\`\`typescript
// Destructive actions (delete, remove, block)
<Button variant='destructive'>{t('delete')}</Button>

// Positive actions (unblock, approve, activate)
<Button variant='default'>{t('approve')}</Button>

// Warning actions (archive, suspend)
<Button variant='outline' className='border-yellow-500 text-yellow-600'>
  {t('archive')}
</Button>
\`\`\`

## State Management Pattern

### useConfirmation Hook
\`\`\`typescript
export const useConfirmation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback(() => {
    return new Promise<boolean>((resolve) => {
      setIsOpen(true);
      resolveRef.current = resolve;
    });
  }, []);

  const handleConfirm = useCallback(async () => {
    setLoading(true);
    if (resolveRef.current) {
      resolveRef.current(true);
    }
    setIsOpen(false);
    setLoading(false);
  }, []);

  const handleCancel = useCallback(() => {
    if (resolveRef.current) {
      resolveRef.current(false);
    }
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    loading,
    confirm,
    handleConfirm,
    handleCancel
  };
};
\`\`\`

### Usage Example
\`\`\`typescript
const { isOpen, loading, confirm, handleConfirm, handleCancel } = useConfirmation();

const handleDelete = async () => {
  const confirmed = await confirm();
  if (confirmed) {
    await deleteItem(id);
    toast.success(t('item_deleted'));
  }
};

return (
  <>
    <Button onClick={handleDelete} variant="destructive">
      Delete
    </Button>
    
    <AlertModal
      isOpen={isOpen}
      onClose={handleCancel}
      onConfirm={handleConfirm}
      loading={loading}
    />
  </>
);
\`\`\`

## Translation Keys

### Standard Confirmation Messages
\`\`\`json
{
  "Common": {
    "confirm_delete_title": "Are you sure?",
    "confirm_delete_description": "This action cannot be undone. This will permanently delete the item.",
    "confirm_block_title": "Block Item",
    "confirm_block_description": "Are you sure you want to block {{item}}?",
    "confirm_unblock_title": "Unblock Item",
    "confirm_unblock_description": "Are you sure you want to unblock {{item}}?",
    "delete": "Delete",
    "block": "Block",
    "unblock": "Unblock",
    "cancel": "Cancel",
    "confirm": "Confirm"
  }
}
\`\`\`

## Accessibility Considerations

### Focus Management
\`\`\`typescript
// Auto-focus cancel button for safety
<AlertDialogCancel autoFocus>
  {t('cancel')}
</AlertDialogCancel>

// Trap focus within dialog
<AlertDialog open={isOpen} onOpenChange={onClose}>
  <FocusTrap>
    <AlertDialogContent>
      {/* Content */}
    </AlertDialogContent>
  </FocusTrap>
</AlertDialog>
\`\`\`

### Keyboard Navigation
- **Escape**: Closes dialog (same as cancel)
- **Tab**: Cycles through interactive elements
- **Enter**: Activates focused button
- **Space**: Activates focused button

## Implementation Checklist

### ✅ Confirmation Setup
- [ ] Choose appropriate dialog type (Alert, Block, Generic)
- [ ] Implement loading states on buttons
- [ ] Add proper translation keys
- [ ] Handle async operations correctly

### ✅ Button Standards
- [ ] Cancel button with outline variant on left
- [ ] Action button with appropriate variant on right
- [ ] Disabled state during loading
- [ ] Proper spacing (space-x-2)

### ✅ User Experience
- [ ] Clear, descriptive titles
- [ ] Explain consequences in description
- [ ] Appropriate button variants for action type
- [ ] Loading feedback during operations

---

**Next Steps**: Use \`state-management\` for complex flows or \`quick-reference\` for common patterns.
`;