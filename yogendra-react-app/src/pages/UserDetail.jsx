import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

// ============================================================================
// UserDetail Page — Show single user + their posts + todos
// ============================================================================
//
// This page demonstrate ADVANCED patterns:
//
// 1. useParams: Extract user ID from URL (/users/:id) → id variable
// 2. Promise.all: Fetch 3 thing in parallel (user, posts, todos)
//    - Faster than sequential (don't wait for each finish)
//    - All 3 request start at same time
// 3. Tab switching with useState
// 4. Loading state during fetch
//
// Why Promise.all better than sequential?
// Sequential: fetch user (2s) + fetch posts (1s) + fetch todos (1s) = 4s total
// Parallel:   all 3 fetch together = ~2s total (time of slowest request)
//
// API Call:
// - https://jsonplaceholder.typicode.com/users/:id
// - https://jsonplaceholder.typicode.com/users/:id/posts
// - https://jsonplaceholder.typicode.com/users/:id/todos
//
// ============================================================================

export function UserDetail() {
  // Get user ID from URL using useParams
  // If URL = /users/5, then id = "5"
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'todos'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    setLoading(true);
    setError('');

    try {
      // Promise.all: Start 3 request in parallel, wait for all 3 complete
      // This much faster than sequential!
      const [userRes, postsRes, todosRes] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`),
        fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`),
        fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`),
      ]);

      if (!userRes.ok || !postsRes.ok || !todosRes.ok) {
        throw new Error('Failed to load data');
      }

      // All fetch success, now parse JSON in parallel too
      const [userData, postsData, todosData] = await Promise.all([
        userRes.json(),
        postsRes.json(),
        todosRes.json(),
      ]);

      setUser(userData);
      setPosts(postsData);
      setTodos(todosData);
    } catch (err) {
      setError(`❌ Failed to load user data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="h-12 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-red-50">
            <p className="text-red-800 font-semibold">{error}</p>
            <Link to="/users">
              <Button className="mt-4">← Back to Users</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/users">
          <Button variant="ghost" className="mb-6">
            ← Back to Users
          </Button>
        </Link>

        {/* User Info */}
        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-lg text-gray-600">@{user.username}</p>

              <div className="mt-4 space-y-2">
                <p>
                  <strong>Email:</strong> <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">{user.email}</a>
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Website:</strong> {user.website}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-3">Company</h3>
              <p className="font-semibold text-gray-900">{user.company.name}</p>
              <p className="text-sm text-gray-600 mt-2">{user.company.catchPhrase}</p>

              <h3 className="font-bold text-gray-900 mt-4 mb-2">Location</h3>
              <p className="text-sm text-gray-700">
                📍 {user.address.street}, {user.address.city} {user.address.zipcode}
              </p>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'posts'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-blue-600'
            }`}
          >
            📝 Posts ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('todos')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'todos'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-blue-600'
            }`}
          >
            ✅ Todos ({todos.length})
          </button>
        </div>

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <p className="text-gray-600">No posts</p>
            ) : (
              posts.map((post) => (
                <Card key={post.id} header={<h3 className="font-bold text-gray-900">{post.title}</h3>}>
                  <p className="text-gray-700">{post.body}</p>
                  <Badge color="blue" className="mt-3 inline-block">Post #{post.id}</Badge>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Todos Tab */}
        {activeTab === 'todos' && (
          <div className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-gray-600">No todos</p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`p-4 border rounded-lg ${
                    todo.completed
                      ? 'bg-green-50 border-green-300'
                      : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      disabled
                      className="mt-1"
                    />
                    <div>
                      <p
                        className={`${
                          todo.completed
                            ? 'line-through text-gray-400'
                            : 'text-gray-900'
                        }`}
                      >
                        {todo.title}
                      </p>
                      <Badge color={todo.completed ? 'green' : 'yellow'} className="mt-2 text-xs inline-block">
                        {todo.completed ? '✅ Completed' : '⏳ Pending'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetail;
