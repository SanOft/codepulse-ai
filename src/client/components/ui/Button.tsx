/** @format */

import React from 'react'
import styled, { css } from 'styled-components'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  style?: React.CSSProperties
}

const ButtonBase = styled.button<{
  $variant: ButtonProps['variant']
  $size: ButtonProps['size']
  $fullWidth?: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  border: none;
  outline: none;
  text-transform: capitalize;
  letter-spacing: 0.05em;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  /* Size variants */
  ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return css`
          padding: ${theme.spacing.xs} ${theme.spacing.md};
          font-size: ${theme.fontSize.xs};
        `
      case 'lg':
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.fontSize.md};
        `
      default:
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          font-size: ${theme.fontSize.sm};
        `
    }
  }}

  /* Style variants */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background: linear-gradient(
            135deg,
            ${theme.colors.primary},
            ${theme.colors.secondary}
          );
          color: ${theme.colors.textPrimary};
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);

          &:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `
      case 'secondary':
        return css`
          background: ${theme.colors.backgroundCard};
          color: ${theme.colors.textSecondary};
          border: 1px solid ${theme.colors.border};

          &:hover:not(:disabled) {
            background: ${theme.colors.backgroundHover};
            border-color: ${theme.colors.borderHover};
          }
        `
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.colors.textMuted};

          &:hover:not(:disabled) {
            background: rgba(148, 163, 184, 0.1);
            color: ${theme.colors.textSecondary};
          }
        `
      case 'danger':
        return css`
          background: ${theme.colors.error};
          color: white;

          &:hover:not(:disabled) {
            background: ${theme.colors.errorLight};
          }
        `
      default:
        return css`
          background: ${theme.colors.backgroundCard};
          color: ${theme.colors.textSecondary};
        `
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Spinner = styled.div`
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  style,
}) => {
  return (
    <ButtonBase
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      style={style}
    >
      {loading && <Spinner />}
      {children}
    </ButtonBase>
  )
}
