import { inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

import { env, THEMES } from '../config'

export const authClient = createAuthClient({
  baseURL: env.VITE_API_BASE_URL + '/auth',
  fetchOptions: { throw: true },
  plugins: [
    inferAdditionalFields({ user: { theme: { type: THEMES.map(t => t) } } })
  ]
})
