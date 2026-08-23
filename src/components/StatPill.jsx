export default function StatPill({ value, label }) {
  return (
    <div className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-center backdrop-blur-sm">
      <div className="font-serif text-xl font-semibold text-accent md:text-2xl">{value}</div>
      <div className="text-xs font-medium uppercase tracking-wide text-white/70">{label}</div>
    </div>
  )
}
