import type {
  AnimateLayoutChanges,
  UseSortableArguments
} from '@dnd-kit/sortable'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { sortableTransition } from '../config/animations'

type UseDndSortableProps = Omit<UseSortableArguments, 'data'> & {
  data: { type: 'task' | 'column' } & Record<string, unknown>
}

const neverAnimateLayoutChanges: AnimateLayoutChanges = () => false

export const useDndSortable = (props: UseDndSortableProps) => {
  const { transition, transform, ...sortable } = useSortable({
    animateLayoutChanges: neverAnimateLayoutChanges,
    transition: sortableTransition,
    ...props
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  }

  return { ...sortable, style }
}
