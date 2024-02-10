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
  editTaskFullfilled
} from './board-functions'
import type { BoardInitialState } from './board-types'

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    board: {
      _id: '',
      title: '',
      icon: '',
      background: '',
      owner: '',
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
              column: '',
              owner: '',
              board: '',
              priority: '',
              deadline: ''
            }
          ]
        }
      ]
    }
  } as BoardInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
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
    selectColumns: state => state.board.columns,
    selectTasks: state => state.board.columns.map(column => column.tasks)
  }
})

export const { selectBoard, selectColumns, selectTasks } = boardSlice.selectors
export const boardReducer = boardSlice.reducer
