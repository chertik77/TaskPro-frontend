import { createSlice } from '@reduxjs/toolkit'

export type FilterInitialState = {
  priorityFilter: string
  sortFilter: string
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    priorityFilter: '',
    sortFilter: ''
  } as FilterInitialState,
  reducers: {
    filterCards: (state, action) => {
      state.priorityFilter = action.payload
    },
    sortCards: (state, action) => {
      state.sortFilter = action.payload
    }
  },
  selectors: {
    selectPriorityFilter: state => state.priorityFilter,
    selectSortFilter: state => state.sortFilter,
    selectFilters: state => state
  }
})

export const { filterCards, sortCards } = filterSlice.actions
export const { selectPriorityFilter, selectSortFilter, selectFilters } =
  filterSlice.selectors
export const filterReducer = filterSlice.reducer
