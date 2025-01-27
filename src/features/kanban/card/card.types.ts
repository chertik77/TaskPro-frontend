import type { Priority } from '../shared/constants'

export type Card = {
  id: string
  title: string
  order: number
  columnId: string
  description: string
  priority: Priority
  deadline: Date
}

export type AddCardModalProps = Pick<Card, 'columnId'>
export type EditCardModalProps = Omit<Card, 'columnId' | 'order'>
