import { Link } from 'react-router-dom'
import { Mail, Linkedin, Twitter } from 'lucide-react'

const FOOTER_LINKS = [
  {
    heading: 'Company',
    links: [
      { to: '/services', label: 'Services' },
      { to: '/how-it-works', label: 'How It Works' },
      { to: '/network', label: 'Global Network' },
      { to: '/markets', label: 'Markets' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { to: '/blog', label: 'Blog' },
      { to: '/resources', label: 'Templates & Tools' },
    ],
  },
  {
    heading: 'Get Started',
    links: [
      { to: '/audit', label: 'Free Audit' },
      { to: '/demo', label: 'Book a Demo' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white/80">
      <div className="wrap grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <span className="font-serif text-xl font-semibold text-white">Meridian</span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
            Africa's procurement, rebuilt from the ground up — hands-on consulting, AI-powered
            sourcing, and direct supply from India &amp; China.
          </p>
          <a
            href="mailto:mohit@meridianprocurements.com"
            className="mt-4 inline-flex items-center gap-2 text-sm text-white/70 hover:text-accent"
          >
            <Mail size={16} /> mohit@meridianprocurements.com
          </a>
        </div>

        {FOOTER_LINKS.map((col) => (
          <div key={col.heading}>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              {col.heading}
            </h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/60 hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <span className="text-xs text-white/50">
            © {new Date().getFullYear()} Meridian Procurement Co. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <a href="mailto:mohit@meridianprocurements.com" aria-label="Email" className="text-white/50 hover:text-accent">
              <Mail size={18} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-white/50 hover:text-accent">
              <Linkedin size={18} />
            </a>
            <a href="#" aria-label="Twitter" className="text-white/50 hover:text-accent">
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
