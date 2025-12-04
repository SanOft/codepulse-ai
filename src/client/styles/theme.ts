/** @format */

export const theme = {
  colors: {
    // Primary colors (from tailwind: --primary: 239 84% 67%)
    primary: 'hsl(239, 84%, 67%)',
    primaryHover: 'hsl(239, 84%, 60%)',
    primaryLight: 'hsl(239, 84%, 75%)',
    primaryDark: 'hsl(239, 84%, 55%)',

    // Secondary colors (from tailwind: --secondary: 262 83% 58%)
    secondary: 'hsl(262, 83%, 58%)',
    secondaryHover: 'hsl(262, 83%, 52%)',

    // Accent colors (from tailwind: --accent: 189 94% 43%)
    accent: 'hsl(189, 94%, 43%)',
    accentHover: 'hsl(189, 94%, 38%)',

    // Background colors (from tailwind: --background: 222 47% 11%, --card: 222 47% 15%)
    background: 'hsl(222, 47%, 11%)',
    backgroundLight: 'hsl(222, 47%, 13%)',
    backgroundCard: 'hsl(222, 47%, 15%)',
    backgroundHover: 'hsl(222, 47%, 18%)',

    // Text colors (from tailwind: --foreground: 210 40% 98%, --muted-foreground: 215 20% 65%)
    textPrimary: 'hsl(210, 40%, 98%)',
    textSecondary: 'hsl(210, 40%, 90%)',
    textMuted: 'hsl(215, 20%, 65%)',
    textDisabled: 'hsl(215, 20%, 50%)',

    // Border colors (from tailwind: --border: 217 33% 17%)
    border: 'hsl(217, 33%, 17%)',
    borderLight: 'hsla(217, 33%, 17%, 0.3)',
    borderHover: 'hsla(217, 33%, 17%, 0.5)',

    // Status colors (from tailwind CSS variables)
    success: 'hsl(142, 76%, 36%)',
    successLight: 'hsl(142, 76%, 45%)',
    warning: 'hsl(43, 96%, 56%)',
    warningLight: 'hsl(43, 96%, 65%)',
    error: 'hsl(0, 84%, 60%)',
    errorLight: 'hsl(0, 84%, 70%)',
    info: 'hsl(217, 91%, 60%)',
    infoLight: 'hsl(217, 91%, 70%)',

    // Severity colors (from tailwind: --severity-*)
    critical: 'hsl(0, 84%, 60%)',
    criticalBg: 'hsla(0, 84%, 60%, 0.1)',
    criticalBorder: 'hsla(0, 84%, 60%, 0.2)',

    high: 'hsl(25, 95%, 53%)',
    highBg: 'hsla(25, 95%, 53%, 0.1)',
    highBorder: 'hsla(25, 95%, 53%, 0.2)',

    medium: 'hsl(43, 96%, 56%)',
    mediumBg: 'hsla(43, 96%, 56%, 0.1)',
    mediumBorder: 'hsla(43, 96%, 56%, 0.2)',

    low: 'hsl(217, 91%, 60%)',
    lowBg: 'hsla(217, 91%, 60%, 0.1)',
    lowBorder: 'hsla(217, 91%, 60%, 0.2)',

    // Muted (from tailwind: --muted: 217 33% 17%)
    muted: 'hsl(217, 33%, 17%)',
  },

  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    xxl: '3rem', // 48px
    xxxxl: '4rem', // 64px
  },

  borderRadius: {
    sm: 'calc(0.5rem - 4px)', // calc(var(--radius) - 4px)
    md: 'calc(0.5rem - 2px)', // calc(var(--radius) - 2px)
    lg: '0.5rem', // var(--radius)
    xl: '0.75rem',
    xxl: '24px',
    full: '9999px',
  },

  fontSize: {
    xs: '10px',
    sm: '12px',
    md: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    soft: '0 2px 8px rgba(0, 0, 0, 0.15)',
    card: '0 4px 16px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(99, 102, 241, 0.3)',
  },

  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
  },

  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
}

export type Theme = typeof theme
