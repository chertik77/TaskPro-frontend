import { useModalInstance } from 'react-modal-state'
import { Modal } from 'react-responsive-modal'

import { SidebarBoardsList } from 'components/dashboard/sidebar/SidebarBoardsList'
import { SidebarLogo } from 'components/dashboard/sidebar/SidebarLogo'
import { SidebarLogoutBtn } from 'components/dashboard/sidebar/SidebarLogoutBtn'
import { SidebarMyBoardsInfo } from 'components/dashboard/sidebar/SidebarMyBoardsInfo'
import { SidebarUserSupport } from 'components/dashboard/sidebar/SidebarUserSupport'

export const BurgerMenu = () => {
  const { isOpen, close } = useModalInstance()

  return (
    <Modal
      open={isOpen}
      onClose={close}
      classNames={{
        modal: `m-0 flex min-h-dvh w-[225px] flex-col justify-between bg-white
        pb-6 px-0 pt-default violet:bg-brand-secondary dark:bg-black-secondary
        tablet:w-7xl tablet:pt-6`
      }}
      focusTrapped={false}
      closeOnEsc={false}
      showCloseIcon={false}>
      <SidebarLogo />
      <SidebarMyBoardsInfo />
      <SidebarBoardsList />
      <SidebarUserSupport />
      <SidebarLogoutBtn />
    </Modal>
  )
}
