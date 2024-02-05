import type { PayloadAction } from '@reduxjs/toolkit'
import type { InitialState } from './user-types'

export const signupFullfilled = (
  state: InitialState,
  action: PayloadAction<InitialState>
) => {
  state.isLoggedIn = true
  state.user = action.payload.user
  state.token = action.payload.token
}

export const currentPending = (state: InitialState) => {
  state.isRefreshing = true
}

export const currentFullfilled = (
  state: InitialState,
  action: PayloadAction<InitialState>
) => {
  state.user = action.payload.user
  state.isLoggedIn = true
  state.isRefreshing = false
}

export const currentRejected = (state: InitialState) => {
  state.isRefreshing = false
}

export const logoutFullfilled = (state: InitialState) => {
  state.user = { name: null, email: null }
  state.isLoggedIn = false
  state.token = null
}
