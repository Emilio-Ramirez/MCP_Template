export default `# Design System Bundle - Shared UI Foundation

## Overview
Shared design system foundation that ALL other bundles reference. This ensures consistency across all components and eliminates duplication. Every bundle (table, form, etc.) must use these patterns.

## Core Design Components
This is the single source of truth for all UI elements used across bundles:

### 1. Input Field System
#### Standard Input Components
- Text inputs with consistent styling
- Email/Password inputs
- Textarea components with proper sizing
- [BASE INPUT PATTERNS TO BE FILLED]

#### Specialized Inputs
- Dropdown/Select components
- Date picker inputs
- Number inputs with validation
- File upload components
- Toggle switches and checkboxes
- Radio button groups
- [SPECIALIZED INPUT PATTERNS TO BE FILLED]

#### Input States
- Default state styling
- Focus state with proper highlighting
- Error state with red indicators
- Success state with green indicators
- Disabled state with reduced opacity
- Loading state with spinners
- [INPUT STATE SPECIFICATIONS TO BE FILLED]

### 2. Button System
#### Primary Buttons
- Main action buttons (Save, Submit, Create)
- Hover and active states
- Loading states with spinners
- [PRIMARY BUTTON PATTERNS TO BE FILLED]

#### Secondary Buttons
- Cancel, Reset, Edit actions
- Outline button styles
- Ghost button variants
- [SECONDARY BUTTON PATTERNS TO BE FILLED]

#### Button Sizes
- Small buttons for compact spaces
- Medium buttons (default)
- Large buttons for primary actions
- [BUTTON SIZE SPECIFICATIONS TO BE FILLED]

### 3. Color System
#### Primary Colors
- Brand primary color
- Primary hover states
- Primary disabled states
- [PRIMARY COLOR PALETTE TO BE FILLED]

#### Semantic Colors
- Success green colors
- Error red colors
- Warning yellow colors
- Info blue colors
- [SEMANTIC COLOR SPECIFICATIONS TO BE FILLED]

#### Neutral Colors
- Text colors (primary, secondary, muted)
- Background colors
- Border colors
- [NEUTRAL COLOR PALETTE TO BE FILLED]

### 4. Typography System
#### Text Hierarchy
- H1, H2, H3 heading styles
- Body text sizes and weights
- Caption and small text
- [TYPOGRAPHY SCALE TO BE FILLED]

#### Input Labels
- Required field indicators
- Optional field styling
- Help text formatting
- [LABEL SPECIFICATIONS TO BE FILLED]

#### Error Messages
- Error text styling
- Success message formatting
- Warning text appearance
- [MESSAGE FORMATTING TO BE FILLED]

### 5. Spacing System
#### Margins and Padding
- Consistent spacing scale (4px, 8px, 16px, 24px, 32px)
- Component internal spacing
- Layout spacing between elements
- [SPACING SPECIFICATIONS TO BE FILLED]

#### Grid System
- Container widths and max-widths
- Column gutters and margins
- Responsive breakpoints
- [GRID SYSTEM TO BE FILLED]

### 6. State Management Patterns
#### Loading States
- Spinner components
- Skeleton loading patterns
- Button loading states
- [LOADING PATTERNS TO BE FILLED]

#### Empty States
- No data illustrations
- Empty state messaging
- Call-to-action patterns
- [EMPTY STATE DESIGNS TO BE FILLED]

#### Error States
- Error boundary displays
- Inline error messages
- Form validation errors
- [ERROR HANDLING PATTERNS TO BE FILLED]

### 7. Interactive Elements
#### Hover Effects
- Button hover transitions
- Link hover states
- Card hover effects
- [HOVER SPECIFICATIONS TO BE FILLED]

#### Focus Management
- Keyboard focus indicators
- Tab order management
- Focus trap patterns
- [FOCUS PATTERNS TO BE FILLED]

#### Animations
- Transition timing functions
- Micro-interactions
- Loading animations
- [ANIMATION SPECIFICATIONS TO BE FILLED]

## Usage by Other Bundles

### How Bundles Reference This System:
Other bundles should NEVER define their own input or button styles. Instead, they reference this bundle:

\`\`\`
## Input Fields
Refer to the Design System Bundle for all input styling:
- Text inputs: Use design-system-bundle standard input patterns
- Dropdowns: Use design-system-bundle select patterns  
- Validation: Use design-system-bundle error/success states

## Buttons
Refer to the Design System Bundle for all button styling:
- Primary actions: Use design-system-bundle primary button patterns
- Secondary actions: Use design-system-bundle secondary button patterns
\`\`\`

## Implementation Templates

### Standard Input Template
\`\`\`typescript
// [INPUT COMPONENT TEMPLATE TO BE FILLED]
\`\`\`

### Button Component Template
\`\`\`typescript
// [BUTTON COMPONENT TEMPLATE TO BE FILLED]
\`\`\`

### Color Variables Template
\`\`\`css
/* [COLOR VARIABLE DEFINITIONS TO BE FILLED] */
\`\`\`

### Typography Template
\`\`\`css
/* [TYPOGRAPHY DEFINITIONS TO BE FILLED] */
\`\`\`

## Design Tokens

### Spacing Scale
\`\`\`
// [SPACING TOKEN DEFINITIONS TO BE FILLED]
\`\`\`

### Color Tokens
\`\`\`
// [COLOR TOKEN DEFINITIONS TO BE FILLED]
\`\`\`

### Typography Tokens
\`\`\`
// [TYPOGRAPHY TOKEN DEFINITIONS TO BE FILLED]
\`\`\`

## Component Specifications

### Input Field Requirements
- Must support all defined states (default, focus, error, success, disabled)
- Must include proper accessibility attributes
- Must follow consistent sizing patterns
- Must support validation message display

### Button Requirements
- Must support all size variants
- Must include loading states
- Must support disabled states
- Must include proper hover/focus effects

### Color Usage Rules
- Primary colors only for main actions
- Semantic colors only for their intended purpose
- Neutral colors for text and backgrounds
- Consistent contrast ratios for accessibility

### Typography Rules
- Use defined text hierarchy
- Consistent line heights and spacing
- Proper font weights for emphasis
- Accessible text contrast ratios

## Import Cleanliness Patterns

### 1. Icon Import Patterns
#### ❌ WRONG - Causes unused import warnings:
\`\`\`typescript
import {
  AlertTriangle,  // REMOVE if not used in JSX
  CheckCircle,
  Clock,         // REMOVE if not used in JSX  
  Globe,
  MapPin,
  XCircle
} from 'lucide-react';
\`\`\`

#### ✅ CORRECT - Only import what's actually used:
\`\`\`typescript
import {
  CheckCircle,
  Globe,
  MapPin,
  XCircle
} from 'lucide-react';
\`\`\`

### 2. Component Import Patterns
#### ❌ WRONG - Badge imports not used:
\`\`\`typescript
import { CountryBadge } from './country-badge';
import { StatusBadge } from './status-badge';
// Then never used in JSX
\`\`\`

#### ✅ CORRECT - Remove unused badge imports:
\`\`\`typescript
// Only import what's actually rendered
\`\`\`

### 3. UI Component Import Patterns
#### ❌ WRONG - Dropdown components imported but not used:
\`\`\`typescript
import {
  DropdownMenu,
  DropdownMenuContent,  // REMOVE if no dropdown content
  DropdownMenuItem,     // REMOVE if no menu items
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
\`\`\`

#### ✅ CORRECT - Only import active dropdown parts:
\`\`\`typescript
import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
\`\`\`

### 4. Type Import Patterns
#### ❌ WRONG - Type imports not used for typing:
\`\`\`typescript
import { Client, User } from '@/constants/data';
// Then never used as types, only data is used
\`\`\`

#### ✅ CORRECT - Import only needed types:
\`\`\`typescript
import { clientsData } from '@/constants/data';
// Don't import types unless used for type annotations
\`\`\`

### 5. Utility Import Patterns
#### ❌ WRONG - Utility imports not used:
\`\`\`typescript
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
// Then never used in component
\`\`\`

#### ✅ CORRECT - Remove unused utilities:
\`\`\`typescript
// Only import utilities actually used in component
\`\`\`

### MANDATORY Import Validation Checklist
Before completing any component implementation:

1. **Icon Validation**: ✅ Every imported icon must be used in JSX
2. **Component Validation**: ✅ Every imported component must be rendered
3. **Type Validation**: ✅ Every imported type must be used in type annotations
4. **Utility Validation**: ✅ Every imported utility must be called in code

### Import Audit Process
1. **Pre-implementation**: Review all imports before adding them
2. **During implementation**: Only import as needed for current functionality
3. **Post-implementation**: Remove any imports that became unused during development
4. **Lint validation**: Run \`npm run lint\` to catch unused imports

## Best Practices
- Always reference this bundle from other bundles
- Never override design system patterns in individual bundles
- Maintain consistency across all implementations
- Update this bundle to affect all components system-wide
- Test changes across all bundles that reference this system
- **CRITICAL**: Follow import cleanliness patterns to prevent lint warnings

## Common Mistakes to Avoid
- Defining custom input styles in individual bundles
- Creating one-off button styles outside the system
- Using colors not defined in the color system
- Breaking the typography hierarchy
- Inconsistent spacing patterns
- **CRITICAL Import Mistakes:**
  - Importing icons that are never used in JSX
  - Importing components that are never rendered
  - Importing types that are never used for type annotations
  - Importing utilities that are never called
  - Adding imports speculatively "just in case"
  - Not cleaning up imports after refactoring

---

*This bundle is the foundation of UI consistency. ALL other bundles must reference these patterns instead of defining their own.*
`;