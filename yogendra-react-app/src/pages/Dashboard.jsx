import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';

// ============================================================================
// Dashboard Component — Protected Page
// ============================================================================
//
// This is protected page that only accessible if isLoggedIn = true.
// If try access without login, ProtectedRoute redirect to /login.
//
// Dashboard show:
// 1. Welcome message with user name
// 2. Stats overview (4 stat card):
//    - Days Completed (for internship)
//    - Component Built (total components)
//    - API Call made (total fetch/API integration)
//    - Page Created (total page)
// 3. Recent activity list
// 4. Logout button
//
// Purpose: Common pattern in web app after user login.
// Give user sense of progress + recent activity.
//
// ============================================================================

export function Dashboard({ setIsLoggedIn }) {
  // Set document title
  useEffect(() => {
    document.title = "Dashboard — Protected";
  }, []);
  
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login', { replace: true });
  };

  // Mock activity data
  const activities = [
    { id: 1, action: 'Completed Day 26', time: '30 minutes ago', status: '✅' },
    { id: 2, action: 'Viewed UserDetail page', time: '1 hour ago', status: '👁️' },
    { id: 3, action: 'Added task in Todo App', time: '3 hours ago', status: '➕' },
    { id: 4, action: 'Accessed Portfolio page', time: '5 hours ago', status: '🎯' },
    { id: 5, action: 'Built About page', time: 'Yesterday', status: '🔨' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, Yogendra! 👋
            </h1>
            <p className="text-lg text-gray-600">
              Your internship dashboard — Week 6 progress tracking
            </p>
          </div>

          {/* Logout Button */}
          <Button 
            variant="ghost"
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 hover:bg-red-50"
          >
            🚪 Logout
          </Button>
        </div>

        {/* Stats Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              label="Days Completed"
              value="26"
              description="of 30 days in Week 6"
              icon="📅"
              color="blue"
            />
            <StatCard 
              label="Components Built"
              value="15"
              description="Reusable UI components"
              icon="🧩"
              color="purple"
            />
            <StatCard 
              label="API Calls Made"
              value="8"
              description="API integration exercises"
              icon="🌐"
              color="green"
            />
            <StatCard 
              label="Pages Created"
              value="12"
              description="Full pages + features"
              icon="📄"
              color="yellow"
            />
          </div>
        </section>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card header={<h2 className="text-xl font-bold">Recent Activity</h2>}>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <ActivityItem 
                    key={activity.id}
                    activity={activity}
                    isLast={index === activities.length - 1}
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Links */}
          <div>
            <Card header={<h2 className="text-xl font-bold">Quick Navigation</h2>}>
              <div className="space-y-2">
                <NavLink to="/" label="Home" icon="🏠" />
                <NavLink to="/about" label="About" icon="ℹ️" />
                <NavLink to="/portfolio" label="Portfolio" icon="🎯" />
                <NavLink to="/users" label="Users" icon="👥" />
                <NavLink to="/todo" label="Todo App" icon="✅" />
              </div>
            </Card>

            {/* Dashboard Info */}
            <Card header={<h2 className="text-xl font-bold mt-6">Dashboard Info</h2>}>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-gray-800">Status:</p>
                  <p>🟢 Authenticated</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Week:</p>
                  <p>Week 6 — Router & Auth</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Progress:</p>
                  <div className="flex gap-1 mt-1">
                    <Badge color="green">Day 26</Badge>
                    <Badge color="blue">Day 27</Badge>
                    <Badge color="yellow">Day 28+</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Auth Pattern Explanation */}
        <Card className="mt-12" header={<h2 className="text-xl font-bold">How Authentication Work Here</h2>}>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>1. State in App Component:</strong> <code className="bg-gray-100 px-2 py-1 rounded">const [isLoggedIn, setIsLoggedIn] = useState(false)</code>
            </p>
            <p>
              <strong>2. LoginPage Set State:</strong> When you login, LoginPage call <code className="bg-gray-100 px-2 py-1 rounded">setIsLoggedIn(true)</code>, then redirect to /dashboard.
            </p>
            <p>
              <strong>3. ProtectedRoute Check:</strong> When access /dashboard, ProtectedRoute check <code className="bg-gray-100 px-2 py-1 rounded">isLoggedIn</code> value. If true, render Dashboard. If false, redirect to /login.
            </p>
            <p>
              <strong>4. Props Flow:</strong> Auth state pass down: App → ProtectedRoute → Dashboard. This is "prop drilling" - why Week 7 will learn Context API to avoid this!
            </p>
            <p className="p-3 bg-blue-50 border border-blue-300 rounded text-sm">
              💡 <strong>Real App Difference:</strong> Real app would store JWT token in localStorage, validate token on mount, call backend API to verify. This mock version just use local state (reset on page reload).
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============================================================================
// Helper Components
// ============================================================================

function StatCard({ label, value, description, icon, color }) {
  const colorMap = {
    blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-600',
    purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-600',
    green: 'from-green-50 to-green-100 border-green-200 text-green-600',
    yellow: 'from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} border rounded-lg p-6 shadow-sm hover:shadow-md transition`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}

function ActivityItem({ activity, isLast }) {
  return (
    <div>
      <div className="flex items-start gap-4">
        <span className="text-2xl mt-1">{activity.status}</span>
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{activity.action}</p>
          <p className="text-sm text-gray-500">{activity.time}</p>
        </div>
      </div>
      {!isLast && <div className="my-3 border-t border-gray-200"></div>}
    </div>
  );
}

function NavLink({ to, label, icon }) {
  return (
    <a
      href={to}
      className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition text-gray-700 hover:text-blue-600"
      onClick={(e) => {
        // Would use Link from react-router, but simplified here
      }}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );
}

export default Dashboard;
