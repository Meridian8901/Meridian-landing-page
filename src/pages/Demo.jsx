import Seo from '../components/Seo'
import FadeIn from '../components/FadeIn'
import LeadForm from '../components/LeadForm'

export default function Demo() {
  return (
    <>
      <Seo
        path="/demo"
        title="Book a Demo"
        description="See the Meridian platform in action — live shipment tracking, AI-ranked sourcing, and full procurement visibility."
      />

      <section className="bg-primary py-16 text-white md:py-20">
        <div className="wrap text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl font-bold md:text-5xl">Book a Demo</h1>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              See the Meridian platform in action — live shipment tracking, AI-ranked sourcing, and
              full procurement visibility.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section bg-offwhite">
        <div className="wrap max-w-2xl">
          <FadeIn>
            <LeadForm type="demo" />
          </FadeIn>
        </div>
      </section>
    </>
  )
}
