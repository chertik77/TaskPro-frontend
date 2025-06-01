import type { BoardTypes } from '@/entities/board'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

import { EditBoardSchema } from '../edit-board.contract'

export const useEditBoardForm = (
  initialBoard: BoardTypes.EditBoardFormValues
) => {
  const form = useAppForm(EditBoardSchema, {
    defaultValues: initialBoard
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    form.formState.defaultValues!,
    form.watch
  )

  return { form, isFormReadyForSubmit }
}
