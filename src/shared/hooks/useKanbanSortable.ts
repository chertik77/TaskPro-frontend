import type { UseDraggableArguments } from '@dnd-kit/core'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type UseKanbanSortableProps = Omit<UseDraggableArguments, 'data'> & {
  data: { type: 'card' | 'column' } & Record<string, unknown>
}

export const useKanbanSortable = (props: UseKanbanSortableProps) => {
  const { transition, transform, ...sortable } = useSortable(props)

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return { ...sortable, style }
}
