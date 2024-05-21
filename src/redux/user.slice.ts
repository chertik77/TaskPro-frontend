import { createSlice } from '@reduxjs/toolkit'

export type UserInitialState = {
  user: {
    name: string
    email: string
    avatarURL: string
    userTheme: string
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
      avatarURL: '',
      userTheme: 'light'
    },
    token: '',
    isLoggedIn: false
  } as UserInitialState,
  reducers: {
    authenticate: (state, action) => {
      state.isLoggedIn = true
      state.token = action.payload.token
      state.user = action.payload.user
      state.user.avatarURL = action.payload.user.avatarURL.url
    },
    current: (state, action) => {
      state.user = action.payload.user
      state.user.avatarURL = action.payload.user.avatarURL.url
      state.isLoggedIn = true
    },
    updateUser: (state, action) => {
      state.user.avatarURL = action.payload.avatarURL.url
      state.user.userTheme = action.payload.userTheme
    },
    logout: state => {
      state.user = {
        name: '',
        email: '',
        avatarURL: '',
        userTheme: ''
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
