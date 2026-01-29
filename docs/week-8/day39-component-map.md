# Week 8, Day 39: Component Map

## Component Hierarchy Map (ASCII Diagram)

```
App (Router, Auth State)
├── Navbar (Navigation, Bookmarks Badge)
├── Routes Container
│   ├── "/" → Home
│   │   └── DisplayComponents
│   │       ├── Hero Section
│   │       ├── Features Grid
│   │       └── CallToAction Button
│   │
│   ├── "/about" → About
│   │   └── About Content
│   │       ├── About Description
│   │       ├── Skills Showcase
│   │       └── Timeline
│   │
│   ├── "/portfolio" → Portfolio (Day 40 Update)
│   │   ├── Project Cards
│   │   │   └── Card Component
│   │   │       ├── Badge
│   │   │       └── Button
│   │   └── NEW: Internship Certificate Section
│   │
│   ├── "/users" → UsersPage (Using DataTable - Day 36)
│   │   ├── View Toggle (Card/Table)
│   │   ├── Toggle Buttons
│   │   ├── Card Grid View
│   │   │   └── Card[] (User Cards)
│   │   │       └── Card Component
│   │   │           ├── Avatar
│   │   │           ├── Badge
│   │   │           └── Button
│   │   └── Table View
│   │       └── DataTable Component (Reusable!)
│   │           ├── Search Input
│   │           ├── Sort Headers
│   │           ├── Pagination Controls
│   │           └── Skeleton (Loading)
│   │
│   ├── "/users/:id" → UserDetail
│   │   ├── User Header
│   │   ├── User Posts Section
│   │   │   └── Post List
│   │   └── User Todos Section
│   │       └── Todo List
│   │
│   ├── "/posts" → PostsPage (Day 38)
│   │   ├── Category Tabs
│   │   │   └── Filter by userId
│   │   ├── Post List
│   │   │   ├── Post Card[]
│   │   │   │   ├── Title
│   │   │   │   ├── Read Time
│   │   │   │   ├── Category Badge
│   │   │   │   └── Bookmark Button
│   │   │   └── Sentinel Element (IntersectionObserver)
│   │   │       → When visible, load next page
│   │   └── Bookmarks stored in localStorage
│   │
│   ├── "/posts/:id" → PostDetail (Day 38)
│   │   ├── Post Content
│   │   │   ├── Title
│   │   │   ├── Post ID Badge
│   │   │   ├── Body Text
│   │   │   ├── Share Button (Clipboard API)
│   │   │   └── Print Button
│   │   ├── Related Posts Sidebar
│   │   │   └── Related Post Cards[] (same userId)
│   │   └── @media print CSS
│   │       → Hides nav, sidebar, buttons
│   │       → Shows only post content
│   │
│   ├── "/dashboard" → Dashboard (Protected Route - Day 37)
│   │   ├── Stats Cards
│   │   │   └── Card Component
│   │   ├── Charts Component (Day 37, CSS-only)
│   │   │   ├── Skill Proficiency Bars
│   │   │   │   └── Bar[] with % width
│   │   │   ├── Donut Chart
│   │   │   │   └── conic-gradient segments
│   │   │   ├── Activity Heatmap
│   │   │   │   └── Grid 11×5 (weeks × days)
│   │   │   └── Tooltip Component (Hover labels)
│   │   │       └── Directional positioning
│   │   └── Logout Button
│   │
│   ├── "/login" → LoginPage
│   │   ├── Login Form
│   │   │   ├── Email Input
│   │   │   ├── Password Input
│   │   │   └── Submit Button
│   │   └── Sets isLoggedIn to true (on submit)
│   │
│   ├── "/todo" → TodoApp
│   │   ├── Todo Form
│   │   │   ├── Input Field
│   │   │   └── Add Button
│   │   └── Todo List
│   │       └── Todo Item[] (with delete)
│   │
│   ├── "/contact" → Contact
│   │   ├── Contact Form
│   │   │   ├── Name Input
│   │   │   ├── Email Input
│   │   │   ├── Message Textarea
│   │   │   └── Submit Button
│   │   └── Contact Info
│   │
│   └── "/*" → NotFound
│       └── 404 Error Page
│           └── Link to Home
│
├── Footer (Global, always visible)
│   ├── Company Name
│   └── Footer Links
│
└── Global Components
    ├── ErrorBoundary (Error handling)
    ├── SearchModal (Cmd+K search)
    ├── BackToTop (Floating button)
    └── ProtectedRoute (Auth wrapper)
```

## Component Type Breakdown

### Page Components (src/pages/)
Located at 1:1 with routes. Top-level components that receive data from API or parent state.

```
Home.jsx           → / route
About.jsx          → /about route
Portfolio.jsx      → /portfolio route (Day 40 update)
UsersPage.jsx      → /users route (uses DataTable - Day 36)
UserDetail.jsx     → /users/:id route
PostsPage.jsx      → /posts route (Day 38, infinite scroll)
PostDetail.jsx     → /posts/:id route (Day 38, related posts)
Dashboard.jsx      → /dashboard route (Protected, uses Charts - Day 37)
LoginPage.jsx      → /login route
TodoApp.jsx        → /todo route
Contact.jsx        → /contact route
NotFound.jsx       → /* route (catch-all 404)
```

### UI Components (src/components/ui/)
Generic, reusable pieces for building UIs.

```
Avatar.jsx         → User profile pics
Badge.jsx          → Labels/tags
Button.jsx         → All buttons (primary, ghost, danger)
Card.jsx           → Container with header/border
Footer.jsx         → Footer
Navbar.jsx         → Navigation with bookmarks badge (Day 38)
SearchModal.jsx    → Cmd+K search overlay
Skeleton.jsx       → Loading placeholder
Tooltip.jsx        → Hover labels (Day 37, used in Charts)
ErrorBoundary.jsx  → Error catch boundary
BackToTop.jsx      → Floating scroll-to-top button
```

### Feature Components (src/components/features/)
Domain-specific, complex components for specific features.

```
DataTable.jsx      → Reusable sortable/filterable table (Day 36)
                     ├─ useReducer for state management
                     ├─ Pagination with ellipsis
                     ├─ Real-time search filtering
                     └─ Column-based sorting
                     
Charts.jsx         → CSS-only data visualization (Day 37)
                     ├─ Skill bars (% width)
                     ├─ Donut chart (conic-gradient)
                     ├─ Activity heatmap (CSS Grid)
                     └─ Uses Tooltip component
                     
UserDirectory.jsx  → (if it exists) User management features
```

### Layout Components (src/components/layout/)
Wrapper components for common layout patterns.

```
ProtectedRoute.jsx → Checks auth, renders Dashboard or redirects
```

### Hooks (src/hooks/)
Custom React hooks for reusable logic.

```
useIntersectionObserver.js  → Detects element visibility (Day 38)
                               └─ Used in PostsPage for infinite scroll
useKeyPress.js              → Detects KEY press (for search modal Cmd+K)
useWindowSize.js            → Tracks window width/height (responsive)
useDocumentTitle.js         → Updates browser tab title (Day 40, planned)
useLocalStorage.js          → Wrapper for localStorage (Day 38 pattern, inline)
```

### Utils (src/utils/)
Pure functions for formatting, calculations, helpers. (Day 40 planned)

```
formatters.js      → formatDate, formatNumber, truncateText, generateInitials
requests.js        → API fetch wrappers
validators.js      → Form validation helpers
dateHelpers.js     → Date calculations, relative time
```

## Data Flow Diagrams

### Authentication Flow
```
LoginPage
  ↓ (user submits email/password)
setIsLoggedIn(true) in App
  ↓ (state updated)
App re-renders routes
  ↓
ProtectedRoute checks isLoggedIn
  ↓
If true → render Dashboard
If false → show "Access Denied", link to login
```

### Data Fetching Flow (UsersPage with DataTable)
```
UsersPage mounts
  ↓ (useEffect)
fetch users from JSONPlaceholder
  ↓
setUsers(data)
  ↓
Pass users + columns to DataTable
  ↓
DataTable renders rows, user clicks sort/search
  ↓
Dispatch action to reducer
  ↓
Reducer returns new state (sorted/filtered)
  ↓
useMemo recalculates filtered data
  ↓
Components re-render with new data
```

### Infinite Scroll Flow (PostsPage)
```
PostsPage mounts
  ↓ (useEffect)
fetch posts page 1 from JSONPlaceholder
  ↓ (currentPage = 1)
setPosts(data)
  ↓
Render posts + sentinel at bottom
  ↓ (IntersectionObserver on sentinel)
User scrolls to bottom
  ↓
Sentinel enters viewport
  ↓
isVisible = true
  ↓ (useEffect watches isVisible)
setCurrentPage(prev => prev + 1)
  ↓
fetch posts page 2
  ↓
append new posts to existing array
  ↓
Re-render with more posts
  ↓ (user scrolls further)
repeat...
```

### Bookmarks Flow
```
PostsPage
  ↓ (user clicks bookmark on post)
POST CLICKED: toggleBookmark(postId)
  ↓
if bookmarks.includes(id):
  remove from array
else:
  add to array
  ↓
setBookmarks (updates localStorage)
  ↓
localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  ↓ (storage event fired)
Navbar listens to storage event
  ↓
Re-reads bookmarks count from localStorage
  ↓
setBookmarkCount(bookmarks.length)
  ↓
Navbar badge updates in real-time
```

### Related Posts Flow (PostDetail)
```
PostDetail mounts with /posts/:id
  ↓ (useParams)
const { id } = useParams() → "123"
  ↓ (useEffect)
fetch single post with ID
  ↓
await fetch(/posts/123)
  ↓
get post {id: 123, userId: 5, ...}
  ↓
fetch all posts (to find related)
  ↓
filter where userId === 5 AND id !== 123
  ↓
slice first 5
  ↓
setRelatedPosts(filtered)
  ↓
Render post + sidebar with related
  ↓ (user clicks related post)
Link to /posts/:relatedId
  ↓
PostDetail mounts again with new ID
  ↓
repeat...
```

## Component Size & Complexity Reference

| Component | Lines | Complexity | Notes |
|-----------|-------|-----------|-------|
| DataTable.jsx | 350+ | High | useReducer, memoization, pagination |
| Charts.jsx | 300+ | High | 3 chart types, Tooltip usage |
| PostsPage.jsx | 180+ | High | Infinite scroll, localStorage, filtering |
| PostDetail.jsx | 120+ | Medium | Related posts fetch, share button |
| UsersPage.jsx | 150+ | Medium | View toggle, DataTable integration |
| Dashboard.jsx | 100+ | Medium | Stats display, Charts import |
| UserDetail.jsx | 100+ | Medium | Parallel data fetching |
| Navbar.jsx | 150+ | Medium | Responsive menu, bookmarks badge |
| Home/About/etc | 50-100 | Low | Static content, simple layout |
| UI Components | 30-80 | Low | Simple props, styling |
| Hooks | 30-50 | Low-Medium | Focused on one feature |

## Reusability Scale

### Highly Reusable ⭐⭐⭐
- DataTable: Any data array + column config → sortable table
- Card: Any child content + optional header
- Button: primary/ghost/danger variants
- Badge: Any text/color
- Tooltip: Any child + position prop

### Moderately Reusable ⭐⭐
- Charts: Data structure is specific but visual logic reusable
- Avatar: Only works with user objects currently
- ProtectedRoute: Works for any component if isAuth state provided

### Component-Specific ⭐
- PostsPage: Specifically for posts with infinite scroll
- PostDetail: Specifically for single post view
- Dashboard: Specifically for auth user dashboard
- Pages: Usually don't reuse across routes

## Day 40 Planned Additions

### New Components/Hooks
- useDocumentTitle.js: Update browser tab title per page
- formatters.js utilities: formatDate, formatNumber, truncateText

### Updated Components
- Portfolio.jsx: Add internship certificate section
- README.md: Complete with ASCII architecture, run instructions

### Expected Impact
- No new complex logic, mostly polish
- Improve code organization with formatters
- Better browser UX with document titles
- User-facing documentation complete
