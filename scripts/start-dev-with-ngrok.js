/** @format */

import { spawn } from 'child_process'
import { existsSync } from 'fs'

// Check if ngrok is available
function checkNgrok() {
  try {
    const { execSync } = require('child_process')
    execSync('ngrok version', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

if (!checkNgrok()) {
  console.error('❌ ngrok is not installed!')
  console.error('\n📥 Install ngrok first:')
  console.error('   1. Download from: https://ngrok.com/download')
  console.error('   2. Or: choco install ngrok')
  console.error('   3. Or: scoop install ngrok')
  process.exit(1)
}

console.log('🚀 Starting development environment with ngrok...\n')

// Start server
const server = spawn('yarn', ['dev:server'], {
  stdio: 'inherit',
  shell: true,
})

// Wait a bit for server to start, then start ngrok
setTimeout(() => {
  const ngrok = spawn('node', ['scripts/start-ngrok.js'], {
    stdio: 'inherit',
    shell: true,
  })

  // Handle cleanup
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Stopping all processes...')
    server.kill()
    ngrok.kill()
    process.exit(0)
  })
}, 3000)

