import type { PayloadAction } from '@reduxjs/toolkit'
import type { UserInitialState } from './user-types'

export const signupFullfilled = (
  state: UserInitialState,
  action: PayloadAction<UserInitialState>
) => {
  state.isLoggedIn = true
  state.user = action.payload.user
  state.token = action.payload.token
}

export const currentPending = (state: UserInitialState) => {
  state.isRefreshing = true
}

export const currentFullfilled = (
  state: UserInitialState,
  action: PayloadAction<UserInitialState>
) => {
  state.user = action.payload.user
  state.isLoggedIn = true
  state.isRefreshing = false
}

export const currentRejected = (state: UserInitialState) => {
  state.isRefreshing = false
}

export const logoutFullfilled = (state: UserInitialState) => {
  state.user = {
    name: null,
    email: null,
    avatarURL: { url: '' },
    userTheme: ''
  }
  state.isLoggedIn = false
  state.token = null
}

export const switchThemeFullfilled = (
  state: UserInitialState,
  action: PayloadAction<UserInitialState>
) => {
  state.user.userTheme = action.payload.user.userTheme
  state.user.avatarURL = action.payload.user.avatarURL
}
