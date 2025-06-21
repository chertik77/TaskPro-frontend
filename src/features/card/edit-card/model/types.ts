import type { CardTypes } from '@/entities/card'

export type EditCardFormValues = Omit<
  CardTypes.CardSchema,
  'id' | 'columnId' | 'order'
>

export type EditCardData = {
  cardId: string
  formValues: EditCardFormValues
}
