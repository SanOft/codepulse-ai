/** @format */

import React, { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {
  Activity,
  ArrowLeft,
  House,
  Funnel,
  List,
  ArrowDown,
} from 'lucide-react'
import { theme } from '../styles/theme'
import { Card } from '../components/ui'
import { ApiCallLogStats } from '../components/api-call-log/ApiCallLogStats'
import { ApiCallLogFilters } from '../components/api-call-log/ApiCallLogFilters'
import { ApiCallLogTable } from '../components/api-call-log/ApiCallLogTable'

const PageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 128px);
`

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const IconContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.primary}1a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: 640px) {
    flex-direction: row;
  }
`

const FooterLink = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted}30;
    border-color: ${({ theme }) => theme.colors.borderHover};
  }
`
const SortBySelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.muted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}50;
  }
`
const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const FilterTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const TableHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const TableTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`

const TableDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const SortControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const SortDirectionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted}30;
  }
`

const SortIcon = styled(ArrowDown)<{ $isAscending: boolean }>`
  transform: ${({ $isAscending }) =>
    $isAscending ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.15s ease;
`

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const PaginationInfo = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const PaginationControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`

const PaginationButton = styled.button<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`

const PageNumbers = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`

const PageButton = styled.button<{ $active?: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: ${({ $active, theme }) =>
    $active ? 'none' : `1px solid ${theme.colors.border}`};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  cursor: pointer;
`

// Mock data
const apiCalls = [
  {
    id: 'LOG-005',
    timestamp: 'Dec 2, 2025, 09:55:00 AM',
    cost: 0.0012,
    tokens: 800,
    diffSize: '2.1 KB',
    cache: true,
    status: 'Success',
  },
  {
    id: 'LOG-004',
    timestamp: 'Dec 2, 2025, 09:45:00 AM',
    cost: 0.0053,
    tokens: 12500,
    diffSize: '18.5 KB',
    cache: false,
    status: 'Success',
  },
  {
    id: 'LOG-003',
    timestamp: 'Dec 2, 2025, 09:30:00 AM',
    cost: 0.0001,
    tokens: 150,
    diffSize: '0.4 KB',
    cache: true,
    status: 'Success',
  },
  {
    id: 'LOG-002',
    timestamp: 'Dec 2, 2025, 08:40:00 AM',
    cost: 0.0,
    tokens: 0,
    diffSize: '3.5 KB',
    cache: false,
    status: 'Budget Exceeded',
  },
  {
    id: 'LOG-006',
    timestamp: 'Dec 2, 2025, 08:30:00 AM',
    cost: 0.0124,
    tokens: 13057,
    diffSize: '11.9 KB',
    cache: true,
    status: 'Success',
  },
  {
    id: 'LOG-007',
    timestamp: 'Dec 2, 2025, 08:15:00 AM',
    cost: 0.0089,
    tokens: 9181,
    diffSize: '24.9 KB',
    cache: true,
    status: 'Success',
  },
  {
    id: 'LOG-001',
    timestamp: 'Dec 2, 2025, 08:00:00 AM',
    cost: 0.008,
    tokens: 15000,
    diffSize: '22.0 KB',
    cache: false,
    status: 'Success',
  },
  {
    id: 'LOG-008',
    timestamp: 'Dec 2, 2025, 08:00:00 AM',
    cost: 0.0085,
    tokens: 12234,
    diffSize: '20.9 KB',
    cache: true,
    status: 'Success',
  },
  {
    id: 'LOG-009',
    timestamp: 'Dec 2, 2025, 07:45:00 AM',
    cost: 0.0111,
    tokens: 19713,
    diffSize: '16.9 KB',
    cache: true,
    status: 'Success',
  },
  {
    id: 'LOG-010',
    timestamp: 'Dec 2, 2025, 07:30:00 AM',
    cost: 0.0146,
    tokens: 20299,
    diffSize: '14.9 KB',
    cache: true,
    status: 'Success',
  },
]

export const ApiCallLogPage: React.FC = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('timestamp')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const itemsPerPage = 10

  // Sort and filter the API calls
  const sortedAndFilteredCalls = useMemo(() => {
    let filtered = [...apiCalls]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((call) =>
        call.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((call) => call.status === statusFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case 'timestamp':
          // Parse timestamp string like "Dec 2, 2025, 09:55:00 AM"
          const dateA = new Date(a.timestamp).getTime()
          const dateB = new Date(b.timestamp).getTime()
          comparison = dateA - dateB
          break
        case 'cost':
          comparison = a.cost - b.cost
          break
        case 'tokens':
          comparison = a.tokens - b.tokens
          break
        default:
          return 0
      }

      return sortDirection === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [searchQuery, statusFilter, sortBy, sortDirection])

  // Reset to page 1 when filters or sort change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, statusFilter, sortBy, sortDirection])

  const totalPages = Math.ceil(sortedAndFilteredCalls.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedCalls = sortedAndFilteredCalls.slice(startIndex, endIndex)

  const handleSortChange = (newSortBy: string) => {
    if (newSortBy === sortBy) {
      // Toggle direction if same field
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      // New field, default to descending
      setSortBy(newSortBy)
      setSortDirection('desc')
    }
  }

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }

  return (
    <PageContainer>
      <Container>
        <HeaderSection>
          <HeaderRow>
            <IconContainer>
              <Activity size={20} />
            </IconContainer>
            <div>
              <Title>API Call Log</Title>
              <Description>
                Chronological record of all API review requests with detailed
                metrics
              </Description>
            </div>
          </HeaderRow>
        </HeaderSection>

        <Section>
          <ApiCallLogStats />
        </Section>

        <Section>
          <Card>
            <CardContent>
              <FilterHeader>
                <Funnel size={18} color={theme.colors.textPrimary} />
                <FilterTitle>Filters & Search</FilterTitle>
              </FilterHeader>
              <ApiCallLogFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
              />
            </CardContent>
          </Card>
        </Section>

        <Section>
          <Card>
            <CardContent>
              <TableHeader>
                <div>
                  <TableHeaderLeft>
                    <List size={18} color={theme.colors.textPrimary} />
                    <TableTitle>Request Log</TableTitle>
                  </TableHeaderLeft>
                  <TableDescription>
                    Showing {displayedCalls.length} of{' '}
                    {sortedAndFilteredCalls.length} requests
                  </TableDescription>
                </div>
                <SortControls>
                  <SortBySelect
                    id='sort-by-select'
                    aria-label='Sort by field'
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value='timestamp'>Sort by Date</option>
                    <option value='cost'>Sort by Cost</option>
                    <option value='tokens'>Sort by Tokens</option>
                  </SortBySelect>
                  <SortDirectionButton
                    onClick={toggleSortDirection}
                    aria-label={`Sort ${
                      sortDirection === 'asc' ? 'ascending' : 'descending'
                    }`}
                  >
                    <SortIcon
                      size={16}
                      $isAscending={sortDirection === 'asc'}
                    />
                  </SortDirectionButton>
                </SortControls>
              </TableHeader>
              <ApiCallLogTable calls={displayedCalls} />
            </CardContent>
          </Card>
        </Section>

        <Section>
          <PaginationContainer>
            <PaginationInfo>
              Page {currentPage} of {totalPages}
            </PaginationInfo>
            <PaginationControls>
              <PaginationButton
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                $disabled={currentPage === 1}
              >
                Previous
              </PaginationButton>
              <PageNumbers>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PageButton
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      $active={currentPage === page}
                    >
                      {page}
                    </PageButton>
                  )
                )}
              </PageNumbers>
              <PaginationButton
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                $disabled={currentPage === totalPages}
              >
                Next
              </PaginationButton>
            </PaginationControls>
          </PaginationContainer>
        </Section>

        <FooterSection>
          <FooterLink onClick={() => navigate('/metrics')}>
            <ArrowLeft size={16} />
            <span>Back to Metrics Overview</span>
          </FooterLink>
          <FooterLink onClick={() => navigate('/')}>
            <House size={16} />
            <span>Back to Dashboard</span>
          </FooterLink>
        </FooterSection>
      </Container>
    </PageContainer>
  )
}
