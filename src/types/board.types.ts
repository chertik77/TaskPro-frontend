import type { Priority } from 'features/user/model/constants'

export type ColumnTitle = {
  title: string
}

export type Card = {
  id: string
  title: string
  order: number
  columnId: string
  description: string
  priority: Priority
  deadline: Date
}

export type Column = {
  id: string
  title: string
  order: number
  boardId: string
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

export type UpdateOrderData = {
  ids: string[]
}
