import * as ScrollArea from '@radix-ui/react-scroll-area'

import { LogoutBtn } from '@/features/auth/logout'
import { NeedHelpDialog } from '@/features/user/need-help'

import { useTabletAndBelowMediaQuery } from '@/shared/hooks'
import { cn } from '@/shared/lib/cn'
import { useSidebarStore } from '@/shared/store'

import { SidebarBoardInfo } from './SidebarBoardInfo'
import { SidebarBoardList } from './SidebarBoardList'
import { SidebarLogo } from './SidebarLogo'
import { SidebarMobileMenu } from './SidebarMobileMenu'

export const Sidebar = () => {
  const isSidebarOpen = useSidebarStore(state => state.isOpen)

  const isTabletAndBelow = useTabletAndBelowMediaQuery('(max-width: 1439px)')

  return isTabletAndBelow ? (
    <SidebarMobileMenu />
  ) : (
    <ScrollArea.Root
      type='scroll'
      className={cn(
        'violet:bg-brand-violet dark:bg-black-soft row-span-2 hidden bg-white',
        isSidebarOpen && 'desktop:block'
      )}>
      <ScrollArea.Viewport className='h-dvh'>
        <aside className='flex h-dvh flex-col'>
          <SidebarLogo />
          <SidebarBoardInfo />
          <SidebarBoardList />
          <div className='mt-auto px-6 pb-6'>
            <NeedHelpDialog />
            <LogoutBtn />
          </div>
        </aside>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className='w-1 bg-transparent'>
        <ScrollArea.Thumb className='rounded-[26px] bg-white/60' />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
