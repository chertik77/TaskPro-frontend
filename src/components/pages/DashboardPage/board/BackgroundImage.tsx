import { useImageBg } from 'hooks'
import { forwardRef } from 'react'

interface BackgroundImageProps {
  id?: string
}

export const BackgroundImage = forwardRef<
  HTMLImageElement,
  BackgroundImageProps
>(({ id }, ref) => {
  const { srcset, alt } = useImageBg(id as string)

  if (!srcset) {
    return null
  }
  console.log(srcset)
  return <img ref={ref} srcSet={srcset} alt={alt} />
})
