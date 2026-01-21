import { useState, useEffect } from 'react';

/**
 * useKeyPress Hook
 *
 * Detects keyboard shortcuts and key presses.
 * Useful for global keyboard commands like Escape, Ctrl+K, etc.
 *
 * Parameters:
 * - targetKey: string, the key to listen for (e.g., 'Escape', 'Enter', 'k')
 * - options: object with optional modifiers
 *
 * Returns:
 * - boolean: true if the key combination is pressed
 *
 * Usage:
 * const isEscapePressed = useKeyPress('Escape');
 * const isCtrlK = useKeyPress('k', { ctrlKey: true });
 *
 * Why this hook?
 * - Centralize keyboard event handling
 * - Avoid multiple keydown listeners
 * - Auto cleanup on unmount
 * - Support modifier keys (Ctrl, Shift, Alt, Meta)
 *
 * Common shortcuts:
 * 1. Escape - close modals/dropdowns
 * 2. Ctrl+K - open search
 * 3. Ctrl+Enter - submit form
 * 4. Enter - confirm action
 */

export function useKeyPress(targetKey, options = {}) {
  const { ctrlKey = false, shiftKey = false, altKey = false, metaKey = false } = options;
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    // Handle key down
    function handleKeyDown(event) {
      const keyMatch = event.key === targetKey || event.code === targetKey;
      const modifiersMatch =
        event.ctrlKey === ctrlKey &&
        event.shiftKey === shiftKey &&
        event.altKey === altKey &&
        event.metaKey === metaKey;

      if (keyMatch && modifiersMatch) {
        setKeyPressed(true);
      }
    }

    // Handle key up
    function handleKeyUp(event) {
      const keyMatch = event.key === targetKey || event.code === targetKey;
      if (keyMatch) {
        setKeyPressed(false);
      }
    }

    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [targetKey, ctrlKey, shiftKey, altKey, metaKey]);

  return keyPressed;
}

export default useKeyPress;
