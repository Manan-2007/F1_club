import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Teams', to: '/teams' },
  { label: 'Projects', to: '/projects' },
  { label: 'Events', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const progressBarRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // GSAP glass effect on scroll threshold
  useEffect(() => {
    gsap.to(navRef.current, {
      backgroundColor: scrolled ? 'rgba(7,7,7,0.9)' : 'rgba(7,7,7,0)',
      backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
      duration: 0.4,
    })
  }, [scrolled])

  // Red scroll progress bar
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set(progressBarRef.current, {
          scaleX: self.progress,
          transformOrigin: 'left',
        })
      },
    })
    return () => trigger.kill()
  }, [])

  // Nav links stagger in on first load only
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-link', {
        opacity: 0,
        y: -8,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.3,
      })
    }, navRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding] duration-500 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="f1-container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <span className="w-[2px] h-6 bg-f1-red" />
          <span className="f1-heading text-sm md:text-base tracking-[0.15em]">
            F1 <span className="text-f1-red">CHITKARA</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-link relative text-xs uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-f1-red' : 'text-f1-silver hover:text-f1-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-f1-red"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          to="/join"
          className="nav-link btn-primary hidden lg:inline-flex !px-6 !py-3"
        >
          Join the Grid
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="lg:hidden flex flex-col justify-center items-center min-w-[44px] min-h-[44px] p-2 gap-[5px]"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[2px] bg-f1-white"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-[2px] bg-f1-white"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[2px] bg-f1-white"
          />
        </button>
      </div>

      {/* Scroll progress bar */}
      <span
        ref={progressBarRef}
        className="absolute bottom-0 left-0 w-full h-px bg-f1-red origin-left scale-x-0"
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden glass-panel overflow-hidden"
          >
            <nav className="f1-container flex flex-col gap-2 py-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `f1-heading text-2xl block py-3 ${
                        isActive ? 'text-f1-red' : 'text-f1-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <Link to="/join" className="btn-primary self-start mt-4">
                Join the Grid
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
