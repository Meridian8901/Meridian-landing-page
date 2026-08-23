import { useEffect, useState } from 'react'
import Seo from '../components/Seo'
import FadeIn from '../components/FadeIn'
import BlogCard from '../components/BlogCard'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const CATEGORIES = ['All', 'Procurement', 'Supply Chain', 'Trade & Logistics', 'Sourcing', 'Africa Business']

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!isSupabaseConfigured) {
        setStatus('ready')
        setPosts([])
        return
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })

      if (cancelled) return
      if (error) {
        setStatus('error')
      } else {
        setPosts(data || [])
        setStatus('ready')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory)

  return (
    <>
      <Seo
        path="/blog"
        title="Blog"
        description="Procurement, supply chain, and trade insights from the East Africa corridor."
      />

      <section className="bg-primary py-20 text-white">
        <div className="wrap text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl font-bold md:text-5xl">Meridian Blog</h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/75">
              Procurement, supply chain, and trade insights from the East Africa corridor.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section bg-offwhite">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-primary/70 hover:bg-primary/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {status === 'loading' && (
            <p className="text-center text-primary/50">Loading posts…</p>
          )}

          {status === 'error' && (
            <p className="text-center text-primary/50">
              Couldn't load posts right now. Please check back shortly.
            </p>
          )}

          {status === 'ready' && filtered.length === 0 && (
            <p className="text-center text-primary/50">
              {isSupabaseConfigured
                ? 'No posts in this category yet.'
                : 'The blog isn\'t connected to a live backend yet — check back soon.'}
            </p>
          )}

          {status === 'ready' && filtered.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <FadeIn key={post.id} delay={(i % 3) * 80}>
                  <BlogCard post={post} />
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
