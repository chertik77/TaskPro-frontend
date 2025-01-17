import type { AuthResponse, Tokens } from 'api/auth/auth.types'
import type { UserTypes } from 'api/user'

import { DEFAULT_THEME } from 'shared/constants/theme.constants'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = AuthResponse & {
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
  authenticate: (data: AuthResponse) => void
  saveTokens: (tokens: Tokens) => void
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
