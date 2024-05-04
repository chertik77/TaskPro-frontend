import type { PropsWithChildren } from 'react'

import { useModalInstance } from 'react-modal-state'
import { Modal as Dialog } from 'react-responsive-modal'

export const BurgerModal = ({ children }: PropsWithChildren) => {
  const { isOpen, close } = useModalInstance()

  const customStyles = {
    modal: {
      padding: 0,
      margin: 0,
      maxWidth: 225,
      display: 'block'
    }
  }
  if (window.innerWidth >= 767) {
    customStyles.modal.maxWidth = 260
  }

  if (window.innerWidth >= 1439) {
    customStyles.modal.display = 'none'
  }

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      styles={customStyles}
      showCloseIcon={false}>
      {children}
    </Dialog>
  )
}
