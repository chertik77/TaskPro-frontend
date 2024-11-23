export const priorities = ['High', 'Medium', 'Low', 'Without'] as const

export type Priority = (typeof priorities)[number]
