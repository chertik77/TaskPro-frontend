import type { EditBoardData } from '../edit-board.types'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

import { EditBoardSchema } from '../edit-board.contract'

export const useEditBoardForm = (formValues: EditBoardData) => {
  const form = useAppForm(EditBoardSchema, {
    defaultValues: formValues
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    form.formState.defaultValues!,
    form.watch
  )

  return { form, isFormReadyForSubmit }
}
