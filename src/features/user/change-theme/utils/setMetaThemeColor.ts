import type { Theme } from '@/shared/constants'

export const setMetaThemeColor = (theme: Theme) => {
  let themeColorMeta = document.querySelector(
    'meta[name="theme-color"]'
  ) as HTMLMetaElement

  if (!themeColorMeta) {
    themeColorMeta = document.createElement('meta')
    themeColorMeta.name = 'theme-color'
    document.head.appendChild(themeColorMeta)
  }

  themeColorMeta.content = theme === 'dark' ? '#161616' : '#fcfcfc'
}
