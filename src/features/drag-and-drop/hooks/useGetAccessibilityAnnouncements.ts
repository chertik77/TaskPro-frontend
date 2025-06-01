import type { Announcements } from '@dnd-kit/core'
import type { DragAndDropContext } from '../dnd.types'

import { useRef } from 'react'

import { getDraggingCardData } from '../utils/getDraggingCardData'

export const useGetAccessibilityAnnouncements = ({
  columns,
  cards
}: Pick<DragAndDropContext, 'columns' | 'cards'>): Announcements => {
  const activeColumnCardId = useRef<string | null>(null)

  return {
    onDragStart({ active }) {
      if (!active) return

      if (active.data.current?.type === 'column') {
        const activeColumnIdx = columns.findIndex(c => c.id === active.id)
        const activeColumn = columns[activeColumnIdx]

        return `Picked up column ${activeColumn.title} at position: ${
          activeColumnIdx + 1
        } of ${columns.length}`
      } else if (active.data.current?.type === 'card') {
        activeColumnCardId.current = active.data.current.card.columnId

        const { columnCards, cardPosition, column } = getDraggingCardData(
          active.id,
          activeColumnCardId.current,
          columns,
          cards
        )

        return `Picked up card ${
          active.data.current.card.title
        } at position: ${cardPosition + 1} of ${
          columnCards.length
        } in column ${column?.title}`
      }
    },
    onDragOver({ active, over }) {
      if (!active || !over) return

      if (
        active.data.current?.type === 'column' &&
        over.data.current?.type === 'column'
      ) {
        const overColumnIdx = columns.findIndex(c => c.id === over.id)

        return `Column ${active.data.current.column.title} was moved over ${
          over.data.current.column.title
        } at position ${overColumnIdx + 1} of ${columns.length}`
      } else if (
        active.data.current?.type === 'card' &&
        over.data.current?.type === 'card'
      ) {
        const { columnCards, cardPosition, column } = getDraggingCardData(
          over.id,
          over.data.current.card.columnId,
          columns,
          cards
        )

        if (over.data.current.card.columnId !== activeColumnCardId.current) {
          return `Card ${
            active.data.current.card.title
          } was moved over column ${column?.title} in position ${
            cardPosition + 1
          } of ${columnCards.length}`
        }

        return `Card was moved over position ${cardPosition + 1} of ${
          columnCards.length
        } in column ${column?.title}`
      }
    },
    onDragEnd({ active, over }) {
      if (!active || !over) {
        activeColumnCardId.current = null

        return
      }

      if (
        active.data.current?.type === 'column' &&
        over.data.current?.type === 'column'
      ) {
        const overColumnPosition = columns.findIndex(c => c.id === over.id)

        return `Column ${
          active.data.current.column.title
        } was dropped into position ${overColumnPosition + 1} of ${
          columns.length
        }`
      } else if (
        active.data.current?.type === 'card' &&
        over.data.current?.type === 'card'
      ) {
        const { columnCards, cardPosition, column } = getDraggingCardData(
          over.id,
          over.data.current.card.columnId,
          columns,
          cards
        )

        if (over.data.current.card.columnId !== activeColumnCardId.current) {
          return `Card was dropped into column ${column?.title} in position ${
            cardPosition + 1
          } of ${columnCards.length}`
        }

        return `Card was dropped into position ${cardPosition + 1} of ${
          columnCards.length
        } in column ${column?.title}`
      }

      activeColumnCardId.current = null
    },
    onDragCancel({ active }) {
      activeColumnCardId.current = null

      if (!active) return

      return `Dragging ${active.data.current?.type} cancelled.`
    }
  }
}
