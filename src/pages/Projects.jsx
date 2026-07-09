import PageWrapper from '@/components/layout/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import Badge from '@/components/ui/Badge'
import ScrollReveal from '@/components/ui/ScrollReveal'

const PROJECTS = [
  {
    id: 'PRJ-001',
    tag: 'AI / ML',
    status: 'ACTIVE',
    title: 'Race Predictor',
    desc: 'ML model predicting F1 race outcomes using historical telemetry, qualifying pace, weather, and circuit characteristics.',
    techStack: ['Python', 'scikit-learn', 'Pandas'],
  },
  {
    id: 'PRJ-002',
    tag: 'DATA',
    status: 'ACTIVE',
    title: 'Telemetry Dashboard',
    desc: 'Live driver performance dashboard styled after actual F1 pit wall screens. Lap delta, tyre deg, sector splits, DRS usage.',
    techStack: ['React', 'D3.js', 'FastAPI'],
  },
  {
    id: 'PRJ-003',
    tag: 'STRATEGY',
    status: 'ACTIVE',
    title: 'Pit Stop Simulator',
    desc: 'Race strategy tool modelling tyre degradation curves, undercut windows, safety car probability, and VCS impact.',
    techStack: ['Python', 'NumPy', 'Streamlit'],
  },
  {
    id: 'PRJ-004',
    tag: 'AI / GAME',
    status: 'PLANNED',
    title: 'Fantasy F1 Optimizer',
    desc: 'AI-powered Fantasy F1 team selector trained on driver form, circuit fit, and historical points-per-cost data.',
    techStack: ['Python', 'TensorFlow', 'React'],
  },
  {
    id: 'PRJ-005',
    tag: 'OPEN SOURCE',
    status: 'PLANNED',
    title: 'F1 Data Toolkit',
    desc: 'Python library for scraping, cleaning, and analysing historical F1 timing and telemetry data. Ergast + FastF1 wrapper.',
    techStack: ['Python', 'FastF1', 'GitHub'],
  },
  {
    id: 'PRJ-006',
    tag: 'DESIGN',
    status: 'PLANNED',
    title: 'Livery Generator',
    desc: 'Interactive tool to design and preview custom F1 car liveries with Chitkara University branding.',
    techStack: ['React', 'Canvas API', 'Figma'],
  },
]

export default function Projects() {
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
          {/* Project grid */}
          <ScrollReveal
            target=".proj-card"
            stagger={0.1}
            start="top 85%"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {PROJECTS.map(({ id, tag, status, title, desc, techStack }) => (
              <div key={id} className="proj-card relative overflow-hidden">
                {/* Card content — blurred underneath */}
                <div className="telemetry-card p-6 select-none pointer-events-none">
                  <div className="flex items-start justify-between mb-5">
                    <span className="f1-mono !text-f1-silver/30">{id}</span>
                    <Badge label={status} variant={status.toLowerCase()} />
                  </div>
                  <span className="f1-eyebrow !text-f1-silver/50 mb-2 block">{tag}</span>
                  <h3 className="f1-heading text-xl mb-3">{title}</h3>
                  <p className="text-sm text-f1-silver leading-relaxed">{desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {techStack?.map(t => (
                      <span key={t} className="text-[10px] font-mono text-f1-silver/40 bg-f1-carbon px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Coming Soon overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{
                    backdropFilter:         'blur(10px)',
                    WebkitBackdropFilter:   'blur(10px)',
                    background:             'rgba(7, 7, 7, 0.55)',
                  }}
                >
                  <div className="text-center px-4">
                    <span className="f1-eyebrow !text-f1-green/60 !text-[10px] mb-2 block">
                      IN DEVELOPMENT
                    </span>
                    <p className="f1-heading text-xl text-f1-white tracking-widest">
                      COMING SOON
                    </p>
                    <div className="flex items-center justify-center gap-1.5 mt-3">
                      {[0, 1, 2].map(i => (
                        <span
                          key={i}
                          className="w-1 h-1 rounded-full bg-f1-red"
                          style={{ animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </PageWrapper>
  )
}
