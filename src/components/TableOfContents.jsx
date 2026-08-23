export default function TableOfContents({ headings }) {
  if (!headings || headings.length === 0) return null

  return (
    <nav className="sticky top-24 hidden max-h-[70vh] overflow-y-auto rounded-2xl border border-primary/10 bg-white p-6 lg:block">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary/50">
        On this page
      </h4>
      <ul className="space-y-2.5 text-sm">
        {headings.map((h) => (
          <li key={h.slug} className={h.depth === 3 ? 'pl-4' : ''}>
            <a
              href={`#${h.slug}`}
              className="block text-primary/70 hover:text-accent-dark"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
