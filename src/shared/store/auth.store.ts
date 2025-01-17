import type { AuthTypes } from 'shared/api/auth'
import type { UserTypes } from 'shared/api/user'

import { DEFAULT_THEME } from 'shared/constants'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = AuthTypes.AuthResponse & {
  isLoggedIn: boolean
}

const initialState: State = {
  user: {
    id: '',
    name: '',
    email: '',
    avatar: '',
    theme: DEFAULT_THEME
  },
  accessToken: '',
  refreshToken: '',
  isLoggedIn: false
}

type Action = {
  authenticate: (data: AuthTypes.AuthResponse) => void
  saveTokens: (tokens: AuthTypes.Tokens) => void
  updateUser: (user: UserTypes.User) => void
  resetStore: () => void
}

export const useAuthStore = create(
  persist<State & Action>(
    set => ({
      ...initialState,
      authenticate: data => set({ ...data, isLoggedIn: true }),
      saveTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),
      updateUser: user => set({ user }),
      resetStore: () => {
        set(initialState)
        useAuthStore.persist.clearStorage()
      }
    }),
    { name: 'auth' }
  )
)
