// One-time seed script. Run with: npm run seed
// Reads DATABASE_URL from .env.local — point it at your Neon connection string.
import { db } from '../db/client.js'
import { events, projects, gallery, siteConfig } from '../db/schema.js'

const eventRows = [
  { round: 1, title: 'Watch Party — Bahrain GP', type: 'Community', status: 'completed', dateLabel: '16 Mar 2025', date: new Date('2025-03-16'), description: 'Live screening of the Bahrain Grand Prix with expert commentary and pub quiz.', location: 'Room 401, Block B', capacity: 0, registrationOpen: false },
  { round: 2, title: 'Simulator Tournament', type: 'Competition', status: 'completed', dateLabel: '12 Apr 2025', date: new Date('2025-04-12'), description: 'F1 sim racing tournament — 32 participants, 4 brackets, 1 champion.', location: 'Room 401, Block B', capacity: 32, registrationOpen: false },
  { round: 3, title: 'Tech Talk: Aerodynamics', type: 'Learning', status: 'upcoming', dateLabel: '24 May 2025', date: new Date('2025-05-24'), description: 'Deep dive into F1 aerodynamic principles, CFD simulation, and DRS mechanics.', location: 'Room 401, Block B', capacity: 0, registrationOpen: true },
  { round: 4, title: 'Data Analytics Workshop', type: 'Workshop', status: 'upcoming', dateLabel: '21 Jun 2025', date: new Date('2025-06-21'), description: 'Hands-on session analysing real F1 telemetry data using Python and FastF1.', location: 'Room 401, Block B', capacity: 0, registrationOpen: true },
  { round: 5, title: 'Strategy Hackathon', type: 'Hackathon', status: 'upcoming', dateLabel: '19 Jul 2025', date: new Date('2025-07-19'), description: '24-hour hackathon building F1 strategy tools, race predictors, and data visualisations.', location: 'Room 401, Block B', capacity: 0, registrationOpen: true },
  { round: 6, title: 'End of Season Showcase', type: 'Community', status: 'tbd', dateLabel: 'Nov 2025', date: new Date('2025-11-01'), description: 'Season retrospective, project demos, awards ceremony, and Season 2026 reveal.', location: 'TBD', capacity: 0, registrationOpen: false },
]

const projectRows = [
  { projectId: 'PRJ-001', title: 'Race Predictor', tag: 'AI / ML', status: 'active', order: 1, featured: true, description: 'ML model predicting F1 race outcomes using historical telemetry, qualifying pace, weather, and circuit characteristics.', techStack: ['Python', 'scikit-learn', 'Pandas'] },
  { projectId: 'PRJ-002', title: 'Telemetry Dashboard', tag: 'DATA', status: 'active', order: 2, featured: true, description: 'Live driver performance dashboard styled after actual F1 pit wall screens. Lap delta, tyre deg, sector splits, DRS usage.', techStack: ['React', 'D3.js', 'FastAPI'] },
  { projectId: 'PRJ-003', title: 'Pit Stop Simulator', tag: 'STRATEGY', status: 'active', order: 3, featured: true, description: 'Race strategy tool modelling tyre degradation curves, undercut windows, safety car probability, and VCS impact.', techStack: ['Python', 'NumPy', 'Streamlit'] },
  { projectId: 'PRJ-004', title: 'Fantasy F1 Optimizer', tag: 'AI / GAME', status: 'planned', order: 4, featured: false, description: 'AI-powered Fantasy F1 team selector trained on driver form, circuit fit, and historical points-per-cost data.', techStack: ['Python', 'TensorFlow', 'React'] },
  { projectId: 'PRJ-005', title: 'F1 Data Toolkit', tag: 'OPEN SOURCE', status: 'planned', order: 5, featured: false, description: 'Python library for scraping, cleaning, and analysing historical F1 timing and telemetry data. Ergast + FastF1 wrapper.', techStack: ['Python', 'FastF1', 'GitHub'] },
  { projectId: 'PRJ-006', title: 'Livery Generator', tag: 'DESIGN', status: 'planned', order: 6, featured: false, description: 'Interactive tool to design and preview custom F1 car liveries with Chitkara University branding.', techStack: ['React', 'Canvas API', 'Figma'] },
]

const galleryRows = [
  { title: 'Season Opener Watch Party', dateLabel: 'Mar 2025', category: 'Events', span: 'featured', order: 1 },
  { title: 'Sim Tournament Finals', dateLabel: 'Apr 2025', category: 'Events', span: 'normal', order: 2 },
  { title: 'Team Briefing', dateLabel: 'Feb 2025', category: 'Behind the Scenes', span: 'normal', order: 3 },
  { title: 'Hackathon — 2am', dateLabel: 'Jan 2025', category: 'Behind the Scenes', span: 'wide', order: 4 },
  { title: 'Pit Wall Setup', dateLabel: 'Mar 2025', category: 'Behind the Scenes', span: 'tall', order: 5 },
  { title: 'Tech Talk: Aero', dateLabel: 'Feb 2025', category: 'Workshops', span: 'normal', order: 6 },
  { title: 'Campus Drive', dateLabel: 'Sep 2024', category: 'Community', span: 'normal', order: 7 },
  { title: 'Data Workshop', dateLabel: 'Nov 2024', category: 'Workshops', span: 'normal', order: 8 },
  { title: 'End of Season 2024', dateLabel: 'Dec 2024', category: 'Events', span: 'wide', order: 9 },
  { title: 'Strategy Session', dateLabel: 'Oct 2024', category: 'Behind the Scenes', span: 'normal', order: 10 },
  { title: 'New Members Intro', dateLabel: 'Sep 2024', category: 'Community', span: 'normal', order: 11 },
  { title: 'Race Night', dateLabel: 'Aug 2024', category: 'Events', span: 'normal', order: 12 },
].map((item) => ({ ...item, uploadedBy: 'seed-script', featured: item.span === 'featured' }))

async function main() {
  await db.insert(events).values(eventRows)
  console.log(`Seeded ${eventRows.length} rows into events`)

  await db.insert(projects).values(projectRows)
  console.log(`Seeded ${projectRows.length} rows into projects`)

  await db.insert(gallery).values(galleryRows)
  console.log(`Seeded ${galleryRows.length} rows into gallery`)

  await db
    .insert(siteConfig)
    .values({
      id: 1,
      seasonYear: 2025,
      seasonActive: true,
      registrationOpen: true,
      stats: { members: 50, projects: 12, events: 6, seasons: 3 },
    })
    .onConflictDoNothing()
  console.log('Seeded site_config row (id=1)')

  console.log('Done. members and applications are left empty on purpose — seed members manually once the real roster is ready.')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
