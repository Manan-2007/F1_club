import { useEffect, useRef, useCallback } from 'react'

const SEQUENCES = {
  drs: 'drs',
  pole: 'pole',
  lightsout: 'lightsout',
  chitkara: 'chitkara', // bonus: club name
}

const ACTIVE_CLASSES = {
  drs: 'easter-drs',
  pole: 'easter-pole',
  lightsout: 'easter-lightsout',
  chitkara: 'easter-chitkara',
}

/**
 * useEasterEggs
 * Global keyboard listener for typed sequences. On match: applies a CSS
 * class to <html> (mutually exclusive; typing the same code again toggles
 * it off) and dispatches an `easterEgg` CustomEvent with
 * { code, active } so components (EasterEggToast) can react.
 * "lightsout" auto-resets after its 3s animation.
 */
export function useEasterEggs() {
  const buffer = useRef('')
  const activeRef = useRef(null)
  const timerRef = useRef(null)

  const deactivateAll = useCallback(() => {
    Object.values(ACTIVE_CLASSES).forEach((cls) =>
      document.documentElement.classList.remove(cls)
    )
    activeRef.current = null
  }, [])

  const activate = useCallback(
    (key) => {
      const cls = ACTIVE_CLASSES[key]
      if (!cls) return

      // If same egg typed again — toggle off
      if (activeRef.current === key) {
        deactivateAll()
        return
      }

      // Remove all, apply new
      deactivateAll()
      document.documentElement.classList.add(cls)
      activeRef.current = key

      // Fire custom event so components can react
      window.dispatchEvent(
        new CustomEvent('easterEgg', {
          detail: { code: key, active: true },
        })
      )

      // lightsout auto-resets after 3s
      if (key === 'lightsout') {
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
          document.documentElement.classList.remove(cls)
          activeRef.current = null
          window.dispatchEvent(
            new CustomEvent('easterEgg', {
              detail: { code: key, active: false },
            })
          )
        }, 3000)
      }
    },
    [deactivateAll]
  )

  useEffect(() => {
    const onKey = (e) => {
      // Ignore when user is typing in a form field
      const el = document.activeElement
      const tag = el?.tagName?.toLowerCase()
      if (['input', 'textarea', 'select'].includes(tag) || el?.isContentEditable)
        return
      if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return

      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-12)

      for (const [key, seq] of Object.entries(SEQUENCES)) {
        if (buffer.current.endsWith(seq)) {
          activate(key)
          buffer.current = ''
          break
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      clearTimeout(timerRef.current)
      deactivateAll()
    }
  }, [activate, deactivateAll])
}
