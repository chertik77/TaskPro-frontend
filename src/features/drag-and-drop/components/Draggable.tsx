import type { DraggableAttributes, UseDraggableArguments } from '@dnd-kit/core'
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
  draggableArguments: UseDraggableArguments
  children: (props: ChildrenProps) => ReactNode
  WhileDraggingComponent: ElementType
}

export const Draggable = ({
  draggableArguments,
  children,
  WhileDraggingComponent
}: DraggableProps) => {
  const { transition, transform, ...sortable } = useSortable(draggableArguments)

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
