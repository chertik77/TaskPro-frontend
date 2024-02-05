import { cn } from 'lib/utils'
import { Modal as Dialog } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import type { ModalProps } from './modal-types'
import { modalVariants } from './modal-variants'

export const Modal = ({
  isModalOpen,
  children,
  onCloseModal,
  size,
  modalTitle
}: ModalProps) => (
  <Dialog
    open={isModalOpen}
    center
    onClose={onCloseModal}
    classNames={{
      modal: `${cn(modalVariants({ size }))}`,
      closeIcon: 'dark:fill-white w-[18px] h-[18px]',
      overlay: 'backdrop-saturate-150 backdrop-blur-md'
    }}>
    <h4 className='text-fs-18-lh-normal-fw-500 mb-6'>{modalTitle}</h4>
    {children}
  </Dialog>
)
