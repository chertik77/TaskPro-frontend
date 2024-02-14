import { BurgerModal } from 'components/ui/modal/burger-Modal'
import { SidebarBoardsList } from '../../sidebar/SidebarBoardsList'
import { SidebarCreateBoardBtn } from '../../sidebar/SidebarCreateBoardBtn'
import { SidebarLogoutBtn } from '../../sidebar/SidebarLogoutBtn'
import { SidebarNav } from '../../sidebar/SidebarNav'
import { SidebarUserSupportBtn } from '../../sidebar/SidebarUserSupportBtn'

export const BurgerMenu = () => (
  <div className='flex'>
    <BurgerModal modalTitle={''}>
      <div className=' m-0 flex  h-dvh min-h-full w-56 flex-grow flex-col overflow-y-auto  overflow-x-hidden bg-white bg-local p-0 violet:bg-brand-secondary dark:bg-black-secondary tablet:w-[260px] '>
        <SidebarNav />
        <SidebarCreateBoardBtn />
        <SidebarBoardsList />
        <SidebarUserSupportBtn />
        <SidebarLogoutBtn />
      </div>
    </BurgerModal>
  </div>
)
