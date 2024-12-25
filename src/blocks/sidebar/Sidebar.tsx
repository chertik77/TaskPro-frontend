import * as ScrollArea from '@radix-ui/react-scroll-area'

import { Scrollbar } from 'components/ui'
import { useAppSelector } from 'hooks/redux'

import { selectIsSidebarOpen } from 'redux/sidebar.slice'

import { cn } from 'lib'

import { SidebarBoardsList } from './SidebarBoardsList'
import { SidebarLogo } from './SidebarLogo'
import { SidebarLogoutBtn } from './SidebarLogoutBtn'
import { SidebarMyBoardsInfo } from './SidebarMyBoardsInfo'
import { SidebarUserSupport } from './SidebarUserSupport'

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
            <SidebarMyBoardsInfo />
            <SidebarBoardsList />
          </div>
          <div className='mt-auto px-6 pb-6'>
            <SidebarUserSupport />
            <SidebarLogoutBtn />
          </div>
        </aside>
      </ScrollArea.Viewport>
      <Scrollbar scrollBarClassName='w-1' />
    </ScrollArea.Root>
  )
}
