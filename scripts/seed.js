// One-time Firestore seed script. Run with: npm run seed
// Imports the data exported from the old Neon backend (scripts/neon-export.json),
// including the applications that had already been submitted.
//
// Requires serviceAccountKey.json in the project root (Firebase Console →
// Project Settings → Service Accounts → Generate new private key).
// That file is gitignored — never commit it.
import { readFileSync } from 'fs'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'

const serviceAccount = JSON.parse(
  readFileSync(new URL('../serviceAccountKey.json', import.meta.url))
)
const data = JSON.parse(
  readFileSync(new URL('./neon-export.json', import.meta.url))
)

initializeApp({ credential: cert(serviceAccount) })
const db = getFirestore()

const now = Timestamp.now()
const ts = (v) => (v ? Timestamp.fromDate(new Date(v)) : null)

// Strip the Postgres serial id and convert date strings to Timestamps.
function clean(row, dateFields) {
  const { id: _id, ...rest } = row
  for (const f of dateFields) rest[f] = ts(rest[f])
  return rest
}

async function seedCollection(name, rows, dateFields, idOf) {
  const batch = db.batch()
  for (const row of rows) {
    const docData = clean(row, dateFields)
    const ref = idOf
      ? db.collection(name).doc(idOf(row))
      : db.collection(name).doc()
    batch.set(ref, docData)
  }
  await batch.commit()
  console.log(`Seeded ${rows.length} docs into /${name}`)
}

async function main() {
  await seedCollection('events', data.events, ['date', 'createdAt', 'updatedAt'])
  await seedCollection(
    'projects',
    data.projects,
    ['createdAt', 'updatedAt'],
    (row) => row.projectId
  )
  await seedCollection('members', data.members, ['joinedAt', 'createdAt', 'updatedAt'])
  await seedCollection('gallery', data.gallery, ['takenAt', 'createdAt'])
  await seedCollection('applications', data.applications, ['submittedAt', 'reviewedAt'])

  const config = clean(data.siteConfig[0], ['updatedAt'])
  await db.collection('siteConfig').doc('main').set({ ...config, updatedAt: now })
  console.log('Seeded /siteConfig/main')

  console.log('Done.')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
