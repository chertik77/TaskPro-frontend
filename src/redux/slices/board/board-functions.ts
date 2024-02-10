import type { PayloadAction } from '@reduxjs/toolkit'
import type { Board, BoardInitialState } from './board-types'

export const addNewBoardFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Board>
) => {
  state.boards.push(action.payload)
}

export const editBoardFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Board>
) => {
  const updatedBoard = action.payload
  const index = state.boards.findIndex(board => board._id === updatedBoard._id)
  if (index !== -1) {
    state.boards[index] = updatedBoard
  }
}

export const deleteBoardFullfilled = (state: BoardInitialState) => {
  state.boards = []
}
