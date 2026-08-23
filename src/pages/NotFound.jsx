import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo path="/404" title="Page Not Found" />
      <div className="wrap flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="font-serif text-6xl font-bold text-primary/15">404</span>
        <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-primary/60">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary mt-8 inline-flex">
          Back to Home
        </Link>
      </div>
    </>
  )
}
