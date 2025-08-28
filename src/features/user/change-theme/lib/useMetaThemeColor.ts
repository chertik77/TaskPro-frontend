import { useEffect } from 'react'

import { useMe } from '@/entities/user'

export const useMetaThemeColor = () => {
  const { theme } = useMe()

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
