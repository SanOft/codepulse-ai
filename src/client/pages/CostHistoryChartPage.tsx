/** @format */

import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { DateRangeFilter } from '../components/cost-history-chart/DateRangeFilter'
import { CostHistoryChart } from '../components/cost-history-chart/CostHistoryChart'
import { CostComparisonMetrics } from '../components/cost-history-chart/CostComparisonMetrics'
import { CostTrendAnalysis } from '../components/cost-history-chart/CostTrendAnalysis'

const PageContainer = styled.div`
  flex: 1;
  min-height: calc(100vh - 128px);
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
`

const HeaderSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const FooterLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: text-decoration 0.15s ease;

  &:hover {
    text-decoration: underline;
  }
`

export const CostHistoryChartPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30')

  return (
    <PageContainer>
      <Container>
        <HeaderSection>
          <BackLink to="/metrics">
            <ArrowLeft size={16} />
            <span>Back to Metrics</span>
          </BackLink>
          <Title>Cost History Chart</Title>
          <Description>
            Analyze your AI review spending patterns over time. Identify trends,
            spikes, and optimize your budget allocation.
          </Description>
        </HeaderSection>

        <Section>
          <DateRangeFilter
            selectedRange={dateRange}
            onRangeChange={setDateRange}
          />
        </Section>

        <Section>
          <CostHistoryChart />
        </Section>

        <Section>
          <CostComparisonMetrics />
        </Section>

        <Section>
          <CostTrendAnalysis />
        </Section>

        <FooterSection>
          <FooterLink to="/metrics">
            <ArrowLeft size={16} />
            <span>Return to Metrics Overview</span>
          </FooterLink>
          <FooterLink to="/">
            <span>Back to Dashboard</span>
            <ArrowRight size={16} />
          </FooterLink>
        </FooterSection>
      </Container>
    </PageContainer>
  )
}

