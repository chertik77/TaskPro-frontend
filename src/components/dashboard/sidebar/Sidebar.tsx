import { SidebarBoardsList } from './SidebarBoardsList'
import { SidebarLogo } from './SidebarLogo'
import { SidebarLogoutBtn } from './SidebarLogoutBtn'
import { SidebarMyBoardsInfo } from './SidebarMyBoardsInfo'
import { SidebarUserSupport } from './SidebarUserSupport'

export const Sidebar = () => (
  <div className='col-start-1 row-span-2 row-start-1 hidden desktop:block'>
    <div
      className='flex h-dvh w-56 flex-col justify-between overflow-y-auto bg-white bg-local pb-6
        scrollbar scrollbar-track-white scrollbar-thumb-scroll-white
        scrollbar-track-rounded-xl scrollbar-thumb-rounded-xl scrollbar-w-2
        violet:bg-brand-secondary violet:scrollbar-thumb-brand-third
        dark:bg-black-secondary dark:scrollbar-track-black dark:scrollbar-thumb-white/10
        tablet:w-[260px]'>
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
