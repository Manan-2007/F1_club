import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useCountUp(target, suffix = '', duration = 1.5) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const numericTarget = parseInt(target.replace(/\D/g, ''), 10)
    const obj = { value: 0 }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          value: numericTarget,
          duration,
          ease: 'power2.out',
          onUpdate: () => setVal(Math.floor(obj.value)),
        })
      },
    })

    return () => trigger.kill()
  }, [target, duration])

  return { ref, display: `${val}${suffix}` }
}
