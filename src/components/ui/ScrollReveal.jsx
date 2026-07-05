import { useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

/**
 * <ScrollReveal target=".item" stagger={0.12}>
 *   <div className="item">...</div>
 *   <div className="item">...</div>
 * </ScrollReveal>
 *
 * If no target prop: animates the wrapper div itself.
 */
export default function ScrollReveal({
  children,
  target,
  y = 50,
  duration = 0.8,
  stagger = 0.1,
  delay = 0,
  ease = 'power3.out',
  start = 'top 88%',
  className = '',
}) {
  const ref = useRef(null)
  useScrollReveal(ref, { target, y, duration, stagger, delay, ease, start })
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
