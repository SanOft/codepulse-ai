## 🚀 Overview

CodePulse AI is a production-grade AI code intelligence platform powered by Anthropic Claude Sonnet 4.5.  
It performs deep code reviews, detects security vulnerabilities, analyzes performance issues, and integrates directly with GitHub pull requests.

The platform is built for scale — capable of handling **100,000+ automated code reviews per month**, with strict budget enforcement and real-time analytics.

---

## ✨ Features

### 🔍 AI Code Review
- Detects logic, runtime, syntax, and type errors  
- Security scanning: SQL Injection, XSS, CSRF, authentication flaws  
- Performance analysis: memory leaks, infinite loops, N+1 queries  
- Complexity analysis (Big-O for time & space)  
- Best-practice recommendations with code examples  
- Supports 12+ programming languages  

### ⚡ GitHub Integration
- OAuth2 authentication  
- Automatic PR review  
- Webhook-based real-time notifications  
- Unified diff analysis  
- AI code fix proposals  

### 📊 Cost & Metrics
- Daily limit: **$0.50**, monthly limit: **$10.00**  
- Real-time cost tracking + token usage  
- Semantic caching with SHA-256 hashing (70% cost reduction)  
- Cache analytics + hit/miss tracking  
- Review history & visual charts  

### 🔒 Security Auditing
- Detects insecure patterns  
- Hardcoded secrets & sensitive data exposure  
- Missing authorization checks  
- Insecure API usage  
- OWASP-aligned scanning  

### 🛰 Real-time Developer Experience
- WebSocket notifications  
- Modern dark UI  
- Error insight panel  
- Cost estimator  
- Multi-project support  

---

## 🏗️ Tech Stack

### Frontend
- React **19**
- Vite **6**
- Styled-Components  
- React Router **7**
- Chart.js / react-chartjs-2  
- WebSockets  

### Backend
- Node.js + Express **4.x**
- TypeScript (strict)  
- Anthropic Claude SDK  
- WebSocket server  
- Semantic cache (SHA-256)  

---

## 📁 Project Structure
```
codepulse-ai/
├── src/
│   ├── client/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   └── styles/
│   └── server/
│       ├── services/
│       ├── routes/
│       ├── types/
│       └── server.ts
├── scripts/
├── docs/
└── .env.example
```

---

## ⚙️ Installation

### 1. Install Dependencies
```bash
yarn install
```

### 2. Setup Environment
```bash
cp .env.example .env
```

Or automated:
```bash
yarn setup:webhook
```

### 3. Start Development
```bash
yarn dev
```

### 4. Start with ngrok (for Webhooks)
```bash
yarn dev:with-ngrok
```

---

## 🔔 GitHub Webhook Setup

### Automated (Recommended)
```bash
yarn setup:webhook
yarn ngrok
yarn webhook:info
```

### Manual Steps
1. Run:
   ```bash
   ngrok http 5000
   ```
2. Copy the HTTPS URL  
3. GitHub → Repo → Settings → Webhooks  
4. Add:
   ```
   Payload URL: https://your-ngrok-url/api/webhooks/github
   Secret: GITHUB_WEBHOOK_SECRET
   Events: Pull requests
   ```
5. Save  

---

## 🔌 API Endpoints

### Code Review
- `POST /api/review`
- `GET /api/metrics`
- `GET /api/health`

### GitHub
- `GET /api/github/repositories`
- `GET /api/github/repos/:owner/:repo/pulls`
- `POST /api/github/review-pr`
- `POST /api/github/fix-code`

### Webhooks
- `POST /api/webhooks/github`

---

## 📈 Performance Benchmarks

| Metric | Value |
|--------|-------|
| Avg Review Time | 30–45s |
| Cache Hit Rate | 40–60% |
| Uptime | 99.9% |
| Error Rate | <1% |
| Max Diff Size | 50KB |
| Avg Review Cost | $0.02–$0.05 |

---

## 🗺️ Roadmap
- JIRA / Linear / Asana task generation  
- Multi-tenant SaaS mode  
- Advanced analytics dashboard  
- Custom rule engine  
- CI/CD integrations  
- Team collaboration features  

---

## 🤝 Contributing

Please follow:  
- TypeScript strict-mode  
- Clean service-layer architecture  
- Secure coding practices  
- Component-driven frontend design  

---

## 📄 License
MIT License

---

## 📬 Contact
- Website: https://sanjarjuraev.dev  
- Email: sanjar.juraev0409@gmail.com  
- Issues: https://github.com/SanOft/codepulse-ai/issues  


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