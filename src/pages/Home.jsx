import { Link } from 'react-router-dom'
import {
  Layers,
  PackageSearch,
  AlertTriangle,
  ClipboardList,
  Search,
  ShieldCheck,
  Ship,
} from 'lucide-react'
import Seo from '../components/Seo'
import FadeIn from '../components/FadeIn'
import StatPill from '../components/StatPill'
import ProblemCard from '../components/ProblemCard'
import ServiceCard from '../components/ServiceCard'
import EntityCard from '../components/EntityCard'
import MarketCard from '../components/MarketCard'
import { NETWORK_ENTITIES } from '../data/network'
import { MARKETS } from '../data/markets'

const PROBLEMS = [
  {
    icon: Layers,
    title: 'Fragmented Buying',
    description: '50+ unmanaged vendors, no volume leverage — the same inputs purchased over and over at inconsistent prices.',
  },
  {
    icon: PackageSearch,
    title: 'Zero Shipment Visibility',
    description: 'Containers disappear after order. Once goods leave the supplier, tracking becomes a chain of phone calls and email threads.',
  },
  {
    icon: AlertTriangle,
    title: 'Reactive Procurement',
    description: '60–70% emergency orders placed at a 20–30% premium because shortages were never visible in advance.',
  },
]

const SERVICES = [
  {
    icon: ClipboardList,
    anchor: 'audit-optimization',
    title: 'Procurement Audit & Process Optimization',
    description: 'We map your spend, find leakage, redesign workflows and implement new SOPs.',
  },
  {
    icon: Search,
    anchor: 'supplier-sourcing',
    title: 'Supplier Identification & Strategic Sourcing',
    description: 'We find you the right suppliers using structured RFQ, scoring, and due diligence.',
  },
  {
    icon: ShieldCheck,
    anchor: 'ethical-sourcing',
    title: 'Ethical Sourcing Advisory',
    description: 'Supplier audits, code of conduct, and transparency reporting for global compliance.',
  },
  {
    icon: Ship,
    anchor: 'managed-sourcing',
    title: 'Managed Sourcing from India & China',
    description: 'Direct supply via our own entities, no middlemen, full price transparency.',
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Free Audit',
    duration: '2–3 weeks',
    description: 'A full spend diagnostic across every vendor and category — the top leakage opportunities identified and prioritized.',
  },
  {
    number: '02',
    title: 'Consulting & Platform Deployment',
    duration: '3–6 weeks',
    description: 'New SOPs, supplier rate contracts, and the Meridian platform live and running your procurement workflow.',
  },
  {
    number: '03',
    title: 'Ongoing Supply Partnership',
    duration: 'Ongoing',
    description: 'We source direct from India & China through our own network — with full visibility, every shipment.',
  },
]

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        title="Africa's Procurement, Rebuilt from the Ground Up"
        description="Meridian helps East African manufacturers eliminate procurement waste through hands-on consulting, AI-powered sourcing, and direct supply from India & China."
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="wrap relative z-10 py-24 md:py-32">
          <FadeIn>
            <h1 className="mx-auto max-w-3xl text-balance text-center font-serif text-4xl font-bold leading-tight md:text-6xl">
              Africa's Procurement, Rebuilt from the Ground Up
            </h1>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-center text-lg leading-relaxed text-white/75">
              Meridian helps East African manufacturers eliminate procurement waste through
              hands-on consulting, AI-powered sourcing, and direct supply from India &amp; China —
              with full transparency at every step.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/audit" className="btn-primary">
                Get a Free Audit
              </Link>
              <Link to="/demo" className="btn-outline-light">
                Book a Demo
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
              <StatPill value="25%" label="Average Cost Savings" />
              <StatPill value="4" label="East African Markets" />
              <StatPill value="3" label="Global Sourcing Hubs" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section bg-offwhite">
        <div className="wrap">
          <FadeIn>
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              African manufacturers overpay by 15–25%
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PROBLEMS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 100}>
                <ProblemCard {...p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section bg-white">
        <div className="wrap">
          <FadeIn>
            <h2 className="text-center text-3xl font-bold md:text-4xl">What Meridian Does</h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <FadeIn key={s.anchor} delay={i * 100}>
                <ServiceCard {...s} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-offwhite">
        <div className="wrap">
          <FadeIn>
            <h2 className="text-center text-3xl font-bold md:text-4xl">How It Works</h2>
          </FadeIn>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <FadeIn key={step.number} delay={i * 100}>
                <div className="relative rounded-2xl border border-primary/10 bg-white p-8">
                  <span className="font-serif text-4xl font-bold text-accent/40">{step.number}</span>
                  <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                  <span className="mt-1 inline-block text-xs font-semibold uppercase tracking-wide text-accent-dark">
                    {step.duration}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-primary/70">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network Preview */}
      <section className="section bg-white">
        <div className="wrap">
          <FadeIn>
            <div className="flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Our Global Network</h2>
              <p className="max-w-xl text-primary/70">
                Three entities, one supply chain — coordination in East Africa, sourcing in India,
                re-export through Dubai.
              </p>
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {NETWORK_ENTITIES.map((entity, i) => (
              <FadeIn key={entity.name} delay={i * 100}>
                <EntityCard entity={entity} />
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="mt-10 text-center">
              <Link to="/network" className="btn-outline">
                Explore Our Network
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Markets Strip */}
      <section className="section bg-offwhite">
        <div className="wrap">
          <FadeIn>
            <h2 className="text-center text-3xl font-bold md:text-4xl">Markets We Serve</h2>
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MARKETS.map((market, i) => (
              <FadeIn key={market.slug} delay={i * 80}>
                <MarketCard market={market} compact />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Guarantee Banner */}
      <section className="bg-primary py-16 text-white">
        <div className="wrap text-center">
          <FadeIn>
            <p className="mx-auto max-w-2xl text-balance font-serif text-2xl font-semibold leading-snug md:text-3xl">
              "We identify a minimum 15% cost reduction in your procurement — or we extend the
              engagement free until we do."
            </p>
            <Link to="/audit" className="btn-primary mt-8 inline-flex">
              Schedule Free Audit
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
