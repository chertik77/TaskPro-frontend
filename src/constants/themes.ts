export const themes = ['light', 'dark', 'violet'] as const

export type Theme = (typeof themes)[number]
