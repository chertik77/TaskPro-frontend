import type { UserInitialState } from './user-types'

import { createSlice } from '@reduxjs/toolkit'
import { dashboardApi } from 'redux/api/dashboard/dashboard'
import { userApi } from 'redux/api/user'

import {
  currentFullfilled,
  currentPending,
  currentRejected,
  editProfileFullfilled,
  logoutFullfilled,
  switchThemeFullfilled
} from './user-functions'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      name: null,
      email: null,
      avatarURL: { url: '' },
      userTheme: 'light'
    },
    isLoggedIn: false,
    isRefreshing: false,
    token: null
  } as UserInitialState,
  reducers: {
    authenticate: (state, action) => {
      state.isLoggedIn = true
      state.token = action.payload.token
      state.user = action.payload.user
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
      state.isLoggedIn = false
      state.token = null
    }
  },
  extraReducers: builder => {
    builder

      .addMatcher(userApi.endpoints.current.matchPending, currentPending)
      .addMatcher(userApi.endpoints.current.matchFulfilled, currentFullfilled)
      .addMatcher(userApi.endpoints.current.matchRejected, currentRejected)
      .addMatcher(userApi.endpoints.logout.matchFulfilled, logoutFullfilled)
      .addMatcher(userApi.endpoints.user.matchFulfilled, editProfileFullfilled)
      .addMatcher(
        dashboardApi.endpoints.switchTheme.matchFulfilled,
        switchThemeFullfilled
      )
  },
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
    selectTheme: state => state.user.userTheme,
    selectUser: state => state.user,
    selectsBoards: state => state.user.boards,
    selectIsRefreshing: state => state.isRefreshing
  }
})

export const { authenticate, updateUser, logout } = userSlice.actions
export const {
  selectIsLoggedIn,
  selectUser,
  selectTheme,
  selectIsRefreshing,
  selectsBoards
} = userSlice.selectors
export const userReducer = userSlice.reducer
