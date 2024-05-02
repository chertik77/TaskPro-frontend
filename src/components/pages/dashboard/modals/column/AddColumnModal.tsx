import type { ColumnSchemaFields } from 'lib/schemas'

import { useModal } from 'react-modal-state'
import { useAddNewColumnMutation } from 'redux/api/dashboard/column'
import { toast } from 'sonner'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm, useBoardByLocation } from 'hooks'

import { columnSchema } from 'lib/schemas'

export const AddColumnModal = () => {
  const boardId = useBoardByLocation()
  const { close } = useModal('add-column-modal')
  const [addNewColumn, { isLoading }] = useAddNewColumnMutation()
  const { register, handleSubmit, reset, formState } =
    useAppForm<ColumnSchemaFields>(columnSchema)

  const submit = (data: ColumnSchemaFields) => {
    addNewColumn({ boardId, body: data })
      .unwrap()
      .then(() => {
        reset()
        toast.success(
          `The column has been added successfully. Let's start filling it with tasks.`
        )
        close()
      })
      .catch(() => {
        toast.error(
          'Something went wrong while adding the column. Please try again.'
        )
      })
  }

  return (
    <Modal
      size='sm'
      modalTitle='Add column'>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          {...register('title')}
          inputName='title'
          placeholder='Title'
          errors={formState.errors}
          className='mb-6'
        />
        <Button
          isAddIcon
          iconName='plus'
          disabled={!formState.isValid || isLoading}>
          {isLoading ? 'Loading...' : 'Add'}
        </Button>
      </form>
    </Modal>
  )
}
