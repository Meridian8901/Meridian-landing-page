import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { categoryBadgeClass } from '../lib/categoryColors'

const COVER_GRADIENTS = {
  Procurement: 'from-primary to-primary-light',
  'Supply Chain': 'from-teal-800 to-teal-600',
  'Trade & Logistics': 'from-amber-800 to-amber-600',
  Sourcing: 'from-primary-dark to-accent-dark',
  'Africa Business': 'from-emerald-800 to-emerald-600',
}

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogCard({ post }) {
  const gradient = COVER_GRADIENTS[post.category] || 'from-primary to-primary-light'

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className={`aspect-[16/9] w-full bg-gradient-to-br ${gradient} ${post.cover_image_url ? '' : 'flex items-center justify-center'}`}>
        {post.cover_image_url ? (
          <img src={post.cover_image_url} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="font-serif text-2xl font-semibold text-white/30">Meridian</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className={`badge mb-3 w-fit ${categoryBadgeClass(post.category)}`}>{post.category}</span>
        <h3 className="mb-2 text-lg font-semibold leading-snug group-hover:text-accent-dark">
          {post.title}
        </h3>
        <p className="mb-5 flex-1 text-sm leading-relaxed text-primary/70">{post.excerpt}</p>

        <div className="flex items-center justify-between border-t border-primary/10 pt-4 text-xs text-primary/60">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
              {(post.author_name || 'M').charAt(0)}
            </div>
            <span>{post.author_name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{formatDate(post.published_at)}</span>
            {post.read_time_minutes && (
              <span className="flex items-center gap-1">
                <Clock size={12} /> {post.read_time_minutes} min
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
