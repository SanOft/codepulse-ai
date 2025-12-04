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
  complexity?: {
    timeComplexity?: string;
    spaceComplexity?: string;
    optimizationSuggestions?: string[];
  };
  accessibility?: {
    missingAria?: string[];
    issues?: string[];
  };
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
  complexity?: {
    timeComplexity?: string;
    spaceComplexity?: string;
    optimizationSuggestions?: string[];
  };
  accessibility?: {
    missingAria?: string[];
    issues?: string[];
  };
}

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string | null;
  private: boolean;
  defaultBranch: string;
  language: string | null;
  stars: number;
  updatedAt: string;
}

export interface PullRequest {
  id: string;
  number: number;
  title: string;
  body: string | null;
  state: 'open' | 'closed';
  author: string;
  authorAvatar: string;
  createdAt: string;
  updatedAt: string;
  mergedAt: string | null;
  head: {
    ref: string;
    sha: string;
  };
  base: {
    ref: string;
    sha: string;
  };
  repository: {
    owner: string;
    name: string;
    fullName: string;
  };
  url: string;
  diffUrl: string;
}

export interface PRFile {
  filename: string;
  status: 'added' | 'removed' | 'modified' | 'renamed';
  additions: number;
  deletions: number;
  changes: number;
  patch: string;
  blobUrl: string;
  rawUrl: string;
}

export interface DependencyCheck {
  hasDependencies: boolean;
  dependencies: string[];
  usages: Array<{ file: string; line: number }>;
  warnings: string[];
}

export interface CodeFix {
  originalCode: string;
  fixedCode: string;
  changes: string;
  dependencyCheck: DependencyCheck;
  explanation: string;
}

export interface CodeFixRequest {
  token: string;
  owner: string;
  repo: string;
  filePath: string;
  originalCode: string;
  issues: Array<{ description: string; suggestion: string; line?: number }>;
}
