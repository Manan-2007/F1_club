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

const TIMELINE = [
  {
    month:  'Apr 2026',
    event:  'Club Founded',
    desc:   'F1 Chitkara established at Chitkara University — 16 founding members, one shared obsession.',
    status: 'done',
  },
  {
    month:  'May 2026',
    event:  'Club Promotion',
    desc:   'Official launch campaign across campus — posters, reels, and the first wave of awareness.',
    status: 'done',
  },
  {
    month:  'May 2026',
    event:  'Hiring Round',
    desc:   'Open applications for founding members across Technical, Media, Graphics, Content, and Operations.',
    status: 'done',
  },
  {
    month:  'Jul 2026',
    event:  'Website Launch',
    desc:   'The official F1 Chitkara digital experience goes live — the site you are on right now.',
    status: 'done',
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
            className="flex flex-col"
          >
            <p className="reveal-p text-f1-silver leading-relaxed mb-5 text-base md:text-lg">
              F1 Chitkara was founded in 2026 by a group of students convinced
              that Formula 1 was the world&apos;s best engineering classroom —
              24 races a year of live aerodynamics, real-time data science, and
              decision-making under pressure.
            </p>
            <p className="reveal-p text-f1-silver leading-relaxed mb-5">
              We study the sport the way engineers do: looking at the data, the
              regulations, the trade-offs. Then we build things with what we
              learn — dashboards, predictors, simulators.
            </p>
            <p className="reveal-p text-f1-silver leading-relaxed mb-8">
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

          <div ref={timelineRef} className="relative flex flex-col gap-0 overflow-hidden">

            {/* Vertical line — runs full height */}
            <div
              ref={lineRef}
              className="absolute left-[5px] top-0 bottom-0 w-px"
              style={{
                background: 'linear-gradient(to bottom, #E10600 80%, transparent 100%)',
              }}
            />

            {/* Completed timeline entries */}
            {TIMELINE.map(({ month, event, desc }, i) => (
              <div
                key={i}
                className="timeline-entry flex gap-8 pb-10 relative"
              >
                {/* Dot */}
                <div className="relative shrink-0 mt-1.5">
                  <div className="w-3 h-3 rounded-full bg-f1-red border-2 border-f1-bg relative z-10" />
                </div>

                {/* Content */}
                <div>
                  <span className="f1-mono text-f1-green text-xs mb-1 block">
                    {month}
                  </span>
                  <h3 className="f1-heading text-lg mb-1">{event}</h3>
                  <p className="text-sm text-f1-silver leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}

            {/* "Many more to come" — animated continuation */}
            <div className="timeline-entry flex gap-8 pb-2 relative">
              {/* Pulsing dot — signals ongoing/future */}
              <div className="relative shrink-0 mt-1.5">
                <div className="w-3 h-3 rounded-full border-2 border-f1-red/50 relative z-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-f1-red animate-pulse-slow" />
                </div>
              </div>

              {/* Content */}
              <div className="pb-4">
                <span className="f1-mono !text-f1-silver/40 text-xs mb-1 block">
                  2026 — 2027
                </span>
                <h3 className="f1-heading text-lg mb-3 text-f1-silver/60">
                  Many More to Come
                </h3>
                <p className="text-sm text-f1-silver/50 leading-relaxed max-w-xs">
                  Watch parties, hackathons, tech talks, industry visits,
                  and a lot more racing — the season has just begun.
                </p>

                {/* Fading dotted line — visually suggests the list continues */}
                <div className="flex flex-col gap-2 mt-5">
                  {[
                    'F1 Watch Parties',
                    'Technical Workshops',
                    'Industry Collaborations',
                    'Project Launches',
                  ].map((item, i) => (
                    <div
                      key={item}
                      className="flex items-center gap-2"
                      style={{ opacity: 1 - i * 0.2 }}
                    >
                      <div className="w-1 h-1 rounded-full bg-f1-red/40 shrink-0" />
                      <span className="text-xs text-f1-silver/30 tracking-wide">
                        {item}
                      </span>
                    </div>
                  ))}
                  {/* Final fade-out row */}
                  <div className="flex items-center gap-2 opacity-10">
                    <div className="w-1 h-1 rounded-full bg-f1-red/20 shrink-0" />
                    <span className="text-xs text-f1-silver/20 tracking-wide">
                      And more...
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
