import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import PageWrapper from '@/components/layout/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import TelemetryCard from '@/components/ui/TelemetryCard'
import Badge from '@/components/ui/Badge'

const events = [
  {
    round: '01',
    title: 'Watch Party — Bahrain GP',
    status: 'COMPLETED',
    variant: 'completed',
    type: 'Community',
    date: '16 Mar 2025',
    desc: 'Live screening of the Bahrain Grand Prix with expert commentary and pub quiz.',
  },
  {
    round: '02',
    title: 'Simulator Tournament',
    status: 'COMPLETED',
    variant: 'completed',
    type: 'Competition',
    date: '12 Apr 2025',
    desc: 'F1 sim racing tournament — 32 participants, 4 brackets, 1 champion.',
  },
  {
    round: '03',
    title: 'Tech Talk: Aerodynamics',
    status: 'UPCOMING',
    variant: 'upcoming',
    type: 'Learning',
    date: '24 May 2025',
    desc: 'Deep dive into F1 aerodynamic principles, CFD simulation, and DRS mechanics.',
  },
  {
    round: '04',
    title: 'Data Analytics Workshop',
    status: 'UPCOMING',
    variant: 'upcoming',
    type: 'Workshop',
    date: '21 Jun 2025',
    desc: 'Hands-on session analysing real F1 telemetry data using Python and FastF1.',
  },
  {
    round: '05',
    title: 'Strategy Hackathon',
    status: 'UPCOMING',
    variant: 'upcoming',
    type: 'Hackathon',
    date: '19 Jul 2025',
    desc: '24-hour hackathon building F1 strategy tools, race predictors, and data visualisations.',
  },
  {
    round: '06',
    title: 'End of Season Showcase',
    status: 'TBD',
    variant: 'tbd',
    type: 'Community',
    date: 'Nov 2025',
    desc: 'Season retrospective, project demos, awards ceremony, and Season 2026 reveal.',
  },
]

const COMPLETED_ROUNDS = 2

export default function Events() {
  const sectionRef = useRef(null)
  const progressRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress fill sweeps in from the left
      gsap.from(progressRef.current, {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: progressRef.current, start: 'top 85%' },
      })
      // Dots pop in along the track
      gsap.from('.progress-dot', {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: progressRef.current, start: 'top 85%' },
      })
      // Event rows slide in from the left
      gsap.from('.event-row', {
        opacity: 0,
        x: -40,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <PageWrapper>
      <PageHero
        eyebrow="Race Calendar"
        title="2025"
        titleAccent="Season"
        subtitle="Six rounds. Watch parties, tournaments, workshops, and hackathons."
      />

      <section ref={sectionRef} className="pb-24">
        <div className="f1-container">
          {/* Season progress bar */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-4">
              <span className="f1-eyebrow">Season Progress</span>
              <span className="f1-mono">
                {COMPLETED_ROUNDS} of {events.length} Rounds Complete
              </span>
            </div>
            <div className="relative h-1 bg-f1-surface">
              <div
                ref={progressRef}
                className="absolute inset-y-0 left-0 w-[33%] bg-f1-red"
              />
              <div className="absolute inset-0 flex items-center justify-between">
                {events.map((event, i) => (
                  <span
                    key={event.round}
                    className={`progress-dot w-3 h-3 md:w-2.5 md:h-2.5 rounded-full ${
                      i < COMPLETED_ROUNDS
                        ? 'bg-f1-red'
                        : 'bg-f1-carbon border border-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Events list */}
          <div ref={listRef} className="flex flex-col gap-3">
            {events.map((event) => (
              <TelemetryCard
                key={event.round}
                className="event-row flex flex-col sm:flex-row items-start gap-3 sm:gap-6 p-5 sm:p-6"
              >
                {/* Mobile: round + badge on one line. sm+: round in its own column */}
                <div className="shrink-0 w-full sm:w-20 flex items-center justify-between sm:block">
                  <div>
                    <p className="f1-mono !text-f1-red">RND {event.round}</p>
                    <p className="hidden sm:block text-[10px] uppercase tracking-widest text-f1-silver/30 mt-1">
                      Round {event.round}
                    </p>
                  </div>
                  <span className="sm:hidden">
                    <Badge label={event.status} variant={event.variant} />
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="f1-heading text-base sm:text-lg">
                      {event.title}
                    </h3>
                    <span className="hidden sm:inline-flex">
                      <Badge label={event.status} variant={event.variant} />
                    </span>
                  </div>
                  <p className="text-sm text-f1-silver font-light leading-relaxed mt-1">
                    {event.desc}
                  </p>
                </div>
                <div className="shrink-0 w-full sm:w-auto flex items-center justify-between sm:block sm:text-right">
                  <p className="f1-eyebrow !text-f1-silver/50 !text-[10px]">
                    {event.type}
                  </p>
                  <p className="text-sm text-f1-silver sm:mt-0.5">{event.date}</p>
                </div>
              </TelemetryCard>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
