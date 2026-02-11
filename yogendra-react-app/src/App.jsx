import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/ui/SearchModal';
import { BackToTop } from './components/ui/BackToTop';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import TodoApp from './pages/TodoApp';
import UsersPage from './pages/UsersPage';
import UserDetail from './pages/UserDetail';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import PostsPage from './pages/PostsPage';
import PostDetail from './pages/PostDetail';
import { MultiStepForm } from './components/features/MultiStepForm';
import { ReactPatternsDemo } from './practice/ReactPatternsDemo';
import ProtectedRoute from './components/layout/ProtectedRoute';
import './App.css';

// ============================================================================
// Main App Component with React Router Setup (Week 6)
// ============================================================================
//
// This component set up complete React Router v6 structure:
// - BrowserRouter: Enable browser history + routing
// - Routes: Container for all route
// - Route: Define individual route (path + element)
// - Navigate: Redirect user to different route (for 404, auth redirect)
//
// Route tree structure:
// /                  → Home (public)
// /about             → About (public, informational)
// /portfolio         → Portfolio (public, showcase)
// /todo              → TodoApp (public, task manager)
// /users             → UsersPage (public, list all user)
// /users/:id         → UserDetail (public, single user detail + posts + todos)
// /login             → LoginPage (public, auth form with validation)
// /dashboard         → Dashboard (PROTECTED, only if isLoggedIn true)
// /*                 → NotFound (catch all 404 page)
//
// ============================================================================

export function App() {
  // Auth state: control who can access protected route
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <AppContent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </Router>
  );
}

function AppContent({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();

  // Dynamic nav link based on auth state
  const navLinks = [
    { label: 'Home', href: '/', active: location.pathname === '/' },
    { label: 'About', href: '/about', active: location.pathname === '/about' },
    { label: 'Portfolio', href: '/portfolio', active: location.pathname === '/portfolio' },
    { label: 'Users', href: '/users', active: location.pathname === '/users' },
    { label: 'Posts', href: '/posts', active: location.pathname === '/posts' || location.pathname.startsWith('/posts/') },
    { label: 'Todo', href: '/todo', active: location.pathname === '/todo' },
    { label: 'Apply', href: '/apply', active: location.pathname === '/apply' },
    { label: 'Patterns', href: '/patterns', active: location.pathname === '/patterns' },
    { label: 'Contact', href: '/contact', active: location.pathname === '/contact' },
    ...(isLoggedIn ? [
      { label: 'Dashboard', href: '/dashboard', active: location.pathname === '/dashboard' },
      { label: 'Settings', href: '/settings', active: location.pathname === '/settings' }
    ] : [
      { label: 'Login', href: '/login', active: location.pathname === '/login' }
    ]),
  ];

  const footerLinks = [
    { label: 'GitHub', href: 'https://github.com/yogendrabk' },
    { label: 'Email', href: 'mailto:yogendra@example.com' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* SearchModal — Global component, accessible with Ctrl+K */}
      <SearchModal />

      {/* BackToTop — Floating button to scroll back to top */}
      <BackToTop />

      {/* ErrorBoundary — Catch JS errors and show fallback UI */}
      <ErrorBoundary>
        {/* Navbar at top with all routes */}
        <Navbar 
          title="React Router & Authentication — Week 6" 
          links={navLinks}
        />

        {/* Main content grow */}
        <main className="flex-grow">
          <Routes>
          {/* ============================================================ */}
          {/* PUBLIC ROUTES */}
          {/* ============================================================ */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/apply" element={<MultiStepForm />} />
          <Route path="/patterns" element={<ReactPatternsDemo />} />
          <Route path="/contact" element={<Contact />} />

          {/* ============================================================ */}
          {/* AUTH ROUTES */}
          {/* ============================================================ */}
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

          {/* ============================================================ */}
          {/* PROTECTED ROUTES */}
          {/* ============================================================ */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard setIsLoggedIn={setIsLoggedIn} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Settings />
              </ProtectedRoute>
            } 
          />

          {/* ============================================================ */}
          {/* CATCH ALL 404 */}
          {/* ============================================================ */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </main>

        {/* Footer at bottom */}
        <Footer 
          companyName="Tech Yatra Private Limited — Week 6: Router Architecture"
          links={footerLinks}
        />
      </ErrorBoundary>
    </div>
  );
}

export default App;
