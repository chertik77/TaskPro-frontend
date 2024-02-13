import { Button, Field, Modal } from 'components/ui'
import { useAddColumnForm } from 'hooks/useAddColumn'
import type { ColumnModal } from 'lib/schemas/addComumn-shema'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useEffect } from 'react'
import { useModal } from 'react-modal-state'
import { useLocation } from 'react-router-dom'
import { useAddNewColumnMutation } from 'redux/api/dashboard/column'

export const AddColumnModal = () => {
  const location = useLocation()
  const { close } = useModal('add-column-modal')
  const [addNewColumn, { isSuccess, isError, error }] =
    useAddNewColumnMutation()
  const { register, errors, handleSubmit, reset } = useAddColumnForm()

  const submit = (data: ColumnModal) => {
    const pathParts = location.pathname.split('/')
    const name = pathParts[pathParts.length - 1]
    addNewColumn({ boardName: name, body: data })
      .unwrap()
      .then(() => close())
    reset()
  }

  useEffect(() => {
    if (isSuccess) {
      handleSuccessToast(`Column added successfully!`)
    }
    if (isError && error && 'status' in error)
      handleErrorToast(
        error?.status === 409
          ? 'User with this email already exists. Please try different email.'
          : 'Something went wrong. Please try again.'
      )
  }, [isError, isSuccess])

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
