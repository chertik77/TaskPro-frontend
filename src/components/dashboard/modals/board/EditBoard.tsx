import { useEffect } from 'react'
import { useModal, useModalInstance } from 'react-modal-state'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm } from 'hooks'
import { useEditBoard } from 'hooks/board'

import { BoardSchema } from 'lib/schemas'

import { RadioInputBgImages } from './RadioInputBgImages'
import { RadioInputIcons } from './RadioInputIcons'

export const EditBoardModal = () => {
  const { close } = useModal(EditBoardModal)

  const { data: board } = useModalInstance<{
    id: string
    background: string
    title: string
    icon: string
  }>()

  const { register, reset, handleSubmit, control, formState } = useAppForm(
    BoardSchema,
    { defaultValues: { title: board.title } }
  )

  const { mutate, isPending } = useEditBoard(board.id, reset)

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
        />
        <RadioInputIcons control={control} />
        <RadioInputBgImages control={control} />
        <Button
          type='submit'
          isPlusIcon
          shouldShowLoader={isPending}
          disabled={isPending || !isFormReadyForSubmit}>
          {!isPending && 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
