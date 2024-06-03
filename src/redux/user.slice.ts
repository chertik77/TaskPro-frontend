import { createSlice } from '@reduxjs/toolkit'

export type UserInitialState = {
  user: {
    name: string
    email: string
    avatar: string
    theme: string
  }
  tokens: {
    accessToken: string
    refreshToken: string
  }
  isLoggedIn: boolean
}

const initialState: UserInitialState = {
  user: {
    name: '',
    email: '',
    avatar: '',
    theme: 'light'
  },
  tokens: {
    accessToken: '',
    refreshToken: ''
  },
  isLoggedIn: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isLoggedIn = true
      state.tokens.accessToken = action.payload.accessToken
      state.tokens.refreshToken = action.payload.refreshToken
      state.user = action.payload.user
    },
    saveTokens: (state, action) => {
      state.tokens.refreshToken = action.payload.refreshToken
      state.tokens.accessToken = action.payload.accessToken
    },
    updateUser: (state, action) => {
      state.user = action.payload
    },
    logout: () => initialState
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
