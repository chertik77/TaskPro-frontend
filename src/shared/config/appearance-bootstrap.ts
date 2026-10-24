export const APPEARANCE_STORAGE_KEY = 'taskpro-appearance'

export type Appearance = {
  theme: 'light' | 'dark' | 'system'
  fontSize: 'small' | 'medium' | 'large'
  animations: 'system' | 'on' | 'off'
  accentColor?: string
}

export const DEFAULT_APPEARANCE: Appearance = {
  theme: 'light',
  fontSize: 'medium',
  animations: 'system'
}

export const applyAppearance = (appearance: Appearance) => {
  const root = document.documentElement

  const theme =
    appearance.theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : appearance.theme

  root.dataset.theme = theme
  root.dataset.fontSize = appearance.fontSize
  root.dataset.animations = appearance.animations
  root.style.colorScheme = theme

  if (appearance.accentColor) {
    root.style.setProperty('--accent-color', appearance.accentColor)
  } else {
    root.style.removeProperty('--accent-color')
  }
}
