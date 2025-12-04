import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from '../components/ui';
import { useReviewContext } from '../context/ReviewContext';
import {
  Home,
  CheckCircle2,
  Plus,
  Share2,
  FileText,
  AlertCircle,
  BarChart3,
  ChevronRight,
  CircleAlert,
  TriangleAlert,
  Info,
  DollarSign,
  Lightbulb,
  BookOpen,
  Code,
  ArrowRight,
} from 'lucide-react';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const BreadcrumbBar = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => `${theme.colors.backgroundCard}80`};
  backdrop-filter: blur(10px);
  position: sticky;
  top: 64px;
  z-index: 40;
`;

const BreadcrumbContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const BreadcrumbLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BreadcrumbSeparator = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HeaderLeft = styled.div`
  flex: 1;
`;

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ReviewId = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StatusIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: 9999px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border: 1px solid ${({ theme }) => `${theme.colors.success}33`};
  background: ${({ theme }) => `${theme.colors.success}1a`};
  color: ${({ theme }) => theme.colors.success};
`;

const CompletionDate = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const TabsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  background: ${({ theme }) => theme.colors.muted};
  padding: 3px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  height: 36px;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, auto);
    width: auto;
  }
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.background : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.textPrimary : theme.colors.textMuted};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  height: calc(100% - 1px);
  flex: 1;

  @media (min-width: 1024px) {
    flex: none;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const TabBadge = styled.span`
  background: ${({ theme }) => `${theme.colors.primary}33`};
  color: ${({ theme }) => theme.colors.primary};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin-left: ${({ theme }) => theme.spacing.xs};
`;

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SummaryCard = styled(Card)`
  border-color: ${({ theme }) => `${theme.colors.primary}33`};
  background: ${({ theme }) => `${theme.colors.primary}0d`};
  backdrop-filter: blur(12px);
`;

const SummaryText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.625;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const IssueStats = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const StatLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const StatValue = styled.p<{ $color?: string }>`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ $color, theme }) => $color || theme.colors.textPrimary};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CostCard = styled(Card)``;

const CostItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => `${theme.colors.muted}80`};
  border: 1px solid ${({ theme }) => `${theme.colors.border}80`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CostLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const CostValue = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
`;

const CostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
`;

const CostSubItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => `${theme.colors.muted}80`};
  border: 1px solid ${({ theme }) => `${theme.colors.border}80`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const CostSubLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const CostSubValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const NextStepsCard = styled(Card)`
  background: ${({ theme }) => theme.colors.backgroundCard};
  backdrop-filter: blur(12px);
`;

const NextStepsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const NextStepItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
`;

const NextStepIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
`;

const NextStepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const NextStepTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

const NextStepDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;

const NavigationSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const NavigationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const NavCard = styled.button`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const NavCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const NavCardDescription = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const HelpSection = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => `${theme.colors.muted}80`};
  border: 1px solid ${({ theme }) => `${theme.colors.border}80`};
`;

const HelpText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const HelpActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

type TabType = 'summary' | 'issues' | 'metrics';

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { result } = useReviewContext();
  const [activeTab, setActiveTab] = useState<TabType>('summary');

  if (!result) {
    return (
      <PageContainer>
        <ContentContainer>
          <Card>
            <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
              <FileText size={64} style={{ margin: '0 auto 16px', color: '#94a3b8' }} />
              <h3 style={{ marginBottom: '8px' }}>No Results Yet</h3>
              <p>Review history will appear here after you submit code for analysis</p>
            </div>
          </Card>
        </ContentContainer>
      </PageContainer>
    );
  }

  const criticalCount = result.issues.filter((i) => i.severity === 'critical').length;
  const highCount = result.issues.filter((i) => i.severity === 'high').length;
  const totalIssues = result.issues.length;

  const reviewId = `REV-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-001`;
  const completionDate = new Date().toLocaleString();

  return (
    <PageContainer>
      <BreadcrumbBar>
        <BreadcrumbContent>
          <Breadcrumb>
            <BreadcrumbLink onClick={() => navigate('/')}>
              <Home size={14} />
              Dashboard
            </BreadcrumbLink>
            <BreadcrumbSeparator>
              <ChevronRight size={14} />
            </BreadcrumbSeparator>
            <BreadcrumbLink onClick={() => navigate('/review')}>Submit Review</BreadcrumbLink>
            <BreadcrumbSeparator>
              <ChevronRight size={14} />
            </BreadcrumbSeparator>
            <span style={{ color: '#6366f1', fontWeight: 500 }}>Review Results</span>
          </Breadcrumb>
        </BreadcrumbContent>
      </BreadcrumbBar>

      <ContentContainer>
        <PageHeader>
          <HeaderLeft>
            <PageTitle>Code Review Results</PageTitle>
            <ReviewId>
              <CheckCircle2 size={16} style={{ color: '#10b981' }} />
              Review ID: {reviewId}
            </ReviewId>
          </HeaderLeft>
          <HeaderActions>
            <Button variant="secondary" onClick={() => navigate('/review')}>
              <Plus size={16} style={{ marginRight: '4px' }} />
              New Review
            </Button>
            <Button onClick={() => {}}>
              <Share2 size={16} style={{ marginRight: '4px' }} />
              Share Results
            </Button>
          </HeaderActions>
        </PageHeader>

        <StatusSection>
          <StatusIndicator>
            <CheckCircle2 size={14} />
            Review Complete
          </StatusIndicator>
          <CompletionDate>Completed {completionDate}</CompletionDate>
        </StatusSection>

        <TabsContainer>
          <TabsList>
            <Tab $active={activeTab === 'summary'} onClick={() => setActiveTab('summary')}>
              <FileText size={14} />
              <span style={{ display: window.innerWidth >= 640 ? 'inline' : 'none' }}>Summary</span>
            </Tab>
            <Tab $active={activeTab === 'issues'} onClick={() => setActiveTab('issues')}>
              <AlertCircle size={14} />
              <span style={{ display: window.innerWidth >= 640 ? 'inline' : 'none' }}>Issues</span>
              {totalIssues > 0 && <TabBadge>{totalIssues}</TabBadge>}
            </Tab>
            <Tab $active={activeTab === 'metrics'} onClick={() => setActiveTab('metrics')}>
              <BarChart3 size={14} />
              <span style={{ display: window.innerWidth >= 640 ? 'inline' : 'none' }}>Metrics</span>
            </Tab>
          </TabsList>

          {activeTab === 'summary' && (
            <TabContent>
              <SummaryCard
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={20} style={{ color: '#6366f1' }} />
                    AI Analysis Summary
                  </div>
                }
                subtitle="Comprehensive code review analysis powered by Claude AI"
              >
                <SummaryText>{result.summary}</SummaryText>
                <IssueStats>
                  <StatItem>
                    <StatLabel>
                      <CircleAlert size={12} />
                      Critical Issues
                    </StatLabel>
                    <StatValue $color="#ef4444">{criticalCount}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>
                      <TriangleAlert size={12} />
                      High Priority
                    </StatLabel>
                    <StatValue $color="#f59e0b">{highCount}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>
                      <Info size={12} />
                      Total Issues
                    </StatLabel>
                    <StatValue $color="#6366f1">{totalIssues}</StatValue>
                  </StatItem>
                </IssueStats>
              </SummaryCard>

              <MetricsGrid>
                <CostCard
                  title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <DollarSign size={20} style={{ color: '#06b6d4' }} />
                      Cost & Usage Metrics
                    </div>
                  }
                  subtitle="API consumption and cost breakdown for this review"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <CostItem>
                      <CostLabel>
                        <DollarSign size={14} />
                        Total Cost
                      </CostLabel>
                      <CostValue>${result.cost.toFixed(4)}</CostValue>
                    </CostItem>
                    <CostGrid>
                      <CostSubItem>
                        <CostSubLabel>Tokens Used</CostSubLabel>
                        <CostSubValue>
                          {(result.tokensUsed.input + result.tokensUsed.output).toLocaleString()}
                        </CostSubValue>
                      </CostSubItem>
                      <CostSubItem>
                        <CostSubLabel>Duration</CostSubLabel>
                        <CostSubValue>{(result.duration / 1000).toFixed(2)}s</CostSubValue>
                      </CostSubItem>
                    </CostGrid>
                  </div>
                </CostCard>

                <NextStepsCard>
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Lightbulb size={20} style={{ color: '#06b6d4' }} />
                      Next Steps
                    </h3>
                  </div>
                  <NextStepsList>
                    <NextStepItem>
                      <NextStepIcon style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
                        <CheckCircle2 size={14} />
                      </NextStepIcon>
                      <NextStepContent>
                        <NextStepTitle>Review Issues</NextStepTitle>
                        <NextStepDescription>Check the Issues tab for detailed findings</NextStepDescription>
                      </NextStepContent>
                    </NextStepItem>
                    <NextStepItem>
                      <NextStepIcon style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#6366f1' }}>
                        <BookOpen size={14} />
                      </NextStepIcon>
                      <NextStepContent>
                        <NextStepTitle>View Recommendations</NextStepTitle>
                        <NextStepDescription>Get best practices and improvement suggestions</NextStepDescription>
                      </NextStepContent>
                    </NextStepItem>
                    <NextStepItem>
                      <NextStepIcon style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' }}>
                        <Code size={14} />
                      </NextStepIcon>
                      <NextStepContent>
                        <NextStepTitle>Apply Fixes</NextStepTitle>
                        <NextStepDescription>Implement suggested changes in your codebase</NextStepDescription>
                      </NextStepContent>
                    </NextStepItem>
                  </NextStepsList>
                  <Button fullWidth style={{ marginTop: '16px' }} onClick={() => navigate('/recommendations')}>
                    <ArrowRight size={16} style={{ marginRight: '4px' }} />
                    View Recommendations
                  </Button>
                </NextStepsCard>
              </MetricsGrid>
            </TabContent>
          )}

          {activeTab === 'issues' && (
            <TabContent>
              <Card
                title={`Issues Found (${totalIssues})`}
                subtitle="Detailed list of code issues and recommendations"
              >
                {result.issues.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {result.issues.map((issue, index) => (
                      <div
                        key={index}
                        onClick={() => navigate(`/issue/${index + 1}`)}
                        style={{
                          padding: '16px',
                          background: '#1e293b',
                          border: `1px solid ${
                            issue.severity === 'critical'
                              ? '#ef4444'
                              : issue.severity === 'high'
                              ? '#f59e0b'
                              : issue.severity === 'medium'
                              ? '#eab308'
                              : '#3b82f6'
                          }`,
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 
                            issue.severity === 'critical'
                              ? '#f87171'
                              : issue.severity === 'high'
                              ? '#fb923c'
                              : issue.severity === 'medium'
                              ? '#facc15'
                              : '#60a5fa';
                          e.currentTarget.style.background = '#1e293b';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 
                            issue.severity === 'critical'
                              ? '#ef4444'
                              : issue.severity === 'high'
                              ? '#f59e0b'
                              : issue.severity === 'medium'
                              ? '#eab308'
                              : '#3b82f6';
                          e.currentTarget.style.background = '#1e293b';
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontWeight: 600 }}>{issue.category}</span>
                          <Badge variant={issue.severity}>{issue.severity}</Badge>
                        </div>
                        {(issue.file || issue.line) && (
                          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
                            {issue.file && `${issue.file}`}
                            {issue.line && ` • Line ${issue.line}`}
                          </div>
                        )}
                        <p style={{ fontSize: '14px', color: '#e5e7eb', marginBottom: '8px' }}>
                          {issue.description}
                        </p>
                        <div
                          style={{
                            padding: '8px',
                            background: 'rgba(6, 182, 212, 0.1)',
                            borderRadius: '4px',
                            fontSize: '12px',
                            color: '#94a3b8',
                          }}
                        >
                          <strong>Suggestion:</strong> {issue.suggestion}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
                    <CheckCircle2 size={32} />
                    <p style={{ marginTop: '8px' }}>No issues found! The code looks good.</p>
                  </div>
                )}
              </Card>
            </TabContent>
          )}

          {activeTab === 'metrics' && (
            <TabContent>
              <Card title="Review Metrics" subtitle="Detailed performance and cost metrics">
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ padding: '16px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>Total Cost</span>
                      <strong>${result.cost.toFixed(5)}</strong>
                    </div>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>Total Tokens</span>
                      <strong>{(result.tokensUsed.input + result.tokensUsed.output).toLocaleString()}</strong>
                    </div>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>Duration</span>
                      <strong>{result.duration}ms</strong>
                    </div>
                  </div>
                </div>
              </Card>
            </TabContent>
          )}
        </TabsContainer>

        <NavigationSection>
          <NavigationGrid>
            <NavCard onClick={() => navigate('/')}>
              <NavCardHeader>
                <Home size={16} />
                <span>Back to Dashboard</span>
              </NavCardHeader>
              <NavCardDescription>Return to main overview</NavCardDescription>
            </NavCard>
            <NavCard onClick={() => navigate('/review')}>
              <NavCardHeader>
                <Plus size={16} />
                <span>Submit New Review</span>
              </NavCardHeader>
              <NavCardDescription>Analyze another code diff</NavCardDescription>
            </NavCard>
            <NavCard onClick={() => navigate('/recommendations')}>
              <NavCardHeader>
                <Lightbulb size={16} />
                <span>View Recommendations</span>
              </NavCardHeader>
              <NavCardDescription>Best practices & improvements</NavCardDescription>
            </NavCard>
          </NavigationGrid>
          <HelpSection>
            <HelpText>
              <Info size={14} />
              Need help? Check out our documentation or contact support.
            </HelpText>
            <HelpActions>
              <Button variant="ghost" size="sm" onClick={() => {}}>
                <BookOpen size={12} style={{ marginRight: '4px' }} />
                Documentation
              </Button>
              <Button variant="ghost" size="sm" onClick={() => {}}>
                <Info size={12} style={{ marginRight: '4px' }} />
                Support
              </Button>
            </HelpActions>
          </HelpSection>
        </NavigationSection>
      </ContentContainer>
    </PageContainer>
  );
};
