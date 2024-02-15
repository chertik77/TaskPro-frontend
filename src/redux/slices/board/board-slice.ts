import { createSlice } from '@reduxjs/toolkit'
import { boardApi } from 'redux/api/dashboard/board'
import { taskApi } from 'redux/api/dashboard/card'
import { columnApi } from 'redux/api/dashboard/column'
import {
  addNewBoardFullfilled,
  addNewCardFullfilled,
  addNewColumnFullfilled,
  deleteBoardFullfilled,
  deleteCardFullfilled,
  deleteColumnFullfilled,
  editBoardFullfilled,
  editCardFullfilled,
  editNewColumnFullfilled,
  getBoardByIdFullfilled
} from './board-functions'
import type { BoardInitialState } from './board-types'

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    board: {}
  } as BoardInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        boardApi.endpoints.getBoardById.matchFulfilled,
        getBoardByIdFullfilled
      )
      .addMatcher(
        boardApi.endpoints.addNewBoard.matchFulfilled,
        addNewBoardFullfilled
      )
      .addMatcher(
        boardApi.endpoints.editBoard.matchFulfilled,
        editBoardFullfilled
      )
      .addMatcher(
        boardApi.endpoints.deleteBoard.matchFulfilled,
        deleteBoardFullfilled
      )
      .addMatcher(
        columnApi.endpoints.addNewColumn.matchFulfilled,
        addNewColumnFullfilled
      )
      .addMatcher(
        columnApi.endpoints.editColumn.matchFulfilled,
        editNewColumnFullfilled
      )
      .addMatcher(
        columnApi.endpoints.deleteColumn.matchFulfilled,
        deleteColumnFullfilled
      )
      .addMatcher(
        taskApi.endpoints.addNewCard.matchFulfilled,
        addNewCardFullfilled
      )
      .addMatcher(taskApi.endpoints.editCard.matchFulfilled, editCardFullfilled)
      .addMatcher(
        taskApi.endpoints.deleteCard.matchFulfilled,
        deleteCardFullfilled
      )
  },
  selectors: {
    selectBoard: state => state.board,
    selectColumns: state => state.board.columns
  }
})

export const { selectBoard, selectColumns } = boardSlice.selectors
export const boardReducer = boardSlice.reducer
