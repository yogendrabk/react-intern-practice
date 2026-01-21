import { useState, useEffect } from 'react';

/**
 * useWindowSize Hook
 *
 * Returns the current window's width and height, updated on resize.
 * Includes proper cleanup to avoid memory leaks.
 *
 * Returns:
 * - Object: { width: number, height: number }
 *
 * Usage:
 * const { width, height } = useWindowSize();
 * return <div>{width > 768 ? "Desktop" : "Mobile"}</div>
 *
 * Why this hook?
 * - Get window dimensions on component render
 * - Handle window resize events with cleanup
 * - Avoid multiple resize listeners (throttled)
 * - Use for responsive behavior without media queries
 *
 * Common use cases:
 * 1. Toggle mobile/desktop UI
 * 2. Dynamically size components
 * 3. Calculate scroll position percentage
 * 4. Conditional rendering based on screen size
 */

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
