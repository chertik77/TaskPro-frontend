import type { ColumnSchemaFields } from 'lib/schemas'

import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm, useAppMutation, useGetBoardId } from 'hooks'

import { columnService } from 'services'

import { columnSchema } from 'lib/schemas'

export const AddColumnModal = () => {
  const boardId = useGetBoardId()

  const { close } = useModal('add-column-modal')

  const { register, handleSubmit, formState, reset } =
    useAppForm<ColumnSchemaFields>(columnSchema)

  const { mutateAsync, isPending } = useAppMutation<ColumnSchemaFields>({
    mutationKey: ['addColumn'],
    mutationFn: data => columnService.addNewColumn(boardId, data)
  })

  const submit = (data: ColumnSchemaFields) => {
    toast.promise(mutateAsync(data), {
      loading: 'Adding column...',
      success: () => {
        reset()
        close()
        return "The column has been added successfully. Let's start filling it with tasks."
      },
      error: 'Something went wrong while adding the column. Please try again.'
    })
  }

  return (
    <Modal modalTitle='Add column'>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          {...register('title')}
          inputName='title'
          placeholder='Title'
          errors={formState.errors}
          className='mb-6'
        />
        <Button
          type='submit'
          isPlusIcon
          disabled={isPending}>
          {isPending ? 'Adding...' : 'Add'}
        </Button>
      </form>
    </Modal>
  )
}
