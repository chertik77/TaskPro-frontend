import type { VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'

import { modalVariants } from './modal-variants'

export type ModalProps = VariantProps<typeof modalVariants> & {
  modalTitle:
    | 'Edit profile'
    | 'Edit board'
    | 'Edit card'
    | 'New board'
    | 'Add card'
    | 'Add column'
    | 'Need help'
    | 'Edit column'
    | ''
  children: ReactNode
}
