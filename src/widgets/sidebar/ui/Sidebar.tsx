import { ScrollArea } from '@base-ui/react/scroll-area'
import * as m from 'motion/react-m'

import { NeedHelpDialog } from '@/features/user/need-help'

import { useMediaQuery } from '@/shared/lib'
import { useSidebarStore } from '@/shared/store'

import { useSidebarToggleShortcut } from '../lib/useSidebarToggleShortcut'
import { SidebarBoardCreationSection } from './SidebarBoardCreationSection'
import { SidebarBoardList } from './SidebarBoardList'
import { SidebarLogo } from './SidebarLogo'
import { SidebarLogoutBtn } from './SidebarLogoutBtn'
import { SidebarMobileMenu } from './SidebarMobileMenu'

export const Sidebar = () => {
  const { isOpen } = useSidebarStore()

  const isTabletAndBelow = useMediaQuery('(max-width: 1439px)')

  useSidebarToggleShortcut()

  return isTabletAndBelow ? (
    <SidebarMobileMenu />
  ) : (
    <m.div
      className='row-span-2 overflow-hidden'
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.15 }}
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
      <ScrollArea.Root className='dark:bg-black-soft w-65 bg-white'>
        <ScrollArea.Viewport className='h-dvh'>
          <ScrollArea.Content>
            <aside className='flex h-dvh flex-col'>
              <SidebarLogo />
              <SidebarBoardCreationSection />
              <SidebarBoardList />
              <div className='mt-auto px-6 pb-6'>
                <NeedHelpDialog />
                <SidebarLogoutBtn />
              </div>
            </aside>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className='pointer-events-none w-1 bg-transparent opacity-0
            transition-opacity duration-200 data-scrolling:pointer-events-auto
            data-scrolling:opacity-100 data-scrolling:duration-initial'>
          <ScrollArea.Thumb
            className='rounded-[26px] bg-black/30 dark:bg-white/60'
          />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </m.div>
  )
}
