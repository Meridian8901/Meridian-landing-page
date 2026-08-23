import { Navigate, NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, Users, LogOut, ExternalLink } from 'lucide-react'
import { isAdminAuthenticated, adminLogout } from '../lib/adminAuth'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/posts', label: 'Posts', icon: FileText },
  { to: '/admin/leads', label: 'Leads', icon: Users },
]

export default function AdminLayout() {
  const navigate = useNavigate()

  if (!isAdminAuthenticated()) return <Navigate to="/admin/login" replace />

  function handleLogout() {
    adminLogout()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-offwhite">
      <aside className="hidden w-60 shrink-0 flex-col bg-primary text-white md:flex">
        <div className="px-6 py-6">
          <span className="font-serif text-lg font-semibold">Meridian Admin</span>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-white/10 text-accent' : 'text-white/75 hover:bg-white/5'
                  }`
                }
              >
                <Icon size={17} /> {item.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="space-y-1 px-3 pb-6">
          <Link to="/" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5">
            <ExternalLink size={17} /> View Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/60 hover:bg-white/5"
          >
            <LogOut size={17} /> Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-auto p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  )
}
