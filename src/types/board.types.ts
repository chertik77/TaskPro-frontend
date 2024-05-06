export type ColumnTitle = {
  title: string
}

export type Card = {
  _id: string
  title: string
  column: string
  board: string
  description: string
  priority: 'Low' | 'Medium' | 'High' | 'Without priority'
  deadline: string
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
