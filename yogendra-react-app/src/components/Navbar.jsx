import { useState } from 'react';
import PropTypes from 'prop-types';

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
        bg-white
        shadow-md
        sticky
        top-0
        z-50
        ${className}
      `}
      {...rest}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Title */}
          <div className="font-bold text-xl text-gray-800">
            {title}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href || '#'}
                className={`
                  font-semibold
                  transition-colors
                  ${link.active 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                  }
                `}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex flex-col gap-1"
            onClick={() => setIsOpen(!isOpen)}
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
              <a
                key={index}
                href={link.href || '#'}
                className={`
                  font-semibold
                  transition-colors
                  ${link.active 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                  }
                `}
              >
                {link.label}
              </a>
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
