<div align="center">

# F1 CHITKARA

### Where Speed Meets Innovation

**The official website of the F1 Chitkara club — Chitkara University**

Engineering × Strategy × Design × Technology

---

[![Built with React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?style=flat-square&logo=three.js)](https://threejs.org)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock)](https://gsap.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)

</div>

---

## What is this?

F1 Chitkara is not a generic college club website. It is a cinematic,
immersive digital experience built to feel like entering an F1 pit lane.
The site combines Formula 1 aesthetics with premium interactive design —
dark carbon-fibre aesthetic, 3D hero with mouse-driven parallax, live
telemetry-inspired UI, and motorsport-themed interactions throughout.

Built by **Manan Kochhar**.
Backed by Neon Postgres via Vercel serverless functions (see [Backend](#backend)).

---

## Live Site

> Deploy URL goes here — add after pushing to Vercel

---

## Screenshots

> Add screenshots here after deployment

---

## Features

### Pages

The app is a React Router SPA with seven routes (`/`, `/about`, `/teams`,
`/projects`, `/events`, `/gallery`, `/join`). Every route is wrapped in a
`PageWrapper` that plays a clip-path wipe transition on navigation.

- **Home** (`/`) — Full 3D hero section, then a "Who We Are" club intro whose
  two columns slide in from opposite sides and a 2×2 stat block that counts up
  on scroll (`50+` Active Members, `12` Projects Built, `6` Events Completed,
  `3` Seasons Running). Below: a "Race Calendar" strip of 3 featured upcoming
  events (Watch Party, Simulator Tournament, Tech Talk), a "Pit Lane" strip of
  3 featured projects (Race Predictor, Telemetry Dashboard, Pit Stop Simulator),
  and a bordered "Ready to Join the Grid?" CTA section.
- **About** (`/about`) — Page hero, a three-paragraph founding story, Vision /
  Mission telemetry cards, a "Why Formula 1?" grid of 4 reasons (Engineering at
  the Limit, Data at Scale, Strategy Under Pressure, Innovation First), and a
  vertical **timeline** ("How We Got Here") whose connecting line draws top-to-
  bottom on scroll while entries stagger in — Aug 2024 Club Founded, Sep 2024
  First Watch Party, Jan 2025 First Hackathon, Mar 2025 Website Launch.
- **Teams** (`/teams`) — A 6-department grid (P1 Core Team, P2 Technical, P3
  Data & AI, P4 Design, P5 Media, P6 Events & Ops), each card showing placeholder
  member slots. Then a **"Starting Grid"** section rendered as a staggered
  two-column F1 grid formation (12 positions P1–P12, `OPEN` badges on the
  vacant roles); it collapses to a single ordered list on mobile. Columns
  animate in from opposite sides.
- **Projects** (`/projects`) — A horizontally-scrollable filter bar (All, AI/ML,
  Data, Strategy, Design, Open Source — visual only, no filtering wired yet) and
  a responsive card grid of all **6 projects**: PRJ-001 Race Predictor, PRJ-002
  Telemetry Dashboard, PRJ-003 Pit Stop Simulator (all `ACTIVE`), PRJ-004 Fantasy
  F1 Optimizer, PRJ-005 F1 Data Toolkit, PRJ-006 Livery Generator (all `PLANNED`).
  Each card shows an ID, status badge, tag, description, and tech-stack chips.
- **Events** (`/events`) — A **season progress bar** ("2 of 6 Rounds Complete")
  whose red fill sweeps in and whose 6 round dots pop in with a back-ease, plus
  a list of all **6 events**: RND 01 Watch Party — Bahrain GP & RND 02 Simulator
  Tournament (`COMPLETED`), RND 03 Tech Talk: Aerodynamics, RND 04 Data Analytics
  Workshop, RND 05 Strategy Hackathon (`UPCOMING`), RND 06 End of Season Showcase
  (`TBD`). Rows slide in from the left.
- **Gallery** (`/gallery`) — A category filter bar (All, Events, Workshops,
  Community, Behind the Scenes — visual only) over a **masonry grid** of 12
  gradient placeholder tiles with varied column/row spans. Tiles scale in
  left-to-right on scroll, reveal a label on hover, and open a **lightbox**
  (Framer Motion, click-to-dismiss) with the item title and date.
- **Join** (`/join`) — A **6-role selector** (Developer, Designer, Data / AI,
  Strategist, Media, Operations) whose cards stagger in, followed by a form —
  Full Name, University Email, Year of Study (1st–4th), "Why F1 Chitkara?"
  textarea, and an optional Link. The submit button stays disabled until a role
  and all required fields are filled. On submit it posts to `/api/applications`,
  which validates and inserts the row into Neon, then shows a success state
  ("Application Received · STATUS: UNDER REVIEW").

### Hero Section

The hero (`HeroSection.jsx`) is assembled from a stack of layers over a
full-viewport `cursor-none` section:

- **3D car** — On capable desktops, `Canvas3D` mounts a `@react-three/fiber`
  `<Canvas>` that streams in a real **GLB F1 car model** via `useGLTF`. The model
  is measured at runtime (bounding box) and auto-scaled/centred so its wheels rest
  on the shadow-catcher floor plane, regardless of the GLB's native units.
- **Mouse-driven motion** — a single `useMousePosition` ref (normalised −1→+1,
  lerp-smoothed) drives both the car (`F1CarModel` lerps rotation around a
  resting front-quarter pose) and the camera (`CameraRig` lerps the camera
  position and look-at target every frame for a heavy, cinematic drift).
- **Lighting** — a "dark garage" rig: a `night` HDRI environment map, a strong
  upper-left key spotlight (with 2048px shadow maps), a cool rear rim light, a
  red floor bounce, and a subtle green accent point light.
- **Loading** — while the GLB and HDRI stream in, a DOM `ModelLoader` overlay
  shows an animated progress bar, pulsing dots, and a faux telemetry readout
  ("COMPILING SHADERS", "MOUNTING SCENE GRAPH").
- **Text & CTAs** — `HeroText` plays a GSAP timeline (eyebrow → headline words
  rising in → subtext → tagline). `HeroCTA` renders "Join the Grid" and
  "Explore Projects" buttons plus a pulsing "SEASON ACTIVE" indicator via
  staggered Framer Motion variants.
- **Ambient background** — `HeroBackground` layers noise, red/green radial
  glows, faint racing lines, corner grid marks, and a subtle telemetry readout,
  all with mouse parallax at different depths.
- **Scroll hint** — `HeroScrollHint` shows an animated pulsing line that
  smooth-scrolls one viewport down (via Lenis) on click.
- **2D fallback** — on mobile / no-WebGL / reduced-motion devices,
  `useDeviceCapability` swaps the whole 3D canvas for `CarParallax`: a hand-built,
  5-layer parallax **SVG F1 car** (shadow, body, tyres, wings, halo) so the hero
  never ships the ~3 MB GLB where it can't be used.

### Animations

- **GSAP ScrollTrigger** entrance animations on nearly every section — fade-ups
  (`useScrollReveal` / `ScrollReveal`), directional column slides (Home intro,
  Teams grid, Events rows), a self-drawing timeline line and racing lines
  (About, `RacingLine`), and count-up stats (`useCountUp`).
- **Lenis smooth scroll** wired into GSAP's ticker so ScrollTrigger stays in
  sync with the momentum scroll (skipped entirely when `prefers-reduced-motion`).
- **Framer Motion page transitions** — an `AnimatePresence` in `App.jsx` plays a
  clip-path wipe (`pageVariants`) on every route change; the app also scroll-
  resets and refreshes ScrollTrigger after each navigation.
- **Navbar** — GSAP animates a glass/blur background in once you scroll past
  60px, a red **scroll-progress bar** tracks page progress, nav links stagger in
  on first load, and the active link gets a shared-layout Framer Motion underline.
- **Hero timelines** — GSAP text reveal, an infinite yoyo scroll-hint pulse, and
  the R3F per-frame `useFrame` lerps for car + camera.
- **Micro-interactions** — telemetry-card hover lift (`cardVariants`), CTA
  hover/tap scale, count-up numbers, and the Gallery lightbox scale/opacity.

### Interactive Elements

- **CursorGlow** — a custom radial red glow follows the cursor with lerp
  smoothing; over the hero (which is `cursor-none`) it grows and brightens into a
  spotlight, replacing the native cursor.
- **Telemetry cards** (`TelemetryCard`) — a red left-edge bar wipes up on hover,
  the border warms to red, and the card lifts via Framer Motion.
- **Navbar** — scroll-reactive glass, live scroll-progress bar, animated
  hamburger → X, and an `AnimatePresence` mobile menu that staggers its links.
- **Filter bars** — clickable category chips on Projects and Gallery (state is
  tracked and the active chip highlights; result filtering is a later phase).
- **Gallery lightbox** — click any tile to open a full-screen Framer Motion
  lightbox; click anywhere or the ✕ to close.
- **Join role selector & live-validated form** with a disabled-until-valid submit
  and an animated success state.
- **Easter eggs** — typed keyboard codes (see below).

### Easter Eggs

Handled by `useEasterEggs.js`, which listens for typed key sequences globally,
toggles a class on `<html>`, and fires an `easterEgg` event that pops a brief
bottom-centre toast (`EasterEggToast`). All the visuals live in `index.css`.

| Type this  | What happens |
|------------|--------------|
| `drs`      | **DRS mode** — animated red horizontal scan lines plus a left-to-right red light sweep run across the whole screen, and a blinking green `DRS ENABLED` HUD chip appears top-right. |
| `pole`     | **Pole Position mode** — the entire theme turns gold: the red and green accent variables become `#FFD700`, a light sepia filter is applied, buttons get a gold gradient, and a gold `P1 — POLE POSITION` badge sits top-right with a gold shimmer. |
| `lightsout`| **Lights Out sequence** — a 3-second cinematic: the page brightness fades down light-by-light, holds in darkness, flashes the five red lights, then bursts back to full with `LIGHTS OUT AND AWAY WE GO` centred on screen. **Auto-resets after 3 s** (and that's the moment the toast fires, since the screen is dark during the blackout). |
| `chitkara` | **Chitkara pride mode** — a red `GO CHITKARA 🏎️` badge slides in from the right into the top-right corner. |

> Type these on your keyboard anywhere on the site (not while focused in a form
> field — inputs, textareas and selects are ignored). Modes are mutually
> exclusive; type the same code again to deactivate (except `lightsout`, which
> resets itself).

### Responsive Design

- **Capability gating** — `useDeviceCapability` computes `use3D` from user-agent,
  viewport width (`< 768px` = mobile), WebGL support, and reduced-motion
  preference; mobile / low-end / reduced-motion users get the 2D `CarParallax` hero.
- **Breakpoints** — Tailwind's defaults are used throughout (`sm` 640px, `md`
  768px, `lg` 1024px, `xl` 1280px). Multi-column grids collapse to single
  columns, the Teams grid switches to an ordered list, and Events rows restack.
- **Mobile CSS** (`@media (max-width: 767px)` in `index.css`) — tightens
  container padding, wraps/hyphenates headlines, makes buttons full-width, forces
  16px inputs to stop iOS auto-zoom, reduces section spacing, and prevents
  horizontal overflow.
- **Touch handling** — `@media (hover: none)` strips sticky hover states,
  `scrollbar-hide` powers the horizontal filter bars, all interactive elements
  get a 44×44px minimum tap target, and there's a global `:focus-visible` ring.
- **Reduced motion** — a `prefers-reduced-motion` block near-zeroes animation and
  transition durations, and Lenis is never initialised.

---

## Tech Stack

### Core

| Technology | Version | Purpose | Link |
|-----------|---------|---------|------|
| React | 19.2 | UI framework | https://react.dev |
| Vite | 8 | Build tool + dev server | https://vitejs.dev |
| React Router DOM | 6.30 | Client-side routing | https://reactrouter.com |
| Tailwind CSS | 3.4 | Utility-first styling | https://tailwindcss.com |

### Animation

| Technology | Version | Purpose | Link |
|-----------|---------|---------|------|
| GSAP | 3.15 | ScrollTrigger, timelines, entrance anims | https://gsap.com |
| Framer Motion | 12.42 | Page transitions, hover effects, CTAs | https://www.framer.com/motion |
| Lenis | 1.3 | Smooth scroll + GSAP sync | https://lenis.darkroom.engineering |

### 3D

| Technology | Version | Purpose | Link |
|-----------|---------|---------|------|
| Three.js | 0.185 | 3D engine | https://threejs.org |
| @react-three/fiber | 9.6 | React renderer for Three.js | https://r3f.docs.pmnd.rs |
| @react-three/drei | 10.7 | Helpers — Environment, useGLTF, AdaptiveDpr, etc. | https://github.com/pmndrs/drei |

### Build + Deploy

| Technology | Purpose | Link |
|-----------|---------|------|
| Vercel | Hosting + CDN | https://vercel.com |
| Rolldown (Vite 8) | Bundling + manual chunk splitting | https://vitejs.dev |
| oxlint | Linting (`npm run lint`) | https://oxc.rs |

---

## Project Structure

```
f1-chitkara/
├── public/
│   ├── favicon.svg
│   └── models/
│       ├── f1-car.glb          # 3D F1 car model (~3 MB GLB)
│       └── ATTRIBUTION.md      # CC-BY credit for the model
├── src/
│   ├── components/
│   │   ├── hero/               # All hero section components
│   │   │   ├── HeroSection.jsx # Root hero — assembles all sub-components
│   │   │   ├── Canvas3D.jsx    # R3F Canvas wrapper + loader overlay
│   │   │   ├── F1CarModel.jsx  # 3D car (GLB loader + auto-fit + mouse rotation)
│   │   │   ├── CameraRig.jsx   # useFrame camera lerp
│   │   │   ├── Lighting.jsx    # Environment + SpotLights + shadow catcher
│   │   │   ├── ModelLoader.jsx # DOM loading overlay while the GLB streams in
│   │   │   ├── HeroBackground.jsx  # Ambient glow + decorative parallax layers
│   │   │   ├── HeroText.jsx    # GSAP headline animation
│   │   │   ├── HeroCTA.jsx     # Framer Motion CTA buttons
│   │   │   ├── HeroScrollHint.jsx  # Animated scroll indicator
│   │   │   └── CarParallax.jsx # 2D layered-SVG fallback for mobile / no-WebGL
│   │   ├── layout/
│   │   │   ├── Navbar.jsx      # Fixed glass navbar + scroll progress
│   │   │   ├── Footer.jsx      # Footer with nav + socials
│   │   │   └── PageWrapper.jsx # Framer Motion page-transition wrapper
│   │   └── ui/                 # Reusable components
│   │       ├── TelemetryCard.jsx
│   │       ├── Badge.jsx
│   │       ├── ScrollReveal.jsx
│   │       ├── PageHero.jsx
│   │       ├── SectionHeader.jsx
│   │       ├── RacingLine.jsx
│   │       ├── EasterEggToast.jsx
│   │       └── CursorGlow.jsx
│   ├── hooks/
│   │   ├── useMousePosition.js    # Normalized mouse (-1 to +1) with lerp
│   │   ├── useMouseParallax.js    # Simpler raw normalized mouse ref
│   │   ├── useParallaxLayer.js    # Writes transform directly to a DOM ref
│   │   ├── useScrollReveal.js     # GSAP ScrollTrigger fade-up hook
│   │   ├── useCountUp.js          # Number count-up on scroll
│   │   ├── useEasterEggs.js       # Keyboard sequence listener
│   │   └── useDeviceCapability.js # Mobile + WebGL + reduced-motion detection
│   ├── lib/
│   │   └── motion.js           # Shared Framer Motion variants (page + card)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Teams.jsx
│   │   ├── Projects.jsx
│   │   ├── Events.jsx
│   │   ├── Gallery.jsx
│   │   └── Join.jsx
│   ├── App.jsx         # Router + AnimatePresence page transitions
│   ├── main.jsx        # Lenis + GSAP init + React mount
│   └── index.css       # Design tokens + component classes + easter egg CSS
├── FIRESTORE_SCHEMA.md # Complete backend database schema
├── index.html          # Fonts + meta + root mount
├── vercel.json         # Deployment + headers config
├── tailwind.config.js  # Design tokens
├── vite.config.js      # Build config + chunk splitting
└── .env.example        # Required environment variables
```

---

## Design System

### Color Palette

Defined once in both `tailwind.config.js` (as the `f1` color group) and
`index.css` (as CSS custom properties on `:root`).

| Name | Hex | Usage |
|------|-----|-------|
| Background | `#070707` | Page background (`f1-bg`) |
| Surface | `#111111` | Cards, navbar, alt sections (`f1-surface`) |
| Carbon | `#1B1B1B` | Secondary surfaces / chips (`f1-carbon`) |
| Racing Red | `#E10600` | Accents, CTAs, active states (`f1-red`) |
| White | `#F4F4F4` | Primary text (`f1-white`) |
| Telemetry Green | `#00FF99` | Data labels, live indicators (`f1-green`) |
| Silver | `#9CA3AF` | Secondary text (`f1-silver`) |

### Typography

Loaded via Google Fonts in `index.html` and mapped in `tailwind.config.js`
(`font-sans` → Space Grotesk, `font-mono` → JetBrains Mono).

| Font | Weight | Usage | Source |
|------|--------|-------|--------|
| Space Grotesk | 300–700 | Headings, navigation, UI | https://fonts.google.com/specimen/Space+Grotesk |
| JetBrains Mono | 400, 500 | Telemetry values, labels, badges | https://fonts.google.com/specimen/JetBrains+Mono |
| Inter | 300–500 | Body text fallback | https://fonts.google.com/specimen/Inter |

### CSS Component Classes

Reusable classes defined in the `@layer components` block of `index.css`:

- **`.f1-container`** — max-width page container with responsive horizontal padding.
- **`.f1-heading`** — bold, uppercase, tracked heading style.
- **`.f1-eyebrow`** — small mono, wide-tracked, green uppercase label.
- **`.f1-mono`** — small green monospace text for telemetry values.
- **`.glass-panel`** — translucent blurred panel (used by navbar, mobile menu, toast).
- **`.telemetry-card`** — bordered surface card with a red left-edge bar that wipes up on hover.
- **`.btn-primary`** — solid red, clip-path-notched CTA button.
- **`.btn-outline`** — transparent, bordered variant of the CTA button.
- **`.section-tag`** — inline label with a short red leading dash.
- **`.stat-block`** — stat wrapper with a red left border.
- **`.bg-noise`** — inline SVG fractal-noise texture background.
- **`.f1-divider`** — thin horizontal red gradient rule.
- **`.scrollbar-hide`** (utility) — hides scrollbars on the horizontal filter bars.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Manan-2007/f1-chitkara.git
cd f1-chitkara

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in your Neon connection string in .env.local

# Push the schema and seed some data
npm run db:push
npm run seed

# Start frontend + API together
npx vercel dev
```

Open http://localhost:3000 (the port `vercel dev` prints — plain `npm run dev`
only serves the frontend and won't resolve `/api/*` calls).

### Environment Variables

```env
DATABASE_URL=   # Neon Postgres connection string
```

Get this from: https://console.neon.tech → your project → Connection Details.
This variable is read server-side only, by `db/client.js` and the scripts in
`api/` — it is deliberately **not** prefixed `VITE_`, since that would bundle
it into client-side JS and leak the connection string to the browser.

See [`DATABASE_SCHEMA.md`](DATABASE_SCHEMA.md) for the full schema, API route
reference, and setup steps.

### Build for Production

```bash
npm run build    # Creates dist/ folder
npm run preview  # Preview production build locally
npm run lint     # Run oxlint
```

---

## Deployment

The site is configured for Vercel. To deploy:

1. Push to GitHub
2. Connect the repo at https://vercel.com/new
3. Add `DATABASE_URL` as an Environment Variable in the Vercel dashboard
4. Deploy — Vercel auto-detects the Vite config and the `api/` functions

The `vercel.json` handles:

- **SPA routing** — all routes rewrite to `/index.html`
- **GLB model caching** — `/models/*` served immutable for 1 year with the
  `model/gltf-binary` content type; `/assets/*` cached immutable too
- **Security headers** — `X-Content-Type-Options`, `X-Frame-Options: DENY`,
  `X-XSS-Protection`, `Referrer-Policy`, and a `Permissions-Policy` disabling
  camera/microphone

---

## How It Was Built

The site was built with **Claude Code (Claude Mythos Preview)** across six phases,
and you can still read the phase markers in the code comments. **Phase 1**
scaffolded the Vite + React + Tailwind project and the design tokens — the F1
palette, the Space Grotesk / JetBrains Mono type pairing, and the reusable
`telemetry-card` / `btn-*` component classes. **Phase 2** built all seven static
pages with hardcoded content and "visual only" filter bars. **Phase 3** layered
in motion: GSAP ScrollTrigger reveals, count-up stats, self-drawing timelines,
Lenis smooth scroll wired into the GSAP ticker, and Framer Motion page
transitions. **Phase 4** created the 2D hero — a hand-drawn, five-layer parallax
SVG F1 car (`CarParallax`) driven by a shared normalised mouse ref. **Phase 5**
replaced it (on capable devices) with the real 3D hero: a `@react-three/fiber`
canvas loading a GLB car, a runtime auto-fit transform, a dark-garage lighting
rig, and a lerped camera. **Phase 6** was polish — the cursor spotlight, the
easter eggs, the responsive / touch / reduced-motion passes, capability gating so
mobile never downloads the 3 MB model, and the groundwork for the backend
partner. **Phase 7** wired all six pages to a Neon Postgres backend through
Drizzle ORM and Vercel serverless functions.

---

## Known Issues + Limitations

- **Gallery images are placeholders** — the 12 seeded rows have no
  `image_url`/`thumb_url` yet, so tiles still render as CSS gradients with
  numbered labels until real photos are uploaded and their URLs saved.
- **Team members table is empty** — department cards fall back to generic
  "Member #n" placeholder slots until the real roster is seeded into
  `members`, and the Starting Grid recruitment slots are still hardcoded
  (they're recruitment copy, not roster data).
- **Filter bars don't filter** — the Projects and Gallery category chips track
  active state but don't yet filter results.
- **Footer social links are `#` placeholders** — Instagram / LinkedIn / GitHub
  aren't set.
- **No admin panel yet** — `applications` and `members` can only be managed by
  querying Neon directly (`npm run db:studio`) until Phase 8 builds `/admin`.
- **3D quality depends on the GLB asset** and requires runtime network access to
  fetch the `night` HDRI environment map from a CDN.
- **No LICENSE file** and no automated tests are present.

---

## Backend

The backend is [Neon](https://neon.tech) (serverless Postgres) queried through
[Drizzle ORM](https://orm.drizzle.team), fronted by Vercel serverless
functions under `api/` — the browser talks to `/api/*`, never to Postgres
directly. Full schema, API route reference, and setup steps are in
[`DATABASE_SCHEMA.md`](DATABASE_SCHEMA.md).

All six pages (Events, Projects, Teams, Gallery, Home stats, Join) are wired
to their respective `/api/*` routes — no more hardcoded arrays. `members` and
`applications` start empty; `members` needs the real club roster, and
`applications` fills up from Join form submissions.

### Local setup

```
[ ] Create a Neon project at console.neon.tech
[ ] Copy the connection string into .env.local as DATABASE_URL
[ ] npm run db:push   # applies db/schema.js to the database
[ ] npm run seed      # seeds events, projects, gallery, site_config
[ ] npx vercel dev    # runs frontend + /api together locally
```

`npm run dev` (plain Vite) does not serve `/api` — use `npx vercel dev`
locally so `fetch('/api/...')` calls resolve.

### Admin panel (not yet built)

An admin panel for managing dynamic content without touching code — suggested
route `/admin`, needing its own auth layer (there's no Firebase Auth
equivalent wired up yet). Pages needed:

- `/admin/events` — create, edit, delete events
- `/admin/projects` — manage projects
- `/admin/members` — manage team members
- `/admin/gallery` — upload photos, reorder grid
- `/admin/applications` — review Join form submissions, accept/reject
- `/admin/config` — edit `site_config` (stats, season status, announcement)

---

## Resources Used

### Libraries and frameworks

**Core**
- [React 19.2](https://react.dev) — UI framework
- [React DOM 19.2](https://react.dev) — DOM renderer
- [React Router DOM 6.30](https://reactrouter.com) — client-side routing
- [Vite 8](https://vitejs.dev) — dev server + build (Rolldown-based)
- [Tailwind CSS 3.4](https://tailwindcss.com) + [PostCSS](https://postcss.org) + [Autoprefixer](https://github.com/postcss/autoprefixer) — styling
- [oxlint](https://oxc.rs) — linting

**Animation**
- [GSAP 3.15](https://gsap.com) — ScrollTrigger, timelines, entrance animations
- [Framer Motion 12.42](https://www.framer.com/motion) — page transitions, hover/tap effects
- [Lenis 1.3](https://lenis.darkroom.engineering) — smooth scroll synced to GSAP

**3D**
- [Three.js 0.185](https://threejs.org) — 3D engine
- [@react-three/fiber 9.6](https://r3f.docs.pmnd.rs) — React renderer for Three.js
- [@react-three/drei 10.7](https://github.com/pmndrs/drei) — `Environment`, `useGLTF`, `AdaptiveDpr`, `PerformanceMonitor`, `useProgress`

### Design inspiration

- Formula1.com — editorial layout and premium motorsport aesthetic
- Lando Norris official website — interactive hero concept and cursor animations
- F1 team websites (Red Bull, McLaren, Ferrari) — UI language and dark theme
- Dribbble F1 concepts — telemetry card UI inspiration

### 3D Model

The hero loads a real GLB asset (`public/models/f1-car.glb`, ~3 MB) — **not**
procedural geometry. It is auto-scaled, centred, and positioned at runtime, but
otherwise used as downloaded. Per `public/models/ATTRIBUTION.md`:

- **Model:** "F1 3D Model" — 2022-spec Formula 1 car
- **Author:** Blender458 — https://sketchfab.com/Blender458
- **Source:** https://fetchcfd.com/view-project/4314-f1-3d-model
- **License:** CC Attribution 4.0 International — http://creativecommons.org/licenses/by/4.0/

> *F1 car model by Blender458 (CC-BY 4.0).*

### Fonts

- Space Grotesk — https://fonts.google.com/specimen/Space+Grotesk
- JetBrains Mono — https://fonts.google.com/specimen/JetBrains+Mono
- Inter — https://fonts.google.com/specimen/Inter

### Tools

- Claude Code (Claude Mythos Preview) — AI-powered code generation for all 6 build phases
- Vite — development and build tooling
- Vercel — deployment platform

---

## Author

**Manan Kochhar**
CSE (AI/ML), Chitkara University
GitHub: https://github.com/Manan-2007

**Backend Partner:** _to be added_

---

## License

There is no LICENSE file in this repository — this project is not currently open
source.

© 2026 F1 Chitkara · Chitkara University. All rights reserved.

The bundled 3D car model is licensed separately under CC-BY 4.0 (see
[3D Model](#3d-model) above).

---

<div align="center">

**F1 CHITKARA — WHERE SPEED MEETS INNOVATION**

*Engineering × Strategy × Design × Technology*

</div>
