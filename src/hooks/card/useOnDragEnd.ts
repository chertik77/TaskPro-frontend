import type { OnDragEndResponder } from '@hello-pangea/dnd'
import type { Column } from 'types'

import { useUpdateCardsOrder } from 'hooks/card'

function reOrder<T>(array: T[], startIndex: number, endIndex: number) {
  const result = Array.from(array)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

type UseOnDragEndProps = {
  orderedColumns: Column[] | undefined
  setOrderedColumns: (columns: Column[]) => void
}

export const useOnDragEnd = ({
  orderedColumns,
  setOrderedColumns
}: UseOnDragEndProps) => {
  const { mutate } = useUpdateCardsOrder()
  const onDragEnd: OnDragEndResponder = ({ source, destination }) => {
    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const newOrderedColumns = orderedColumns ? [...orderedColumns] : []

    const sourceColumn = newOrderedColumns.find(
      column => column.id === source.droppableId
    )

    const destinationColumn = newOrderedColumns.find(
      column => column.id === destination.droppableId
    )

    if (!sourceColumn && !destinationColumn) return

    if (sourceColumn && !sourceColumn.cards) {
      sourceColumn.cards = []
    }

    if (destinationColumn && !destinationColumn.cards) {
      destinationColumn.cards = []
    }

    if (source.droppableId === destination.droppableId) {
      const reorderedCards = reOrder(
        sourceColumn?.cards || [],
        source.index,
        destination.index
      )

      reorderedCards.forEach((card, index) => {
        card.order = index
      })

      sourceColumn!.cards = reorderedCards

      setOrderedColumns(newOrderedColumns)

      mutate({
        ids: reorderedCards.map(card => card.id),
        columnId: source.droppableId
      })
    } else {
      const [movedCard] = sourceColumn?.cards.splice(source.index, 1) || []

      movedCard.columnId = destination.droppableId

      destinationColumn?.cards.splice(destination.index, 0, movedCard)

      sourceColumn?.cards.forEach((card, index) => {
        card.order = index
      })

      destinationColumn?.cards.forEach((card, index) => {
        card.order = index
      })

      setOrderedColumns(newOrderedColumns)

      mutate({
        ids: destinationColumn!.cards.map(card => card.id),
        columnId: destination.droppableId
      })
    }
  }

  return { onDragEnd }
}
