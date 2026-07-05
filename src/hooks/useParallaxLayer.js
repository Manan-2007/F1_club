import { useEffect, useRef } from 'react'

/**
 * useParallaxLayer
 * Writes CSS transform directly to a DOM ref every frame — no state, no re-renders.
 * Call once per parallax layer.
 *
 * @param {object} mouseRef — ref from useMousePosition
 * @param {number} depthX  — horizontal movement strength in px. Negative = opposite direction.
 * @param {number} depthY  — vertical movement strength in px.
 * @param {number} rotateZ — max Z rotation in degrees (optional, default 0)
 */
export function useParallaxLayer(mouseRef, depthX = 20, depthY = 10, rotateZ = 0) {
  const layerRef = useRef(null)
  const rafId = useRef(null)

  useEffect(() => {
    const tick = () => {
      const el = layerRef.current
      if (el && mouseRef.current) {
        const tx = mouseRef.current.x * depthX
        const ty = mouseRef.current.y * depthY
        const rz = mouseRef.current.x * rotateZ
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotateZ(${rz}deg)`
      }
      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [mouseRef, depthX, depthY, rotateZ])

  return layerRef
}
