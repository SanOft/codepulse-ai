<!-- @format -->

# Project: CodePulse AI - AI Code Intelligence Platform

Build a production-grade AI code review platform with the following specifications:

## Project Overview

- **Name:** CodePulse AI
- **Description:** Production-grade AI code intelligence platform processing 100K+ reviews/month
- **Tech Stack:** TypeScript, React 19, Vite, Node.js, Express, Anthropic Claude API
- **Package Manager:** yarn (use yarn for all commands)

## Architecture

### Backend (Express + TypeScript)

Location: `src/server/`

**Files to create:**

1. `src/server/types/index.ts` - TypeScript interfaces:

   - ReviewRequest { diff: string; language?: string; context?: string }
   - ReviewResult { id, summary, issues[], cost, tokensUsed, duration, cached, timestamp }
   - CodeIssue { severity, category, file?, line?, description, suggestion }
   - ApiResponse<T> { success, data?, error?, timestamp }
   - CostMetrics { reviewCount, totalCost, averageCost, totalTokens, cacheHitRate }

2. `src/server/services/claude.service.ts` - Claude API integration:

   - Class ClaudeService with reviewCode() method
   - Uses @anthropic-ai/sdk with claude-sonnet-4-20250514 model
   - Implements simple in-memory caching with crypto hash
   - Calculate costs: $3/1M input tokens, $15/1M output tokens
   - Parse JSON responses from Claude
   - Build prompts for TMS/logistics code review context

3. `src/server/server.ts` - Express server:
   - Port 3001
   - CORS enabled
   - Routes:
     - GET /api/health - health check with cache stats
     - POST /api/review - review code endpoint
     - GET /api/metrics - cost metrics endpoint
   - Track metrics: totalReviews, totalCost, totalTokens, cacheHits
   - Error handling middleware
   - Request logging
   - Validation (max 50KB diff size)

### Frontend (React 19 + TypeScript + Vite)

Location: `src/client/`

**Files to create:**

1. `src/client/types/index.ts` - Frontend types (same as backend types)

2. `src/client/App.tsx` - Main application:

   - Dark theme UI with CodePulse AI branding
   - Colors: primary #6366f1, secondary #8b5cf6, accent #06b6d4
   - Header with logo and title
   - Cost tracker dashboard (review count, total cost, avg cost, cache hit rate)
   - Review form with large textarea for diff input
   - "Review Code" and "Clear" buttons
   - Loading state with spinner
   - Results display with summary and issues list
   - Issues color-coded by severity (critical: red, high: orange, medium: yellow, low: blue)

3. `src/client/hooks/useReview.ts` - Custom hook:

   - Handles API calls to backend
   - Manages loading/error states
   - Fetches and updates metrics

4. `src/client/main.tsx` - Entry point (update to use client folder)

5. `src/client/App.css` - Styling:
   - Dark theme (#0f172a background, #1e293b cards)
   - Glassmorphism effects
   - Smooth animations
   - Responsive design

### Configuration Files

1. `.env` file:

```
PORT=3001
NODE_ENV=development
ANTHROPIC_API_KEY=sk-ant-api03-xxx
REDIS_HOST=localhost
REDIS_PORT=6379
DAILY_COST_LIMIT=2.00
MONTHLY_COST_LIMIT=50.00
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=50
```

2. `package.json` scripts:

```json
{
  "scripts": {
    "dev": "concurrently \"yarn dev:client\" \"yarn dev:server\"",
    "dev:client": "vite",
    "dev:server": "tsx watch src/server/server.ts",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

3. `vite.config.ts` - Configure server proxy:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
```

4. `tsconfig.json` - Strict TypeScript config with paths for @/client and @/server

## Dependencies to Install (use yarn)

```bash
# Core dependencies
yarn add @anthropic-ai/sdk express cors dotenv

# Dev dependencies
yarn add -D @types/express @types/cors @types/node tsx concurrently typescript @vitejs/plugin-react
```

## Key Features to Implement

1. **Semantic Caching:**

   - Generate SHA-256 hash of diff content
   - Store results in memory Map
   - Return cached results instantly
   - Track cache hit rate

2. **Cost Tracking:**

   - Calculate cost per review (input + output tokens)
   - Maintain running totals
   - Display metrics in UI dashboard

3. **Error Handling:**

   - Validate diff size (<50KB)
   - Handle API errors gracefully
   - Show user-friendly error messages
   - Retry logic for failed requests

4. **UI/UX:**

   - Professional dark theme
   - Loading states with spinner
   - Issues grouped by severity
   - Copy-paste friendly diff input
   - Example diff button
   - Real-time cost updates

5. **Prompt Engineering:**
   - Context: "Senior code reviewer for logistics TMS system"
   - Focus on: security, performance, logic errors, React best practices
   - Request structured JSON response
   - Include specific examples for better results

## Example Diff for Testing

```diff
diff --git a/src/services/TrackingService.ts b/src/services/TrackingService.ts
--- a/src/services/TrackingService.ts
+++ b/src/services/TrackingService.ts
@@ -15,8 +15,8 @@ export class TrackingService {
   async updateLocation(truckId: string, lat: number, lng: number) {
-    const query = `UPDATE trucks SET lat = ${lat}, lng = ${lng} WHERE id = ${truckId}`;
-    await db.query(query);
+    await db.query('UPDATE trucks SET lat = ?, lng = ? WHERE id = ?', [lat, lng, truckId]);
     this.subscribers.forEach(fn => fn(truckId, { lat, lng }));
   }
```

## Success Criteria

1. Backend starts on port 3001 without errors
2. Frontend starts on port 3000 without errors
3. Can paste diff and get AI review with issues found
4. Cost tracking displays correctly
5. Caching works (second identical diff returns instantly)
6. Dark theme looks professional
7. All TypeScript types are properly defined
8. No console errors

## Project Structure

```
codepulse-ai/
├── .env
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── src/
    ├── client/
    │   ├── components/
    │   ├── hooks/
    │   ├── types/
    │   ├── App.tsx
    │   ├── App.css
    │   └── main.tsx
    └── server/
        ├── services/
        │   └── claude.service.ts
        ├── types/
        │   └── index.ts
        └── server.ts
```

## Important Notes

- Use yarn for all package management
- Use TypeScript strict mode
- Follow React 19 best practices
- Keep components functional with hooks
- Use async/await for all API calls
- Implement proper error boundaries
- Add console.log for debugging
- Make UI responsive

Build this as a portfolio-quality project that demonstrates:

- Production TypeScript patterns
- AI/ML integration
- Cost optimization (caching)
- Modern React development
- Full-stack architecture
- Professional UI/UX

Start by setting up the project structure, then backend, then frontend.
Test each component as you build it.
