import type { Board } from 'types'

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useModal, useModalInstance } from 'react-modal-state'
import { toast } from 'sonner'

import { Button, Field, Loader, Modal } from 'components/ui'

import { useAppForm, useAppMutation } from 'hooks'

import { boardService } from 'services'

import { BoardSchema } from 'lib/schemas'

import { RadioInputBgImages } from './RadioInputBgImages'
import { RadioInputIcons } from './RadioInputIcons'

export const EditBoardModal = () => {
  const { close } = useModal(EditBoardModal)

  const queryClient = useQueryClient()

  const { data: board } = useModalInstance<{
    boardId: string
    title: string
    icon: string
    background: string
  }>()

  const { register, reset, handleSubmit, control, formState } =
    useAppForm<BoardSchema>(BoardSchema, {
      defaultValues: { title: board.title }
    })

  const { mutate, isPending } = useAppMutation<BoardSchema, Board>({
    mutationKey: ['editBoard'],
    mutationFn: data => boardService.editBoard(board.boardId, data),
    onSuccess(data) {
      reset()
      close()
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      if (data.id === board.boardId) {
        queryClient.invalidateQueries({ queryKey: ['board'] })
      }
    },
    onError() {
      toast.error(
        'Failed to update the board. Please try again. If the problem persists, contact support.'
      )
    }
  })

  useEffect(() => {
    reset({
      icon: board.icon,
      title: board.title,
      background: board.background
    })
  }, [board.background, board.icon, board.title, reset])

  const fields = ['icon', 'title', 'background'] as const

  const isFormReadyForSubmit = fields.some(
    field => formState.dirtyFields[field]
  )

  return (
    <Modal
      modalTitle='Edit board'
      onClose={() => {
        close()
        reset()
      }}>
      <form onSubmit={handleSubmit(data => mutate(data))}>
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
          {!isPending ? <Loader /> : 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
