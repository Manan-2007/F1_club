import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import App from './App.jsx'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

const prefersReduced = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

if (!prefersReduced) {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  window.lenis = lenis
}

// Refresh ScrollTrigger after fonts and layout settle
window.addEventListener('load', () => {
  ScrollTrigger.refresh()
})

// StrictMode's dev double-render breaks AnimatePresence exit animations
// (framer-motion 12 + React 19.2) — page transitions and the mobile menu
// get stuck, so the app renders without it.
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
