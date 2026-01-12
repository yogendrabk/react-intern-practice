# Day 26 — React Router v6 Architecture

## Overview

React Router v6 enable client-side routing without page reload. This allow single-page application (SPA) where navigation happen in browser, not on server.

## Route Tree Architecture

```
App.jsx (Root)
│
└─ BrowserRouter (enable routing)
   │
   └─ AppContent (apply layout)
      │
      └─ Routes (route container)
         │
         ├─ / → Home (public, landing page)
         │
         ├─ /about → About (public, internship info)
         │
         ├─ /portfolio → Portfolio (public, project showcase)
         │
         ├─ /todo → TodoApp (public, task manager)
         │
         ├─ /users (public, user list)
         │  │
         │  └─ /users/:id → UserDetail (public, single user + posts + todos)
         │
         ├─ /login → LoginPage (public, auth form)
         │
         ├─ /dashboard (PROTECTED)
         │  │
         │  └─ ProtectedRoute (check isLoggedIn)
         │     │
         │     └─ Dashboard (if logged in) / Redirect to /login (if not)
         │
         └─ * → NotFound (catch all 404)
```

## Key Concepts

### 1. BrowserRouter

```javascript
<BrowserRouter>
  <AppContent />
</BrowserRouter>
```

**What it do:**
- Enable routing functionality
- Track browser history (back/forward button work)
- Sync URL with React component state

**Why needed:**
- Without BrowserRouter, <Route> component not work
- It provide routing context to entire app

### 2. Routes & Route

```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/users/:id" element={<UserDetail />} />
</Routes>
```

**Route features:**
- `path`: URL path to match
- `element`: React component to render
- `:id` → dynamic segment (captured in useParams)
- `*` → catch all unmatched path (404)

### 3. Dynamic Routes with useParams

```javascript
// In UserDetail.jsx
import { useParams } from 'react-router-dom';

export function UserDetail() {
  const { id } = useParams();
  
  // id now contain the user ID from URL like /users/5
  // URL structure: /users/:id → match /users/5 → id = "5"
}
```

**Flow:**
```
User click /users/5
→ Route match path="/users/:id"
→ Render UserDetail component
→ useParams() extract {id: "5"}
→ Use id to fetch user data
```

### 4. Navigation with Link & Navigate

#### Link Component (for navigation)

```javascript
import { Link } from 'react-router-dom';

// In template
<Link to="/users/5">View User</Link>
```

**Why not <a href>?**
- `<a>` cause full page reload (hard refresh, state lost)
- `<Link>` prevent default + navigate using React Router (clean navigation, state preserved)

**Navigation comparison:**
```
<a href="/users/5">           // Full page reload ❌
  Page reload, state cleared, script re-execute

<Link to="/users/5">          // SPA navigation ✅
  Client-side navigation, state preserved, smooth
```

#### Navigate Component (for redirect)

```javascript
import { Navigate } from 'react-router-dom';

// If not logged in, redirect to /login
if (!isLoggedIn) {
  return <Navigate to="/login" replace />;
}
```

**When to use:**
- Redirect after action (login → dashboard)
- Redirect to 404 if data not found
- Redirect to login if not authenticated (protected route)

### 5. useLocation Hook

```javascript
import { useLocation } from 'react-router-dom';

function AppContent() {
  const location = useLocation();
  
  // location.pathname = current URL path like "/users"
  // Use to highlight active nav link
  
  const links = [
    { label: 'Home', href: '/', active: location.pathname === '/' },
    { label: 'Users', href: '/users', active: location.pathname === '/users' },
  ];
}
```

## Protected Routes Pattern

**Problem:** Some page like /dashboard should only accessible if user logged in. How prevent unauthorized access?

**Solution: ProtectedRoute wrapper component**

```javascript
// components/layout/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }
  
  // Logged in → render the page
  return children;
}
```

**Usage in App.jsx:**

```javascript
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

**Flow:**
```
User navigate to /dashboard
→ Check ProtectedRoute
→ isLoggedIn = false?
  → Yes: Redirect to /login
  → No: Render Dashboard
```

## Common Patterns

### Pattern 1: Nested Routes

```javascript
// /posts → show list
// /posts/:id → show detail
<Routes>
  <Route path="/posts" element={<PostList />} />
  <Route path="/posts/:id" element={<PostDetail />} />
</Routes>
```

### Pattern 2: Route with Layout

```javascript
function AppContent() {
  return (
    <div>
      <Navbar /> {/* Show on all routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* More routes... */}
      </Routes>
      <Footer /> {/* Show on all routes */}
    </div>
  );
}
```

### Pattern 3: Redirect Default Route

```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/admin" element={<AdminDashboard />} />
  {/* Catch all */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Pattern 4: 404 Not Found

```javascript
// Must be last route (order matter!)
<Route path="*" element={<NotFound />} />
```

## Defense Q&A

**Q: React Router ma route tree kasari design garchau?**

A: Route tree design involve few step:

1. **Identify all page** (Home, About, Portfolio, etc.)
2. **Identify route structure** (nested child route? parameter route?)
3. **Identify access level** (public or protected?)
4. **Build hierarchy**:
   - Public route at top level
   - Dynamic route use `:param` syntax
   - Protected route wrap in ProtectedRoute component
   - Catch-all route `*` at end for 404

5. **Test flow**: User navigate through flow, check:
   - Correct page render?
   - URL update match?
   - State preserved?
   - Redirect work?

**Example Route Tree Design for this app:**

```
Step 1 - List all page:
- Home, About, Portfolio, TodoApp
- UsersPage, UserDetail
- LoginPage, Dashboard
- NotFound

Step 2 - Structure:
- Public pages: /, /about, /portfolio, /todo, /users, /users/:id, /login
- Protected pages: /dashboard (need auth)

Step 3 - Design tree:
               Routes
            /  |  |  \
        Home About Portfolio Todo /users /login /dashboard (protected) /*
                                    |
                                 :id → UserDetail
                              
Step 4 - Implement:
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  ...
  <Route path="/users/:id" element={<UserDetail />} />
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

## Code Example: Complete App Router

```javascript
export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <AppContent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </Router>
  );
}

function AppContent({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar links={navLinks} /> {/* Dynamic nav */}
      
      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetail />} />
          
          {/* Auth page */}
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          
          {/* Protected route */}
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
      </main>
      
      <Footer />
    </div>
  );
}
```

## Summary

- **BrowserRouter**: Enable routing (must wrap app)
- **Routes + Route**: Define URL → component mapping
- **dynamic route**: `:id` capture from URL
- **useParams()**: Access captured parameter in component
- **Link**: Navigate without page reload
- **Navigate**: Redirect user to different route
- **useLocation()**: Get current URL (for active link, etc.)
- **ProtectedRoute**: Wrapper for auth-only page
- **Catch-all route**: `*` for 404 (must be last)

**Key Principle:** Route design should reflect app structure. Think like file system: /users is list, /users/:id is detail page. Same concept in routing.

---

**Date:** January 12, 2026  
**Status:** ✅ Day 26 Complete  
**Next:** Day 27 - Protected Routes & Dashboard
