import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Badge } from '../components/ui';
import { CodeIssue } from '../types';
import {
  Home,
  FileText,
  ChevronRight,
  X,
  FileCode,
  CircleAlert,
  Zap,
  Lightbulb,
  Code,
  BookOpen,
  Copy,
  ExternalLink,
  CheckCircle2,
  Bookmark,
  Share2,
  MoreVertical,
  Info,
  BarChart3,
  Link2,
  Navigation,
  ArrowLeft,
} from 'lucide-react';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const BreadcrumbLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const IssueHeader = styled(Card)`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const BadgeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const IssueTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const IssueLocation = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const LocationCode = styled.code`
  background: ${({ theme }) => theme.colors.backgroundHover};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const StatLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-transform: capitalize;
`;

const SectionCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.xl};
`

const StyledSectionCard = styled(SectionCard)<{
  $borderColor?: string
  $background?: string
}>`
  ${({ $borderColor }) => $borderColor && `border-color: ${$borderColor};`}
  ${({ $background }) => $background && `background: ${$background};`}
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SectionDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DescriptionBox = styled.div`
  background: ${({ theme }) => theme.colors.backgroundHover};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DescriptionText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ImpactItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ImpactLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ImpactValue = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ImpactDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

const SolutionBox = styled.div`
  background: ${({ theme }) => theme.colors.backgroundHover};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  font-family: 'Courier New', monospace;
  font-size: ${({ theme }) => theme.fontSize.sm};
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CodeContextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FilePathBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const FilePathLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FilePathCode = styled.code`
  display: block;
  background: ${({ theme }) => theme.colors.backgroundHover};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.xs};
  overflow-x: auto;
`;

const LineNumberBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const LineNumberGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const LearnMoreList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const LearnMoreItem = styled(Button)`
  justify-content: flex-start;
  width: 100%;
`;

const ActionBar = styled(Card)`
  padding: ${({ theme }) => theme.spacing.md};
`;

const ActionBarTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ActionButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const InfoAlert = styled.div`
  display: flex;
  align-items: start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const RelatedIssuesCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const RelatedIssueItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.backgroundHover};
  }
`;

const RelatedIssueHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const RelatedIssueTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const RelatedIssueDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const SummaryCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const SummaryLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const SummaryValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const NavigationCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const NavigationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

// Mock data - in real app, this would come from API/state
const mockIssue: CodeIssue = {
  severity: 'critical',
  category: 'Security',
  file: 'src/services/TrackingService.ts',
  line: 16,
  description: 'Vulnerability to SQL Injection. Direct concatenation of user-provided variables (`truckId`, `lat`, `lng`) into the SQL query string exposes the database to potential malicious input if any variable is not properly sanitized.',
  suggestion: 'Use parameterized queries (prepared statements) to separate the SQL command from the data. This change prevents the database from interpreting user-supplied input as part of the SQL command itself. The fix in the diff is correct, but the vulnerability must be highlighted.',
};

const relatedIssues: CodeIssue[] = [
  {
    severity: 'high',
    category: 'Performance',
    file: 'src/components/TrackingMap.tsx',
    line: 42,
    description: 'Inefficient state update causing unnecessary re-renders. The `this.subscribers.forEach`...',
    suggestion: '',
  },
  {
    severity: 'medium',
    category: 'Logic',
    file: 'src/utils/distance.ts',
    line: 15,
    description: 'Distance calculation uses Euclidean distance simplified for flat Earth approximation...',
    suggestion: '',
  },
  {
    severity: 'low',
    category: 'Maintainability',
    file: 'src/config/constants.ts',
    line: 8,
    description: 'Hardcoded configuration values found without environment variable fallback. E.g...',
    suggestion: '',
  },
];

const getSeverityColor = (severity: IssueSeverity): string => {
  switch (severity) {
    case 'critical':
      return '#ef4444';
    case 'high':
      return '#f97316';
    case 'medium':
      return '#eab308';
    case 'low':
      return '#3b82f6';
    default:
      return '#6b7280';
  }
};

type IssueSeverity = 'critical' | 'high' | 'medium' | 'low';

export const IssueDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // In real app, fetch issue by id
  const issue = mockIssue;

  return (
    <PageContainer>
      <MainContent>
        <Breadcrumb>
          <BreadcrumbLink onClick={() => navigate('/')}>
            <Home size={14} style={{ marginRight: '4px' }} />
            Dashboard
          </BreadcrumbLink>
          <ChevronRight size={14} />
          <BreadcrumbLink onClick={() => navigate('/results')}>
            <FileText size={14} style={{ marginRight: '4px' }} />
            Review Results
          </BreadcrumbLink>
          <ChevronRight size={14} />
          <span>Issue Detail</span>
        </Breadcrumb>

        <IssueHeader>
          <HeaderTop>
            <div style={{ flex: 1 }}>
              <BadgeGroup>
                <Badge variant={issue.severity === 'critical' ? 'critical' : issue.severity || 'default'}>
                  {issue.severity}
                </Badge>
                <Badge variant="default">{issue.category}</Badge>
                <Badge variant="default">ISSUE-001</Badge>
              </BadgeGroup>
              <IssueTitle>Security Issue</IssueTitle>
              <IssueLocation>
                <FileCode size={16} />
                <LocationCode>
                  {issue.file}:{issue.line}
                </LocationCode>
              </IssueLocation>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/results')}>
              <X size={16} />
            </Button>
          </HeaderTop>
          <StatsGrid>
            <StatItem>
              <StatLabel>Severity Level</StatLabel>
              <StatValue>{issue.severity}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Category</StatLabel>
              <StatValue>{issue.category}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Location</StatLabel>
              <StatValue>Line {issue.line}</StatValue>
            </StatItem>
          </StatsGrid>
        </IssueHeader>

        <SectionCard>
          <SectionHeader>
            <CircleAlert size={20} style={{ color: '#6366f1' }} />
            Issue Description
          </SectionHeader>
          <SectionDescription>
            Security vulnerabilities that could expose your application to attacks or data breaches.
          </SectionDescription>
          <DescriptionBox>
            <DescriptionText>{issue.description}</DescriptionText>
          </DescriptionBox>
          <ImpactGrid>
            <ImpactItem>
              <ImpactLabel>Impact Level</ImpactLabel>
              <ImpactValue>
                <ImpactDot $color={getSeverityColor(issue.severity)} />
                <span style={{ fontSize: '14px', fontWeight: 500, textTransform: 'capitalize' }}>
                  {issue.severity}
                </span>
              </ImpactValue>
            </ImpactItem>
            <ImpactItem>
              <ImpactLabel>Effort to Fix</ImpactLabel>
              <ImpactValue>
                <Zap size={14} />
                <span style={{ fontSize: '14px', fontWeight: 500 }}>High</span>
              </ImpactValue>
            </ImpactItem>
          </ImpactGrid>
        </SectionCard>

        <StyledSectionCard $borderColor='rgba(34, 197, 94, 0.2)' $background='rgba(34, 197, 94, 0.05)'>
          <SectionHeader>
            <Lightbulb size={20} style={{ color: '#22c55e' }} />
            Suggested Solution
          </SectionHeader>
          <SectionDescription>Recommended fix to resolve this issue</SectionDescription>
          <SolutionBox>{issue.suggestion}</SolutionBox>
          <ActionButtons>
            <Button variant="ghost" size="sm">
              <Copy size={14} style={{ marginRight: '4px' }} />
              Copy Solution
            </Button>
            <Button variant="ghost" size="sm">
              <ExternalLink size={14} style={{ marginRight: '4px' }} />
              View Documentation
            </Button>
          </ActionButtons>
        </StyledSectionCard>

        <SectionCard>
          <SectionHeader>
            <Code size={20} style={{ color: '#6366f1' }} />
            Code Context
          </SectionHeader>
          <SectionDescription>Location and context of the issue in your codebase</SectionDescription>
          <CodeContextBox>
            <FilePathBox>
              <FilePathLabel>File Path</FilePathLabel>
              <FilePathCode>{issue.file}</FilePathCode>
            </FilePathBox>
            <LineNumberBox>
              <FilePathLabel>Line Number</FilePathLabel>
              <LineNumberGroup>
                <Badge variant="ghost" style={{ fontFamily: 'monospace' }}>
                  Line {issue.line}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Copy size={14} style={{ marginRight: '4px' }} />
                  Copy Line
                </Button>
              </LineNumberGroup>
            </LineNumberBox>
            <ActionButtons style={{ borderTop: 'none', paddingTop: 0 }}>
              <Button variant="ghost" style={{ width: '100%' }} onClick={() => navigate('/results')}>
                <FileText size={14} style={{ marginRight: '4px' }} />
                View Full Review Results
              </Button>
            </ActionButtons>
          </CodeContextBox>
        </SectionCard>

        <SectionCard>
          <SectionHeader>
            <BookOpen size={18} style={{ color: '#6366f1' }} />
            Learn More
          </SectionHeader>
          <SectionDescription>Resources to help you understand and fix this type of issue:</SectionDescription>
          <LearnMoreList>
            <LearnMoreItem variant="ghost" size="sm">
              <ExternalLink size={14} style={{ marginRight: '4px' }} />
              Best Practices for Security
            </LearnMoreItem>
            <LearnMoreItem variant="ghost" size="sm">
              <ExternalLink size={14} style={{ marginRight: '4px' }} />
              Common Patterns & Solutions
            </LearnMoreItem>
            <LearnMoreItem variant="ghost" size="sm">
              <ExternalLink size={14} style={{ marginRight: '4px' }} />
              Related Security Guidelines
            </LearnMoreItem>
          </LearnMoreList>
        </SectionCard>

        <ActionBar>
          <ActionBarTop>
            <div></div>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>Last updated: Today</span>
          </ActionBarTop>
          <ActionButtonsGrid>
            <Button variant="ghost" size="sm">
              <CheckCircle2 size={14} style={{ marginRight: '4px' }} />
              Mark Resolved
            </Button>
            <Button variant="ghost" size="sm">
              <Bookmark size={14} style={{ marginRight: '4px' }} />
              Bookmark
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 size={14} style={{ marginRight: '4px' }} />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical size={14} style={{ marginRight: '4px' }} />
              More
            </Button>
          </ActionButtonsGrid>
          <InfoAlert>
            <Info size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
            <p>
              This issue was identified by AI analysis. Review the suggestion carefully and test thoroughly before
              applying changes to production.
            </p>
          </InfoAlert>
        </ActionBar>
      </MainContent>

      <Sidebar>
        <SummaryCard>
          <SectionHeader>
            <BarChart3 size={18} />
            Review Summary
          </SectionHeader>
          <div style={{ marginBottom: '16px' }}>
            <StatLabel>Total Issues Found</StatLabel>
            <SummaryValue style={{ fontSize: '24px', marginTop: '4px' }}>4</SummaryValue>
          </div>
          <SummaryGrid>
            <SummaryItem>
              <SummaryLabel>Critical</SummaryLabel>
              <SummaryValue>1</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>High</SummaryLabel>
              <SummaryValue>1</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Medium</SummaryLabel>
              <SummaryValue>1</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Low</SummaryLabel>
              <SummaryValue>1</SummaryValue>
            </SummaryItem>
          </SummaryGrid>
          <Button variant="ghost" style={{ width: '100%', marginTop: '16px' }} onClick={() => navigate('/results')}>
            <FileText size={14} style={{ marginRight: '4px' }} />
            View All Issues
          </Button>
        </SummaryCard>

        <RelatedIssuesCard>
          <SectionHeader>
            <Link2 size={18} />
            Related Issues
          </SectionHeader>
          <SectionDescription style={{ marginBottom: '16px' }}>3 similar or related issues</SectionDescription>
          {relatedIssues.map((relatedIssue, index) => (
            <RelatedIssueItem key={index} onClick={() => navigate(`/issue/${index + 2}`)}>
              <RelatedIssueHeader>
                <Badge
                  variant={
                    relatedIssue.severity === 'high'
                      ? 'default'
                      : relatedIssue.severity === 'medium'
                      ? 'default'
                      : 'default'
                  }
                  style={{
                    background:
                      relatedIssue.severity === 'high'
                        ? 'rgba(249, 115, 22, 0.1)'
                        : relatedIssue.severity === 'medium'
                        ? 'rgba(234, 179, 8, 0.1)'
                        : 'rgba(59, 130, 246, 0.1)',
                    color:
                      relatedIssue.severity === 'high'
                        ? '#f97316'
                        : relatedIssue.severity === 'medium'
                        ? '#eab308'
                        : '#3b82f6',
                    borderColor:
                      relatedIssue.severity === 'high'
                        ? 'rgba(249, 115, 22, 0.2)'
                        : relatedIssue.severity === 'medium'
                        ? 'rgba(234, 179, 8, 0.2)'
                        : 'rgba(59, 130, 246, 0.2)',
                  }}
                >
                  {relatedIssue.severity}
                </Badge>
                <ChevronRight size={14} />
              </RelatedIssueHeader>
              <RelatedIssueTitle>{relatedIssue.category}</RelatedIssueTitle>
              <RelatedIssueDescription>{relatedIssue.description}</RelatedIssueDescription>
            </RelatedIssueItem>
          ))}
        </RelatedIssuesCard>

        <NavigationCard>
          <SectionHeader>
            <Navigation size={18} />
            Navigation
          </SectionHeader>
          <NavigationList>
            <Button variant="ghost" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => navigate('/results')}>
              <ArrowLeft size={14} style={{ marginRight: '4px' }} />
              Back to Review Results
            </Button>
            <Button variant="ghost" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => navigate('/recommendations')}>
              <Lightbulb size={14} style={{ marginRight: '4px' }} />
              View Recommendations
            </Button>
            <Button variant="ghost" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => navigate('/')}>
              <Home size={14} style={{ marginRight: '4px' }} />
              Back to Dashboard
            </Button>
          </NavigationList>
        </NavigationCard>
      </Sidebar>
    </PageContainer>
  );
};

