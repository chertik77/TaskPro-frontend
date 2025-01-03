import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: { isOpen: true },
  reducers: {
    setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    }
  },
  selectors: {
    selectIsSidebarOpen: state => state.isOpen
  }
})

export const { setIsSidebarOpen } = sidebarSlice.actions
export const { selectIsSidebarOpen } = sidebarSlice.selectors
export const sidebarReducer = sidebarSlice.reducer
