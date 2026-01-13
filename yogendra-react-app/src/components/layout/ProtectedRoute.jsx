import { Navigate } from 'react-router-dom';

// ============================================================================
// ProtectedRoute Component
// ============================================================================
//
// This component wrap route that need authentication.
// It check if user logged in before rendering page.
//
// How it work:
// 1. Receive isLoggedIn prop from App
// 2. Check: if isLoggedIn = true? 
//    - YES: render children (the protect page)
//    - NO: redirect to /login using Navigate component
//
// Why need this?
// - Prevent unauthorized access to sensitive page (dashboard, admin, profile)
// - Force user go to login first before can access protect page
// - Classic auth pattern in web application
//
// Usage in App.jsx:
// <Route 
//   path="/dashboard" 
//   element={
//     <ProtectedRoute isLoggedIn={isLoggedIn}>
//       <Dashboard />
//     </ProtectedRoute>
//   } 
// />
//
// Flow:
// User try access /dashboard
//   ↓
// ProtectedRoute component render
//   ↓
// Check isLoggedIn state from App
//   ↓
// If false → Navigate to "/login" (redirect happen)
// If true → Render Dashboard component
//
// ============================================================================

export function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // Not authenticated → redirect to login page
    // replace=true mean don't add to browser history
    // (so user can't click back after login)
    return <Navigate to="/login" replace />;
  }

  // Authenticated → render the protected page
  return children;
}

export default ProtectedRoute;
