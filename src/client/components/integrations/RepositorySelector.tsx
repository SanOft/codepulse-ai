/** @format */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card, Button, Badge } from '../ui'
import {
  Search,
  GitBranch,
  CheckCircle2,
  Circle,
  Settings,
  Code,
  Zap,
  Shield,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { theme } from '../../styles/theme'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.muted}30;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

const SearchInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.muted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}50;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const RepoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  max-height: 500px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.muted}10;
`

const RepoItem = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ $selected, theme }) =>
    $selected ? `${theme.colors.primary}15` : theme.colors.backgroundLight};
  border: 1px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => `${theme.colors.primary}10`};
  }
`

const RepoCheckbox = styled.div`
  margin-top: 2px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
`

const RepoInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const RepoName = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const RepoDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const RepoMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`

const TrackingOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const TrackingOption = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const OptionCheckbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary};
`

const OptionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`

const OptionIcon = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color};
`

const ActionsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const SelectionSummary = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Sugession = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: ${({ theme }) => theme.spacing.xs};
`

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textMuted};
`

const ErrorState = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => `${theme.colors.error}1a`};
  border: 1px solid ${({ theme }) => `${theme.colors.error}30`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.error};
`

interface Repository {
  id: string
  name: string
  fullName: string
  description: string | null
  private: boolean
  defaultBranch: string
  language: string | null
  stars: number
  updatedAt: string
}

interface TrackingConfig {
  codeReview: boolean
  optimization: boolean
  accessibility: boolean
}

interface SelectedRepo extends Repository {
  tracking: TrackingConfig
}

interface RepositorySelectorProps {
  provider: 'github' | 'gitlab' | 'bitbucket'
  onSave: (repositories: SelectedRepo[]) => void
  onCancel?: () => void
}

// Mock repositories - in real app, these would come from API
const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'my-awesome-app',
    fullName: 'username/my-awesome-app',
    description: 'A modern web application built with React and TypeScript',
    private: false,
    defaultBranch: 'main',
    language: 'TypeScript',
    stars: 42,
    updatedAt: '2025-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'api-server',
    fullName: 'username/api-server',
    description: 'RESTful API server with Express and MongoDB',
    private: false,
    defaultBranch: 'main',
    language: 'JavaScript',
    stars: 18,
    updatedAt: '2025-01-14T15:20:00Z',
  },
  {
    id: '3',
    name: 'mobile-app',
    fullName: 'username/mobile-app',
    description: 'Cross-platform mobile application',
    private: true,
    defaultBranch: 'develop',
    language: 'Dart',
    stars: 5,
    updatedAt: '2025-01-13T09:15:00Z',
  },
  {
    id: '4',
    name: 'design-system',
    fullName: 'username/design-system',
    description: 'Component library and design tokens',
    private: false,
    defaultBranch: 'main',
    language: 'TypeScript',
    stars: 89,
    updatedAt: '2025-01-12T14:45:00Z',
  },
  {
    id: '5',
    name: 'docs',
    fullName: 'username/docs',
    description: 'Project documentation and guides',
    private: false,
    defaultBranch: 'main',
    language: 'Markdown',
    stars: 12,
    updatedAt: '2025-01-11T11:00:00Z',
  },
]

export const RepositorySelector: React.FC<RepositorySelectorProps> = ({
  provider,
  onSave,
  onCancel,
}) => {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [selectedRepos, setSelectedRepos] = useState<Set<string>>(new Set())
  const [repoConfigs, setRepoConfigs] = useState<
    Record<string, TrackingConfig>
  >({})
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch repositories from API
    const fetchRepositories = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Get token from localStorage or props
        const token = localStorage.getItem(`${provider}_access_token`)

        if (!token) {
          setError('No access token found. Please connect your account first.')
          setIsLoading(false)
          return
        }

        const response = await fetch(
          `http://localhost:5000/api/auth/${provider}/repositories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch repositories')
        }

        const data = await response.json()
        if (data.success && data.data) {
          setRepositories(data.data)
        } else {
          throw new Error(data.error || 'Failed to fetch repositories')
        }
      } catch (err) {
        console.error('Error fetching repositories:', err)
        setError(
          err instanceof Error ? err.message : 'Failed to load repositories'
        )
        // Fallback to mock data for development
        setRepositories(mockRepositories)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepositories()
  }, [provider])

  const filteredRepos = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleRepo = (repoId: string) => {
    setSelectedRepos((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(repoId)) {
        newSet.delete(repoId)
        // Remove config when unselected
        setRepoConfigs((configs) => {
          const newConfigs = { ...configs }
          delete newConfigs[repoId]
          return newConfigs
        })
      } else {
        newSet.add(repoId)
        // Initialize with default config
        setRepoConfigs((configs) => ({
          ...configs,
          [repoId]: {
            codeReview: true,
            optimization: false,
            accessibility: false,
          },
        }))
      }
      return newSet
    })
  }

  const updateTrackingConfig = (
    repoId: string,
    key: keyof TrackingConfig,
    value: boolean
  ) => {
    setRepoConfigs((configs) => ({
      ...configs,
      [repoId]: {
        ...(configs[repoId] || {
          codeReview: false,
          optimization: false,
          accessibility: false,
        }),
        [key]: value,
      },
    }))
  }

  const handleSave = () => {
    const selectedReposData: SelectedRepo[] = Array.from(selectedRepos)
      .map((repoId) => {
        const repo = repositories.find((r) => r.id === repoId)
        if (!repo) return null
        return {
          ...repo,
          tracking: repoConfigs[repoId] || {
            codeReview: true,
            optimization: false,
            accessibility: false,
          },
        }
      })
      .filter((repo): repo is SelectedRepo => repo !== null)

    // Save to localStorage
    localStorage.setItem(
      'github_tracked_repositories',
      JSON.stringify(selectedReposData)
    )

    // Start PR monitoring
    if (typeof window !== 'undefined') {
      import('../../services/pr-monitor.service').then(
        ({ prMonitorService }) => {
          prMonitorService.startMonitoring()
        }
      )
    }

    onSave(selectedReposData)
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
      <Card
        title='Select Repositories'
        subtitle='Choose which repositories to track for automated reviews'
      >
        <LoadingState>
          <Loader2 size={32} className='animate-spin' />
          <p>Loading repositories...</p>
        </LoadingState>
      </Card>
    )
  }

  if (error) {
    return (
      <Card
        title='Select Repositories'
        subtitle='Choose which repositories to track for automated reviews'
      >
        <ErrorState>
          <AlertCircle size={18} />
          <div>
            <strong>Error loading repositories:</strong> {error}
          </div>
        </ErrorState>
      </Card>
    )
  }

  return (
    <Card
      title='Select Repositories'
      subtitle='Choose which repositories to track for automated code reviews, optimizations, and accessibility checks'
    >
      <Container>
        <SearchBar>
          <Search size={18} color={theme.colors.textMuted} />
          <SearchInput
            type='text'
            placeholder='Search repositories...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>

        {filteredRepos.length === 0 ? (
          <EmptyState>
            <GitBranch
              size={48}
              style={{ margin: '0 auto 16px', opacity: 0.5 }}
            />
            <p>No repositories found</p>
            {searchQuery && <Sugession>Try a different search term</Sugession>}
          </EmptyState>
        ) : (
          <RepoList>
            {filteredRepos.map((repo) => {
              const isSelected = selectedRepos.has(repo.id)
              const config = repoConfigs[repo.id] || {
                codeReview: false,
                optimization: false,
                accessibility: false,
              }

              return (
                <RepoItem
                  key={repo.id}
                  $selected={isSelected}
                  onClick={() => toggleRepo(repo.id)}
                >
                  <RepoCheckbox>
                    {isSelected ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <Circle size={20} />
                    )}
                  </RepoCheckbox>
                  <RepoInfo>
                    <RepoName>
                      <GitBranch size={16} />
                      {repo.fullName}
                      {repo.private && (
                        <Badge variant='default' size='sm'>
                          Private
                        </Badge>
                      )}
                    </RepoName>
                    {repo.description && (
                      <RepoDescription>{repo.description}</RepoDescription>
                    )}
                    <RepoMeta>
                      {repo.language && (
                        <span>
                          <Code
                            size={12}
                            style={{ display: 'inline', marginRight: '4px' }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span>
                        <Zap
                          size={12}
                          style={{ display: 'inline', marginRight: '4px' }}
                        />
                        {repo.stars} stars
                      </span>
                      <span>Updated {formatDate(repo.updatedAt)}</span>
                    </RepoMeta>

                    {isSelected && (
                      <TrackingOptions>
                        <TrackingOption
                          onClick={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <OptionCheckbox
                            type='checkbox'
                            checked={config.codeReview}
                            onChange={(e) =>
                              updateTrackingConfig(
                                repo.id,
                                'codeReview',
                                e.target.checked
                              )
                            }
                          />
                          <OptionLabel>
                            <OptionIcon $color={theme.colors.primary}>
                              <Code size={14} />
                            </OptionIcon>
                            Code Reviews
                          </OptionLabel>
                        </TrackingOption>
                        <TrackingOption
                          onClick={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <OptionCheckbox
                            type='checkbox'
                            checked={config.optimization}
                            onChange={(e) =>
                              updateTrackingConfig(
                                repo.id,
                                'optimization',
                                e.target.checked
                              )
                            }
                          />
                          <OptionLabel>
                            <OptionIcon $color={theme.colors.warning}>
                              <Zap size={14} />
                            </OptionIcon>
                            Performance Optimizations
                          </OptionLabel>
                        </TrackingOption>
                        <TrackingOption
                          onClick={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <OptionCheckbox
                            type='checkbox'
                            checked={config.accessibility}
                            onChange={(e) =>
                              updateTrackingConfig(
                                repo.id,
                                'accessibility',
                                e.target.checked
                              )
                            }
                          />
                          <OptionLabel>
                            <OptionIcon $color={theme.colors.success}>
                              <Shield size={14} />
                            </OptionIcon>
                            Accessibility Checks
                          </OptionLabel>
                        </TrackingOption>
                      </TrackingOptions>
                    )}
                  </RepoInfo>
                </RepoItem>
              )
            })}
          </RepoList>
        )}

        <ActionsBar>
          <SelectionSummary>
            {selectedRepos.size > 0 ? (
              <>
                <CheckCircle2 size={16} color={theme.colors.success} />
                {selectedRepos.size} repository
                {selectedRepos.size !== 1 ? 'ies' : ''} selected
              </>
            ) : (
              <>No repositories selected</>
            )}
          </SelectionSummary>
          <ButtonsWrapper>
            {onCancel && (
              <Button variant='secondary' onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button onClick={handleSave} disabled={selectedRepos.size === 0}>
              <Settings size={16} style={{ marginRight: '4px' }} />
              Save Selection
            </Button>
          </ButtonsWrapper>
        </ActionsBar>
      </Container>
    </Card>
  )
}
