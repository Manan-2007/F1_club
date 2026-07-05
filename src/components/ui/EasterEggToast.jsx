import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MESSAGES = {
  drs: { label: 'DRS ENABLED', sub: 'Drag Reduction System active' },
  pole: { label: 'POLE POSITION', sub: 'Switch to gold accent mode' },
  lightsout: { label: 'LIGHTS OUT', sub: 'And away we go' },
  chitkara: { label: 'GO CHITKARA', sub: 'University pride mode' },
}

/**
 * EasterEggToast — brief bottom-center toast whenever an easter egg
 * activates (and when lightsout finishes — that's the visible one, since
 * the screen is dark during the blackout itself).
 */
export default function EasterEggToast() {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    let timer
    const onEgg = (e) => {
      const { code, active } = e.detail
      if (!active && code !== 'lightsout') return
      setToast({ ...MESSAGES[code], code: `${code}-${active}` })
      clearTimeout(timer)
      timer = setTimeout(() => setToast(null), 3000)
    }

    window.addEventListener('easterEgg', onEgg)
    return () => {
      window.removeEventListener('easterEgg', onEgg)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.code}
          // x:'-50%' does the horizontal centering — a style transform
          // would be overwritten by framer-motion's animated transform
          initial={{ opacity: 0, y: 16, scale: 0.95, x: '-50%' }}
          animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
          exit={{ opacity: 0, y: -8, scale: 0.95, x: '-50%' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 left-1/2 z-[9999] pointer-events-none"
        >
          <div className="glass-panel border border-white/10 px-6 py-3 flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-f1-red animate-pulse" />
            <div>
              <p className="f1-heading text-sm text-f1-white">{toast.label}</p>
              <p className="f1-mono text-xs !text-f1-silver/60 mt-0.5">
                {toast.sub}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
