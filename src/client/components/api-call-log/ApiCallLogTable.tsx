/** @format */

import React from 'react'
import styled from 'styled-components'
import { Clock, CircleCheck, Circle } from 'lucide-react'
import { theme } from '../../styles/theme'
import { Badge } from '../ui'

const TableContainer = styled.div`
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.sm};
  border-collapse: collapse;
`

const TableHead = styled.thead`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}50;
`

const TableHeader = styled.th<{ $align?: 'left' | 'right' | 'center' }>`
  text-align: ${({ $align }) => $align || 'left'};
  padding: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSize.sm};
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}30;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted}30;
  }
`

const TableCell = styled.td<{ $align?: 'left' | 'right' | 'center' }>`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: ${({ $align }) => $align || 'left'};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const RequestId = styled.code`
  font-size: ${({ theme }) => theme.fontSize.xs};
  background-color: ${({ theme }) => theme.colors.muted}50;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
`

const TimestampCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const MonoText = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
`

interface ApiCall {
  id: string
  timestamp: string
  cost: number
  tokens: number
  diffSize: string
  cache: boolean
  status: string
}

interface ApiCallLogTableProps {
  calls: ApiCall[]
}

export const ApiCallLogTable: React.FC<ApiCallLogTableProps> = ({ calls }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <tr>
            <TableHeader>Request ID</TableHeader>
            <TableHeader>Timestamp</TableHeader>
            <TableHeader $align='right'>Cost</TableHeader>
            <TableHeader $align='right'>Tokens</TableHeader>
            <TableHeader $align='right'>Diff Size</TableHeader>
            <TableHeader $align='center'>Cache</TableHeader>
            <TableHeader $align='center'>Status</TableHeader>
          </tr>
        </TableHead>
        <TableBody>
          {calls.map((call) => (
            <TableRow key={call.id}>
              <TableCell>
                <RequestId>{call.id}</RequestId>
              </TableCell>
              <TableCell>
                <TimestampCell>
                  <Clock size={14} color={theme.colors.textMuted} />
                  {call.timestamp}
                </TimestampCell>
              </TableCell>
              <TableCell $align='right'>
                <MonoText
                  style={{
                    color:
                      call.cost > 0 ? theme.colors.primary : theme.colors.textMuted,
                  }}
                >
                  ${call.cost.toFixed(4)}
                </MonoText>
              </TableCell>
              <TableCell $align='right'>
                <MonoText>{call.tokens.toLocaleString()}</MonoText>
              </TableCell>
              <TableCell $align='right'>
                <span style={{ color: theme.colors.textMuted }}>
                  {call.diffSize}
                </span>
              </TableCell>
              <TableCell $align='center'>
                {call.cache ? (
                  <Badge variant='success' size='sm'>
                    <CircleCheck size={12} style={{ marginRight: '4px' }} />
                    Cached
                  </Badge>
                ) : (
                  <Badge variant='default' size='sm'>
                    <Circle size={12} style={{ marginRight: '4px' }} />
                    Fresh
                  </Badge>
                )}
              </TableCell>
              <TableCell $align='center'>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

