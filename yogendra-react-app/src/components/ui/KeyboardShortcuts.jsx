import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// ============================================================================
// KeyboardShortcuts Component — Show all available keyboard shortcuts
// ============================================================================
// This is modal component showing users what keyboard shortcuts are available
// Modal is triggered by pressing the '?' key anywhere in application
// Features: Organized shortcuts, easy close, non-intrusive
// ============================================================================

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for '?' key press to open shortcuts modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if '?' is pressed (Shift + /)
      if (e.key === '?') {
        setIsOpen(true);
      }
      // Close on Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop — click to close */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              ⌨️ Keyboard Shortcuts
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              aria-label="Close"
            >
              <X size={24} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Shortcuts Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section 1: Navigation Shortcuts */}
            <ShortcutsSection
              title="Navigation"
              shortcuts={[
                { keys: ['/', 'Ctrl', 'K'], action: 'Open search modal' },
                { keys: ['?'], action: 'Show this help' },
                { keys: ['Esc'], action: 'Close modals' },
                { keys: ['G', 'H'], action: 'Go to home' },
                { keys: ['G', 'A'], action: 'Go to about' },
                { keys: ['G', 'D'], action: 'Go to dashboard (if logged in)' },
              ]}
            />

            {/* Section 2: Page-Specific Shortcuts */}
            <ShortcutsSection
              title="Page-Specific"
              shortcuts={[
                { keys: ['Enter'], action: 'Submit forms' },
                { keys: ['Arrow Keys'], action: 'Navigate lists' },
                { keys: ['Space'], action: 'Toggle checkboxes' },
                { keys: ['T'], action: 'Toggle dark/light theme' },
              ]}
            />

            {/* Section 3: Application Shortcuts */}
            <ShortcutsSection
              title="Application"
              shortcuts={[
                { keys: ['R'], action: 'Refresh page' },
                { keys: ['L'], action: 'Click login/logout' },
                { keys: ['S'], action: 'Go to settings (if logged in)' },
              ]}
            />

            {/* Section 4: Accessibility */}
            <ShortcutsSection
              title="Accessibility"
              shortcuts={[
                { keys: ['Tab'], action: 'Navigate focusable elements' },
                { keys: ['Shift', 'Tab'], action: 'Navigate backwards' },
                { keys: ['Enter / Space'], action: 'Activate buttons/links' },
              ]}
            />
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400">
            <p>💡 <strong>Tip:</strong> Press <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-semibold">?</kbd> anytime to show this help. Press <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-semibold">Esc</kbd> to close.</p>
          </div>
        </div>
      </div>
    </>
  );
}

// Helper component for grouping shortcuts by section
function ShortcutsSection({ title, shortcuts }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
        {title}
      </h3>
      <ul className="space-y-2">
        {shortcuts.map((shortcut, idx) => (
          <li key={idx} className="flex items-center justify-between text-sm">
            {/* Keys */}
            <div className="flex gap-1">
              {shortcut.keys.map((key, keyIdx) => (
                <React.Fragment key={keyIdx}>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs font-semibold text-gray-900 dark:text-gray-100">
                    {key}
                  </kbd>
                  {keyIdx < shortcut.keys.length - 1 && (
                    <span className="text-gray-400 text-xs mx-0.5">+</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            {/* Action description */}
            <span className="text-gray-600 dark:text-gray-400">{shortcut.action}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KeyboardShortcuts;
