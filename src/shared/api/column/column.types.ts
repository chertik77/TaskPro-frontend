import type { InferInput } from 'valibot'
import type { CardTypes } from '../card'
import type { ColumnSchema } from './column.contracts'

export type Column = {
  id: string
  title: string
  order: number
  boardId: string
  cards: CardTypes.Card[]
}

export type ColumnSchema = InferInput<typeof ColumnSchema>

export type EditColumnModalProps = Pick<Column, 'title' | 'id'>
