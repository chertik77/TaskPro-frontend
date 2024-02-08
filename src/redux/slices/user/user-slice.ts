import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { dashboardApi } from 'redux/api/dashboard/dashboard'
import { userApi } from 'redux/api/user'
import {
  currentFullfilled,
  currentPending,
  currentRejected,
  logoutFullfilled,
  signupFullfilled,
  switchThemeFullfilled
} from './user-functions'
import type { InitialState } from './user-types'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      name: null,
      email: null,
      avatarURL: { url: '' },
      userTheme: ''
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false
  } as InitialState,
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
      .addMatcher(
        dashboardApi.endpoints.switchTheme.matchFulfilled,
        switchThemeFullfilled
      )
  },
  selectors: {
    selectTheme: state => state.user.userTheme,
    selectUser: state => state.user,
    selectIsLoggedIn: state => state.isLoggedIn,
    selectIsRefreshing: state => state.isRefreshing,
    selectToken: state => state.token
  }
})

export const {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectToken,
  selectTheme
} = userSlice.selectors
export const userReducer = userSlice.reducer
