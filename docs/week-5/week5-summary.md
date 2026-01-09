# Week 5 — React Hooks Mastery & Real-World Projects

**Duration:** January 5-9, 2026  
**Objective:** Deep dive into React Hooks (`useState`, `useEffect`), API integration, real-world patterns, and building production-ready components.  
**Result:** 5 days, 5 files, 1,300+ lines of code, complete hook understanding ✅

---

## Overview

Week 5 marked transition from static component (Week 4) to **stateful, dynamic application**. Focus on:
- Advanced `useState` patterns (5 patterns)
- Advanced `useEffect` patterns (6 patterns)
- Real API integration with JSONPlaceholder
- Component reuse in real-world scenario
- Data persistence with localStorage

---

## Learning Progress

### Day 21 — Advanced `useState` Patterns (Jan 5)

**File:** `yogendra-react-app/src/practice/StatePatterns.jsx` (404 lines)

**5 Patterns Covered:**

1. **Lazy Initialization**
   - Problem: `useState(expensiveComputation())` run every render (waste!)
   - Solution: `useState(() => expensiveComputation())` run only once on mount
   - When to use: Initial state require heavy computation (big list, parsing, API call)

2. **State from Props** (Anti-pattern)
   - Problem: Copying props to state (`useState(props.name)`) = duplicate data
   - Solution: Use props directly OR derive state from props when really needed
   - Defense: "State is for value that change independently; props is for value passed from parent"

3. **Derived State**
   - Problem: Maintaining multiple piece of state that depend on each other = sync nightmare
   - Solution: Calculate derived value inside render
   - Example: `filteredList = list.filter(...)` inside component, not separate state
   - Why: Single source of truth prevent bugs

4. **State Colocation**
   - Concept: Keep state as close to usage as possible
   - Example: SearchForm component hold search state, not parent
   - Why: Simpler logic, easier to reuse, less prop drilling

5. **Lifting State Up**
   - Concept: Move shared state to common parent
   - When: Multiple sibling need same state
   - Example: UserProfile and UserPosts both need userId → lift to parent
   - Pattern: Parent hold state, pass both data and handler to siblings

**Runnable Components:** Each pattern have toggle button to see it live!

**Defense Q&A:**
- Q: Why not just use derived state as local state?
- A: Cause synchronization bug. If state separate, can get out of sync. Single source of truth better.

---

### Day 22 — Advanced `useEffect` Patterns + Reference Guide (Jan 6)

**Files:** 
- `yogendra-react-app/src/practice/UseEffectPatterns.jsx` (600+ lines)
- `docs/week-5/day22-useeffect-guide.md` (550+ lines)

**6 Effect Patterns Covered:**

1. **Mount-Only Effect** (`[]`)
   - Dependency: empty array
   - Run: Once when component mount
   - Use: Initialize data, start subscription, start timer on load
   ```javascript
   useEffect(() => {
     console.log('Component mounted');
   }, []); // Only run once!
   ```

2. **Specific Dependency Effect** (`[x]`)
   - Dependency: specific value like state/prop
   - Run: When dependency change
   - Use: React to specific state change
   ```javascript
   useEffect(() => {
     console.log('Count changed:', count);
   }, [count]); // Only run when count change
   ```

3. **Multiple Dependencies Effect** (`[x, y]`)
   - Dependency: multiple values
   - Run: When ANY dependency change
   - Use: Complex effect that depend on multiple value
   ```javascript
   useEffect(() => {
     console.log('First or last name changed');
   }, [firstName, lastName]); // Run if either change
   ```

4. **Cleanup Effect**
   - Pattern: Return cleanup function
   - Problem: Timer/listener continue after component unmount = memory leak!
   - Solution: Return cleanup function to remove timer/listener
   ```javascript
   useEffect(() => {
     const timer = setInterval(() => {}, 1000);
     return () => clearInterval(timer); // CLEANUP!
   }, []);
   ```

5. **Data Fetching Effect**
   - Pattern: Fetch data on mount, show loading state, handle error
   - Key: Async function inside effect (can't declare effect itself async)
   - Challenge: Race condition (old request complete after new one start)
   - Solution: Use ignore flag or abort controller
   ```javascript
   useEffect(() => {
     let ignore = false;
     
     fetch('/api/data')
       .then(r => r.json())
       .then(data => {
         if (!ignore) setData(data); // Only update if latest request
       });
     
     return () => { ignore = true; }; // CLEANUP: mark request as outdated
   }, []);
   ```

6. **Debounced Effect**
   - Problem: Effect run on every keystroke = too many API call!
   - Solution: Wait 500ms after user stop typing, then run effect
   - Pattern: Set timeout in effect, clear timeout in cleanup
   ```javascript
   useEffect(() => {
     const timer = setTimeout(() => {
       // Run search after 500ms
     }, 500);
     
     return () => clearTimeout(timer); // Clear if user type again
   }, [searchTerm]); // Dependency: when search term change
   ```

**Reference Guide Content:**

1. Dependency Array Decision Tree
   - No array `undefined` → Run every render (rare, usually mistake!)
   - Empty `[]` → Run once on mount
   - `[x]` → Run when x change
   - `[x, y]` → Run when x or y change

2. Common Mistakes
   - Missing dependency: Effect depend on value but not in dependency array = stale value
   - Missing cleanup: Timer/listener continue = memory leak = app slow + crash
   - Infinite loop: Dependency change inside effect = every render run effect = dependency change = infinite

3. When to Use useEffect
   - Fetch data from API
   - Listen to event (window resize, scroll)
   - Start subscription (WebSocket, timer)
   - Sync state with localStorage
   - Update page title
   - Cleanup resource on unmount

---

### Day 23 — Real API Integration: User Directory (Jan 7)

**File:** `yogendra-react-app/src/components/features/UserDirectory.jsx` (357 lines)

**Real API:** JSONPlaceholder (`https://jsonplaceholder.typicode.com/users`)

**Features:**

1. **Loading State**
   - While fetching: Show animated skeleton loader (6 placeholder card)
   - User see loading state = understand something happening = better UX

2. **Error State with Retry**
   - If fetch fail: Show error message + retry button
   - User can click retry instead of page refresh

3. **Search Filter**
   - Real-time search by name or email
   - Update display instantly

4. **Sort**
   - A-Z or Z-A by name
   - Toggle between sort order

5. **Race Condition Prevention**
   - Problem: If user click button twice, two fetch request start
   - Old request might complete AFTER new request = old data overwrite new data!
   - Solution: Use `ignore` flag
   - Code: Set `ignore = false` in effect; on response check `if (!ignore) setUsers(data)`;
   - Cleanup: Set `ignore = true` when effect cleanup (new effect start or component unmount)

**Defense Q&A:**

Q: How prevent race condition when multiple request in flight?

A: Use `ignore` flag pattern. Inside effect set `let ignore = false`. When fetch complete, check `if (!ignore)` before setState. In cleanup return `() => { ignore = true }`. If new request start (dependency change), cleanup run first, set ignore = true, so old response ignored. This way latest response win!

---

### Day 24 — Portfolio Page: Component Reuse in Action (Jan 8)

**File:** `yogendra-react-app/src/pages/Portfolio.jsx` (371 lines)

**Sections:**

1. **Hero Section**
   - Avatar component (initials "YB")
   - Name, tagline, CTA buttons
   - Gradient background

2. **Skills Section**
   - Grouped by category: Frontend, Tools, Learning, Soft Skills
   - **Key Demo:** Same `Badge` component used 20+ times with different values
   - Show immense power of reusable component!

3. **Projects Section**
   - Card component reused 4 times showing different projects
   - State Patterns project, User Directory project, Todo App (coming soon), Admin Dashboard (coming)
   - **Key Demo:** Same `Card` component, different content (header, footer, children custom)

4. **Timeline Section**
   - Week 1-11 internship journey
   - Status badge: completed, in-progress, pending
   - Show learning progression

5. **About Section**
   - Personal story, why learn React, career goal
   - Card component wrapping text content

6. **Footer CTA**
   - Call-to-action button

**Component Reuse Showcase:**

- `Badge` used 20+ times: Skills badge, project tags, status badge
- `Card` used 4+ times: Project cards, about section
- `Button` used 3+ times: Hero CTA, footer CTA
- `Avatar` used 2 times: Hero, about section

**Key Technical Comment:**

```javascript
// Same Badge component used everywhere — reusability!
<Badge color="blue">React</Badge>
<Badge color="green">Git/GitHub</Badge>
<Badge color="purple">State Management</Badge>
// Pass different color prop → same component adapt!
```

---

### Day 25 — Todo App with localStorage & Week Summary (Jan 9)

**Files:**
- `yogendra-react-app/src/pages/TodoApp.jsx` (480+ lines)
- Updated `yogendra-react-app/src/App.jsx` (routing)
- `docs/week-5/week5-summary.md` (this file)

**Todo App Features:**

1. **Add Task**
   - Type task, press Enter or click Add button
   - Priority selector (Low/Medium/High)

2. **Toggle Complete**
   - Click checkbox to mark complete
   - Complete task show strike-through

3. **Delete Task**
   - Click trash icon to remove

4. **Reorder**
   - Up/Down button to move task in list

5. **Filter**
   - All, Active, Completed
   - Clear Completed button

6. **localStorage Persistence** (KEY LEARNING!)
   - On mount: Load todos from localStorage
   - On todos change: Save todos to localStorage
   - Reload page: All tasks still there!
   - **Pattern:**
     ```javascript
     // Save on change
     useEffect(() => {
       localStorage.setItem('todos', JSON.stringify(todos));
     }, [todos]); // Dependency: todos change
     
     // Load on mount
     useEffect(() => {
       const saved = localStorage.getItem('todos');
       if (saved) setTodos(JSON.parse(saved));
     }, []); // Empty dependency: mount only
     ```

**Routing Updates:**

Updated `App.jsx` to add React Router:
- `/` → Home page
- `/portfolio` → Portfolio showcase
- `/todo` → Todo app

Navbar links now navigate between page using React Router!

---

## Full Learning Recap

### useState Mastery (5 Patterns)
1. ✅ Lazy initialization
2. ✅ State from props
3. ✅ Derived state
4. ✅ State colocation
5. ✅ Lifting state up

### useEffect Mastery (6 Patterns)
1. ✅ Mount-only effect
2. ✅ Specific dependency effect
3. ✅ Multiple dependency effect
4. ✅ Cleanup effect
5. ✅ Data fetching effect
6. ✅ Debounced effect

### Real-World Application
1. ✅ API integration with error/loading/success state
2. ✅ Search & sort functionality
3. ✅ Race condition prevention
4. ✅ Component reuse across page
5. ✅ localStorage persistence

### Routing & Navigation
1. ✅ React Router setup
2. ✅ Multiple page (Home, Portfolio, Todo)
3. ✅ Dynamic Navbar links

---

## Technical Depth

### localStorage Pattern

**Complete Flow:**

```
[Mount]
  ↓
useEffect([], []) run
  ↓
Load from localStorage
  ↓
Parse JSON string to object
  ↓
setState with loaded data
  ↓
Component re-render with restored data

[User Add Task]
  ↓
setState(newTodos)
  ↓
Component re-render with new todos
  ↓
useEffect([todos]) trigger
  ↓
Stringify todos to JSON
  ↓
Save to localStorage
  ↓
(No re-render, effect already run)

[User Reload Page]
  ↓
Back to [Mount] step
  ↓
Load previously saved data
```

### Race Condition Prevention

```javascript
// Problem: Without ignore flag
Effect 1 Start → Request 1 start
Effect 2 Start → Request 2 start (ignore flag = false)
Request 1 Complete → Update state with data1 ← WRONG! Old data!
Request 2 Complete → Update state with data2 ← Correct, but too late

// Solution: With ignore flag
Effect 1 Start → Request 1 start, ignore = false
Effect 2 Start → ignore = true (cleanup) → Request 2 start, ignore = false
Request 1 Complete → Check ignore flag = true → Skip setState ← Ignored!
Request 2 Complete → Check ignore flag = false → Update state with data2 ✅ Correct!
```

---

## Files Created (Week 5)

| Day | File | Lines | Purpose |
|-----|------|-------|---------|
| 21 | StatePatterns.jsx | 404 | 5 useState pattern showcase |
| 22 | UseEffectPatterns.jsx | 600+ | 6 useEffect pattern showcase |
| 22 | day22-useeffect-guide.md | 550+ | Complete useEffect reference |
| 23 | UserDirectory.jsx | 357 | Real API integration |
| 24 | Portfolio.jsx | 371 | Component reuse showcase |
| 25 | TodoApp.jsx | 480+ | localStorage persistence |
| 25 | App.jsx (updated) | 60 | React Router setup |

**Total: 1,300+ lines of production code with professional pattern**

---

## Git Commits (Week 5)

1. **Day 21:** `[main 1dc1458]` useState advanced pattern sikey
2. **Day 22:** `[main d4e88d1]` useEffect pattern + reference guide
3. **Day 23:** `[main e3d1d37]` UserDirectory API integration
4. **Day 24:** `[main b33341b]` Portfolio page component reuse
5. **Day 25:** `[main XXXXX]` TodoApp + routing + week summary

---

## Interview Q&A Prepared

**Q: Why useEffect with empty dependency array run only once?**  
A: Dependency array tell React when to run effect. Empty `[]` mean "this effect have no dependencies", so never need re-run. React run once on mount for initialization, then never again.

**Q: Difference between `useEffect` and component body code?**  
A: Component body run every render (before render). useEffect run AFTER render. For async (API fetch) or event listener, must use useEffect. For direct state/props, can optimize with dependencies.

**Q: How localStorage prevent data loss on page reload?**  
A: localStorage persist data in browser disk. Page reload don't clear browser disk. So load on mount get back previously saved data.

**Q: Why race condition happen with API request?**  
A: Network not instant. If make two request, both in flight. First might complete after second. Without protection, first response arrive later overwrite newer response.

**Q: Why need cleanup function in useEffect?**  
A: Some effect create resource (timer, listener, subscription) that continue running. On unmount, if not cleanup, continue waste memory. Cleanup stop resource so no leak.

---

## Key Takeaways

1. **useState**: 5 pattern cover 90% of real-world use case. Understand lazy init, lifting state, derived state.

2. **useEffect**: Empty dependency = mount only. Specific dependency = on change. Multiple dependency = any change. Always think about cleanup!

3. **API Fetching**: Always show loading state, handle error, use ignore flag for race condition.

4. **Component Reuse**: Write reusable component (pass props), use same component many time = less code, consistent style.

5. **localStorage**: Persist data using JSON stringify/parse. Load on mount, save on change.

6. **React Router**: Multiple page, dynamic navigation, active link styling.

---

## What's Next (Week 6-11)

- Week 6: Context API (global state without prop drilling)
- Week 7: Custom Hooks (extract logic into reusable hook)
- Week 8-9: Advanced project with real backend API
- Week 10-11: Full-stack project + deployment + portfolio

---

## Summary

**Week 5 achievement:**

✅ Master `useState` (5 pattern)  
✅ Master `useEffect` (6 pattern + reference guide)  
✅ Real API integration with error/loading/success  
✅ Component reuse across multiple page  
✅ localStorage persistence  
✅ React Router setup  
✅ Production-ready Todo app  

**Confidence Level:** Strong fundamentals. Ready for Context API (Week 6).

---

**Date:** January 5-9, 2026  
**Status:** ✅ COMPLETE  
**Next Review:** Week 6 — Context API Mastery
