import type { ColumnTypes } from '@/entities/column'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

import { EditColumnSchema } from '../edit-column.contract'

export const useEditColumnForm = () => {
  const { data: initialColumn } =
    useModalInstance<ColumnTypes.EditColumnModalSchema>()

  const form = useAppForm(EditColumnSchema, {
    shouldUnregister: false
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    initialColumn,
    form.watch
  )

  const { reset } = form

  useEffect(() => {
    reset(initialColumn)
  }, [reset, initialColumn])

  return { form, initialColumn, isFormReadyForSubmit }
}
