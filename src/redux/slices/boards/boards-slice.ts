import { createSlice } from '@reduxjs/toolkit'
import { boardApi } from 'redux/api/dashboard/board'
import {
  addNewBoardsFullfilled,
  deleteBoardsFullfilled,
  editBoardsFullfilled,
  getAllBoardsFullfilled
} from './boards-functions'
import { BoardsInitialState } from './boards-types'

const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: []
  } as BoardsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        boardApi.endpoints.getAllBoards.matchFulfilled,
        //@ts-expect-error its incorrect type for all boards
        getAllBoardsFullfilled
      )
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
    selectBoards: state => state.boards,
    selectBoardsLength: state => state.boards.length
  }
})

export const { selectBoards, selectBoardsLength } = boardsSlice.selectors
export const boardsReducer = boardsSlice.reducer
