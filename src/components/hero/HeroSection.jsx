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

  return (
    <section
      data-hero
      // cursor-none: native cursor hides on the hero — CursorGlow becomes the
      // spotlight. Links keep their UA pointer, so CTAs stay discoverable.
      className="relative min-h-screen overflow-hidden bg-f1-bg flex items-center cursor-none"
    >
      {/* Layer 0 — Ambient background */}
      <HeroBackground mouseRef={mouseRef} />

      {/* Layer 1 — 3D Canvas OR 2D fallback */}
      {use3D ? (
        <Canvas3D mouseRef={mouseRef} />
      ) : (
        <CarParallax mouseRef={mouseRef} />
      )}

      {/* Layer 2 — Text content (z-10, above the canvas) */}
      <div className="f1-container relative z-10 pt-28 pb-24 w-full text-center md:text-left">
        <HeroText />
        <HeroCTA />
      </div>

      {/* Layer 3 — Scroll hint */}
      <HeroScrollHint />
    </section>
  )
}
