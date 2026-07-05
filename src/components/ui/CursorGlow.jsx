import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef(null)
  const pos = useRef({ x: -200, y: -200 })
  const smooth = useRef({ x: -200, y: -200 })
  const overHero = useRef(false)
  const scale = useRef(1)
  const opacity = useRef(0.6)
  const rafId = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      // Over the hero the glow becomes the spotlight (section is cursor-none)
      overHero.current = !!e.target?.closest?.('[data-hero]')
    }

    const tick = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.12
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.12

      // 400px base → 600px spotlight on the hero, brighter too
      const targetScale = overHero.current ? 1.5 : 1
      const targetOpacity = overHero.current ? 1 : 0.6
      scale.current += (targetScale - scale.current) * 0.08
      opacity.current += (targetOpacity - opacity.current) * 0.08

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${smooth.current.x - 200}px, ${smooth.current.y - 200}px) scale(${scale.current})`
        glowRef.current.style.opacity = opacity.current
      }
      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-0"
      style={{
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        // 0.07 at full opacity on the hero; 0.6 opacity elsewhere ≈ the old 0.04
        background:
          'radial-gradient(circle, rgba(225,6,0,0.07) 0%, transparent 70%)',
        opacity: 0.6,
        willChange: 'transform, opacity',
      }}
    />
  )
}
