import { useMemo } from 'react'

/**
 * useDeviceCapability
 * Decides whether the device gets the 3D hero (Canvas3D) or the 2D
 * CarParallax fallback. Computed once per mount — capability doesn't
 * change mid-session.
 */
export function useDeviceCapability() {
  return useMemo(() => {
    // Mobile check
    const isMobile =
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      window.innerWidth < 768

    // Check for WebGL support
    let hasWebGL = false
    try {
      const canvas = document.createElement('canvas')
      hasWebGL = !!(
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      )
    } catch {
      hasWebGL = false
    }

    // Check for reduced motion preference
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    return {
      use3D: hasWebGL && !isMobile && !prefersReduced,
      isMobile,
      hasWebGL,
    }
  }, [])
}
