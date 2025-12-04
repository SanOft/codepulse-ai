/** @format */

import React from 'react'
import styled from 'styled-components'
import { Button } from '../ui'
import { GitPullRequest, X, Eye } from 'lucide-react'
import { theme } from '../../styles/theme'

const NotificationContainer = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 80px;
  right: ${({ theme }) => theme.spacing.md};
  z-index: 1000;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  padding: ${({ theme }) => theme.spacing.md};
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`

const NotificationTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.muted}30;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`

const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const PRInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const PRTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
`

const PRMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`

const NotificationActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`

interface PRNotificationProps {
  visible: boolean
  pr: {
    number: number
    title: string
    repository: {
      owner: string
      name: string
      fullName: string
    }
    author: string
    createdAt: string
  }
  onView: () => void
  onDismiss: () => void
}

export const PRNotification: React.FC<PRNotificationProps> = ({
  visible,
  pr,
  onView,
  onDismiss,
}) => {
  if (!visible) return null

  return (
    <NotificationContainer $visible={visible}>
      <NotificationHeader>
        <NotificationTitle>
          <GitPullRequest size={18} color={theme.colors.primary} />
          <span>New Pull Request</span>
        </NotificationTitle>
        <CloseButton onClick={onDismiss} aria-label='Dismiss notification'>
          <X size={16} />
        </CloseButton>
      </NotificationHeader>

      <NotificationContent>
        <PRInfo>
          <PRTitle>{pr.title}</PRTitle>
          <PRMeta>
            <span>{pr.repository.fullName}</span>
            <span>•</span>
            <span>#{pr.number}</span>
            <span>•</span>
            <span>by {pr.author}</span>
          </PRMeta>
        </PRInfo>
      </NotificationContent>

      <NotificationActions>
        <Button variant='ghost' size='sm' onClick={onDismiss} fullWidth>
          Dismiss
        </Button>
        <Button variant='primary' size='sm' onClick={onView} fullWidth>
          <Eye size={14} style={{ marginRight: '4px' }} />
          View PR
        </Button>
      </NotificationActions>
    </NotificationContainer>
  )
}

