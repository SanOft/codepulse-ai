/** @format */

import React from 'react'
import styled from 'styled-components'
import { Card, Badge } from '../ui'
import { Calendar } from 'lucide-react'
import { theme } from '../../styles/theme'

interface DateRangeFilterProps {
  selectedRange: string
  onRangeChange: (range: string) => void
}

const CardContainer = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Title = styled.h3`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.base};
`

const DateRangeText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
`

const RangeBadge = styled(Badge)`
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2px 10px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: transparent;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const RangeButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  white-space: nowrap;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  transition: all 0.15s ease;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.textPrimary : theme.colors.textMuted};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.xs};
  cursor: pointer;

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.primaryHover : theme.colors.muted};
    border-color: ${({ theme }) => theme.colors.borderHover};
  }
`

const CustomRangeSection = styled.div`
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const CustomRangeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSize.sm};
`

const CustomRangeLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`

const PickDatesButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  white-space: nowrap;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  transition: all 0.15s ease;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.xs};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
    border-color: ${({ theme }) => theme.colors.borderHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`

const ranges = [
  { value: '7', label: 'Last 7 Days' },
  { value: '14', label: 'Last 14 Days' },
  { value: '30', label: 'Last 30 Days' },
  { value: '90', label: 'Last 90 Days' },
  { value: '365', label: 'Last Year' },
]

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  selectedRange,
  onRangeChange,
}) => {
  return (
    <CardContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
        <Header>
          <TitleSection>
            <Title>
              <Calendar size={16} color={theme.colors.primary} />
              Date Range
            </Title>
            <DateRangeText>Nov 2, 2025 to Dec 2, 2025</DateRangeText>
          </TitleSection>
          <RangeBadge variant="default" size="sm">
            {selectedRange} days
          </RangeBadge>
        </Header>
        <ButtonGroup>
          {ranges.map((range) => (
            <RangeButton
              key={range.value}
              $active={selectedRange === range.value}
              onClick={() => onRangeChange(range.value)}
            >
              {range.label}
            </RangeButton>
          ))}
        </ButtonGroup>
        <CustomRangeSection>
          <CustomRangeRow>
            <CustomRangeLabel>Custom Range</CustomRangeLabel>
            <PickDatesButton>
              <Calendar size={14} style={{ marginRight: '4px' }} />
              Pick Dates
            </PickDatesButton>
          </CustomRangeRow>
        </CustomRangeSection>
      </div>
    </CardContainer>
  )
}

