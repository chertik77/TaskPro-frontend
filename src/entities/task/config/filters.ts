import type { TaskPriority } from '@/shared/api'

export const TASK_SORT_FIELDS = [
  'manual',
  'title',
  'priority',
  'deadline',
  'created'
] as const
export const TASK_SORT_DIRECTIONS = ['asc', 'desc'] as const

export const TASK_SORT_FIELD_LABELS: Record<TaskSortField, string> = {
  manual: 'Board order',
  title: 'Title',
  priority: 'Priority',
  deadline: 'Deadline',
  created: 'Date created'
}

export const TASK_PRIORITY_ORDER: Record<TaskPriority, number> = {
  without: 0,
  low: 1,
  medium: 2,
  high: 3
}

export type TaskSortField = (typeof TASK_SORT_FIELDS)[number]
export type TaskSortDirection = (typeof TASK_SORT_DIRECTIONS)[number]
