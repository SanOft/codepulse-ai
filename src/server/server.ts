import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ClaudeService } from './services/claude.service.js';
import { ReviewRequest, ApiResponse, ReviewResult, CostMetrics } from './types/index.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.ANTHROPIC_API_KEY;

if (!API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY is not set in .env file');
  process.exit(1);
}

// Initialize Claude service
const claudeService = new ClaudeService(API_KEY);

// Metrics tracking
const metrics = {
  totalReviews: 0,
  totalCost: 0,
  totalTokens: 0,
  cacheHits: 0,
  startTime: Date.now()
};

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} [${duration}ms]`);
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  const cacheStats = claudeService.getCacheStats();
  const response: ApiResponse<any> = {
    success: true,
    data: {
      status: 'healthy',
      uptime: Date.now() - metrics.startTime,
      cache: {
        size: cacheStats.size,
        entries: cacheStats.entries
      },
      metrics: {
        totalReviews: metrics.totalReviews,
        totalCost: metrics.totalCost,
        cacheHits: metrics.cacheHits
      }
    },
    timestamp: Date.now()
  };
  res.json(response);
});

// Code review endpoint
app.post('/api/review', async (req: Request, res: Response) => {
  try {
    const { diff, language, context }: ReviewRequest = req.body;

    // Validation
    if (!diff || typeof diff !== 'string') {
      const response: ApiResponse<never> = {
        success: false,
        error: 'Diff is required and must be a string',
        timestamp: Date.now()
      };
      return res.status(400).json(response);
    }

    if (diff.length > 50 * 1024) {
      const response: ApiResponse<never> = {
        success: false,
        error: 'Diff size exceeds 50KB limit',
        timestamp: Date.now()
      };
      return res.status(400).json(response);
    }

    console.log(`\n📝 Processing review request (${diff.length} bytes)`);

    // Perform review
    const result = await claudeService.reviewCode(diff, language, context);

    // Update metrics
    metrics.totalReviews++;
    metrics.totalCost += result.cost;
    metrics.totalTokens += result.tokensUsed.input + result.tokensUsed.output;
    if (result.cached) {
      metrics.cacheHits++;
    }

    const response: ApiResponse<ReviewResult> = {
      success: true,
      data: result,
      timestamp: Date.now()
    };

    console.log(`✅ Review completed: ${result.issues.length} issues found, cached: ${result.cached}`);
    res.json(response);

  } catch (error) {
    console.error('❌ Review error:', error);
    const response: ApiResponse<never> = {
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: Date.now()
    };
    res.status(500).json(response);
  }
});

// Metrics endpoint
app.get('/api/metrics', (req: Request, res: Response) => {
  const costMetrics: CostMetrics = {
    reviewCount: metrics.totalReviews,
    totalCost: Math.round(metrics.totalCost * 100000) / 100000,
    averageCost: metrics.totalReviews > 0
      ? Math.round((metrics.totalCost / metrics.totalReviews) * 100000) / 100000
      : 0,
    totalTokens: metrics.totalTokens,
    cacheHitRate: metrics.totalReviews > 0
      ? Math.round((metrics.cacheHits / metrics.totalReviews) * 100)
      : 0
  };

  const response: ApiResponse<CostMetrics> = {
    success: true,
    data: costMetrics,
    timestamp: Date.now()
  };

  res.json(response);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  const response: ApiResponse<never> = {
    success: false,
    error: 'Internal server error',
    timestamp: Date.now()
  };
  res.status(500).json(response);
});

// 404 handler
app.use((req: Request, res: Response) => {
  const response: ApiResponse<never> = {
    success: false,
    error: 'Not found',
    timestamp: Date.now()
  };
  res.status(404).json(response);
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 CodePulse AI Server`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`🔑 API Key: ${API_KEY.substring(0, 20)}...`);
  console.log(`💾 Cache: In-memory (24h TTL)`);
  console.log(`⏰ Started: ${new Date().toLocaleString()}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});
