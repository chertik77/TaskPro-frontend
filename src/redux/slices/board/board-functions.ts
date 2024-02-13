import type { PayloadAction } from '@reduxjs/toolkit'
import type { BoardInitialState, Column, Task } from './board-types'

export const addNewBoardFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<BoardInitialState['board']>
) => {
  state.board = action.payload
}

export const getBoardByNameFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<BoardInitialState['board']>
) => {
  // console.log(action.payload)
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
  Object.assign(state, { board: {} })
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
  const columns = state.board.columns.map(column =>
    column._id === action.payload._id
      ? { ...column, ...action.payload }
      : column
  )

  state.board.columns = columns
}

export const deleteColumnFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Column>
) => {
  const i = state.board.columns.findIndex(
    column => column._id === action.payload._id
  )
  state.board.columns.splice(i, 1)
}

export const addNewTaskFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Task>
) => {
  const column = state.board.columns.find(
    column => column._id === action.payload.column
  )

  column?.tasks.push(action.payload)
}

export const editTaskFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Task>
) => {
  const task = state.board.columns
    .find(column => column._id === action.payload.column)
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
  const column = state.board.columns.find(
    column => column._id === action.payload.column
  )
  if (column) {
    const taskIndex = column.tasks.findIndex(
      task => task._id === action.payload._id
    )
    if (taskIndex !== -1) {
      column.tasks.splice(taskIndex, 1)
    }
  }
}
