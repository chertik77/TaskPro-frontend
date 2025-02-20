import { Modal } from 'react-responsive-modal'

import { LogoutBtn } from '@/features/auth/logout'
import { NeedHelpModalTrigger } from '@/features/user/need-help'

import { useSidebarStore } from '@/shared/store'

import { SidebarBoardInfo } from './SidebarBoardInfo'
import { SidebarBoardList } from './SidebarBoardList'
import { SidebarLogo } from './SidebarLogo'

export const SidebarMenu = () => {
  const { isMobileSidebarOpen, toggleSidebar } = useSidebarStore()

  return (
    <Modal
      open={isMobileSidebarOpen}
      onClose={() => toggleSidebar(false)}
      classNames={{
        modal: `m-0 flex min-h-dvh w-[225px] flex-col bg-white
        pb-6 px-0 pt-3.5 violet:bg-brand-secondary dark:bg-black-secondary
        tablet:w-7xl tablet:pt-6`
      }}
      focusTrapped={false}
      closeOnEsc={false}
      showCloseIcon={false}>
      <SidebarLogo />
      <SidebarBoardInfo />
      <SidebarBoardList />
      <div className='mt-auto px-3.5 tablet:px-6'>
        <NeedHelpModalTrigger />
        <LogoutBtn />
      </div>
    </Modal>
  )
}
