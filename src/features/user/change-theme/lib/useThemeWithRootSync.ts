import { useEffect } from 'react'

import { useMe } from '@/entities/user'

import { DEFAULT_THEME } from '@/shared/config'

export const useThemeWithRootSync = () => {
  const user = useMe()
  const theme = user?.theme ?? DEFAULT_THEME

  useEffect(() => {
    const root = window.document.documentElement

    root.className = theme

    return () => {
      root.className = DEFAULT_THEME
    }
  }, [theme])

  return { theme }
}
