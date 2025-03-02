import type { ColumnTypes } from '@/entities/column'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'

import { ColumnContracts } from '@/entities/column'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

export const useEditColumnForm = () => {
  const { data: initialColumn } =
    useModalInstance<ColumnTypes.EditColumnModalProps>()

  const form = useAppForm(ColumnContracts.ColumnSchema, {
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
