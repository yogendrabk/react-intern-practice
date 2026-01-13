import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

// ============================================================================
// LoginPage Component
// ============================================================================
//
// This page handle user authentication:
// 1. Show login form (email + password)
// 2. Validate input (email format, password strength)
// 3. Check credentials (in real app, call API endpoint)
// 4. If valid → set isLoggedIn = true → redirect to /dashboard
// 5. If invalid → show error message
//
// Note: This is mock authentication!
// Real app would:
// - Send POST request to /api/login endpoint
// - Get JWT token back
// - Store token in localStorage
// - Send token with every request
//
// But for learning purpose, we use simple mock:
// - Any email work
// - Any password > 6 character work
//
// ============================================================================

export function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error

    // Validation 1: Email not empty + has @ symbol
    if (!email.trim()) {
      setError('❌ Email required');
      return;
    }

    if (!email.includes('@')) {
      setError('❌ Email invalid (must have @)');
      return;
    }

    // Validation 2: Password not empty + minimum 6 character
    if (!password.trim()) {
      setError('❌ Password required');
      return;
    }

    if (password.length < 6) {
      setError('❌ Password too short (minimum 6 character)');
      return;
    }

    // Validation passed → simulate API call
    setIsLoading(true);

    // Simulate 2 second network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock authentication:
    // In real app, would verify against server database
    // Here, any email + password > 6 char = success

    console.log('✅ Login success!');
    console.log('Email:', email);
    console.log('Password: [hidden]');

    // Update auth state in App component
    setIsLoggedIn(true);

    setIsLoading(false);

    // Redirect to dashboard
    navigate('/dashboard', { replace: true });
  };

  // Demo account helper
  const handleDemoLogin = () => {
    setEmail('yogendra@tech-yatra.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <Card 
        className="w-full max-w-md"
        header={
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Login</h1>
            <p className="text-gray-600 mt-2">Access your dashboard</p>
          </div>
        }
      >
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-800 font-semibold">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <Button 
            variant="primary" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        {/* Demo Account Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900 font-semibold mb-3">
            👉 Demo Account:
          </p>
          <p className="text-xs text-blue-800 mb-2">
            Email: <code className="bg-white px-2 py-1 rounded">yogendra@tech-yatra.com</code>
          </p>
          <p className="text-xs text-blue-800 mb-3">
            Password: <code className="bg-white px-2 py-1 rounded">password123</code>
          </p>
          <Button 
            variant="ghost"
            className="w-full text-sm"
            onClick={handleDemoLogin}
            disabled={isLoading}
          >
            Use Demo Account
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-700">
          <p className="font-semibold mb-2">🔒 How this work:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Email must contain @ symbol</li>
            <li>Password must be at least 6 character</li>
            <li>This is mock authentication (no backend)</li>
            <li>After login, can access /dashboard page</li>
            <li>State reset when page reload (no persistence)</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
