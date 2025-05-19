import type { CardTypes } from '@/entities/card'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

import { EditCardSchema } from '../edit-card.contract'

export const useEditCardForm = (initialCard: CardTypes.EditCardModalSchema) => {
  const form = useAppForm(EditCardSchema, {
    defaultValues: initialCard
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    initialCard,
    form.watch
  )

  return { form, isFormReadyForSubmit }
}
