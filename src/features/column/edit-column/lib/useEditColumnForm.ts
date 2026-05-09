import type { EditColumnFormValues } from '../model/types'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/lib'

import { EditColumnSchema } from '../model/contract'

export const useEditColumnForm = (formValues: EditColumnFormValues) => {
  const form = useAppForm(EditColumnSchema, {
    defaultValues: formValues
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    formValues,
    form.watch
  )

  return { form, isFormReadyForSubmit }
}
