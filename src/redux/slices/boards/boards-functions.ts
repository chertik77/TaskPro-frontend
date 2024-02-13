import type { PayloadAction } from '@reduxjs/toolkit'
import type { Boards, BoardsInitialState } from './boards-types'

export const addNewBoardsFullfilled = (
  state: BoardsInitialState,
  action: PayloadAction<Boards>
) => {
  state.boards.push(action.payload)
}

export const editBoardsFullfilled = (
  state: BoardsInitialState,
  action: PayloadAction<Boards>
) => {
  const board = state.boards.find(board => board._id === action.payload._id)

  if (board) {
    board.title = action.payload.title
    board.icon = action.payload.icon
  }
}

export const deleteBoardsFullfilled = (
  state: BoardsInitialState,
  action: PayloadAction<Boards>
) => {
  const i = state.boards.findIndex(board => board._id === action.payload._id)
  state.boards.splice(i, 1)
}
