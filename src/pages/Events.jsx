import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import PageWrapper from '@/components/layout/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import TelemetryCard from '@/components/ui/TelemetryCard'
import Badge from '@/components/ui/Badge'

const EVENTS = [
  {
    round:  '01',
    title:  'Watch Party — Dutch GP',
    desc:   'Live screening of the Dutch Grand Prix with expert commentary and race analysis.',
    type:   'Community',
    status: 'upcoming',
    date:   'Aug 2026',
  },
  {
    round:  '02',
    title:  'F1 Carnival',
    desc:   'A celebration of Formula 1 culture — exhibitions, sim racing, quiz night, and more.',
    type:   'Festival',
    status: 'upcoming',
    date:   'Sep 2026',
  },
  {
    round:  '03',
    title:  'Tech Talk',
    desc:   'Deep dive into F1 aerodynamics, data science, and engineering principles.',
    type:   'Learning',
    status: 'upcoming',
    date:   'Oct 2026',
  },
  {
    round:  '04',
    title:  'Round 4',
    desc:   '',
    type:   '',
    status: 'coming-soon',
    date:   '',
  },
  {
    round:  '05',
    title:  'Round 5',
    desc:   '',
    type:   '',
    status: 'coming-soon',
    date:   '',
  },
  {
    round:  '06',
    title:  'Round 6',
    desc:   '',
    type:   '',
    status: 'coming-soon',
    date:   '',
  },
]

export default function Events() {
  const sectionRef = useRef(null)
  const progressRef = useRef(null)
  const listRef = useRef(null)

  const completedRounds = EVENTS.filter((e) => e.status === 'completed').length

  useEffect(() => {
    const ctx = gsap.context(() => {
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
        title="2026"
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
                {completedRounds} of {EVENTS.length} Rounds Complete
              </span>
            </div>
            <div className="relative h-1 bg-f1-surface">
              {/* Progress filled bar — 0% complete */}
              <div
                ref={progressRef}
                className="absolute inset-0 bg-f1-red"
                style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
              />
              <div className="absolute inset-0 flex items-center justify-between">
                {EVENTS.map((event) => (
                  <span
                    key={event.round}
                    className="progress-dot w-3 h-3 md:w-2.5 md:h-2.5 rounded-full bg-f1-carbon border border-white/20"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Events list */}
          <div ref={listRef} className="flex flex-col gap-3">
            {EVENTS.map((event) => {
              if (event.status === 'coming-soon') {
                return (
                  <div
                    key={event.round}
                    className="event-row relative overflow-hidden"
                  >
                    {/* Ghost card — blurred */}
                    <div
                      className="telemetry-card p-5 select-none pointer-events-none"
                      style={{ opacity: 0.4 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="f1-mono !text-f1-red">RND {event.round}</span>
                      </div>
                      <div className="h-4 bg-f1-carbon rounded-sm w-48 mb-2" />
                      <div className="h-3 bg-f1-carbon/60 rounded-sm w-64" />
                    </div>

                    {/* Coming soon overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        backdropFilter:       'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        background:           'rgba(7,7,7,0.5)',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="f1-mono !text-f1-red/60 text-sm">RND {event.round}</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-f1-silver/40">
                          — Coming Soon
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }

              // Normal event row for rounds 1–3
              return (
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
                      <Badge label={event.status} variant={event.status} />
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="f1-heading text-base sm:text-lg">
                        {event.title}
                      </h3>
                      <span className="hidden sm:inline-flex">
                        <Badge label={event.status} variant={event.status} />
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
              )
            })}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
