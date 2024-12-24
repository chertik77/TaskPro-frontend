export const PRIORITIES = ['High', 'Medium', 'Low', 'Without'] as const

export type Priority = (typeof PRIORITIES)[number]
