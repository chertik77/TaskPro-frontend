import { useEffect } from 'react'

import { useSettings } from '@/entities/setting/@x/user'

import { resolveTheme } from '@/shared/config'

const THEME_COLORS = { light: '#fcfcfc', dark: '#161616' }

export const useMetaThemeColor = () => {
  const { data: theme } = useSettings(select => select.general.theme)

  useEffect(() => {
    let themeColorMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    )

    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta')
      themeColorMeta.name = 'theme-color'
      document.head.appendChild(themeColorMeta)
    }

    const meta = themeColorMeta

    const apply = () => {
      meta.content = THEME_COLORS[resolveTheme(theme)]
    }

    apply()

    if (theme !== 'system') return

    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    mq.addEventListener('change', apply)

    return () => mq.removeEventListener('change', apply)
  }, [theme])
}
