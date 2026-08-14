import { MotionGlobalConfig } from 'motion/react'

import {
  APPEARANCE_DEFAULTS,
  APPEARANCE_STORAGE_KEY,
  applyStoredAppearance,
  DEFAULT_THEME
} from './appearance-bootstrap'

export {
  APPEARANCE_STORAGE_KEY,
  DEFAULT_ANIMATIONS,
  DEFAULT_FONT_SIZE,
  DEFAULT_THEME
} from './appearance-bootstrap'

export const THEMES = ['light', 'dark', 'system'] as const

export type Theme = (typeof THEMES)[number]

export type StoredAppearance = {
  theme: Theme
  accentColor: string
  fontSize: string
  animations: string
}

export const getStoredAppearance = (): Partial<StoredAppearance> => {
  const stored = localStorage.getItem(APPEARANCE_STORAGE_KEY)

  return stored ? JSON.parse(stored) : {}
}

export const setStoredAppearance = (appearance: StoredAppearance) => {
  localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(appearance))
}

export const resetStoredAppearance = () => {
  localStorage.removeItem(APPEARANCE_STORAGE_KEY)

  applyStoredAppearance(APPEARANCE_STORAGE_KEY, APPEARANCE_DEFAULTS)

  MotionGlobalConfig.skipAnimations = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
}

export const getStoredTheme = (): Theme => {
  const { theme } = getStoredAppearance()

  return (THEMES as readonly string[]).includes(theme ?? '')
    ? (theme as Theme)
    : DEFAULT_THEME
}

export const resolveTheme = (
  theme: Theme | undefined
): Exclude<Theme, 'system'> => {
  const value = theme ?? getStoredTheme()

  if (value !== 'system') return value

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}
