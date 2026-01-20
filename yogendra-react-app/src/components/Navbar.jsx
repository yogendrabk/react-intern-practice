import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// ============================================================================
// Navbar Component (Updated for React Router v6)
// ============================================================================
//
// This component now use Link from react-router-dom instead of <a> tag.
// Why? Because:
// - <a> tag cause full page reload (bad for SPA)
// - Link component prevent default + navigate without reload (good for SPA)
// - React Router keep state when navigate between page
//
// Features:
// - Responsive: desktop menu + mobile hamburger menu
// - Active link highlighting (check current pathname)
// - Dynamic links from prop (flexible navigation)
//
// ============================================================================

export function Navbar({ 
  title = 'React App',
  links = [],
  className = '',
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav 
      className={`
        bg-white/70
        backdrop-blur-md
        shadow-md
        sticky
        top-0
        z-50
        border-b
        border-white/20
        ${className}
      `}
      {...rest}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Title — also link to home */}
          <Link 
            to="/"
            className="font-bold text-xl text-gray-800 hover:text-primary-600 transition"
          >
            {title}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.href || '/'}
                className={`
                  font-semibold
                  transition-colors
                  pb-2
                  ${link.active 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-gray-600 hover:text-primary-600'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex flex-col gap-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-1 bg-gray-800 transition-all ${isOpen && 'rotate-45 translate-y-2'}`}></div>
            <div className={`w-6 h-1 bg-gray-800 transition-all ${isOpen && 'opacity-0'}`}></div>
            <div className={`w-6 h-1 bg-gray-800 transition-all ${isOpen && '-rotate-45 -translate-y-2'}`}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-4">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.href || '/'}
                className={`
                  font-semibold
                  transition-colors
                  pb-2
                  ${link.active 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-gray-600 hover:text-primary-600'
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      active: PropTypes.bool,
    })
  ),
  className: PropTypes.string,
};

// Navbar component showcase responsive design
// Mobile hamburger menu toggle with useState
// Desktop menu display flex with gap
// Active link detection with conditional styling
