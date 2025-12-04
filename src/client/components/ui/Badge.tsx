/** @format */

import React from 'react'
import styled from 'styled-components'

interface BadgeProps {
  children: React.ReactNode
  variant?:
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'default'
    | 'critical'
    | 'high'
    | 'medium'
    | 'low'
  size?: 'sm' | 'md' | 'lg'
}

const StyledBadge = styled.span<{
  $variant: BadgeProps['variant']
  $size: BadgeProps['size']
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;

  /* Size */
  ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return `
          padding: 2px 8px;
          font-size: ${theme.fontSize.xs};
        `
      case 'lg':
        return `
          padding: 6px 16px;
          font-size: ${theme.fontSize.md};
        `
      default:
        return `
          padding: 4px 12px;
          font-size: ${theme.fontSize.sm};
        `
    }
  }}

  /* Variant */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'success':
        return `
          background: rgba(16, 185, 129, 0.1);
          color: ${theme.colors.successLight};
          border: 1px solid ${theme.colors.success};
        `
      case 'warning':
        return `
          background: rgba(245, 158, 11, 0.1);
          color: ${theme.colors.warningLight};
          border: 1px solid ${theme.colors.warning};
        `
      case 'error':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: ${theme.colors.errorLight};
          border: 1px solid ${theme.colors.error};
        `
      case 'info':
        return `
          background: rgba(59, 130, 246, 0.1);
          color: ${theme.colors.infoLight};
          border: 1px solid ${theme.colors.info};
        `
      case 'critical':
        return `
          background: ${theme.colors.criticalBg};
          color: ${theme.colors.critical};
          border: 1px solid ${theme.colors.criticalBorder};
        `
      case 'high':
        return `
          background: ${theme.colors.highBg};
          color: ${theme.colors.high};
          border: 1px solid ${theme.colors.highBorder};
        `
      case 'medium':
        return `
          background: ${theme.colors.mediumBg};
          color: ${theme.colors.medium};
          border: 1px solid ${theme.colors.mediumBorder};
        `
      case 'low':
        return `
          background: ${theme.colors.lowBg};
          color: ${theme.colors.low};
          border: 1px solid ${theme.colors.lowBorder};
        `
      default:
        return `
          background: ${theme.colors.backgroundCard};
          color: ${theme.colors.textMuted};
          border: 1px solid ${theme.colors.border};
        `
    }
  }}
`

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
}) => {
  return (
    <StyledBadge $variant={variant} $size={size}>
      {children}
    </StyledBadge>
  )
}
