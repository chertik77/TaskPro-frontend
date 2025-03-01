import type { ColumnTypes } from '@/entities/column'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'

import { ColumnContracts } from '@/entities/column'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

export const useEditColumnForm = () => {
  const { data: initialColumn } =
    useModalInstance<ColumnTypes.EditColumnModalProps>()

  const form = useAppForm(ColumnContracts.ColumnSchema, {
    defaultValues: { title: initialColumn.title }
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    { title: initialColumn.title },
    form.watch
  )

  const { reset } = form

  useEffect(() => {
    reset({ title: initialColumn.title })
  }, [reset, initialColumn.title])

  return { form, initialColumn, isFormReadyForSubmit }
}
