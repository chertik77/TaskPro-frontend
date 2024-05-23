import type { EnumPriority } from 'constants/priorities'

export type ColumnTitle = {
  title: string
}

export type Card = {
  _id: string
  title: string
  column: string
  board: string
  description: string
  priority: EnumPriority
  deadline: Date
}

export type Column = {
  _id: string
  title: string
  cards: Card[]
}

export type Board = {
  _id: string
  title: string
  icon: string
  columns: Column[]
}
