/** @format */

import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Badge } from '../components/ui'
import { useReview } from '../hooks/useReview'
import {
  Code2,
  TriangleAlert,
  Activity,
  Zap,
  Plus,
  FileText,
  DollarSign,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  CalendarDays,
  Play,
  FileCode,
  Database,
  CircleCheck,
  CircleAlert,
  ArrowRight,
  Server,
  Lightbulb,
} from 'lucide-react'
import { theme } from '../styles/theme'

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
`

const BannerSection = styled.section`
  background-image: linear-gradient(
    to bottom,
    rgb(15, 23, 41),
    rgb(15, 23, 41),
    rgba(15, 23, 41, 0.5)
  );
  background-repeat: repeat;
  background-position: left top;
  background-attachment: scroll;
  background-size: auto;
  border-width: 0px 0px 1px;
  border-style: solid;
  border-color: rgb(29, 40, 58);
  padding: ${({ theme }) => theme.spacing.xxxxl}
    ${({ theme }) => theme.spacing.xl};
  margin: -${({ theme }) => theme.spacing.xl} -${({ theme }) =>
      theme.spacing.xl} -${({ theme }) => theme.spacing.xl} -${({ theme }) =>
      theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl}
      ${({ theme }) => theme.spacing.md};
    margin: -${({ theme }) => theme.spacing.md} -${({ theme }) =>
        theme.spacing.md}
      ${({ theme }) => theme.spacing.md} -${({ theme }) => theme.spacing.md};
  }
`

const BannerContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`
const LogoIcon = styled.div`
  /* From HTML: relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent p-[2px] group-hover:scale-105 transition-transform */
  position: relative;
  width: 3rem; /* w-10 */
  height: 3rem; /* h-10 */
  border-radius: 0.5rem; /* rounded-lg */
  background: linear-gradient(
    to bottom right,
    hsl(239, 84%, 67%),
    /* from-primary */ hsl(262, 83%, 58%),
    /* via-secondary */ hsl(189, 94%, 43%) /* to-accent */
  );
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
`
const LogoIconInner = styled.div`
  /* Inner div: w-full h-full rounded-lg bg-background */
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background-color: hsl(222, 47%, 11%); /* bg-background */
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(239, 84%, 67%); /* text-primary */
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  /* gradient-text from tailwind-build.css: primary -> secondary -> accent */
  background-image: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary},
    ${({ theme }) => theme.colors.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textMuted};
  // margin: ${({ theme }) => theme.spacing.sm} 0
  //   ${({ theme }) => theme.spacing.md} 0;
`

const StatusBanner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
`

const StatusBadge = styled.div`
  /* From design: purple background badge with white icon and text */
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.2rem 0.75rem;
  border-radius: calc(0.5rem - 2px); /* rounded-md */
  background-color: hsl(262, 83%, 58%); /* bg-primary - purple */
  color: hsl(210, 40%, 98%); /* text-primary-foreground - white */
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  border: none;
  margin-bottom: 1.8rem;
`

const StatusBadgeText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textPrimary};
`
const StatusInfo = styled.div`
  /* From design: status info with icon and text */
  display: flex;
  align-items: center;
  gap: 0.5rem; /* gap-2 */
  font-size: 0.875rem; /* text-sm */
  color: hsl(215, 20%, 65%); /* text-muted-foreground */
  margin-bottom: 1.8rem;
`

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ViewAllLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`
const QuickActionsSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxxl}
    ${({ theme }) => theme.spacing.xl};
  margin: -${({ theme }) => theme.spacing.xl} -${({ theme }) =>
      theme.spacing.xl};
`

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`
const ActionIconWrapper = styled.div<{ $primary?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: hsl(var(--primary) / 0.1);
  border: 1px solid
    ${({ $primary, theme }) =>
      $primary ? theme.colors.primary : theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $primary, theme }) =>
    $primary ? theme.colors.primary : theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  transition: all ${({ theme }) => theme.transitions.fast};
`
const QuickActionCard = styled.div<{ $primary?: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid
    ${({ $primary, theme }) =>
      $primary ? theme.colors.primary : theme.colors.border};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &:hover ${ActionIconWrapper} {
    color: ${({ $primary, theme }) =>
      $primary ? theme.colors.primary : theme.colors.textMuted};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const ActionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const TextContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const ActionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const MetricCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
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
  font-size: ${({ theme }) => theme.fontSize.xs};
`

const BudgetSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const BudgetCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

const BudgetCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
`

const BudgetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const BudgetTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const BudgetPercentage = styled(Badge)`
  font-size: ${({ theme }) => theme.fontSize.md};
`

const BudgetAmount = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: rgba(99, 102, 241, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ProgressFill = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.warning},
    ${({ theme }) => theme.colors.warningLight}
  );
  transition: width 0.3s ease;
`

const BudgetDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const WarningBox = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const BudgetConfigSection = styled.div`
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const BudgetConfigLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`

const BudgetConfigBadges = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

const BudgetApiCalls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const BudgetApiCallsValue = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`

const HealthContent = styled.div`
  display: flex;
  flex-direction: column;
`

const HealthButtonWrapper = styled.div`
  margin-top: 12px;
`

const StepsWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const TrendText = styled.span`
  font-size: 12px;
  color: #94a3b8;
`

const WarningIcon = styled(TriangleAlert)`
  flex-shrink: 0;
  margin-top: 2px;
  color: #f59e0b;
`

const HealthLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const IconWithMargin = styled.span`
  margin-right: 4px;
`

const WarningText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.warning};
  margin: 0;
  line-height: 1.5;
`

const ActivitySection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    background: ${({ theme }) => theme.colors.backgroundHover};
  }
`

const ActivityLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
  min-width: 0;
`

const ActivityIcon = styled.div<{ $success?: boolean }>`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: ${({ $success, theme }) =>
    $success ? theme.colors.success : theme.colors.error};
`

const ActivityInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`

const ActivityId = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

const ActivityMeta = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`

const ActivityRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
  margin-left: ${({ theme }) => theme.spacing.md};
`

const ActivityCost = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const ActivityStatus = styled.div<{ $success?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ $success, theme }) =>
    $success ? theme.colors.success : theme.colors.error};
`

const ViewAllActivityLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md} 0;
  margin-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const HealthMetric = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
`

const StepsList = styled.ol`
  list-style: decimal;
  padding-left: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const StepItem = styled.li`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  padding-left: ${({ theme }) => theme.spacing.sm};
`

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const { metrics } = useReview()

  const totalCost = metrics?.totalCost ?? 0
  const dailyLimit = 0.5
  const monthlyLimit = 10.0
  const dailyCost = 0.42
  const monthlyCost = 8.5
  const dailyPercentage = Math.min((dailyCost / dailyLimit) * 100, 100)
  const monthlyPercentage = Math.min((monthlyCost / monthlyLimit) * 100, 100)
  const totalTokens = 380420
  const dailyApiCalls = 45

  return (
    <DashboardContainer>
      <BannerSection>
        <BannerContent>
          <TitleSection>
            <LogoIcon>
              <LogoIconInner>
                <Code2 size={24} />
              </LogoIconInner>
            </LogoIcon>

            <div>
              <Title>CodePulse AI Dashboard</Title>
              <Subtitle>
                AI-powered code review platform with intelligent budget
                management
              </Subtitle>
            </div>
          </TitleSection>
          <StatusBanner>
            <StatusBadge>
              <TriangleAlert size={14} color='white' />
              <StatusBadgeText>System Status: Warning</StatusBadgeText>
            </StatusBadge>
            <StatusInfo>
              <Activity size={14} />
              <span>{metrics?.reviewCount ?? 452} reviews processed</span>
            </StatusInfo>
            <StatusInfo>
              <Zap size={14} />
              <span>
                {((metrics?.cacheHitRate ?? 0.65) * 100).toFixed(1)}% cache hit
                rate
              </span>
            </StatusInfo>
          </StatusBanner>
        </BannerContent>
      </BannerSection>

      <QuickActionsSection>
        <SectionTitle>Quick Actions</SectionTitle>
        <QuickActionsGrid>
          <QuickActionCard $primary onClick={() => navigate('/review')}>
            <ActionIconWrapper $primary>
              <Plus size={20} color={theme.colors.textPrimary} />
            </ActionIconWrapper>
            <TextContentWrapper>
              <ActionTitle>New Code Review</ActionTitle>
              <ActionSubtitle>Submit code diff for AI analysis</ActionSubtitle>
            </TextContentWrapper>
          </QuickActionCard>
          <QuickActionCard onClick={() => navigate('/results')}>
            <ActionIconWrapper>
              <FileText size={20} />
            </ActionIconWrapper>
            <TextContentWrapper>
              <ActionTitle>View Results</ActionTitle>
              <ActionSubtitle>Check recent review results</ActionSubtitle>
            </TextContentWrapper>
          </QuickActionCard>
          <QuickActionCard onClick={() => navigate('/budget')}>
            <ActionIconWrapper>
              <DollarSign size={20} />
            </ActionIconWrapper>
            <TextContentWrapper>
              <ActionTitle>Budget Dashboard</ActionTitle>
              <ActionSubtitle>Monitor spending and limits</ActionSubtitle>
            </TextContentWrapper>
          </QuickActionCard>
          <QuickActionCard onClick={() => navigate('/metrics')}>
            <ActionIconWrapper>
              <BarChart3 size={20} />
            </ActionIconWrapper>
            <TextContentWrapper>
              <ActionTitle>Metrics & Analytics</ActionTitle>
              <ActionSubtitle>View detailed performance data</ActionSubtitle>
            </TextContentWrapper>
          </QuickActionCard>
        </QuickActionsGrid>
      </QuickActionsSection>

      <div>
        <SectionHeader>
          <SectionTitle>Key Metrics</SectionTitle>
          <ViewAllLink onClick={() => navigate('/metrics')}>
            View All Metrics
            <ArrowRight size={14} />
          </ViewAllLink>
        </SectionHeader>
        <MetricsGrid>
          <MetricCard>
            <MetricHeader>
              <MetricLabel>Total Reviews</MetricLabel>
              <MetricIcon>
                <FileCode size={16} />
              </MetricIcon>
            </MetricHeader>
            <MetricValue>{metrics?.reviewCount ?? 452}</MetricValue>
            <MetricSubtext>Code reviews processed</MetricSubtext>
            <MetricTrend>
              <Badge variant='success' size='sm'>
                <IconWithMargin>
                  <TrendingUp size={10} />
                </IconWithMargin>
                +12%
              </Badge>
              <TrendText>vs last week</TrendText>
            </MetricTrend>
          </MetricCard>

          <MetricCard>
            <MetricHeader>
              <MetricLabel>Total Cost</MetricLabel>
              <MetricIcon>
                <DollarSign size={16} />
              </MetricIcon>
            </MetricHeader>
            <MetricValue>${totalCost.toFixed(2)}</MetricValue>
            <MetricSubtext>API usage cost</MetricSubtext>
            <MetricTrend>
              <Badge variant='success' size='sm'>
                <IconWithMargin>
                  <TrendingUp size={10} />
                </IconWithMargin>
                +5%
              </Badge>
              <TrendText>vs last month</TrendText>
            </MetricTrend>
          </MetricCard>

          <MetricCard>
            <MetricHeader>
              <MetricLabel>Average Cost</MetricLabel>
              <MetricIcon>
                <TrendingDown size={16} />
              </MetricIcon>
            </MetricHeader>
            <MetricValue>
              ${(metrics?.averageCost ?? 0.0339).toFixed(4)}
            </MetricValue>
            <MetricSubtext>Per review</MetricSubtext>
            <MetricTrend>
              <Badge variant='error' size='sm'>
                <IconWithMargin>
                  <TrendingDown size={10} />
                </IconWithMargin>
                -8%
              </Badge>
              <TrendText>cost reduction</TrendText>
            </MetricTrend>
          </MetricCard>

          <MetricCard>
            <MetricHeader>
              <MetricLabel>Cache Hit Rate</MetricLabel>
              <MetricIcon>
                <Zap size={16} />
              </MetricIcon>
            </MetricHeader>
            <MetricValue>
              {((metrics?.cacheHitRate ?? 0.65) * 100).toFixed(1)}%
            </MetricValue>
            <MetricSubtext>Cached reviews</MetricSubtext>
            <MetricTrend>
              <Badge variant='success' size='sm'>
                <IconWithMargin>
                  <TrendingUp size={10} />
                </IconWithMargin>
                +3%
              </Badge>
              <TrendText>improvement</TrendText>
            </MetricTrend>
          </MetricCard>

          <MetricCard>
            <MetricHeader>
              <MetricLabel>Total Tokens Used</MetricLabel>
              <MetricIcon>
                <Zap size={16} />
              </MetricIcon>
            </MetricHeader>
            <MetricValue>{totalTokens.toLocaleString()}</MetricValue>
            <MetricSubtext>API tokens consumed</MetricSubtext>
          </MetricCard>

          <MetricCard>
            <MetricHeader>
              <MetricLabel>Daily API Calls</MetricLabel>
              <MetricIcon>
                <Activity size={16} />
              </MetricIcon>
            </MetricHeader>
            <MetricValue>{dailyApiCalls}</MetricValue>
            <MetricSubtext>Today's review count</MetricSubtext>
          </MetricCard>

          <MetricCard>
            <MetricHeader>
              <MetricLabel>System Status</MetricLabel>
              <MetricIcon>
                <TriangleAlert size={16} />
              </MetricIcon>
            </MetricHeader>
            <MetricValue>Warning</MetricValue>
            <MetricSubtext>Monitor budget usage</MetricSubtext>
          </MetricCard>
        </MetricsGrid>
      </div>

      <BudgetSection>
        <SectionTitle>Budget Status</SectionTitle>
        <BudgetCards>
          <BudgetCard>
            <BudgetHeader>
              <BudgetTitle>
                <Calendar size={20} />
                Daily Budget
              </BudgetTitle>
              <BudgetPercentage variant='default'>
                {dailyPercentage.toFixed(1)}%
              </BudgetPercentage>
            </BudgetHeader>
            <BudgetAmount>
              {dailyCost.toFixed(2)} / {dailyLimit.toFixed(2)} USD
            </BudgetAmount>
            <ProgressBar>
              <ProgressFill $percentage={dailyPercentage} />
            </ProgressBar>
            <BudgetDetails>
              <span>Used: ${dailyCost.toFixed(2)}</span>
              <span>Remaining: ${(dailyLimit - dailyCost).toFixed(2)}</span>
            </BudgetDetails>
            <WarningBox>
              <WarningIcon size={14} />
              <WarningText>
                Approaching daily budget limit. Monitor usage carefully.
              </WarningText>
            </WarningBox>
            <BudgetConfigSection>
              <BudgetConfigLabel>Daily API Calls</BudgetConfigLabel>
              <BudgetApiCalls>
                <BudgetApiCallsValue>{dailyApiCalls} / 50</BudgetApiCallsValue>
                <Badge variant='default' size='sm'>
                  90%
                </Badge>
              </BudgetApiCalls>
            </BudgetConfigSection>
          </BudgetCard>

          <BudgetCard>
            <BudgetHeader>
              <BudgetTitle>
                <CalendarDays size={20} />
                Monthly Budget
              </BudgetTitle>
              <BudgetPercentage variant='default'>
                {monthlyPercentage.toFixed(1)}%
              </BudgetPercentage>
            </BudgetHeader>
            <BudgetAmount>
              {monthlyCost.toFixed(2)} / {monthlyLimit.toFixed(2)} USD
            </BudgetAmount>
            <ProgressBar>
              <ProgressFill $percentage={monthlyPercentage} />
            </ProgressBar>
            <BudgetDetails>
              <span>Used: ${monthlyCost.toFixed(2)}</span>
              <span>Remaining: ${(monthlyLimit - monthlyCost).toFixed(2)}</span>
            </BudgetDetails>
            <WarningBox>
              <WarningIcon size={14} />
              <WarningText>
                Approaching monthly budget limit. Consider adjusting your plan.
              </WarningText>
            </WarningBox>
            <BudgetConfigSection>
              <BudgetConfigLabel>Budget Configuration</BudgetConfigLabel>
              <BudgetConfigBadges>
                <Badge variant='default' size='sm'>
                  <IconWithMargin>
                    <Zap size={10} />
                  </IconWithMargin>
                  Mock Mode
                </Badge>
                <Badge variant='default' size='sm'>
                  <IconWithMargin>
                    <TriangleAlert size={10} />
                  </IconWithMargin>
                  Warnings Enabled
                </Badge>
              </BudgetConfigBadges>
            </BudgetConfigSection>
          </BudgetCard>
        </BudgetCards>
      </BudgetSection>

      <ActivitySection>
        <SectionTitle>Recent Activity</SectionTitle>
        <Card
          title='Latest API Calls'
          subtitle='Recent code review submissions and their results'
        >
          <ActivityList>
            {[
              {
                id: 'LOG-005',
                size: '2.1 KB',
                cached: true,
                cost: 0.0012,
                success: true,
                time: '5h ago',
                tokens: 800,
              },
              {
                id: 'LOG-004',
                size: '18.5 KB',
                cached: false,
                cost: 0.0053,
                success: true,
                time: '5h ago',
                tokens: 12500,
              },
              {
                id: 'LOG-003',
                size: '0.4 KB',
                cached: true,
                cost: 0.0001,
                success: true,
                time: '6h ago',
                tokens: 150,
              },
              {
                id: 'LOG-002',
                size: '3.5 KB',
                cached: false,
                cost: 0.0,
                success: false,
                time: '6h ago',
                tokens: 0,
              },
              {
                id: 'LOG-001',
                size: '22.0 KB',
                cached: false,
                cost: 0.008,
                success: true,
                time: '7h ago',
                tokens: 15000,
              },
            ].map((activity) => (
              <ActivityItem key={activity.id}>
                <ActivityLeft>
                  <ActivityIcon $success={activity.success}>
                    {activity.success ? (
                      <CircleCheck size={18} />
                    ) : (
                      <CircleAlert size={18} />
                    )}
                  </ActivityIcon>
                  <ActivityInfo>
                    <ActivityId>
                      {activity.id}
                      <Badge variant='default' size='sm'>
                        {activity.size}
                      </Badge>
                      {activity.cached && (
                        <Badge variant='info' size='sm'>
                          <IconWithMargin>
                            <Zap size={10} />
                          </IconWithMargin>
                          Cached
                        </Badge>
                      )}
                    </ActivityId>
                    <ActivityMeta>
                      {activity.time} • {activity.tokens.toLocaleString()}{' '}
                      tokens
                    </ActivityMeta>
                  </ActivityInfo>
                </ActivityLeft>
                <ActivityRight>
                  <ActivityCost>${activity.cost.toFixed(4)}</ActivityCost>
                  <ActivityStatus $success={activity.success}>
                    {activity.success ? 'Success' : 'Budget Exceeded'}
                  </ActivityStatus>
                </ActivityRight>
              </ActivityItem>
            ))}
          </ActivityList>
          <ViewAllActivityLink onClick={() => navigate('/metrics')}>
            View complete activity log
            <ArrowRight size={14} />
          </ViewAllActivityLink>
        </Card>
      </ActivitySection>

      <BottomGrid>
        <Card
          title={`API Health`}
          icon={<Server size={20} color='hsl(var(--primary))' />}
          subtitle='Real-time system status and performance metrics'
        >
          <HealthContent>
            <HealthMetric>
              <HealthLabel>Response Time</HealthLabel>
              <Badge variant='default' size='sm'>
                <IconWithMargin>
                  <Zap size={10} />
                </IconWithMargin>
                245ms
              </Badge>
            </HealthMetric>
            <HealthMetric>
              <HealthLabel>Uptime</HealthLabel>
              <Badge variant='default' size='sm'>
                <IconWithMargin>
                  <CircleCheck size={10} />
                </IconWithMargin>
                99.9%
              </Badge>
            </HealthMetric>
            <HealthMetric>
              <HealthLabel>Cache Status</HealthLabel>
              <Badge variant='success' size='sm'>
                <IconWithMargin>
                  <Database size={10} />
                </IconWithMargin>
                Active
              </Badge>
            </HealthMetric>
            <HealthButtonWrapper>
              <Button
                variant='secondary'
                fullWidth
                onClick={() => navigate('/metrics')}
              >
                <IconWithMargin>
                  <BarChart3 size={14} />
                </IconWithMargin>
                View Detailed Metrics
              </Button>
            </HealthButtonWrapper>
          </HealthContent>
        </Card>

        <Card
          title='Getting Started'
          subtitle='Quick guide to start using CodePulse AI'
          icon={<Lightbulb size={20} color='hsl(var(--accent))' />}
        >
          <StepsWrapper>
            <StepsList>
              <StepItem>Paste your code diff in the review form</StepItem>
              <StepItem>AI analyzes code for issues and improvements</StepItem>
              <StepItem>Review results with severity-coded issues</StepItem>
              <StepItem>Track costs and budget usage in real-time</StepItem>
            </StepsList>
          </StepsWrapper>
          <Button fullWidth onClick={() => navigate('/review')}>
            <IconWithMargin>
              <Play size={14} />
            </IconWithMargin>
            Start Your First Review
          </Button>
        </Card>
      </BottomGrid>
    </DashboardContainer>
  )
}
