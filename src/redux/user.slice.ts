import { createSlice } from '@reduxjs/toolkit'

export type UserInitialState = {
  user: {
    name: string
    email: string
    avatar: string
    theme: string
  }
  token: string
  isLoggedIn: boolean
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      name: '',
      email: '',
      avatar: '',
      theme: 'light'
    },
    token: '',
    isLoggedIn: false
  } as UserInitialState,
  reducers: {
    authenticate: (state, action) => {
      state.isLoggedIn = true
      state.token = action.payload.token
      state.user = action.payload.user
    },
    current: (state, action) => {
      state.user = action.payload
      state.isLoggedIn = true
    },
    updateUser: (state, action) => {
      state.user = action.payload
    },
    logout: state => {
      state.user = {
        name: '',
        email: '',
        avatar: '',
        theme: 'light'
      }
      state.isLoggedIn = false
      state.token = ''
    }
  },
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
    selectUser: state => state.user
  }
})

export const { authenticate, updateUser, logout, current } = userSlice.actions
export const { selectIsLoggedIn, selectUser } = userSlice.selectors
export const userReducer = userSlice.reducer
