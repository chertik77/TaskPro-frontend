export const TASK_DEADLINES = [
  'Today',
  'Upcoming',
  'Overdue',
  'Far Future',
  'No Deadline'
] as const

export type TaskDeadline = (typeof TASK_DEADLINES)[number]
