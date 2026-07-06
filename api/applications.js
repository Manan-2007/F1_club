import { db } from '../db/client.js'
import { applications } from '../db/schema.js'

const VALID_ROLES = ['developer', 'designer', 'data', 'strategist', 'media', 'operations']

function validate(body) {
  if (typeof body.name !== 'string' || body.name.trim().length === 0) {
    return 'name is required'
  }
  if (typeof body.email !== 'string' || !/.+@.+\..+/.test(body.email)) {
    return 'a valid email is required'
  }
  if (!VALID_ROLES.includes(body.role)) {
    return `role must be one of ${VALID_ROLES.join(', ')}`
  }
  if (typeof body.why !== 'string' || body.why.trim().length < 20) {
    return 'why must be at least 20 characters'
  }
  if (typeof body.year !== 'string' || body.year.trim().length === 0) {
    return 'year is required'
  }
  return null
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const body = req.body ?? {}
  const validationError = validate(body)
  if (validationError) {
    res.status(400).json({ error: validationError })
    return
  }
  try {
    const [row] = await db
      .insert(applications)
      .values({
        name: body.name.trim(),
        email: body.email.trim(),
        year: body.year,
        role: body.role,
        why: body.why.trim(),
        link: body.link || null,
        status: 'pending',
      })
      .returning()
    res.status(201).json(row)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to submit application' })
  }
}
