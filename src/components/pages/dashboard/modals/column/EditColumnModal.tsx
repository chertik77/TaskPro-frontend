import { Button, Field, Modal } from 'components/ui'
import { useAppForm, useBoardByLocation } from 'hooks'
import { columnSchema, type ColumnSchemaFields } from 'lib/schemas'
import { handleErrorToast, handleInfoToast } from 'lib/toasts'
import { useEffect } from 'react'
import { useModal, useModalInstance } from 'react-modal-state'
import { useEditColumnMutation } from 'redux/api/dashboard/column'

export const EditColumnModal = () => {
  const [editColumn, { isLoading }] = useEditColumnMutation()
  const { close } = useModal('edit-column-modal')
  const { isOpen } = useModalInstance()
  const boardId = useBoardByLocation()
  const { register, errors, handleSubmit, reset, isValid } =
    useAppForm<ColumnSchemaFields>(columnSchema)

  useEffect(() => {
    if (isOpen) {
      reset({ title: localStorage.getItem('column-title') ?? '' })
    }
  }, [isOpen])

  const columnId = localStorage.getItem('columnId')

  const submit = (data: ColumnSchemaFields) => {
    editColumn({ boardId, columnId, body: data })
      .unwrap()
      .then(() => {
        handleInfoToast('Column has been edited successfully!')
        close()
      })
      .catch(() => {
        handleErrorToast(
          'Something went wrong while editing the column. Please try again.'
        )
      })
  }

  return (
    <Modal size='sm' modalTitle='Edit column'>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          {...register('title')}
          inputName='title'
          placeholder='Title'
          errors={errors}
          className='mb-6'
        />
        <Button isAddIcon iconName='plus' disabled={!isValid || isLoading}>
          {isLoading ? 'Loading...' : 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
