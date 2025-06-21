import type { CardTypes } from '@/entities/card'
import type { ColumnTypes } from '@/entities/column'

import { parse } from 'valibot'

import { CardContracts } from '@/entities/card'

export const getMovedCard = (
  columns: ColumnTypes.ColumnsSchema,
  cardId: string
) => {
  let movedCard: CardTypes.CardSchema | undefined

  columns.forEach(column => {
    const foundCard = column.cards.find(card => card.id === cardId)

    if (foundCard) movedCard = parse(CardContracts.CardSchema, foundCard)
  })

  return movedCard
}
