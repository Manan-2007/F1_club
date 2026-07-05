# F1 Chitkara — Firestore Schema

Backend partner reference document.
All collections, document shapes, field types, and rules.

---

## Overview

- Database: Cloud Firestore (Native mode)
- Region: `asia-south1` (Mumbai — closest to Chitkara University)
- Auth: Firebase Authentication (email/password for admin panel)

---

## Collection: `events`

Path: `/events/{eventId}`

Each document represents one event (one race calendar round).

### Document shape

```js
{
  id:          string,    // auto-generated Firestore ID
  round:       number,    // 1, 2, 3... (display as "RND 01")
  title:       string,    // "Watch Party — Bahrain GP"
  description: string,    // full event description
  type:        string,    // "Community" | "Competition" | "Learning" | "Workshop" | "Hackathon"
  status:      string,    // "upcoming" | "completed" | "tbd"
  date:        Timestamp, // Firestore Timestamp
  dateLabel:   string,    // human-readable: "16 Mar 2025" (for display)
  location:    string,    // "Room 401, Block B" or "Online"
  capacity:    number,    // max attendees (0 = unlimited)
  registrationOpen: boolean,
  registrationUrl:  string | null,
  coverImage:  string | null,  // Firebase Storage URL
  createdAt:   Timestamp,
  updatedAt:   Timestamp,
}
```

### Frontend reads

```js
// All events ordered by round
const q = query(
  collection(db, 'events'),
  orderBy('round', 'asc')
)

// Upcoming events only
const q = query(
  collection(db, 'events'),
  where('status', '==', 'upcoming'),
  orderBy('date', 'asc'),
  limit(6)
)
```

### Indexes required

- `round` ASC (default)
- `status` + `date` ASC (for upcoming events query)

---

## Collection: `projects`

Path: `/projects/{projectId}`

Each document is one club project.

### Document shape

```js
{
  id:          string,
  projectId:   string,    // "PRJ-001" — display identifier
  title:       string,    // "Race Predictor"
  description: string,    // short paragraph
  longDescription: string | null,  // full markdown description
  tag:         string,    // "AI / ML" | "DATA" | "STRATEGY" | "OPEN SOURCE" | "DESIGN"
  status:      string,    // "active" | "planned" | "archived"
  techStack:   string[],  // ["Python", "scikit-learn", "Pandas"]
  githubUrl:   string | null,
  liveUrl:     string | null,
  coverImage:  string | null,  // Firebase Storage URL
  featured:    boolean,   // show on Home page featured section
  order:       number,    // display order within status group
  teamMembers: string[],  // array of member document IDs
  createdAt:   Timestamp,
  updatedAt:   Timestamp,
}
```

### Frontend reads

```js
// All active projects
const q = query(
  collection(db, 'projects'),
  where('status', '==', 'active'),
  orderBy('order', 'asc')
)

// Featured projects for Home page
const q = query(
  collection(db, 'projects'),
  where('featured', '==', true),
  where('status', '==', 'active'),
  limit(3)
)
```

### Indexes required

- `status` + `order` ASC
- `featured` + `status` + (auto)

---

## Collection: `members`

Path: `/members/{memberId}`

Each document is one club member.

### Document shape

```js
{
  id:           string,
  name:         string,
  role:         string,     // "Full Stack Developer"
  department:   string,     // "Technical" | "Core Team" | "Data & AI" | "Design" | "Media" | "Events & Ops"
  departmentCode: string,   // "P1" through "P6"
  year:         string,     // "2nd Year"
  bio:          string | null,
  avatar:       string | null,  // Firebase Storage URL
  social: {
    github:    string | null,
    linkedin:  string | null,
    instagram: string | null,
  },
  isLead:       boolean,    // department lead (shown prominently)
  isFounder:    boolean,
  joinedAt:     Timestamp,
  active:       boolean,    // false = alumni, not shown by default
  order:        number,     // display order within department
  createdAt:    Timestamp,
  updatedAt:    Timestamp,
}
```

### Frontend reads

```js
// All active members grouped by department
const q = query(
  collection(db, 'members'),
  where('active', '==', true),
  orderBy('department', 'asc'),
  orderBy('order', 'asc')
)

// Core team only
const q = query(
  collection(db, 'members'),
  where('departmentCode', '==', 'P1'),
  where('active', '==', true),
  orderBy('order', 'asc')
)
```

### Indexes required

- `active` + `department` + `order` ASC
- `departmentCode` + `active` + `order` ASC

---

## Collection: `gallery`

Path: `/gallery/{itemId}`

Each document is one photo or media item.

### Document shape

```js
{
  id:          string,
  title:       string,    // "Watch Party — Bahrain GP"
  caption:     string | null,
  category:    string,    // "Events" | "Workshops" | "Community" | "Behind the Scenes"
  imageUrl:    string,    // Firebase Storage URL (full resolution)
  thumbUrl:    string,    // Firebase Storage URL (thumbnail, 400px wide)
  width:       number,    // original image width in px
  height:      number,    // original image height in px
  aspectRatio: string,    // "landscape" | "portrait" | "square"
  span:        string,    // CSS grid span hint: "normal" | "wide" | "tall" | "featured"
  eventId:     string | null,  // reference to /events document if from an event
  takenAt:     Timestamp | null,
  uploadedBy:  string,    // member ID
  featured:    boolean,
  order:       number,    // display order in masonry grid
  createdAt:   Timestamp,
}
```

### Frontend reads

```js
// All gallery items ordered for masonry
const q = query(
  collection(db, 'gallery'),
  orderBy('order', 'asc'),
  limit(24)
)

// By category
const q = query(
  collection(db, 'gallery'),
  where('category', '==', 'Events'),
  orderBy('order', 'asc')
)
```

### Indexes required

- `order` ASC (default)
- `category` + `order` ASC

---

## Collection: `applications` (Join form submissions)

Path: `/applications/{applicationId}`

Each document is one Join form submission.

### Document shape

```js
{
  id:           string,
  name:         string,
  email:        string,
  year:         string,     // "2nd Year"
  role:         string,     // "developer" | "designer" | "data" | "strategist" | "media" | "operations"
  why:          string,     // textarea response
  link:         string | null,  // GitHub / portfolio
  status:       string,     // "pending" | "reviewed" | "accepted" | "rejected"
  notes:        string | null,  // internal admin notes
  submittedAt:  Timestamp,
  reviewedAt:   Timestamp | null,
  reviewedBy:   string | null,  // admin member ID
}
```

### Frontend write (Join form submit)

```js
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

await addDoc(collection(db, 'applications'), {
  name:        formData.name,
  email:       formData.email,
  year:        formData.year,
  role:        formData.role,
  why:         formData.why,
  link:        formData.link || null,
  status:      'pending',
  notes:       null,
  submittedAt: serverTimestamp(),
  reviewedAt:  null,
  reviewedBy:  null,
})
```

### Indexes required

- `status` + `submittedAt` DESC (for admin review queue)

---

## Collection: `siteConfig` (single document)

Path: `/siteConfig/main`

One document controlling dynamic site-wide content.

### Document shape

```js
{
  seasonYear:       number,  // 2025
  seasonActive:     boolean, // shows "SEASON ACTIVE" indicator
  registrationOpen: boolean, // shows Join banner globally
  announcement: {
    active:   boolean,
    message:  string,        // shown as top bar on site
    link:     string | null,
    linkText: string | null,
  },
  stats: {
    members:  number,  // 50
    projects: number,  // 12
    events:   number,  // 6
    seasons:  number,  // 3
  },
  socialLinks: {
    instagram: string,
    linkedin:  string,
    github:    string,
  },
  updatedAt: Timestamp,
}
```

### Frontend read

```js
import { doc, getDoc } from 'firebase/firestore'

const snap = await getDoc(doc(db, 'siteConfig', 'main'))
const config = snap.data()
```

---

## Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Anyone can read public collections
    match /events/{id}     { allow read: if true; allow write: if isAdmin(); }
    match /projects/{id}   { allow read: if true; allow write: if isAdmin(); }
    match /members/{id}    { allow read: if true; allow write: if isAdmin(); }
    match /gallery/{id}    { allow read: if true; allow write: if isAdmin(); }
    match /siteConfig/{id} { allow read: if true; allow write: if isAdmin(); }

    // Applications — write only (public can submit, only admin can read)
    match /applications/{id} {
      allow create: if isValidApplication();
      allow read, update, delete: if isAdmin();
    }

    function isAdmin() {
      return request.auth != null
        && request.auth.token.admin == true;
    }

    function isValidApplication() {
      let data = request.resource.data;
      return data.name is string && data.name.size() > 0
        && data.email is string && data.email.matches('.*@.*\\..*')
        && data.role in ['developer','designer','data','strategist','media','operations']
        && data.why is string && data.why.size() >= 20
        && data.status == 'pending';
    }
  }
}
```

---

## Firebase Storage Structure

```
/avatars/{memberId}.jpg         — member profile photos
/gallery/{itemId}-full.jpg      — full resolution gallery images
/gallery/{itemId}-thumb.jpg     — 400px thumbnail
/events/{eventId}-cover.jpg     — event cover images
/projects/{projectId}-cover.jpg — project cover images
/models/f1-car.glb              — 3D car model (also in /public for Vite)
```

Storage rules: public read, auth required for write.

---

## Admin Panel recommendation

Build a separate `/admin` route (protected, Firebase Auth required). Suggested pages:

- `/admin/events` — create/edit/delete events
- `/admin/projects` — manage projects
- `/admin/members` — manage team members
- `/admin/gallery` — upload and order photos
- `/admin/applications` — review Join submissions (accept/reject)
- `/admin/config` — edit siteConfig document

This is Phase 7 (backend partner's work). Frontend partner has left the data shapes and Firestore config ready.

---

## Setup checklist for backend partner

- [ ] Create Firebase project at console.firebase.google.com
- [ ] Enable Firestore (Native mode, asia-south1 region)
- [ ] Enable Firebase Storage
- [ ] Enable Firebase Authentication (Email/Password)
- [ ] Copy `.env.example` → `.env.local`, fill in credentials
- [ ] Deploy Firestore security rules above
- [ ] Seed initial data for events, projects, members, gallery
- [ ] Set admin custom claim on your account: `firebase auth:export` → use Firebase Admin SDK to set `{ admin: true }`
- [ ] Create `siteConfig/main` document with initial values
