import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function HeroText() {
  const containerRef = useRef(null)

  // Entrance fires on mount — no ScrollTrigger, hero is always above the fold
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.from('.hero-eyebrow', { opacity: 0, y: 16, duration: 0.6 }, 0.3)

      tl.from(
        '.hero-word',
        { opacity: 0, y: 80, duration: 1, stagger: 0.12, ease: 'power4.out' },
        0.5
      )

      tl.from(
        '.hero-subtext',
        { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 },
        1.1
      )

      tl.from('.hero-tagline', { opacity: 0, y: 12, duration: 0.6 }, 1.3)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative z-10 max-w-3xl mx-auto md:mx-0">
      {/* Eyebrow */}
      <p className="hero-eyebrow f1-eyebrow !text-f1-silver/50 mb-8">
        Chitkara University · Est. 2024
      </p>

      {/* Main headline — clamps hold down to 320px viewports */}
      <h1 className="f1-heading leading-[0.85] mb-6 overflow-hidden">
        <span
          className="hero-word block"
          style={{ fontSize: 'clamp(3.5rem, 18vw, 10rem)' }}
        >
          F1
        </span>
        <span
          className="hero-word block text-f1-red"
          style={{ fontSize: 'clamp(3rem, 16vw, 10rem)' }}
        >
          CHITKARA
        </span>
      </h1>

      {/* Subtext */}
      <p className="hero-subtext text-f1-silver text-lg md:text-xl tracking-[0.06em] mb-3">
        Where Speed Meets Innovation
      </p>

      {/* Tagline */}
      <p className="hero-tagline f1-eyebrow !text-f1-silver/40 !tracking-[0.18em]">
        Engineering × Strategy × Design × Technology
      </p>
    </div>
  )
}
