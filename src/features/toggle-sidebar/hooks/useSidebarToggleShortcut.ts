import { useHotkeys } from 'react-hotkeys-hook'

import { useTabletAndBelowMediaQuery } from '@/shared/hooks'
import { useSidebarStore } from '@/shared/store'

export const useSidebarToggleShortcut = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore()

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  useHotkeys('mod+o', () => setIsSidebarOpen(!isSidebarOpen), {
    preventDefault: true,
    ignoreEventWhen: () => isTabletAndBelow
  })
}
