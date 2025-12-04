import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { GitPullRequest } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { webSocketClient } from '../../services/websocket-client.service';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(
      circle at top left,
      rgba(99, 102, 241, 0.15),
      transparent 50%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(139, 92, 246, 0.1),
      transparent 50%
    ),
    ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Nested/sub pages that should have minimal footer
  const nestedPages = [
    '/cost-history-chart',
    '/api-call-log',
    '/budget-settings',
    '/integrations',
    '/pull-requests',
  ]
  
  const isNestedPage = nestedPages.some((path) =>
    location.pathname.startsWith(path)
  )
  
  const footerVariant = isNestedPage ? 'minimal' : 'default'

  useEffect(() => {
    // Check if GitHub is connected
    const token = localStorage.getItem('github_access_token')
    if (!token) {
      return
    }

    // Connect to WebSocket
    webSocketClient.connect()

    // Listen for PR created events
    const unsubscribePR = webSocketClient.on('github_pr_created', (message) => {
      const pr = message.pr
      
      toast.success('New Pull Request', {
        description: `${pr.repository.fullName} • #${pr.number}`,
        duration: 10000,
        action: {
          label: 'View PR',
          onClick: () => {
            navigate(`/pull-requests/${pr.repository.owner}/${pr.repository.name}/${pr.number}`)
          },
        },
        icon: <GitPullRequest size={18} />,
      })
    })

    // Listen for PR closed events
    const unsubscribeClosed = webSocketClient.on('github_pr_closed', (message) => {
      const pr = message.pr
      
      toast.info('Pull Request Closed', {
        description: `${pr.repository.fullName} • #${pr.number}${pr.merged ? ' (merged)' : ''}`,
        duration: 5000,
      })
    })

    // Cleanup on unmount
    return () => {
      unsubscribePR()
      unsubscribeClosed()
      webSocketClient.disconnect()
    }
  }, [navigate])

  return (
    <LayoutContainer>
      <Header />
      <Main>{children}</Main>
      <Footer variant={footerVariant} />
    </LayoutContainer>
  );
};
