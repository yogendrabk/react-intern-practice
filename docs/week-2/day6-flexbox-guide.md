# Flexbox Complete Reference Guide

**Date:** December 15, 2025  
**Topic:** CSS Flexbox - Yogendra's Personal Study Guide  

---

## What is Flexbox?

Flexbox (Flexible Box Layout) is CSS layout system designed for one-dimensional layout (row OR column, not both like Grid). It perfect for: navigation, centered components, item distribution, flexible spacing. Think of it like container with items inside — you controlling how items positioned, spaced, and aligned.

Key concept: **Flex container** (parent with `display: flex`) and **flex items** (children inside).

---

## Container Properties (Parent Element)

| Property | Values | What It Does | When to Use |
|----------|--------|-------------|------------|
| `display` | `flex` | Enable flexbox on container | ALWAYS first step |
| `flex-direction` | `row` (default), `column`, `row-reverse`, `column-reverse` | Control main axis direction (row left-to-right, column top-to-bottom) | When want vertical stacking, change from default row |
| `justify-content` | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly` | Align items along MAIN axis (primary direction) | When want items spaced out or centered horizontally |
| `align-items` | `flex-start`, `flex-end`, `center`, `stretch`, `baseline` | Align items along CROSS axis (perpendicular direction) | When want items aligned vertically (in row layout) |
| `align-content` | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `stretch` | Like justify-content but for multi-line flex containers | When flex-wrap: wrap creating multiple rows, want vertical spacing control |
| `flex-wrap` | `nowrap` (default), `wrap`, `wrap-reverse` | Whether items wrap to new line or stay in one line | When want items auto-wrap instead of shrink when space tight |
| `gap` | `10px`, `1rem`, `10px 20px` (horizontal vertical) | Space BETWEEN flex items (not edges) | Modern clean way set spacing between items (better than margin) |
| `flex-flow` | `row wrap`, `column nowrap` etc | Shorthand for flex-direction + flex-wrap | Quick syntax when setting both |

---

## Item Properties (Child Elements)

| Property | Values | What It Does | When to Use |
|----------|--------|-------------|------------|
| `flex` | `0 1 auto` (default), `1`, `0 1 200px` | Shorthand: flex-grow flex-shrink flex-basis. Control item sizing and growth | MOST IMPORTANT - controls how item behave |
| `flex-grow` | `0` (default), `1`, `2` etc | How much item grow when extra space available (0 = don't grow) | When want some items take remaining space |
| `flex-shrink` | `1` (default), `0`, `2` | How much item shrink when space tight. 0 = don't shrink even if overflow | When want items stay exact size even container smaller |
| `flex-basis` | `auto` (default), `200px`, `30%` | Initial size of item before growing/shrinking. Like width but only in main axis | When want specific "natural" size for item before flex calculations |
| `align-self` | `auto`, `flex-start`, `flex-end`, `center`, `stretch`, `baseline` | Override parent's align-items for this specific item | When one item need different alignment than others |
| `order` | `0` (default), `1`, `-1` etc | Visual order of item (don't change HTML order, just visual) | When want rearrange items without touching HTML |

---

## Common Patterns

### Pattern 1: Horizontal Navigation
```css
nav {
  display: flex;           /* Enable flexbox */
  justify-content: space-between;  /* Logo left, links right */
  align-items: center;     /* Vertically centered */
  padding: 1rem;
}

nav .logo { 
  flex-grow: 0;            /* Don't grow */
}

nav ul {
  display: flex;
  gap: 2rem;               /* Space between links */
}
```
**Why work:** justify-content space-between push items to edges, align-items center all vertically middle.

### Pattern 2: Centered Modal/Card
```css
.container {
  display: flex;
  justify-content: center;  /* Center horizontally */
  align-items: center;      /* Center vertically */
  min-height: 100vh;        /* Full viewport height */
}

.card {
  width: 400px;
}
```
**Why work:** Both justify-content and align-items center = perfectly centered both ways.

### Pattern 3: Flexible Grid that Wraps
```css
.grid {
  display: flex;
  flex-wrap: wrap;          /* Allow wrapping */
  gap: 1rem;
}

.card {
  flex: 1 1 250px;          /* Grow if space, shrink if tight, min 250px */
  /* This: grow, can shrink, but try be at least 250px */
}
```
**Why work:** `flex-wrap: wrap` let items go next line. `flex: 1 1 250px` mean each card min 250px, then grow equally if space.

### Pattern 4: Media Object (Image Left, Text Right)
```css
.media {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.media-image {
  flex-shrink: 0;           /* Never shrink image, stay original size */
  width: 100px;
  height: 100px;
}

.media-content {
  flex: 1;                  /* Take remaining space */
}
```
**Why work:** Image `flex-shrink: 0` keep exact size. Content `flex: 1` take remaining. `gap` space between.

### Pattern 5: Sticky Footer Layout
```css
body {
  display: flex;
  flex-direction: column;   /* Vertical stacking */
  min-height: 100vh;        /* At least full screen */
}

main {
  flex: 1;                  /* Take all remaining space, push footer down */
}

footer {
  flex-shrink: 0;           /* Don't shrink, keep height */
}
```
**Why work:** flex-direction: column make body vertical flex container. main with flex: 1 expand fill space. footer stay bottom.

---

## Important Concepts

### Main Axis vs Cross Axis
- **Main axis:** Direction of flex-direction. If `flex-direction: row`, main axis is horizontal (left-right).
- **Cross axis:** Perpendicular to main axis. If `flex-direction: row`, cross axis is vertical (up-down).
- `justify-content` affect MAIN axis
- `align-items` affect CROSS axis

### The Flex Property Breakdown
```
flex: <grow> <shrink> <basis>
flex: 1 1 200px;

1 = flex-grow: grow 1 part when space extra
1 = flex-shrink: shrink 1 part when space tight  
200px = flex-basis: natural size 200px before growing/shrinking
```

Common values:
- `flex: 0` = `0 1 0%` = don't grow, fit content only
- `flex: 1` = `1 1 0%` = grow/shrink equal, start from 0
- `flex: 1 1 auto` = grow/shrink equal, respect content size

### When to Use Flexbox vs Grid
- **Flexbox:** 1D layout (rows OR columns), navigation, alignment, distribution. "I have items, distribute them fairly"
- **Grid:** 2D layout (rows AND columns), magazine layouts, dashboards. "I have area, place things in specific positions"

---

## Real World Examples

### Flexible Form Layout
```css
.form-row {
  display: flex;
  gap: 1rem;
}

.form-group {
  flex: 1;  /* Each field take equal space */
}

.form-group.full {
  flex: 1 1 100%;  /* This field take full width */
}
```

### Flexbox Pagination
```css
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.pagination button {
  width: 40px;
  height: 40px;
}
```

### Flexbox Card with Header/Footer
```css
.card {
  display: flex;
  flex-direction: column;
  height: 300px;
}

.card-header {
  /* Fixed height */
}

.card-body {
  flex: 1;  /* Take remaining space */
  overflow: auto;  /* Scrollable if content too much */
}

.card-footer {
  /* Fixed height */
}
```

---

## Common Issues & Solutions

| Problem | Cause | Solution |
|---------|-------|----------|
| Flex items not shrinking below content size | Default `flex-shrink: 1` but content has `min-width: auto` | Set `min-width: 0` on item |
| Text overflow in flex item | Item not shrinking enough to fit text | Add `min-width: 0` or `overflow: hidden` |
| Items not wrapping even with flex-wrap | Maybe width too fixed or flex-basis too large | Check flex-basis value, should allow wrapping |
| Justify-content not working | Maybe flex-basis set to auto and items fill space | Set `flex-basis` to smaller value |
| Uneven spacing with gap | Maybe some items have margin | Use gap only, remove margins |

---

## Flexbox Browser Support

✅ All modern browsers fully support Flexbox (IE10+). Can use safely in production.

---

## Practice Mindset

When looking at layout problem:
1. Think: "Is this 1D (row OR column)?" → Use Flexbox
2. Ask: "What direction? row vs column?"
3. Ask: "How to space items? justify-content?"
4. Ask: "How to align items? align-items?"
5. Ask: "Do items grow? flex-grow?"
6. Ask: "Do items shrink? flex-shrink?"

Don't overthink — usually just `display: flex`, `justify-content`, `align-items` solve 80% of problems!

---

*Personal Reference Guide for Yogendra BK - December 15, 2025*
