import type { Active, ClientRect, DroppableContainer } from '@dnd-kit/core'
import type { RectMap } from '@dnd-kit/core/dist/store'
import type { Coordinates } from '@dnd-kit/utilities'
import type { ClassValue } from 'clsx'
import type { Priority } from 'constants/priorities'

import { pointerWithin, rectIntersection } from '@dnd-kit/core'
import { clsx } from 'clsx'
import { format, isToday } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const getPriorityColor = (priority: Priority) => {
  const priorityColors: { [key: string]: string } = {
    Low: 'bg-priority-low',
    Medium: 'bg-priority-medium',
    High: 'bg-brand',
    default: 'bg-black/30 dark:bg-white/30'
  }

  return priorityColors[priority] || priorityColors.default
}

export const formatTodayDate = (date: Date) =>
  isToday(date)
    ? `Today, ${format(date, 'MMMM d')}`
    : format(date, 'dd/MM/yyyy')

export const collisionDetectionAlgorithm = (args: {
  active: Active
  collisionRect: ClientRect
  droppableRects: RectMap
  droppableContainers: DroppableContainer[]
  pointerCoordinates: Coordinates | null
}) => {
  const type = args.active?.data.current?.type

  if (type === 'card') return pointerWithin(args)

  if (type === 'column') return rectIntersection(args)

  return pointerWithin(args)
}
