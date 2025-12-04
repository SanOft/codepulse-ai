/** @format */

import { spawn } from 'child_process'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ENV_FILE = '.env'
const NGROK_EXE = path.join(__dirname, '..', 'bin', 'ngrok.exe')

// Find ngrok executable
function findNgrok() {
  // Check local bin folder first
  if (existsSync(NGROK_EXE)) {
    return NGROK_EXE
  }
  
  // Check if ngrok is in PATH
  try {
    const { execSync } = require('child_process')
    execSync('ngrok version', { stdio: 'ignore' })
    return 'ngrok'
  } catch {
    return null
  }
}

// Read port from .env or use default
function getPort() {
  if (existsSync(ENV_FILE)) {
    const envContent = readFileSync(ENV_FILE, 'utf-8')
    const portMatch = envContent.match(/^PORT=(\d+)/m)
    if (portMatch) {
      return portMatch[1]
    }
  }
  return '5000'
}

const port = getPort()
const ngrokPath = findNgrok()

if (!ngrokPath) {
  console.error('❌ ngrok is not installed!\n')
  console.error('💡 To install ngrok:\n')
  console.error('   Option 1: Run PowerShell script (recommended)')
  console.error('      powershell -ExecutionPolicy Bypass -File scripts/download-ngrok.ps1\n')
  console.error('   Option 2: Download manually')
  console.error('      1. Go to: https://ngrok.com/download')
  console.error('      2. Download Windows version')
  console.error(`      3. Extract ngrok.exe to: ${path.join(__dirname, '..', 'bin')}`)
  console.error('      4. Or add to system PATH\n')
  console.error('   Option 3: Use Chocolatey (requires admin)')
  console.error('      choco install ngrok\n')
  process.exit(1)
}

console.log('🚀 Starting ngrok tunnel...')
console.log(`📡 Forwarding to http://localhost:${port}`)
console.log('\n💡 Your webhook URL will be: https://[ngrok-url]/api/webhooks/github')
console.log('📊 View requests at: http://localhost:4040\n')

// Start ngrok
const ngrok = spawn(ngrokPath, ['http', port], {
  stdio: 'inherit',
  shell: true,
})

ngrok.on('error', (error) => {
  console.error('❌ Error starting ngrok:', error.message)
  console.error('\n💡 Make sure ngrok is installed:')
  console.error('   - Download from: https://ngrok.com/download')
  console.error('   - Or: choco install ngrok')
  console.error('   - Or: scoop install ngrok')
  process.exit(1)
})

ngrok.on('exit', (code) => {
  if (code !== 0) {
    console.error(`\n❌ ngrok exited with code ${code}`)
  }
})

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\n🛑 Stopping ngrok...')
  ngrok.kill()
  process.exit(0)
})

