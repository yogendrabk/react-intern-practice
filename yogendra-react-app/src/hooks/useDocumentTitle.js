import { useEffect } from 'react';

/**
 * useDocumentTitle Hook
 *
 * Updates the browser tab title when component mounts.
 * Returns to previous title when component unmounts (cleanup).
 *
 * Usage:
 * useDocumentTitle('Home') - sets tab title to "Home"
 *
 * Useful for:
 * - SEO: Each page has descriptive title
 * - UX: Users know which tab is which
 * - Accessibility: Screen readers announce page title
 *
 * Example:
 * export function HomePage() {
 *   useDocumentTitle('Home');
 *   return <div>Home content</div>;
 * }
 */

export function useDocumentTitle(title) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    // Cleanup: restore previous title when component unmounts
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}

export default useDocumentTitle;
