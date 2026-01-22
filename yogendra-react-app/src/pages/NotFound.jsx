import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

// ============================================================================
// 404 Not Found Page
// ============================================================================
//
// This page show when user navigate to route that don't exist.
// Catch-all route: * match any path not found.
//
// Purpose:
// - User feedback (don't see blank page)
// - Navigation back (link to home or other page)
// - Error logging opportunity (could track 404 error)
//
// ============================================================================

export function NotFound() {
  // Set document title
  useEffect(() => {
    document.title = "404 — Page Not Found";
  }, []);
  
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
      <div className="max-w-md mx-auto text-center">
        {/* Big 404 */}
        <div className="text-9xl font-bold text-red-600 mb-4">404</div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">
          The page you looking for don't exist. Maybe typo in URL or page remove.
        </p>

        {/* Debug Info */}
        <p className="text-sm text-gray-500 mb-8 p-4 bg-gray-100 rounded">
          Current URL: <code className="text-red-600">{window.location.pathname}</code>
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button 
            variant="primary" 
            onClick={() => navigate('/')}
          >
            Go Home
          </Button>
          <Button 
            variant="ghost"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">Popular links:</p>
          <div className="space-y-2">
            <LinkItem href="/" label="Home" />
            <LinkItem href="/about" label="About" />
            <LinkItem href="/portfolio" label="Portfolio" />
            <LinkItem href="/todo" label="Todo App" />
            <LinkItem href="/users" label="Users" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkItem({ href, label }) {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate(href)}
      className="w-full text-left px-3 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition"
    >
      → {label}
    </button>
  );
}

export default NotFound;
