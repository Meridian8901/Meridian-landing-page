export default function ProblemCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl border border-primary/10 bg-white p-8 shadow-sm">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
        <Icon size={24} />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-primary/70">{description}</p>
    </div>
  )
}
