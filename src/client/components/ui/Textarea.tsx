import React from 'react';
import styled from 'styled-components';

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: string;
  placeholder?: string;
  value: string;
  onChange?: (value: string) => void | ((e: React.ChangeEvent<HTMLTextAreaElement>) => void);
  rows?: number;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const TextareaWrapper = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StyledTextarea = styled.textarea<{ $hasError?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid ${({ theme, $hasError }) =>
    $hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
  transition: all ${({ theme }) => theme.transitions.fast};
  resize: vertical;
  width: 100%;
  min-height: 120px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme, $hasError }) =>
      $hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
`;

export const Textarea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  rows = 10,
  error,
  disabled = false,
  fullWidth = true,
  id,
  name,
  required,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (typeof onChange === 'function') {
      // Check if onChange expects a string or event
      try {
        onChange(e.target.value)
      } catch {
        onChange(e as any)
      }
    }
  }

  return (
    <TextareaWrapper $fullWidth={fullWidth}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledTextarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        rows={rows}
        disabled={disabled}
        required={required}
        $hasError={!!error}
        {...rest}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </TextareaWrapper>
  );
};
