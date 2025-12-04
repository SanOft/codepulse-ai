/** @format */

import { useCallback, useEffect, useState } from 'react'
import type { CostMetrics, ReviewRequest, ReviewResult } from '@/client/types'
import { getMetrics, postReview } from './api'

interface UseReviewState {
  loading: boolean
  error: string | null
  result: ReviewResult | null
  metrics: CostMetrics | null
}

export function useReview() {
  const [state, setState] = useState<UseReviewState>({
    loading: false,
    error: null,
    result: null,
    metrics: null,
  })

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await getMetrics()
      if (res.success && res.data) {
        setState((prev) => ({
          ...prev,
          metrics: res.data as CostMetrics,
          // Ensure error, loading, and result preserve types and existing values
          error: prev.error,
        }))
      }
    } catch (err) {
      // metrics errors are soft-fail; do not override review errors
      console.error('Failed to fetch metrics', err)
    }
  }, [])

  useEffect(() => {
    void fetchMetrics()
  }, [fetchMetrics])

  const review = useCallback(
    async (payload: ReviewRequest) => {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      try {
        const res = await postReview(payload)
        if (!res.success || !res.data) {
          throw new Error(res.error || 'Review failed')
        }

        setState((prev) => ({
          ...prev,
          result: res.data ?? prev.result,
          loading: false,
          error: null,
        }))

        void fetchMetrics()
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unexpected error'
        setState((prev) => ({ ...prev, loading: false, error: message }))
      }
    },
    [fetchMetrics]
  )

  const clear = useCallback(() => {
    setState((prev) => ({ ...prev, result: null, error: null }))
  }, [])

  return {
    ...state,
    review,
    clear,
  }
}
