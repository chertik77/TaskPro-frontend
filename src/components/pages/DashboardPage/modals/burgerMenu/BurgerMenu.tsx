import { useModalInstance } from 'react-modal-state'
import Modal from 'react-responsive-modal'
import { Sidebar } from '../../sidebar/Sidebar'

export const BurgerMenu = () => {
  const { isOpen, close } = useModalInstance()
  return (
    <Modal open={isOpen} onClose={close}>
      <Sidebar />
    </Modal>
  )
}
