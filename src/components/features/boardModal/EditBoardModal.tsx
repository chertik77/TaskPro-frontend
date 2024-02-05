import { Field } from 'components/ui/field/Field'
import { Modal } from 'components/ui/modal/Modal'
import { Svg } from './svg/Svg'
import { Button } from 'components/ui/button/Button'
import { useModal } from 'hooks/useModal'
import { BackgroundContainer } from './BackgroundContainer'

export const EditBoardModal = () => {
  const { isModalOpen, toggleModal } = useModal()

  return (
    <Modal
      size='sm'
      modalTitle='Edit board'
      isModalOpen={isModalOpen}
      onCloseModal={toggleModal}>
      <Field inputName='Title' placeholder='Title' errors={{ undefined }} />
      <p className='mt-6'>Icons</p>
      <Svg />
      <p className='mt-6 '>Background</p>
      <BackgroundContainer />
      <Button isAddIcon={true}>Create</Button>
    </Modal>
  )
}
