import type { CardTypes } from '@/entities/card'

import { useEffect } from 'react'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

import { EditCardSchema } from '../edit-card.contract'

export const useEditCardForm = (initialCard: CardTypes.EditCardModalSchema) => {
  const form = useAppForm(EditCardSchema, { shouldUnregister: false })

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
