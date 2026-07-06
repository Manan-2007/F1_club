import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema.js'

// Vercel injects DATABASE_URL directly in deployed functions. Local scripts
// (seed, etc.) need it loaded from .env.local first.
if (!process.env.DATABASE_URL) {
  const { config } = await import('dotenv')
  config({ path: '.env.local' })
}

const sql = neon(process.env.DATABASE_URL)
export const db = drizzle(sql, { schema })
