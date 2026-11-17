import { Dialog } from '@base-ui/react/dialog'

import { NeedHelpDialog } from '@/features/need-help'

import { useSidebarStore } from '@/shared/model'

import { SidebarBoardCreationSection } from './SidebarBoardCreationSection'
import { SidebarBoardList } from './SidebarBoardList'
import { SidebarLogo } from './SidebarLogo'
import { SidebarLogoutBtn } from './SidebarLogoutBtn'

export const SidebarMobileMenu = () => {
  const { isOpenMobile, setIsOpenMobile } = useSidebarStore()

  return (
    <Dialog.Root
      open={isOpenMobile}
      onOpenChange={setIsOpenMobile}>
      <Dialog.Portal>
        <Dialog.Backdrop className='modal-backdrop fixed inset-0 isolate' />
        <Dialog.Popup
          initialFocus={false}
          className='dark:bg-black-soft tablet:w-65 tablet:pt-6 drawer-left
            nested-dialog-dim fixed top-0 left-0 flex max-h-dvh min-h-dvh
            w-56.25 flex-col overflow-y-scroll bg-white pt-3.5 pb-6'>
          <Dialog.Title className='sr-only'>Sidebar menu</Dialog.Title>
          <SidebarLogo />
          <SidebarBoardCreationSection />
          <SidebarBoardList />
          <div className='tablet:px-6 mt-auto px-3.5'>
            <NeedHelpDialog />
            <SidebarLogoutBtn />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
