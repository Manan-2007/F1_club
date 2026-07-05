import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function RacingLine({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const tween = gsap.fromTo(
      ref.current,
      { scaleY: 0, opacity: 0 },
      {
        scaleY: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.inOut',
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      }
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`w-px bg-gradient-to-b from-transparent via-f1-red to-transparent ${className}`}
    />
  )
}
