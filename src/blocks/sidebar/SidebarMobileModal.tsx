import { useModalInstance } from 'react-modal-state'
import { Modal } from 'react-responsive-modal'

import { LogoutBtn } from '@/features/auth/logout/components'
import { BoardList } from '@/features/board/list/components'
import { NeedHelpModalTrigger } from '@/features/need-help/components'

import { SidebarBoardInfo } from './SidebarBoardInfo'
import { SidebarLogo } from './SidebarLogo'

export const SidebarMobileModal = () => {
  const { isOpen, close } = useModalInstance()

  return (
    <Modal
      open={isOpen}
      onClose={close}
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
      <BoardList />
      <div className='mt-auto px-3.5 tablet:px-6'>
        <NeedHelpModalTrigger />
        <LogoutBtn />
      </div>
    </Modal>
  )
}
