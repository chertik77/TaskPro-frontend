import type { ReactNode } from 'react'
import type { ModalProps as DialogProps } from 'react-responsive-modal'

import { useModalInstance } from 'react-modal-state'
import { Modal as Dialog } from 'react-responsive-modal'

import { cn } from '../lib/cn'

type ModalProps = Partial<DialogProps> & {
  modalTitle:
    | 'New board'
    | 'Edit board'
    | 'Add column'
    | 'Edit column'
    | 'Add card'
    | 'Edit card'
    | 'Edit profile'
    | 'Need help'
  children: ReactNode
}

export const Modal = ({ children, modalTitle, ...props }: ModalProps) => {
  const { isOpen, close } = useModalInstance()

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      center
      classNames={{
        // eslint-disable-next-line tailwindcss/no-custom-classname
        modal: cn(
          'shadow-none m-0 w-84 rounded-lg p-6 dark:bg-black tablet:w-[350px]',
          modalTitle === 'Need help' && 'max-tablet:w-84'
        ),
        closeButton: 'focus-visible:styled-outline',
        closeIcon: 'dark:fill-white size-4.5',
        overlay: 'backdrop-saturate-150 backdrop-blur-md'
      }}
      {...props}>
      <h4 className='mb-6 text-xl'>{modalTitle}</h4>
      {children}
    </Dialog>
  )
}
