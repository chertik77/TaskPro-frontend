import type { PayloadAction } from '@reduxjs/toolkit'
import type { Board, BoardInitialState } from './board-types'

export const addNewBoardFullfilled = (
  state: BoardInitialState,
  action: PayloadAction<Board>
) => {
  state.boards.push(action.payload)
}
