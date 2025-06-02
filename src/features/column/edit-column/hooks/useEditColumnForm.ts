import type { EditColumnData } from '../edit-column.types'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

import { EditColumnSchema } from '../edit-column.contract'

export const useEditColumnForm = (
  initialColumn: Pick<EditColumnData, 'title'>
) => {
  const form = useAppForm(EditColumnSchema, {
    defaultValues: initialColumn
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    form.formState.defaultValues!,
    form.watch
  )

  return { form, isFormReadyForSubmit }
}
