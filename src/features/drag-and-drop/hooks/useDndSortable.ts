import type { UseSortableArguments } from '@dnd-kit/sortable'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type UseKanbanSortableProps = Omit<UseSortableArguments, 'data'> & {
  data: { type: 'card' | 'column' } & Record<string, unknown>
}

export const useDndSortable = (props: UseKanbanSortableProps) => {
  const { transition, transform, ...sortable } = useSortable(props)

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  }

  return { ...sortable, style }
}
