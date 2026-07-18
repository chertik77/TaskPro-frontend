import { useEffect } from 'react'
import { MotionGlobalConfig } from 'motion/react'

import { ACCENT_COLOR_MAP } from '@/entities/user/@x/setting'

import { DEFAULT_THEME, resolveTheme } from '@/shared/config'

import { resetSettings } from '../lib/resetSettings'
import { useSettings } from '../model/useSettings'

export const SettingsSync = () => {
  const generalSettings = useSettings(settings => settings.general)

  const cursor = generalSettings?.usePointerCursors
  const theme = generalSettings?.theme
  const animations = generalSettings?.enableAnimations
  const accentColor = ACCENT_COLOR_MAP[generalSettings?.accentColor ?? 'blue']

  useEffect(() => {
    if (!generalSettings) return resetSettings()

    const root = document.documentElement

    // Pointer cursors
    root.dataset.pointerCursors = String(cursor ?? false)

    // Theme
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      const applySystemTheme = () => {
        root.dataset.theme = resolveTheme(theme)
      }

      applySystemTheme()
      mediaQuery.addEventListener('change', applySystemTheme)

      return () => {
        mediaQuery.removeEventListener('change', applySystemTheme)
        root.dataset.theme = DEFAULT_THEME
      }
    }

    root.dataset.theme = String(theme ?? 'light')

    // Animations
    if (!animations) MotionGlobalConfig.skipAnimations = true
    root.dataset.animations = String(animations ?? true)

    // Accent color
    document.documentElement.style.setProperty('--accent-color', accentColor)
  }, [accentColor, animations, cursor, generalSettings, theme])

  return null
}
