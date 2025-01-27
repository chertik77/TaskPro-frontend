export const PRIORITIES = ['High', 'Medium', 'Low', 'Without'] as const
export const DEADLINES = ['Upcoming', 'Overdue', 'Far Future'] as const

export type Priority = (typeof PRIORITIES)[number]
export type Deadline = (typeof DEADLINES)[number]
