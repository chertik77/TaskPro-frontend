import { createSlice } from '@reduxjs/toolkit'

export type UserInitialState = {
  user: {
    name: string | null
    email: string | null
    avatarURL: { url: string }
    userTheme: string
  }
  filter: string
  token: string | null
  isLoggedIn: boolean
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      name: null,
      email: null,
      avatarURL: { url: '' },
      userTheme: 'light'
    },
    token: null,
    filter: '',
    isLoggedIn: false
  } as UserInitialState,
  reducers: {
    authenticate: (state, action) => {
      state.isLoggedIn = true
      state.token = action.payload.token
      state.user = action.payload.user
    },
    current: (state, action) => {
      state.user = action.payload.user
      state.isLoggedIn = true
    },
    updateUser: (state, action) => {
      state.user.avatarURL = action.payload.avatarURL
      state.user.userTheme = action.payload.userTheme
    },
    logout: state => {
      state.user = {
        name: null,
        email: null,
        avatarURL: { url: '' },
        userTheme: ''
      }
      state.filter = ''
      state.isLoggedIn = false
      state.token = null
    },
    filter: (state, action) => {
      state.filter = action.payload
    }
  },
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
    selectUser: state => state.user,
    selectFilter: state => state.filter
  }
})

export const { authenticate, updateUser, logout, filter, current } =
  userSlice.actions
export const { selectIsLoggedIn, selectUser, selectFilter } =
  userSlice.selectors
export const userReducer = userSlice.reducer
