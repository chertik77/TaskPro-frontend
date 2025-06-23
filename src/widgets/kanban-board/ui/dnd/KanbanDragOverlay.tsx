import { DragOverlay } from '@dnd-kit/core'
import { createPortal } from 'react-dom'

import { useDragAndDrop } from '@/features/drag-and-drop'

import { CardListItem } from '../card/CardListItem'
import { ColumnListItem } from '../column/ColumnListItem'

export const KanbanDragOverlay = () => {
  const { activeCard, activeColumn } = useDragAndDrop()

  return createPortal(
    <DragOverlay>
      {activeColumn ? (
        <ColumnListItem
          column={activeColumn}
          isOverlay
        />
      ) : null}
      {activeCard ? (
        <CardListItem
          card={activeCard}
          isOverlay
        />
      ) : null}
    </DragOverlay>,
    document.body
  )
}
