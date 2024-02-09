import { Button, Field, Modal } from 'components/ui'
import { useBoard } from 'hooks/useBoard'
import { useAddNewColumnMutation } from 'redux/api/dashboard/column'

export const AddColumnModal = () => {
  const { register, errors, handleSubmit } = useBoard()
  const [addNewColumn] = useAddNewColumnMutation()

  const submit = (data: { title: string }) => {
    addNewColumn(data)
  }

  return (
    <Modal size='sm' modalTitle='Add column'>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          {...register('title')}
          inputName='title'
          placeholder='Title'
          errors={errors}
          className='mb-6'
        />
        <Button isAddIcon iconName='plus'>
          Add
        </Button>
      </form>
    </Modal>
  )
}
