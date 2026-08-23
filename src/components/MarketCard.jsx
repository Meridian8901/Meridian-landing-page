export default function MarketCard({ market, compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-primary/10 bg-white px-5 py-4">
        <span className="text-2xl">{market.flag}</span>
        <div>
          <div className="text-sm font-semibold">{market.name}</div>
          <div className="text-xs text-primary/60">{market.focus}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-primary/10 bg-white p-8 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-3xl">{market.flag}</span>
        <h3 className="font-serif text-xl font-semibold">{market.name}</h3>
      </div>
      <p className="mb-3 text-sm font-medium text-accent-dark">{market.focus}</p>
      <p className="text-sm leading-relaxed text-primary/70">{market.description}</p>
    </div>
  )
}
