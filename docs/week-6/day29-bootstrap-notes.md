# Day 29 — Bootstrap 5 in React

## Overview

Bootstrap 5 provide pre-built component (button, card, navbar, modal, etc.) and style for responsive design.
Can use Bootstrap in React application:
1. CDN link in HTML (simple, work immediately)
2. npm install + import CSS (larger project, better control)

## Bootstrap HTML Components Created Today

Built practice HTML file with 8 Bootstrap component:

1. **Navbar with Collapse** - Responsive navigation
2. **Modal** - Popup dialog
3. **Carousel** - Image/content slider
4. **Accordion** - Expandable list
5. **Toast** - Notification message
6. **Form** - Input with validation styling
7. **Table** - Data table with striped/hover
8. **Offcanvas** - Sidebar drawer

## How Bootstrap Work in HTML

### Data Attributes: The Secret

Bootstrap use special attribute call `data-bs-*` to connect element:

```html
<!-- Button trigger modal -->
<button 
  data-bs-toggle="modal"        <!-- Bootstrap: toggle modal -->
  data-bs-target="#myModal"     <!-- Bootstrap: which element to toggle -->
>
  Click Me
</button>

<!-- Modal to show/hide -->
<div class="modal" id="myModal">
  ...
</div>
```

**Bootstrap JavaScript library listen:**
- Button have `data-bs-toggle="modal"`?
- Find target `#myModal`
- User click button?
- Show `#myModal`!

**NO custom JavaScript needed!** Bootstrap handle automatically.

## Common Bootstrap Data Attributes

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `data-bs-toggle` | `collapse`, `modal`, `tab`, `dropdown` | What to toggle |
| `data-bs-target` | `#id` | Which element to toggle |
| `data-bs-ride` | `carousel`, `true` | Auto-start animation |
| `data-bs-dismiss` | `modal`, `alert`, `toast` | Close element |
| `data-bs-parent` | `#id` | Parent element for accordion |

## Two Ways to Use Bootstrap in React

### 1. CDN Approach (Simple)

```html
<!-- In public/index.html -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css" rel="stylesheet" />
```

**Pros:**
- ✅ Simple, no npm install
- ✅ CSS available immediately
- ✅ Good for static styling (button, card, table)

**Cons:**
- ❌ Interactive component (modal, carousel) need Bootstrap JS
- ❌ Bootstrap JS is jQuery-style (old fashion for React)
- ❌ Can conflict with React state

### 2. npm Package Approach (Professional)

```bash
npm install bootstrap
```

```javascript
// In App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
```

**Pros:**
- ✅ Modern, part of build process
- ✅ Can customize color, size
- ✅ Better integration with React

**Cons:**
- ❌ Larger bundle size
- ❌ Still have JavaScript compatibility issue with React

## Bootstrap + React: The Challenge

### Problem: data-bs attribute vs React State

Bootstrap modal example:

```html
<!-- Pure Bootstrap (work alone) -->
<button data-bs-toggle="modal" data-bs-target="#myModal">
  Open
</button>
<div class="modal" id="myModal">
  Modal content
</div>
```

Bootstrap JavaScript:
1. Listen for button click
2. Find element with id="myModal"
3. Show it

**In React, this sometimes problem because:**
- React manage state, Bootstrap manage DOM directly
- Can conflict when both try update element

### Solution: Different Use Case

**When Bootstrap data-bs work in React?**
✅ True: Simple show/hide (modal, carousel, accordion, toast)
✅ True: If not changing often
✅ True: For learning/prototype

**When Bootstrap data-bs DON'T work well in React?**
❌ False: Complex state management
❌ False: Frequent re-render
❌ False: Need to programmatically control

### Example: Bootstrap Modal in React

#### Approach 1: Using data-bs (Quick & Dirty)

```javascript
export function MyModal() {
  return (
    <>
      <button 
        data-bs-toggle="modal" 
        data-bs-target="#myModal"
      >
        Open Modal
      </button>
      
      <div class="modal" id="myModal">
        <div class="modal-content">
          Modal content here
        </div>
      </div>
    </>
  );
}
```

**Work?** ✓ Yes, modal show/hide work
**Pro:** No custom code
**Con:** Can't access modal state in React component

#### Approach 2: Using React State (Proper Way)

```javascript
import { useState } from 'react';

export function MyModal() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      
      {isOpen && (
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Modal</h5>
                <button 
                  className="btn-close"
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <div className="modal-body">
                Modal content here
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="modal-backdrop fade show"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
```

**Work?** ✓ Yes, fully controlled by React
**Pro:** Full state control, can validate before close, etc.
**Con:** More code

## Bootstrap + React Best Practices

### Use Bootstrap for CSS ONLY

```javascript
// ✅ Good: Use Bootstrap CSS class
<button className="btn btn-primary btn-lg">
  Click Me
</button>

// ✅ Good: Use Bootstrap layout
<div className="container">
  <div className="row">
    <div className="col-md-6">Content</div>
  </div>
</div>

// ✅ Good: Use Bootstrap styling
<table className="table table-striped table-hover">
  ...
</table>
```

### Use React for INTERACTIVITY

```javascript
// ✅ Good: React state for modal
const [isOpen, setIsOpen] = useState(false);

// ✅ Good: useEffect for animation
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  }
}, [isOpen]);

// ✅ Good: Component composition
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  Content
</Modal>
```

### AVOID: data-bs Attribute in Complex Cases

```javascript
// ❌ Bad: Mixing Bootstrap JS + React state
const [data, setData] = useState([]);

// User click Bootstrap button with data-bs-toggle
// Modal open (Bootstrap JS)
// But React don't know modal opened!
// Problem: Inconsistent state

// ✅ Good: One source of truth (React)
const [isModalOpen, setIsModalOpen] = useState(false);
// React control modal open/close
// Bootstrap just provide CSS styling
```

## Week 6 Day 30 Plan

Tomorrow combine Bootstrap + React:

1. Update Portfolio page:
   - Add Bootstrap **Card** for project showcase
   - Add Bootstrap **Modal** when click project (show detail)
   - Add Bootstrap **Progress Bar** for skill level
   - Add Bootstrap **Accordion** for FAQ section

2. Use React state for interactive part
   - Modals open/close with useState
   - Accordion expand/collapse with useState
   - Progress bar animation with useEffect

3. Mix Tailwind + Bootstrap:
   - Tailwind for layout (flex, grid, spacing)
   - Bootstrap for component (card, button, modal)

## Defense Q&A

**Q: Bootstrap React ma kasari integrate garchau? data-bs attributes kina sometimes kaam gardaina?**

A: Bootstrap use `data-bs-*` attribute for interactive component. Kaam garey hindi cases:

1. **Kaam garcha (✓):**
   - Simple show/hide (modal, carousel)
   - Not much state change
   - Learning/prototype

2. **Kaam gardaina (❌):**
   - Complex state management (form validation, conditional show)
   - Frequent re-render
   - Need React control

**Example:**
```
Pure Bootstrap: Button → Bootstrap JS → Find element → Toggle
React + Bootstrap: Button → React click handler → setState → Component re-render → Conditional show

React way better for complex app.
data-bs better for simple case.
```

**Recommendation:**
- Use Bootstrap CSS for styling (button, card, table, form, layout)
- Use React state for interactivity (modal, accordion, tab)
- Avoid mixing data-bs attribute inside React state management

---

**Date:** January 15, 2026  
**Status:** ✅ Day 29 Complete  
**Next:** Day 30 - Bootstrap + React integration in Portfolio page
