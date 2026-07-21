import { useEffect } from 'react'

import { useSettings } from '@/entities/setting/@x/user'

export const useMetaThemeColor = () => {
  const { data: theme } = useSettings(select => select.general.theme)

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
