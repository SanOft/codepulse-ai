/** @format */

import React from 'react'
import styled from 'styled-components'
import { Card } from '../ui'
import { Info, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react'
import { theme } from '../../styles/theme'

const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const InfoBox = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => `${theme.colors.info}1a`};
  border: 1px solid ${({ theme }) => `${theme.colors.info}30`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`

const InfoIcon = styled.div`
  color: ${({ theme }) => theme.colors.info};
  flex-shrink: 0;
  margin-top: 2px;
`

const InfoContent = styled.div`
  flex: 1;
`

const InfoTitle = styled.h5`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`

const InfoText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  line-height: 1.6;
`

const CodeBlock = styled.code`
  display: block;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.muted}50;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.spacing.xs};
  word-break: break-all;
`

const List = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ListItem = styled.li`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`
const LinkWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`

const Link = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    text-decoration: underline;
  }
`

interface OAuthFormGuideProps {
  provider: 'github' | 'gitlab' | 'bitbucket'
}

const providerConfig = {
  github: {
    name: 'GitHub',
    callbackUrl: 'http://localhost:3000/integrations/github/callback',
    productionUrl: 'https://yourdomain.com/integrations/github/callback',
    oauthDocsUrl:
      'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
  },
  gitlab: {
    name: 'GitLab',
    callbackUrl: 'http://localhost:3000/integrations/gitlab/callback',
    productionUrl: 'https://yourdomain.com/integrations/gitlab/callback',
    oauthDocsUrl: 'https://docs.gitlab.com/ee/integration/oauth_provider.html',
  },
  bitbucket: {
    name: 'Bitbucket',
    callbackUrl: 'http://localhost:3000/integrations/bitbucket/callback',
    productionUrl: 'https://yourdomain.com/integrations/bitbucket/callback',
    oauthDocsUrl:
      'https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/',
  },
}

export const OAuthFormGuide: React.FC<OAuthFormGuideProps> = ({ provider }) => {
  const config = providerConfig[provider]

  return (
    <Card
      title='How to Fill the OAuth Registration Form'
      subtitle='Step-by-step guide to register your OAuth application'
    >
      <GuideContainer>
        <Section>
          <SectionTitle>
            <Info size={20} />
            Understanding the Authorization Callback URL
          </SectionTitle>

          <InfoBox>
            <InfoIcon>
              <AlertCircle size={18} />
            </InfoIcon>
            <InfoContent>
              <InfoTitle>What is the Authorization Callback URL?</InfoTitle>
              <InfoText>
                The Authorization Callback URL (also called Redirect URI) is the
                URL where {config.name} will send users after they authorize
                your application. This is a critical part of the OAuth flow and
                must match exactly what you configure in your {config.name}{' '}
                OAuth app settings.
              </InfoText>
            </InfoContent>
          </InfoBox>

          <InfoBox>
            <InfoIcon>
              <CheckCircle2 size={18} />
            </InfoIcon>
            <InfoContent>
              <InfoTitle>How it works:</InfoTitle>
              <List>
                <ListItem>
                  User clicks "Connect with {config.name}" in your app
                </ListItem>
                <ListItem>
                  User is redirected to {config.name} to authorize your app
                </ListItem>
                <ListItem>
                  {config.name} redirects back to your Callback URL with an
                  authorization code
                </ListItem>
                <ListItem>
                  Your app exchanges the code for an access token
                </ListItem>
              </List>
            </InfoContent>
          </InfoBox>
        </Section>

        <Section>
          <SectionTitle>
            <Info size={20} />
            Form Field Guidelines
          </SectionTitle>

          <InfoBox>
            <InfoIcon>
              <Info size={18} />
            </InfoIcon>
            <InfoContent>
              <InfoTitle>1. Application name</InfoTitle>
              <InfoText>
                Choose a name that users will recognize and trust. This appears
                when users authorize your application.
              </InfoText>
              <CodeBlock>Example: CodePulse AI</CodeBlock>
            </InfoContent>
          </InfoBox>

          <InfoBox>
            <InfoIcon>
              <Info size={18} />
            </InfoIcon>
            <InfoContent>
              <InfoTitle>2. Homepage URL</InfoTitle>
              <InfoText>
                The main URL of your application. This is where users can learn
                more about your app.
              </InfoText>
              <CodeBlock>Development: http://localhost:3000/</CodeBlock>
              <CodeBlock>Production: https://yourdomain.com/</CodeBlock>
            </InfoContent>
          </InfoBox>

          <InfoBox>
            <InfoIcon>
              <Info size={18} />
            </InfoIcon>
            <InfoContent>
              <InfoTitle>3. Application description (Optional)</InfoTitle>
              <InfoText>
                A brief description of what your application does. This helps
                users understand what permissions they're granting.
              </InfoText>
              <CodeBlock>
                Example: AI-powered code review tool that analyzes pull requests
                and provides intelligent feedback
              </CodeBlock>
            </InfoContent>
          </InfoBox>

          <InfoBox>
            <InfoIcon>
              <AlertCircle size={18} />
            </InfoIcon>
            <InfoContent>
              <InfoTitle>4. Authorization callback URL (Required)</InfoTitle>
              <InfoText>
                <strong>This is the most important field!</strong> It must match
                exactly what you configure in your {config.name} OAuth app
                settings.
              </InfoText>
              <InfoText>
                <strong>For Development:</strong>
              </InfoText>
              <CodeBlock>{config.callbackUrl}</CodeBlock>
              <InfoText>
                <strong>For Production:</strong>
              </InfoText>
              <CodeBlock>{config.productionUrl}</CodeBlock>
              <InfoText style={{ marginTop: theme.spacing.sm }}>
                <strong>Important Notes:</strong>
              </InfoText>
              <List>
                <ListItem>
                  The URL must use <code>http://</code> for localhost or{' '}
                  <code>https://</code> for production
                </ListItem>
                <ListItem>
                  The path must match exactly:{' '}
                  <code>/integrations/{provider}/callback</code>
                </ListItem>
                <ListItem>
                  You can add multiple callback URLs in {config.name} settings
                  for different environments
                </ListItem>
                <ListItem>
                  The URL must be accessible (not behind a firewall) when users
                  authorize
                </ListItem>
              </List>
            </InfoContent>
          </InfoBox>

          <InfoBox>
            <InfoIcon>
              <Info size={18} />
            </InfoIcon>
            <InfoContent>
              <InfoTitle>5. Enable Device Flow (Optional)</InfoTitle>
              <InfoText>
                Device Flow allows authorization on devices without a browser or
                with limited input capabilities. Only enable this if you need to
                support devices like smart TVs, IoT devices, or command-line
                tools.
              </InfoText>
            </InfoContent>
          </InfoBox>
        </Section>

        <Section>
          <SectionTitle>
            <Info size={20} />
            After Registration
          </SectionTitle>

          <InfoBox>
            <InfoIcon>
              <CheckCircle2 size={18} />
            </InfoIcon>
            <InfoContent>
              <InfoTitle>What happens next?</InfoTitle>
              <List>
                <ListItem>
                  {config.name} will generate a <strong>Client ID</strong> and{' '}
                  <strong>Client Secret</strong>
                </ListItem>
                <ListItem>
                  Save these credentials securely - you won't be able to see the
                  Client Secret again
                </ListItem>
                <ListItem>
                  Use these credentials in the integration page to complete the
                  connection
                </ListItem>
                <ListItem>
                  Test the callback URL to ensure it's working correctly
                </ListItem>
              </List>
            </InfoContent>
          </InfoBox>
        </Section>

        <LinkWrapper>
          <Link
            href={config.oauthDocsUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            <ExternalLink size={14} />
            Read {config.name} OAuth Documentation
          </Link>
        </LinkWrapper>
      </GuideContainer>
    </Card>
  )
}
