import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import PageWrapper from '@/components/layout/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import TelemetryCard from '@/components/ui/TelemetryCard'
import ScrollReveal from '@/components/ui/ScrollReveal'

const DEPARTMENTS = [
  {
    code: 'P1',
    name: 'Core Team',
    role: 'Leadership & Vision',
    color: '!text-f1-red',
    showOpenSlots: false,
    members: [
      'Karunika Chaudhary',
      'Anayat Virk',
      'Kheetansh Bansal',
    ],
    maxSlots: 3,
  },
  {
    code: 'P2',
    name: 'Technical',
    role: 'Engineering & Development',
    color: '!text-f1-red',
    showOpenSlots: true,
    members: [
      'Manan Kochhar',
      'Swagat Grover',
    ],
    maxSlots: 4,
  },
  {
    code: 'P3',
    name: 'Media',
    role: 'Content & Race Coverage',
    color: '!text-f1-red',
    showOpenSlots: true,
    members: [
      'Arshpreet Kaur',
      'Aditya Chandhiok',
    ],
    maxSlots: 4,
  },
  {
    code: 'P4',
    name: 'Graphics',
    role: 'Visual Design & Brand Identity',
    color: '!text-f1-red',
    showOpenSlots: true,
    members: [
      'Jaisgurnoor Singh',
      'Keshav Nabh',
      'Vansh Kalra',
    ],
    maxSlots: 4,
  },
  {
    code: 'P5',
    name: 'Content & Video Editing',
    role: 'Storytelling, Scripts & Video Production',
    color: '!text-f1-red',
    showOpenSlots: true,
    members: [
      'Aditya Minhas',
      'Siddhesh Ramekar',
      'Arnav Sharma',
      'Jashandeep Singh',
    ],
    maxSlots: 4,
  },
  {
    code: 'P6',
    name: 'Events & Ops',
    role: 'Planning & Execution',
    color: '!text-f1-red',
    showOpenSlots: true,
    members: [
      'Ansh',
    ],
    maxSlots: 4,
  },
]

const ALL_GRID_SLOTS = [
  { position: 'P1',  role: 'Team Lead',                status: 'FILLED' },
  { position: 'P2',  role: 'Technical Lead',            status: 'FILLED' },
  { position: 'P3',  role: 'Full Stack Developer',      status: 'FILLED' },
  { position: 'P4',  role: 'Media Lead',                status: 'FILLED' },
  { position: 'P5',  role: 'Content Writer',            status: 'FILLED' },
  { position: 'P6',  role: 'Graphics Lead',             status: 'FILLED' },
  { position: 'P7',  role: 'Video Editor',              status: 'FILLED' },
  { position: 'P8',  role: 'Graphic Designer',          status: 'FILLED' },
  { position: 'P9',  role: 'Race Correspondent',        status: 'FILLED' },
  { position: 'P10', role: 'Events Lead',               status: 'FILLED' },
  { position: 'P11', role: 'Social Media Manager',      status: 'FILLED' },
  { position: 'P12', role: 'Content Creator',           status: 'FILLED' },
  { position: 'P13', role: 'Photographer',              status: 'FILLED' },
  { position: 'P14', role: 'Data Analyst',              status: 'FILLED' },
  { position: 'P15', role: 'Operations Manager',        status: 'FILLED' },
  { position: 'P16', role: 'Developer',                 status: 'OPEN'   },
  { position: 'P17', role: 'Graphic Designer',          status: 'OPEN'   },
  { position: 'P18', role: 'Video Editor',              status: 'OPEN'   },
  { position: 'P19', role: 'Content Writer',            status: 'OPEN'   },
  { position: 'P20', role: 'Race Analyst',              status: 'OPEN'   },
  { position: 'P21', role: 'Event Coordinator',         status: 'OPEN'   },
  { position: 'P22', role: 'Media Producer',            status: 'OPEN'   },
]

function GridSlot({ slot, className = '' }) {
  return (
    <div
      className={`${className} p-4 rounded-sm flex items-center gap-3 ${
        slot.status === 'OPEN'
          ? 'border border-dashed border-f1-green/30 bg-f1-surface/30'
          : 'telemetry-card'
      }`}
    >
      <span className={`f1-mono text-sm shrink-0 ${
        slot.status === 'OPEN' ? '!text-f1-green/50' : '!text-f1-red'
      }`}>
        {slot.position}
      </span>
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-semibold uppercase tracking-wide truncate ${
          slot.status === 'OPEN' ? 'text-f1-silver/30' : 'text-f1-white'
        }`}>
          {slot.role}
        </p>
      </div>
      {slot.status === 'OPEN' && (
        <span className="text-[9px] uppercase tracking-widest text-f1-green border border-f1-green/30 px-1.5 py-0.5 shrink-0">
          OPEN
        </span>
      )}
    </div>
  )
}

export default function Teams() {
  const gridRef = useRef(null)
  const leftColumn = ALL_GRID_SLOTS.filter((_, i) => i % 2 === 0)
  const rightColumn = ALL_GRID_SLOTS.filter((_, i) => i % 2 === 1)

  // Starting grid — columns animate in from opposite sides
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.grid-slot-left', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      })
      gsap.from('.grid-slot-right', {
        opacity: 0,
        x: 30,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      })
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <PageWrapper>
      <PageHero
        eyebrow="The Grid"
        title="Meet the"
        titleAccent="Team"
        subtitle="Every championship is won by specialists. Meet ours."
      />

      {/* Departments */}
      <section className="py-16">
        <ScrollReveal
          target=".dept-card"
          stagger={0.08}
          start="top 85%"
          className="f1-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {DEPARTMENTS.map(({ code, name, role, color, showOpenSlots, members, maxSlots }) => (
            <TelemetryCard key={code} className="dept-card p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <span className={`f1-mono ${color}`}>{code}</span>
                <span className="text-[10px] uppercase tracking-widest text-f1-silver/30">Dept</span>
              </div>
              <h3 className="f1-heading text-xl mb-1">{name}</h3>
              <p className="text-xs text-f1-silver uppercase tracking-widest mb-4">{role}</p>

              {/* Members list */}
              <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
                {/* Filled member slots */}
                {members.map((member) => (
                  <div key={member} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-f1-carbon border border-white/15 flex items-center justify-center shrink-0">
                      <span className="text-[8px] font-mono text-f1-silver/60">
                        {member.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs text-f1-white/80">{member}</span>
                  </div>
                ))}

                {/* Open slots — only for non-core teams */}
                {showOpenSlots && Array.from({ length: maxSlots - members.length }).map((_, i) => (
                  <div key={`open-${i}`} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border border-f1-green/40 flex items-center justify-center shrink-0">
                      <span className="text-[10px] text-f1-green">+</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-f1-green/70 border border-f1-green/30 px-2 py-0.5 rounded-sm">
                      Open
                    </span>
                  </div>
                ))}
              </div>
            </TelemetryCard>
          ))}
        </ScrollReveal>
      </section>

      {/* Starting Grid */}
      <section className="py-16 bg-f1-surface">
        <div className="f1-container">
          <SectionHeader
            eyebrow="Formation"
            title="Starting Grid"
            subtitle="The positions we're filling for Season 2026."
          />
          <div ref={gridRef} className="max-w-3xl">
            {/* Staggered two-column grid — sm and up only */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-x-6">
              <div className="flex flex-col gap-6">
                {leftColumn.map((slot) => (
                  <GridSlot
                    key={slot.position}
                    slot={slot}
                    className="grid-slot-left"
                  />
                ))}
              </div>
              <div className="flex flex-col gap-6 sm:mt-16">
                {rightColumn.map((slot) => (
                  <GridSlot
                    key={slot.position}
                    slot={slot}
                    className="grid-slot-right"
                  />
                ))}
              </div>
            </div>

            {/* Single-column list on mobile — keeps P1→P22 grid order */}
            <div className="flex flex-col gap-3 sm:hidden">
              {ALL_GRID_SLOTS.map((slot) => (
                <GridSlot
                  key={slot.position}
                  slot={slot}
                  className="grid-slot-left"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
