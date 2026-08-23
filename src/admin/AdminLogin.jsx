import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { attemptAdminLogin, isAdminAuthenticated } from '../lib/adminAuth'
import Seo from '../components/Seo'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  if (isAdminAuthenticated()) return <Navigate to="/admin" replace />

  function handleSubmit(e) {
    e.preventDefault()
    if (attemptAdminLogin(password)) {
      navigate('/admin')
    } else {
      setError(true)
    }
  }

  return (
    <>
      <Seo path="/admin/login" title="Admin Login" />
      <div className="flex min-h-screen items-center justify-center bg-primary px-6">
        <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="font-serif text-xl font-semibold text-primary">Meridian Admin</h1>
          <p className="mt-1 text-sm text-primary/60">Enter the admin password to continue.</p>

          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(false)
            }}
            placeholder="Password"
            className="input mt-6"
          />
          {error && <p className="mt-2 text-sm text-red-600">Incorrect password.</p>}

          <button type="submit" className="btn-primary mt-5 w-full">
            Sign In
          </button>
        </form>
      </div>
    </>
  )
}
