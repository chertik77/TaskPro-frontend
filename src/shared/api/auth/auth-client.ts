import type { BetterAuthClientPlugin } from 'better-auth'
import type { BetterFetchOption } from 'better-auth/react'

import { passkeyClient } from '@better-auth/passkey/client'
import { createAuthClient } from 'better-auth/react'

import { env } from '../../config'

const revokeSessionByIdPlugin = () =>
  ({
    id: 'revoke-session-id',
    getActions: $fetch => ({
      revokeSessionById: (
        { id }: { id: string },
        fetchOptions?: BetterFetchOption
      ) =>
        $fetch('/revoke-session-id', {
          method: 'POST',
          body: { id },
          ...fetchOptions
        })
    })
  }) satisfies BetterAuthClientPlugin

export const authClient = createAuthClient({
  baseURL: `${env.VITE_API_BASE_URL}/auth`,
  fetchOptions: { throw: true },
  plugins: [passkeyClient(), revokeSessionByIdPlugin()]
})
