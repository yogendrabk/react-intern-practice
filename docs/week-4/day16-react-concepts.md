# React Core Concepts — Comprehensive Guide

**Date:** December 29, 2025  
**Week:** 4 Day 1  
**Trainee:** Yogendra BK

---

## What is React?

React is a **JavaScript library for building user interfaces with components**. It make building complex, interactive web applications easier by breaking UI into small, reusable pieces (components).

**Key Idea:** React = Reactive (UI automatically update when data change)

React used by:
- Facebook (created React)
- Netflix
- Uber
- Airbnb
- Instagram
- And 1000+ companies worldwide

---

## Why React Exists — The Problem It Solves

### The Challenge Before React

When building dynamic web apps with vanilla JavaScript:

```javascript
// Without React — manual DOM manipulation (painful!)
const userData = { name: "Yogendra", age: 20 };

// 1. Update data
userData.age = 21;

// 2. Manually update DOM (error-prone, hard scale)
document.getElementById('age').textContent = userData.age;
document.getElementById('status').textContent = userData.age >= 18 ? "Adult" : "Minor";

// Problem: As app grow (100+ data fields), manage DOM manually become nightmare!
// - Easy make mistake
- Hard track what change
- Performance suffer
// - Code become messy
```

### React Solution

```javascript
// With React — declare what UI should look like
function User({ userData }) {
    return (
        <div>
            <p>Age: {userData.age}</p>
            <p>Status: {userData.age >= 18 ? "Adult" : "Minor"}</p>
        </div>
    );
}

// Update data → React automatically update UI!
// React figure out what change and update only necessary part
```

**React Solve This By:**
1. **Declarative:** Describe what UI should look like (not how)
2. **Component-Based:** Break UI into reusable piece
3. **Automatic Updates:** When data change, UI automatically render
4. **Virtual DOM:** Efficient algorithm to minimize actual DOM update (fast!)

---

## Key Concepts in React

### 1. Component

Component = Reusable UI building block. Like LEGO block — combine many together to build complex UI.

**Two types:**

**Functional Component (Modern):**
```javascript
function Greeting({ name }) {
    return <h1>Hello, {name}!</h1>;
}
```

**Class Component (Legacy):**
```javascript
class Greeting extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}!</h1>;
    }
}
```

**Best Practice:** Use functional component (modern standard)

### 2. Props (Properties)

Props = Input to component. Like function parameter — pass data from parent to child.

```javascript
// Parent pass props
<Button label="Click Me" color="blue" onClick={handleClick} />

// Child receive props
function Button({ label, color, onClick }) {
    return <button style={{background: color}} onClick={onClick}>{label}</button>;
}
```

**Props characteristics:**
- Read-only (child cannot modify parent props)
- Flow one-way: parent → child only
- Can pass any data type (string, object, array, function)

### 3. State

State = Component internal data. When state change, component re-render.

```javascript
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    // count = current value
    // setCount = function to update state
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}
```

**State vs Props:**
- State: Component manage own data (mutable)
- Props: Data receive from parent (read-only)

### 4. Lifecycle

Component lifecycle = series of event in component life: Create → Mount → Update → Unmount

```javascript
import { useEffect } from 'react';

function MyComponent() {
    // Lifecycle: Component mount (first render)
    useEffect(() => {
        console.log("Component mount!");
        return () => console.log("Component unmount!");
    }, []);
}
```

---

## JSX Deep Dive

### What is JSX?

JSX = JavaScript XML. Syntax extension allow write HTML-like code in JavaScript.

```javascript
// JSX (write like HTML)
const element = <h1>Hello, {name}!</h1>;

// What JSX actually compile to:
const element = React.createElement('h1', null, `Hello, ${name}!`);
```

### JSX Compile Process

**Browser not understand JSX** — must compile to `React.createElement()` first:

```javascript
// JSX Code:
<div className="container">
    <h1>Title</h1>
    <p>Content</p>
</div>

// Compile to:
React.createElement(
    'div',
    { className: 'container' },
    React.createElement('h1', null, 'Title'),
    React.createElement('p', null, 'Content')
);
```

### JSX Rules

1. **Single Root Element**
   ```javascript
   // ❌ Error — multiple root
   return (
       <div>Content 1</div>
       <div>Content 2</div>
   );
   
   // ✅ Correct — one root
   return (
       <div>
           <div>Content 1</div>
           <div>Content 2</div>
       </div>
   );
   ```

2. **JavaScript Expression in Curly Braces**
   ```javascript
   const name = "Yogendra";
   return <h1>Hello {name}!</h1>; // Expression: {name}
   ```

3. **className not class**
   ```javascript
   // ❌ Wrong
   <div class="container">
   
   // ✅ Correct
   <div className="container">
   ```

4. **Self-Closing Tags**
   ```javascript
   // ✅ Correct
   <img src="photo.jpg" />
   <input type="text" />
   ```

5. **Conditional Rendering**
   ```javascript
   {isLoggedIn ? <Dashboard /> : <LoginForm />}
   // or
   {isLoggedIn && <Dashboard />}
   ```

---

## Virtual DOM Algorithm (Reconciliation)

### How Virtual DOM Work

React maintain two version of DOM:

1. **Old Virtual DOM** — Previous render
2. **New Virtual DOM** — Current render
3. **Reconciliation** — Algorithm compare old and new, figure out what change
4. **Update Real DOM** — Only update necessary part (efficient!)

```
Data Change
    ↓
React create new Virtual DOM
    ↓
Compare old Virtual DOM vs new Virtual DOM
    ↓
Calculate difference (what change?)
    ↓
Update only changed part in real DOM
    ↓
User see update on screen
```

### Why Virtual DOM Fast?

```
Without Virtual DOM:
- Update 1 piece → Update entire page → Slow!

With Virtual DOM:
- Update 1 piece → Virtual DOM figure out exactly what change
- → Update only that 1 piece → Fast!
```

**Real Example:**
```javascript
// User click button, count change 0 → 1
// Without Virtual DOM: Re-render entire page
// With Virtual DOM: React only update <p>Count: 1</p> part

function Counter() {
    const [count, setCount] = useState(0);
    // Complex UI: navigation, sidebar, content, footer
    return (
        <div>
            <nav>...</nav>
            <sidebar>...</sidebar>
            <p>Count: {count}</p>  // ← Only this part change!
            <footer>...</footer>
        </div>
    );
}
```

---

## React vs Other Frameworks

| Aspect | React | Vue | Angular |
|--------|-------|-----|---------|
| **Type** | Library | Framework | Framework |
| **Learning Curve** | Moderate | Easy | Steep |
| **Size** | Small | Small | Large |
| **Performance** | Very Good | Very Good | Good |
| **Ecosystem** | Huge | Good | Complete |
| **Community** | Largest | Growing | Large |
| **Job Market** | Most demand | Growing | Stable |
| **Company Use** | Facebook, Netflix, Uber | Alibaba, Xiaomi | Google, Microsoft |

**React Advantage:**
- Most job opportunity (learn React → most hire)
- Largest ecosystem and community
- Flexible (library, not opinionated)
- Virtual DOM efficient

**React Disadvantage:**
- Need other library for routing, state (not monolithic)
- More decision (which library use for routing?)

---

## Quick Reference

### Component Basics
```javascript
// Functional Component
function Welcome({ name }) {
    return <h1>Hello, {name}!</h1>;
}

// Default Props
function Button({ label = "Click", onClick = () => {} }) {
    return <button onClick={onClick}>{label}</button>;
}

// Use Component
<Welcome name="Yogendra" />
<Button label="Submit" onClick={handleSubmit} />
```

### State Management (Hooks)
```javascript
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
    );
}
```

### Important Points
- Props flow: parent → child only
- State: component manage own
- Virtual DOM: automatic efficient update
- JSX: HTML-like syntax in JavaScript
- Functional component: modern standard

---

## Important Things to Remember

1. **React is Reactive:** Data change → UI automatically update
2. **Component Based:** Build complex UI from small reusable piece
3. **Unidirectional Data Flow:** Data flow parent → child, never backward
4. **Virtual DOM:** React intelligent algorithm make UI update fast
5. **JSX Compile:** JSX compile to `React.createElement()` call
6. **Props Read-Only:** Child cannot modify parent props
7. **State is Mutable:** Parent can change own state
8. **Functional Component:** Use this, not class (modern)

---

## Defense Questions & Answers

### Q1: "React bhanne ko ke ho? Vanilla JavaScript ko compare garda farak kya?"

**A1:** React library jo help garchha user interface build garna easier way. 

Vanilla JavaScript mein:
- Manually manage DOM (querySelector, innerHTML change)
- Data change → manually update DOM
- As app grow, code become messy hard maintain

React mein:
- Declare what UI look like (JSX)
- Data change → React automatically update UI
- Component-based → reusable, maintainable
- Virtual DOM → efficient update (only change necessary part)

React ko key concept "Reactive" — data change, UI automatically react!

---

### Q2: "Virtual DOM bhanne ko ke ho? Kina React fast che?"

**A2:** Virtual DOM = React maintain fake copy of DOM in memory. When data change:

1. React create new Virtual DOM
2. Compare old vs new Virtual DOM (reconciliation)
3. Figure out exactly what change
4. Update only that part in real DOM

Real DOM update expensive (slow). Virtual DOM algorithm decide minimum needed change, so very fast!

Example: 100 element page, 1 change → entire page not re-render, only 1 element update. Fast!

Without Virtual DOM: Every data change → entire page re-render → slow!

---

### Q3: "JSX kya ch? Kina JSX use garchau?"

**A3:** JSX = JavaScript XML. HTML-like syntax in JavaScript. Browser not understand JSX — must compile to `React.createElement()` first.

```
JSX: <h1>Hello {name}!</h1>
    ↓ (compile)
React.createElement('h1', null, `Hello ${name}!`)
```

Why JSX useful:
- Write HTML-like code (intuitive)
- JavaScript expression curly brace ({})
- Cleaner, readable code
- Mental model match HTML developer familiar with

Without JSX: Must write many nested `React.createElement()` → messy!

---

### Q4: "Props vs State difference explain gara?"

**A4:** Props and state both hold data, but different purpose:

**Props:**
- Data receive from parent
- Read-only (child cannot change)
- Flow: parent → child only
- Function parameter like
- Example: <Button label="Click" /> — label is prop

**State:**
- Component internal data
- Component manage own state
- Can change (call setState)
- useState hook use garchau
- Example: Counter component count state

Props = input to component
State = internal, component manage

Unidirectional: parent → child via props
Reverse not possible — child cannot modify parent prop direct!

---

## Summary

React solve problem of manual DOM management. Component-based architecture make code reusable maintainable. Virtual DOM algorithm make UI update efficient. JSX make JavaScript development intuitive. Understanding component, props, state foundation for React mastery!

