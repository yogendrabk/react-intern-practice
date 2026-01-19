# Tailwind CSS Patterns & Common UI Components
# Day 31 Reference Guide
## Breaking down complex UI into Tailwind utilities

---

## Pattern 1: Dropdown / Dropdown Menu

**Use Case:** Notification dropdowns, user menus, action menus

### Basic Structure
```html
<!-- Container with relative positioning -->
<div class="relative inline-block">
  <!-- Trigger button -->
  <button class="px-4 py-2 rounded-lg hover:bg-gray-100">
    Menu
  </button>
  
  <!-- Dropdown panel (absolutely positioned) -->
  <div class="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl">
    <!-- Menu items -->
  </div>
</div>
```

### Key Utilities Explained

| Utility | Purpose | Why |
|---------|---------|-----|
| `relative` | Parent container gets positioning context | Needed for absolute child positioning |
| `absolute` | Position dropdown overlay | Float above other content |
| `top-full` + `mt-2` | Position below button with small gap | More reliable than `top: calc(100% + ...)` |
| `left-0` / `right-0` | Align with button edge | Consistent dropdown alignment |
| `z-50` | Layer above all other content | Ensure dropdown appears on top |
| `shadow-xl` | Deep shadow | Visual elevation shows dropdown is floating |

### Advanced Multi-Level Menu

```html
<!-- Group hover effects -->
<div class="group">
  <a class="text-slate-700 group-hover:text-blue-600">Item</a>
  <!-- Nested menu appears on hover -->
  <div class="hidden group-hover:block absolute ...">
    <!-- Submenu items -->
  </div>
</div>
```

---

## Pattern 2: Badge / Status Indicator

**Use Case:** Notification counts, status labels, tags

### Simple Badge

```html
<!-- Compact badge with inline-flex -->
<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
  ✓ Active
</span>
```

### Badge with Icon

```html
<!-- Badge in corner of element (absolute) -->
<div class="relative inline-block">
  <button class="w-12 h-12 rounded-full">
    🔔
  </button>
  <!-- Badge in top-right corner -->
  <span class="absolute top-0 right-0 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
    5
  </span>
</div>
```

### Key Utilities

| Utility | Purpose |
|---------|---------|
| `inline-flex` | Badge takes only needed width (not full line) |
| `items-center` | Vertically center badge content |
| `px-3 py-1` | Horizontal padding larger than vertical (badge shape) |
| `rounded-full` | Pill-shaped badge (border-radius: 9999px) |
| `bg-{color}-100` + `text-{color}-800` | Soft background, darker text for contrast |
| `transform translate-x-1/2` | Position badge corner precisely (CSS math) |

---

## Pattern 3: Data Table with Alternating Rows

**Use Case:** Data grids, lists, dashboards

### Structure

```html
<table class="w-full">
  <thead class="bg-slate-50 border-b-2 border-slate-200">
    <tr>
      <th class="px-6 py-4 text-left text-sm font-semibold">Name</th>
      <th class="px-6 py-4 text-left text-sm font-semibold">Status</th>
    </tr>
  </thead>
  
  <tbody class="divide-y divide-slate-100">
    <!-- Even rows: white background -->
    <tr class="bg-white hover:bg-slate-50">
      <td class="px-6 py-4">...</td>
    </tr>
    
    <!-- Odd rows: light gray background -->
    <tr class="bg-slate-50 hover:bg-slate-100">
      <td class="px-6 py-4">...</td>
    </tr>
  </tbody>
</table>
```

### Key Utilities

| Utility | Purpose |
|---------|---------|
| `divide-y` | Add horizontal line between all rows (replaces border styling) |
| `bg-white` + `bg-slate-50` | Alternating row colors |
| `hover:bg-slate-{lighter}` | Row highlighting on mouseover |
| `px-6 py-4` | Standard table cell padding (horizontal larger) |
| `text-left` | Align text to left (numbers go right with `text-right`) |

### Sortable Header Pattern

```html
<th class="cursor-pointer hover:bg-slate-100 group">
  <div class="flex items-center gap-2 font-semibold">
    Name
    <!-- Sort arrow indicator -->
    <span class="inline-block text-slate-400 group-hover:text-slate-600">
      <svg class="w-4 h-4"><!-- arrow icon --></svg>
    </span>
  </div>
</th>
```

---

## Pattern 4: Visual Hierarchy with Color

**Use Case:** Emphasizing important information

### Status Colors

```html
<!-- Success/Green -->
<span class="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-medium">
  ✓ Complete
</span>

<!-- Warning/Amber -->
<span class="bg-amber-100 text-amber-800 px-3 py-1 rounded text-sm font-medium">
  ⏿ Pending
</span>

<!-- Error/Red -->
<span class="bg-red-100 text-red-800 px-3 py-1 rounded text-sm font-medium">
  ✕ Error
</span>

<!-- Info/Blue -->
<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium">
  ℹ Update
</span>
```

### Tailwind Color Palette
Every main color has 50-950 shades:
- `bg-color-50`: Very light (backgrounds)
- `bg-color-100`: Light (secondary backgrounds)
- `text-color-800`: Dark (readable text over light bg)
- `bg-color-600`: Medium (buttons, primary actions)
- `bg-color-900`: Dark (headings, dark mode)

---

## Pattern 5: Card with Hover Lift Effect

**Use Case:** Project cards, product cards, content blocks

### Basic Card

```html
<div class="bg-white rounded-lg shadow hover:shadow-xl hover:translate-y-(-2) transition-all duration-200 cursor-pointer">
  <!-- Content -->
</div>
```

### Key Utilities

| Utility | Purpose | Why |
|---------|---------|-----|
| `rounded-lg` | Border radius (12px) | Standard card roundness |
| `shadow` | Subtle drop shadow | Default elevation |
| `hover:shadow-xl` | Larger shadow on hover | Lift effect (more shadow = feels higher) |
| `hover:translate-y-(-2)` | Move up 2px on hover | Actual lift animation |
| `transition-all duration-200` | Smooth animation (200ms) | Professional feel, not jerky |

### Cards with Border Accent

```html
<!-- Left border accent for visual interest -->
<div class="border-l-4 border-blue-500 ...">
  <!-- Blue left edge for category/status -->
</div>
```

---

## Pattern 6: Flexbox Layout Utilities

**Use Case:** Aligning content horizontally, distributing space

### Horizontal Centering

```html
<!-- Center items horizontally -->
<div class="flex items-center justify-center gap-4">
  <icon />
  <text />
</div>
```

### Space Distribution

```html
<!-- Item on left, item on right -->
<div class="flex items-center justify-between">
  <heading>Title</heading>
  <button>Action</button>
</div>

<!-- Add gap between flex items (replaces margin hacks) -->
<div class="flex items-center gap-3">
  <img class="w-10 h-10 rounded-full" />
  <div>
    <name />
    <email />
  </div>
</div>
```

### Key Flex Utilities

| Utility | Purpose |
|---------|---------|
| `flex` | Enable flexbox |
| `flex-col` | Stack children vertically |
| `items-center` | Center children vertically |
| `justify-center` | Center children horizontally |
| `justify-between` | Push first/last to edges |
| `gap-3` | Space between items (works with flex + grid) |
| `flex-1` | Child takes available space equally |
| `flex-shrink-0` | Prevent shrinking (useful for icons) |

---

## Pattern 7: Responsive Design (Mobile-First)

**Use Case:** Different layouts on mobile, tablet, desktop

### Breakpoints

```html
<!-- Mobile first: 1 column -->
<!-- Tablet (md): 2 columns -->
<!-- Desktop (lg): 3 columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <card />
  <card />
  <card />
</div>
```

### Hide/Show Elements

```html
<!-- Hide on mobile, show on tablet+ -->
<div class="hidden md:block">
  Desktop sidebar
</div>

<!-- Show on mobile, hide on tablet+ -->
<div class="md:hidden">
  Mobile menu
</div>
```

### Responsive Text

```html
<h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">
  Responsive Heading
</h1>
```

---

## Pattern 8: Form Elements

**Use Case:** Input fields, validation states

### Input with Label

```html
<div class="flex flex-col gap-2">
  <label class="font-medium text-slate-900">Email</label>
  <input 
    type="email"
    class="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    placeholder="your@email.com"
  />
</div>
```

### Input States

```html
<!-- Normal state -->
<input class="border border-slate-300" />

<!-- Focus state (blue ring) -->
<input class="focus:outline-none focus:ring-2 focus:ring-blue-500" />

<!-- Error state (red ring) -->
<input class="border-red-300 focus:ring-red-500" />

<!-- Disabled state -->
<input disabled class="bg-slate-50 cursor-not-allowed opacity-50" />
```

---

## Pattern 9: Group Hover Effects

**Use Case:** Cards that change on hover, interactive lists

### Group Hover

```html
<div class="group hover:shadow-lg transition-shadow">
  <!-- Text color changes when parent group is hovered -->
  <p class="text-slate-600 group-hover:text-blue-600">Link text</p>
  
  <!-- Hidden element appears on hover -->
  <button class="hidden group-hover:block">Edit</button>
</div>
```

### Use Cases
- Menu items highlight submenu
- Cards show action buttons on hover
- Lists show delete/edit on hover

---

## Pattern 10: Loading States & Animations

**Use Case:** Skeleton screens, spinners, transitions

### Simple Pulse/Skeleton

```html
<!-- Shimmer placeholder while loading -->
<div class="animate-pulse">
  <div class="h-12 bg-slate-200 rounded-lg mb-4"></div>
  <div class="h-4 bg-slate-200 rounded mb-2"></div>
  <div class="h-4 bg-slate-200 rounded w-5/6"></div>
</div>
```

### Spinner

```html
<!-- Animated loading spinner -->
<svg class="animate-spin w-6 h-6 text-blue-600">
  <!-- Circle or icon -->
</svg>
```

---

## Pattern 11: Modal / Overlay

**Use Case:** Dialogs, confirmation popups

### Fixed Overlay

```html
<!-- Full-screen backdrop (visible by default for demo) -->
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <!-- Modal card -->
  <div class="bg-white rounded-lg shadow-2xl w-96 p-6">
    <!-- Content -->
  </div>
</div>
```

### Key Utilities

| Utility | Purpose |
|---------|---------|
| `fixed` | Cover entire viewport |
| `inset-0` | Same as top-0 right-0 bottom-0 left-0 (full coverage) |
| `bg-black/50` | Brightness 50% opacity overlay |
| `z-50` | Above all page content |
| `flex items-center justify-center` | Center modal in viewport |

---

## Pattern 12: Spacing Consistency

**Use Case:** Creating professional spacing throughout app

### Spacing Scale

```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 2.5rem (40px)
```

### Apply Spacing Utilities

```html
<!-- Padding (inside element) -->
<div class="p-6">Full padding</div>
<div class="px-6 py-4">Horizontal padding 24px, Vertical 16px</div>

<!-- Margin (outside element) -->
<div class="mt-8 mb-4">Top margin 32px, Bottom margin 16px</div>

<!-- Gap between children -->
<div class="flex gap-4">
  <!-- 16px space between items -->
</div>
```

---

## Quick Reference: Most Used Utilities

### Layout
- `flex` / `grid` — Flexbox or Grid container
- `gap-{n}` — Space between children
- `justify-between` / `items-center` — Alignment

### Color
- `bg-{color}-{shade}` — Background color
- `text-{color}-{shade}` — Text color
- `border-{color}-{shade}` — Border color

### Shadow & Effects
- `shadow` / `shadow-lg` — Drop shadow
- `hover:shadow-xl` — Hover effect
- `rounded-lg` — Border radius

### Spacing
- `p-{n}` / `m-{n}` — Padding/Margin
- `px-{n}` / `py-{n}` — Horizontal/Vertical padding

### Positioning
- `relative` / `absolute` — Positioning context
- `top-0 left-0` — Position values

### Responsive
- `md:` / `lg:` / `xl:` — Breakpoint prefixes
- `hidden md:block` — Show/hide at breakpoint

---

## Common Mistakes to Avoid

❌ **DON'T:** Use inline `style=""` for styling already in Tailwind
✅ **DO:** Use Tailwind classes (easier to maintain, consistent)

❌ **DON'T:** Set arbitrary colors not in palette (breaks design system)
✅ **DO:** Use color scale (gray-50 to gray-900)

❌ **DON'T:** Create complex custom CSS when Tailwind can do it
✅ **DO:** Compose multiple utilities (flexbox, gap, padding instead of complex grid-template)

❌ **DON'T:** Forget responsive prefixes
✅ **DO:** Design mobile-first with `md:`, `lg:` breakpoints

---

## Defense Q&A

**Q: Tailwind bohemian use garchau? Custom CSS likhe huncha na?**
A: Tailwind utility-first approach use garchau. Pre-made classes compose garye complex UI banxau. Custom CSS sirf animation keyframes aur special effect ko lagi use garchau. Production ma faster aani consistent theme maintain huncha.

**Q: Responsive design layout kasari handle garchau?**
A: Mobile-first mindset — base styling ta mobile ko lagi garxau. Feri `md:`, `lg:` prefixes use garye tablet/desktop ko lagi modify garchau. Breakpoints: sm=640px, md=768px, lg=1024px, xl=1280px.

