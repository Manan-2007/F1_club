import { asc } from 'drizzle-orm'
import { db } from '../db/client.js'
import { projects } from '../db/schema.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  try {
    const rows = await db.select().from(projects).orderBy(asc(projects.order))
    res.status(200).json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load projects' })
  }
}
