/* Presentation hooks shared across pages.
   Kept out of ui.jsx so that file only exports components (Fast Refresh
   requires a module to be components-only to hot-swap it cleanly). */

import { useCallback, useEffect, useRef, useState } from 'react'

/* -------------------------------------------------------------------------
   Scroll reveal
   One observer per mount walks every [data-rv] descendant and unveils it
   as it enters. Elements already in view on load are revealed immediately so
   nothing above the fold waits on a scroll event.
   ------------------------------------------------------------------------- */

export function useReveal(deps = []) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return undefined

    const targets = root.querySelectorAll('[data-rv]:not(.is-rv)')
    if (!targets.length) return undefined

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      targets.forEach((el) => el.classList.add('is-rv'))
      return undefined
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-rv')
          io.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}

/* -------------------------------------------------------------------------
   Carousel rail
   Returns [ref, controls]: the ref to attach to the scroll-snap track, and
   the prev/next handlers plus whether each end has been reached so the
   arrows can disable themselves.
   ------------------------------------------------------------------------- */

export function useRail() {
  const ref = useRef(null)
  const [state, setState] = useState({ atStart: true, atEnd: false })

  const sync = useCallback(() => {
    const el = ref.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setState({
      atStart: el.scrollLeft <= 2,
      atEnd: max <= 2 || el.scrollLeft >= max - 2,
    })
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      el.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [sync])

  /* Step by one card plus its gap, derived from the first child so the rail
     works for any card width without hard-coding it. */
  const scrollBy = useCallback((dir) => {
    const el = ref.current
    if (!el) return
    const first = el.firstElementChild
    const gap = parseFloat(getComputedStyle(el).columnGap || '20') || 20
    const step = first ? first.getBoundingClientRect().width + gap : el.clientWidth * 0.8
    el.scrollBy({ left: step * dir, behavior: 'smooth' })
  }, [])

  const prev = useCallback(() => scrollBy(-1), [scrollBy])
  const next = useCallback(() => scrollBy(1), [scrollBy])

  return [ref, { atStart: state.atStart, atEnd: state.atEnd, prev, next }]
}
