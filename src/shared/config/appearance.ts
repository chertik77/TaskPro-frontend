import { MotionGlobalConfig } from 'motion/react'

export const DEFAULT_THEME = 'light'
export const DEFAULT_FONT_SIZE = 'medium'
export const DEFAULT_ANIMATIONS = 'system'
export const THEMES = ['light', 'dark', 'system'] as const

export type Theme = (typeof THEMES)[number]

export type StoredAppearance = {
  theme: Theme
  accentColor: string
  fontSize: string
  animations: string
}

export const APPEARANCE_STORAGE_KEY = 'taskpro-appearance'

export const getStoredAppearance = (): Partial<StoredAppearance> => {
  const stored = localStorage.getItem(APPEARANCE_STORAGE_KEY)

  return stored ? JSON.parse(stored) : {}
}

export const setStoredAppearance = (appearance: StoredAppearance) => {
  localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(appearance))
}

export const resetStoredAppearance = () => {
  localStorage.removeItem(APPEARANCE_STORAGE_KEY)

  const root = document.documentElement

  root.dataset.theme = DEFAULT_THEME
  root.dataset.fontSize = DEFAULT_FONT_SIZE
  root.dataset.animations = DEFAULT_ANIMATIONS
  root.style.removeProperty('--accent-color')

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
