import type { ColumnSchemaFields } from 'lib/schemas'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm } from 'hooks'

import { columnSchema } from 'lib/schemas'

export const EditColumnModal = () => {
  // const { close } = useModal('edit-column-modal')
  // const { isOpen } = useModalInstance()
  // const boardId = useBoardByLocation()
  const { register, formState, handleSubmit } =
    useAppForm<ColumnSchemaFields>(columnSchema)

  // useEffect(() => {
  //   if (isOpen) {
  //     reset({ title: localStorage.getItem('column-title') ?? '' })
  //   }
  // }, [isOpen, reset])

  // const columnId = localStorage.getItem('columnId')

  const submit = () => {
    // editColumn({ boardId, columnId, body: data })
    //   .unwrap()
    //   .then(() => {
    //     toast.info('Column has been edited successfully!')
    //     close()
    //   })
    //   .catch(() => {
    //     toast.error(
    //       'Something went wrong while editing the column. Please try again.'
    //     )
    //   })
  }

  return (
    <Modal modalTitle='Edit column'>
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
          disabled={!formState.isValid}>
          {formState.isValid ? 'Loading...' : 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
