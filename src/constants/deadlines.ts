export const deadlines = ['Upcoming', 'Overdue', 'Far Future'] as const

export type Deadline = (typeof deadlines)[number]
