import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import FadeIn from '../components/FadeIn'
import EntityCard from '../components/EntityCard'
import { NETWORK_ENTITIES } from '../data/network'

export default function Network() {
  return (
    <>
      <Seo
        path="/network"
        title="Global Network"
        description="Meridian's three-entity network — East Africa coordination, direct sourcing from India, and a China re-export hub in Dubai."
      />

      <section className="bg-primary py-20 text-white">
        <div className="wrap text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl font-bold md:text-5xl">Our Global Network</h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/75">
              We built Meridian around a three-entity network rather than a single office —
              each link exists to remove a cost or a risk, not to add one.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section bg-offwhite">
        <div className="wrap">
          <div className="grid gap-6 md:grid-cols-3">
            {NETWORK_ENTITIES.map((entity, i) => (
              <FadeIn key={entity.name} delay={i * 100}>
                <EntityCard entity={entity} />
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="mt-14 rounded-2xl border border-primary/10 bg-white p-8 md:p-10">
              <h2 className="text-2xl font-bold">Why a network, not a single office</h2>
              <p className="mt-4 leading-relaxed text-primary/70">
                Most sourcing relationships stack agents and trading houses between a factory in
                Ningbo or Haryana and a manufacturer in Kampala or Nairobi — each one taking a cut
                that's invisible in the unit price. Meridian's structure removes the layers that
                don't add value and keeps the ones that do: on-the-ground presence in India for
                factory vetting and negotiation, a re-export hub in Dubai positioned for
                China-origin goods, and a coordination base in East Africa that owns the
                relationship with you end to end.
              </p>
              <p className="mt-4 leading-relaxed text-primary/70">
                The result: the same factories, the same quality, fewer hands in between, and a
                meaningful share of that margin back in your business.
              </p>
              <Link to="/audit" className="btn-primary mt-6 inline-flex">
                See What This Looks Like For You
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
