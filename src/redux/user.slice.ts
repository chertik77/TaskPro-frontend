import type { PayloadAction } from '@reduxjs/toolkit'
import type { Theme } from 'constants/themes'
import type { AuthResponse, Tokens, User } from 'types'

import { createSlice } from '@reduxjs/toolkit'

export type UserInitialState = {
  user: {
    name: string
    email: string
    avatar: string
    theme: Theme
  }
  accessToken: string
  refreshToken: string
  isLoggedIn: boolean
}

const initialState: UserInitialState = {
  user: {
    name: '',
    email: '',
    avatar: '',
    theme: 'light'
  },
  accessToken: '',
  refreshToken: '',
  isLoggedIn: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<AuthResponse>) => {
      state.isLoggedIn = true
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.user = action.payload.user
    },
    saveTokens: (state, action: PayloadAction<Tokens>) => {
      state.refreshToken = action.payload.refreshToken
      state.accessToken = action.payload.accessToken
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    logout: () => {
      return initialState
    }
  },
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
    selectUser: state => state.user
  }
})

export const { authenticate, updateUser, logout, saveTokens } =
  userSlice.actions
export const { selectIsLoggedIn, selectUser } = userSlice.selectors
export const userReducer = userSlice.reducer
