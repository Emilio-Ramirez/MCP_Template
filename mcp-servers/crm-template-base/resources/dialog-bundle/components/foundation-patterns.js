export default `# Dialog Bundle - Foundation Patterns

## Overview
Core dialog foundation patterns providing the base structure, Radix UI integration, and standard attributes for 95%+ consistency across all dialog implementations.

## Core Dialog Foundation

### Built on Radix UI Dialog Primitives
- **Dialog**: Main container with portal rendering
- **AlertDialog**: Confirmation-specific variant
- **DialogPortal**: Renders content in document body
- **DialogOverlay**: Backdrop with interactions
- **DialogContent**: Main content container

### Modal Wrapper Component
\`\`\`typescript
'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
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

## Dialog Structure Patterns

### Standard Layout Components
\`\`\`typescript
// DialogHeader - Title and description with responsive text alignment
<DialogHeader>
  <DialogTitle className="text-left">{title}</DialogTitle>
  <DialogDescription className="text-left">
    {description}
  </DialogDescription>
</DialogHeader>

// DialogContent - Standard padding and max-width constraints
<DialogContent className="sm:max-w-[425px]">
  {/* Content with p-6 padding applied by default */}
</DialogContent>

// DialogFooter - Consistent button layouts
<DialogFooter>
  <Button variant="outline" onClick={onClose}>
    {t('cancel')}
  </Button>
  <Button onClick={onConfirm}>
    {t('confirm')}
  </Button>
</DialogFooter>
\`\`\`

### Dialog Overlay Patterns
\`\`\`typescript
// Standard backdrop with fade animations
<DialogOverlay className="bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

// Prevent click-through
<DialogOverlay onClick={(e) => e.stopPropagation()} />
\`\`\`

## Standard Attributes

### Data Attributes for Testing/Accessibility
\`\`\`typescript
// Testing attributes
<Dialog data-testid="confirmation-dialog">
  <DialogContent data-slot="dialog-content">
    <DialogHeader data-slot="dialog-header">
      <DialogTitle data-slot="dialog-title">{title}</DialogTitle>
    </DialogHeader>
    <DialogFooter data-slot="dialog-footer">
      <Button data-testid="cancel-button">Cancel</Button>
      <Button data-testid="confirm-button">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Accessibility attributes
<Dialog aria-labelledby="dialog-title" aria-describedby="dialog-description">
  <DialogTitle id="dialog-title">{title}</DialogTitle>
  <DialogDescription id="dialog-description">{description}</DialogDescription>
</Dialog>
\`\`\`

## Animation Patterns

### Consistent Enter/Exit Animations
\`\`\`typescript
// Content animations with zoom effect
<DialogContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]" />

// Overlay fade animation
<DialogOverlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
\`\`\`

## SSR Compatibility Pattern

### Hydration Protection
\`\`\`typescript
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

if (!isMounted) {
  return null;
}

return (
  <Dialog open={isOpen} onOpenChange={onChange}>
    {/* Dialog content */}
  </Dialog>
);
\`\`\`

## Required Imports
\`\`\`typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
\`\`\`

## Size Constraints

### Responsive Max-Width Classes
\`\`\`typescript
// Small dialog (confirmation)
<DialogContent className="sm:max-w-[425px]">

// Medium dialog (forms)
<DialogContent className="sm:max-w-[625px]">

// Large dialog (detail views)
<DialogContent className="sm:max-w-[825px]">

// Extra large dialog (complex content)
<DialogContent className="sm:max-w-[1024px]">

// Full screen option
<DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh]">
\`\`\`

## Implementation Checklist

### ✅ Foundation Setup
- [ ] Import all required Dialog components
- [ ] Implement hydration protection for SSR
- [ ] Add proper data-testid attributes
- [ ] Include accessibility attributes

### ✅ Structure Standards
- [ ] Use DialogHeader with title and description
- [ ] Apply standard padding via DialogContent
- [ ] Implement consistent DialogFooter layout
- [ ] Add proper overlay with animations

### ✅ Animation Consistency
- [ ] Apply standard enter/exit animations
- [ ] Include zoom effect on content
- [ ] Fade animation on overlay
- [ ] Smooth state transitions

---

**Next Steps**: Use component patterns like \`confirmation-dialogs\` or \`detail-modals\` for specific implementations.
`;