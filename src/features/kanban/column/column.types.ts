import type { Card } from '../card/card.types'

export type Column = {
  id: string
  title: string
  order: number
  boardId: string
  cards: Card[]
}

export type ColumnTitle = Pick<Column, 'title'>
