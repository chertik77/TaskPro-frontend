import { useEffect } from 'react'

import { useMediaQuery } from '@/shared/lib'
import { useSidebarStore } from '@/shared/model'

const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

export const useSidebarToggleShortcut = () => {
  const { setIsOpen, setIsOpenMobile } = useSidebarStore()

  const isTabletAndBelow = useMediaQuery('(max-width: 1439px)')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()

        const toggle = isTabletAndBelow ? setIsOpenMobile : setIsOpen

        toggle(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isTabletAndBelow, setIsOpen, setIsOpenMobile])
}
