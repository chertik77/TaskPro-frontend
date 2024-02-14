import { UserInitialState } from '../user/user-types'

export type Task = {
  _id: string
  title: string
  board: string
  description: string
  column: ''
  priority: 'Low' | 'Medium' | 'High' | 'Without priority'
  deadline: string
  owner: string
}

export type Column = {
  _id: string
  title: string
  board: string
  owner: string
  tasks: Task[]
}

export type BoardInitialState = {
  board: {
    _id: string
    background: string
    icon: string
    columns: Column[]
    owner: Omit<UserInitialState, 'user'> | ''
    title: string
  }
}
