export const DEADLINES = ['Upcoming', 'Overdue', 'Far Future'] as const
export type Deadline = (typeof DEADLINES)[number]
