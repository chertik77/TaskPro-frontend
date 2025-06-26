import type { UseSortableArguments } from '@dnd-kit/sortable'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type UseDndSortableProps = Omit<UseSortableArguments, 'data'> & {
  data: { type: 'card' | 'column' } & Record<string, unknown>
}

export const useDndSortable = (props: UseDndSortableProps) => {
  const { transition, transform, ...sortable } = useSortable(props)

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  }

  return { ...sortable, style }
}
