const TOKEN_KEY = 'meridian_admin_token'

export function isAdminAuthenticated() {
  return localStorage.getItem(TOKEN_KEY) === 'authenticated'
}

export function attemptAdminLogin(password) {
  const configured = import.meta.env.VITE_ADMIN_PASSWORD
  if (configured && password === configured) {
    localStorage.setItem(TOKEN_KEY, 'authenticated')
    return true
  }
  return false
}

export function adminLogout() {
  localStorage.removeItem(TOKEN_KEY)
}
