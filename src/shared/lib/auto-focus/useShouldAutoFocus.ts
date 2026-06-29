import { useEffect, useState } from 'react'

const media = window.matchMedia('(hover: hover) and (pointer: fine)')

export const useShouldAutoFocus = () => {
  const [shouldAutoFocus, setShouldAutoFocus] = useState(media.matches)

  useEffect(() => {
    const update = () => setShouldAutoFocus(media.matches)

    media.addEventListener('change', update)

    return () => media.removeEventListener('change', update)
  }, [])

  return shouldAutoFocus
}
