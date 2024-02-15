import { cn } from 'lib/utils'
import { useModalInstance } from 'react-modal-state'
import { Modal as Dialog } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import type { ModalProps } from './modal-types'
import { modalVariants } from './modal-variants'

export const Modal = ({ children, size, modalTitle }: ModalProps) => {
  const { isOpen, close } = useModalInstance()
  const onClose = () => {
    close()
    localStorage.removeItem('edit-board-title')
    localStorage.removeItem('edit-board-icon')
  }

  return (
    <Dialog
      open={isOpen}
      center
      onClose={onClose}
      classNames={{
        modal: `${cn(modalVariants({ size }))}`,
        closeIcon: 'dark:fill-white w-[18px] h-[18px]',
        overlay: 'backdrop-saturate-150 backdrop-blur-md'
      }}>
      <h4 className='mb-6 text-fs-18-lh-normal-fw-500'>{modalTitle}</h4>
      {children}
    </Dialog>
  )
}
