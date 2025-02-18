import { DragOverlay } from '@dnd-kit/core'
import { createPortal } from 'react-dom'

import { useDragAndDrop } from '@/entities/dnd'

import { CardListItem } from '../card/CardListItem'
import { ColumnListItem } from '../column/ColumnListItem'

export const KanbanDragOverlay = () => {
  const { activeCard, activeColumn, cards } = useDragAndDrop()

  return createPortal(
    <DragOverlay>
      {activeColumn && (
        <ColumnListItem
          column={activeColumn}
          cards={cards?.filter(c => c.columnId === activeColumn.id)}
        />
      )}
      {activeCard && <CardListItem card={activeCard} />}
    </DragOverlay>,
    document.body
  )
}
