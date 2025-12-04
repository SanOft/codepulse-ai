/** @format */

import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from '../components/ui'
import {
  Settings,
  Calendar,
  CalendarDays,
  BarChart3,
  Cloud,
  Bell,
  RefreshCw,
  X,
  Save,
  Check,
  HelpCircle,
  Info,
} from 'lucide-react'

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const HeaderIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(99, 102, 241, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.primary};
`

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`

const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const CurrencyInput = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const CurrencySymbol = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`

const StyledInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`

const InputDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const InfoAlert = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(59, 130, 246, 0.1);
  border-left: 4px solid ${({ theme }) => theme.colors.info};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`

const InfoIcon = styled.div`
  color: ${({ theme }) => theme.colors.info};
  flex-shrink: 0;
  margin-top: 2px;
`

const InfoContent = styled.div`
  flex: 1;
`

const InfoTitle = styled.h5`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.info};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`

const InfoText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const ToggleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`

const ToggleLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
`

const ToggleDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const ToggleSwitch = styled.button<{ $active: boolean }>`
  width: 36px;
  height: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.backgroundLight};
  cursor: pointer;
  position: relative;
  transition: background ${({ theme }) => theme.transitions.fast};
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: ${({ $active }) => ($active ? '18px' : '2px')};
    transition: left ${({ theme }) => theme.transitions.fast};
  }
`

const ActionsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`

const HelpCard = styled(Card)`
  background: rgba(59, 130, 246, 0.05);
  border-color: rgba(59, 130, 246, 0.2);
`

const HelpHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const HelpList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const HelpItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const HelpItemTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;

  strong {
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }
`

const HelpItemText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`

const HelpLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate()
  const [dailyLimit, setDailyLimit] = useState('0.50')
  const [monthlyLimit, setMonthlyLimit] = useState('10.00')
  const [maxApiCalls, setMaxApiCalls] = useState('50')
  const [useRealApi, setUseRealApi] = useState(false)
  const [enableWarnings, setEnableWarnings] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // In a real app, this would save to backend
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    setDailyLimit('0.50')
    setMonthlyLimit('10.00')
    setMaxApiCalls('50')
    setUseRealApi(false)
    setEnableWarnings(true)
  }

  return (
    <PageContainer>
      <div>
        <PageHeader>
          <HeaderIcon>
            <Settings size={20} />
          </HeaderIcon>
          <div>
            <PageTitle>Budget Settings</PageTitle>
            <PageSubtitle>
              Configure your daily and monthly budget limits, API call
              frequencies, and API mode settings.
            </PageSubtitle>
          </div>
        </PageHeader>
      </div>

      <Card
        title='Budget Limits'
        subtitle='Set daily and monthly spending limits for AI code reviews'
      >
        <CardContent>
          <InputWrapper>
            <InputLabel>
              <CalendarDays size={14} style={{ marginRight: '4px' }} />
              Daily Limit
            </InputLabel>
            <CurrencyInput>
              <CurrencySymbol>$</CurrencySymbol>
              <StyledInput
                type='number'
                step='0.01'
                min='0'
                placeholder='0.00'
                value={dailyLimit}
                onChange={(e) => setDailyLimit(e.target.value)}
              />
            </CurrencyInput>
            <InputDescription>
              Maximum amount you can spend per day. Reviews will be blocked once
              this limit is reached.
            </InputDescription>
          </InputWrapper>

          <InputWrapper>
            <InputLabel>
              <Calendar size={14} style={{ marginRight: '4px' }} />
              Monthly Limit
            </InputLabel>
            <CurrencyInput>
              <CurrencySymbol>$</CurrencySymbol>
              <StyledInput
                type='number'
                step='0.01'
                min='0'
                placeholder='0.00'
                value={monthlyLimit}
                onChange={(e) => setMonthlyLimit(e.target.value)}
              />
            </CurrencyInput>
            <InputDescription>
              Maximum amount you can spend per month. Resets on the 1st of each
              month.
            </InputDescription>
          </InputWrapper>

          <InfoAlert>
            <InfoIcon>
              <Info size={18} />
            </InfoIcon>
            <InfoContent>
              <InfoTitle>Budget Protection</InfoTitle>
              <InfoText>
                When you reach 80% of your daily or monthly limit, you'll
                receive a warning. At 100%, all reviews will be blocked until
                the next period.
              </InfoText>
            </InfoContent>
          </InfoAlert>
        </CardContent>
      </Card>

      <Card
        title='API Settings'
        subtitle='Configure API call limits and usage mode'
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <InputWrapper>
            <InputLabel>
              <BarChart3 size={14} style={{ marginRight: '4px' }} />
              Max API Calls Per Day
            </InputLabel>
            <StyledInput
              type='number'
              min='1'
              max='1000'
              placeholder='50'
              value={maxApiCalls}
              onChange={(e) => setMaxApiCalls(e.target.value)}
            />
            <InputDescription>
              Maximum number of code review requests allowed per day. Prevents
              accidental overuse.
            </InputDescription>
          </InputWrapper>

          <ToggleWrapper
            style={{
              borderTop: '1px solid rgba(148, 163, 184, 0.2)',
              paddingTop: '16px',
            }}
          >
            <ToggleContent>
              <ToggleLabel htmlFor='useRealApi'>
                <Cloud size={14} style={{ marginRight: '4px' }} />
                Use Real API
              </ToggleLabel>
              <ToggleDescription>
                Currently using mock API - no costs incurred
              </ToggleDescription>
            </ToggleContent>
            <ToggleSwitch
              $active={useRealApi}
              onClick={() => setUseRealApi(!useRealApi)}
              id='useRealApi'
              type='button'
              role='switch'
              aria-checked={useRealApi}
            />
          </ToggleWrapper>

          <ToggleWrapper>
            <ToggleContent>
              <ToggleLabel htmlFor='enableWarnings'>
                <Bell size={14} style={{ marginRight: '4px' }} />
                Enable Cost Warnings
              </ToggleLabel>
              <ToggleDescription>
                Receive notifications when approaching budget limits
              </ToggleDescription>
            </ToggleContent>
            <ToggleSwitch
              $active={enableWarnings}
              onClick={() => setEnableWarnings(!enableWarnings)}
              id='enableWarnings'
              type='button'
              role='switch'
              aria-checked={enableWarnings}
            />
          </ToggleWrapper>
        </div>
      </Card>

      <ActionsBar>
        <Button variant='secondary' onClick={handleReset}>
          <RefreshCw size={16} style={{ marginRight: '4px' }} />
          Reset
        </Button>
        <ActionButtons>
          <Button variant='secondary' onClick={() => navigate('/')}>
            <X size={16} style={{ marginRight: '4px' }} />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saved}>
            {saved ? (
              <>
                <Check size={16} style={{ marginRight: '4px' }} />
                Saved!
              </>
            ) : (
              <>
                <Save size={16} style={{ marginRight: '4px' }} />
                Save Settings
              </>
            )}
          </Button>
        </ActionButtons>
      </ActionsBar>

      <HelpCard>
        <HelpHeader>
          <HelpCircle size={18} />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
            Need Help?
          </h3>
        </HelpHeader>
        <HelpList>
          <HelpItem>
            <HelpItemTitle>
              <strong>Budget Limits:</strong> Set spending caps to prevent
              unexpected charges. The system will block reviews once limits are
              reached.
            </HelpItemTitle>
          </HelpItem>
          <HelpItem>
            <HelpItemTitle>
              <strong>API Calls:</strong> Limit the number of reviews per day to
              control usage patterns and prevent accidental bulk submissions.
            </HelpItemTitle>
          </HelpItem>
          <HelpItem>
            <HelpItemTitle>
              <strong>Real API:</strong> Use mock mode for testing and
              development. Enable real API only when ready for production use.
            </HelpItemTitle>
          </HelpItem>
          <HelpItem>
            <HelpItemText>
              For more information, visit our{' '}
              <HelpLink href='#docs'>documentation</HelpLink> or contact{' '}
              <HelpLink href='#support'>support</HelpLink>.
            </HelpItemText>
          </HelpItem>
        </HelpList>
      </HelpCard>
    </PageContainer>
  )
}
