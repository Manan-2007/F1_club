# F1 Chitkara — Database & API Reference

Backend partner reference document. Covers the Postgres (Neon) schema, the
Vercel API routes that expose it, and how the frontend consumes them.

---

## Overview

- Database: [Neon](https://neon.tech) (serverless Postgres)
- Schema/migrations: [Drizzle ORM](https://orm.drizzle.team) — schema lives in `db/schema.js`
- API layer: Vercel serverless functions under `api/` — the browser never
  talks to Postgres directly (unlike Firestore, Postgres has no
  client-side-safe query layer)
- Driver: `@neondatabase/serverless` (HTTP-based, works well in serverless
  functions without exhausting connection limits)

---

## Tables

### `events`

One row per race calendar round.

| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| round | integer | 1, 2, 3... |
| title | text | "Watch Party — Bahrain GP" |
| description | text | |
| type | text | "Community" \| "Competition" \| "Learning" \| "Workshop" \| "Hackathon" |
| status | text | "upcoming" \| "completed" \| "tbd" |
| date | timestamptz | |
| date_label | text | human-readable, e.g. "16 Mar 2025" |
| location | text | |
| capacity | integer | 0 = unlimited |
| registration_open | boolean | |
| registration_url | text \| null | |
| cover_image | text \| null | |
| created_at / updated_at | timestamptz | |

### `projects`

| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| project_id | text unique | "PRJ-001" — display identifier |
| title | text | |
| description | text | |
| long_description | text \| null | |
| tag | text | "AI / ML" \| "DATA" \| "STRATEGY" \| "OPEN SOURCE" \| "DESIGN" |
| status | text | "active" \| "planned" \| "archived" |
| tech_stack | text[] | Postgres array column |
| github_url / live_url / cover_image | text \| null | |
| featured | boolean | shown on Home page |
| order | integer | display order |
| created_at / updated_at | timestamptz | |

### `members`

| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| name | text | |
| role | text | "Full Stack Developer" |
| department | text | "Technical" \| "Core Team" \| "Data & AI" \| "Design" \| "Media" \| "Events & Ops" |
| department_code | text | "P1".."P6" |
| year | text | "2nd Year" |
| bio | text \| null | |
| avatar | text \| null | |
| social | jsonb | `{ github, linkedin, instagram }` |
| is_lead / is_founder | boolean | |
| joined_at | timestamptz | |
| active | boolean | false = alumni, hidden by default |
| order | integer | display order within department |
| created_at / updated_at | timestamptz | |

### `gallery`

| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| title | text | |
| caption | text \| null | |
| date_label | text | human-readable, e.g. "Mar 2025" |
| category | text | "Events" \| "Workshops" \| "Community" \| "Behind the Scenes" |
| image_url / thumb_url | text \| null | |
| width / height | integer | |
| aspect_ratio | text | "landscape" \| "portrait" \| "square" |
| span | text | "normal" \| "wide" \| "tall" \| "featured" — masonry grid hint |
| event_id | integer \| null | FK → `events.id` |
| taken_at | timestamptz \| null | |
| uploaded_by | text | |
| featured | boolean | |
| order | integer | display order in masonry grid |
| created_at | timestamptz | |

### `applications` (Join form submissions)

| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| name / email / year | text | |
| role | text | developer \| designer \| data \| strategist \| media \| operations |
| why | text | must be ≥ 20 chars (enforced in `api/applications.js`) |
| link | text \| null | |
| status | text | pending \| reviewed \| accepted \| rejected |
| notes | text \| null | internal admin notes |
| submitted_at | timestamptz | |
| reviewed_at | timestamptz \| null | |
| reviewed_by | text \| null | |

### `site_config` (single row, `id = 1`)

| Column | Type | Notes |
|---|---|---|
| id | integer PK | always 1 |
| season_year | integer | |
| season_active | boolean | |
| registration_open | boolean | |
| announcement | jsonb | `{ active, message, link, linkText }` |
| stats | jsonb | `{ members, projects, events, seasons }` |
| social_links | jsonb | `{ instagram, linkedin, github }` |
| updated_at | timestamptz | |

---

## API routes

All routes are Vercel serverless functions in `api/`, deployed alongside the
frontend on the same domain (no CORS needed).

| Route | Method | Purpose |
|---|---|---|
| `/api/events` | GET | All events, ordered by round ascending |
| `/api/projects` | GET | All projects, ordered by `order` ascending |
| `/api/members` | GET | Active members, ordered by department then `order` |
| `/api/gallery` | GET | First 24 gallery items, ordered by `order` |
| `/api/site-config` | GET | The single `site_config` row |
| `/api/applications` | POST | Validates and inserts a Join form submission |

`GET` routes currently return every row unauthenticated (public read, same
posture as the old Firestore rules). `POST /api/applications` validates
`name`, `email`, `role` (enum), `why` (≥ 20 chars), and `year` server-side,
and always forces `status: 'pending'` regardless of what the client sends.

There is no admin auth yet — an `/admin` panel (Phase 7) would need its own
auth layer (e.g. a session cookie + password, or a hosted auth provider) and
protected routes for update/delete on all six tables.

---

## Local setup (backend partner)

```
[ ] Create a Neon project at console.neon.tech
[ ] Copy the pooled connection string into .env.local as DATABASE_URL
[ ] npm run db:push        # applies db/schema.js to the database
[ ] npm run seed           # seeds events, projects, gallery, site_config
[ ] npx vercel dev         # runs frontend + /api together locally
```

`npm run dev` (plain Vite) does **not** serve `/api` routes — use
`npx vercel dev` for local development so the frontend's `fetch('/api/...')`
calls resolve.

### Useful scripts

- `npm run db:generate` — generate a SQL migration from schema changes
- `npm run db:push` — push the current schema straight to the database (fine
  for early development; switch to generated migrations once there's real
  production data)
- `npm run db:studio` — opens Drizzle Studio, a GUI for browsing/editing rows
- `npm run seed` — re-seeds events/projects/gallery/site_config (does not
  touch members or applications)

### Deploying

On Vercel: set `DATABASE_URL` as a project environment variable (Project
Settings → Environment Variables). Do **not** prefix it with `VITE_` —
that would bundle it into the client-side JS and leak the connection string.
