# GitHub Webhook Setup for Local Development

## Option 1: Using ngrok (Recommended)

### Step 1: Install ngrok

**Windows:**
1. Download from https://ngrok.com/download
2. Extract `ngrok.exe` to a folder (e.g., `C:\ngrok`)
3. Add to PATH or use full path

**Or using Chocolatey:**
```bash
choco install ngrok
```

**Or using Scoop:**
```bash
scoop install ngrok
```

### Step 2: Start your local server

```bash
yarn dev:server
# Server runs on http://localhost:5000
```

### Step 3: Start ngrok tunnel

Open a new terminal and run:

```bash
ngrok http 5000
```

You'll see output like:
```
Forwarding    https://abc123.ngrok-free.app -> http://localhost:5000
```

**Copy the HTTPS URL** (e.g., `https://abc123.ngrok-free.app`)

### Step 4: Configure GitHub Webhook

1. Go to your GitHub repository
2. Settings → Webhooks → Add webhook
3. **Payload URL:** `https://abc123.ngrok-free.app/api/webhooks/github`
4. **Content type:** `application/json`
5. **Secret:** (create a random secret, e.g., `openssl rand -hex 32`)
6. **Which events:** Select "Pull requests"
7. Click "Add webhook"

### Step 5: Add Secret to .env

Add the webhook secret to your `.env` file:

```env
GITHUB_WEBHOOK_SECRET=your_secret_here
```

### Step 6: Test the Webhook

1. Create a test pull request in your repository
2. You should see the webhook request in ngrok's web interface: http://localhost:4040
3. Check your server logs for webhook processing
4. You should receive a Sonner notification in your app!

---

## Option 2: Using localtunnel (Free Alternative)

### Step 1: Install localtunnel

```bash
npm install -g localtunnel
# or
yarn global add localtunnel
```

### Step 2: Start tunnel

```bash
lt --port 5000
```

You'll get a URL like: `https://random-name.loca.lt`

### Step 3: Use this URL in GitHub webhook

**Payload URL:** `https://random-name.loca.lt/api/webhooks/github`

**Note:** localtunnel URLs change each time you restart. ngrok is more stable for development.

---

## Option 3: Using Cloudflare Tunnel (Cloudflare Zero Trust)

If you have Cloudflare Zero Trust:

```bash
cloudflared tunnel --url http://localhost:5000
```

---

## Troubleshooting

### Webhook not receiving events?

1. **Check ngrok is running:** Visit http://localhost:4040 to see requests
2. **Check server logs:** Look for webhook processing messages
3. **Verify webhook secret:** Make sure `.env` has `GITHUB_WEBHOOK_SECRET`
4. **Check GitHub webhook delivery:** In GitHub, go to Settings → Webhooks → Your webhook → Recent Deliveries

### Webhook signature verification failing?

- Make sure `GITHUB_WEBHOOK_SECRET` in `.env` matches the secret in GitHub webhook settings
- The secret must be the same on both sides

### ngrok free tier limitations?

- Free tier: URLs change on restart
- Paid tier: Fixed domain names
- For production, use a proper domain with SSL

---

## Production Setup

For production, you'll need:

1. A domain name (e.g., `api.codepulse-ai.com`)
2. SSL certificate (Let's Encrypt is free)
3. Set webhook URL to: `https://api.codepulse-ai.com/api/webhooks/github`
4. Ensure `GITHUB_WEBHOOK_SECRET` is set in production environment

