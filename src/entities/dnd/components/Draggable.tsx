import type { DraggableAttributes, UniqueIdentifier } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import type { ElementType, ReactNode } from 'react'

import { useKanbanSortable } from '@/shared/hooks'

type Style = {
  transition: string | undefined
  transform: string | undefined
}

type ChildrenProps = {
  setNodeRef: (element: HTMLElement | null) => void
  listeners: SyntheticListenerMap | undefined
  attributes: DraggableAttributes
  isDragging: boolean
  style: Style
}

type DraggableProps = {
  draggableType: string
  children: (props: ChildrenProps) => ReactNode
  entity: { id: UniqueIdentifier } & Record<string, unknown>
  WhileDraggingComponent: ElementType
}

export const Draggable = ({
  draggableType,
  children,
  entity,
  WhileDraggingComponent
}: DraggableProps) => {
  const sortable = useKanbanSortable({
    id: entity.id,
    data: { type: draggableType, entity }
  })

  return sortable.isDragging ? (
    <WhileDraggingComponent
      ref={sortable.setNodeRef}
      style={sortable.style}
    />
  ) : (
    children(sortable)
  )
}
