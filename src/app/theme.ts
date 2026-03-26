import type { TextStyle, ViewStyle } from 'react-native';

export const theme = {
  colors: {
    background: '#050913',
    backgroundRaised: '#0A1120',
    backgroundOrbGreen: 'rgba(87, 230, 167, 0.14)',
    backgroundOrbOrange: 'rgba(255, 155, 106, 0.12)',
    surface: '#0F1725',
    surfaceRaised: '#131D2E',
    surfaceStrong: '#182334',
    surfaceMuted: '#0B1220',
    textPrimary: '#F4F7FB',
    textSecondary: '#AAB6C9',
    textTertiary: '#6E7B91',
    border: 'rgba(255, 255, 255, 0.08)',
    borderStrong: 'rgba(255, 255, 255, 0.16)',
    accent: '#57E6A7',
    accentStrong: '#16C67A',
    accentSoft: 'rgba(87, 230, 167, 0.16)',
    accentGlow: 'rgba(87, 230, 167, 0.3)',
    cpu: '#FF9B6A',
    cpuSoft: 'rgba(255, 155, 106, 0.16)',
    warning: '#F4C56F',
    danger: '#FF6B7A',
    dangerSoft: 'rgba(255, 107, 122, 0.16)',
    successSoft: 'rgba(87, 230, 167, 0.16)',
    line: '#73F0B7',
    disabled: 'rgba(255, 255, 255, 0.04)',
    black: '#000000',
  },
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
  radii: {
    sm: 12,
    md: 18,
    lg: 24,
    xl: 30,
    pill: 999,
  },
  typography: {
    eyebrow: 12,
    label: 13,
    body: 15,
    title: 22,
    display: 34,
  },
} as const;

export const shadows: Record<'card' | 'glow' | 'floating', ViewStyle> = {
  card: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.32,
    shadowRadius: 28,
    elevation: 14,
  },
  glow: {
    shadowColor: theme.colors.accent,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },
  floating: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 8,
  },
};

export const textStyles: Record<
  'eyebrow' | 'sectionLabel' | 'heroTitle' | 'cardTitle' | 'body' | 'meta',
  TextStyle
> = {
  eyebrow: {
    color: theme.colors.textTertiary,
    fontSize: theme.typography.eyebrow,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  sectionLabel: {
    color: theme.colors.textTertiary,
    fontSize: theme.typography.label,
    fontWeight: '700',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: theme.colors.textPrimary,
    fontFamily: 'Avenir Next',
    fontSize: theme.typography.display,
    fontWeight: '700',
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    fontFamily: 'Avenir Next',
    fontSize: theme.typography.title,
    fontWeight: '700',
  },
  body: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
    lineHeight: 22,
  },
  meta: {
    color: theme.colors.textTertiary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
};
