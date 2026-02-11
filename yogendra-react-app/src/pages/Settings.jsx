import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { capitalize } from '../utils';

/**
 * ============================================================================
 * Settings Page — Demonstrate all contexts working together
 * ============================================================================
 *
 * This page proves that the entire context system works end-to-end:
 * - ThemeContext: Choose light/dark/system theme
 * - AuthContext: Show logged in user info, logout functionality
 * - localStorage: Store display preferences (items per page, notifications)
 *
 * By using all three in one page, we demonstrate:
 * 1. Multiple contexts on single component
 * 2. Context state persistence across page refresh
 * 3. Real-time updates when settings change
 * 4. Integration with localStorage
 *
 * This is proof that contexts work:
 * - Log out here, navbar disappears Dashboard link
 * - Change theme here, entire app background changes
 * - Toggle notifications, reflected everywhere
 *
 * Defense Q&A:
 * Q: "Ek page bata multiple contexts kasari use garchau? Provider nesting kasari manage garchau?"
 * A:
 *   Multiple contexts on single component:
 *   - Each context has its own Provider (ThemeProvider, AuthProvider)
 *   - Providers nest at app root in this order:
 *     <BrowserRouter>
 *       <AuthProvider>
 *         <ThemeProvider>
 *           <App />
 *         </ThemeProvider>
 *       </AuthProvider>
 *     </BrowserRouter>
 *
 *   - Use multiple hooks: const { theme } = useTheme(); const { user } = useAuth();
 *   - No prop drilling needed between contexts
 *   - Each context manages its own state independently
 *   - One context update doesn't affect others
 *   - All hooks in same component = all contexts accessible
 *
 *   Real example from Settings page:
 *   - Change theme → ThemeContext updates → CSS class applied to document
 *   - Toggle notifications → localStorage updated → logged in users see change
 *   - Change items per page → stored in localStorage → DataTable reads it
 *   - Logout → AuthContext updated → app redirects to login
 * ============================================================================
 */

export default function Settings() {
  const { theme, setTheme, isDark } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();

  // localStorage preferences (not in context, managed locally + localStorage)
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    return parseInt(localStorage.getItem('itemsPerPage')) || 10;
  });

  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem('notifications');
    return stored ? JSON.parse(stored) : {
      email: true,
      push: true,
      inApp: true,
    };
  });

  // Sync preferences to localStorage
  useEffect(() => {
    localStorage.setItem('itemsPerPage', itemsPerPage);
  }, [itemsPerPage]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toggle notification
  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    // In real app, would redirect to home
    window.location.href = '/';
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Settings</h1>
        <p className="text-gray-600 mb-8">Please log in to access settings</p>
        <a href="/login" className="btn btn-primary">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left sidebar - Settings sections */}
        <div className="md:col-span-1">
          <div className="space-y-2">
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded font-semibold">
              Account
            </div>
            <div className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
              Display
            </div>
            <div className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
              Notifications
            </div>
          </div>
        </div>

        {/* Right content area */}
        <div className="md:col-span-2 space-y-8">
          {/* ===== ACCOUNT SECTION ===== */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Account</h2>

            {/* User Info Card */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {capitalize(user.name)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Role: {capitalize(user.role)}
                  </p>
                </div>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-400">User ID</p>
                <p className="font-mono text-sm truncate">{user.id.toString().substring(0, 12)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-400">Joined</p>
                <p className="text-sm">{new Date(user.joinedAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-semibold transition"
            >
              Logout
            </button>

            {/* Info message */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
              What this demonstrates: AuthContext provides user data that's accessible here!
            </p>
          </section>

          {/* ===== DISPLAY SECTION ===== */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Display</h2>

            {/* Theme selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Theme
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['light', 'dark', 'system'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-4 py-3 rounded font-semibold transition ${
                      theme === t
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {capitalize(t)}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Current: <span className="font-semibold">{capitalize(theme)}</span> {isDark && '— Dark mode active'}
              </p>
            </div>

            {/* Items per page */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Items per page (in lists)
              </label>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Affects: PostsPage, UsersPage, DataTable components
              </p>
            </div>

            {/* Info message */}
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              What this demonstrates: Theme changes reflect immediately using ThemeContext!
            </p>
          </section>

          {/* ===== NOTIFICATIONS SECTION ===== */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Notifications</h2>

            {/* Notification toggles */}
            <div className="space-y-4">
              {Object.entries(notifications).map(([type, enabled]) => (
                <div key={type} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{capitalize(type)} Notifications</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {type === 'email' && 'Receive notifications via email'}
                      {type === 'push' && 'Receive browser push notifications'}
                      {type === 'inApp' && 'Show notifications within app'}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleNotification(type)}
                    className={`px-6 py-2 rounded font-semibold transition ${
                      enabled
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400'
                    }`}
                  >
                    {enabled ? 'On' : 'Off'}
                  </button>
                </div>
              ))}
            </div>

            {/* Info message */}
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
              What this demonstrates: localStorage preferences persist across page reloads!
            </p>
          </section>

          {/* ===== SUMMARY SECTION ===== */}
          <section className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
              ✅ This page proves all contexts work end-to-end:
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
              <li>✓ <strong>AuthContext:</strong> You see your user info, can logout</li>
              <li>✓ <strong>ThemeContext:</strong> Change theme, entire app updates instantly</li>
              <li>✓ <strong>localStorage:</strong> Refresh page, all preferences persist</li>
              <li>✓ <strong>Multiple contexts:</strong> Three different state systems in one component</li>
              <li>✓ <strong>No prop drilling:</strong> Each hook directly accesses its context</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
