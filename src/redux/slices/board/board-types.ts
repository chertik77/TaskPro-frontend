import { UserInitialState } from '../user/user-types'

type Task = {
  _id: string
  title: string
  description: string
  column: string
  priority: string
  deadline: Date
}

type Column = {
  _id: string
  title: string
  board: string
  owner: Omit<UserInitialState, 'user'> | null
  tasks: Task[]
}

export type Board = {
  _id: string
  background: string
  icon: string
  columns: Column[]
  owner: Omit<UserInitialState, 'user'> | null
  title: string
}

export type BoardInitialState = {
  boards: Board[]
}
