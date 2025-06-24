import type { CardTypes } from '@/entities/card'
import type { ColumnTypes } from '@/entities/column'

export const addMovedCardToColumn = (
  columns: ColumnTypes.ColumnsSchema,
  newColumnId: string,
  movedCard: CardTypes.CardSchema
) => {
  const finalColumns = columns.map(column => {
    if (column.id === newColumnId && movedCard) {
      let newOrder = 1

      if (column.cards.length > 0) {
        const maxOrder = Math.max(...column.cards.map(card => card.order || 0))

        newOrder = maxOrder + 1
      }

      return {
        ...column,
        cards: [
          ...column.cards,
          { ...movedCard, columnId: column.id, order: newOrder }
        ]
      }
    }

    return column
  })

  return finalColumns
}
