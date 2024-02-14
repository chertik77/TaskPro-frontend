import { Button, Field, Modal } from 'components/ui'
import { useAppForm, useBoardNameByLocation } from 'hooks'
import {
  columnSchema,
  type ColumnSchemaFields
} from 'lib/schemas/column-schema'
import { handleErrorToast, handleInfoToast } from 'lib/toasts'
import { useEffect } from 'react'
import { useModal, useModalInstance } from 'react-modal-state'
import { useEditColumnMutation } from 'redux/api/dashboard/column'

export const EditColumnModal = () => {
  const boardName = useBoardNameByLocation()
  const { register, errors, handleSubmit, reset } =
    useAppForm<ColumnSchemaFields>(columnSchema)
  const [editColumn] = useEditColumnMutation()
  const { close } = useModal('edit-column-modal')
  const { isOpen } = useModalInstance()

  useEffect(() => {
    if (isOpen) {
      reset({ title: localStorage.getItem('column-title') ?? '' })
    }
  }, [isOpen])

  const id = localStorage.getItem('columnId')

  const submit = (data: ColumnSchemaFields) => {
    editColumn({ boardName, columnId: id, body: data })
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
        <Button isAddIcon iconName='plus'>
          Edit
        </Button>
      </form>
    </Modal>
  )
}
