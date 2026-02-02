import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Skeleton } from '../components/ui/Skeleton';

/**
 * PostsPage Component with Infinite Scroll & Bookmarks
 *
 * Features:
 * 1. Infinite scroll — Load 6 more posts when user reaches bottom
 * 2. Category tabs — Filter by userId (author)
 * 3. Read time — Calculate from body length (200 words/min)
 * 4. Bookmarks — Save post IDs to localStorage
 * 5. Bookmarks count in Navbar badge
 *
 * How infinite scroll works with IntersectionObserver:
 * "Place a sentinel element at list bottom. When it enters viewport
 *  (isIntersecting = true), fetch next batch of posts.
 *  This is more efficient than scroll events — fires only when needed!"
 */

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('localStorage read error:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('localStorage write error:', error);
    }
  };

  return [storedValue, setValue];
};

export function PostsPage() {
  useEffect(() => {
    document.title = "Posts — Infinite Scroll";
  }, []);

  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState('all');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', []);
  
  // Intersection observer for infinite scroll sentinel
  const [sentinelRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const POSTS_PER_PAGE = 6;

  // Fetch all posts once on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts');
        const postsData = await postsRes.json();
        
        const usersRes = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData = await usersRes.json();
        
        setPosts(
          postsData.map(post => ({
            ...post,
            readTime: Math.ceil(post.body.split(' ').length / 200),
          }))
        );
        setUsers(usersData);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter posts by selected user
  useEffect(() => {
    let filtered = posts;
    if (selectedUser !== 'all') {
      filtered = posts.filter(p => p.userId === parseInt(selectedUser));
    }
    
    // Apply pagination for infinite scroll
    setDisplayedPosts(filtered.slice(0, currentPage * POSTS_PER_PAGE));
  }, [posts, selectedUser, currentPage]);

  // Load more on scroll
  useEffect(() => {
    if (isVisible && displayedPosts.length < posts.length) {
      setCurrentPage(prev => prev + 1);
    }
  }, [isVisible]);

  const toggleBookmark = (postId) => {
    setBookmarks(prev =>
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Posts</h1>
        <p className="text-lg text-gray-600 mb-8">
          Browse posts with infinite scroll. Bookmarks saved locally.
        </p>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2">
            <button
              onClick={() => { setSelectedUser('all'); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedUser === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Users ({posts.length})
            </button>
            {users.slice(0, 5).map(user => (
              <button
                key={user.id}
                onClick={() => { setSelectedUser(user.id.toString()); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedUser === user.id.toString()
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {user.name} ({posts.filter(p => p.userId === user.id).length})
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {displayedPosts.map((post, idx) => (
            <Card
              key={post.id}
              header={
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-900 flex-1 line-clamp-2">{post.title}</h2>
                </div>
              }
              footer={
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Badge color="blue">{post.readTime} min read</Badge>
                    <Badge color="green">User #{post.userId}</Badge>
                  </div>
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      bookmarks.includes(post.id)
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {bookmarks.includes(post.id) ? '⭐ Bookmarked' : '☆ Bookmark'}
                  </button>
                </div>
              }
            >
              <p className="text-gray-700 line-clamp-3">{post.body}</p>
            </Card>
          ))}

          {loading && (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Infinite Scroll Sentinel */}
        {displayedPosts.length < posts.length && (
          <div ref={sentinelRef} className="mt-12 text-center py-8">
            <p className="text-gray-600">Loading more posts...</p>
          </div>
        )}

        {displayedPosts.length >= posts.length && displayedPosts.length > 0 && (
          <div className="mt-12 text-center py-8">
            <p className="text-gray-600">You've reached the end! ({displayedPosts.length} posts loaded)</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostsPage;
