import { createSlice } from '@reduxjs/toolkit'
import { boardApi } from 'redux/api/dashboard/board'
import { columnApi } from 'redux/api/dashboard/column'
import { taskApi } from 'redux/api/dashboard/task'
import {
  addNewBoardFullfilled,
  addNewColumnFullfilled,
  addNewTaskFullfilled,
  deleteBoardFullfilled,
  deleteColumnFullfilled,
  deleteTaskFullfilled,
  editBoardFullfilled,
  editNewColumnFullfilled,
  editTaskFullfilled,
  getBoardByNameFullfilled
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
        boardApi.endpoints.getBoardByName.matchFulfilled,
        getBoardByNameFullfilled
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
        taskApi.endpoints.addNewTask.matchFulfilled,
        addNewTaskFullfilled
      )
      .addMatcher(taskApi.endpoints.editTask.matchFulfilled, editTaskFullfilled)
      .addMatcher(
        taskApi.endpoints.deleteTask.matchFulfilled,
        deleteTaskFullfilled
      )
  },
  selectors: {
    selectBoard: state => state.board,
    selectColumns: state => state.board.columns
  }
})

export const { selectBoard, selectColumns } = boardSlice.selectors
export const boardReducer = boardSlice.reducer
