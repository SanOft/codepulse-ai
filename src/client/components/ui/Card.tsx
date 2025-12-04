/** @format */

import React from 'react'
import styled from 'styled-components'

interface CardProps {
  children: React.ReactNode
  title?: string | React.ReactNode
  subtitle?: string
  padding?: 'sm' | 'md' | 'lg'
  hoverable?: boolean
  onClick?: () => void
  className?: string
  icon?: React.ReactNode
}

const CardContainer = styled.div<{
  $padding: CardProps['padding']
  $hoverable?: boolean
}>`
  /* glass-card styles from tailwind-build.css */
  border-width: 1px;
  border-color: hsla(217, 33%, 17%, 0.5); /* hsl(var(--border) / .5) */
  background-color: hsla(222, 47%, 15%, 0.8); /* hsl(var(--card) / .8) */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  overflow: hidden;

  padding: ${({ $padding, theme }) => {
    switch ($padding) {
      case 'sm':
        return theme.spacing.md
      case 'lg':
        return theme.spacing.xl
      default:
        return theme.spacing.lg
    }
  }};

  ${({ $hoverable, theme }) =>
    $hoverable &&
    `
    cursor: pointer;

    &:hover {
      border-color: hsla(217, 33%, 17%, 0.7);
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.xl};
    }
  `}
`

const CardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const CardTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`
const CardSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const CardBody = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`
const Icon = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  margin-right: ${({ theme }) => theme.spacing.xs};
`
export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  padding = 'md',
  hoverable = false,
  onClick,
  className,
  icon = null,
}) => {
  return (
    <CardContainer
      $padding={padding}
      $hoverable={hoverable}
      onClick={onClick}
      className={className}
    >
      {(title || subtitle) && (
        <CardHeader>
          {title && (
            <CardTitleWrapper>
              {icon && <Icon>{icon}</Icon>}
              <CardTitle>{typeof title === 'string' ? title : title}</CardTitle>
            </CardTitleWrapper>
          )}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
    </CardContainer>
  )
}
