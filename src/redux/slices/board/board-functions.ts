import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoardInitialState, Column, Task } from './board-types'

export const addNewBoardFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<BoardInitialState['board']>
) => {
  state.board = action.payload
}

export const editBoardFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<BoardInitialState['board']>
) => {
  state.board.title = action.payload.title
  state.board.icon = action.payload.icon
  state.board.background = action.payload.background
}

export const deleteBoardFullfilled = (state: BoardInitialState) => {
  state.board = {
    _id: '',
    title: '',
    icon: '',
    background: '',
    owner: null,
    columns: [
      {
        title: '',
        board: '',
        owner: '',
        _id: '',
        tasks: [
          {
            _id: '',
            title: '',
            description: '',
            column: null,
            owner: '',
            board: '',
            priority: '',
            deadline: ''
          }
        ]
      }
    ]
  }
}

export const addNewColumnFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Column>
) => {
  state.board.columns.push(action.payload)
}

export const editNewColumnFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Column>
) => {
  const column = state.board.columns.find(
    column => column._id === action.payload._id
  )

  if (column) {
    column.title = action.payload.title
  }
}

export const deleteColumnFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Column>
) => {
  state.board.columns.filter(column => column._id !== action.payload._id)
}

export const addNewTaskFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Task>
) => {
  const column = state.board.columns.find(
    column => column._id === action.payload.column?._id
  )

  column?.tasks.push(action.payload)
}

export const editTaskFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Task>
) => {
  const task = state.board.columns
    .find(column => column._id === action.payload.column?._id)
    ?.tasks.find(task => task._id === action.payload._id)

  if (task) {
    task.title = action.payload.title
    task.description = action.payload.description
    task.priority = action.payload.priority
    task.deadline = action.payload.deadline
  }
}

export const deleteTaskFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Task>
) => {
  state.board.columns
    .find(column => column._id === action.payload.column?._id)
    ?.tasks.filter(task => task._id !== action.payload._id)
}
