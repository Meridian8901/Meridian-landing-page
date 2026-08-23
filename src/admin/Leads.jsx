import { useEffect, useMemo, useState } from 'react'
import { Download } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

function formatDate(dateString) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function toCsv(rows) {
  const headers = ['type', 'contact_name', 'company_name', 'email', 'phone', 'country', 'industry', 'annual_spend_range', 'message', 'submitted_at']
  const escape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`
  const lines = [headers.join(',')]
  for (const row of rows) {
    lines.push(headers.map((h) => escape(row[h])).join(','))
  }
  return lines.join('\n')
}

export default function Leads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured) {
        setLoading(false)
        return
      }
      const { data } = await supabase.from('lead_submissions').select('*').order('submitted_at', { ascending: false })
      setLeads(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(
    () => (filter === 'all' ? leads : leads.filter((l) => l.type === filter)),
    [leads, filter],
  )

  function exportCsv() {
    const csv = toCsv(filtered)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `meridian-leads-${filter}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-primary">Leads</h1>
        <div className="flex items-center gap-3">
          <div className="flex overflow-hidden rounded-lg border border-primary/15">
            {['all', 'audit', 'demo'].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 text-sm font-medium capitalize ${
                  filter === t ? 'bg-primary text-white' : 'bg-white text-primary/70'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button onClick={exportCsv} className="btn-outline !py-2">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-primary/10 bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-primary/10 text-xs uppercase tracking-wide text-primary/50">
            <tr>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Company</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Country</th>
              <th className="px-5 py-3 font-medium">Spend Range</th>
              <th className="px-5 py-3 font-medium">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {!isSupabaseConfigured && (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-primary/50">
                  Supabase isn't connected yet.
                </td>
              </tr>
            )}
            {isSupabaseConfigured && loading && (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-primary/50">
                  Loading…
                </td>
              </tr>
            )}
            {isSupabaseConfigured && !loading && filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-primary/50">
                  No leads yet.
                </td>
              </tr>
            )}
            {filtered.map((lead) => (
              <tr key={lead.id} className="border-b border-primary/5 last:border-0">
                <td className="px-5 py-3.5">
                  <span className="badge bg-primary/5 text-primary/70 capitalize">{lead.type}</span>
                </td>
                <td className="px-5 py-3.5 font-medium text-primary">{lead.contact_name}</td>
                <td className="px-5 py-3.5 text-primary/70">{lead.company_name}</td>
                <td className="px-5 py-3.5 text-primary/70">{lead.email}</td>
                <td className="px-5 py-3.5 text-primary/70">{lead.country}</td>
                <td className="px-5 py-3.5 text-primary/70">{lead.annual_spend_range || '—'}</td>
                <td className="px-5 py-3.5 text-primary/70">{formatDate(lead.submitted_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
