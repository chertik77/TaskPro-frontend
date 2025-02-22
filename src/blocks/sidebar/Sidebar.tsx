import * as ScrollArea from '@radix-ui/react-scroll-area'

import { LogoutBtn } from '@/features/auth/logout'
import { NeedHelpModalTrigger } from '@/features/user/need-help'

import { useTabletAndBelowMediaQuery } from '@/shared/hooks'
import { cn } from '@/shared/lib/cn'
import { useSidebarStore } from '@/shared/store'

import { SidebarBoardInfo } from './SidebarBoardInfo'
import { SidebarBoardList } from './SidebarBoardList'
import { SidebarLogo } from './SidebarLogo'
import { SidebarMenu } from './SidebarMenu'

export const Sidebar = () => {
  const isSidebarOpen = useSidebarStore(state => state.isSidebarOpen)

  const isTabletAndBelow = useTabletAndBelowMediaQuery('(max-width: 1439px)')

  return isTabletAndBelow ? (
    <SidebarMenu />
  ) : (
    <ScrollArea.Root
      type='scroll'
      className={cn(
        'row-span-2 hidden bg-white-soft violet:bg-brand-violet dark:bg-black-soft',
        isSidebarOpen && 'desktop:block'
      )}>
      <ScrollArea.Viewport className='h-dvh'>
        <aside className='flex h-dvh flex-col'>
          <SidebarLogo />
          <SidebarBoardInfo />
          <SidebarBoardList />
          <div className='mt-auto px-6 pb-6'>
            <NeedHelpModalTrigger />
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
