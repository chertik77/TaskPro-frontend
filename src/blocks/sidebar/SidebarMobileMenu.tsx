import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle
} from '@radix-ui/react-dialog'

import { LogoutBtn } from '@/features/auth/logout'
import { NeedHelpDialog } from '@/features/user/need-help'

import { useSidebarStore } from '@/shared/store'

import { SidebarBoardInfo } from './SidebarBoardInfo'
import { SidebarBoardList } from './SidebarBoardList'
import { SidebarLogo } from './SidebarLogo'

export const SidebarMobileMenu = () => {
  const { isOpenMobile, setIsOpenMobile } = useSidebarStore()

  return (
    <Dialog
      open={isOpenMobile}
      onOpenChange={setIsOpenMobile}>
      <DialogPortal>
        <DialogOverlay
          className='data-[state=open]:animate-modal-overlay-in
            data-[state=closed]:animate-modal-overlay-out bg-black-overlay fixed inset-0
            z-50'
        />
        <DialogContent
          aria-describedby={undefined}
          className='violet:bg-brand-violet dark:bg-black-soft tablet:w-[260px] tablet:pt-6
            data-[state=open]:animate-modal-in data-[state=closed]:animate-modal-out fixed
            inset-x-0 top-0 z-50 flex min-h-dvh w-[225px] flex-col bg-white pt-3.5 pb-6'>
          <DialogTitle className='sr-only'>Sidebar menu</DialogTitle>
          <SidebarLogo />
          <SidebarBoardInfo />
          <SidebarBoardList />
          <div className='tablet:px-6 mt-auto px-3.5'>
            <NeedHelpDialog />
            <LogoutBtn />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
