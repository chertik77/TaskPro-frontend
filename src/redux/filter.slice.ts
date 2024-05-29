import { createSlice } from '@reduxjs/toolkit'

export type FilterInitialState = {
  cardPriority: string
  cardSort: string
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    cardPriority: '',
    cardSort: ''
  } as FilterInitialState,
  reducers: {
    filterCards: (state, action) => {
      state.cardPriority = action.payload
    },
    sortCards: (state, action) => {
      state.cardSort = action.payload
    }
  },
  selectors: {
    selectCardPriority: state => state.cardPriority,
    selectCardSort: state => state.cardSort
  }
})

export const { filterCards, sortCards } = filterSlice.actions
export const { selectCardPriority, selectCardSort } = filterSlice.selectors
export const filterReducer = filterSlice.reducer
