import { asc } from 'drizzle-orm'
import { db } from '../db/client.js'
import { gallery } from '../db/schema.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  try {
    const rows = await db
      .select()
      .from(gallery)
      .orderBy(asc(gallery.order))
      .limit(24)
    res.status(200).json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load gallery' })
  }
}
