import Anthropic from '@anthropic-ai/sdk';
import crypto from 'crypto';
import { ReviewResult, CodeIssue, ClaudeResponse } from '../types/index.js';

interface CacheEntry {
  result: ReviewResult;
  timestamp: number;
}

export class ClaudeService {
  private client: Anthropic;
  private cache: Map<string, CacheEntry>;
  private readonly CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
  private readonly INPUT_COST_PER_TOKEN = 3 / 1_000_000; // $3 per 1M tokens
  private readonly OUTPUT_COST_PER_TOKEN = 15 / 1_000_000; // $15 per 1M tokens

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
    this.cache = new Map();

    // Clean up expired cache entries every hour
    setInterval(() => this.cleanupCache(), 60 * 60 * 1000);
  }

  private generateHash(diff: string): string {
    return crypto.createHash('sha256').update(diff.trim()).digest('hex');
  }

  private cleanupCache(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.CACHE_TTL) {
        this.cache.delete(key);
      }
    }
  }

  private buildPrompt(diff: string, language?: string, context?: string): string {
    return `You are a senior code reviewer for a logistics Transportation Management System (TMS).
Your role is to perform thorough code reviews focusing on:

1. **Security vulnerabilities** (SQL injection, XSS, authentication issues, data exposure)
2. **Performance issues** (inefficient queries, memory leaks, unnecessary re-renders)
3. **Logic errors** (race conditions, edge cases, incorrect business logic)
4. **Best practices** (React patterns, TypeScript usage, error handling)
5. **Code quality** (maintainability, readability, proper abstractions)

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
      "category": "security|performance|logic|best-practices|code-quality",
      "file": "filename if identifiable",
      "line": line_number_if_applicable,
      "description": "What the issue is",
      "suggestion": "How to fix it with specific code example if possible"
    }
  ]
}

If no issues found, return empty issues array. Focus on actionable feedback.`;
  }

  async reviewCode(
    diff: string,
    language?: string,
    context?: string
  ): Promise<ReviewResult> {
    const startTime = Date.now();
    const hash = this.generateHash(diff);

    // Check cache
    const cached = this.cache.get(hash);
    if (cached) {
      console.log('✓ Cache hit:', hash.substring(0, 8));
      return {
        ...cached.result,
        cached: true,
        duration: Date.now() - startTime
      };
    }

    console.log('✗ Cache miss, calling Claude API:', hash.substring(0, 8));

    try {
      const prompt = this.buildPrompt(diff, language, context);

      const message = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        temperature: 0,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      // Extract the text content
      const content = message.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Claude');
      }

      const responseText = content.text;
      console.log('Claude response:', responseText.substring(0, 200));

      // Parse JSON response
      let parsedResponse: ClaudeResponse;
      try {
        parsedResponse = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse Claude response:', responseText);
        throw new Error('Failed to parse Claude response as JSON');
      }

      // Calculate cost
      const inputTokens = message.usage.input_tokens;
      const outputTokens = message.usage.output_tokens;
      const cost =
        inputTokens * this.INPUT_COST_PER_TOKEN +
        outputTokens * this.OUTPUT_COST_PER_TOKEN;

      const result: ReviewResult = {
        id: crypto.randomUUID(),
        summary: parsedResponse.summary,
        issues: parsedResponse.issues || [],
        cost: Math.round(cost * 100000) / 100000, // Round to 5 decimal places
        tokensUsed: {
          input: inputTokens,
          output: outputTokens
        },
        duration: Date.now() - startTime,
        cached: false,
        timestamp: Date.now()
      };

      // Store in cache
      this.cache.set(hash, {
        result: { ...result },
        timestamp: Date.now()
      });

      console.log(`✓ Review completed in ${result.duration}ms, cost: $${result.cost.toFixed(5)}`);
      return result;

    } catch (error) {
      console.error('Claude API error:', error);
      throw error;
    }
  }

  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.entries()).map(([hash, entry]) => ({
        hash: hash.substring(0, 8),
        timestamp: entry.timestamp,
        age: Date.now() - entry.timestamp
      }))
    };
  }
}
