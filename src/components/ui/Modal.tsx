import type { ReactNode } from 'react'
import type { ModalProps as DialogProps } from 'react-responsive-modal'

import { useModalInstance } from 'react-modal-state'
import { Modal as Dialog } from 'react-responsive-modal'

import { cn } from 'lib'

export type ModalProps = Partial<DialogProps> & {
  modalTitle:
    | 'Edit profile'
    | 'Edit board'
    | 'Edit card'
    | 'New board'
    | 'Add card'
    | 'Need help'
  children: ReactNode
}

export const Modal = ({ children, modalTitle, ...props }: ModalProps) => {
  const { isOpen, close } = useModalInstance()

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        close()
        props.onClose?.()
      }}
      center
      classNames={{
        modal: `${cn('shadow-none m-0 w-8xl rounded-lg p-6 dark:bg-black tablet:w-[350px]', modalTitle === 'Need help' && 'max-tablet:w-8xl')}`,
        closeButton: 'focus-visible:styled-outline',
        closeIcon: 'dark:fill-white size-lg',
        overlay: 'backdrop-saturate-150 backdrop-blur-md'
      }}
      {...props}>
      <h4 className='mb-6 text-lg'>{modalTitle}</h4>
      {children}
    </Dialog>
  )
}
