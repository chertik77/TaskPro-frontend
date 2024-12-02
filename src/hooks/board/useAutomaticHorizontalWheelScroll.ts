import type { WheelEvent } from 'react'

import { useCallback, useEffect, useRef } from 'react'

export const useAutomaticHorizontalWheelScroll = () => {
  const viewportRef = useRef<HTMLDivElement | null>(null)

  const onWheel = useCallback((e: WheelEvent<HTMLDivElement>) => {
    if (
      !viewportRef.current ||
      e.deltaY === 0 ||
      e.deltaX !== 0 ||
      e.deltaZ !== 0
    )
      return

    e.preventDefault()
    e.stopPropagation()

    const delta = e.deltaY
    const currentPositon = viewportRef.current.scrollLeft
    const scrollWidth = viewportRef.current.scrollWidth

    const newPosition = Math.max(
      0,
      Math.min(scrollWidth, currentPositon + delta)
    )

    viewportRef.current.scrollLeft = newPosition
  }, [])

  useEffect(() => {
    viewportRef.current?.addEventListener('wheel', e => {
      onWheel(e as unknown as WheelEvent<HTMLDivElement>)
    })
  }, [onWheel])

  return { viewportRef, onWheel }
}
