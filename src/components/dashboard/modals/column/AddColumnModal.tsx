import type { ColumnSchemaFields } from 'lib/schemas'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm, useBoardByLocation } from 'hooks'

import { columnService } from 'services/column.service'

import { columnSchema } from 'lib/schemas'

export const AddColumnModal = () => {
  const boardId = useBoardByLocation()
  const { close } = useModal('add-column-modal')
  // const [addNewColumn, { isLoading }] = useAddNewColumnMutation()
  const { register, handleSubmit, formState } =
    useAppForm<ColumnSchemaFields>(columnSchema)

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['column'],
    mutationFn: (data: ColumnSchemaFields) =>
      columnService.addNewColumn(boardId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] })
      close()
    }
  })

  const submit = (data: ColumnSchemaFields) => {
    mutate(data)
    // addNewColumn({ boardId, body: data })
    //   .unwrap()
    //   .then(() => {
    //     reset()
    //     toast.success(
    //       `The column has been added successfully. Let's start filling it with tasks.`
    //     )
    //     close()
    //   })
    //   .catch(() => {
    //     toast.error(
    //       'Something went wrong while adding the column. Please try again.'
    //     )
    //   })
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
          isPlusIcon
          disabled={!formState.isValid || isPending}>
          {isPending ? 'Loading...' : 'Add'}
        </Button>
      </form>
    </Modal>
  )
}
