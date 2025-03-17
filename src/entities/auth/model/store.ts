import type { User } from '@/entities/user/@x/auth'
import type { AuthResponse, Tokens } from './types'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { DEFAULT_THEME, userService } from '@/entities/user/@x/auth'

type Action = {
  authenticate: (data: AuthResponse) => void
  saveTokens: (tokens: Tokens) => void
  getCurrentUser: () => Promise<void>
  updateUser: (user: Partial<User>) => void
  resetStore: () => void
  signedIn: () => boolean
}

const initialState: AuthResponse = {
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
  persist<AuthResponse & Action>(
    (set, get) => ({
      ...initialState,
      authenticate: set,
      saveTokens: set,
      updateUser: user => set(s => ({ user: { ...s.user, ...user } })),
      getCurrentUser: async () => {
        set({ user: await userService.getCurrentUser() })
      },
      signedIn: () => [get().accessToken, get().refreshToken].every(Boolean),
      resetStore: () => {
        set(initialState)
        useAuthStore.persist.clearStorage()
      }
    }),
    { name: 'auth' }
  )
)
