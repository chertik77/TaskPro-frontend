export const APPEARANCE_STORAGE_KEY = 'taskpro-appearance'

export const DEFAULT_THEME = 'light'
export const DEFAULT_FONT_SIZE = 'medium'
export const DEFAULT_ANIMATIONS = 'system'

export type AppearanceDefaults = {
  theme: string
  fontSize: string
  animations: string
}

export const APPEARANCE_DEFAULTS: AppearanceDefaults = {
  theme: DEFAULT_THEME,
  fontSize: DEFAULT_FONT_SIZE,
  animations: DEFAULT_ANIMATIONS
}

type StoredAppearanceValues = Partial<
  Record<'theme' | 'fontSize' | 'animations' | 'accentColor', string>
>

export const applyStoredAppearance = (
  storageKey: string,
  defaults: AppearanceDefaults
) => {
  const root = document.documentElement

  let stored: StoredAppearanceValues

  try {
    stored = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}
  } catch {
    stored = {}
  }

  let theme = stored.theme || defaults.theme

  if (theme === 'system') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  root.dataset.theme = theme
  root.dataset.fontSize = stored.fontSize || defaults.fontSize
  root.dataset.animations = stored.animations || defaults.animations

  if (stored.accentColor) {
    root.style.setProperty('--accent-color', stored.accentColor)
  } else {
    root.style.removeProperty('--accent-color')
  }
}
