import type { UseDraggableArguments } from '@dnd-kit/core'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export const useKanbanSortable = (props: UseDraggableArguments) => {
  const { transition, transform, ...sortable } = useSortable(props)

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return { ...sortable, style }
}
