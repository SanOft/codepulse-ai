/** @format */

import React, { useState, useRef, useMemo } from 'react'
import styled from 'styled-components'
import { Card } from '../ui'
import { TrendingUp } from 'lucide-react'
import { theme } from '../../styles/theme'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  ChartTitle,
  Tooltip,
  Legend
)

const CardContainer = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const TabsList = styled.div`
  background-color: ${({ theme }) => theme.colors.muted};
  color: ${({ theme }) => theme.colors.textMuted};
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 3px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 200px;
  display: grid;
`

const TabButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  height: calc(100% - 1px);
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid transparent;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  white-space: nowrap;
  transition: all 0.15s ease;
  font-size: ${({ theme }) => theme.fontSize.xs};
  cursor: pointer;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.background : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.textPrimary : theme.colors.textMuted};
  box-shadow: ${({ $active }) => ($active ? theme.shadows.sm : 'none')};

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: ${({ theme }) => theme.spacing.md};
  position: relative;
`

export const CostHistoryChart: React.FC = () => {
  const [chartType, setChartType] = useState<'area' | 'line'>('area')
  const chartRef = useRef<any>(null)

  // Helper function to convert HSL to RGBA
  const hslToRgba = (hsl: string, alpha: number): string => {
    // Parse HSL string like "hsl(239, 84%, 67%)"
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
    if (!match) return `rgba(99, 102, 241, ${alpha})` // fallback to primary purple
    
    const h = parseInt(match[1]) / 360
    const s = parseInt(match[2]) / 100
    const l = parseInt(match[3]) / 100
    
    // Convert HSL to RGB
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((h * 6) % 2) - 1))
    const m = l - c / 2
    
    let r = 0, g = 0, b = 0
    
    if (h < 1/6) {
      r = c; g = x; b = 0
    } else if (h < 2/6) {
      r = x; g = c; b = 0
    } else if (h < 3/6) {
      r = 0; g = c; b = x
    } else if (h < 4/6) {
      r = 0; g = x; b = c
    } else if (h < 5/6) {
      r = x; g = 0; b = c
    } else {
      r = c; g = 0; b = x
    }
    
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  // Chart data with proper gradient for area fill
  const chartData = useMemo(() => {
    // Use lighter primary color for border (matching other border colors)
    const primaryLightRgba = hslToRgba(theme.colors.primaryLight, 0.9)
    
    return {
      labels: ['Nov 28', 'Nov 29', 'Nov 30', 'Dec 01', 'Dec 02'],
      datasets: [
        {
          label: 'Daily Cost',
          data: [0.15, 0.48, 0.35, 0.12, 0.42],
          borderColor: primaryLightRgba, // Lighter purple border from theme
          backgroundColor: chartType === 'area' 
            ? hslToRgba(theme.colors.primary, 0.3) // Temporary, will be replaced with gradient
            : 'transparent',
          fill: chartType === 'area',
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#fff',
          pointBorderColor: primaryLightRgba,
          pointBorderWidth: 2,
        },
        {
          label: '7-Day Moving Avg',
          data: [0.15, 0.25, 0.28, 0.26, 0.30],
          borderColor: theme.colors.secondary, // Purple line from theme
          backgroundColor: 'transparent',
          fill: false, // Never fill the moving average
          tension: 0.4,
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: '#fff',
          pointBorderColor: theme.colors.secondary,
          pointBorderWidth: 2,
        },
      ],
    }
  }, [chartType])

  // Custom plugin to create gradient for area chart
  const gradientPlugin = useMemo(() => ({
    id: 'areaGradient',
    beforeDraw: (chart: any) => {
      if (chartType !== 'area') return

      const ctx = chart.ctx
      const chartArea = chart.chartArea
      if (!chartArea) return

      const dataset = chart.data.datasets[0]
      if (!dataset || !dataset.fill) return

      // Create gradient for area chart - purple fading to transparent
      const gradient = ctx.createLinearGradient(
        0,
        chartArea.top,
        0,
        chartArea.bottom
      )
      // Purple at top (from theme primary color), fading to transparent at bottom
      const primaryColor = hslToRgba(theme.colors.primary, 0.4)
      const primaryColorMid = hslToRgba(theme.colors.primary, 0.2)
      
      gradient.addColorStop(0, primaryColor)
      gradient.addColorStop(0.5, primaryColorMid)
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      // Update the dataset background color
      dataset.backgroundColor = gradient
    },
  }), [chartType])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: theme.colors.textMuted,
          font: {
            size: 12,
            family: 'ui-sans-serif, system-ui, sans-serif',
          },
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: theme.colors.backgroundCard,
        titleColor: theme.colors.textPrimary,
        bodyColor: theme.colors.textSecondary,
        borderColor: theme.colors.border,
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: $${context.parsed.y.toFixed(4)}`
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: `${theme.colors.border}50`,
          drawBorder: false,
        },
        ticks: {
          color: theme.colors.textMuted,
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 0.6,
        grid: {
          color: `${theme.colors.border}50`,
          drawBorder: false,
        },
        ticks: {
          color: theme.colors.textMuted,
          font: {
            size: 11,
          },
          stepSize: 0.15,
        },
        title: {
          display: true,
          text: 'Cost ($)',
          color: theme.colors.textMuted,
          font: {
            size: 12,
          },
        },
      },
    },
  }

  return (
    <CardContainer>
      <Header>
        <TitleRow>
          <div>
            <Title>
              <TrendingUp size={20} color={theme.colors.primary} />
              Cost Trend Analysis
            </Title>
            <Subtitle>
              Daily AI review costs with 7-day moving average trend line
            </Subtitle>
          </div>
          <TabsContainer>
            <TabsList>
              <TabButton
                $active={chartType === 'area'}
                onClick={() => setChartType('area')}
              >
                Area Chart
              </TabButton>
              <TabButton
                $active={chartType === 'line'}
                onClick={() => setChartType('line')}
              >
                Line Chart
              </TabButton>
            </TabsList>
          </TabsContainer>
        </TitleRow>
      </Header>
      <ChartContainer>
        <Line
          ref={chartRef}
          data={chartData}
          options={chartOptions}
          plugins={[gradientPlugin]}
        />
      </ChartContainer>
    </CardContainer>
  )
}

