import type { CardTypes } from '@/entities/card'
import type { ColumnTypes } from '@/entities/column'

export const getDraggingCardData = (
  cardId: string,
  columnId: string | null,
  columns: ColumnTypes.ColumnsSchema,
  cards: CardTypes.CardsSchema
) => {
  const columnCards = cards.filter(c => c.columnId === columnId)
  const cardPosition = columnCards.findIndex(c => c.id === cardId)
  const column = columns.find(c => c.id === columnId)

  return {
    columnCards,
    cardPosition,
    column
  }
}
