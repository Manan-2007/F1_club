import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CursorGlow from '@/components/ui/CursorGlow'
import EasterEggToast from '@/components/ui/EasterEggToast'
import { useEasterEggs } from '@/hooks/useEasterEggs'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Teams from '@/pages/Teams'
import Projects from '@/pages/Projects'
import Events from '@/pages/Events'
import Gallery from '@/pages/Gallery'
import Join from '@/pages/Join'

export default function App() {
  const location = useLocation()
  useEasterEggs()

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    // Recalculate trigger positions once the new page has finished entering
    // (exit 0.2s + enter 0.5s) — page heights differ per route.
    const t = setTimeout(() => ScrollTrigger.refresh(), 750)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-f1-bg text-f1-white">
      <CursorGlow />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <EasterEggToast />
    </div>
  )
}
