import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import './App.css';

export function App() {
  const navLinks = [
    { label: 'Home', href: '#', active: true },
    { label: 'Components', href: '#' },
    { label: 'Learning', href: '#' },
    { label: 'About', href: '#' },
  ];

  const footerLinks = [
    { label: 'Documentation', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Discord', href: '#' },
    { label: 'Roadmap', href: '#' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at top */}
      <Navbar 
        title="React Week 4 Training" 
        links={navLinks}
      />

      {/* Main content grow */}
      <main className="flex-grow">
        <Home />
      </main>

      {/* Footer at bottom */}
      <Footer 
        companyName="Tech Yatra Private Limited"
        links={footerLinks}
      />
    </div>
  );
}

export default App;
