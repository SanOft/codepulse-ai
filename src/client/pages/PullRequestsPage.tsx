/** @format */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Badge } from '../components/ui'
import {
  GitPullRequest,
  ArrowLeft,
  Eye,
  Calendar,
  User,
  GitBranch,
  Loader2,
  AlertCircle,
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
  gap: ${({ theme }) => theme.spacing.md};
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const PRList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const PRCard = styled(Card)`
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`

const PRHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const PRTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  flex: 1;
`

const PRMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const PRDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: ${({ theme }) => theme.spacing.sm} 0;
  line-height: 1.6;
`

const PRFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textMuted};
`

interface PullRequest {
  id: string
  number: number
  title: string
  body: string | null
  state: 'open' | 'closed'
  author: string
  authorAvatar: string
  createdAt: string
  updatedAt: string
  repository: {
    owner: string
    name: string
    fullName: string
  }
  url: string
}

export const PullRequestsPage: React.FC = () => {
  const navigate = useNavigate()
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedRepo, setSelectedRepo] = useState<{ owner: string; name: string } | null>(null)

  useEffect(() => {
    // Get selected repositories from localStorage
    const trackedRepos = JSON.parse(
      localStorage.getItem('github_tracked_repositories') || '[]'
    )
    
    if (trackedRepos.length > 0) {
      // Load PRs for the first tracked repository
      const firstRepo = trackedRepos[0]
      const [owner, name] = firstRepo.fullName.split('/')
      setSelectedRepo({ owner, name })
      loadPullRequests(owner, name)
    }
  }, [])

  const loadPullRequests = async (owner: string, repo: string) => {
    const token = localStorage.getItem('github_access_token')
    if (!token) {
      setError('GitHub token not found. Please connect your GitHub account.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `http://localhost:5000/api/github/repos/${owner}/${repo}/pulls?state=open`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch pull requests')
      }

      const data = await response.json()
      setPullRequests(data.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load pull requests')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePRClick = (pr: PullRequest) => {
    navigate(`/pull-requests/${pr.repository.owner}/${pr.repository.name}/${pr.number}`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <Loader2 size={48} className='animate-spin' style={{ margin: '0 auto 16px', color: theme.colors.primary }} />
          <p style={{ color: theme.colors.textMuted }}>Loading pull requests...</p>
        </div>
      </PageContainer>
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
      <HeaderSection>
        <BackButton onClick={() => navigate('/')}>
          <ArrowLeft size={16} />
          Back to Dashboard
        </BackButton>

        <HeaderRow>
          <div>
            <Title>Pull Requests</Title>
            <Description>
              {selectedRepo
                ? `Open pull requests for ${selectedRepo.owner}/${selectedRepo.name}`
                : 'Select a repository to view pull requests'}
            </Description>
          </div>
        </HeaderRow>
      </HeaderSection>

      <Section>
        {pullRequests.length === 0 ? (
          <Card>
            <EmptyState>
              <GitPullRequest size={48} style={{ margin: '0 auto 16px', color: theme.colors.textMuted }} />
              <h3>No Open Pull Requests</h3>
              <p>There are currently no open pull requests for the tracked repositories.</p>
            </EmptyState>
          </Card>
        ) : (
          <PRList>
            {pullRequests.map((pr) => (
              <PRCard key={pr.id} onClick={() => handlePRClick(pr)}>
                <PRHeader>
                  <PRTitle>
                    <GitPullRequest size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    {pr.title}
                  </PRTitle>
                  <Badge variant={pr.state === 'open' ? 'success' : 'default'}>
                    {pr.state.toUpperCase()}
                  </Badge>
                </PRHeader>

                {pr.body && (
                  <PRDescription>
                    {pr.body.substring(0, 200)}
                    {pr.body.length > 200 ? '...' : ''}
                  </PRDescription>
                )}

                <PRFooter>
                  <PRMeta>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <User size={14} />
                      {pr.author}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <GitBranch size={14} />
                      {pr.repository.fullName}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} />
                      {formatDate(pr.createdAt)}
                    </span>
                  </PRMeta>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(pr.url, '_blank')
                    }}
                  >
                    <Eye size={14} style={{ marginRight: '4px' }} />
                    View on GitHub
                  </Button>
                </PRFooter>
              </PRCard>
            ))}
          </PRList>
        )}
      </Section>
    </PageContainer>
  )
}

