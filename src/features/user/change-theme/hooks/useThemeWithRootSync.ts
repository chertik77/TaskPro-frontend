import { useEffect } from 'react'

import { DEFAULT_THEME } from '@/shared/constants'
import { useAuthStore } from '@/shared/store'

export const useThemeWithRootSync = () => {
  const {
    user: { theme }
  } = useAuthStore()

  useEffect(() => {
    const root = window.document.documentElement

    root.className = theme

    return () => {
      root.className = DEFAULT_THEME
    }
  }, [theme])

  return { theme }
}
