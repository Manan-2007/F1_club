// Publishes firestore.rules using the Admin SDK (no firebase login needed).
// Run with: node scripts/deploy-rules.js
import { readFileSync } from 'fs'
import { initializeApp, cert } from 'firebase-admin/app'
import { getSecurityRules } from 'firebase-admin/security-rules'

const serviceAccount = JSON.parse(
  readFileSync(new URL('../serviceAccountKey.json', import.meta.url))
)
initializeApp({ credential: cert(serviceAccount) })

const source = readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8')
const rules = getSecurityRules()

const ruleset = await rules.createRuleset({
  name: 'firestore.rules',
  content: source,
})
await rules.releaseFirestoreRuleset(ruleset)
console.log(`Published Firestore ruleset ${ruleset.name}`)
process.exit(0)
