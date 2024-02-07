import { SideBarBoardsItem } from './SideBarBoardsItem'
import { SidebarBoardsList } from './SidebarBoardsList'
import { SidebarCreateBoardBtn } from './SidebarCreateBoardBtn'
import { SidebarLogoutBtn } from './SidebarLogoutBtn'
import { SidebarUserSupport } from './SidebarUserSupport'

export const Sidebar = () => {
  return (
    <div className='fixed left-0 top-0 z-50 hidden h-full xl:block' >
    <div
      className='flex h-screen w-56 flex-grow
    flex-col bg-white  p-3.5 violet:bg-[#5255BC] dark:bg-[#121212]
        md:w-[260px] md:p-6'>
      <SideBarBoardsItem />
      <SidebarCreateBoardBtn />
      <SidebarBoardsList />
      <SidebarUserSupport />
      <SidebarLogoutBtn />
      </div>
    </div>
  )
}
