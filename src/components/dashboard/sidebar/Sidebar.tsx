import { useSidebar } from 'contexts/sidebar.context'

import { cn } from 'lib'

import { SidebarBoardsList } from './SidebarBoardsList'
import { SidebarLogo } from './SidebarLogo'
import { SidebarLogoutBtn } from './SidebarLogoutBtn'
import { SidebarMyBoardsInfo } from './SidebarMyBoardsInfo'
import { SidebarUserSupport } from './SidebarUserSupport'

export const Sidebar = () => {
  const { isSidebarOpen } = useSidebar()

  return (
    <div className={cn('row-span-2 hidden', isSidebarOpen && 'desktop:block')}>
      <div
        className='custom-scrollbar flex h-dvh w-56 flex-col overflow-y-auto bg-white pb-6
          violet:bg-brand-secondary dark:bg-black-secondary tablet:w-7xl'>
        <div>
          <SidebarLogo />
          <SidebarMyBoardsInfo />
          <SidebarBoardsList />
        </div>
        <div className='mt-auto'>
          <SidebarUserSupport />
          <SidebarLogoutBtn />
        </div>
      </div>
    </div>
  )
}
