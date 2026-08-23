import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import GithubSlugger from 'github-slugger'
import { Clock } from 'lucide-react'
import Seo from '../components/Seo'
import FadeIn from '../components/FadeIn'
import Breadcrumb from '../components/Breadcrumb'
import TableOfContents from '../components/TableOfContents'
import BlogCard from '../components/BlogCard'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function flattenText(children) {
  return Array.isArray(children)
    ? children.map(flattenText).join('')
    : typeof children === 'string'
      ? children
      : ''
}

function extractHeadings(markdown) {
  if (!markdown) return []
  const slugger = new GithubSlugger()
  const lines = markdown.split('\n')
  const headings = []
  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim())
    if (!match) continue
    const depth = match[1].length
    const text = match[2].replace(/[*_`]/g, '').trim()
    headings.push({ depth, text, slug: slugger.slug(text) })
  }
  return headings
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [related, setRelated] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | notfound | error
  const renderSlugger = useRef(new GithubSlugger())

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setPost(null)

    async function load() {
      if (!isSupabaseConfigured) {
        setStatus('notfound')
        return
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle()

      if (cancelled) return

      if (error || !data) {
        setStatus('notfound')
        return
      }

      setPost(data)
      setStatus('ready')

      const { data: relatedData } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', data.category)
        .eq('is_published', true)
        .neq('slug', data.slug)
        .order('published_at', { ascending: false })
        .limit(3)

      if (!cancelled) setRelated(relatedData || [])
    }

    load()
    return () => {
      cancelled = true
    }
  }, [slug])

  const headings = useMemo(() => extractHeadings(post?.body), [post?.body])

  renderSlugger.current.reset()

  if (status === 'loading') {
    return (
      <div className="wrap py-24 text-center text-primary/50">Loading post…</div>
    )
  }

  if (status === 'notfound' || status === 'error') {
    return (
      <div className="wrap py-24 text-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="mt-3 text-primary/60">This post may have been moved or unpublished.</p>
        <Link to="/blog" className="btn-outline mt-6 inline-flex">
          Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <>
      <Seo
        path={`/blog/${post.slug}`}
        title={post.title}
        description={post.excerpt}
        type="article"
        image={post.cover_image_url}
      />

      {post.cover_image_url ? (
        <div className="h-64 w-full bg-primary md:h-96">
          <img src={post.cover_image_url} alt="" className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-primary to-primary-light md:h-56">
          <span className="font-serif text-3xl font-semibold text-white/25">Meridian</span>
        </div>
      )}

      <div className="wrap py-12">
        <FadeIn>
          <Breadcrumb
            items={[
              { label: 'Blog', to: '/blog' },
              { label: post.category, to: `/blog` },
              { label: post.title },
            ]}
          />

          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-bold leading-tight md:text-5xl">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-primary/60">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {(post.author_name || 'M').charAt(0)}
              </div>
              <span className="font-medium text-primary/80">{post.author_name}</span>
            </div>
            <span>{formatDate(post.published_at)}</span>
            {post.read_time_minutes && (
              <span className="flex items-center gap-1">
                <Clock size={14} /> {post.read_time_minutes} min read
              </span>
            )}
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_260px]">
          <FadeIn as="article" className="prose-meridian max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => {
                  const text = flattenText(children)
                  const id = renderSlugger.current.slug(text)
                  return (
                    <h2 id={id} className="mt-10 scroll-mt-24 text-2xl font-bold">
                      {children}
                    </h2>
                  )
                },
                h3: ({ children }) => {
                  const text = flattenText(children)
                  const id = renderSlugger.current.slug(text)
                  return (
                    <h3 id={id} className="mt-8 scroll-mt-24 text-xl font-semibold">
                      {children}
                    </h3>
                  )
                },
                p: ({ children }) => <p className="mt-4 leading-relaxed text-primary/80">{children}</p>,
                ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-primary/80">{children}</ul>,
                ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-primary/80">{children}</ol>,
                blockquote: ({ children }) => (
                  <blockquote className="mt-6 border-l-4 border-accent bg-accent/5 py-3 pl-5 italic text-primary/80">
                    {children}
                  </blockquote>
                ),
                a: ({ children, href }) => (
                  <a href={href} className="font-medium text-accent-dark underline underline-offset-2">
                    {children}
                  </a>
                ),
                strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
              }}
            >
              {post.body}
            </ReactMarkdown>

            <div className="mt-14 rounded-2xl bg-primary p-8 text-center text-white md:p-10">
              <h3 className="font-serif text-xl font-semibold">Need procurement support?</h3>
              <p className="mt-2 text-white/75">Get a free audit and see what we'd find in your business.</p>
              <Link to="/audit" className="btn-primary mt-6 inline-flex">
                Get a Free Audit
              </Link>
            </div>
          </FadeIn>

          <TableOfContents headings={headings} />
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-6 text-2xl font-bold">Related Posts</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
