import { useEffect } from 'react'

import { useTabletAndBelowMediaQuery } from '@/shared/hooks'
import { useSidebarStore } from '@/shared/store'

const SIDEBAR_KEYBOARD_SHORTCUT = 'o'

export const useSidebarToggleShortcut = () => {
  const { setIsOpen } = useSidebarStore()

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (e.metaKey || e.ctrlKey) &&
        !isTabletAndBelow
      ) {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isTabletAndBelow, setIsOpen])
}
