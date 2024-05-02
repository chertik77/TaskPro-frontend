import { SidebarBoardsList } from '../../sidebar/SidebarBoardsList'
import { SidebarCreateBoardBtn } from '../../sidebar/SidebarCreateBoardBtn'
import { SidebarLogoutBtn } from '../../sidebar/SidebarLogoutBtn'
import { SidebarNav } from '../../sidebar/SidebarNav'
import { SidebarUserSupportBtn } from '../../sidebar/SidebarUserSupportBtn'
import { BurgerModal } from './burger-Modal'

export const BurgerMenu = () => (
  <div className='flex'>
    <BurgerModal modalTitle={''}>
      <div
        className='m-0 flex min-h-dvh w-56 grow flex-col bg-white bg-local px-[14px] pt-[14px]
          violet:bg-brand-secondary dark:bg-black-secondary tablet:w-[260px] tablet:px-6
          tablet:pt-6'>
        <SidebarNav />
        <SidebarCreateBoardBtn />
        <SidebarBoardsList />
        <SidebarUserSupportBtn />
        <SidebarLogoutBtn />
      </div>
    </BurgerModal>
  </div>
)
