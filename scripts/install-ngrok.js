/** @format */

import { execSync } from 'child_process'
import { existsSync } from 'fs'

function checkNgrok() {
  try {
    execSync('ngrok version', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

function installWithChoco() {
  try {
    console.log('📦 Installing ngrok with Chocolatey...')
    execSync('choco install ngrok -y', { stdio: 'inherit' })
    return true
  } catch (error) {
    return false
  }
}

function installWithScoop() {
  try {
    console.log('📦 Installing ngrok with Scoop...')
    execSync('scoop install ngrok', { stdio: 'inherit' })
    return true
  } catch (error) {
    return false
  }
}

function checkPackageManager() {
  try {
    execSync('choco --version', { stdio: 'ignore' })
    return 'choco'
  } catch {
    try {
      execSync('scoop --version', { stdio: 'ignore' })
      return 'scoop'
    } catch {
      return null
    }
  }
}

console.log('🔍 Checking if ngrok is installed...\n')

if (checkNgrok()) {
  console.log('✅ ngrok is already installed!')
  try {
    const version = execSync('ngrok version', { encoding: 'utf-8' })
    console.log(version)
  } catch {}
  process.exit(0)
}

console.log('❌ ngrok is not installed\n')

const pm = checkPackageManager()

if (pm === 'choco') {
  console.log('🍫 Found Chocolatey package manager\n')
  if (installWithChoco()) {
    console.log('\n✅ ngrok installed successfully!')
    console.log('🚀 You can now run: yarn ngrok')
    process.exit(0)
  } else {
    console.log('\n❌ Failed to install with Chocolatey')
  }
} else if (pm === 'scoop') {
  console.log('🥄 Found Scoop package manager\n')
  if (installWithScoop()) {
    console.log('\n✅ ngrok installed successfully!')
    console.log('🚀 You can now run: yarn ngrok')
    process.exit(0)
  } else {
    console.log('\n❌ Failed to install with Scoop')
  }
} else {
  console.log('❌ No package manager found (Chocolatey or Scoop)\n')
}

console.log('📥 Manual Installation Required:\n')
console.log('   1. Download ngrok from: https://ngrok.com/download')
console.log('   2. Extract ngrok.exe to a folder')
console.log('   3. Add to PATH or use full path\n')
console.log('   OR install a package manager first:')
console.log('   - Chocolatey: https://chocolatey.org/install')
console.log('   - Scoop: https://scoop.sh/\n')
console.log('   Then run: yarn install:ngrok')

process.exit(1)

