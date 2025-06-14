import type { EditCardFormValues } from '../edit-card.types'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/lib'

import { EditCardSchema } from '../edit-card.contract'

export const useEditCardForm = (formValues: EditCardFormValues) => {
  const form = useAppForm(EditCardSchema, {
    defaultValues: formValues
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    form.formState.defaultValues!,
    form.watch
  )

  return { form, isFormReadyForSubmit }
}
