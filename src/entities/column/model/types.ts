import type { CardTypes } from '@/entities/card'
import type { InferInput } from 'valibot'
import type { ColumnSchema } from '../api/contracts'

export type Column = {
  id: string
  title: string
  order: number
  boardId: string
  cards: CardTypes.Card[]
}

export type ColumnSchema = InferInput<typeof ColumnSchema>

export type EditColumnModalProps = Pick<Column, 'title' | 'id'>
