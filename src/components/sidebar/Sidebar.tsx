import { SideBarBoardsItem } from './SideBarBoardsItem'
import { SidebarBoardsList } from './SidebarBoardsList'
import { SidebarCreateBoardBtn } from './SidebarCreateBoardBtn'
import { SidebarLogoutBtn } from './SidebarLogoutBtn'
import { SidebarUserSupport } from './SidebarUserSupport'

export const Sidebar = () => {
  return (
    <div
      className='flex h-screen w-56 flex-grow
    flex-col p-3.5  md:w-[260px] md:p-6'>
      <SideBarBoardsItem />
      <SidebarCreateBoardBtn />
      <SidebarBoardsList />
      <SidebarUserSupport />
      <SidebarLogoutBtn />
    </div>
  )
}
