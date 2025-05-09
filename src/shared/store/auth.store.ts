import type { AuthDtoTypes } from '../api/auth'
import type { UserDtoTypes } from '../api/user'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { userService } from '../api/user'
import { DEFAULT_THEME } from '../constants'

type Action = {
  authenticate: (data: AuthDtoTypes.AuthResponseDto) => void
  saveTokens: (tokens: AuthDtoTypes.TokensDto) => void
  getCurrentUser: () => Promise<void>
  updateUser: (user: Partial<UserDtoTypes.UserDto>) => void
  resetStore: () => void
  signedIn: () => boolean
}

const initialState: AuthDtoTypes.AuthResponseDto = {
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
  persist<AuthDtoTypes.AuthResponseDto & Action>(
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
