export const priorities = ['Low', 'Medium', 'High', 'Without'] as const

export type Priority = (typeof priorities)[number]
