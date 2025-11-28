// packages/ui/theme.ts
import { createTokens, createThemes, createAnimations } from 'tamagui'

const palette = {
  trueBlack: '#0A0A0A',
  concrete: '#1C1C1E',
  heshRed: '#FF3355',
  gnarlyOrange: '#FF6B35',
  bailBlue: '#0088FF',
  white: '#FFFFFF',
  offWhite: '#F2F2F7',
  grain: 'rgba(255,255,255,0.08)',
}

export const tokens = createTokens({
  color: {
    ...palette,
    primary: palette.heshRed,
    background: palette.trueBlack,
    surface: palette.concrete,
    text: palette.white,
    textSecondary: '$offWhite',
  },
  space: {
    0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 32, 8: 40, 9: 48,
    true: 16,
    ledge: 32,
    rail: 48,
    gap: 64,
  },
  size: {
    0: 0, 1: 4, 2: 8, 3: 12, 4: 16,
    true: 16,
    button: 56,
    card: 120,
    icon: 24,
  },
  radius: {
    0: 0, 1: 4, 2: 8, 3: 12, 4: 16,
    hubba: 16,
    ledge: 24,
    full: 9999,
  },
  zIndex: {
    0: 0, 1: 100, 2: 200, 3: 300, 4: 400, 5: 500,
    spot: 1000,
    modal: 2000,
    toast: 3000,
  },
})

const common = {
  background: tokens.color.background,
  color: tokens.color.text,
  borderColor: tokens.color.surface,
}

export const themes = createThemes({
  dark: {
    ...common,
    primary: tokens.color.heshRed,
    secondary: tokens.color.concrete,
  },
  light: {
    ...common,
    background: tokens.color.white,
    color: tokens.color.trueBlack,
    borderColor: '#E5E5E7',
    primary: tokens.color.heshRed,
    secondary: '#AEAEB2',
  },
})

export const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 300,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: 'spring',
    damping: 20,
    stiffness: 200,
  },
  pop: {
    type: 'timing',
    duration: 150,
  },
})
