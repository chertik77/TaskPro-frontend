export const DEFAULT_THEME = 'light'
export const THEMES = ['light', 'dark', 'system'] as const

export const THEME_STORAGE_KEY = 'taskpro-theme'

export const getStoredTheme = (): Theme => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)

  return (THEMES as readonly string[]).includes(stored ?? '')
    ? (stored as Theme)
    : DEFAULT_THEME
}

export const setStoredTheme = (theme: Theme) => {
  localStorage.setItem(THEME_STORAGE_KEY, theme)
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

export type Theme = (typeof THEMES)[number]
