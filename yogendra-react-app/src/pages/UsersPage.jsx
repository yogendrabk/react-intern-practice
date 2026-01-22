import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { CardSkeleton } from '../components/ui/Skeleton';

// ============================================================================
// UsersPage — List all users from JSONPlaceholder API
// ============================================================================
//
// This page demonstrate:
// 1. Fetch data from API on mount
// 2. Display loading state (skeleton)
// 3. Show error state with retry
// 4. Search filter (name/email real-time)
// 5. Sort by name or company
// 6. Filter by company
// 7. Clickable user card (link to /users/:id for detail)
//
// API: https://jsonplaceholder.typicode.com/users
//
// ============================================================================

export function UsersPage() {
  // Set document title
  useEffect(() => {
    document.title = "Users Directory";
  }, []);

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name' or 'company'
  const [filterByCompany, setFilterByCompany] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter and sort when search/sort/filter change
  useEffect(() => {
    let result = users;

    // Search filter
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    // Company filter
    if (filterByCompany !== 'all') {
      result = result.filter((user) => user.company.name === filterByCompany);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'company') {
        return a.company.name.localeCompare(b.company.name);
      }
      return 0;
    });

    setFilteredUsers(result);
  }, [users, search, sortBy, filterByCompany]);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(`❌ Failed to load users: ${err.message}`);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Get unique companies for filter
  const companies = ['all', ...new Set(users.map((u) => u.company.name))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Users Directory</h1>
        <p className="text-lg text-gray-600 mb-8">
          Browse all users and their details
        </p>

        {/* Error State with Retry */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-800">
            <p className="font-semibold">{error}</p>
            <Button 
              variant="ghost" 
              className="text-red-600 hover:text-red-800 mt-2"
              onClick={fetchUsers}
            >
              🔄 Retry
            </Button>
          </div>
        )}

        {/* Loading State */}
        {loading && !error ? (
          <div>
            <div className="mb-6 space-y-3">
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Search & Filter */}
            <Card className="mb-6">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="company">Sort by Company</option>
                  </select>

                  <select
                    value={filterByCompany}
                    onChange={(e) => setFilterByCompany(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {companies.map((company) => (
                      <option key={company} value={company}>
                        {company === 'all' ? 'All Companies' : company}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Users Grid */}
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-lg text-gray-600">No users found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <Link key={user.id} to={`/users/${user.id}`}>
                    <Card className="h-full hover:shadow-lg transition cursor-pointer">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">@{user.username}</p>

                        <div className="my-3 p-3 bg-blue-50 rounded">
                          <p className="text-xs text-gray-600">Email:</p>
                          <p className="text-sm font-semibold text-blue-600 truncate">
                            {user.email}
                          </p>
                        </div>

                        <div className="space-y-1 text-sm">
                          <p>
                            <strong>Phone:</strong> {user.phone}
                          </p>
                          <p>
                            <strong>Company:</strong> {user.company.name}
                          </p>
                        </div>

                        <div className="mt-4">
                          <Badge color="blue">View Details →</Badge>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            <p className="text-center text-gray-600 mt-8">
              Showing {filteredUsers.length} of {users.length} user
              {filteredUsers.length !== 1 ? 's' : ''}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default UsersPage;
