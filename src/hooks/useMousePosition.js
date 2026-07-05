import { useEffect, useRef } from 'react'

/**
 * useMousePosition
 * Returns a ref object { x, y } normalized to -1 → +1.
 * Uses lerp smoothing — updates 60fps via requestAnimationFrame.
 * Uses a ref, not state, so consumers don't re-render on every frame.
 *
 * @param {number} lerpFactor — 0.04 (slow/heavy) to 0.15 (fast/light). Default 0.06.
 */
export function useMousePosition(lerpFactor = 0.06) {
  const mouse = useRef({ x: 0, y: 0 }) // raw normalized
  const smoothed = useRef({ x: 0, y: 0 }) // lerped output
  const rafId = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    const tick = () => {
      smoothed.current.x += (mouse.current.x - smoothed.current.x) * lerpFactor
      smoothed.current.y += (mouse.current.y - smoothed.current.y) * lerpFactor
      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [lerpFactor])

  return smoothed // ref: { current: { x, y } }
}
