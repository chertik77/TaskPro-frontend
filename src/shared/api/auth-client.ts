import type { BetterAuthClientPlugin } from 'better-auth'
import type { BetterFetchOption } from 'better-auth/react'

import { inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

import { env } from '../config'

export const authClient = createAuthClient({
  baseURL: env.VITE_API_BASE_URL + '/auth',
  fetchOptions: { throw: true },
  plugins: [
    revokeSessionByIdPlugin(),
    inferAdditionalFields({
      session: {
        token: { type: 'string', input: false, required: false },
        browser: { type: 'string', input: false },
        os: { type: 'string', input: false },
        isCurrent: { type: 'boolean', input: false }
      }
    })
  ]
})

function revokeSessionByIdPlugin() {
  return {
    id: 'revoke-session-id',
    getActions: $fetch => ({
      revokeSessionById: async (
        data: { id: string },
        fetchOptions?: BetterFetchOption
      ) =>
        $fetch('/revoke-session-id', {
          method: 'POST',
          body: { id: data.id },
          ...fetchOptions
        })
    })
  } satisfies BetterAuthClientPlugin
}
