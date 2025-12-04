/** @format */

import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Code2, Plus } from 'lucide-react'
import { useReview } from '../../hooks/useReview'

const HeaderContainer = styled.header`
  /* From tailwind: sticky top-0 z-50 w-full border-b transition-all duration-300 bg-background/80 backdrop-blur-sm */
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  height: 64px; /* 64px header height */
  border-bottom: 1px solid hsl(217, 33%, 17%); /* hsl(var(--border)) */
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  background-color: hsla(222, 47%, 11%, 0.8); /* hsl(var(--background) / .8) */
  backdrop-filter: blur(4px); /* backdrop-blur-sm */
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
`

const HeaderContent = styled.div`
  /* From HTML: container mx-auto px-4 */
  max-width: 1400px;
  margin: 0 auto;
  padding-left: 1rem; /* px-4 */
  padding-right: 1rem; /* px-4 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%; /* Full height of header container */
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`

const LogoIcon = styled.div`
  /* From HTML: relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent p-[2px] group-hover:scale-105 transition-transform */
  position: relative;
  width: 2.5rem; /* w-10 */
  height: 2.5rem; /* h-10 */
  border-radius: 0.5rem; /* rounded-lg */
  background: linear-gradient(
    to bottom right,
    hsl(239, 84%, 67%),
    /* from-primary */ hsl(262, 83%, 58%),
    /* via-secondary */ hsl(189, 94%, 43%) /* to-accent */
  );
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
`

const Logo = styled(Link)`
  /* From HTML: flex items-center gap-3 group */
  display: flex;
  align-items: center;
  gap: 0.75rem; /* gap-3 */
  text-decoration: none;

  /* Group hover effect: group-hover:scale-105 on LogoIcon */
  &:hover ${LogoIcon} {
    transform: scale(1.05);
  }
`

const LogoIconInner = styled.div`
  /* Inner div: w-full h-full rounded-lg bg-background */
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background-color: hsl(222, 47%, 11%); /* bg-background */
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(239, 84%, 67%); /* text-primary */
`

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`

const LogoTitle = styled.h1`
  /* From HTML: text-lg font-bold gradient-text */
  font-size: 1.125rem; /* text-lg */
  font-weight: 700; /* font-bold */
  /* gradient-text from tailwind-build.css: primary -> secondary -> accent */
  background-image: linear-gradient(
    to right,
    hsl(239, 84%, 67%),
    /* primary */ hsl(262, 83%, 58%),
    /* secondary */ hsl(189, 94%, 43%) /* accent */
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`

const LogoSubtitle = styled.span`
  /* From HTML: text-xs text-muted-foreground */
  font-size: 0.75rem; /* text-xs */
  color: hsl(215, 20%, 65%); /* text-muted-foreground */
`

const Nav = styled.nav`
  /* From HTML: hidden md:flex items-center gap-6 */
  display: none; /* hidden by default */
  align-items: center;
  gap: 1.5rem; /* gap-6 */
  flex: 1;
  justify-content: center;

  @media (min-width: 768px) {
    display: flex; /* md:flex */
  }
`

const NavLink = styled(Link)<{ $active: boolean }>`
  /* From HTML: text-sm font-medium transition-colors hover:text-primary */
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  transition-property: color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  text-decoration: none;
  color: ${({ $active }) =>
    $active
      ? 'hsl(239, 84%, 67%)' /* text-primary */
      : 'hsl(215, 20%, 65%)'}; /* text-muted-foreground */

  &:hover {
    color: hsl(239, 84%, 67%); /* hover:text-primary */
  }
`

const navItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/budget', label: 'Budget' },
  { path: '/metrics', label: 'Metrics' },
]

const HeaderRight = styled.div`
  /* From HTML: hidden md:flex items-center gap-4 */
  display: none; /* hidden by default */
  align-items: center;
  gap: 1rem; /* gap-4 */

  @media (min-width: 768px) {
    display: flex; /* md:flex */
  }
`

const BudgetStatus = styled.div`
  /* From HTML: inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold text-foreground text-xs */
  display: inline-flex;
  align-items: center;
  border-radius: calc(0.5rem - 2px); /* rounded-md */
  border: 1px solid hsl(217, 33%, 17%); /* border */
  padding: 0.125rem 0.625rem; /* px-2.5 py-0.5 */
  font-weight: 600; /* font-semibold */
  font-size: 0.75rem; /* text-xs */
  color: hsl(210, 40%, 98%); /* text-foreground */
`

const NewReviewButton = styled.button`
  /* From HTML: border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 2rem; /* h-8 */
  padding: 0 0.75rem; /* px-3 */
  border: 1px solid hsl(217, 33%, 17%); /* border-input */
  background-color: transparent; /* bg-transparent */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
  border-radius: calc(0.5rem - 2px); /* rounded-md */
  font-size: 0.75rem; /* text-xs */
  font-weight: 500; /* font-medium */
  color: hsl(210, 40%, 98%); /* text-foreground */
  cursor: pointer;
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  white-space: nowrap;

  &:hover {
    background-color: hsl(189, 94%, 43%); /* hover:bg-accent */
    color: hsl(210, 40%, 98%); /* hover:text-accent-foreground */
  }
`

export const Header: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { metrics } = useReview()

  const dailyLimit = 0.5
  const dailyCost = metrics?.totalCost
    ? Math.min(metrics.totalCost * 0.24, dailyLimit)
    : 0.12 // Current daily spending
  const budgetDisplay = `$${dailyCost.toFixed(2)}/$${dailyLimit.toFixed(2)}`

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to='/'>
          <LogoIcon>
            <LogoIconInner>
              <Code2 size={20} />
            </LogoIconInner>
          </LogoIcon>
          <LogoText>
            <LogoTitle>CodePulse AI</LogoTitle>
            <LogoSubtitle>Code Intelligence Platform</LogoSubtitle>
          </LogoText>
        </Logo>
        <Nav>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              $active={location.pathname === item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </Nav>
        <HeaderRight>
          <BudgetStatus>{budgetDisplay}</BudgetStatus>
          <NewReviewButton onClick={() => navigate('/review')}>
            <Plus size={16} />
            New Review
          </NewReviewButton>
        </HeaderRight>
      </HeaderContent>
    </HeaderContainer>
  )
}
