import type { BoardTypes } from '@/entities/board'

import { useEffect } from 'react'
import {
  BoardContracts,
  RadioInputBgImages,
  RadioInputIcons
} from '@/entities/board'
import { useModalInstance } from 'react-modal-state'

import { Button, Field, Modal } from '@/shared/components/ui'
import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

import { useEditBoard } from '../hooks/useEditBoard'

export const EditBoardModal = () => {
  const { data: board } = useModalInstance<BoardTypes.EditBoardModalProps>()

  const { register, reset, handleSubmit, control, formState, watch } =
    useAppForm(BoardContracts.BoardSchema, { shouldUnregister: false })

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
