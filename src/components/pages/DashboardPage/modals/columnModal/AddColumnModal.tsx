import { Button, Field, Modal } from 'components/ui'
import { useAddColumnForm  } from 'hooks/useAddColumn'

export const AddColumnModal = () => {
  const { register, errors } = useAddColumnForm ()

  return (
    <Modal size='sm' modalTitle='Add column'>
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
