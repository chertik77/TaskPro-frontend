import { createSlice } from '@reduxjs/toolkit'

export type UserInitialState = {
  user: {
    name: string
    email: string
    avatar: string
    theme: string
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
    authenticate: (state, action) => {
      state.isLoggedIn = true
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.user = action.payload.user
    },
    saveTokens: (state, action) => {
      state.refreshToken = action.payload.refreshToken
      state.accessToken = action.payload.accessToken
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
