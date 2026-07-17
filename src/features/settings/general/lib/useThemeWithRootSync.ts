import { useEffect } from 'react'

import { useSettings } from '@/entities/settings'

import { DEFAULT_THEME, resolveTheme } from '@/shared/config'

export const useThemeWithRootSync = () => {
  const settings = useSettings()
  const theme = settings?.general?.theme ?? DEFAULT_THEME

  useEffect(() => {
    const root = window.document.documentElement

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      const applySystemTheme = () => {
        root.className = resolveTheme(theme)
      }

      applySystemTheme()
      mediaQuery.addEventListener('change', applySystemTheme)

      return () => {
        mediaQuery.removeEventListener('change', applySystemTheme)
        root.className = DEFAULT_THEME
      }
    }

    root.className = resolveTheme(theme)

    return () => {
      root.className = DEFAULT_THEME
    }
  }, [theme])

  return { theme }
}
