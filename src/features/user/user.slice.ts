import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthResponse, Tokens } from 'features/auth/auth.types'
import type { User } from './user.types'

import { createSlice } from '@reduxjs/toolkit'

import { DEFAULT_THEME } from './user.constants'

export type UserInitialState = AuthResponse & {
  isLoggedIn: boolean
}

const initialState: UserInitialState = {
  user: {
    id: '',
    name: '',
    email: '',
    avatar: '',
    theme: DEFAULT_THEME
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
    logout: () => initialState
  },
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
    selectUser: state => state.user,
    selectUserTheme: state => state.user.theme
  }
})

export const { authenticate, updateUser, logout, saveTokens } =
  userSlice.actions
export const { selectIsLoggedIn, selectUser, selectUserTheme } =
  userSlice.selectors
export const userReducer = userSlice.reducer
