/** @format */

import Anthropic from '@anthropic-ai/sdk'
import crypto from 'crypto'
import { ReviewResult, ClaudeResponse } from '../types/index.js'

interface CacheEntry {
  result: ReviewResult
  timestamp: number
}

export class ClaudeService {
  private client: Anthropic
  private cache: Map<string, CacheEntry>
  private readonly CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours
  private readonly INPUT_COST_PER_TOKEN = 3 / 1_000_000 // $3 per 1M tokens
  private readonly OUTPUT_COST_PER_TOKEN = 15 / 1_000_000 // $15 per 1M tokens

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey })
    this.cache = new Map()

    // Clean up expired cache entries every hour
    setInterval(() => this.cleanupCache(), 60 * 60 * 1000)
  }

  private generateHash(diff: string): string {
    return crypto.createHash('sha256').update(diff.trim()).digest('hex')
  }

  private cleanupCache(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.CACHE_TTL) {
        this.cache.delete(key)
      }
    }
  }

  private buildPrompt(
    diff: string,
    language?: string,
    context?: string
  ): string {
    return `You are an expert senior code reviewer with deep knowledge of software engineering, security, performance optimization, and accessibility.

Your role is to perform COMPREHENSIVE code reviews focusing on:

1. **CRITICAL ERRORS** - Detect ALL types of errors:
   - Runtime errors (null/undefined access, type mismatches, missing properties)
   - Type errors (TypeScript/JavaScript type issues, incorrect types)
   - Reference errors (undefined variables, missing imports, circular dependencies)
   - Syntax errors (missing brackets, incorrect operators, malformed code)
   - Logic errors (incorrect conditions, wrong calculations, off-by-one errors)

2. **PERFORMANCE ISSUES** - Identify performance problems:
   - Unnecessary re-renders (React components re-rendering without need)
   - Infinite loops (while/for loops that never terminate, recursive calls without base case)
   - Memory leaks (unclosed subscriptions, event listeners not removed, closures holding references)
   - Inefficient algorithms (O(n²) when O(n) is possible, unnecessary nested loops)
   - Big O complexity issues (identify time/space complexity and suggest optimizations)
   - Unoptimized database queries (N+1 queries, missing indexes)
   - Large bundle sizes (unnecessary imports, code splitting opportunities)

3. **CODE QUALITY** - Assess overall code quality:
   - Code maintainability (complex functions, magic numbers, unclear variable names)
   - Code readability (poor formatting, unclear logic flow)
   - Code duplication (DRY principle violations)
   - Proper abstractions (missing interfaces, tight coupling)
   - Error handling (missing try-catch, unhandled promises)
   - Testing considerations (untestable code, missing edge cases)

4. **SCALABILITY** - Check for scalability concerns:
   - Hard-coded limits that won't scale
   - Missing pagination or lazy loading
   - Synchronous operations that should be async
   - Missing caching strategies
   - Resource-intensive operations

5. **ACCESSIBILITY** - Ensure accessibility compliance:
   - Missing ARIA labels and attributes
   - Missing alt text for images
   - Keyboard navigation issues
   - Color contrast problems
   - Screen reader compatibility
   - Focus management issues

6. **SECURITY** - Identify security vulnerabilities:
   - SQL injection risks
   - XSS vulnerabilities
   - Authentication/authorization issues
   - Data exposure (sensitive data in logs, client-side)
   - CSRF vulnerabilities
   - Insecure dependencies

${language ? `Language/Framework: ${language}` : ''}
${context ? `Additional Context: ${context}` : ''}

Review the following code diff and provide a structured analysis:

\`\`\`diff
${diff}
\`\`\`

Respond with ONLY a valid JSON object (no markdown, no code blocks) in this exact format:
{
  "summary": "Brief 1-2 sentence overview of the changes and overall assessment",
  "issues": [
    {
      "severity": "critical|high|medium|low",
      "category": "error|performance|code-quality|scalability|accessibility|security|logic",
      "file": "filename if identifiable",
      "line": line_number_if_applicable,
      "description": "Detailed description of the issue. For errors, specify the exact error type (runtime, type, reference, etc.). For performance, specify the complexity issue or optimization opportunity.",
      "suggestion": "How to fix it with specific code example if possible. Include complete code snippets showing the fix."
    }
  ],
  "complexity": {
    "timeComplexity": "O(n) analysis",
    "spaceComplexity": "O(n) analysis",
    "optimizationSuggestions": ["suggestion 1", "suggestion 2"]
  },
  "accessibility": {
    "missingAria": ["list of missing ARIA attributes"],
    "issues": ["accessibility issue 1", "accessibility issue 2"]
  }
}

If no issues found, return empty issues array. Be thorough and identify ALL potential problems. Focus on actionable feedback with specific code examples.`
  }

  async reviewCode(
    diff: string,
    language?: string,
    context?: string
  ): Promise<ReviewResult> {
    const startTime = Date.now()
    const hash = this.generateHash(diff)

    // Check cache
    const cached = this.cache.get(hash)
    if (cached) {
      console.log('✓ Cache hit:', hash.substring(0, 8))
      return {
        ...cached.result,
        cached: true,
        duration: Date.now() - startTime,
      }
    }

    console.log('✗ Cache miss, calling Claude API:', hash.substring(0, 8))

    try {
      const prompt = this.buildPrompt(diff, language, context)

      const message = await this.client.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 8192, // Increased for large code reviews
        temperature: 0,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      })

      // Extract the text content
      if (!message.content || message.content.length === 0) {
        throw new Error('Claude API returned empty response')
      }

      const content = message.content[0]
      if (content.type !== 'text') {
        throw new Error(`Unexpected response type from Claude: ${content.type}`)
      }

      let responseText = content.text
      console.log('Claude response:', responseText.substring(0, 200))

      // Strip markdown code blocks if present
      responseText = responseText.trim()
      if (responseText.startsWith('```json')) {
        responseText = responseText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
      } else if (responseText.startsWith('```')) {
        responseText = responseText.replace(/^```\s*/, '').replace(/\s*```$/, '')
      }

      // Parse JSON response
      let parsedResponse: ClaudeResponse
      try {
        parsedResponse = JSON.parse(responseText)
      } catch (parseError) {
        console.error('Failed to parse Claude response:', responseText)
        throw new Error('Failed to parse Claude response as JSON')
      }

      // Calculate cost
      const inputTokens = message.usage.input_tokens
      const outputTokens = message.usage.output_tokens
      const cost =
        inputTokens * this.INPUT_COST_PER_TOKEN +
        outputTokens * this.OUTPUT_COST_PER_TOKEN

      const result: ReviewResult = {
        id: crypto.randomUUID(),
        summary: parsedResponse.summary,
        issues: parsedResponse.issues || [],
        cost: Math.round(cost * 100000) / 100000, // Round to 5 decimal places
        tokensUsed: {
          input: inputTokens,
          output: outputTokens,
        },
        duration: Date.now() - startTime,
        cached: false,
        timestamp: Date.now(),
      }

      // Store in cache
      this.cache.set(hash, {
        result: { ...result },
        timestamp: Date.now(),
      })

      console.log(
        `✓ Review completed in ${
          result.duration
        }ms, cost: $${result.cost.toFixed(5)}`
      )
      return result
    } catch (error) {
      console.error('Claude API error:', error)

      // Handle Anthropic SDK errors
      if (error && typeof error === 'object' && 'status' in error) {
        const apiError = error as any

        // Extract error message from Anthropic API response
        let errorMessage = 'Claude API request failed'

        if (apiError.error && typeof apiError.error === 'object') {
          if (apiError.error.message) {
            errorMessage = apiError.error.message
          } else if (apiError.error.error && apiError.error.error.message) {
            errorMessage = apiError.error.error.message
          }
        }

        // Handle specific error cases
        if (apiError.status === 401) {
          throw new Error('Invalid Anthropic API key. Please check your API key in the .env file.')
        } else if (apiError.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a few moments.')
        } else if (apiError.status === 400) {
          // Check for credit balance error
          if (errorMessage.toLowerCase().includes('credit balance')) {
            throw new Error('Insufficient Anthropic API credits. Please add credits at console.anthropic.com/settings/billing')
          }
          throw new Error(`Invalid request: ${errorMessage}`)
        } else if (apiError.status === 500 || apiError.status === 502 || apiError.status === 503) {
          throw new Error('Anthropic API is temporarily unavailable. Please try again later.')
        }

        throw new Error(`Claude API error (${apiError.status}): ${errorMessage}`)
      }

      if (error instanceof Error) {
        // Provide more helpful error messages
        if (error.message.includes('model')) {
          throw new Error(
            `Invalid Claude model configuration: ${error.message}`
          )
        }
        if (
          error.message.includes('API key') ||
          error.message.includes('authentication')
        ) {
          throw new Error('Invalid or missing Anthropic API key')
        }
        if (error.message.includes('fetch') || error.message.includes('network')) {
          throw new Error('Network error: Unable to reach Anthropic API. Please check your internet connection.')
        }
        throw new Error(`Claude API error: ${error.message}`)
      }
      throw new Error('Unknown error occurred while calling Claude API')
    }
  }

  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.entries()).map(([hash, entry]) => ({
        hash: hash.substring(0, 8),
        timestamp: entry.timestamp,
        age: Date.now() - entry.timestamp,
      })),
    }
  }
}
