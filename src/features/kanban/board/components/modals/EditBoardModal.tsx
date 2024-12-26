import type { EditBoardModalProps } from 'features/kanban/board/board.types'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'

import { BoardSchema } from 'features/kanban/board/board.schema'
import { useEditBoard } from 'features/kanban/board/hooks'

import { Button, Field, Modal } from 'components/ui'
import { useAppForm, useIsFormReadyForSubmit } from 'hooks'

import { RadioInputBgImages } from './RadioInputBgImages'
import { RadioInputIcons } from './RadioInputIcons'

export const EditBoardModal = () => {
  const { data: board } = useModalInstance<EditBoardModalProps>()

  const { register, reset, handleSubmit, control, formState, watch } =
    useAppForm(BoardSchema, { shouldUnregister: false })

  const { mutate: editBoard, isPending } = useEditBoard(reset)

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(board, watch)

  useEffect(() => {
    reset(board)
  }, [reset, board])

  return (
    <Modal modalTitle='Edit board'>
      <form onSubmit={handleSubmit(data => editBoard(data))}>
        <Field
          {...register('title', { setValueAs: value => value.trim() })}
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
