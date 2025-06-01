import type { ColumnTypes } from '@/entities/column'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

import { EditColumnSchema } from '../edit-column.contract'

export const useEditColumnForm = (
  initialColumn: Omit<ColumnTypes.EditColumnDialogProps, 'id'>
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
