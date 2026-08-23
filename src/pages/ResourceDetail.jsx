import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { FileSpreadsheet, FileText, File, Download, Mail, CheckCircle2 } from 'lucide-react'
import Seo from '../components/Seo'
import FadeIn from '../components/FadeIn'
import Breadcrumb from '../components/Breadcrumb'
import { categoryBadgeClass } from '../lib/categoryColors'
import { getResourceBySlug } from '../data/resources'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const FILE_ICONS = { Excel: FileSpreadsheet, Word: FileText, PDF: File }

export default function ResourceDetail() {
  const { slug } = useParams()
  const resource = getResourceBySlug(slug)

  const [downloaded, setDownloaded] = useState(false)
  const [email, setEmail] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!resource) return <Navigate to="/resources" replace />

  const FileIcon = FILE_ICONS[resource.fileType] || File

  async function handleFreeDownload() {
    setDownloaded(true)
  }

  async function handleEmailGate(e) {
    e.preventDefault()
    setSubmitting(true)

    if (isSupabaseConfigured) {
      await supabase.from('resource_downloads').insert({
        email,
        resource_slug: resource.slug,
      })
    }

    setSubmitting(false)
    setUnlocked(true)
  }

  return (
    <>
      <Seo
        path={`/resources/${resource.slug}`}
        title={resource.title}
        description={resource.description}
      />

      <div className="wrap py-12">
        <FadeIn>
          <Breadcrumb
            items={[
              { label: 'Resources', to: '/resources' },
              { label: resource.category, to: '/resources' },
              { label: resource.title },
            ]}
          />

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className={`badge ${categoryBadgeClass(resource.category)}`}>{resource.category}</span>
            <span className="badge flex items-center gap-1 bg-primary/5 text-primary/70">
              <FileIcon size={12} /> {resource.fileType}
            </span>
            {resource.premium && (
              <span className="badge bg-accent/20 text-accent-dark">Premium</span>
            )}
          </div>

          <h1 className="mt-4 max-w-2xl font-serif text-3xl font-bold md:text-4xl">
            {resource.title}
          </h1>
        </FadeIn>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <FadeIn>
            <div className="space-y-4">
              {resource.fullDescription.map((p, i) => (
                <p key={i} className="leading-relaxed text-primary/75">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 flex aspect-[4/3] max-w-md items-center justify-center rounded-2xl border border-dashed border-primary/20 bg-white text-primary/30">
              <div className="text-center">
                <FileIcon size={40} className="mx-auto mb-2" />
                <span className="text-sm">Preview coming soon</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="rounded-2xl border border-primary/10 bg-white p-8">
              {resource.premium ? (
                unlocked ? (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <CheckCircle2 size={36} className="text-accent-dark" />
                    <h3 className="font-semibold">Check your inbox</h3>
                    <p className="text-sm text-primary/70">
                      We'll send the file within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleEmailGate} className="space-y-4">
                    <h3 className="font-semibold">Enter your email to get access</h3>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" />
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="input pl-9"
                      />
                    </div>
                    <button type="submit" disabled={submitting} className="btn-primary w-full">
                      {submitting ? 'Sending…' : 'Unlock Resource'}
                    </button>
                  </form>
                )
              ) : downloaded ? (
                <div className="flex flex-col items-center gap-3 text-center">
                  <CheckCircle2 size={36} className="text-accent-dark" />
                  <h3 className="font-semibold">On its way</h3>
                  <p className="text-sm text-primary/70">
                    Your download will begin shortly.
                  </p>
                </div>
              ) : (
                <button onClick={handleFreeDownload} className="btn-primary flex w-full items-center justify-center gap-2">
                  <Download size={16} /> Download {resource.fileType}
                </button>
              )}

              <Link to="/resources" className="mt-4 block text-center text-sm text-primary/50 hover:text-accent-dark">
                Back to all resources
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  )
}
