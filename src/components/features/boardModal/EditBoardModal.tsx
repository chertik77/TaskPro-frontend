import { Field } from 'components/ui/field/Field'
import { Modal } from 'components/ui/modal/Modal'
import { Svg } from './svg/Svg'
import { Button } from 'components/ui/button/Button'
import { useModal } from 'hooks/useModal'
import { BackgroundContainer } from './BackgroundContainer'
import { useBoard } from 'hooks/useBoard'

export const EditBoardModal = () => {
  const { isModalOpen, toggleModal } = useModal()
  const { register, errors } = useBoard()

  return (
    <Modal
      size='sm'
      modalTitle='Edit board'
      isModalOpen={isModalOpen}
      onCloseModal={toggleModal}>
      <Field
        {...register('title')}
        inputName='title'
        placeholder='Title'
        errors={errors}
      />
      <p className='mt-6'>Icons</p>
      <Svg />
      <p className='mt-6 '>Background</p>
      <BackgroundContainer />
      <Button isAddIcon={true}>Create</Button>
    </Modal>
  )
}
