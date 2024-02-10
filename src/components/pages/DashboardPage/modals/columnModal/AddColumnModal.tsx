import { Button, Field, Modal } from 'components/ui'
import { useAddColumnForm } from 'hooks/useAddColumn'
import type { ColumnModal } from 'lib/schemas/addComumn-shema'
import { useLocation } from 'react-router-dom'
import { useAddNewColumnMutation } from 'redux/api/dashboard/column'

export const AddColumnModal = () => {
  const location = useLocation()
  const [addNewColumn] = useAddNewColumnMutation()
  const { register, errors, handleSubmit } = useAddColumnForm()

  const submit = (data: ColumnModal) => {
    console.log(data)
    const pathParts = location.pathname.split('/')
    const name = pathParts[pathParts.length - 1]
    addNewColumn({ boardName: name, title: data.title })
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
