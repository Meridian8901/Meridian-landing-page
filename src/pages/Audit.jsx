import Seo from '../components/Seo'
import FadeIn from '../components/FadeIn'
import LeadForm from '../components/LeadForm'

export default function Audit() {
  return (
    <>
      <Seo
        path="/audit"
        title="Get a Free Audit"
        description="Get a free procurement audit — we'll identify a minimum 15% cost reduction in your procurement, or extend the engagement free until we do."
      />

      <section className="bg-primary py-16 text-white md:py-20">
        <div className="wrap text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl font-bold md:text-5xl">Get a Free Audit</h1>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              A full spend diagnostic in 2–3 weeks. We'll identify a minimum 15% cost reduction —
              or extend the engagement free until we do.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section bg-offwhite">
        <div className="wrap max-w-2xl">
          <FadeIn>
            <LeadForm type="audit" />
          </FadeIn>
        </div>
      </section>
    </>
  )
}
