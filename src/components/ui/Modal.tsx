import { type ReactNode } from 'react'
import { Modal as Dialog } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'

type ModalProps = {
  isModalOpen: boolean
  onCloseModal: () => void
  modalTitle:
    | 'Edit profile'
    | 'Edit board'
    | 'Edit card'
    | 'New board'
    | 'Add card'
    | 'Add column'
    | 'Need Help'
    | 'Edit column'
  children: ReactNode
}

export const Modal = ({
  isModalOpen,
  children,
  onCloseModal,
  modalTitle
}: ModalProps) => (
  <Dialog
    open={isModalOpen}
    center
    onClose={onCloseModal}
    classNames={{
      modal: 'm-0 shadow-none rounded-lg dark:bg-black p-6',
      closeIcon: 'dark:fill-white w-[18px] h-[18px]',
      overlay: 'backdrop-saturate-150 backdrop-blur-md'
    }}>
    <h4 className='text-fs-18-lh-normal-fw-500 m-6'>{modalTitle}</h4>
    {children}
  </Dialog>
)
