/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  Code2,
  Zap,
  Shield,
  Github,
  GitBranch,
  Activity,
  CircleHelp,
} from 'lucide-react'

const FooterContainer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundCard};
  backdrop-filter: blur(10px);
  margin-top: auto;
`

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};
`

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const BrandIcon = styled.div`
  position: relative;
  width: 2.5rem; /* w-10 */
  height: 2.5rem; /* h-10 */
  border-radius: 0.5rem; /* rounded-lg */
  background: linear-gradient(
    to bottom right,
    hsl(239, 84%, 67%),
    /* from-primary */ hsl(262, 83%, 58%),
    /* via-secondary */ hsl(189, 94%, 43%) /* to-accent */
  );
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
`
const BrandIconInner = styled.div`
  /* Inner div: w-full h-full rounded-lg bg-background */
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background-color: #141f38; /* bg-background */

  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(239, 84%, 67%); /* text-primary */
`
const BrandName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  // background: linear-gradient(
  //   135deg,
  //   ${({ theme }) => theme.colors.primary},
  //   ${({ theme }) => theme.colors.secondary}
  // );
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
  // background-clip: text;
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
  --tw-gradient-from: hsl(var(--primary)) var(--tw-gradient-from-position);
  --tw-gradient-to: hsl(var(--primary) / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  --tw-gradient-to: hsl(var(--secondary) / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from),
    hsl(var(--secondary)) var(--tw-gradient-via-position), var(--tw-gradient-to);
  --tw-gradient-to: hsl(var(--accent)) var(--tw-gradient-to-position);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`

const BrandDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 400px;
  margin: 0;
  line-height: 1.6;
`

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

const FooterBadge = styled.div<{ $variant?: 'primary' | 'default' }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  background: ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
      : theme.colors.backgroundCard};
  color: ${({ $variant }) => ($variant === 'primary' ? 'white' : 'inherit')};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const FooterLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const FooterBottom = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  justify-content: space-between;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`

const Copyright = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const BottomLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`

const BottomLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

interface FooterProps {
  variant?: 'default' | 'minimal'
}

const MinimalFooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
`

const MinimalFooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  justify-content: space-between;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`

const MinimalBadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

export const Footer: React.FC<FooterProps> = ({ variant = 'default' }) => {
  if (variant === 'minimal') {
    return (
      <FooterContainer>
        <MinimalFooterContent>
          <MinimalFooterBottom>
            <Copyright>
              © {new Date().getFullYear()} CodePulse AI. All rights reserved.
            </Copyright>
            <MinimalBadgeContainer>
              <FooterBadge $variant='primary'>
                <Zap size={12} />
                Mock Mode
              </FooterBadge>
            </MinimalBadgeContainer>
          </MinimalFooterBottom>
        </MinimalFooterContent>
      </FooterContainer>
    )
  }

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <BrandSection>
            <BrandHeader>
              <BrandIcon>
                <BrandIconInner>
                  <Code2 size={20} />
                </BrandIconInner>
              </BrandIcon>
              <BrandName className='gradient-text'>CodePulse AI</BrandName>
            </BrandHeader>
            <BrandDescription>
              Production-grade AI code intelligence platform processing 100K+
              reviews/month with strict budget controls and comprehensive
              metrics.
            </BrandDescription>
            <BadgeContainer>
              <FooterBadge $variant='primary'>
                <Zap size={12} />
                Mock Mode
              </FooterBadge>
              <FooterBadge>
                <Shield size={12} />
                Budget Protected
              </FooterBadge>
            </BadgeContainer>
          </BrandSection>

          <LinksSection>
            <SectionTitle>Resources</SectionTitle>
            <LinksList>
              <li>
                <FooterLink to='#docs'>Documentation</FooterLink>
              </li>
              <li>
                <FooterLink to='#api'>API Reference</FooterLink>
              </li>
              <li>
                <FooterLink to='#privacy'>Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink to='#terms'>Terms of Service</FooterLink>
              </li>
            </LinksList>
          </LinksSection>

          <LinksSection>
            <SectionTitle>Version Control</SectionTitle>
            <LinksList>
              <li>
                <FooterLink to='/integrations/github'>
                  <Github size={14} />
                  GitHub
                </FooterLink>
              </li>
              <li>
                <FooterLink to='/integrations/gitlab'>
                  <GitBranch size={14} />
                  GitLab
                </FooterLink>
              </li>
              <li>
                <FooterLink to='/integrations/bitbucket'>
                  <GitBranch size={14} />
                  Bitbucket
                </FooterLink>
              </li>
            </LinksList>
          </LinksSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>
            © {new Date().getFullYear()} CodePulse AI. All rights reserved.
          </Copyright>
          <BottomLinks>
            <BottomLink to='#status'>
              <Activity size={14} />
              System Status
            </BottomLink>
            <BottomLink to='#support'>
              <CircleHelp size={14} />
              Support
            </BottomLink>
          </BottomLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  )
}
