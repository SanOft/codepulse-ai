/** @format */

import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Badge } from '../components/ui'
import { useReview } from '../hooks/useReview'
import {
  DollarSign,
  TriangleAlert,
  Calendar,
  CalendarDays,
  Zap,
  FileText,
  TrendingDown,
  TrendingUp,
  Settings,
  BarChart3,
  ChartColumn,
  Home,
  Plus,
  Cpu,
} from 'lucide-react'

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const HeaderIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(99, 102, 241, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`

const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const StatusSummaryCard = styled(Card)`
  background: rgba(245, 158, 11, 0.1);
  border: 2px solid rgba(245, 158, 11, 0.2);
`

const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const StatusLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
`

const StatusIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.warning};
`

const StatusContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const StatusTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`

const StatusDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const StatusBadge = styled(Badge)`
  background: ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.background};
  border-color: ${({ theme }) => theme.colors.warning};
`

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const StatusItemLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: 0;
`

const StatusItemValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`

const StatusItemSubtext = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const WarningAlert = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(245, 158, 11, 0.05);
  border-left: 4px solid ${({ theme }) => theme.colors.warning};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const WarningContent = styled.div`
  flex: 1;
`

const WarningTitle = styled.h5`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.warning};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`

const WarningText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const ProgressSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ProgressCard = styled(Card)``

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ProgressTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const ProgressSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const ProgressValue = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ProgressAmount = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const ProgressLimit = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const ProgressPercentage = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ProgressFill = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
  background: ${({ $percentage, theme }) =>
    $percentage > 80
      ? `linear-gradient(90deg, ${theme.colors.warning}, ${theme.colors.warningLight})`
      : `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`};
  transition: width 0.3s ease;
`

const ProgressDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ProgressMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const ProgressMetric = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const ProgressMetricLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: 0;
`

const ProgressMetricValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`

const MetricCard = styled(Card)`
  border-color: ${({ theme }) => theme.colors.border};
`

const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const MetricLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`

const MetricIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(99, 102, 241, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`

const MetricValue = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const MetricSubtext = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const MetricTrend = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const ConfigCard = styled(Card)``

const ConfigGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ConfigItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ConfigItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const ConfigLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const ConfigValue = styled(Badge)`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`

const ConfigDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const ConfigActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: 640px) {
    flex-direction: row;
  }
`

const NavigationActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};

  @media (min-width: 640px) {
    flex-direction: row;
  }
`

export const BudgetPage: React.FC = () => {
  const navigate = useNavigate()
  const { metrics } = useReview()

  const dailyLimit = 0.5
  const monthlyLimit = 10.0
  const maxApiCalls = 50
  const totalCost = metrics?.totalCost ?? 0
  const dailyCost = 0.42 // Simulated daily cost
  const monthlyCost = 8.5 // Simulated monthly cost
  const dailyPercentage = Math.min((dailyCost / dailyLimit) * 100, 100)
  const monthlyPercentage = Math.min((monthlyCost / monthlyLimit) * 100, 100)
  const apiCallsToday = 45
  const cacheHitRate = 65.0
  const averageCost = 0.0339
  const totalReviews = 452

  const showDailyWarning = dailyPercentage >= 80
  const showMonthlyWarning = monthlyPercentage >= 80

  return (
    <PageContainer>
      <div>
        <PageHeader>
          <HeaderIcon>
            <DollarSign size={20} />
          </HeaderIcon>
          <div>
            <PageTitle>Budget Dashboard</PageTitle>
            <PageSubtitle>
              Monitor your daily and monthly budget consumption for AI code
              reviews
            </PageSubtitle>
          </div>
        </PageHeader>
      </div>

      <StatusSummaryCard>
        <StatusHeader>
          <StatusLeft>
            <StatusIcon>
              <TriangleAlert size={24} />
            </StatusIcon>
            <StatusContent>
              <StatusTitle>System Status</StatusTitle>
              <StatusDescription>
                One or more budgets approaching limits
              </StatusDescription>
            </StatusContent>
          </StatusLeft>
          <StatusBadge variant='warning'>Warning</StatusBadge>
        </StatusHeader>
        <StatusGrid>
          <StatusItem>
            <StatusItemLabel>
              <Calendar size={12} />
              Daily Usage
            </StatusItemLabel>
            <StatusItemValue>{dailyPercentage.toFixed(1)}%</StatusItemValue>
            <StatusItemSubtext>
              ${dailyCost.toFixed(2)} / ${dailyLimit.toFixed(2)}
            </StatusItemSubtext>
          </StatusItem>
          <StatusItem>
            <StatusItemLabel>
              <CalendarDays size={12} />
              Monthly Usage
            </StatusItemLabel>
            <StatusItemValue>{monthlyPercentage.toFixed(1)}%</StatusItemValue>
            <StatusItemSubtext>
              ${monthlyCost.toFixed(2)} / ${monthlyLimit.toFixed(2)}
            </StatusItemSubtext>
          </StatusItem>
          <StatusItem>
            <StatusItemLabel>
              <Zap size={12} />
              API Calls Today
            </StatusItemLabel>
            <StatusItemValue>{apiCallsToday}</StatusItemValue>
            <StatusItemSubtext>of {maxApiCalls} allowed</StatusItemSubtext>
          </StatusItem>
          <StatusItem>
            <StatusItemLabel>
              <Zap size={12} />
              Cache Hit Rate
            </StatusItemLabel>
            <StatusItemValue>{cacheHitRate.toFixed(1)}%</StatusItemValue>
            <StatusItemSubtext>Cached requests</StatusItemSubtext>
          </StatusItem>
        </StatusGrid>
      </StatusSummaryCard>

      {(showDailyWarning || showMonthlyWarning) && (
        <div>
          {showDailyWarning && (
            <WarningAlert>
              <TriangleAlert
                size={16}
                style={{ flexShrink: 0, marginTop: '2px', color: '#f59e0b' }}
              />
              <WarningContent>
                <WarningTitle>Daily Budget Warning</WarningTitle>
                <WarningText>
                  You have used {dailyPercentage.toFixed(1)}% of your daily
                  budget. Only ${(dailyLimit - dailyCost).toFixed(2)} remaining.
                </WarningText>
              </WarningContent>
            </WarningAlert>
          )}
          {showMonthlyWarning && (
            <WarningAlert>
              <TriangleAlert
                size={16}
                style={{ flexShrink: 0, marginTop: '2px', color: '#f59e0b' }}
              />
              <WarningContent>
                <WarningTitle>Monthly Budget Warning</WarningTitle>
                <WarningText>
                  You have used {monthlyPercentage.toFixed(1)}% of your monthly
                  budget. Only ${(monthlyLimit - monthlyCost).toFixed(2)}{' '}
                  remaining.
                </WarningText>
              </WarningContent>
            </WarningAlert>
          )}
        </div>
      )}

      <ProgressSection>
        <ProgressCard>
          <ProgressHeader>
            <div style={{ flex: 1 }}>
              <ProgressTitle>
                <Calendar size={20} />
                Daily Budget
              </ProgressTitle>
              <ProgressSubtitle>
                Today's spending vs daily limit
              </ProgressSubtitle>
            </div>
            {showDailyWarning && <Badge variant='warning'>Warning</Badge>}
          </ProgressHeader>
          <ProgressValue>
            <ProgressAmount>${dailyCost.toFixed(2)}</ProgressAmount>
            <ProgressLimit>of ${dailyLimit.toFixed(2)}</ProgressLimit>
          </ProgressValue>
          <ProgressPercentage>
            {dailyPercentage.toFixed(1)}% of daily budget used
          </ProgressPercentage>
          <ProgressBar>
            <ProgressFill $percentage={dailyPercentage} />
          </ProgressBar>
          <ProgressDetails>
            <span>${(dailyLimit - dailyCost).toFixed(2)} remaining</span>
            <span>{(100 - dailyPercentage).toFixed(1)}% available</span>
          </ProgressDetails>
          <ProgressMetrics>
            <ProgressMetric>
              <ProgressMetricLabel>
                <Zap size={12} />
                API Calls Today
              </ProgressMetricLabel>
              <ProgressMetricValue>
                {apiCallsToday}/{maxApiCalls}
              </ProgressMetricValue>
            </ProgressMetric>
            <ProgressMetric>
              <ProgressMetricLabel>
                <Zap size={12} />
                Avg Cost/Call
              </ProgressMetricLabel>
              <ProgressMetricValue>
                ${averageCost.toFixed(4)}
              </ProgressMetricValue>
            </ProgressMetric>
          </ProgressMetrics>
        </ProgressCard>

        <ProgressCard>
          <ProgressHeader>
            <div style={{ flex: 1 }}>
              <ProgressTitle>
                <CalendarDays size={20} />
                Monthly Budget
              </ProgressTitle>
              <ProgressSubtitle>
                This month's spending vs monthly limit
              </ProgressSubtitle>
            </div>
            {showMonthlyWarning && <Badge variant='warning'>Warning</Badge>}
          </ProgressHeader>
          <ProgressValue>
            <ProgressAmount>${monthlyCost.toFixed(2)}</ProgressAmount>
            <ProgressLimit>of ${monthlyLimit.toFixed(2)}</ProgressLimit>
          </ProgressValue>
          <ProgressPercentage>
            {monthlyPercentage.toFixed(1)}% of monthly budget used
          </ProgressPercentage>
          <ProgressBar>
            <ProgressFill $percentage={monthlyPercentage} />
          </ProgressBar>
          <ProgressDetails>
            <span>${(monthlyLimit - monthlyCost).toFixed(2)} remaining</span>
            <span>{(100 - monthlyPercentage).toFixed(1)}% available</span>
          </ProgressDetails>
          <ProgressMetrics>
            <ProgressMetric>
              <ProgressMetricLabel>
                <FileText size={12} />
                Total Reviews
              </ProgressMetricLabel>
              <ProgressMetricValue>{totalReviews}</ProgressMetricValue>
            </ProgressMetric>
            <ProgressMetric>
              <ProgressMetricLabel>
                <Zap size={12} />
                Cache Hit Rate
              </ProgressMetricLabel>
              <ProgressMetricValue>
                {cacheHitRate.toFixed(1)}%
              </ProgressMetricValue>
            </ProgressMetric>
          </ProgressMetrics>
        </ProgressCard>
      </ProgressSection>

      <MetricsGrid>
        <MetricCard>
          <MetricHeader>
            <MetricLabel>Daily API Calls</MetricLabel>
            <MetricIcon>
              <Zap size={16} />
            </MetricIcon>
          </MetricHeader>
          <MetricValue>{apiCallsToday}</MetricValue>
          <MetricSubtext>of {maxApiCalls} allowed</MetricSubtext>
          <MetricTrend>
            <Badge variant='success' size='sm'>
              <TrendingUp size={10} style={{ marginRight: '4px' }} />
              +12%
            </Badge>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              vs yesterday
            </span>
          </MetricTrend>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricLabel>Cache Hit Rate</MetricLabel>
            <MetricIcon>
              <Zap size={16} />
            </MetricIcon>
          </MetricHeader>
          <MetricValue>{cacheHitRate.toFixed(1)}%</MetricValue>
          <MetricSubtext>Cached vs new requests</MetricSubtext>
          <MetricTrend>
            <Badge variant='success' size='sm'>
              <TrendingUp size={10} style={{ marginRight: '4px' }} />
              +5%
            </Badge>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              improvement
            </span>
          </MetricTrend>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricLabel>Average Cost</MetricLabel>
            <MetricIcon>
              <TrendingDown size={16} />
            </MetricIcon>
          </MetricHeader>
          <MetricValue>${averageCost.toFixed(4)}</MetricValue>
          <MetricSubtext>per review</MetricSubtext>
          <MetricTrend>
            <Badge variant='error' size='sm'>
              <TrendingDown size={10} style={{ marginRight: '4px' }} />
              -8%
            </Badge>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              cost reduction
            </span>
          </MetricTrend>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricLabel>Total Reviews</MetricLabel>
            <MetricIcon>
              <FileText size={16} />
            </MetricIcon>
          </MetricHeader>
          <MetricValue>{totalReviews}</MetricValue>
          <MetricSubtext>this month</MetricSubtext>
          <MetricTrend>
            <Badge variant='success' size='sm'>
              <TrendingUp size={10} style={{ marginRight: '4px' }} />
              +23%
            </Badge>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              vs last month
            </span>
          </MetricTrend>
        </MetricCard>
      </MetricsGrid>

      <ConfigCard
        title='Budget Configuration'
        subtitle='Current budget limits and API settings'
        icon={<Settings size={20} />}
      >
        <ConfigGrid>
          <ConfigItem>
            <ConfigItemHeader>
              <ConfigLabel>
                <Calendar size={16} />
                Daily Limit
              </ConfigLabel>
              <ConfigValue variant='default'>
                ${dailyLimit.toFixed(2)}
              </ConfigValue>
            </ConfigItemHeader>
            <ConfigDescription>
              Maximum spending allowed per day
            </ConfigDescription>
          </ConfigItem>
          <ConfigItem>
            <ConfigItemHeader>
              <ConfigLabel>
                <CalendarDays size={16} />
                Monthly Limit
              </ConfigLabel>
              <ConfigValue variant='default'>
                ${monthlyLimit.toFixed(2)}
              </ConfigValue>
            </ConfigItemHeader>
            <ConfigDescription>
              Maximum spending allowed per month
            </ConfigDescription>
          </ConfigItem>
          <ConfigItem>
            <ConfigItemHeader>
              <ConfigLabel>
                <Zap size={16} />
                Max API Calls/Day
              </ConfigLabel>
              <ConfigValue variant='default'>{maxApiCalls}</ConfigValue>
            </ConfigItemHeader>
            <ConfigDescription>Maximum API requests per day</ConfigDescription>
          </ConfigItem>
          <ConfigItem>
            <ConfigItemHeader>
              <ConfigLabel>
                <Cpu size={16} />
                API Mode
              </ConfigLabel>
              <ConfigValue variant='default'>Mock</ConfigValue>
            </ConfigItemHeader>
            <ConfigDescription>Using mock data</ConfigDescription>
          </ConfigItem>
        </ConfigGrid>
        <ConfigActions>
          <Button onClick={() => navigate('/settings')} fullWidth>
            <Settings size={16} style={{ marginRight: '4px' }} />
            Edit Budget Settings
          </Button>
          <Button
            variant='secondary'
            onClick={() => navigate('/metrics')}
            fullWidth
          >
            <ChartColumn size={16} style={{ marginRight: '4px' }} />
            View Detailed Metrics
          </Button>
        </ConfigActions>
      </ConfigCard>

      <NavigationActions>
        <Button variant='secondary' onClick={() => navigate('/')} fullWidth>
          <Home size={16} style={{ marginRight: '4px' }} />
          Back to Dashboard
        </Button>
        <Button onClick={() => navigate('/review')} fullWidth>
          <Plus size={16} style={{ marginRight: '4px' }} />
          New Code Review
        </Button>
      </NavigationActions>
    </PageContainer>
  )
}
