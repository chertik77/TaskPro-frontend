import type { Priority } from 'constants/priorities'

export type ColumnTitle = {
  title: string
}

export type Card = {
  id: string
  title: string
  column: string
  description: string
  priority: Priority
  deadline: Date
}

export type Column = {
  id: string
  title: string
  cards: Card[]
}

export type Board = {
  id: string
  title: string
  icon: string
  background: {
    hasWhiteTextColor: boolean
    identifier: string
    url: string
  }
  columns: Column[]
}
