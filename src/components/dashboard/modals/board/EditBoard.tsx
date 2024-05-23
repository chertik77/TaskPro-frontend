import type { Board } from 'types'

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useModal, useModalInstance } from 'react-modal-state'
import { toast } from 'sonner'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm, useAppMutation, useGetBoardId } from 'hooks'

import { boardService } from 'services'

import { BoardSchema } from 'lib/schemas'

import { RadioInputBgImages } from './RadioInputBgImages'
import { RadioInputIcons } from './RadioInputIcons'

export const EditBoardModal = () => {
  const boardId = useGetBoardId()

  const { close } = useModal(EditBoardModal)

  const queryClient = useQueryClient()

  const { data: board } = useModalInstance<{ title: string; icon: string }>()

  const { register, reset, handleSubmit, control, formState } =
    useAppForm<BoardSchema>(BoardSchema, {
      defaultValues: { title: board.title }
    })

  const { mutateAsync, isPending } = useAppMutation<BoardSchema, Board>({
    mutationKey: ['editBoard'],
    mutationFn: data => boardService.editBoard(boardId, data),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      if (data._id === boardId) {
        queryClient.invalidateQueries({ queryKey: ['board'] })
      }
    }
  })

  useEffect(() => {
    reset({ icon: board.icon, title: board.title, background: 'default' })
  }, [board.icon, board.title, reset])

  const fields = ['icon', 'title'] as const

  const isFormReadyForSubmit = fields.some(
    field => formState.dirtyFields[field]
  )

  const submit = (data: BoardSchema) => {
    toast.promise(mutateAsync(data), {
      loading: 'Editing board...',
      success: () => {
        reset()
        close()
        return 'The board has been edited successfully!'
      },
      error: 'An error occurred while editing the board.'
    })
  }

  return (
    <Modal
      modalTitle='Edit board'
      onClose={() => {
        close()
        reset()
      }}>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          {...register('title')}
          inputName='title'
          placeholder='Title'
          errors={formState.errors}
          className='violet:text-black'
        />
        <RadioInputIcons control={control} />
        <RadioInputBgImages control={control} />
        <Button
          type='submit'
          isPlusIcon
          disabled={isPending || !isFormReadyForSubmit}>
          {isPending ? 'Editing...' : 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
