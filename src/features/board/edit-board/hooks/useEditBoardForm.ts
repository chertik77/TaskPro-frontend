import type { BoardTypes } from '@/entities/board'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

import { EditBoardSchema } from '../edit-board.contract'

export const useEditBoardForm = (
  initialBoard: BoardTypes.EditBoardModalSchema
) => {
  const form = useAppForm(EditBoardSchema, {
    defaultValues: initialBoard
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    initialBoard,
    form.watch
  )

  return { form, isFormReadyForSubmit }
}
