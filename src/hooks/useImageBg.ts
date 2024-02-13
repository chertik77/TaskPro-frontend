import bgData from 'lib/json/board-bg-images.json'

interface Screen {
  '@1x': string
  '@2x': string
}

interface BackgroundData {
  id: string
  icon: Screen
  mobile: Screen
  tablet: Screen
  desktop: Screen
}

export const useImageBg = (id: string) => {
  const background = bgData.find((bg: BackgroundData) => bg.id === id)

  const srcset = `
    ${background?.mobile ? `${background.mobile['@1x']} 375w, ${background.mobile['@2x']} 750w,` : ''}
    ${background?.tablet ? `${background.tablet['@1x']} 768w, ${background.tablet['@2x']} 1536w,` : ''}
    ${background?.desktop ? `${background.desktop['@1x']} 1180w, ${background.desktop['@2x']} 2360w` : ''}
  `

  const alt = `Image ${id}`

  return { srcset, alt }
}
