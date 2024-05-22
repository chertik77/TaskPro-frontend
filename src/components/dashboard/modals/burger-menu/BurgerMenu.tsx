import { SidebarBoardsList } from '../../sidebar/SidebarBoardsList'
import { SidebarLogo } from '../../sidebar/SidebarLogo'
import { SidebarLogoutBtn } from '../../sidebar/SidebarLogoutBtn'
import { SidebarMyBoardsInfo } from '../../sidebar/SidebarMyBoardsInfo'
import { SidebarUserSupport } from '../../sidebar/SidebarUserSupport'
import { BurgerModal } from './burger-Modal'

export const BurgerMenu = () => (
  <div className='flex'>
    <BurgerModal>
      <div
        className='m-0 flex min-h-dvh w-[225px] grow flex-col justify-between bg-white bg-local
          px-default pb-6 pt-default violet:bg-brand-secondary dark:bg-black-secondary
          tablet:w-[260px] tablet:px-6 tablet:pt-6'>
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
    </BurgerModal>
  </div>
)
