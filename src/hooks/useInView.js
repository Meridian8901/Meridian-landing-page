import { useEffect, useRef, useState } from 'react'

export default function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, options)

    observer.observe(node)

    // Safety net: if the observer never fires (slow registration, viewport
    // resize during automated capture, etc.), don't leave content stuck
    // invisible — reveal it anyway after a short delay.
    const fallback = setTimeout(() => setInView(true), 700)

    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, inView]
}
