import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/ui/SearchModal';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import TodoApp from './pages/TodoApp';
import UsersPage from './pages/UsersPage';
import UserDetail from './pages/UserDetail';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
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
    { label: 'Todo', href: '/todo', active: location.pathname === '/todo' },
    isLoggedIn
      ? { label: 'Dashboard', href: '/dashboard', active: location.pathname === '/dashboard' }
      : { label: 'Login', href: '/login', active: location.pathname === '/login' },
  ];

  const footerLinks = [
    { label: 'GitHub', href: 'https://github.com/yogendrabk' },
    { label: 'Email', href: 'mailto:yogendra@example.com' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* SearchModal — Global component, accessible with Ctrl+K */}
      <SearchModal />

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
    </div>
  );
}

export default App;
