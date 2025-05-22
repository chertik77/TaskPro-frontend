import type { CardTypes } from '@/entities/card'
import type { ColumnTypes } from '@/entities/column'

export const getMovedCard = (
  columns: ColumnTypes.ColumnsSchema,
  cardId: string
) => {
  let movedCard: CardTypes.CardSchema | undefined

  columns.forEach(column => {
    const foundCard = column.cards.find(card => card.id === cardId)

    if (foundCard) movedCard = foundCard
  })

  return movedCard
}
