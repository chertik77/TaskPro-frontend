import type { ReactNode } from 'react'

import { useModalInstance } from 'react-modal-state'
import { Modal as Dialog } from 'react-responsive-modal'

import { cn } from 'lib'

import 'react-responsive-modal/styles.css'

export type ModalProps = {
  modalTitle:
    | 'Edit profile'
    | 'Edit board'
    | 'Edit card'
    | 'New board'
    | 'Add card'
    | 'Add column'
    | 'Need help'
    | 'Edit column'
  children: ReactNode
}

export const Modal = ({ children, modalTitle }: ModalProps) => {
  const { isOpen, close } = useModalInstance()

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      center
      classNames={{
        modal: `${cn('m-0 rounded-lg p-6 shadow-none dark:bg-black w-[335px] adaptive:w-11/12 tablet:w-[350px]', modalTitle === 'Need help' && 'w-[400px]')}`,
        closeIcon: 'dark:fill-white w-[18px] h-[18px]',
        overlay: 'backdrop-saturate-150 backdrop-blur-md'
      }}>
      <h4 className='mb-6 text-fs-18-lh-normal-fw-500'>{modalTitle}</h4>
      {children}
    </Dialog>
  )
}
