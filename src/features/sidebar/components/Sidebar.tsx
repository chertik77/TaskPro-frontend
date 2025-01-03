import * as ScrollArea from '@radix-ui/react-scroll-area'

import { LogoutBtn } from 'features/auth/components'
import { BoardsList, MyBoardsInfo } from 'features/kanban/board/components'
import { selectIsSidebarOpen } from 'features/sidebar/sidebar.slice'
import { UserSupport } from 'features/user/components'

import { Scrollbar } from 'components/ui'
import { useAppSelector } from 'hooks/redux'

import { cn } from 'lib'

import { SidebarLogo } from './SidebarLogo'

export const Sidebar = () => {
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen)

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
