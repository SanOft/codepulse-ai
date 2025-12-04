/** @format */

import { writeFileSync, readFileSync, existsSync } from 'fs'
import { execSync } from 'child_process'
import crypto from 'crypto'

const ENV_FILE = '.env'
const ENV_EXAMPLE = '.env.example'

// Generate a secure random secret
function generateSecret() {
  return crypto.randomBytes(32).toString('hex')
}

// Read existing .env file
function readEnv() {
  if (existsSync(ENV_FILE)) {
    return readFileSync(ENV_FILE, 'utf-8')
  }
  return ''
}

// Write .env file
function writeEnv(content) {
  writeFileSync(ENV_FILE, content, 'utf-8')
  console.log('✅ Updated .env file')
}

// Check if ngrok is installed
function checkNgrok() {
  try {
    execSync('ngrok version', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

// Main setup
function setup() {
  console.log('🔧 Setting up GitHub Webhook configuration...\n')

  // Check for GITHUB_WEBHOOK_SECRET
  let envContent = readEnv()
  let needsSecret = true

  if (envContent.includes('GITHUB_WEBHOOK_SECRET=')) {
    const lines = envContent.split('\n')
    const secretLine = lines.find((line) => line.startsWith('GITHUB_WEBHOOK_SECRET='))
    if (secretLine && secretLine.split('=')[1]?.trim()) {
      console.log('✅ GITHUB_WEBHOOK_SECRET already exists')
      needsSecret = false
    }
  }

  if (needsSecret) {
    const secret = generateSecret()
    console.log('🔑 Generating new webhook secret...')
    
    if (envContent.trim()) {
      if (!envContent.endsWith('\n')) {
        envContent += '\n'
      }
      envContent += `GITHUB_WEBHOOK_SECRET=${secret}\n`
    } else {
      envContent = `GITHUB_WEBHOOK_SECRET=${secret}\n`
    }
    
    writeEnv(envContent)
    console.log(`✅ Generated webhook secret: ${secret.substring(0, 16)}...`)
  }

  // Check ngrok
  console.log('\n📡 Checking ngrok installation...')
  if (checkNgrok()) {
    console.log('✅ ngrok is installed')
  } else {
    console.log('❌ ngrok is not installed')
    console.log('\n📥 To install ngrok:')
    console.log('   1. Download from: https://ngrok.com/download')
    console.log('   2. Or use: choco install ngrok (if you have Chocolatey)')
    console.log('   3. Or use: scoop install ngrok (if you have Scoop)')
  }

  // Create .env.example if it doesn't exist
  if (!existsSync(ENV_EXAMPLE)) {
    const exampleContent = `# Anthropic API Key
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# GitHub Webhook Secret (generate with: node scripts/setup-webhook.js)
GITHUB_WEBHOOK_SECRET=your_webhook_secret_here

# Server Port
PORT=5000
`
    writeFileSync(ENV_EXAMPLE, exampleContent, 'utf-8')
    console.log('✅ Created .env.example file')
  }

  console.log('\n📋 Next steps:')
  console.log('   1. Start your server: yarn dev:server')
  console.log('   2. In another terminal, start ngrok: ngrok http 5000')
  console.log('   3. Copy the HTTPS URL from ngrok (e.g., https://abc123.ngrok-free.app)')
  console.log('   4. Go to GitHub → Settings → Webhooks → Add webhook')
  console.log('   5. Set Payload URL: https://your-ngrok-url.ngrok-free.app/api/webhooks/github')
  console.log('   6. Set Secret: (the GITHUB_WEBHOOK_SECRET from .env)')
  console.log('   7. Select "Pull requests" events')
  console.log('   8. Click "Add webhook"')
  console.log('\n✨ Setup complete!')
}

setup()

