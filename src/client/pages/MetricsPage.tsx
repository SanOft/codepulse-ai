/** @format */

import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Badge, MetricCard } from '../components/ui'
import { useReview } from '../hooks/useReview'
import {
  ChartColumn,
  RefreshCw,
  House,
  TrendingUp,
  DollarSign,
  TrendingDown,
  Zap,
  Cpu,
  Activity,
  TriangleAlert,
  Calendar,
  CalendarDays,
  ChartPie,
  ChartLine,
  ExternalLink,
  List,
  Settings,
  FileText,
} from 'lucide-react'
import { theme } from '../styles/theme'

const MetricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 128px);
  margin: -2rem;
`

const StickyBanner = styled.div`
  position: sticky;
  top: 4rem; /* top-16 */
  z-index: 40;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: hsla(222, 47%, 11%, 0.5); /* bg-background/50 */
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`

const BannerContent = styled.div`
  max-width: 1400px;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
`

const BannerHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary},
    ${({ theme }) => theme.colors.accent}
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
`

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const MainContent = styled.div`
  flex: 1;
  max-width: 1400px;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const SectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
`

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

const BudgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const BudgetCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
`

const BudgetHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const BudgetTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const BudgetSubtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const BudgetAmounts = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const AmountGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const AmountLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`

const AmountValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ProgressLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const ProgressBar = styled.div<{ $percentage: number; $warning?: boolean }>`
  width: 100%;
  height: 0.75rem;
  background-color: hsla(239, 84%, 67%, 0.2); /* bg-primary/20 */
  border-radius: 9999px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ $percentage }) => $percentage}%;
    background-color: ${({ $warning, theme }) =>
      $warning ? theme.colors.warning : theme.colors.primary};
    transition: width 0.3s ease;
  }
`

const RemainingSection = styled.div`
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const RemainingLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`

const RemainingValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.warning};
  margin: 0;
`

const WarningAlert = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: hsla(43, 96%, 56%, 0.1); /* bg-warning/10 */
  color: ${({ theme }) => theme.colors.warning};
  border: 1px solid hsla(43, 96%, 56%, 0.2); /* border-warning/20 */
  font-size: ${({ theme }) => theme.fontSize.xs};
`

const StatGridConteainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

const StatCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`

const StatValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: ${({ theme }) => theme.spacing.sm} 0 0 0;
`

const StatLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const TableContainer = styled.div`
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.sm};
  border-collapse: collapse;
`

const TableHead = styled.thead`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const TableHeader = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSize.sm};

  &:last-child {
    text-align: center;
  }
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.15s ease;

  &:hover {
    background-color: hsla(217, 33%, 17%, 0.3); /* bg-muted/30 */
  }
`

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textPrimary};

  &:last-child {
    text-align: center;
  }
`

const MonoText = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
`

const ButtonContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

const QuickActionCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: transparent;
  transition: all 0.15s ease;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
    border-color: ${({ theme }) => theme.colors.borderHover};
  }
`

const QuickActionIcon = styled.div<{ $color: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: hsla(239, 84%, 67%, 0.1); /* bg-primary/10 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  transition: background-color 0.15s ease;

  ${QuickActionCard}:hover & {
    background-color: hsla(239, 84%, 67%, 0.2); /* bg-primary/20 */
  }
`

const QuickActionTitle = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`

const QuickActionDesc = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const ComponentTitile = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`

const ComponentSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
`

const CardHeaderWithAction = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ComponentTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`
const ComponentSubtitle2 = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
`

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const ChartBars = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  height: 12rem;
  padding: 0 ${({ theme }) => theme.spacing.sm};
`

const ChartBar = styled.div<{ $height: number; $color: string }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 3rem;
`

const Bar = styled.div<{ $height: number; $color: string }>`
  width: 100%;
  height: ${({ $height }) => $height}%;
  min-height: 4px;
  background-color: ${({ $color }) => $color};
  border-radius: ${({ theme }) => theme.borderRadius.md}
    ${({ theme }) => theme.borderRadius.md} 0 0;
  transition: opacity 0.3s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`
const BarWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 10rem;
`

const BarLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`

const ChartLegend = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSize.xs};
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const MutedYext = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`
const LegendColor = styled.div<{ $color: string }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ $color }) => $color};
`

const ChartStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const ChartStat = styled.div`
  text-align: center;
`

const ChartStatLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`

const ChartStatValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`

export const MetricsPage: React.FC = () => {
  const navigate = useNavigate()
  const { metrics } = useReview()

  // Mock data based on HTML
  const totalReviews = metrics?.reviewCount ?? 452
  const totalCost = metrics?.totalCost ?? 15.34
  const averageCost = metrics?.averageCost ?? 0.03
  const cacheHitRate = ((metrics?.cacheHitRate ?? 0.65) * 100).toFixed(1)
  const totalTokens = metrics?.totalTokens ?? 380420
  const dailyApiCalls = 45
  const systemStatus = 'Warning'
  const dailyRemaining = 0.08

  const dailyBudget = {
    used: 0.42,
    limit: 0.5,
    remaining: 0.08,
    percentage: 84.0,
  }

  const monthlyBudget = {
    used: 8.5,
    limit: 10.0,
    remaining: 1.5,
    percentage: 85.0,
  }

  // Cost history data
  const costHistory = [
    { date: 'Nov 28', cost: 0.15, color: theme.colors.success },
    { date: 'Nov 29', cost: 0.48, color: theme.colors.error },
    { date: 'Nov 30', cost: 0.35, color: theme.colors.warning },
    { date: 'Dec 01', cost: 0.12, color: theme.colors.success },
    { date: 'Dec 02', cost: 0.42, color: theme.colors.error },
  ]

  const maxCost = Math.max(...costHistory.map((d) => d.cost))
  const avgCost =
    costHistory.reduce((sum, d) => sum + d.cost, 0) / costHistory.length
  const highestCost = maxCost
  const lowestCost = Math.min(...costHistory.map((d) => d.cost))

  // API call statistics
  const apiStats = {
    totalCalls: 5,
    successRate: 80,
    cacheHitRate: 40,
    totalCost: 0.0146,
  }

  // Recent API calls
  const recentApiCalls = [
    {
      id: 'LOG-005',
      time: '5h ago',
      status: 'Success',
      cost: 0.0012,
      tokens: 800,
      size: '2.1 KB',
      cache: true,
    },
    {
      id: 'LOG-004',
      time: '5h ago',
      status: 'Success',
      cost: 0.0053,
      tokens: 12500,
      size: '18.5 KB',
      cache: false,
    },
    {
      id: 'LOG-003',
      time: '6h ago',
      status: 'Success',
      cost: 0.0001,
      tokens: 150,
      size: '0.4 KB',
      cache: true,
    },
    {
      id: 'LOG-002',
      time: '6h ago',
      status: 'Budget Exceeded',
      cost: 0.0,
      tokens: 0,
      size: '3.5 KB',
      cache: false,
    },
    {
      id: 'LOG-001',
      time: '7h ago',
      status: 'Success',
      cost: 0.008,
      tokens: 15000,
      size: '22.0 KB',
      cache: false,
    },
  ]

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <MetricsContainer>
      <StickyBanner>
        <BannerContent>
          <BannerHeader>
            <TitleSection>
              <ChartColumn size={32} color={theme.colors.primary} />
              <div>
                <Title>Metrics Overview</Title>
                <Subtitle>
                  Real-time performance indicators and cost analytics
                </Subtitle>
              </div>
            </TitleSection>
            <ActionButtons>
              <Button
                variant='secondary'
                size='md'
                onClick={handleRefresh}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                }}
              >
                <RefreshCw size={16} />
                Refresh
              </Button>
              <Button
                variant='primary'
                size='md'
                onClick={() => navigate('/')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                }}
              >
                <House size={16} />
                Dashboard
              </Button>
            </ActionButtons>
          </BannerHeader>
        </BannerContent>
      </StickyBanner>

      <MainContent>
        {/* Key Performance Indicators */}
        <Section>
          <SectionHeader>
            <SectionTitle>
              <TrendingUp size={20} color={theme.colors.primary} />
              Key Performance Indicators
            </SectionTitle>
            <SectionSubtitle>
              Aggregated metrics showing platform efficiency and cost
              effectiveness
            </SectionSubtitle>
          </SectionHeader>
          <MetricsGrid>
            <MetricCard
              label='Total Reviews'
              value={totalReviews}
              subtitle='Code reviews processed'
              icon={<FileText size={16} />}
              trend='up'
              trendValue='12%'
            />
            <MetricCard
              label='Total Cost'
              value={`$${totalCost.toFixed(2)}`}
              subtitle='Cumulative API expenses'
              icon={<DollarSign size={16} />}
              trend='up'
              trendValue='8%'
              variant='warning'
            />
            <MetricCard
              label='Average Cost'
              value={`$${averageCost.toFixed(2)}`}
              subtitle='Per review cost'
              icon={<TrendingDown size={16} />}
              trend='down'
              trendValue='5%'
              variant='success'
            />
            <MetricCard
              label='Cache Hit Rate'
              value={`${cacheHitRate}%`}
              subtitle='Cached vs new reviews'
              icon={<Zap size={16} />}
              trend='up'
              trendValue='15%'
              variant='success'
            />
            <MetricCard
              label='Total Tokens'
              value={totalTokens.toLocaleString()}
              subtitle='API tokens consumed'
              icon={<Cpu size={16} />}
            />
            <MetricCard
              label='Daily API Calls'
              value={dailyApiCalls}
              subtitle='Requests today'
              icon={<Activity size={16} />}
            />
            <MetricCard
              label='System Status'
              value={systemStatus}
              subtitle='Overall platform health'
              icon={<TriangleAlert size={16} />}
              variant='warning'
            />
            <MetricCard
              label='Daily Remaining'
              value={`$${dailyRemaining.toFixed(2)}`}
              subtitle='Budget available today'
              icon={<Calendar size={16} />}
              variant='warning'
            />
          </MetricsGrid>
        </Section>

        {/* Budget Status */}
        <Section>
          <SectionHeader>
            <SectionTitle>
              <ChartPie size={20} color={theme.colors.primary} />
              Budget Status
            </SectionTitle>
            <SectionSubtitle>
              Daily and monthly budget consumption with limit warnings
            </SectionSubtitle>
          </SectionHeader>
          <BudgetGrid>
            <BudgetCard>
              <BudgetHeader>
                <BudgetTitle>
                  <Calendar size={20} color={theme.colors.primary} />
                  Daily Budget
                </BudgetTitle>
                <BudgetSubtitle>Today's spending vs daily limit</BudgetSubtitle>
              </BudgetHeader>
              <BudgetAmounts>
                <AmountGroup>
                  <AmountLabel>Used</AmountLabel>
                  <AmountValue>${dailyBudget.used.toFixed(2)}</AmountValue>
                </AmountGroup>
                <AmountGroup style={{ textAlign: 'right' }}>
                  <AmountLabel>Limit</AmountLabel>
                  <AmountValue>${dailyBudget.limit.toFixed(2)}</AmountValue>
                </AmountGroup>
              </BudgetAmounts>
              <ProgressSection>
                <ProgressHeader>
                  <ProgressLabel>Progress</ProgressLabel>
                  <Badge variant='default' size='sm'>
                    {dailyBudget.percentage.toFixed(1)}%
                  </Badge>
                </ProgressHeader>
                <ProgressBar
                  $percentage={dailyBudget.percentage}
                  $warning={dailyBudget.percentage > 80}
                />
              </ProgressSection>
              <RemainingSection>
                <RemainingLabel>Remaining Today</RemainingLabel>
                <RemainingValue>
                  ${dailyBudget.remaining.toFixed(2)}
                </RemainingValue>
              </RemainingSection>
              {dailyBudget.percentage > 80 && (
                <WarningAlert>
                  <TriangleAlert size={14} />
                  <p>
                    Approaching daily budget limit. Monitor usage carefully.
                  </p>
                </WarningAlert>
              )}
            </BudgetCard>

            <BudgetCard>
              <BudgetHeader>
                <BudgetTitle>
                  <CalendarDays size={20} color={theme.colors.primary} />
                  Monthly Budget
                </BudgetTitle>
                <BudgetSubtitle>
                  This month's spending vs monthly limit
                </BudgetSubtitle>
              </BudgetHeader>
              <BudgetAmounts>
                <AmountGroup>
                  <AmountLabel>Used</AmountLabel>
                  <AmountValue>${monthlyBudget.used.toFixed(2)}</AmountValue>
                </AmountGroup>
                <AmountGroup style={{ textAlign: 'right' }}>
                  <AmountLabel>Limit</AmountLabel>
                  <AmountValue>${monthlyBudget.limit.toFixed(2)}</AmountValue>
                </AmountGroup>
              </BudgetAmounts>
              <ProgressSection>
                <ProgressHeader>
                  <ProgressLabel>Progress</ProgressLabel>
                  <Badge variant='default' size='sm'>
                    {monthlyBudget.percentage.toFixed(1)}%
                  </Badge>
                </ProgressHeader>
                <ProgressBar
                  $percentage={monthlyBudget.percentage}
                  $warning={monthlyBudget.percentage > 80}
                />
              </ProgressSection>
              <RemainingSection>
                <RemainingLabel>Remaining This Month</RemainingLabel>
                <RemainingValue>
                  ${monthlyBudget.remaining.toFixed(2)}
                </RemainingValue>
              </RemainingSection>
              {monthlyBudget.percentage > 80 && (
                <WarningAlert>
                  <TriangleAlert size={14} />
                  <p>
                    Approaching monthly budget limit. Monitor usage carefully.
                  </p>
                </WarningAlert>
              )}
            </BudgetCard>
          </BudgetGrid>
        </Section>

        {/* Cost History */}
        <Section>
          <SectionHeader>
            <SectionTitle>
              <ChartLine size={20} color={theme.colors.primary} />
              Cost History
            </SectionTitle>
            <SectionSubtitle>
              Historical trend of AI review costs over time
            </SectionSubtitle>
          </SectionHeader>
          <Card>
            <CardHeaderWithAction>
              <div>
                <ComponentTitle>Cost History</ComponentTitle>
                <ComponentSubtitle2>
                  Daily cost trend over the last 5 days
                </ComponentSubtitle2>
              </div>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => navigate('/cost-history-chart')}
              >
                <ExternalLink size={14} />
                View Details
              </Button>
            </CardHeaderWithAction>
            <ChartContainer>
              <ChartBars>
                {costHistory.map((item, index) => {
                  const barHeight = (item.cost / maxCost) * 100
                  return (
                    <ChartBar
                      key={index}
                      $height={barHeight}
                      $color={item.color}
                    >
                      <BarWrapper>
                        <Bar
                          $height={barHeight}
                          $color={item.color}
                          title={`${item.date}: $${item.cost.toFixed(4)}`}
                        />
                      </BarWrapper>
                      <BarLabel>{item.date}</BarLabel>
                    </ChartBar>
                  )
                })}
              </ChartBars>
              <ChartLegend>
                <LegendItem>
                  <LegendColor $color={theme.colors.success} />
                  <MutedYext>Below Average</MutedYext>
                </LegendItem>
                <LegendItem>
                  <LegendColor $color={theme.colors.warning} />
                  <MutedYext>Above Average</MutedYext>
                </LegendItem>
                <LegendItem>
                  <LegendColor $color={theme.colors.error} />
                  <MutedYext>High Spike</MutedYext>
                </LegendItem>
              </ChartLegend>
              <ChartStats>
                <ChartStat>
                  <ChartStatLabel>Average</ChartStatLabel>
                  <ChartStatValue>${avgCost.toFixed(4)}</ChartStatValue>
                </ChartStat>
                <ChartStat>
                  <ChartStatLabel>Highest</ChartStatLabel>
                  <ChartStatValue>${highestCost.toFixed(4)}</ChartStatValue>
                </ChartStat>
                <ChartStat>
                  <ChartStatLabel>Lowest</ChartStatLabel>
                  <ChartStatValue>${lowestCost.toFixed(4)}</ChartStatValue>
                </ChartStat>
              </ChartStats>
              <Button
                variant='ghost'
                size='md'
                fullWidth
                onClick={() => navigate('/cost-history-chart')}
              >
                <ChartLine size={16} />
                View Detailed Cost History Chart
              </Button>
            </ChartContainer>
          </Card>
        </Section>

        {/* API Call Statistics */}
        <Section>
          <SectionHeader>
            <SectionTitle>
              <Activity size={20} color={theme.colors.primary} />
              API Call Statistics
            </SectionTitle>
            <SectionSubtitle>
              Distribution and performance of API requests
            </SectionSubtitle>
          </SectionHeader>
          <StatGridConteainer>
            <StatsGrid>
              <StatCard>
                <StatLabel>Total Calls</StatLabel>
                <StatValue>{apiStats.totalCalls}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Success Rate</StatLabel>
                <StatValue style={{ color: theme.colors.success }}>
                  {apiStats.successRate}%
                </StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Cache Hit Rate</StatLabel>
                <StatValue style={{ color: theme.colors.accent }}>
                  {apiStats.cacheHitRate}%
                </StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Total Cost</StatLabel>
                <StatValue>${apiStats.totalCost.toFixed(4)}</StatValue>
              </StatCard>
            </StatsGrid>

            <Card>
              <CardHeaderWithAction>
                <div>
                  <ComponentTitile>Recent API Calls</ComponentTitile>
                  <ComponentSubtitle>
                    Last 5 API requests with details
                  </ComponentSubtitle>
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => navigate('/api-call-log')}
                >
                  <ExternalLink size={14} />
                  View All
                </Button>
              </CardHeaderWithAction>
              <TableContainer>
                <Table>
                  <TableHead>
                    <tr>
                      <TableHeader>ID</TableHeader>
                      <TableHeader>Time</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader style={{ textAlign: 'right' }}>
                        Cost
                      </TableHeader>
                      <TableHeader style={{ textAlign: 'right' }}>
                        Tokens
                      </TableHeader>
                      <TableHeader style={{ textAlign: 'right' }}>
                        Size
                      </TableHeader>
                      <TableHeader style={{ textAlign: 'center' }}>
                        Cache
                      </TableHeader>
                    </tr>
                  </TableHead>
                  <TableBody>
                    {recentApiCalls.map((call) => (
                      <TableRow key={call.id}>
                        <TableCell>
                          <MonoText>{call.id}</MonoText>
                        </TableCell>
                        <TableCell style={{ color: theme.colors.textMuted }}>
                          {call.time}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              call.status === 'Success'
                                ? 'success'
                                : call.status === 'Budget Exceeded'
                                ? 'warning'
                                : 'default'
                            }
                            size='sm'
                          >
                            {call.status}
                          </Badge>
                        </TableCell>
                        <TableCell style={{ textAlign: 'right' }}>
                          <MonoText>${call.cost.toFixed(4)}</MonoText>
                        </TableCell>
                        <TableCell style={{ textAlign: 'right' }}>
                          <MonoText>{call.tokens.toLocaleString()}</MonoText>
                        </TableCell>
                        <TableCell
                          style={{
                            textAlign: 'right',
                            color: theme.colors.textMuted,
                          }}
                        >
                          {call.size}
                        </TableCell>
                        <TableCell style={{ textAlign: 'center' }}>
                          {call.cache ? (
                            <Badge variant='info' size='sm'>
                              <Zap size={10} style={{ marginRight: '4px' }} />
                              Yes
                            </Badge>
                          ) : (
                            <MutedYext>No</MutedYext>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <ButtonContainer>
                <Button
                  variant='ghost'
                  size='md'
                  fullWidth
                  onClick={() => navigate('/api-call-log')}
                >
                  <List size={16} />
                  View Complete API Call Log
                </Button>
              </ButtonContainer>
            </Card>
          </StatGridConteainer>
        </Section>

        {/* Quick Actions */}
        <Section style={{ paddingBottom: theme.spacing.xl }}>
          <SectionHeader>
            <SectionTitle>
              <Zap size={20} color={theme.colors.primary} />
              Quick Actions
            </SectionTitle>
            <SectionSubtitle>
              Navigate to related pages and settings
            </SectionSubtitle>
          </SectionHeader>
          <QuickActionsGrid>
            <QuickActionCard onClick={() => navigate('/cost-history-chart')}>
              <QuickActionIcon $color={theme.colors.primary}>
                <ChartLine size={20} />
              </QuickActionIcon>
              <div>
                <QuickActionTitle>View Cost History</QuickActionTitle>
                <QuickActionDesc>
                  Detailed historical trend of AI review costs
                </QuickActionDesc>
              </div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/api-call-log')}>
              <QuickActionIcon $color={theme.colors.secondary}>
                <List size={20} />
              </QuickActionIcon>
              <div>
                <QuickActionTitle>View API Call Log</QuickActionTitle>
                <QuickActionDesc>
                  Chronological log of all API requests
                </QuickActionDesc>
              </div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/settings')}>
              <QuickActionIcon $color={theme.colors.accent}>
                <Settings size={20} />
              </QuickActionIcon>
              <div>
                <QuickActionTitle>Budget Settings</QuickActionTitle>
                <QuickActionDesc>
                  Configure daily and monthly cost limits
                </QuickActionDesc>
              </div>
            </QuickActionCard>
            <QuickActionCard onClick={() => navigate('/')}>
              <QuickActionIcon $color={theme.colors.success}>
                <House size={20} />
              </QuickActionIcon>
              <div>
                <QuickActionTitle>Back to Dashboard</QuickActionTitle>
                <QuickActionDesc>
                  Return to main code review dashboard
                </QuickActionDesc>
              </div>
            </QuickActionCard>
          </QuickActionsGrid>
        </Section>
      </MainContent>
    </MetricsContainer>
  )
}
