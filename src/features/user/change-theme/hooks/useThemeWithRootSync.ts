import { useEffect } from 'react'

import { useSessionStore } from '@/entities/session'

import { DEFAULT_THEME } from '@/shared/config'

export const useThemeWithRootSync = () => {
  const {
    user: { theme }
  } = useSessionStore()

  useEffect(() => {
    const root = window.document.documentElement

    root.className = theme

    return () => {
      root.className = DEFAULT_THEME
    }
  }, [theme])

  return { theme }
}
