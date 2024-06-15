import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useSidebar } from 'contexts/sidebar.context'

import { Scrollbar } from 'components/ui'

import { cn } from 'lib'

import { SidebarBoardsList } from './SidebarBoardsList'
import { SidebarLogo } from './SidebarLogo'
import { SidebarLogoutBtn } from './SidebarLogoutBtn'
import { SidebarMyBoardsInfo } from './SidebarMyBoardsInfo'
import { SidebarUserSupport } from './SidebarUserSupport'

export const Sidebar = () => {
  const { isSidebarOpen } = useSidebar()

  return (
    <ScrollArea.Root
      type='scroll'
      className={cn(
        'row-span-2 hidden overflow-hidden',
        isSidebarOpen && 'desktop:block'
      )}>
      <ScrollArea.Viewport
        className='h-dvh w-56 bg-white violet:bg-brand-secondary dark:bg-black-secondary
          tablet:w-7xl'>
        <div className='flex h-dvh flex-col'>
          <div>
            <SidebarLogo />
            <SidebarMyBoardsInfo />
            <SidebarBoardsList />
          </div>
          <div className='mt-auto pb-6'>
            <SidebarUserSupport />
            <SidebarLogoutBtn />
          </div>
        </div>
      </ScrollArea.Viewport>
      <Scrollbar scrollBarClassName='w-2' />
    </ScrollArea.Root>
  )
}
