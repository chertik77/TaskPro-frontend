import type { DraggableAttributes, UniqueIdentifier } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import type { ElementType, ReactNode } from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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
  const { transition, transform, ...sortable } = useSortable({
    id: entity.id,
    data: { type: draggableType, entity }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return sortable.isDragging ? (
    <WhileDraggingComponent
      ref={sortable.setNodeRef}
      style={style}
    />
  ) : (
    children({ ...sortable, style })
  )
}
