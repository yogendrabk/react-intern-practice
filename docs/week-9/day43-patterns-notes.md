# Day 43: React Design Patterns - Advanced Composition Techniques

**Date:** February 4, 2026  
**Week:** Week 9, Day 43  
**Topic:** React Design Patterns - Compound Components, Render Props, Higher-Order Components  
**Time Invested:** 3 hours

---

## 📚 Overview

Three fundamental design patterns that solve real-world React composition problems. These patterns enable building flexible, reusable, and maintainable components without prop drilling or component wrapper hell.

---

## 🎯 Pattern 1: Compound Components

### Problem It Solves
When you have complex components with multiple related parts that need to share state, traditional prop passing becomes cumbersome.

**Without Pattern:**
```jsx
// Hard to read, many props to manage
<ComplexComponent 
  headerTitle="Users"
  headerAction={() => {}}
  bodyContent={<div>Users</div>}
  footerButtons={[{label: 'Save'}]}
  activeTab={0}
  onTabChange={(idx) => {}}
/>
```

**With Pattern:**
```jsx
// Clean, self-documenting API
<Tabs defaultTab={0}>
  <TabList>
    <Tab label="Profile" />
    <Tab label="Settings" />
  </TabList>
  <TabPanels>
    <div>Profile content</div>
    <div>Settings content</div>
  </TabPanels>
</Tabs>
```

### How It Works

Uses React Context API to make child components aware of parent state without explicit prop passing:

```jsx
// 1. Create context to hold shared state
const TabsContext = createContext();

// 2. Parent provider manages state
function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

// 3. Child components read from context
function Tab({ label, index }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button onClick={() => setActiveTab(index)}>
      {label}
    </button>
  );
}
```

### When To Use
- Multi-part components where children need to talk to each other
- Components with implicit relationships (Tabs→Tab, Menu→MenuItem)
- Building UI component libraries with rich APIs
- **Examples:** Accordion, Tabs, Modal, Form (with Field)

### Pros & Cons
✅ **Pros:**
- Clean, expressive component API
- No prop drilling
- Flexible composition
- Self-documenting code structure

❌ **Cons:**
- Requires understanding Context API
- One extra component layer
- ContextProvider re-render can impact performance if not optimized

---

## 🎯 Pattern 2: Render Props

### Problem It Solves
When multiple components need the same stateful behavior but render differently, you'd normally duplicate code or create a base component. Render Props solves this elegantly.

**Without Pattern:**
```jsx
// MouseTracker1 for one use case
function MouseTracker1() {
  const [pos, setPos] = useState({x: 0, y: 0});
  return <div onMouseMove={e => setPos({x: e.clientX, y: e.clientY})}>
    <p>Mouse at {pos.x}, {pos.y}</p>
  </div>;
}

// MouseTracker2 for another use case - duplicates all logic
function MouseTracker2() {
  const [pos, setPos] = useState({x: 0, y: 0});
  return <div onMouseMove={e => setPos({x: e.clientX, y: e.clientY})}>
    <Circle x={pos.x} y={pos.y} />
  </div>;
}
```

**With Pattern:**
```jsx
// Single component, flexible rendering
<MouseTracker>
  {(pos) => (
    <p>Mouse at {pos.x}, {pos.y}</p>
  )}
</MouseTracker>

<MouseTracker>
  {(pos) => (
    <Circle x={pos.x} y={pos.y} />
  )}
</MouseTracker>
```

### How It Works

Pass a function as a prop (or children) that receives the internal state as an argument. The component calls this function with data, letting consumer decide what to render:

```jsx
// Component manages behavior
function MouseTracker({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove}>
      {/* Pass state to render function */}
      {children(position)}
    </div>
  );
}

// Consumer provides rendering logic
<MouseTracker>
  {(pos) => (
    <div>
      Cat position: {pos.x}, {pos.y}
    </div>
  )}
</MouseTracker>
```

### When To Use
- Sharing logic across components that render differently
- Building hooks-adjacent patterns before you're ready for custom hooks
- Complex behavior that's hard to abstract
- **Examples:** DataFetcher, FormState, Animation, Geolocation

### Pros & Cons
✅ **Pros:**
- Maximum flexibility
- Easy to test (all logic in test render function)
- No wrapper component hell
- Can pass multiple render props

❌ **Cons:**
- Can be hard to read (nested functions)
- "Callback hell" with multiple render props
- React DevTools shows generic wrapper component
- Modern alternative: **Custom Hooks** (more natural)

---

## 🎯 Pattern 3: Higher-Order Component (HOC)

### Problem It Solves
When multiple components need the same enhancement or wrapper logic (loading state, auth check, theme injection, analytics), you'd duplicate the enhancement logic. HOC centralizes this.

**Without Pattern:**
```jsx
// Loading logic duplicated in each component
function UserCard() {
  const [loading, setLoading] = useState(false);
  return loading ? <Spinner /> : <div>User data</div>;
}

function PostCard() {
  const [loading, setLoading] = useState(false);
  return loading ? <Spinner /> : <div>Post data</div>;
}

function ProfileCard() {
  const [loading, setLoading] = useState(false);
  return loading ? <Spinner /> : <div>Profile data</div>;
}
```

**With Pattern:**
```jsx
// Enhancement applied to any component
const UserCardWithLoading = withLoading(UserCard);
const PostCardWithLoading = withLoading(PostCard);
const ProfileCardWithLoading = withLoading(ProfileCard);

<UserCardWithLoading isLoading={true} />
<PostCardWithLoading isLoading={true} />
```

### How It Works

HOC is a function that takes a component and returns an enhanced version:

```jsx
// Define the enhancement
function withLoading(WrappedComponent) {
  // Return enhanced component
  return function LoadingWrapper({ isLoading, ...props }) {
    if (isLoading) {
      return <div className="spinner">Loading...</div>;
    }
    // Render original component with all props
    return <WrappedComponent {...props} />;
  };
}

// Usage
function UserCard({ name, email }) {
  return <div>{name} - {email}</div>;
}

const UserCardWithLoading = withLoading(UserCard);

<UserCardWithLoading 
  isLoading={true}
  name="Yogendra"
  email="yogendra@example.com"
/>
```

### When To Use
- Adding consistent behavior across multiple components
- Access control / authentication wrapper
- Theme or styling injection
- Logging and analytics
- **Examples:** withAuth, withTheme, withLoading, withRouterNavigation

### Pros & Cons
✅ **Pros:**
- Once, apply everywhere (DRY)
- Clean separation of concerns
- Good for cross-cutting concerns
- Familiar pattern (decorator pattern)

❌ **Cons:**
- Extra wrapper component in chain (debugging harder)
- Static methods not copied automatically
- Ref forwarding requires special handling
- Modern alternative: **Custom Hooks** (simpler, more composable)

### Example HOCs in Real Apps
```jsx
// Authentication
const ProtectedPage = withAuth(AdminPanel);

// Theme injection
const ThemedComponent = withTheme(MyComponent);

// Data fetching (before React Query)
const UserList = withDataFetching(UserListComponent);

// Analytics tracking
const TrackedButton = withAnalytics(Button);
```

---

## 📊 Pattern Comparison Table

| Aspect | Compound Components | Render Props | Higher-Order Component |
|--------|----------------------|--------------|------------------------|
| **Problem Solved** | Multi-part UI coupling | Behavior reuse | Enhancement reuse |
| **Learning Curve** | Medium (Context API) | Medium (Higher-order thinking) | Medium (Function composition) |
| **Code Readability** | High ⭐⭐⭐ | Medium ⭐⭐ | Medium ⭐⭐ |
| **Debugging** | Easy (no extra wrappers) | Medium (nested renders) | Hard (wrapper chain) |
| **Performance** | Good (memoization possible) | Good (no wrappers) | Good (memoization possible) |
| **Ref Forwarding** | Easy (children as ref) | Not needed (function children) | Needs React.forwardRef |
| **TypeScript Support** | Excellent | Good | Medium |
| **Best For** | Component libraries | Flexible behavior | App-wide features |

---

## 🎓 Real-World Examples

### Compound Components: React Router
```jsx
<Router>
  <Routes>
    <Route path="/users" element={<Users />}>
      <Route path=":id" element={<UserDetail />} />
    </Route>
  </Routes>
</Router>
```

### Render Props: React Query / SWR (older versions)
```jsx
<GetUserData userId={123}>
  {({ data, loading, error }) => (
    <>
      {loading && <Spinner />}
      {error && <Error msg={error} />}
      {data && <UserProfile user={data} />}
    </>
  )}
</GetUserData>
```

### Higher-Order Component: Redux (old pattern, now hooks)
```jsx
const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(MyComponent);
```

---

## 🚀 Modern Evolution: Custom Hooks

Today's React community prefers **custom hooks** over these patterns for most use cases:

```jsx
// Old: Render Props
<DataFetcher url="/api/users">
  {(data, loading) => <UserList data={data} />}
</DataFetcher>

// Modern: Custom Hook
function UserList() {
  const { data, loading } = useFetch('/api/users');
  return <Div>{/* use data directly */}</Div>;
}

// Old: HOC
const UserListWithLoading = withLoading(UserList);

// Modern: Custom Hook
function UserList() {
  const { data, isLoading } = useAsyncData();
  return isLoading ? <Spinner /> : <List data={data} />;
}
```

---

## 💡 Pattern Selection Guide

**Use Compound Components When:**
- Building multi-part UI components
- Creating component libraries or design systems
- Parts have implicit relationships
- You want to avoid prop drilling

**Use Render Props When:**
- Pre-hooks era and can't use custom hooks
- Need maximum flexibility in rendering
- Building reusable behavior containers
- Consumer needs to control rendering completely

**Use Higher-Order Components When:**
- Need app-wide features (auth, theme, analytics)
- Enhancing multiple unrelated components
- Building plugins or middleware
- Component composition isn't flexible enough

**Use Custom Hooks Instead When:**
- Extracting component logic
- Reusing stateful behavior
- Creating custom hooks is simpler than HOC
- Modern React apps (post Hooks era)

---

## 📝 Key Takeaways

1. **Problems before Solutions**: Understand the problem each pattern solves
2. **Patterns are Tools**: Use the right tool for context, not dogmatically
3. **Composition Over Inheritance**: React prefers composing components
4. **Modern Default**: Prefer custom hooks in new code (simpler, more testable)
5. **Context: Powerful but Careful**: Context can cause unnecessary re-renders if not memoized
6. **HOC Naming**: Use `withFeatureName` convention for clarity

---

## 🔗 In ReactPatternsDemo Component

The interactive demo in `yogendra-react-app/src/practice/ReactPatternsDemo.jsx` shows:

1. **Compound Components** - Tab component with Context
2. **Render Props** - Mouse tracking with dynamic rendering
3. **Higher-Order Component** - withLoading wrapper for any component

All with live interactive examples you can click and explore!

---

**Created by:** Yogendra Bikram Koirala  
**Date:** February 4, 2026  
**Status:** ✅ Complete - Ready for Day 43 commit
