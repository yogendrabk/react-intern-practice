import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import TodoApp from './pages/TodoApp';
import './App.css';

export function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: '/', active: location.pathname === '/' },
    { label: 'Portfolio', href: '/portfolio', active: location.pathname === '/portfolio' },
    { label: 'Todo App', href: '/todo', active: location.pathname === '/todo' },
    { label: 'Learning', href: '#', active: false },
  ];

  const footerLinks = [
    { label: 'Documentation', href: '#' },
    { label: 'GitHub', href: 'https://github.com/yogendrabk' },
    { label: 'Email', href: 'mailto:yogendra@example.com' },
    { label: 'Roadmap', href: '#' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at top */}
      <Navbar 
        title="React Training — Hooks & Routing" 
        links={navLinks}
      />

      {/* Main content grow */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/todo" element={<TodoApp />} />
        </Routes>
      </main>

      {/* Footer at bottom */}
      <Footer 
        companyName="Tech Yatra Private Limited — Week 5 Complete"
        links={footerLinks}
      />
    </div>
  );
}

export default App;
