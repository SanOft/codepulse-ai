export interface ReviewRequest {
  diff: string;
  language?: string;
  context?: string;
}

export interface CodeIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  file?: string;
  line?: number;
  description: string;
  suggestion: string;
}

export interface ReviewResult {
  id: string;
  summary: string;
  issues: CodeIssue[];
  cost: number;
  tokensUsed: {
    input: number;
    output: number;
  };
  duration: number;
  cached: boolean;
  timestamp: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

export interface CostMetrics {
  reviewCount: number;
  totalCost: number;
  averageCost: number;
  totalTokens: number;
  cacheHitRate: number;
}

export interface ClaudeResponse {
  summary: string;
  issues: CodeIssue[];
}
