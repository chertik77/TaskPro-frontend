import { useEffect } from 'react'

import { useMe } from '@/entities/user'

import { DEFAULT_THEME } from '@/shared/config'

export const useThemeWithRootSync = () => {
  const { theme } = useMe()

  useEffect(() => {
    const root = window.document.documentElement

    root.className = theme

    return () => {
      root.className = DEFAULT_THEME
    }
  }, [theme])

  return { theme }
}
