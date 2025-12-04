/** @format */

import React from 'react'
import styled from 'styled-components'
import { Activity, CircleCheck, DollarSign, Zap } from 'lucide-react'
import { MetricCard } from '../ui/MetricCard'

const StatsGrid = styled.div`
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

export const ApiCallLogStats: React.FC = () => {
  return (
    <StatsGrid>
      <MetricCard
        label='Total Requests'
        value='25'
        subtitle='All API calls in log'
        icon={<Activity size={16} />}
      />
      <MetricCard
        label='Successful Calls'
        value='22'
        subtitle='88.0% success rate'
        icon={<CircleCheck size={16} />}
        trend='up'
        trendValue='88%'
        variant='success'
      />
      <MetricCard
        label='Total Cost'
        value='$0.1838'
        subtitle='Avg: $0.0084/call'
        icon={<DollarSign size={16} />}
      />
      <MetricCard
        label='Cache Hit Rate'
        value='54.5%'
        subtitle='Semantic cache efficiency'
        icon={<Zap size={16} />}
        variant='success'
      />
    </StatsGrid>
  )
}

