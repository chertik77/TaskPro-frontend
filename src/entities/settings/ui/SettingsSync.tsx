import { useEffect } from 'react'

import { DEFAULT_THEME, resolveTheme } from '@/shared/config'

import { useSettings } from '../model/useSettings'

export const SettingsSync = () => {
  const settings = useSettings()

  const cursor = settings?.general?.usePointerCursors
  const theme = settings?.general?.theme

  useEffect(() => {
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
  }, [cursor, settings, theme])

  return null
}
