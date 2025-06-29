import { useEffect } from 'react'

import { useSessionStore } from '@/entities/session'

export const useMetaThemeColor = () => {
  const {
    user: { theme }
  } = useSessionStore()

  useEffect(() => {
    let themeColorMeta = document.querySelector(
      'meta[name="theme-color"]'
    ) as HTMLMetaElement

    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta')
      themeColorMeta.name = 'theme-color'
      document.head.appendChild(themeColorMeta)
    }

    themeColorMeta.content = theme === 'dark' ? '#161616' : '#fcfcfc'
  }, [theme])
}
