import type { WheelEvent } from 'react'

import { useCallback, useRef } from 'react'

export const useAutomaticHorizontalWheelScroll = () => {
  const viewportRef = useRef<HTMLDivElement | null>(null)

  const onWheel = useCallback((e: WheelEvent<HTMLDivElement>) => {
    if (!viewportRef.current || e.deltaY === 0 || e.deltaX !== 0) return

    e.preventDefault()

    const delta = e.deltaY
    const currentPositon = viewportRef.current.scrollLeft
    const scrollWidth = viewportRef.current.scrollWidth

    const newPosition = Math.max(
      0,
      Math.min(scrollWidth, currentPositon + delta)
    )

    viewportRef.current.scrollLeft = newPosition
  }, [])

  return { viewportRef, onWheel }
}
