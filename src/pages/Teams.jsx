import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageWrapper from '@/components/layout/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import TelemetryCard from '@/components/ui/TelemetryCard'
import ScrollReveal from '@/components/ui/ScrollReveal'

const departments = [
  { code: 'P1', name: 'Core Team', role: 'Leadership & Vision' },
  { code: 'P2', name: 'Technical', role: 'Engineering & Development' },
  { code: 'P3', name: 'Data & AI', role: 'Analytics & Machine Learning' },
  { code: 'P4', name: 'Design', role: 'UI/UX & Brand Identity' },
  { code: 'P5', name: 'Media', role: 'Content & Race Coverage' },
  { code: 'P6', name: 'Events & Ops', role: 'Planning & Execution' },
]

const gridSlots = [
  { position: 'P1', role: 'Developer — Full Stack', open: false },
  { position: 'P2', role: 'Developer — Frontend', open: true },
  { position: 'P3', role: 'Designer — UI/UX', open: false },
  { position: 'P4', role: 'Designer — Motion', open: true },
  { position: 'P5', role: 'Data Analyst', open: false },
  { position: 'P6', role: 'ML Engineer', open: true },
  { position: 'P7', role: 'Media — Video', open: true },
  { position: 'P8', role: 'Media — Photography', open: true },
  { position: 'P9', role: 'Strategist', open: false },
  { position: 'P10', role: 'Event Manager', open: true },
  { position: 'P11', role: 'Social Media', open: true },
  { position: 'P12', role: 'Operations', open: false },
]

function GridSlot({ slot, className = '' }) {
  return (
    <div
      className={`${className} p-5 border ${
        slot.open
          ? 'border-dashed border-white/20 shadow-[0_0_20px_rgba(0,255,153,0.04)]'
          : 'border-white/10 bg-f1-surface'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="f1-mono !text-f1-red">{slot.position}</span>
        {slot.open && (
          <span className="text-[10px] uppercase tracking-widest text-f1-green border border-f1-green/30 px-2 py-0.5">
            OPEN
          </span>
        )}
      </div>
      <h3 className="f1-heading text-sm mt-3">{slot.role}</h3>
    </div>
  )
}

export default function Teams() {
  const [membersByDept, setMembersByDept] = useState({})
  const gridRef = useRef(null)
  const leftColumn = gridSlots.filter((_, i) => i % 2 === 0)
  const rightColumn = gridSlots.filter((_, i) => i % 2 === 1)

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/members')
      const rows = await res.json()
      const grouped = {}
      rows.forEach((member) => {
        if (!grouped[member.departmentCode]) grouped[member.departmentCode] = []
        grouped[member.departmentCode].push(member)
      })
      setMembersByDept(grouped)
    }
    load()
  }, [])

  // Layout only settles once the API data renders, so re-measure ScrollTrigger.
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => clearTimeout(t)
  }, [membersByDept])

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
          {departments.map((dept) => (
            <TelemetryCard key={dept.code} className="dept-card p-6">
              <div className="flex items-center justify-between">
                <span className="f1-mono !text-f1-red">{dept.code}</span>
                <span className="text-[10px] uppercase tracking-widest text-f1-silver/30">
                  Dept
                </span>
              </div>
              <h3 className="f1-heading text-xl mt-3">{dept.name}</h3>
              <p className="text-xs uppercase tracking-widest text-f1-silver mt-2">
                {dept.role}
              </p>
              <div className="border-t border-white/5 mt-4 pt-4 flex flex-col gap-3">
                {(membersByDept[dept.code] ?? []).length > 0
                  ? membersByDept[dept.code].map((member) => (
                      <div key={member.name} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-f1-carbon border border-white/10" />
                        <span className="text-xs text-f1-silver">
                          {member.name}
                        </span>
                      </div>
                    ))
                  : [1, 2, 3].map((n) => (
                      <div key={n} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-f1-carbon border border-white/10" />
                        <span className="text-xs text-f1-silver/30">
                          Member #{n}
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
            subtitle="The positions we're filling for Season 2025."
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

            {/* Single-column list on mobile — keeps P1→P12 grid order */}
            <div className="flex flex-col gap-3 sm:hidden">
              {gridSlots.map((slot) => (
                <div
                  key={slot.position}
                  className={`grid-slot-left p-4 flex items-center gap-4 border ${
                    slot.open
                      ? 'border-dashed border-white/20'
                      : 'border-white/10 bg-f1-surface'
                  }`}
                >
                  <span className="f1-mono !text-f1-red w-9 shrink-0">
                    {slot.position}
                  </span>
                  <div className="flex-1 flex items-center justify-between gap-3">
                    <h3 className="f1-heading text-sm">{slot.role}</h3>
                    {slot.open && (
                      <span className="text-[10px] uppercase tracking-widest text-f1-green border border-f1-green/30 px-2 py-0.5 shrink-0">
                        OPEN
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
