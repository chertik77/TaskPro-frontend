import type { Priority } from './card.constants'

export type Card = {
  id: string
  title: string
  order: number
  columnId: string
  description: string
  priority: Priority
  deadline: Date
}
