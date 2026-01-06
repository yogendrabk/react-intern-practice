# useEffect Complete Reference Guide

**Date:** January 6, 2026  
**Week:** 5 Day 2  
**Trainee:** Yogendra BK

---

## What is useEffect?

useEffect Hook let run side effect in functional component. Side effect = anything outside component (API call, timer, event listener, localStorage, etc).

Before Hooks, need class component lifecycle method (componentDidMount, componentDidUpdate, componentWillUnmount). useEffect combine all three!

---

## Basic Syntax

```javascript
useEffect(() => {
  // Effect code run here
  
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]); // Dependency array
```

**Three part:**
1. **Effect function** — code to run
2. **Cleanup function** — optional, run before unmount or re-run
3. **Dependency array** — when effect should run

---

## Dependency Array Decision Tree

### 1️⃣ NO DEPENDENCY ARRAY — Run on EVERY render ❌ Rarely use

```javascript
useEffect(() => {
  console.log('This run on EVERY render!');
});
```

**When use:** Almost never. Lead performance issue.

**Why:** Without dependency array, React don't know when effect should run, so run every time component render (include parent re-render, prop change, etc). Very expensive!

---

### 2️⃣ EMPTY ARRAY [] — Run on MOUNT ONLY ✅ Very common

```javascript
useEffect(() => {
  console.log('Run on mount only');
  // Fetch initial data
  // Subscribe to event
  // Initialize timer
}, []); // Empty = no dependencies
```

**When use:**
- Fetch initial data from API
- Subscribe to event listener
- Initialize global state
- Any one-time setup

**Why:** Empty array mean "no dependencies". React check: "any dependency changed?" No → don't run again.

**Real Example:**
```javascript
useEffect(() => {
  async function fetchUser() {
    const response = await fetch('/api/user');
    const data = await response.json();
    setUser(data);
  }
  fetchUser();
}, []); // Run once on mount
```

---

### 3️⃣ WITH SPECIFIC DEPS [count] — Run when dependency change ✅ Most common

```javascript
useEffect(() => {
  console.log('count change to:', count);
  // Recompute value
  // Refetch data
}, [count]); // Run when count change
```

**When use:**
- Re-fetch data when filter change
- Recompute value based on state
- Update title when data change

**Why:** Dependency array tell when run. React check: "count changed?" Yes → run effect. No → skip.

**Real Example:**
```javascript
useEffect(() => {
  setTitle(`You have ${count} task`);
}, [count]); // Update title when count change
```

---

### 4️⃣ MULTIPLE DEPS [a, b, c] — Run when ANY dependency change ✅ Common

```javascript
useEffect(() => {
  const fullName = `${firstName} ${lastName}`;
  setTitle(fullName);
}, [firstName, lastName]); // Run when either change
```

**When use:**
- Multiple variable affect effect
- Combine data from multiple state

**Why:** React check: "firstName changed OR lastName changed?" Yes → run. No → skip.

---

## Pattern Guide

### Pattern A: Fetch Data on Mount

```javascript
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch on mount only
    fetch('/api/user')
      .then(r => r.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []); // Empty = run once

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {user && <p>Hello {user.name}</p>}
    </>
  );
}
```

---

### Pattern B: Observe State Change

```javascript
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch when query change
    if (!query) return;
    
    fetch(`/api/search?q=${query}`)
      .then(r => r.json())
      .then(data => setResults(data));
  }, [query]); // Re-fetch when query change

  return (
    <div>
      {results.map(r => <p key={r.id}>{r.title}</p>)}
    </div>
  );
}
```

---

### Pattern C: Cleanup Timer (Memory Leak Prevention)

```javascript
function Countdown() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    // Setup timer
    const intervalId = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);

    // IMPORTANT: Cleanup function
    return () => {
      clearInterval(intervalId); // Stop timer
      console.log('Timer cleanup');
    };
  }, []); // Run on mount, cleanup on unmount

  return <p>{seconds}s remaining</p>;
}
```

**Why cleanup matter:**
- Without cleanup: timer keep running after component unmount
- Memory leak: multiple timer stack up if component mount/unmount repeatedly
- With cleanup: timer stop, no leak

---

### Pattern D: Event Listener Cleanup

```javascript
function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Setup listener
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup: remove listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Setup/cleanup on mount/unmount

  return <p>Window width: {width}px</p>;
}
```

---

### Pattern E: Subscription Cleanup

```javascript
function Chat() {
  useEffect(() => {
    // Subscribe to realtime data
    const unsubscribe = subscribeToMessages(userId, (msg) => {
      console.log(msg);
    });

    // Cleanup: unsubscribe
    return () => {
      unsubscribe(); // Stop listening
    };
  }, [userId]);

  return <div>Chat room</div>;
}
```

---

### Pattern F: Debounced Effect (Search)

```javascript
function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    // Wait 500ms after user stop typing
    const timer = setTimeout(() => {
      fetch(`/api/search?q=${query}`)
        .then(r => r.json())
        .then(data => setResults(data));
    }, 500);

    // Cleanup: clear timer if query change before 500ms
    return () => clearTimeout(timer);
  }, [query]); // Re-setup timer when query change

  return (
    <>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {results.map(r => <p key={r.id}>{r.name}</p>)}
    </>
  );
}
```

---

## Common Mistakes

### ❌ MISTAKE 1: Missing Cleanup

```javascript
// BAD: Timer never cleared
useEffect(() => {
  setInterval(() => {
    console.log('Tick');
  }, 1000);
  // No cleanup = memory leak!
}, []);
```

### ✅ FIX: Add Cleanup

```javascript
// GOOD: Timer cleaned up
useEffect(() => {
  const id = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  return () => clearInterval(id); // Cleanup!
}, []);
```

---

### ❌ MISTAKE 2: Missing Dependency

```javascript
// BAD: count used but not in dependency array
useEffect(() => {
  console.log('Count:', count); // Stale value!
}, []); // Should include [count]
```

### ✅ FIX: Add Dependency

```javascript
// GOOD: count in dependency array
useEffect(() => {
  console.log('Count:', count); // Always fresh
}, [count]); // Dependency included
```

---

### ❌ MISTAKE 3: Infinite Loop

```javascript
// BAD: Infinite loop! Effect update state which trigger effect again
useEffect(() => {
  setCount(count + 1); // Trigger re-render...
}, []); // Which trigger effect again... forever!
```

### ✅ FIX: Don't update dependency

```javascript
// GOOD: Just fetch once
useEffect(() => {
  fetch('/api/data')
    .then(r => r.json())
    .then(data => setData(data));
}, []); // No infinite loop
```

---

## useEffect Rules (React Strict Mode)

React run effect twice in development (but once in production). Purpose: catch cleanup issue!

```javascript
useEffect(() => {
  console.log('Setup');
  
  return () => {
    console.log('Cleanup');
  };
}, []);

// Development output:
// Setup
// Cleanup
// Setup
// 
// Production output:
// Setup
```

This double-running help find memory leak early!

---

## Performance Optimization

### Issue: Effect run too often

```javascript
// BAD: Compute on every render
function Parent() {
  const [name, setName] = useState('');
  
  return (
    <>
      <input onChange={e => setName(e.target.value)} />
      <Child key={name} /> {/* New component every render! */}
    </>
  );
}
```

### Solution: Memoize or optimize

```javascript
// GOOD: Only recreate if name really change
function Parent() {
  const [name, setName] = useState('');
  
  return (
    <>
      <input onChange={e => setName(e.target.value)} />
      <Child key={name} /> {/* Now only update if name change */}
    </>
  );
}
```

---

## Checklist: Is useEffect Right?

Before use useEffect, ask:

- **Do I need run code on mount?** → useEffect ✅
- **Do I need run code on state change?** → useEffect with deps ✅
- **Do I need cleanup resource?** → useEffect return cleanup ✅
- **Do I need run code every render?** → Maybe not useEffect? Consider compute instead
- **Do I need share state between component?** → Not useEffect. Need Context or state management

---

## Summary

| Pattern | Code | When Use |
|---------|------|----------|
| **Mount** | `useEffect(() => {...}, [])` | One-time setup, initial fetch |
| **State Change** | `useEffect(() => {...}, [dep])` | Refetch when filter change |
| **Cleanup** | `useEffect(() => {...; return () => {...}}, [])` | Timer, listener, subscription |
| **Debounce** | `useEffect(() => {const timer = setTimeout(...)}, [dep])` | Search with delay |

---

## Interview Preparation

**Q: useEffect run when? Kina dependency array important?**

**A:** useEffect run after component render. Dependency array tell when run.

Empty dependency: run on mount only (initial data fetch)
With dependency: run when dependency change (refetch on filter change)
Missing dependency: bug! State become stale

**Q: useEffect vs componentDidMount?**

**A:** Old way: need 3 method (mount, update, unmount). New Hooks way: one useEffect can do all!

```javascript
// Old class way
componentDidMount() { } // Setup
componentDidUpdate() { } // Update
componentWillUnmount() { } // Cleanup

// New Hooks way
useEffect(() => {
  // Setup
  
  return () => {
    // Cleanup
  };
}, []) // Update
```

---

## Next Steps

1. Practice all 6 pattern from UseEffectPatterns.jsx
2. Build something: Todo fetch from API, search with debounce, real-time chat
3. Remember cleanup function prevention memory leak!
4. Always include all used variable in dependency array

