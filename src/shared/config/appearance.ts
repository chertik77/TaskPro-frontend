import type { Appearance } from './appearance-bootstrap'

import { MotionGlobalConfig } from 'motion/react'

import {
  APPEARANCE_STORAGE_KEY,
  applyAppearance,
  DEFAULT_APPEARANCE
} from './appearance-bootstrap'

export {
  applyAppearance,
  DEFAULT_APPEARANCE,
  type Appearance
} from './appearance-bootstrap'

export type Theme = Appearance['theme']

type StoredAppearance = Partial<Appearance> & { active?: boolean }

const readStoredAppearance = (): StoredAppearance | null =>
  JSON.parse(localStorage.getItem(APPEARANCE_STORAGE_KEY)!)

const writeStoredAppearance = (appearance: StoredAppearance) =>
  localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(appearance))

export const getStoredAppearance = (): Appearance => ({
  ...DEFAULT_APPEARANCE,
  ...readStoredAppearance()
})

export const isStoredAppearanceActive = () => {
  const stored = readStoredAppearance()

  return !!stored && stored.active !== false
}

export const setStoredAppearance = (appearance: Appearance) =>
  writeStoredAppearance({ ...appearance, active: true })

export const setStoredAppearanceActive = (active: boolean) =>
  writeStoredAppearance({ ...readStoredAppearance(), active })

export const resetAppearance = () => {
  setStoredAppearanceActive(false)
  applyAppearance(DEFAULT_APPEARANCE)
  MotionGlobalConfig.skipAnimations = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
}

export const resolveTheme = (
  theme: Theme = getStoredAppearance().theme
): Exclude<Theme, 'system'> => {
  if (theme !== 'system') return theme

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}
