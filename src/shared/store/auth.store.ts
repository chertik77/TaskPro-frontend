import type { AuthDtoTypes } from '../api/auth'
import type { Theme } from '../constants'

import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'

import { userService } from '../api/user'
import { DEFAULT_THEME } from '../constants'

export const {
  useStore: useAuthStore,
  getState: getAuthStore,
  actions: authActions
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
    authenticate: ({ user, ...tokens }: AuthDtoTypes.AuthResponseDto) => {
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
