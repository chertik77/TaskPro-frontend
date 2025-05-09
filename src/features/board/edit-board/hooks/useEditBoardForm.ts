import type { BoardTypes } from '@/entities/board'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

import { EditBoardSchema } from '../edit-board.contract'

export const useEditBoardForm = () => {
  const { data: initialBoard } =
    useModalInstance<BoardTypes.EditBoardModalSchema>()

  const form = useAppForm(EditBoardSchema, {
    shouldUnregister: false
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    initialBoard,
    form.watch
  )

  const { reset } = form

  useEffect(() => {
    reset(initialBoard)
  }, [reset, initialBoard])

  return { form, initialBoard, isFormReadyForSubmit }
}
