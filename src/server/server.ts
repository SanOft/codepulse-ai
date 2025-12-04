import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { ClaudeService } from './services/claude.service.js';
import { GitHubService } from './services/github.service.js';
import { CodeFixService } from './services/code-fix.service.js';
import { webSocketService } from './services/websocket.service.js';
import { ReviewRequest, ApiResponse, ReviewResult, CostMetrics, CodeFixRequest } from './types/index.js';
import authRoutes from './routes/auth.routes.js';
import webhookRoutes from './routes/webhooks.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.ANTHROPIC_API_KEY;

if (!API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY is not set in .env file');
  process.exit(1);
}

// Initialize services
const claudeService = new ClaudeService(API_KEY);
const githubService = new GitHubService();
const codeFixService = new CodeFixService(githubService, claudeService);

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

// Auth routes - mount at both /api and root for OAuth callbacks
app.use('/api', authRoutes);
app.use('/', authRoutes);

// Webhook routes
app.use('/api/webhooks', webhookRoutes);

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
app.get('/api/health', (_req: Request, res: Response) => {
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

    // Determine appropriate status code based on error
    let statusCode = 500;
    let errorMessage = 'Internal server error';

    if (error instanceof Error) {
      errorMessage = error.message;

      // Set specific status codes for different error types
      if (errorMessage.includes('Invalid Anthropic API key') ||
          errorMessage.includes('authentication')) {
        statusCode = 401;
      } else if (errorMessage.includes('Rate limit exceeded')) {
        statusCode = 429;
      } else if (errorMessage.includes('Insufficient') ||
                 errorMessage.includes('credit balance')) {
        statusCode = 402; // Payment Required
      } else if (errorMessage.includes('Invalid request')) {
        statusCode = 400;
      }
    }

    const response: ApiResponse<never> = {
      success: false,
      error: errorMessage,
      timestamp: Date.now()
    };
    res.status(statusCode).json(response);
  }
});

// Metrics endpoint
app.get('/api/metrics', (_req: Request, res: Response) => {
  const costMetrics: CostMetrics = {
    reviewCount: metrics.totalReviews,
    totalCost: Math.round(metrics.totalCost * 100000) / 100000,
    averageCost: metrics.totalReviews > 0
      ? Math.round((metrics.totalCost / metrics.totalReviews) * 100000) / 100000
      : 0,
    totalTokens: metrics.totalTokens,
    cacheHitRate: metrics.totalReviews > 0
      ? metrics.cacheHits / metrics.totalReviews
      : 0
  };

  const response: ApiResponse<CostMetrics> = {
    success: true,
    data: costMetrics,
    timestamp: Date.now()
  };

  res.json(response);
});

// GitHub Integration Routes
app.get('/api/github/repositories', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'GitHub token required',
        timestamp: Date.now()
      });
    }

    const repositories = await githubService.getRepositories(token);
    res.json({
      success: true,
      data: repositories,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error fetching repositories:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch repositories',
      timestamp: Date.now()
    });
  }
});

app.get('/api/github/repos/:owner/:repo/pulls', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'GitHub token required',
        timestamp: Date.now()
      });
    }

    const { owner, repo } = req.params;
    const state = (req.query.state as 'open' | 'closed' | 'all') || 'open';
    const pulls = await githubService.getPullRequests(token, owner, repo, state);
    
    res.json({
      success: true,
      data: pulls,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error fetching pull requests:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch pull requests',
      timestamp: Date.now()
    });
  }
});

app.get('/api/github/repos/:owner/:repo/pulls/:number/diff', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'GitHub token required',
        timestamp: Date.now()
      });
    }

    const { owner, repo, number } = req.params;
    const prNumber = parseInt(number, 10);
    const diff = await githubService.getPRDiff(token, owner, repo, prNumber);
    
    res.json({
      success: true,
      data: { diff },
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error fetching PR diff:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch PR diff',
      timestamp: Date.now()
    });
  }
});

app.get('/api/github/repos/:owner/:repo/pulls/:number/files', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'GitHub token required',
        timestamp: Date.now()
      });
    }

    const { owner, repo, number } = req.params;
    const prNumber = parseInt(number, 10);
    const files = await githubService.getPRFiles(token, owner, repo, prNumber);
    
    res.json({
      success: true,
      data: files,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error fetching PR files:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch PR files',
      timestamp: Date.now()
    });
  }
});

app.post('/api/github/review-pr', async (req: Request, res: Response) => {
  try {
    const { token, owner, repo, prNumber, language, context } = req.body;
    
    if (!token || !owner || !repo || !prNumber) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: token, owner, repo, prNumber',
        timestamp: Date.now()
      });
    }

    // Get PR diff
    const diff = await githubService.getPRDiff(token, owner, repo, prNumber);
    
    // Review the code
    const reviewResult = await claudeService.reviewCode(diff, language, context);
    
    res.json({
      success: true,
      data: reviewResult,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error reviewing PR:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to review PR',
      timestamp: Date.now()
    });
  }
});

app.post('/api/github/fix-code', async (req: Request, res: Response) => {
  try {
    const fixRequest: CodeFixRequest = req.body;
    
    if (!fixRequest.token || !fixRequest.owner || !fixRequest.repo || !fixRequest.filePath || !fixRequest.originalCode || !fixRequest.issues) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        timestamp: Date.now()
      });
    }

    const fix = await codeFixService.generateFix(
      fixRequest.token,
      fixRequest.owner,
      fixRequest.repo,
      fixRequest.filePath,
      fixRequest.originalCode,
      fixRequest.issues
    );
    
    res.json({
      success: true,
      data: fix,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error fixing code:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fix code',
      timestamp: Date.now()
    });
  }
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  const response: ApiResponse<never> = {
    success: false,
    error: 'Internal server error',
    timestamp: Date.now()
  };
  res.status(500).json(response);
});

// 404 handler
app.use((_req: Request, res: Response) => {
  const response: ApiResponse<never> = {
    success: false,
    error: 'Not found',
    timestamp: Date.now()
  };
  res.status(404).json(response);
});

// Initialize WebSocket server
webSocketService.initialize(server);

// Start server
server.listen(PORT, () => {
  console.log(`\n🚀 CodePulse AI Server`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`🔌 WebSocket server running on ws://localhost:${PORT}/ws`);
  console.log(`🔑 API Key: ${API_KEY.substring(0, 20)}...`);
  console.log(`💾 Cache: In-memory (24h TTL)`);
  console.log(`⏰ Started: ${new Date().toLocaleString()}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});
