/** @format */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Button, Badge } from '../components/ui'
import {
  ArrowLeft,
  GitPullRequest,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Code,
  Zap,
  Shield,
  Eye,
  Wand2,
  Download,
} from 'lucide-react'
import { theme } from '../styles/theme'

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.sm};
  transition: color ${({ theme }) => theme.transitions.fast};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const PRIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.primary}1a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const PRMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const CodeViewer = styled.div`
  background: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  max-height: 600px;
  overflow: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.6;
`

const DiffLine = styled.div<{ $type?: 'added' | 'removed' | 'context' }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  ${({ $type, theme }) => {
    if ($type === 'added') {
      return `
        background: ${theme.colors.success}15;
        border-left: 2px solid ${theme.colors.success};
      `
    }
    if ($type === 'removed') {
      return `
        background: ${theme.colors.error}15;
        border-left: 2px solid ${theme.colors.error};
      `
    }
    return `
      color: ${theme.colors.textMuted};
    `
  }}
`

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`

const ConfirmationDialog = styled(Card)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  max-width: 500px;
  width: 90%;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1999;
  backdrop-filter: blur(4px);
`

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 3000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const LoadingText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`

interface PullRequestReviewPageParams extends Record<string, string | undefined> {
  owner: string
  repo: string
  number: string
}

export const PullRequestReviewPage: React.FC = () => {
  const navigate = useNavigate()
  const { owner, repo, number } = useParams<PullRequestReviewPageParams>()
  const [pr, setPR] = useState<any>(null)
  const [diff, setDiff] = useState<string>('')
  const [reviewResult, setReviewResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isReviewing, setIsReviewing] = useState(false)
  const [showReviewConfirm, setShowReviewConfirm] = useState(false)
  const [showFixConfirm, setShowFixConfirm] = useState(false)
  const [fixResult, setFixResult] = useState<any>(null)
  const [isFixing, setIsFixing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (owner && repo && number) {
      loadPR()
    }
  }, [owner, repo, number])

  const loadPR = async () => {
    const token = localStorage.getItem('github_access_token')
    if (!token) {
      setError('GitHub token not found. Please connect your GitHub account.')
      return
    }

    setIsLoading(true)
    try {
      // Fetch PR details
      const prResponse = await fetch(
        `http://localhost:5000/api/github/repos/${owner}/${repo}/pulls/${number}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!prResponse.ok) {
        throw new Error('Failed to fetch PR')
      }

      const prData = await prResponse.json()
      setPR(prData.data)

      // Fetch PR diff
      const diffResponse = await fetch(
        `http://localhost:5000/api/github/repos/${owner}/${repo}/pulls/${number}/diff`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (diffResponse.ok) {
        const diffData = await diffResponse.json()
        setDiff(diffData.data.diff)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load PR')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReview = async () => {
    const token = localStorage.getItem('github_access_token')
    if (!token || !owner || !repo || !number) return

    setIsReviewing(true)
    setShowReviewConfirm(false)

    try {
      const response = await fetch('http://localhost:5000/api/github/review-pr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          owner,
          repo,
          prNumber: parseInt(number, 10),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to review PR')
      }

      const data = await response.json()
      setReviewResult(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to review PR')
    } finally {
      setIsReviewing(false)
    }
  }

  const handleFix = async () => {
    if (!reviewResult || !reviewResult.issues || reviewResult.issues.length === 0) {
      return
    }

    const token = localStorage.getItem('github_access_token')
    if (!token || !owner || !repo) return

    setIsFixing(true)
    setShowFixConfirm(false)

    try {
      // For now, fix the first file's issues
      // In a real implementation, you'd iterate through all files
      const issuesToFix = reviewResult.issues.filter(
        (issue: any) => issue.severity === 'critical' || issue.severity === 'high'
      )

      if (issuesToFix.length === 0) {
        setError('No critical or high severity issues to fix')
        setIsFixing(false)
        return
      }

      // Get the file content (simplified - in real app, get from PR files)
      const filePath = issuesToFix[0].file || 'unknown'
      
      const response = await fetch('http://localhost:5000/api/github/fix-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          owner,
          repo,
          filePath,
          originalCode: diff.substring(0, 10000), // Limit for demo
          issues: issuesToFix,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fix code')
      }

      const data = await response.json()
      setFixResult(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fix code')
    } finally {
      setIsFixing(false)
    }
  }

  const renderDiff = (diffText: string) => {
    const lines = diffText.split('\n')
    return lines.map((line, index) => {
      let type: 'added' | 'removed' | 'context' | undefined
      if (line.startsWith('+') && !line.startsWith('+++')) {
        type = 'added'
      } else if (line.startsWith('-') && !line.startsWith('---')) {
        type = 'removed'
      } else {
        type = 'context'
      }

      return (
        <DiffLine key={index} $type={type}>
          {line}
        </DiffLine>
      )
    })
  }

  if (isLoading) {
    return (
      <LoadingOverlay>
        <Loader2 size={48} className='animate-spin' />
        <LoadingText>Loading Pull Request...</LoadingText>
      </LoadingOverlay>
    )
  }

  if (error) {
    return (
      <PageContainer>
        <Card>
          <div style={{ textAlign: 'center', padding: '48px' }}>
            <AlertCircle size={48} style={{ margin: '0 auto 16px', color: theme.colors.error }} />
            <h2>Error</h2>
            <p style={{ color: theme.colors.textMuted }}>{error}</p>
            <Button onClick={() => navigate('/')} style={{ marginTop: '16px' }}>
              <ArrowLeft size={16} style={{ marginRight: '4px' }} />
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      {isReviewing && (
        <LoadingOverlay>
          <Loader2 size={48} className='animate-spin' />
          <LoadingText>Analyzing code for errors, performance issues, and improvements...</LoadingText>
        </LoadingOverlay>
      )}

      {isFixing && (
        <LoadingOverlay>
          <Loader2 size={48} className='animate-spin' />
          <LoadingText>Fixing code issues and checking dependencies...</LoadingText>
        </LoadingOverlay>
      )}

      {showReviewConfirm && (
        <>
          <Overlay onClick={() => setShowReviewConfirm(false)} />
          <ConfirmationDialog>
            <h3 style={{ margin: '0 0 16px 0' }}>Review This Pull Request?</h3>
            <p style={{ color: theme.colors.textMuted, margin: '0 0 24px 0' }}>
              This will analyze the code for:
            </p>
            <ul style={{ margin: '0 0 24px 0', paddingLeft: '20px', color: theme.colors.textSecondary }}>
              <li>Errors (runtime, type, reference)</li>
              <li>Performance issues (re-renders, infinite loops, complexity)</li>
              <li>Code quality and best practices</li>
              <li>Accessibility issues</li>
              <li>Security vulnerabilities</li>
            </ul>
            <ActionButtons>
              <Button variant='secondary' onClick={() => setShowReviewConfirm(false)}>
                Cancel
              </Button>
              <Button onClick={handleReview}>
                <Code size={16} style={{ marginRight: '4px' }} />
                Yes, Review Code
              </Button>
            </ActionButtons>
          </ConfirmationDialog>
        </>
      )}

      {showFixConfirm && reviewResult && (
        <>
          <Overlay onClick={() => setShowFixConfirm(false)} />
          <ConfirmationDialog>
            <h3 style={{ margin: '0 0 16px 0' }}>Fix All Issues?</h3>
            <p style={{ color: theme.colors.textMuted, margin: '0 0 16px 0' }}>
              This will automatically fix:
            </p>
            <ul style={{ margin: '0 0 24px 0', paddingLeft: '20px', color: theme.colors.textSecondary }}>
              {reviewResult.issues.slice(0, 5).map((issue: any, i: number) => (
                <li key={i}>{issue.description.substring(0, 60)}...</li>
              ))}
              {reviewResult.issues.length > 5 && <li>...and {reviewResult.issues.length - 5} more</li>}
            </ul>
            <p style={{ color: theme.colors.warning, margin: '0 0 24px 0', fontSize: theme.fontSize.sm }}>
              ⚠️ The system will check if code is used elsewhere before making changes to avoid breaking existing functionality.
            </p>
            <ActionButtons>
              <Button variant='secondary' onClick={() => setShowFixConfirm(false)}>
                Cancel
              </Button>
              <Button onClick={handleFix}>
                <Wand2 size={16} style={{ marginRight: '4px' }} />
                Yes, Fix All Issues
              </Button>
            </ActionButtons>
          </ConfirmationDialog>
        </>
      )}

      <HeaderSection>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Back
        </BackButton>

        <HeaderRow>
          <TitleGroup>
            <PRIcon>
              <GitPullRequest size={24} />
            </PRIcon>
            <div>
              <Title>{pr?.title || `PR #${number}`}</Title>
              <Description>
                {pr?.repository?.fullName} • #{pr?.number} • by {pr?.author}
              </Description>
            </div>
          </TitleGroup>

          <PRMeta>
            {pr?.state && (
              <Badge variant={pr.state === 'open' ? 'success' : 'default'}>
                {pr.state.toUpperCase()}
              </Badge>
            )}
            <Button
              variant='ghost'
              size='sm'
              onClick={() => window.open(pr?.url, '_blank')}
            >
              <Eye size={14} style={{ marginRight: '4px' }} />
              View on GitHub
            </Button>
          </PRMeta>
        </HeaderRow>
      </HeaderSection>

      {!reviewResult && (
        <Section>
          <Card>
            <div style={{ padding: theme.spacing.lg }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Pull Request Code</h3>
              <CodeViewer>{diff ? renderDiff(diff) : 'Loading diff...'}</CodeViewer>
              <ActionButtons style={{ marginTop: theme.spacing.md }}>
                <Button variant='primary' onClick={() => setShowReviewConfirm(true)}>
                  <Code size={16} style={{ marginRight: '4px' }} />
                  Review This Code
                </Button>
              </ActionButtons>
            </div>
          </Card>
        </Section>
      )}

      {reviewResult && (
        <>
          <Section>
            <Card>
              <div style={{ padding: theme.spacing.lg }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing.md }}>
                  <h3 style={{ margin: 0 }}>Review Results</h3>
                  <Badge variant='success'>
                    <CheckCircle2 size={12} style={{ marginRight: '4px' }} />
                    Analysis Complete
                  </Badge>
                </div>
                <p style={{ color: theme.colors.textMuted, margin: '0 0 24px 0' }}>
                  {reviewResult.summary}
                </p>

                {reviewResult.issues && reviewResult.issues.length > 0 && (
                  <>
                    <div style={{ marginBottom: theme.spacing.md }}>
                      <h4 style={{ margin: '0 0 16px 0' }}>Issues Found: {reviewResult.issues.length}</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
                        {reviewResult.issues.map((issue: any, index: number) => (
                          <div
                            key={index}
                            style={{
                              padding: theme.spacing.md,
                              background: theme.colors.backgroundLight,
                              border: `1px solid ${theme.colors.border}`,
                              borderRadius: theme.borderRadius.md,
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, marginBottom: theme.spacing.xs }}>
                              <Badge variant={issue.severity === 'critical' ? 'critical' : issue.severity === 'high' ? 'high' : issue.severity === 'medium' ? 'medium' : 'low'}>
                                {issue.severity}
                              </Badge>
                              <Badge variant='default'>{issue.category}</Badge>
                              {issue.file && (
                                <span style={{ fontSize: theme.fontSize.xs, color: theme.colors.textMuted }}>
                                  {issue.file}
                                  {issue.line && `:${issue.line}`}
                                </span>
                              )}
                            </div>
                            <p style={{ margin: '0 0 8px 0', color: theme.colors.textPrimary }}>
                              {issue.description}
                            </p>
                            <div style={{ padding: theme.spacing.sm, background: `${theme.colors.muted}30`, borderRadius: theme.borderRadius.sm, marginTop: theme.spacing.xs }}>
                              <p style={{ margin: 0, fontSize: theme.fontSize.xs, color: theme.colors.textSecondary }}>
                                <strong>Suggestion:</strong> {issue.suggestion}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <ActionButtons>
                      <Button variant='primary' onClick={() => setShowFixConfirm(true)}>
                        <Wand2 size={16} style={{ marginRight: '4px' }} />
                        Fix All Issues
                      </Button>
                    </ActionButtons>
                  </>
                )}

                {reviewResult.complexity && (
                  <div style={{ marginTop: theme.spacing.lg, padding: theme.spacing.md, background: theme.colors.backgroundLight, borderRadius: theme.borderRadius.md }}>
                    <h4 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                      <Zap size={18} />
                      Complexity Analysis
                    </h4>
                    {reviewResult.complexity.timeComplexity && (
                      <p style={{ margin: '0 0 8px 0' }}>
                        <strong>Time Complexity:</strong> {reviewResult.complexity.timeComplexity}
                      </p>
                    )}
                    {reviewResult.complexity.spaceComplexity && (
                      <p style={{ margin: '0 0 8px 0' }}>
                        <strong>Space Complexity:</strong> {reviewResult.complexity.spaceComplexity}
                      </p>
                    )}
                    {reviewResult.complexity.optimizationSuggestions && reviewResult.complexity.optimizationSuggestions.length > 0 && (
                      <div>
                        <strong>Optimization Suggestions:</strong>
                        <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                          {reviewResult.complexity.optimizationSuggestions.map((suggestion: string, i: number) => (
                            <li key={i} style={{ fontSize: theme.fontSize.sm }}>{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {reviewResult.accessibility && (
                  <div style={{ marginTop: theme.spacing.lg, padding: theme.spacing.md, background: theme.colors.backgroundLight, borderRadius: theme.borderRadius.md }}>
                    <h4 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                      <Shield size={18} />
                      Accessibility Analysis
                    </h4>
                    {reviewResult.accessibility.missingAria && reviewResult.accessibility.missingAria.length > 0 && (
                      <div style={{ marginBottom: theme.spacing.sm }}>
                        <strong>Missing ARIA Attributes:</strong>
                        <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                          {reviewResult.accessibility.missingAria.map((aria: string, i: number) => (
                            <li key={i} style={{ fontSize: theme.fontSize.sm }}>{aria}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {reviewResult.accessibility.issues && reviewResult.accessibility.issues.length > 0 && (
                      <div>
                        <strong>Accessibility Issues:</strong>
                        <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                          {reviewResult.accessibility.issues.map((issue: string, i: number) => (
                            <li key={i} style={{ fontSize: theme.fontSize.sm }}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </Section>

          {fixResult && (
            <Section>
              <Card>
                <div style={{ padding: theme.spacing.lg }}>
                  <h3 style={{ margin: '0 0 16px 0' }}>Fixed Code</h3>
                  {fixResult.dependencyCheck && fixResult.dependencyCheck.hasDependencies && (
                    <div style={{ padding: theme.spacing.md, background: `${theme.colors.warning}15`, border: `1px solid ${theme.colors.warning}`, borderRadius: theme.borderRadius.md, marginBottom: theme.spacing.md }}>
                      <p style={{ margin: 0, fontSize: theme.fontSize.sm }}>
                        <strong>⚠️ Dependencies Found:</strong> This code is used in {fixResult.dependencyCheck.dependencies.length} other file(s). Changes have been made carefully to maintain compatibility.
                      </p>
                    </div>
                  )}
                  <CodeViewer>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{fixResult.fixedCode}</pre>
                  </CodeViewer>
                  <div style={{ marginTop: theme.spacing.md, padding: theme.spacing.md, background: theme.colors.backgroundLight, borderRadius: theme.borderRadius.md }}>
                    <strong>Explanation:</strong>
                    <p style={{ margin: '8px 0 0 0', fontSize: theme.fontSize.sm, color: theme.colors.textSecondary }}>
                      {fixResult.explanation}
                    </p>
                  </div>
                  <ActionButtons style={{ marginTop: theme.spacing.md }}>
                    <Button variant='secondary'>
                      <Download size={16} style={{ marginRight: '4px' }} />
                      Download Fixed Code
                    </Button>
                  </ActionButtons>
                </div>
              </Card>
            </Section>
          )}
        </>
      )}
    </PageContainer>
  )
}

