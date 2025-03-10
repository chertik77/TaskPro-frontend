import type { InferInput } from 'valibot'
import type { CardSchema } from '../api/conracts'
import type { DEADLINES, PRIORITIES } from './constants'

export type Card = {
  id: string
  title: string
  order: number
  columnId: string
  description: string
  priority: Priority
  deadline: Date
}

export type CardSchema = InferInput<typeof CardSchema>

export type Priority = (typeof PRIORITIES)[number]

export type Deadline = (typeof DEADLINES)[number]

export type AddCardModalProps = Pick<Card, 'columnId'>

export type EditCardModalProps = Omit<Card, 'columnId' | 'order'>
