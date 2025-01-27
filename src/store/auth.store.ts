import type { AuthResponse, Tokens } from 'features/auth/auth.types'
import type { User } from 'features/user/user.types'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { DEFAULT_THEME } from 'features/user/user.constants'

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
  updateUser: (user: User) => void
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
