import { createSlice } from '@reduxjs/toolkit'
import { boardApi } from 'redux/api/dashboard/board'
import { addNewBoardFullfilled } from './board-functions'
import type { BoardInitialState } from './board-types'

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    boards: []
  } as BoardInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      boardApi.endpoints.addNewBoard.matchFulfilled,
      addNewBoardFullfilled
    )
  },
  selectors: { selectBoard: state => state }
})

export const { selectBoard } = boardSlice.selectors
export const boardReducer = boardSlice.reducer
