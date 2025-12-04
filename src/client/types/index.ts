/** @format */

export interface ReviewRequest {
  diff: string
  language?: string
  context?: string
}

export type IssueSeverity = 'critical' | 'high' | 'medium' | 'low'

export interface CodeIssue {
  severity: IssueSeverity
  category: string
  file?: string
  line?: number
  description: string
  suggestion: string
}

export interface ReviewResult {
  id: string
  summary: string
  issues: CodeIssue[]
  cost: number
  tokensUsed: {
    input: number
    output: number
  }
  duration: number
  cached: boolean
  timestamp: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  timestamp: number
}

export interface CostMetrics {
  reviewCount: number
  totalCost: number
  averageCost: number
  totalTokens: number
  cacheHitRate: number
}
