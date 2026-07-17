import { useEffect } from 'react'

import { useSettings } from '@/entities/settings'

export const useMetaThemeColor = () => {
  const settings = useSettings()

  useEffect(() => {
    let themeColorMeta = document.querySelector(
      'meta[name="theme-color"]'
    ) as HTMLMetaElement

    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta')
      themeColorMeta.name = 'theme-color'
      document.head.appendChild(themeColorMeta)
    }

    themeColorMeta.content =
      settings?.general?.theme === 'dark' ? '#161616' : '#fcfcfc'
  }, [settings?.general?.theme])
}
