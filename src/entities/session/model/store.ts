import type { Theme } from '@/shared/config'
import type { SessionResponseDto } from '../api/types'

import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'

import { userService } from '@/entities/user/@x/session'

import { DEFAULT_THEME } from '@/shared/config'

export const {
  useStore: useSessionStore,
  getState: getSessionStore,
  actions: sessionActions
} = createStore(
  {
    user: storage({
      name: '',
      email: '',
      avatar: '',
      theme: DEFAULT_THEME as Theme
    }),
    tokens: storage({ accessToken: '', refreshToken: '' }),
    get isAuthenticated() {
      return [this.tokens.accessToken, this.tokens.refreshToken].every(Boolean)
    }
  },
  ({ actions, reset }) => ({
    authenticate: ({ user, ...tokens }: SessionResponseDto) => {
      actions.setUser(user)
      actions.setTokens(tokens)
    },
    getCurrentUser: async () => {
      actions.setUser(await userService.getCurrentUser())
    },
    logout: () => {
      reset()
      localStorage.clear()
    }
  })
)
