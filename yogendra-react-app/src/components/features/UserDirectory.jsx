import { useState, useEffect } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Avatar } from '../Avatar';

// ============================================================================
// UserDirectory Component — Real API Integration with useEffect
// ============================================================================
// 
// Data Flow:
// 1. Component mount
// 2. useEffect run immediately
// 3. loading = true (show skeleton)
// 4. fetch from JSONPlaceholder API
// 5. data arrive from API
// 6. loading = false, data set
// 7. re-render with user cards
//
// This demonstrate complete useEffect + state flow for API integration!
// ============================================================================

export function UserDirectory() {
  // State management
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // asc or desc

  // ============================================================================
  // EFFECT 1: Fetch users on mount
  // ============================================================================
  // Dependency: [] = run on mount only
  // Purpose: Load initial user data from API
  // ============================================================================

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Step 1: APIcall to JSONPlaceholder
        console.log('→ Fetching users from API...');
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        // Step 2: Parse JSON response
        const data = await response.json();
        console.log('→ Received users:', data.length);

        // Step 3: Set state — trigger re-render
        setUsers(data);
        setFilteredUsers(data); // Initially show all

        setLoading(false);
      } catch (err) {
        console.error('→ Fetch error:', err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty = run on mount only, never again

  // ============================================================================
  // EFFECT 2: Filter and sort users when search or sort change
  // ============================================================================
  // Dependency: [users, searchQuery, sortOrder]
  // Purpose: Update filtered list when search or sort change
  // ============================================================================

  useEffect(() => {
    // Derive filtered list from users state
    let result = users;

    // Filter by search query
    if (searchQuery) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by name
    result = result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredUsers(result);
  }, [users, searchQuery, sortOrder]); // Re-run when any change

  // ============================================================================
  // Handler: Retry fetch
  // ============================================================================

  const handleRetry = () => {
    // Reset and refetch
    setUsers([]);
    setError(null);

    // Refetch (same logic as effect, but manual)
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  };

  // ============================================================================
  // UI: Loading State (Skeleton)
  // ============================================================================

  if (loading && users.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">User Directory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Animate skeleton loader */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4 bg-gray-200 rounded-lg animate-pulse">
              <div className="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 mt-6">Loading users from API...</p>
      </div>
    );
  }

  // ============================================================================
  // UI: Error State
  // ============================================================================

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Card className="bg-red-50 border-2 border-red-300">
          <div className="text-center py-8">
            <p className="text-red-800 font-semibold mb-4">❌ Failed to load users</p>
            <p className="text-red-700 mb-6">{error}</p>
            <Button variant="primary" onClick={handleRetry}>
              🔄 Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // ============================================================================
  // UI: Success State (User Cards)
  // ============================================================================

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">User Directory</h2>
        <p className="text-gray-600">
          {filteredUsers.length} of {users.length} users
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search by name or email
            </label>
            <input
              type="text"
              placeholder="Filter..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sort Select */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sort by name
            </label>
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="asc">A → Z</option>
              <option value="desc">Z → A</option>
            </select>
          </div>

          {/* Info */}
          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-lg text-blue-600">{filteredUsers.length}</span>
              <span> user{filteredUsers.length !== 1 ? 's' : ''} found</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Cards Grid */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <Card className="bg-gray-50">
          <div className="text-center py-12">
            <p className="text-gray-600">No users match filter</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSortOrder('asc');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Clear filters
            </button>
          </div>
        </Card>
      )}

      {/* Footer info */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">💡 Technical note:</span> Data fetch from JSONPlaceholder API ({users.length} users total).
          useEffect manage fetch on mount. Search/sort derive from state (no extra API call needed).
          Try clear browser cache → network tab see API request only once (mount), not repeated on search!
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// User Card Component
// ============================================================================

function UserCard({ user }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      {/* Header with avatar */}
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
        <Avatar initials={user.name.charAt(0).toUpperCase()} size="md" />
        <div>
          <h3 className="font-bold text-gray-800">{user.name}</h3>
          <p className="text-xs text-gray-600">@{user.username}</p>
        </div>
      </div>

      {/* Body with details */}
      <div className="py-4 space-y-3">
        {/* Email */}
        <div>
          <p className="text-xs font-semibold text-gray-600 uppercase">Email</p>
          <a
            href={`mailto:${user.email}`}
            className="text-sm text-blue-600 hover:underline break-all"
          >
            {user.email}
          </a>
        </div>

        {/* Phone */}
        <div>
          <p className="text-xs font-semibold text-gray-600 uppercase">Phone</p>
          <p className="text-sm text-gray-700">{user.phone}</p>
        </div>

        {/* Company */}
        <div>
          <p className="text-xs font-semibold text-gray-600 uppercase">Company</p>
          <p className="text-sm text-gray-700">{user.company.name}</p>
        </div>

        {/* Location */}
        <div>
          <p className="text-xs font-semibold text-gray-600 uppercase">Location</p>
          <p className="text-sm text-gray-700">
            {user.address.city}, {user.address.zipcode}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-200 flex gap-2">
        <Badge color="blue" className="text-xs">User #{user.id}</Badge>
        <Badge color="green" className="text-xs">Active</Badge>
      </div>
    </Card>
  );
}

// ============================================================================
// Defense Points
// ============================================================================
//
// Q: useEffect ma fetch garda race condition bhanne problem ke ho? Kasari fix garchau?
//
// A: Race condition = two fetch call same time, slow one finish after fast one.
// Data become inconsistent (show old data after new data arrive).
//
// Fix Pattern (Ignore Flag):
//
// useEffect(() => {
//   let ignore = false;
//
//   fetchData().then(data => {
//     if (!ignore) { // Only update if this fetch not ignored
//       setData(data);
//     }
//   });
//
//   return () => {
//     ignore = true; // Mark old fetch as ignore
//   };
// }, []);
//
// When component unmount or dependency change, cleanup function set ignore = true.
// Old fetch response arrive late? No matter, we don't update state (ignore true).
// So always show latest data!
//
// ============================================================================

export default UserDirectory;
