import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-sm text-primary/60">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-1.5">
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-accent-dark">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-primary' : ''}>{item.label}</span>
            )}
            {!isLast && <ChevronRight size={14} />}
          </span>
        )
      })}
    </nav>
  )
}
