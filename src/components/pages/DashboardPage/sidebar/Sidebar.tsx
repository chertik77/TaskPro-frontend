import { SidebarBoardsList } from './SidebarBoardsList'
import { SidebarCreateBoardBtn } from './SidebarCreateBoardBtn'
import { SidebarLogoutBtn } from './SidebarLogoutBtn'
import { SidebarNav } from './SidebarNav'
import { SidebarUserSupportBtn } from './SidebarUserSupportBtn'

export const Sidebar = () => (
  <div className='fixed left-0 top-0 z-50 hidden h-dvh overflow-y-auto desktop:block'>
    <div className='flex h-dvh w-56 flex-grow flex-col bg-white p-3.5 violet:bg-brand-secondary dark:bg-black-secondary tablet:w-[260px] tablet:p-6'>
      <SidebarNav />
      <SidebarCreateBoardBtn />
      <SidebarBoardsList />
      <SidebarUserSupportBtn />
      <SidebarLogoutBtn />
    </div>
  </div>
)
