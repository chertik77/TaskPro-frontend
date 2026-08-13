import { useEffect, useRef } from 'react'

import { PINCH_ZOOM_SENSITIVITY } from '../config/avatar'

export const usePinchZoom = (onZoom: (delta: number) => void) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const onZoomRef = useRef(onZoom)

  useEffect(() => {
    onZoomRef.current = onZoom
  }, [onZoom])

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    const handleWheel = (event: WheelEvent) => {
      if (!event.ctrlKey) return

      event.preventDefault()

      onZoomRef.current(-event.deltaY * PINCH_ZOOM_SENSITIVITY)
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => container.removeEventListener('wheel', handleWheel)
  }, [])

  return containerRef
}
