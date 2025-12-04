/** @format */

import type {
  ApiResponse,
  CostMetrics,
  ReviewRequest,
  ReviewResult,
} from '@/client/types'

export async function postReview(
  body: ReviewRequest
): Promise<ApiResponse<ReviewResult>> {
  const res = await fetch('/api/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`Review request failed with status ${res.status}`)
  }

  return (await res.json()) as ApiResponse<ReviewResult>
}

export async function getMetrics(): Promise<ApiResponse<CostMetrics>> {
  const res = await fetch('/api/metrics')

  if (!res.ok) {
    throw new Error(`Metrics request failed with status ${res.status}`)
  }

  return (await res.json()) as ApiResponse<CostMetrics>
}
