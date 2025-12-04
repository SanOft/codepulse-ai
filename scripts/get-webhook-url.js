/** @format */

import { readFileSync, existsSync } from 'fs'

const ENV_FILE = '.env'

// Read webhook secret from .env
function getWebhookSecret() {
  if (existsSync(ENV_FILE)) {
    const envContent = readFileSync(ENV_FILE, 'utf-8')
    const secretMatch = envContent.match(/GITHUB_WEBHOOK_SECRET=(.+)/)
    if (secretMatch) {
      return secretMatch[1].trim()
    }
  }
  return null
}

const secret = getWebhookSecret()

console.log('📋 GitHub Webhook Configuration:\n')

if (secret) {
  console.log('✅ Webhook Secret (from .env):')
  console.log(`   ${secret}\n`)
} else {
  console.log('❌ GITHUB_WEBHOOK_SECRET not found in .env')
  console.log('   Run: yarn setup:webhook\n')
}

console.log('📡 Webhook URL (after starting ngrok):')
console.log('   https://[your-ngrok-url]/api/webhooks/github\n')

console.log('🔧 To get your ngrok URL:')
console.log('   1. Run: yarn ngrok (or: ngrok http 5000)')
console.log('   2. Copy the HTTPS URL from the output')
console.log('   3. Or visit: http://localhost:4040\n')

console.log('📝 GitHub Webhook Setup Steps:')
console.log('   1. Go to: https://github.com/[owner]/[repo]/settings/hooks')
console.log('   2. Click "Add webhook"')
console.log('   3. Payload URL: https://[ngrok-url]/api/webhooks/github')
console.log('   4. Content type: application/json')
console.log(`   5. Secret: ${secret || '[run yarn setup:webhook]'}`)
console.log('   6. Events: Select "Pull requests"')
console.log('   7. Click "Add webhook"\n')

