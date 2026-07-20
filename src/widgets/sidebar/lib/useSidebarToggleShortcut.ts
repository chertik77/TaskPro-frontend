import { useEffect } from 'react'

import { useMediaQuery } from '@/shared/lib'
import { useSidebarStore } from '@/shared/store'

const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

export const useSidebarToggleShortcut = () => {
  const { setIsOpen } = useSidebarStore()

  const isTabletAndBelow = useMediaQuery('(max-width: 1025px)')

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
