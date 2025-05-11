import { Modal } from 'react-responsive-modal'

import { LogoutBtn } from '@/features/auth/logout'
import { NeedHelpModalTrigger } from '@/features/user/need-help'

import { useSidebarStore } from '@/shared/store'

import { SidebarBoardInfo } from './SidebarBoardInfo'
import { SidebarBoardList } from './SidebarBoardList'
import { SidebarLogo } from './SidebarLogo'

export const SidebarMobileMenu = () => {
  const { isSidebarMobileMenuOpen, toggleSidebarMobileMenu } = useSidebarStore()

  return (
    <Modal
      open={isSidebarMobileMenuOpen}
      onClose={() => toggleSidebarMobileMenu(false)}
      classNames={{
        modal: `!m-0 !flex min-h-dvh !w-[225px] flex-col bg-white
        !pb-6 !px-0 !pt-3.5 violet:!bg-brand-violet dark:!bg-black-soft
        tablet:!w-[260px] tablet:!pt-6 !shadow-none`
      }}
      focusTrapped={false}
      closeOnEsc={false}
      showCloseIcon={false}>
      <SidebarLogo />
      <SidebarBoardInfo />
      <SidebarBoardList />
      <div className='tablet:px-6 mt-auto px-3.5'>
        <NeedHelpModalTrigger />
        <LogoutBtn />
      </div>
    </Modal>
  )
}
