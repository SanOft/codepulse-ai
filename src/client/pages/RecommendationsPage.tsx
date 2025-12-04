import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../components/ui';
import {
  Home,
  FileText,
  ChevronRight,
  Lightbulb,
  ShieldCheck,
  Zap,
  BookOpen,
  BookmarkPlus,
  Share2,
  ArrowLeft,
  Plus,
  Code,
  Shield,
  CheckCircle2,
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
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
`;

const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.md};
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

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const HeaderIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary},
    ${({ theme }) => theme.colors.accent}
  );
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconInner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 672px;
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const RecommendationsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const RecommendationCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  backdrop-filter: blur(12px);
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardIcon = styled.div<{ $bgColor: string; $borderColor: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $bgColor }) => $bgColor};
  border: 1px solid ${({ $borderColor }) => $borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CardHeaderContent = styled.div`
  flex: 1;
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

const CardSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;

const ActionItemsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ActionItemsTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: 0;
`;

const ActionItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ActionItem = styled.li`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ActionBullet = styled.span<{ $bgColor: string; $borderColor: string }>`
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $bgColor }) => $bgColor};
  border: 1px solid ${({ $borderColor }) => $borderColor};
  margin-top: 6px;
`;

const CardFooter = styled.div`
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: ${({ theme }) => theme.spacing.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const NavigationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const ResourcesSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ResourcesTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ResourceCard = styled.button`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  backdrop-filter: blur(12px);
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  text-align: left;
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ResourceIcon = styled.div<{ $bgColor: string; $hoverColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $bgColor }) => $bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background ${({ theme }) => theme.transitions.fast};

  ${ResourceCard}:hover & {
    background: ${({ $hoverColor }) => $hoverColor};
  }
`;

const ResourceContent = styled.div`
  flex: 1;
`;

const ResourceTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  transition: color ${({ theme }) => theme.transitions.fast};

  ${ResourceCard}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ResourceDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;

const recommendations = [
  {
    id: 1,
    title: 'Security Best Practices',
    subtitle: 'Recommendation 1',
    description: 'Strengthen authentication and input validation across all database interactions.',
    icon: ShieldCheck,
    iconColor: '#6366f1',
    bgColor: 'rgba(99, 102, 241, 0.1)',
    borderColor: 'rgba(99, 102, 241, 0.2)',
    actionItems: [
      'Adopt an ORM (like Prisma or TypeORM) to enforce safe database query construction.',
      'Review all external inputs (API payloads, query params) with a schema validation library (like Zod or Joi) before use.',
      'Implement Content Security Policy (CSP) headers aggressively if any frontend components are involved.',
    ],
  },
  {
    id: 2,
    title: 'Performance Optimization',
    subtitle: 'Recommendation 2',
    description: 'Focus on reducing unnecessary renders and optimizing database queries for high load.',
    icon: Zap,
    iconColor: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    borderColor: 'rgba(139, 92, 246, 0.2)',
    actionItems: [
      'Use memoization techniques (React.memo, useCallback, useMemo) generously in UI components linked to real-time services.',
      'Implement connection pooling in the database layer to reduce latency overhead on connection establishment.',
      'Analyze query execution plans for slow queries and add necessary indices.',
    ],
  },
  {
    id: 3,
    title: 'Code Maintainability and Standards',
    subtitle: 'Recommendation 3',
    description: 'Improve code readability and adherence to established logistics domain standards.',
    icon: BookOpen,
    iconColor: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.1)',
    borderColor: 'rgba(6, 182, 212, 0.2)',
    actionItems: [
      'Enforce consistent error handling across the service layer using structured logging.',
      'Use consistent naming conventions, especially for logistics-specific terms like ShipmentID, TruckStatus, ETA.',
      'Ensure all new features are covered by comprehensive unit and integration tests.',
    ],
  },
];

const resources = [
  {
    title: 'Documentation',
    description: 'Learn best practices and coding standards',
    icon: BookOpen,
    iconColor: '#6366f1',
    bgColor: 'rgba(99, 102, 241, 0.1)',
    hoverColor: 'rgba(99, 102, 241, 0.2)',
  },
  {
    title: 'API Reference',
    description: 'Explore available endpoints and integrations',
    icon: Code,
    iconColor: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    hoverColor: 'rgba(139, 92, 246, 0.2)',
  },
  {
    title: 'Security Guide',
    description: 'Security best practices and vulnerability prevention',
    icon: Shield,
    iconColor: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.1)',
    hoverColor: 'rgba(6, 182, 212, 0.2)',
  },
  {
    title: 'Performance Tips',
    description: 'Optimization techniques and performance monitoring',
    icon: Zap,
    iconColor: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    hoverColor: 'rgba(16, 185, 129, 0.2)',
  },
];

export const RecommendationsPage: React.FC = () => {
  const navigate = useNavigate();

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
            <BreadcrumbLink onClick={() => navigate('/results')}>
              <FileText size={14} />
              Review Results
            </BreadcrumbLink>
            <BreadcrumbSeparator>
              <ChevronRight size={14} />
            </BreadcrumbSeparator>
            <span style={{ color: '#6366f1', fontWeight: 500 }}>Recommendations</span>
          </Breadcrumb>
          <HeaderSection>
            <HeaderTitle>
              <HeaderIcon>
                <IconInner>
                  <Lightbulb size={20} style={{ color: '#6366f1' }} />
                </IconInner>
              </HeaderIcon>
              Development Recommendations
            </HeaderTitle>
            <HeaderDescription>
              Based on the AI analysis of your code, here are comprehensive recommendations for improving your codebase across security, performance, and maintainability.
            </HeaderDescription>
          </HeaderSection>
        </BreadcrumbContent>
      </BreadcrumbBar>

      <ContentContainer>
        <RecommendationsGrid>
          {recommendations.map((rec) => {
            const IconComponent = rec.icon;
            return (
              <RecommendationCard key={rec.id}>
                <div style={{ padding: '24px 24px 12px 24px' }}>
                  <CardHeader>
                    <CardIcon $bgColor={rec.bgColor} $borderColor={rec.borderColor}>
                      <IconComponent size={24} style={{ color: rec.iconColor }} />
                    </CardIcon>
                    <CardHeaderContent>
                      <CardTitle>{rec.title}</CardTitle>
                      <CardSubtitle>{rec.subtitle}</CardSubtitle>
                    </CardHeaderContent>
                  </CardHeader>
                </div>
                <div style={{ padding: '0 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <CardDescription>{rec.description}</CardDescription>
                  <ActionItemsSection>
                    <ActionItemsTitle>
                      <CheckCircle2 size={14} style={{ color: rec.iconColor }} />
                      Action Items
                    </ActionItemsTitle>
                    <ActionItemsList>
                      {rec.actionItems.map((item, index) => (
                        <ActionItem key={index}>
                          <ActionBullet $bgColor={rec.bgColor} $borderColor={rec.borderColor} />
                          <span>{item}</span>
                        </ActionItem>
                      ))}
                    </ActionItemsList>
                  </ActionItemsSection>
                </div>
                <div style={{ padding: '0 24px 24px 24px' }}>
                  <CardFooter>
                    <Button variant="ghost" size="sm" style={{ flex: 1 }}>
                      <BookmarkPlus size={12} style={{ marginRight: '4px' }} />
                      Save
                    </Button>
                    <Button variant="ghost" size="sm" style={{ flex: 1 }}>
                      <Share2 size={12} style={{ marginRight: '4px' }} />
                      Share
                    </Button>
                  </CardFooter>
                </div>
              </RecommendationCard>
            );
          })}
        </RecommendationsGrid>

        <NavigationSection>
          <Button variant="secondary" onClick={() => navigate('/results')}>
            <ArrowLeft size={16} style={{ marginRight: '4px' }} />
            Back to Review Results
          </Button>
          <Button onClick={() => navigate('/review')}>
            <Plus size={16} style={{ marginRight: '4px' }} />
            Submit New Review
          </Button>
        </NavigationSection>

        <ResourcesSection>
          <ResourcesTitle>Additional Resources</ResourcesTitle>
          <ResourcesGrid>
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <ResourceCard key={index} onClick={() => {}}>
                  <ResourceIcon $bgColor={resource.bgColor} $hoverColor={resource.hoverColor}>
                    <IconComponent size={18} style={{ color: resource.iconColor }} />
                  </ResourceIcon>
                  <ResourceContent>
                    <ResourceTitle>{resource.title}</ResourceTitle>
                    <ResourceDescription>{resource.description}</ResourceDescription>
                  </ResourceContent>
                </ResourceCard>
              );
            })}
          </ResourcesGrid>
        </ResourcesSection>
      </ContentContainer>
    </PageContainer>
  );
};

