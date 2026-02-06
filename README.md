# React Internship Project - Complete Portfolio

A comprehensive React 18 application built during a 9-week internship at Tech Yatra Private Limited. Demonstrates advanced React patterns, custom hooks, state management, API integration, and production-ready component design.

**Duration:** December 9, 2025 - February 6, 2026  
**Location:** Kathmandu, Nepal  
**GitHub:** [yogendrabk](https://github.com/yogendrabk)

---

## 🎯 Project Overview

This portfolio showcases a full-featured React application built from scratch during a 9-week internship. Starting from HTML/CSS fundamentals through advanced JavaScript and React, I've built 2500+ lines of production-ready code with 20+ reusable components.

### Key Achievements
- ✅ **45 Git commits** — One per day with meaningful messages
- ✅ **2500+ lines of code** — Production-quality component code
- ✅ **20+ components** — UI, features, pages with reusable patterns
- ✅ **9 weeks completed** — From fundamentals to advanced React
- ✅ **8+ major projects** — Component library, user directory, posts, dashboard, portfolio, activity feeds, forms

---

## ✨ Features

### Core Features
- ✅ **Responsive Design** — Mobile-first with Tailwind CSS
- ✅ **User Directory** — Sortable/filterable data table with pagination
- ✅ **Infinite Scroll Posts** — Efficient pagination with IntersectionObserver
- ✅ **Bookmarks System** — localStorage persistence with real-time sync
- ✅ **Authentication** — Login page with protected routes
- ✅ **Dashboard** — Protected page with CSS-only data visualization
- ✅ **Component Library** — Reusable UI components (Button, Card, Badge, Avatar, Tooltip, Skeleton)

### Advanced Features
- 📊 **Charts** — CSS conic-gradient donut charts, skill bars, activity heatmaps
- 🔄 **DataTable** — useReducer state management with sorting, filtering, pagination
- 📱 **Infinite Scroll** — IntersectionObserver sentinel pattern for efficient loading
- 💾 **Bookmarks** — localStorage persistence with cross-tab sync
- 🖨️ **Print Layout** — CSS @media print for PDF generation
- ♿ **Accessible** — Semantic HTML, ARIA labels, keyboard navigation

---

## 🛠️ Tech Stack

**Frontend:** React 18, React Router v6, Tailwind CSS, Bootstrap 5  
**Build:** Vite, PostCSS  
**APIs:** JSONPlaceholder (mock API)  
**Browser APIs:** IntersectionObserver, localStorage, Clipboard, fetch  

---

## 📦 Quick Start

### Prerequisites
- Node.js 16+ and npm 8+

### Setup

```bash
# Clone and navigate
git clone <repo-url>
cd react-intern-practice/yogendra-react-app

# Install dependencies
npm install

# Start development server
npm run dev
```

App opens at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

---

## 🏗️ Architecture

```
App (Router + Auth State)
├── Navbar (Navigation, Bookmarks Badge)
├── Routes (12 pages + catch-all 404)
│   ├─ Home (public)
│   ├─ Users (Uses DataTable)
│   ├─ Posts (Infinite scroll)
│   ├─ PostDetail (Related posts, share, print)
│   ├─ Dashboard (Protected, Charts)
│   ├─ Login (Auth form)
│   └─ Others (About, Contact, Todo, Portfolio)
├── Components/
│   ├─ UI/ (Button, Card, Badge, Avatar)
│   ├─ Features/ (DataTable, Charts)
│   └─ Layout/ (ProtectedRoute)
├── Hooks/ (Custom hooks for reusable logic)
├── Utils/ (Formatting, calculations)
└── Footer

Pages: 12 route handlers
Components: 15+ reusable pieces
Custom Hooks: 5 (useIntersectionObserver, useWindowSize, useKeyPress, useDocumentTitle, useLocalStorage)
Lines of Code: 2000+
Git Commits: 40 (one per day)
```

---

## 📚 Week-by-Week Progress

| Week | Focus | Status | Key Components|
|------|-------|--------|---|
| 1 | HTML, CSS, Git | ✅ Complete | Semantic HTML, Flexbox/Grid foundation |
| 2 | Advanced CSS | ✅ Complete | Responsive design, animations |
| 3 | JavaScript | ✅ Complete | ES6+, async/await, modules |
| 4 | React Basics | ✅ Complete | Components, props, state, design system |
| 5 | React Hooks | ✅ Complete | useState, useEffect, API integration |
| 6-7 | Advanced React | ✅ Complete | React Router, protected routes, custom hooks |
| 8 | Advanced Features | ✅ Complete | DataTable (useReducer), Charts (CSS), PostsPage (infinite scroll), Defense prep |
| **9** | **Advanced Patterns & Defense** | ✅ **Complete** | **ActivityFeed (real-time), MultiStepForm (persistence), React Patterns, Defense prep final** |

### Week 9 Highlights

**Day 41:** Real-Time Activity Feed  
- useReducer with 3 actions (ADD_ACTIVITY, TOGGLE_PAUSE, CLEAR)
- Time utilities for relative formatting
- Polling pattern for simulated real-time
- 260+ lines of ActivityFeed + 110+ lines utilities

**Day 42:** Multi-Step Form Wizard
- 3-step form with per-step validation
- localStorage persistence across refresh
- Progress bar and step indicators
- 350+ lines of production code

**Day 43:** React Design Patterns
- Compound Components with Context API
- Render Props for flexible behavior
- Higher-Order Components for enhancements
- 300+ lines of interactive examples

**Day 44:** Defense Preparation
- Opening statement and strategy
- 5 technical deep dives with examples
- 10+ anticipated Q&A with detailed answers
- 825+ lines comprehensive reference

**Day 45:** Final Dashboard & Polish
- Home page with animated typing effect
- Portfolio updates with Week 9 achievements
- Live stats section (9 weeks, 45 commits, 35+ components)
- Portfolio completely polished

### Week 8 Highlights (Previous)
- Utility functions (formatters.js)
- Custom hooks (useDocumentTitle)
- Portfolio update with internship section
- Complete README and week summary

---

## 🔑 Key Patterns & Concepts

### 1. useReducer for Complex State
DataTable manages 4 related state values (sortColumn, sortDirection, currentPage, searchQuery) using useReducer for cohesive state management.

### 2. IntersectionObserver for Infinite Scroll
Efficient viewport detection for PostsPage infinite scroll without scroll event listeners.

### 3. localStorage for Persistence
Bookmarks array saved as JSON, persists across refresh, syncs across tabs.

### 4. Custom Hooks
- `useDocumentTitle()` — Updates browser tab title
- `useIntersectionObserver()` — Viewport detection
- `useWindowSize()` — Responsive dimensions
- `useKeyPress()` — Keyboard shortcuts
- `useLocalStorage()` — Pattern for persistence

### 5. Protected Routes
Authentication wrapper for sensitive pages (Dashboard).

### 6. Reusable Components
DataTable, Charts, and UI components designed with composition for reusability.

---

## 📖 Learning Resources

### Defense Preparation
- **docs/week-8/day39-defense-prep.md** — 700+ lines of concepts, Q&A, and patterns
- **docs/week-8/day39-component-map.md** — Component hierarchy and data flows

### Weekly Summaries
- **docs/week-*/week*-summary.md** — Week-by-week learning notes

### Documentation
- Every component includes code comments explaining patterns
- README.md in project root with detailed setup
- Comprehensive inline documentation

---

## 🎓 Technical Competencies Demonstrated

1. **React 18** — Functional components, hooks, custom hooks
2. **State Management** — useState, useReducer, Context API, localStorage
3. **API Integration** — Error handling, loading states, Promise patterns
4. **Responsive Design** — Tailwind CSS, Bootstrap 5, mobile-first
5. **Routing** — React Router v6, protected routes, dynamic segments
6. **Performance** — useMemo, lazy loading, pagination, IntersectionObserver
7. **Browser APIs** — localStorage, Clipboard, IntersectionObserver, fetch
8. **Component Design** — Reusable, composable, production-ready
9. **Git Workflow** — Meaningful commits, branch management, 40+ commits
10. **Documentation** — Inline comments, README, defense materials

---

## 📋 Project Structure

```
react-intern-practice/
├── README.md                    (This file - comprehensive guide)
├── docs/
│   ├── week-1/ through week-8/  (Weekly summaries and guides)
│   └── week-8/
│       ├── day39-defense-prep.md (700+ lines of defense material)
│       ├── day39-component-map.md (Component hierarchy & flows)
│       └── week8-summary.md (Final reflection)
├── exercises/                   (Daily practice files from weeks 1-3)
└── yogendra-react-app/          (Main React application)
    ├── src/
    │   ├── pages/              (12 page components)
    │   ├── components/
    │   │   ├── ui/            (Generic UI components)
    │   │   ├── features/      (DataTable, Charts)
    │   │   └── layout/        (ProtectedRoute)
    │   ├── hooks/             (5 custom hooks)
    │   ├── utils/             (formatters.js utilities)
    │   ├── assets/            (Images, icons)
    │   ├── App.jsx            (Router setup)
    │   └── main.jsx           (Entry point)
    ├── public/                (Static files)
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## 🚀 How to Use the App

1. **Home** — Project overview and hero section
2. **Users** — User directory with DataTable (toggle card/table view)
   - Search, sort, pagination
   - Click user to see detail with posts and todos
3. **Posts** — Community feed with infinite scroll
   - Scroll to bottom to load more
   - Bookmark posts (saved in localStorage)
   - Click post to see full detail with related posts
4. **Dashboard** — Protected page (Login first)
   - Skill proficiency visualization
   - Donut chart, activity heatmap
   - Only accessible when logged in
5. **About** — Internship overview and timeline
6. **Contact** — Contact form with validation
7. **Portfolio** — Project showcase and achievements
   - Week 8 internship completion section
   - Technical skills breakdown
   - Major projects listed
8. **Todo** — Simple todo app with persistence

**Pro Tip:** Press `Cmd+K` or `Ctrl+K` to open search modal

---

## 💡 Code Quality

- ✅ Small, focused components
- ✅ Meaningful names and structure
- ✅ Comments explaining complex patterns
- ✅ PropTypes for prop validation
- ✅ Semantic HTML throughout
- ✅ Accessibility (ARIA, keyboard nav)
- ✅ Performance optimized (useMemo, pagination)
- ✅ Responsive design tested

---

## 📞 Contact & Links

- **GitHub:** [yogendrabk](https://github.com/yogendrabk)
- **Email:** bkyogendra246@gmail.com
- **LinkedIn:** [Profile](https://linkedin.com/in/yogendrabk)

---

## 🎉 Internship Summary

By end of this 8-week internship at Tech Yatra Private Limited, I transformed from theoretical knowledge to practical React developer. Completed 40 commits, built 2000+ lines of production-ready code, and mastered advanced React patterns. Ready for junior developer positions and continued learning.

### What I Learned
✅ React ecosystem deeply (components, hooks, state management)  
✅ Modern development practices (Git, performance optimization, accessibility)  
✅ API integration and error handling patterns  
✅ CSS mastery (Tailwind, Bootstrap, custom properties)  
✅ Professional code organization and documentation  

### What I Built
✅ Component library with 15+ reusable pieces  
✅ Full-featured app with routing and authentication  
✅ Advanced features (infinite scroll, charts, bookmarks)  
✅ Documentation and defense materials  
✅ Portfolio-ready projects  

---

**Built with ❤️ during my React internship journey**

*Last Updated: February 6, 2026 | Week 8 Complete ✅*
