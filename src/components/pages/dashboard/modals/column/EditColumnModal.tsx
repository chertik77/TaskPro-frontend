import type { ColumnSchemaFields } from 'lib/schemas'

import { useEffect } from 'react'
import { useModal, useModalInstance } from 'react-modal-state'
import { useEditColumnMutation } from 'redux/api/dashboard/column'
import { toast } from 'sonner'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm, useBoardByLocation } from 'hooks'

import { columnSchema } from 'lib/schemas'

export const EditColumnModal = () => {
  const [editColumn, { isLoading }] = useEditColumnMutation()
  const { close } = useModal('edit-column-modal')
  const { isOpen } = useModalInstance()
  const boardId = useBoardByLocation()
  const { register, formState, handleSubmit, reset } =
    useAppForm<ColumnSchemaFields>(columnSchema)

  useEffect(() => {
    if (isOpen) {
      reset({ title: localStorage.getItem('column-title') ?? '' })
    }
  }, [isOpen, reset])

  const columnId = localStorage.getItem('columnId')

  const submit = (data: ColumnSchemaFields) => {
    editColumn({ boardId, columnId, body: data })
      .unwrap()
      .then(() => {
        toast.info('Column has been edited successfully!')
        close()
      })
      .catch(() => {
        toast.error(
          'Something went wrong while editing the column. Please try again.'
        )
      })
  }

  return (
    <Modal
      size='sm'
      modalTitle='Edit column'>
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
          {isLoading ? 'Loading...' : 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
