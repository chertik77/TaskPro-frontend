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
  const background = bgData.find((bg) => bg.id === id)
  if (!background) {
    return null
  }
  // if(background.id === "default"){
  //   const srcset = `${background.icon.light?.['@1x']}`
  //   console.log(srcset);
  //   return srcset
  // }

  const srcset = `${background.mobile ? `${background.mobile['@1x']}, ${background.mobile['@2x']}` : ''},
  ${background.tablet ? `${background.tablet['@1x']}, ${background.tablet['@2x']}` : ''},
  ${background.desktop ? `${background.desktop['@1x']} , ${background.desktop['@2x']}` : ''}`

  // const { mobile, tablet, desktop } = background

  // const mobileSrcset = mobile
  //   ? `url(${mobile['@1x']}) 1x, url(${mobile['@2x']}) 2x`
  //   : ''
  // const tabletSrcset = tablet
  //   ? `url(${tablet['@1x']}) 1x, url(${tablet['@2x']}) 2x`
  //   : ''
  // const desktopSrcset = desktop
  //   ? `url(${desktop['@1x']}) 1x, url(${desktop['@2x']}) 2x`
  //   : ''

  // const srcset = `${mobileSrcset},${tabletSrcset},${desktopSrcset}`

  return { srcset }
}
