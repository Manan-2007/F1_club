import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function HeroScrollHint() {
  const ref = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 10,
        duration: 0.8,
        delay: 1.8,
        ease: 'power3.out',
      })

      // Pulse the vertical line up and down infinitely
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0.3, transformOrigin: 'top', opacity: 0.4 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }
      )
    })

    return () => ctx.revert()
  }, [])

  const handleClick = () => {
    // Lenis owns scrolling; fall back to native only when Lenis is absent
    // (prefers-reduced-motion skips Lenis init entirely)
    if (window.lenis) {
      window.lenis.scrollTo(window.innerHeight, { duration: 1.2 })
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <div
      ref={ref}
      className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 cursor-pointer pointer-events-auto"
      onClick={handleClick}
    >
      <span className="f1-eyebrow !text-f1-silver/30 !text-[10px] !tracking-[0.3em]">
        SCROLL
      </span>
      <div
        ref={lineRef}
        className="w-px h-12 bg-gradient-to-b from-f1-red via-f1-red/50 to-transparent"
      />
      <div className="w-1 h-1 rounded-full bg-f1-red animate-pulse" />
    </div>
  )
}
