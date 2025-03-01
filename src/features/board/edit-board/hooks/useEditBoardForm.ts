import type { BoardTypes } from '@/entities/board'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'

import { BoardContracts } from '@/entities/board'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

export const useEditBoardForm = () => {
  const { data: initialBoard } =
    useModalInstance<BoardTypes.EditBoardModalProps>()

  const form = useAppForm(BoardContracts.BoardSchema, {
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
