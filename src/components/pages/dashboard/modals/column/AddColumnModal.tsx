import { Button, Field, Modal } from 'components/ui'
import { useAppForm, useBoardByLocation } from 'hooks'
import { columnSchema, type ColumnSchemaFields } from 'lib/schemas'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useModal } from 'react-modal-state'
import { useAddNewColumnMutation } from 'redux/api/dashboard/column'

export const AddColumnModal = () => {
  const boardId = useBoardByLocation()
  const { close } = useModal('add-column-modal')
  const [addNewColumn, { isLoading }] = useAddNewColumnMutation()
  const { register, errors, handleSubmit, reset, isValid } =
    useAppForm<ColumnSchemaFields>(columnSchema)

  const submit = (data: ColumnSchemaFields) => {
    addNewColumn({ boardId, body: data })
      .unwrap()
      .then(() => {
        reset()
        handleSuccessToast(
          `The column has been added successfully. Let's start filling it with tasks.`
        )
        close()
      })
      .catch(() => {
        handleErrorToast(
          'Something went wrong while adding the column. Please try again.'
        )
      })
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
        <Button isAddIcon iconName='plus' disabled={!isValid || isLoading}>
          {isLoading ? 'Loading...' : 'Add'}
        </Button>
      </form>
    </Modal>
  )
}
