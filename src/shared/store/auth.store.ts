import type { AuthTypes } from '@/shared/api/auth'
import type { UserTypes } from '@/shared/api/user'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { DEFAULT_THEME } from '@/shared/constants'

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
