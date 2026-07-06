import { eq } from 'drizzle-orm'
import { db } from '../db/client.js'
import { siteConfig } from '../db/schema.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  try {
    const rows = await db.select().from(siteConfig).where(eq(siteConfig.id, 1))
    if (rows.length === 0) {
      res.status(404).json({ error: 'Site config not found' })
      return
    }
    res.status(200).json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load site config' })
  }
}
