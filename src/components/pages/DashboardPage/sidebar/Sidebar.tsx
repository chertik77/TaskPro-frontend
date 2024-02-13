import { SidebarBoardsList } from './SidebarBoardsList'
import { SidebarCreateBoardBtn } from './SidebarCreateBoardBtn'
import { SidebarLogoutBtn } from './SidebarLogoutBtn'
import { SidebarNav } from './SidebarNav'
import { SidebarUserSupportBtn } from './SidebarUserSupportBtn'

export const Sidebar = () => (
  <div className='col-start-1 row-span-2 row-start-1 hidden h-dvh overflow-y-auto overflow-x-hidden desktop:block'>
    <div className='flex min-h-full w-56 flex-grow flex-col bg-white bg-local violet:bg-brand-secondary dark:bg-black-secondary tablet:w-[260px]'>
      <SidebarNav />
      <SidebarCreateBoardBtn />
      <SidebarBoardsList />
      <SidebarUserSupportBtn />
      <SidebarLogoutBtn />
    </div>
  </div>
)