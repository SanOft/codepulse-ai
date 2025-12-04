import React from 'react';
import styled from 'styled-components';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: string | React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'success' | 'warning';
}

const Container = styled.div<{ $variant?: MetricCardProps['variant'] }>`
  /* metric-card styles from tailwind-build.css */
  border-width: 1px;
  border-color: ${({ $variant, theme }) => {
    if ($variant === 'success') return `hsla(142, 76%, 36%, 0.2)`;
    if ($variant === 'warning') return `hsla(43, 96%, 56%, 0.2)`;
    return `hsla(217, 33%, 17%, 0.5)`;
  }};
  background-color: ${({ $variant }) => {
    if ($variant === 'success') return `hsla(142, 76%, 36%, 0.05)`;
    if ($variant === 'warning') return `hsla(43, 96%, 56%, 0.05)`;
    return `hsla(222, 47%, 15%, 0.8)`;
  }};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 0.5rem; /* var(--radius) */
  padding: 1.5rem; /* 1.5rem from metric-card */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25); /* var(--shadow-card) */
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.025em;
`;

const IconWrapper = styled.div<{ $variant?: MetricCardProps['variant'] }>`
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: hsla(239, 84%, 67%, 0.1); /* bg-primary/10 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $variant, theme }) => {
    if ($variant === 'success') return theme.colors.success;
    if ($variant === 'warning') return theme.colors.warning;
    return theme.colors.primary;
  }};
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Subtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const TrendContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TrendBadge = styled.span<{ $trend: MetricCardProps['trend'] }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid;
  padding: 2px 10px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ $trend, theme }) => {
    switch ($trend) {
      case 'up':
        return theme.colors.success;
      case 'down':
        return theme.colors.error;
      default:
        return theme.colors.textMuted;
    }
  }};
  border-color: ${({ $trend, theme }) => {
    switch ($trend) {
      case 'up':
        return `hsla(142, 76%, 36%, 0.2)`;
      case 'down':
        return `hsla(0, 84%, 60%, 0.2)`;
      default:
        return theme.colors.border;
    }
  }};
  background-color: ${({ $trend, theme }) => {
    switch ($trend) {
      case 'up':
        return `hsla(142, 76%, 36%, 0.1)`;
      case 'down':
        return `hsla(0, 84%, 60%, 0.1)`;
      default:
        return 'transparent';
    }
  }};
`;

const TrendText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  variant,
}) => {
  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return <span style={{ fontSize: '1rem' }}>{icon}</span>;
    }
    return icon;
  };

  return (
    <Container $variant={variant}>
      <Header>
        <Label>{label}</Label>
        {icon && (
          <IconWrapper $variant={variant}>{renderIcon()}</IconWrapper>
        )}
      </Header>
      <div style={{ paddingTop: 0 }}>
        <Value>{value}</Value>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {trend && (
          <TrendContainer>
            <TrendBadge $trend={trend}>
              {trend === 'up' ? (
                <TrendingUp size={10} />
              ) : trend === 'down' ? (
                <TrendingDown size={10} />
              ) : null}
              {trendValue && (
                <span>
                  {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}
                  {trendValue}
                </span>
              )}
            </TrendBadge>
            {trendValue && <TrendText>vs last month</TrendText>}
          </TrendContainer>
        )}
      </div>
    </Container>
  );
};
