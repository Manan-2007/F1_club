import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import PageWrapper from '@/components/layout/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import TelemetryCard from '@/components/ui/TelemetryCard'
import Badge from '@/components/ui/Badge'
import ScrollReveal from '@/components/ui/ScrollReveal'

const filters = ['All', 'AI/ML', 'Data', 'Strategy', 'Design', 'Open Source']

const projects = [
  {
    id: 'PRJ-001',
    tag: 'AI / ML',
    status: 'ACTIVE',
    variant: 'active',
    title: 'Race Predictor',
    desc: 'ML model predicting F1 race outcomes using historical telemetry, qualifying pace, weather, and circuit characteristics.',
    tech: ['Python', 'scikit-learn', 'Pandas'],
  },
  {
    id: 'PRJ-002',
    tag: 'DATA',
    status: 'ACTIVE',
    variant: 'active',
    title: 'Telemetry Dashboard',
    desc: 'Live driver performance dashboard styled after actual F1 pit wall screens. Lap delta, tyre deg, sector splits, DRS usage.',
    tech: ['React', 'D3.js', 'FastAPI'],
  },
  {
    id: 'PRJ-003',
    tag: 'STRATEGY',
    status: 'ACTIVE',
    variant: 'active',
    title: 'Pit Stop Simulator',
    desc: 'Race strategy tool modelling tyre degradation curves, undercut windows, safety car probability, and VCS impact.',
    tech: ['Python', 'NumPy', 'Streamlit'],
  },
  {
    id: 'PRJ-004',
    tag: 'AI / GAME',
    status: 'PLANNED',
    variant: 'planned',
    title: 'Fantasy F1 Optimizer',
    desc: 'AI-powered Fantasy F1 team selector trained on driver form, circuit fit, and historical points-per-cost data.',
    tech: ['Python', 'TensorFlow', 'React'],
  },
  {
    id: 'PRJ-005',
    tag: 'OPEN SOURCE',
    status: 'PLANNED',
    variant: 'planned',
    title: 'F1 Data Toolkit',
    desc: 'Python library for scraping, cleaning, and analysing historical F1 timing and telemetry data. Ergast + FastF1 wrapper.',
    tech: ['Python', 'FastF1', 'GitHub'],
  },
  {
    id: 'PRJ-006',
    tag: 'DESIGN',
    status: 'PLANNED',
    variant: 'planned',
    title: 'Livery Generator',
    desc: 'Interactive tool to design and preview custom F1 car liveries with Chitkara University branding.',
    tech: ['React', 'Canvas API', 'Figma'],
  },
]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const filterRef = useRef(null)

  // Filter bar — stagger in on mount (visible immediately below hero)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.filter-btn', {
        opacity: 0,
        y: -12,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, filterRef)
    return () => ctx.revert()
  }, [])

  return (
    <PageWrapper>
      <PageHero
        eyebrow="Pit Lane"
        title="Our"
        titleAccent="Projects"
        subtitle="Real work, real data, real code — built by the F1 Chitkara technical team."
      />

      <section className="pb-24">
        <div className="f1-container">
          {/* Filter bar — visual only in Phase 2 */}
          <div
            ref={filterRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-10 -mx-5 px-5 md:mx-0 md:px-0 md:mb-12 md:flex-wrap md:overflow-visible"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`filter-btn shrink-0 whitespace-nowrap text-xs uppercase tracking-widest px-4 py-2 transition-colors duration-300 ${
                  activeFilter === filter
                    ? 'bg-f1-red text-f1-white'
                    : 'telemetry-card text-f1-silver'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <ScrollReveal
            target=".proj-card"
            stagger={0.1}
            start="top 85%"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {projects.map((project) => (
              <TelemetryCard
                key={project.id}
                className="proj-card p-6 flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <span className="f1-mono !text-f1-silver/30">
                    {project.id}
                  </span>
                  <Badge label={project.status} variant={project.variant} />
                </div>
                <span className="f1-eyebrow !text-f1-silver/50 mt-4">
                  {project.tag}
                </span>
                <h3 className="f1-heading text-xl mt-2">{project.title}</h3>
                <p className="text-sm text-f1-silver font-light leading-relaxed mt-3">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto pt-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono text-f1-silver/40 bg-f1-carbon px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </TelemetryCard>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </PageWrapper>
  )
}
