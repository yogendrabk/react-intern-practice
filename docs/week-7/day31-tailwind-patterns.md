# Day 31 — Tailwind UI Patterns Reference

**Date:** January 19, 2026  
**Focus:** Advanced Tailwind component patterns for production-ready UI  

---

## Overview

Advanced Tailwind components are built by combining multiple utility classes strategically. This document provides a reference for common patterns and the exact class combinations that make them work.

---

## Pattern 1: Notification Dropdown

### Use Case
Show notifications with unread/read state, badge count, and animated reveal.

### Key Utilities
```
Parent: relative inline-block
Bell button: p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg
Badge: absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center
Dropdown: absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10
Header: px-4 py-3 border-b border-gray-200 bg-gray-50
Item (unread): hover:bg-blue-50 border-l-4 border-l-blue-500 bg-blue-50
Item (read): hover:bg-gray-50
Unread dot: w-2 h-2 bg-blue-500 rounded-full
Time text: text-xs text-gray-500
```

### Why It Works
- `relative` + `absolute` positioned dropdown at top-right
- `z-10` ensures dropdown shows above other content
- `border-l-4 border-l-blue-500` visual accent for unread
- Color contrast (blue-50 bg vs white) makes unread stand out
- Hover `bg-blue-50` provides feedback

### Animation
Use CSS `@keyframes slideDown` or Tailwind's built-in `animate-slide-down` for smooth entrance.

---

## Pattern 2: User Profile Dropdown

### Use Case
Show user avatar, name, email, and menu options (profile, settings, logout).

### Key Utilities
```
Button: flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100
Avatar: w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold ring-2 ring-white
Dropdown: absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10
Profile section: px-4 py-4 border-b border-gray-200 bg-gray-50
Menu items: py-2 space-y-1
Single item: px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-gray-700 text-sm
Logout item: text-red-600 hover:bg-red-50
```

### Why It Works
- Avatar uses gradient (`from-purple-400 to-blue-500`) for visual appeal
- Ring (`ring-2 ring-white`) gives avatar nice border effect
- Profile section highlighted with `bg-gray-50` for visual hierarchy
- Logout item styled differently (red) to warn user
- `space-y-1` tightens vertical menu spacing

### Accessibility
- Menu items are semantic `<a>` or `<button>` elements
- Sufficient color contrast (text-gray-700 on white)
- Clear hover states

---

## Pattern 3: Data Table with Sorting

### Use Case
Display tabular data with sortable headers, alternating row colors, pagination.

### Key Utilities
```
Container: overflow-x-auto
Table: w-full text-sm
Header row: bg-gray-100 border-b-2 border-gray-200
Header cell: px-6 py-3 text-left font-semibold text-gray-900
Sort button: flex items-center gap-2 hover:text-blue-600
Data row: border-b hover:bg-blue-50
Alternating: even:bg-gray-50 (CSS class)
Cell: px-6 py-3 text-gray-600
Status badge: px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold
```

### Why It Works
- `overflow-x-auto` makes table responsive to narrow screens
- `even:bg-gray-50` alternates row colors without extra classes per row
- `hover:bg-blue-50` provides row highlighting on hover
- Badge styling with matching bg/text colors (green-100 + green-700)
- Striped pattern reduces visual noise in large tables

### Sorting Indicator
```html
<span class="text-gray-400">↕</span> <!-- or ↑ ↓ for active sort -->
```

### Pagination
```
Button (inactive): px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50
Button (active): px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
```

---

## Pattern 4: Kanban Board with Drag-Ready Cards

### Use Case
Show task board with multiple columns, cards that look draggable, progress indication.

### Key Utilities
```
Container: grid grid-cols-3 gap-6
Column: bg-gray-100 rounded-lg p-4 min-h-96
Column header: font-semibold text-gray-900 flex items-center gap-2
Column badge: w-3 h-3 rounded-full (bg-gray-400, bg-blue-500, bg-green-500)
Card: bg-white rounded-lg p-3 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing border-l-4
Card title: font-semibold text-gray-900 text-sm
Card description: text-gray-600 text-xs mt-1
Tag badge: px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold
Progress bar: w-full bg-gray-200 rounded-full h-1
Progress fill: bg-blue-500 h-1 rounded-full (width calculated)
Done card: opacity-75 (visual indication)
Done item: line-through (text-decoration)
```

### Why It Works
- `cursor-grab` + `active:cursor-grabbing` hints at draggability (visual only)
- `border-l-4` with color per column status (gray/blue/green)
- Cards use `shadow-sm` normally, `hover:shadow-md` on hover for lift effect
- Progress bar real estate shows work completion
- `opacity-75` for done items suggests completion without being intrusive
- Color-coded tag badges (`text-blue-700 bg-blue-100`) group task types

### Visual Hierarchy
1. Column header with colored dot + count
2. Cards ordered by importance
3. In-progress cards get progress bar
4. Done cards lighter (opacity-75) + strikethrough text

---

## Common Tailwind Class Combinations

### Card Pattern
```html
<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
  <!-- content -->
</div>
```
**Why:** White bg + rounded corners + shadow = floating card. Hover shadow lift. Smooth transition.

### Button Variants
```html
<!-- Primary -->
<button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">

<!-- Secondary -->
<button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">

<!-- Danger -->
<button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
```

### Badge/Tag Pattern
```html
<span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
  Label
</span>
```
**Why:** Matching bg/text colors create cohesive badge. Small padding + rounded-full makes pill shape. Font-semibold makes it pop.

### Flex Centering
```html
<!-- Horizontal & Vertical Center -->
<div class="flex items-center justify-center">

<!-- Horizontal only -->
<div class="flex items-center">

<!-- With gap spacing -->
<div class="flex items-center gap-3">
```

### Responsive Text
```html
<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold">
  Responsive heading
</h1>
```

### Gradient Background
```html
<div class="bg-gradient-to-br from-purple-400 to-blue-500">
```
**Direction:** to-r (right), to-br (bottom-right), to-b (bottom)

---

## Advanced Spacing & Layout

### Container with Max Width
```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Responsive max width with padding -->
</div>
```

### Responsive Grid
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Stack with Space
```html
<div class="space-y-4">
  <!-- Each child gets margin-bottom except last -->
</div>
```

---

## Animation Patterns

### Hover Effects
```css
/* Tailwind classes */
transition-all duration-200     /* Smooth transitions */
hover:scale-105                 /* Slight zoom on hover */
hover:shadow-lg                 /* Shadow lift */
hover:text-blue-600             /* Color change */
hover:bg-gray-50                /* Background change */
```

### Skeleton Animation (pseudo)
```css
animate-pulse    /* Built-in fade in/out animation */
```

---

## Best Practices

1. **Consistency:** Use utility names so spacing/colors are uniform
2. **Hierarchy:** Use `font-semibold` for titles, `text-sm` for descriptions
3. **Color Contrast:** Always pair text colors with bg colors for readability
4. **Hover States:** Every interactive element needs clear hover feedback
5. **Responsive:** Plan mobile first, then add `sm:`, `md:`, `lg:` breakpoint utilities
6. **Reusability:** Extract component classes into CSS modules or component files
7. **Performance:** Only include utilities used (Tailwind's purge works automatically)

---

## Defense Q&A

**Q: Tailwind ma advanced components kasari build garchau? Class combinations kina kaam garchau?**

A: Tailwind utilities are like building blocks. You combine multiple classes to achieve visual effects:
- Positioning: `relative`, `absolute`, `top-0`, `right-0` places dropdown exactly where needed
- Spacing: `px-4 py-3` creates internal space, `gap-2` creates space between flex items
- Colors: `bg-white`, `text-gray-700` provide styling, matching sets (bg-blue-100 + text-blue-700) create cohesive badges
- Effects: `shadow-lg`, `hover:shadow-md`, `rounded-lg` add depth and smoothness
- Interaction: `hover:bg-blue-50`, `cursor-grab`, `active:` classes provide user feedback

Production-ready components emerge when you:
1. Use consistent spacing (4px, 8px, 12px, 16px increments)
2. Apply color matching (related hues for badges, status indicators)
3. Add hover/active states for every interactive element
4. Use transitions (`transition-all duration-200`) for smooth motion
5. Test responsiveness at breakpoints

---

**Date:** January 19, 2026  
**Status:** ✅ Complete  
**Next:** Day 32 — Custom Tailwind theme configuration
