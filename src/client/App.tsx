/** @format */

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Toaster } from 'sonner'
import { theme, Theme } from './styles/theme'
import { GlobalStyles } from './styles/GlobalStyles'
import { Layout } from './components/layout'
import { ReviewProvider } from './context/ReviewContext'
import {
  Dashboard,
  ReviewPage,
  ResultsPage,
  BudgetPage,
  MetricsPage,
  SettingsPage,
  CostHistoryChartPage,
  ApiCallLogPage,
  IntegrationPage,
  PullRequestsPage,
  PullRequestReviewPage,
  IssueDetailPage,
  RecommendationsPage,
} from './pages'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles theme={theme as Theme} />
      <Toaster
        richColors
        position='top-right'
        expand={true}
        closeButton
        toastOptions={{
          style: {
            background: theme.colors.backgroundCard,
            border: `1px solid ${theme.colors.border}`,
            color: theme.colors.textPrimary,
          },
          classNames: {
            toast: 'sonner-toast-custom',
            success: 'sonner-success-custom',
            error: 'sonner-error-custom',
            warning: 'sonner-warning-custom',
            info: 'sonner-info-custom',
          },
        }}
      />
      <BrowserRouter>
        <ReviewProvider>
          <Layout>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/review' element={<ReviewPage />} />
              <Route path='/results' element={<ResultsPage />} />
              <Route path='/budget' element={<BudgetPage />} />
              <Route path='/metrics' element={<MetricsPage />} />
              <Route path='/cost-history-chart' element={<CostHistoryChartPage />} />
              <Route path='/api-call-log' element={<ApiCallLogPage />} />
              <Route path='/settings' element={<SettingsPage />} />
              <Route path='/integrations/:provider' element={<IntegrationPage />} />
              <Route path='/pull-requests' element={<PullRequestsPage />} />
              <Route path='/pull-requests/:owner/:repo/:number' element={<PullRequestReviewPage />} />
              <Route path='/issue/:id' element={<IssueDetailPage />} />
              <Route path='/recommendations' element={<RecommendationsPage />} />
            </Routes>
          </Layout>
        </ReviewProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
