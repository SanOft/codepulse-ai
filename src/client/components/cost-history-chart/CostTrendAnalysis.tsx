/** @format */

import React from 'react'
import styled from 'styled-components'
import { Card, Badge } from '../ui'
import { Lightbulb, Target, TriangleAlert, ChevronRight } from 'lucide-react'
import { theme } from '../../styles/theme'

const CardContainer = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const Title = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.base};
`

const Subtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const AlertBox = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid hsla(43, 96%, 56%, 0.2);
  background-color: hsla(43, 96%, 56%, 0.05);
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const AlertIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const AlertContent = styled.div`
  padding-left: ${({ theme }) => theme.spacing.xl};
`

const AlertTitle = styled.h5`
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const AlertText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
  line-height: 1.625;
`

const RecommendationsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const RecommendationsTitle = styled.h4`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`

const RecommendationsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const RecommendationItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`

const RecommendationIcon = styled.div`
  margin-top: 2px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.primary};
`

const recommendations = [
  'Monitor cache hit rates to reduce API costs during peak usage periods.',
  'Consider batch processing reviews during off-peak hours for better efficiency.',
  'Review large diffs separately to optimize token usage and reduce costs.',
  'Set up budget alerts to prevent unexpected overspending.',
]

export const CostTrendAnalysis: React.FC = () => {
  return (
    <CardContainer>
      <Header>
        <Title>
          <Lightbulb size={20} color={theme.colors.primary} />
          Trend Analysis & Insights
        </Title>
        <Subtitle>
          AI-generated insights based on your cost history patterns
        </Subtitle>
      </Header>
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
        <AlertBox>
          <AlertIcon>
            <TriangleAlert size={16} />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Cost Spike on Nov 29</AlertTitle>
            <AlertText>
              Cost was $0.4800, which is 58% above average.
            </AlertText>
          </AlertContent>
        </AlertBox>
        <RecommendationsSection>
          <RecommendationsTitle>
            <Target size={16} color={theme.colors.primary} />
            Recommendations
          </RecommendationsTitle>
          <RecommendationsList>
            {recommendations.map((rec, index) => (
              <RecommendationItem key={index}>
                <RecommendationIcon>
                  <ChevronRight size={14} />
                </RecommendationIcon>
                <span>{rec}</span>
              </RecommendationItem>
            ))}
          </RecommendationsList>
        </RecommendationsSection>
      </div>
    </CardContainer>
  )
}

