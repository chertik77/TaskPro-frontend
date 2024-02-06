import { Button, Field, Modal } from 'components/ui'
import { useModal } from 'hooks'
import { useBoard } from 'hooks/useBoard'

export const EditColumnModal = () => {
  const { isModalOpen, toggleModal } = useModal()

  const { register, errors } = useBoard()
  return (
    <Modal
      size='sm'
      modalTitle='Edit column'
      isModalOpen={!isModalOpen}
      onCloseModal={toggleModal}>
      <Field
        {...register('title')}
        inputName='title'
        placeholder='Title'
        errors={errors}
        className='mb-6'
      />

      <Button isAddIcon onClick={e => console.log(e)}>
        Add
      </Button>
    </Modal>
  )
}
