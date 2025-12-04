/** @format */

/**
 * Estimates the number of tokens in a text string
 *
 * This is a rough approximation based on OpenAI's tokenization rules:
 * - 1 token ≈ 4 characters for English text
 * - 1 token ≈ 3-4 characters for code
 * - Special characters and punctuation may use more tokens
 *
 * For more accurate results, you would need to use the actual tokenizer,
 * but this provides a good estimate for cost planning.
 */
export function estimateTokens(text: string): number {
  if (!text) return 0

  // Basic character-based estimation
  // Average of 3.5 characters per token for code
  const charactersPerToken = 3.5
  const estimatedTokens = Math.ceil(text.length / charactersPerToken)

  return estimatedTokens
}

/**
 * Estimates the cost of a review based on token count
 * Claude Sonnet 4.5 pricing:
 * - Input: $3 per 1M tokens
 * - Output: $15 per 1M tokens
 */
export function estimateReviewCost(diffText: string): {
  inputTokens: number
  estimatedOutputTokens: number
  estimatedInputCost: number
  estimatedOutputCost: number
  estimatedTotalCost: number
} {
  // Estimate input tokens (diff + system prompt)
  const systemPromptTokens = 800 // Approximate size of the review prompt
  const diffTokens = estimateTokens(diffText)
  const totalInputTokens = systemPromptTokens + diffTokens

  // Estimate output tokens (review response)
  // Typically 30-50% of input size for detailed reviews
  const estimatedOutputTokens = Math.ceil(totalInputTokens * 0.4)

  // Calculate costs
  const inputCostPerToken = 3 / 1_000_000
  const outputCostPerToken = 15 / 1_000_000

  const estimatedInputCost = totalInputTokens * inputCostPerToken
  const estimatedOutputCost = estimatedOutputTokens * outputCostPerToken
  const estimatedTotalCost = estimatedInputCost + estimatedOutputCost

  return {
    inputTokens: totalInputTokens,
    estimatedOutputTokens,
    estimatedInputCost,
    estimatedOutputCost,
    estimatedTotalCost,
  }
}

/**
 * Formats token count with commas for readability
 */
export function formatTokenCount(tokens: number): string {
  return tokens.toLocaleString()
}

/**
 * Formats cost as currency
 */
export function formatCost(cost: number): string {
  if (cost < 0.01) {
    return `$${cost.toFixed(5)}`
  }
  return `$${cost.toFixed(4)}`
}
