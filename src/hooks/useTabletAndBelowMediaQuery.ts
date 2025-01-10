import { useLayoutEffect, useState } from 'react'

export const useTabletAndBelowMediaQuery = (
  mediaQuery: string = '(max-width: 1439px)'
) => {
  const getMatches = (query: string) => window.matchMedia(query).matches

  const [matches, setMatches] = useState(getMatches(mediaQuery))

  useLayoutEffect(() => {
    const matchMedia = window.matchMedia(mediaQuery)

    const handleChange = () => {
      setMatches(getMatches(mediaQuery))
    }

    matchMedia.addEventListener('change', handleChange)

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [mediaQuery])

  return matches
}
