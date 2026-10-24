import type { Appearance } from './appearance-bootstrap'

import {
  APPEARANCE_STORAGE_KEY,
  DEFAULT_APPEARANCE
} from './appearance-bootstrap'

export {
  applyAppearance,
  DEFAULT_APPEARANCE,
  type Appearance
} from './appearance-bootstrap'

export type Theme = Appearance['theme']

export const getStoredAppearance = (): Appearance => {
  const stored = JSON.parse(localStorage.getItem(APPEARANCE_STORAGE_KEY)!)

  return { ...DEFAULT_APPEARANCE, ...stored }
}

export const setStoredAppearance = (appearance: Appearance) =>
  localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(appearance))

export const clearStoredAppearance = () =>
  localStorage.removeItem(APPEARANCE_STORAGE_KEY)

export const resolveTheme = (
  theme: Theme = getStoredAppearance().theme
): Exclude<Theme, 'system'> => {
  if (theme !== 'system') return theme

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}
