import type { CardTypes } from '@/entities/card'
import type { ColumnTypes } from '@/entities/column'
import type { UniqueIdentifier } from '@dnd-kit/core'

export function getDraggingCardData(
  cardId: UniqueIdentifier,
  columnId: string | null,
  columns: ColumnTypes.ColumnsSchema,
  cards: CardTypes.CardsSchema
) {
  const columnCards = cards.filter(c => c.columnId === columnId)
  const cardPosition = columnCards.findIndex(c => c.id === cardId)
  const column = columns.find(c => c.id === columnId)

  return {
    columnCards,
    cardPosition,
    column
  }
}
