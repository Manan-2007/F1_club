import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * ModelLoader — DOM fallback shown while the GLB streams in.
 * Occupies the same visual space as the car — no layout jump.
 */
export default function ModelLoader() {
  const rootRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    // Animate the loading bar
    const bar = gsap.to(barRef.current, {
      scaleX: 1,
      duration: 2,
      ease: 'power2.inOut',
      transformOrigin: 'left',
    })
    // Pulse the dots — scoped to this component's nodes
    const dots = gsap.to(rootRef.current.querySelectorAll('.loader-dot'), {
      opacity: 1,
      duration: 0.4,
      stagger: { each: 0.2, repeat: -1, yoyo: true },
    })

    return () => {
      bar.kill()
      dots.kill()
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Loading label */}
      <div className="flex items-center gap-2 mb-6">
        <span className="f1-eyebrow text-f1-silver/40 text-[11px]">
          LOADING MODEL
        </span>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="loader-dot w-1 h-1 rounded-full bg-f1-red opacity-0"
          />
        ))}
      </div>

      {/* Progress bar track */}
      <div className="w-48 h-px bg-f1-carbon relative overflow-hidden">
        <div
          ref={barRef}
          className="absolute inset-0 bg-f1-red"
          style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
        />
      </div>

      {/* Telemetry readout */}
      <div className="mt-8 flex flex-col items-center gap-1 opacity-10">
        <span className="f1-mono text-[10px]">INITIALISING R3F PIPELINE</span>
        <span className="f1-mono text-[10px]">COMPILING SHADERS</span>
        <span className="f1-mono text-[10px]">MOUNTING SCENE GRAPH</span>
      </div>
    </div>
  )
}
