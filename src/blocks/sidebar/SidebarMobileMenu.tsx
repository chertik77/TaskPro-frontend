import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTrigger
} from '@radix-ui/react-dialog'

import { LogoutBtn } from '@/features/auth/logout'
import { NeedHelpDialog } from '@/features/user/need-help'

import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

import { SidebarBoardInfo } from './SidebarBoardInfo'
import { SidebarBoardList } from './SidebarBoardList'
import { SidebarLogo } from './SidebarLogo'

export const SidebarMobileMenu = () => {
  const { isSidebarMobileMenuOpen, toggleSidebarMobileMenu } = useSidebarStore()

  return (
    <Dialog
      open={isSidebarMobileMenuOpen}
      onOpenChange={toggleSidebarMobileMenu}>
      <DialogTrigger
        aria-label='Toggle sidebar menu'
        className='desktop:hidden'>
        <Icon
          name='menu'
          className='size-6 stroke-black dark:stroke-white'
        />
      </DialogTrigger>
      <DialogPortal>
        <DialogContent
          className='violet:bg-brand-violet dark:bg-black-soft tablet:w-[260px] tablet:pt-6
            data-[state=open]:animate-modal-in data-[state=closed]:animate-modal-out fixed
            inset-x-0 top-0 flex min-h-dvh w-[225px] flex-col bg-white pt-3.5 pb-6'>
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
