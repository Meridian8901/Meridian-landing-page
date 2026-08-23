import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const CATEGORIES = ['Procurement', 'Supply Chain', 'Trade & Logistics', 'Sourcing', 'Africa Business']

const emptyPost = {
  title: '',
  slug: '',
  category: CATEGORIES[0],
  excerpt: '',
  cover_image_url: '',
  tags: '',
  read_time_minutes: '',
  body: '',
  is_published: false,
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function PostEditor() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()

  const [post, setPost] = useState(emptyPost)
  const [slugTouched, setSlugTouched] = useState(false)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isNew || !isSupabaseConfigured) return

    async function load() {
      const { data } = await supabase.from('blog_posts').select('*').eq('id', id).single()
      if (data) {
        setPost({
          ...emptyPost,
          ...data,
          tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags || '',
        })
        setSlugTouched(true)
      }
      setLoading(false)
    }

    load()
  }, [id, isNew])

  function update(field) {
    return (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setPost((p) => {
        const next = { ...p, [field]: value }
        if (field === 'title' && !slugTouched) {
          next.slug = slugify(value)
        }
        return next
      })
    }
  }

  async function handleSave(publish) {
    if (!isSupabaseConfigured) {
      alert("Supabase isn't connected yet — add env vars to save posts.")
      return
    }

    setSaving(true)

    const payload = {
      title: post.title,
      slug: post.slug || slugify(post.title),
      category: post.category,
      excerpt: post.excerpt,
      cover_image_url: post.cover_image_url || null,
      tags: post.tags
        ? post.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
      read_time_minutes: post.read_time_minutes ? Number(post.read_time_minutes) : null,
      body: post.body,
      is_published: publish,
      published_at: publish ? post.published_at || new Date().toISOString() : post.published_at || null,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = isNew
      ? await supabase.from('blog_posts').insert(payload).select().single()
      : await supabase.from('blog_posts').update(payload).eq('id', id).select().single()

    setSaving(false)

    if (error) {
      alert(`Couldn't save: ${error.message}`)
      return
    }

    navigate(`/admin/posts/${data.id}`, { replace: true })
  }

  if (loading) {
    return <p className="text-primary/50">Loading…</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">{isNew ? 'New Post' : 'Edit Post'}</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-primary/10 bg-white p-6">
          <Field label="Title">
            <input type="text" value={post.title} onChange={update('title')} className="input" />
          </Field>

          <Field label="Slug">
            <input
              type="text"
              value={post.slug}
              onChange={(e) => {
                setSlugTouched(true)
                update('slug')(e)
              }}
              className="input"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select value={post.category} onChange={update('category')} className="input">
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Read time (minutes)">
              <input type="number" min="1" value={post.read_time_minutes} onChange={update('read_time_minutes')} className="input" />
            </Field>
          </div>

          <Field label="Excerpt">
            <textarea rows={2} value={post.excerpt} onChange={update('excerpt')} className="input resize-none" />
          </Field>

          <Field label="Cover image URL">
            <input type="text" value={post.cover_image_url} onChange={update('cover_image_url')} className="input" />
          </Field>

          <Field label="Tags (comma-separated)">
            <input type="text" value={post.tags} onChange={update('tags')} className="input" />
          </Field>

          <Field label="Body (Markdown)">
            <textarea rows={16} value={post.body} onChange={update('body')} className="input resize-y font-mono text-xs" />
          </Field>

          <div className="flex gap-3 pt-2">
            <button disabled={saving} onClick={() => handleSave(false)} className="btn-outline flex-1">
              Save Draft
            </button>
            <button disabled={saving} onClick={() => handleSave(true)} className="btn-primary flex-1">
              Publish
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/10 bg-white p-6">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary/50">Preview</h3>
          <h2 className="font-serif text-2xl font-bold text-primary">{post.title || 'Untitled post'}</h2>
          <div className="prose-preview mt-4 max-w-none text-sm leading-relaxed text-primary/80 [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-primary [&_h3]:mt-4 [&_h3]:font-semibold [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body || '*Nothing to preview yet.*'}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-primary/80">{label}</span>
      {children}
    </label>
  )
}
