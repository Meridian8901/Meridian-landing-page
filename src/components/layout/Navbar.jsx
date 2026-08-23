import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { to: '/services', label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/network', label: 'Network' },
  { to: '/markets', label: 'Markets' },
  { to: '/blog', label: 'Blog' },
  { to: '/resources', label: 'Resources' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-primary text-white">
      <div className="wrap flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="9" fill="#F8F6F1" />
            <circle cx="20" cy="20" r="11" stroke="#1E3A4A" strokeWidth="1.8" fill="none" opacity="0.85" />
            <ellipse cx="20" cy="20" rx="4.6" ry="11" stroke="#1E3A4A" strokeWidth="1.5" fill="none" opacity="0.5" />
            <line x1="9" y1="20" x2="31" y2="20" stroke="#1E3A4A" strokeWidth="1.5" opacity="0.5" />
            <circle cx="20" cy="9" r="3.1" fill="#C9A84C" />
          </svg>
          <span className="font-serif text-lg font-semibold leading-none">
            Meridian
            <span className="block text-[10px] font-sans font-medium tracking-[0.2em] text-white/60">
              PROCUREMENT
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-accent ${
                  isActive ? 'text-accent' : 'text-white/85'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/audit" className="btn-outline-light !py-2 !px-4 text-sm">
            Get a Free Audit
          </Link>
          <Link to="/demo" className="btn-primary !py-2 !px-4 text-sm">
            Book a Demo
          </Link>
        </div>

        <button
          className="text-white lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-primary lg:hidden">
          <div className="wrap flex flex-col gap-4 py-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white/90"
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 flex flex-col gap-3">
              <Link to="/audit" onClick={() => setOpen(false)} className="btn-outline-light justify-center">
                Get a Free Audit
              </Link>
              <Link to="/demo" onClick={() => setOpen(false)} className="btn-primary justify-center">
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
