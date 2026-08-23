import { useState } from 'react'
import Seo from '../components/Seo'
import FadeIn from '../components/FadeIn'
import ResourceCard from '../components/ResourceCard'
import { RESOURCES, RESOURCE_CATEGORIES } from '../data/resources'

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All' ? RESOURCES : RESOURCES.filter((r) => r.category === activeCategory)

  return (
    <>
      <Seo
        path="/resources"
        title="Procurement Resources & Templates"
        description="Free tools built from real procurement work across East Africa and global supply chains — calculators, templates, SOPs, and sourcing guides."
      />

      <section className="bg-primary py-20 text-white">
        <div className="wrap text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl font-bold md:text-5xl">
              Procurement Resources &amp; Templates
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/75">
              Free tools built from real procurement work across East Africa and global supply
              chains.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section bg-offwhite">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {RESOURCE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-primary/70 hover:bg-primary/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((resource, i) => (
              <FadeIn key={resource.slug} delay={(i % 3) * 80}>
                <ResourceCard resource={resource} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
