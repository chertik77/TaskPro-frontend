export const DEFAULT_THEME = 'light'

export const THEMES = ['light', 'dark', 'violet'] as const

export type Theme = (typeof THEMES)[number]
