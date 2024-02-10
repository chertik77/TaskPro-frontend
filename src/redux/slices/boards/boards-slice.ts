import { createSlice } from '@reduxjs/toolkit'
import { boardApi } from 'redux/api/dashboard/board'
import {
  addNewBoardsFullfilled,
  deleteBoardsFullfilled,
  editBoardsFullfilled
} from './boards-functions'
import { BoardsInitialState } from './boards-types'

const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: [{ _id: '', title: '', icon: '', owner: '' }]
  } as BoardsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        boardApi.endpoints.addNewBoard.matchFulfilled,
        addNewBoardsFullfilled
      )
      .addMatcher(
        boardApi.endpoints.editBoard.matchFulfilled,
        editBoardsFullfilled
      )
      .addMatcher(
        boardApi.endpoints.deleteBoard.matchFulfilled,
        deleteBoardsFullfilled
      )
  },
  selectors: {
    selectBoards: state => state.boards
  }
})

export const { selectBoards } = boardsSlice.selectors
export const boardsReducer = boardsSlice.reducer
