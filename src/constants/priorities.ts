export const priorities = ['Low', 'Medium', 'High', 'Without priority'] as const

export type Priority = (typeof priorities)[number]
