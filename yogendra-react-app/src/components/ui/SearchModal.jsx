import { useState, useEffect } from 'react';
import { useKeyPress } from '../../hooks';

/**
 * SearchModal Component
 *
 * A search overlay/modal that opens with Ctrl+K and closes with Escape.
 * Allows searching through page titles and navigation links.
 *
 * Features:
 * - Keyboard shortcut: Ctrl+K to open
 * - Escape key to close
 * - Search through available pages
 * - Click on item to navigate
 * - Smooth animations
 *
 * Usage:
 * <SearchModal />
 *
 * This component demonstrates:
 * 1. useKeyPress hook for global keyboard shortcuts
 * 2. Modal overlay pattern
 * 3. Real-time search filter
 * 4. Keyboard navigation (focus management)
 */

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Detect Ctrl+K to open search
  const isCtrlKPressed = useKeyPress('k', { ctrlKey: true });

  // Detect Escape to close
  const isEscapePressed = useKeyPress('Escape');

  // Handle Ctrl+K
  useEffect(() => {
    if (isCtrlKPressed) {
      setIsOpen(!isOpen);
      setSearchQuery('');
      setFocusedIndex(0);
    }
  }, [isCtrlKPressed]);

  // Handle Escape
  useEffect(() => {
    if (isEscapePressed && isOpen) {
      setIsOpen(false);
      setSearchQuery('');
    }
  }, [isEscapePressed, isOpen]);

  // Available pages to search through
  const pages = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Users Directory', path: '/users' },
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Portfolio', path: '/portfolio' },
    { title: 'Todo App', path: '/todo' },
    { title: 'Contact', path: '/contact' },
  ];

  // Filter pages based on search query
  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavigate = (path) => {
    window.location.href = path;
    setIsOpen(false);
    setSearchQuery('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 animate-slideUp">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <input
              type="text"
              autoFocus
              placeholder="Search pages (Escape to close)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setFocusedIndex(0);
              }}
              className="w-full px-4 py-3 text-lg focus:outline-none bg-white rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Tip: Press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Ctrl + K</kbd> to open search anytime
            </p>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {filteredPages.length === 0 ? (
              <div className="p-6 text-center text-gray-600">
                <p>No pages found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div>
                {filteredPages.map((page, index) => (
                  <button
                    key={page.path}
                    onClick={() => handleNavigate(page.path)}
                    className={`
                      w-full text-left px-4 py-3 border-b border-gray-100
                      transition-colors
                      ${index === focusedIndex
                        ? 'bg-primary-100 text-primary-900'
                        : 'hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="font-semibold">{page.title}</div>
                    <div className="text-sm text-gray-500">{page.path}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-50 border-t border-gray-200 text-center text-xs text-gray-600">
            Press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">ESC</kbd> to close
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchModal;
