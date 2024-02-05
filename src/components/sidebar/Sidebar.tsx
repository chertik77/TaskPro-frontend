import { SidebarUserSupport } from "./SidebarUserSupport"
import { SidebarLogoutBtn } from "./SidebarLogoutBtn"
import { SideBarBoardsItem } from "./SideBarBoardsItem"
import { SidebarBoardsList } from "./SidebarBoardsList"
import { SidebarCreateBoardBtn } from "./SidebarCreateBoardBtn"

export const Sidebar = () => {
    return <div className="w-56 md:w-[260px] p-3.5 md:p-6
    h-screen flex-grow  flex flex-col" >
        <SideBarBoardsItem />
     <SidebarCreateBoardBtn/>
        <SidebarBoardsList />
        <SidebarUserSupport />
        <SidebarLogoutBtn />
    </div>
}