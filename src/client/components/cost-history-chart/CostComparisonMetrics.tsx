/** @format */

import React from 'react'
import styled from 'styled-components'
import { MetricCard } from '../ui'
import {
  DollarSign,
  Calendar,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  ChartPie,
} from 'lucide-react'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const metrics = [
  {
    label: 'Daily Average',
    value: '$0.3040',
    subtitle: 'Average cost per day',
    icon: <DollarSign size={16} />,
    variant: 'default' as const,
  },
  {
    label: 'Weekly Average',
    value: '$2.1280',
    subtitle: 'Projected weekly cost',
    icon: <Calendar size={16} />,
    variant: 'default' as const,
  },
  {
    label: 'Monthly Average',
    value: '$9.12',
    subtitle: 'Projected monthly cost',
    icon: <CalendarDays size={16} />,
    variant: 'default' as const,
  },
  {
    label: 'Highest Cost Day',
    value: '$0.4800',
    subtitle: 'Nov 29',
    icon: <TrendingUp size={16} />,
    variant: 'warning' as const,
  },
  {
    label: 'Lowest Cost Day',
    value: '$0.1200',
    subtitle: 'Dec 01',
    icon: <TrendingDown size={16} />,
    variant: 'success' as const,
  },
  {
    label: 'Total Period Cost',
    value: '$1.52',
    subtitle: '5 days tracked',
    icon: <ChartPie size={16} />,
    variant: 'default' as const,
    trend: 'down' as const,
    trendValue: '6%',
  },
]

export const CostComparisonMetrics: React.FC = () => {
  return (
    <Grid>
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          label={metric.label}
          value={metric.value}
          subtitle={metric.subtitle}
          icon={metric.icon}
          variant={metric.variant}
          trend={metric.trend}
          trendValue={metric.trendValue}
        />
      ))}
    </Grid>
  )
}

