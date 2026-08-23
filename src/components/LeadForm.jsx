import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const COUNTRIES = ['Uganda', 'Ethiopia', 'Kenya', 'Tanzania', 'Other']
const SPEND_RANGES = ['<$500K', '$500K–$2M', '$2M–$10M', '$10M+']

const initialState = {
  contact_name: '',
  company_name: '',
  country: '',
  industry: '',
  email: '',
  phone: '',
  annual_spend_range: '',
  message: '',
}

export default function LeadForm({ type }) {
  const [values, setValues] = useState(initialState)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const isAudit = type === 'audit'
  const successMessage = isAudit
    ? "We'll review your details and send your free audit invitation within 48 hours."
    : "Thanks — we'll be in touch shortly to confirm your demo slot."
  const messageLabel = isAudit
    ? "What's your biggest procurement challenge?"
    : 'What are you hoping to see in the demo?'

  function update(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')

    if (!isSupabaseConfigured) {
      // No backend configured yet — still confirm success to the user locally.
      setStatus('success')
      return
    }

    const { error } = await supabase.from('lead_submissions').insert({
      type,
      company_name: values.company_name,
      contact_name: values.contact_name,
      email: values.email,
      phone: values.phone || null,
      country: values.country,
      industry: isAudit ? values.industry : null,
      annual_spend_range: isAudit ? values.annual_spend_range : null,
      message: values.message,
    })

    setStatus(error ? 'error' : 'success')
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-primary/10 bg-white p-10 text-center">
        <CheckCircle2 size={44} className="text-accent-dark" />
        <h3 className="font-serif text-xl font-semibold">Request received</h3>
        <p className="max-w-sm text-sm text-primary/70">{successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-primary/10 bg-white p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full Name" required>
          <input required type="text" value={values.contact_name} onChange={update('contact_name')} className="input" />
        </Field>
        <Field label="Company Name" required>
          <input required type="text" value={values.company_name} onChange={update('company_name')} className="input" />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Email" required>
          <input required type="email" value={values.email} onChange={update('email')} className="input" />
        </Field>
        <Field label="Phone" required={!isAudit}>
          <input required={!isAudit} type="tel" value={values.phone} onChange={update('phone')} className="input" />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Country" required>
          <select required value={values.country} onChange={update('country')} className="input">
            <option value="" disabled>Select a country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>

        {isAudit ? (
          <Field label="Industry" required>
            <input required type="text" value={values.industry} onChange={update('industry')} className="input" placeholder="e.g. Food processing" />
          </Field>
        ) : (
          <div />
        )}
      </div>

      {isAudit && (
        <Field label="Estimated Annual Procurement Spend" required>
          <select required value={values.annual_spend_range} onChange={update('annual_spend_range')} className="input">
            <option value="" disabled>Select a range</option>
            {SPEND_RANGES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </Field>
      )}

      <Field label={messageLabel}>
        <textarea rows={4} value={values.message} onChange={update('message')} className="input resize-none" />
      </Field>

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full">
        {status === 'submitting' ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Submitting…
          </>
        ) : isAudit ? (
          'Request My Free Audit'
        ) : (
          'Book My Demo'
        )}
      </button>

      {status === 'error' && (
        <p className="text-center text-sm text-red-600">
          Something went wrong submitting your request. Please try again.
        </p>
      )}
    </form>
  )
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-primary/80">
        {label} {required && <span className="text-accent-dark">*</span>}
      </span>
      {children}
    </label>
  )
}
