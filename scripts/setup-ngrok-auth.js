/** @format */

import { spawn } from 'child_process'
import { existsSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const NGROK_EXE = path.join(__dirname, '..', 'bin', 'ngrok.exe')

// Find ngrok executable
function findNgrok() {
  if (existsSync(NGROK_EXE)) {
    return NGROK_EXE
  }
  
  try {
    const { execSync } = require('child_process')
    execSync('ngrok version', { stdio: 'ignore' })
    return 'ngrok'
  } catch {
    return null
  }
}

const ngrokPath = findNgrok()

if (!ngrokPath) {
  console.error('❌ ngrok is not installed!\n')
  console.error('💡 Run: yarn install:ngrok\n')
  process.exit(1)
}

console.log('🔐 ngrok Authentication Setup\n')
console.log('📋 Steps to get your authtoken:')
console.log('   1. Sign up/login: https://dashboard.ngrok.com/signup')
console.log('   2. Go to: https://dashboard.ngrok.com/get-started/your-authtoken')
console.log('   3. Copy your authtoken\n')

// Get authtoken from user
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('Enter your ngrok authtoken: ', (authtoken) => {
  if (!authtoken || authtoken.trim().length === 0) {
    console.error('\n❌ Authtoken is required')
    rl.close()
    process.exit(1)
  }

  console.log('\n🔧 Configuring ngrok...\n')

  // Run ngrok config add-authtoken (note: command format is just the token, not as separate arg)
  const token = authtoken.trim()
  const ngrok = spawn(ngrokPath, ['config', 'add-authtoken', token], {
    stdio: 'inherit',
    shell: true,
  })

  ngrok.on('error', (error) => {
    console.error('❌ Error configuring ngrok:', error.message)
    rl.close()
    process.exit(1)
  })

  ngrok.on('exit', (code) => {
    rl.close()
    if (code === 0) {
      console.log('\n✅ ngrok configured successfully!')
      console.log('🚀 You can now run: yarn ngrok\n')
    } else {
      console.error(`\n❌ ngrok configuration failed with code ${code}`)
      process.exit(1)
    }
  })
})

