import type { PropsWithChildren } from 'react'

import {
  ModalRenderer,
  ModalProvider as ReactModalStateProvider
} from 'react-modal-state'

import { AddBoardModal } from '@/features/board/add-board'
import { EditBoardModal } from '@/features/board/edit-board'
import { AddCardModal } from '@/features/card/add-card'
import { EditCardModal } from '@/features/card/edit-card'
import { AddColumnModal } from '@/features/column/add-column'
import { EditColumnModal } from '@/features/column/edit-column'
import { EditProfileModal } from '@/features/user/edit-profile'
import { NeedHelpModal } from '@/features/user/need-help'

import { SidebarMobileModal } from '@/blocks/sidebar'

export const ModalProvider = ({ children }: PropsWithChildren) => (
  <ReactModalStateProvider>
    {children}
    <ModalRenderer Component={AddBoardModal} />
    <ModalRenderer Component={EditBoardModal} />
    <ModalRenderer Component={AddColumnModal} />
    <ModalRenderer Component={EditColumnModal} />
    <ModalRenderer Component={AddCardModal} />
    <ModalRenderer Component={EditCardModal} />
    <ModalRenderer Component={NeedHelpModal} />
    <ModalRenderer Component={EditProfileModal} />
    <ModalRenderer Component={SidebarMobileModal} />
  </ReactModalStateProvider>
)
