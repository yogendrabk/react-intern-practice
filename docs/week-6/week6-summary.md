# Week 6 — React Router, Authentication, and Bootstrap Integration

**Duration:** January 12-16, 2026  
**Objective:** Master React Router v6, implement protected routes and authentication, integrate Bootstrap 5 components with React.  
**Result:** 5 days, 10 new files, 2,500+ lines of code ✅

---

## Learning Overview

### Week 6 Focus Areas

1. **React Router Advanced**
   - Complete routing architecture setup
   - Dynamic routes with parameters (`:id`)
   - Nested routes and route organization
   - Navigation with `Link` component
   - URL access with `useParams()` and `useLocation()`

2. **Authentication & Protected Routes**
   - Auth state management in App component
   - ProtectedRoute wrapper component
   - Redirect logic with `Navigate` component
   - Login/logout flow
   - Session state handling (props vs context)

3. **API Integration Advanced**
   - Parallel fetching with `Promise.all()`
   - Tab switching with `useState`
   - Multiple state management (posts vs todos)
   - Performance optimization (parallel > sequential)

4. **Bootstrap 5 Integration**
   - Bootstrap components overview
   - data-bs attributes and Bootstrap JavaScript
   - Bootstrap + React challenges
   - Mixing Bootstrap CSS + React state
   - Best practices for Bootstrap in React

---

## Daily Breakdown

### Day 26 — Full Router Architecture

**Files Created:**
- `yogendra-react-app/src/App.jsx` (updated)
- `yogendra-react-app/src/pages/About.jsx` (internship info page)
- `yogendra-react-app/src/pages/NotFound.jsx` (404 page)
- `yogendra-react-app/src/components/Navbar.jsx` (updated with Link)
- `docs/week-6/day26-router-architecture.md`

**Key Concepts:**

1. **Route Tree Design**
   ```
   Routes
   ├─ / (Home)
   ├─ /about (About)
   ├─ /portfolio (Portfolio)
   ├─ /users (UsersList)
   ├─ /users/:id (UserDetail)
   ├─ /login (LoginPage)
   ├─ /dashboard (Protected)
   └─ * (NotFound)
   ```

2. **Navbar Update:**
   - Changed from `<a>` tags to `<Link>` component
   - Prevents page reload on navigation
   - Preserves React state during navigation
   - Active link highlighting based on `useLocation()`

3. **About Page:**
   - Internship overview table
   - Weekly learning breakdown
   - Key achievements
   - Skills by category

**Defense Q&A:**
- Q: React Router ma route tree kasari design garchau?
- A: Identify all pages → structure (nested/parameters) → access level (public/protected) → build hierarchy → test flow

---

### Day 27 — Protected Routes & Authentication

**Files Created:**
- `yogendra-react-app/src/components/layout/ProtectedRoute.jsx`
- `yogendra-react-app/src/pages/LoginPage.jsx`
- `yogendra-react-app/src/pages/Dashboard.jsx`
- `yogendra-react-app/src/App.jsx` (updated with auth routes)

**Key Concepts:**

1. **ProtectedRoute Pattern**
   ```javascript
   if (!isLoggedIn) {
     return <Navigate to="/login" replace />;
   }
   return children; // Render protected page
   ```

2. **Auth Flow:**
   ```
   User → /dashboard
   → ProtectedRoute check isLoggedIn
   → If false → redirect to /login
   → User submit form → LoginPage set isLoggedIn true
   → Redirect to /dashboard → Now allowed!
   ```

3. **Props Drilling:**
   - App holds `isLoggedIn` state
   - Pass to `ProtectedRoute` → `Dashboard`
   - Works but not scalable (Week 7 will solve with Context API)

4. **Dashboard Page:**
   - Stats overview (days, components, API calls, pages)
   - Recent activity list
   - Quick navigation links
   - Logout button

**Defense Q&A:**
- Q: Authentication flow React ma kasari implement garchau? Context nabhae kasari?
- A: Use props to pass `isLoggedIn` down. App state → ProtectedRoute component → check before render. Context better for deeply nested, but props work for top-level auth.

---

### Day 28 — Advanced API Integration

**Files Created:**
- `yogendra-react-app/src/pages/UsersPage.jsx`
- `yogendra-react-app/src/pages/UserDetail.jsx`

**Key Concepts:**

1. **Promise.all() for Parallel Fetching**
   ```javascript
   // Sequential (4 seconds)
   const user = await fetch(...);
   const posts = await fetch(...);
   const todos = await fetch(...);
   
   // Parallel (2 seconds) ✅ Better!
   const [user, posts, todos] = await Promise.all([
     fetch(...),
     fetch(...),
     fetch(...),
   ]);
   ```

2. **UseParams for Dynamic Routes**
   ```javascript
   const { id } = useParams(); // /users/:id → Extract id
   ```

3. **Tab Switching**
   ```javascript
   const [activeTab, setActiveTab] = useState('posts');
   // UI toggle between posts/todos
   ```

4. **Performance Comparison**
   - Sequential: Wait for each request finish
   - Parallel: All requests start together
   - Parallel much faster for independent requests!

**Defense Q&A:**
- Q: API calls parallel garna ra sequential garna ko performance difference ke ho?
- A: Sequential 3 requests à 1s = 3 seconds. Parallel 3 requests à 1s = 1 second (fastest). Parallel best when request independent.

---

### Day 29 — Bootstrap 5 Practice

**Files Created:**
- `exercises/week-6/day29-bootstrap-react.html`
- `docs/week-6/day29-bootstrap-notes.md`

**Components Practiced:**

1. Navbar with collapse (mobile responsive)
2. Modal (popup dialog)
3. Carousel (image slider)
4. Accordion (expandable list)
5. Toast (notification)
6. Form with validation classes
7. Table (striped & hover)
8. Offcanvas (sidebar drawer)

**Key Learning:**

1. **Bootstrap Data Attributes**
   - `data-bs-toggle` → what to toggle
   - `data-bs-target` → which element
   - Bootstrap JavaScript listen automatically
   - No custom code needed for simple show/hide

2. **Bootstrap + React Challenges**
   - Bootstrap uses jQuery-style (old fashion)
   - Can conflict with React state
   - Solution: Use React state for complex interactivity
   - Use Bootstrap CSS for styling only

3. **Best Practices**
   - Use Bootstrap CSS classes (button, card, table)
   - Use React state for interactive elements
   - Mix Tailwind (layout) + Bootstrap (components)
   - Avoid mixing data-bs attributes with React state management

**Defense Q&A:**
- Q: Bootstrap React ma kasari integrate garchau? data-bs attributes kina sometimes kaam gardaina?
- A: Bootstrap JavaScript work with data-bs attributes for simple case (modal, carousel). For complex React state management, better use state + use Bootstrap CSS only.

---

### Day 30 — Portfolio Enhancement + Week Summary

**Files Updated:**
- `yogendra-react-app/src/pages/Portfolio.jsx` (Bootstrap integration)
- `docs/week-6/week6-summary.md` (this file)
- `README.md` (Week 6 mark ✅)

**Enhancements to Portfolio:**

1. **Bootstrap Modal** (Project detail)
   - Click project card → open modal
   - Show tech stack, features, learnings
   - React state controls open/close

2. **Bootstrap Progress Bars** (Skill level)
   - Animated fill on page load
   - Visual representation of skill mastery
   - useEffect for animation

3. **Bootstrap Accordion** (FAQ section)
   - 4 frequently asked questions
   - Expand one at a time
   - React state for selected item

4. **Bootstrap Breadcrumb** (Navigation)
   - Show page hierarchy
   - Portfolio > Projects > Detail path

5. **Mixed Styling**
   - Tailwind for layout (flex, grid, spacing)
   - Bootstrap for components (card, modal, accordion)
   - Both work together smoothly

---

## Technical Depth

### Route Architecture Pattern

```javascript
// App.jsx structure
const [isLoggedIn, setIsLoggedIn] = useState(false);

<Routes>
  {/* Public */}
  <Route path="/" element={<Home />} />
  <Route path="/users/:id" element={<UserDetail />} />
  
  {/* Protected */}
  <Route 
    path="/dashboard" 
    element={
      <ProtectedRoute isLoggedIn={isLoggedIn}>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  
  {/* 404 */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Promise.all Performance

```
Request 1: ████████░ (8s)
Request 2:   ██░ (2s)
Request 3:     ████░ (4s)

Sequential: 8 + 2 + 4 = 14 seconds total
Parallel:   max(8, 2, 4) = 8 seconds total ✅

Promise.all perfect for independent async operation!
```

### Bootstrap Component Integration Flow

```
HTML Element with data-bs attribute
       ↓
Bootstrap JavaScript detect
       ↓
User interact (click)
       ↓
Bootstrap JS handle (show/hide/toggle)
       ↓
BUT: React don't know state changed!
       ↓
SOLUTION: Use React state instead
```

---

## Files Created (Week 6)

| Day | File | Lines | Purpose |
|-----|------|-------|---------|
| 26 | App.jsx (updated) | 110 | Complete routing setup |
| 26 | About.jsx | 280 | Internship info page |
| 26 | NotFound.jsx | 75 | 404 page |
| 26 | Navbar.jsx (updated) | 95 | Link instead of <a> |
| 26 | day26-router-architecture.md | 350 | Router architecture guide |
| 27 | ProtectedRoute.jsx | 50 | Auth wrapper component |
| 27 | LoginPage.jsx | 200 | Login form + validation |
| 27 | Dashboard.jsx | 200 | Protected page + stats |
| 28 | UsersPage.jsx | 200 | User list API integration |
| 28 | UserDetail.jsx | 250 | User detail + Promise.all |
| 29 | day29-bootstrap-react.html | 450 | Bootstrap components practice |
| 29 | day29-bootstrap-notes.md | 280 | Bootstrap-React guide |
| 30 | Portfolio.jsx (updated) | 370 | Bootstrap components |
| 30 | week6-summary.md | 400 | This file |
| 30 | README.md (updated) | - | Mark Week 6 ✅ |

**Total: 15+ files, 2,500+ lines of production code**

---

## Git Commits (Week 6)

| Day | Commit Hash | Date | Change |
|-----|-------------|------|--------|
| 26 | ff8e959 | Jan 12 | Router setup + About/NotFound + Navbar |
| 27 | 6ae233c | Jan 13 | Protected routes + Login + Dashboard |
| 28 | 0f46148 | Jan 14 | Users + UserDetail (Promise.all) |
| 29 | e5c0ffe | Jan 15 | Bootstrap 5 practice |
| 30 | PENDING | Jan 16 | Portfolio Bootstrap + summary |

---

## Key Concepts Mastered

1. **React Router v6**
   - Dynamic routes with `:id` parameters
   - useParams() hook
   - useLocation() hook
   - Link component (no page reload)
   - Navigate component (programmatic redirect)
   - ProtectedRoute pattern

2. **Authentication Flow**
   - Auth state in App component
   - Props drilling to ProtectedRoute
   - Login form with validation
   - Redirect after successful login
   - Limitations of props (will improve with Context API Week 7)

3. **Performance Optimization**
   - Promise.all parallel fetching
   - Understanding async operation timing
   - When to use parallel vs sequential

4. **Bootstrap Integration**
   - Bootstrap CSS for styling
   - Bootstrap data-bs attributes for simple interactivity
   - Mixing with React state for complex cases
   - Best practices combining Tailwind + Bootstrap

---

## Challenges Encountered & Solutions

| Challenge | Solution |
|-----------|----------|
| data-bs attributes sometimes don't work in React | Use React state instead + Bootstrap CSS only |
| Props drilling too deep | Will solve with Context API (Week 7) |
| Multiple API calls slow | Use Promise.all() for parallel fetching |
| Active link in Navbar hard to track | Use useLocation() to get current path |
| Modal state management complex | Let React state control modal visibility |

---

## What's Next (Week 7-8)

**Week 7:** Context API (solving props drilling problem)
**Week 8-9:** Advanced projects with full-stack integration
**Week 10-11:** Final portfolio + deployment

---

## Interview Q&A Prepared

**Q: React Router ma route tree kasari design garchau?**  
A: Identify pages → structure (nested/params) → access (public/protected) → test flow

**Q: Authentication flow React ma kasari implement garchau?**  
A: Auth state in App → ProtectedRoute check → redirect if not logged in

**Q: API calls parallel garna ko benefit?**  
A: Promise.all() start requests together → finish faster (parallel time vs sequential sum)

**Q: Bootstrap React ma kasari work garchau?**  
A: CSS for styling (always work) + data-bs for simple show/hide (sometimes problem) + React state for complex interactivity (best approach)

---

## Self-Assessment

**Confidence Level:** High ✅

- ✅ React Router setup and usage
- ✅ Protected routes implementation
- ✅ Dynamic routing with parameters
- ✅ API integration patterns
- ✅ Bootstrap component knowledge
- ✅ Performance optimization basics

**Areas for Growth (Week 7):**
- Context API for better state management
- Custom hooks for reusable logic
- Testing React components

---

**Date:** January 12-16, 2026  
**Status:** ✅ COMPLETE  
**Next Review:** Week 7 — Context API & Custom Hooks
