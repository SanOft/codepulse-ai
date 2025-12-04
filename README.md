# codepulse-ai
⚡ Real-time AI code review engine | 🔒 Security-first analysis |  📊 Production metrics | 🎯 99.9% uptime

## 🚀 Quick Start

### 1. Install Dependencies
```bash
yarn install
```

### 2. Setup Environment
```bash
# Copy .env.example to .env and fill in your API keys
cp .env.example .env

# Or run the automated setup
yarn setup:webhook
```

### 3. Start Development Server
```bash
# Start client and server
yarn dev

# Or start with ngrok for webhook testing
yarn dev:with-ngrok
```

### 4. Setup GitHub Webhooks (for PR notifications)

#### Option A: Automated Setup
```bash
# 1. Generate webhook secret
yarn setup:webhook

# 2. Start ngrok tunnel (in separate terminal)
yarn ngrok

# 3. Get webhook configuration info
yarn webhook:info

# 4. Follow the instructions to configure GitHub webhook
```

#### Option B: Manual Setup
1. Install [ngrok](https://ngrok.com/download)
2. Start ngrok: `ngrok http 5000`
3. Copy the HTTPS URL (e.g., `https://abc123.ngrok-free.app`)
4. Go to GitHub → Settings → Webhooks → Add webhook
5. Set Payload URL: `https://your-ngrok-url/api/webhooks/github`
6. Set Secret: (from `.env` file, `GITHUB_WEBHOOK_SECRET`)
7. Select "Pull requests" events
8. Click "Add webhook"

📖 For detailed webhook setup instructions, see [docs/WEBHOOK_SETUP.md](docs/WEBHOOK_SETUP.md)

## 📦 Available Scripts

- `yarn dev` - Start client and server
- `yarn dev:client` - Start Vite dev server
- `yarn dev:server` - Start Express server
- `yarn dev:with-ngrok` - Start server with ngrok tunnel
- `yarn setup:webhook` - Setup webhook configuration
- `yarn ngrok` - Start ngrok tunnel
- `yarn webhook:info` - Show webhook configuration info
- `yarn build` - Build for production
- `yarn type-check` - Run TypeScript type checking