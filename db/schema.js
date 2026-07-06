import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core'

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  round: integer('round').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  type: text('type').notNull(),
  status: text('status').notNull(), // 'upcoming' | 'completed' | 'tbd'
  date: timestamp('date', { withTimezone: true }).notNull(),
  dateLabel: text('date_label').notNull(),
  location: text('location').notNull(),
  capacity: integer('capacity').notNull().default(0),
  registrationOpen: boolean('registration_open').notNull().default(false),
  registrationUrl: text('registration_url'),
  coverImage: text('cover_image'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  projectId: text('project_id').notNull().unique(), // "PRJ-001"
  title: text('title').notNull(),
  description: text('description').notNull(),
  longDescription: text('long_description'),
  tag: text('tag').notNull(),
  status: text('status').notNull(), // 'active' | 'planned' | 'archived'
  techStack: text('tech_stack').array().notNull().default([]),
  githubUrl: text('github_url'),
  liveUrl: text('live_url'),
  coverImage: text('cover_image'),
  featured: boolean('featured').notNull().default(false),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const members = pgTable('members', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  department: text('department').notNull(),
  departmentCode: text('department_code').notNull(), // "P1".."P6"
  year: text('year').notNull(),
  bio: text('bio'),
  avatar: text('avatar'),
  social: jsonb('social').notNull().default({ github: null, linkedin: null, instagram: null }),
  isLead: boolean('is_lead').notNull().default(false),
  isFounder: boolean('is_founder').notNull().default(false),
  joinedAt: timestamp('joined_at', { withTimezone: true }).notNull().defaultNow(),
  active: boolean('active').notNull().default(true),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const gallery = pgTable('gallery', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  caption: text('caption'),
  dateLabel: text('date_label').notNull(),
  category: text('category').notNull(),
  imageUrl: text('image_url'),
  thumbUrl: text('thumb_url'),
  width: integer('width').notNull().default(0),
  height: integer('height').notNull().default(0),
  aspectRatio: text('aspect_ratio').notNull().default('landscape'),
  span: text('span').notNull().default('normal'), // 'normal' | 'wide' | 'tall' | 'featured'
  eventId: integer('event_id').references(() => events.id),
  takenAt: timestamp('taken_at', { withTimezone: true }),
  uploadedBy: text('uploaded_by').notNull(),
  featured: boolean('featured').notNull().default(false),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const applications = pgTable('applications', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  year: text('year').notNull(),
  role: text('role').notNull(), // developer|designer|data|strategist|media|operations
  why: text('why').notNull(),
  link: text('link'),
  status: text('status').notNull().default('pending'), // pending|reviewed|accepted|rejected
  notes: text('notes'),
  submittedAt: timestamp('submitted_at', { withTimezone: true }).notNull().defaultNow(),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  reviewedBy: text('reviewed_by'),
})

// Single-row table — always id = 1.
export const siteConfig = pgTable('site_config', {
  id: integer('id').primaryKey().default(1),
  seasonYear: integer('season_year').notNull(),
  seasonActive: boolean('season_active').notNull().default(true),
  registrationOpen: boolean('registration_open').notNull().default(true),
  announcement: jsonb('announcement').notNull().default({ active: false, message: '', link: null, linkText: null }),
  stats: jsonb('stats').notNull().default({ members: 0, projects: 0, events: 0, seasons: 0 }),
  socialLinks: jsonb('social_links').notNull().default({ instagram: '', linkedin: '', github: '' }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
