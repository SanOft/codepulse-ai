/** @format */

import { useState, useCallback, useEffect } from 'react'
import { ReviewRequest, ReviewResult, ApiResponse, CostMetrics } from '../types'

interface UseReviewReturn {
  review: (request: ReviewRequest) => Promise<void>
  result: ReviewResult | null
  metrics: CostMetrics | null
  loading: boolean
  error: string | null
  clear: () => void
}

export function useReview(): UseReviewReturn {
  const [result, setResult] = useState<ReviewResult | null>(null)
  const [metrics, setMetrics] = useState<CostMetrics | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = useCallback(async () => {
    try {
      const response = await fetch('/api/metrics')
      const data: ApiResponse<CostMetrics> = await response.json()

      if (data.success && data.data) {
        setMetrics(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch metrics:', err)
    }
  }, [])

  // Fetch metrics on mount and after each review
  useEffect(() => {
    fetchMetrics()
  }, [fetchMetrics])

  const review = useCallback(
    async (request: ReviewRequest) => {
      setLoading(true)
      setError(null)
      setResult(null)

      try {
        const response = await fetch('/api/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        })

        const data: ApiResponse<ReviewResult> = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to review code')
        }

        if (data.data) {
          setResult(data.data)
          // Fetch updated metrics after successful review
          await fetchMetrics()
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred'
        setError(message)
        console.error('Review error:', err)
      } finally {
        setLoading(false)
      }
    },
    [fetchMetrics]
  )

  const clear = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return {
    review,
    result,
    metrics,
    loading,
    error,
    clear,
  }
}
