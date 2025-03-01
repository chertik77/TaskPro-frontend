import type { CardTypes } from '@/entities/card'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'

import { CardContracts } from '@/entities/card'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

export const useEditCardForm = () => {
  const form = useAppForm(CardContracts.CardSchema, { shouldUnregister: false })

  const { data: initialCard } = useModalInstance<CardTypes.EditCardModalProps>()

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
