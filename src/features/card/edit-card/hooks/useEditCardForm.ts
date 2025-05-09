import type { CardTypes } from '@/entities/card'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

import { EditCardSchema } from '../edit-card.contract'

export const useEditCardForm = () => {
  const form = useAppForm(EditCardSchema, { shouldUnregister: false })

  const { data: initialCard } =
    useModalInstance<CardTypes.EditCardModalSchema>()

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    initialCard,
    form.watch
  )

  const { reset } = form

  useEffect(() => {
    reset(initialCard)
  }, [reset, initialCard])

  return { form, initialCard, isFormReadyForSubmit }
}
