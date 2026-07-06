import { useEffect, useRef } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'
import HeroBackground from './HeroBackground'
import Canvas3D from './Canvas3D'
import CarParallax from './CarParallax' // 2D fallback — mobile / low-end / reduced motion
import HeroText from './HeroText'
import HeroCTA from './HeroCTA'
import HeroScrollHint from './HeroScrollHint'

export default function HeroSection() {
  const mouseRef = useMousePosition(0.06) // one source of truth for all children
  const { use3D } = useDeviceCapability()
  const hudRef = useRef(null)

  // Track mouse position to toggle HUD visibility (bypasses React re-renders)
  useEffect(() => {
    if (!use3D) return

    const onMove = (e) => {
      const normX = e.clientX / window.innerWidth
      if (hudRef.current) {
        hudRef.current.style.opacity = normX > 0.4 ? '1' : '0'
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [use3D])

  return (
    <section
      data-hero
      // cursor-none: native cursor hides on the hero — CursorGlow becomes the
      // spotlight. Links keep their UA pointer, so CTAs stay discoverable.
      className="relative min-h-screen overflow-hidden bg-f1-bg flex items-center"
    >
      {/* Layer 0 — Ambient background */}
      <HeroBackground mouseRef={mouseRef} />

      {/* Layer 1 — 3D Canvas OR 2D fallback */}
      {use3D ? (
        <Canvas3D mouseRef={mouseRef} />
      ) : (
        <CarParallax mouseRef={mouseRef} />
      )}

      {/* Layer 2 — Text content (z-10, above the canvas)
          pointer-events-none on wrapper so drags pass through to Canvas.
          pointer-events-auto on interactive children (text, buttons). */}
      <div className="f1-container relative z-10 pt-28 pb-24 w-full text-center md:text-left pointer-events-none">
        <div className="pointer-events-auto">
          <HeroText />
          <HeroCTA />
        </div>
      </div>

      {/* Layer 2.5 — 3D Discovery HUD overlay (only when 3D is active) */}
      {use3D && (
        <div
          ref={hudRef}
          className="absolute bottom-28 right-8 z-20 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: 0,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            color: '#00FF99',
          }}
        >
          <div className="flex flex-col gap-1 items-end">
            <span className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#00FF99]"
                style={{ animation: 'pulse 2s ease-in-out infinite' }}
              />
              3D ROTATE // ACTIVE
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>DRAG TO SPIN</span>
          </div>
        </div>
      )}

      {/* Layer 3 — Scroll hint */}
      <HeroScrollHint />
    </section>
  )
}
