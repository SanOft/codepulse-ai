/** @format */

import React from 'react'
import styled from 'styled-components'
import { Calendar } from 'lucide-react'

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const FiltersRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 640px) {
    flex-direction: row;
  }
`

const FilterGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textMuted};
`

const StyledInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.muted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  transition: all 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary}50;
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}50;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const StyledSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.muted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;
  transition: all 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary}50;
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}50;
  }
`

const DateRangeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const DateRangeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const DateRangeLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const DateRangeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const DateInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const DateLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`

interface ApiCallLogFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
}

export const ApiCallLogFilters: React.FC<ApiCallLogFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}) => {
  return (
    <FiltersContainer>
      <FiltersRow>
        <FilterGroup>
          <Label>Search by Request ID</Label>
          <StyledInput
            type='text'
            placeholder='e.g., LOG-001'
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </FilterGroup>
        <FilterGroup>
          <Label>Status</Label>
          <StyledSelect
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value='all'>All Statuses</option>
            <option value='Success'>Success</option>
            <option value='Budget Exceeded'>Budget Exceeded</option>
            <option value='Client Error'>Client Error</option>
          </StyledSelect>
        </FilterGroup>
      </FiltersRow>

      <DateRangeSection>
        <DateRangeHeader>
          <DateRangeLabel>
            <Calendar size={14} />
            Date Range
          </DateRangeLabel>
        </DateRangeHeader>
        <DateRangeGrid>
          <DateInputGroup>
            <DateLabel>From</DateLabel>
            <StyledInput type='date' />
          </DateInputGroup>
          <DateInputGroup>
            <DateLabel>To</DateLabel>
            <StyledInput type='date' />
          </DateInputGroup>
        </DateRangeGrid>
      </DateRangeSection>
    </FiltersContainer>
  )
}

