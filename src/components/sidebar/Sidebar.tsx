import { SideBarBoardsItem } from './SideBarBoardsItem'
import { SidebarBoardsList } from './SidebarBoardsList'
import { SidebarCreateBoardBtn } from './SidebarCreateBoardBtn'
import { SidebarLogoutBtn } from './SidebarLogoutBtn'
import { SidebarUserSupport } from './SidebarUserSupport'

export const Sidebar = () => {
  return (
    <div className='hidden xl:block fixed top-0 left-0 h-full z-50' >
    <div
      className='flex h-screen w-56 flex-grow
    flex-col p-3.5  md:w-[260px] md:p-6 violet:bg-[#5255BC]
        dark:bg-[#121212] bg-white'>
      <SideBarBoardsItem />
      <SidebarCreateBoardBtn />
      <SidebarBoardsList />
      <SidebarUserSupport />
      <SidebarLogoutBtn />
      </div>
    </div>
  )
}
