/** @format */

import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, Button } from '../ui'
import { CheckCircle2 } from 'lucide-react'

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Required = styled.span`
  color: ${({ theme }) => theme.colors.error};
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

const StyledTextarea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.muted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-family: ui-sans-serif, system-ui, sans-serif;
  width: 100%;
  min-height: 100px;
  resize: vertical;
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

const HintText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const Code = styled.code`
  color: ${({ theme }) => theme.colors.primary};
`
const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`

const CheckboxContent = styled.div`
  flex: 1;
`
const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-top: 2px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary};
`

const CheckboxLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  flex: 1;
`

const CheckboxDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  margin-top: ${({ theme }) => theme.spacing.xs};
`

const Link = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    text-decoration: underline;
  }
`

const ActionsBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const SuccessMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => `${theme.colors.success}1a`};
  border: 1px solid ${({ theme }) => `${theme.colors.success}30`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const SuccessIcon = styled.div`
  color: ${({ theme }) => theme.colors.success};
  flex-shrink: 0;
  margin-top: 2px;
`

const SuccessContent = styled.div`
  flex: 1;
`

const SuccessTitle = styled.h5`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`

const SuccessText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`

const CredentialsBox = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.muted}30;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`

const CredentialItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`

const CredentialLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textMuted};
`

const CredentialValue = styled.code`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
  background: ${({ theme }) => theme.colors.muted}50;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  word-break: break-all;
`

interface OAuthAppRegistrationProps {
  provider: 'github' | 'gitlab' | 'bitbucket'
  onSuccess?: (credentials: { clientId: string; clientSecret: string }) => void
  onCancel?: () => void
}

const providerConfig = {
  github: {
    name: 'GitHub',
    homepageUrl: 'http://localhost:3000/',
    callbackUrl: 'http://localhost:5000/auth/github/callback',
    oauthDocsUrl:
      'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
    deviceFlowDocsUrl:
      'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#device-flow',
  },
  gitlab: {
    name: 'GitLab',
    homepageUrl: 'http://localhost:3000/',
    callbackUrl: 'http://localhost:5000/auth/gitlab/callback',
    oauthDocsUrl: 'https://docs.gitlab.com/ee/integration/oauth_provider.html',
    deviceFlowDocsUrl: 'https://docs.gitlab.com/ee/api/oauth2.html#device-flow',
  },
  bitbucket: {
    name: 'Bitbucket',
    homepageUrl: 'http://localhost:3000/',
    callbackUrl: 'http://localhost:5000/auth/bitbucket/callback',
    oauthDocsUrl:
      'https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/',
    deviceFlowDocsUrl:
      'https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/',
  },
}

export const OAuthAppRegistration: React.FC<OAuthAppRegistrationProps> = ({
  provider,
  onSuccess,
  onCancel,
}) => {
  const config = providerConfig[provider]
  const [formData, setFormData] = useState({
    applicationName: 'CodePulse AI',
    homepageUrl: config.homepageUrl,
    description: '',
    callbackUrl: config.callbackUrl,
    enableDeviceFlow: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [credentials, setCredentials] = useState<{
    clientId: string
    clientSecret: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const generatedClientId = `${provider.toUpperCase()}_${Math.random()
        .toString(36)
        .substring(2, 15)
        .toUpperCase()}`
      const generatedClientSecret = `${Math.random()
        .toString(36)
        .substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`

      setCredentials({
        clientId: generatedClientId,
        clientSecret: generatedClientSecret,
      })
      setIsSuccess(true)
      setIsSubmitting(false)

      if (onSuccess) {
        onSuccess({
          clientId: generatedClientId,
          clientSecret: generatedClientSecret,
        })
      }
    }, 1500)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  if (isSuccess && credentials) {
    return (
      <Card
        title={`Register a new OAuth app - ${config.name}`}
        subtitle='OAuth application registered successfully'
      >
        <SuccessMessage>
          <SuccessIcon>
            <CheckCircle2 size={18} />
          </SuccessIcon>
          <SuccessContent>
            <SuccessTitle>Application Registered Successfully</SuccessTitle>
            <SuccessText>
              Your OAuth application has been registered. Please save the
              credentials below. You won't be able to see the client secret
              again.
            </SuccessText>
          </SuccessContent>
        </SuccessMessage>

        <CredentialsBox>
          <CredentialItem>
            <CredentialLabel>Client ID</CredentialLabel>
            <CredentialValue>{credentials.clientId}</CredentialValue>
          </CredentialItem>
          <CredentialItem>
            <CredentialLabel>Client Secret</CredentialLabel>
            <CredentialValue>{credentials.clientSecret}</CredentialValue>
          </CredentialItem>
        </CredentialsBox>

        <ActionsBar>
          <Button variant='secondary' onClick={onCancel}>
            Close
          </Button>
          <Button
            onClick={() => {
              if (onSuccess) {
                onSuccess(credentials)
              }
            }}
          >
            Use These Credentials
          </Button>
        </ActionsBar>
      </Card>
    )
  }

  return (
    <Card
      title={`Register a new OAuth app - ${config.name}`}
      subtitle='Create a new OAuth application to enable integration'
    >
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <FormGroup>
            <Label htmlFor='applicationName'>
              Application name
              <Required>*</Required>
            </Label>
            <StyledInput
              id='applicationName'
              name='applicationName'
              type='text'
              value={formData.applicationName}
              onChange={handleChange}
              required
              placeholder='CodePulse AI'
            />
            <HintText>Something users will recognize and trust.</HintText>
          </FormGroup>

          <FormGroup>
            <Label htmlFor='homepageUrl'>
              Homepage URL
              <Required>*</Required>
            </Label>
            <StyledInput
              id='homepageUrl'
              name='homepageUrl'
              type='url'
              value={formData.homepageUrl}
              onChange={handleChange}
              required
              placeholder='http://localhost:3000/'
            />
            <HintText>The full URL to your application homepage.</HintText>
          </FormGroup>

          <FormGroup>
            <Label htmlFor='description'>Application description</Label>
            <StyledTextarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Application description is optional'
              rows={4}
            />
            <HintText>
              This is displayed to all users of your application.
            </HintText>
          </FormGroup>

          <FormGroup>
            <Label htmlFor='callbackUrl'>
              Authorization callback URL
              <Required>*</Required>
            </Label>
            <StyledInput
              id='callbackUrl'
              name='callbackUrl'
              type='url'
              value={formData.callbackUrl}
              onChange={handleChange}
              required
              placeholder='http://localhost:3000/integrations/github/callback'
            />
            <HintText>
              <strong>What is this?</strong> This is the URL where {config.name}{' '}
              will redirect users after they authorize your application. It must
              match exactly what you configure in your {config.name} OAuth app
              settings.
              <br />
              <br />
              <strong>Format:</strong> <Code>{config.callbackUrl}</Code>
              <br />
              <br />
              For production, use your actual domain:{' '}
              <Code>
                https://yourdomain.com/integrations/{provider}/callback
              </Code>
              <br />
              <br />
              Read our{' '}
              <Link
                href={config.oauthDocsUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                OAuth documentation
              </Link>{' '}
              for more information.
            </HintText>
          </FormGroup>

          <CheckboxGroup>
            <CheckboxWrapper>
              <Checkbox
                id='enableDeviceFlow'
                name='enableDeviceFlow'
                type='checkbox'
                checked={formData.enableDeviceFlow}
                onChange={handleChange}
              />
              <CheckboxContent>
                <CheckboxLabel htmlFor='enableDeviceFlow'>
                  Enable Device Flow
                </CheckboxLabel>
                <CheckboxDescription>
                  Allow this OAuth App to authorize users via the Device Flow.
                  Read the{' '}
                  <Link
                    href={config.deviceFlowDocsUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Device Flow documentation
                  </Link>{' '}
                  for more information.
                </CheckboxDescription>
              </CheckboxContent>
            </CheckboxWrapper>
          </CheckboxGroup>

          <ActionsBar>
            <Button variant='secondary' onClick={onCancel} type='button'>
              Cancel
            </Button>
            <Button type='submit' loading={isSubmitting}>
              Register application
            </Button>
          </ActionsBar>
        </FormContainer>
      </form>
    </Card>
  )
}
