import { STATUS_STYLES } from '../data/network'

export default function EntityCard({ entity }) {
  return (
    <div className="rounded-2xl border border-primary/10 bg-white p-8 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="font-serif text-lg font-semibold leading-snug">{entity.name}</h3>
        <span className={`badge whitespace-nowrap ${STATUS_STYLES[entity.status]}`}>
          {entity.status}
        </span>
      </div>
      <div className="mb-3 text-sm font-medium text-accent-dark">{entity.location}</div>
      <p className="text-sm leading-relaxed text-primary/70">{entity.description}</p>
    </div>
  )
}
