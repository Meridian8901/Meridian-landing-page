import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import FadeIn from '../components/FadeIn'
import MarketCard from '../components/MarketCard'
import { MARKETS } from '../data/markets'

export default function Markets() {
  return (
    <>
      <Seo
        path="/markets"
        title="Markets"
        description="Meridian serves manufacturers across Uganda, Ethiopia, Kenya, and Tanzania — East Africa's key manufacturing and trade corridors."
      />

      <section className="bg-primary py-20 text-white">
        <div className="wrap text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl font-bold md:text-5xl">Markets We Serve</h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/75">
              Four East African markets, each with its own manufacturing base and trade
              corridors — and its own version of the same procurement problem.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section bg-offwhite">
        <div className="wrap">
          <div className="grid gap-6 md:grid-cols-2">
            {MARKETS.map((market, i) => (
              <FadeIn key={market.slug} delay={i * 100}>
                <MarketCard market={market} />
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="mt-14 text-center">
              <h2 className="text-2xl font-bold">Not seeing your market?</h2>
              <p className="mx-auto mt-3 max-w-lg text-primary/70">
                We're actively expanding across East Africa. Get in touch and we'll let you know
                what's possible for your location.
              </p>
              <Link to="/audit" className="btn-primary mt-6 inline-flex">
                Get a Free Audit
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
