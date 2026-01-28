import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';

/**
 * PostDetail Component
 *
 * Features:
 * 1. Display single post with full content
 * 2. Related posts sidebar (same userId)
 * 3. Share button — Copy to clipboard with toast
 * 4. Print-friendly layout using CSS @media print
 *
 * Print Layout:
 * "CSS @media print shows only essential content when printing.
 *  Hide navigation, sidebar, buttons. Show full content.
 *  Users can save as PDF or print."
 */

export function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    document.title = `Post #${id}`;
  }, [id]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await res.json();
        
        // Get related posts (same userId)
        const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts');
        const allPosts = await postsRes.json();
        const related = allPosts
          .filter(p => p.userId === data.userId && p.id !== parseInt(id))
          .slice(0, 5);
        
        setPost(data);
        setRelatedPosts(related);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!post) return <div className="text-center py-12">Post not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 print:bg-white print:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 print:col-span-3">
            <Card header={<h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>}>
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                {post.body}
              </div>

              {/* Share & Print Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4 print:hidden">
                <Button
                  variant={shared ? 'ghost' : 'primary'}
                  onClick={handleShare}
                  className={shared ? 'bg-green-100 text-green-800' : ''}
                >
                  {shared ? '✅ Copied to clipboard!' : '📋 Copy Link'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => window.print()}
                >
                  🖨️ Print
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar - Hidden when printing */}
          <div className="print:hidden space-y-6">
            {/* Post Meta */}
            <Card header="Post Info">
              <div className="space-y-2 text-sm">
                <p><strong>Post ID:</strong> {post.id}</p>
                <p><strong>Author:</strong> User #{post.userId}</p>
                <Badge color="blue">Post #{post.id}</Badge>
              </div>
            </Card>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <Card header={`Related Posts (${relatedPosts.length})`}>
                <div className="space-y-3">
                  {relatedPosts.map(relPost => (
                    <a
                      key={relPost.id}
                      href={`/posts/${relPost.id}`}
                      className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {relPost.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Post #{relPost.id}</p>
                    </a>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
