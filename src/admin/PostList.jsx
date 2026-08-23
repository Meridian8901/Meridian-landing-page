import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

function formatDate(dateString) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }
    setLoading(true)
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function togglePublish(post) {
    await supabase
      .from('blog_posts')
      .update({
        is_published: !post.is_published,
        published_at: post.published_at || new Date().toISOString(),
      })
      .eq('id', post.id)
    load()
  }

  async function deletePost(post) {
    if (!window.confirm(`Delete "${post.title}"? This can't be undone.`)) return
    await supabase.from('blog_posts').delete().eq('id', post.id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Posts</h1>
        <Link to="/admin/posts/new" className="btn-primary">
          <Plus size={16} /> New Post
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-primary/10 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-primary/10 text-xs uppercase tracking-wide text-primary/50">
            <tr>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Published</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isSupabaseConfigured && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-primary/50">
                  Supabase isn't connected yet.
                </td>
              </tr>
            )}
            {isSupabaseConfigured && loading && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-primary/50">
                  Loading…
                </td>
              </tr>
            )}
            {isSupabaseConfigured && !loading && posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-primary/50">
                  No posts yet.
                </td>
              </tr>
            )}
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-primary/5 last:border-0">
                <td className="px-5 py-3.5 font-medium text-primary">{post.title}</td>
                <td className="px-5 py-3.5 text-primary/70">{post.category}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`badge ${
                      post.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {post.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-primary/70">{formatDate(post.published_at)}</td>
                <td className="px-5 py-3.5">
                  <div className="flex justify-end gap-1.5">
                    <button
                      onClick={() => togglePublish(post)}
                      title={post.is_published ? 'Unpublish' : 'Publish'}
                      className="rounded-md p-2 text-primary/60 hover:bg-primary/5 hover:text-primary"
                    >
                      {post.is_published ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <Link
                      to={`/admin/posts/${post.id}`}
                      title="Edit"
                      className="rounded-md p-2 text-primary/60 hover:bg-primary/5 hover:text-primary"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => deletePost(post)}
                      title="Delete"
                      className="rounded-md p-2 text-primary/60 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
