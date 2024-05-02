import type { UserInitialState } from './user-types'

import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { dashboardApi } from 'redux/api/dashboard/dashboard'
import { userApi } from 'redux/api/user'

import {
  currentFullfilled,
  currentPending,
  currentRejected,
  editProfileFullfilled,
  logoutFullfilled,
  signupFullfilled,
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
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(
          userApi.endpoints.signup.matchFulfilled,
          userApi.endpoints.signin.matchFulfilled
        ),
        signupFullfilled
      )
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
    selectIsAuth: state => Boolean(state.token),
    selectTheme: state => state.user.userTheme,
    selectUser: state => state.user
  }
})

export const { selectIsAuth, selectUser, selectTheme } = userSlice.selectors
export const userReducer = userSlice.reducer
