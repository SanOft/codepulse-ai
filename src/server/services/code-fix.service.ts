/** @format */

import { GitHubService } from './github.service.js'
import { ClaudeService } from './claude.service.js'
import { CodeFix, CodeFixRequest, DependencyCheck } from '../types/index.js'

export class CodeFixService {
  private githubService: GitHubService
  private claudeService: ClaudeService

  constructor(githubService: GitHubService, claudeService: ClaudeService) {
    this.githubService = githubService
    this.claudeService = claudeService
  }

  async checkDependencies(
    token: string,
    owner: string,
    repo: string,
    filePath: string,
    codeToCheck: string
  ): Promise<DependencyCheck> {
    // Extract function names, class names, imports, exports from code
    const functionNames = this.extractFunctionNames(codeToCheck)
    const classNames = this.extractClassNames(codeToCheck)
    const imports = this.extractImports(codeToCheck)
    const exports = this.extractExports(codeToCheck)

    const dependencies: string[] = []
    const usages: Array<{ file: string; line: number }> = []

    // Search for each function/class/export in the repository
    for (const name of [...functionNames, ...classNames, ...exports]) {
      try {
        const searchResults = await this.githubService.searchCodeInRepository(
          token,
          owner,
          repo,
          name
        )

        for (const result of searchResults) {
          // Skip the current file
          if (result.path === filePath) continue

          dependencies.push(result.path)
          usages.push({
            file: result.path,
            line: 0, // GitHub API doesn't provide line numbers in search
          })
        }
      } catch (error) {
        console.error(`Error searching for ${name}:`, error)
      }
    }

    return {
      hasDependencies: dependencies.length > 0,
      dependencies,
      usages,
      warnings:
        dependencies.length > 0
          ? [
              `This code is used in ${dependencies.length} other file(s). Make sure changes don't break existing functionality.`,
            ]
          : [],
    }
  }

  private extractFunctionNames(code: string): string[] {
    const functionRegex =
      /(?:function\s+(\w+)|const\s+(\w+)\s*=\s*(?:async\s+)?\(|(\w+)\s*:\s*(?:async\s+)?\([^)]*\)\s*=>)/g
    const names: string[] = []
    let match

    while ((match = functionRegex.exec(code)) !== null) {
      const name = match[1] || match[2] || match[3]
      if (name) names.push(name)
    }

    return [...new Set(names)]
  }

  private extractClassNames(code: string): string[] {
    const classRegex = /class\s+(\w+)/g
    const names: string[] = []
    let match

    while ((match = classRegex.exec(code)) !== null) {
      names.push(match[1])
    }

    return [...new Set(names)]
  }

  private extractImports(code: string): string[] {
    const importRegex =
      /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+)?['"]([^'"]+)['"]/g
    const imports: string[] = []
    let match

    while ((match = importRegex.exec(code)) !== null) {
      imports.push(match[1])
    }

    return [...new Set(imports)]
  }

  private extractExports(code: string): string[] {
    const exportRegex = /export\s+(?:const|function|class|default\s+)?(\w+)/g
    const names: string[] = []
    let match

    while ((match = exportRegex.exec(code)) !== null) {
      names.push(match[1])
    }

    return [...new Set(names)]
  }

  async generateFix(
    token: string,
    owner: string,
    repo: string,
    filePath: string,
    originalCode: string,
    issues: Array<{ description: string; suggestion: string; line?: number }>
  ): Promise<CodeFix> {
    // First check dependencies
    const dependencyCheck = await this.checkDependencies(
      token,
      owner,
      repo,
      filePath,
      originalCode
    )

    // Build prompt for fixing code
    const prompt = this.buildFixPrompt(originalCode, issues, dependencyCheck)

    try {
      // Access Claude client through the service
      // We need to create a new Anthropic client for code fixing
      const Anthropic = (await import('@anthropic-ai/sdk')).default
      const apiKey = process.env.ANTHROPIC_API_KEY
      if (!apiKey) {
        throw new Error('ANTHROPIC_API_KEY is not set')
      }

      const client = new Anthropic({ apiKey })
      const message = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8192,
        temperature: 0,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      })

      const content = message.content[0]
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Claude')
      }

      const responseText = content.text
      const fixedCode = this.extractCodeFromResponse(responseText)

      return {
        originalCode,
        fixedCode,
        changes: this.generateDiff(originalCode, fixedCode),
        dependencyCheck,
        explanation: this.extractExplanation(responseText),
      }
    } catch (error) {
      console.error('Error generating fix:', error)
      throw error
    }
  }

  private buildFixPrompt(
    code: string,
    issues: Array<{ description: string; suggestion: string; line?: number }>,
    dependencyCheck: DependencyCheck
  ): string {
    return `You are an expert code fixer. Your task is to fix the following code issues while ensuring you don't break any existing functionality.

IMPORTANT: Before making any changes, analyze the code carefully:
1. Check if any functions, classes, or exports are used elsewhere in the project
2. Maintain backward compatibility
3. Preserve existing functionality
4. Only fix the specific issues mentioned
5. Add proper error handling
6. Ensure type safety
7. Add ARIA attributes for accessibility where needed

${
  dependencyCheck.hasDependencies
    ? `WARNING: This code has dependencies in other files:
${dependencyCheck.dependencies.map((d) => `- ${d}`).join('\n')}
Make sure your fixes don't break these dependencies.`
    : ''
}

Code to fix:
\`\`\`
${code}
\`\`\`

Issues to fix:
${issues
  .map(
    (issue, i) =>
      `${i + 1}. ${issue.description}\n   Suggestion: ${issue.suggestion}${
        issue.line ? `\n   Line: ${issue.line}` : ''
      }`
  )
  .join('\n\n')}

Respond with ONLY the fixed code in a code block, followed by a brief explanation of changes made.
Format:
\`\`\`
[fixed code here]
\`\`\`

Explanation:
[explanation here]`
  }

  private extractCodeFromResponse(response: string): string {
    const codeBlockRegex = /```(?:[\w]+)?\n([\s\S]*?)```/
    const match = response.match(codeBlockRegex)
    return match ? match[1].trim() : response
  }

  private extractExplanation(response: string): string {
    const explanationMatch = response.match(
      /Explanation:\s*([\s\S]*?)(?:\n\n|$)/i
    )
    return explanationMatch
      ? explanationMatch[1].trim()
      : 'Code has been fixed based on the issues identified.'
  }

  private generateDiff(original: string, fixed: string): string {
    const originalLines = original.split('\n')
    const fixedLines = fixed.split('\n')
    const diff: string[] = []

    // Simple diff generation
    let i = 0
    let j = 0

    while (i < originalLines.length || j < fixedLines.length) {
      if (i >= originalLines.length) {
        diff.push(`+ ${fixedLines[j]}`)
        j++
      } else if (j >= fixedLines.length) {
        diff.push(`- ${originalLines[i]}`)
        i++
      } else if (originalLines[i] === fixedLines[j]) {
        diff.push(`  ${originalLines[i]}`)
        i++
        j++
      } else {
        // Check if line was moved
        const nextMatch = fixedLines.slice(j + 1).indexOf(originalLines[i])
        if (nextMatch !== -1 && nextMatch < 3) {
          diff.push(`+ ${fixedLines[j]}`)
          j++
        } else {
          diff.push(`- ${originalLines[i]}`)
          diff.push(`+ ${fixedLines[j]}`)
          i++
          j++
        }
      }
    }

    return diff.join('\n')
  }
}
