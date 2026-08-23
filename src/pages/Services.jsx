import { Link } from 'react-router-dom'
import { ClipboardList, Search, ShieldCheck, Ship, CheckCircle2 } from 'lucide-react'
import Seo from '../components/Seo'
import FadeIn from '../components/FadeIn'

const SERVICES = [
  {
    id: 'audit-optimization',
    icon: ClipboardList,
    title: 'Procurement Audit & Process Optimization',
    paragraphs: [
      'We conduct a full diagnostic of your procurement function — mapping vendors, analyzing spend categories, identifying process gaps, and delivering a prioritized report of cost leakage opportunities.',
      'Then we design and implement new Standard Operating Procedures to improve efficiency, accountability, and compliance across every stage of your buying process.',
    ],
    deliverables: [
      'Spend analysis report',
      'Vendor map',
      'SOP documentation',
      'Implementation roadmap',
      'KPI framework',
    ],
  },
  {
    id: 'supplier-sourcing',
    icon: Search,
    title: 'Supplier Identification & Strategic Sourcing',
    paragraphs: [
      'We run a structured sourcing process — market research, RFQ development, supplier evaluation and scoring, negotiation support, and contract templates.',
      'Whether you need local, regional, or international suppliers, we match you to vetted partners with the right capacity and terms for your business.',
    ],
    deliverables: [
      'Long-list & short-list reports',
      'RFQ package',
      'Supplier scorecards',
      'Negotiation brief',
      'Rate contract template',
    ],
  },
  {
    id: 'ethical-sourcing',
    icon: ShieldCheck,
    title: 'Ethical Sourcing Advisory',
    paragraphs: [
      'For manufacturers supplying European, US, or sustainability-conscious buyers, we help you build and demonstrate ethical sourcing practices — from supplier code of conduct to on-site audit coordination.',
      'This protects your business from compliance risk and opens doors to premium market segments that demand verified, transparent supply chains.',
    ],
    deliverables: [
      'Supplier Code of Conduct',
      'Ethical sourcing policy',
      'Audit checklist',
      'Transparency report template',
      'Training materials',
    ],
  },
  {
    id: 'managed-sourcing',
    icon: Ship,
    title: 'Managed Sourcing — India & China',
    paragraphs: [
      'Through our own entities in India (Haryana/NCR) and our Dubai re-export hub, we source MRO, raw materials, spare parts and finished goods directly from manufacturers.',
      'Full price transparency, no hidden margins, and door-to-door logistics coordination — from factory floor to your warehouse.',
    ],
    deliverables: [
      'Direct factory pricing',
      'LC/TT payment guidance',
      'Incoterms advisory',
      'Shipment tracking',
      'Landed cost reporting',
    ],
  },
]

export default function Services() {
  return (
    <>
      <Seo
        path="/services"
        title="Services"
        description="Procurement audit, strategic sourcing, ethical sourcing advisory, and managed sourcing from India & China — Meridian's four core services."
      />

      <section className="bg-primary py-20 text-white">
        <div className="wrap text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl font-bold md:text-5xl">What Meridian Does</h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/75">
              Four services, one goal — eliminate procurement waste and give you full control and
              visibility over how you source and spend.
            </p>
          </FadeIn>
        </div>
      </section>

      {SERVICES.map((service, i) => {
        const Icon = service.icon
        const alt = i % 2 === 1
        return (
          <section
            key={service.id}
            id={service.id}
            className={`section scroll-mt-20 ${alt ? 'bg-offwhite' : 'bg-white'}`}
          >
            <div className="wrap">
              <FadeIn>
                <div className="grid items-start gap-10 md:grid-cols-2">
                  <div>
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent/15 text-accent-dark">
                      <Icon size={28} />
                    </div>
                    <h2 className="text-2xl font-bold md:text-3xl">{service.title}</h2>
                    {service.paragraphs.map((p, idx) => (
                      <p key={idx} className="mt-4 leading-relaxed text-primary/70">
                        {p}
                      </p>
                    ))}
                    <Link to="/audit" className="btn-primary mt-6 inline-flex">
                      Book a Free Audit
                    </Link>
                  </div>

                  <div className="rounded-2xl border border-primary/10 bg-white p-8 shadow-sm">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary/50">
                      Deliverables
                    </h3>
                    <ul className="space-y-3">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm text-primary/80">
                          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-dark" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        )
      })}
    </>
  )
}
