import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { ModalRenderer } from 'react-modal-state'
import { Toaster } from 'sonner'

import { EditProfileModal } from '@/features/edit-profile/components'
import {
  EditBoardModal,
  NewBoardModal
} from '@/features/kanban/board/components/modals'
import {
  AddCardModal,
  EditCardModal
} from '@/features/kanban/card/components/modals'
import {
  AddColumnModal,
  EditColumnModal
} from '@/features/kanban/column/components/modals'
import { NeedHelpModal } from '@/features/need-help/components'

import { SidebarMobileModal } from '@/blocks/sidebar'

import { useTabletAndBelowMediaQuery } from '@/shared/hooks'
import { useAuthStore } from '@/shared/store'

const RootRoute = () => {
  const theme = useAuthStore(state => state.user.theme)

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <Toaster
        position={isTabletAndBelow ? 'top-center' : 'bottom-right'}
        richColors
        closeButton
        duration={5000}
        theme={theme === 'dark' ? 'dark' : 'light'}
        className='text-balance'
      />
      <Outlet />
      <ModalRenderer Component={NewBoardModal} />
      <ModalRenderer Component={EditBoardModal} />
      <ModalRenderer Component={AddColumnModal} />
      <ModalRenderer Component={EditColumnModal} />
      <ModalRenderer Component={AddCardModal} />
      <ModalRenderer Component={EditCardModal} />
      <ModalRenderer Component={NeedHelpModal} />
      <ModalRenderer Component={EditProfileModal} />
      <ModalRenderer Component={SidebarMobileModal} />
    </>
  )
}

export const Route = createRootRoute({ component: RootRoute })
