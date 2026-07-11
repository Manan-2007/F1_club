import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import PageWrapper from '@/components/layout/PageWrapper'
import HeroSection from '@/components/hero/HeroSection'
import SectionHeader from '@/components/ui/SectionHeader'
import TelemetryCard from '@/components/ui/TelemetryCard'
import Badge from '@/components/ui/Badge'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useCountUp } from '@/hooks/useCountUp'

const STATS = [
  { value: '16+', label: 'Active Members'    },
  { value: '12',  label: 'Projects Planned'  },
  { value: '6',   label: 'Events Upcoming'   },
  { value: '1',   label: 'Season Running'    },
]

const FEATURED_EVENTS = [
  { round: '01', title: 'Watch Party',  type: 'Community',   date: 'Aug 2026' },
  { round: '02', title: 'F1 Carnival',  type: 'Festival',    date: 'Sep 2026' },
  { round: '03', title: 'Tech Talk',    type: 'Learning',    date: 'Oct 2026' },
]

function StatValue({ value }) {
  const { ref, display } = useCountUp(value, value.replace(/[0-9]/g, ''))
  return (
    <span ref={ref} className="text-5xl font-bold text-f1-white">
      {display}
    </span>
  )
}

export default function Home() {
  const introRef = useRef(null)

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
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-block">
                <StatValue value={stat.value} />
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
            {FEATURED_EVENTS.map((event) => (
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

      {/* SECTION 4: JOIN CTA */}
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
