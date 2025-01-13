import * as ScrollArea from '@radix-ui/react-scroll-area'

import { LogoutBtn } from 'features/auth/components'
import { BoardsList, MyBoardsInfo } from 'features/kanban/board/components'
import { UserSupport } from 'features/user/components'

import { Scrollbar } from 'components/ui'

import { cn } from 'lib'

import { useSidebarStore } from '../sidebar.store'
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
          <div>
            <SidebarLogo />
            <MyBoardsInfo />
            <BoardsList />
          </div>
          <div className='mt-auto px-6 pb-6'>
            <UserSupport />
            <LogoutBtn />
          </div>
        </aside>
      </ScrollArea.Viewport>
      <Scrollbar scrollBarClassName='w-1' />
    </ScrollArea.Root>
  )
}
