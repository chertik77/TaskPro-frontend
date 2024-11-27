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
        'row-span-2 bg-white-primary transition-all duration-300 dark:bg-black-secondary',
        isSidebarOpen ? 'w-[200px] tablet:w-7xl' : 'w-20'
      )}>
      <ScrollArea.Viewport className='h-dvh violet:bg-brand-secondary dark:bg-black-secondary'>
        <aside className='flex h-dvh flex-col'>
          <div>
            <SidebarLogo />
            <SidebarMyBoardsInfo />
            <SidebarBoardsList />
          </div>
          <div className='mt-auto pb-6'>
            {isSidebarOpen && <SidebarUserSupport />}
            <SidebarLogoutBtn />
          </div>
        </aside>
      </ScrollArea.Viewport>
      <Scrollbar scrollBarClassName='w-1' />
    </ScrollArea.Root>
  )
}
