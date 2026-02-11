import { createContext, useContext, useState, useEffect } from 'react';

/**
 * ============================================================================
 * ThemeContext — Global theme state management (light/dark/system)
 * ============================================================================
 *
 * Provides theme state throughout entire application using React Context API.
 * Demonstrates how to use Context for application-wide state without prop drilling.
 *
 * Why Context?
 * - Theme setting needed on many components (Navbar, Sidebar, Cards, etc.)
 * - Prop drilling would be tedious (pass theme through every component)
 * - Context: Set theme once at top level, access anywhere with useTheme()
 * - Centralized theme state changes
 * - No need for external state library (Redux)
 *
 * How it works:
 * 1. ThemeProvider wraps app at top level (in App.jsx)
 * 2. Components call useTheme() to get {theme, setTheme}
 * 3. setTheme triggers re-render of all consumers
 * 4. Theme persisted to localStorage
 * 5. System preference respected if theme='system'
 * ============================================================================
 */

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // State: theme can be 'light', 'dark', or 'system'
  const [theme, setThemeState] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem('theme') || 'system';
  });

  // Sync theme changes to localStorage and DOM
  useEffect(() => {
    localStorage.setItem('theme', theme);

    // Update document root class for Tailwind dark mode
    const root = document.documentElement;

    if (theme === 'system') {
      // Use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      // Use selected theme
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  // Wrapper function to update theme
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  const value = {
    theme,
    setTheme,
    isDark: theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme Hook — Use anywhere in app
 * 
 * Example:
 *   const { theme, setTheme, isDark } = useTheme();
 *   setTheme('dark');
 *   if (isDark) { ... }
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export default ThemeContext;
