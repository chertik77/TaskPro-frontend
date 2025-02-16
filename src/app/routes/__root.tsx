import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { ModalRenderer } from 'react-modal-state'
import { Toaster } from 'sonner'

import { AddBoardModal } from '@/features/board/add-board/components'
import { EditBoardModal } from '@/features/board/edit-board/components'
import { AddCardModal } from '@/features/card/add-card/components'
import { EditCardModal } from '@/features/card/edit-card/components'
import { AddColumnModal } from '@/features/column/add-column/components'
import { EditColumnModal } from '@/features/column/edit-column/components'
import { EditProfileModal } from '@/features/edit-profile/components'
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
      <ModalRenderer Component={AddBoardModal} />
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
