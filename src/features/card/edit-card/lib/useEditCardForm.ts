import type { EditCardFormValues } from '../model/types'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/lib'

import { EditCardSchema } from '../model/contract'

export const useEditCardForm = (formValues: EditCardFormValues) => {
  const form = useAppForm(EditCardSchema, {
    defaultValues: formValues
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    formValues,
    form.watch
  )

  return { form, isFormReadyForSubmit }
}
