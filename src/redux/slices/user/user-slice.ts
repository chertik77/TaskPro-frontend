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
    token: null
  } as UserInitialState,
  reducers: {
    authenticate: (state, action) => {
      state.isLoggedIn = true
      state.token = action.payload.token
      state.user = action.payload.user
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
    selectUser: state => state.user
  }
})

export const { authenticate } = userSlice.actions
export const { selectIsLoggedIn, selectUser, selectTheme } = userSlice.selectors
export const userReducer = userSlice.reducer
