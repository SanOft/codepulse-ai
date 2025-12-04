/** @format */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Card, Button, Badge } from '../components/ui'
import {
  Github,
  GitBranch,
  ArrowLeft,
  CheckCircle2,
  X,
  ExternalLink,
  Key,
  Link2,
  Shield,
  AlertCircle,
  Loader2,
  Info,
  Code,
  Zap,
  Settings,
} from 'lucide-react'
import { OAuthFormGuide } from '../components/integrations/OAuthFormGuide'
import { RepositorySelector } from '../components/integrations/RepositorySelector'
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

const IconContainer = styled.div<{ $color: string }>`
  width: 3rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ $color }) => `${$color}1a`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
`

const TitleGroup = styled.div`
  flex: 1;
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const StatusBadge = styled(Badge)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const InfoCard = styled(Card)`
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const InfoItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`

const FormCard = styled(Card)`
  background: ${({ theme }) => theme.colors.backgroundCard};
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const StyledInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.muted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  width: 100%;
  transition: all 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}50;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const Textarea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.muted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
  resize: vertical;
  min-height: 100px;
  transition: all 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}50;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const HelpText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xs};
`

const ActionsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const AlertBox = styled.div<{ $variant: 'info' | 'success' | 'warning' }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ $variant, theme }) => {
    switch ($variant) {
      case 'success':
        return `${theme.colors.success}1a`
      case 'warning':
        return `${theme.colors.warning}1a`
      default:
        return `${theme.colors.info}1a`
    }
  }};
  border: 1px solid
    ${({ $variant, theme }) => {
      switch ($variant) {
        case 'success':
          return `${theme.colors.success}30`
        case 'warning':
          return `${theme.colors.warning}30`
        default:
          return `${theme.colors.info}30`
      }
    }};
`

const AlertIcon = styled.div<{ $variant: 'info' | 'success' | 'warning' }>`
  color: ${({ $variant, theme }) => {
    switch ($variant) {
      case 'success':
        return theme.colors.success
      case 'warning':
        return theme.colors.warning
      default:
        return theme.colors.info
    }
  }};
  flex-shrink: 0;
  margin-top: 2px;
`

const AlertContent = styled.div`
  flex: 1;
`

const AlertTitle = styled.h5`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`

const AlertText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`

const providerConfig = {
  github: {
    name: 'GitHub',
    icon: Github,
    color: '#ffffff',
    bgColor: '#24292e',
    description: 'Connect your GitHub account to enable automated code reviews on pull requests and commits.',
    docsUrl: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
    setupSteps: [
      'Create a new OAuth App in your GitHub Developer Settings',
      'Set Authorization callback URL to your application URL',
      'Copy the Client ID and Client Secret',
      'Paste them below and authorize the connection',
    ],
  },
  gitlab: {
    name: 'GitLab',
    icon: GitBranch,
    color: '#fc6d26',
    bgColor: '#fc6d261a',
    description: 'Integrate with GitLab to automatically review merge requests and track code quality.',
    docsUrl: 'https://docs.gitlab.com/ee/integration/oauth_provider.html',
    setupSteps: [
      'Create a new OAuth application in GitLab',
      'Set Redirect URI to your application callback URL',
      'Copy the Application ID and Secret',
      'Enter credentials below and complete authorization',
    ],
  },
  bitbucket: {
    name: 'Bitbucket',
    icon: GitBranch,
    color: '#0052cc',
    bgColor: '#0052cc1a',
    description: 'Link your Bitbucket workspace to enable code review automation for pull requests.',
    docsUrl: 'https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/',
    setupSteps: [
      'Create an OAuth consumer in Bitbucket',
      'Configure callback URL in consumer settings',
      'Copy the Key and Secret',
      'Paste credentials and authorize the integration',
    ],
  },
}

export const IntegrationPage: React.FC = () => {
  const navigate = useNavigate()
  const { provider } = useParams<{ provider: 'github' | 'gitlab' | 'bitbucket' }>()
  const [searchParams] = useSearchParams()
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [showRepoSelector, setShowRepoSelector] = useState(false)
  const [selectedRepositories, setSelectedRepositories] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  // Handle OAuth callback
  useEffect(() => {
    const token = searchParams.get('token')
    const providerParam = searchParams.get('provider')
    const errorParam = searchParams.get('error')
    const username = searchParams.get('username')
    const userId = searchParams.get('userId')

    if (errorParam) {
      setError(errorParam)
      // Clean URL
      navigate(`/integrations/${provider}`, { replace: true })
      return
    }

    if (token && providerParam === provider) {
      // Store token in localStorage
      localStorage.setItem(`${provider}_access_token`, token)
      if (username) {
        localStorage.setItem(`${provider}_username`, username)
      }
      if (userId) {
        localStorage.setItem(`${provider}_user_id`, userId)
      }

      setAccessToken(token)
      setIsConnected(true)
      setShowRepoSelector(true)
      setError(null)
      // Clean URL
      navigate(`/integrations/${provider}`, { replace: true })
    }
  }, [searchParams, provider, navigate])

  // Check if already connected on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(`${provider}_access_token`)
    if (storedToken) {
      setAccessToken(storedToken)
      setIsConnected(true)
    }
  }, [provider])

  if (!provider || !providerConfig[provider]) {
    return (
      <PageContainer>
        <Card>
          <div style={{ textAlign: 'center', padding: '48px' }}>
            <AlertCircle size={48} style={{ margin: '0 auto 16px', color: theme.colors.error }} />
            <h2>Invalid Integration Provider</h2>
            <p style={{ color: theme.colors.textMuted }}>
              The requested integration provider is not supported.
            </p>
            <Button onClick={() => navigate('/')} style={{ marginTop: '16px' }}>
              <ArrowLeft size={16} style={{ marginRight: '4px' }} />
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </PageContainer>
    )
  }

  const config = providerConfig[provider]
  const Icon = config.icon

  const handleOAuthConnect = () => {
    // Open OAuth in a popup window
    const width = 600
    const height = 700
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    const popup = window.open(
      `http://localhost:5000/auth/${provider}`,
      'oauth',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
    )

    if (!popup) {
      setError('Popup blocked. Please allow popups for this site.')
      return
    }

    setIsLoading(true)
    setError(null)

    // Listen for postMessage from popup
    const messageHandler = (event: MessageEvent) => {
      // Verify origin for security
      if (event.origin !== 'http://localhost:5000' && event.origin !== window.location.origin) {
        return
      }

      if (event.data.type === 'OAUTH_SUCCESS' && event.data.provider === provider) {
        const { token, username, userId } = event.data

        // Store token in localStorage
        localStorage.setItem(`${provider}_access_token`, token)
        if (username) {
          localStorage.setItem(`${provider}_username`, username)
        }
        if (userId) {
          localStorage.setItem(`${provider}_user_id`, userId)
        }

        setAccessToken(token)
        setIsConnected(true)
        setShowRepoSelector(true)
        setError(null)
        setIsLoading(false)

        // Cleanup
        window.removeEventListener('message', messageHandler)
        if (popup && !popup.closed) {
          popup.close()
        }
      } else if (event.data.type === 'OAUTH_ERROR') {
        setError(event.data.error || 'OAuth authentication failed')
        setIsLoading(false)
        window.removeEventListener('message', messageHandler)
        if (popup && !popup.closed) {
          popup.close()
        }
      }
    }

    window.addEventListener('message', messageHandler)

    // Check if popup was closed manually
    const checkPopup = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopup)
        window.removeEventListener('message', messageHandler)
        if (!isConnected) {
          setIsLoading(false)
        }
      }
    }, 500)

    // Cleanup after 5 minutes
    setTimeout(() => {
      clearInterval(checkPopup)
      window.removeEventListener('message', messageHandler)
      if (popup && !popup.closed) {
        popup.close()
      }
      if (!isConnected) {
        setIsLoading(false)
      }
    }, 300000)
  }

  const handleConnect = async () => {
    // This is for manual token-based connection (optional)
    if (!accessToken) {
      setError('Please enter an access token or use OAuth connection')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Test the token by fetching user info
      const apiUrl = provider === 'github' 
        ? 'https://api.github.com/user'
        : provider === 'gitlab'
        ? `${process.env.GITLAB_URL || 'https://gitlab.com'}/api/v4/user`
        : 'https://api.bitbucket.org/2.0/user'

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error('Invalid access token')
      }

      setIsConnected(true)
      setShowRepoSelector(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRepositoriesSave = (repositories: any[]) => {
    setSelectedRepositories(repositories)
    setShowRepoSelector(false)
    // Here you would typically save to backend
    console.log('Selected repositories:', repositories)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setClientId('')
    setClientSecret('')
    setAccessToken('')
    setShowRepoSelector(false)
    setSelectedRepositories([])
  }

  return (
    <PageContainer>
      <HeaderSection>
        <BackButton onClick={() => navigate('/')}>
          <ArrowLeft size={16} />
          Back to Dashboard
        </BackButton>
        <HeaderRow>
          <IconContainer $color={config.color}>
            <Icon size={24} />
          </IconContainer>
          <TitleGroup>
            <Title>{config.name} Integration</Title>
            <Description>{config.description}</Description>
          </TitleGroup>
          {isConnected ? (
            <StatusBadge variant='success' size='md'>
              <CheckCircle2 size={14} />
              Connected
            </StatusBadge>
          ) : (
            <StatusBadge variant='default' size='md'>
              <X size={14} />
              Not Connected
            </StatusBadge>
          )}
        </HeaderRow>
      </HeaderSection>

      {isConnected ? (
        <Section>
          {showRepoSelector ? (
            <RepositorySelector
              provider={provider as 'github' | 'gitlab' | 'bitbucket'}
              onSave={handleRepositoriesSave}
              onCancel={() => setShowRepoSelector(false)}
            />
          ) : (
            <>
              <AlertBox $variant='success'>
                <AlertIcon $variant='success'>
                  <CheckCircle2 size={18} />
                </AlertIcon>
                <AlertContent>
                  <AlertTitle>Successfully Connected</AlertTitle>
                  <AlertText>
                    Your {config.name} account is now connected.
                    {selectedRepositories.length > 0
                      ? ` ${selectedRepositories.length} repository${selectedRepositories.length !== 1 ? 'ies' : ''} are being tracked.`
                      : ' Please select repositories to track for automated reviews.'}
                  </AlertText>
                </AlertContent>
              </AlertBox>

              {selectedRepositories.length > 0 && (
                <FormCard
                  title='Tracked Repositories'
                  subtitle={`${selectedRepositories.length} repository${selectedRepositories.length !== 1 ? 'ies' : ''} configured for automated reviews`}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
                    {selectedRepositories.map((repo) => (
                      <div
                        key={repo.id}
                        style={{
                          padding: theme.spacing.md,
                          background: theme.colors.muted + '30',
                          border: `1px solid ${theme.colors.border}`,
                          borderRadius: theme.borderRadius.md,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: theme.spacing.sm,
                              marginBottom: theme.spacing.xs,
                            }}
                          >
                            <GitBranch size={16} />
                            <strong>{repo.fullName}</strong>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              gap: theme.spacing.md,
                              fontSize: theme.fontSize.xs,
                              color: theme.colors.textMuted,
                            }}
                          >
                            {repo.tracking.codeReview && (
                              <Badge variant='default' size='sm'>
                                <Code size={10} style={{ marginRight: '4px' }} />
                                Code Reviews
                              </Badge>
                            )}
                            {repo.tracking.optimization && (
                              <Badge variant='warning' size='sm'>
                                <Zap size={10} style={{ marginRight: '4px' }} />
                                Optimizations
                              </Badge>
                            )}
                            {repo.tracking.accessibility && (
                              <Badge variant='success' size='sm'>
                                <Shield size={10} style={{ marginRight: '4px' }} />
                                Accessibility
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <ActionsBar>
                    <Button
                      variant='secondary'
                      onClick={() => setShowRepoSelector(true)}
                    >
                      <Settings size={16} style={{ marginRight: '4px' }} />
                      Manage Repositories
                    </Button>
                  </ActionsBar>
                </FormCard>
              )}

              <FormCard title='Connection Details' subtitle='Manage your integration settings'>
            <FormGroup>
              <Label>
                <Shield size={14} />
                Connection Status
              </Label>
              <StatusBadge variant='success' size='md'>
                <CheckCircle2 size={14} />
                Active
              </StatusBadge>
              <HelpText>
                <Info size={12} />
                Your {config.name} integration is active and ready to use.
              </HelpText>
            </FormGroup>

            <ActionsBar>
              <Button variant='secondary' onClick={handleDisconnect}>
                <X size={16} style={{ marginRight: '4px' }} />
                Disconnect
              </Button>
              {selectedRepositories.length === 0 && (
                <Button onClick={() => setShowRepoSelector(true)}>
                  <GitBranch size={16} style={{ marginRight: '4px' }} />
                  Select Repositories
                </Button>
              )}
              <Button onClick={() => navigate('/settings')}>
                <ExternalLink size={16} style={{ marginRight: '4px' }} />
                Manage Settings
              </Button>
            </ActionsBar>
          </FormCard>
            </>
          )}
        </Section>
      ) : (
        <Section>
          <OAuthFormGuide provider={provider as 'github' | 'gitlab' | 'bitbucket'} />

          <InfoCard title='Setup Instructions' subtitle='Follow these steps to connect your account'>
            <InfoHeader>
              <Link2 size={18} color={theme.colors.primary} />
              <h3 style={{ margin: 0, fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.semibold }}>
                How to Connect
              </h3>
            </InfoHeader>
            <InfoList>
              {config.setupSteps.map((step, index) => (
                <InfoItem key={index}>
                  <span style={{ color: theme.colors.primary, fontWeight: theme.fontWeight.bold }}>
                    {index + 1}.
                  </span>
                  <span>{step}</span>
                </InfoItem>
              ))}
            </InfoList>
            <div style={{ marginTop: theme.spacing.md }}>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => window.open(config.docsUrl, '_blank')}
              >
                <ExternalLink size={14} style={{ marginRight: '4px' }} />
                View {config.name} Documentation
              </Button>
            </div>
          </InfoCard>

          <FormCard title='OAuth Credentials' subtitle='Enter your application credentials'>
            <FormGroup>
              <Label htmlFor='clientId'>
                <Key size={14} />
                Client ID / Application Key
              </Label>
              <StyledInput
                id='clientId'
                name='clientId'
                type='text'
                placeholder={`Enter your ${config.name} Client ID`}
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                disabled={isLoading}
              />
              <HelpText>
                <Info size={12} />
                Found in your {config.name} OAuth application settings
              </HelpText>
            </FormGroup>

            <FormGroup>
              <Label htmlFor='clientSecret'>
                <Key size={14} />
                Client Secret / Application Secret
              </Label>
              <StyledInput
                id='clientSecret'
                name='clientSecret'
                type='password'
                placeholder={`Enter your ${config.name} Client Secret`}
                value={clientSecret}
                onChange={(e) => setClientSecret(e.target.value)}
                disabled={isLoading}
              />
              <HelpText>
                <Info size={12} />
                Keep this secret secure. Never commit it to version control.
              </HelpText>
            </FormGroup>

            <FormGroup>
              <Label htmlFor='accessToken'>
                <Key size={14} />
                Access Token (Optional)
              </Label>
              <Textarea
                id='accessToken'
                placeholder='Paste your access token here if using token-based authentication'
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                disabled={isLoading}
              />
              <HelpText>
                <Info size={12} />
                For advanced users. Leave empty to use OAuth flow.
              </HelpText>
            </FormGroup>

            <AlertBox $variant='warning'>
              <AlertIcon $variant='warning'>
                <AlertCircle size={18} />
              </AlertIcon>
              <AlertContent>
                <AlertTitle>Security Notice</AlertTitle>
                <AlertText>
                  Your credentials are encrypted and stored securely. Never share your Client Secret
                  or Access Token with anyone.
                </AlertText>
              </AlertContent>
            </AlertBox>

            <ActionsBar>
              <Button variant='secondary' onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button
                onClick={handleOAuthConnect}
                disabled={isLoading}
                loading={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} style={{ marginRight: '4px' }} className='animate-spin' />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Link2 size={16} style={{ marginRight: '4px' }} />
                    Connect with {config.name}
                  </>
                )}
              </Button>
            </ActionsBar>
          </FormCard>
        </Section>
      )}
    </PageContainer>
  )
}

