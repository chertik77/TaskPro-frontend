import { createSlice } from '@reduxjs/toolkit'

export type FilterInitialState = {
  filter: string
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: ''
  } as FilterInitialState,
  reducers: {
    filterCards: (state, action) => {
      state.filter = action.payload
    }
  },
  selectors: {
    selectFilter: state => state.filter
  }
})

export const { filterCards } = filterSlice.actions
export const { selectFilter } = filterSlice.selectors
export const filterReducer = filterSlice.reducer
