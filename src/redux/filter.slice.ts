import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

export type FilterInitialState = {
  cardPriority: string
  sortCriterion: string
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    cardPriority: '',
    sortCriterion: ''
  } as FilterInitialState,
  reducers: {
    setCardPriority: (state, action: PayloadAction<string>) => {
      state.cardPriority = action.payload
    },
    setSortCriterion: (state, action: PayloadAction<string>) => {
      state.sortCriterion = action.payload
    }
  },
  selectors: {
    selectCardPriority: state => state.cardPriority,
    selectCardSortCriterion: state => state.sortCriterion
  }
})

export const { setSortCriterion, setCardPriority } = filterSlice.actions
export const { selectCardPriority, selectCardSortCriterion } =
  filterSlice.selectors
export const filterReducer = filterSlice.reducer
