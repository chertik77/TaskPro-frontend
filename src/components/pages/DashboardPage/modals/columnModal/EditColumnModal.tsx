import { Button, Field, Modal } from 'components/ui'
import { useBoard } from 'hooks/useBoard'

export const EditColumnModal = () => {
  const { register, errors } = useBoard()

  return (
    <Modal size='sm' modalTitle='Edit column'>
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
