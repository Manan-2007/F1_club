import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * useScrollReveal
 * Attaches a fade-up ScrollTrigger animation to a ref.
 *
 * @param {object} options
 *   target      — CSS selector within the ref (e.g. '.reveal-item'). If null, animates ref itself.
 *   y           — start Y offset in px (default 50)
 *   duration    — animation duration in seconds (default 0.8)
 *   stagger     — stagger between items in seconds (default 0.1)
 *   delay       — initial delay (default 0)
 *   ease        — GSAP ease string (default 'power3.out')
 *   start       — ScrollTrigger start (default 'top 88%')
 *   once        — only animate once (default true)
 */
export function useScrollReveal(ref, options = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      target = null,
      y = 50,
      duration = 0.8,
      stagger = 0.1,
      delay = 0,
      ease = 'power3.out',
      start = 'top 88%',
      once = true,
    } = options

    const targets = target ? el.querySelectorAll(target) : [el]
    if (!targets.length) return

    gsap.set(targets, { opacity: 0, y })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once,
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease,
          clearProps: 'opacity,y',
        })
      },
    })

    return () => trigger.kill()
  }, [])
}
