import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ServiceCard({ icon: Icon, title, description, anchor }) {
  return (
    <Link
      to={`/services#${anchor}`}
      className="group flex flex-col rounded-2xl border border-primary/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent-dark">
        <Icon size={24} />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-primary/70">{description}</p>
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-accent-dark">
        Learn more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
