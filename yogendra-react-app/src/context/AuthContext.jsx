import { createContext, useContext, useState, useEffect } from 'react';

/**
 * ============================================================================
 * AuthContext — Global authentication state management
 * ============================================================================
 *
 * Provides user authentication state throughout application.
 * Demonstrates Context API for managing complex application state.
 *
 * Why Context?
 * - Authentication needed on many components (Navbar, Protected routes, User menu)
 * - Prop drilling would require passing user through every component
 * - Context allows auth state accessible from anywhere
 * - Centralized login/logout logic
 *
 * Features:
 * - User login/logout
 * - Persist user session to localStorage
 * - Loading state during auth operations
 * - User profile data available globally
 *
 * How it works:
 * 1. AuthProvider wraps app at top level
 * 2. Components call useAuth() to get auth state
 * 3. login() and logout() functions modify state
 * 4. User data persisted to localStorage
 * 5. Loading state for async operations
 * ============================================================================
 */

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // State: user object (null if not logged in)
  const [user, setUser] = useState(() => {
    // Initialize from localStorage
    const stored = localStorage.getItem('authUser');
    return stored ? JSON.parse(stored) : null;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [user]);

  // Login function — simulate authentication
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Validate input
      if (!email || !password) {
        throw new Error('Email and password required');
      }

      // Simulate user data from "backend"
      // In real app, this would be API call with email/password
      const mockUser = {
        id: Math.random(),
        email: email,
        name: email.split('@')[0], // john from john@example.com
        role: 'user',
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        joinedAt: new Date().toISOString(),
      };

      setUser(mockUser);
      return mockUser;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Update user profile
  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const value = {
    user,
    isLoggedIn: !!user,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth Hook — Use anywhere in app
 * 
 * Example:
 *   const { user, isLoggedIn, login, logout } = useAuth();
 *   if (isLoggedIn) { ... }
 *   await login('user@example.com', 'password');
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export default AuthContext;
