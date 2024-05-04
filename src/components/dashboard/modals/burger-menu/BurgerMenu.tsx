import { SidebarBoardsList } from '../../sidebar/SidebarBoardsList'
import { SidebarCreateBoardBtn } from '../../sidebar/SidebarCreateBoardBtn'
import { SidebarLogo } from '../../sidebar/SidebarLogo'
import { SidebarLogoutBtn } from '../../sidebar/SidebarLogoutBtn'
import { SidebarUserSupportBtn } from '../../sidebar/SidebarUserSupportBtn'
import { BurgerModal } from './burger-Modal'

export const BurgerMenu = () => (
  <div className='flex'>
    <BurgerModal>
      <div
        className='m-0 flex min-h-dvh w-56 grow flex-col bg-white bg-local px-default pt-default
          violet:bg-brand-secondary dark:bg-black-secondary tablet:w-[260px] tablet:px-6
          tablet:pt-6'>
        <SidebarLogo />
        <SidebarCreateBoardBtn />
        <SidebarBoardsList />
        <SidebarUserSupportBtn />
        <SidebarLogoutBtn />
      </div>
    </BurgerModal>
  </div>
)
