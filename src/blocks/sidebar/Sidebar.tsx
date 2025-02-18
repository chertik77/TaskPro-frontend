import * as ScrollArea from '@radix-ui/react-scroll-area'

import { LogoutBtn } from '@/features/auth/logout'
import { NeedHelpModalTrigger } from '@/features/need-help'

import { Scrollbar } from '@/shared/components/ui'
import { cn } from '@/shared/lib/cn'
import { useSidebarStore } from '@/shared/store'

import { SidebarBoardInfo } from './SidebarBoardInfo'
import { SidebarBoardList } from './SidebarBoardList'
import { SidebarLogo } from './SidebarLogo'

export const Sidebar = () => {
  const isSidebarOpen = useSidebarStore(state => state.isSidebarOpen)

  return (
    <ScrollArea.Root
      type='scroll'
      className={cn(
        `row-span-2 hidden bg-white-primary violet:bg-brand-secondary
        dark:bg-black-secondary`,
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
      <Scrollbar scrollBarClassName='w-1' />
    </ScrollArea.Root>
  )
}
