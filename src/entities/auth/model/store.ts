import type { UserTypes } from '@/entities/user'
import type { AuthTypes } from '..'

import { DEFAULT_THEME } from '@/entities/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Action = {
  authenticate: (data: AuthTypes.AuthResponse) => void
  saveTokens: (tokens: AuthTypes.Tokens) => void
  updateUser: (user: Partial<UserTypes.User>) => void
  resetStore: () => void
  signedIn: () => boolean
}

const initialState: AuthTypes.AuthResponse = {
  user: {
    id: '',
    name: '',
    email: '',
    avatar: '',
    theme: DEFAULT_THEME
  },
  accessToken: '',
  refreshToken: ''
}

export const useAuthStore = create(
  persist<AuthTypes.AuthResponse & Action>(
    (set, get) => ({
      ...initialState,
      authenticate: set,
      saveTokens: set,
      updateUser: user => set(s => ({ user: { ...s.user, ...user } })),
      signedIn: () => [get().accessToken, get().refreshToken].every(Boolean),
      resetStore: () => {
        set(initialState)
        useAuthStore.persist.clearStorage()
      }
    }),
    { name: 'auth' }
  )
)
