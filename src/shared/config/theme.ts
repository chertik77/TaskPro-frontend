export const DEFAULT_THEME = 'light'
export const THEMES = ['light', 'dark', 'system'] as const

export const resolveTheme = (
  theme: Theme | undefined
): Exclude<Theme, 'system'> => {
  if (!theme) return DEFAULT_THEME

  if (theme !== 'system') return theme

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export type Theme = (typeof THEMES)[number]
