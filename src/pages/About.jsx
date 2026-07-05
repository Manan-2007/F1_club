import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import PageWrapper from '@/components/layout/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import TelemetryCard from '@/components/ui/TelemetryCard'
import ScrollReveal from '@/components/ui/ScrollReveal'

const reasons = [
  {
    code: '01',
    title: 'Engineering at the Limit',
    body: 'Every part on an F1 car is optimised to thousandths of a millimetre. A lap is an engineering exam at 300 km/h.',
  },
  {
    code: '02',
    title: 'Data at Scale',
    body: 'Each car generates 3GB of telemetry per race. Every decision — tyre, pit, overtake — is data-driven.',
  },
  {
    code: '03',
    title: 'Strategy Under Pressure',
    body: 'Race strategy is game theory in real time. Undercuts, safety cars, and tyre windows decided in seconds.',
  },
  {
    code: '04',
    title: 'Innovation First',
    body: 'Technologies that started in F1 — carbon fibre, regenerative braking, semi-automatic gearboxes — now define modern life.',
  },
]

const timeline = [
  {
    year: 'Aug 2024',
    event: 'Club Founded',
    desc: 'F1 Chitkara established at Chitkara University with 12 founding members.',
  },
  {
    year: 'Sep 2024',
    event: 'First Watch Party',
    desc: 'Season opener screening — 40+ attendees, live commentary, and quiz.',
  },
  {
    year: 'Jan 2025',
    event: 'First Hackathon',
    desc: 'Internal motorsport-themed hackathon. 8 teams, 24 hours, 3 projects shipped.',
  },
  {
    year: 'Mar 2025',
    event: 'Website Launch',
    desc: "Official digital presence goes live — the site you're on right now.",
  },
]

export default function About() {
  const timelineRef = useRef(null)
  const lineRef = useRef(null)

  // Timeline — line draws top to bottom, entries slide in staggered
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: timelineRef.current, start: 'top 80%' },
      })
      gsap.from('.timeline-entry', {
        opacity: 0,
        x: -24,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: timelineRef.current, start: 'top 80%' },
      })
    }, timelineRef)
    return () => ctx.revert()
  }, [])

  return (
    <PageWrapper>
      <PageHero
        eyebrow="Our Story"
        title="About"
        titleAccent="F1 Chitkara"
        subtitle="Where motorsport culture meets engineering depth."
      />

      {/* The Story */}
      <section className="py-16">
        <div className="f1-container grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal
            target=".reveal-p"
            stagger={0.15}
            y={30}
            className="flex flex-col gap-6"
          >
            <p className="reveal-p text-f1-silver font-light leading-relaxed text-base md:text-lg">
              F1 Chitkara was founded in 2024 by a group of students convinced
              that Formula 1 was the world&apos;s best engineering classroom —
              20 races a year of live aerodynamics, real-time data science, and
              decision-making under pressure.
            </p>
            <p className="reveal-p text-f1-silver font-light leading-relaxed text-base md:text-lg">
              We study the sport the way engineers do: looking at the data, the
              regulations, the trade-offs. Then we build things with what we
              learn — dashboards, predictors, simulators.
            </p>
            <p className="reveal-p text-f1-silver font-light leading-relaxed text-base md:text-lg">
              Whether you&apos;re here for the races, the code, the design, or
              the community, there is a seat on our grid.
            </p>
          </ScrollReveal>

          <ScrollReveal
            target=".reveal-card"
            stagger={0.15}
            className="flex flex-col gap-6"
          >
            <TelemetryCard className="reveal-card p-8">
              <span className="f1-eyebrow">Vision</span>
              <p className="text-f1-silver font-light leading-relaxed mt-4">
                To be India&apos;s premier student community where motorsport
                engineering meets real technical innovation.
              </p>
            </TelemetryCard>
            <TelemetryCard className="reveal-card p-8">
              <span className="f1-eyebrow">Mission</span>
              <p className="text-f1-silver font-light leading-relaxed mt-4">
                Build real projects, grow real skills, and celebrate the
                culture of the fastest sport on the planet.
              </p>
            </TelemetryCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Why F1? */}
      <section className="py-16 bg-f1-surface">
        <div className="f1-container">
          <SectionHeader eyebrow="The Case" title="Why Formula 1?" />
          <ScrollReveal
            target=".reason-card"
            stagger={0.12}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {reasons.map((reason) => (
              <TelemetryCard key={reason.code} className="reason-card p-6">
                <span className="f1-mono !text-f1-red/40">{reason.code}</span>
                <h3 className="f1-heading text-lg mt-3">{reason.title}</h3>
                <p className="text-sm text-f1-silver font-light leading-relaxed mt-3">
                  {reason.body}
                </p>
              </TelemetryCard>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="f1-container">
          <SectionHeader eyebrow="Journey" title="How We Got Here" />
          <div ref={timelineRef} className="relative overflow-hidden">
            <span
              ref={lineRef}
              className="absolute left-[5px] top-2 bottom-10 w-px bg-white/10"
            />
            {timeline.map((item) => (
              <div key={item.event} className="timeline-entry relative flex gap-8 pb-12">
                <span className="w-3 h-3 rounded-full bg-f1-red shrink-0 mt-1 relative z-10" />
                <div>
                  <span className="f1-mono">{item.year}</span>
                  <h3 className="f1-heading text-lg mt-2">{item.event}</h3>
                  <p className="text-sm text-f1-silver font-light leading-relaxed mt-2 max-w-xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
