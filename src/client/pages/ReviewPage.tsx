/** @format */

import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Textarea, Badge } from '../components/ui'
import { useReviewContext } from '../context/ReviewContext'
import { estimateReviewCost, formatTokenCount, formatCost } from '../utils/tokenEstimator'
import {
  Info,
  FileText,
  Zap,
  CheckCircle2,
  DollarSign,
  RefreshCw,
  Lightbulb,
  AlertCircle,
} from 'lucide-react'

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const PageSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textMuted};
`

const FormContainer = styled.div`
  max-width:1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Label = styled.label<{ fontSize?: string }>`
  font-size: ${({ theme, fontSize }) => fontSize || theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`
const LanguageSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
`

const DescriptionBox = styled.div`
  background: ${({ theme }) => theme.colors.backgroundHover};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ContextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const ContextHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CharCount = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`

const DiffWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const DiffHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DiffSize = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`

const DiffTextarea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
  transition: all ${({ theme }) => theme.transitions.fast};
  resize: vertical;
  width: 100%;
  min-height: 300px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const SizeDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
`

const SizeBadge = styled(Badge)`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
`

const FormActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const TipsCard = styled(Card)`
  border-color: ${({ theme }) => theme.colors.border};
`

const TipsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const TipItem = styled.li`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const TipBullet = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
`

const FeatureCard = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
`

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(99, 102, 241, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  flex-shrink: 0;
`

const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`

const FeatureDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const ErrorBox = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  color: #ef4444;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ErrorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize.md};
`

const ErrorMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.5;
  color: #fca5a5;
`

const ErrorLink = styled.a`
  color: #fca5a5;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #ef4444;
  }
`

const languages = [
  'TypeScript',
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Go',
  'Rust',
  'PHP',
  'Ruby',
  'Swift',
  'Kotlin',
  'Other',
]

const EXAMPLE_DIFF = `diff --git a/src/services/TrackingService.ts b/src/services/TrackingService.ts
--- a/src/services/TrackingService.ts
+++ b/src/services/TrackingService.ts
@@ -15,8 +15,8 @@ export class TrackingService {
   async updateLocation(truckId: string, lat: number, lng: number) {
-    const query = \`UPDATE trucks SET lat = \${lat}, lng = \${lng} WHERE id = \${truckId}\`;
-    await db.query(query);
+    await db.query('UPDATE trucks SET lat = ?, lng = ? WHERE id = ?', [lat, lng, truckId]);
     this.subscribers.forEach(fn => fn(truckId, { lat, lng }));
   }
}`

export const ReviewPage: React.FC = () => {
  const navigate = useNavigate()
  const [diff, setDiff] = useState('')
  const [language, setLanguage] = useState('')
  const [context, setContext] = useState('')
  const { review, loading, error, clear, result } = useReviewContext()

  const diffSize = useMemo(() => {
    const sizeInBytes = new Blob([diff]).size
    const sizeInKB = sizeInBytes / 1024
    return { bytes: sizeInBytes, kb: sizeInKB }
  }, [diff])

  const diffLines = useMemo(() => {
    return diff.split('\n').length
  }, [diff])

  const costEstimate = useMemo(() => {
    if (!diff) return null
    return estimateReviewCost(diff)
  }, [diff])

  const handleSubmit = async () => {
    if (!diff.trim()) return
    try {
      await review({
        diff,
        language: language || undefined,
        context: context || undefined,
      })
      // Navigate after a short delay to ensure state is updated
      setTimeout(() => {
        navigate('/results')
      }, 100)
    } catch (err) {
      // Error is handled by the hook
      console.error('Review submission error:', err)
    }
  }

  const handleClear = () => {
    setDiff('')
    setLanguage('')
    setContext('')
    clear()
  }

  const handleLoadExample = () => {
    setDiff(EXAMPLE_DIFF)
    setLanguage('TypeScript')
    setContext('SQL injection vulnerability fix')
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Submit Code for Review</PageTitle>
        <PageSubtitle>
          Paste your code diff below and let our AI analyze it for issues,
          security vulnerabilities, and improvements.
        </PageSubtitle>
      </PageHeader>

      <FormContainer>
        <Card
          title='Code Diff Input'
          subtitle='Paste your code diff or changes here. Supports unified diff format.'
        >
          <FormRow>
            <div>
              <Label>Programming Language</Label>
              <LanguageSelect
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disabled={loading}
              >
                <option value=''>Select language...</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </LanguageSelect>
              <Description>
                Select the primary language of your code for more accurate
                analysis
              </Description>
            </div>

            <ContextWrapper>
              <ContextHeader>
                <Label>Context (Optional)</Label>
                <CharCount>{context.length} / 1000</CharCount>
              </ContextHeader>
              <Textarea
                placeholder='Add context about your code...'
                value={context}
                onChange={setContext}
                rows={4}
                disabled={loading}
              />
              <DescriptionBox>
                <Info size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  Provide context about your code to help the AI give more
                  relevant recommendations
                </span>
              </DescriptionBox>
            </ContextWrapper>
          </FormRow>

          <DiffWrapper style={{ marginTop: '24px' }}>
            <DiffHeader>
              <Label>Code Diff</Label>
              <DiffSize>
                <FileText size={14} />
                <span>{diffLines} lines</span>
              </DiffSize>
            </DiffHeader>
            <DiffTextarea
              placeholder='Paste your code diff here...'
              value={diff}
              onChange={(e) => setDiff(e.target.value)}
              disabled={loading}
            />
            <DescriptionBox>
              <Info size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                Paste unified diff format (from git, patch files, or code
                comparison tools)
              </span>
            </DescriptionBox>
            <SizeDisplay>
              <Label>Size:</Label>
              <SizeBadge variant='default' size='sm'>
                {diffSize.kb.toFixed(2)} KB / 50 KB
              </SizeBadge>
            </SizeDisplay>
            {costEstimate && (
              <SizeDisplay style={{ marginTop: '8px' }}>
                <Label>Estimated Tokens:</Label>
                <SizeBadge variant='default' size='sm'>
                  ~{formatTokenCount(costEstimate.inputTokens + costEstimate.estimatedOutputTokens)} tokens
                </SizeBadge>
              </SizeDisplay>
            )}
            {costEstimate && (
              <SizeDisplay style={{ marginTop: '8px' }}>
                <Label>Estimated Cost:</Label>
                <SizeBadge variant='default' size='sm'>
                  ~{formatCost(costEstimate.estimatedTotalCost)}
                </SizeBadge>
              </SizeDisplay>
            )}
          </DiffWrapper>
        </Card>

        <FormActions>
          <ActionButtons>
            <Button
              onClick={handleSubmit}
              disabled={loading || !diff.trim()}
              loading={loading}
              fullWidth
            >
              <Zap size={16} style={{ marginRight: '4px' }} />
              Review Code
            </Button>
            <Button
              variant='secondary'
              onClick={handleClear}
              disabled={loading}
              fullWidth
            >
              <RefreshCw size={16} style={{ marginRight: '4px' }} />
              Clear
            </Button>
          </ActionButtons>
          <Button
            variant='ghost'
            onClick={handleLoadExample}
            disabled={loading}
          >
            <FileText size={16} style={{ marginRight: '4px' }} />
            Load Example
          </Button>
        </FormActions>

        {error && (
          <ErrorBox>
            <ErrorHeader>
              <AlertCircle size={20} />
              <span>Review Failed</span>
            </ErrorHeader>
            <ErrorMessage>
              {error.includes('console.anthropic.com') ? (
                <>
                  {error.split('console.anthropic.com')[0]}
                  <ErrorLink
                    href="https://console.anthropic.com/settings/billing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    console.anthropic.com/settings/billing
                  </ErrorLink>
                </>
              ) : (
                error
              )}
            </ErrorMessage>
          </ErrorBox>
        )}

        <TipsCard>
          <TipsHeader>
            <Lightbulb size={18} />
            <Label fontSize='1.2rem'>Tips for Best Results</Label>
          </TipsHeader>
          <TipsList>
            <TipItem>
              <TipBullet>•</TipBullet>
              <span>
                Use unified diff format (output from `git diff` or similar
                tools)
              </span>
            </TipItem>
            <TipItem>
              <TipBullet>•</TipBullet>
              <span>
                Include context about the code's purpose in the Context field
              </span>
            </TipItem>
            <TipItem>
              <TipBullet>•</TipBullet>
              <span>
                Select the correct programming language for accurate analysis
              </span>
            </TipItem>
            <TipItem>
              <TipBullet>•</TipBullet>
              <span>
                Maximum diff size is 50KB. For larger reviews, split into
                multiple submissions
              </span>
            </TipItem>
          </TipsList>
        </TipsCard>
      </FormContainer>

      <FeatureGrid>
        <FeatureCard>
          <FeatureIcon>
            <Zap size={24} />
          </FeatureIcon>
          <FeatureContent>
            <FeatureTitle>Fast Analysis</FeatureTitle>
            <FeatureDescription>
              Get AI-powered code review results in seconds
            </FeatureDescription>
          </FeatureContent>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>
            <CheckCircle2 size={24} />
          </FeatureIcon>
          <FeatureContent>
            <FeatureTitle>Comprehensive</FeatureTitle>
            <FeatureDescription>
              Security, performance, and maintainability checks
            </FeatureDescription>
          </FeatureContent>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>
            <DollarSign size={24} />
          </FeatureIcon>
          <FeatureContent>
            <FeatureTitle>Budget Controlled</FeatureTitle>
            <FeatureDescription>
              Track costs and stay within your limits
            </FeatureDescription>
          </FeatureContent>
        </FeatureCard>
      </FeatureGrid>
    </PageContainer>
  )
}
