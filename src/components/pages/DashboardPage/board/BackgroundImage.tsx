import { useImageBg } from 'hooks/index'
import { forwardRef } from 'react'

interface BackgroundImageProps {
  id: string
}

export const BackgroundImage = forwardRef<HTMLDivElement, BackgroundImageProps>(
  ({ id }, ref) => {
    const { srcset } = useImageBg(id)

    if (!srcset) {
      return null
    }

    console.log('hello')

    return <div ref={ref} dataSrcset={srcset} />
  }
)
