import { SidebarBoardsList } from './SidebarBoardsList'
import { SidebarLogo } from './SidebarLogo'
import { SidebarLogoutBtn } from './SidebarLogoutBtn'
import { SidebarMyBoardsInfo } from './SidebarMyBoardsInfo'
import { SidebarUserSupport } from './SidebarUserSupport'

export const Sidebar = () => (
  <div className='row-span-2 hidden desktop:block'>
    <div
      className='custom-scrollbar flex h-dvh w-56 flex-col justify-between overflow-y-auto
        bg-white pb-6 violet:bg-brand-secondary dark:bg-black-secondary tablet:w-7xl'>
      <div>
        <SidebarLogo />
        <SidebarMyBoardsInfo />
        <SidebarBoardsList />
      </div>
      <div>
        <SidebarUserSupport />
        <SidebarLogoutBtn />
      </div>
    </div>
  </div>
)
