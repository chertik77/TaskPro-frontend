import type { EditBoardData } from '../model/types'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/lib'

import { EditBoardSchema } from '../model/contract'

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
