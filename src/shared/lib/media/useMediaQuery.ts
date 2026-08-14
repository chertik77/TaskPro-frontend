import { useCallback, useSyncExternalStore } from 'react'

export const useMediaQuery = (mediaQuery: string) => {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const matchMedia = window.matchMedia(mediaQuery)

      matchMedia.addEventListener('change', onStoreChange)

      return () => matchMedia.removeEventListener('change', onStoreChange)
    },
    [mediaQuery]
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(mediaQuery).matches
  )
}
