import { useEffect } from 'react'

import { COLOR_MAP } from '@/entities/label'

import { DEFAULT_THEME, resolveTheme } from '@/shared/config'

import { resetSettings } from '../lib/resetSettings'
import { useSettings } from '../model/useSettings'

export const SettingsSync = () => {
  const settings = useSettings()

  const cursor = settings?.general?.usePointerCursors
  const theme = settings?.general?.theme
  const accentColor = COLOR_MAP[settings?.general?.accentColor ?? 'blue'].value

  useEffect(() => {
    if (!settings) return resetSettings()

    const root = document.documentElement

    root.dataset.pointerCursors = String(cursor ?? false)

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

    document.documentElement.style.setProperty('--accent-color', accentColor)
  }, [accentColor, cursor, settings, theme])

  return null
}
