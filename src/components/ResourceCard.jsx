import { Link } from 'react-router-dom'
import { FileSpreadsheet, FileText, File, Lock } from 'lucide-react'
import { categoryBadgeClass } from '../lib/categoryColors'

const FILE_ICONS = {
  Excel: FileSpreadsheet,
  Word: FileText,
  PDF: File,
}

export default function ResourceCard({ resource }) {
  const FileIcon = FILE_ICONS[resource.fileType] || File

  return (
    <Link
      to={`/resources/${resource.slug}`}
      className="group flex flex-col rounded-2xl border border-primary/10 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className={`badge ${categoryBadgeClass(resource.category)}`}>{resource.category}</span>
        {resource.premium && (
          <span className="badge flex items-center gap-1 bg-accent/20 text-accent-dark">
            <Lock size={12} /> Premium
          </span>
        )}
      </div>

      <h3 className="mb-2 text-lg font-semibold leading-snug">{resource.title}</h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-primary/70">{resource.description}</p>

      <div className="flex items-center justify-between border-t border-primary/10 pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary/50">
          <FileIcon size={14} /> {resource.fileType}
        </span>
        <span className="text-sm font-semibold text-primary group-hover:text-accent-dark">
          Download →
        </span>
      </div>
    </Link>
  )
}
