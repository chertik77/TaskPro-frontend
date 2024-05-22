import { SidebarBoardsList } from './SidebarBoardsList'
import { SidebarLogo } from './SidebarLogo'
import { SidebarLogoutBtn } from './SidebarLogoutBtn'
import { SidebarMyBoardsInfo } from './SidebarMyBoardsInfo'
import { SidebarUserSupport } from './SidebarUserSupport'

export const Sidebar = () => (
  <div className='col-start-1 row-span-2 row-start-1 hidden desktop:block'>
    <div
      className='flex h-dvh w-56 flex-col justify-between overflow-y-auto bg-white bg-local pb-6
        violet:bg-brand-secondary dark:bg-black-secondary tablet:w-[260px]'>
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
