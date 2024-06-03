import type { ReactNode } from 'react'
import type { ModalProps } from 'react-responsive-modal'

import { useModalInstance } from 'react-modal-state'
import { Modal as Dialog } from 'react-responsive-modal'

import { cn } from 'lib'

export type DialogProps = Partial<ModalProps> & {
  modalTitle:
    | 'Edit profile'
    | 'Edit board'
    | 'Edit card'
    | 'New board'
    | 'Add card'
    | 'Need help'
  children: ReactNode
}

export const Modal = ({ children, modalTitle, ...props }: DialogProps) => {
  const { isOpen, close } = useModalInstance()

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      center
      classNames={{
        modal: `${cn('shadow-none m-0 w-8xl rounded-lg p-6 dark:bg-black tablet:w-[350px]', modalTitle === 'Need help' && 'w-[400px]')}`,
        closeIcon: 'dark:fill-white size-lg',
        overlay: 'backdrop-saturate-150 backdrop-blur-md'
      }}
      {...props}>
      <h4 className='mb-6 text-lg'>{modalTitle}</h4>
      {children}
    </Dialog>
  )
}
