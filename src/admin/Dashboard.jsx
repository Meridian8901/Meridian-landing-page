import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, CheckCircle2, Users, Download, Plus } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function Dashboard() {
  const [stats, setStats] = useState({ totalPosts: 0, publishedPosts: 0, totalLeads: 0, resourceDownloads: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured) {
        setLoading(false)
        return
      }

      const [totalPosts, publishedPosts, totalLeads, resourceDownloads] = await Promise.all([
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('is_published', true),
        supabase.from('lead_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('resource_downloads').select('*', { count: 'exact', head: true }),
      ])

      setStats({
        totalPosts: totalPosts.count || 0,
        publishedPosts: publishedPosts.count || 0,
        totalLeads: totalLeads.count || 0,
        resourceDownloads: resourceDownloads.count || 0,
      })
      setLoading(false)
    }

    load()
  }, [])

  const cards = [
    { label: 'Total Posts', value: stats.totalPosts, icon: FileText },
    { label: 'Published Posts', value: stats.publishedPosts, icon: CheckCircle2 },
    { label: 'Total Leads', value: stats.totalLeads, icon: Users },
    { label: 'Resource Downloads', value: stats.resourceDownloads, icon: Download },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Dashboard</h1>

      {!isSupabaseConfigured && (
        <p className="mt-3 rounded-lg bg-amber-100 px-4 py-3 text-sm text-amber-800">
          Supabase isn't connected yet — add VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY to see live stats.
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="rounded-2xl border border-primary/10 bg-white p-6">
              <Icon size={20} className="text-accent-dark" />
              <div className="mt-4 text-2xl font-bold text-primary">
                {loading ? '—' : card.value}
              </div>
              <div className="text-sm text-primary/60">{card.label}</div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/admin/posts/new" className="btn-primary">
          <Plus size={16} /> New Post
        </Link>
        <Link to="/admin/leads" className="btn-outline">
          View Leads
        </Link>
      </div>
    </div>
  )
}
