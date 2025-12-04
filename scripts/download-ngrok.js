/** @format */

import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { execSync } from 'child_process'
import https from 'https'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const NGROK_DIR = path.join(__dirname, '..', 'bin')
const NGROK_EXE = path.join(NGROK_DIR, 'ngrok.exe')

// Check if ngrok already exists
if (existsSync(NGROK_EXE)) {
  console.log('✅ ngrok.exe already exists in bin/ folder')
  console.log(`   Location: ${NGROK_EXE}`)
  console.log('\n💡 To use it, run:')
  console.log(`   ${NGROK_EXE} http 5000`)
  console.log('   Or add bin/ to your PATH\n')
  process.exit(0)
}

// Create bin directory if it doesn't exist
if (!existsSync(NGROK_DIR)) {
  mkdirSync(NGROK_DIR, { recursive: true })
}

// Download ngrok for Windows
const NGROK_URL = 'https://bin.equinox.io/c/bNyj1mQV2k3/ngrok-v3-stable-windows-amd64.zip'

console.log('📥 Downloading ngrok...')
console.log('   This may take a minute...\n')

// For now, provide manual download instructions
console.log('📥 Manual Download Required:\n')
console.log('   1. Download ngrok for Windows:')
console.log('      https://ngrok.com/download')
console.log('   2. Extract ngrok.exe')
console.log(`   3. Place it in: ${NGROK_DIR}`)
console.log(`   4. Or add it to your system PATH\n`)
console.log('   After downloading, you can run:')
console.log('   yarn ngrok\n')

// Alternative: Use PowerShell to download
console.log('💡 Or use PowerShell to download automatically:\n')
console.log('   PowerShell command:')
console.log(`   Invoke-WebRequest -Uri "https://bin.equinox.io/c/bNyj1mQV2k3/ngrok-v3-stable-windows-amd64.zip" -OutFile "${path.join(NGROK_DIR, 'ngrok.zip')}"`)
console.log(`   Expand-Archive -Path "${path.join(NGROK_DIR, 'ngrok.zip')}" -DestinationPath "${NGROK_DIR}" -Force`)
console.log(`   Remove-Item "${path.join(NGROK_DIR, 'ngrok.zip')}"\n`)

process.exit(0)

