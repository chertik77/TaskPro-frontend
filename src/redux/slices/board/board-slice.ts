import { createSlice } from '@reduxjs/toolkit'
import { boardApi } from 'redux/api/dashboard/board'
import { taskApi } from 'redux/api/dashboard/card'
import { columnApi } from 'redux/api/dashboard/column'
import {
  addNewBoardFullfilled,
  addNewCardFullfilled,
  addNewColumnFullfilled,
  changeCardColumnFullfilled,
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
  reducers: {
    filter: (state, action) => {
      state.board.filter = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        taskApi.endpoints.changeCardColumn.matchFulfilled,
        changeCardColumnFullfilled
      )
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
    selectFilter: state => state.board.filter,
    selectColumns: state => state.board.columns
  }
})

export const { selectBoard, selectColumns, selectFilter } = boardSlice.selectors
export const { filter } = boardSlice.actions
export const boardReducer = boardSlice.reducer
