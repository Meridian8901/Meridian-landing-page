import { Link } from 'react-router-dom'
import { Search, Wrench, Repeat } from 'lucide-react'
import Seo from '../components/Seo'
import FadeIn from '../components/FadeIn'

const STEPS = [
  {
    icon: Search,
    number: '01',
    title: 'Free Audit',
    duration: '2–3 weeks',
    description:
      'We start with a full spend diagnostic — mapping every vendor, every contract, every recurring purchase across your procurement function.',
    details: [
      'Vendor and spend category mapping',
      'Line-by-line purchase order review',
      'Top cost-leakage opportunities identified and prioritized',
      'A findings report you can act on immediately, whether or not you engage further',
    ],
  },
  {
    icon: Wrench,
    number: '02',
    title: 'Consulting & Platform Deployment',
    duration: '3–6 weeks',
    description:
      'We design new Standard Operating Procedures around what the audit found, put supplier rate contracts in place, and get the Meridian platform live.',
    details: [
      'New SOPs built around your actual workflow, not a generic template',
      'Supplier consolidation and rate-contract negotiation',
      'Meridian platform deployed for live shipment visibility',
      'Your team trained on the new process end-to-end',
    ],
  },
  {
    icon: Repeat,
    number: '03',
    title: 'Ongoing Supply Partnership',
    duration: 'Ongoing',
    description:
      'From here, we source direct from India & China through our own network — with full transparency and visibility on every shipment.',
    details: [
      'Direct factory pricing through our India and Dubai entities',
      'Live tracking from origin port to your warehouse',
      'Landed cost reporting on every order',
      'Continuous benchmarking to keep savings compounding',
    ],
  },
]

export default function HowItWorks() {
  return (
    <>
      <Seo
        path="/how-it-works"
        title="How It Works"
        description="Free audit, consulting and platform deployment, then an ongoing supply partnership sourcing direct from India and China. Here's the Meridian process."
      />

      <section className="bg-primary py-20 text-white">
        <div className="wrap text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl font-bold md:text-5xl">How It Works</h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/75">
              A three-stage process, from your first free audit to an ongoing supply partnership —
              built to compound savings, not just find them once.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section bg-offwhite">
        <div className="wrap space-y-10">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <FadeIn key={step.number} delay={i * 100}>
                <div className="grid gap-8 rounded-2xl border border-primary/10 bg-white p-8 md:grid-cols-[auto_1fr] md:p-10">
                  <div className="flex items-start gap-5 md:flex-col md:items-start">
                    <span className="font-serif text-5xl font-bold text-accent/40">{step.number}</span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
                      <Icon size={24} />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-bold">{step.title}</h2>
                      <span className="badge bg-accent/20 text-accent-dark">{step.duration}</span>
                    </div>
                    <p className="mt-3 leading-relaxed text-primary/70">{step.description}</p>
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {step.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-primary/80">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </section>

      <section className="bg-primary py-16 text-white">
        <div className="wrap text-center">
          <FadeIn>
            <h2 className="font-serif text-2xl font-semibold md:text-3xl">
              Ready to see what stage one finds in your business?
            </h2>
            <Link to="/audit" className="btn-primary mt-8 inline-flex">
              Get a Free Audit
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
