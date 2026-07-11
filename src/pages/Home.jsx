import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import PageWrapper from '@/components/layout/PageWrapper'
import HeroSection from '@/components/hero/HeroSection'
import SectionHeader from '@/components/ui/SectionHeader'
import TelemetryCard from '@/components/ui/TelemetryCard'
import Badge from '@/components/ui/Badge'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useCountUp } from '@/hooks/useCountUp'

const DEFAULT_STATS = [
  { value: '50', suffix: '+', label: 'Active Members' },
  { value: '12', suffix: '', label: 'Projects Built' },
  { value: '6', suffix: '', label: 'Events Completed' },
  { value: '3', suffix: '', label: 'Seasons Running' },
]

const featuredEvents = [
  { round: '01', title: 'Watch Party', type: 'Community', date: 'Mar 2025' },
  { round: '02', title: 'Simulator Tournament', type: 'Competition', date: 'Apr 2025' },
  { round: '03', title: 'Tech Talk', type: 'Learning', date: 'May 2025' },
]

const featuredProjects = [
  {
    tag: 'AI / ML',
    title: 'Race Predictor',
    desc: 'ML model predicting F1 race outcomes using historical data and weather inputs.',
  },
  {
    tag: 'DATA',
    title: 'Telemetry Dashboard',
    desc: 'Real-time driver performance analytics rendered as actual F1 telemetry screens.',
  },
  {
    tag: 'STRATEGY',
    title: 'Pit Stop Simulator',
    desc: 'Strategy tool modelling tyre degradation and undercut windows race by race.',
  },
]

function StatValue({ value, suffix }) {
  const { ref, display } = useCountUp(value, suffix)
  return (
    <span ref={ref} className="text-5xl font-bold text-f1-white">
      {display}
    </span>
  )
}

export default function Home() {
  const [stats, setStats] = useState(DEFAULT_STATS)
  const introRef = useRef(null)

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, 'siteConfig', 'main'))
      if (!snap.exists()) return
      const { stats: s } = snap.data()
      setStats([
        { value: String(s.members), suffix: '+', label: 'Active Members' },
        { value: String(s.projects), suffix: '', label: 'Projects Built' },
        { value: String(s.events), suffix: '', label: 'Events Completed' },
        { value: String(s.seasons), suffix: '', label: 'Seasons Running' },
      ])
    }
    load()
  }, [])

  // Club intro — columns slide in from opposite sides
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.intro-left', {
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: introRef.current, start: 'top 80%' },
      })
      gsap.from('.intro-right', {
        opacity: 0,
        x: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: introRef.current, start: 'top 80%' },
      })
    }, introRef)
    return () => ctx.revert()
  }, [])

  return (
    <PageWrapper>
      {/* SECTION 1: HERO — full component system (CarParallax → Canvas3D in Phase 5) */}
      <HeroSection />

      {/* SECTION 2: CLUB INTRO */}
      <section ref={introRef} className="py-32">
        <div className="f1-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="intro-left">
            <div className="section-tag mb-4">
              <span className="f1-eyebrow">Who We Are</span>
            </div>
            <h2 className="f1-heading text-3xl sm:text-4xl leading-tight">
              More Than a Fan Club.
              <br />
              An <span className="text-f1-red">Engineering</span>
              <br />
              Community.
            </h2>
            <p className="text-f1-silver font-light leading-relaxed mt-8">
              F1 Chitkara was founded by students who believed motorsport is
              more than entertainment — it is a live masterclass in
              aerodynamics, data science, split-second strategy, and relentless
              engineering innovation.
            </p>
            <p className="text-f1-silver font-light leading-relaxed mt-4">
              We build real projects, study real telemetry, and compete with
              real ideas — all inspired by the fastest, most technically
              demanding sport on the planet.
            </p>
            <Link to="/about" className="btn-outline mt-8">
              Our Story →
            </Link>
          </div>

          <div className="intro-right grid grid-cols-2 gap-4 md:gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-block">
                <StatValue value={stat.value} suffix={stat.suffix} />
                <p className="f1-eyebrow !text-f1-silver/60 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED EVENTS */}
      <section className="py-24 bg-f1-surface">
        <div className="f1-container">
          <SectionHeader
            eyebrow="Race Calendar"
            title="Upcoming Events"
            action={{ label: 'Full Calendar →', to: '/events' }}
          />
          <ScrollReveal
            target=".event-card"
            stagger={0.12}
            start="top 85%"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {featuredEvents.map((event) => (
              <TelemetryCard key={event.round} className="event-card p-8 min-h-[120px]">
                <div className="flex items-center justify-between">
                  <span className="f1-mono !text-f1-red/60">
                    RND {event.round}
                  </span>
                  <Badge label={event.type} variant="upcoming" />
                </div>
                <h3 className="f1-heading text-xl mt-3">{event.title}</h3>
                <p className="f1-eyebrow !text-f1-silver/50 mt-4">
                  {event.date}
                </p>
              </TelemetryCard>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 4: FEATURED PROJECTS */}
      <section className="py-24">
        <div className="f1-container">
          <SectionHeader
            eyebrow="Pit Lane"
            title="Featured Projects"
            action={{ label: 'All Projects →', to: '/projects' }}
          />
          <ScrollReveal
            target=".project-card"
            stagger={0.12}
            start="top 85%"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {featuredProjects.map((project) => (
              <TelemetryCard key={project.title} className="project-card p-8 min-h-[120px]">
                <span className="f1-eyebrow !text-f1-silver/40">
                  {project.tag}
                </span>
                <h3 className="f1-heading text-xl mt-3">{project.title}</h3>
                <p className="text-sm text-f1-silver font-light leading-relaxed mt-3">
                  {project.desc}
                </p>
              </TelemetryCard>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 5: JOIN CTA */}
      <section className="py-32 relative">
        <div className="f1-divider absolute top-0 left-0" />
        <div className="f1-divider absolute bottom-0 left-0" />
        <div className="absolute inset-0 bg-f1-red/[0.04]" />
        <ScrollReveal y={40} delay={0.1} className="relative f1-container text-center">
          <p className="f1-eyebrow mb-4">Ready?</p>
          <h2 className="f1-heading text-4xl md:text-5xl lg:text-6xl">
            Ready to Join the <span className="text-f1-red">Grid</span>?
          </h2>
          <p className="text-f1-silver font-light max-w-sm mx-auto mt-6 mb-10">
            Developers, designers, strategists and storytellers — there&apos;s a
            seat with your name on it.
          </p>
          <Link to="/join" className="btn-primary">
            Apply Now →
          </Link>
        </ScrollReveal>
      </section>
    </PageWrapper>
  )
}
